import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, FolderGit, Cpu, Code2, Database, Cloud, Zap, Compass, CheckCircle2, ArrowUpRight, Layers, ShieldCheck } from 'lucide-react'
import { TiltCard } from './About.jsx'

export default function Projects() {
  const containerRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(0)

  const projects = [
    {
      id: 'CLOUD_DOSSIER // 01',
      title: 'Smart Microplastic Detector (ESP32)',
      category: 'iot',
      badge: 'PATENT PENDING IP',
      domain: 'Embedded Spectral IoT & Cloud Streams',
      description:
        'An autonomous IoT spectral diagnostics system utilizing ESP32, turbidity flow-cell optics, and the AS7262 multi-spectral sensor to detect microplastic polymers in fluid samples. Real-time telemetry is pushed directly to ThingSpeak Cloud with automated Telegram alert dispatches.',
      tech: ['ESP32 Microcontroller', 'C/C++ Firmware', 'AS7262 Spectroscopy', 'ThingSpeak IoT', 'Telegram Bot'],
      highlights: [
        '6-Channel optical wavelength spectral analysis for fluid samples.',
        'Low-latency WiFi cloud telemetry pipeline to ThingSpeak analytics.',
        'Automated instant warning bot dispatched to mobile operators.',
      ],
      icon: <Cpu size={24} />,
      github: 'https://github.com/AntaripC',
      color: '#f43f5e',
      bg: 'rgba(244, 63, 94, 0.1)',
      architecture: 'ESP32 -> AS7262 Sensor -> ThingSpeak Cloud -> Telegram Alert Bot',
    },
    {
      id: 'CLOUD_DOSSIER // 02',
      title: 'Smart Campus Navigator',
      category: 'flagship',
      badge: 'HACKATHON FLAGSHIP',
      domain: 'Campus Graph Navigation & Peer Delivery',
      description:
        'An intelligent campus route optimization and peer food-delivery platform designed for university campuses. Features accessible corridor mapping (ramps & elevators), real-time food court queue aggregation, and decentralized peer delivery matching.',
      tech: ['JavaScript', 'Node.js', 'Leaflet.js Maps', 'Graph Pathfinding', 'Express REST API'],
      highlights: [
        'A* pathfinding between university blocks, labs, and accessible elevators.',
        'Live food court menu discovery, wait times, and digitized ordering.',
        'Decentralized peer courier matching heading in the same route direction.',
      ],
      icon: <Compass size={24} />,
      github: 'https://github.com/AntaripC',
      color: 'var(--accent-primary)',
      bg: 'rgba(59, 130, 246, 0.1)',
      architecture: 'Leaflet Maps -> Graph Pathfinding -> Express API -> Peer Escrow',
    },
    {
      id: 'CLOUD_DOSSIER // 03',
      title: 'Cloud Infrastructure Pipeline',
      category: 'cloud',
      badge: 'ENTERPRISE CLOUD',
      domain: 'AWS Zero-Trust & Kubernetes Orchestration',
      description:
        'A cloud-native infrastructure blueprint utilizing Docker containerization, Kubernetes pod deployments, and secure AWS IAM credentials. Integrates Automated security audits mapping cloud configurations to AWS Well-Architected Framework benchmarks.',
      tech: ['AWS IAM & VPC', 'Kubernetes Pods', 'Docker Daemon', 'CI/CD Pipelines', 'Zero-Trust'],
      highlights: [
        'Multi-AZ VPC peering with least-privilege IAM policy governance.',
        'Automated containerized microservices deployment with GitHub Actions.',
        'Live threat audit scripts verifying Kubernetes pod health.',
      ],
      icon: <Cloud size={24} />,
      github: 'https://github.com/AntaripC',
      color: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.1)',
      architecture: 'GitHub Actions -> Docker Build -> K8s Pods -> AWS CloudWatch',
    },
    {
      id: 'CLOUD_DOSSIER // 04',
      title: 'Smart Inventory Management',
      category: 'cloud',
      badge: 'RDBMS ARCHITECTURE',
      domain: 'Relational Database Design & Express Backend',
      description:
        'A high-throughput tracking system designed for organizing, managing, and updating facility inventory levels. Features automated shortage alerts, relational integrity constraints, and role-based access control.',
      tech: ['MySQL / PostgreSQL', 'RDBMS Schema', 'Node.js', 'Express API', 'RBAC Auth'],
      highlights: [
        'Normalized relational schemas ensuring strict ACID transaction integrity.',
        'Automated real-time inventory threshold alerts and restocking pipelines.',
        'JWT-authenticated role-based dashboard for administrative operations.',
      ],
      icon: <Database size={24} />,
      github: 'https://github.com/AntaripC',
      color: '#059669',
      bg: 'rgba(5, 150, 105, 0.1)',
      architecture: 'Client App -> Express REST API -> SQL RDBMS -> Audit Logs',
    },
    {
      id: 'CLOUD_DOSSIER // 05',
      title: 'Cloud-Native Microservices with Spring Boot & Docker',
      category: 'cloud',
      badge: 'CAPGEMINI ENGINEERING',
      domain: 'Cloud-Native Architecture & Containerized Microservices',
      description:
        'Cloud-Native Microservices with Spring Boot and Docker transform how modern software is built and run by breaking massive, rigid applications down into a network of small, independent services. Spring Boot acts as the internal engine for each service, allowing developers to quickly build self-contained, production-ready features (like a payment or checkout service) without wrestling with complex infrastructure setup. Docker then acts as a standard shipping container, packaging each Spring Boot service along with its exact operating environment so it runs identically on a laptop, a test server, or the cloud. When combined with Cloud-Native design, these containerised services become highly resilient and dynamic—capable of automatically spinning up to handle traffic spikes, self-healing instantly if a crash occurs, and allowing engineering teams to continuously deploy updates to one part of the system without ever taking the whole application offline.',
      tech: ['Spring Boot', 'Docker', 'Kubernetes', 'Cloud-Native', 'Microservices', 'CI/CD'],
      highlights: [
        'Independent self-contained microservices with auto-scaling and self-healing capabilities.',
        'Docker containerization ensuring identical environments across dev, staging, and production.',
        'Continuous deployment pipeline enabling zero-downtime partial system updates.',
      ],
      icon: <ShieldCheck size={24} />,
      github: 'https://github.com/AntaripC',
      color: '#0072C6',
      bg: 'rgba(0, 114, 198, 0.1)',
      architecture: 'Spring Boot Services -> Docker Build -> K8s Orchestration -> Cloud Deploy',
      capgemini: true,
    },
  ]

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true
    return p.category === activeFilter
  })

  return (
    <section id="projects" className="section" ref={containerRef} style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">
            <FolderGit size={14} /> REPOSITORIES // ENGINEERING_STUDIO
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Flagship & Engineering Projects</h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            Explore patent-pending IoT hardware prototypes, hackathon-winning campus platforms, and enterprise-grade cloud architectures.
          </p>

          {/* Interactive Category Filter Pills */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              gap: '0.45rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              padding: '0.35rem 0.5rem',
              borderRadius: '50px',
              marginTop: '1.5rem',
              boxShadow: '0 4px 20px var(--accent-glow)',
            }}
          >
            {[
              { id: 'all', label: 'All Works' },
              { id: 'flagship', label: 'Flagship Builds' },
              { id: 'iot', label: 'IoT Hardware & Patent' },
              { id: 'cloud', label: 'Cloud & Backend' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                style={{
                  background: activeFilter === f.id ? 'var(--bg-secondary)' : 'transparent',
                  color: activeFilter === f.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: `1px solid ${activeFilter === f.id ? 'var(--accent-primary)' : 'transparent'}`,
                  borderRadius: '30px',
                  padding: '0.35rem 0.9rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: activeFilter === f.id ? '700' : '500',
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
        {/* PROJECT SHOWCASE GRID */}
        {/* ========================================================================= */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{ height: '100%' }}
            >
              <TiltCard
                borderTopColor={project.color}
                style={{
                  height: '100%',
                  background: 'var(--bg-card)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                }}
              >
                {/* Terminal Header */}
                <div className="terminal-header" style={{ marginBottom: '1.2rem' }}>
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <span style={{ color: project.color, fontSize: '0.72rem', fontWeight: '600' }}>
                    {project.id}
                  </span>
                </div>

                {/* Card Top Row (Icon, Badge, GitHub) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        padding: '0.65rem',
                        background: project.bg,
                        color: project.color,
                        borderRadius: '10px',
                        border: `1px solid ${project.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {project.icon}
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: '700',
                          letterSpacing: '0.06em',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          background: project.bg,
                          color: project.color,
                          border: `1px solid ${project.color}40`,
                        }}
                      >
                        {project.badge}
                      </span>
                    </div>
                  </div>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', gap: '0.35rem' }}
                      aria-label="View Source Code"
                    >
                      <Github size={14} /> Repo <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>

                {/* Title & Domain */}
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  {project.title}
                </h3>
                <span style={{ fontSize: '0.82rem', color: project.color, fontFamily: 'var(--font-mono)', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                  {project.domain}
                </span>

                {/* Capgemini Verified Badge for flagged projects */}
                {project.capgemini && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.3rem 0.7rem',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, rgba(0, 114, 198, 0.08), rgba(18, 170, 255, 0.06))',
                      border: '1px solid rgba(0, 114, 198, 0.25)',
                      marginBottom: '0.85rem',
                      boxShadow: '0 0 12px rgba(0, 114, 198, 0.1)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="11" fill="#0072C6" />
                      <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      color: '#0072C6',
                      letterSpacing: '0.05em',
                    }}>
                      by Capgemini
                    </span>
                  </div>
                )}

                {/* Description */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                  {project.description}
                </p>

                {/* Feature Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                  {project.highlights.map((h, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={14} style={{ color: project.color, marginTop: '0.15rem', flexShrink: 0 }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.74rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-primary)',
                          background: 'var(--bg-secondary)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        #{t}
                      </span>
                    ))}
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
