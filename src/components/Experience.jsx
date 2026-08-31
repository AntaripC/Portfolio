import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Megaphone, Cpu, Code2, ShieldAlert, Award, Briefcase, CheckCircle2, ChevronRight, Sparkles, Users, Trophy } from 'lucide-react'
import { TiltCard } from './About.jsx'

export default function Experience() {
  const containerRef = useRef(null)
  const [activeTrack, setActiveTrack] = useState('all')

  const timelineItems = [
    {
      id: 'EXP // 01',
      title: 'Lead Hackathon Squad Architect',
      organization: 'National Hackathons (IITs & Premier Universities)',
      track: 'engineering',
      type: 'Sprint Team Lead • Full-Stack Prototyping',
      duration: '2025 – Present',
      location: 'National Arenas',
      color: 'var(--accent-primary)',
      bg: 'rgba(59, 130, 246, 0.1)',
      icon: <Trophy size={20} />,
      impactMetrics: ['5+ National Sprints', 'High-Velocity MVPs', 'A* Pathfinding Graph Engine'],
      description:
        'Directing cross-functional engineering squads under 24–48h high-pressure hackathon clocks. Managing architecture design, code review pipelines, REST APIs, and technical demo defense.',
      deliverables: [
        'Architected the Smart Campus Navigator platform with accessible corridor routing.',
        'Structured automated CI/CD branch workflows and API specifications for squad members.',
        'Presented and defended technical blueprints before industry evaluation juries.',
      ],
    },
    {
      id: 'EXP // 02',
      title: 'Patent-Pending IoT Hardware Prototyper',
      organization: 'Autonomous Environmental Research',
      track: 'engineering',
      type: 'Embedded Hardware & Edge Telemetry',
      duration: '2025 – Present',
      location: 'Embedded Hardware Lab',
      color: '#059669',
      bg: 'rgba(5, 150, 105, 0.1)',
      icon: <Cpu size={20} />,
      impactMetrics: ['Patent Application Filed', '6-Channel Spectral Optical Cell', 'ThingSpeak Streams'],
      description:
        'Engineered an innovative IoT spectral detector utilizing ESP32 microcontrollers, AS7262 optical sensors, and turbidity flow-cells to classify microplastics in real-time.',
      deliverables: [
        'Designed C/C++ firmware integrating multi-wavelength spectral reflection algorithms.',
        'Built automated cloud telemetry pipes streaming diagnostic readings to ThingSpeak.',
        'Implemented instant alert dispatch webhooks to mobile emergency channels.',
      ],
    },
    {
      id: 'EXP // 03',
      title: 'Cloud Infrastructure & Systems Developer',
      organization: 'Cloud Computing Specialization Lab',
      track: 'engineering',
      type: 'Distributed Microservices & Cloud Security',
      duration: '2025 – Present',
      location: 'LPU Cloud Labs',
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.1)',
      icon: <Briefcase size={20} />,
      impactMetrics: ['AWS Well-Architected', 'Docker & K8s Pods', 'Zero-Trust IAM'],
      description:
        'Architecting distributed cloud environments on AWS, setting up multi-AZ VPC peering, least-privilege IAM matrices, containerized Docker microservices, and Kubernetes pod health monitoring.',
      deliverables: [
        'Configured scalable AWS infrastructure following Well-Architected Framework guidelines.',
        'Automated containerized application deployment with continuous integration pipelines.',
        'Conducted zero-trust access audits and security compliance verification.',
      ],
    },
    {
      id: 'EXP // 04',
      title: 'Community Cybersecurity Educator',
      organization: 'LPU Community Development Program',
      track: 'leadership',
      type: 'Community Outreach & Digital Safety',
      duration: '2025',
      location: 'Regional Schools & Centers',
      color: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.1)',
      icon: <Users size={20} />,
      impactMetrics: ['100+ Students Educated', 'Cyber Hygiene Training', 'Digital Safety Defense'],
      description:
        'Conducted interactive cybersecurity awareness workshops for regional high school students, teaching digital hygiene, password security, phishing defense, and safe browsing habits.',
      deliverables: [
        'Delivered hands-on demonstrations on social engineering and cyber attack vectors.',
        'Taught foundational safety principles in local schools under university auspices.',
      ],
    },
  ]

  const filteredItems = timelineItems.filter((item) => {
    if (activeTrack === 'all') return true
    return item.track === activeTrack
  })

  return (
    <section id="experience" className="section" ref={containerRef} style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">
            <Briefcase size={14} /> FIELD_OPERATIONS // CAREER_ROADMAP
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Leadership & Experience Roadmap</h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            A proven record of organizational leadership, high-velocity hackathon execution, and patent-pending hardware research.
          </p>

          {/* Track Filter Pills */}
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
              { id: 'all', label: 'All Operations' },
              { id: 'leadership', label: 'Leadership & Community' },
              { id: 'engineering', label: 'Engineering & Hackathons' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTrack(t.id)}
                style={{
                  background: activeTrack === t.id ? 'var(--bg-secondary)' : 'transparent',
                  color: activeTrack === t.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: `1px solid ${activeTrack === t.id ? 'var(--accent-primary)' : 'transparent'}`,
                  borderRadius: '30px',
                  padding: '0.35rem 0.9rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: activeTrack === t.id ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TIMELINE CARDS */}
        {/* ========================================================================= */}
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TiltCard
                borderTopColor={item.color}
                style={{
                  background: 'var(--bg-card)',
                  padding: '2rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                }}
              >
                {/* Header */}
                <div className="terminal-header" style={{ marginBottom: '1.2rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: item.color, fontSize: '0.72rem', fontWeight: '600' }}>
                    {item.id}
                  </span>
                </div>

                {/* Title info & Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <div
                      style={{
                        padding: '0.65rem',
                        background: item.bg,
                        color: item.color,
                        borderRadius: '10px',
                        border: `1px solid ${item.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0 }}>
                        {item.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                        <span style={{ color: item.color, fontWeight: '700', fontFamily: 'var(--font-mono)', fontSize: '0.92rem' }}>
                          {item.organization}
                        </span>
                        <span style={{ color: 'var(--border-subtle)' }}>•</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'var(--bg-secondary)',
                      padding: '0.35rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--text-primary)',
                      fontWeight: '600',
                    }}
                  >
                    {item.duration}
                  </div>
                </div>

                {/* Narrative */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>
                  {item.description}
                </p>

                {/* Deliverables List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {item.deliverables.map((del, dIdx) => (
                    <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={15} style={{ color: item.color, marginTop: '0.15rem', flexShrink: 0 }} />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>

                {/* Impact Metrics Pill Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)' }}>
                  {item.impactMetrics.map((met, mIdx) => (
                    <span
                      key={mIdx}
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: item.color,
                        background: item.bg,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        border: `1px solid ${item.color}30`,
                        fontWeight: '600',
                      }}
                    >
                      ★ {met}
                    </span>
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
