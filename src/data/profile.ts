import type { IconName } from '../components/Icon';

export const profile = {
  name: 'Hrushi Bhatt',
  role: 'Computer Engineer',
  degree: 'B.S. in Computer Engineering',
  email: 'hrushibhatt@gmail.com',
  github: 'https://github.com/HrushiBhatt',
  // Short profile (About). Kept deliberately brief — each line is one row of the spec sheet.
  summary: 'Computer engineering senior building across full-stack, embedded systems, and AI/ML.',
  focus: ['Full-Stack', 'Embedded Systems', 'AI/ML'],
  seeking: 'Full-time new-grad roles',
  interests: 'Ultimate frisbee, golf, sports, and over-engineering things',
  education: {
    school: 'Iowa State University',
    degree: 'B.S. Computer Engineering',
    graduation: 'May 2027',
    location: 'Ames, IA',
  },
  contactNote: 'Open to full-time positions, project collaborations, and good conversations.',
};

export interface SkillGroup {
  label: string;
  icon: IconName;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    icon: 'code',
    items: ['Python', 'Java', 'C', 'C++', 'Kotlin', 'JavaScript', 'TypeScript', 'SQL', 'Bash', 'VHDL', 'RISC-V Assembly'],
  },
  {
    label: 'Frameworks & Libraries',
    icon: 'layers',
    items: ['React.js', 'Angular.js', 'Spring Boot', 'Flask', 'FastAPI', 'Node.js', 'OpenCV', 'NumPy', 'Matplotlib'],
  },
  {
    label: 'Data & Cloud',
    icon: 'database',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'MariaDB', 'BigQuery', 'Dataform', 'Google Cloud Platform', 'AWS', 'Docker', 'Kubernetes', 'Linux'],
  },
  {
    label: 'Embedded Systems & Hardware',
    icon: 'cpu',
    items: ['STM32', 'ARM Cortex-M4', 'FreeRTOS', 'UART', 'SPI', 'I2C', 'CAN', 'ModelSim', 'Altium Designer', 'CMake', 'Oscilloscope', 'Logic Analyzer', 'Arduino'],
  },
  {
    label: 'AI & Tools',
    icon: 'sparkles',
    items: ['Git', 'GitHub', 'GitLab', 'Figma', 'Jira', 'Postman', 'Cursor', 'Codex', 'Claude Code', 'VSCode', 'IntelliJ', 'STM32CubeIDE'],
  },
  {
    label: 'Product & Process',
    icon: 'target',
    items: ['SDLC', 'Agile/Scrum', 'Roadmapping', 'PRDs', 'A/B Testing', 'Market Research', 'Competitive Analysis', 'Google Analytics', 'Jira', 'Cross-Functional', 'Agile'],
  },
];

export interface Social {
  label: string;
  href: string;
  icon: IconName;
}

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/HrushiBhatt', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hrushibhatt', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:hrushibhatt@gmail.com', icon: 'mail' },
  { label: 'Threads', href: 'https://www.threads.com/@hrushibhatt_', icon: 'threads' },
  { label: 'Instagram', href: 'https://www.instagram.com/hrushibhatt_', icon: 'instagram' },
  { label: 'Spotify', href: 'https://open.spotify.com/user/hrushibhatt', icon: 'spotify' },
];
