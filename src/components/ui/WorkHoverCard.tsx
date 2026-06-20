import { useEffect, useRef } from 'react';
import type { Project } from '../../data/projects';

const CATEGORY_ACCENT: Record<Project['category'], string> = {
  Software: '#1d3a52',
  Embedded: '#0f2e1f',
  Hardware: '#2e1f06',
  Web:      '#1a1030',
};

interface WorkHoverCardProps {
  project: Project | null;
  x: number;
  y: number;
}

export function WorkHoverCard({ project, x, y }: WorkHoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x, y });
  const curr = useRef({ x, y });

  /* smooth tracking */
  useEffect(() => {
    if (!project) return;
    pos.current = { x, y };
  }, [x, y, project]);

  useEffect(() => {
    if (!project) return;
    let raf: number;
    const loop = () => {
      curr.current.x += (pos.current.x - curr.current.x) * 0.1;
      curr.current.y += (pos.current.y - curr.current.y) * 0.1;

      if (cardRef.current) {
        const cw = cardRef.current.offsetWidth;
        const ch = cardRef.current.offsetHeight;
        const cx = Math.min(Math.max(curr.current.x + 24, 0), window.innerWidth  - cw - 16);
        const cy = Math.min(Math.max(curr.current.y - ch / 2, 16), window.innerHeight - ch - 16);
        cardRef.current.style.transform = `translate(${cx}px,${cy}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [project]);

  if (!project) return null;

  return (
    <div
      ref={cardRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 w-[280px] md:w-[340px] overflow-hidden rounded-xl border border-[#26262A]"
      style={{ willChange: 'transform' }}
    >
      {project.coverImage ? (
        <img
          src={project.coverImage}
          alt=""
          className="w-full aspect-[4/3] object-cover"
        />
      ) : (
        /* Stylised placeholder when no cover exists */
        <div
          className="w-full aspect-[4/3] flex flex-col items-start justify-end p-5"
          style={{ backgroundColor: CATEGORY_ACCENT[project.category] }}
        >
          <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-2">
            {project.category}
          </span>
          <span className="font-sans text-xl font-semibold text-[#EDEDEC] leading-tight">
            {project.title}
          </span>
        </div>
      )}
      <div className="bg-[#141416] px-4 py-3">
        <p className="font-mono text-[11px] text-[#8A8A8F] tracking-wide truncate">
          {project.tagline}
        </p>
      </div>
    </div>
  );
}
