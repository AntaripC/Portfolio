import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, ShieldCheck, CheckCircle2, ExternalLink, Sparkles, FileCheck, Filter } from 'lucide-react'
import { TiltCard } from './About.jsx'

export default function Certifications() {
  const [issuerFilter, setIssuerFilter] = useState('all')

  const certificates = [
    {
      id: 'CERT // IITM_01',
      name: 'Data Analyst Certification',
      issuer: 'IIT Madras',
      category: 'iitm',
      type: 'Data Analytics, Statistical Modeling & Insights',
      skills: ['Exploratory Data Analysis', 'Statistical Inference', 'Python Data Stacks'],
      glow: 'rgba(59, 130, 246, 0.25)',
      color: 'var(--accent-primary)',
      badge: 'PREMIER INSTITUTE',
    },
    {
      id: 'CERT // INFOSYS_01',
      name: 'Cybersecurity Fundamentals',
      issuer: 'Infosys Springboard',
      category: 'infosys',
      type: 'Threat Modeling, Network Defense & Audit Protocols',
      skills: ['Network Security', 'Vulnerability Assessment', 'Security Audits'],
      glow: 'rgba(5, 150, 105, 0.25)',
      color: '#059669',
      badge: 'CYBER DEFENSE',
    },
    {
      id: 'CERT // INFOSYS_02',
      name: 'Big Data Systems & Analytics',
      issuer: 'Infosys Springboard',
      category: 'infosys',
      type: 'Distributed Data Storage, ETL & High-Scale Analytics',
      skills: ['Big Data Architecture', 'Distributed Storage', 'Data Pipelines'],
      glow: 'rgba(124, 58, 237, 0.25)',
      color: '#7c3aed',
      badge: 'DISTRIBUTED DATA',
    },
    {
      id: 'CERT // INFOSYS_03',
      name: 'Data Science & Statistical ML',
      issuer: 'Infosys Springboard',
      category: 'infosys',
      type: 'Machine Learning Models & Analytical Computation',
      skills: ['Predictive Modeling', 'Feature Engineering', 'Data Visualization'],
      glow: 'rgba(2, 132, 199, 0.25)',
      color: '#0284c7',
      badge: 'ANALYTICS',
    },
    {
      id: 'CERT // INFOSYS_04',
      name: 'Python Programming Masterclass',
      issuer: 'Infosys Springboard',
      category: 'infosys',
      type: 'Object-Oriented Programming, Automation & Scripting',
      skills: ['Python OOP', 'Script Automation', 'System Tooling'],
      glow: 'rgba(244, 63, 94, 0.25)',
      color: '#f43f5e',
      badge: 'CORE CODE',
    },
    {
      id: 'CODE // NEOCOLAB_01',
      name: 'Computer Programming Algorithms',
      issuer: 'Neo Colab',
      category: 'neocolab',
      type: 'Data Structures, Algorithm Design & Problem Solving',
      skills: ['Data Structures', 'Dynamic Programming', 'Algorithmic Optimization'],
      glow: 'rgba(180, 83, 9, 0.25)',
      color: '#2563eb',
      badge: 'ALGORITHMS',
    },
  ]

  const filteredCerts = certificates.filter((c) => {
    if (issuerFilter === 'all') return true
    return c.category === issuerFilter
  })

  return (
    <section id="certifications" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">
            <Award size={14} /> CREDENTIALS // VERIFIED_VAULT
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Certifications & Verified Credentials</h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            Verified technical certifications in Cloud Systems, Big Data, Cybersecurity, and Data Science from premier institutions.
          </p>

          {/* Filter Pills */}
          <div
            style={{
              display: 'inline-flex',
              gap: '0.45rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              padding: '0.35rem 0.5rem',
              borderRadius: '50px',
              marginTop: '1.5rem',
              boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)',
            }}
          >
            {[
              { id: 'all', label: 'All Credentials (6)' },
              { id: 'iitm', label: 'IIT Madras' },
              { id: 'infosys', label: 'Infosys Springboard' },
              { id: 'neocolab', label: 'Neo Colab' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setIssuerFilter(f.id)}
                style={{
                  background: issuerFilter === f.id ? 'var(--bg-secondary)' : 'transparent',
                  color: issuerFilter === f.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: `1px solid ${issuerFilter === f.id ? 'var(--accent-primary)' : 'transparent'}`,
                  borderRadius: '30px',
                  padding: '0.35rem 0.9rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: issuerFilter === f.id ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CERTIFICATES GRID */}
        {/* ========================================================================= */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
          {filteredCerts.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              style={{ height: '100%' }}
            >
              <TiltCard
                borderTopColor={cert.color}
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
                <div className="terminal-header" style={{ marginBottom: '1rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: cert.color, fontSize: '0.72rem', fontWeight: '600' }}>
                    {cert.id}
                  </span>
                </div>

                {/* Content */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '42px',
                      height: '42px',
                      background: 'var(--bg-secondary)',
                      color: cert.color,
                      borderRadius: '10px',
                      border: `1px solid ${cert.color}40`,
                    }}
                  >
                    <ShieldCheck size={22} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      color: cert.color,
                      background: 'var(--bg-secondary)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px',
                      border: `1px solid ${cert.color}30`,
                      fontWeight: '700',
                    }}
                  >
                    {cert.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.18rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                  {cert.name}
                </h3>
                <p style={{ color: cert.color, fontSize: '0.88rem', fontWeight: '700', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>
                  {cert.issuer}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                  {cert.type}
                </p>

                {/* Skill tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {cert.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-primary)',
                        background: 'var(--bg-secondary)',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      +{s}
                    </span>
                  ))}
                </div>

                {/* Verified Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-green)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                    <CheckCircle2 size={14} />
                    <span>AUTHENTICATED</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    COMPLETED
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
