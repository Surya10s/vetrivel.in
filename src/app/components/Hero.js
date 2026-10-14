'use client'
import { useState, useEffect } from "react"

const PHONE = "+919500007779" // TODO: replace with your real number (no spaces)
const WHATSAPP = "919500007779" // TODO: replace with your WhatsApp number, with country code

export default function Hero() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 80)
        return () => clearTimeout(t)
    }, [])

    const rev = (d) => ({
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.9s ${d}s cubic-bezier(.16,1,.3,1), transform 0.9s ${d}s cubic-bezier(.16,1,.3,1)`,
    })

    const stats = [
        { value: "26+", label: "Years experience" },
        { value: "500+", label: "Projects supplied" },
        { value: "24h", label: "Fast delivery" },
    ]

    const products = ["M-Sand", "P-Sand", "Aggregates", "Gravel"]

    return (
        <section className="hero" aria-labelledby="hero-title">
            <style>{`
                .hero {
                    background: #fff;
                    color: #111;
                    padding: clamp(40px, 7vw, 88px) 4vw;
                    display: flex;
                    justify-content: center;
                }
                .hero-grid {
                    width: 100%;
                    max-width: 1280px;
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
                    gap: clamp(32px, 5vw, 72px);
                    align-items: center;
                }
                .hero-eyebrow {
                    font-size: 14px;
                    font-weight: 600;
                    color: #666;
                    letter-spacing: 0.02em;
                    margin: 0 0 16px;
                }
                .hero h1 {
                    font-size: clamp(34px, 4.6vw, 64px);
                    line-height: 1.08;
                    font-weight: 700;
                    margin: 0 0 20px;
                    letter-spacing: -0.02em;
                }
                .hero h1 span {
                    display: block;
                    color: #777;
                    font-weight: 400;
                    font-size: 0.62em;
                    margin-top: 10px;
                    letter-spacing: -0.01em;
                }
                .hero-desc {
                    font-size: 18px;
                    line-height: 1.7;
                    color: #444;
                    max-width: 56ch;
                    margin: 0 0 20px;
                }
                .hero-tags {
                    list-style: none;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    padding: 0;
                    margin: 0 0 28px;
                }
                .hero-tags li {
                    border: 1px solid #d8d8d8;
                    border-radius: 999px;
                    padding: 6px 14px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #222;
                }
                .hero-cta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    margin-bottom: 40px;
                }
                .hero-btn {
                    display: inline-block;
                    padding: 14px 26px;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    border: 1.5px solid #111;
                    transition: background .2s, color .2s;
                }
                .hero-btn:focus-visible { outline: 3px solid #888; outline-offset: 3px; }
                .hero-btn.primary { background: #111; color: #fff; }
                .hero-btn.primary:hover { background: #333; }
                .hero-btn.secondary { background: #fff; color: #111; }
                .hero-btn.secondary:hover { background: #f1f1f1; }
                .hero-stats {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px 48px;
                    margin: 0;
                    padding: 24px 0 0;
                    border-top: 1px solid #e5e5e5;
                }
                .hero-stats dt { font-size: 28px; font-weight: 700; line-height: 1.2; }
                .hero-stats dd { margin: 2px 0 0; color: #666; font-size: 15px; }
                .hero-stats div { display: flex; flex-direction: column-reverse; }

                .hero-media { display: grid; gap: 12px; }
                .hero-media figure { margin: 0; }
                .hero-media img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 8px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.08);
                    background: #f1f1f1;
                }
                .hero-main { aspect-ratio: 16 / 10; }
                .hero-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }
                .hero-row figure { aspect-ratio: 4 / 3; }

                @media (max-width: 900px) {
                    .hero-grid { grid-template-columns: 1fr; }
                    .hero-media { order: -1; }
                    .hero-row { display: none; }
                    .hero-main { aspect-ratio: 16 / 9; }
                }
                @media (max-width: 480px) {
                    .hero-btn { flex: 1 1 100%; text-align: center; }
                    .hero-desc { font-size: 16px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .hero * { transition: none !important; }
                }
            `}</style>

            <div className="hero-grid">
                {/* LEFT CONTENT */}
                <div>
                    <p className="hero-eyebrow" style={rev(0.1)}>
                        Chennai's trusted building material supplier
                    </p>

                    <h1 id="hero-title" style={rev(0.2)}>
                        M-Sand, P-Sand &amp; Building Material Supplier in Chennai 
                        <span>Aggregates delivered to your site</span>
                    </h1>

                    <p className="hero-desc" style={rev(0.3)}>
                        We supply high-quality M-sand (manufactured sand), P-sand
                        (plastering sand), gravel and aggregates across Chennai.
                        Every order is delivered by our own fleet of trucks, from 5 ton
                         onwards to wholesale upto 500 ton in single day, so your construction site gets consistent quality
                        and on-time building material supply, project after project.
                    </p>

                    <ul className="hero-tags" style={rev(0.35)} aria-label="Materials we supply">
                        {products.map((p) => (
                            <li key={p}>{p}</li>
                        ))}
                    </ul>

                    <div className="hero-cta" style={rev(0.4)}>
                        <a className="hero-btn primary" href={`tel:${PHONE}`}>
                            Call for a quote
                        </a>
                        <a
                            className="hero-btn secondary"
                            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                                "Hi, I need a quote for M-sand / P-sand supply in Chennai."
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Order on WhatsApp
                        </a>
                    </div>

                    <dl className="hero-stats" style={rev(0.5)}>
                        {stats.map((s) => (
                            <div key={s.label}>
                                <dt>{s.value}</dt>
                                <dd>{s.label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* RIGHT IMAGES */}
                <div className="hero-media" style={rev(0.3)}>
                    <figure className="hero-main">
                        <img
                            src="main2.png"
                            alt="M-sand, P-sand and aggregates stocked for building material supply in Chennai"
                            width="1280"
                            height="800"
                            fetchPriority="high"
                        />
                    </figure>

                    <div className="hero-row">
                        <figure>
                            <img
                                src="msand3.jpeg"
                                alt="Truck unloading M-sand at a construction site in Chennai"
                                width="640"
                                height="480"
                                loading="lazy"
                            />
                        </figure>
                        <figure>
                            <img
                                src="site1.jpeg"
                                alt="Sand and aggregate delivery at a Chennai building site"
                                width="640"
                                height="480"
                                loading="lazy"
                            />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    )
}