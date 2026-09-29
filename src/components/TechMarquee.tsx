import { skills } from '../data/profile';
import { techIcon } from '../lib/techIcons';
import { BrandIcon } from './BrandIcon';
import styles from './TechMarquee.module.css';

const ITEMS = [...new Set(skills.flatMap((group) => group.items))];

/** Endless ticker of every technology in the toolbox. Decorative: the same list is in About. */
export function TechMarquee() {
  return (
    <div className={styles.marquee} aria-hidden="true">
      {/* Two copies back to back; the track slides by exactly one copy, then loops */}
      <div className={styles.track}>
        {[...ITEMS, ...ITEMS].map((item, i) => {
          const icon = techIcon(item);
          return (
            <span key={i} className={styles.item}>
              {icon && <BrandIcon icon={icon} size={18} />}
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
