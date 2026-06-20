import { ScrollReveal } from '../ui/ScrollReveal';
import { leadership } from '../../data/leadership';

export function Leadership() {
  return (
    <section id="leadership" className="py-32 px-6 bg-[#0f0f1a]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="section-label mb-4">Leadership</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8e6f0] tracking-tight mb-16">
            Beyond the code
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {leadership.map((item, i) => (
            <ScrollReveal key={item.org} delay={i * 0.08}>
              <div className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#08080f] p-7">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#818cf8] mb-3">
                  {item.period}
                </p>
                <h3 className="text-base font-semibold text-[#e8e6f0] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#9590a8] mb-4">{item.org}</p>
                <ul className="space-y-2">
                  {item.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3 text-sm text-[#9590a8] leading-relaxed">
                      <span className="text-[#818cf8] mt-1 shrink-0">—</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
