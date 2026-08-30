import React, { useState, useEffect } from 'react'
import { Terminal, Menu, X, Sun, Moon } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'certifications', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const sec of sections) {
        const el = document.getElementById(sec)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const links = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Certs', href: '#certifications', id: 'certifications' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  return (
    <nav
      style={{
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        background: scrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      }}
    >
      <div className="container nav-content">
        {/* Brand */}
        <a href="#home" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              background: 'var(--gradient-primary)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Terminal size={16} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: '1.05rem' }}>
            Antarip<span>.dev</span>
          </span>
        </a>

        {/* Pill Navigation */}
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          {links.map((link) => {
            const isActive = activeSection === link.id
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={isActive ? 'nav-item-active' : ''}
                  style={{
                    transition: 'all 0.25s ease',
                    color: isActive ? 'var(--accent-primary)' : undefined,
                    fontWeight: isActive ? '600' : undefined,
                  }}
                >
                  {link.name}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right Hub */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Status */}
          <div
            className="desktop-only-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(16, 185, 129, 0.08)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-green)',
              fontSize: '0.73rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-green)',
              fontWeight: '600',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-green)',
                boxShadow: '0 0 6px var(--accent-green)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
            Open to Intern
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          {/* Mobile Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
