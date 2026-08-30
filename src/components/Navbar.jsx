import React, { useState, useEffect } from 'react'
import { Terminal, Menu, X, Sun, Moon } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const links = [
    { name: 'Terminal', href: '#terminal-section' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Leadership', href: '#extracurricular' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav>
      <div className="container nav-content">
        <a href="#home" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={24} color="var(--accent-primary)" />
          Antarip<span>Chatterjee</span>
        </a>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          {links.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
          <li>
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
          </li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            style={{ display: 'none' }}
            title="Toggle theme"
          >
            {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
