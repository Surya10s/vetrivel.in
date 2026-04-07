'use client'
import { useState } from "react";

export default function ReasonBlock({ n, title, body, delay, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: "all 0.6s ease",
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
      }}
      className="
        p-8 
        rounded-2xl 
        border border-gray-100 
        bg-white
        hover:border-gray-300 
        hover:shadow-lg
        transition-all duration-300
      "
    >
      {/* number */}
      <div className="text-xs text-gray-400 mb-4 tracking-wider">
        {n}
      </div>

      {/* title */}
      <h3 className="text-lg font-semibold text-black mb-3">
        {title}
      </h3>

      {/* description */}
      <p className="text-sm text-gray-500 leading-relaxed">
        {body}
      </p>
    </div>
  );
}
