import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { experience } from '../../data/experience';
import { leadership } from '../../data/leadership';

gsap.registerPlugin(ScrollTrigger);

export function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('[data-reveal]');
    els.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8,
          ease: 'cubic-bezier(0.16,1,0.3,1)',
          scrollTrigger: { trigger: el, start: 'top 84%', once: true },
        }
      );
    });
  }, [reduced]);

  return (
    <section id="achievements" ref={sectionRef} className="py-28 px-6 border-t border-[#26262A] bg-[#141416]">
      <div className="max-w-6xl mx-auto">

        {/* Experience */}
        <div className="mb-20">
          <p data-reveal className="mono-label mb-10">Experience</p>
          <div className="space-y-0 border-t border-[#26262A]">
            {experience.map((role) => (
              <div key={`${role.company}-${role.period}`} data-reveal className="py-8 border-b border-[#26262A]">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="font-mono text-xs text-[#8A8A8F]/50 sm:w-36 shrink-0">{role.period}</span>
                  <div>
                    <span className="font-semibold text-[#EDEDEC] text-base">{role.title}</span>
                    <span className="text-[#CBBFA8] text-sm font-medium"> · {role.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div>
          <p data-reveal className="mono-label mb-10">Leadership</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {leadership.map((item) => (
              <div key={item.org} data-reveal className="border border-[#26262A] rounded-xl p-6">
                <p className="font-mono text-[10px] text-[#8A8A8F]/50 tracking-widest uppercase mb-3">{item.period}</p>
                <h3 className="font-semibold text-[#EDEDEC] text-base mb-1">{item.title}</h3>
                <p className="text-sm text-[#CBBFA8] mb-4">{item.org}</p>

                {/* Photo tie-in for Frisbee */}
                {item.org.toLowerCase().includes('frisbee') && (
                  <div className="overflow-hidden rounded-lg mb-4 aspect-[16/7]">
                    <img
                      src="/images/frisbee.jpg"
                      alt="Hrushi playing Ultimate Frisbee"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}

                <ul className="space-y-1.5">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#8A8A8F] leading-relaxed">
                      <span className="text-[#26262A] shrink-0">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
