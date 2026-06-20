import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import { WorkRow } from '../ui/WorkRow';
import { WorkHoverCard } from '../ui/WorkHoverCard';
import { getProjectBySlug } from '../../data/projects';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function Work() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const hoveredProject = hoveredSlug ? getProjectBySlug(hoveredSlug) ?? null : null;

  useEffect(() => {
    if (reduced || !headingRef.current) return;
    gsap.fromTo(
      headingRef.current.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.8,
        ease: 'cubic-bezier(0.16,1,0.3,1)',
        stagger: 0.1,
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%', once: true },
      }
    );
  }, [reduced]);

  return (
    <section id="work" ref={sectionRef} className="py-28 px-6 border-t border-[#26262A]">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="mb-16">
          <p className="mono-label mb-4 opacity-0">Selected work</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#EDEDEC] tracking-tight opacity-0">
            What I've built
          </h2>
        </div>

        <div>
          {projects.map((project, i) => (
            <WorkRow
              key={project.slug}
              project={project}
              index={i}
              total={projects.length}
              dimmed={hoveredSlug !== null && hoveredSlug !== project.slug}
              onEnter={(slug, y) => { setHoveredSlug(slug); setCardPos(prev => ({ ...prev, y })); }}
              onLeave={() => setHoveredSlug(null)}
              onMove={(x, y) => setCardPos({ x, y })}
            />
          ))}
        </div>
      </div>

      {/* Desktop hover card — hidden on touch */}
      <div className="hidden sm:block">
        <WorkHoverCard project={hoveredProject} x={cardPos.x} y={cardPos.y} />
      </div>
    </section>
  );
}
