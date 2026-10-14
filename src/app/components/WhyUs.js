'use client'
import { useState, useEffect, useRef } from "react"

const PHONE = "+910000000000" // TODO: replace with your real number
const WHATSAPP = "910000000000" // TODO: replace with your WhatsApp number, with country code

// Only keep claims that are true for your business.
const reasons = [
    {
        title: "Same-day dispatch",
        body: "Order before noon and your M-sand, P-sand or aggregates are dispatched the same day within Chennai city limits.",
    },
    {
        title: "Certified weighing",
        body: "Every truck is weighed and documented, so you get the full quantity you paid for.",
    },
    {
        title: "Direct access to our team",
        body: "Real people answer your calls. No bots and no queues.",
    },
    {
        title: "Responsibly sourced",
        body: "Materials come from government-approved quarries, with documentation available on request.",
    },
    {
        title: "Transparent pricing",
        body: "Fixed rates with no hidden charges. Volume discounts are available for larger orders.",
    },
    {
        title: "All Chennai zones covered",
        body: "Our own trucks deliver to every part of Chennai, from the city to OMR, Porur and beyond.",
    },
]

function useInView(threshold = 0.12) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    io.disconnect()
                }
            },
            { threshold }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [threshold])

    return [ref, visible]
}

export default function WhyUs() {
    const [ref, visible] = useInView()

    return (
        <section id="why-us" className="wu" aria-labelledby="wu-title" ref={ref}>
            <style>{`
                .wu {
                    background: #fafafa;
                    color: #111;
                    padding: clamp(48px, 8vw, 96px) 4vw;
                    display: flex;
                    justify-content: center;
                }
                .wu-inner {
                    width: 100%;
                    max-width: 1280px;
                    opacity: 0;
                    transform: translateY(32px);
                    transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
                }
                .wu-inner.in { opacity: 1; transform: none; }

                .wu-head {
                    display: grid;
                    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
                    gap: clamp(24px, 5vw, 72px);
                    align-items: end;
                    margin-bottom: clamp(32px, 5vw, 56px);
                }
                .wu-head h2 {
                    font-size: clamp(32px, 4.2vw, 56px);
                    line-height: 1.1;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    margin: 0;
                }
                .wu-head h2 span { color: #777; font-weight: 400; }
                .wu-head p {
                    font-size: 18px;
                    line-height: 1.7;
                    color: #444;
                    max-width: 56ch;
                    margin: 0;
                }

                .wu-grid {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 20px;
                }
                .wu-card {
                    background: #fff;
                    border: 1px solid #e6e6e6;
                    border-radius: 10px;
                    padding: 28px;
                    height: 100%;
                    box-sizing: border-box;
                }
                .wu-card h3 {
                    font-size: 20px;
                    font-weight: 700;
                    margin: 0 0 10px;
                }
                .wu-card p {
                    font-size: 16px;
                    line-height: 1.7;
                    color: #555;
                    margin: 0;
                }

                .wu-cta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    margin-top: clamp(32px, 5vw, 56px);
                }
                .wu-btn {
                    display: inline-block;
                    padding: 14px 26px;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    border: 1.5px solid #111;
                    transition: background .2s, color .2s;
                }
                .wu-btn:focus-visible { outline: 3px solid #888; outline-offset: 3px; }
                .wu-btn.primary { background: #111; color: #fff; }
                .wu-btn.primary:hover { background: #333; }
                .wu-btn.secondary { background: #fff; color: #111; }
                .wu-btn.secondary:hover { background: #f1f1f1; }

                @media (max-width: 1000px) {
                    .wu-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                }
                @media (max-width: 768px) {
                    .wu-head { grid-template-columns: 1fr; align-items: start; }
                }
                @media (max-width: 600px) {
                    .wu-grid { grid-template-columns: 1fr; }
                    .wu-card { padding: 22px; }
                    .wu-btn { flex: 1 1 100%; text-align: center; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .wu-inner { opacity: 1; transform: none; transition: none; }
                }
            `}</style>

            <div className={`wu-inner${visible ? " in" : ""}`}>
                <div className="wu-head">
                    <h2 id="wu-title">
                        Why Chennai builders choose us <span>for M-sand, P-sand &amp; aggregates</span>
                    </h2>
                    <p>
                        With over 26 years of building material supply in Chennai, we keep
                        the basics right: full quantity, fair price and on-time delivery,
                        one truckload at a time.
                    </p>
                </div>

                <ul className="wu-grid">
                    {reasons.map((r) => (
                        <li key={r.title}>
                            <article className="wu-card">
                                <h3>{r.title}</h3>
                                <p>{r.body}</p>
                            </article>
                        </li>
                    ))}
                </ul>

                <div className="wu-cta">
                    <a className="wu-btn primary" href={`tel:${PHONE}`}>
                        Call for a quote
                    </a>
                    <a
                        className="wu-btn secondary"
                        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                            "Hi, I need a quote for M-sand / P-sand supply in Chennai."
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Order on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    )
}