import type { Picture } from '../lib/picture';
import nerdmarketCover from '../assets/images/work/nerdmarket/cover.png?responsive';
import radarRobotCover from '../assets/images/work/radar-robot/cover.jpg?responsive';
import riscvCover from '../assets/images/work/riscv-cpu/cover.png?responsive';
import brewFocusCover from '../assets/images/work/brew-focus/cover.png?responsive';

export interface ProjectMetric { label: string; value: string }
export interface ProjectLink   { label: string; url: string }

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  team?: string;
  timeframe?: string;
  category: string;
  tech: string[];
  summary: string;
  highlights: string[];
  metrics?: ProjectMetric[];
  challenges?: string[];
  githubUrl?: string;
  /** Extra links shown next to GitHub in the project details. */
  links?: ProjectLink[];
  cover: Picture;
  /** CSS object-position for the cover crop. */
  coverPosition?: string;
  /** 'contain' shows the whole cover (screenshots, diagrams) instead of cropping it to fill. */
  coverFit?: 'cover' | 'contain';
}

export const projects: Project[] = [
  {
    slug: 'nerdmarket',
    title: 'NerdMarket',
    tagline: 'Stock Market for trading cards with intuitive features such as AI card scanning, live community chats, scheduled notifications, price tracking, and collection binders',
    role: 'Backend Engineer',
    team: '4-person (2 Backend, 2 Frontend)',
    timeframe: 'Spring 2026 — COMS 3090, Iowa State',
    category: 'Full-Stack Development',
    tech: ['Java', 'Spring Boot', 'MySQL', 'Maven', 'Spring Data JPA', 'Spring WebSockets', 'Hibernate', 'Lombok', 'Swagger/OpenAPI', 'GitLab CI/CD'],
    summary:
      'A stock-market-style marketplace for Pokémon, MTG, and Yu-Gi-Oh! cards. Users track real-time prices, watch the biggest movers, manage a personal binder, and chat in card-specific rooms — all backed by a unified data pipeline aggregating three external card APIs.',
    highlights: [
      'Built an external API aggregation pipeline normalizing TCGdex, Scryfall, and YGOPRODeck into a unified Market schema — with pagination, rate limiting, and resilient per-card / per-set error handling.',
      'Designed a price-tracking analytics engine computing biggest gainers and losers across 2-day, 7-day, 21-day, and all-time windows.',
      'Implemented real-time chat over Spring STOMP WebSockets with role-based room access: rooms gated by binder ownership, plus moderator and admin rooms.',
      'Built a notification system with immediate + scheduled STOMP push, including a daily cron detecting >1% price swings on cards in a user\'s binder.',
      'Set up a GitLab CI pipeline with a self-registered shell-executor runner that builds and tests on every push.',
    ],
    githubUrl: 'https://github.com/HrushiBhatt',
    links: [{ label: 'Demo video', url: 'https://youtu.be/El1KD3GnCjg' }],
    cover: nerdmarketCover,
    coverFit: 'contain',
  },
  {
    slug: 'radar-robot',
    title: 'Autonomous Object-Mapping Robot',
    tagline: 'Roomba equipped with IR, PING, Bump, and Cliff sensors able to navigate autonomously through an object filled area and accurately detect height, width, depth, and distance of each object it sees in its path.',
    role: 'Embedded Software Engineer',
    category: 'Embedded Systems & Design',
    tech: ['C', 'ARM Cortex-M4 MCU', 'UART', 'Python', 'ADC', 'Sensors', 'TCP sockets', 'Tkinter', 'Matplotlib'],
    summary:
      'A mobile robot that sweeps its surroundings with a servo-mounted sensor array and streams live measurements to a real-time radar visualization on a laptop. The system spans bare-metal C firmware, sensor fusion, and a threaded Python GUI communicating over TCP.',
    highlights: [
      'C firmware drives a 180° servo sweep, querying IR and PING ultrasonic sensors at fixed angular increments, with cliff and bump sensors enforcing safety stops.',
      'Sensor fusion and ADC calibration convert IR voltages and ultrasonic echo times into accurate distances; tracks detections across adjacent angles to estimate object width.',
      'Streams angle/distance/width tuples over TCP to a threaded Python Tkinter/Matplotlib GUI rendering a live 180° polar radar map with keyboard control.',
    ],
    githubUrl: 'https://github.com/HrushiBhatt',
    cover: radarRobotCover,
    coverPosition: '50% 45%',
  },
  {
    slug: 'riscv-cpu',
    title: 'RISC-V Processors',
    tagline: 'Three distinct processors built and tested. Single-Cycle, Software Scheduled, and Hardware Scheduled designs.',
    role: 'Hardware Design Engineer',
    category: 'Computer Architecture',
    tech: ['Structural VHDL', 'Python Testing', 'RISC-V Assembly', 'ModelSim', 'RARS', 'Quartus'],
    summary:
      'RV32I processors built in structural VHDL from a single-cycle baseline up to a 5-stage pipeline with hardware forwarding and hazard detection. Verified cycle-accurate against the RARS reference simulator on mergesort, grendel, and control-flow benchmarks.',
    highlights: [
      'Phase 1 — Single-cycle: clean datapath/control separation, two-level decode (main + ALU control), full RV32I subset. Final grade: 99.47%.',
      'Phase 2 — 5-stage pipeline: added a forwarding unit (FWD.vhd) eliminating data hazards and a hazard-detection unit (HDU.vhd) for load-use stalls.',
      'Clock frequency improved from 26.71 MHz (single-cycle) to 40.73 MHz with hardware forwarding, and 57.24 MHz with software scheduling.',
      'Verified ModelSim waveforms against RARS instruction-level traces on all benchmark programs — all passing.',
    ],
    metrics: [
      { label: 'Single-cycle clock', value: '26.71 MHz' },
      { label: 'Pipeline + forwarding', value: '40.73 MHz' },
      { label: 'Pipeline + SW schedule', value: '57.24 MHz' },
      { label: 'CPI (hw forwarding)', value: '1.47' },
      { label: 'CPI (sw scheduled)', value: '~1.1' },
      { label: 'Single-cycle grade', value: '99.47%' },
    ],
    challenges: [
      'Eliminating forwarding path bugs that only surfaced on specific instruction sequences — required systematic ModelSim waveform analysis.',
      'Coordinating HDU stall insertion with FWD forwarding so that back-to-back load-use hazards stall exactly one cycle without corrupting pipeline state.',
    ],
    githubUrl: 'https://github.com/HrushiBhatt',
    cover: riscvCover,
    coverFit: 'contain',
  },
  {
    slug: 'brew-focus',
    title: 'Brew Focus',
    tagline: 'A retro pixel-art focus tracker whose timers run on a Go server — sessions keep brewing after the tab closes, survive restarts, and stay in sync live across every tab and device.',
    role: 'Full-Stack Developer',
    team: 'Solo',
    category: 'Full-Stack Development',
    tech: ['Go', 'Angular', 'TypeScript', 'SQLite', 'Docker', 'Server-Sent Events', 'Gin', 'GORM', 'JWT', 'Web Audio API', 'Vitest', 'GitHub Actions'],
    summary:
      'A full-stack productivity tracker styled like a pixel-art café. Focus timers run on the server instead of in the browser, so every tab and device signed in to an account watches the same clock over a Server-Sent Events stream. Tasks, custom rhythms, and an intention → breathe → focus → reflect loop feed streaks, a GitHub-style heatmap, a brew journal, and a café that fills with pixel décor — with rain, café, fireplace, and lo-fi ambience synthesized live in Web Audio.',
    highlights: [
      'Built a server-side timer engine on the actor model: each running timer is a goroutine that owns its state and selects on a command channel, its own deadline, and a shutdown context — so timer state needs no locks. Gin handlers send pause / resume / finish commands and wait on a reply channel.',
      'Wrote a pub/sub event hub behind the SSE stream: one goroutine owns the subscriber map, every client gets a bounded buffer, and a client that falls behind is dropped rather than blocking everyone else — its browser reconnects to a fresh snapshot.',
      'Made sessions crash-safe: focus blocks are written to SQLite (via GORM) when they start and on every change, and on boot the engine respawns running and paused timers, crediting any block whose deadline passed while the server was down.',
      'Built the Angular 22 frontend zoneless, with standalone components and signals; the whole session flow is driven by live events, so a reflection prompt answered in one tab closes in every other.',
      'Added accounts with bcrypt and a signed JWT in an HttpOnly cookie; middleware scopes every record to its owner, and tests confirm users can\'t reach each other\'s data.',
      'Covered the engine, hub, and API with Go tests under the race detector (50 users\' timers at once, restarts, slow clients) plus Vitest, and ship it as a multi-stage Docker image — Angular build → static Go binary → distroless, non-root — built by GitHub Actions CI.',
    ],
    metrics: [
      { label: 'Concurrent timers tested', value: '50' },
      { label: 'Go + Angular tests', value: '37' },
      { label: 'Locks on timer state', value: '0' },
    ],
    challenges: [
      'A timer\'s deadline and a user\'s command can arrive at the same moment. Routing both through the actor\'s single select loop serializes them, and a done channel keeps a command from waiting forever on a timer that has just finished.',
      'Every device has to show the same countdown. The server owns the deadline; each client corrects for its own clock skew and discards events that arrive out of order.',
      'Shutting down without losing a running session: one errgroup context stops the hub (closing every SSE stream so requests drain), the HTTP server, and every timer goroutine — whose state is already on disk for the next boot.',
    ],
    githubUrl: 'https://github.com/HrushiBhatt/Productivity-Manager',
    cover: brewFocusCover,
    coverFit: 'contain',
  },
];
