'use client'
import { useState, useEffect, useRef } from "react"

const LINKS = [
  { label: "About", id: "about" },
  { label: "Materials", id: "materials" },
  { label: "Fleet", id: "fleet" },
  { label: "Why us", id: "why-us" },
  { label: "Gallery", id: "gallery" },
  { label: "Reviews", id: "feedback" },
  { label: "Contact", id: "contact" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const progressRef = useRef(null)

  // Scrolled state + page progress line
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Highlight the link for the section currently in view
  useEffect(() => {
    const els = LINKS.map(l => document.getElementById(l.id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Lock scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    const onKey = e => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        html { scroll-padding-top: 72px; scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

        .vnav {
          --ink: #fff;
          --ink-dim: rgba(255,255,255,0.58);
          --line: rgba(255,255,255,0.12);
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 72px;
          padding: 0 clamp(20px, 5vw, 64px);
          display: flex; align-items: center; justify-content: space-between; gap: 32px;
          transition: height .35s cubic-bezier(.22,1,.36,1), background .35s, border-color .35s, backdrop-filter .35s;
          background: linear-gradient(to bottom, rgba(0,0,0,.75), rgba(0,0,0,0));
          border-bottom: 1px solid transparent;
        }
        .vnav.is-scrolled {
          height: 60px;
          background: rgba(0,0,0,.82);
          backdrop-filter: blur(16px) saturate(140%);
          -webkit-backdrop-filter: blur(16px) saturate(140%);
          border-bottom-color: var(--line);
        }
        .vnav.is-open { background: transparent; border-bottom-color: transparent; backdrop-filter: none; -webkit-backdrop-filter: none; }

        .vnav a, .vnav button { -webkit-tap-highlight-color: transparent; }
        .vnav :focus-visible, .vmenu :focus-visible {
          outline: 2px solid #fff; outline-offset: 4px; border-radius: 2px;
        }

        /* Brand */
        .vbrand { display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0; }
        .logo-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.2);
  transition: width .35s, height .35s;
}
.logo-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.is-scrolled .logo-wrap {
  width: 44px;
  height: 44px;
}
        /* Desktop links */
        .vlinks { display: flex; align-items: center; gap: clamp(20px, 3vw, 40px); margin: 0 0 0 auto; padding: 0; list-style: none; }
        .vlink {
          font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 15px;
          color: var(--ink-dim); text-decoration: none; position: relative;
          padding: 8px 0; transition: color .2s;
        }
        .vlink::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: 2px; height: 2px;
          background: var(--ink); transform: scaleX(0); transform-origin: left;
          transition: transform .35s cubic-bezier(.22,1,.36,1);
        }
        .vlink:hover { color: var(--ink); }
        .vlink:hover::after, .vlink[aria-current="true"]::after { transform: scaleX(1); }
        .vlink[aria-current="true"] { color: var(--ink); }

        /* Quote button */
        .vcta {
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
          color: #000; background: #fff; text-decoration: none;
          padding: 11px 22px; border-radius: 999px; border: 1px solid #fff;
          transition: background .2s, color .2s, transform .2s; white-space: nowrap;
        }
        .vcta:hover { background: transparent; color: #fff; }
        .vcta:active { transform: scale(.97); }

        /* Hamburger */
        .vham {
          display: none; width: 44px; height: 44px; margin-right: -10px;
          background: none; border: none; cursor: pointer; position: relative; z-index: 202;
        }
        .vham i {
          position: absolute; left: 11px; right: 11px; height: 2px; background: #fff; border-radius: 2px;
          transition: transform .4s cubic-bezier(.22,1,.36,1), top .4s cubic-bezier(.22,1,.36,1);
        }
        .vham i:nth-child(1) { top: 16px; }
        .vham i:nth-child(2) { top: 26px; }
        .vham[aria-expanded="true"] i:nth-child(1) { top: 21px; transform: rotate(45deg); }
        .vham[aria-expanded="true"] i:nth-child(2) { top: 21px; transform: rotate(-45deg); }

        /* Mobile menu */
        .vmenu {
          position: fixed; inset: 0; z-index: 198; background: #000;
          display: flex; flex-direction: column; justify-content: center;
          padding: 96px clamp(24px, 8vw, 64px) 40px;
          opacity: 0; visibility: hidden; pointer-events: none;
          transition: opacity .4s cubic-bezier(.22,1,.36,1), visibility 0s .4s;
        }
        .vmenu.is-open { opacity: 1; visibility: visible; pointer-events: auto; transition: opacity .4s cubic-bezier(.22,1,.36,1), visibility 0s; }
        .vmenu-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 56px 56px;
          -webkit-mask-image: radial-gradient(ellipse at 30% 40%, #000 20%, transparent 75%);
                  mask-image: radial-gradient(ellipse at 30% 40%, #000 20%, transparent 75%);
        }
        .vmenu ul { position: relative; list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
        .vmenu li {
          border-bottom: 1px solid var(--line, rgba(255,255,255,.12));
          opacity: 0; transform: translateY(14px);
          transition: opacity .5s, transform .5s cubic-bezier(.22,1,.36,1);
        }
        .vmenu.is-open li { opacity: 1; transform: none; }
        .vmlink {
          display: flex; align-items: center; justify-content: space-between;
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: clamp(30px, 8.5vw, 48px); letter-spacing: -0.02em; line-height: 1;
          color: rgba(255,255,255,.55); text-decoration: none; padding: 20px 0;
          transition: color .2s, padding-left .3s cubic-bezier(.22,1,.36,1);
        }
        .vmlink:hover, .vmlink[aria-current="true"] { color: #fff; padding-left: 8px; }
        .vmlink .dot { width: 8px; height: 8px; border-radius: 50%; background: #fff; opacity: 0; transition: opacity .2s; }
        .vmlink[aria-current="true"] .dot { opacity: 1; }

        .vmenu-foot {
          position: relative; margin-top: 36px;
          opacity: 0; transition: opacity .5s .45s;
        }
        .vmenu.is-open .vmenu-foot { opacity: 1; }
        .vmenu-foot .vcta { display: inline-block; font-size: 15px; padding: 15px 32px; }

        .vmark {
          position: absolute; right: -2vw; bottom: -2vw; pointer-events: none; user-select: none;
          font-family: 'Syne', sans-serif; font-weight: 800; letter-spacing: -0.05em; line-height: .8;
          font-size: clamp(110px, 32vw, 260px); color: rgba(255,255,255,.035);
        }

        /* Progress line */
        .vprog {
          position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: #fff;
          transform: scaleX(0); transform-origin: left; opacity: 0; transition: opacity .3s;
        }
        .is-scrolled .vprog { opacity: .9; }

        @media (max-width: 860px) {
          .vlinks, .vnav .vcta { display: none; }
          .vham { display: block; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vnav, .vmenu, .vmenu li, .vmlink, .vham i, .vlink::after { transition-duration: .01ms !important; }
        }
      `}</style>

      <nav className={`vnav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`} aria-label="Primary">
        <a
          href="#"
          className="vbrand"
          aria-label="Vetrivel home"
          onClick={() => setOpen(false)}
        >
          <div className="logo-wrap">
            <img src="/logo8.jpg" alt="" />
          </div>
          <span style={{color:"white"}}>Vetrivel</span>
        </a>

        <ul className="vlinks">
          {LINKS.map(l => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="vlink"
                aria-current={active === l.id ? "true" : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="vcta">Get a quote</a>

        <button
          className="vham"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <i /><i />
        </button>

        <div className="vprog" ref={progressRef} aria-hidden="true" />
      </nav>

      <div id="mobile-menu" className={`vmenu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="vmenu-grid" />
        <ul>
          {LINKS.map((l, i) => (
            <li key={l.id} style={{ transitionDelay: open ? `${0.1 + i * 0.06}s` : "0s" }}>
              <a
                href={`#${l.id}`}
                className="vmlink"
                aria-current={active === l.id ? "true" : undefined}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                {l.label}
                <span className="dot" />
              </a>
            </li>
          ))}
        </ul>
        <div className="vmenu-foot">
          <a href="#contact" className="vcta" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Get a quote
          </a>
        </div>
        <div className="vmark" aria-hidden="true">Build</div>
      </div>
    </>
  )
}