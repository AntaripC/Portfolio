import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { GlassCard } from './About.jsx'

export default function Certifications() {
  const [issuerFilter, setIssuerFilter] = useState('all')

  const certificates = [
    {
      name: 'Data Analyst Certification',
      issuer: 'IIT Madras',
      category: 'iitm',
      type: 'Data Analytics, Statistical Modeling & Insights',
      skills: ['Exploratory Data Analysis', 'Statistical Inference', 'Python Data Stacks'],
      color: 'var(--accent-primary)',
      badge: 'Premier Institute',
    },
    {
      name: 'Cybersecurity Fundamentals',
      issuer: 'Infosys Springboard',
      category: 'infosys',
      type: 'Threat Modeling, Network Defense & Audit Protocols',
      skills: ['Network Security', 'Vulnerability Assessment', 'Security Audits'],
      color: 'var(--accent-green)',
      badge: 'Cyber Defense',
    },
    {
      name: 'Big Data Systems & Analytics',
      issuer: 'Infosys Springboard',
      category: 'infosys',
      type: 'Distributed Data Storage, ETL & High-Scale Analytics',
      skills: ['Big Data Architecture', 'Distributed Storage', 'Data Pipelines'],
      color: 'var(--accent-secondary)',
      badge: 'Distributed Data',
    },
    {
      name: 'Data Science & Statistical ML',
      issuer: 'Infosys Springboard',
      category: 'infosys',
      type: 'Machine Learning Models & Analytical Computation',
      skills: ['Predictive Modeling', 'Feature Engineering', 'Data Visualization'],
      color: 'var(--accent-blue)',
      badge: 'Analytics',
    },
    {
      name: 'Python Programming Masterclass',
      issuer: 'Infosys Springboard',
      category: 'infosys',
      type: 'Object-Oriented Programming, Automation & Scripting',
      skills: ['Python OOP', 'Script Automation', 'System Tooling'],
      color: 'var(--accent-rose)',
      badge: 'Core Code',
    },
    {
      name: 'Computer Programming Algorithms',
      issuer: 'Neo Colab',
      category: 'neocolab',
      type: 'Data Structures, Algorithm Design & Problem Solving',
      skills: ['Data Structures', 'Dynamic Programming', 'Algorithmic Optimization'],
      color: 'var(--accent-blue)',
      badge: 'Algorithms',
    },
  ]

  const filtered = issuerFilter === 'all' ? certificates : certificates.filter(c => c.category === issuerFilter)

  return (
    <section id="certifications" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">
            <Award size={14} /> Certifications
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Verified Credentials</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            Technical certifications in Cloud Systems, Big Data, Cybersecurity, and Data Science from premier institutions.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: `All (${certificates.length})` },
              { id: 'iitm', label: 'IIT Madras' },
              { id: 'infosys', label: 'Infosys' },
              { id: 'neocolab', label: 'Neo Colab' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setIssuerFilter(f.id)}
                style={{
                  padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)',
                  border: issuerFilter === f.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  background: issuerFilter === f.id ? 'rgba(124,58,237,0.1)' : 'transparent',
                  color: issuerFilter === f.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.25s ease',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <GlassCard accentColor={cert.color} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${cert.color}12`, color: cert.color,
                  }}>
                    <ShieldCheck size={20} />
                  </div>
                  <span style={{
                    fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '6px',
                    background: `${cert.color}10`, color: cert.color, fontWeight: 700,
                    fontFamily: 'var(--font-display)', border: `1px solid ${cert.color}20`,
                  }}>
                    {cert.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
                  {cert.name}
                </h3>
                <p style={{ color: cert.color, fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '0.35rem' }}>
                  {cert.issuer}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {cert.type}
                </p>

                {/* Skills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                  {cert.skills.map((s, sIdx) => (
                    <span key={sIdx} className="tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-green)', fontSize: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    <CheckCircle2 size={14} />
                    Verified
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
                    Completed
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
