import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, Wifi, Activity, Cpu, Server, Radio, Zap, Layers, RefreshCw } from 'lucide-react'

export default function CloudInteractiveBackground() {
  const canvasRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [stats, setStats] = useState({ nodes: 28, packets: 0, latency: 12, mode: 'MESH_ACTIVE' })
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
      radius: 190,
      active: false,
    }

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.active = true
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      mouse.active = false
      setIsHovering(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const cloudNodeNames = [
      'AWS-US-EAST-1',
      'K8S-CLUSTER-01',
      'GCP-CENTRAL1',
      'DOCKER-DAEMON',
      'EDGE-ROUTER-04',
      'IOT-GATEWAY-ESP32',
      'LAMBDA-FUNCTION',
      'REDIS-CACHE-POOL',
      'CDN-CLOUDFLARE',
      'AP-SOUTH-MUMBAI',
      'TERRAFORM-INFRA',
      'SECURITY-IAM-SEC',
    ]

    const nodeCount = Math.min(Math.floor((width * height) / 38000), 36)
    const nodes = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.5 + 2.5,
        label: cloudNodeNames[i % cloudNodeNames.length],
        type: i % 4 === 0 ? 'aws' : i % 4 === 1 ? 'k8s' : i % 4 === 2 ? 'gcp' : 'iot',
        pulse: Math.random() * Math.PI,
      })
    }

    let packets = []
    let packetCountTracker = 0

    const createBurst = (sourceX, sourceY) => {
      for (let i = 0; i < 15; i++) {
        const targetNode = nodes[Math.floor(Math.random() * nodes.length)]
        packets.push({
          startX: sourceX,
          startY: sourceY,
          endX: targetNode.x,
          endY: targetNode.y,
          progress: 0,
          speed: 0.025 + Math.random() * 0.02,
          color: isDark ? '#60a5fa' : '#3b82f6',
          size: 2.8,
        })
      }
    }

    let tick = 0
    const render = () => {
      tick++
      ctx.clearRect(0, 0, width, height)

      const currentDark = document.documentElement.getAttribute('data-theme') === 'dark'

      mouse.x += (mouse.targetX - mouse.x) * 0.1
      mouse.y += (mouse.targetY - mouse.y) * 0.1

      // 1. Telemetry grid lines
      ctx.strokeStyle = currentDark ? 'rgba(96, 165, 250, 0.02)' : 'rgba(59, 130, 246, 0.045)'
      ctx.lineWidth = 1
      const gridSize = 80
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

      // 2. Nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy
        node.pulse += 0.03

        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        if (mouse.active) {
          const dx = mouse.x - node.x
          const dy = mouse.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 0.4
            node.x -= (dx / dist) * force
            node.y -= (dy / dist) * force
          }
        }

        const nodeColor = currentDark
          ? node.type === 'aws'
            ? '#fbbf24' // Radiant Gold
            : node.type === 'k8s'
            ? '#34d399' // Emerald
            : node.type === 'gcp'
            ? '#fb7185' // Sunset Coral
            : '#f97316' // Warm Amber
          : node.type === 'aws'
          ? '#d97706' // Warm Amber
          : node.type === 'k8s'
          ? '#059669' // Emerald
          : node.type === 'gcp'
          ? '#e11d48' // Sunset Rose
          : '#ea580c' // Warm Flame

        const pulseSize = node.radius + Math.sin(node.pulse) * 2.5
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize + 4, 0, Math.PI * 2)
        ctx.fillStyle = `${nodeColor}${currentDark ? '15' : '22'}`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.shadowColor = nodeColor
        ctx.shadowBlur = currentDark ? 8 : 4
        ctx.fill()
        ctx.shadowBlur = 0

        ctx.font = '600 9px "JetBrains Mono", monospace'
        ctx.fillStyle = currentDark ? 'rgba(184, 172, 159, 0.65)' : 'rgba(99, 87, 80, 0.75)'
        ctx.fillText(node.label, node.x + 9, node.y + 3)
      })

      // 3. Connect nodes with fiber mesh
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 175

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (currentDark ? 0.22 : 0.28)
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = currentDark
              ? `rgba(251, 191, 36, ${alpha})`
              : `rgba(217, 119, 6, ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()

            if (Math.random() < 0.0035 && packets.length < 40) {
              packets.push({
                startX: nodes[i].x,
                startY: nodes[i].y,
                endX: nodes[j].x,
                endY: nodes[j].y,
                progress: 0,
                speed: 0.015 + Math.random() * 0.02,
                color: currentDark ? '#fbbf24' : '#d97706',
                size: 2.2,
              })
              packetCountTracker++
            }
          }
        }
      }

      // 4. Mouse Edge Gateway Node
      if (mouse.active) {
        const cursorColor = currentDark ? '#fb7185' : '#e11d48'
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 6.5, 0, Math.PI * 2)
        ctx.fillStyle = cursorColor
        ctx.shadowColor = cursorColor
        ctx.shadowBlur = currentDark ? 12 : 6
        ctx.fill()
        ctx.shadowBlur = 0

        nodes.forEach((node) => {
          const dx = mouse.x - node.x
          const dy = mouse.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * (currentDark ? 0.4 : 0.45)
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(node.x, node.y)
            ctx.strokeStyle = currentDark
              ? `rgba(251, 113, 133, ${alpha})`
              : `rgba(225, 29, 72, ${alpha})`
            ctx.lineWidth = 1.2
            ctx.stroke()

            if (Math.random() < 0.05 && packets.length < 50) {
              packets.push({
                startX: node.x,
                startY: node.y,
                endX: mouse.x,
                endY: mouse.y,
                progress: 0,
                speed: 0.04,
                color: currentDark ? '#fbbf24' : '#d97706',
                size: 2.5,
              })
            }
          }
        })

        ctx.font = '600 10px "JetBrains Mono", monospace'
        ctx.fillStyle = currentDark ? 'rgba(251, 191, 36, 0.9)' : 'rgba(217, 119, 6, 0.95)'
        ctx.fillText('EDGE-CURSOR-GATEWAY // ACTIVE', mouse.x + 12, mouse.y - 8)
      }

      // 5. Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]
        p.progress += p.speed

        if (p.progress >= 1) {
          packets.splice(i, 1)
          continue
        }

        const currentX = p.startX + (p.endX - p.startX) * p.progress
        const currentY = p.startY + (p.endY - p.startY) * p.progress

        ctx.beginPath()
        ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      }

      if (tick % 60 === 0) {
        setStats({
          nodes: nodeCount,
          packets: packetCountTracker,
          latency: Math.floor(8 + Math.random() * 6),
          mode: mouse.active ? 'DYNAMIC_EDGE_ROUTING' : 'MESH_MONITORING',
        })
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const handleCanvasClick = (e) => {
      createBurst(e.clientX, e.clientY)
    }
    window.addEventListener('click', handleCanvasClick)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('click', handleCanvasClick)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDark])

  return (
    <>
      {/* 1. Atmospheric Volumetric Cloud Background Layer (Warm Light Default vs Dark Cyber) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: -2,
          transition: 'background 0.4s ease',
          background: isDark
            ? `
              radial-gradient(ellipse 80% 60% at 50% -15%, rgba(251, 191, 36, 0.12) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 90% 70%, rgba(251, 113, 133, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse 70% 60% at 10% 85%, rgba(249, 115, 22, 0.08) 0%, transparent 60%),
              linear-gradient(180deg, #0d0a10 0%, #17121b 50%, #0d0a10 100%)
            `
            : `
              radial-gradient(ellipse 85% 65% at 50% -15%, rgba(217, 119, 6, 0.12) 0%, transparent 60%),
              radial-gradient(ellipse 65% 55% at 90% 70%, rgba(225, 29, 72, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse 75% 65% at 10% 85%, rgba(245, 158, 11, 0.08) 0%, transparent 60%),
              linear-gradient(180deg, #faf6f0 0%, #f3ece0 50%, #faf6f0 100%)
            `,
        }}
      />

      {/* 2. Interactive Canvas Cloud Mesh */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* 3. Floating Interactive Cloud Status HUD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          left: '1.25rem',
          zIndex: 90,
          fontFamily: 'var(--font-mono)',
        }}
      >
        <div
          onClick={() => setShowControls(!showControls)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '30px',
            padding: '0.45rem 0.95rem',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px var(--accent-glow)',
            cursor: 'pointer',
            fontSize: '0.75rem',
            color: 'var(--text-primary)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-primary)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)'
            e.currentTarget.style.transform = 'none'
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-primary)',
              boxShadow: '0 0 8px var(--accent-primary)',
              display: 'inline-block',
            }}
          />
          <Cloud size={14} color="var(--accent-primary)" />
          <span style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>CLOUD_MESH:</span>
          <span>{stats.mode}</span>
          <span style={{ color: 'var(--accent-green)', marginLeft: '0.2rem' }}>[{stats.latency}ms]</span>
        </div>

        {/* Expandable Dropup */}
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
                left: 0,
                width: '290px',
                background: 'var(--bg-card-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '1rem',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--accent-primary)', fontSize: '0.72rem', fontWeight: '700' }}>
                  // CLOUD_TELEMETRY_ENGINE
                </span>
                <span style={{ color: 'var(--accent-green)', fontSize: '0.68rem' }}>● LIVE_STREAM</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>ACTIVE_SERVERS:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{stats.nodes} Multi-Region Nodes</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>NETWORK_FIBER:</span>
                  <span style={{ color: 'var(--accent-primary)' }}>Interactive Mesh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>INTERACTION_MODE:</span>
                  <span style={{ color: 'var(--accent-green)' }}>Cursor Edge Gateway</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>CLICK_ACTION:</span>
                  <span style={{ color: 'var(--accent-purple)' }}>Packet Burst Wave</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.68rem', margin: 0, lineHeight: '1.4' }}>
                Tip: Move your cursor to route telemetry packets. Click anywhere on screen to trigger an instant broadcast wave!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
