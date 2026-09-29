import type { IconName } from '../components/Icon';

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  icon: IconName;
}

export const experience: ExperienceItem[] = [
  {
    title: 'Technical Product Manager Intern',
    company: 'Motorola Mobility LLC',
    location: 'Chicago, IL',
    period: 'May 2026 – Present',
    icon: 'layers',
  },
  {
    title: 'Product Operations Engineering Intern',
    company: 'Motorola Mobility LLC',
    location: 'Chicago, IL',
    period: 'June 2025 – July 2025',
    icon: 'sliders',
  },
  {
    title: 'IT Support Specialist',
    company: 'Iowa State IT Solution Center',
    location: 'Ames, IA',
    period: 'January 2025 – May 2026',
    icon: 'headset',
  },
];
