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
function Counter({ end, suffix = "", duration = 1800 }) {
  const [n, setN] = useState(0);
  const [ref, v] = useInView();
  useEffect(() => {
    if (!v) return;
    let cur = 0; const step = end / (duration / 16);
    const timer = setInterval(() => {
      cur += step;
      if (cur >= end) { setN(end); clearInterval(timer); } else setN(Math.floor(cur));
    }, 16);
    return () => clearInterval(timer);
  }, [v, end, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export default function Stats() {
    const C = {
  cream : "#F5F0E8",
  sand  : "#EDE5D8",
  card  : "#FFFFFF",
  clay  : "#C4714A",
  terr  : "#9B5235",
  stone : "#8C7B6E",
  ink   : "#1C1917",
  warm  : "#F0E6D3",
  muted : "#B5A89A",
};
  const [ref, v] = useInView();
  const items = [
    { val:500, sfx:"+", label:"Projects Delivered" },
    { val:50,  sfx:"T",  label:"Max Load per Trip" },
    { val:10,  sfx:"+", label:"Years in Chennai" },
    { val:98,  sfx:"%", label:"On-Time Delivery" },
  ];
  return (
    <section ref={ref} style={{ background:`linear-gradient(135deg,${C.clay} 0%,${C.terr} 100%)`, padding:"80px 5vw" }}>
      <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:44, textAlign:"center" }}>
        {items.map((s, i) => (
          <div key={s.label} style={{ opacity: v?1:0, transform: v?"translateY(0)":"translateY(28px)", transition:`all 0.6s ${i*110}ms` }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"clamp(46px,6vw,76px)", color:"#fff", lineHeight:1 }}>
              <Counter end={s.val} suffix={s.sfx} />
            </div>
            <div style={{ fontFamily:"'Nunito Sans',sans-serif", fontWeight:600, fontSize:13, color:"rgba(255,255,255,0.62)", marginTop:8, letterSpacing:"0.06em" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}