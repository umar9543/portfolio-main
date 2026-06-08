'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let animationId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      animationId = requestAnimationFrame(animate)
    }

    const onMouseEnterLink = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(2.5)'
      dot.style.background = '#7B2FFF'
      ring.style.transform = 'translate(-50%, -50%) scale(1.6)'
      ring.style.borderColor = '#7B2FFF'
    }

    const onMouseLeaveLink = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
      dot.style.background = '#00F5FF'
      ring.style.transform = 'translate(-50%, -50%) scale(1)'
      ring.style.borderColor = '#00F5FF'
    }

    const addLinkListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }

    // Hide default cursor only while this component is mounted (public portfolio)
    document.body.classList.add('custom-cursor-active')

    document.addEventListener('mousemove', onMouseMove)
    animationId = requestAnimationFrame(animate)
    addLinkListeners()

    const observer = new MutationObserver(addLinkListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.classList.remove('custom-cursor-active')
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animationId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-cyan -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-[transform,background] duration-150"
        style={{ top: 0, left: 0 }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full border border-cyan -translate-x-1/2 -translate-y-1/2 transition-[transform,border-color] duration-300"
        style={{ top: 0, left: 0 }}
      />
    </>
  )
}
