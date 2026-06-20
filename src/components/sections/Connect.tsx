import { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Email delivery ───────────────────────────────────────────────────────────
// 1. Go to https://web3forms.com
// 2. Enter hrushibhatt@gmail.com and click "Create Access Key"
// 3. Paste the key below — no account or credit card needed
const WEB3FORMS_KEY = '9cfbb7d7-ee1f-4e48-a80c-b444bce6ee3a';

// ─── Rate limiting (client-side, 3 submissions per hour) ─────────────────────
const RL_MAX = 3;
const RL_WINDOW = 60 * 60 * 1000;
const RL_KEY = 'hrushi_contact_ts';

function getRecentTs(): number[] {
  try {
    const raw = JSON.parse(localStorage.getItem(RL_KEY) || '[]') as number[];
    return raw.filter(t => t > Date.now() - RL_WINDOW);
  } catch { return []; }
}
function isRateLimited() { return getRecentTs().length >= RL_MAX; }
function minutesUntilReset() {
  const ts = getRecentTs();
  if (ts.length < RL_MAX) return 0;
  return Math.ceil((Math.min(...ts) + RL_WINDOW - Date.now()) / 60000);
}
function recordSubmission() {
  try {
    const ts = getRecentTs();
    ts.push(Date.now());
    localStorage.setItem(RL_KEY, JSON.stringify(ts));
  } catch {}
}

// ─── Social cards ─────────────────────────────────────────────────────────────
function SocialCard({ label, href, color, logo }: { label: string; href: string; color: string; logo: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-3 w-24 py-5 rounded-xl border transition-all duration-200"
      style={{
        borderColor: hovered ? color + '33' : '#2a2a2a',
        backgroundColor: hovered ? color + '0d' : '#141414',
      }}
    >
      <img src={logo} alt={label} className="w-6 h-6 object-contain" draggable={false} />
      <span className="font-mono text-[10px] tracking-widest uppercase transition-colors duration-200"
        style={{ color: hovered ? '#F0F0F0' : '#888888' }}>{label}</span>
    </motion.a>
  );
}

const SI = 'https://cdn.simpleicons.org';

const SOCIALS = [
  { label: 'GitHub',    href: 'https://github.com/HrushiBhatt',           color: '#F0F0F0', logo: `${SI}/github/FFFFFF`      },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/hrushibhatt',       color: '#0A66C2', logo: '/images/tech/linkedin.avif'  },
  { label: 'Gmail',     href: 'mailto:hrushibhatt@gmail.com',              color: '#EA4335', logo: '/images/tech/gmail.webp'     },
  { label: 'Threads',   href: 'https://www.threads.com/@hrushibhatt_',     color: '#F0F0F0', logo: `${SI}/threads/FFFFFF`     },
  { label: 'Instagram', href: 'https://www.instagram.com/hrushibhatt_',    color: '#E1306C', logo: '/images/tech/instagram.png' },
  { label: 'Spotify',   href: 'https://open.spotify.com/user/hrushibhatt', color: '#1DB954', logo: `${SI}/spotify/1DB954`     },
];

// ─── Contact form ─────────────────────────────────────────────────────────────
type Status = 'idle' | 'loading' | 'success' | 'error' | 'rate_limited';

function ContactForm() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus]   = useState<Status>('idle');
  const [minsLeft, setMinsLeft] = useState(0);

  const inputCls = 'w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#F0F0F0] placeholder-[#888]/50 focus:outline-none focus:border-[#3b82f6]/50 transition-colors duration-200';

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return; // silent bot drop

    if (isRateLimited()) {
      setMinsLeft(minutesUntilReset());
      setStatus('rate_limited');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio message from ${name}`,
          name,
          email,
          message,
          botcheck: honeypot,
        }),
      });
      const data = await res.json();
      if (data.success) {
        recordSubmission();
        setStatus('success');
        setName(''); setEmail(''); setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Honeypot — hidden from real users, bots fill it in */}
      <input
        type="text" name="botcheck" value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
        className="hidden" tabIndex={-1} autoComplete="off"
        aria-hidden
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] tracking-widest uppercase text-[#888]/60">Name</label>
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Your name" required maxLength={100}
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] tracking-widest uppercase text-[#888]/60">Email</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com" required maxLength={200}
            className={inputCls}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[10px] tracking-widest uppercase text-[#888]/60">Message</label>
        <textarea
          value={message} onChange={e => setMessage(e.target.value)}
          placeholder="What's on your mind?" required maxLength={2000} rows={5}
          className={`${inputCls} resize-none`}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.p key="ok" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-[#34d399] font-mono text-xs">
              ✓ Message sent — I'll be in touch!
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p key="err" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-red-400 font-mono text-xs">
              Something went wrong. Try emailing directly.
            </motion.p>
          )}
          {status === 'rate_limited' && (
            <motion.p key="rl" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-[#888] font-mono text-xs">
              Slow down — try again in {minsLeft}m.
            </motion.p>
          )}
          {(status === 'idle' || status === 'loading') && (
            <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="font-mono text-[10px] text-[#888]/40">
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl border border-[#3b82f6]/30 bg-[#3b82f6]/10 text-[#3b82f6] text-sm font-semibold hover:bg-[#3b82f6]/20 hover:border-[#3b82f6]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          {status === 'loading' ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending…
            </>
          ) : status === 'success' ? 'Sent!' : 'Send'}
        </button>
      </div>
    </form>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function Connect() {
  return (
    <section id="connect" className="py-24 px-6 sm:px-10 lg:px-16 border-t border-[#2a2a2a]">
      <div className="grid md:grid-cols-2 gap-16 items-start">

        {/* Left — photo + heading + socials */}
        <div>
          <ScrollReveal>
            <div className="flex items-start gap-10 mb-10">
              <img
                src="/images/headshot.jpg"
                alt="Hrushi Bhatt"
                className="w-48 h-48 rounded-2xl object-cover object-top shrink-0 border border-[#2a2a2a]"
              />
              <div className="pt-2">
                <p className="font-mono text-xs tracking-[0.18em] text-[#3b82f6] uppercase mb-4">Connect</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 gradient-text">Let's Connect</h2>
                <p className="text-[#888] leading-relaxed text-sm">
                  Open to full-time positions, project collaborations, and good conversations.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap gap-4">
            {SOCIALS.map(({ label, href, color, logo }, i) => (
              <ScrollReveal key={label} delay={i * 0.06}>
                <SocialCard label={label} href={href} color={color} logo={logo} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Right — email form */}
        <ScrollReveal delay={0.1}>
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-[#3b82f6] uppercase mb-4">Reach out</p>
            <h3 className="text-xl font-bold tracking-tight mb-6 text-[#F0F0F0]">Send a message</h3>
            <ContactForm />
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
