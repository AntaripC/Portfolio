import React from 'react'
import { motion } from 'framer-motion'
import { Award, ShieldCheck } from 'lucide-react'
import { TiltCard } from './About.jsx'

export default function Certifications() {
  const certificates = [
    {
      id: 'CERT // IITM_01',
      name: 'Data Analyst Certification',
      issuer: 'IIT Madras',
      type: 'Data Analytics, Statistical Modeling & Insights',
      glow: 'rgba(0, 240, 255, 0.35)',
      color: 'var(--accent-cyan)',
    },
    {
      id: 'CERT // INFOSYS_01',
      name: 'Cybersecurity Certification',
      issuer: 'Infosys Springboard',
      type: 'Cybersecurity Fundamentals & Auditing',
      glow: 'rgba(16, 185, 129, 0.3)',
      color: 'var(--accent-green)',
    },
    {
      id: 'CERT // INFOSYS_02',
      name: 'Big Data Certification',
      issuer: 'Infosys Springboard',
      type: 'Big Data Analytics & Systems',
      glow: 'rgba(168, 85, 247, 0.3)',
      color: '#a855f7',
    },
    {
      id: 'CERT // INFOSYS_03',
      name: 'Data Science Certification',
      issuer: 'Infosys Springboard',
      type: 'Data Models & Statistical Analytics',
      glow: 'rgba(251, 191, 36, 0.3)',
      color: '#fbbf24',
    },
    {
      id: 'CERT // INFOSYS_04',
      name: 'Python Programming',
      issuer: 'Infosys Springboard',
      type: 'Automation & Scripting Stacks',
      glow: 'rgba(244, 63, 94, 0.3)',
      color: '#f43f5e',
    },
    {
      id: 'CODE // NEOCOLAB_01',
      name: 'Computer Programming',
      issuer: 'Neo Colab',
      type: 'Algorithms & Core Problem Solving',
      glow: 'rgba(56, 189, 248, 0.3)',
      color: '#38bdf8',
    },
  ]

  return (
    <section id="certifications" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-subtitle">
          <Award size={14} /> CREDENTIALS // CRYPTOGRAPHIC_VERIFIED
        </div>
        <h2 style={{ marginBottom: '3.5rem' }}>Certifications & Credentials</h2>

        {/* Certificates Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <TiltCard
                borderTopColor={cert.color}
                style={{ height: '100%' }}
              >
                {/* Header info */}
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: cert.color, fontSize: '0.72rem' }}>{cert.id}</span>
                </div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      color: cert.color,
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: `0 0 12px ${cert.glow}`,
                    }}
                  >
                    <ShieldCheck size={22} />
                  </div>
                  
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: 'var(--text-primary)' }}>{cert.name}</h3>
                  <p style={{ color: cert.color, fontSize: '0.9rem', fontWeight: '600', fontFamily: 'var(--font-mono)', marginBottom: '0.3rem' }}>
                    {cert.issuer}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '1.2rem', flex: 1 }}>
                    {cert.type}
                  </p>
                  
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.3rem 0.65rem',
                      background: 'rgba(3, 7, 18, 0.8)',
                      borderRadius: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      width: 'fit-content',
                      marginTop: 'auto',
                    }}
                  >
                    <ShieldCheck size={13} color={cert.color} />
                    <span>VERIFIED</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
