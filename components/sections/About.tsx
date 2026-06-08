'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Stats ────────────────────────────────────────────────────────────────────

const STATS = [
  {
    value: 2, suffix: '+', label: 'Years Experience',
    icon: '🚀', desc: 'Building production apps',
    color: 'cyan',
  },
  {
    value: 10, suffix: '+', label: 'Projects Delivered',
    icon: '📦', desc: 'End-to-end solutions',
    color: 'violet',
  },
  {
    value: 6, suffix: '+', label: 'ERP Modules',
    icon: '⚙️', desc: 'Enterprise systems built',
    color: 'cyan',
  },
  {
    value: 25, suffix: '+', label: 'People Mentored',
    icon: '🎓', desc: 'At Aptech Institute',
    color: 'violet',
  },
]

// ─── What I Do cards ─────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Frontend Development',
    desc: 'Pixel-perfect UIs with React, Next.js & TypeScript. Responsive, accessible, and blazing fast.',
    tags: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: 'Backend & APIs',
    desc: 'Scalable REST APIs using ASP.NET Core and Node.js with SQL Server and MongoDB.',
    tags: ['ASP.NET Core', 'Node.js', 'SQL Server', 'MongoDB'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'ERP Systems',
    desc: 'Complex enterprise modules — inventory, contracts, HR — built to handle real business scale.',
    tags: ['ERP', 'Modules', 'Workflows', 'Enterprise'],
  },
]

// ─── CountUp ─────────────────────────────────────────────────────────────────

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 50
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 30)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-dm-mono text-cyan text-sm tracking-[0.3em] uppercase mb-3">Get To Know Me</p>
          <h2 className="text-4xl md:text-5xl font-space font-bold text-white">
            About <span className="text-cyan-glow">Me</span>
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-cyan to-violet mx-auto" />
        </motion.div>

        {/* Top: Bio + Stats */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-white/90 font-inter text-lg leading-relaxed">
              Full-stack Software Engineer with{' '}
              <span className="text-cyan font-semibold">2+ years of experience</span>{' '}
              building enterprise-grade React and .NET applications.
            </p>
            <p className="text-white/60 font-inter leading-relaxed">
              I specialize in ERP and CMS systems — designing end-to-end solutions
              that streamline complex business workflows. My stack spans{' '}
              <span className="text-violet font-medium">React.js, Next.js, ASP.NET Core</span>, and{' '}
              <span className="text-violet font-medium">SQL Server</span>.
            </p>
            <p className="text-white/60 font-inter leading-relaxed">
              Outside of client work, I mentored{' '}
              <span className="text-cyan font-medium">25+ students</span>{' '}
              at Aptech — designing curriculum covering modern JavaScript, React, and full-stack development.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['React.js', 'Next.js', 'ASP.NET Core', 'TypeScript', 'SQL Server', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-xs font-dm-mono text-cyan border border-cyan/20 bg-cyan/5 hover:bg-cyan/10 hover:border-cyan/40 transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 mt-4 px-5 py-2.5 rounded-xl border border-cyan/30 text-cyan font-space text-sm hover:bg-cyan/10 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </motion.a>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="grid grid-cols-2 gap-3"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative group rounded-2xl overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl ${
                  stat.color === 'cyan'
                    ? 'bg-gradient-to-br from-cyan/10 to-transparent'
                    : 'bg-gradient-to-br from-violet/10 to-transparent'
                }`} />
                <div className={`relative h-full bg-white/[0.03] border rounded-2xl p-5 transition-all duration-300 ${
                  stat.color === 'cyan'
                    ? 'border-white/8 group-hover:border-cyan/30'
                    : 'border-white/8 group-hover:border-violet/30'
                }`}>
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className={`text-3xl font-space font-bold mb-1 ${
                    stat.color === 'cyan' ? 'text-cyan' : 'text-violet'
                  }`} style={{ textShadow: stat.color === 'cyan' ? '0 0 20px rgba(0,245,255,0.4)' : '0 0 20px rgba(123,47,255,0.4)' }}>
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/70 font-space text-sm font-medium">{stat.label}</p>
                  <p className="text-white/30 font-inter text-xs mt-0.5">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom: What I Do */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="font-dm-mono text-white/30 text-xs tracking-[0.25em] uppercase text-center mb-6">
            What I Do
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-cyan/25 hover:bg-white/[0.05] transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-cyan/10 text-cyan flex items-center justify-center mb-4 group-hover:bg-cyan/20 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.15)] transition-all duration-300">
                  {svc.icon}
                </div>
                <h3 className="font-space font-semibold text-white text-sm mb-2">{svc.title}</h3>
                <p className="text-white/45 font-inter text-xs leading-relaxed mb-3">{svc.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {svc.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-dm-mono text-white/30 border border-white/10 px-2 py-0.5 rounded-md bg-white/3">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
