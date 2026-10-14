'use client'
import { useState, useEffect, useRef } from "react"

const PHONE = "+910000000000" // TODO: replace with your real number
const WHATSAPP = "910000000000" // TODO: replace with your WhatsApp number, with country code

// TODO: adjust these to match the trucks you actually run.
const loads = [
    { size: "5 tons", use: "Small jobs, repairs and single-room plastering" },
    { size: "10 to 20 tons", use: "House slabs, columns and mid-size builds" },
    { size: "From 20 tons onwards", use: "Apartments, commercial sites and large pours" },
]

const promises = [
    { title: "Our own trucks", text: "No brokers or sub-contractors. The driver you see is ours." },
    { title: "Confirmed before dispatch", text: "We confirm material, quantity and site address before the truck leaves." },
    { title: "Tracked delivery", text: "You know when your M-sand, P-sand or aggregates will reach the site." },
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

export default function Fleet() {
    const [ref, visible] = useInView()

    return (
        <section id="fleet" className="fl" aria-labelledby="fleet-title" ref={ref}>
            <style>{`
                .fl {
                    background: #fff;
                    color: #111;
                    padding: clamp(48px, 8vw, 96px) 4vw;
                    display: flex;
                    justify-content: center;
                }
                .fl-inner {
                    width: 100%;
                    max-width: 1280px;
                    opacity: 0;
                    transform: translateY(32px);
                    transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
                }
                .fl-inner.in { opacity: 1; transform: none; }

                .fl-head {
                    display: grid;
                    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
                    gap: clamp(24px, 5vw, 72px);
                    align-items: end;
                    margin-bottom: clamp(28px, 4vw, 48px);
                }
                .fl-head h2 {
                    font-size: clamp(32px, 4.2vw, 56px);
                    line-height: 1.1;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    margin: 0;
                }
                .fl-head h2 span { color: #777; font-weight: 400; }
                .fl-head p {
                    font-size: 18px;
                    line-height: 1.7;
                    color: #444;
                    max-width: 56ch;
                    margin: 0;
                }

                .fl-photo { margin: 0 0 clamp(28px, 4vw, 48px); }
                .fl-photo img {
                    display: block;
                    width: 100%;
                    aspect-ratio: 21 / 9;
                    object-fit: cover;
                    border-radius: 10px;
                    background: #f1f1f1;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.08);
                }

                .fl-cols {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: clamp(28px, 5vw, 72px);
                }
                .fl h3 {
                    font-size: 20px;
                    font-weight: 700;
                    margin: 0 0 16px;
                }
                .fl-list { list-style: none; margin: 0; padding: 0; }
                .fl-list li {
                    padding: 16px 0;
                    border-top: 1px solid #e6e6e6;
                }
                .fl-list li:last-child { border-bottom: 1px solid #e6e6e6; }
                .fl-list strong { display: block; font-size: 17px; margin-bottom: 4px; }
                .fl-list span { color: #555; font-size: 16px; line-height: 1.6; }

                .fl-cta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    margin-top: clamp(28px, 4vw, 48px);
                }
                .fl-btn {
                    display: inline-block;
                    padding: 14px 26px;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    border: 1.5px solid #111;
                    transition: background .2s, color .2s;
                }
                .fl-btn:focus-visible { outline: 3px solid #888; outline-offset: 3px; }
                .fl-btn.primary { background: #111; color: #fff; }
                .fl-btn.primary:hover { background: #333; }
                .fl-btn.secondary { background: #fff; color: #111; }
                .fl-btn.secondary:hover { background: #f1f1f1; }

                @media (max-width: 768px) {
                    .fl-head, .fl-cols { grid-template-columns: 1fr; align-items: start; }
                    .fl-photo img { aspect-ratio: 16 / 10; }
                }
                @media (max-width: 480px) {
                    .fl-btn { flex: 1 1 100%; text-align: center; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .fl-inner { opacity: 1; transform: none; transition: none; }
                }
            `}</style>

            <div className={`fl-inner${visible ? " in" : ""}`}>
                <div className="fl-head">
                    <h2 id="fleet-title">
                        Our own truck fleet <span>for M-sand, P-sand &amp; aggregate delivery in Chennai</span>
                    </h2>
                    <p>
                        We own and run every truck, so your building material supply
                        never depends on brokers.each delivery
                        is confirmed before dispatch and reaches your site on your timeline.
                    </p>
                </div>

                <figure className="fl-photo">
                    <img
                        src="fleet1.jpeg"
                        alt="Our fleet of trucks used to deliver M-sand, P-sand and aggregates across Chennai"
                        width="1280"
                        height="548"
                        loading="lazy"
                    />
                </figure>

                <div className="fl-cols">
                    <div>
                        <h3>Load sizes we deliver</h3>
                        <ul className="fl-list">
                            {loads.map((l) => (
                                <li key={l.size}>
                                    <strong>{l.size}</strong>
                                    <span>{l.use}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3>How we deliver</h3>
                        <ul className="fl-list">
                            {promises.map((p) => (
                                <li key={p.title}>
                                    <strong>{p.title}</strong>
                                    <span>{p.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="fl-cta">
                    <a className="fl-btn primary" href={`tel:${PHONE}`}>
                        Call to book a truck
                    </a>
                    <a
                        className="fl-btn secondary"
                        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                            "Hi, I want to book a truck load of M-sand / P-sand in Chennai."
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Book on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    )
}