import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$?><';

interface ScrambleTextProps {
  text: string;
  active: boolean;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
}

export function ScrambleText({ text, active, className, as: Tag = 'span' }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active || reduced) { setDisplay(text); return; }

    let frame = 0;
    const total = 22;
    const id = setInterval(() => {
      frame++;
      const progress = frame / total;
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          const settled = progress > (i / text.length) * 0.6 + 0.4;
          return settled ? char : POOL[Math.floor(Math.random() * POOL.length)];
        }).join('')
      );
      if (frame >= total) clearInterval(id);
    }, 35);

    return () => clearInterval(id);
  }, [active, text, reduced]);

  return <Tag className={className}>{display}</Tag>;
}
