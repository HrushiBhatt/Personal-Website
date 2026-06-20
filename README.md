# hrushibhatt.com

Personal portfolio site for Hrushi Bhatt — Computer Engineering student at Iowa State University and TPM Intern at Motorola Mobility.

Live at **[hrushibhatt.com](https://hrushibhatt.com)**

## Tech Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite 8** — build tooling
- **Tailwind CSS v4** — utility-first styling via `@theme` tokens
- **Framer Motion** — animations and scroll-triggered reveals
- **React Router v7** — client-side routing
- **Web3Forms** — serverless contact form delivery

## Project Structure

```
src/
  components/
    layout/       # Nav, Footer
    sections/     # Hero, About, Projects, Experience, Connect
    ui/           # ScrollReveal, shared primitives
  data/           # projects.ts, experience.ts
  pages/          # ProjectDetail
public/
  images/         # Local assets (gitignored — add your own)
```

## Getting Started

```bash
npm install
npm run dev
```

```bash
npm run build   # production build → dist/
npm run preview # preview the build locally
```

## Notes

- `public/images/` is gitignored — image assets are not committed to source control.
- Contact form uses [Web3Forms](https://web3forms.com) with client-side rate limiting (3 submissions/hr) and honeypot spam protection.
- Deployed via GitHub Pages with a custom domain (`CNAME`).
