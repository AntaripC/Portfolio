import React, { useRef, useMemo, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, ContactShadows, Environment, MeshDistortMaterial, Html, OrbitControls } from '@react-three/drei'
import { Cloud as CloudIcon, Terminal, Mail, Compass, Award, Zap, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, ChevronRight, Activity } from 'lucide-react'
import * as THREE from 'three'

/* ── Orbiting service node (sphere + HTML label) ── */
function ServiceNode({ angle, radius, speed, color, label, yOffset = 0, onSelect }) {
  const ref = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + angle
    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius
    const y = Math.sin(t * 1.5) * 0.3 + yOffset
    if (ref.current) ref.current.position.set(x, y, z)
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.15)
    }
  })

  return (
    <group ref={ref}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
      {/* Core */}
      <mesh onClick={onSelect} style={{ cursor: 'pointer' }}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>
      {/* Label */}
      <Html distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '9px',
          fontWeight: 700,
          color,
          background: 'var(--bg-card-elevated)',
          border: `1px solid ${color}50`,
          padding: '2px 6px',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          letterSpacing: '0.08em',
          textShadow: `0 0 8px ${color}`,
          transform: 'translateY(-18px)',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.1)',
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

/* ── Connection beam ring ── */
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
      <torusGeometry args={[radius, 0.008, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

/* ── Floating data particles ── */
function DataParticles({ count = 45 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.5 + Math.random() * 1.5
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) s[i] = 0.015 + Math.random() * 0.02
    return s
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.1
    }
  })

  return (
    <group ref={ref}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]]}>
          <sphereGeometry args={[sizes[i], 6, 6]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? 'var(--accent-primary)' : i % 3 === 1 ? 'var(--accent-green)' : 'var(--accent-purple)'}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ── Mouse-tracking wrapper ── */
function MouseTracker({ children }) {
  const groupRef = useRef()
  const { viewport } = useThree()

  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * viewport.width) / 12
      const targetY = (state.pointer.y * viewport.height) / 12
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX * 0.3, 0.05)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY * 0.2, 0.05)
    }
  })

  return <group ref={groupRef}>{children}</group>
}

/* ── Main interactive cloud model ── */
function CloudModel({ onSelectService }) {
  const cloudRef = useRef()
  const coreRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (cloudRef.current) {
      cloudRef.current.rotation.y = t * 0.12
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.03)
    }
  })

  const services = [
    { label: 'AWS-IAM', color: 'var(--accent-primary)', angle: 0, radius: 2.1, speed: 0.35, yOffset: 0.2, id: 'aws' },
    { label: 'K8S-POD', color: '#0284c7', angle: Math.PI * 0.5, radius: 1.9, speed: 0.42, yOffset: -0.1, id: 'k8s' },
    { label: 'DOCKER', color: '#38bdf8', angle: Math.PI, radius: 2.2, speed: 0.28, yOffset: 0.3, id: 'docker' },
    { label: 'GCP-VPC', color: '#7c3aed', angle: Math.PI * 1.5, radius: 2.0, speed: 0.38, yOffset: -0.2, id: 'gcp' },
    { label: 'ESP32-IoT', color: '#059669', angle: Math.PI * 0.25, radius: 1.7, speed: 0.5, yOffset: 0.1, id: 'iot' },
    { label: 'CI/CD', color: '#e11d48', angle: Math.PI * 1.25, radius: 1.8, speed: 0.32, yOffset: -0.3, id: 'cicd' },
  ]

  return (
    <MouseTracker>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
        <group ref={cloudRef}>
          {/* Cloud Core */}
          <group ref={coreRef}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.72, 32, 32]} />
              <MeshDistortMaterial
                color="var(--bg-secondary)"
                emissive="var(--accent-primary)"
                emissiveIntensity={0.25}
                distort={0.25}
                speed={1.5}
                roughness={0.2}
                metalness={0.6}
              />
            </mesh>
            <mesh position={[0.5, 0.1, 0]}>
              <sphereGeometry args={[0.5, 24, 24]} />
              <MeshDistortMaterial color="var(--bg-card)" distort={0.2} speed={1.8} roughness={0.3} />
            </mesh>
            <mesh position={[-0.45, 0.12, 0.1]}>
              <sphereGeometry args={[0.48, 24, 24]} />
              <MeshDistortMaterial color="var(--bg-card)" distort={0.2} speed={1.6} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.52, 24, 24]} />
              <MeshDistortMaterial color="var(--bg-secondary)" distort={0.22} speed={2} roughness={0.3} />
            </mesh>
          </group>

          {/* Service Nodes */}
          {services.map((svc, i) => (
            <ServiceNode
              key={i}
              angle={svc.angle}
              radius={svc.radius}
              speed={svc.speed}
              color={svc.color}
              label={svc.label}
              yOffset={svc.yOffset}
              onSelect={() => onSelectService(svc)}
            />
          ))}

          {/* Connection Rings */}
          <ConnectionRing radius={1.7} color="var(--accent-primary)" speed={0.3} yOffset={0.1} />
          <ConnectionRing radius={2.0} color="#0284c7" speed={-0.25} yOffset={-0.15} />
          <ConnectionRing radius={2.2} color="var(--accent-green)" speed={0.2} yOffset={0.25} />

          {/* Floating Data Particles */}
          <DataParticles count={45} />
        </group>
      </Float>
    </MouseTracker>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Animated Role Cycler
  const roles = [
    'Cloud Systems Architect',
    'IoT Spectral Prototyper (ESP32)',
    'Full-Stack & Systems Developer',
    'Top 1% B.Tech CSE @ LPU',
  ]
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  // Interactive 3D Node Telemetry Inspector
  const [activeService, setActiveService] = useState({
    id: 'aws',
    label: 'AWS Cloud Architecture',
    color: 'var(--accent-primary)',
    desc: 'Multi-AZ VPC peering, IAM zero-trust policies, automated S3 replication & EC2 microservices.',
    status: '99.99% RESILIENT',
  })

  const stats = [
    { label: 'COHORT ACADEMIC STANDING', value: 'Top 1%', sub: 'Global Ranking @ LPU' },
    { label: 'PATENT INNOVATION', value: 'Patent Pending', sub: 'ESP32 Optical Spectrometry' },
    { label: 'HACKATHON SPRINT LEAD', value: '5+ Sprints', sub: 'IITs & National Arenas' },
    { label: 'TARGET OPPORTUNITY', value: "Summer '27", sub: 'Cloud & SWE Internships' },
  ]

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* ========================================================================= */}
          {/* LEFT COLUMN: HERO HEADLINE, ROLE CYCLER & ACTION DOCK */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ opacity: opacityText }}
          >
            {/* Live Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '50px',
                padding: '0.4rem 0.95rem',
                marginBottom: '1.25rem',
                boxShadow: '0 4px 15px var(--accent-glow)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-green)',
                  boxShadow: '0 0 8px var(--accent-green)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                }}
              >
                AVAILABLE FOR SUMMER 2027 INTERNSHIP
              </span>
            </div>

            {/* Name Title */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontWeight: '800',
                lineHeight: '1.1',
                marginBottom: '0.75rem',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}
            >
              Antarip <span style={{ color: 'var(--accent-primary)' }}>Chatterjee</span>
            </h1>

            {/* Dynamic Role Cycler */}
            <div
              style={{
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    fontWeight: '700',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>&gt;</span>
                  {roles[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bio Narrative */}
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                lineHeight: '1.75',
                marginBottom: '2rem',
                maxWidth: '560px',
              }}
            >
              Building resilient <strong>Cloud Infrastructure & Scalable Systems</strong> at LPU. Merging patent-pending <strong>ESP32 IoT hardware telemetry</strong> with high-pressure hackathon sprint execution and collaborative technical leadership.
            </p>

            {/* Action Buttons Hub */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a href="#projects" className="btn btn-primary" style={{ padding: '0.75rem 1.4rem' }}>
                <Compass size={16} /> Explore Flagship Builds
              </a>
              <a href="#about" className="btn btn-outline" style={{ padding: '0.75rem 1.4rem' }}>
                <Terminal size={16} /> Launch Command Console
              </a>
              <a href="#contact" className="btn btn-green" style={{ padding: '0.75rem 1.4rem' }}>
                <Mail size={16} /> Connect Directly
              </a>
            </div>

            {/* Live Interactive Node Inspector Pill */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '0.85rem 1.1rem',
                maxWidth: '540px',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  ACTIVE_TOPOLOGY_NODE:
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--accent-green)',
                    fontWeight: '700',
                  }}
                >
                  ● {activeService.status}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: activeService.color,
                  }}
                />
                <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  {activeService.label}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '0.3rem 0 0 0', lineHeight: '1.4' }}>
                {activeService.desc}
              </p>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: 3D CLOUD TOPOLOGY CANVAS & INTERACTIVE NODE HOTSPOTS */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{
              position: 'relative',
              height: '520px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Subtle glow background */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '380px',
                height: '380px',
                background: 'radial-gradient(circle, var(--accent-glow) 0%, rgba(5, 150, 105, 0.05) 50%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 0,
              }}
            />

            {/* 3D Canvas */}
            <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 2 }}>
              <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 10, 10]} intensity={1.2} color="var(--accent-primary)" />
                <directionalLight position={[-10, -10, -10]} intensity={0.8} color="#059669" />
                <pointLight position={[0, 3, 0]} intensity={0.5} color="#7c3aed" />
                <CloudModel onSelectService={setActiveService} />
                <Environment preset="city" />
                <ContactShadows
                  position={[0, -2, 0]}
                  opacity={0.3}
                  scale={12}
                  blur={3}
                  far={5}
                  color="var(--accent-primary)"
                />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 1.8}
                  minPolarAngle={Math.PI / 3}
                  autoRotate
                  autoRotateSpeed={0.6}
                />
              </Canvas>
            </div>

            {/* Floating Profile Badge */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.6rem 1.1rem 0.6rem 0.6rem',
                background: 'var(--bg-card-elevated)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-color)',
                borderRadius: '50px',
                zIndex: 4,
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.1), 0 0 15px var(--accent-glow)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '2px solid var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  color: 'var(--accent-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.05rem',
                  boxShadow: '0 0 10px var(--accent-glow)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/photo.jpg"
                  alt="Antarip Chatterjee"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{ position: 'absolute' }}>AC</span>
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  Antarip Chatterjee
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', boxShadow: '0 0 6px var(--accent-green)' }} />
                  B.Tech CSE (Cloud) @ LPU
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM METRICS DOCK (4-PILLAR STATS GRID) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.2rem',
            marginTop: '3.5rem',
            padding: '1.5rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} style={{ borderLeft: '2px solid var(--accent-primary)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0.2rem 0', fontFamily: 'var(--font-main)' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
