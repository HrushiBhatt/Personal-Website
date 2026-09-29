import { useState, type AnimationEvent, type CSSProperties } from 'react';
import { profile } from '../data/profile';
import { INTRO_SEEN_KEY } from '../lib/intro';
import styles from './Intro.module.css';

/**
 * First-visit intro: the name rises in over a filling progress line, then the panel lifts
 * away like a curtain. The timing is pure CSS so it plays from the prerendered HTML before
 * any JavaScript loads; JS only removes it afterwards and remembers it for the session.
 * Skipped on repeat visits (index.html adds .intro-seen) and for reduced motion (CSS).
 */
export function Intro() {
  const [done, setDone] = useState(false);

  // On repeat visits it's already display:none via .intro-seen, so it just stays hidden.
  if (done) return null;

  const finish = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return; // a child's animation bubbling up
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      // Storage unavailable (private mode): the intro simply plays again next time.
    }
    setDone(true);
  };

  return (
    <div className={styles.intro} aria-hidden="true" onAnimationEnd={finish}>
      <div className={styles.content}>
        <p className={styles.name}>
          {[...profile.name].map((char, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties}>
              {char === ' ' ? ' ' : char}
            </span>
          ))}
          <span className={styles.dot} style={{ '--i': profile.name.length + 2 } as CSSProperties}>
            .
          </span>
        </p>
        <div className={styles.meta}>
          <span>{profile.role}</span>
          <span className={styles.counter} />
        </div>
        <div className={styles.bar}>
          <span />
        </div>
      </div>
    </div>
  );
}
