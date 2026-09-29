/** sessionStorage key; index.html reads the same key before first paint to skip the intro. */
export const INTRO_SEEN_KEY = 'intro-seen';

/**
 * How long the first-visit intro holds back the hero (the --intro-offset CSS variable):
 * about 1.45s on a first visit, 0 on repeat visits or with reduced motion.
 */
export function introOffsetMs(): number {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--intro-offset').trim();
  const amount = parseFloat(value) || 0;
  return value.endsWith('ms') ? amount : amount * 1000;
}
