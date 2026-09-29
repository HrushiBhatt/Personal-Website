import { profile } from '../data/profile';
import { Icon } from './Icon';
import { SocialLinks } from './SocialLinks';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.brand}>
            {profile.name}
            <span>.</span>
          </p>
          {/* Year is baked in at build time; the client may be in a later year */}
          <p className={styles.meta} suppressHydrationWarning>
            © {new Date().getFullYear()} · Designed &amp; built by {profile.name.split(' ')[0]}
          </p>
        </div>

        <SocialLinks size="sm" />

        <a href="#top" className={styles.top}>
          Back to top <Icon name="arrowUp" size={15} />
        </a>
      </div>
    </footer>
  );
}
