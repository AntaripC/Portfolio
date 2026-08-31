import React, { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Cloud, Server, Code, Database, Shield, Cpu, Terminal, Search, BarChart3, Layers
} from 'lucide-react'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All', icon: <Layers size={14} /> },
    { id: 'cloud', label: 'Cloud', icon: <Cloud size={14} /> },
    { id: 'dev', label: 'Development', icon: <Code size={14} /> },
    { id: 'data', label: 'Data & ML', icon: <Database size={14} /> },
    { id: 'devops', label: 'DevOps', icon: <Server size={14} /> },
    { id: 'security', label: 'Security', icon: <Shield size={14} /> },
  ]

  const skills = [
    { name: 'AWS (EC2, S3, Lambda)', level: 85, category: 'cloud', color: '#f59e0b' },
    { name: 'Google Cloud Platform', level: 70, category: 'cloud', color: '#3b82f6' },
    { name: 'Docker & Containers', level: 80, category: 'devops', color: '#06b6d4' },
    { name: 'Kubernetes', level: 60, category: 'devops', color: '#8b5cf6' },
    { name: 'Python', level: 90, category: 'dev', color: '#10b981' },
    { name: 'JavaScript / React', level: 82, category: 'dev', color: '#f472b6' },
    { name: 'Node.js / Express', level: 75, category: 'dev', color: '#34d399' },
    { name: 'C / C++ (Embedded)', level: 72, category: 'dev', color: '#a78bfa' },
    { name: 'SQL / PostgreSQL', level: 78, category: 'data', color: '#60a5fa' },
    { name: 'Machine Learning (Basics)', level: 55, category: 'data', color: '#fb7185' },
    { name: 'Network Security', level: 65, category: 'security', color: '#fbbf24' },
    { name: 'Linux Administration', level: 80, category: 'devops', color: '#22d3ee' },
    { name: 'CI/CD Pipelines', level: 68, category: 'devops', color: '#e879f9' },
    { name: 'IoT / ESP32', level: 88, category: 'dev', color: '#f59e0b' },
    { name: 'Terraform / IaC', level: 55, category: 'cloud', color: '#a78bfa' },
  ]

  const filtered = activeCategory === 'all' ? skills : skills.filter(s => s.category === activeCategory)

  // Summary stats
  const avgLevel = Math.round(skills.reduce((a, s) => a + s.level, 0) / skills.length)
  const topSkills = skills.filter(s => s.level >= 80).length
  const totalSkills = skills.length

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">
            <Cpu size={14} /> Skills
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Technical Proficiency</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '550px', margin: '0 auto' }}>
            Cloud architecture, full-stack development, IoT prototyping, and DevOps workflows.
          </p>
        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}
        >
          {[
            { label: 'Total Skills', value: totalSkills },
            { label: 'Advanced (80%+)', value: topSkills },
            { label: 'Average Level', value: `${avgLevel}%` },
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)', padding: '1.1rem', textAlign: 'center',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{
                fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)',
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

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.45rem 0.9rem', borderRadius: 'var(--radius-full)',
                border: activeCategory === cat.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                background: activeCategory === cat.id ? 'rgba(124,58,237,0.1)' : 'transparent',
                color: activeCategory === cat.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.25s ease',
              }}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill Bars */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {filtered.map((skill, idx) => (
            <SkillBar key={skill.name} skill={skill} delay={idx * 0.04} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillBar({ skill, delay }) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -15 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{ marginBottom: '1.25rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
          {skill.name}
        </span>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: skill.color, fontFamily: 'var(--font-display)' }}>
          {skill.level}%
        </span>
      </div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${skill.level}%` } : { width: '0%' }}
          transition={{ duration: 1.2, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` }}
        />
      </div>
    </motion.div>
  )
}
