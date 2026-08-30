import React, { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { Cloud, Terminal, ShieldCheck } from 'lucide-react'

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

      {/* Footer */}
      <footer
        style={{
          background: 'var(--bg-secondary)',
          padding: '2.5rem 0 2rem 0',
          textAlign: 'center',
          borderTop: '1px solid var(--border-subtle)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="container">
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap',
          }}>
            {[
              { icon: <ShieldCheck size={13} />, label: 'AWS_ARCHITECT', color: 'var(--accent-primary)' },
              { icon: <Cloud size={13} />, label: 'ESP32_IOT', color: 'var(--accent-green)' },
              { icon: <Terminal size={13} />, label: 'KUBERNETES', color: 'var(--accent-purple)' },
            ].map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: '600',
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  color: tag.color,
                }}
              >
                {tag.icon} {tag.label}
              </span>
            ))}
          </div>

          <p style={{
            color: 'var(--text-primary)', fontSize: '0.9rem',
            fontWeight: '600', marginBottom: '0.35rem',
          }}>
            &copy; {new Date().getFullYear()} Antarip Chatterjee
          </p>
          <p style={{
            color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)',
          }}>
            LPU &bull; B.Tech CSE (Cloud Computing) &bull; Top 1% Cohort
          </p>
        </div>
      </footer>
    </>
  )
}
