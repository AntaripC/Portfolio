import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Cpu, Cloud, Terminal, Sparkles } from 'lucide-react'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('CONNECTING_NODES...')

  useEffect(() => {
    const statusMessages = [
      'INITIALIZING_KERNEL...',
      'VERIFYING_AWS_IAM_POLICIES...',
      'ALLOCATING_KUBERNETES_PODS...',
      'CONNECTING_ESP32_TELEMETRY...',
      'SYSTEM_READY // MOUNTING_HUD',
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 25) + 15
        if (next >= 100) {
          clearInterval(interval)
          setStatusText(statusMessages[4])
          setTimeout(() => setIsVisible(false), 350)
          return 100
        }
        const messageIndex = Math.min(Math.floor((next / 100) * statusMessages.length), 3)
        setStatusText(statusMessages[messageIndex])
        return next
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#020617',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#f8fafc',
            overflow: 'hidden',
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)
            `,
            backgroundSize: '100% 100%, 36px 36px',
          }}
        >
          {/* Subtle glowing halo */}
          <div
            style={{
              position: 'absolute',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
              padding: '2rem',
              maxWidth: '480px',
              width: '90%',
              textAlign: 'center',
            }}
          >
            {/* Top Security & System Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '50px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)',
                marginBottom: '1.75rem',
              }}
            >
              <ShieldCheck size={14} color="#3b82f6" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#60a5fa', fontWeight: '700', letterSpacing: '0.08em' }}>
                SYSTEM_BOOT // SECURE_CLOUD_OS
              </span>
            </div>

            {/* Main Name & Identity Title */}
            <h1
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #ffffff 40%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 0.5rem 0',
                lineHeight: 1.1,
              }}
            >
              ANTARIP CHATTERJEE
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#94a3b8',
                margin: '0 0 2rem 0',
                letterSpacing: '0.05em',
              }}
            >
              Cloud Systems Architect • IoT Innovator
            </p>

            {/* Circular Progress & Telemetry Ring */}
            <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '1.75rem' }}>
              <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="6"
                  fill="transparent"
                />
                {/* Animated Progress Ring */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="url(#preloader-gradient)"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * progress) / 100}
                  strokeLinecap="round"
                  transition={{ duration: 0.2 }}
                />
                <defs>
                  <linearGradient id="preloader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Percentage Counter Center Text */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.05rem',
                  fontWeight: '800',
                  color: '#60a5fa',
                }}
              >
                {progress}%
              </div>
            </div>

            {/* Status Telemetry Text */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: '#38bdf8',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '8px',
                padding: '0.45rem 1rem',
                letterSpacing: '0.06em',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              }}
            >
              {statusText}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
