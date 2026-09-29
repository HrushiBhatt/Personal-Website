import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { linkTarget } from '../lib/links';
import { Icon, type IconName } from './Icon';
import styles from './Button.module.css';

type Variant = 'primary' | 'outline' | 'ghost';

interface CommonProps {
  variant?: Variant;
  size?: 'md' | 'sm';
  /** Trailing icon; arrows nudge in their direction on hover. */
  icon?: IconName;
  /** Leading icon, e.g. a brand mark. */
  leadingIcon?: IconName;
  children: ReactNode;
}

type AnchorProps = CommonProps & ComponentPropsWithoutRef<'a'> & { href: string };
type NativeButtonProps = CommonProps & ComponentPropsWithoutRef<'button'> & { href?: undefined };

/** Renders an <a> when given `href`, otherwise a <button>. */
export function Button(props: AnchorProps | NativeButtonProps) {
  const { variant = 'primary', size = 'md', icon, leadingIcon, children, className, ...rest } = props;
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ');
  const content = (
    <>
      {leadingIcon && <Icon name={leadingIcon} size={16} />}
      <span>{children}</span>
      {icon && <Icon name={icon} size={16} className={styles.trailing} />}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a className={classes} data-icon={icon} {...linkTarget(rest.href)} {...(rest as ComponentPropsWithoutRef<'a'>)}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} data-icon={icon} {...(rest as ComponentPropsWithoutRef<'button'>)}>
      {content}
    </button>
  );
}
