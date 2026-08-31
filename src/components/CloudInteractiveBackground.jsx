import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, Activity, Cpu, Server, Radio, Zap, Layers, RefreshCw } from 'lucide-react'

export default function CloudInteractiveBackground() {
  const canvasRef = useRef(null)
  const [stats, setStats] = useState({ nodes: 32, packets: 0, latency: 14, mode: 'MESH_ACTIVE' })
  const [showControls, setShowControls] = useState(false)
  const [isDark, setIsDark] = useState(false)

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
      radius: 200,
      active: false,
    }

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    // Shockwave packet burst on click
    const handleMouseClick = (e) => {
      const clickX = e.clientX
      const clickY = e.clientY
      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - clickX
        const dy = nodes[i].y - clickY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 320) {
          packets.push({
            startX: clickX,
            startY: clickY,
            currentX: clickX,
            currentY: clickY,
            endX: nodes[i].x,
            endY: nodes[i].y,
            progress: 0,
            speed: 0.035 + Math.random() * 0.025,
            color: isDark ? '#f472b6' : '#ec4899',
            size: 3.2,
          })
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('click', handleMouseClick)

    // Node Types & Labels for Cloud Engineering
    const nodeTypes = [
      { type: 'aws', label: 'AWS us-east-1', colorDark: '#a78bfa', colorLight: '#7c3aed', icon: '☁' },
      { type: 'gcp', label: 'GCP europe-west', colorDark: '#60a5fa', colorLight: '#3b82f6', icon: '🌐' },
      { type: 'k8s', label: 'K8s Cluster', colorDark: '#34d399', colorLight: '#10b981', icon: '⎈' },
      { type: 'iot', label: 'ESP32 Edge Gateway', colorDark: '#fb7185', colorLight: '#f43f5e', icon: '⚡' },
      { type: 'lambda', label: 'Serverless Lambda', colorDark: '#fbbf24', colorLight: '#f59e0b', icon: 'λ' },
      { type: 'db', label: 'Postgres Distributed', colorDark: '#c084fc', colorLight: '#9333ea', icon: '🗄' },
    ]

    const nodeCount = Math.min(36, Math.max(18, Math.floor(width / 42)))
    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
      const typeObj = nodeTypes[i % nodeTypes.length]
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        baseRadius: Math.random() * 2.5 + 3,
        radius: Math.random() * 2.5 + 3,
        type: typeObj.type,
        label: typeObj.label,
        icon: typeObj.icon,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        connected: false,
      })
    }

    const packets = []
    let packetCountTracker = 0

    // Stream continuous telemetry packets
    const streamInterval = setInterval(() => {
      if (nodes.length > 1) {
        const sourceIdx = Math.floor(Math.random() * nodes.length)
        let targetIdx = Math.floor(Math.random() * nodes.length)
        while (targetIdx === sourceIdx) {
          targetIdx = Math.floor(Math.random() * nodes.length)
        }

        const source = nodes[sourceIdx]
        const target = nodes[targetIdx]
        const dist = Math.hypot(source.x - target.x, source.y - target.y)

        if (dist < 260) {
          packets.push({
            startX: source.x,
            startY: source.y,
            currentX: source.x,
            currentY: source.y,
            endX: target.x,
            endY: target.y,
            progress: 0,
            speed: 0.018 + Math.random() * 0.02,
            color: isDark ? '#a78bfa' : '#7c3aed',
            size: 2.5,
          })
        }
      }
    }, 280)

    const statsInterval = setInterval(() => {
      setStats({
        nodes: nodes.length,
        packets: packets.length + 12,
        latency: Math.floor(8 + Math.random() * 8),
        mode: mouse.active ? 'EDGE_GATEWAY_ROUTING' : 'AUTONOMOUS_MESH',
      })
    }, 1500)

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const currentDark = document.documentElement.getAttribute('data-theme') === 'dark'

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.1
      mouse.y += (mouse.targetY - mouse.y) * 0.1

      // 1. Draw subtle background coordinate grid
      ctx.strokeStyle = currentDark ? 'rgba(167, 139, 250, 0.025)' : 'rgba(124, 58, 237, 0.035)'
      ctx.lineWidth = 1
      const gridSize = 90
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

      // 2. Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Boundary physics
        node.x += node.vx
        node.y += node.vy
        if (node.x < 20 || node.x > width - 20) node.vx *= -1
        if (node.y < 20 || node.y > height - 20) node.vy *= -1

        // Mouse repulsion & interaction
        if (mouse.active) {
          const dx = node.x - mouse.x
          const dy = node.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius
            node.x += (dx / dist) * force * 1.8
            node.y += (dy / dist) * force * 1.8
          }
        }

        // Pulse animation
        node.pulse += node.pulseSpeed
        const currentPulse = Math.sin(node.pulse) * 1.5

        const typeInfo = nodeTypes.find((t) => t.type === node.type) || nodeTypes[0]
        const nodeColor = currentDark ? typeInfo.colorDark : typeInfo.colorLight

        // Node Glow Ring
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.baseRadius + 5 + currentPulse * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = currentDark
          ? `rgba(${hexToRgb(nodeColor)}, 0.08)`
          : `rgba(${hexToRgb(nodeColor)}, 0.07)`
        ctx.fill()

        // Inner Core Node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.baseRadius, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.shadowColor = nodeColor
        ctx.shadowBlur = currentDark ? 10 : 6
        ctx.fill()
        ctx.shadowBlur = 0

        // Subtle Label for select anchor nodes
        if (i % 4 === 0) {
          ctx.font = '500 9px "Space Grotesk", sans-serif'
          ctx.fillStyle = currentDark ? 'rgba(244, 244, 245, 0.45)' : 'rgba(39, 39, 42, 0.45)'
          ctx.fillText(node.label, node.x + 10, node.y + 3)
        }
      }

      // 3. Draw Inter-Node Fiber Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          const maxDist = 180
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (currentDark ? 0.28 : 0.22)
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = currentDark
              ? `rgba(167, 139, 250, ${alpha})`
              : `rgba(124, 58, 237, ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // 4. Mouse Edge Gateway Node & Connection Lines
      if (mouse.active) {
        const edgeColor = currentDark ? '#f472b6' : '#ec4899'

        // Connect mouse to nearby nodes
        for (let i = 0; i < nodes.length; i++) {
          const dx = mouse.x - nodes[i].x
          const dy = mouse.y - nodes[i].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * (currentDark ? 0.45 : 0.35)
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(nodes[i].x, nodes[i].y)
            ctx.strokeStyle = `rgba(${hexToRgb(edgeColor)}, ${alpha})`
            ctx.lineWidth = 1.4
            ctx.setLineDash([4, 4])
            ctx.stroke()
            ctx.setLineDash([])

            // Random interactive stream to cursor
            if (Math.random() < 0.03) {
              packets.push({
                startX: mouse.x,
                startY: mouse.y,
                currentX: mouse.x,
                currentY: mouse.y,
                endX: nodes[i].x,
                endY: nodes[i].y,
                progress: 0,
                speed: 0.04,
                color: edgeColor,
                size: 2.8,
              })
            }
          }
        }

        // Mouse Gateway Icon/Indicator
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${hexToRgb(edgeColor)}, 0.4)`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // 5. Draw Traveling Telemetry Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]
        p.progress += p.speed
        p.currentX = p.startX + (p.endX - p.startX) * p.progress
        p.currentY = p.startY + (p.endY - p.startY) * p.progress

        if (p.progress >= 1) {
          packets.splice(i, 1)
          continue
        }

        // Draw Packet
        ctx.beginPath()
        ctx.arc(p.currentX, p.currentY, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = currentDark ? 8 : 4
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('click', handleMouseClick)
      clearInterval(streamInterval)
      clearInterval(statsInterval)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDark])

  // Helper function for RGB extraction
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
          opacity: isDark ? 0.9 : 0.85,
        }}
      />

      {/* Ambient Gradient Background Glow Behind Canvas */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          pointerEvents: 'none',
          transition: 'background 0.5s ease',
          background: isDark
            ? `
              radial-gradient(ellipse 80% 60% at 50% -15%, rgba(124, 58, 237, 0.14) 0%, transparent 65%),
              radial-gradient(ellipse 60% 50% at 90% 70%, rgba(236, 72, 153, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse 70% 60% at 10% 85%, rgba(245, 158, 11, 0.06) 0%, transparent 60%),
              linear-gradient(180deg, #0a0a0f 0%, #101016 50%, #0a0a0f 100%)
            `
            : `
              radial-gradient(ellipse 85% 65% at 50% -15%, rgba(124, 58, 237, 0.09) 0%, transparent 65%),
              radial-gradient(ellipse 65% 55% at 90% 70%, rgba(236, 72, 153, 0.06) 0%, transparent 60%),
              radial-gradient(ellipse 75% 65% at 10% 85%, rgba(245, 158, 11, 0.05) 0%, transparent 60%),
              linear-gradient(180deg, #fafafa 0%, #f4f4f5 50%, #fafafa 100%)
            `,
        }}
      />

      {/* Floating Cloud Telemetry Status Hub */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
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
            padding: '0.45rem 0.9rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '999px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.76rem',
            fontWeight: 600,
            backdropFilter: 'blur(16px)',
            boxShadow: 'var(--shadow-md)',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-green)',
              boxShadow: '0 0 8px var(--accent-green)',
            }}
          />
          <Cloud size={13} color="var(--accent-primary)" />
          <span>Cloud Mesh: {stats.nodes} Nodes</span>
          <span style={{ color: 'var(--text-muted)' }}>• {stats.latency}ms</span>
        </button>

        {/* Extended Telemetry Drawer */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                bottom: '120%',
                right: 0,
                width: '260px',
                padding: '1.2rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
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
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  Cloud Mesh Telemetry
                </span>
                <span
                  style={{
                    color: 'var(--accent-green)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                  }}
                >
                  ● Active
                </span>
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
                  <span>Multi-Region Nodes:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{stats.nodes}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Network Fabric:</span>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Fiber Interconnect</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Edge Gateway:</span>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>Cursor Node Active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Burst Action:</span>
                  <span style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>Click Packet Wave</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: 0, lineHeight: 1.4 }}>
                Hover to route packets through your cursor gateway node. Click anywhere to trigger an instant broadcast wave.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
