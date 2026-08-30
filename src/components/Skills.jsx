import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Terminal, Cloud, Database, Cpu, Key, Layers, Search, CheckCircle, Zap, ShieldCheck } from 'lucide-react'
import { TiltCard } from './About.jsx'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      id: 'CLOUD_INFRA',
      category: 'Cloud',
      title: 'Cloud & Infrastructure',
      color: 'var(--accent-primary)',
      bg: 'rgba(59, 130, 246, 0.1)',
      icon: <Cloud size={20} />,
      skills: [
        { name: 'AWS Core (EC2, S3, IAM, VPC)', level: 'Advanced' },
        { name: 'GCP Cloud Foundations', level: 'Intermediate' },
        { name: 'Distributed Systems Architecture', level: 'Advanced' },
        { name: 'Zero-Trust Cloud Security', level: 'Advanced' },
        { name: 'Cloud Infrastructure Automation', level: 'Intermediate' },
      ],
    },
    {
      id: 'DEV_SECOPS',
      category: 'DevOps',
      title: 'DevOps & Tooling',
      color: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.1)',
      icon: <Terminal size={20} />,
      skills: [
        { name: 'Docker Containerization', level: 'Advanced' },
        { name: 'Kubernetes Pod Deployment', level: 'Intermediate' },
        { name: 'CI/CD Pipelines (GitHub Actions)', level: 'Advanced' },
        { name: 'Linux / Bash Shell Scripting', level: 'Advanced' },
        { name: 'Security Vulnerability Audits', level: 'Intermediate' },
      ],
    },
    {
      id: 'PROG_LANG',
      category: 'Languages',
      title: 'Programming Languages',
      color: '#f43f5e',
      bg: 'rgba(244, 63, 94, 0.1)',
      icon: <Code size={20} />,
      skills: [
        { name: 'Python (Data, Scripts, Automation)', level: 'Advanced' },
        { name: 'C / C++ (Firmware & Algorithms)', level: 'Advanced' },
        { name: 'JavaScript / ES6+', level: 'Advanced' },
        { name: 'SQL & Database Queries', level: 'Advanced' },
        { name: 'HTML5 & Modern CSS3', level: 'Advanced' },
      ],
    },
    {
      id: 'BACKEND_DATA',
      category: 'Backend',
      title: 'Backend & Databases',
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.1)',
      icon: <Database size={20} />,
      skills: [
        { name: 'Node.js & Express REST APIs', level: 'Advanced' },
        { name: 'Relational DBMS (MySQL, Postgres)', level: 'Advanced' },
        { name: 'MongoDB Document Stores', level: 'Intermediate' },
        { name: 'A* Pathfinding & Graph Algorithms', level: 'Advanced' },
        { name: 'Pandas & Data Manipulation', level: 'Intermediate' },
      ],
    },
    {
      id: 'HARDWARE_IOT',
      category: 'IoT',
      title: 'IoT & Edge Telemetry',
      color: '#059669',
      bg: 'rgba(5, 150, 105, 0.1)',
      icon: <Cpu size={20} />,
      skills: [
        { name: 'ESP32 Firmware Architecture', level: 'Advanced' },
        { name: 'Optical Multi-Spectrometry (AS7262)', level: 'Patent Research' },
        { name: 'ThingSpeak IoT Cloud Streams', level: 'Advanced' },
        { name: 'Turbidity & Fluid Flow Sensors', level: 'Advanced' },
        { name: 'Telegram Bot Dispatch Triggers', level: 'Advanced' },
      ],
    },
    {
      id: 'STRATEGY_LEAD',
      category: 'Leadership',
      title: 'Leadership & Strategy',
      color: '#2563eb',
      bg: 'rgba(180, 83, 9, 0.1)',
      icon: <Key size={20} />,
      skills: [
        { name: 'Cross-Functional Team Leadership', level: 'Leadership' },
        { name: 'Hackathon Sprint Squad Lead', level: '5+ Sprints' },
        { name: 'Zero-Trust Security Mentality', level: 'Strategic' },
        { name: 'Rapid Tech Adaptability', level: 'Top 1% Standing' },
        { name: 'Public Demo & Technical Defense', level: 'Executive' },
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

  return (
    <section id="skills" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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

          {/* Interactive Filter Pills & Search */}
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
                  style={{
                    background: activeCategory === tab ? 'var(--bg-secondary)' : 'transparent',
                    color: activeCategory === tab ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    border: `1px solid ${activeCategory === tab ? 'var(--accent-primary)' : 'transparent'}`,
                    borderRadius: '30px',
                    padding: '0.3rem 0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: activeCategory === tab ? '700' : '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Live Search Box */}
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
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SKILLS CARDS GRID */}
        {/* ========================================================================= */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
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
                  borderRadius: '14px',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                }}
              >
                {/* Header */}
                <div className="terminal-header" style={{ marginBottom: '1rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: cat.color, fontSize: '0.72rem', fontWeight: '600' }}>
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
                      borderRadius: '8px',
                      border: `1px solid ${cat.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cat.icon}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>{cat.title}</h3>
                </div>

                {/* Skill Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: 'auto' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'var(--bg-secondary)',
                        padding: '0.45rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: '500' }}>
                        $ {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          color: cat.color,
                          background: cat.bg,
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          border: `1px solid ${cat.color}30`,
                          fontWeight: '700',
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>
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
