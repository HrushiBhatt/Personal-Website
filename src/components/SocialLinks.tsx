import { socials } from '../data/profile';
import { linkTarget } from '../lib/links';
import { Icon } from './Icon';
import styles from './SocialLinks.module.css';

/** Row of orange-outlined circular social icons. */
export function SocialLinks({ size = 'md', className }: { size?: 'md' | 'sm'; className?: string }) {
  return (
    <ul className={[styles.list, styles[size], className].filter(Boolean).join(' ')}>
      {socials.map((social) => (
        <li key={social.label}>
          <a href={social.href} className={styles.link} aria-label={social.label} title={social.label} {...linkTarget(social.href)}>
            <Icon name={social.icon} size={size === 'md' ? 17 : 15} />
          </a>
        </li>
      ))}
    </ul>
  );
}
