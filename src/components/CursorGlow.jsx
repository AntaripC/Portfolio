import React, { useEffect, useRef, useState } from 'react'

export default function CursorGlow() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let animId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${mouseX}px`
        glowRef.current.style.top = `${mouseY}px`
      }
    }

    const onMouseDown = () => setIsClicked(true)
    const onMouseUp = () => setIsClicked(false)
    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    // Check hover on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList?.contains('tag') ||
        target.classList?.contains('btn') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    // Smooth spring/lerp loop for outer ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18

      if (ringRef.current) {
        const scale = isClicked ? 0.75 : isHovered ? 1.7 : 1
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`
      }

      animId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    animId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animId)
    }
  }, [isVisible, isClicked, isHovered])

  return (
    <>
      {/* Ambient background glow follower */}
      <div ref={glowRef} className="mouse-glow" />

      {/* Interactive Cursor Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          marginTop: '-4px',
          marginLeft: '-4px',
          borderRadius: '50%',
          backgroundColor: isHovered ? 'var(--accent-secondary)' : 'var(--accent-primary)',
          boxShadow: `0 0 12px ${isHovered ? 'var(--accent-secondary)' : 'var(--accent-primary)'}`,
          pointerEvents: 'none',
          zIndex: 999999,
          opacity: isVisible ? 1 : 0,
          transition: 'background-color 0.2s ease, opacity 0.25s ease',
          willChange: 'transform',
        }}
      />

      {/* Interactive Trailing Magnetic Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          marginTop: '-18px',
          marginLeft: '-18px',
          borderRadius: '50%',
          border: `1.5px solid ${isHovered ? 'var(--accent-secondary)' : 'var(--accent-primary)'}`,
          backgroundColor: isHovered ? 'rgba(236, 72, 153, 0.12)' : 'rgba(124, 58, 237, 0.04)',
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
          boxShadow: isHovered
            ? '0 0 20px rgba(236, 72, 153, 0.35)'
            : '0 0 10px rgba(124, 58, 237, 0.15)',
          pointerEvents: 'none',
          zIndex: 999998,
          opacity: isVisible ? 0.9 : 0,
          transition: 'border-color 0.25s ease, background-color 0.25s ease, opacity 0.25s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
