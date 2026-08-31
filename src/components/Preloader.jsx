import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [statusIdx, setStatusIdx] = useState(0)

  const statuses = [
    'Initializing Aurora Core...',
    'Loading Cloud Architecture...',
    'Connecting IoT Sensor Mesh...',
    'Compiling Experience Vault...',
    'Launching Workspace...',
  ]

  useEffect(() => {
    const totalDuration = 4800 // ~4.8s + 0.5s fade out ≈ 5.3s total
    const intervalTime = 50
    const totalSteps = totalDuration / intervalTime
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const rawProgress = (currentStep / totalSteps) * 100
      // Smooth ease-out style curve
      const easedProgress = Math.min(100, Math.floor(rawProgress))
      setProgress(easedProgress)

      // Calculate status index based on current progress
      const newStatusIdx = Math.min(
        statuses.length - 1,
        Math.floor((easedProgress / 100) * statuses.length)
      )
      setStatusIdx(newStatusIdx)

      if (currentStep >= totalSteps) {
        clearInterval(interval)
        setTimeout(() => setIsVisible(false), 500)
      }
    }, intervalTime)

    return () => clearInterval(interval)
  }, [])

  const letters = 'ANTARIP'.split('')

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0a0a0f',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Ambient aurora floating orbs */}
          <div
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)',
              filter: 'blur(90px)',
              top: '15%',
              left: '25%',
              animation: 'aurora-drift 10s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(236,72,153,0.28), transparent 70%)',
              filter: 'blur(90px)',
              bottom: '15%',
              right: '20%',
              animation: 'aurora-drift 12s ease-in-out infinite reverse',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,158,11,0.2), transparent 70%)',
              filter: 'blur(80px)',
              bottom: '30%',
              left: '35%',
              animation: 'aurora-drift 14s ease-in-out infinite',
            }}
          />

          {/* Subtitle tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(10px)',
              zIndex: 2,
            }}
          >
            <Sparkles size={13} color="#f472b6" />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#e4e4e7',
                fontWeight: 600,
              }}
            >
              Cloud & IoT Architect
            </span>
          </motion.div>

          {/* Staggered Letter Reveal */}
          <div style={{ display: 'flex', gap: '0.15em', position: 'relative', zIndex: 2 }}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #fbbf24 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Dynamic Status Text */}
          <div style={{ minHeight: '24px', marginTop: '1.25rem', zIndex: 2 }}>
            <motion.p
              key={statusIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.86rem',
                color: '#a1a1aa',
                fontWeight: 500,
                textAlign: 'center',
                letterSpacing: '0.04em',
              }}
            >
              {statuses[statusIdx]}
            </motion.p>
          </div>

          {/* Progress Bar with Glow & Percentage */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '260px' }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.6rem',
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '999px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  borderRadius: '999px',
                  background: 'linear-gradient(90deg, #a78bfa, #f472b6, #fbbf24)',
                  width: `${progress}%`,
                  transition: 'width 0.08s linear',
                  boxShadow: '0 0 12px rgba(244, 114, 182, 0.6)',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                color: '#71717a',
                padding: '0 2px',
              }}
            >
              <span>BOOT_SEQUENCE</span>
              <span style={{ color: '#f472b6', fontWeight: 600 }}>{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
