import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, Zap, Radio, RefreshCw, Layers, Sparkles, Orbit, Activity } from 'lucide-react'

export default function CloudInteractiveBackground() {
  const canvasRef = useRef(null)
  const [stats, setStats] = useState({ nodes: 36, packets: 0, latency: 12, mode: 'EDGE_ROUTER' })
  const [activeMode, setActiveMode] = useState('EDGE_ROUTER') // EDGE_ROUTER | GRAVITY_WELL | HYPER_DRIVE
  const [showControls, setShowControls] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const activeModeRef = useRef(activeMode)

  useEffect(() => {
    activeModeRef.current = activeMode
  }, [activeMode])

  // Track theme changes
  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      setIsDark(theme === 'dark')
    }
    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 220,
      active: false,
      isDown: false,
      draggedNode: null,
      speedX: 0,
      speedY: 0,
      lastX: width / 2,
      lastY: height / 2,
    }

    // Node Types & Infrastructure Labels
    const nodeTypes = [
      { type: 'aws', label: 'AWS us-east-1', sub: 'VPC 10.0.0.0/16', colorDark: '#fbbf24', colorLight: '#d97706', icon: '☁' },
      { type: 'iot', label: 'ESP32 Telemetry', sub: 'AS7262 Sensor Node', colorDark: '#fb7185', colorLight: '#e11d48', icon: '⚡' },
      { type: 'gcp', label: 'GCP europe-west', sub: 'BigQuery / Storage', colorDark: '#f97316', colorLight: '#ea580c', icon: '🌐' },
      { type: 'k8s', label: 'K8s Cluster', sub: 'Microservices Pods', colorDark: '#34d399', colorLight: '#059669', icon: '⎈' },
      { type: 'lambda', label: 'Serverless Lambda', sub: 'Event Mesh Gateway', colorDark: '#f59e0b', colorLight: '#b45309', icon: 'λ' },
      { type: 'db', label: 'Postgres Core', sub: 'Multi-AZ Sharded', colorDark: '#c084fc', colorLight: '#9333ea', icon: '🗄' },
    ]

    const nodeCount = Math.min(38, Math.max(20, Math.floor(width / 40)))
    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
      const typeObj = nodeTypes[i % nodeTypes.length]
      nodes.push({
        id: i,
        x: Math.random() * (width - 80) + 40,
        y: Math.random() * (height - 80) + 40,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        baseRadius: Math.random() * 2.5 + 3.2,
        type: typeObj.type,
        label: typeObj.label,
        sub: typeObj.sub,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.025 + Math.random() * 0.02,
        isHovered: false,
      })
    }

    const packets = []
    const sparks = []
    const trails = []

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.active = true

      mouse.speedX = e.clientX - mouse.lastX
      mouse.speedY = e.clientY - mouse.lastY
      mouse.lastX = e.clientX
      mouse.lastY = e.clientY

      // Mouse fluid trail particles
      if (Math.hypot(mouse.speedX, mouse.speedY) > 3) {
        trails.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3 + 2,
          life: 1,
          decay: 0.04,
          color: isDark ? '#fbbf24' : '#d97706',
        })
      }

      // Check node hover & drag
      if (mouse.draggedNode) {
        mouse.draggedNode.x = e.clientX
        mouse.draggedNode.y = e.clientY
        mouse.draggedNode.vx = 0
        mouse.draggedNode.vy = 0
      } else {
        for (let i = 0; i < nodes.length; i++) {
          const dist = Math.hypot(nodes[i].x - e.clientX, nodes[i].y - e.clientY)
          nodes[i].isHovered = dist < 25
        }
      }
    }

    const handleMouseDown = (e) => {
      mouse.isDown = true
      // Check if clicking a node to drag
      for (let i = 0; i < nodes.length; i++) {
        const dist = Math.hypot(nodes[i].x - e.clientX, nodes[i].y - e.clientY)
        if (dist < 30) {
          mouse.draggedNode = nodes[i]
          break
        }
      }

      // Explosive click spark burst
      for (let i = 0; i < 18; i++) {
        const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.4
        const speed = Math.random() * 4 + 2.5
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.025 + Math.random() * 0.02,
          color: i % 2 === 0 ? (isDark ? '#fbbf24' : '#d97706') : (isDark ? '#fb7185' : '#e11d48'),
          size: Math.random() * 3 + 2,
        })
      }

      // Shockwave burst packets to all connected nodes
      for (let i = 0; i < nodes.length; i++) {
        const dist = Math.hypot(nodes[i].x - e.clientX, nodes[i].y - e.clientY)
        if (dist < 360) {
          packets.push({
            startX: e.clientX,
            startY: e.clientY,
            currentX: e.clientX,
            currentY: e.clientY,
            endX: nodes[i].x,
            endY: nodes[i].y,
            progress: 0,
            speed: 0.045 + Math.random() * 0.03,
            color: isDark ? '#fb7185' : '#e11d48',
            size: 3.4,
          })
        }
      }
    }

    let lastScrollY = window.scrollY
    let scrollVelocity = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      scrollVelocity = (currentScrollY - lastScrollY) * 0.12
      lastScrollY = currentScrollY

      // Add directional drift to nodes on scroll
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].y -= scrollVelocity * 0.4
        // Wrap around vertically
        if (nodes[i].y < -20) nodes[i].y = height + 20
        if (nodes[i].y > height + 20) nodes[i].y = -20
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Continuous Telemetry Streamer
    const streamInterval = setInterval(() => {
      if (nodes.length > 1) {
        const rate = activeModeRef.current === 'HYPER_DRIVE' ? 4 : 2
        for (let k = 0; k < rate; k++) {
          const sourceIdx = Math.floor(Math.random() * nodes.length)
          let targetIdx = Math.floor(Math.random() * nodes.length)
          while (targetIdx === sourceIdx) {
            targetIdx = Math.floor(Math.random() * nodes.length)
          }

          const source = nodes[sourceIdx]
          const target = nodes[targetIdx]
          const dist = Math.hypot(source.x - target.x, source.y - target.y)

          if (dist < 280) {
            packets.push({
              startX: source.x,
              startY: source.y,
              currentX: source.x,
              currentY: source.y,
              endX: target.x,
              endY: target.y,
              progress: 0,
              speed: (activeModeRef.current === 'HYPER_DRIVE' ? 0.04 : 0.02) + Math.random() * 0.02,
              color: isDark ? '#fbbf24' : '#d97706',
              size: 2.6,
            })
          }
        }
      }
    }, 220)

    const statsInterval = setInterval(() => {
      setStats({
        nodes: nodes.length,
        packets: packets.length + 16,
        latency: Math.floor(6 + Math.random() * 8),
        mode: activeModeRef.current,
      })
    }, 1200)

    // Main 60FPS Canvas Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const currentDark = document.documentElement.getAttribute('data-theme') === 'dark'

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.14
      mouse.y += (mouse.targetY - mouse.y) * 0.14

      // 1. Subtle warm background coordinate grid
      ctx.strokeStyle = currentDark ? 'rgba(251, 191, 36, 0.03)' : 'rgba(217, 119, 6, 0.045)'
      ctx.lineWidth = 1
      const gridSize = 85
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // 2. Render Mouse Fluid Trail Sparks
      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i]
        t.x += t.vx
        t.y += t.vy
        t.life -= t.decay

        if (t.life <= 0) {
          trails.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(t.x, t.y, t.size * t.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${hexToRgb(t.color)}, ${t.life * 0.6})`
        ctx.fill()
      }

      // 3. Render Click Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vx *= 0.95
        s.vy *= 0.95
        s.life -= s.decay

        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2)
        ctx.fillStyle = s.color
        ctx.shadowColor = s.color
        ctx.shadowBlur = currentDark ? 8 : 4
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // 4. Update and Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        if (node !== mouse.draggedNode) {
          node.x += node.vx
          node.y += node.vy

          // Bounds bounce
          if (node.x < 30 || node.x > width - 30) node.vx *= -1
          if (node.y < 30 || node.y > height - 30) node.vy *= -1

          // Mouse Physics based on Active Mode
          if (mouse.active) {
            const dx = node.x - mouse.x
            const dy = node.y - mouse.y
            const dist = Math.hypot(dx, dy)

            if (activeModeRef.current === 'GRAVITY_WELL') {
              // Gravitational attraction vortex
              if (dist < mouse.radius * 1.5 && dist > 20) {
                const force = ((mouse.radius * 1.5 - dist) / (mouse.radius * 1.5)) * 0.08
                node.vx -= (dx / dist) * force
                node.vy -= (dy / dist) * force
                // Swirl perpendicular
                node.vx += (-dy / dist) * 0.4
                node.vy += (dx / dist) * 0.4
              }
            } else {
              // Standard edge router repulsion
              if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius
                node.x += (dx / dist) * force * 2.2
                node.y += (dy / dist) * force * 2.2
              }
            }
          }
        }

        // Pulse calculation
        node.pulse += node.pulseSpeed
        const currentPulse = Math.sin(node.pulse) * 1.8

        const typeInfo = nodeTypes.find((t) => t.type === node.type) || nodeTypes[0]
        const nodeColor = currentDark ? typeInfo.colorDark : typeInfo.colorLight

        // Node Outer Beacon Aura
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.baseRadius + 6 + currentPulse * 1.5 + (node.isHovered ? 8 : 0), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${hexToRgb(nodeColor)}, ${node.isHovered ? 0.25 : 0.08})`
        ctx.fill()

        // Node Inner Core
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.baseRadius + (node.isHovered ? 2 : 0), 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.shadowColor = nodeColor
        ctx.shadowBlur = currentDark ? 12 : 6
        ctx.fill()
        ctx.shadowBlur = 0

        // Hover or Key Anchor Label
        if (node.isHovered || i % 4 === 0) {
          ctx.font = '600 10px "Space Grotesk", sans-serif'
          ctx.fillStyle = currentDark ? '#fdfaf6' : '#261e1b'
          ctx.fillText(node.label, node.x + 12, node.y + 3)

          if (node.isHovered) {
            ctx.font = '500 8.5px "JetBrains Mono", monospace'
            ctx.fillStyle = nodeColor
            ctx.fillText(node.sub, node.x + 12, node.y + 15)
          }
        }
      }

      // 5. Draw Inter-Node Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)

          const maxDist = 190
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (currentDark ? 0.32 : 0.25)
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = currentDark
              ? `rgba(251, 191, 36, ${alpha})`
              : `rgba(217, 119, 6, ${alpha})`
            ctx.lineWidth = 1.1
            ctx.stroke()
          }
        }
      }

      // 6. Interactive Cursor Laser Connections
      if (mouse.active) {
        const edgeColor = currentDark ? '#fb7185' : '#e11d48'

        for (let i = 0; i < nodes.length; i++) {
          const dist = Math.hypot(mouse.x - nodes[i].x, mouse.y - nodes[i].y)

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * (currentDark ? 0.55 : 0.4)
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(nodes[i].x, nodes[i].y)
            ctx.strokeStyle = `rgba(${hexToRgb(edgeColor)}, ${alpha})`
            ctx.lineWidth = 1.6
            ctx.setLineDash([5, 5])
            ctx.stroke()
            ctx.setLineDash([])

            // Stream packets on interaction
            if (Math.random() < 0.04) {
              packets.push({
                startX: mouse.x,
                startY: mouse.y,
                currentX: mouse.x,
                currentY: mouse.y,
                endX: nodes[i].x,
                endY: nodes[i].y,
                progress: 0,
                speed: 0.045,
                color: edgeColor,
                size: 2.8,
              })
            }
          }
        }

        // Mouse Gateway Ring
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${hexToRgb(edgeColor)}, 0.45)`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      // 7. Draw Telemetry Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]
        p.progress += p.speed
        p.currentX = p.startX + (p.endX - p.startX) * p.progress
        p.currentY = p.startY + (p.endY - p.startY) * p.progress

        if (p.progress >= 1) {
          packets.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.currentX, p.currentY, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = currentDark ? 10 : 5
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(streamInterval)
      clearInterval(statsInterval)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDark])

  function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `${r}, ${g}, ${b}`
  }

  return (
    <>
      {/* Background Interactive Mesh Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: isDark ? 0.95 : 0.9,
        }}
      />

      {/* Ambient Warm Gradient Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          pointerEvents: 'none',
          transition: 'background 0.5s ease',
          background: isDark
            ? `
              radial-gradient(ellipse 80% 60% at 50% -15%, rgba(251, 191, 36, 0.16) 0%, transparent 65%),
              radial-gradient(ellipse 60% 50% at 90% 70%, rgba(251, 113, 133, 0.12) 0%, transparent 60%),
              radial-gradient(ellipse 70% 60% at 10% 85%, rgba(249, 115, 22, 0.1) 0%, transparent 60%),
              linear-gradient(180deg, #0e0b12 0%, #16111e 50%, #0e0b12 100%)
            `
            : `
              radial-gradient(ellipse 85% 65% at 50% -15%, rgba(217, 119, 6, 0.12) 0%, transparent 65%),
              radial-gradient(ellipse 65% 55% at 90% 70%, rgba(225, 29, 72, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse 75% 65% at 10% 85%, rgba(245, 158, 11, 0.07) 0%, transparent 60%),
              linear-gradient(180deg, #faf6f0 0%, #f3ece0 50%, #faf6f0 100%)
            `,
        }}
      />

      {/* Interactive Telemetry Control Hub */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 90,
        }}
      >
        <button
          onClick={() => setShowControls(!showControls)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '999px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.78rem',
            fontWeight: 700,
            backdropFilter: 'blur(16px)',
            boxShadow: 'var(--shadow-md), var(--shadow-glow)',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-primary)',
              boxShadow: '0 0 10px var(--accent-primary)',
              animation: 'pulse-soft 2s infinite ease-in-out',
            }}
          />
          <Cloud size={14} color="var(--accent-primary)" />
          <span>Interactive Mesh ({stats.nodes} Nodes)</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>• {stats.latency}ms</span>
        </button>

        {/* Extended Interactive Drawer */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                bottom: '125%',
                right: 0,
                width: '280px',
                padding: '1.25rem',
                background: 'var(--bg-card-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                backdropFilter: 'blur(24px)',
                boxShadow: 'var(--shadow-xl), var(--shadow-glow)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.85rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '0.5rem',
                }}
              >
                <span
                  style={{
                    color: 'var(--accent-primary)',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  Mesh Interaction Controls
                </span>
                <span
                  style={{
                    color: 'var(--accent-green)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                  }}
                >
                  ● Online
                </span>
              </div>

              {/* Mode Selectors */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', display: 'block', marginBottom: '0.4rem' }}>
                  PHYSICS INTERACTION MODE:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
                  {[
                    { id: 'EDGE_ROUTER', label: 'Router', icon: <Radio size={11} /> },
                    { id: 'GRAVITY_WELL', label: 'Gravity', icon: <Orbit size={11} /> },
                    { id: 'HYPER_DRIVE', label: 'Hyper', icon: <Zap size={11} /> },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveMode(m.id)}
                      style={{
                        padding: '0.35rem 0.4rem',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        borderRadius: '8px',
                        border: activeMode === m.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        background: activeMode === m.id ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                        color: activeMode === m.id ? '#fff' : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Active Streams:</span>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{stats.packets} Packets/s</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Latency:</span>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>{stats.latency} ms</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: 0, lineHeight: 1.45 }}>
                ✨ <strong>Interactive gestures:</strong> Drag any node to reposition, move cursor to route data beams, click anywhere to trigger a particle shockwave!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
