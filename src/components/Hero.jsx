import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, Github, Linkedin, Mail } from 'lucide-react'

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
    const interval = setInterval(() => setRoleIndex(prev => (prev + 1) % roles.length), 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', paddingTop: '5rem', paddingBottom: '3rem', overflow: 'hidden',
      }}
    >
      {/* Decorative gradient orbs */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)',
        filter: 'blur(80px)', top: '10%', right: '5%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.08), transparent 70%)',
        filter: 'blur(80px)', bottom: '15%', left: '10%', pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem',
          alignItems: 'center', minHeight: 'calc(100vh - 10rem)',
        }}>
          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ opacity: opacityText }}
          >
            {/* Status pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 'var(--radius-full)', padding: '0.4rem 0.95rem', marginBottom: '1.5rem',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                backgroundColor: 'var(--accent-green)', boxShadow: '0 0 8px var(--accent-green)',
              }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.76rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                Open for Summer 2027 Internship
              </span>
            </div>

            {/* Name */}
            <h1 style={{ marginBottom: '0.5rem', lineHeight: 1.05 }}>
              Antarip<br />Chatterjee
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
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 600,
                    color: 'var(--text-secondary)', fontFamily: 'var(--font-display)',
                  }}
                >
                  {roles[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bio */}
            <p style={{
              color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.75,
              marginBottom: '2rem', maxWidth: '520px',
            }}>
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
                    width: '42px', height: '42px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)', transition: 'all 0.25s ease', textDecoration: 'none',
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

          {/* RIGHT: Glass bio card with photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              background: 'var(--bg-card)', backdropFilter: 'blur(24px)',
              border: '1px solid var(--border-color)', borderRadius: '32px',
              padding: '2.5rem', maxWidth: '380px', width: '100%',
              boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
              {/* Gradient accent top */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'var(--gradient-aurora)',
              }} />

              {/* Photo */}
              <div style={{
                width: '130px', height: '130px', borderRadius: '50%', padding: '4px',
                background: 'var(--gradient-primary)', margin: '0 auto 1.5rem',
                boxShadow: 'var(--shadow-glow)',
              }}>
                <img src="/antarip.jpg" alt="Antarip Chatterjee" style={{
                  width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block',
                  border: '3px solid var(--bg-primary)',
                }} />
              </div>

              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.3rem', fontFamily: 'var(--font-display)' }}>
                Antarip Chatterjee
              </h3>
              <p style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '1rem' }}>
                Cloud Architect & IoT Innovator
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
                B.Tech CSE (Cloud Computing) • LPU Top 1%
              </p>

              {/* Metric pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                {['AWS', 'Docker', 'ESP32', 'Python', 'K8s'].map((tech, idx) => (
                  <span key={idx} className="tag" style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2rem' }}
        >
          {[
            { value: 'Top 1%', label: 'Cohort Standing' },
            { value: 'Patent Pending', label: 'IoT Innovation' },
            { value: '5+ Sprints', label: 'Hackathon Leads' },
            { value: "Summer '27", label: 'Target Internship' },
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{
                fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-display)',
                background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', marginTop: '0.2rem' }}>
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
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.3rem', zIndex: 10,
        }}
      >
        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          SCROLL
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={18} color="var(--text-muted)" />
        </motion.div>
      </motion.div>
    </section>
  )
}
