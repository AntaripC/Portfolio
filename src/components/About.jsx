import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { User, Award, ShieldAlert, Heart, GraduationCap, School, Briefcase } from 'lucide-react'

// Custom TiltCard component for interactive 3D parallax hover effect
export function TiltCard({ children, borderTopColor = 'var(--accent-cyan)', style = {}, ...props }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 }
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), springConfig)

  function handleMouseMove(e) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width)
    y.set(mouseY / height)
  }

  function handleMouseLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: 'preserve-3d', 
        borderTop: `2px solid ${borderTopColor}`,
        ...style 
      }}
      className="cyber-card"
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Simple scroll parallax shifts
  const yText = useTransform(scrollYProgress, [0, 1], [40, -40])
  const yTimeline = useTransform(scrollYProgress, [0, 1], [80, -80])

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  const coreAttributes = [
    'Cloud Systems Architect',
    'Hardware Prototyping (ESP32)',
    'High-Pressure Team Lead',
    'Distributed Data Telemetry',
    'Fast & Versatile Learner',
  ]

  const hobbies = [
    'Tech & Gadget Prototyping',
    'Photography & Video Editing',
    'Exploring Tech Architecture',
    'IoT Device Tinkering',
  ]

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-subtitle">
          <User size={14} /> SYS_PROFILE // IDENTITY_VERIFICATION
        </div>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          About & Engineering Profile
        </motion.h2>

        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            alignItems: 'flex-start',
            gap: '3.5rem',
          }}
        >
          {/* Left Column: Biography & Bio details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            style={{ y: yText }}
          >
            <div className="cyber-tag" style={{ marginBottom: '1rem' }}>
              <GraduationCap size={14} /> CS UNDERGRADUATE // CLOUD COMPUTING SPECIALIZATION
            </div>
            
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.2rem', color: 'var(--text-primary)' }}>
              Building Scalable Infrastructures & Autonomous Systems
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.2rem', lineHeight: '1.8' }}>
              I am a driven <strong>B.Tech Computer Science Engineering undergraduate</strong> specializing in <strong>Cloud Computing</strong>. I actively participate in hackathons—often as a team leader—where I thrive in high-pressure environments, solving real-world challenges through code and hardware integration.
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.2rem', lineHeight: '1.8' }}>
              Currently, my academic and research work is focused on bridging the gap between <strong>cloud systems</strong> and <strong>IoT hardware telemetry</strong>, backed by certifications in cybersecurity, big data, and data science. I stand in the <strong>Top 1% of cohort globally</strong> in LPU.
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: '1.8' }}>
              In parallel to engineering, I serve as the <strong>Head of Marketing at CREST</strong>, where I direct team building, outreach analytics, and social media operations. I am actively seeking a <strong>Summer 2027 internship</strong> where I can apply my cloud architecture, full-stack, and automation skills to enterprise workflows.
            </p>

            {/* Attributes List */}
            <div style={{ marginBottom: '2rem' }}>
              <h4
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--accent-cyan)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <ShieldAlert size={16} /> CORE_ATTRIBUTES & MINDSET
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {coreAttributes.map((attr, idx) => (
                  <span key={idx} className="cyber-tag">
                    # {attr}
                  </span>
                ))}
              </div>
            </div>

            {/* Hobbies list */}
            <div>
              <h4
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--accent-green)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <Heart size={16} /> HOBBIES & INTERESTS
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {hobbies.map((hobby, idx) => (
                  <span key={idx} className="cyber-tag green">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Education Timeline Cards */}
          <motion.div
            className="grid"
            style={{ gridTemplateColumns: '1fr', gap: '1.8rem', y: yTimeline }}
          >
            {/* LPU Card */}
            <TiltCard borderTopColor="var(--accent-cyan)">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot dot-red" />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                </div>
                <span>EDU_RECORD // 01</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(0, 240, 255, 0.1)',
                    borderRadius: '10px',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                  }}
                >
                  <GraduationCap size={26} />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-cyan)',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Expected: 2029
                  </span>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    Lovely Professional University (LPU)
                  </h3>
                  <p style={{ color: 'var(--accent-green)', fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}>
                    B.Tech CSE (Cloud Computing)
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  marginTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <Award size={16} color="var(--accent-cyan)" />
                  <span>
                    <strong>Standing:</strong> Top 1% of cohort globally
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <ShieldAlert size={16} color="var(--accent-green)" />
                  <span>
                    <strong>Lab Focus:</strong> Cloud Orchestration & IoT Integrations
                  </span>
                </div>
              </div>
            </TiltCard>

            {/* School Card */}
            <TiltCard borderTopColor="var(--accent-green)">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot dot-red" />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                </div>
                <span>EDU_RECORD // 02</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.5rem' }}>
                <div
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '10px',
                    color: 'var(--accent-green)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                  }}
                >
                  <School size={26} />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-green)',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Completed 2025
                  </span>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    Krishnath College School
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                    Senior Secondary (12th Grade) • Advanced PCMB
                  </p>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Rigorous STEM curriculum focusing on Advanced PCMB (Physics, Chemistry, Mathematics, Biology) and Analytical Problem Solving.
              </p>
            </TiltCard>

            {/* Internship Target Card */}
            <TiltCard borderTopColor="var(--accent-purple)">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot dot-red" />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                </div>
                <span>TARGET_OP // SUMMER_2027</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(168, 85, 247, 0.1)',
                    borderRadius: '10px',
                    color: 'var(--accent-purple)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                  }}
                >
                  <Briefcase size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                    Target Opportunity
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    Seeking <strong>Summer 2027 Internships</strong> across Cloud Engineering, DevOps Automation, Software Development, or Systems Engineering. Open to global on-site and remote roles.
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
