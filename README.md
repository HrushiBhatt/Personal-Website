# hrushibhatt.com

Personal portfolio for Hrushi Bhatt — Computer Engineering at Iowa State University, Software Engineer Intern at Motorola Mobility.

## Stack

- **React 19 + TypeScript**, built with **Vite 8**
- **CSS Modules** with a small set of design tokens (`src/styles/global.css`), no UI framework
- **vite-imagetools** — photos are resized and converted to WebP at build time
- **Prerendered HTML** — the page is rendered to static markup at build time, then hydrated
- Self-hosted fonts: Cormorant Garamond (display) + Inter (text)
- Contact form via [Web3Forms](https://web3forms.com), with a honeypot and a client-side rate limit

## Structure

```
src/
  data/         # All site content: profile, experience, leadership, projects
  sections/     # Page sections: Hero, About, Experience, Projects, Contact
  components/   # Shared UI: Header, Footer, Button, Section, ProjectCard, ProjectDialog, …
  hooks/        # useReveal (scroll fade-in)
  lib/          # Small helpers (responsive images, link targets)
  styles/       # Global tokens and base styles
  assets/images # Source photos (optimized at build time)
scripts/
  prerender.js  # Bakes the rendered page into dist/index.html
```

## Editing content

Text lives in `src/data/*.ts`. Change it there; no component edits needed.

To add a photo, drop it in `src/assets/images/` and import it with the `?responsive` suffix:

```ts
import photo from '../assets/images/my-photo.jpg?responsive';
// <img {...imgProps(photo, '(max-width: 860px) 100vw, 600px')} alt="…" />
```

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check, build, prerender → dist/
npm run preview  # serve the production build locally
npm run lint
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main` (custom domain via `CNAME`).
