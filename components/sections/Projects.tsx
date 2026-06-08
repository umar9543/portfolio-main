'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from '@/components/ui/ProjectCard'

interface Project {
  _id: string
  title: string
  shortDesc: string
  techStack: string[]
  category: string
  githubUrl?: string
  liveUrl?: string
  thumbnail?: string
  featured: boolean
}

const CATEGORIES = ['All', 'Full-Stack', 'Frontend', 'Backend']

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filtered, setFiltered] = useState<Project[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => {
        // Guard: API may return an error object if DB isn't connected yet
        const list = Array.isArray(data) ? data : []
        setProjects(list)
        setFiltered(list)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (activeCategory === 'All') {
      setFiltered(projects)
    } else {
      setFiltered(projects.filter((p) => p.category === activeCategory))
    }
  }, [activeCategory, projects])

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-dm-mono text-cyan text-sm tracking-[0.3em] uppercase mb-3">What I&apos;ve Built</p>
          <h2 className="text-4xl md:text-5xl font-space font-bold text-white">
            Featured <span className="text-cyan-glow">Projects</span>
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-cyan to-violet mx-auto" />
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-space text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-cyan text-space shadow-[0_0_20px_rgba(0,245,255,0.4)]'
                  : 'border border-white/15 text-white/60 hover:border-cyan/40 hover:text-white/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card p-6 h-64 animate-pulse">
                <div className="w-3/4 h-5 bg-white/10 rounded mb-3" />
                <div className="w-full h-3 bg-white/5 rounded mb-2" />
                <div className="w-5/6 h-3 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-white/40 font-inter">
            {activeCategory === 'All'
              ? 'No projects yet. Connect MongoDB and run the seed endpoint.'
              : `No ${activeCategory} projects found.`}
          </div>
        ) : (
          <motion.div
            layout
            className="grid md:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
