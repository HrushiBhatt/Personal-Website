import { ScrollReveal } from '../ui/ScrollReveal';
import { motion } from 'framer-motion';
import { experience } from '../../data/experience';

export function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6 border-t border-[#2a2a2a] overflow-hidden">
      {/* Earth background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/images/earth.jpg" alt="" className="w-full h-full object-cover object-center" draggable={false} />
        <div className="absolute inset-0 bg-[#0A0A0A]/35" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.18em] text-[#3b82f6] uppercase mb-4">Experience</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-14 gradient-text">
            Where I've worked
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-[#3b82f6]/40 via-[#6366f1]/20 to-transparent hidden md:block" />

          <div className="space-y-8 md:pl-10">
            {experience.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[41px] top-2 w-2.5 h-2.5 rounded-full border border-[#3b82f6]/50 bg-[#0A0A0A] group-hover:border-[#3b82f6] group-hover:bg-[#3b82f6]/20 transition-all hidden md:block" />

                  <div className="rounded-xl border border-[#2a2a2a] bg-[#141414] p-6 hover:border-[#3b82f6]/25 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-base font-semibold text-[#F0F0F0]">{item.title}</h3>
                        <p className="text-sm text-[#3b82f6] font-medium mt-0.5">{item.company}</p>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <span className="font-mono text-[11px] text-[#888]/60 block">{item.period}</span>
                        <span className="font-mono text-[10px] text-[#888]/40">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
