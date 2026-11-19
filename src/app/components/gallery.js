'use client'
import { useState, useEffect, useRef, useCallback } from "react"

const PHONE_DISPLAY = "9500 007 779"
const PHONE_TEL = "+919500007779"
const WHATSAPP = "919500007779"

// TODO: add more photos here. Put the files in your /public folder.
// category must be one of: "Materials", "Deliveries", "Sites", "Fleet"
const photos = [
    {
        src: "msand1.webp",
        category: "Materials",
        alt: "M-sand, P-sand and aggregates stocked for building material supply in Chennai",
        caption: "M-sand, P-sand and aggregates ready for dispatch",
    },
    {
        src: "msand2.webp",
        category: "Materials",
        alt: "M-sand, P-sand and aggregates stocked for building material supply in Chennai",
        caption: "M-sand, P-sand and aggregates ready for dispatch",
    },
    {
        src: "msand.jpg",
        category: "Materials",
        alt: "M-sand, P-sand and aggregates stocked for building material supply in Chennai",
        caption: "M-sand, P-sand and aggregates ready for dispatch",
    },
    {
        src: "aggregates.jpeg",
        category: "Materials",
        alt: "M-sand, P-sand and aggregates stocked for building material supply in Chennai",
        caption: "M-sand, P-sand and aggregates ready for dispatch",
    },
    {
        src: "main2.png",
        category: "Fleet",
        alt: "M-sand, P-sand and aggregates stocked for building material supply in Chennai",
        caption: "M-sand, P-sand and aggregates ready for dispatch",
    },
    {
        src: "crusher.jpeg",
        category: "Materials",
        alt: "M-sand, P-sand and aggregates stocked for building material supply in Chennai",
        caption: "M-sand, P-sand and aggregates ready for dispatch",
    },
    {
        src: "unloading.jpeg",
        category: "Deliveries",
        alt: "Truck unloading M-sand at a construction site in Chennai",
        caption: "Unloading M-sand at a Chennai site",
    },
    {
        src: "unloading2.jpeg",
        category: "Deliveries",
        alt: "Truck unloading M-sand at a construction site in Chennai",
        caption: "Unloading M-sand at a Chennai site",
    },
    {
        src: "site1.jpeg",
        category: "Sites",
        alt: "Sand and aggregate delivery at a Chennai building site",
        caption: "Material delivered to a building site",
    },
    {
        src: "fleet1.jpeg",
        category: "Fleet",
        alt: "Our own fleet of trucks used to deliver M-sand, P-sand and aggregates across Chennai",
        caption: "Our own fleet of trucks",
    },
    {
        src: "msand2.webp",
        category: "Materials",
        alt: "Close view of M-sand, manufactured sand for construction in Chennai",
        caption: "M-sand (manufactured sand)",
    },
    {
        src: "msand3.jpeg",
        category: "Fleet",
        alt: "M-sand, P-sand and aggregates stocked for building material supply in Chennai",
        caption: "M-sand, P-sand and aggregates ready for dispatch",
    },
    {
        src: "lorry3.jpeg",
        category: "Fleet",
        alt: "M-sand, P-sand and aggregates stocked for building material supply in Chennai",
        caption: "M-sand, P-sand and aggregates ready for dispatch",
    },
    {
        src: "lorry4.jpeg",
        category: "Fleet",
        alt: "M-sand, P-sand and aggregates stocked for building material supply in Chennai",
        caption: "M-sand, P-sand and aggregates ready for dispatch",
    },
    {
        src: "lorry2.jpeg",
        category: "Fleet",
        alt: "M-sand, P-sand and aggregates stocked for building material supply in Chennai",
        caption: "M-sand, P-sand and aggregates ready for dispatch",
    },
]

const categories = ["All", "Materials", "Deliveries", "Sites", "Fleet"]

export default function Gallery() {
    const [filter, setFilter] = useState("All")
    const [open, setOpen] = useState(null) // index within the filtered list, or null
    const lastFocus = useRef(null)
    const closeBtn = useRef(null)

    const visible = filter === "All" ? photos : photos.filter((p) => p.category === filter)

    const close = useCallback(() => {
        setOpen(null)
        if (lastFocus.current) lastFocus.current.focus()
    }, [])

    const step = useCallback(
        (dir) => setOpen((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
        [visible.length]
    )

    useEffect(() => {
        if (open === null) return
        const onKey = (e) => {
            if (e.key === "Escape") close()
            if (e.key === "ArrowRight") step(1)
            if (e.key === "ArrowLeft") step(-1)
        }
        document.addEventListener("keydown", onKey)
        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"
        closeBtn.current?.focus()
        return () => {
            document.removeEventListener("keydown", onKey)
            document.body.style.overflow = prev
        }
    }, [open, close, step])

    const current = open !== null ? visible[open] : null

    return (
        <section id="gallery" className="gl" aria-labelledby="gallery-title">
            <style>{`
                .gl {
                    background: #fff;
                    color: #111;
                    padding: clamp(48px, 8vw, 96px) 4vw;
                    display: flex;
                    justify-content: center;
                }
                .gl-inner { width: 100%; max-width: 1280px; }

                .gl-head {
                    display: grid;
                    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
                    gap: clamp(24px, 5vw, 72px);
                    align-items: end;
                    margin-bottom: 32px;
                }
                .gl-head h1 {
                    font-size: clamp(32px, 4.2vw, 56px);
                    line-height: 1.1;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    margin: 0;
                }
                .gl-head h1 span { color: #777; font-weight: 400; }
                .gl-head p {
                    font-size: 18px;
                    line-height: 1.7;
                    color: #444;
                    max-width: 56ch;
                    margin: 0;
                }

                .gl-filters {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 28px;
                }
                .gl-filter {
                    font: inherit;
                    font-size: 15px;
                    font-weight: 600;
                    padding: 8px 18px;
                    border-radius: 999px;
                    border: 1px solid #d8d8d8;
                    background: #fff;
                    color: #222;
                    cursor: pointer;
                    transition: background .2s, color .2s, border-color .2s;
                }
                .gl-filter:hover { border-color: #111; }
                .gl-filter[aria-pressed="true"] { background: #111; color: #fff; border-color: #111; }
                .gl-filter:focus-visible { outline: 3px solid #888; outline-offset: 3px; }

                .gl-grid {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 16px;
                }
                .gl-tile {
                    all: unset;
                    display: block;
                    width: 100%;
                    cursor: zoom-in;
                    border-radius: 10px;
                    overflow: hidden;
                    position: relative;
                    aspect-ratio: 4 / 3;
                    background: #f1f1f1;
                }
                .gl-tile:focus-visible { outline: 3px solid #888; outline-offset: 3px; }
                .gl-tile img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform .5s cubic-bezier(.16,1,.3,1);
                }
                .gl-tile:hover img { transform: scale(1.04); }
                .gl-cap {
                    position: absolute;
                    left: 0; right: 0; bottom: 0;
                    padding: 28px 16px 14px;
                    font-size: 15px;
                    font-weight: 600;
                    color: #fff;
                    background: linear-gradient(to top, rgba(0,0,0,.6), transparent);
                }
                .gl-empty { color: #666; font-size: 16px; }

                .gl-footer {
                    margin-top: clamp(36px, 5vw, 64px);
                    padding-top: 32px;
                    border-top: 1px solid #e6e6e6;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px 40px;
                    align-items: center;
                    justify-content: space-between;
                }
                .gl-footer p { margin: 0; font-size: 18px; color: #444; max-width: 48ch; line-height: 1.6; }
                .gl-cta { display: flex; flex-wrap: wrap; gap: 12px; }
                .gl-btn {
                    display: inline-block;
                    padding: 14px 26px;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    border: 1.5px solid #111;
                    transition: background .2s, color .2s;
                }
                .gl-btn:focus-visible { outline: 3px solid #888; outline-offset: 3px; }
                .gl-btn.primary { background: #111; color: #fff; }
                .gl-btn.primary:hover { background: #333; }
                .gl-btn.secondary { background: #fff; color: #111; }
                .gl-btn.secondary:hover { background: #f1f1f1; }

                /* lightbox */
                .gl-lb {
                    position: fixed;
                    inset: 0;
                    z-index: 1000;
                    background: rgba(0,0,0,.92);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 56px 16px 24px;
                }
                .gl-lb figure { margin: 0; max-width: min(1100px, 100%); max-height: 100%; display: flex; flex-direction: column; align-items: center; }
                .gl-lb img { max-width: 100%; max-height: 74vh; object-fit: contain; border-radius: 6px; }
                .gl-lb figcaption { color: #eee; font-size: 16px; margin-top: 14px; text-align: center; }
                .gl-lb-count { color: #aaa; font-size: 14px; margin-top: 4px; }
                .gl-lb button {
                    all: unset;
                    cursor: pointer;
                    color: #fff;
                    background: rgba(255,255,255,.14);
                    border-radius: 999px;
                    width: 44px; height: 44px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 22px;
                    transition: background .2s;
                }
                .gl-lb button:hover { background: rgba(255,255,255,.28); }
                .gl-lb button:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
                .gl-lb .x { position: absolute; top: 12px; right: 12px; }
                .gl-lb .prev, .gl-lb .next { position: absolute; top: 50%; transform: translateY(-50%); }
                .gl-lb .prev { left: 12px; }
                .gl-lb .next { right: 12px; }

                @media (max-width: 1000px) { .gl-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
                @media (max-width: 768px) { .gl-head { grid-template-columns: 1fr; align-items: start; } }
                @media (max-width: 560px) {
                    .gl-grid { grid-template-columns: 1fr; }
                    .gl-btn { flex: 1 1 100%; text-align: center; }
                    .gl-lb .prev, .gl-lb .next { top: auto; bottom: 12px; transform: none; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .gl-tile img { transition: none; }
                    .gl-tile:hover img { transform: none; }
                }
            `}</style>

            <div className="gl-inner" >
                <div className="gl-head">
                    <h1 id="gallery-title">
                        Gallery <span>M-sand, P-sand &amp; aggregate supply across Chennai</span>
                    </h1>
                    <p>
                        See our materials, our own trucks and real deliveries to building
                        sites around Chennai. Quality you can check before you order.
                    </p>
                </div>

                <div className="gl-filters" role="group" aria-label="Filter photos by category">
                    {categories.map((c) => (
                        <button
                            key={c}
                            type="button"
                            className="gl-filter"
                            aria-pressed={filter === c}
                            onClick={() => setFilter(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {visible.length === 0 ? (
                    <p className="gl-empty">No photos in this category yet.</p>
                ) : (
                    <ul className="gl-grid">
                        {visible.map((p, i) => (
                            <li key={p.src}>
                                <button
                                    type="button"
                                    className="gl-tile"
                                    aria-label={`Open photo: ${p.caption}`}
                                    onClick={(e) => {
                                        lastFocus.current = e.currentTarget
                                        setOpen(i)
                                    }}
                                >
                                    <img src={p.src} alt={p.alt} loading="lazy" width="640" height="480" />
                                    <span className="gl-cap">{p.caption}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="gl-footer">
                    <p>Need M-sand, P-sand or aggregates delivered to your site? Call {PHONE_DISPLAY} for price details.</p>
                    <div className="gl-cta">
                        <a className="gl-btn primary" href={`tel:${PHONE_TEL}`}>
                            Call now
                        </a>
                        <a
                            className="gl-btn secondary"
                            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                                "Hi, I need price details for M-sand / P-sand / aggregates in Chennai."
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WhatsApp us
                        </a>
                    </div>
                </div>
            </div>

            {current && (
                <div
                    className="gl-lb"
                    role="dialog"
                    aria-modal="true"
                    aria-label={current.caption}
                    onClick={close}
                >
                    <button ref={closeBtn} className="x" type="button" aria-label="Close" onClick={close}>
                        &#x2715;
                    </button>

                    {visible.length > 1 && (
                        <>
                            <button
                                className="prev"
                                type="button"
                                aria-label="Previous photo"
                                onClick={(e) => { e.stopPropagation(); step(-1) }}
                            >
                                &#8249;
                            </button>
                            <button
                                className="next"
                                type="button"
                                aria-label="Next photo"
                                onClick={(e) => { e.stopPropagation(); step(1) }}
                            >
                                &#8250;
                            </button>
                        </>
                    )}

                    <figure onClick={(e) => e.stopPropagation()}>
                        <img src={current.src} alt={current.alt} />
                        <figcaption>{current.caption}</figcaption>
                        <span className="gl-lb-count">
                            {open + 1} of {visible.length}
                        </span>
                    </figure>
                </div>
            )}
        </section>
    )
}