import { useEffect, useState } from 'react';
import { Section } from '../components/Section';
import { ContactForm } from '../components/ContactForm';
import { Icon } from '../components/Icon';
import { SocialLinks } from '../components/SocialLinks';
import { profile } from '../data/profile';
import { revealDelay } from '../hooks/useReveal';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <Section
      id="contact"
      kicker="contact"
      title={
        <>
          Let&rsquo;s <em>Talk</em>
        </>
      }
      subtitle={profile.contactNote}
    >
      <div className={styles.grid}>
        <aside className={styles.person} data-reveal>
          <div>
            <p className={styles.kicker}>// reach me</p>
            <p className={styles.name}>{profile.name}</p>
            <p className={styles.role}>
              {profile.role} · {profile.education.school}
            </p>
          </div>

          <div>
            <p className={styles.label}>Email</p>
            <div className={styles.email}>
              <a href={`mailto:${profile.email}`}>
                <Icon name="mail" size={18} />
                {profile.email}
              </a>
              <CopyButton text={profile.email} />
            </div>
          </div>

          <div>
            <p className={styles.label}>Elsewhere</p>
            <SocialLinks size="sm" />
          </div>

          <p className={styles.status}>
            <span className="pulse-dot" /> {profile.seeking}
          </p>
        </aside>

        <div className={styles.formCard} data-reveal style={revealDelay(120)}>
          <p className={styles.kicker}>// send a message</p>
          <h3 className={styles.formTitle}>Drop me a line</h3>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard blocked (e.g. insecure context); the address is still visible to select.
    }
  }

  return (
    <button type="button" className={styles.copy} onClick={copy} aria-label="Copy email address">
      <Icon name={copied ? 'check' : 'copy'} size={16} />
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
