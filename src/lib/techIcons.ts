import {
  siAngular,
  siApachemaven,
  siArduino,
  siArm,
  siC,
  siClaude,
  siCmake,
  siCplusplus,
  siCss,
  siCursor,
  siDocker,
  siFastapi,
  siFigma,
  siFlask,
  siGit,
  siGithub,
  siGitlab,
  siGnubash,
  siGoogleanalytics,
  siGooglebigquery,
  siGooglecloud,
  siHibernate,
  siHtml5,
  siIntel,
  siIntellijidea,
  siJavascript,
  siJira,
  siKotlin,
  siKubernetes,
  siLinux,
  siMariadb,
  siMongodb,
  siMysql,
  siNodedotjs,
  siNumpy,
  siOpencv,
  siOpenjdk,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siRiscv,
  siSpring,
  siSpringboot,
  siStmicroelectronics,
  siSwagger,
  siTypescript,
} from './simpleIcons';
import { AWS, MATPLOTLIB, VSCODE } from './extraIcons';

export interface BrandIconData {
  title: string;
  /** Official brand colour, without the leading #. */
  hex: string;
  path: string | string[];
  /** Simple Icons are all 24×24; Devicon logos declare their own. */
  viewBox?: string;
}

/**
 * Official logos (Simple Icons, plus a few from Devicon) keyed by the exact names used in
 * src/data. Generic concepts (protocols, SDLC, "Sensors"…) have no logo and aren't listed.
 */
const ICONS: Record<string, BrandIconData> = {
  // Languages
  Python: siPython,
  'Python Testing': siPython,
  Java: siOpenjdk,
  C: siC,
  'C++': siCplusplus,
  Kotlin: siKotlin,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  Bash: siGnubash,
  'RISC-V Assembly': siRiscv,
  HTML: siHtml5,
  CSS: siCss,
  // Frameworks & libraries
  'React.js': siReact,
  'Angular.js': siAngular,
  'Spring Boot': siSpringboot,
  'Spring Data JPA': siSpring,
  'Spring WebSockets': siSpring,
  Hibernate: siHibernate,
  Maven: siApachemaven,
  'Swagger/OpenAPI': siSwagger,
  Flask: siFlask,
  FastAPI: siFastapi,
  'Node.js': siNodedotjs,
  OpenCV: siOpencv,
  NumPy: siNumpy,
  Matplotlib: MATPLOTLIB,
  // Data & cloud
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  MongoDB: siMongodb,
  MariaDB: siMariadb,
  BigQuery: siGooglebigquery,
  'Google Cloud Platform': siGooglecloud,
  AWS,
  Docker: siDocker,
  Kubernetes: siKubernetes,
  Linux: siLinux,
  // Embedded & hardware
  STM32: siStmicroelectronics,
  STM32CubeIDE: siStmicroelectronics,
  'ARM Cortex-M4': siArm,
  'ARM Cortex-M4 MCU': siArm,
  CMake: siCmake,
  Arduino: siArduino,
  Quartus: siIntel,
  // Tools
  Git: siGit,
  GitHub: siGithub,
  GitLab: siGitlab,
  'GitLab CI/CD': siGitlab,
  Figma: siFigma,
  Jira: siJira,
  Postman: siPostman,
  Cursor: siCursor,
  'Claude Code': siClaude,
  VSCode: VSCODE,
  IntelliJ: siIntellijidea,
  'Google Analytics': siGoogleanalytics,
};

export function techIcon(name: string): BrandIconData | undefined {
  return ICONS[name];
}

// Relative luminance per WCAG, for picking a readable fill on the navy cards.
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const CARD_LUMINANCE = luminance('101E37');

/** The brand colour, or near-white when the brand colour would vanish on navy (e.g. GitHub's black). */
export function iconColor(hex: string) {
  const contrast = (luminance(hex) + 0.05) / (CARD_LUMINANCE + 0.05);
  return contrast >= 2.4 ? `#${hex}` : '#eef2f9';
}
