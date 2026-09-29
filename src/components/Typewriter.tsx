import { useEffect, useRef, useState } from 'react';
import { introOffsetMs } from '../lib/intro';
import styles from './Typewriter.module.css';

const TYPE_MS = 75;
const DELETE_MS = 40;
const HOLD_MS = 1800;
const PAUSE_MS = 350;

interface TypewriterProps {
  /** Keep this array stable (e.g. a module constant); it's an effect dependency. */
  words: string[];
}

/**
 * Types each word out, holds it, backspaces it, then moves on to the next — forever.
 * Starts with the first word fully written so the prerendered HTML isn't empty.
 * Screen readers get the whole list once instead of the churning letters.
 */
export function Typewriter({ words }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);
  const firstHold = useRef(true);

  useEffect(() => {
    const word = words[index];
    const nextIndex = (index + 1) % words.length;
    let delay: number;
    let advance: () => void;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // No typing animation: just swap whole words.
      delay = HOLD_MS + 1000;
      advance = () => {
        setIndex(nextIndex);
        setLength(words[nextIndex].length);
      };
    } else if (!deleting && length === word.length) {
      // The very first word also waits out the intro, so it's on screen for the full hold.
      delay = HOLD_MS + (firstHold.current ? introOffsetMs() : 0);
      advance = () => {
        firstHold.current = false;
        setDeleting(true);
      };
    } else if (deleting && length === 0) {
      delay = PAUSE_MS;
      advance = () => {
        setDeleting(false);
        setIndex(nextIndex);
      };
    } else {
      delay = deleting ? DELETE_MS : TYPE_MS;
      advance = () => setLength(length + (deleting ? -1 : 1));
    }

    const timer = setTimeout(advance, delay);
    return () => clearTimeout(timer);
  }, [words, index, length, deleting]);

  return (
    <>
      <span className="visually-hidden">{words.join(', ')}</span>
      <span aria-hidden="true">
        {words[index].slice(0, length)}
        <span className={styles.caret} />
      </span>
    </>
  );
}
