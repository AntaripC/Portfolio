import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [typedCode, setTypedCode] = useState('')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)

  const codeLines = [
    "import { CloudArchitect } from '@antarip/cloud-core';",
    "const infra = new CloudArchitect({ region: 'us-east-1', security: 'zero-trust' });",
    "await infra.connectSensors(['ESP32-Optical-AS7262', 'ThingSpeak-Pipeline']);",
    "await infra.deployCluster({ cluster: 'k8s-production', autoScale: true });",
    "console.log('✓ INFRASTRUCTURE VERIFIED: 100% OPERATIONAL. LAUNCHING...');",
  ]

  // 5-second loading progress & animated code writing
  useEffect(() => {
    const totalDuration = 4800 // 4.8s + 0.6s exit animation ≈ 5.4s total
    const intervalTime = 40
    const totalSteps = totalDuration / intervalTime
    let currentStep = 0

    // Full code string to type out smoothly across the 5 seconds
    const fullCodeString = codeLines.join('\n')
    const totalChars = fullCodeString.length

    const interval = setInterval(() => {
      currentStep++
      const rawPct = (currentStep / totalSteps) * 100
      const currentPct = Math.min(100, Math.floor(rawPct))
      setProgress(currentPct)

      // Character typing progression
      const charCount = Math.floor((currentStep / totalSteps) * totalChars)
      setTypedCode(fullCodeString.slice(0, charCount))

      if (currentStep >= totalSteps) {
        clearInterval(interval)
        setTimeout(() => setIsVisible(false), 500)
      }
    }, intervalTime)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0d0a10',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fdfaf6',
            padding: '1.5rem',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Warm Ambient Background Gradients */}
          <div
            style={{
              position: 'absolute',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.16), transparent 70%)',
              filter: 'blur(90px)',
              top: '20%',
              left: '25%',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(251, 113, 133, 0.14), transparent 70%)',
              filter: 'blur(90px)',
              bottom: '20%',
              right: '25%',
              pointerEvents: 'none',
            }}
          />

          {/* Main Container */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: '620px',
            }}
          >
            {/* Title with reveal */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontFamily: 'var(--font-main)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #ffffff 35%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                letterSpacing: '-0.02em',
                textAlign: 'center',
              }}
            >
              ANTARIP CHATTERJEE
            </motion.h1>

            {/* Subtitle tag */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: '#fbbf24',
                letterSpacing: '0.18em',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                marginTop: '0.65rem',
                fontWeight: 600,
              }}
            >
              <ShieldCheck size={14} color="#fbbf24" />
              <span>INITIALIZING SECURE CLOUD ENVIRONMENT</span>
            </motion.div>

            {/* Code Snippet Writing Animation Terminal Box */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{
                width: '100%',
                marginTop: '1.75rem',
                background: 'rgba(23, 18, 28, 0.88)',
                border: '1px solid rgba(251, 191, 36, 0.25)',
                borderRadius: '14px',
                padding: '1.1rem 1.3rem',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5), 0 0 35px rgba(251, 191, 36, 0.15)',
              }}
            >
              {/* Terminal Title Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#eab308' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  <span
                    style={{
                      marginLeft: '0.5rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: '#b8ac9f',
                    }}
                  >
                    cloud-bootstrap.ts
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: '#fbbf24',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
                  ACTIVE_PIPELINE
                </span>
              </div>

              {/* Code lines container */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  lineHeight: '1.65',
                  color: '#fdfaf6',
                  minHeight: '110px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {typedCode}
                <span
                  style={{
                    display: 'inline-block',
                    width: '7px',
                    height: '14px',
                    backgroundColor: '#fbbf24',
                    marginLeft: '3px',
                    verticalAlign: 'middle',
                    animation: 'pulse-glow 1s infinite',
                  }}
                />
              </div>
            </motion.div>

            {/* 5-Second Glowing Loading Bar & Progress */}
            <div
              style={{
                width: '100%',
                marginTop: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}
            >
              {/* Progress Track */}
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(30, 23, 38, 0.85)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid rgba(251, 191, 36, 0.25)',
                  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.6)',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #fbbf24, #fb7185, #fbbf24)',
                    backgroundSize: '200% 100%',
                    borderRadius: '999px',
                    boxShadow: '0 0 14px rgba(251, 191, 36, 0.7)',
                    transition: 'width 0.05s linear',
                    position: 'relative',
                  }}
                />
              </div>

              {/* Status & Percentage Bar Labels */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: '#b8ac9f',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={12} color="#fbbf24" />
                  {progress < 30
                    ? 'CONNECTING_EDGE_NODES...'
                    : progress < 70
                    ? 'PROVISIONING_CLOUD_SERVICES...'
                    : progress < 100
                    ? 'COMPILING_SYSTEM_DOSSIER...'
                    : 'WORKSPACE_READY'}
                </span>
                <span style={{ color: '#fbbf24', fontWeight: 700 }}>{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
