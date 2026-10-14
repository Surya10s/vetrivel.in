'use client'

const PHONE_DISPLAY = "9500 007 779"
const PHONE_TEL = "+919500007779"
const WHATSAPP = "919500007779"
const BUSINESS_NAME = "Your Business Name" // TODO: replace with your business name (used in Google schema)

const whatsappLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    "Hi, I need price details for M-sand / P-sand / aggregates in Chennai."
)}`

// Helps Google show your business details in search. Add "address" once you have it.
const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_NAME,
    description:
        "M-sand, P-sand, gravel and aggregate supplier in Chennai with own fleet of trucks.",
    telephone: PHONE_TEL,
    areaServed: { "@type": "City", name: "Chennai" },
    openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
    },
}

export default function Contact() {
    return (
        <section id="contact" className="ct" aria-labelledby="contact-title">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <style>{`
                .ct {
                    background: #fff;
                    color: #111;
                    padding: clamp(56px, 9vw, 112px) 4vw;
                    display: flex;
                    justify-content: center;
                }
                .ct-inner {
                    width: 100%;
                    max-width: 860px;
                    text-align: center;
                }
                .ct h2 {
                    font-size: clamp(36px, 6vw, 72px);
                    line-height: 1.08;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    margin: 0 0 20px;
                }
                .ct h2 span { color: #888; font-weight: 400; }
                .ct-sub {
                    font-size: 18px;
                    line-height: 1.7;
                    color: #444;
                    max-width: 58ch;
                    margin: 0 auto 40px;
                }

                .ct-phone-wrap {
                    position: relative;
                    display: inline-block;
                    margin-bottom: 36px;
                }
                .ct-phone {
                    position: relative;
                    display: inline-block;
                    font-size: clamp(32px, 5.5vw, 56px);
                    font-weight: 700;
                    letter-spacing: 0.01em;
                    color: #111;
                    text-decoration: none;
                    padding: 6px 28px;
                }
                .ct-phone:focus-visible { outline: 3px solid #888; outline-offset: 4px; border-radius: 999px; }
                .ct-ring {
                    position: absolute;
                    inset: 0;
                    border-radius: 999px;
                    border: 1.5px solid #111;
                    opacity: 0;
                    pointer-events: none;
                    animation: ct-pulse 2.8s ease-out infinite;
                }
                @keyframes ct-pulse {
                    0%   { transform: scale(1);    opacity: 0.35; }
                    70%  { transform: scale(1.18); opacity: 0; }
                    100% { transform: scale(1.18); opacity: 0; }
                }

                .ct-cta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    justify-content: center;
                    margin-bottom: 40px;
                }
                .ct-btn {
                    display: inline-block;
                    padding: 15px 34px;
                    border-radius: 999px;
                    font-size: 17px;
                    font-weight: 600;
                    text-decoration: none;
                    border: 1.5px solid #111;
                    transition: background .2s, color .2s;
                }
                .ct-btn:focus-visible { outline: 3px solid #888; outline-offset: 3px; }
                .ct-btn.primary { background: #111; color: #fff; }
                .ct-btn.primary:hover { background: #333; }
                .ct-btn.secondary { background: #fff; color: #111; }
                .ct-btn.secondary:hover { background: #111; color: #fff; }

                .ct-price {
                    background: #fafafa;
                    border: 1px solid #e6e6e6;
                    border-radius: 10px;
                    padding: 22px 24px;
                    max-width: 560px;
                    margin: 0 auto 32px;
                }
                .ct-price strong { display: block; font-size: 18px; margin-bottom: 6px; }
                .ct-price p { margin: 0; font-size: 16px; line-height: 1.7; color: #555; }
                .ct-price a { color: #111; font-weight: 700; white-space: nowrap; }

                .ct-meta {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 8px 28px;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    font-size: 15px;
                    color: #666;
                }

                @media (max-width: 480px) {
                    .ct-btn { flex: 1 1 100%; text-align: center; }
                    .ct-sub { font-size: 16px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .ct-ring { animation: none; }
                }
            `}</style>

            <div className="ct-inner">
                <h2 id="contact-title">
                    Need M-sand, P-sand or aggregates <span>in Chennai today?</span>
                </h2>

                <p className="ct-sub">
                    Call or WhatsApp us to place your order. We deliver across Chennai with
                    our own trucks, consistent quality and transparent pricing.
                </p>

                <div className="ct-phone-wrap">
                    <span className="ct-ring" aria-hidden="true" />
                    <a className="ct-phone" href={`tel:${PHONE_TEL}`}>
                        {PHONE_DISPLAY}
                    </a>
                </div>

                <div className="ct-cta">
                    <a className="ct-btn primary" href={`tel:${PHONE_TEL}`}>
                        Call now
                    </a>
                    <a
                        className="ct-btn secondary"
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        WhatsApp us
                    </a>
                </div>

                <div className="ct-price">
                    <strong>Want price details?</strong>
                    <p>
                        For today's rates on M-sand, P-sand, gravel and aggregates, call{" "}
                        <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>. Prices depend on the
                        material, quantity and your delivery location in Chennai.
                    </p>
                </div>

                <ul className="ct-meta">
                    <li>Open Monday to Saturday, 9 AM to 8 PM</li>
                    <li>Usually replies within minutes</li>
                    <li>Delivery across all Chennai zones</li>
                </ul>
            </div>
        </section>
    )
}