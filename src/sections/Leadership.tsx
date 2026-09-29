import { Icon } from '../components/Icon';
import { Section } from '../components/Section';
import { leadership } from '../data/leadership';
import { revealDelay } from '../hooks/useReveal';
import { imgProps } from '../lib/picture';
import styles from './Leadership.module.css';

const photos = leadership.flatMap((item) => (item.photos ?? []).map((photo) => ({ ...photo, org: item.org, icon: item.icon })));

export function Leadership() {
  return (
    <Section id="leadership" kicker="leadership" title={<>Leadership and <em>Interests</em></>}>
      <ul className={styles.grid}>
        {leadership.map((item, i) => (
          <li key={item.org} className={styles.card} data-reveal style={revealDelay(i * 100)}>
            <div className={styles.top}>
              <span className={styles.icon}>
                <Icon name={item.icon} size={26} />
              </span>
              {item.period.includes('Present') && (
                <span className={styles.badge}>
                  <span className="pulse-dot" /> Current
                </span>
              )}
            </div>
            <p className={styles.period}>{item.period}</p>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.org}>{item.org}</p>
            <ul className={styles.bullets}>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {photos.length > 0 && (
        <div className={styles.photos}>
          {photos.map((photo, i) => (
            <figure
              key={photo.picture.img.src}
              className={styles.photo}
              data-reveal
              style={revealDelay(i * 100)}
            >
              <img {...imgProps(photo.picture, '600px')} alt={photo.alt} loading="lazy" decoding="async" />
              <figcaption className={styles.caption}>
                <Icon name={photo.icon} size={14} /> {photo.org}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </Section>
  );
}
