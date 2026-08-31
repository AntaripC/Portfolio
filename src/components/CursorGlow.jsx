import React, { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const ripplesContainerRef = useRef(null)

  useEffect(() => {
    // Disable on coarse touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    const ripplesContainer = ripplesContainerRef.current

    if (!dot || !ring || !glow) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let isHovered = false
    let isClicked = false
    let isVisible = false
    let magneticTarget = null
    let animId

    // Direct 60/144Hz high-precision mouse tracking
    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        dot.style.opacity = '1'
        ring.style.opacity = '0.9'
        glow.style.opacity = '0.5'
      }

      // Zero-latency instant position for core dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      dot.style.setProperty('--cursor-x', `${mouseX}px`)
      dot.style.setProperty('--cursor-y', `${mouseY}px`)

      // Glow follower
      glow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`
    }

    const onMouseDown = (e) => {
      isClicked = true
      ring.classList.add('active')

      // Emit click shockwave ripple
      if (ripplesContainer) {
        const ripple = document.createElement('div')
        ripple.className = 'cursor-click-ripple'
        ripple.style.setProperty('--rx', `${e.clientX}px`)
        ripple.style.setProperty('--ry', `${e.clientY}px`)
        ripplesContainer.appendChild(ripple)
        setTimeout(() => ripple.remove(), 550)
      }
    }

    const onMouseUp = () => {
      isClicked = false
      ring.classList.remove('active')
    }

    const onMouseLeave = () => {
      isVisible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
      glow.style.opacity = '0'
    }

    const onMouseEnter = () => {
      isVisible = true
      dot.style.opacity = '1'
      ring.style.opacity = '0.9'
      glow.style.opacity = '0.5'
    }

    // Fast delegated hover detector
    const handleMouseOver = (e) => {
      const target = e.target
      const interactiveEl = target.closest('a, button, input, textarea, .tag, .btn, .glass-card, [role="button"]')

      if (interactiveEl) {
        isHovered = true
        dot.classList.add('hover')
        ring.classList.add('hover')

        // Check if small element for magnetic snap
        const rect = interactiveEl.getBoundingClientRect()
        if (rect.width < 160 && rect.height < 80) {
          magneticTarget = {
            centerX: rect.left + rect.width / 2,
            centerY: rect.top + rect.height / 2,
          }
        } else {
          magneticTarget = null
        }
      } else {
        isHovered = false
        magneticTarget = null
        dot.classList.remove('hover')
        ring.classList.remove('hover')
      }
    }

    // Ultra-smooth requestAnimationFrame spring loop
    const render = () => {
      let targetX = mouseX
      let targetY = mouseY

      // Magnetic bias if over a button or pill
      if (magneticTarget && isHovered) {
        targetX = mouseX + (magneticTarget.centerX - mouseX) * 0.35
        targetY = mouseY + (magneticTarget.centerY - mouseY) * 0.35
      }

      // Smooth lerp damping
      ringX += (targetX - ringX) * 0.22
      ringY += (targetY - ringY) * 0.22

      const scale = isClicked ? 0.7 : isHovered ? 1.75 : 1
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`

      animId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter, { passive: true })

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
  }, []) // Empty dependency array ensures zero listener re-attachment stutters

  return (
    <>
      {/* Ambient background glow follower */}
      <div ref={glowRef} className="mouse-glow" />

      {/* Ripple container */}
      <div ref={ripplesContainerRef} style={{ pointerEvents: 'none' }} />

      {/* Zero-latency core dot */}
      <div ref={dotRef} className="custom-cursor-dot" />

      {/* Spring magnetic follower ring */}
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  )
}
