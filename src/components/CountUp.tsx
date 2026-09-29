import { useEffect, useRef } from 'react';
import { introOffsetMs } from '../lib/intro';

const DURATION_MS = 1600;

interface CountUpProps {
  /** e.g. 66 or "20+". Years ("2027") and non-numeric values are shown as-is. */
  value: number | string;
  delay?: number;
}

/**
 * Counts a stat up from zero once it's on screen. The server-rendered HTML holds the final
 * value; the animation writes straight to the DOM, so React never re-renders mid-count.
 */
export function CountUp({ value, delay = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const text = String(value);

  useEffect(() => {
    const match = /^(\d+)(.*)$/.exec(text);
    const el = ref.current;
    if (!match || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    if (target >= 1900 && target <= 2100) return; // a year: counting up to it would read oddly

    let frame = 0;
    let timer = 0;
    el.textContent = `0${suffix}`;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      timer = window.setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1);
          el.textContent = `${Math.round((1 - (1 - t) ** 3) * target)}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      }, delay + introOffsetMs());
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      el.textContent = text;
    };
  }, [text, delay]);

  return <span ref={ref}>{text}</span>;
}
