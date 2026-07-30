export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    title: 'Software Engineer Intern',
    company: 'Motorola Mobility LLC',
    location: 'Chicago, IL',
    period: 'May 2026 – Present',
    bullets: [
      'Engineered a web app using React and Flask that lets 100+ Motorola staff preview on-device monetization for all products',
      'Designed a PostgreSQL schema and OAuth login flow that authenticates and tracks internal users across the Flask REST API',
      'Automated a cron-driven Python/Scraper API pipeline that surfaces product reviews from global sources into BigQuery',
      'Containerized backend services with Docker and shipped to GCP Cloud Run via gcloud CLI for a single internal endpoint',
      'Synced with SWE and PM teams in weekly Agile sprints, tracking work in Jira and managing code reviews through Git',
    ],
  },
  {
    title: 'Technical Product Management Intern',
    company: 'Motorola Mobility LLC',
    location: 'Chicago, IL',
    period: 'June 2025 – July 2025',
    bullets: [
      'Patched data migration issues and optimized UI/UX screens for Moto Migrate app, using React.js, Figma and OpenAI improving onboarding setup and data transfer experience for 4.5M+ users switching from iOS to Motorola devices', 
      'Developed a business case for a native agentic AI model unifying the Motorola/Lenovo ecosystem for 34M+ customers, earning executive approval by quantifying a $10M+ revenue opportunity and 12%+ engagement lift across product lines',
    ],
  },
  {
    title: 'Information Technology Support Specialist',
    company: 'Iowa State University',
    location: 'Ames, IA',
    period: 'January 2025 – May 2026',
    bullets: [
      'Automated recurring fixes for common device and access failures with PowerShell scripts, reducing repeat incidents 50%',
      'Debugged issues across the stack, network (Cisco DNA), identity/auth (Entra), and OS level, resolving 500+ weekly tickets',
    ],
  },
];
