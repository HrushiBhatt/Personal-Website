import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: EASE, delay },
});

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">

      {/* Background — lighter overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/background.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/45 via-[#0A0A0A]/30 to-[#0A0A0A]" />
      </div>

      {/* Content — upper-left, elements center-aligned within the block */}
      <div className="relative z-10 flex flex-col min-h-screen pt-16">
        <motion.div
          className="w-1/2 flex flex-col items-center text-center ml-[5vw]"
          style={{ marginTop: '12.2vh' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          {/* Name — 3D stacked drop-shadows, slight opacity reduction */}
          <motion.h1 {...fade(0.08)}
            className="text-[5.26rem] sm:text-[6.37rem] lg:text-[8.45rem] font-bold tracking-tight leading-[0.88] gradient-text mb-6"
            style={{
              opacity: 0.87,
              filter: [
                'drop-shadow(1px 2px 0px rgba(0,5,20,0.80))',
                'drop-shadow(2px 4px 0px rgba(0,5,20,0.60))',
                'drop-shadow(3px 6px 0px rgba(0,5,20,0.40))',
                'drop-shadow(5px 9px 3px rgba(0,5,20,0.22))',
                'drop-shadow(7px 12px 8px rgba(0,5,20,0.10))',
              ].join(' '),
            }}>
            Hrushi Bhatt
          </motion.h1>

          {/* Role */}
          <motion.p {...fade(0.18)}
            className="font-mono text-white/90 tracking-wide mb-9"
            style={{ fontSize: '17.7px' }}>
            B.S. in Computer Engineering
          </motion.p>

          {/* CTAs */}
          <motion.div {...fade(0.30)} className="flex flex-wrap gap-3 justify-center">
            {/* See My Work — dark gray glass pill */}
            <a href="#projects"
              className="px-7 py-3 rounded-lg text-base font-semibold text-white transition-all duration-200"
              style={{
                background: 'rgba(10,10,10,0.55)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(20,20,20,0.70)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(10,10,10,0.55)')}>
              See my work
            </a>

            {/* Get In Touch — light gray gradient glass pill */}
            <a href="#connect"
              className="px-7 py-3 rounded-lg text-base font-semibold text-white transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.07) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.22)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.13) 100%)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.07) 100%)')}>
              Get in touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-6 sm:left-10 lg:left-16 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[9px] tracking-widest uppercase text-white/30">scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-5 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
