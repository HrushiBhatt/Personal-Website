import type { IconName } from '../components/Icon';
import type { Picture } from '../lib/picture';
import frisbee from '../assets/images/frisbee.jpg?responsive';
import cycloneRacing from '../assets/images/Cyclone-Racing.jpg?responsive';

export interface LeadershipItem {
  title: string;
  org: string;
  period: string;
  icon: IconName;
  bullets: string[];
  photos?: { picture: Picture; alt: string }[];
}

export const leadership: LeadershipItem[] = [
  {
    title: 'Captain & Vice President',
    org: 'Iowa State Ultimate Frisbee Club',
    period: 'May 2024 - Present',
    icon: 'users',
    bullets: [
      'I direct operations and help players improve.',
      'I have played the sport competitively for 11 years.',
      'Middle School, High School, YCC, Club, and College.',
      'The people are the reason I stayed with it this long.',
    ],
    photos: [{ picture: frisbee, alt: 'Hrushi playing Ultimate Frisbee' }],
  },
  {
    title: 'Electrical Systems Engineer',
    org: 'Cyclone Racing Formula SAE at Iowa State',
    period: 'Aug 2023 - May 2024',
    icon: 'bolt',
    bullets: [
      'A student team that designs and builds a formula style race car.',
      'I worked the electrical side, mostly harness and sensors.',
      'Learned how low voltage wiring actually fails in the real world.',
      'Wired the dashboard and data acquisition for live telemetry.',
    ],
    photos: [{ picture: cycloneRacing, alt: 'Iowa State Cyclone Racing Formula SAE car at competition' }],
  },
];
