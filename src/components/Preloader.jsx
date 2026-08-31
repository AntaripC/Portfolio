import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 4500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--bg-primary)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--text-primary)',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--accent-primary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              ANTARIP CHATTERJEE
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginTop: '1rem' }}>
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              style={{
                color: 'var(--accent-primary)',
                letterSpacing: '0.2em',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
              }}
            >
              Initializing Secure Cloud Environment
            </motion.p>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)',
              marginTop: '2rem',
              boxShadow: '0 0 10px var(--accent-glow)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
