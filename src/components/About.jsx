import React, { useRef, useState, useEffect } from 'react'
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
  Terminal as TerminalIcon,
  Play,
  Activity,
  CheckCircle2,
  ArrowRight,
  Radio,
  FileCode2,
  Share2,
  MapPin,
  Calendar,
  ChevronRight
} from 'lucide-react'

// Custom TiltCard component for interactive 3D parallax hover effect
export function TiltCard({ children, borderTopColor = 'var(--accent-primary)', style = {}, ...props }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 }
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), springConfig)

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

  // Perspective Tab in Master Bio
  const [activeBioTab, setActiveBioTab] = useState('cloud')
  // Academic switcher tab (LPU vs Krishnath College School)
  const [activeEduTab, setActiveEduTab] = useState('lpu')
  // Interactive Core Attribute selector
  const [selectedAttribute, setSelectedAttribute] = useState(0)
  // Interactive Hobby selector
  const [activeHobby, setActiveHobby] = useState(0)

  // Built-in Console State
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'INIT // SECURE_CLOUD_OS_V4.19 [KERNEL: x86_64-aws-k8s]' },
    { type: 'system', text: 'AUTH: VERIFIED (Antarip Chatterjee // Lead Cloud Systems Engineer)' },
    { type: 'info', text: "Type 'help' to inspect command capabilities or click Quick Run below." },
  ])
  const [isExecuting, setIsExecuting] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase()
    if (!trimmed) return

    setHistory((prev) => [...prev, { type: 'user', text: `$ ${cmdText}` }])
    setInput('')
    setIsExecuting(true)

    setTimeout(() => {
      processCommand(trimmed)
      setIsExecuting(false)
    }, 250)
  }

  const processCommand = (cmd) => {
    switch (cmd) {
      case 'help':
        setHistory((prev) => [
          ...prev,
          { type: 'system', text: '=== AVAILABLE SYSTEM UTILITIES ===' },
          { type: 'info', text: '  whoami       - Operative profile & academic identity' },
          { type: 'info', text: '  cloud-audit  - Scan AWS/GCP IAM roles, VPC subnets & K8s pods' },
          { type: 'info', text: '  skills       - Query active engineering competencies' },
          { type: 'info', text: '  patent-iot   - Inspect Smart Microplastic Detector IoT telemetry' },
          { type: 'info', text: '  clear        - Flush terminal buffer' },
        ])
        break

      case 'whoami':
        setHistory((prev) => [
          ...prev,
          { type: 'highlight', text: '[PROFILE IDENTIFIER]' },
          { type: 'text', text: '  Name: Antarip Chatterjee' },
          { type: 'text', text: '  Degree: B.Tech CSE (Cloud Computing) @ Lovely Professional University' },
          { type: 'text', text: '  Cohort Standing: Top 1% Global Cohort' },
          { type: 'text', text: '  Key Roles: Lead Cloud Systems Architect & IoT Researcher' },
          { type: 'text', text: '  Target: Summer 2027 Internship (Cloud Architecture / DevOps / SWE)' },
        ])
        break

      case 'cloud-audit':
        setHistory((prev) => [
          ...prev,
          { type: 'highlight', text: '[EXECUTING CLOUD SECURITY & COMPLIANCE SCAN...]' },
          { type: 'success', text: '  ✓ AWS IAM Zero-Trust Matrix: PASS (Least-privilege enforced)' },
          { type: 'success', text: '  ✓ VPC Multi-AZ Peering: ACTIVE (us-east-1a / us-east-1b)' },
          { type: 'success', text: '  ✓ Kubernetes Node Pods: 100% HEALTHY (0 CrashLoopBackOff)' },
          { type: 'info', text: '  -> AUDIT RESULT: Infrastructure Ready for Enterprise Deployment.' },
        ])
        break

      case 'skills':
        setHistory((prev) => [
          ...prev,
          { type: 'highlight', text: '[ACTIVE STACK & TOOLCHAIN]' },
          { type: 'text', text: '  Cloud & DevOps: AWS (EC2, S3, IAM, VPC), GCP, Docker, Kubernetes, CI/CD' },
          { type: 'text', text: '  Languages: Python, C/C++, JavaScript, SQL' },
          { type: 'text', text: '  Backend & Data: Node.js, Express, MongoDB, MySQL, Pandas' },
          { type: 'text', text: '  Embedded IoT: ESP32, AS7262 Spectrometer, ThingSpeak, C/C++ Firmware' },
        ])
        break

      case 'patent-iot':
        setHistory((prev) => [
          ...prev,
          { type: 'highlight', text: '[PATENT INNOVATION // IOT HARDWARE]' },
          { type: 'text', text: '  Invention: Smart Microplastic Detector (ESP32)' },
          { type: 'text', text: '  Sensors: 6-Channel Optical Spectroscopy (AS7262) & Turbidity flow-cell' },
          { type: 'text', text: '  Telemetry: Live ThingSpeak Cloud Streams & Telegram Emergency Alerts' },
          { type: 'success', text: '  Status: Patent Application Filed & Functional Prototype Verified.' },
        ])
        break

      case 'clear':
        setHistory([])
        break

      default:
        setHistory((prev) => [
          ...prev,
          { type: 'error', text: `Command not recognized: '${cmd}'. Type 'help' for available commands.` },
        ])
        break
    }
  }

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
      icon: <Briefcase size={18} />,
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
      icon: <Cpu size={20} />,
      color: 'var(--accent-primary)',
      detail: 'Tinkering with microcontrollers, breakout boards, sensors, and hardware circuits to test real-world physical computing concepts.',
      stats: 'ESP32 • Arduino • Sensors',
    },
    {
      title: 'Photography & Video Editing',
      category: 'CREATIVE MEDIA',
      icon: <Camera size={20} />,
      color: 'var(--accent-green)',
      detail: 'Crafting cinematic visual narratives, color grading, and framing dynamic visual content for digital campaigns and personal projects.',
      stats: 'Color Grading • Composition',
    },
    {
      title: 'Exploring Tech Architecture',
      category: 'SYSTEM STUDY',
      icon: <Layers size={20} />,
      color: 'var(--accent-purple)',
      detail: 'Deep-diving into whitepapers, cloud infrastructure benchmarks, high-scale distributed designs, and edge computing innovations.',
      stats: 'Distributed Specs • Cloud Benchmarks',
    },
    {
      title: 'IoT Device Tinkering',
      category: 'AUTOMATION & ROBOTICS',
      icon: <Zap size={20} />,
      color: 'var(--accent-amber)',
      detail: 'Building autonomous sensor nodes, wireless telemetry relays, and smart ambient monitors for real-time environment intelligence.',
      stats: 'Wireless Relays • Cloud Telemetry',
    },
  ]

  return (
    <section id="about" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-subtitle">
            <User size={14} /> COMMAND_CENTER // OPERATIVE_DOSSIER
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Executive Bio & Engineering Command</h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            Unified engineering hub: interactive system terminal, verified academic milestones, strategic capabilities, and creative technical passions.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* BENTO GRID 2.0 COMMAND CENTER LAYOUT */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.75rem',
          }}
        >
          {/* ======================================================================= */}
          {/* BENTO CARD 1: EXECUTIVE BIO & PERSPECTIVE SWITCHER (8 COLS) */}
          {/* ======================================================================= */}
          <div style={{ gridColumn: 'span 12', lg: 'span 8' }} className="bento-span-8">
            <TiltCard
              borderTopColor="var(--accent-primary)"
              style={{
                height: '100%',
                background: 'var(--bg-card-elevated)',
                padding: '2.2rem',
                border: '1px solid var(--border-color)',
                boxShadow: '0 15px 40px rgba(15, 23, 42, 0.06)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className="terminal-header" style={{ marginBottom: '1.25rem' }}>
                <div className="terminal-dots">
                  <span className="terminal-dot dot-red" />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                  <span style={{ marginLeft: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    antarip.dossier // CORE_SYSTEMS_PROFILE
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-green)', fontSize: '0.78rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', boxShadow: '0 0 8px var(--accent-green)' }} />
                  STATUS: ACTIVE BUILDER
                </div>
              </div>

              <h3 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', marginBottom: '0.75rem', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                Architecting Cloud Ecosystems & IoT Edge Systems
              </h3>

              {/* Perspective Filter Pills */}
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'cloud', label: 'Cloud & Systems', icon: <Cpu size={14} /> },
                  { id: 'iot', label: 'IoT & Patent Research', icon: <Zap size={14} /> },
                  { id: 'leadership', label: 'Leadership & Hackathons', icon: <Sparkles size={14} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveBioTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.35rem 0.8rem',
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

              {/* Dynamic Perspective Content */}
              <div style={{ flex: 1, minHeight: '110px' }}>
                <AnimatePresence mode="wait">
                  {activeBioTab === 'cloud' && (
                    <motion.p
                      key="cloud"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.8', margin: 0 }}
                    >
                      I am a <strong>B.Tech Computer Science Engineering undergraduate</strong> specializing in <strong>Cloud Computing</strong> at LPU. I thrive in high-pressure hackathons—frequently leading teams—architecting decoupled cloud topologies, containerized microservices, and secure backend systems under strict 24–48h clocks.
                    </motion.p>
                  )}

                  {activeBioTab === 'iot' && (
                    <motion.p
                      key="iot"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.8', margin: 0 }}
                    >
                      My research bridges the critical gap between <strong>cloud systems</strong> and <strong>physical IoT hardware telemetry</strong>. As the inventor of the patent-pending <em>Smart Microplastic Detector</em>, I engineer ESP32 edge firmware with 6-channel optical spectrometry and automated cloud alerts.
                    </motion.p>
                  )}

                  {activeBioTab === 'leadership' && (
                    <motion.p
                      key="leadership"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.8', margin: 0 }}
                    >
                      Across hackathons and university initiatives, I direct cross-functional engineering squads, sprint deliverables, and technical jury demonstrations. I am seeking a <strong>Summer 2027 internship</strong> to contribute to high-impact enterprise engineering teams.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* 3 Metric Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>COHORT STANDING</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--accent-primary)', marginTop: '0.15rem' }}>Top 1%</div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Global Rank @ LPU</span>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-green)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RESEARCH IP</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--accent-green)', marginTop: '0.15rem' }}>Patent Pending</div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>IoT Spectral Detector</span>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-purple)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>SPRINT LEAD</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--accent-purple)', marginTop: '0.15rem' }}>5+ Sprints</div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Hackathons & Teams</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* ======================================================================= */}
          {/* BENTO CARD 2: ACADEMIC NEXUS (4 COLS) */}
          {/* ======================================================================= */}
          <div style={{ gridColumn: 'span 12', lg: 'span 4' }} className="bento-span-4">
            <TiltCard
              borderTopColor="var(--accent-green)"
              style={{
                height: '100%',
                background: 'var(--bg-card)',
                padding: '1.8rem',
                border: '1px solid var(--border-green)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className="terminal-header" style={{ marginBottom: '1rem' }}>
                <div className="terminal-dots">
                  <span className="terminal-dot dot-red" />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                </div>
                <span style={{ color: 'var(--accent-green)', fontSize: '0.72rem', fontWeight: '600' }}>ACADEMIC_NEXUS</span>
              </div>

              {/* Institute Switcher Tabs */}
              <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1.1rem', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <button
                  onClick={() => setActiveEduTab('lpu')}
                  style={{
                    flex: 1,
                    padding: '0.35rem 0.6rem',
                    background: activeEduTab === 'lpu' ? 'var(--bg-card)' : 'transparent',
                    border: `1px solid ${activeEduTab === 'lpu' ? 'var(--border-color)' : 'transparent'}`,
                    color: activeEduTab === 'lpu' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  LPU (2029)
                </button>
                <button
                  onClick={() => setActiveEduTab('school')}
                  style={{
                    flex: 1,
                    padding: '0.35rem 0.6rem',
                    background: activeEduTab === 'school' ? 'var(--bg-card)' : 'transparent',
                    border: `1px solid ${activeEduTab === 'school' ? 'var(--border-green)' : 'transparent'}`,
                    color: activeEduTab === 'school' ? 'var(--accent-green)' : 'var(--text-secondary)',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  Krishnath (2025)
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeEduTab === 'lpu' ? (
                  <motion.div
                    key="lpu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.85rem' }}>
                      <div style={{ padding: '0.6rem', background: 'rgba(217, 119, 6, 0.1)', borderRadius: '8px', color: 'var(--accent-primary)', border: '1px solid var(--border-color)' }}>
                        <GraduationCap size={22} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                          B.TECH CSE (CLOUD)
                        </span>
                        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: '0.15rem 0 0 0' }}>
                          Lovely Professional University
                        </h4>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
                      Ranked in the <strong>Top 1% of cohort globally</strong>. Specializing in Cloud Virtualization, Distributed Microservices, and Edge IoT Telemetry.
                    </p>

                    <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {['Distributed Systems', 'Cloud Virtualization', 'DevOps CI/CD', 'IoT Systems'].map((m, idx) => (
                        <span key={idx} style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', background: 'var(--bg-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                          #{m}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="school"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.85rem' }}>
                      <div style={{ padding: '0.6rem', background: 'rgba(5, 150, 105, 0.1)', borderRadius: '8px', color: 'var(--accent-green)', border: '1px solid var(--border-green)' }}>
                        <School size={22} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                          COMPLETED 2025
                        </span>
                        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: '0.15rem 0 0 0' }}>
                          Krishnath College School
                        </h4>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
                      Senior Secondary (12th Grade) • Advanced PCMB (Physics, Chemistry, Mathematics, Biology) with high analytical rigor.
                    </p>

                    <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Analytical Logic'].map((m, idx) => (
                        <span key={idx} style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', background: 'var(--bg-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-green)' }}>
                          #{m}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TiltCard>
          </div>

          {/* ======================================================================= */}
          {/* BENTO CARD 3: INTERACTIVE CLOUD COMMAND CONSOLE (7 COLS) */}
          {/* ======================================================================= */}
          <div style={{ gridColumn: 'span 12', lg: 'span 7' }} className="bento-span-7">
            <TiltCard
              borderTopColor="var(--accent-cyan)"
              style={{
                height: '100%',
                background: 'var(--bg-card-elevated)',
                padding: '1.8rem',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className="terminal-header" style={{ marginBottom: '1rem' }}>
                <div className="terminal-dots">
                  <span className="terminal-dot dot-red" />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                  <span style={{ marginLeft: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                    antarip@cloud-terminal: ~/telemetry-ops
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-green)', fontSize: '0.74rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', boxShadow: '0 0 6px var(--accent-green)' }} />
                  LIVE_SOCKET
                </div>
              </div>

              {/* Console Output Screen */}
              <div
                style={{
                  flex: 1,
                  minHeight: '180px',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                  padding: '0.5rem 0',
                }}
              >
                {history.map((line, idx) => {
                  let color = 'var(--text-primary)'
                  if (line.type === 'system') color = 'var(--accent-primary)'
                  if (line.type === 'user') color = 'var(--accent-cyan)'
                  if (line.type === 'info') color = 'var(--accent-amber)'
                  if (line.type === 'highlight') color = 'var(--accent-purple)'
                  if (line.type === 'success') color = 'var(--accent-green)'
                  if (line.type === 'error') color = 'var(--accent-red)'

                  return (
                    <div key={idx} style={{ color, wordBreak: 'break-word', lineHeight: '1.5' }}>
                      {line.text}
                    </div>
                  )
                })}
                <div ref={bottomRef} />
              </div>

              {/* Quick Run Action Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', alignSelf: 'center' }}>
                  Quick:
                </span>
                {[
                  { label: 'cloud-audit', desc: 'Scan' },
                  { label: 'whoami', desc: 'Bio' },
                  { label: 'skills', desc: 'Stack' },
                  { label: 'patent-iot', desc: 'ESP32' },
                  { label: 'clear', desc: 'Clear' },
                ].map((btn, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCommand(btn.label)}
                    disabled={isExecuting}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--accent-primary)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '5px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    $ {btn.label}
                  </button>
                ))}
              </div>

              {/* Console Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleCommand(input)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--bg-secondary)',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '0.82rem' }}>
                  ops:~$
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="type 'help', 'cloud-audit', 'whoami'..."
                  disabled={isExecuting}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                  }}
                />
                <button
                  type="submit"
                  disabled={isExecuting || !input.trim()}
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary), #b45309)',
                    border: 'none',
                    color: '#ffffff',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '5px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: isExecuting ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Play size={10} style={{ display: 'inline', marginRight: '3px' }} /> EXEC
                </button>
              </form>
            </TiltCard>
          </div>

          {/* ======================================================================= */}
          {/* BENTO CARD 4: CORE ATTRIBUTES & HOBBY LAB (5 COLS) */}
          {/* ======================================================================= */}
          <div style={{ gridColumn: 'span 12', lg: 'span 5' }} className="bento-span-5">
            <TiltCard
              borderTopColor="var(--accent-purple)"
              style={{
                height: '100%',
                background: 'var(--bg-card)',
                padding: '1.8rem',
                border: '1px solid var(--border-purple)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className="terminal-header" style={{ marginBottom: '0.85rem' }}>
                <div className="terminal-dots">
                  <span className="terminal-dot dot-red" />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                </div>
                <span style={{ color: 'var(--accent-purple)', fontSize: '0.72rem', fontWeight: '600' }}>
                  CAPABILITY_RADAR
                </span>
              </div>

              <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Technical Mindset & Passions
              </h4>

              {/* Attribute Selector Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                {attributesData.map((attr, idx) => {
                  const isSelected = selectedAttribute === idx
                  return (
                    <button
                      key={attr.id}
                      onClick={() => setSelectedAttribute(idx)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.35rem 0.65rem',
                        background: isSelected ? 'var(--bg-secondary)' : 'transparent',
                        border: `1px solid ${isSelected ? attr.color : 'var(--border-subtle)'}`,
                        color: isSelected ? attr.color : 'var(--text-secondary)',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: isSelected ? '700' : '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {attr.icon}
                      #{attr.name.split(' ')[0]}
                    </button>
                  )
                })}
              </div>

              {/* Active Attribute Readout */}
              <div
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '0.85rem',
                  marginBottom: '1rem',
                }}
              >
                <span style={{ fontSize: '0.7rem', color: attributesData[selectedAttribute].color, fontFamily: 'var(--font-mono)', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                  &gt; {attributesData[selectedAttribute].tag}
                </span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: '1.5', margin: 0 }}>
                  {attributesData[selectedAttribute].desc}
                </p>
              </div>

              {/* Creative Hobby Lab */}
              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.5rem' }}>
                  CREATIVE_&_RESEARCH_LAB:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {hobbiesData.slice(0, 2).map((hobby, hIdx) => (
                    <div
                      key={hIdx}
                      style={{
                        padding: '0.6rem 0.75rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                      }}
                    >
                      <div style={{ color: hobby.color, marginBottom: '0.2rem' }}>
                        {hobby.icon}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                        {hobby.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  )
}
