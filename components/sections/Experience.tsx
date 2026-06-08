'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'

const FloatingCube = dynamic(() => import('@/components/three/FloatingCube'), { ssr: false })

const EXPERIENCES = [
  {
    company: 'Interactive Technologies Gateway',
    role: 'Software Developer — React + .NET',
    period: '2024 – Present',
    type: 'Full-Time',
    highlights: [
      'Architected full-stack ERP/CMS features, reducing manual workflows ~40%',
      'Developed 15+ RESTful APIs with ASP.NET Core Web API',
      'Built reusable React component library with Material UI, cutting UI dev time ~30%',
      'Gathered requirements from stakeholders, reduced revision cycles',
    ],
    color: 'cyan',
  },
  {
    company: 'Aptech',
    role: 'Course Instructor — Web Development',
    period: '2024 – 2025',
    type: 'Part-Time',
    highlights: [
      'Taught HTML, CSS, JavaScript, and React to 25+ students per cohort',
      'Designed curriculum, assignments, and assessments',
    ],
    color: 'violet',
  },
  {
    company: 'Coderatory | Revolution in Innovation',
    role: 'Frontend Developer — React JS',
    period: 'Jan 2023 – Jun 2023',
    type: 'Full-Time',
    highlights: [
      'Built responsive React.js UIs for client-facing applications',
      'Delivered pixel-perfect components with design and backend teams',
    ],
    color: 'cyan',
  },
  {
    company: 'Internee.pk',
    role: 'MERN Stack Developer — Internship',
    period: '2023 – 2024',
    type: 'Internship',
    highlights: [
      'Built full-stack features with MongoDB, Express, React, Node.js',
      'REST API development and frontend integration across sprints',
    ],
    color: 'violet',
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/3 to-transparent pointer-events-none" />

      {/* Decorative 3D cube */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-40 hidden lg:block">
        <FloatingCube />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-dm-mono text-cyan text-sm tracking-[0.3em] uppercase mb-3">Career Journey</p>
          <h2 className="text-4xl md:text-5xl font-space font-bold text-white">
            Work <span className="text-cyan-glow">Experience</span>
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-cyan to-violet mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan/50 via-violet/30 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-cyan bg-space mt-2 z-10">
                  <div className="absolute inset-0 rounded-full bg-cyan animate-ping opacity-30" />
                </div>

                {/* Spacer for centering on desktop */}
                <div className="hidden md:block flex-1" />

                {/* Content card */}
                <div className="flex-1 ml-10 md:ml-0">
                  <div className={`glass-card p-6 border-l-2 ${exp.color === 'cyan' ? 'border-l-cyan' : 'border-l-violet'}`}>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className="font-space font-bold text-white text-lg">{exp.role}</h3>
                      <span className={`text-xs font-dm-mono px-2 py-1 rounded ${
                        exp.type === 'Full-Time' ? 'bg-cyan/10 text-cyan border border-cyan/20' :
                        exp.type === 'Part-Time' ? 'bg-violet/10 text-violet border border-violet/20' :
                        'bg-white/5 text-white/50 border border-white/10'
                      }`}>{exp.type}</span>
                    </div>
                    <p className={`font-space font-medium text-sm mb-1 ${exp.color === 'cyan' ? 'text-cyan' : 'text-violet'}`}>
                      {exp.company}
                    </p>
                    <p className="font-dm-mono text-xs text-white/40 mb-4">{exp.period}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-white/65 font-inter text-sm">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan/60 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
