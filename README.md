# hrushibhatt.com

Personal portfolio for Hrushi Bhatt — Computer Engineering at Iowa State University. The site leads with projects and experience; it's designed for desktop screens.

## Stack

- **React 19 + TypeScript**, built with **Vite 8**
- **CSS Modules** with design tokens in `src/styles/global.css` (navy + orange, JetBrains Mono); no UI framework or animation library
- **vite-imagetools** — photos are resized and converted to WebP at build time
- **Prerendered HTML** — the page is rendered to static markup at build time, then hydrated
- **Official tool logos** from [Simple Icons](https://simpleicons.org) (CC0) and [Devicon](https://devicon.dev) (MIT), vendored in `src/lib/`
- Contact form via [Web3Forms](https://web3forms.com), with a honeypot and a client-side rate limit

## Structure

```
src/
  data/          # All site content: profile, experience, leadership, projects
  sections/      # Page sections: Hero, Projects, Experience, About, Leadership, Contact
  components/    # Shared UI: Header, Intro, ProjectCard, ProjectDialog, TagList, …
  hooks/         # useReveal (scroll fade-in)
  lib/           # Helpers: responsive images, links, intro timing, tool logos
  styles/        # Global tokens and base styles
  assets/images/ # Source photos (optimized at build time)
scripts/
  prerender.js   # Bakes the rendered page into dist/index.html
```

## Setup

```bash
npm install
cp .env.example .env   # then add your Web3Forms access key
```

`.env` is gitignored — keep keys there, never in the source.

## Editing content

Text lives in `src/data/*.ts`; change it there, no component edits needed.

- **Photos:** drop them in `src/assets/images/` and import with the `?responsive` suffix. File names are case-sensitive in the deploy build.
  ```ts
  import photo from '../assets/images/my-photo.jpg?responsive';
  // <img {...imgProps(photo, '600px')} alt="…" />
  ```
- **Tool logos:** a skill or project tag shows its official logo when its name is mapped in `src/lib/techIcons.ts`. To add one, copy the icon's `title`, `hex` and `path` from the `simple-icons` package into `src/lib/simpleIcons.ts`.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # type-check, build, prerender → dist/
npm run preview  # serve the production build locally
npm run lint
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main` (custom domain via `public/CNAME`).

The contact form key comes from the **`WEB3FORMS_KEY`** repository secret (Settings → Secrets and variables → Actions). Without it the site still builds, but the form tells visitors to email instead.
