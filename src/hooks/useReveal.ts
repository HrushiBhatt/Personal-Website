import { useEffect, type CSSProperties } from 'react';

/**
 * Fades in every `[data-reveal]` element the first time it scrolls into view.
 * The hidden starting state only applies once index.html has tagged <html>
 * with `.js`, so content is never hidden without this script. Stagger with
 * the `--reveal-delay` CSS variable (see `revealDelay`).
 */
export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/** Inline style that delays an element's reveal, for staggering siblings. */
export const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;
