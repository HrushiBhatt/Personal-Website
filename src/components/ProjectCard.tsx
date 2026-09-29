import type { Project } from '../data/projects';
import { Button } from './Button';
import { Icon } from './Icon';
import { ProjectMedia } from './ProjectMedia';
import { TagList } from './TagList';
import styles from './ProjectCard.module.css';

const VISIBLE_TAGS = 6;
const VISIBLE_METRICS = 3;

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Put the image on the right instead of the left. */
  flip?: boolean;
  onOpen: () => void;
}

export function ProjectCard({ project, index, flip, onOpen }: ProjectCardProps) {
  const hiddenTags = project.tech.length - VISIBLE_TAGS;
  const meta = [
    { label: 'Role', value: project.role },
    { label: 'Team', value: project.team },
    { label: 'When', value: project.timeframe },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  return (
    <article className={styles.card} data-flip={flip || undefined}>
      <button
        type="button"
        className={styles.mediaButton}
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`Open ${project.title}`}
      >
        <ProjectMedia project={project} sizes="660px" className={styles.media} />
        <span className={styles.hint} aria-hidden="true">
          Open <Icon name="arrowUpRight" size={15} />
        </span>
      </button>

      <div className={styles.body}>
        <div className={styles.head}>
          <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
          <p className={styles.category}>{project.category}</p>
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.tagline}>{project.tagline}</p>

        <dl className={styles.meta}>
          {meta.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        {project.metrics && (
          <dl className={styles.metrics}>
            {project.metrics.slice(0, VISIBLE_METRICS).map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <TagList
          items={project.tech.slice(0, VISIBLE_TAGS)}
          more={hiddenTags > 0 ? `+${hiddenTags}` : undefined}
          className={styles.tags}
        />

        <div className={styles.actions}>
          <Button type="button" size="sm" icon="arrowRight" onClick={onOpen} aria-haspopup="dialog">
            Open
          </Button>
          {project.githubUrl && (
            <Button href={project.githubUrl} size="sm" variant="ghost" leadingIcon="github">
              GitHub
            </Button>
          )}
          {project.links?.map((link) => (
            <Button key={link.url} href={link.url} size="sm" variant="ghost" icon="arrowUpRight">
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </article>
  );
}
