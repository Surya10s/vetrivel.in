'use client'

const PHONE = "+919500007779" // TODO: replace with your real number
const WHATSAPP = "919500007779" // TODO: replace with your WhatsApp number, with country code

// TODO: replace these sample reviews with REAL feedback from your customers.
const reviews = [
    {
        quote:
            "We ordered M-sand for our slab work and the quality was consistent across every load. The trucks reached the site exactly when promised.",
        name: "vv kumar",
        role: "Civil contractor",
        area: "Velachery, Chennai",
        material: "M-Sand",
    },
    {
        quote:
            "Clean, well-graded P-sand for plastering. No dust or clay, and the finish on our walls came out smooth. Will order again for the next floor.",
        name: "m.manikandan",
        role: "Home builder",
        area: "Tambaram, Chennai",
        material: "P-Sand",
    },
    {
        quote:
            "We needed 40 tons of aggregates on short notice. They arranged the delivery within a day and the quantity matched what we paid for.",
        name: "Customer name",
        role: "Site engineer",
        area: "OMR, Chennai",
        material: "Aggregates",
    },
    {
        quote:
            "Fair rates and honest measurement. Their own trucks mean no middlemen and no confusion about delivery timing.",
        name: "lakshmi traders",
        role: "Builder",
        area: "Porur, Chennai",
        material: "Building material supply",
    },
    {
        quote:
            "I have been buying sand and gravel from them for several projects. The supply never stopped, even during peak construction season.",
        name: "santhos krish",
        role: "Contractor",
        area: "Anna Nagar, Chennai",
        material: "Sand & gravel",
    },
    {
        quote:
            "Good communication from the first call to unloading. They explained the difference between M-sand and P-sand and helped us pick the right one.",
        name: "veera mani",
        role: "Individual home owner",
        area: "Medavakkam, Chennai",
        material: "M-Sand & P-Sand",
    },
]

const summary = [
    { value: "500+", label: "Projects supplied" },
    { value: "26+", label: "Years in Chennai" },
    { value: "5 to 50 tons", label: "Order sizes" },
]

export default function Testimonials() {
    return (
        <section className="tm" aria-labelledby="tm-title">
            <style>{`
                .tm {
                    background: #fafafa;
                    color: #111;
                    padding: clamp(48px, 8vw, 96px) 4vw;
                    display: flex;
                    justify-content: center;
                }
                .tm-inner { width: 100%; max-width: 1280px; }

                .tm-head {
                    display: grid;
                    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
                    gap: clamp(24px, 5vw, 72px);
                    align-items: end;
                    margin-bottom: clamp(32px, 5vw, 56px);
                }
                .tm-head h2 {
                    font-size: clamp(32px, 4.2vw, 56px);
                    line-height: 1.1;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    margin: 0;
                }
                .tm-head h2 span { color: #777; font-weight: 400; }
                .tm-head p {
                    font-size: 18px;
                    line-height: 1.7;
                    color: #444;
                    max-width: 56ch;
                    margin: 0;
                }

                .tm-grid {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 20px;
                }
                .tm-card {
                    background: #fff;
                    border: 1px solid #e6e6e6;
                    border-radius: 10px;
                    padding: 28px;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    box-sizing: border-box;
                }
                .tm-material {
                    align-self: flex-start;
                    font-size: 13px;
                    font-weight: 600;
                    color: #222;
                    border: 1px solid #d8d8d8;
                    border-radius: 999px;
                    padding: 4px 12px;
                    margin-bottom: 18px;
                }
                .tm-card blockquote {
                    margin: 0 0 24px;
                    font-size: 17px;
                    line-height: 1.7;
                    color: #222;
                    flex: 1;
                }
                .tm-card figcaption {
                    border-top: 1px solid #eee;
                    padding-top: 16px;
                }
                .tm-name { font-weight: 700; font-size: 16px; }
                .tm-meta { color: #666; font-size: 14px; margin-top: 2px; }

                .tm-footer {
                    margin-top: clamp(32px, 5vw, 56px);
                    padding-top: 32px;
                    border-top: 1px solid #e0e0e0;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 28px 56px;
                    justify-content: space-between;
                    align-items: center;
                }
                .tm-stats { display: flex; flex-wrap: wrap; gap: 20px 48px; margin: 0; }
                .tm-stats div { display: flex; flex-direction: column-reverse; }
                .tm-stats dt { font-size: 28px; font-weight: 700; line-height: 1.2; }
                .tm-stats dd { margin: 2px 0 0; color: #666; font-size: 15px; }

                .tm-cta { display: flex; flex-wrap: wrap; gap: 12px; }
                .tm-btn {
                    display: inline-block;
                    padding: 14px 26px;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    border: 1.5px solid #111;
                    transition: background .2s, color .2s;
                }
                .tm-btn:focus-visible { outline: 3px solid #888; outline-offset: 3px; }
                .tm-btn.primary { background: #111; color: #fff; }
                .tm-btn.primary:hover { background: #333; }
                .tm-btn.secondary { background: #fff; color: #111; }
                .tm-btn.secondary:hover { background: #f1f1f1; }

                @media (max-width: 1000px) {
                    .tm-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                }
                @media (max-width: 768px) {
                    .tm-head { grid-template-columns: 1fr; align-items: start; }
                }
                @media (max-width: 600px) {
                    .tm-grid { grid-template-columns: 1fr; }
                    .tm-card { padding: 22px; }
                    .tm-btn { flex: 1 1 100%; text-align: center; }
                }
            `}</style>

            <div className="tm-inner">
                <div className="tm-head">
                    <h2 id="tm-title">
                        What our customers say{" "}
                        <span>about our M-sand, P-sand &amp; aggregate supply in Chennai</span>
                    </h2>
                    <p>
                        Contractors, builders and home owners across Chennai trust us for
                        quality M-sand, P-sand, gravel and aggregates, delivered on time
                        with our own trucks. Here is what they tell us.
                    </p>
                </div>

                <ul className="tm-grid">
                    {reviews.map((r, i) => (
                        <li key={i}>
                            <figure className="tm-card" style={{ margin: 0 }}>
                                <span className="tm-material">{r.material}</span>
                                <blockquote>{r.quote}</blockquote>
                                <figcaption>
                                    <div className="tm-name">{r.name}</div>
                                    <div className="tm-meta">
                                        {r.role}, {r.area}
                                    </div>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>

                {/* <div className="tm-footer">
                    <dl className="tm-stats">
                        {summary.map((s) => (
                            <div key={s.label}>
                                <dt>{s.value}</dt>
                                <dd>{s.label}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="tm-cta">
                        <a className="tm-btn primary" href={`tel:${PHONE}`}>
                            Call for a quote
                        </a>
                        <a
                            className="tm-btn secondary"
                            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                                "Hi, I need a quote for M-sand / P-sand supply in Chennai."
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Order on WhatsApp
                        </a>
                    </div>
                </div> */}
            </div>
        </section>
    )
}