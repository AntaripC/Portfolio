import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Megaphone, Cpu, Code2, ShieldAlert, Award } from 'lucide-react'
import { TiltCard } from './About.jsx'

export default function Experience() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const yOffset = useTransform(scrollYProgress, [0, 1], [40, -40])

  const experienceList = [
    {
      title: 'Head of Marketing',
      company: 'CREST',
      type: 'Full-time • Student Organization',
      location: 'LPU Campus',
      duration: 'Apr 2026 – Present',
      logId: 'LOG // CREST_LEADERSHIP',
      icon: <Megaphone size={20} color="var(--accent-cyan)" />,
      badgeColor: 'var(--accent-cyan)',
      points: [
        'Lead marketing strategy and brand positioning, overseeing omnichannel outreach campaigns to drive audience engagement and enrollment.',
        'Orchestrate cross-functional teams, outreach analytics, and brand positioning across university events.',
      ],
    },
    {
      title: 'IoT Hardware Inventor',
      company: 'Patent Research Work',
      type: 'Hardware Prototyping & Sensor Integration',
      location: 'Research Lab',
      duration: '2025 – Present',
      logId: 'LOG // PATENT_RESEARCH',
      icon: <Cpu size={20} color="var(--accent-green)" />,
      badgeColor: 'var(--accent-green)',
      points: [
        'Designed and constructed the Smart Microplastic Detector using ESP32 and specialized spectral sensors.',
        'Programmed automatic data telemetry pipelines logging readings to ThingSpeak cloud and pushing instant Telegram alerts to users.',
      ],
    },
    {
      title: 'Hackathon Team Lead & Developer',
      company: 'Academic Projects & Competitions',
      type: 'Full-Stack Development & Rapid Prototyping',
      location: 'LPU Labs / Hackathons',
      duration: '2025 – Present',
      logId: 'LOG // PROJECT_ENGINEERING',
      icon: <Code2 size={20} color="#a855f7" />,
      badgeColor: '#a855f7',
      points: [
        'Directed cross-functional developer teams during high-pressure hackathons, managing code organization, task delegation, and timeline execution.',
        'Architected relational database backends, REST APIs, and client interfaces for real-time applications including the Smart Campus Navigator.',
      ],
    },
  ]

  return (
    <section id="experience" className="section" ref={containerRef} style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-subtitle">
          <ShieldAlert size={14} /> TRACK_RECORD // FIELD_OPERATIONS
        </div>
        
        <motion.div style={{ y: yOffset }}>
          <h2 style={{ marginBottom: '3.5rem' }}>Experience & Projects</h2>
          
          <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experienceList.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: idx * 0.15, type: 'spring' }}
              >
                <TiltCard borderTopColor={exp.badgeColor}>
                  {/* Header info */}
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="terminal-dot dot-red" />
                      <span className="terminal-dot dot-yellow" />
                      <span className="terminal-dot dot-green" />
                    </div>
                    <span style={{ color: exp.badgeColor }}>{exp.logId}</span>
                  </div>

                  {/* Title info */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                        <div
                          style={{
                            padding: '0.45rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {exp.icon}
                        </div>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>{exp.title}</h3>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                        <span style={{ color: exp.badgeColor, fontWeight: '600', fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>
                          {exp.company}
                        </span>
                        <span style={{ color: 'var(--border-subtle)' }}>•</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{exp.type}</span>
                      </div>
                    </div>
                    
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        color: 'var(--text-primary)',
                        fontSize: '0.82rem',
                        background: 'rgba(3, 7, 18, 0.8)',
                        padding: '0.35rem 0.8rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      <Award size={14} color={exp.badgeColor} />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Points list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem' }}>
                    {exp.points.map((point, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                        <span style={{ color: exp.badgeColor, marginTop: '0.25rem', flexShrink: 0, fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                          &gt;&gt;
                        </span>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.92rem', margin: 0 }}>
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
