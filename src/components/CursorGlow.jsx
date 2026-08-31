import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if device is touch-only
    if (window.matchMedia('(pointer: coarse)').matches) return

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const addHoverEvents = () => {
      const elements = document.querySelectorAll('a, button, input, textarea, select, .glass-card, .cyber-card')
      elements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true))
        el.addEventListener('mouseleave', () => setIsHovered(false))
      })
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    addHoverEvents()

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      
      const elements = document.querySelectorAll('a, button, input, textarea, select, .glass-card, .cyber-card')
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', () => setIsHovered(true))
        el.removeEventListener('mouseleave', () => setIsHovered(false))
      })
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Background Mouse Glow */}
      <motion.div
        className="mouse-glow"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Custom Cursor Dot */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
          width: 8,
          height: 8,
          backgroundColor: 'var(--accent-primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 10px var(--accent-glow)',
        }}
      />
      {/* Custom Cursor Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 32,
          height: 32,
          border: '1px solid rgba(0, 240, 255, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
          borderColor: isHovered ? 'var(--accent-primary)' : 'rgba(0, 240, 255, 0.5)',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
