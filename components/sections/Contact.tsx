'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { messageSchema, MessageInput } from '@/lib/validations'

const CONTACT_INFO = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'mumer9543@gmail.com',
    href: 'mailto:mumer9543@gmail.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '+92 305 316 5854',
    href: 'tel:+923053165854',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Location',
    value: 'Karachi, Pakistan',
    href: '#',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/umar9543',
    href: 'https://github.com/umar9543',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/mumer9543',
    href: 'https://linkedin.com/in/mumer9543',
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageInput>({ resolver: zodResolver(messageSchema) })

  const onSubmit = async (data: MessageInput) => {
    setSubmitState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitState('success')
        reset()
        setTimeout(() => setSubmitState('idle'), 5000)
      } else {
        setSubmitState('error')
        setTimeout(() => setSubmitState('idle'), 4000)
      }
    } catch {
      setSubmitState('error')
      setTimeout(() => setSubmitState('idle'), 4000)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet/20 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-dm-mono text-cyan text-sm tracking-[0.3em] uppercase mb-3">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-space font-bold text-white">
            Let&apos;s <span className="text-cyan-glow">Connect</span>
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-cyan to-violet mx-auto" />
          <p className="mt-6 text-white/50 font-inter max-w-xl mx-auto">
            Have a project in mind or want to collaborate? Send me a message and I&apos;ll get back to you shortly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {CONTACT_INFO.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="glass-card flex items-center gap-4 p-4 hover:border-cyan/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan group-hover:bg-cyan/20 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white/40 font-dm-mono text-xs">{item.label}</p>
                  <p className="text-white/80 font-inter text-sm">{item.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-dm-mono text-xs text-white/50 mb-1.5">Name *</label>
                  <input
                    {...register('name')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-inter text-sm placeholder-white/20 focus:outline-none focus:border-cyan/50 focus:bg-cyan/5 transition-all"
                    placeholder="Muhammad Umar"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block font-dm-mono text-xs text-white/50 mb-1.5">Email *</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-inter text-sm placeholder-white/20 focus:outline-none focus:border-cyan/50 focus:bg-cyan/5 transition-all"
                    placeholder="hello@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block font-dm-mono text-xs text-white/50 mb-1.5">Subject *</label>
                <input
                  {...register('subject')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-inter text-sm placeholder-white/20 focus:outline-none focus:border-cyan/50 focus:bg-cyan/5 transition-all"
                  placeholder="Project collaboration"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block font-dm-mono text-xs text-white/50 mb-1.5">Message *</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-inter text-sm placeholder-white/20 focus:outline-none focus:border-cyan/50 focus:bg-cyan/5 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={submitState === 'loading'}
                whileHover={{ scale: submitState === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-space font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  submitState === 'success'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : submitState === 'error'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-cyan text-space hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] disabled:opacity-60'
                }`}
              >
                {submitState === 'loading' && (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {submitState === 'idle' && 'Send Message'}
                {submitState === 'loading' && 'Sending...'}
                {submitState === 'success' && '✓ Message Sent!'}
                {submitState === 'error' && '✗ Failed. Try again.'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
