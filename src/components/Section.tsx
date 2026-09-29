import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  /** Small label above the title, rendered as a code comment. */
  kicker: string;
  /** Wrap the highlighted words in <em>; they render in orange. */
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}

export function Section({ id, kicker, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className={styles.header} data-reveal>
          <p className={styles.kicker}>// {kicker}</p>
          <h2 id={`${id}-title`} className={styles.title}>
            {title}
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
