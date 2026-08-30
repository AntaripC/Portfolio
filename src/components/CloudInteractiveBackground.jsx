import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, Wifi, Activity, Cpu, Server, Radio, Zap, Layers, RefreshCw } from 'lucide-react'

export default function CloudInteractiveBackground() {
  const canvasRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [stats, setStats] = useState({ nodes: 28, packets: 0, latency: 12, mode: 'MESH_ACTIVE' })
  const [showControls, setShowControls] = useState(false)
  const [burstTrigger, setBurstTrigger] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Handle resize
    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Mouse coordinates
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
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

    // Cloud node labels
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

    // Create cloud infrastructure nodes
    const nodeCount = Math.min(Math.floor((width * height) / 38000), 36)
    const nodes = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.5 + 2,
        label: cloudNodeNames[i % cloudNodeNames.length],
        type: i % 4 === 0 ? 'aws' : i % 4 === 1 ? 'k8s' : i % 4 === 2 ? 'gcp' : 'iot',
        color:
          i % 4 === 0
            ? '#00f0ff' // Cyan (AWS/Cloud)
            : i % 4 === 1
            ? '#10b981' // Green (Kubernetes)
            : i % 4 === 2
            ? '#a855f7' // Purple (GCP/Serverless)
            : '#38bdf8', // Azure/IoT
        pulse: Math.random() * Math.PI,
        connectedTo: [],
      })
    }

    // Packet transmission queue
    let packets = []
    let packetCountTracker = 0

    // Burst packet helper
    const createBurst = (sourceX, sourceY) => {
      for (let i = 0; i < 15; i++) {
        const targetNode = nodes[Math.floor(Math.random() * nodes.length)]
        packets.push({
          x: sourceX,
          y: sourceY,
          targetNode,
          progress: 0,
          speed: 0.02 + Math.random() * 0.02,
          color: '#00f0ff',
          size: 2.5,
        })
      }
    }

    // Animation Loop
    let tick = 0
    const render = () => {
      tick++
      ctx.clearRect(0, 0, width, height)

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1
      mouse.y += (mouse.targetY - mouse.y) * 0.1

      // 1. Draw subtle cloud telemetry grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.015)'
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

      // 2. Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy
        node.pulse += 0.03

        // Screen boundary bounce
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        // Mouse interaction: slight deflection / gravity
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

        // Draw node pulse halo
        const pulseSize = node.radius + Math.sin(node.pulse) * 2.5
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize + 4, 0, Math.PI * 2)
        ctx.fillStyle = `${node.color}10`
        ctx.fill()

        // Draw node core
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.shadowColor = node.color
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw node cloud label (subtle monospace text)
        ctx.font = '9px "JetBrains Mono", monospace'
        ctx.fillStyle = 'rgba(148, 163, 184, 0.45)'
        ctx.fillText(node.label, node.x + 8, node.y + 3)
      })

      // 3. Connect nodes with dynamic cloud fiber mesh
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 170

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()

            // Randomly spawn data packet traveling between connected nodes
            if (Math.random() < 0.003 && packets.length < 40) {
              packets.push({
                startX: nodes[i].x,
                startY: nodes[i].y,
                endX: nodes[j].x,
                endY: nodes[j].y,
                progress: 0,
                speed: 0.015 + Math.random() * 0.02,
                color: nodes[i].color,
                size: 2,
              })
              packetCountTracker++
            }
          }
        }
      }

      // 4. Mouse as a Cloud Edge Gateway Node
      if (mouse.active) {
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = '#00f0ff'
        ctx.shadowColor = '#00f0ff'
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0

        // Connect cursor to surrounding nodes with high-speed cyber lines
        nodes.forEach((node) => {
          const dx = mouse.x - node.x
          const dy = mouse.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.35
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(node.x, node.y)
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`
            ctx.lineWidth = 1.2
            ctx.stroke()

            // Spawn fast telemetry particle towards cursor
            if (Math.random() < 0.05 && packets.length < 50) {
              packets.push({
                startX: node.x,
                startY: node.y,
                endX: mouse.x,
                endY: mouse.y,
                progress: 0,
                speed: 0.04,
                color: '#10b981',
                size: 2.2,
              })
            }
          }
        })

        // Draw cursor node indicator label
        ctx.font = '10px "JetBrains Mono", monospace'
        ctx.fillStyle = 'rgba(0, 240, 255, 0.75)'
        ctx.fillText('EDGE-CURSOR-GATEWAY // ACTIVE', mouse.x + 12, mouse.y - 8)
      }

      // 5. Update and render active data packets
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

      // Periodic state telemetry update
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

    // Handle user click to trigger cloud burst
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
  }, [])

  return (
    <>
      {/* 1. Atmospheric Volumetric Cloud Background Layer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: -2,
          background: `
            radial-gradient(ellipse 80% 60% at 50% -15%, rgba(0, 240, 255, 0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 70%, rgba(16, 185, 129, 0.04) 0%, transparent 60%),
            radial-gradient(ellipse 70% 60% at 10% 85%, rgba(168, 85, 247, 0.04) 0%, transparent 60%),
            linear-gradient(180deg, #030712 0%, #060b17 50%, #030712 100%)
          `,
        }}
      />

      {/* 2. Interactive Canvas Cloud Mesh & Telemetry Pipeline */}
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

      {/* 3. Floating Interactive Cloud Status HUD (Bottom-Left) */}
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
            background: 'rgba(3, 7, 18, 0.85)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '30px',
            padding: '0.45rem 0.95rem',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.12)',
            cursor: 'pointer',
            fontSize: '0.75rem',
            color: 'var(--text-primary)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-cyan)'
            e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.25)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.12)'
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-cyan)',
              boxShadow: '0 0 8px var(--accent-cyan)',
              display: 'inline-block',
            }}
          />
          <Cloud size={14} color="var(--accent-cyan)" />
          <span style={{ fontWeight: '600', color: 'var(--accent-cyan)' }}>CLOUD_MESH:</span>
          <span>{stats.mode}</span>
          <span style={{ color: 'var(--accent-green)', marginLeft: '0.2rem' }}>[{stats.latency}ms]</span>
        </div>

        {/* Expandable Cloud Controls Dropup */}
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
                width: '280px',
                background: 'rgba(6, 11, 24, 0.95)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                borderRadius: '10px',
                padding: '1rem',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 240, 255, 0.15)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--accent-cyan)', fontSize: '0.72rem', fontWeight: '700' }}>
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
                  <span style={{ color: 'var(--accent-cyan)' }}>Interactive Mesh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>INTERACTION_MODE:</span>
                  <span style={{ color: 'var(--accent-green)' }}>Cursor Edge Gateway</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>CLICK_INTERACTION:</span>
                  <span style={{ color: '#a855f7' }}>Packet Burst Wave</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.68rem', margin: 0, lineHeight: '1.4' }}>
                Tip: Move your cursor to route packets. Click anywhere on screen to trigger an instant packet broadcast wave!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
