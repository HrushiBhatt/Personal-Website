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
  links?: ProjectLink[];
  githubUrl?: string;
  liveUrl?: string;
  coverImage?: string;
  coverObjectPosition?: string;
  gallery?: string[];
  featured?: boolean;
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
    coverImage: '/images/work/nerdmarket/cover.png',
    coverObjectPosition: '50% 0%',
    githubUrl: 'https://github.com/HrushiBhatt',
    links: [{ label: 'Demo video', url: 'https://youtu.be/El1KD3GnCjg' }],
    featured: true,
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
    coverImage: '/images/work/radar-robot/cover.jpg',
    githubUrl: 'https://github.com/HrushiBhatt',
    links: [{ label: 'GitHub', url: 'https://github.com/HrushiBhatt' }],
    featured: true,
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
    coverImage: '/images/work/riscv-cpu/cover.png',
    githubUrl: 'https://github.com/HrushiBhatt',
    links: [{ label: 'GitHub', url: 'https://github.com/HrushiBhatt' }],
    featured: true,
  },
  {
    slug: 'brew-focus',
    title: 'Brew Focus',
    tagline: 'A coffee-themed Pomodoro timer — watch the mug drain as you focus, with streaks, presets, and a sleek UI.',
    role: 'Solo Developer',
    category: 'Web Development',
    tech: ['JavaScript', 'HTML', 'CSS', 'Web Audio API', 'Notifications API'],
    summary:
      'A fully client-side Pomodoro timer built around a coffee mug metaphor — the mug drains as your focus session counts down. Includes session streaks, customizable time presets, ambient audio cues via the Web Audio API, and browser notification alerts when a session ends.',
    highlights: [
      'Animated coffee mug depletes in real time as the focus session counts down, giving an at-a-glance view of remaining time without reading the clock.',
      'Browser Notifications API triggers an alert when a session or break ends — even when the tab is in the background.',
      'Web Audio API generates soft chime sounds on session transitions using OscillatorNode, requiring zero external audio assets.',
      'Session streaks and preset configurations persist across page reloads via localStorage.',
    ],
    coverImage: '/images/work/brew-focus/cover.png',
    coverObjectPosition: '50% 0%',
    githubUrl: 'https://github.com/HrushiBhatt/Productivity-Manager',
    featured: true,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
