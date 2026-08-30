import React, { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { ShieldCheck, Cloud, Terminal, Mail, Cpu } from 'lucide-react'

// Component imports
import Preloader from './components/Preloader.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import ParticlesBackground from './components/ParticlesBackground.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TerminalComponent from './components/Terminal.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Certifications from './components/Certifications.jsx'
import Extracurricular from './components/Extracurricular.jsx'
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
      <ParticlesBackground />
      <Navbar />

      {/* Ticker / Running Telemetry Bar */}
      <div className="telemetry-bar" style={{ marginTop: '64px' }}>
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            animation: 'none',
            padding: '0 2rem',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-green)' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-green)',
                boxShadow: '0 0 6px var(--accent-green)',
              }}
            />
            CLOUD_STATUS: SECURED
          </span>
          <span style={{ color: 'var(--accent-cyan)' }}>NODE: LPU_CLOUD_LAB [TOP 1%]</span>
          <span style={{ color: 'var(--accent-purple)' }}>INFRA: AWS_WELL_ARCH_ENGAGED</span>
          <span style={{ color: 'var(--accent-amber)' }}>TELEMETRY: ThingSpeak_ESP32_ACTIVE</span>
          <span style={{ color: 'var(--text-primary)' }}>TARGET: SUMMER_2027_INTERN</span>
        </div>
      </div>

      {/* Main Content Sections */}
      <main>
        <Hero />
        <TerminalComponent />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Extracurricular />
        <Contact />
      </main>

      {/* Footer */}
      <footer
        style={{
          background: 'rgba(3, 7, 18, 0.95)',
          padding: '2.5rem 0',
          textAlign: 'center',
          borderTop: '1px solid var(--border-color)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <span className="cyber-tag">
              <ShieldCheck size={12} /> CLOUD_SECURITY
            </span>
            <span className="cyber-tag green">
              <Cloud size={12} /> SECURE_REDUNDANCY
            </span>
            <span className="cyber-tag purple">
              <Terminal size={12} /> SEC_OPS_CONSOLE
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
            &copy; {new Date().getFullYear()} Antarip Chatterjee // Cloud Computing Engineer & CSE Student.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.4rem', fontFamily: 'var(--font-mono)' }}>
            LPU &bull; B.Tech CSE (Cloud Computing) &bull; IoT & Robotics Prototyper
          </p>
        </div>
      </footer>
    </>
  )
}
