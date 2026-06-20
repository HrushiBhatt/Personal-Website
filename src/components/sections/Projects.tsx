import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../ui/ScrollReveal';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';

function categoryColor(category: string): string {
  const c = category.toLowerCase();
  if (c.includes('web')) return '#C8965A';
  if (c.includes('software')) return '#60a5fa';
  if (c.includes('embedded')) return '#34d399';
  if (c.includes('hardware')) return '#a78bfa';
  return '#CBBFA8';
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const color = categoryColor(project.category);

  return (
    <div
      className="relative group rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#141414] hover:border-[#3b82f6]/30 transition-all duration-300 h-full flex flex-col"
      style={{ '--glow-color': color } as React.CSSProperties}
    >
      {/* Cover image */}
      <Link to={`/work/${project.slug}`} className="block">
        <div className="relative overflow-hidden aspect-[16/9] bg-[#1c1c1c]">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: project.coverObjectPosition ?? '50% 50%' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-xs text-[#888]">{project.category}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </Link>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#888]">{project.category}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1 px-2 py-1 rounded border border-[#2a2a2a] text-[#888]/50 hover:text-[#F0F0F0] hover:border-[#3b82f6]/40 transition-all font-mono text-[9px] tracking-wide"
                aria-label={`GitHub — ${project.title}`}
              >
                <GithubIcon />
                <span>repo</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1 px-2 py-1 rounded border border-[#2a2a2a] text-[#888]/50 hover:text-[#F0F0F0] hover:border-[#C8965A]/40 transition-all font-mono text-[9px] tracking-wide"
                aria-label={`Live demo — ${project.title}`}
              >
                <span>live</span>
              </a>
            )}
          </div>
        </div>

        <Link to={`/work/${project.slug}`} className="flex-1 flex flex-col">
          <h3 className="text-base font-semibold text-[#F0F0F0] mb-1.5 group-hover:text-[#93c5fd] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-[#888] leading-relaxed mb-4 line-clamp-2 flex-1">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border border-[#2a2a2a] text-[#888]">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="font-mono text-[10px] text-[#888]/40 self-center">+{project.tech.length - 4}</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateNav = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateNav, { passive: true });
    const ro = new ResizeObserver(updateNav);
    ro.observe(el);
    updateNav();
    return () => {
      el.removeEventListener('scroll', updateNav);
      ro.disconnect();
    };
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir === 'right' ? 400 : -400, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section id="projects" className="py-24 border-t border-[#2a2a2a] bg-[#0f0f0f]">

      {/* Header — constrained width */}
      <ScrollReveal>
        <div className="px-6 sm:px-10 lg:px-16 mb-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-[#3b82f6] uppercase mb-4">Projects</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight gradient-text">
                What I've built
              </h2>
            </div>

            <div className="flex items-center gap-2 pb-1">
              <button
                onClick={() => scroll('left')}
                disabled={!canLeft}
                aria-label="Previous projects"
                className={`w-9 h-9 rounded-lg border border-[#2a2a2a] flex items-center justify-center text-white hover:text-white hover:border-[#3b82f6]/40 transition-all duration-200 ${canLeft ? 'opacity-100' : 'opacity-25 cursor-default'}`}
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canRight}
                aria-label="Next projects"
                className={`w-9 h-9 rounded-lg border border-[#2a2a2a] flex items-center justify-center text-white hover:text-white hover:border-[#3b82f6]/40 transition-all duration-200 ${canRight ? 'opacity-100' : 'opacity-25 cursor-default'}`}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Scrollable row — full section width with side padding */}
      <div
        ref={scrollRef}
        role="region"
        aria-label="Projects"
        className="no-scrollbar flex gap-5 overflow-x-auto pb-6 px-6 sm:px-10 lg:px-16"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {projects.map(p => (
          <motion.div
            key={p.slug}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 w-[340px] sm:w-[380px]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
