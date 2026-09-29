/** Anchor props that open off-site links in a new tab; mailto/# links stay put. */
export function linkTarget(href: string) {
  return /^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}
