import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '../ui/MagneticButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('[data-reveal]');
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: i * 0.06,
          ease: 'cubic-bezier(0.16,1,0.3,1)',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        }
      );
    });
  }, [reduced]);

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 border-t border-[#26262A]">
      <div className="max-w-6xl mx-auto max-w-2xl">
        <p data-reveal className="mono-label mb-6">Contact</p>
        <h2 data-reveal className="text-4xl sm:text-5xl font-bold text-[#EDEDEC] tracking-tight mb-6 leading-tight">
          Let's Connect!
        </h2>
        <p data-reveal className="text-[#8A8A8F] leading-relaxed mb-12 max-w-md">
          Open to new full-time positions starting summer 2027, interesting projects, and good conversations.
          Best reached by email.
        </p>

        <div data-reveal className="flex flex-wrap gap-3">
          <MagneticButton>
            <a
              href="mailto:hrushibhatt@gmail.com"
              data-cursor="open"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#EDEDEC] text-[#0B0B0C] text-sm font-semibold hover:bg-[#CBBFA8] transition-colors duration-200"
            >
              hrushibhatt@gmail.com
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="https://linkedin.com/in/hrushibhatt"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#26262A] text-[#8A8A8F] text-sm font-medium hover:text-[#EDEDEC] hover:border-[#8A8A8F] transition-all duration-200"
            >
              LinkedIn ↗
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
