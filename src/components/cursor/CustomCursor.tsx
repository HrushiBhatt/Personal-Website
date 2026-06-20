import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type CursorState = 'default' | 'link' | 'view' | 'open';

export function CustomCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const dotRef     = useRef<HTMLDivElement>(null);
  const reduced    = useReducedMotion();
  const [label, setLabel]   = useState('');
  const [active, setActive] = useState(false);

  /* never render on touch or reduced-motion */
  const [isCoarse] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse)').matches
      : true
  );

  useEffect(() => {
    if (reduced || isCoarse) return;

    const pos     = { x: -200, y: -200 };
    const current = { x: -200, y: -200 };
    let raf: number;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const loop = () => {
      current.x += (pos.x - current.x) * 0.14;
      current.y += (pos.y - current.y) * 0.14;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.x}px,${current.y}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px,${pos.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onEnter = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null;
      if (!el) return;
      setActive(true);
      setLabel(el.dataset.cursor ?? '');
    };
    const onLeave = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-cursor]')) {
        setActive(false);
        setLabel('');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseenter', onEnter, true);
    document.addEventListener('mouseleave', onLeave, true);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter, true);
      document.removeEventListener('mouseleave', onLeave, true);
    };
  }, [reduced, isCoarse]);

  if (reduced || isCoarse) return null;

  return (
    <>
      {/* Lagging ring */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <div
          className="flex items-center justify-center rounded-full border border-[#CBBFA8]/60 transition-all duration-200"
          style={{
            width:  active ? 48 : 28,
            height: active ? 48 : 28,
            backgroundColor: active ? 'rgba(203,191,168,0.06)' : 'transparent',
          }}
        >
          {active && label && (
            <span className="font-mono text-[9px] text-[#CBBFA8] tracking-widest uppercase">
              {label}
            </span>
          )}
        </div>
      </div>

      {/* Exact dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <div className="w-1 h-1 rounded-full bg-[#CBBFA8]/80" />
      </div>
    </>
  );
}
