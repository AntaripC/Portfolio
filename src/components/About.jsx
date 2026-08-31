import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  User, GraduationCap, School, Sparkles, Heart, MapPin, Calendar,
  Briefcase, Cpu, Globe, Camera, Layers, Activity, CheckCircle2
} from 'lucide-react'

/* ── Reusable GlassCard (exported for other components) ── */
export function GlassCard({ children, style = {}, accentColor, ...props }) {
  return (
    <motion.div
      className="glass-card"
      style={{
        borderTop: accentColor ? `2px solid ${accentColor}` : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const [activeEduTab, setActiveEduTab] = useState('lpu')
  const [activeHobby, setActiveHobby] = useState(0)

  const hobbies = [
    { icon: <Camera size={18} />, label: 'Photography', desc: 'Capturing landscapes and cityscapes' },
    { icon: <Globe size={18} />, label: 'Cloud Exploration', desc: 'Testing new AWS and GCP features' },
    { icon: <Cpu size={18} />, label: 'Hardware Tinkering', desc: 'ESP32, Arduino, and sensor experiments' },
    { icon: <Layers size={18} />, label: 'Open Source', desc: 'Contributing to developer tools' },
  ]

  const coreAttributes = [
    { icon: <Activity size={16} />, label: 'High-Velocity Builder', desc: 'Ship fast under 24-48h hackathon pressure' },
    { icon: <Sparkles size={16} />, label: 'Patent Innovator', desc: 'IoT microplastic detector — patent pending' },
    { icon: <Briefcase size={16} />, label: 'Team Leader', desc: '5+ hackathon squads directed to completion' },
    { icon: <CheckCircle2 size={16} />, label: 'Top 1% Standing', desc: 'Ranked in global LPU cohort' },
  ]

  return (
    <section id="about" className="section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">
            <User size={14} /> About Me
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Who I Am</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '650px', margin: '0 auto' }}>
            A Cloud Computing student and IoT innovator building resilient systems, leading hackathon squads, and pushing the boundaries of embedded telemetry.
          </p>
        </div>

        {/* Bento Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>

          {/* ── Bio Card (spans 7) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ gridColumn: 'span 7' }}
          >
            <GlassCard accentColor="var(--accent-primary)" style={{ height: '100%' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                {/* Photo */}
                <div style={{
                  width: '90px', height: '90px', borderRadius: '16px', padding: '3px',
                  background: 'var(--gradient-primary)', flexShrink: 0,
                  boxShadow: 'var(--shadow-glow)',
                }}>
                  <img src="/antarip.jpg" alt="Antarip Chatterjee" style={{
                    width: '100%', height: '100%', borderRadius: '14px', objectFit: 'cover', display: 'block',
                  }} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Antarip Chatterjee</h3>
                    <span style={{
                      fontSize: '0.68rem', padding: '2px 8px', borderRadius: '6px',
                      background: 'rgba(124,58,237,0.1)', color: 'var(--accent-primary)',
                      border: '1px solid var(--border-color)', fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                    }}>
                      Open to Intern
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '0.75rem' }}>
                    Cloud Systems Architect & IoT Innovator
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                    Building resilient <strong>cloud infrastructure</strong> and <strong>scalable systems</strong> at LPU.
                    Merging patent-pending <strong>ESP32 IoT telemetry</strong> with high-pressure hackathon sprints.
                    Seeking a <strong>Summer 2027 internship</strong> in Cloud Architecture, DevOps, or Software Engineering.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* ── Location & Quick Stats (spans 5) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ gridColumn: 'span 5' }}
          >
            <GlassCard accentColor="var(--accent-secondary)" style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <MapPin size={16} color="var(--accent-secondary)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}>
                  Punjab, India • IST Timezone
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { value: 'Top 1%', label: 'Cohort Rank' },
                  { value: '5+', label: 'Hackathons' },
                  { value: 'Patent', label: 'IoT Innovation' },
                  { value: "Summer '27", label: 'Target Intern' },
                ].map((stat, idx) => (
                  <div key={idx} style={{
                    padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px',
                    border: '1px solid var(--border-subtle)', textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-display)',
                      background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', marginTop: '0.15rem' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* ── Education (spans 5) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ gridColumn: 'span 5' }}
          >
            <GlassCard accentColor="var(--accent-green)" style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <GraduationCap size={18} color="var(--accent-green)" />
                <h3 style={{ fontSize: '1rem', margin: 0 }}>Education</h3>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {[
                  { id: 'lpu', label: 'University' },
                  { id: 'school', label: 'School' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveEduTab(tab.id)}
                    style={{
                      padding: '0.35rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-subtle)',
                      background: activeEduTab === tab.id ? 'var(--accent-green)' : 'transparent',
                      color: activeEduTab === tab.id ? '#fff' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeEduTab === 'lpu' ? (
                <div>
                  <h4 style={{ fontSize: '0.95rem', margin: '0 0 0.2rem 0' }}>Lovely Professional University</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600 }}>B.Tech CSE (Cloud Computing)</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.25rem' }}>
                    <Calendar size={12} /> 2024 – 2028 • Punjab, India
                  </p>
                </div>
              ) : (
                <div>
                  <h4 style={{ fontSize: '0.95rem', margin: '0 0 0.2rem 0' }}>Krishnath College School</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600 }}>Higher Secondary (Science)</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.25rem' }}>
                    <Calendar size={12} /> Completed • Berhampore, WB
                  </p>
                </div>
              )}
            </GlassCard>
          </motion.div>

          {/* ── Core Attributes (spans 7) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ gridColumn: 'span 7' }}
          >
            <GlassCard style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Sparkles size={18} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1rem', margin: 0 }}>Core Strengths</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {coreAttributes.map((attr, idx) => (
                  <div key={idx} style={{
                    padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px',
                    border: '1px solid var(--border-subtle)', display: 'flex', gap: '0.65rem', alignItems: 'flex-start',
                  }}>
                    <div style={{
                      padding: '0.4rem', background: 'rgba(124,58,237,0.08)', borderRadius: '8px',
                      color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {attr.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{attr.label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{attr.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* ── Beyond Code / Hobbies (spans 12) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ gridColumn: 'span 12' }}
          >
            <GlassCard accentColor="var(--accent-tertiary)">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Heart size={18} color="var(--accent-tertiary)" />
                <h3 style={{ fontSize: '1rem', margin: 0 }}>Beyond Code</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                {hobbies.map((hobby, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveHobby(idx)}
                    style={{
                      padding: '1rem', background: activeHobby === idx ? 'rgba(124,58,237,0.08)' : 'var(--bg-secondary)',
                      borderRadius: '12px', border: `1px solid ${activeHobby === idx ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                      textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s ease',
                    }}
                  >
                    <div style={{ color: activeHobby === idx ? 'var(--accent-primary)' : 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                      {hobby.icon}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{hobby.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{hobby.desc}</div>
                  </button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
