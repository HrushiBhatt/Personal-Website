import { useState } from 'react';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDialog } from '../components/ProjectDialog';
import { projects, type Project } from '../data/projects';
import styles from './Projects.module.css';

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      kicker="projects"
      title={
        <>
          A small selection of <em>recent projects</em>
        </>
      }
      subtitle="Open any project to see what I built, the hard parts, the results, and the stack."
    >
      <ol className={styles.list}>
        {projects.map((project, i) => (
          <li key={project.slug} data-reveal={i % 2 ? 'right' : 'left'}>
            <ProjectCard project={project} index={i} flip={i % 2 === 1} onOpen={() => setActive(project)} />
          </li>
        ))}
      </ol>
      <ProjectDialog project={active} onClose={() => setActive(null)} />
    </Section>
  );
}
