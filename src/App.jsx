import React, { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { ShieldCheck, Cloud, Terminal, Mail, Cpu, Sparkles } from 'lucide-react'

// Component imports
import Preloader from './components/Preloader.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import CloudInteractiveBackground from './components/CloudInteractiveBackground.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Certifications from './components/Certifications.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Preloader />
      <CursorGlow />
      <CloudInteractiveBackground />
      <Navbar />

      {/* Main Content Layout Sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      {/* Modern Minimalist Footer */}
      <footer
        style={{
          background: 'var(--bg-card)',
          padding: '3rem 0 2.5rem 0',
          textAlign: 'center',
          borderTop: '1px solid var(--border-color)',
          position: 'relative',
          zIndex: 10,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.85rem',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            <span className="cyber-tag" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <ShieldCheck size={13} color="var(--accent-primary)" /> AWS_WELL_ARCH
            </span>
            <span className="cyber-tag green" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-green)' }}>
              <Cloud size={13} color="var(--accent-green)" /> ESP32_TELEMETRY
            </span>
            <span className="cyber-tag purple" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-purple)' }}>
              <Terminal size={13} color="var(--accent-purple)" /> K8S_CONTAINERIZED
            </span>
          </div>

          <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: 'var(--font-mono)', fontWeight: '600', marginBottom: '0.4rem' }}>
            &copy; {new Date().getFullYear()} Antarip Chatterjee // Cloud Computing Engineer & Student Leader
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
            Lovely Professional University &bull; B.Tech CSE (Cloud Computing) &bull; Top 1% Cohort Standing
          </p>
        </div>
      </footer>
    </>
  )
}
