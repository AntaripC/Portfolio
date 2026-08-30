import React, { useState, useEffect } from 'react'
import { Terminal, Menu, X, Sun, Moon, Sparkles, Compass } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  // ScrollSpy to track active section
  useEffect(() => {
    const handleScroll = () => {
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
    { name: 'Console & Bio', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Leadership & Exp', href: '#experience', id: 'experience' },
    { name: 'Certifications', href: '#certifications', id: 'certifications' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  return (
    <nav className="modern-floating-nav">
      <div className="container nav-content">
        {/* Brand Identity */}
        <a href="#home" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              padding: '0.4rem',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Terminal size={18} color="var(--accent-primary)" />
          </div>
          <span style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: '1.05rem' }}>
            Antarip<span style={{ color: 'var(--accent-primary)', fontWeight: '500' }}>.cloud</span>
          </span>
        </a>

        {/* Desktop Navigation Links with Active Pill Indicator */}
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
                    position: 'relative',
                    transition: 'all 0.25s ease',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? '700' : '500',
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '16px',
                        height: '2px',
                        backgroundColor: 'var(--accent-primary)',
                        borderRadius: '2px',
                        boxShadow: '0 0 6px var(--accent-glow)',
                      }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right Action Hub (Status + Theme Toggle) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Status Badge */}
          <div
            className="desktop-only-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'var(--bg-secondary)',
              padding: '0.35rem 0.75rem',
              borderRadius: '50px',
              border: '1px solid var(--border-green)',
              fontSize: '0.74rem',
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
              }}
            />
            Summer '27 Intern
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Warm Light'} theme`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <>
                <Sun size={15} color="var(--accent-primary)" />
                <span>Warm Light</span>
              </>
            ) : (
              <>
                <Moon size={15} color="var(--accent-cyan)" />
                <span>Dark Cyber</span>
              </>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
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
