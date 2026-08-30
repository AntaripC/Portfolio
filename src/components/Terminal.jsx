import React, { useState, useEffect, useRef } from 'react'
import { Terminal as TerminalIcon, ShieldAlert, CheckCircle2, Play } from 'lucide-react'

export default function Terminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'ANTARIP-OS Cloud Operations Kernel v5.15-aws // Initialized Security & Telemetry Engine',
    },
    {
      type: 'info',
      text: 'Type "help" or click one of the quick command buttons below to query diagnostics.',
    },
  ])
  const [isExecuting, setIsExecuting] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase()
    if (!cleanCmd) return

    setHistory((prev) => [...prev, { type: 'user', text: `$ ${cmd}` }])
    setIsExecuting(true)

    setTimeout(() => {
      let output = []
      switch (cleanCmd) {
        case 'help':
          output = [
            { type: 'info', text: 'AVAILABLE DIAGNOSTIC OPERATIONS:' },
            { type: 'text', text: '  whoami       - Print operative background & credentials' },
            { type: 'text', text: '  skills       - List programming stacks & cloud toolkit' },
            { type: 'text', text: '  cloud-audit  - Execute simulated AWS/Kubernetes Well-Architected check' },
            { type: 'text', text: '  patent-iot   - Inspect Smart Microplastic Detector specs' },
            { type: 'text', text: '  experience   - Display student projects, certs & hackathons' },
            { type: 'text', text: '  contact      - Output verified secure communication channels' },
            { type: 'text', text: '  clear        - Clear console buffer' },
          ]
          break
        case 'whoami':
          output = [
            { type: 'highlight', text: '>> IDENTITY: Antarip Chatterjee (Cloud Engineer & CSE Undergraduate)' },
            { type: 'text', text: '>> ACADEMICS: B.Tech Computer Science Engineering (Cloud Computing) @ LPU (Expected 2029)' },
            { type: 'text', text: '>> TRACK RECORD: Top 1% academic standing globally in LPU cohort' },
            { type: 'text', text: '>> CORE AREAS: Distributed Systems, DevOps, IoT Hardware Engineering, Robotics & Automation' },
            { type: 'text', text: '>> OBJECTIVE: Seeking Summer 2027 Internships (Cloud Infrastructure / DevOps / SWE)' },
          ]
          break
        case 'skills':
          output = [
            { type: 'highlight', text: '[CLOUD & INFRA]: AWS, Google Cloud Platform, Kubernetes, Docker, Cloud Security' },
            { type: 'highlight', text: '[DEVELOPMENT]: Python, JavaScript, C/C++, SQL, HTML5, CSS3, JSON, Bash Scripting' },
            { type: 'highlight', text: '[DATABASES & WEB]: MongoDB, Node.js, Relational DBs (RDBMS), Software Engineering' },
            { type: 'highlight', text: '[IOT & ROBOTICS]: ESP32, Sensor Telemetry, Hardware Automation, Hardware Security' },
          ]
          break
        case 'cloud-audit':
          output = [
            { type: 'warning', text: '[*] Launching Automated Cloud Infrastructure Compliance Scan (Well-Architected)...' },
            { type: 'text', text: '  > aws iam get-credential-report --output json // checking security compliance' },
            { type: 'text', text: '  > checkov -d terraform/ --framework terraform // checking configuration security' },
            { type: 'text', text: '  > [AWS IAM Guardrails]: PASS (MFA enforced for all IAM Users)' },
            { type: 'text', text: '  > [Cost Leakage Daemon]: PASS (0 Orphaned EBS Volumes detected)' },
            { type: 'text', text: '  > [K8s Namespace Isolation]: PASS (RBAC permissions mapped correctly)' },
            { type: 'success', text: '[+] AUDIT COMPLETED: Architecture compliant with cloud security standards.' },
          ]
          break
        case 'patent-iot':
          output = [
            { type: 'highlight', text: '>> DISCOVERY: Smart Microplastic Detector (Patent Pending Research)' },
            { type: 'text', text: '>> OVERVIEW: Real-time microplastic detector using cost-efficient spectral hardware' },
            { type: 'text', text: '>> COMPONENT STACK: ESP32 + Turbidity Sensor + AS7262 Spectral Sensor' },
            { type: 'text', text: '>> DATA PIPELINE: Real-time ThingSpeak cloud logging + automated Telegram emergency alerts' },
            { type: 'success', text: '>> STATUS: Patent documentation filed; system prototypes actively being tested' },
          ]
          break
        case 'experience':
          output = [
            { type: 'highlight', text: '1. IoT Patent Innovator (2025 - Present) | Inventor of Smart Microplastic Detector' },
            { type: 'highlight', text: '2. Professional Certifications (2025) | IIT Madras Data Analyst & Infosys Certified (Cybersecurity, Data Science)' },
            { type: 'highlight', text: '3. Team Lead @ Hackathons (2025 - Present) | Directed 5 developer teams to successful deliveries' },
          ]
          break
        case 'contact':
          output = [
            { type: 'info', text: 'SECURE COMMUNICATION PORTALS:' },
            { type: 'text', text: '  Email:    hello@antarip.dev' },
            { type: 'text', text: '  GitHub:   https://github.com/AntaripC' },
            { type: 'text', text: '  LinkedIn: https://linkedin.com/in/antarip-chatterjee (Placeholder)' },
            { type: 'text', text: '  Location: India' },
          ]
          break
        case 'clear':
          setHistory([])
          setIsExecuting(false)
          setInput('')
          return
        default:
          output = [
            { type: 'error', text: `Command not recognized: "${cmd}". Type "help" to see available commands.` },
          ]
          break
      }
      setHistory((prev) => [...prev, ...output])
      setIsExecuting(false)
    }, 350)

    setInput('')
  }

  return (
    <section id="terminal-section" className="section" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
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
            background: 'rgba(3, 7, 18, 0.95)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.15), inset 0 0 20px rgba(0, 240, 255, 0.05)',
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
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-green)',
                  boxShadow: '0 0 8px var(--accent-green)',
                }}
              />
              SECURE_SESSION: AES_256
            </div>
          </div>

          {/* Console History Output */}
          <div
            style={{
              minHeight: '260px',
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
              if (line.type === 'system') color = 'var(--accent-cyan)'
              if (line.type === 'user') color = '#38bdf8'
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
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
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
                  background: 'rgba(0, 240, 255, 0.08)',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  color: 'var(--accent-cyan)',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)'
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 240, 255, 0.08)'
                  e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.25)'
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
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
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
                background: 'rgba(0, 240, 255, 0.15)',
                border: '1px solid var(--accent-cyan)',
                color: 'var(--accent-cyan)',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
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
