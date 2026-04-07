'use client'
import React, { useEffect, useState } from 'react'

export default function Contact() {
  const [ripple, setRipple] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setRipple(true)
      setTimeout(() => setRipple(false), 900)
    }, 2800)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">

        {/* label */}
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-6">
          Contact Us
        </p>

        {/* heading */}
        <h2 className="text-5xl md:text-7xl font-semibold text-black leading-tight mb-8">
          Need materials
          <br />
          <span className="text-gray-400">today?</span>
        </h2>

        {/* subtext */}
        <p className="text-lg md:text-xl text-gray-500 mb-14 max-w-2xl mx-auto">
          Call or WhatsApp us to place your order.  
          Fast delivery across Chennai with trusted quality and transparent pricing.
        </p>

        {/* phone */}
        <div className="relative inline-block mb-14">
          <span
            className={`
              absolute inset-0 rounded-full border border-black
              ${ripple ? "scale-125 opacity-0" : "scale-100 opacity-40"}
              transition-all duration-700
            `}
          />

          <a
            href="tel:9500007779"
            className="text-4xl md:text-5xl font-semibold text-black relative"
          >
            9500 007 779
          </a>
        </div>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">

          <a
            href="tel:9500007779"
            className="px-8 py-4 border border-black rounded-full hover:bg-black hover:text-white transition text-lg"
          >
            Call Now
          </a>

          <a
            href="https://wa.me/919500007779"
            target="_blank"
            className="px-8 py-4 bg-black text-white rounded-full hover:opacity-80 transition text-lg"
          >
            WhatsApp
          </a>

        </div>

        {/* footer */}
        <p className="text-sm text-gray-400">
          Available Mon – Sat · 9 AM – 8 PM · Usually replies within minutes
        </p>

      </div>
    </section>
  )
}
