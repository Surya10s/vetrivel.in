'use client'
import { useState, useEffect, useRef } from "react";
import ReasonBlock from "./ReasonBlock";

function useInView(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setV(true);
      },
      { threshold: t }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, v];
}

export default function WhyUs() {
  const [ref, v] = useInView();

  const reasons = [
    { n: "01", title: "Same-Day Dispatch", body: "Order before noon, dispatched same day within Chennai city limits." },
    { n: "02", title: "Certified Weighing", body: "Every truck is weighed & documented. No short deliveries guaranteed." },
    { n: "03", title: "Direct Team Access", body: "Real people answer your calls — no bots, no queues." },
    { n: "04", title: "Ethically Sourced", body: "Materials from government-approved quarries with documentation." },
    { n: "05", title: "Transparent Pricing", body: "Fixed rates, no hidden charges. Volume discounts available." },
    { n: "06", title: "All Chennai Zones", body: "Our trucks cover every corner of Chennai." },
  ];

  return (
    <section
      id="story"
      className="py-28 px-6 bg-white"
    >
      <div ref={ref} className="max-w-6xl mx-auto">

        {/* header */}
        <div
          className={`
            mb-20 transition-all duration-700
            ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">
            Our Promise
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold text-black max-w-2xl leading-tight">
            A decade of trust,
            <br />
            one truckload at a time.
          </h2>
        </div>

        {/* grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <ReasonBlock
              key={r.n}
              {...r}
              delay={i * 80}
              inView={v}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
