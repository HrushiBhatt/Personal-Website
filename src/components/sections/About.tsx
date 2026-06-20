import { ScrollReveal } from '../ui/ScrollReveal';

const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const SI = 'https://cdn.simpleicons.org';

const SKILL_GROUPS: { label: string; color: string; items: { name: string; src?: string }[] }[] = [
  {
    label: 'Languages',
    color: '#60a5fa',
    items: [
      { name: 'Python',     src: `${BASE}/python/python-original.svg` },
      { name: 'Java',       src: `${BASE}/java/java-original.svg` },
      { name: 'C/C++',      src: `${BASE}/cplusplus/cplusplus-original.svg` },
      { name: 'C#',         src: `${BASE}/csharp/csharp-original.svg` },
      { name: 'JavaScript', src: `${BASE}/javascript/javascript-original.svg` },
      { name: 'TypeScript', src: `${BASE}/typescript/typescript-original.svg` },
      { name: 'HTML',       src: `${BASE}/html5/html5-original.svg` },
      { name: 'CSS',        src: `${BASE}/css3/css3-original.svg` },
      { name: 'SQL',        src: `${BASE}/postgresql/postgresql-original.svg` },
      { name: 'VHDL' },
    ],
  },
  {
    label: 'Developer Tools',
    color: '#a78bfa',
    items: [
      { name: 'React',       src: `${BASE}/react/react-original.svg` },
      { name: 'Spring Boot', src: `${BASE}/spring/spring-original.svg` },
      { name: 'AWS',         src: '/images/tech/aws.svg' },
      { name: 'GCP',         src: `${BASE}/googlecloud/googlecloud-original.svg` },
      { name: 'Docker',      src: `${BASE}/docker/docker-original.svg` },
      { name: 'MySQL',       src: `${BASE}/mysql/mysql-original.svg` },
      { name: 'Figma',       src: `${BASE}/figma/figma-original.svg` },
      { name: 'Jira',        src: `${BASE}/jira/jira-original.svg` },
      { name: 'Codex',       src: '/images/tech/codex.png' },
      { name: 'Claude Code', src: `${SI}/anthropic/ffffff` },
    ],
  },
];

export function About() {
  return (
    <section id="about" className="py-24 px-6 sm:px-10 lg:px-16 border-t border-[#2a2a2a] bg-[#0f0f0f]">

      {/* Main two-column layout */}
      <div className="grid md:grid-cols-2 gap-16 items-start mb-16">

        {/* Left — heading + bio */}
        <div>
          <ScrollReveal>
            <p className="font-mono text-xs tracking-[0.18em] text-[#3b82f6] uppercase mb-4">About</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10 gradient-text">About Me</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p className="text-[#888] leading-relaxed mb-5 text-sm">
              I'm a Senior at Iowa State pursuing a B.S. in Computer Engineering, graduating in May 2027.
              I am looking for full-time positions for new grads involving Embedded Software Engineering and AI. I've designed processors
              in VHDL, written bare-metal firmware in C for real robots, built backend
              systems used by real people, and deployed full-stack websites used by millions of people.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-[#888] leading-relaxed mb-5 text-sm">
              Currently I'm at Motorola Mobility LLC in Chicago as a Technical Product Manager Intern,
              driving AI integration and carrier-specific monetization software for the RAZR lineup. Shipping updates
              that reach millions users.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-[#888] leading-relaxed text-sm">
              Outside of work, I lead Iowa State's Ultimate Frisbee Club as VP &amp;
              Captain, member of the Computer Science & Software Engineering club, and a part
              of the Institute of Electrical & Electronics Engineers community. 
            </p>
          </ScrollReveal>
        </div>

        {/* Right — ISU logo + staggered polaroids */}
        <div>
          <ScrollReveal delay={0.08}>
            <div className="flex justify-end mb-10">
              <img src="/images/isu-logo.png" alt="Iowa State University" className="w-28 h-auto opacity-70" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <div className="flex items-start gap-5 ml-[15%]">
              <div className="rotate-[-3deg] bg-white p-3 pb-9 shadow-2xl hover:rotate-[-1.5deg] hover:scale-[1.03] transition-all duration-300 cursor-default shrink-0">
                <img src="/images/about1.jpg" alt="Seattle, Washington" className="w-48 h-56 object-cover block" />
                <p className="text-center text-[#444] font-mono text-[8px] tracking-[0.2em] uppercase mt-3">Seattle, Washington</p>
              </div>
              <div className="rotate-[2.5deg] bg-white p-3 pb-9 shadow-2xl mt-10 hover:rotate-[1deg] hover:scale-[1.03] transition-all duration-300 cursor-default shrink-0">
                <img src="/images/about2.jpg" alt="Cancun, Mexico" className="w-48 h-56 object-cover block" />
                <p className="text-center text-[#444] font-mono text-[8px] tracking-[0.2em] uppercase mt-3">Cancun, Mexico</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Tech stack — logo icons with top divider */}
      <div className="border-t border-[#2a2a2a] pt-10 space-y-8">
        {SKILL_GROUPS.map(({ label, color, items }, i) => (
          <ScrollReveal key={label} delay={0.3 + i * 0.1}>
            <div className="flex flex-wrap items-start gap-x-8 gap-y-4">

              {/* Category label */}
              <div className="flex items-center gap-2 shrink-0 w-36 pt-3.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color }}>{label}</p>
              </div>

              {/* Logo icons */}
              <div className="flex flex-wrap gap-4">
                {items.map(({ name, src }) => (
                  <div key={name} className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] border border-[#2a2a2a] group-hover:border-[#3a3a3a] transition-colors flex items-center justify-center p-2">
                      {src ? (
                        <img src={src} alt={name} className="w-full h-full object-contain" draggable={false} />
                      ) : (
                        <span className="font-mono text-[7px] text-[#888] font-bold text-center leading-tight">{name}</span>
                      )}
                    </div>
                    <span className="font-mono text-[9px] text-[#888]/60 text-center leading-tight w-14">{name}</span>
                  </div>
                ))}
              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>

    </section>
  );
}
