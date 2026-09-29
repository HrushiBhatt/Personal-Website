import { useState, type FormEvent } from 'react';
import { Button } from './Button';
import styles from './ContactForm.module.css';

// Web3Forms public access key (safe to ship client-side) — delivers to hrushibhatt@gmail.com.
const WEB3FORMS_KEY = '9cfbb7d7-ee1f-4e48-a80c-b444bce6ee3a';

// Client-side rate limit: 3 submissions per hour per browser.
const RATE_LIMIT = { max: 3, windowMs: 60 * 60 * 1000, storageKey: 'hrushi_contact_ts' };

function recentSubmissions(): number[] {
  try {
    const stamps = JSON.parse(localStorage.getItem(RATE_LIMIT.storageKey) ?? '[]') as number[];
    return stamps.filter((t) => t > Date.now() - RATE_LIMIT.windowMs);
  } catch {
    return [];
  }
}

function recordSubmission() {
  try {
    localStorage.setItem(RATE_LIMIT.storageKey, JSON.stringify([...recentSubmissions(), Date.now()]));
  } catch {
    // Storage unavailable (private mode); the limit simply doesn't apply.
  }
}

type Status =
  | { kind: 'idle' | 'sending' | 'sent' | 'error' }
  | { kind: 'limited'; minutes: number };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('botcheck')) return; // Honeypot filled in: silently drop.

    const recent = recentSubmissions();
    if (recent.length >= RATE_LIMIT.max) {
      const minutes = Math.ceil((Math.min(...recent) + RATE_LIMIT.windowMs - Date.now()) / 60_000);
      setStatus({ kind: 'limited', minutes });
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio message from ${data.get('name')}`,
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      recordSubmission();
      form.reset();
      setStatus({ kind: 'sent' });
    } catch {
      setStatus({ kind: 'error' });
    }
  }

  const sending = status.kind === 'sending';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" name="botcheck" className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Name</span>
          <input name="name" type="text" required maxLength={100} autoComplete="name" placeholder="Your name" />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@example.com" />
        </label>
      </div>

      <label className={styles.field}>
        <span>Message</span>
        <textarea name="message" required maxLength={2000} rows={6} placeholder="What's on your mind?" />
      </label>

      <div className={styles.footer}>
        <p className={styles.status} data-kind={status.kind} role="status" aria-live="polite">
          {status.kind === 'sent' && 'Message sent — I’ll be in touch soon.'}
          {status.kind === 'error' && 'Something went wrong. Please email me directly.'}
          {status.kind === 'limited' && `Please try again in ${status.minutes} min.`}
        </p>
        <Button type="submit" disabled={sending} icon={sending ? undefined : 'arrowRight'}>
          {sending ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  );
}
