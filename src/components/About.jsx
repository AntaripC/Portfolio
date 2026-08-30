import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import {
  User,
  Award,
  ShieldAlert,
  Heart,
  GraduationCap,
  School,
  Briefcase,
  Cpu,
  Compass,
  Zap,
  Globe,
  Sparkles,
  Camera,
  Layers,
  Terminal,
  Activity,
  CheckCircle2,
  ArrowRight,
  Radio,
  FileCode2,
  Share2,
  MapPin,
  Calendar
} from 'lucide-react'

// Custom TiltCard component for interactive 3D parallax hover effect
export function TiltCard({ children, borderTopColor = 'var(--accent-primary)', style = {}, ...props }) {
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

  const yText = useTransform(scrollYProgress, [0, 1], [30, -30])

  const [activeBioTab, setActiveBioTab] = useState('cloud')
  const [selectedAttribute, setSelectedAttribute] = useState(0)
  const [activeHobby, setActiveHobby] = useState(0)
  const [viewFilter, setViewFilter] = useState('all')

  const attributesData = [
    {
      id: 'cloud',
      name: 'Cloud Systems Architect',
      tag: 'INFRASTRUCTURE & RESILIENCE',
      color: 'var(--accent-primary)',
      desc: 'Architecting containerized cloud topologies on AWS & GCP with zero-trust security postures, automated CI/CD pipelines, and cost-efficient distributed deployments.',
      metrics: ['AWS IAM & RBAC', 'Docker & Kubernetes', 'Infrastructure as Code', 'High Availability'],
      icon: <Cpu size={18} />,
    },
    {
      id: 'iot',
      name: 'Hardware Prototyping (ESP32)',
      tag: 'EDGE TELEMETRY & RESEARCH',
      color: 'var(--accent-green)',
      desc: 'Designing patent-pending embedded telemetry systems combining AS7262 optical spectrometers, turbidity sensors, WiFi telemetry, and edge heuristics.',
      metrics: ['ESP32 & C/C++ Firmware', 'ThingSpeak Cloud Streams', 'Microplastic Detection', 'Telegram Emergency Bots'],
      icon: <Zap size={18} />,
    },
    {
      id: 'lead',
      name: 'High-Pressure Team Lead',
      tag: 'SPRINT EXECUTION & MENTORSHIP',
      color: 'var(--accent-purple)',
      desc: 'Directed 5+ developer squads in national hackathons (IITs & university arenas), synchronizing Git workflows, task delegation, and rapid MVP delivery.',
      metrics: ['IIT Hackathons Lead', 'Gitflow Governance', 'Cross-Disciplinary Sync', 'Jury Demo Defense'],
      icon: <UsersIcon size={18} />,
    },
    {
      id: 'data',
      name: 'Distributed Data Telemetry',
      tag: 'REAL-TIME DATA STREAMING',
      color: 'var(--accent-amber)',
      desc: 'Building high-throughput analytical data pipelines, RDBMS relations, MongoDB architectures, and graph-based pathfinding algorithms.',
      metrics: ['Node.js & Express REST', 'RDBMS & MongoDB', 'Data Pipelines', 'A* Pathfinding Graphs'],
      icon: <Activity size={18} />,
    },
    {
      id: 'learner',
      name: 'Fast & Versatile Learner',
      tag: 'ADAPTIVE PROBLEM SOLVER',
      color: 'var(--accent-cyan)',
      desc: 'Standing in the Top 1% of cohort globally at LPU with credentials in Big Data, Data Science, and Cybersecurity from IIT Madras & Infosys.',
      metrics: ['Top 1% Global Cohort', 'IIT Madras Certified', 'Rapid Tech Adaptability', 'STEM Academic Rigor'],
      icon: <Award size={18} />,
    },
  ]

  const hobbiesData = [
    {
      title: 'Tech & Gadget Prototyping',
      category: 'HARDWARE LAB',
      icon: <Cpu size={22} />,
      color: 'var(--accent-primary)',
      detail: 'Tinkering with microcontrollers, breakout boards, sensors, and hardware circuits to test real-world physical computing concepts.',
      stats: 'ESP32 • Arduino • Sensors',
    },
    {
      title: 'Photography & Video Editing',
      category: 'CREATIVE MEDIA',
      icon: <Camera size={22} />,
      color: 'var(--accent-green)',
      detail: 'Crafting cinematic visual narratives, color grading, and framing dynamic visual content for digital campaigns and personal projects.',
      stats: 'Color Grading • Composition',
    },
    {
      title: 'Exploring Tech Architecture',
      category: 'SYSTEM STUDY',
      icon: <Layers size={22} />,
      color: 'var(--accent-purple)',
      detail: 'Deep-diving into whitepapers, cloud infrastructure benchmarks, high-scale distributed designs, and edge computing innovations.',
      stats: 'Distributed Specs • Cloud Benchmarks',
    },
    {
      title: 'IoT Device Tinkering',
      category: 'AUTOMATION & ROBOTICS',
      icon: <Zap size={22} />,
      color: 'var(--accent-amber)',
      detail: 'Building autonomous sensor nodes, wireless telemetry relays, and smart ambient monitors for real-time environment intelligence.',
      stats: 'Wireless Relays • Cloud Telemetry',
    },
  ]

  return (
    <section id="about" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* ========================================================================= */}
        {/* SECTION HEADER & INTERACTIVE MODE SELECTOR */}
        {/* ========================================================================= */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-subtitle">
            <User size={14} /> SYS_PROFILE // IDENTITY_VERIFICATION
          </div>
          <h2 style={{ marginBottom: '1rem' }}>About & Engineering Profile</h2>

          {/* Interactive Category Filter Pills */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              padding: '0.35rem 0.5rem',
              borderRadius: '50px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 20px var(--accent-glow)',
            }}
          >
            {[
              { id: 'all', label: 'All Dossiers' },
              { id: 'bio', label: 'Executive Bio' },
              { id: 'education', label: 'Academic History' },
              { id: 'attributes', label: 'Core Attributes' },
              { id: 'target', label: 'Target 2027 & Interests' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setViewFilter(f.id)}
                style={{
                  background: viewFilter === f.id ? 'linear-gradient(135deg, var(--bg-secondary), var(--bg-card))' : 'transparent',
                  color: viewFilter === f.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: `1px solid ${viewFilter === f.id ? 'var(--accent-primary)' : 'transparent'}`,
                  borderRadius: '30px',
                  padding: '0.4rem 0.9rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: viewFilter === f.id ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {viewFilter === f.id && <span style={{ marginRight: '0.35rem' }}>●</span>}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE BENTO GRID LAYOUT */}
        {/* ========================================================================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* ROW 1: EXECUTIVE BIO & OPERATIVE SPECIFICATIONS (MASTER CARD) */}
          {(viewFilter === 'all' || viewFilter === 'bio') && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard
                borderTopColor="var(--accent-primary)"
                style={{
                  background: 'var(--bg-card-elevated)',
                  padding: '2.5rem',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 15px 45px rgba(15, 23, 42, 0.08), inset 0 0 25px rgba(217, 119, 6, 0.02)',
                  borderRadius: '16px',
                }}
              >
                {/* Terminal Header */}
                <div className="terminal-header" style={{ marginBottom: '1.75rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                    <span style={{ marginLeft: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      antarip.identity // SYS_OPERATIVE_DOSSIER
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)', fontSize: '0.78rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', boxShadow: '0 0 8px var(--accent-green)' }} />
                    STATUS: ACTIVE_RESEARCHER & BUILDER
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem',
                    alignItems: 'stretch',
                  }}
                >
                  {/* Left Column: Heading, Role Highlights & Interactive Tabs */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="cyber-tag" style={{ marginBottom: '1rem', width: 'fit-content' }}>
                      <GraduationCap size={14} style={{ marginRight: '0.3rem' }} /> B.TECH CSE // CLOUD COMPUTING SPECIALIZATION
                    </div>

                    <h3
                      style={{
                        fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                        marginBottom: '1rem',
                        lineHeight: '1.25',
                        color: 'var(--text-primary)',
                      }}
                    >
                      Building Scalable Infrastructures & Autonomous Systems
                    </h3>

                    {/* Interactive Perspective Switcher Tabs */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.4rem',
                        marginBottom: '1.5rem',
                        borderBottom: '1px solid var(--border-subtle)',
                        paddingBottom: '0.5rem',
                      }}
                    >
                      {[
                        { id: 'cloud', label: 'Cloud & Systems', icon: <Cpu size={14} /> },
                        { id: 'iot', label: 'IoT & Patent Research', icon: <Zap size={14} /> },
                        { id: 'leadership', label: 'CREST & Leadership', icon: <Sparkles size={14} /> },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveBioTab(tab.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.4rem 0.8rem',
                            background: activeBioTab === tab.id ? 'var(--bg-secondary)' : 'transparent',
                            border: `1px solid ${activeBioTab === tab.id ? 'var(--accent-primary)' : 'transparent'}`,
                            color: activeBioTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            borderRadius: '6px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {tab.icon}
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content Display */}
                    <div style={{ flex: 1, minHeight: '130px' }}>
                      <AnimatePresence mode="wait">
                        {activeBioTab === 'cloud' && (
                          <motion.div
                            key="cloud"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.8' }}
                          >
                            I am a driven <strong>B.Tech Computer Science Engineering undergraduate</strong> specializing in <strong>Cloud Computing</strong> at LPU. I thrive in high-pressure hackathons—frequently as team lead—architecting decoupled cloud topologies, containerized microservices, and secure backend systems under strict 24–48h clocks.
                          </motion.div>
                        )}

                        {activeBioTab === 'iot' && (
                          <motion.div
                            key="iot"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.8' }}
                          >
                            My academic and research work bridges the critical gap between <strong>cloud systems</strong> and <strong>physical IoT hardware telemetry</strong>. As the inventor of the patent-pending <em>Smart Microplastic Detector</em>, I engineer ESP32 edge firmware with 6-channel optical spectrometry and automated cloud alerts.
                          </motion.div>
                        )}

                        {activeBioTab === 'leadership' && (
                          <motion.div
                            key="leadership"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.8' }}
                          >
                            In parallel to core engineering, I serve as the <strong>Head of Marketing at CREST</strong>, orchestrating cross-functional teams, outreach analytics, and brand positioning across flagship university campaigns. I am seeking a <strong>Summer 2027 internship</strong> to contribute to high-impact enterprise teams.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Fast Fact Metrics Row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                        gap: '0.85rem',
                        marginTop: '1.5rem',
                        paddingTop: '1.25rem',
                        borderTop: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div style={{ background: 'var(--bg-secondary)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>COHORT STANDING</span>
                        <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--accent-primary)', marginTop: '0.15rem' }}>Top 1%</div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Global Rank @ LPU</span>
                      </div>

                      <div style={{ background: 'var(--bg-secondary)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-green)' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RESEARCH IP</span>
                        <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--accent-green)', marginTop: '0.15rem' }}>Patent Pending</div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>IoT Spectral Detector</span>
                      </div>

                      <div style={{ background: 'var(--bg-secondary)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-purple)' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>COMMUNITY LEAD</span>
                        <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--accent-purple)', marginTop: '0.15rem' }}>CREST Head</div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Marketing & Outreach</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Interactive Operative HUD & Telemetry Screen */}
                  <div
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: 'inset 0 0 20px rgba(217, 119, 6, 0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: '700' }}>
                        TELEMETRY // LIVE_PROFILE_KERNEL
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        AES_256 // ENCRYPTED
                      </span>
                    </div>

                    {/* Spec details lines */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>OPERATIVE_NAME:</span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Antarip Chatterjee</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>PRIMARY_STACK:</span>
                        <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>AWS • GCP • Python • Node.js</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>SPECIALIZATION:</span>
                        <span style={{ color: 'var(--accent-green)', fontWeight: '600' }}>Cloud Computing & IoT Hardware</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>ACADEMIC_INSTITUTE:</span>
                        <span style={{ color: 'var(--text-primary)' }}>Lovely Professional University</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>TARGET_OPPORTUNITY:</span>
                        <span style={{ color: 'var(--accent-purple)', fontWeight: '600' }}>Summer 2027 Internship</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0' }}>
                        <span style={{ color: 'var(--text-muted)' }}>LOCATION_MOBILITY:</span>
                        <span style={{ color: 'var(--accent-amber)', fontWeight: '600' }}>India // Global Remote</span>
                      </div>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <a
                        href="#projects"
                        className="btn btn-primary"
                        style={{ fontSize: '0.8rem', padding: '0.55rem 1rem', flex: 1 }}
                      >
                        <Compass size={14} /> View Flagship Builds
                      </a>
                      <a
                        href="#contact"
                        className="btn btn-outline"
                        style={{ fontSize: '0.8rem', padding: '0.55rem 1rem', flex: 1 }}
                      >
                        <Briefcase size={14} /> Hire For Summer '27
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          )}

          {/* ROW 2: ACADEMIC NEXUS (EDUCATION CARDS) */}
          {(viewFilter === 'all' || viewFilter === 'education') && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div className="cyber-tag green" style={{ fontSize: '0.82rem' }}>
                  <GraduationCap size={14} style={{ marginRight: '0.3rem' }} /> ACADEMIC_NEXUS // VERIFIED_HISTORY
                </div>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                  CHRONOLOGICAL_RECORDS
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                  gap: '1.8rem',
                }}
              >
                {/* 1. Lovely Professional University Card */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5 }}
                >
                  <TiltCard
                    borderTopColor="var(--accent-primary)"
                    style={{
                      height: '100%',
                      background: 'var(--bg-card)',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div className="terminal-header" style={{ marginBottom: '1.2rem' }}>
                      <div className="terminal-dots">
                        <span className="terminal-dot dot-red" />
                        <span className="terminal-dot dot-yellow" />
                        <span className="terminal-dot dot-green" />
                      </div>
                      <span style={{ color: 'var(--accent-primary)', fontSize: '0.72rem' }}>EDU_RECORD // 01</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                      <div
                        style={{
                          padding: '0.75rem',
                          background: 'rgba(217, 119, 6, 0.1)',
                          borderRadius: '10px',
                          color: 'var(--accent-primary)',
                          border: '1px solid var(--border-color)',
                        }}
                      >
                        <GraduationCap size={28} />
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: '0.74rem',
                            color: 'var(--accent-primary)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          Expected Graduation: 2029
                        </span>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                          Lovely Professional University (LPU)
                        </h3>
                        <p style={{ color: 'var(--accent-green)', fontSize: '0.95rem', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                          B.Tech Computer Science & Engineering (Cloud Computing)
                        </p>
                      </div>
                    </div>

                    {/* Academic Accomplishments List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                        <Award size={16} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                        <span><strong>Academic Rank:</strong> Ranked in the Top 1% of cohort globally</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                        <ShieldAlert size={16} color="var(--accent-green)" style={{ flexShrink: 0 }} />
                        <span><strong>Lab Focus:</strong> Cloud Orchestration, Microservices & IoT Integrations</span>
                      </div>
                    </div>

                    {/* Core Curricular Pillars */}
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.4rem' }}>
                        ADVANCED_MODULES:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {['Distributed Systems', 'Cloud Virtualization', 'DevOps CI/CD', 'IoT Systems', 'Data Structures'].map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              fontSize: '0.72rem',
                              fontFamily: 'var(--font-mono)',
                              color: 'var(--accent-primary)',
                              background: 'var(--bg-secondary)',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              border: '1px solid var(--border-color)',
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>

                {/* 2. Krishnath College School Card */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <TiltCard
                    borderTopColor="var(--accent-green)"
                    style={{
                      height: '100%',
                      background: 'var(--bg-card)',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid var(--border-green)',
                    }}
                  >
                    <div className="terminal-header" style={{ marginBottom: '1.2rem' }}>
                      <div className="terminal-dots">
                        <span className="terminal-dot dot-red" />
                        <span className="terminal-dot dot-yellow" />
                        <span className="terminal-dot dot-green" />
                      </div>
                      <span style={{ color: 'var(--accent-green)', fontSize: '0.72rem' }}>EDU_RECORD // 02</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                      <div
                        style={{
                          padding: '0.75rem',
                          background: 'rgba(5, 150, 105, 0.1)',
                          borderRadius: '10px',
                          color: 'var(--accent-green)',
                          border: '1px solid var(--border-green)',
                        }}
                      >
                        <School size={28} />
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: '0.74rem',
                            color: 'var(--accent-green)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          Completed 2025
                        </span>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                          Krishnath College School
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                          Senior Secondary (12th Grade) • Advanced PCMB
                        </p>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                      Rigorous STEM curriculum focusing on Advanced PCMB (Physics, Chemistry, Mathematics, Biology) and Analytical Problem Solving, establishing foundational mathematical and computational principles.
                    </p>

                    {/* PCMB Pillar Chips */}
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.4rem' }}>
                        CORE_CURRICULUM:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Analytical Logic'].map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              fontSize: '0.72rem',
                              fontFamily: 'var(--font-mono)',
                              color: 'var(--accent-green)',
                              background: 'var(--bg-secondary)',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              border: '1px solid var(--border-green)',
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              </div>
            </div>
          )}

          {/* ROW 3: INTERACTIVE CORE ATTRIBUTES & CAPABILITY INSPECTOR */}
          {(viewFilter === 'all' || viewFilter === 'attributes') && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard
                borderTopColor="var(--accent-purple)"
                style={{
                  background: 'var(--bg-card-elevated)',
                  padding: '2.2rem',
                  border: '1px solid var(--border-purple)',
                  boxShadow: '0 15px 40px rgba(15, 23, 42, 0.08)',
                  borderRadius: '16px',
                }}
              >
                <div className="terminal-header" style={{ marginBottom: '1.25rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: 'var(--accent-purple)', fontSize: '0.72rem' }}>MATRIX // CORE_ATTRIBUTES_&_MINDSET</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>
                      Engineering Mindset & Strategic Capabilities
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                      Click on any capability node to inspect technical execution and toolchains.
                    </p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: '600' }}>
                    SELECT_TO_INSPECT
                  </span>
                </div>

                {/* Interactive Attribute Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.75rem' }}>
                  {attributesData.map((attr, idx) => {
                    const isSelected = selectedAttribute === idx
                    return (
                      <button
                        key={attr.id}
                        onClick={() => setSelectedAttribute(idx)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.55rem 1rem',
                          background: isSelected ? 'var(--bg-secondary)' : 'var(--bg-card)',
                          border: `1px solid ${isSelected ? attr.color : 'var(--border-subtle)'}`,
                          color: isSelected ? attr.color : 'var(--text-secondary)',
                          borderRadius: '8px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.82rem',
                          fontWeight: isSelected ? '700' : '500',
                          cursor: 'pointer',
                          boxShadow: isSelected ? '0 4px 15px var(--accent-glow)' : 'none',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {attr.icon}
                        #{attr.name}
                      </button>
                    )
                  })}
                </div>

                {/* Live Inspector Readout Panel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedAttribute}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '10px',
                      padding: '1.4rem',
                      boxShadow: 'inset 0 0 20px rgba(217, 119, 6, 0.03)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: attributesData[selectedAttribute].color,
                          fontWeight: '700',
                          padding: '0.2rem 0.55rem',
                          background: 'var(--bg-card)',
                          borderRadius: '4px',
                          border: `1px solid ${attributesData[selectedAttribute].color}`,
                        }}
                      >
                        {attributesData[selectedAttribute].tag}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        OPERATIONAL_READOUT
                      </span>
                    </div>

                    <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>
                      {attributesData[selectedAttribute].desc}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {attributesData[selectedAttribute].metrics.map((m, mIdx) => (
                        <span
                          key={mIdx}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontSize: '0.78rem',
                            fontFamily: 'var(--font-mono)',
                            color: attributesData[selectedAttribute].color,
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '4px',
                            fontWeight: '600',
                          }}
                        >
                          <CheckCircle2 size={12} />
                          {m}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </TiltCard>
            </motion.div>
          )}

          {/* ROW 4: TARGET OPPORTUNITY & HOBBIES GRID */}
          {(viewFilter === 'all' || viewFilter === 'target') && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '1.8rem',
              }}
            >
              {/* Card 4A: Internship Target Radar */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
              >
                <TiltCard
                  borderTopColor="var(--accent-purple)"
                  style={{
                    height: '100%',
                    background: 'var(--bg-card)',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid var(--border-purple)',
                  }}
                >
                  <div className="terminal-header" style={{ marginBottom: '1.2rem' }}>
                    <div className="terminal-dots">
                      <span className="terminal-dot dot-red" />
                      <span className="terminal-dot dot-yellow" />
                      <span className="terminal-dot dot-green" />
                    </div>
                    <span style={{ color: 'var(--accent-purple)', fontSize: '0.72rem' }}>TARGET_OP // SUMMER_2027</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                    <div
                      style={{
                        padding: '0.75rem',
                        background: 'rgba(124, 58, 237, 0.1)',
                        borderRadius: '10px',
                        color: 'var(--accent-purple)',
                        border: '1px solid var(--border-purple)',
                      }}
                    >
                      <Briefcase size={28} />
                    </div>
                    <div>
                      <span className="cyber-tag purple" style={{ fontSize: '0.72rem', marginBottom: '0.2rem' }}>
                        ACTIVE CANDIDATE
                      </span>
                      <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0 }}>
                        Summer 2027 Internship
                      </h3>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                    Actively seeking <strong>Summer 2027 Internships</strong> across Cloud Architecture, DevOps Automation, Software Engineering, or Systems Development.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>&gt; ROLES:</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Cloud / DevOps / SWE / IoT</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>&gt; AVAILABILITY:</span>
                      <span style={{ color: 'var(--accent-green)', fontWeight: '600' }}>Summer 2027 (Onsite / Remote)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>&gt; MOBILITY:</span>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>Open to Global Relocation</span>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="btn btn-primary"
                    style={{ marginTop: 'auto', fontSize: '0.85rem', width: '100%', justifyContent: 'center' }}
                  >
                    <Briefcase size={16} /> Dispatch Internship Offer
                  </a>
                </TiltCard>
              </motion.div>

              {/* Card 4B: Hobbies & Personal Passions Nexus */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <TiltCard
                  borderTopColor="var(--accent-green)"
                  style={{
                    height: '100%',
                    background: 'var(--bg-card)',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid var(--border-green)',
                  }}
                >
                  <div className="terminal-header" style={{ marginBottom: '1.2rem' }}>
                    <div className="terminal-dots">
                      <span className="terminal-dot dot-red" />
                      <span className="terminal-dot dot-yellow" />
                      <span className="terminal-dot dot-green" />
                    </div>
                    <span style={{ color: 'var(--accent-green)', fontSize: '0.72rem' }}>PASSIONS // CREATIVE_LAB</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div
                      style={{
                        padding: '0.65rem',
                        background: 'rgba(5, 150, 105, 0.12)',
                        borderRadius: '10px',
                        color: 'var(--accent-green)',
                        border: '1px solid var(--border-green)',
                      }}
                    >
                      <Heart size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                        Hobbies & Explorations
                      </h3>
                      <span style={{ color: 'var(--accent-green)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                        HARDWARE • MEDIA • ARCHITECTURE
                      </span>
                    </div>
                  </div>

                  {/* Interactive Hobbies Mini Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                    {hobbiesData.map((hobby, hIdx) => {
                      const isHovered = activeHobby === hIdx
                      return (
                        <div
                          key={hIdx}
                          onClick={() => setActiveHobby(hIdx)}
                          style={{
                            padding: '0.85rem',
                            background: isHovered ? 'var(--bg-secondary)' : 'var(--bg-card)',
                            border: `1px solid ${isHovered ? hobby.color : 'var(--border-subtle)'}`,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          <div style={{ color: hobby.color, marginBottom: '0.35rem' }}>
                            {hobby.icon}
                          </div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                            {hobby.title}
                          </div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            {hobby.stats}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Active Hobby Description Box */}
                  <div
                    style={{
                      marginTop: 'auto',
                      padding: '0.85rem 1rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', color: hobbiesData[activeHobby].color, fontFamily: 'var(--font-mono)', fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>
                      &gt; {hobbiesData[activeHobby].category}
                    </span>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: '1.5', margin: 0 }}>
                      {hobbiesData[activeHobby].detail}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

function UsersIcon(props) {
  return <Briefcase {...props} />
}
