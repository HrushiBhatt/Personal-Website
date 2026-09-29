import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import { Button } from './Button';
import styles from './Header.module.css';

const LINKS = [
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'About', id: 'about' },
  { label: 'Leadership', id: 'leadership' },
  { label: 'Contact', id: 'contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const progressRef = useRef<HTMLSpanElement>(null);

  // Solid header once scrolled, and the orange reading-progress bar along its bottom edge.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current?.style.setProperty('--progress', String(max > 0 ? window.scrollY / max : 0));
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight the link for whichever section crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.header} data-solid={scrolled}>
      <span ref={progressRef} className={styles.progress} aria-hidden="true" />
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.brand} aria-label={`${profile.name}, back to top`}>
          {profile.name}
          <span className={styles.dot}>.</span>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={styles.link}
              aria-current={active === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
          <Button href={profile.github} size="sm" leadingIcon="github">
            GitHub
          </Button>
        </nav>
      </div>
    </header>
  );
}
