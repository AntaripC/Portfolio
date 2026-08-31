import React, { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'light')

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

  const links = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Certs', href: '#certifications', id: 'certifications' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  return (
    <nav style={{
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      background: scrolled ? 'var(--glass-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
      boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
    }}>
      <div className="container nav-content">
        <a href="#home" className="logo">
          <span style={{ fontWeight: 800, letterSpacing: '-0.03em', fontSize: '1.1rem' }}>
            antarip<span>.dev</span>
          </span>
        </a>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={activeSection === link.id ? 'nav-item-active' : ''}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            className="theme-toggle-btn"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
