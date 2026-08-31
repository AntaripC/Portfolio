import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, Github, Send, MessageSquare, Check, Copy, Clock, ArrowUpRight } from 'lucide-react'
import { GlassCard } from './About.jsx'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
      setCurrentTime(new Date().toLocaleTimeString('en-US', options))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText('chatterjeeantarip69@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 4000)
  }

  const inputStyles = {
    width: '100%',
    padding: '0.75rem 0.9rem',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '10px',
    color: 'var(--text-primary)',
    outline: 'none',
    fontFamily: 'var(--font-main)',
    fontSize: '0.88rem',
    transition: 'border-color 0.2s ease',
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">
            <MessageSquare size={14} /> Contact
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Get In Touch</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '550px', margin: '0 auto' }}>
            Open for cloud architecture discussions, Summer 2027 internship opportunities, and IoT research collaborations.
          </p>
        </div>

        <div className="grid grid-2" style={{ gap: '2.5rem', alignItems: 'flex-start' }}>
          {/* LEFT: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard accentColor="var(--accent-primary)" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                Let's Build Something Together
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Whether you're seeking a <strong>Cloud Engineering intern for Summer 2027</strong>, want to explore IoT telemetry, or discuss distributed systems — I'd love to connect.
              </p>

              {/* Time */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'var(--bg-secondary)', padding: '0.65rem 0.85rem', borderRadius: '10px',
                border: '1px solid var(--border-subtle)', marginBottom: '1.25rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <Clock size={14} color="var(--accent-primary)" />
                  <span>IST:</span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{currentTime || '...'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 700 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 6px var(--accent-green)' }} />
                  Available
                </div>
              </div>

              {/* Contact links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Email */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.7rem 0.85rem', background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)', borderRadius: '10px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ padding: '0.4rem', background: 'rgba(124,58,237,0.08)', borderRadius: '8px', color: 'var(--accent-primary)', display: 'flex' }}>
                      <Mail size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>Email</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>chatterjeeantarip69@gmail.com</div>
                    </div>
                  </div>
                  <button onClick={copyEmail} style={{
                    display: 'flex', alignItems: 'center', gap: '0.25rem',
                    background: copied ? 'var(--accent-green)' : 'var(--bg-card)',
                    color: copied ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)', padding: '0.3rem 0.6rem',
                    borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/antarip-chatterjee-0205a9374/"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.7rem 0.85rem', background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)', borderRadius: '10px',
                    textDecoration: 'none', color: 'var(--text-primary)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ padding: '0.4rem', background: 'rgba(124,58,237,0.08)', borderRadius: '8px', color: 'var(--accent-primary)', display: 'flex' }}>
                      <Linkedin size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>LinkedIn</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>in/antarip-chatterjee</div>
                    </div>
                  </div>
                  <ArrowUpRight size={14} color="var(--accent-primary)" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/AntaripC"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.7rem 0.85rem', background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)', borderRadius: '10px',
                    textDecoration: 'none', color: 'var(--text-primary)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ padding: '0.4rem', background: 'rgba(124,58,237,0.08)', borderRadius: '8px', color: 'var(--accent-primary)', display: 'flex' }}>
                      <Github size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>GitHub</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>github.com/AntaripC</div>
                    </div>
                  </div>
                  <ArrowUpRight size={14} color="var(--accent-primary)" />
                </a>
              </div>
            </GlassCard>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard accentColor="var(--accent-green)">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label htmlFor="contact-name" style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    Your Name
                  </label>
                  <input type="text" id="contact-name" required style={inputStyles} placeholder="e.g. Jane Doe" />
                </div>

                <div>
                  <label htmlFor="contact-email" style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    Email Address
                  </label>
                  <input type="email" id="contact-email" required style={inputStyles} placeholder="you@company.com" />
                </div>

                <div>
                  <label htmlFor="contact-message" style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                    Message
                  </label>
                  <textarea id="contact-message" required rows="4" style={{ ...inputStyles, resize: 'vertical' }} placeholder="Tell me about your project or opportunity..." />
                </div>

                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        padding: '0.65rem 0.85rem', background: 'rgba(16,185,129,0.08)',
                        border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px',
                        color: 'var(--accent-green)', fontSize: '0.82rem', fontWeight: 600,
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                      }}
                    >
                      <Check size={15} /> Message sent successfully!
                    </motion.div>
                  )}
                </AnimatePresence>

                <button type="submit" className="btn btn-primary" style={{
                  width: '100%', padding: '0.85rem', fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
