'use client'
import { useState, useEffect, useRef } from "react";
function useInView(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, v];
}

export default function Fleet() {


  return (
    <section id="fleet" style={{  padding: "110px 5vw" }}>
      <div  style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24, transition: "all 0.7s" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 32, height: 1, }} />
              <span style={{ fontFamily: "'Nunito Sans',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em",textTransform: "uppercase" }}>Our Fleet</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(34px,5vw,64px)", fontWeight: 600, margin: 0, lineHeight: 1.0 }}>
              Any size,<br /><em style={{ fontStyle: "italic" }}>your timeline.</em>
            </h2>
          </div>
          <p style={{ fontFamily: "'Nunito Sans',sans-serif", fontWeight: 400, fontSize: 15, maxWidth: 320, lineHeight: 1.8, margin: 0 }}>
            We own and operate every truck — no brokers, no surprises. Every delivery is tracked and confirmed before dispatch.
          </p>
        </div>
        {/* Truck illustration */}
        <img
          src={'truck2.png'}
          className="w-full h-90 object-cover group-hover:scale-110 transition duration-500"
        />

      </div>
    </section>
  );
}