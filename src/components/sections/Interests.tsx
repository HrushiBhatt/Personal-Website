import { ScrollReveal } from '../ui/ScrollReveal';

const INTERESTS = [
  {
    img: '/images/frisbee.jpg',
    alt: 'Hrushi playing Ultimate Frisbee',
    label: 'Ultimate Frisbee',
    caption: 'VP & Captain, Iowa State Club — 76 members, competitive travel tournaments',
  },
  {
    img: '/images/hongkong.jpg',
    alt: 'Hrushi at Victoria Peak, Hong Kong',
    label: 'Travel',
    caption: 'Finding the most interesting corner of every city',
  },
  {
    img: '/images/boating.jpg',
    alt: 'Hrushi on a speedboat',
    label: 'Being on the water',
    caption: 'Best thinking happens at speed',
  },
];

export function Interests() {
  return (
    <section id="interests" className="py-28 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="section-label mb-5">Interests</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Outside the work
          </h2>
          <p className="text-white/40 mb-14 max-w-md leading-relaxed">
            The people and places that shape how I think.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-5">
          {INTERESTS.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-[#111]">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{item.caption}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
