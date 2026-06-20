import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Nav } from '../components/layout/Nav';
import { Footer } from '../components/layout/Footer';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { getProjectBySlug } from '../data/projects';
import type { Project } from '../data/projects';

const CATEGORY_COLOR: Record<Project['category'], string> = {
  Software: '#60a5fa',
  Embedded: '#34d399',
  Hardware: '#a78bfa',
  Web:      '#f472b6',
};

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug ?? '');

  useEffect(() => {
    if (project) document.title = `${project.title} — Hrushi Bhatt`;
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-20 pb-16">

        <div className="max-w-2xl mx-auto px-6 pt-12">

          <ScrollReveal>
            <Link to="/" className="font-mono text-xs text-[#888]/50 hover:text-[#CBBFA8] transition-colors tracking-widest uppercase">
              ← All projects
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.05} className="mt-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CATEGORY_COLOR[project.category] }} />
              <span className="font-mono text-[10px] tracking-widest text-[#888] uppercase">{project.category}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F0F0] tracking-tight mb-3 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg text-[#888] leading-relaxed">{project.tagline}</p>
          </ScrollReveal>

          {/* Meta */}
          <ScrollReveal delay={0.1} className="mt-10">
            <div className="flex flex-wrap gap-x-10 gap-y-4 py-7 border-t border-b border-[#2a2a2a]">
              {[
                { label: 'Role', value: project.role },
                ...(project.team      ? [{ label: 'Team',  value: project.team }]      : []),
                ...(project.timeframe ? [{ label: 'When',  value: project.timeframe }] : []),
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-[#888]/40 mb-1">{label}</p>
                  <p className="text-sm text-[#888]">{value}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Stack */}
          <ScrollReveal delay={0.12} className="mt-10">
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#888]/50 mb-3">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded border border-[#2a2a2a] text-[#888]">{t}</span>
              ))}
            </div>
          </ScrollReveal>

          {/* Summary */}
          <ScrollReveal delay={0.14} className="mt-10">
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#888]/50 mb-3">Overview</p>
            <p className="text-[#888] leading-relaxed">{project.summary}</p>
          </ScrollReveal>

          {/* Metrics */}
          {project.metrics && (
            <ScrollReveal delay={0.16} className="mt-10">
              <p className="font-mono text-[10px] tracking-widest uppercase text-[#888]/50 mb-4">Results</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map(m => (
                  <div key={m.label} className="border border-[#2a2a2a] rounded-lg p-4 bg-[#141414]">
                    <p className="text-2xl font-bold text-[#F0F0F0] mb-1">{m.value}</p>
                    <p className="font-mono text-[9px] text-[#888]/50 tracking-wide uppercase leading-relaxed">{m.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Highlights */}
          <ScrollReveal delay={0.18} className="mt-10">
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#888]/50 mb-5">What I built</p>
            <ul className="space-y-5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-5">
                  <span className="font-mono text-xs text-[#888]/25 shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-sm text-[#888] leading-relaxed">{h}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Challenges */}
          {project.challenges && (
            <ScrollReveal delay={0.2} className="mt-10">
              <p className="font-mono text-[10px] tracking-widest uppercase text-[#888]/50 mb-5">Hard problems</p>
              <ul className="space-y-4">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex gap-4 text-sm text-[#888] leading-relaxed">
                    <span className="text-[#CBBFA8]/50 shrink-0 mt-0.5">▲</span>
                    {c}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          )}

          {/* Links */}
          {project.links && (
            <ScrollReveal delay={0.22} className="mt-10">
              <p className="font-mono text-[10px] tracking-widest uppercase text-[#888]/50 mb-4">Links</p>
              <div className="flex flex-wrap gap-3">
                {project.links.map(l => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2a] text-sm text-[#888] hover:text-[#F0F0F0] hover:border-[#444] transition-all">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
