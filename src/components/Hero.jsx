import React, { useRef, useMemo, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, ContactShadows, Environment, MeshDistortMaterial, Html, OrbitControls } from '@react-three/drei'
import { ArrowRight, Sparkles, ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import * as THREE from 'three'

/* ── Orbiting service node ── */
function ServiceNode({ angle, radius, speed, color, label, yOffset = 0 }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + angle
    if (ref.current) ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 1.5) * 0.3 + yOffset, Math.sin(t) * radius)
  })
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <Html distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '8px', fontWeight: 700, color,
          background: 'var(--bg-card-elevated)', border: `1px solid ${color}40`,
          padding: '2px 5px', borderRadius: '4px', whiteSpace: 'nowrap',
          transform: 'translateY(-16px)', letterSpacing: '0.06em',
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

/* ── Connection ring ── */
function ConnectionRing({ radius, color, speed = 0.3, yOffset = 0 }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * speed
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })
  return (
    <mesh ref={ref} position={[0, yOffset, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  )
}

/* ── Floating particles ── */
function DataParticles({ count = 35 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.5 + Math.random() * 1.2
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.04
    }
  })

  return (
    <group ref={ref}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]]}>
          <sphereGeometry args={[0.015 + Math.random() * 0.015, 6, 6]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#06b6d4' : '#8b5cf6'}
            transparent opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ── Mouse tracker ── */
function MouseTracker({ children }) {
  const groupRef = useRef()
  const { viewport } = useThree()
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.pointer.x * viewport.width) / 14 * 0.3, 0.04)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -(state.pointer.y * viewport.height) / 14 * 0.2, 0.04)
    }
  })
  return <group ref={groupRef}>{children}</group>
}

/* ── Cloud model ── */
function CloudModel() {
  const cloudRef = useRef()
  const coreRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (cloudRef.current) cloudRef.current.rotation.y = t * 0.1
    if (coreRef.current) coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.02)
  })

  const services = [
    { label: 'AWS', color: '#3b82f6', angle: 0, radius: 2, speed: 0.3, yOffset: 0.2 },
    { label: 'K8S', color: '#06b6d4', angle: Math.PI * 0.5, radius: 1.8, speed: 0.38, yOffset: -0.1 },
    { label: 'DOCKER', color: '#8b5cf6', angle: Math.PI, radius: 2.1, speed: 0.25, yOffset: 0.3 },
    { label: 'GCP', color: '#10b981', angle: Math.PI * 1.5, radius: 1.9, speed: 0.35, yOffset: -0.2 },
    { label: 'ESP32', color: '#f59e0b', angle: Math.PI * 0.25, radius: 1.6, speed: 0.45, yOffset: 0.1 },
    { label: 'CI/CD', color: '#ef4444', angle: Math.PI * 1.25, radius: 1.7, speed: 0.28, yOffset: -0.3 },
  ]

  return (
    <MouseTracker>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
        <group ref={cloudRef}>
          <group ref={coreRef}>
            <mesh>
              <sphereGeometry args={[0.65, 32, 32]} />
              <MeshDistortMaterial color="#1e293b" emissive="#3b82f6" emissiveIntensity={0.2} distort={0.2} speed={1.5} roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh position={[0.45, 0.1, 0]}>
              <sphereGeometry args={[0.45, 24, 24]} />
              <MeshDistortMaterial color="#1e293b" emissive="#06b6d4" emissiveIntensity={0.1} distort={0.18} speed={1.8} roughness={0.3} />
            </mesh>
            <mesh position={[-0.4, 0.12, 0.1]}>
              <sphereGeometry args={[0.42, 24, 24]} />
              <MeshDistortMaterial color="#1e293b" emissive="#8b5cf6" emissiveIntensity={0.1} distort={0.18} speed={1.6} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.48, 24, 24]} />
              <MeshDistortMaterial color="#1e293b" emissive="#3b82f6" emissiveIntensity={0.15} distort={0.2} speed={2} roughness={0.3} />
            </mesh>
          </group>

          {/* Central photo */}
          <Html position={[0, 0, 0.15]} center distanceFactor={5} style={{ pointerEvents: 'none' }}>
            <div style={{
              width: '140px', height: '140px', borderRadius: '50%', padding: '3px',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)',
              boxShadow: '0 0 35px rgba(59, 130, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', userSelect: 'none',
            }}>
              <img src="/antarip.jpg" alt="Antarip Chatterjee" style={{
                width: '100%', height: '100%', borderRadius: '50%',
                objectFit: 'cover', display: 'block', border: '2px solid rgba(255,255,255,0.9)',
              }} />
              <div style={{
                position: 'absolute', bottom: '4px', right: '4px',
                width: '16px', height: '16px', borderRadius: '50%',
                backgroundColor: '#10b981', border: '2.5px solid #1e293b',
                boxShadow: '0 0 8px #10b981',
              }} />
            </div>
          </Html>

          {services.map((svc, i) => <ServiceNode key={i} {...svc} />)}
          <ConnectionRing radius={1.6} color="#3b82f6" speed={0.25} yOffset={0.1} />
          <ConnectionRing radius={1.9} color="#06b6d4" speed={-0.2} yOffset={-0.1} />
          <ConnectionRing radius={2.1} color="#8b5cf6" speed={0.15} yOffset={0.2} />
          <DataParticles count={35} />
        </group>
      </Float>
    </MouseTracker>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const roles = [
    'Cloud Systems Architect',
    'IoT Prototyper & Innovator',
    'Full-Stack Developer',
    'Top 1% B.Tech CSE @ LPU',
  ]
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((prev) => (prev + 1) % roles.length), 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '5rem',
        paddingBottom: '3rem',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          minHeight: 'calc(100vh - 10rem)',
        }}>
          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ opacity: opacityText }}
          >
            {/* Status pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(16, 185, 129, 0.08)', border: '1px solid var(--border-green)',
              borderRadius: 'var(--radius-full)', padding: '0.4rem 0.95rem',
              marginBottom: '1.5rem',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                backgroundColor: 'var(--accent-green)', boxShadow: '0 0 8px var(--accent-green)',
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--accent-green)', fontWeight: '600' }}>
                OPEN FOR SUMMER 2027 INTERNSHIP
              </span>
            </div>

            {/* Name */}
            <h1 style={{ marginBottom: '0.5rem', lineHeight: 1.05 }}>
              Antarip<br />Chatterjee
            </h1>

            {/* Role cycler */}
            <div style={{ height: '38px', display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}
                >
                  <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{'>'}</span>
                  {roles[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bio */}
            <p style={{
              color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.75',
              marginBottom: '2rem', maxWidth: '520px',
            }}>
              Building resilient <strong>Cloud Infrastructure</strong> and <strong>Scalable Systems</strong> at LPU.
              Merging patent-pending <strong>ESP32 IoT telemetry</strong> with high-pressure hackathon sprints.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a href="#projects" className="btn btn-primary" style={{ padding: '0.8rem 1.5rem' }}>
                View Projects <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn btn-outline" style={{ padding: '0.8rem 1.5rem' }}>
                <Mail size={16} /> Get in Touch
              </a>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                { icon: <Github size={18} />, href: 'https://github.com/AntaripC', label: 'GitHub' },
                { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/antarip-chatterjee-0205a9374/', label: 'LinkedIn' },
                { icon: <Mail size={18} />, href: '#contact', label: 'Email' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)', transition: 'all 0.25s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)'
                    e.currentTarget.style.color = 'var(--accent-primary)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              position: 'relative', height: '500px', width: '100%',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}>
              {/* Background glow */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px', height: '400px',
                background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)',
                filter: 'blur(60px)', zIndex: 0,
              }} />

              <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 2 }}>
                <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
                  <directionalLight position={[-10, -10, -10]} intensity={0.7} color="#06b6d4" />
                  <pointLight position={[0, 3, 0]} intensity={0.4} color="#8b5cf6" />
                  <CloudModel />
                  <Environment preset="city" />
                  <ContactShadows position={[0, -2, 0]} opacity={0.25} scale={10} blur={3} far={5} color="#3b82f6" />
                  <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </div>
            </div>

            {/* Bio card under 3D */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{
                background: 'var(--bg-card)', backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)',
                padding: '1rem 1.25rem', marginTop: '-1rem', position: 'relative', zIndex: 3,
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%', padding: '2px',
                  background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow)', flexShrink: 0,
                  position: 'relative',
                }}>
                  <img src="/antarip.jpg" alt="Antarip Chatterjee" style={{
                    width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: '0', right: '0',
                    width: '12px', height: '12px', borderRadius: '50%',
                    backgroundColor: '#10b981', border: '2px solid var(--bg-card)',
                  }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      Antarip Chatterjee
                    </span>
                    {/* Capgemini badge */}
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                      fontFamily: 'var(--font-mono)', fontSize: '0.58rem', padding: '1px 6px',
                      borderRadius: '8px', background: 'rgba(0, 114, 198, 0.1)',
                      color: '#0072C6', border: '1px solid rgba(0, 114, 198, 0.25)',
                      fontWeight: '700',
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11" fill="#0072C6" />
                        <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      CAPGEMINI
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
                    Cloud Architect & IoT Innovator
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    B.Tech CSE (Cloud) • LPU Top 1%
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem',
            marginTop: '2rem',
          }}
        >
          {[
            { value: 'Top 1%', label: 'Cohort Standing' },
            { value: 'Patent Pending', label: 'IoT Innovation' },
            { value: '5+ Sprints', label: 'Hackathon Leads' },
            { value: "Summer '27", label: 'Target Internship' },
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{
                fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)',
                background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.3rem', zIndex: 10,
        }}
      >
        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} color="var(--text-muted)" />
        </motion.div>
      </motion.div>
    </section>
  )
}
