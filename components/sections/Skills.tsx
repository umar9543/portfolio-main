'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    color: 'cyan' as const,
    skills: [
      { name: 'React.js', level: 5 },
      { name: 'Next.js', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'JavaScript ES6+', level: 5 },
      { name: 'Tailwind CSS', level: 5 },
      { name: 'Material UI', level: 4 },
      { name: 'HTML5 / CSS3', level: 5 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    color: 'violet' as const,
    skills: [
      { name: 'ASP.NET Core (C#)', level: 5 },
      { name: 'Node.js', level: 4 },
      { name: 'Express.js', level: 4 },
      { name: 'REST APIs', level: 5 },
      { name: 'PHP', level: 3 },
      { name: 'Python', level: 3 },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    color: 'cyan' as const,
    skills: [
      { name: 'SQL Server', level: 5 },
      { name: 'MongoDB', level: 4 },
      { name: 'Firebase', level: 3 },
      { name: 'PostgreSQL', level: 3 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    color: 'violet' as const,
    skills: [
      { name: 'Git / GitHub', level: 5 },
      { name: 'Cloudinary', level: 4 },
      { name: 'Stripe', level: 4 },
      { name: 'Sanity CMS', level: 3 },
      { name: 'React Hook Form', level: 5 },
      { name: 'Framer Motion', level: 4 },
    ],
  },
]

const ALL_SKILLS_MARQUEE = [
  'React.js', 'Next.js', 'TypeScript', 'ASP.NET Core', 'Node.js', 'MongoDB',
  'SQL Server', 'Tailwind CSS', 'Express.js', 'Git', 'Stripe', 'Firebase',
  'Framer Motion', 'REST APIs', 'C#', 'JavaScript', 'Material UI', 'Three.js',
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProficiencyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          className={`w-1.5 h-1.5 rounded-full transition-all ${
            dot <= level
              ? 'bg-cyan shadow-[0_0_6px_rgba(0,245,255,0.8)]'
              : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  )
}

function SkillCard({ category, index }: { category: typeof CATEGORIES[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const isCyan = category.color === 'cyan'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-2xl overflow-hidden"
    >
      {/* Animated border glow */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: isCyan
            ? 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(123,47,255,0.08))'
            : 'linear-gradient(135deg, rgba(123,47,255,0.15), rgba(0,245,255,0.08))',
          boxShadow: isCyan
            ? '0 0 40px rgba(0,245,255,0.12), inset 0 0 40px rgba(0,245,255,0.04)'
            : '0 0 40px rgba(123,47,255,0.12), inset 0 0 40px rgba(123,47,255,0.04)',
        }}
      />

      {/* Card content */}
      <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 h-full backdrop-blur-sm group-hover:border-white/[0.15] transition-all duration-500">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isCyan
                ? 'bg-cyan/10 text-cyan group-hover:bg-cyan/20 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]'
                : 'bg-violet/10 text-violet group-hover:bg-violet/20 group-hover:shadow-[0_0_20px_rgba(123,47,255,0.2)]'
            }`}
          >
            {category.icon}
          </div>
          <div>
            <p className="font-dm-mono text-[10px] tracking-[0.25em] uppercase text-white/30 mb-0.5">
              Category
            </p>
            <h3
              className={`font-space font-bold text-base ${
                isCyan ? 'text-cyan' : 'text-violet'
              }`}
            >
              {category.label}
            </h3>
          </div>
          {/* Skill count badge */}
          <div className="ml-auto">
            <span className="font-dm-mono text-xs text-white/20 border border-white/10 px-2 py-0.5 rounded-full">
              {category.skills.length}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`h-px mb-5 transition-all duration-500 ${
            hovered
              ? isCyan
                ? 'bg-gradient-to-r from-cyan/40 via-violet/20 to-transparent'
                : 'bg-gradient-to-r from-violet/40 via-cyan/20 to-transparent'
              : 'bg-white/5'
          }`}
        />

        {/* Skills list */}
        <ul className="space-y-3">
          {category.skills.map((skill, i) => (
            <motion.li
              key={skill.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.04 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-1 h-1 rounded-full ${
                    isCyan ? 'bg-cyan/60' : 'bg-violet/60'
                  }`}
                />
                <span className="font-inter text-sm text-white/70 group-hover:text-white/90 transition-colors">
                  {skill.name}
                </span>
              </div>
              <ProficiencyDots level={skill.level} />
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...ALL_SKILLS_MARQUEE, ...ALL_SKILLS_MARQUEE]

  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-3 shrink-0"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="shrink-0 px-4 py-2 rounded-full font-dm-mono text-xs border border-white/10 bg-white/[0.04] text-white/50 hover:text-white hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-300 whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Section top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-dm-mono text-cyan text-sm tracking-[0.3em] uppercase mb-3">
            What I Work With
          </p>
          <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-4">
            Technical{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #00F5FF, #7B2FFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Expertise
            </span>
          </h2>
          <p className="text-white/40 font-inter text-base max-w-md mx-auto">
            A curated stack of technologies I use to build robust, scalable applications.
          </p>
          <div className="mt-5 w-16 h-0.5 bg-gradient-to-r from-cyan to-violet mx-auto" />
        </motion.div>

        {/* Single marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-14"
        >
          <MarqueeRow />
        </motion.div>

        {/* Category skill cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.id} category={cat} index={i} />
          ))}
        </div>

        {/* Bottom legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-10 text-white/25 font-dm-mono text-xs"
        >
          <span>Proficiency:</span>
          {['Learning', 'Familiar', 'Proficient', 'Advanced', 'Expert'].map((label, i) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(dot => (
                  <div key={dot} className={`w-1 h-1 rounded-full ${dot <= i + 1 ? 'bg-cyan/60' : 'bg-white/10'}`} />
                ))}
              </div>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
