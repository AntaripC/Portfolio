import React, { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { Cloud, ShieldCheck, Cpu, ArrowUp, Heart } from 'lucide-react'

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
    return () => lenis.destroy()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Preloader />
      <CursorGlow />
      <CloudInteractiveBackground />
      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      {/* Modern Aurora Footer */}
      <footer
        style={{
          background: 'var(--bg-secondary)',
          padding: '3.5rem 0 2.5rem 0',
          borderTop: '1px solid var(--border-subtle)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <a href="#home" className="logo" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
                <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>
                  antarip<span>.dev</span>
                </span>
              </a>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '380px' }}>
                Cloud Systems Architect & IoT Innovator. Crafting resilient infrastructure and edge telemetry.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              {[
                { icon: <ShieldCheck size={13} />, label: 'AWS & Cloud' },
                { icon: <Cpu size={13} />, label: 'IoT & ESP32' },
                { icon: <Cloud size={13} />, label: 'Microservices' },
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="tag"
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.7rem',
                  }}
                >
                  {tag.icon} {tag.label}
                </span>
              ))}

              <button
                onClick={scrollToTop}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginLeft: '0.5rem',
                }}
                title="Back to top"
                aria-label="Scroll to top"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>

          <div
            style={{
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}
          >
            <p>
              &copy; {new Date().getFullYear()} Antarip Chatterjee &bull; LPU Top 1% Cohort
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              Built with React & Vite &bull; Open for Summer '27 Internships
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
