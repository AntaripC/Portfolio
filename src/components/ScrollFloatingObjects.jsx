import React from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Cloud, Cpu, Server, Radio, Database, Shield, Zap, Layers } from 'lucide-react'

export default function ScrollFloatingObjects() {
  const { scrollYProgress } = useScroll()

  // Smooth springs for scroll-driven animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // ── Object 1: 3D Rotating Holographic Cube (Right Side, Hero to Projects) ──
  const cubeY = useTransform(smoothProgress, [0, 0.5], ['5vh', '60vh'])
  const cubeRotateX = useTransform(smoothProgress, [0, 1], [15, 375])
  const cubeRotateY = useTransform(smoothProgress, [0, 1], [25, 420])
  const cubeScale = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8], [1, 1.2, 0.9, 0.4])
  const cubeOpacity = useTransform(smoothProgress, [0, 0.1, 0.6, 0.85], [0.85, 0.9, 0.7, 0])

  // ── Object 2: Orbital Gyroscope Rings (Left Side, About to Skills) ──
  const ringY = useTransform(smoothProgress, [0.1, 0.7], ['20vh', '80vh'])
  const ringRotate = useTransform(smoothProgress, [0, 1], [0, 720])
  const ringRotateReverse = useTransform(smoothProgress, [0, 1], [360, -360])
  const ringOpacity = useTransform(smoothProgress, [0.08, 0.2, 0.65, 0.8], [0, 0.85, 0.85, 0])

  // ── Object 3: Floating IoT Edge Shard (Right Side, Skills to Experience) ──
  const shardY = useTransform(smoothProgress, [0.35, 0.9], ['10vh', '75vh'])
  const shardRotate = useTransform(smoothProgress, [0.3, 1], [-45, 180])
  const shardOpacity = useTransform(smoothProgress, [0.3, 0.45, 0.85, 0.95], [0, 0.9, 0.9, 0])

  // ── Object 4: Floating Shield Diamond (Left Side, Certs to Contact) ──
  const shieldY = useTransform(smoothProgress, [0.6, 1], ['15vh', '70vh'])
  const shieldRotate = useTransform(smoothProgress, [0.5, 1], [0, 360])
  const shieldOpacity = useTransform(smoothProgress, [0.55, 0.7, 1], [0, 0.9, 0.9])

  // Top Page Scroll Progress Line
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      {/* ── Top Page Scroll Progress Indicator Line ── */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--gradient-aurora)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 99999,
          boxShadow: '0 0 10px var(--accent-primary)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* OBJECT 1: 3D Wireframe Holographic Cloud Cube              */}
      {/* ══════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          position: 'absolute',
          right: '4%',
          top: cubeY,
          opacity: cubeOpacity,
          scale: cubeScale,
          perspective: 1000,
        }}
      >
        <motion.div
          style={{
            width: '90px',
            height: '90px',
            position: 'relative',
            transformStyle: 'preserve-3d',
            rotateX: cubeRotateX,
            rotateY: cubeRotateY,
          }}
        >
          {/* 6 Cube Faces with Glass Borders */}
          {[
            { transform: 'translateZ(45px)', label: 'AWS', icon: <Cloud size={20} /> },
            { transform: 'rotateY(180deg) translateZ(45px)', label: 'GCP', icon: <Server size={20} /> },
            { transform: 'rotateY(-90deg) translateZ(45px)', label: 'K8s', icon: <Layers size={20} /> },
            { transform: 'rotateY(90deg) translateZ(45px)', label: 'IoT', icon: <Cpu size={20} /> },
            { transform: 'rotateX(90deg) translateZ(45px)', label: 'API', icon: <Radio size={20} /> },
            { transform: 'rotateX(-90deg) translateZ(45px)', label: 'DB', icon: <Database size={20} /> },
          ].map((face, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(251, 191, 36, 0.04)',
                border: '1.5px solid rgba(251, 191, 36, 0.35)',
                borderRadius: '16px',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
                boxShadow: 'inset 0 0 15px rgba(251, 191, 36, 0.1)',
                transform: face.transform,
              }}
            >
              {face.icon}
              <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginTop: '2px' }}>
                {face.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* OBJECT 2: Dual Concentric Orbital Gyroscope Rings          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          position: 'absolute',
          left: '3%',
          top: ringY,
          opacity: ringOpacity,
        }}
      >
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          {/* Outer Ring */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px dashed rgba(244, 63, 94, 0.4)',
              boxShadow: '0 0 20px rgba(244, 63, 94, 0.15)',
              rotate: ringRotate,
            }}
          >
            {/* Satellite Dot */}
            <div
              style={{
                position: 'absolute',
                top: '-4px',
                left: '50%',
                marginLeft: '-4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent-secondary)',
                boxShadow: '0 0 10px var(--accent-secondary)',
              }}
            />
          </motion.div>

          {/* Inner Counter-Rotating Ring */}
          <motion.div
            style={{
              position: 'absolute',
              inset: '18px',
              borderRadius: '50%',
              border: '1.5px solid rgba(251, 191, 36, 0.45)',
              boxShadow: '0 0 15px rgba(251, 191, 36, 0.15)',
              rotate: ringRotateReverse,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={22} color="var(--accent-primary)" />
          </motion.div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* OBJECT 3: Floating IoT Edge Shard                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          position: 'absolute',
          right: '5%',
          top: shardY,
          rotate: shardRotate,
          opacity: shardOpacity,
        }}
      >
        <div
          style={{
            padding: '0.8rem 1.2rem',
            background: 'var(--bg-card-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            backdropFilter: 'blur(16px)',
            boxShadow: 'var(--shadow-lg), 0 0 25px rgba(251, 113, 133, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <Cpu size={20} color="var(--accent-secondary)" />
          <div>
            <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>
              ESP32 Telemetry
            </div>
            <div style={{ fontSize: '0.64rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>
              ● 240MHz Active
            </div>
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* OBJECT 4: Floating Shield Diamond                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          position: 'absolute',
          left: '4%',
          top: shieldY,
          opacity: shieldOpacity,
        }}
      >
        <motion.div
          style={{
            width: '75px',
            height: '75px',
            borderRadius: '20px',
            background: 'rgba(251, 191, 36, 0.08)',
            border: '1.5px solid var(--border-color)',
            backdropFilter: 'blur(12px)',
            boxShadow: 'var(--shadow-md), 0 0 25px var(--accent-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            rotate: shieldRotate,
          }}
        >
          <Shield size={32} color="var(--accent-primary)" />
        </motion.div>
      </motion.div>
    </div>
  )
}
