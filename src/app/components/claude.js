'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo, useLayoutEffect, useState, useEffect } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

/* ─────────────────────────────────────────────
   FONTS  (inject once)
───────────────────────────────────────────── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #f5f0eb; }
    :root {
      --sand: #e8dfd0;
      --earth: #c4a882;
      --dark: #1a1612;
      --accent: #d4522a;
      --text-muted: #6b5e4e;
      --ff-head: 'Bebas Neue', sans-serif;
      --ff-body: 'DM Sans', sans-serif;
    }

    /* ── scrollbar ── */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #f5f0eb; }
    ::-webkit-scrollbar-thumb { background: var(--earth); border-radius: 2px; }

    /* ── nav ── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 48px;
      mix-blend-mode: multiply;
    }
    .nav-logo {
      font-family: var(--ff-head);
      font-size: 28px;
      letter-spacing: 3px;
      color: var(--dark);
    }
    .nav-links { display: flex; gap: 36px; }
    .nav-links a {
      font-family: var(--ff-body);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--dark);
      text-decoration: none;
      transition: color .2s;
    }
    .nav-links a:hover { color: var(--accent); }

    /* ── 3-D canvas wrapper ── */
    .canvas-bg {
      position: sticky; top: 0; width: 100%; height: 100vh;
      z-index: 1; background: #f5f0eb; margin-top: -100vh;
    }

    /* ── sections ── */
    .section-wrapper { position: relative; z-index: 10; }

    /* HERO */
    .hero {
      height: 100vh;
      display: flex; flex-direction: column; justify-content: flex-end;
      padding: 0 48px 80px;
    }
    .hero-eyebrow {
      font-family: var(--ff-body);
      font-size: 11px; font-weight: 500;
      letter-spacing: 3px; text-transform: uppercase;
      color: var(--accent); margin-bottom: 16px;
    }
    .hero-h1 {
      font-family: var(--ff-head);
      font-size: clamp(72px, 12vw, 160px);
      line-height: .92; letter-spacing: 2px;
      color: var(--dark);
    }
    .hero-h1 span { color: var(--accent); }
    .hero-sub {
      max-width: 420px;
      font-family: var(--ff-body);
      font-size: 15px; line-height: 1.7;
      color: var(--text-muted);
      margin-top: 24px; margin-bottom: 36px;
    }
    .hero-ctas { display: flex; gap: 16px; align-items: center; }
    .btn-primary {
      font-family: var(--ff-body); font-size: 13px; font-weight: 500;
      letter-spacing: 1.5px; text-transform: uppercase;
      background: var(--dark); color: #f5f0eb;
      border: none; padding: 16px 36px;
      cursor: pointer; transition: background .2s, transform .15s;
    }
    .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }
    .btn-ghost {
      font-family: var(--ff-body); font-size: 13px; font-weight: 500;
      letter-spacing: 1.5px; text-transform: uppercase;
      background: transparent; color: var(--dark);
      border: 1px solid var(--earth);
      padding: 16px 36px; cursor: pointer; transition: border-color .2s, color .2s;
    }
    .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

    /* STATS BAR */
    .stats-bar {
      display: flex; gap: 0;
      background: var(--dark);
      pointer-events: auto;
    }
    .stat-item {
      flex: 1; padding: 28px 40px;
      border-right: 1px solid #2e2720;
    }
    .stat-item:last-child { border-right: none; }
    .stat-num {
      font-family: var(--ff-head);
      font-size: 44px; letter-spacing: 1px;
      color: var(--earth);
    }
    .stat-label {
      font-family: var(--ff-body); font-size: 12px; font-weight: 500;
      letter-spacing: 2px; text-transform: uppercase;
      color: #7a6e64; margin-top: 4px;
    }

    /* PRODUCTS */
    .products {
      min-height: 100vh;
      padding: 120px 48px;
    }
    .section-tag {
      font-family: var(--ff-body); font-size: 11px; font-weight: 500;
      letter-spacing: 4px; text-transform: uppercase;
      color: var(--accent); margin-bottom: 20px;
    }
    .section-h2 {
      font-family: var(--ff-head);
      font-size: clamp(52px, 7vw, 100px);
      line-height: .92; letter-spacing: 1px;
      color: var(--dark); margin-bottom: 72px;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2px;
    }
    .prod-card {
      position: relative; overflow: hidden;
      background: var(--sand);
      cursor: pointer;
      transition: transform .3s ease;
    }
    .prod-card:hover { transform: translateY(-4px); }
    .prod-card:hover .prod-overlay { opacity: 1; }
    .prod-card:hover .prod-img { transform: scale(1.06); }
    .prod-img {
      width: 100%; height: 260px; object-fit: cover;
      display: block; transition: transform .5s ease;
    }
    .prod-body { padding: 20px 24px 24px; }
    .prod-title {
      font-family: var(--ff-head); font-size: 28px;
      letter-spacing: 1px; color: var(--dark);
    }
    .prod-desc {
      font-family: var(--ff-body); font-size: 13px;
      color: var(--text-muted); line-height: 1.6; margin-top: 6px;
    }
    .prod-overlay {
      position: absolute; inset: 0;
      background: rgba(212, 82, 42, .08);
      opacity: 0; transition: opacity .3s;
      pointer-events: none;
    }
    .prod-tag {
      display: inline-block;
      font-family: var(--ff-body); font-size: 10px; font-weight: 500;
      letter-spacing: 2px; text-transform: uppercase;
      background: var(--accent); color: #f5f0eb;
      padding: 4px 10px; margin-bottom: 10px;
    }

    /* WHY US */
    .why {
      background: var(--dark);
      padding: 120px 48px;
    }
    .why .section-tag { color: var(--earth); }
    .why .section-h2 { color: var(--sand); margin-bottom: 64px; }
    .why-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;
    }
    .why-item { border-top: 1px solid #2e2720; padding-top: 28px; }
    .why-num {
      font-family: var(--ff-head); font-size: 52px;
      color: var(--accent); line-height: 1;
    }
    .why-title {
      font-family: var(--ff-head); font-size: 22px;
      letter-spacing: 1px; color: var(--earth);
      margin: 10px 0 12px;
    }
    .why-text {
      font-family: var(--ff-body); font-size: 14px; line-height: 1.7;
      color: #7a6e64;
    }

    /* CONTACT */
    .contact {
      min-height: 100vh; padding: 120px 48px;
      display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
      align-items: center;
    }
    .contact-left {}
    .contact-tagline {
      font-family: var(--ff-head);
      font-size: clamp(48px, 6vw, 88px);
      line-height: .92; color: var(--dark);
      margin-bottom: 32px;
    }
    .contact-tagline span { color: var(--accent); }
    .contact-info { display: flex; flex-direction: column; gap: 20px; margin-top: 48px; }
    .contact-info-item {
      display: flex; align-items: flex-start; gap: 20px;
      border-top: 1px solid var(--earth);
      padding-top: 20px;
    }
    .info-label {
      font-family: var(--ff-body); font-size: 10px; font-weight: 500;
      letter-spacing: 2.5px; text-transform: uppercase;
      color: var(--earth); min-width: 80px; margin-top: 2px;
    }
    .info-val {
      font-family: var(--ff-body); font-size: 15px;
      color: var(--dark); line-height: 1.5;
    }

    /* form */
    .contact-form { display: flex; flex-direction: column; gap: 0; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 2px; }
    .form-group { display: flex; flex-direction: column; }
    .form-group label {
      font-family: var(--ff-body); font-size: 10px; font-weight: 500;
      letter-spacing: 2px; text-transform: uppercase;
      color: var(--text-muted);
      background: var(--sand); padding: 16px 20px 4px;
    }
    .form-group input,
    .form-group textarea,
    .form-group select {
      font-family: var(--ff-body); font-size: 15px; font-weight: 300;
      background: var(--sand); color: var(--dark);
      border: none; outline: none;
      padding: 4px 20px 16px;
      resize: none;
      transition: background .2s;
    }
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus { background: #ddd8cf; }
    .form-group select { cursor: pointer; }
    .form-wide { margin-bottom: 2px; }
    .form-wide label, .form-wide textarea { width: 100%; }
    .submit-btn {
      font-family: var(--ff-head); font-size: 20px;
      letter-spacing: 3px; text-transform: uppercase;
      background: var(--accent); color: #f5f0eb;
      border: none; padding: 22px;
      cursor: pointer; transition: background .2s, transform .15s;
    }
    .submit-btn:hover { background: var(--dark); transform: translateY(-1px); }

    /* FOOTER */
    .footer {
      background: var(--dark); color: var(--earth);
      padding: 32px 48px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .footer-logo {
      font-family: var(--ff-head); font-size: 22px;
      letter-spacing: 3px;
    }
    .footer-copy {
      font-family: var(--ff-body); font-size: 12px;
      color: #4a433c;
    }

    /* ── responsive ── */
    @media (max-width: 768px) {
      .nav { padding: 16px 24px; }
      .nav-links { display: none; }
      .hero { padding: 0 24px 60px; }
      .products { padding: 80px 24px; }
      .products-grid { grid-template-columns: 1fr; }
      .why { padding: 80px 24px; }
      .why-grid { grid-template-columns: 1fr; gap: 32px; }
      .contact { padding: 80px 24px; grid-template-columns: 1fr; }
      .footer { padding: 24px; flex-direction: column; gap: 12px; text-align: center; }
      .stats-bar { flex-direction: column; }
    }
  `}</style>
)

/* ─────────────────────────────────────────────
   TRUCK (your original logic, cleaned up)
───────────────────────────────────────────── */
function Claude() {
  const { scene } = useGLTF('/truck.glb')
  const truckRef = useRef()
  const wheelsRef = useRef([])
  const { scrollYProgress } = useScroll()

  const wireScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: '#c4a882',
          wireframe: true,
          transparent: true,
          opacity: 0.12,
        })
      }
    })
    return clone
  }, [scene])

  useLayoutEffect(() => {
    const wheels = []
    scene.traverse((child) => {
      if (child.isMesh && child.name.toLowerCase().includes('wheel')) wheels.push(child)
    })
    wheelsRef.current = wheels
  }, [scene])

  const targetX = useRef(-8)
  const lastX = useRef(-8)
  const facingRight = useRef(true)

  useFrame(() => {
    if (!truckRef.current) return
    const p = scrollYProgress.get()

    let x = -8
    if (p < 0.15)        x = -8
    else if (p < 0.4)    x = -8 + ((p - 0.15) / 0.25) * 22
    else if (p < 0.7)    x = 14
    else                 x = 14 - ((p - 0.7) / 0.3) * 22

    targetX.current = x

    truckRef.current.position.x = THREE.MathUtils.lerp(
      truckRef.current.position.x,
      targetX.current,
      0.07
    )

    const deltaX = truckRef.current.position.x - lastX.current
    lastX.current = truckRef.current.position.x

    // flip truck direction
    if (deltaX > 0.01 && !facingRight.current) {
      truckRef.current.rotation.y = 0
      facingRight.current = true
    } else if (deltaX < -0.01 && facingRight.current) {
      truckRef.current.rotation.y = Math.PI
      facingRight.current = false
    }

    wheelsRef.current.forEach((w) => { w.rotation.x -= deltaX / 1 })
  })

  return (
    <group ref={truckRef} scale={2} position={[-8, -4.2, 0]} rotation={[0, 0, 0]}>
      <primitive object={scene} />
      <primitive object={wireScene} />
    </group>
  )
}

/* ─────────────────────────────────────────────
   MAIN SCENE / PAGE
───────────────────────────────────────────── */
export default function Scene() {
  const products = [
    { title: 'M Sand',       desc: 'Double washed clean M-sand for concrete works',       img: '/msand.jpg',       tag: 'Concrete' },
    { title: 'White M Sand', desc: 'Quality equal to river sand. Double washed.',          img: '/white msand.jpg', tag: 'Premium' },
    { title: 'P Sand',       desc: 'Double washed. Perfect for plastering purpose',        img: '/psand.jpg',       tag: 'Plastering' },
    { title: '20 MM',        desc: 'Perfect sized gravel for all construction needs',      img: '/20mm.jpg',        tag: 'Gravel' },
    { title: 'Aggregates',   desc: '6mm, 12mm, 14mm and more sizes available',            img: '/aggregates.jpeg', tag: 'Multi-size' },
    { title: 'Stone Dust',   desc: 'High quality stone dust for sub-base applications',   img: '/dust.jpg',        tag: 'Dust' },
  ]

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <FontStyle />

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-logo">SHREE SANDS</div>
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#products">Products</a>
          <a href="#why">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* ── 3D CANVAS — always sticky behind content ── */}
      <div style={{ height: '400vh' }}>

        {/* The sticky 3-D layer */}
        <div className="canvas-bg">
          <Canvas camera={{ position: [3, 3, 25], fov: 45 }}>
            <Environment preset="city" />
            <ambientLight intensity={0.6} />
            <spotLight position={[10, 10, 10]} intensity={0.8} />
            <Claude />
            <OrbitControls enableZoom={false} enableRotate={false} />
          </Canvas>
        </div>

        {/* ── SECTION CONTENT layered on top ── */}
        <div className="section-wrapper">

          {/* ── HERO ── */}
          <section id="hero" className="hero" style={{ marginTop: '-400vh' }}>
            <div className="hero-eyebrow">Chennai's trusted supplier since 2003</div>
            <h1 className="hero-h1">
              BUILT ON<br />
              QUALITY<br />
              <span>SAND.</span>
            </h1>
            <p className="hero-sub">
              Reliable supply across Chennai with our own fleet of trucks.
              From 5 tons to 50 tons — on-time delivery for every project.
            </p>
            <div className="hero-ctas">
              <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                Get a Quote
              </button>
              <button className="btn-ghost" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
                Our Products
              </button>
            </div>
          </section>

          {/* ── STATS BAR ── */}
          <div className="stats-bar">
            {[
              { num: '20+',  label: 'Years in Business' },
              { num: '500+', label: 'Projects Delivered' },
              { num: '50T',  label: 'Max Load Per Trip' },
              { num: '24H',  label: 'Delivery Turnaround' },
            ].map((s) => (
              <div className="stat-item" key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── PRODUCTS ── */}
          <section id="products" className="products" style={{ background: 'rgba(245,240,235,0.94)', backdropFilter: 'blur(2px)' }}>
            <div className="section-tag">What We Supply</div>
            <h2 className="section-h2">OUR<br />PRODUCTS</h2>
            <div className="products-grid">
              {products.map((p) => (
                <div className="prod-card" key={p.title}>
                  <img src={p.img} alt={p.title} className="prod-img" />
                  <div className="prod-overlay" />
                  <div className="prod-body">
                    <div className="prod-tag">{p.tag}</div>
                    <div className="prod-title">{p.title}</div>
                    <p className="prod-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── WHY US ── */}
          <section id="why" className="why">
            <div className="section-tag">Why Choose Us</div>
            <h2 className="section-h2">STRENGTH<br />YOU CAN<br />TRUST.</h2>
            <div className="why-grid">
              {[
                { n: '01', t: 'Own Fleet',       d: 'We operate our own trucks — no brokers, no delays. Direct delivery from quarry to your site.' },
                { n: '02', t: 'Double Washed',   d: 'Every batch is double washed for purity. Zero silt contamination, consistent grain size.' },
                { n: '03', t: 'Transparent Pricing', d: 'Fixed rates per ton with no hidden fees. You know the price before we load the truck.' },
                { n: '04', t: 'On-Time Delivery', d: 'We commit to a delivery window and we stick to it. Your project timeline matters to us.' },
                { n: '05', t: 'Quality Tested',   d: 'All materials meet IS standards. Certificates available on request for any batch.' },
                { n: '06', t: 'Any Volume',        d: 'From 5-ton trial orders to 500-ton project supplies — we scale to your requirement.' },
              ].map((w) => (
                <div className="why-item" key={w.n}>
                  <div className="why-num">{w.n}</div>
                  <div className="why-title">{w.t}</div>
                  <p className="why-text">{w.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section id="contact" className="contact" style={{ background: 'rgba(245,240,235,0.96)', backdropFilter: 'blur(2px)' }}>
            <div className="contact-left">
              <div className="section-tag">Get in Touch</div>
              <h2 className="contact-tagline">
                LET'S<br />BUILD<br />
                <span>TOGETHER.</span>
              </h2>
              <p style={{ fontFamily: 'var(--ff-body)', fontSize: '15px', lineHeight: '1.7', color: 'var(--text-muted)', maxWidth: '380px' }}>
                Tell us your requirement and we'll get back within 2 hours
                with availability, pricing and a delivery schedule.
              </p>
              <div className="contact-info">
                {[
                  { label: 'Phone',    val: '+91 98765 43210' },
                  { label: 'Email',    val: 'orders@shreesands.in' },
                  { label: 'Location', val: 'Serving all areas across Chennai & suburbs' },
                  { label: 'Hours',    val: 'Mon – Sat  6 AM – 8 PM' },
                ].map((i) => (
                  <div className="contact-info-item" key={i.label}>
                    <div className="info-label">{i.label}</div>
                    <div className="info-val">{i.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Ravi Kumar" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" required />
                </div>
              </div>
              <div className="form-row" style={{ marginBottom: '2px' }}>
                <div className="form-group">
                  <label>Material</label>
                  <select required>
                    <option value="">Select product…</option>
                    <option>M Sand</option>
                    <option>White M Sand</option>
                    <option>P Sand</option>
                    <option>20 MM Gravel</option>
                    <option>Aggregates</option>
                    <option>Stone Dust</option>
                    <option>Multiple / Not sure</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantity (tons)</label>
                  <input type="number" placeholder="e.g. 20" min="1" required />
                </div>
              </div>
              <div className="form-group form-wide" style={{ marginBottom: '2px' }}>
                <label>Delivery Address</label>
                <input type="text" placeholder="Street, Area, Chennai…" required />
              </div>
              <div className="form-group form-wide" style={{ marginBottom: '2px' }}>
                <label>Message (optional)</label>
                <textarea rows={4} placeholder="Any special requirements, preferred delivery date…" />
              </div>
              <button type="submit" className="submit-btn">
                {submitted ? '✓ Request Sent!' : 'Send Quote Request →'}
              </button>
            </form>
          </section>

          {/* ── FOOTER ── */}
          <footer className="footer">
            <div className="footer-logo">SHREE SANDS</div>
            <div className="footer-copy">© 2024 Shree Sands Chennai. All rights reserved.</div>
            <div style={{ fontFamily: 'var(--ff-body)', fontSize: '12px', color: '#4a433c' }}>
              Quality aggregates delivered across Chennai
            </div>
          </footer>

        </div>{/* /section-wrapper */}
      </div>{/* /400vh scroll container */}
    </>
  )
}