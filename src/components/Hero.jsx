import React, { useRef, useMemo, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, ContactShadows, Environment, MeshDistortMaterial, Html, OrbitControls } from '@react-three/drei'
import { Cloud as CloudIcon, Terminal, Mail, ChevronDown } from 'lucide-react'
import * as THREE from 'three'

/* ── Orbiting service node (sphere + HTML label) ── */
function ServiceNode({ angle, radius, speed, color, label, yOffset = 0 }) {
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
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
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
          background: 'rgba(3,7,18,0.85)',
          border: `1px solid ${color}50`,
          padding: '2px 6px',
          borderRadius: '3px',
          whiteSpace: 'nowrap',
          letterSpacing: '0.08em',
          textShadow: `0 0 8px ${color}`,
          transform: 'translateY(-18px)',
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

/* ── Tiny floating data particles ── */
function DataParticles({ count = 60 }) {
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
            color={i % 3 === 0 ? '#00f0ff' : i % 3 === 1 ? '#10b981' : '#a855f7'}
            transparent
            opacity={0.5 + Math.random() * 0.3}
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
function CloudModel() {
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
    { label: 'AWS', color: '#ff9900', angle: 0, radius: 2.1, speed: 0.35, yOffset: 0.2 },
    { label: 'K8s', color: '#326ce5', angle: Math.PI * 0.5, radius: 1.9, speed: 0.42, yOffset: -0.1 },
    { label: 'DOCKER', color: '#2496ed', angle: Math.PI, radius: 2.2, speed: 0.28, yOffset: 0.3 },
    { label: 'GCP', color: '#4285f4', angle: Math.PI * 1.5, radius: 2.0, speed: 0.38, yOffset: -0.2 },
    { label: 'IoT', color: '#10b981', angle: Math.PI * 0.25, radius: 1.7, speed: 0.5, yOffset: 0.1 },
    { label: 'CI/CD', color: '#f43f5e', angle: Math.PI * 1.25, radius: 1.8, speed: 0.32, yOffset: -0.3 },
  ]

  return (
    <MouseTracker>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
        <group ref={cloudRef}>
          {/* ── Cloud body: merged spheres forming a cloud silhouette ── */}
          <group ref={coreRef}>
            {/* Center large sphere */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.72, 32, 32]} />
              <MeshDistortMaterial
                color="#0a1628"
                emissive="#00f0ff"
                emissiveIntensity={0.15}
                distort={0.25}
                speed={1.8}
                roughness={0.2}
                metalness={0.9}
                transparent
                opacity={0.85}
              />
            </mesh>
            {/* Left lobe */}
            <mesh position={[-0.55, 0.05, 0]}>
              <sphereGeometry args={[0.52, 32, 32]} />
              <MeshDistortMaterial
                color="#0a1628"
                emissive="#00f0ff"
                emissiveIntensity={0.12}
                distort={0.2}
                speed={2}
                roughness={0.25}
                metalness={0.85}
                transparent
                opacity={0.85}
              />
            </mesh>
            {/* Right lobe */}
            <mesh position={[0.55, 0.08, 0]}>
              <sphereGeometry args={[0.55, 32, 32]} />
              <MeshDistortMaterial
                color="#0a1628"
                emissive="#10b981"
                emissiveIntensity={0.12}
                distort={0.22}
                speed={1.6}
                roughness={0.25}
                metalness={0.85}
                transparent
                opacity={0.85}
              />
            </mesh>
            {/* Top dome */}
            <mesh position={[0.15, 0.4, 0]}>
              <sphereGeometry args={[0.42, 32, 32]} />
              <MeshDistortMaterial
                color="#0a1628"
                emissive="#a855f7"
                emissiveIntensity={0.1}
                distort={0.18}
                speed={2.2}
                roughness={0.2}
                metalness={0.9}
                transparent
                opacity={0.85}
              />
            </mesh>
            {/* Bottom fill */}
            <mesh position={[0, -0.2, 0.15]}>
              <sphereGeometry args={[0.48, 32, 32]} />
              <MeshDistortMaterial
                color="#0a1628"
                emissive="#00f0ff"
                emissiveIntensity={0.08}
                distort={0.15}
                speed={1.5}
                roughness={0.3}
                metalness={0.8}
                transparent
                opacity={0.8}
              />
            </mesh>

            {/* Wireframe overlay for tech/holographic feel */}
            <mesh position={[0, 0.05, 0]} scale={1.05}>
              <sphereGeometry args={[0.72, 16, 16]} />
              <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.08} />
            </mesh>
            <mesh position={[-0.55, 0.05, 0]} scale={1.05}>
              <sphereGeometry args={[0.52, 12, 12]} />
              <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.06} />
            </mesh>
            <mesh position={[0.55, 0.08, 0]} scale={1.05}>
              <sphereGeometry args={[0.55, 12, 12]} />
              <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.06} />
            </mesh>
          </group>

          {/* ── Orbital rings ── */}
          <ConnectionRing radius={1.6} color="#00f0ff" speed={0.2} yOffset={0} />
          <ConnectionRing radius={2.0} color="#10b981" speed={-0.15} yOffset={0.1} />
          <ConnectionRing radius={2.4} color="#a855f7" speed={0.1} yOffset={-0.05} />

          {/* ── Service nodes ── */}
          {services.map((s, i) => (
            <ServiceNode key={i} {...s} />
          ))}

          {/* ── Floating data particles ── */}
          <DataParticles count={50} />
        </group>
      </Float>
    </MouseTracker>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()

  // Parallax translation effects on scroll
  const yText = useTransform(scrollY, [0, 800], [0, 150])
  const yCard = useTransform(scrollY, [0, 800], [0, 80])
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0])

  const stats = [
    { label: 'ACADEMIC STANDING', value: 'Top 1%', sub: 'Global Cohort @ LPU' },
    { label: 'CLOUD COMPILATION', value: 'AWS & GCP', sub: 'Architectures' },
    { label: 'RESEARCH & IP', value: 'Patent Pending', sub: 'Microplastic Detector' },
    { label: 'HACKATHONS', value: '5 Projects', sub: 'Team Lead & Dev' },
  ]

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '100px',
        paddingBottom: '3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="grid grid-2"
          style={{ alignItems: 'center', gap: '2.5rem', marginBottom: '1.5rem' }}
        >
          {/* Left Column: Heading & Content */}
          <motion.div style={{ y: yText }}>
            <div
              className="cyber-tag"
              style={{
                marginBottom: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
              }}
            >
              <CloudIcon size={14} style={{ marginRight: '0.2rem' }} />
              SECURE_CLOUD_ACTIVE // V4.19-PROD
            </div>
            
            <h1 style={{ marginBottom: '1rem' }}>
              Antarip Chatterjee
            </h1>
            
            <h2
              className="mono"
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                textAlign: 'left',
                marginBottom: '1.5rem',
                textTransform: 'none',
              }}
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-green) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                Cloud Computing Engineer
              </span>
            </h2>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.2rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                color: 'var(--accent-green)',
              }}
            >
              <CloudIcon size={16} />
              <span>Cloud Specialization • B.Tech CSE @ LPU</span>
            </div>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                marginBottom: '2rem',
                maxWidth: '580px',
                lineHeight: '1.75',
              }}
            >
              Specializing in <strong>Cloud Infrastructure, DevOps Security, and IoT Telemetry</strong>. Combining patent-pending IoT engineering with modern cloud architecture and distributed data science applications.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <motion.a
                href="#projects"
                className="btn btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <CloudIcon size={16} /> View Cloud & IoT Projects
              </motion.a>
              <motion.a
                href="#terminal-section"
                className="btn btn-outline"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Terminal size={16} /> Open Command Console
              </motion.a>
              <motion.a
                href="#contact"
                className="btn btn-green"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Mail size={16} /> Get In Touch
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: 3D Canvas and Floating Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, type: 'spring' }}
            style={{
              position: 'relative',
              height: '480px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Background radial glow */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '340px',
                height: '340px',
                background: 'radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)',
                filter: 'blur(50px)',
                zIndex: 0,
              }}
            />
            {/* Spinning dashed orbit ring */}
            <div
              style={{
                position: 'absolute',
                width: '380px',
                height: '380px',
                border: '1px dashed rgba(0, 240, 255, 0.25)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            
            {/* R3F Canvas */}
            <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 2 }}>
              <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                <directionalLight position={[-10, -10, -10]} intensity={0.6} color="#10b981" />
                <pointLight position={[0, 3, 0]} intensity={0.4} color="#a855f7" />
                <CloudModel />
                <Environment preset="night" />
                <ContactShadows
                  position={[0, -2, 0]}
                  opacity={0.4}
                  scale={12}
                  blur={3}
                  far={5}
                  color="#00f0ff"
                />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 1.8}
                  minPolarAngle={Math.PI / 3}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            </div>

            {/* Floating profile badge */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '15px',
                right: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.6rem 1.1rem 0.6rem 0.6rem',
                background: 'rgba(3, 7, 18, 0.9)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-color)',
                borderRadius: '50px',
                zIndex: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(0, 240, 255, 0.2)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Fallback to initials if photo is missing */}
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '2px solid var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  color: 'var(--accent-cyan)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.1rem',
                  boxShadow: '0 0 10px rgba(0, 240, 255, 0.2)',
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
                <div
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Antarip Chatterjee
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent-green)',
                    fontFamily: 'var(--font-mono)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
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
                  Target: Summer '27 Intern
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.2rem',
            marginTop: '3.5rem',
            padding: '1.5rem',
            background: 'rgba(8, 14, 28, 0.65)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            backdropFilter: 'blur(12px)',
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} style={{ borderLeft: '2px solid var(--accent-cyan)', paddingLeft: '1rem' }}>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.08em',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  margin: '0.2rem 0',
                  fontFamily: 'var(--font-main)',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--accent-cyan)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Nav down arrow */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          opacity: opacityHero,
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          style={{
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
          }}
        >
          SEC_NAV_DOWN
        </span>
        <ChevronDown size={18} color="var(--accent-cyan)" />
      </motion.div>
    </section>
  )
}
