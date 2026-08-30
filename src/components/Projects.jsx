import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, ExternalLink, FolderGit, Cpu, Code2, Database, Cloud } from 'lucide-react'
import { TiltCard } from './About.jsx'

export default function Projects() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const yOffset = useTransform(scrollYProgress, [0, 1], [50, -50])

  const projectList = [
    {
      id: 'CLOUD_DOSSIER // 01',
      title: 'Smart Microplastic Detector (ESP32)',
      domain: 'Patent Pending • IoT Hardware Telemetry',
      description:
        'An IoT-based system utilizing ESP32, turbidity sensors, and the AS7262 spectral sensor to identify microplastics in fluid environments. Logged in real-time to ThingSpeak cloud systems with automated warning alerts pushed directly to Telegram.',
      tags: ['Patent Pending', 'ESP32 Firmware', 'AS7262 Spectral Sensor', 'ThingSpeak API', 'Hardware Telemetry'],
      icon: <Cpu size={24} />,
      github: 'https://github.com/AntaripC',
      demo: '',
      color: '#f43f5e',
      bg: 'rgba(244, 63, 94, 0.1)',
      statusBadge: 'PATENT PENDING',
    },
    {
      id: 'CLOUD_DOSSIER // 02',
      title: 'Smart Campus Navigator',
      domain: 'Full-Stack Development • Mapping Algorithms',
      description:
        'An intelligent navigation system mapping classroom corridors, laboratory facilities, and pathways. Features accessibility routing (ramps/elevators), real-time occupancy tracking, and event-based spatial suggestions.',
      tags: ['JavaScript', 'Leaflet.js Maps', 'Pathfinding Algorithms', 'Real-time Occupancy'],
      icon: <Code2 size={24} />,
      github: 'https://github.com/AntaripC',
      demo: '',
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.1)',
      statusBadge: 'INTELLIGENT NAV',
    },
    {
      id: 'CLOUD_DOSSIER // 03',
      title: 'Smart Inventory Management',
      domain: 'Database Design • RDBMS Orchestration',
      description:
        'A comprehensive tracking system designed for organizing, managing, and updating facility inventory levels. Features automated shortage indicators, database relations, and secure role-based administrative routes.',
      tags: ['SQL Database', 'RDBMS', 'Node.js', 'Express API', 'Product Tracking'],
      icon: <Database size={24} />,
      github: 'https://github.com/AntaripC',
      demo: '',
      color: '#00f0ff',
      bg: 'rgba(0, 240, 255, 0.1)',
      statusBadge: 'DATA MANAGEMENT',
    },
    {
      id: 'CLOUD_DOSSIER // 04',
      title: 'Cloud Infrastructure Pipeline',
      domain: 'DevOps & Orchestration • AWS Cloud Systems',
      description:
        'A cloud-native infrastructure setup utilizing Docker containerization, Kubernetes pod deployments, and secure AWS IAM credentials. Integrates Automated security audits mapping cloud configurations to AWS Well-Architected Framework benchmarks.',
      tags: ['AWS Services', 'Kubernetes', 'Docker Containers', 'CI/CD Pipelines', 'Cloud Security'],
      icon: <Cloud size={24} />,
      github: 'https://github.com/AntaripC',
      demo: '',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)',
      statusBadge: 'CLOUD INFRA',
    },
  ]

  return (
    <section id="projects" className="section" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-subtitle">
          <FolderGit size={14} /> CLOUD_REPOSITORIES // IP_&_RESEARCH
        </div>
        
        <motion.div style={{ y: yOffset }}>
          <h2 style={{ marginBottom: '3.5rem' }}>Flagship & Engineering Projects</h2>
          
          <div className="grid grid-2" style={{ gap: '2.2rem' }}>
            {projectList.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.12, type: 'spring' }}
                style={{ height: '100%' }}
              >
                <TiltCard
                  borderTopColor={project.color}
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Header dots */}
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="terminal-dot dot-red" />
                      <span className="terminal-dot dot-yellow" />
                      <span className="terminal-dot dot-green" />
                    </div>
                    <span style={{ color: project.color }}>{project.id}</span>
                  </div>

                  {/* Icon & Links */}
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          color: project.color,
                          padding: '0.6rem',
                          background: project.bg,
                          borderRadius: '8px',
                          border: `1px solid ${project.color}30`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {project.icon}
                      </div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: '700',
                          letterSpacing: '0.08em',
                          padding: '0.25rem 0.55rem',
                          borderRadius: '4px',
                          background: project.bg,
                          color: project.color,
                          border: `1px solid ${project.color}40`,
                        }}
                      >
                        {project.statusBadge}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--text-secondary)' }}
                          aria-label="View Source Code"
                        >
                          <Github
                            size={18}
                            style={{ transition: 'color 0.25s' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                          />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--text-secondary)' }}
                          aria-label="View Demo"
                        >
                          <ExternalLink
                            size={18}
                            style={{ transition: 'color 0.25s' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                          />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Domain */}
                  <div style={{ position: 'relative', zIndex: 1, marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem', color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <span style={{ fontSize: '0.82rem', color: project.color, fontFamily: 'var(--font-mono)' }}>
                      {project.domain}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem', flex: 1, position: 'relative', zIndex: 1, lineHeight: '1.7' }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', position: 'relative', zIndex: 1, marginTop: 'auto' }}>
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-secondary)',
                          background: 'var(--bg-secondary)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        #{tag}
                      </span>
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
