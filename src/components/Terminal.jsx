import React, { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, Play, ShieldAlert, Cpu, CheckCircle2, Cloud, Sparkles } from 'lucide-react'

export default function TerminalComponent() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'INIT // SECURE_CLOUD_OS_V4.19 [KERNEL: x86_64-aws-k8s]' },
    { type: 'system', text: 'AUTHENTICATION STATUS: VERIFIED (Antarip Chatterjee // Lead Cloud Engineer)' },
    { type: 'info', text: "Type 'help' to inspect command capabilities or 'cloud-audit' to verify telemetry." },
  ])
  const [isExecuting, setIsExecuting] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase()
    if (!trimmed) return

    setHistory((prev) => [...prev, { type: 'user', text: `$ ${cmdText}` }])
    setInput('')
    setIsExecuting(true)

    setTimeout(() => {
      processCommand(trimmed)
      setIsExecuting(false)
    }, 250)
  }

  const processCommand = (cmd) => {
    switch (cmd) {
      case 'help':
        setHistory((prev) => [
          ...prev,
          { type: 'system', text: '=== AVAILABLE SYSTEM UTILITIES ===' },
          { type: 'info', text: '  whoami       - Operative profile & academic identity' },
          { type: 'info', text: '  cloud-audit  - Scan AWS/GCP IAM roles, VPC subnets & K8s pods' },
          { type: 'info', text: '  skills       - Query active engineering competencies' },
          { type: 'info', text: '  patent-iot   - Inspect Smart Microplastic Detector IoT telemetry' },
          { type: 'info', text: '  experience   - Display technical leadership & hackathon record' },
          { type: 'info', text: '  contact      - Open direct communication channel' },
          { type: 'info', text: '  clear        - Flush terminal buffer' },
        ])
        break

      case 'whoami':
        setHistory((prev) => [
          ...prev,
          { type: 'highlight', text: '[PROFILE IDENTIFIER]' },
          { type: 'text', text: '  Name: Antarip Chatterjee' },
          { type: 'text', text: '  Degree: B.Tech CSE (Cloud Computing) @ Lovely Professional University' },
          { type: 'text', text: '  Academic Standing: Top 1% Global Cohort' },
          { type: 'text', text: '  Key Roles: Lead Cloud Systems Architect & Head of Marketing @ CREST' },
          { type: 'text', text: '  Target: Summer 2027 Internship (Cloud Architecture / DevOps / SWE)' },
        ])
        break

      case 'cloud-audit':
        setHistory((prev) => [
          ...prev,
          { type: 'highlight', text: '[EXECUTING CLOUD SECURITY & COMPLIANCE SCAN...]' },
          { type: 'success', text: '  ✓ AWS IAM Zero-Trust Matrix: PASS (Least-privilege enforced)' },
          { type: 'success', text: '  ✓ VPC Multi-AZ Peering: ACTIVE (us-east-1a / us-east-1b)' },
          { type: 'success', text: '  ✓ Kubernetes Node Pods: 100% HEALTHY (0 CrashLoopBackOff)' },
          { type: 'success', text: '  ✓ Docker Daemon CI/CD Pipeline: GitHub Actions Secure Sync' },
          { type: 'info', text: '  -> AUDIT RESULT: Infrastructure Ready for Enterprise Deployment.' },
        ])
        break

      case 'skills':
        setHistory((prev) => [
          ...prev,
          { type: 'highlight', text: '[ACTIVE STACK & TOOLCHAIN]' },
          { type: 'text', text: '  Cloud & DevOps: AWS (EC2, S3, IAM, VPC), GCP, Docker, Kubernetes, CI/CD' },
          { type: 'text', text: '  Languages: Python, C/C++, JavaScript, SQL' },
          { type: 'text', text: '  Backend & Data: Node.js, Express, MongoDB, MySQL, Pandas' },
          { type: 'text', text: '  Embedded IoT: ESP32, AS7262 Spectrometer, ThingSpeak, Microcontroller Firmware' },
        ])
        break

      case 'patent-iot':
        setHistory((prev) => [
          ...prev,
          { type: 'highlight', text: '[PATENT INNOVATION // IOT HARDWARE]' },
          { type: 'text', text: '  Invention: Smart Microplastic Detector' },
          { type: 'text', text: '  Core Microcontroller: ESP32 with 6-Channel Optical Spectroscopy (AS7262)' },
          { type: 'text', text: '  Telemetry Stream: Live ThingSpeak Cloud Analytics & Automated Telegram Bot Alerts' },
          { type: 'success', text: '  Status: Patent Application Filed & Verified Prototype Operational.' },
        ])
        break

      case 'experience':
        setHistory((prev) => [
          ...prev,
          { type: 'highlight', text: '[LEADERSHIP & TRACK RECORD]' },
          { type: 'text', text: '  • Head of Marketing @ CREST - Spearheading branding & tech outreach campaigns' },
          { type: 'text', text: '  • 5+ Hackathons: Lead Architect & Developer in national hackathon arenas' },
          { type: 'text', text: '  • IIT Madras Certified: Data Analyst Credential' },
          { type: 'text', text: '  • Infosys Springboard Certified: Big Data, Data Science, Cybersecurity & Python' },
        ])
        break

      case 'contact':
        setHistory((prev) => [
          ...prev,
          { type: 'info', text: '  Email: antarippro@gmail.com' },
          { type: 'info', text: '  GitHub: https://github.com/AntaripC' },
          { type: 'info', text: '  Status: Open for Summer 2027 Internship Opportunities' },
        ])
        break

      case 'clear':
        setHistory([])
        break

      default:
        setHistory((prev) => [
          ...prev,
          { type: 'error', text: `Command not recognized: '${cmd}'. Type 'help' for available commands.` },
        ])
        break
    }
  }

  return (
    <section id="terminal-section" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="cyber-tag" style={{ marginBottom: '0.75rem' }}>
            <ShieldAlert size={14} /> LIVE THREAT INTEL & OPERATIONS
          </div>
          <h2 style={{ marginBottom: '0.5rem' }}>Interactive Cloud Console</h2>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
            Verify credentials, run cloud compliance scans, and inspect system telemetry in real time.
          </p>
        </div>

        <div
          className="cyber-card"
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            background: 'var(--bg-card-elevated)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08), inset 0 0 20px rgba(217, 119, 6, 0.02)',
            padding: '1.5rem',
            borderRadius: '12px',
          }}
        >
          {/* Console Header */}
          <div
            className="terminal-header"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div className="terminal-dots">
              <span className="terminal-dot dot-red" />
              <span className="terminal-dot dot-yellow" />
              <span className="terminal-dot dot-green" />
              <span style={{ marginLeft: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                antarip@cloud-security-lab: ~/infra-ops
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)', fontSize: '0.75rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', boxShadow: '0 0 8px var(--accent-green)' }} />
              CONSOLE_ONLINE
            </div>
          </div>

          {/* Console Buffer / Output View */}
          <div
            style={{
              minHeight: '220px',
              maxHeight: '380px',
              overflowY: 'auto',
              padding: '1rem 0',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {history.map((line, idx) => {
              let color = 'var(--text-primary)'
              if (line.type === 'system') color = 'var(--accent-primary)'
              if (line.type === 'user') color = 'var(--accent-cyan)'
              if (line.type === 'info') color = 'var(--accent-amber)'
              if (line.type === 'highlight') color = 'var(--accent-purple)'
              if (line.type === 'success') color = 'var(--accent-green)'
              if (line.type === 'warning') color = '#fb923c'
              if (line.type === 'error') color = 'var(--accent-red)'

              return (
                <div key={idx} style={{ color, wordBreak: 'break-word', lineHeight: '1.6' }}>
                  {line.text}
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>

          {/* Quick Command Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              marginBottom: '1rem',
            }}
          >
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', alignSelf: 'center' }}>
              Quick Run:
            </span>
            {[
              { label: 'cloud-audit', desc: 'Cloud Scan' },
              { label: 'whoami', desc: 'Profile' },
              { label: 'skills', desc: 'Toolkit' },
              { label: 'patent-iot', desc: 'IoT specs' },
              { label: 'clear', desc: 'Clear' },
            ].map((btn, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCommand(btn.label)}
                disabled={isExecuting}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--accent-primary)',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)'
                  e.currentTarget.style.boxShadow = '0 0 10px var(--accent-glow)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                $ {btn.label}
              </button>
            ))}
          </div>

          {/* Command Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleCommand(input)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--bg-secondary)',
              padding: '0.5rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
              antarip@infra-ops:~$
            </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type 'help', 'cloud-audit', 'whoami'..."
              disabled={isExecuting}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
              }}
            />
            <button
              type="submit"
              disabled={isExecuting || !input.trim()}
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary), #b45309)',
                border: 'none',
                color: '#ffffff',
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: isExecuting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Play size={12} /> EXEC
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
