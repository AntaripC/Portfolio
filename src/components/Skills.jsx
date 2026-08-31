import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Terminal, Cloud, Database, Cpu, Key, Layers, Search, BarChart3, Grid, Sparkles, CheckCircle2, Sliders } from 'lucide-react'
import { TiltCard } from './About.jsx'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [showProgressBars, setShowProgressBars] = useState(true)

  const categories = [
    {
      id: 'CLOUD_INFRA',
      category: 'Cloud',
      title: 'Cloud & Infrastructure',
      color: '#3b82f6',
      bg: 'rgba(59, 130, 246, 0.12)',
      icon: <Cloud size={20} />,
      skills: [
        { name: 'AWS Core (EC2, S3, IAM, VPC)', level: 'Advanced', percent: 94 },
        { name: 'GCP Cloud Foundations', level: 'Intermediate', percent: 82 },
        { name: 'Distributed Systems Architecture', level: 'Advanced', percent: 90 },
        { name: 'Zero-Trust Cloud Security', level: 'Advanced', percent: 88 },
        { name: 'Cloud Infrastructure Automation', level: 'Intermediate', percent: 85 },
      ],
    },
    {
      id: 'DEV_SECOPS',
      category: 'DevOps',
      title: 'DevOps & Tooling',
      color: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.12)',
      icon: <Terminal size={20} />,
      skills: [
        { name: 'Docker Containerization', level: 'Advanced', percent: 92 },
        { name: 'Kubernetes Pod Deployment', level: 'Intermediate', percent: 80 },
        { name: 'CI/CD Pipelines (GitHub Actions)', level: 'Advanced', percent: 95 },
        { name: 'Linux / Bash Shell Scripting', level: 'Advanced', percent: 91 },
        { name: 'Security Vulnerability Audits', level: 'Intermediate', percent: 84 },
      ],
    },
    {
      id: 'PROG_LANG',
      category: 'Languages',
      title: 'Programming Languages',
      color: '#f43f5e',
      bg: 'rgba(244, 63, 94, 0.12)',
      icon: <Code size={20} />,
      skills: [
        { name: 'Python (Data, Scripts, Automation)', level: 'Advanced', percent: 95 },
        { name: 'C / C++ (Firmware & Algorithms)', level: 'Advanced', percent: 89 },
        { name: 'JavaScript / ES6+', level: 'Advanced', percent: 93 },
        { name: 'SQL & Database Queries', level: 'Advanced', percent: 90 },
        { name: 'HTML5 & Modern CSS3', level: 'Advanced', percent: 96 },
      ],
    },
    {
      id: 'BACKEND_DATA',
      category: 'Backend',
      title: 'Backend & Databases',
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.12)',
      icon: <Database size={20} />,
      skills: [
        { name: 'Node.js & Express REST APIs', level: 'Advanced', percent: 92 },
        { name: 'Relational DBMS (MySQL, Postgres)', level: 'Advanced', percent: 88 },
        { name: 'MongoDB Document Stores', level: 'Intermediate', percent: 82 },
        { name: 'A* Pathfinding & Graph Algorithms', level: 'Advanced', percent: 91 },
        { name: 'Pandas & Data Manipulation', level: 'Intermediate', percent: 86 },
      ],
    },
    {
      id: 'HARDWARE_IOT',
      category: 'IoT',
      title: 'IoT & Edge Telemetry',
      color: '#059669',
      bg: 'rgba(5, 150, 105, 0.12)',
      icon: <Cpu size={20} />,
      skills: [
        { name: 'ESP32 Firmware Architecture', level: 'Advanced', percent: 94 },
        { name: 'Optical Multi-Spectrometry (AS7262)', level: 'Patent Research', percent: 96 },
        { name: 'ThingSpeak IoT Cloud Streams', level: 'Advanced', percent: 89 },
        { name: 'Turbidity & Fluid Flow Sensors', level: 'Advanced', percent: 87 },
        { name: 'Telegram Bot Dispatch Triggers', level: 'Advanced', percent: 92 },
      ],
    },
    {
      id: 'STRATEGY_LEAD',
      category: 'Leadership',
      title: 'Leadership & Strategy',
      color: '#2563eb',
      bg: 'rgba(37, 99, 235, 0.12)',
      icon: <Key size={20} />,
      skills: [
        { name: 'Cross-Functional Team Leadership', level: 'Leadership', percent: 95 },
        { name: 'Hackathon Sprint Squad Lead', level: '5+ Sprints', percent: 98 },
        { name: 'Zero-Trust Security Mentality', level: 'Strategic', percent: 90 },
        { name: 'Rapid Tech Adaptability', level: 'Top 1% Standing', percent: 97 },
        { name: 'Public Demo & Technical Defense', level: 'Executive', percent: 93 },
      ],
    },
  ]

  const filteredCategories = categories.filter((cat) => {
    if (activeCategory !== 'ALL' && cat.category !== activeCategory) {
      return false
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchesTitle = cat.title.toLowerCase().includes(q)
      const matchesSkills = cat.skills.some((s) => s.name.toLowerCase().includes(q))
      return matchesTitle || matchesSkills
    }
    return true
  })

  // Calculate overall metrics
  const totalCompetencies = categories.reduce((acc, cat) => acc + cat.skills.length, 0)
  const avgProficiency = Math.round(
    categories.reduce(
      (acc, cat) => acc + cat.skills.reduce((sAcc, s) => sAcc + s.percent, 0),
      0
    ) / totalCompetencies
  )

  return (
    <section id="skills" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-subtitle">
            <Layers size={14} /> TECH_MATRIX // ARSENAL_RADAR
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Cloud Architecture & Technical Arsenal</h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            Categorized competencies spanning enterprise cloud infrastructure, embedded IoT telemetry, distributed databases, and leadership frameworks.
          </p>

          {/* HUD Summary Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: '1rem',
              margin: '1.75rem auto 0 auto',
              maxWidth: '850px',
              padding: '0.9rem 1.4rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              boxShadow: '0 8px 25px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Sparkles size={16} color="var(--accent-primary)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TOTAL COMPETENCIES</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  30 Active Modules
                </div>
              </div>
            </div>

            <div style={{ width: '1px', height: '28px', background: 'var(--border-color)', display: 'none' }} className="desktop-divider" />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '220px' }}>
              <div style={{ textAlign: 'left', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  <span>AVERAGE PROFICIENCY</span>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>{avgProficiency}%</span>
                </div>
                <div className="progress-bar-track" style={{ marginTop: '0.35rem', height: '6px' }}>
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${avgProficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    style={{ background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-cyan))' }}
                  >
                    <div className="progress-bar-cap" style={{ color: 'var(--accent-cyan)' }} />
                  </motion.div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <CheckCircle2 size={16} color="var(--accent-green)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>PRIMARY STACK</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                  AWS • Docker • ESP32 • Python
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filter Pills, Search & Bar View Toggle */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.75rem',
              marginTop: '1.75rem',
            }}
          >
            {/* Category Filter Pills */}
            <div
              style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                gap: '0.35rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '0.3rem 0.5rem',
                borderRadius: '50px',
                boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)',
              }}
            >
              {['ALL', 'Cloud', 'DevOps', 'Languages', 'Backend', 'IoT', 'Leadership'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`filter-pill-btn ${activeCategory === tab ? 'active' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '30px',
                padding: '0.3rem 0.85rem',
              }}
            >
              <Search size={14} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search skill (e.g. AWS, ESP32)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  width: '180px',
                }}
              />
            </div>

            {/* Toggle Progress Bars Display Button */}
            <button
              onClick={() => setShowProgressBars(!showProgressBars)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: showProgressBars ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-card)',
                color: showProgressBars ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: `1px solid ${showProgressBars ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                borderRadius: '30px',
                padding: '0.35rem 0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <Sliders size={13} />
              {showProgressBars ? 'Hide Progress Bars' : 'Show Progress Bars'}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SKILLS CARDS GRID */}
        {/* ========================================================================= */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.75rem' }}>
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              style={{ height: '100%' }}
            >
              <TiltCard
                borderTopColor={cat.color}
                style={{
                  height: '100%',
                  background: 'var(--bg-card)',
                  padding: '1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                }}
              >
                {/* Header */}
                <div className="terminal-header" style={{ marginBottom: '1.1rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: cat.color, fontSize: '0.72rem', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                    {cat.id}
                  </span>
                </div>

                {/* Title and Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      color: cat.color,
                      padding: '0.55rem',
                      background: cat.bg,
                      borderRadius: '10px',
                      border: `1px solid ${cat.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>{cat.title}</h3>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {cat.skills.length} OPERATIVE MODULES
                    </div>
                  </div>
                </div>

                {/* Skill Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      whileHover={{ scale: 1.01, x: 2 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        background: 'var(--bg-secondary)',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.45rem',
                      }}
                    >
                      {/* Item Top Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: '600' }}>
                          $ {skill.name}
                        </span>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontFamily: 'var(--font-mono)',
                            color: cat.color,
                            background: cat.bg,
                            padding: '0.18rem 0.5rem',
                            borderRadius: '4px',
                            border: `1px solid ${cat.color}35`,
                            fontWeight: '700',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {skill.level}
                        </span>
                      </div>

                      {/* NEW ANIMATED PROFICIENCY BAR */}
                      <AnimatePresence>
                        {showProgressBars && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.1rem' }}
                          >
                            <div className="progress-bar-track" style={{ height: '5px', flex: 1 }}>
                              <motion.div
                                className="progress-bar-fill"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.percent}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: sIdx * 0.08 }}
                                style={{
                                  background: `linear-gradient(90deg, ${cat.color}, var(--accent-cyan))`,
                                }}
                              >
                                <div className="progress-bar-cap" style={{ color: cat.color }} />
                              </motion.div>
                            </div>
                            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--text-secondary)' }}>
                              {skill.percent}%
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
