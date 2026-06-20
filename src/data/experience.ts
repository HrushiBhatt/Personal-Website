export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    title: 'Technical Product Manager Intern',
    company: 'Motorola Mobility LLC',
    location: 'Chicago, IL',
    period: 'May 2026 – Present',
    bullets: [
      'Developed a Mobile Device UI Dashboard using Python scripting, JavaScript, and Codex (GPT-5.5) deployed via AWS.',
      'Centralized all U.S. carrier-specific monetization services across Motorola devices into one auto-updating web page.',
      'Optimized RAZR upgrades by authoring PRDs, roadmaps, and market analysis, prioritizing 4 distinct software updates.',
      'Collaborated with AI engineers to test and integrate Qira\'s native agentic AI into RAZR, releasing it to 13.5 million users.',
    ],
  },
  {
    title: 'Technical Product Manager Intern',
    company: 'Motorola Mobility LLC',
    location: 'Chicago, IL',
    period: 'Jun 2025 – Jul 2025',
    bullets: [
      'Improved Moto Migrate backend via Java (Spring Boot) to resolve app, photo, and contact duplication during data migration.',
      'Benchmarked Moto AI against Google Gemini and Galaxy AI, turning research data into 3+ deployable software upgrades.',
      'Partnered with camera software and strategy teams to conduct third-party application compatibility testing for 2026 devices.',
      'Developed a business case for a first-party agentic AI assistant unifying the Motorola and Lenovo device ecosystem (Qira).',
    ],
  },
  {
    title: 'Solution Center Technical Assistant',
    company: 'Iowa State University',
    location: 'Ames, IA',
    period: 'Jan 2025 – May 2026',
    bullets: [
      'Resolved 100+ weekly hardware/software issues using diagnostic utilities and log analysis, reducing repeat incidents by 60%.',
      'Restored network outages, driver conflicts, and OS corruption using Cisco DNA software and Entra, improving MTTR.',
    ],
  },
];
