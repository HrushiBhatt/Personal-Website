import { Icon } from '../components/Icon';
import { Section } from '../components/Section';
import { experience } from '../data/experience';
import { revealDelay } from '../hooks/useReveal';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <Section id="experience" kicker="experience" title={<>My <em>Experience</em></>}>
      <ol className={styles.timeline}>
        {experience.map((role) => (
          <li key={`${role.company}-${role.period}`} className={styles.entry}>
            <div className={styles.when} data-reveal>
              <span
                className={styles.node}
                data-current={role.period.includes('Present') || undefined}
                aria-hidden="true"
              />
              <p className={styles.year}>{role.period.match(/\d{4}/)?.[0]}</p>
              <p className={styles.period}>{role.period}</p>
            </div>

            <div className={styles.content} data-reveal style={revealDelay(100)}>
              <span className={styles.icon}>
                <Icon name={role.icon} size={26} />
              </span>
              <div>
                <h3 className={styles.title}>{role.title}</h3>
                <p className={styles.company}>{role.company}</p>
                <p className={styles.location}>
                  <Icon name="mapPin" size={15} /> {role.location}
                </p>
              </div>
              {role.period.includes('Present') && (
                <span className={styles.badge}>
                  <span className="pulse-dot" /> Current
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
