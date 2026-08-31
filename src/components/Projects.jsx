import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Folder, Star, ArrowUpRight, Search, Filter } from 'lucide-react'
import { GlassCard } from './About.jsx'

export default function Projects() {
  const [filterCategory, setFilterCategory] = useState('all')

  const projects = [
    {
      name: 'Smart City Parking (IoT)',
      description:
        'ESP32-based ultrasonic sensor network for real-time parking detection. Patent-pending microplastic detection system integrated.',
      tech: ['ESP32', 'MQTT', 'Python', 'AWS IoT'],
      category: 'iot',
      liveUrl: null,
      githubUrl: 'https://github.com/AntaripC',
      highlight: true,
      accent: 'var(--accent-primary)',
    },
    {
      name: 'Cloud Infrastructure Monitor',
      description:
        'Full-stack monitoring dashboard for cloud resource health across AWS and GCP. Real-time metrics, alerting, and cost tracking.',
      tech: ['React', 'Node.js', 'Docker', 'Prometheus'],
      category: 'cloud',
      liveUrl: null,
      githubUrl: 'https://github.com/AntaripC',
      highlight: false,
      accent: 'var(--accent-blue)',
    },
    {
      name: 'Hackathon Team Manager',
      description:
        'Web app for organizing hackathon squads — role assignment, project tracking, and real-time collaboration board.',
      tech: ['Next.js', 'Firebase', 'Tailwind', 'WebSocket'],
      category: 'web',
      liveUrl: null,
      githubUrl: 'https://github.com/AntaripC',
      highlight: false,
      accent: 'var(--accent-secondary)',
    },
    {
      name: 'ESP32 Weather Station',
      description:
        'Embedded weather telemetry station streaming temperature, humidity, and pressure data to a cloud dashboard.',
      tech: ['ESP32', 'C++', 'MQTT', 'Grafana'],
      category: 'iot',
      liveUrl: null,
      githubUrl: 'https://github.com/AntaripC',
      highlight: false,
      accent: 'var(--accent-tertiary)',
    },
    {
      name: 'Portfolio v3 — This Site',
      description:
        'The website you are on. Built with React, Vite, and Framer Motion. Aurora Glass design system with frosted glass cards.',
      tech: ['React', 'Vite', 'Framer Motion', 'CSS'],
      category: 'web',
      liveUrl: '#',
      githubUrl: 'https://github.com/AntaripC',
      highlight: false,
      accent: 'var(--accent-rose)',
    },
  ]

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'iot', label: 'IoT' },
    { id: 'web', label: 'Web' },
  ]

  const filtered = filterCategory === 'all' ? projects : projects.filter((p) => p.category === filterCategory)

  return (
    <section id="projects" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">
            <Folder size={14} /> Projects
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Featured Work</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '550px', margin: '0 auto' }}>
            Cloud infrastructure, IoT prototypes, and full-stack applications.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              style={{
                padding: '0.45rem 1rem', borderRadius: 'var(--radius-full)',
                border: filterCategory === cat.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                background: filterCategory === cat.id ? 'rgba(124,58,237,0.1)' : 'transparent',
                color: filterCategory === cat.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.25s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div
                  className="glass-card"
                  style={{
                    height: '100%', display: 'flex', flexDirection: 'column',
                    borderTop: `2px solid ${project.accent}`,
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: `${project.accent}15`, color: project.accent,
                      }}>
                        <Folder size={18} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1rem', margin: 0, fontFamily: 'var(--font-display)' }}>{project.name}</h3>
                        {project.highlight && (
                          <span style={{
                            fontSize: '0.65rem', padding: '1px 6px', borderRadius: '4px',
                            background: 'rgba(245,158,11,0.12)', color: 'var(--accent-tertiary)',
                            fontWeight: 700, fontFamily: 'var(--font-display)',
                          }}>
                            <Star size={9} style={{ marginRight: '2px', verticalAlign: 'middle' }} />
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                          width: '30px', height: '30px', borderRadius: '8px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--text-muted)', transition: 'all 0.2s ease',
                          border: '1px solid var(--border-subtle)',
                        }}>
                          <Github size={14} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                          width: '30px', height: '30px', borderRadius: '8px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--text-muted)', transition: 'all 0.2s ease',
                          border: '1px solid var(--border-subtle)',
                        }}>
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65, flex: 1 }}>
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
                    {project.tech.map((t, i) => (
                      <span key={i} className="tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
