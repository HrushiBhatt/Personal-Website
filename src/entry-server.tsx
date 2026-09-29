import { renderToString } from 'react-dom/server';
import { App } from './App';

/** Used at build time by scripts/prerender.js to bake the page into index.html. */
export function render() {
  return renderToString(<App />);
}
