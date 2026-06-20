import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrambleText } from './ScrambleText';
import type { Project } from '../../data/projects';

const CATEGORY_COLOR: Record<Project['category'], string> = {
  Software: '#60a5fa',
  Embedded: '#34d399',
  Hardware: '#fbbf24',
  Web:      '#a78bfa',
};

interface WorkRowProps {
  project: Project;
  index: number;
  total: number;
  dimmed: boolean;
  onEnter: (slug: string, y: number) => void;
  onLeave: () => void;
  onMove: (x: number, y: number) => void;
}

export function WorkRow({ project, index, total, dimmed, onEnter, onLeave, onMove }: WorkRowProps) {
  const [hovered, setHovered] = useState(false);

  const handleEnter = (e: React.MouseEvent) => {
    setHovered(true);
    onEnter(project.slug, e.clientY);
  };
  const handleLeave = () => {
    setHovered(false);
    onLeave();
  };
  const handleMove = (e: React.MouseEvent) => onMove(e.clientX, e.clientY);

  return (
    <Link
      to={`/work/${project.slug}`}
      data-cursor="view"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      className="block border-t border-[#26262A] last:border-b"
      aria-label={`${project.title} — ${project.tagline}`}
    >
      <div
        className="flex items-center gap-6 md:gap-10 py-6 md:py-7 px-1 transition-opacity duration-300"
        style={{ opacity: dimmed ? 0.2 : 1 }}
      >
        {/* Index */}
        <span className="font-mono text-xs text-[#8A8A8F] w-8 shrink-0">
          {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>

        {/* Title */}
        <h3 className="flex-1 text-xl md:text-2xl font-semibold text-[#EDEDEC] leading-tight tracking-tight">
          <ScrambleText text={project.title} active={hovered} />
        </h3>

        {/* Category */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: CATEGORY_COLOR[project.category] }}
          />
          <span className="font-mono text-xs text-[#8A8A8F]">{project.category}</span>
        </div>

        {/* Arrow */}
        <span
          className="text-[#CBBFA8] shrink-0 transition-transform duration-300"
          style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)' }}
        >
          →
        </span>
      </div>

      {/* Mobile inline thumb */}
      {hovered && project.coverImage && (
        <div className="sm:hidden h-40 overflow-hidden rounded-lg mb-4 mx-1">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </Link>
  );
}
