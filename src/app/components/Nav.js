'use client'
import { useState, useEffect } from "react"

export default function Nav() {
  const C = {
    bg      : "#000000",
    white   : "#FFFFFF",
    offwhite: "#F0F0F0",
    muted   : "rgba(255,255,255,0.42)",
    border  : "rgba(255,255,255,0.10)",
    hover   : "rgba(255,255,255,0.06)",
  };

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = ["About", "Services", "Fleet", "Story", "Contact"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.52);
          text-decoration: none;
          position: relative;
          padding: 4px 0;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: #fff;
          transition: width 0.3s cubic-bezier(.22,1,.36,1);
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }

        .quote-btn {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #000;
          background: #fff;
          padding: 10px 26px;
          border-radius: 2px;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          border: 1px solid #fff;
        }
        .quote-btn:hover {
          background: transparent;
          color: #fff;
          box-shadow: inset 0 0 0 1px #fff;
        }

        .ham-line {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #fff;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), opacity 0.2s;
          transform-origin: center;
        }

        .mobile-link {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: clamp(32px, 8vw, 52px);
          color: rgba(255,255,255,0.15);
          text-decoration: none;
          letter-spacing: -0.02em;
          transition: color 0.2s;
          line-height: 1.1;
        }
        .mobile-link:hover { color: #fff; }

        .mobile-index {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.1em;
          margin-right: 14px;
          margin-top: 6px;
          align-self: flex-start;
        }

        @media(max-width:768px){ .dnav{ display:none!important } .ham{ display:flex!important } }
      `}</style>

      <nav style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 200,
        height: 64,
        padding: "0 5vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background:  "rgba(0,0,0,0.92)",
          
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        transition: "background 0.5s, border-color 0.5s, backdrop-filter 0.5s",
      }}>

        {/* ── Logo ── */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            border: "1.5px solid rgba(255,255,255,0.7)",
            borderRadius: 2,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: 15, color: "#fff",
              lineHeight: 1,
            }}>v</span>
          </div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: 17,
            color: "#fff", letterSpacing: "-0.02em",
          }}>vetrivel</span>
        </a>

        {/* ── Desktop Links ── */}
        {/* <div className="dnav" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
          <div style={{ width: 1, height: 18, background: C.border, marginLeft: 4 }} />
          <a href="#contact" className="quote-btn">Get a Quote</a>
        </div> */}

        {/* ── Hamburger ── */}
        <button
          className="ham"
          onClick={() => setOpen(o => !o)}
          style={{
            display: "none",
            flexDirection: "column", gap: 5,
            background: "none", border: "none",
            cursor: "pointer", padding: 6, zIndex: 202,
          }}
          aria-label="Toggle menu"
        >
          <span className="ham-line" style={open ? { transform: "translateY(6.5px) rotate(45deg)" } : {}} />
          <span className="ham-line" style={open ? { opacity: 0, transform: "scaleX(0)" } : {}} />
          <span className="ham-line" style={open ? { transform: "translateY(-6.5px) rotate(-45deg)" } : {}} />
        </button>
      </nav>

      {/* ── Mobile Fullscreen Menu ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 198,
        background: "#000",
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: "0 8vw",
        pointerEvents: open ? "all" : "none",
        opacity: open ? 1 : 0,
        transition: "opacity 0.4s cubic-bezier(.22,1,.36,1)",
      }}>
        {/* Grid lines decoration */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, fontWeight: 600,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            display: "block", marginBottom: 40,
          }}>Navigation</span>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {links.map((l, i) => (
              <div key={l} style={{
                display: "flex", alignItems: "baseline",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.5s ${0.1 + i * 0.07}s, transform 0.5s ${0.1 + i * 0.07}s cubic-bezier(.22,1,.36,1)`,
              }}>
                <span className="mobile-index">0{i + 1}</span>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="mobile-link"
                  onClick={() => setOpen(false)}
                >{l}</a>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 52,
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.5s 0.5s, transform 0.5s 0.5s`,
          }}>
            <a href="#contact" onClick={() => setOpen(false)} style={{
              display: "inline-block",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, fontSize: 12,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#000", background: "#fff",
              padding: "13px 32px", borderRadius: 2,
              textDecoration: "none",
            }}>Get a Quote →</a>
          </div>

          <div style={{
            position: "absolute", bottom: "-30vh", right: 0,
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(80px, 20vw, 140px)",
            fontWeight: 800, color: "rgba(255,255,255,0.03)",
            lineHeight: 1, letterSpacing: "-0.04em",
            userSelect: "none", pointerEvents: "none",
          }}>BUILD</div>
        </div>
      </div>
    </>
  );
}