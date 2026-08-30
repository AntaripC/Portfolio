import React, { useState } from 'react'
import { Terminal, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

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
        </ul>
        <button
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  )
}
