import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Cpu, Users, Trophy, CheckCircle2 } from 'lucide-react'
import { GlassCard } from './About.jsx'

export default function Experience() {
  const [activeTrack, setActiveTrack] = useState('all')

  const timelineItems = [
    {
      title: 'Lead Hackathon Squad Architect',
      organization: 'National Hackathons (IITs & Premier Universities)',
      track: 'engineering',
      type: 'Sprint Team Lead • Full-Stack Prototyping',
      duration: '2025 – Present',
      color: 'var(--accent-primary)',
      icon: <Trophy size={18} />,
      highlights: ['5+ National Sprints', 'High-Velocity MVPs', 'A* Pathfinding Engine'],
      description:
        'Directing cross-functional engineering squads under 24–48h high-pressure hackathon clocks. Managing architecture design, code review pipelines, REST APIs, and technical demo defense.',
      deliverables: [
        'Architected the Smart Campus Navigator platform with accessible corridor routing.',
        'Structured automated CI/CD branch workflows and API specifications for squad members.',
        'Presented and defended technical blueprints before industry evaluation juries.',
      ],
    },
    {
      title: 'Patent-Pending IoT Hardware Prototyper',
      organization: 'Autonomous Environmental Research',
      track: 'engineering',
      type: 'Embedded Hardware & Edge Telemetry',
      duration: '2025 – Present',
      color: 'var(--accent-green)',
      icon: <Cpu size={18} />,
      highlights: ['Patent Application Filed', '6-Channel Spectral Cell', 'ThingSpeak Streams'],
      description:
        'Engineered an innovative IoT spectral detector utilizing ESP32 microcontrollers, AS7262 optical sensors, and turbidity flow-cells to classify microplastics in real-time.',
      deliverables: [
        'Designed C/C++ firmware integrating multi-wavelength spectral reflection algorithms.',
        'Built automated cloud telemetry pipes streaming diagnostic readings to ThingSpeak.',
        'Implemented instant alert dispatch webhooks to mobile emergency channels.',
      ],
    },
    {
      title: 'Cloud Infrastructure & Systems Developer',
      organization: 'Cloud Computing Specialization Lab',
      track: 'engineering',
      type: 'Distributed Microservices & Cloud Security',
      duration: '2025 – Present',
      color: 'var(--accent-secondary)',
      icon: <Briefcase size={18} />,
      highlights: ['AWS Well-Architected', 'Docker & K8s Pods', 'Zero-Trust IAM'],
      description:
        'Architecting distributed cloud environments on AWS, setting up multi-AZ VPC peering, least-privilege IAM matrices, containerized Docker microservices, and Kubernetes pod health monitoring.',
      deliverables: [
        'Configured scalable AWS infrastructure following Well-Architected Framework guidelines.',
        'Automated containerized application deployment with continuous integration pipelines.',
        'Conducted zero-trust access audits and security compliance verification.',
      ],
    },
    {
      title: 'Community Cybersecurity Educator',
      organization: 'LPU Community Development Program',
      track: 'leadership',
      type: 'Community Outreach & Digital Safety',
      duration: '2025',
      color: 'var(--accent-blue)',
      icon: <Users size={18} />,
      highlights: ['100+ Students Educated', 'Cyber Hygiene Training', 'Digital Safety'],
      description:
        'Conducted interactive cybersecurity awareness workshops for regional high school students, teaching digital hygiene, password security, phishing defense, and safe browsing habits.',
      deliverables: [
        'Delivered hands-on demonstrations on social engineering and cyber attack vectors.',
        'Taught foundational safety principles in local schools under university auspices.',
      ],
    },
  ]

  const filtered = activeTrack === 'all' ? timelineItems : timelineItems.filter(i => i.track === activeTrack)

  return (
    <section id="experience" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">
            <Briefcase size={14} /> Experience
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Leadership & Experience</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            A proven record of leadership, hackathon execution, and patent-pending hardware research.
          </p>

          {/* Track filters */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'engineering', label: 'Engineering' },
              { id: 'leadership', label: 'Leadership' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTrack(t.id)}
                style={{
                  padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)',
                  border: activeTrack === t.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  background: activeTrack === t.id ? 'rgba(124,58,237,0.1)' : 'transparent',
                  color: activeTrack === t.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.25s ease',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{
          maxWidth: '900px', margin: '0 auto', position: 'relative',
          paddingLeft: '2.5rem',
        }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '11px', top: 0, bottom: 0,
            width: '2px', background: 'var(--border-subtle)',
          }} />

          {filtered.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{ position: 'relative', marginBottom: '1.75rem' }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: '-2.5rem', top: '1.8rem',
                width: '22px', height: '22px', borderRadius: '50%',
                background: 'var(--bg-primary)', border: `2px solid ${item.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
              }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%', background: item.color,
                }} />
              </div>

              <GlassCard accentColor={item.color}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      padding: '0.5rem', background: `${item.color}15`, color: item.color,
                      borderRadius: '10px', display: 'flex',
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', margin: 0, fontFamily: 'var(--font-display)' }}>
                        {item.title}
                      </h3>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                        <span style={{ color: item.color, fontWeight: 600 }}>{item.organization}</span>
                        <span style={{ color: 'var(--text-muted)', margin: '0 0.4rem' }}>•</span>
                        <span>{item.type}</span>
                      </div>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.78rem', padding: '0.3rem 0.7rem', borderRadius: '8px',
                    background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                    fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap',
                  }}>
                    {item.duration}
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                  {item.description}
                </p>

                {/* Deliverables */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1rem' }}>
                  {item.deliverables.map((d, dIdx) => (
                    <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={14} style={{ color: item.color, marginTop: '0.2rem', flexShrink: 0 }} />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>

                {/* Highlight pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                  {item.highlights.map((h, hIdx) => (
                    <span key={hIdx} className="tag" style={{
                      fontSize: '0.7rem', padding: '0.2rem 0.55rem',
                      color: item.color, background: `${item.color}10`, borderColor: `${item.color}25`,
                    }}>
                      {h}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
