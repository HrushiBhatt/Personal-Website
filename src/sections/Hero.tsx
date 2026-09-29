import type { CSSProperties } from 'react';
import { Button } from '../components/Button';
import { CountUp } from '../components/CountUp';
import { SocialLinks } from '../components/SocialLinks';
import { Typewriter } from '../components/Typewriter';
import { profile, skills } from '../data/profile';
import { experience } from '../data/experience';
import styles from './Hero.module.css';

const ROLES = ['Computer Engineer', 'Full-Stack Developer', 'Embedded Software Engineer', 'AI Enthusiast'];

const current = experience[0];
const currentCompany = current.company.replace(/ LLC$/, '');

const TERMINAL = [
  { command: 'whoami', output: `${profile.name} · ${profile.role}` },
  { command: 'cat education.txt', output: `${profile.education.degree} @ ${profile.education.school}` },
  { command: 'cat role.txt', output: `${current.title} @ ${currentCompany}` },
  { command: 'ls focus/', output: 'full-stack/  embedded-systems/  ai-ml/', directories: true },
  { command: 'echo $STATUS', output: `open to new-grad roles · full-time` },
];

const STATS = [
  { value: experience.filter((role) => role.company.startsWith('Motorola')).length, label: 'Professional Internships' },
  { value: '20+', label: 'Projects and Deployments' },
  { value: new Set(skills.flatMap((group) => group.items)).size, label: 'Technologies & Tools Used' },
  { value: '2027', label: 'Graduation Year' },
];

/** Staggers the entrance animation of each hero element. */
const step = (i: number) => ({ '--i': i }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.role} style={step(0)}>
            <Typewriter words={ROLES} />
          </p>

          <h1 className={styles.title} style={step(1)}>
            Hello, I&rsquo;m
            <span className={styles.name}>
              Hrushi
              <br />
              Bhatt
            </span>
          </h1>

          <p className={styles.tagline} style={step(2)}>
            Android | Mobile | Web | Cloud | Big Data | Sensors | Processors | Microcontrollers
            <br />
          </p>

          <div className={styles.actions} style={step(3)}>
            <Button href="#projects" variant="outline" icon="chevronRight">
              See my work
            </Button>
            <SocialLinks />
          </div>
        </div>

        <div className={styles.terminalWrap} style={step(2)}>
          <div className={styles.terminal}>
            <div className={styles.titlebar} aria-hidden="true">
              <span className={styles.lights}>
                <i />
                <i />
                <i />
              </span>
              <span>hrushi@iowa-state: ~/portfolio</span>
            </div>
            <div className={styles.screen}>
              {TERMINAL.map((line, i) => (
                <div key={line.command} className={styles.entry} style={step(i)}>
                  <p>
                    <span className={styles.prompt}>$</span>
                    {line.command}
                  </p>
                  <p className={line.directories ? styles.directories : styles.output}>{line.output}</p>
                </div>
              ))}
              <p className={styles.entry} style={step(TERMINAL.length)}>
                <span className={styles.prompt}>$</span>
                <span className={styles.cursor} aria-hidden="true" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <dl className={styles.stats}>
          {STATS.map((stat, i) => (
            <div key={stat.label} className={styles.stat} style={step(4 + i)}>
              <dt>{stat.label}</dt>
              <dd>
                <CountUp value={stat.value} delay={500 + i * 120} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
