import React from 'react'

export default function CloudInteractiveBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
    }}>
      {/* Aurora orb 1 — top left */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)',
        filter: 'blur(100px)', top: '-10%', left: '-5%',
        animation: 'aurora-drift 20s ease-in-out infinite',
      }} />

      {/* Aurora orb 2 — center right */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.06), transparent 70%)',
        filter: 'blur(100px)', top: '40%', right: '-10%',
        animation: 'aurora-drift 25s ease-in-out infinite reverse',
      }} />

      {/* Aurora orb 3 — bottom left */}
      <div style={{
        position: 'absolute', width: '450px', height: '450px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%)',
        filter: 'blur(100px)', bottom: '-5%', left: '20%',
        animation: 'aurora-drift 18s ease-in-out infinite',
      }} />
    </div>
  )
}
