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
            <div
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

                    {/* badge */}
                    <div style={{ ...rev(0.1) }}>
                        <span style={{
                            fontSize: 12,
                            letterSpacing: "0.25em",
                            color: "#666",
                            textTransform: "uppercase",
                            fontWeight: 600
                        }}>
                            Chennai's Finest Building Supplier
                        </span>
                    </div>

                    {/* heading */}
                    <h1 style={{
                        fontSize: "clamp(42px,6vw,86px)",
                        lineHeight: 1.05,
                        margin: "20px 0",
                        fontWeight: 700,
                        ...rev(0.2)
                    }}>
                        Building Material
                        <br />
                        <span style={{
                            color: "#888",
                            fontWeight: 400
                        }}>
                            Supplier
                        </span>
                    </h1>

                    {/* description */}
                    <p style={{
                        fontSize: 18,
                        color: "#444",
                        maxWidth: 520,
                        lineHeight: 1.7,
                        marginBottom: 30,
                        ...rev(0.3)
                    }}>
                        Premium sand & gravel delivered across Chennai
                        with our own fleet of trucks. From 5 tons to 50 tons —
                        reliable supply, on-time delivery, every project.
                    </p>

                    {/* buttons */}
                    <div style={{
                        display: "flex",
                        gap: 16,
                        marginBottom: 40,
                        ...rev(0.4)
                    }}>

                    </div>

                    {/* stats */}
                    <div style={{
                        display: "flex",
                        gap: 50,
                        ...rev(0.5)
                    }}>
                        <div>
                            <div style={{ fontSize: 28, fontWeight: 700 }}>26+</div>
                            <div style={{ color: "#666" }}>Years Experience</div>
                        </div>

                        <div>
                            <div style={{ fontSize: 28, fontWeight: 700 }}>500+</div>
                            <div style={{ color: "#666" }}>Projects Supplied</div>
                        </div>

                        <div>
                            <div style={{ fontSize: 28, fontWeight: 700 }}>24h</div>
                            <div style={{ color: "#666" }}>Fast Delivery</div>
                        </div>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "10px",
                        ...rev(0.3)
                    }}
                >
                    <img
                        src="/msand.jpg"
                        alt="building materials"
                        style={{
                            width: "100%",
                            height: "600px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            boxShadow: "0 40px 80px rgba(0,0,0,0.08)"
                        }}
                    />

                    <img
                        src="/white msand.jpg"
                        alt="building materials"
                        style={{
                            width: "100%",
                            height: "600px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            boxShadow: "0 40px 80px rgba(0,0,0,0.08)"
                        }}
                    />
                    <img
                        src="/20mm.jpg"
                        alt="building materials"
                        style={{
                            width: "100%",
                            height: "600px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            boxShadow: "0 40px 80px rgba(0,0,0,0.08)"
                        }}
                    />

                </div>


            </div>
        </section>
    );
}
