import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Experience', href: '#experience'  },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Connect',    href: '#connect'    },
];

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const to = (h: string) => (isHome ? h : `/${h}`);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2a2a2a]' : ''}`}>
      <div className="px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">

        {/* Logo + headshot */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="font-mono text-sm font-semibold text-[#F0F0F0] group-hover:text-[#93c5fd] transition-colors">
            HB
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map(l => (
            <a key={l.href} href={to(l.href)}
              className={`text-sm hover:text-white transition-colors ${scrolled ? 'text-[#888]' : 'text-white'}`}>
              {l.label}
            </a>
          ))}
          <a href="https://github.com/HrushiBhatt" target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-sm hover:text-white hover:border-[#3b82f6]/50 hover:bg-[#3b82f6]/5 ${scrolled ? 'border-[#2a2a2a] text-[#888]' : 'border-white/20 text-white'}`}>
            <GithubIcon />
            GitHub
          </a>
        </nav>

        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden flex flex-col gap-1.5 p-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-[#F0F0F0] transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`block w-5 h-px bg-[#F0F0F0] transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[#F0F0F0] transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[#0A0A0A] border-b border-[#2a2a2a]"
          >
            <nav className="px-6 sm:px-10 py-5 flex flex-col gap-4">
              {LINKS.map(l => (
                <a key={l.href} href={to(l.href)} className="text-[#888] hover:text-[#F0F0F0] transition-colors text-sm">
                  {l.label}
                </a>
              ))}
              <a href="https://github.com/HrushiBhatt" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#888] hover:text-[#F0F0F0] transition-colors">
                <GithubIcon /> GitHub
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
