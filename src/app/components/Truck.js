'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center style={{ color: 'white', fontFamily: 'Rajdhani' }}>
      {progress.toFixed(0)} % loading...
    </Html>
  )
}

// ─── Preload truck asset ─────────────────────────────────────────────────────
useGLTF.preload('/truck.glb')

// ─── Section definitions ────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: 'home',
    label: 'HOME',
    heading: 'Building \nMaterial\nSupplier\nchennai - tn',
    sub: 'Premium Msand & gravel delivered across Chennai with our own fleet of trucks. From 5 tons to 50 tons — reliable supply, on-time delivery, every project.',
    cta: '26 years ',
    accent: '#FFFFFF',
    pose: { x: 13, z: -5, rotY: 0 },
  },
  {
    id: 'product',
    label: 'PRODUCT',
    heading: 'OUR PRODUCTS',
    sub: 'High-quality building materials for every project scale',
    accent: '#ff6b35',
    pose: { x: 0, z: -5, rotY: 0 },
  },
  {
    id: 'service',
    label: 'OUR FLEET',
    heading: 'Any size\nyour timeline.',
    sub: 'We own and operate every truck — no brokers, no surprises. Every delivery is tracked and confirmed before dispatch.',
    // cta: 'Our Services →',
    accent: '#00d4ff',
    pose: { x: 7, z: 10, rotY: -Math.PI / 2 },
  },
  {
    id: 'contact',
    label: 'CONTACT',
    heading: "Need materials \ntoday?",
    sub: 'Call or WhatsApp us to place your order. Fast delivery across Chennai with trusted quality and transparent pricing.',
    cta: 'Get In Touch →',
    accent: '#c084fc',
    pose: { x: -3, y: 12, z: 5, rotY: (-3 * Math.PI) / 3 },
  },
]

// ─── Wireframe material (created once, shared) ───────────────────────────────
const WIRE_MAT = new THREE.MeshBasicMaterial({
  color: '#ffffff',
  wireframe: true,
  transparent: true,
  opacity: 0.07,
})

// ─── Truck 3D ───────────────────────────────────────────────────────────────
function Truck({ targetPose }) {
  const { scene } = useGLTF('/truck.glb')
  const truckRef = useRef()

  const POSITION_SPEED = 3
  const ROTATION_SPEED = 2

  // Clone solid scene once
  const solidScene = useMemo(() => scene.clone(true), [scene])

  // Clone wire scene once, reuse shared material
  const wireScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = WIRE_MAT
      }
    })
    return clone
  }, [scene])

  useFrame((_, delta) => {
    if (!truckRef.current) return
    const p = truckRef.current
    p.position.x = THREE.MathUtils.damp(p.position.x, targetPose.x, POSITION_SPEED, delta)
    p.position.z = THREE.MathUtils.damp(p.position.z, targetPose.z, POSITION_SPEED, delta)
    p.rotation.y = THREE.MathUtils.damp(p.rotation.y, targetPose.rotY, ROTATION_SPEED, delta)
  })

  return (
    <group ref={truckRef} scale={2} position={[0, -4.2, 0]}>
      <primitive object={solidScene} />
      <primitive object={wireScene} />
    </group>
  )
}

// ─── Styles (static objects to avoid re-creation) ───────────────────────────
const labelStyle = (accent) => ({
  color: accent,
  fontFamily: "'Rajdhani', sans-serif",
  letterSpacing: '0.25em',
  fontSize: '0.75rem',
  fontWeight: 600,
})

const headingStyle = {
  lineHeight: 0.95,
  color: '#f5f0e8',
  letterSpacing: '-0.01em',
  whiteSpace: 'pre-line',
  fontFamily: "'Bebas Neue', sans-serif",
  textShadow: '0 4px 40px rgba(0,0,0,0.4)',
}

const bodyStyle = {
  fontFamily: "'Rajdhani', sans-serif",
  color: 'rgba(245,240,232,0.7)',
  fontWeight: 400,
  lineHeight: 1.6,
}

// ─── Section content ────────────────────────────────────────────────────────
function SectionContent({ section, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            left: 'clamp(16px, 5vw, 80px)',
            top: '15%',
            transform: 'translateY(-50%)',
            maxWidth: 'min(420px, 48vw)',
            zIndex: 20,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ ...labelStyle(section.accent), marginBottom: '1rem' }}
            className="uppercase"
          >
            ── {section.label}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            style={{
              ...headingStyle,
              fontSize: 'clamp(2.2rem, 6vw, 6.5rem)',
            }}
          >
            {section.heading}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              height: '3px',
              width: '80px',
              background: section.accent,
              transformOrigin: 'left',
              margin: '20px 0',
              borderRadius: '2px',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{
              ...bodyStyle,
              fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
              maxWidth: '380px',
            }}
          >
            {section.sub}
          </motion.p>

          {section.cta && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              style={{
                marginTop: '32px',
                padding: '12px 28px',
                background: 'transparent',
                border: `1.5px solid ${section.accent}`,
                color: section.accent,
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                pointerEvents: 'auto',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = section.accent
                e.currentTarget.style.color = '#111'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = section.accent
              }}
            > <a
            href="tel:9500007779"
            className="px-8 py-4 border border-black rounded-full hover:bg-black hover:text-white transition text-lg"
          >
           {section.cta}
          </a>
              
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Product card ────────────────────────────────────────────────────────────
const PRODUCTS = [
  { title: 'M Sand', desc: 'Double washed clean M-sand', img: '/msand.jpg' },
  { title: 'White M Sand', desc: 'Double washed. Quality equal to river sand', img: '/white msand.jpg' },
  { title: 'P Sand', desc: 'Double washed. Perfect for plastering', img: '/psand.jpg' },
  { title: '20MM', desc: 'Perfect sized gravel for construction', img: '/20mm.jpg' },
  { title: 'Aggregates', desc: '6mm, 12mm, 14mm and more', img: '/aggregates.jpeg' },
  { title: 'Dust', desc: 'High quality stone dust', img: '/dust.jpg' },
]

const containerVariants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
}

// ─── Right panels ────────────────────────────────────────────────────────────
function RightPanel({ activeSection, isMobile }) {
  return (
    <AnimatePresence mode="wait">

      {/* PRODUCT panel */}
      {activeSection === 1 && (
        <motion.div
          key="product"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            // On mobile: bottom strip; on desktop: right side, vertically centred
            ...(isMobile
              ? {
                bottom: 64,
                left: 0,
                right: 0,
                padding: '0 12px',
                zIndex: 20,
              }
              : {
                right: 'clamp(8px, 4vw, 48px)',
                top: '27%',
                transform: 'translateY(-50%)',
                zIndex: 20,
                maxWidth: '55vw',
              }),
            fontFamily: "'Rajdhani', sans-serif",
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
              gap: isMobile ? 8 : 16,
            }}
          >
            {PRODUCTS.map((product) => (
              <motion.div
                key={product.title}
                variants={itemVariants}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 10,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: isMobile ? '8px 4px' : '16px',
                }}
              >
                <img
                  src={product.img}
                  alt={product.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: isMobile ? 64 : 140,
                    objectFit: 'cover',
                    borderRadius: 6,
                  }}
                />
                <p
                  style={{
                    marginTop: 8,
                    fontSize: isMobile ? '0.65rem' : '1rem',
                    fontWeight: 700,
                    color: '#fff',
                    textAlign: 'center',
                  }}
                >
                  {product.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* FLEET panel */}
      {activeSection === 2 && (
        <motion.div
          key="service"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            ...(isMobile
              ? { bottom: 72, left: '5%', transform: 'translateX(-50%)', width: '90%', zIndex: 20 }
              : { right: 'clamp(8px, 5vw, 80px)', top: '50%', transform: 'translateY(-50%)', zIndex: 20, maxWidth: 580 }),
            fontFamily: "'Rajdhani', sans-serif",
          }}
        >
          <img
            src="/truck2.png"
            alt="Fleet truck"
            loading="lazy"
            style={{
              width: '100%',
              height: isMobile ? 120 : 200,
              objectFit: 'cover',
              borderRadius: 8,
              marginBottom: 16,
            }}
          />
          {['5 TON - 150 TON', 'SAME DAY DELIVERY'].map((val) => (
            <div
              key={val}
              style={{
                fontSize: isMobile ? '1.4rem' : '2.2rem',
                color: SECTIONS[2].accent,
                fontWeight: 700,
                lineHeight: 1.2,
                textAlign: isMobile ? 'center' : 'right',
                marginBottom: 4,
              }}
            >
              {val}
            </div>
          ))}
        </motion.div>
      )}

      {/* CONTACT panel */}
      {activeSection === 3 && (



        <>
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              ...(isMobile
                ? { bottom: 72, left: '50%', transform: 'translateX(-50%)', width: '90%', zIndex: 20 }
                : { right: 'clamp(8px, 4vw, 56px)', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }),
              fontFamily: "'Rajdhani', sans-serif",
            }}
          >
            {[['📞', '950000779'], ['📍', 'Chennai, TN']].map(([icon, val]) => (
              <div
                key={val}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  color: 'rgba(245,240,232,0.75)',
                  fontSize: isMobile ? '0.85rem' : '0.95rem',
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span>{val}</span>
              </div>
            ))}
          </motion.div></>

      )}

    </AnimatePresence>
  )
}

// ─── Main Scene ─────────────────────────────────────────────────────────────
export default function Scene() {
  const [activeSection, setActiveSection] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const activeSectionRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const canAdvanceRef = useRef(false)
  const wheelAccumRef = useRef(0)
  const holdTimerRef = useRef(null)

  const HOLD_MS = 900
  const WHEEL_THRESHOLD = 100

  const currentSection = SECTIONS[activeSection]
  const accent = currentSection?.accent || '#e8ff00'

  const goTo = useCallback((idx) => {
    if (isAnimatingRef.current) return
    if (idx === activeSectionRef.current) return
    if (idx < 0 || idx >= SECTIONS.length) return

    isAnimatingRef.current = true
    canAdvanceRef.current = false
    wheelAccumRef.current = 0
    clearTimeout(holdTimerRef.current)

    setTransitioning(true)

    setTimeout(() => {
      activeSectionRef.current = idx
      setActiveSection(idx)
      setTransitioning(false)

      holdTimerRef.current = setTimeout(() => {
        canAdvanceRef.current = true
        isAnimatingRef.current = false
      }, HOLD_MS)
    }, 280)
  }, [])

  useEffect(() => {
    holdTimerRef.current = setTimeout(() => { canAdvanceRef.current = true }, HOLD_MS)
    return () => clearTimeout(holdTimerRef.current)
  }, [])

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      if (!canAdvanceRef.current) return
      wheelAccumRef.current += e.deltaY
      if (wheelAccumRef.current > WHEEL_THRESHOLD) {
        wheelAccumRef.current = 0
        goTo(activeSectionRef.current + 1)
      } else if (wheelAccumRef.current < -WHEEL_THRESHOLD) {
        wheelAccumRef.current = 0
        goTo(activeSectionRef.current - 1)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [goTo])

  useEffect(() => {
    let ty0 = 0
    const onTouchStart = (e) => { ty0 = e.touches[0].clientY }
    const onTouchEnd = (e) => {
      if (!canAdvanceRef.current) return
      const dy = ty0 - e.changedTouches[0].clientY
      if (Math.abs(dy) < 50) return
      goTo(activeSectionRef.current + (dy > 0 ? 1 : -1))
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [goTo])

  useEffect(() => {
    const onKey = (e) => {
      if (!canAdvanceRef.current) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(activeSectionRef.current + 1)
      if (e.key === 'ArrowUp' || e.key === 'PageUp') goTo(activeSectionRef.current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { overflow: hidden; height: 100%; background: #0d0d0d; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{ width: '100%', height: '100svh', position: 'relative', overflow: 'hidden', background: '#0d0d0d' }}>

        {/* Grid bg */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Accent glow */}
        <motion.div
          animate={{ background: `radial-gradient(ellipse, ${accent}22 0%, transparent 70%)` }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute', zIndex: 0, pointerEvents: 'none',
            bottom: '5%', left: '50%', transform: 'translateX(-50%)',
            width: '600px', height: '200px', filter: 'blur(30px)',
          }}
        />

        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [3, 3, 25], fov: 45 }}
          style={{ position: 'absolute', inset: 0 }}
          // Performance: limit pixel ratio on mobile
          dpr={isMobile ? [1, 1.5] : [1, 2]}
        >

          <Environment preset="city" />
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, 5, 5]} intensity={0.4} color={accent} />
          <Truck targetPose={currentSection.pose} />
        </Canvas>

        {/* Transition flash */}
        <AnimatePresence>
          {transitioning && (
            <motion.div
              key="flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none', background: accent }}
            />
          )}
        </AnimatePresence>

        {/* Section content — hidden on mobile when product panel takes over bottom */}
        {SECTIONS.map((section, i) => (
          <SectionContent key={section.id} section={section} visible={i === activeSection && !transitioning} />
        ))}

        {/* Right panels */}
        <RightPanel activeSection={activeSection} isMobile={isMobile} />

        {/* ── Navbar ── */}
        <nav
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: isMobile ? '12px 16px' : '24px 40px',
          }}
        >
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '1.3rem' : '1.6rem', color: '#f5f0e8', letterSpacing: '0.06em' }}>
            VETRI
            <motion.span animate={{ color: accent }} transition={{ duration: 0.5 }}>VEL</motion.span>
          </div>

          <div style={{ display: 'flex', gap: isMobile ? 16 : 32 }}>
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: isMobile ? '0.65rem' : '0.8rem',
                  letterSpacing: '0.18em', fontWeight: 600,
                  color: i === activeSection ? s.accent : 'rgba(245,240,232,0.45)',
                  transition: 'color 0.4s',
                  padding: '4px 0', position: 'relative',
                }}
              >
                {s.label}
                {i === activeSection && (
                  <motion.div
                    layoutId="nav-line"
                    style={{
                      position: 'absolute', bottom: -2, left: 0, right: 0,
                      height: '1.5px', background: s.accent, borderRadius: '1px',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* ── Nav dots (hidden on mobile to save space) ── */}
        {!isMobile && (
          <div style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', zIndex: 50, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                title={s.label}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <motion.div
                  animate={{
                    width: i === activeSection ? 10 : 6,
                    height: i === activeSection ? 10 : 6,
                    background: i === activeSection ? s.accent : 'rgba(255,255,255,0.3)',
                    boxShadow: i === activeSection ? `0 0 8px ${s.accent}` : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ borderRadius: '50%' }}
                />
              </button>
            ))}
          </div>
        )}

        {/* ── Progress bar ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, height: 2, background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            animate={{ width: `${((activeSection + 1) / SECTIONS.length) * 100}%`, background: accent }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '100%' }}
          />
        </div>

        {/* ── Hold indicator ── */}
        <HoldIndicator accent={accent} activeSection={activeSection} isMobile={isMobile} />

        {/* ── Ghost watermark (desktop only) ── */}
        {!isMobile && (
          <div
            style={{
              position: 'absolute', bottom: 32, left: 40, zIndex: 10,
              pointerEvents: 'none', userSelect: 'none',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '7rem', color: 'rgba(255,255,255,0.03)',
              letterSpacing: '0.05em', lineHeight: 1,
            }}
          >
            {currentSection?.label}
          </div>
        )}

        {/* ── Section counter ── */}
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? 12 : 32,
            right: isMobile ? 16 : 80,
            zIndex: 50,
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '0.75rem', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.3)',
          }}
        >
          <motion.span key={activeSection} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ color: accent }}>
            0{activeSection + 1}
          </motion.span>
          {' '}/ 0{SECTIONS.length}
        </div>

      </div>
    </>
  )
}

// ─── Hold indicator ──────────────────────────────────────────────────────────
function HoldIndicator({ accent, activeSection, isMobile }) {
  const [held, setHeld] = useState(false)

  useEffect(() => {
    setHeld(false)
    const t = setTimeout(() => setHeld(true), 900)
    return () => clearTimeout(t)
  }, [activeSection])

  return (
    <div
      style={{
        position: 'absolute',
        bottom: isMobile ? 20 : 40,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        fontFamily: "'Rajdhani', sans-serif",
        color: 'rgba(245,240,232,0.3)',
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <motion.circle
          cx="16" cy="16" r="12"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 12}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 12 }}
          animate={{ strokeDashoffset: held ? 0 : 2 * Math.PI * 12 }}
          transition={{ duration: 0.9, ease: 'linear' }}
          key={activeSection}
        />
      </svg>
      <motion.span animate={{ opacity: held ? 0.6 : 0.2 }} transition={{ duration: 0.3 }}>
        {held ? (activeSection < SECTIONS.length - 1 ? 'SCROLL' : 'END') : 'HOLD'}
      </motion.span>
    </div>
  )
}