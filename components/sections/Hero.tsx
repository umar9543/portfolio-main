'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), { ssr: false })

const TITLES = [
  'Full-Stack Engineer',
  'React Developer',
  '.NET Developer',
  'Node.js Developer',
]

function TypewriterText() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = TITLES[index]
    const speed = isDeleting ? 60 : 100

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1800)
        return
      }
      if (isDeleting && text === '') {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % TITLES.length)
        return
      }
      setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
    }, speed)

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [text, isDeleting, index])

  return (
    <span className="text-cyan-glow">
      {text}
      <span className="animate-blink border-r-2 border-cyan ml-0.5" />
    </span>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Canvas */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-space/20 via-transparent to-space" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-space/40 via-transparent to-space/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-cyan font-dm-mono text-sm tracking-[0.3em] uppercase mb-4 opacity-80">
            👋 Hello, I&apos;m
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-space font-bold tracking-tight mb-4">
            <span
              style={{
                background: 'linear-gradient(90deg, #ffffff, rgba(255,255,255,0.75))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MUHAMMAD
            </span>
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #00F5FF, #7B2FFF, #00F5FF)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient 4s ease infinite',
              }}
            >
              UMAR
            </span>
          </h1>

          <div className="h-12 flex items-center justify-center text-xl md:text-2xl lg:text-3xl font-space text-white/80 mb-8">
            <TypewriterText />
          </div>

          <p className="text-white/60 font-inter text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Building enterprise-grade React and .NET applications from Karachi, Pakistan.
            Turning complex problems into elegant, scalable solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-xl font-space font-medium text-space bg-cyan overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-xl font-space font-medium text-white border border-white/20 backdrop-blur-sm hover:border-cyan/50 hover:bg-cyan/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.1)]"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </span>
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/30 font-dm-mono text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-cyan/50 to-transparent animate-scroll-line" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
