import { Icon } from '../components/Icon';
import { Section } from '../components/Section';
import { TagList } from '../components/TagList';
import { revealDelay } from '../hooks/useReveal';
import { profile, skills } from '../data/profile';
import { imgProps } from '../lib/picture';
import headshot from '../assets/images/headshot.jpg?responsive';
import isuLogo from '../assets/images/isu-logo.png?responsive';
import styles from './About.module.css';

const TOOL_COUNT = new Set(skills.flatMap((group) => group.items)).size;

export function About() {
  const { education } = profile;

  return (
    <Section
      id="about"
      kicker="about"
      title={
        <>
          Short <em>Profile</em>
        </>
      }
    >
      <div className={styles.profile}>
        {/* Laid out like an engineering datasheet: a captioned figure beside a spec table */}
        <figure className={styles.figure} data-reveal="left">
          <div className={styles.frame}>
            <img
              {...imgProps(headshot, '400px')}
              alt={`Portrait of ${profile.name}`}
              className={styles.photo}
              loading="lazy"
              decoding="async"
            />
            <span className={styles.corners} aria-hidden="true" />
          </div>
          <figcaption className={styles.caption}>
            <span>Fig. 01</span>
            {profile.name} · {education.location}
          </figcaption>
        </figure>

        <article className={styles.sheet} data-reveal="right">
          <header className={styles.sheetHead}>
            <div>
              <p className={styles.docLabel}>Spec sheet · Rev. {education.graduation.slice(-4)}</p>
              <h3 className={styles.name}>{profile.name}</h3>
              <p className={styles.role}>{profile.role}</p>
            </div>
            <p className={styles.status}>
              <span className="pulse-dot" /> Open to work
            </p>
          </header>

          <p className={styles.summary}>{profile.summary}</p>

          <dl className={styles.specs}>
            <div className={styles.spec}>
              <dt>
                <span>01</span>Education
              </dt>
              <dd className={styles.education}>
                <img {...imgProps(isuLogo, '40px')} alt="" className={styles.logo} loading="lazy" />
                <span>
                  <strong>{education.degree}</strong>
                  {education.school} · {education.graduation}
                </span>
              </dd>
            </div>
            <div className={styles.spec}>
              <dt>
                <span>02</span>Focus
              </dt>
              <dd>
                <TagList items={profile.focus} />
              </dd>
            </div>
            <div className={styles.spec}>
              <dt>
                <span>03</span>Seeking
              </dt>
              <dd>{profile.seeking}</dd>
            </div>
            <div className={styles.spec}>
              <dt>
                <span>04</span>Off the clock
              </dt>
              <dd>{profile.interests}</dd>
            </div>
          </dl>
        </article>
      </div>

      <div className={styles.toolbox}>
        <header className={styles.toolboxHead} data-reveal>
          <h3 className={styles.toolboxTitle}>
            My <em>Toolbox</em>
          </h3>
          <p className={styles.toolboxSub}>
            {TOOL_COUNT} technologies &amp; tools across {skills.length} areas
          </p>
        </header>

        <div className={styles.table}>
          {skills.map((group, i) => (
            <div key={group.label} className={styles.row} data-reveal style={revealDelay(i * 60)}>
              <div className={styles.rowHead}>
                <span className={styles.rowIcon}>
                  <Icon name={group.icon} size={20} />
                </span>
                <h4>{group.label}</h4>
                <span className={styles.count}>{group.items.length}</span>
              </div>
              <TagList items={group.items} fallbackIcon={group.icon} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
