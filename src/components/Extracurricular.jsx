import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Users,
  Target,
  Trophy,
  Zap,
  Globe,
  Share2,
  TrendingUp,
  Award,
  Terminal,
  Calendar,
  Compass,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Github,
  MapPin,
  Flame,
  ShieldCheck,
  Code2,
  ChevronRight,
  BookOpen,
  GraduationCap
} from 'lucide-react'
import { TiltCard } from './About'

export default function Extracurricular() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40])

  // Interactive HUD tab for Smart Campus Navigator
  const [activeHudTab, setActiveHudTab] = useState('routing')
  // Interactive Node selection for Leadership matrix
  const [selectedNode, setSelectedNode] = useState(0)

  // 1. Core Metrics & Stats
  const stats = [
    {
      num: '5+',
      label: 'HACKATHONS EXECUTED',
      sub: 'IITs & Premier Universities',
      color: 'var(--accent-primary)',
      icon: <Trophy size={20} />,
      bgGlow: 'var(--accent-glow)',
    },
    {
      num: '1',
      label: 'PATENT INNOVATION (ESP32)',
      sub: 'Smart Microplastic Detector',
      color: 'var(--accent-green)',
      icon: <Zap size={20} />,
      bgGlow: 'rgba(5, 150, 105, 0.08)',
    },
    {
      num: 'Top 1%',
      label: 'ACADEMIC RANKING',
      sub: 'B.Tech CSE @ LPU Global Cohort',
      color: 'var(--accent-purple)',
      icon: <Award size={20} />,
      bgGlow: 'rgba(124, 58, 237, 0.08)',
    },
    {
      num: '500+',
      label: 'COMMUNITY & LEADERSHIP',
      sub: 'Technical Mentorship & Hackathons',
      color: 'var(--accent-amber)',
      icon: <Users size={20} />,
      bgGlow: 'rgba(217, 119, 6, 0.08)',
    },
  ]

  // 2. Technical Leadership Pillars
  const leadershipNodes = [
    {
      id: 'brand',
      title: 'Technical Mentorship & Outreach',
      tag: 'OUTREACH ARCHITECTURE',
      role: 'Hackathon Squad Lead',
      logId: 'NODE // MKT_01',
      color: 'var(--accent-primary)',
      icon: <TrendingUp size={22} />,
      shortDesc: 'Mentoring junior developers in foundational cloud principles, cybersecurity hygiene, and rapid prototype delivery.',
      details: [
        'Organized collaborative developer workshops on cloud infrastructure and REST APIs.',
        'Established consistent architectural standards, visual aesthetics, and project roadmaps for hackathon teams.',
        'Collaborated with design and engineering squads to deliver high-impact technical demonstrations.',
      ],
    },
    {
      id: 'operations',
      title: 'Cross-Functional Team Leadership',
      tag: 'ORGANIZATIONAL GOVERNANCE',
      role: 'Core Management Squad',
      logId: 'NODE // OPS_02',
      color: 'var(--accent-green)',
      icon: <Users size={22} />,
      shortDesc: 'Managing cross-disciplinary sub-teams across content, social media, outreach, and ground public relations.',
      details: [
        'Directed weekly syncs, sprint delegations, and task pipelines ensuring 100% on-time event deliverables.',
        'Mentored junior squad members on technical documentation, engagement analytics, and team coordination.',
        'Bridged communication between faculty advisors, student executive council, and external participants.',
      ],
    },
    {
      id: 'events',
      title: 'Flagship Event Promotions & Media',
      tag: 'EVENT EXECUTION & SCALE',
      role: 'Campaign Director',
      logId: 'NODE // EVT_03',
      color: 'var(--accent-purple)',
      icon: <Sparkles size={22} />,
      shortDesc: 'Driving attendee registrations, sponsorship pitches, and digital buzz for university seminars and tech workshops.',
      details: [
        'Executed end-to-end promotional funnels yielding packed attendee turnouts for flagship workshops.',
        'Analyzed post-campaign performance data to optimize messaging resonance and social reach.',
        'Coordinated with sponsor liaisons and campus community networks to amplify sponsor visibility.',
      ],
    },
  ]

  // 3. Verified Hackathons & Competitions Track Record
  const trackRecord = [
    {
      event: 'Smart Campus Navigator // Flagship Hackathon',
      badge: 'FLAGSHIP SPRINT',
      role: 'Lead Architect & Full Stack Dev',
      color: 'var(--accent-primary)',
      summary: 'Engineered a unified campus navigation graph and peer food-delivery ecosystem under 36 hours. Delivered real-time route pathfinding and order coordination.',
      tags: ['JavaScript', 'Node.js', 'Campus Navigation', 'Leaflet.js', 'Express API'],
    },
    {
      event: 'Smart Microplastic Detector (ESP32) // Hardware Hackathon',
      badge: 'PATENT INNOVATION',
      role: 'IoT Firmware & Hardware Lead',
      color: 'var(--accent-green)',
      summary: 'Prototyped a portable water quality diagnostic unit using ESP32, AS7262 6-channel optical spectrometry, and ThingSpeak cloud telemetry.',
      tags: ['ESP32', 'C/C++', 'AS7262 Sensor', 'ThingSpeak Cloud', 'Telegram Bot'],
    },
    {
      event: 'IIT & National Arena Hackathons (5+ Completed)',
      badge: 'NATIONAL COMPETITOR',
      role: 'Team Lead & Backend Engineer',
      color: 'var(--accent-purple)',
      summary: 'Competed across 5+ intense 24-48h hackathons, architecting backend microservices, real-time data feeds, and jury demo defenses.',
      tags: ['Team Leadership', 'Gitflow', 'Rapid MVP', 'High Pressure', 'Jury Defense'],
    },
  ]

  return (
    <section
      id="leadership"
      className="section"
      ref={sectionRef}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER */}
        {/* ========================================================================= */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-subtitle">
            <Trophy size={14} /> EXTRACURRICULAR // SPRINT_LEADERSHIP & HACKATHONS
          </div>
          <h2 style={{ marginBottom: '1rem' }}>Hackathons & Tech Leadership</h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              maxWidth: '750px',
              margin: '0 auto',
            }}
          >
            Proven track record of high-speed execution under 24–48h hackathon clocks, technical team leadership, and patent-pending IoT engineering.
          </p>

          {/* Core Philosophy Banner Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '50px',
              padding: '0.65rem 1.4rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 20px var(--accent-glow)',
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
                  background: 'var(--bg-card)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
                }}
              >
                <div className="terminal-header" style={{ marginBottom: '0.85rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: stat.color, fontSize: '0.72rem', fontWeight: '600' }}>METRIC // 0{idx + 1}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                      fontWeight: '800',
                      fontFamily: 'var(--font-main)',
                      color: stat.color,
                      lineHeight: '1',
                    }}
                  >
                    {stat.num}
                  </span>
                  <div
                    style={{
                      padding: '0.65rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: '8px',
                      color: stat.color,
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.04em',
                    marginBottom: '0.35rem',
                  }}
                >
                  {stat.label}
                </div>

                <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: 'auto' }}>
                  {stat.sub}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 3. FLAGSHIP HACKATHON BUILD: SMART CAMPUS NAVIGATOR (INTERACTIVE DOSSIER) */}
        {/* ========================================================================= */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div className="cyber-tag" style={{ fontSize: '0.85rem' }}>
              <Compass size={14} style={{ marginRight: '0.3rem' }} /> FLAGSHIP HACKATHON INNOVATION
            </div>
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              CAMPUS_ECOSYSTEM_DOSSIER
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard
              borderTopColor="var(--accent-primary)"
              style={{
                background: 'var(--bg-card-elevated)',
                padding: '2.5rem',
                border: '1px solid var(--border-color)',
                boxShadow: '0 15px 45px rgba(15, 23, 42, 0.08), inset 0 0 30px rgba(217, 119, 6, 0.02)',
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
                        background: 'rgba(217, 119, 6, 0.1)',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      <Compass size={28} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', margin: 0 }}>
                        Smart Campus Navigator
                      </h3>
                      <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: '600' }}>
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
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: '600' }}>
                        <MapPin size={15} /> Route Navigation
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.76rem', margin: 0, lineHeight: '1.4' }}>
                        Graph pathfinding between blocks, labs & accessible elevators.
                      </p>
                    </div>

                    <div
                      style={{
                        padding: '0.85rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-green)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-green)', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: '600' }}>
                        <Flame size={15} /> Outlet Discovery
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.76rem', margin: 0, lineHeight: '1.4' }}>
                        Live menu aggregation, wait times & digital food court ordering.
                      </p>
                    </div>

                    <div
                      style={{
                        padding: '0.85rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-purple)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-purple)', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: '600' }}>
                        <Users size={15} /> Peer Delivery
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.76rem', margin: 0, lineHeight: '1.4' }}>
                        Connects student delivery partners heading in the same direction.
                      </p>
                    </div>

                    <div
                      style={{
                        padding: '0.85rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-amber)', marginBottom: '0.3rem', fontSize: '0.85rem', fontWeight: '600' }}>
                        <ShieldCheck size={15} /> Secure Payment
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.76rem', margin: 0, lineHeight: '1.4' }}>
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
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--accent-primary)',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            fontWeight: '600',
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
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'inset 0 0 25px rgba(217, 119, 6, 0.03)',
                  }}
                >
                  {/* HUD Top Controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid var(--border-subtle)',
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
                            background: activeHudTab === tab.id ? 'var(--bg-card)' : 'transparent',
                            border: `1px solid ${activeHudTab === tab.id ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                            color: activeHudTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: '600',
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
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
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
                        >
                          <div style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontWeight: '700' }}>
                            // ACTIVE_GRAPH_PATHFINDING
                          </div>
                          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            <div>[ORIGIN] Block 34 (Computer Science Dept)</div>
                            <div>[DESTINATION] Central Food Court (Block 12)</div>
                            <div style={{ color: 'var(--accent-green)', margin: '0.35rem 0' }}>
                              ⚡ Optimal Path: B34 → Skybridge 3 → Core Mall → Food Hall [380m • 4.2 min]
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                              Accessibility Mode: Ramp & Elevator Enabled
                            </div>
                          </div>
                          <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>GPS_ACCURACY: 2.1m</span>
                            <span style={{ color: 'var(--accent-green)' }}>PATH_OPTIMAL: 100%</span>
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
                        >
                          <div style={{ color: 'var(--accent-green)', marginBottom: '0.5rem', fontWeight: '700' }}>
                            // REAL_TIME_PEER_DISPATCH
                          </div>
                          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            <div>ORDER_ID: #LPU-FD-8942</div>
                            <div>OUTLET: Campus Deli &bull; 2x Hot Roast Sandwiches</div>
                            <div style={{ color: 'var(--accent-primary)', margin: '0.35rem 0' }}>
                              🛵 Peer Courier: Rahul S. (Heading to Block 34 in 5 min)
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                              Status: Picked Up &bull; PIN-Verified Handover Required
                            </div>
                          </div>
                          <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>PAYMENT: UPI_ESCROW</span>
                            <span style={{ color: 'var(--accent-green)' }}>DELIVERY_FEE: ₹15 (Earned)</span>
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
                        >
                          <div style={{ color: 'var(--accent-purple)', marginBottom: '0.4rem', fontWeight: '700' }}>
                            // JSON_DATA_CONTRACT (SCHEMAS)
                          </div>
                          <pre
                            style={{
                              margin: 0,
                              color: 'var(--text-secondary)',
                              fontSize: '0.72rem',
                              lineHeight: '1.45',
                              overflowX: 'auto',
                            }}
                          >
{`{
  "orderId": "NAV-8942",
  "route": { "source": "B34", "target": "B12", "distanceMeters": 380 },
  "courier": { "peerId": "USER_719", "authBadge": true },
  "telemetry": { "lat": 31.2536, "lng": 75.7037, "status": "TRANSIT" }
}`}
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 4. TECHNICAL LEADERSHIP MATRIX */}
        {/* ========================================================================= */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-subtitle" style={{ justifyContent: 'flex-start', margin: 0, marginBottom: '0.5rem' }}>
                <TrendingUp size={14} /> LEADERSHIP_POSITION // TECHNICAL_MENTOR
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>
                Technical & Community Leadership
              </h3>
            </div>
            <div className="cyber-tag" style={{ margin: 0 }}>
              <Users size={14} style={{ marginRight: '0.3rem' }} /> SPRINT LEADERSHIP
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
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
                      background: isSelected ? 'var(--bg-card-elevated)' : 'var(--bg-card)',
                      border: `1px solid ${isSelected ? node.color : 'var(--border-subtle)'}`,
                      boxShadow: isSelected ? '0 10px 30px rgba(15, 23, 42, 0.08)' : 'none',
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
                      <span style={{ color: node.color, fontSize: '0.72rem', fontWeight: '600' }}>{node.logId}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem' }}>
                      <div
                        style={{
                          padding: '0.6rem',
                          background: 'var(--bg-secondary)',
                          color: node.color,
                          borderRadius: '8px',
                          border: '1px solid var(--border-subtle)',
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
                        <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
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
                  background: 'var(--bg-card)',
                  padding: '2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(244, 63, 94, 0.25)',
                  boxShadow: '0 15px 40px rgba(15, 23, 42, 0.06)',
                }}
              >
                <div className="terminal-header" style={{ marginBottom: '1.2rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: '#f43f5e', fontSize: '0.72rem', fontWeight: '600' }}>IP_RESEARCH // PATENT_PENDING</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      padding: '0.75rem',
                      background: 'rgba(244, 63, 94, 0.1)',
                      color: '#f43f5e',
                      borderRadius: '10px',
                      border: '1px solid rgba(244, 63, 94, 0.3)',
                    }}
                  >
                    <Zap size={26} />
                  </div>
                  <div>
                    <span className="cyber-tag red" style={{ fontSize: '0.72rem', marginBottom: '0.2rem' }}>
                      PATENT APPLICATION FILED
                    </span>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0 }}>
                      Smart Microplastic Detector (ESP32)
                    </h3>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                  Designed and prototyped an autonomous embedded spectral device to detect and quantify microplastic concentration levels in aquatic samples in real time.
                </p>

                {/* Bullet Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={15} style={{ color: '#f43f5e', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span><strong>6-Channel Optical Spectroscopy:</strong> Integrated AS7262 multi-spectral sensor with custom optical flow-cell algorithms.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={15} style={{ color: '#f43f5e', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span><strong>Real-time Cloud Streams:</strong> Automated WiFi telemetry pushing contamination metrics directly to ThingSpeak Cloud.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={15} style={{ color: '#f43f5e', marginTop: '0.15rem', flexShrink: 0 }} />
                    <span><strong>Instant Emergency Alerts:</strong> Automated Telegram Bot dispatches threshold warnings whenever high microplastic indices are detected.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                  {['ESP32 Microcontroller', 'C/C++ Firmware', 'AS7262 Spectroscopy', 'ThingSpeak IoT', 'Telegram Bot'].map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#f43f5e',
                        background: 'var(--bg-secondary)',
                        border: '1px solid rgba(244, 63, 94, 0.25)',
                        padding: '0.25rem 0.55rem',
                        borderRadius: '4px',
                        fontWeight: '600',
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>

            {/* Card B: Tech Teaching & Social Responsibility */}
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
                  background: 'var(--bg-card)',
                  padding: '2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  boxShadow: '0 15px 40px rgba(15, 23, 42, 0.06)',
                }}
              >
                <div className="terminal-header" style={{ marginBottom: '1.2rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: '#10b981', fontSize: '0.72rem', fontWeight: '600' }}>COMMUNITY // CDP_OUTREACH</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      padding: '0.75rem',
                      background: 'rgba(16, 185, 129, 0.1)',
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
                        background: 'var(--bg-secondary)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        padding: '0.25rem 0.55rem',
                        borderRadius: '4px',
                        fontWeight: '600',
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
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
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
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderLeft: `3px solid ${tr.color}`,
                    borderRadius: '10px',
                    padding: '1.4rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = tr.color
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = `0 10px 25px -5px ${tr.color}30`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid var(--border-subtle)'
                    e.currentTarget.style.borderLeft = `3px solid ${tr.color}`
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(15, 23, 42, 0.04)'
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
                        background: 'var(--bg-secondary)',
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
                          color: 'var(--text-secondary)',
                          background: 'var(--bg-secondary)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '3px',
                          border: '1px solid var(--border-subtle)',
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
