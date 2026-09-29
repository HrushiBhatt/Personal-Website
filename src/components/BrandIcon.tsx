import { iconColor, type BrandIconData } from '../lib/techIcons';

/** An official product logo, drawn in its brand colour (or white if too dark to see on navy). */
export function BrandIcon({ icon, size = 16 }: { icon: BrandIconData; size?: number }) {
  const paths = Array.isArray(icon.path) ? icon.path : [icon.path];

  return (
    <svg
      viewBox={icon.viewBox ?? '0 0 24 24'}
      width={size}
      height={size}
      fill={iconColor(icon.hex)}
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
    </svg>
  );
}
