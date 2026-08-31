import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, Github, Linkedin, Mail, Cloud, Cpu, Sparkles, CheckCircle2 } from 'lucide-react'

// ── Interactive 3D Floating Tilt Card ──
function FloatingHeroCard() {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for buttery-smooth damping
  const mouseX = useSpring(x, { stiffness: 260, damping: 20 })
  const mouseY = useSpring(y, { stiffness: 260, damping: 20 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['14deg', '-14deg'])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-14deg', '14deg'])
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseClientX = e.clientX - rect.left
    const mouseClientY = e.clientY - rect.top
    const xPct = mouseClientX / width - 0.5
    const yPct = mouseClientY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const skills = [
    { name: 'AWS', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    { name: 'Docker', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)' },
    { name: 'ESP32', color: '#fb7185', bg: 'rgba(251, 113, 133, 0.1)' },
    { name: 'Python', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    { name: 'K8s', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
  ]

  return (
    <div
      style={{
        perspective: '1000px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '420px',
      }}
    >
      {/* Floating Satellite 1: Cloud Architecture */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-25px',
          zIndex: 4,
          padding: '0.45rem 0.85rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '999px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 24px rgba(124, 58, 237, 0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.74rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          color: 'var(--accent-primary)',
          pointerEvents: 'none',
        }}
      >
        <Cloud size={14} color="var(--accent-primary)" />
        <span>Cloud Native</span>
      </motion.div>

      {/* Floating Satellite 2: IoT Telemetry */}
      <motion.div
        animate={{
          y: [0, 14, 0],
          rotate: [0, -4, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        style={{
          position: 'absolute',
          bottom: '25px',
          right: '-28px',
          zIndex: 4,
          padding: '0.45rem 0.85rem',
          background: 'var(--bg-card)',
          border: '1px solid rgba(244, 63, 94, 0.25)',
          borderRadius: '999px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 24px rgba(244, 63, 94, 0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.74rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          color: 'var(--accent-rose)',
          pointerEvents: 'none',
        }}
      >
        <Cpu size={14} color="var(--accent-rose)" />
        <span>ESP32 Telemetry</span>
      </motion.div>

      {/* Main 3D Tilt Card with Floating Float Loop */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={
          isHovered
            ? {}
            : {
                y: [0, -10, 0],
              }
        }
        transition={
          isHovered
            ? {}
            : {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(28px) saturate(1.6)',
          border: '1px solid var(--border-color)',
          borderRadius: '32px',
          padding: '2.5rem 2rem',
          width: '100%',
          boxShadow: isHovered
            ? '0 25px 60px rgba(124, 58, 237, 0.22), 0 0 50px rgba(236, 72, 153, 0.18)'
            : 'var(--shadow-xl), var(--shadow-glow)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Dynamic Specular Glare Overlay */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Top Aurora Accent Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'var(--gradient-aurora)',
          }}
        />

        {/* Avatar with Animated Aurora Ring & Beacon */}
        <div
          style={{
            transform: 'translateZ(35px)',
            position: 'relative',
            width: '135px',
            height: '135px',
            margin: '0 auto 1.5rem',
          }}
        >
          {/* Rotating gradient ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a78bfa, #f472b6, #fbbf24, #a78bfa)',
              backgroundSize: '300% 300%',
              animation: 'gradient-shift 4s linear infinite',
              filter: 'blur(3px)',
              opacity: 0.85,
            }}
          />

          {/* Photo frame */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              padding: '3px',
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <img
              src="/antarip.jpg"
              alt="Antarip Chatterjee"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block',
                border: '3px solid var(--bg-primary)',
                transition: 'transform 0.4s ease',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          </div>

          {/* Live Status Beacon */}
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'var(--bg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-green)',
                boxShadow: '0 0 8px var(--accent-green)',
                display: 'block',
                animation: 'pulse-soft 2s infinite ease-in-out',
              }}
            />
          </div>
        </div>

        {/* Content with 3D Depth */}
        <div style={{ transform: 'translateZ(25px)' }}>
          <h3
            style={{
              fontSize: '1.4rem',
              marginBottom: '0.35rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            Antarip Chatterjee
          </h3>

          <p
            style={{
              color: 'var(--accent-primary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.92rem',
              fontWeight: 700,
              marginBottom: '0.85rem',
            }}
          >
            Cloud Architect & IoT Innovator
          </p>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.82rem',
              lineHeight: 1.5,
              marginBottom: '1.4rem',
            }}
          >
            B.Tech CSE (Cloud Computing) &bull; LPU Top 1%
          </p>

          {/* Interactive Skill Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
            }}
          >
            {skills.map((tech, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  background: tech.bg,
                  color: tech.color,
                  border: `1px solid ${tech.color}35`,
                  boxShadow: isHovered ? `0 2px 8px ${tech.color}20` : 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const roles = [
    'Cloud Systems Architect',
    'IoT Prototyper & Innovator',
    'Full-Stack Developer',
    'Hackathon Squad Leader',
  ]
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((prev) => (prev + 1) % roles.length), 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '5.5rem',
        paddingBottom: '3.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gradient orbs */}
      <div
        style={{
          position: 'absolute',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)',
          filter: 'blur(90px)',
          top: '10%',
          right: '5%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%)',
          filter: 'blur(90px)',
          bottom: '15%',
          left: '10%',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            minHeight: 'calc(100vh - 11rem)',
          }}
        >
          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ opacity: opacityText }}
          >
            {/* Status pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16,185,129,0.25)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 0.95rem',
                marginBottom: '1.5rem',
                boxShadow: '0 2px 10px rgba(16, 185, 129, 0.1)',
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
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.76rem',
                  color: 'var(--accent-green)',
                  fontWeight: 600,
                }}
              >
                Open for Summer 2027 Internship
              </span>
            </div>

            {/* Name */}
            <h1 style={{ marginBottom: '0.5rem', lineHeight: 1.05 }}>
              Antarip
              <br />
              Chatterjee
            </h1>

            {/* Role cycler */}
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {roles[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bio */}
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                marginBottom: '2rem',
                maxWidth: '520px',
              }}
            >
              Building resilient <strong>Cloud Infrastructure</strong> and <strong>Scalable Systems</strong> at LPU.
              Merging patent-pending <strong>ESP32 IoT telemetry</strong> with high-pressure hackathon sprints.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a href="#projects" className="btn btn-primary" style={{ padding: '0.8rem 1.5rem' }}>
                View Projects <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn btn-outline" style={{ padding: '0.8rem 1.5rem' }}>
                <Mail size={16} /> Get in Touch
              </a>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                { icon: <Github size={18} />, href: 'https://github.com/AntaripC', label: 'GitHub' },
                { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/antarip-chatterjee-0205a9374/', label: 'LinkedIn' },
                { icon: <Mail size={18} />, href: '#contact', label: 'Email' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.25s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)'
                    e.currentTarget.style.color = 'var(--accent-primary)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Floating & Interactive 3D Bio Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <FloatingHeroCard />
          </motion.div>
        </div>

        {/* Bottom metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '2.5rem',
          }}
        >
          {[
            { value: 'Top 1%', label: 'Cohort Standing' },
            { value: 'Patent Pending', label: 'IoT Innovation' },
            { value: '5+ Sprints', label: 'Hackathon Leads' },
            { value: "Summer '27", label: 'Target Internship' },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem 1.25rem',
                backdropFilter: 'blur(12px)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.25s ease',
              }}
            >
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-display)',
                  marginTop: '0.2rem',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            fontFamily: 'var(--font-display)',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
          }}
        >
          SCROLL
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={18} color="var(--text-muted)" />
        </motion.div>
      </motion.div>
    </section>
  )
}
