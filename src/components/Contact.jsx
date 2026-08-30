import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin, Send, MessageSquare, ShieldAlert, Check, Copy, Clock, Sparkles, ArrowRight } from 'lucide-react'
import { TiltCard } from './About.jsx'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Live IST Time
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
    navigator.clipboard.writeText('hello@antarip.dev')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">
            <MessageSquare size={14} /> SECURE_COMMS // TRANSMISSION_HUB
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Initialize Communication Transmission</h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            Direct communication channel for cloud architecture discussions, Summer 2027 internship opportunities, and IoT research collaborations.
          </p>
        </div>

        <div className="grid grid-2" style={{ gap: '2.5rem', alignItems: 'flex-start' }}>
          {/* ======================================================================= */}
          {/* LEFT COLUMN: LIVE STATUS, CHANNELS & QUICK ACTION */}
          {/* ======================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard
              borderTopColor="var(--accent-primary)"
              style={{
                background: 'var(--bg-card)',
                padding: '2.2rem',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                marginBottom: '1.5rem',
              }}
            >
              <div className="terminal-header" style={{ marginBottom: '1.2rem' }}>
                <div className="terminal-dots">
                  <span className="terminal-dot dot-red" />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                </div>
                <span style={{ color: 'var(--accent-primary)', fontSize: '0.72rem', fontWeight: '600' }}>
                  OPERATIVE_CHANNEL // DIRECT_DISPATCH
                </span>
              </div>

              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                Let's Architect Scalable Cloud Systems.
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: '1.75', marginBottom: '1.75rem' }}>
                Whether you're seeking a high-velocity <strong>Cloud Engineering & SWE intern for Summer 2027</strong>, want to explore IoT hardware sensor telemetry, or discuss distributed systems, dispatch a transmission below.
              </p>

              {/* Status Row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--bg-secondary)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  <Clock size={15} color="var(--accent-primary)" />
                  <span>LOCAL TIME (IST):</span>
                  <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>{currentTime || '01:30 AM'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', fontWeight: '700' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', boxShadow: '0 0 6px var(--accent-green)' }} />
                  ACTIVE
                </div>
              </div>

              {/* Communication Links List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* Email with Copy Action */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ padding: '0.45rem', background: 'rgba(217, 119, 6, 0.1)', borderRadius: '6px', color: 'var(--accent-primary)' }}>
                      <Mail size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>DIRECT EMAIL</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                        hello@antarip.dev
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: copied ? 'var(--accent-green)' : 'var(--bg-card)',
                      color: copied ? '#ffffff' : 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '5px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/antarip-chatterjee"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ padding: '0.45rem', background: 'rgba(124, 58, 237, 0.1)', borderRadius: '6px', color: '#7c3aed' }}>
                      <Linkedin size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>LINKEDIN PROFILE</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                        in/antarip-chatterjee
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                    Connect &rarr;
                  </span>
                </a>

                {/* GitHub Link */}
                <a
                  href="https://github.com/AntaripC"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ padding: '0.45rem', background: 'rgba(2, 132, 199, 0.1)', borderRadius: '6px', color: '#0284c7' }}>
                      <Github size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>GITHUB REPOSITORIES</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                        github.com/AntaripC
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                    View Code &rarr;
                  </span>
                </a>
              </div>
            </TiltCard>
          </motion.div>

          {/* ======================================================================= */}
          {/* RIGHT COLUMN: TRANSMISSION DISPATCH FORM */}
          {/* ======================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <TiltCard
              borderTopColor="var(--accent-green)"
              style={{
                background: 'var(--bg-card)',
                padding: '2.2rem',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div className="terminal-header" style={{ marginBottom: '1.2rem' }}>
                <div className="terminal-dots">
                  <span className="terminal-dot dot-red" />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                </div>
                <span style={{ color: 'var(--accent-green)', fontSize: '0.72rem', fontWeight: '600' }}>
                  DISPATCH_TERMINAL // ENCRYPTED_SSL
                </span>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: 'block',
                      marginBottom: '0.35rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: '600',
                    }}
                  >
                    OPERATIVE_NAME
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.88rem',
                    }}
                    placeholder="e.g. Hiring Manager / Cloud Architect"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: 'block',
                      marginBottom: '0.35rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: '600',
                    }}
                  >
                    RETURN_EMAIL_ADDRESS
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.88rem',
                    }}
                    placeholder="contact@enterprise.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: 'block',
                      marginBottom: '0.35rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: '600',
                    }}
                  >
                    TRANSMISSION_PAYLOAD
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.88rem',
                    }}
                    placeholder="Discuss cloud architectures, Summer 2027 internship opportunities, or IoT telemetry..."
                  />
                </div>

                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        padding: '0.65rem 0.85rem',
                        background: 'rgba(5, 150, 105, 0.1)',
                        border: '1px solid var(--border-green)',
                        borderRadius: '6px',
                        color: 'var(--accent-green)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                      }}
                    >
                      <Check size={16} /> Transmission queued successfully. Response incoming.
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Send size={16} /> TRANSMIT_MESSAGE
                </button>
              </form>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
