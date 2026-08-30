import React from 'react'
import { motion } from 'framer-motion'
import { Code, Terminal, Cloud, Database, Cpu, Key } from 'lucide-react'
import { TiltCard } from './About.jsx'

export default function Skills() {
  const categories = [
    {
      id: 'INFRA_CORE',
      title: 'Cloud & Infrastructure',
      color: '#00f0ff',
      bg: 'rgba(0, 240, 255, 0.1)',
      icon: <Cloud size={22} />,
      skills: ['AWS Services', 'GCP Architectures', 'Cloud Security', 'Distributed Systems', 'Cloud Automation'],
    },
    {
      id: 'LANG_CORE',
      title: 'Programming Stacks',
      color: '#f43f5e',
      bg: 'rgba(244, 63, 94, 0.1)',
      icon: <Code size={22} />,
      skills: ['Python', 'SQL', 'JavaScript', 'HTML5 / CSS3', 'C / C++', 'Bash Scripting', 'JSON'],
    },
    {
      id: 'BACKEND_DB',
      title: 'Databases & Web',
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.1)',
      icon: <Database size={22} />,
      skills: ['Node.js', 'Express', 'MongoDB', 'RDBMS', 'SQL Databases', 'RESTful APIs', 'Software Eng.'],
    },
    {
      id: 'HARDWARE_IOT',
      title: 'IoT & Automation',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)',
      icon: <Cpu size={22} />,
      skills: ['ESP32', 'Sensor Integration', 'Hardware Security', 'Automation Systems', 'Firmware Telemetry'],
    },
    {
      id: 'DEVSEC_OPS',
      title: 'DevOps & Tooling',
      color: '#fbbf24',
      bg: 'rgba(251, 191, 36, 0.1)',
      icon: <Terminal size={22} />,
      skills: ['Docker', 'Kubernetes', 'CI/CD Security', 'GitHub Actions', 'Vulnerability Scans'],
    },
    {
      id: 'STRAT_CORE',
      title: 'Core Mindset & Strategy',
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.1)',
      icon: <Key size={22} />,
      skills: ['Zero-Trust Architecture', 'Analytical Problem Solving', 'High-Pressure Execution', 'Team Leadership', 'Fast Learning'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' } },
  }

  return (
    <section id="skills" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-subtitle">
          <Terminal size={14} /> TECH_STACK // ARSENAL_MATRIX
        </div>
        <h2 style={{ marginBottom: '3.5rem' }}>Technical Arsenal & Tooling</h2>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {categories.map((cat, idx) => (
            <motion.div key={idx} variants={itemVariants} style={{ height: '100%' }}>
              <TiltCard
                borderTopColor={cat.color}
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1.75rem',
                }}
              >
                {/* Header info */}
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: cat.color }}>{cat.id}</span>
                </div>

                {/* Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
                  <div
                    style={{
                      color: cat.color,
                      padding: '0.55rem',
                      background: cat.bg,
                      borderRadius: '8px',
                      border: `1px solid ${cat.color}30`,
                      boxShadow: `0 0 12px ${cat.bg}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cat.icon}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{cat.title}</h3>
                </div>

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: 'auto' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: cat.bg,
                        borderColor: cat.color,
                        color: '#fff',
                      }}
                      style={{
                        padding: '0.3rem 0.65rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        cursor: 'default',
                        transition: 'all 0.2s',
                      }}
                    >
                      $ {skill}
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
