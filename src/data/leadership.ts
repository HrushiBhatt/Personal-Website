export interface LeadershipItem {
  title: string;
  org: string;
  period: string;
  bullets: string[];
}

export const leadership: LeadershipItem[] = [
  {
    title: 'Vice President & Captain',
    org: 'Iowa State Ultimate Frisbee Club',
    period: 'May 2024 – Present',
    bullets: [
      'Lead a 76-member competitive club — logistics, travel coordination, sponsorships, fundraising, and recruitment.',
      'Organize practices, tournaments, and season planning across fall and spring competitive seasons.',
    ],
  },
  {
    title: 'Electrical Systems Engineer',
    org: 'Formula SAE — Iowa State',
    period: 'Aug 2023 – May 2024',
    bullets: [
      'Built and tested the low-voltage wiring harness and sensor integration to pass technical inspection.',
      'Wired the dashboard and data-acquisition systems capturing live telemetry during competition runs.',
    ],
  },
];
