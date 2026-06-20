import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

export function Marquee({ text, speed = 40, className }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !trackRef.current) return;
    const el = trackRef.current;
    const width = el.scrollWidth / 2;
    const duration = width / speed;

    const tween = gsap.to(el, {
      x: -width,
      duration,
      ease: 'none',
      repeat: -1,
    });

    const pause  = () => tween.pause();
    const resume = () => tween.play();
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);

    return () => {
      tween.kill();
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
    };
  }, [reduced, speed]);

  const repeated = `${text}  ·  ${text}  ·  ${text}  ·  ${text}  ·  ${text}  ·  ${text}  ·  `;

  return (
    <div className={`overflow-hidden border-t border-b border-[#26262A] py-3 ${className ?? ''}`}>
      <div ref={trackRef} className="flex whitespace-nowrap">
        <span className="font-mono text-xs text-[#8A8A8F] tracking-widest uppercase pr-8">
          {repeated}
        </span>
        <span className="font-mono text-xs text-[#8A8A8F] tracking-widest uppercase pr-8" aria-hidden>
          {repeated}
        </span>
      </div>
    </div>
  );
}
