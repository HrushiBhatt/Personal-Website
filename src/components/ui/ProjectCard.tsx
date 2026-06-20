import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '../../data/projects';
import { TechChip } from './TechChip';

const CATEGORY_DOT: Record<Project['category'], string> = {
  Software: 'bg-blue-400',
  Embedded: 'bg-emerald-400',
  Hardware: 'bg-amber-400',
  Web: 'bg-purple-400',
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: index * 0.08 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="block h-full rounded-xl border border-white/7 bg-[#111] p-7 hover:border-white/12 hover:bg-[#161616] transition-all duration-300 group"
      >
        {/* Number + category */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs text-white/20">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${CATEGORY_DOT[project.category]}`} />
            <span className="font-mono text-[10px] text-white/30 tracking-wide">
              {project.category}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white/90 mb-2 group-hover:text-white transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-white/40 leading-relaxed mb-6">
          {project.tagline}
        </p>

        {/* Tech — first 4 */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.slice(0, 4).map((t) => (
            <TechChip key={t} label={t} />
          ))}
          {project.tech.length > 4 && (
            <span className="font-mono text-[10px] text-white/20 self-center">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <span className="text-xs text-white/25 font-mono tracking-wide group-hover:text-white/50 transition-colors">
          View case study →
        </span>
      </Link>
    </motion.div>
  );
}
