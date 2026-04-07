'use client'
import { useState, useEffect } from "react"

export default function Hero() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 80);
    }, []);

    const rev = (d) => ({
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.9s ${d}s cubic-bezier(.16,1,.3,1)`
    });

    return (
        <section
            style={{
                minHeight: "100vh",
                background: "#ffffff",
                color: "#000",
                display: "flex",
                alignItems: "center",
                padding: "0 6vw",
            }}
        >
            <style>{`
                @media (max-width: 768px) {
                    .hero-images { display: none !important; }
                    .hero-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            <div
                className="hero-grid"
                style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1.1fr 1fr",
                    gap: "60px",
                    alignItems: "center"
                }}
            >
                {/* LEFT CONTENT */}
                <div>
                    {/* ... rest unchanged ... */}
                </div>

                {/* RIGHT IMAGE */}
                <div
                    className="hero-images"   {/* 👈 add this */}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "10px",
                        ...rev(0.3)
                    }}
                >
                    {/* images unchanged */}
                </div>
            </div>
        </section>
    );
}