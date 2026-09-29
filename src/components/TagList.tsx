import type { CSSProperties } from 'react';
import { techIcon } from '../lib/techIcons';
import { BrandIcon } from './BrandIcon';
import { Icon, type IconName } from './Icon';
import styles from './TagList.module.css';

interface TagListProps {
  items: string[];
  /** Trailing muted label, e.g. "+3". */
  more?: string;
  /** Shown (muted) for items with no official logo, so a row of chips stays uniform. */
  fallbackIcon?: IconName;
  className?: string;
}

export function TagList({ items, more, fallbackIcon, className }: TagListProps) {
  return (
    <ul className={[styles.list, className].filter(Boolean).join(' ')}>
      {/* data-chip + --n: tags pop in one after another when their card is revealed (global.css) */}
      {items.map((item, i) => {
        const icon = techIcon(item);
        return (
          <li key={item} className={styles.tag} data-chip style={{ '--n': i } as CSSProperties}>
            {icon ? (
              <BrandIcon icon={icon} size={14} />
            ) : (
              fallbackIcon && <Icon name={fallbackIcon} size={14} className={styles.fallback} />
            )}
            {item}
          </li>
        );
      })}
      {more && (
        <li className={styles.more} data-chip style={{ '--n': items.length } as CSSProperties}>
          {more}
        </li>
      )}
    </ul>
  );
}
