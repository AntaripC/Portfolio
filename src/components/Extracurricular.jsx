import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  Users,
  Award,
  Sparkles,
  Cpu,
  ShieldCheck,
  Compass,
  Code2,
  GitPullRequest,
  Layers,
  Terminal,
  ExternalLink,
  Github,
  Activity,
  Wifi,
  Radio,
  BookOpen,
  Send,
  Zap,
  Workflow,
  Binary,
  ChevronRight,
  CheckCircle2,
  Target,
  Presentation,
  GraduationCap,
  Globe,
  MapPin,
  Flame,
  ArrowRight,
  ShieldAlert
} from 'lucide-react'
import { TiltCard } from './About.jsx'

export default function Extracurricular() {
  // State for interactive tab switching on the Featured Hackathon Project HUD
  const [activeHudTab, setActiveHudTab] = useState('routing')

  // State for interactive node details in Leadership Pipeline
  const [selectedNode, setSelectedNode] = useState(0)

  // 1. Statistics Data
  const stats = [
    {
      value: '5+',
      label: 'HACKATHONS',
      sub: 'National & University Arenas',
      detail: 'IIT Madras, IIT Ropar, NITK Surathkal & Global Challenges',
      icon: <Trophy size={20} />,
      color: 'var(--accent-cyan)',
      borderColor: 'rgba(0, 240, 255, 0.4)',
      bgGlow: 'rgba(0, 240, 255, 0.08)',
    },
    {
      value: '1+',
      label: 'TEAM LEADERSHIP',
      sub: 'Lead Developer & Coordinator',
      detail: 'Sprint planning, task delegation, Git workflows & jury pitches',
      icon: <Users size={20} />,
      color: 'var(--accent-green)',
      borderColor: 'rgba(16, 185, 129, 0.4)',
      bgGlow: 'rgba(16, 185, 129, 0.08)',
    },
    {
      value: '1',
      label: 'PATENT INNOVATION',
      sub: 'Smart Microplastic Detector',
      detail: 'ESP32 + Spectral Sensor + ThingSpeak cloud telemetry',
      icon: <Cpu size={20} />,
      color: 'var(--accent-purple)',
      borderColor: 'rgba(168, 85, 247, 0.4)',
      bgGlow: 'rgba(168, 85, 247, 0.08)',
    },
    {
      value: '10+',
      label: 'TECHNICAL MODULES',
      sub: 'Production & Prototype Builds',
      detail: 'Cloud pipelines, mapping algorithms, IoT hardware & security',
      icon: <Layers size={20} />,
      color: 'var(--accent-amber)',
      borderColor: 'rgba(251, 191, 36, 0.4)',
      bgGlow: 'rgba(251, 191, 36, 0.08)',
    },
  ]

  // 3. Technical Leadership Nodes
  const leadershipNodes = [
    {
      id: '01',
      title: 'Hackathon Team Leader',
      tag: 'VISION & MILESTONE ALIGNMENT',
      shortDesc: 'Unifying engineers around a sharp MVP scope under high-pressure 24–48h clocks.',
      details: [
        'Establish core architectural milestones and clear MVP deliverables within the first 60 minutes.',
        'Foster active communication, morale, and focus under strict deadline constraints.',
        'Lead synchronization standups every 4 hours to eliminate cross-module roadblocks.',
      ],
      icon: <Users size={22} />,
      color: '#00f0ff',
      logId: 'LEAD_01 // SPRINT_ORCHESTRATION',
    },
    {
      id: '02',
      title: 'Solution Architecture',
      tag: 'SYSTEM & CLOUD BLUEPRINTING',
      shortDesc: 'Designing decoupled frontend, backend APIs, database schemas & hardware telemetry.',
      details: [
        'Architect modular REST/JSON interfaces ensuring backend and frontend develop concurrently.',
        'Select optimal tech stacks balancing rapid hackathon iteration speed and system stability.',
        'Integrate cloud endpoints, caching layers, and database relations for scalable performance.',
      ],
      icon: <Workflow size={22} />,
      color: '#10b981',
      logId: 'LEAD_02 // SYSTEM_DESIGN',
    },
    {
      id: '03',
      title: 'Project Planning & Delegation',
      tag: 'GIT GITFLOW & TASK BREAKDOWN',
      shortDesc: 'Structuring atomic tasks, managing branch merges, and preventing merge conflicts.',
      details: [
        'Break broad features into discrete, actionable developer tasks based on teammate strengths.',
        'Implement structured Git branch policies (feature branches, PR code reviews) under time limits.',
        'Continuously track progress against timeline gates to guarantee a finished submission.',
      ],
      icon: <GitPullRequest size={22} />,
      color: '#a855f7',
      logId: 'LEAD_03 // PIPELINE_GOVERNANCE',
    },
    {
      id: '04',
      title: 'Problem Solving & Rapid Debugging',
      tag: 'CRISIS RESOLUTION',
      shortDesc: 'Diagnosing edge cases, optimizing query latencies, and sensor calibration.',
      details: [
        'Rapid root-cause analysis during unexpected build errors, API drops, or hardware timeouts.',
        'Refactor bottlenecks and implement resilient fallback mechanisms for mission-critical flows.',
        'Ensure end-to-end integration stability before the final freeze window.',
      ],
      icon: <Zap size={22} />,
      color: '#fbbf24',
      logId: 'LEAD_04 // RUNTIME_TRIAGE',
    },
    {
      id: '05',
      title: 'Team Collaboration',
      tag: 'CROSS-FUNCTIONAL SYNERGY',
      shortDesc: 'Synchronizing UI/UX, backend logic, and hardware into a polished prototype.',
      details: [
        'Bridge communication between hardware sensor testers and software web developers.',
        'Conduct live peer testing sessions to validate UX clarity and edge cases.',
        'Cultivate a culture of mutual respect, shared accountability, and relentless drive.',
      ],
      icon: <Sparkles size={22} />,
      color: '#38bdf8',
      logId: 'LEAD_05 // SYNERGY_SYNC',
    },
    {
      id: '06',
      title: 'Technical Presentation',
      tag: 'JURY PITCH & ARCHITECTURE DEFENSE',
      shortDesc: 'Delivering live demos, defending tech trade-offs, and articulating real-world ROI.',
      details: [
        'Distill complex cloud & algorithmic architectures into crisp 3-minute executive pitches.',
        'Demonstrate zero-failure live working prototypes to technical juries and industry mentors.',
        'Field deep technical questions on scalability, security posture, and production roadmaps.',
      ],
      icon: <Presentation size={22} />,
      color: '#f43f5e',
      logId: 'LEAD_06 // DEFENSE_&_COMMUNICATION',
    },
  ]

  // Track Record Arena List
  const trackRecord = [
    {
      event: 'IIT Madras — Road Safety Hackathon 2026',
      role: 'Hackathon Competitor & Dev',
      badge: 'NATIONAL LEVEL',
      color: '#00f0ff',
      summary: 'Engineered real-world, cloud-integrated architectures addressing critical road safety telemetry and incident response.',
      tags: ['Cloud Telemetry', 'IoT Sensors', 'Incident Routing'],
    },
    {
      event: 'IIT Ropar — National Hackathon',
      role: 'Team Lead & Lead Developer',
      badge: 'TEAM LEADER',
      color: '#10b981',
      summary: 'Directed a cross-functional developer team, managing Git repos, task delegations, and delivery of a cloud-native utility model.',
      tags: ['Sprint Management', 'Gitflow', 'System Architecture'],
    },
    {
      event: 'NITK Surathkal — Hack the Thread',
      role: 'Competitive Programmer',
      badge: 'ALGORITHMS',
      color: '#a855f7',
      summary: 'Tackled complex graph algorithms, logical optimization, and high-performance code execution assessments.',
      tags: ['Data Structures', 'Graph Algorithms', 'Optimization'],
    },
    {
      event: 'Solution Challenge 2026',
      role: 'Architect & Prototyper',
      badge: 'SUSTAINABILITY',
      color: '#fbbf24',
      summary: 'Co-authored sustainable cloud-integrated hardware solutions combining sensor telemetry streams with automated dashboards.',
      tags: ['ESP32', 'Cloud Analytics', 'Automation'],
    },
    {
      event: 'College TechFest — Flagship Operations',
      role: 'Core Technical Organizer',
      badge: 'COMMUNITY OPS',
      color: '#38bdf8',
      summary: 'Coordinated technical logistics, database infrastructure logs, and participant routing for university-wide tech competitions.',
      tags: ['Infrastructure Ops', 'Team Coordination', 'Event Logistics'],
    },
  ]

  return (
    <section id="extracurricular" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, rgba(16, 185, 129, 0.02) 50%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '-10%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER & PHILOSOPHY BANNER */}
        {/* ========================================================================= */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-subtitle">
            <Trophy size={14} /> ARENA // HACKATHONS_&_TECH_LEADERSHIP
          </div>
          <h2 style={{ marginBottom: '1rem' }}>Hackathons & Tech Leadership</h2>
          
          {/* Introductory Mission Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(3, 7, 18, 0.85)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '50px',
              padding: '0.65rem 1.4rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 25px rgba(0, 240, 255, 0.12)',
              marginTop: '0.5rem',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-green)',
                boxShadow: '0 0 10px var(--accent-green)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                fontWeight: '600',
                letterSpacing: '0.02em',
              }}
            >
              Building under pressure. Leading teams. Turning ideas into working solutions.
            </span>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 2. HACKATHON STATISTICS & TELEMETRY COUNTER */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.4rem',
            marginBottom: '4.5rem',
          }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TiltCard
                borderTopColor={stat.color}
                style={{
                  height: '100%',
                  background: 'rgba(6, 11, 24, 0.85)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: `0 8px 30px rgba(0, 0, 0, 0.7), inset 0 0 15px ${stat.bgGlow}`,
                }}
              >
                <div className="terminal-header" style={{ marginBottom: '0.85rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: stat.color, fontSize: '0.72rem' }}>METRIC // 0{idx + 1}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                      fontWeight: '800',
                      fontFamily: 'var(--font-main)',
                      color: stat.color,
                      lineHeight: '1',
                      textShadow: `0 0 20px ${stat.color}50`,
                    }}
                  >
                    {stat.value}
                  </span>
                  <div
                    style={{
                      padding: '0.6rem',
                      background: stat.bgGlow,
                      borderRadius: '8px',
                      color: stat.color,
                      border: `1px solid ${stat.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>

                <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.2rem', letterSpacing: '0.04em' }}>
                  {stat.label}
                </h3>
                <span
                  style={{
                    color: stat.color,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    marginBottom: '0.65rem',
                    display: 'block',
                  }}
                >
                  {stat.sub}
                </span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: '1.5', marginTop: 'auto' }}>
                  {stat.detail}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 3. FEATURED HACKATHON PROJECT: SMART CAMPUS NAVIGATOR */}
        {/* ========================================================================= */}
        <div style={{ marginBottom: '5.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
            <div className="cyber-tag" style={{ fontSize: '0.82rem' }}>
              <Compass size={14} style={{ marginRight: '0.3rem' }} /> FEATURED HACKATHON ECOSYSTEM
            </div>
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              FLAGSHIP_PROTOTYPE // 01
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard
              borderTopColor="var(--accent-cyan)"
              style={{
                background: 'linear-gradient(145deg, rgba(8, 14, 28, 0.95) 0%, rgba(3, 7, 18, 0.98) 100%)',
                padding: '2.5rem',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85), inset 0 0 30px rgba(0, 240, 255, 0.06)',
                borderRadius: '16px',
              }}
            >
              {/* Top Terminal Bar */}
              <div className="terminal-header" style={{ marginBottom: '1.75rem' }}>
                <div className="terminal-dots">
                  <span className="terminal-dot dot-red" />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                  <span style={{ marginLeft: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    navigator.system.antarip // Campus Real-time Hub
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)', fontSize: '0.78rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', boxShadow: '0 0 8px var(--accent-green)' }} />
                  STAGE: HACKATHON_WINNER_MODEL
                </div>
              </div>

              {/* 2-Column Showcase Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '2.5rem',
                  alignItems: 'stretch',
                }}
              >
                {/* Left Side: Overview & Architecture Pillars */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div
                      style={{
                        padding: '0.65rem',
                        background: 'rgba(0, 240, 255, 0.12)',
                        borderRadius: '10px',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        color: 'var(--accent-cyan)',
                      }}
                    >
                      <Compass size={28} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', margin: 0 }}>
                        Smart Campus Navigator
                      </h3>
                      <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                        Intelligent Navigation & Food-Delivery Ecosystem
                      </span>
                    </div>
                  </div>

                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '1rem',
                      lineHeight: '1.75',
                      marginBottom: '1.5rem',
                    }}
                  >
                    An intelligent campus navigation and food-delivery ecosystem designed for university campuses. The platform connects students, campus food outlets, and student delivery partners while providing route navigation, menu discovery, and secure online payment.
                  </p>

                  {/* 4 Feature Architecture Pillars */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.75rem' }}>
                    <div
                      style={{
                        padding: '0.85rem',
                        background: 'rgba(3, 7, 18, 0.7)',
                        border: '1px solid rgba(0, 240, 255, 0.15)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: '600' }}>
                        <MapPin size={15} /> Route Navigation
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: 0, lineHeight: '1.4' }}>
                        Graph pathfinding between blocks, labs & accessible elevators.
                      </p>
                    </div>

                    <div
                      style={{
                        padding: '0.85rem',
                        background: 'rgba(3, 7, 18, 0.7)',
                        border: '1px solid rgba(16, 185, 129, 0.15)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-green)', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: '600' }}>
                        <Flame size={15} /> Outlet Discovery
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: 0, lineHeight: '1.4' }}>
                        Live menu aggregation, wait times & digital food court ordering.
                      </p>
                    </div>

                    <div
                      style={{
                        padding: '0.85rem',
                        background: 'rgba(3, 7, 18, 0.7)',
                        border: '1px solid rgba(168, 85, 247, 0.15)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a855f7', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: '600' }}>
                        <Users size={15} /> Peer Delivery
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: 0, lineHeight: '1.4' }}>
                        Connects student delivery partners heading in the same direction.
                      </p>
                    </div>

                    <div
                      style={{
                        padding: '0.85rem',
                        background: 'rgba(3, 7, 18, 0.7)',
                        border: '1px solid rgba(251, 191, 36, 0.15)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: '600' }}>
                        <ShieldCheck size={15} /> Secure Payment
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', margin: 0, lineHeight: '1.4' }}>
                        Tokenized transactions & verified order delivery confirmation.
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      TECHNOLOGY_STACK:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {['JavaScript', 'Node.js', 'JSON', 'Maps/Navigation', 'Cloud', 'Leaflet.js', 'Express API'].map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            padding: '0.3rem 0.65rem',
                            background: 'rgba(0, 240, 255, 0.06)',
                            border: '1px solid rgba(0, 240, 255, 0.25)',
                            color: 'var(--accent-cyan)',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                          }}
                        >
                          ${' '}{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                    <a
                      href="https://github.com/AntaripC"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
                    >
                      <Github size={16} /> View Code Repository
                    </a>
                    <a
                      href="#terminal-section"
                      className="btn btn-outline"
                      style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
                    >
                      <Terminal size={16} /> Query in Terminal
                    </a>
                  </div>
                </div>

                {/* Right Side: Interactive Live Telemetry HUD */}
                <div
                  style={{
                    background: 'rgba(3, 7, 18, 0.95)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'inset 0 0 25px rgba(0, 240, 255, 0.04)',
                  }}
                >
                  {/* HUD Top Controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingBottom: '0.75rem',
                      marginBottom: '1rem',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      HUD_VIEWER // SYSTEM_MONITOR
                    </span>
                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {[
                        { id: 'routing', label: 'Route Graph' },
                        { id: 'orders', label: 'Food Delivery' },
                        { id: 'architecture', label: 'JSON Schema' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveHudTab(tab.id)}
                          style={{
                            padding: '0.25rem 0.6rem',
                            background: activeHudTab === tab.id ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
                            border: `1px solid ${activeHudTab === tab.id ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.1)'}`,
                            color: activeHudTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* HUD Interactive Screen Content */}
                  <div
                    style={{
                      flex: 1,
                      minHeight: '260px',
                      background: 'rgba(1, 4, 10, 0.9)',
                      border: '1px solid rgba(0, 240, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '1rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {activeHudTab === 'routing' && (
                        <motion.div
                          key="routing"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
                        >
                          <div style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Activity size={14} className="pulse" />
                            <span>[ENGINE]: A*_Graph_Pathfinding_Active</span>
                          </div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                            &gt; Origin: Block_34 (CSE_Auditorium)
                          </div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                            &gt; Destination: Block_38 (IoT_Cloud_Lab)
                          </div>
                          <div style={{ color: 'var(--accent-green)', fontSize: '0.78rem' }}>
                            &gt; Path Calculated: 34-F1 -&gt; Skybridge_B -&gt; 38-F3 (Ramp_Accessible)
                          </div>
                          <div style={{ borderTop: '1px dashed rgba(0, 240, 255, 0.2)', paddingTop: '0.5rem', marginTop: '0.3rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Estimated Transit:</span>
                            <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>3.2 mins</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Distance / Elevation:</span>
                            <span style={{ color: 'var(--text-primary)' }}>240m // +12m Ramps</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Obstacle Avoidance:</span>
                            <span style={{ color: 'var(--accent-green)' }}>ACTIVE (0 Congestions)</span>
                          </div>
                        </motion.div>
                      )}

                      {activeHudTab === 'orders' && (
                        <motion.div
                          key="orders"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
                        >
                          <div style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Zap size={14} />
                            <span>[DISPATCH]: Peer_Delivery_Mesh_Connected</span>
                          </div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                            &gt; Active Outlets: 12 Campus Cafeterias
                          </div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                            &gt; Matched Partner: Student_ID #8924 (Heading to Block_38)
                          </div>
                          <div style={{ color: '#a855f7', fontSize: '0.78rem' }}>
                            &gt; Handshake: AES_256 Dynamic QR Token Validated
                          </div>
                          <div style={{ borderTop: '1px dashed rgba(16, 185, 129, 0.2)', paddingTop: '0.5rem', marginTop: '0.3rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                            <span style={{ color: 'var(--accent-green)' }}>#NAV-8942-FD</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Delivery Latency:</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>6.5 mins average</span>
                          </div>
                        </motion.div>
                      )}

                      {activeHudTab === 'architecture' && (
                        <motion.div
                          key="architecture"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          style={{ fontSize: '0.75rem', color: '#38bdf8', overflowX: 'auto', lineHeight: '1.5' }}
                        >
                          <pre style={{ margin: 0, fontFamily: 'var(--font-mono)' }}>
{`{
  "project": "Smart Campus Navigator",
  "status": "HACKATHON_PROTOTYPE",
  "engine": {
    "routing": "A* Dynamic Graph",
    "map_layer": "Leaflet.js + GPS Nodes",
    "backend": "Node.js / Express microservice",
    "storage": "JSON / IndexedDB caching"
  },
  "security": "Encrypted Token Auth"
}`}
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Telemetry bottom line */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <span>PING: 14ms // HTTPS_2.0</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>NODE_ID: LPU_SRV_04</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 4. TECHNICAL LEADERSHIP MATRIX & SPRINT PIPELINE */}
        {/* ========================================================================= */}
        <div style={{ marginBottom: '5.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-subtitle">
              <Workflow size={14} /> LEADERSHIP_PIPELINE // SPRINT_EXECUTION
            </div>
            <h2 style={{ marginBottom: '0.75rem' }}>Technical Leadership & Execution</h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.92rem',
                maxWidth: '680px',
                margin: '0 auto',
                lineHeight: '1.6',
              }}
            >
              How I lead hackathon teams from rapid ideation to scalable system architecture, high-pressure execution, and jury defense.
            </p>
          </div>

          {/* Connected Interactive Leadership Pipeline */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {leadershipNodes.map((node, index) => {
              const isSelected = selectedNode === index
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  onClick={() => setSelectedNode(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <TiltCard
                    borderTopColor={node.color}
                    style={{
                      height: '100%',
                      background: isSelected ? 'rgba(8, 16, 36, 0.95)' : 'rgba(6, 11, 24, 0.75)',
                      border: `1px solid ${isSelected ? node.color : 'rgba(255, 255, 255, 0.08)'}`,
                      boxShadow: isSelected ? `0 10px 30px -5px ${node.color}40, inset 0 0 15px ${node.color}15` : 'none',
                      transition: 'all 0.3s ease',
                      padding: '1.75rem',
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
                      <span style={{ color: node.color, fontSize: '0.72rem' }}>{node.logId}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem' }}>
                      <div
                        style={{
                          padding: '0.6rem',
                          background: `${node.color}15`,
                          color: node.color,
                          borderRadius: '8px',
                          border: `1px solid ${node.color}35`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {node.icon}
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            letterSpacing: '0.08em',
                            color: node.color,
                            fontFamily: 'var(--font-mono)',
                            display: 'block',
                          }}
                        >
                          {node.tag}
                        </span>
                        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: '0.15rem 0 0 0' }}>
                          {node.title}
                        </h3>
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                      {node.shortDesc}
                    </p>

                    {/* Bullet Points */}
                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      {node.details.map((item, dIdx) => (
                        <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <ChevronRight size={13} style={{ color: node.color, marginTop: '0.2rem', flexShrink: 0 }} />
                          <span style={{ lineHeight: '1.4' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. INNOVATION & ACHIEVEMENTS + TECH COMMUNITY TEACHING */}
        {/* ========================================================================= */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {/* Card A: Innovation Achievement (Smart Microplastic Detector) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard
                borderTopColor="#f43f5e"
                style={{
                  height: '100%',
                  background: 'rgba(8, 14, 28, 0.85)',
                  padding: '2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(244, 63, 94, 0.25)',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(244, 63, 94, 0.05)',
                }}
              >
                <div className="terminal-header" style={{ marginBottom: '1.2rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: '#f43f5e', fontSize: '0.72rem' }}>IP_RESEARCH // PATENT_PENDING</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      padding: '0.75rem',
                      background: 'rgba(244, 63, 94, 0.12)',
                      color: '#f43f5e',
                      borderRadius: '10px',
                      border: '1px solid rgba(244, 63, 94, 0.3)',
                    }}
                  >
                    <Cpu size={26} />
                  </div>
                  <div>
                    <span className="cyber-tag red" style={{ fontSize: '0.72rem', marginBottom: '0.2rem' }}>
                      <Award size={12} style={{ marginRight: '0.2rem' }} /> PATENT-PENDING HARDWARE
                    </span>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0 }}>
                      Smart Microplastic Detector
                    </h3>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                  An ESP32-based environmental monitoring and diagnostic system designed for real-time microplastic detection in fluid environments. Integrates multi-spectral optical data with automated cloud alerting.
                </p>

                {/* Technical Bullet Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={15} style={{ color: '#f43f5e', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span><strong>AS7262 Spectral & Turbidity Sensing:</strong> 6-channel optical wavelength analysis quantifying microplastic light dispersion.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={15} style={{ color: '#f43f5e', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span><strong>Cloud Telemetry via WiFi:</strong> Real-time HTTP streaming to ThingSpeak cloud analytics pipelines.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={15} style={{ color: '#f43f5e', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span><strong>Telegram Emergency Bot:</strong> Instant push alerts dispatched to authorities when contamination thresholds spike.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={15} style={{ color: '#f43f5e', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span><strong>Microplastic Index (MPI) Algorithm:</strong> Dynamic mathematical index computed directly on edge firmware.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                  {['ESP32', 'AS7262 Sensor', 'ThingSpeak', 'Telegram API', 'Patent IP'].map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#f43f5e',
                        background: 'rgba(244, 63, 94, 0.08)',
                        border: '1px solid rgba(244, 63, 94, 0.25)',
                        padding: '0.25rem 0.55rem',
                        borderRadius: '4px',
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>

            {/* Card B: Tech Community / Teaching Experience */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard
                borderTopColor="#10b981"
                style={{
                  height: '100%',
                  background: 'rgba(8, 14, 28, 0.85)',
                  padding: '2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(16, 185, 129, 0.05)',
                }}
              >
                <div className="terminal-header" style={{ marginBottom: '1.2rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: '#10b981', fontSize: '0.72rem' }}>COMMUNITY // CDP_OUTREACH</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      padding: '0.75rem',
                      background: 'rgba(16, 185, 129, 0.12)',
                      color: '#10b981',
                      borderRadius: '10px',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    <BookOpen size={26} />
                  </div>
                  <div>
                    <span className="cyber-tag green" style={{ fontSize: '0.72rem', marginBottom: '0.2rem' }}>
                      <GraduationCap size={12} style={{ marginRight: '0.2rem' }} /> LPU CDP INITIATIVE
                    </span>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0 }}>
                      Cybersecurity Awareness Session
                    </h3>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                  Conducted an interactive cybersecurity teaching and awareness session for Class 5 students in a Bengali-medium school as part of the LPU Community Development Project (CDP) initiative.
                </p>

                {/* Bullet Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={15} style={{ color: '#10b981', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span><strong>Fundamental Cyber Hygiene:</strong> Educated young students on safe browsing, password protection, avoiding phishing links, and cyberbullying prevention.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={15} style={{ color: '#10b981', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span><strong>Bilingual Delivery:</strong> Communicated complex technical concepts in simple, engaging Bengali to bridge digital literacy barriers.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={15} style={{ color: '#10b981', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span><strong>Youth Engagement:</strong> Conducted gamified safety quizzes and interactive discussions empowering 50+ students with digital confidence.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                  {['Cybersecurity', 'Public Speaking', 'Community Outreach', 'Bengali Medium', 'LPU CDP'].map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#10b981',
                        background: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        padding: '0.25rem 0.55rem',
                        borderRadius: '4px',
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. HACKATHON TRACK RECORD ARENA (IITs & NATIONAL EVENTS) */}
        {/* ========================================================================= */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-subtitle" style={{ justifyContent: 'flex-start', margin: 0, marginBottom: '0.5rem' }}>
                <Trophy size={14} /> COMPETITION_LOG // TRACK_RECORD
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>
                Verified Hackathon & Competition Arena
              </h3>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>
              5+ SPRINT DELIVERIES // ALL VERIFIED
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.4rem' }}>
            {trackRecord.map((tr, trIdx) => (
              <motion.div
                key={trIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: trIdx * 0.08 }}
              >
                <div
                  style={{
                    background: 'rgba(6, 11, 24, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderLeft: `3px solid ${tr.color}`,
                    borderRadius: '10px',
                    padding: '1.4rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = tr.color
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = `0 10px 25px -5px ${tr.color}30`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)'
                    e.currentTarget.style.borderLeft = `3px solid ${tr.color}`
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        color: tr.color,
                        padding: '0.2rem 0.5rem',
                        background: `${tr.color}15`,
                        borderRadius: '4px',
                        border: `1px solid ${tr.color}30`,
                      }}
                    >
                      {tr.badge}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Role: {tr.role}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                    {tr.event}
                  </h4>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: '1.55', marginBottom: '1rem', flex: 1 }}>
                    {tr.summary}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto' }}>
                    {tr.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-muted)',
                          background: 'rgba(3, 7, 18, 0.8)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '3px',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
