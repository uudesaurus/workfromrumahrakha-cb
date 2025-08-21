"use client"

import { useEffect, useState } from "react"

export default function HeroContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const rotatingTexts = ["Building", "Creating", "Innovating"]

  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left">
        <div
          className={`inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl mb-6 relative border border-white/10 transition-all duration-1000 ${isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-sm translate-y-4"}`}
        >
          <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
          <span className="text-white/90 text-sm font-light relative z-10">✨ builders hub</span>
        </div>

        <h1
          className={`text-5xl md:text-7xl md:leading-tight tracking-tight font-light text-white mb-6 transition-all duration-1200 delay-200 ${isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-md translate-y-8"}`}
        >
          <span className="font-medium italic font-serif">Work From</span> Rumah
          <br />
          <span className="font-light tracking-tight text-white">Rakha</span>
        </h1>

        <div
          className={`mb-6 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-sm translate-y-4"}`}
        >
          <div className="text-2xl font-light text-white/80 mb-2 h-8 overflow-hidden">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateY(-${textIndex * 32}px)` }}
            >
              {rotatingTexts.map((text, index) => (
                <div key={index} className="h-8 flex items-center">
                  {text} for the World
                </div>
              ))}
            </div>
          </div>
        </div>

        <p
          className={`text-sm font-light text-white/70 mb-8 leading-relaxed transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-sm translate-y-4"}`}
        >
          A collective of builders creating impactful solutions for the world. Rakha, Umar, Uud, and Narin share their
          projects, thoughts, and innovations that aim to make the world better through technology.
        </p>

        <div
          className={`flex items-center gap-4 flex-wrap transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-sm translate-y-4"}`}
        >
          <button className="group px-8 py-4 rounded-2xl bg-transparent border border-white/30 text-white font-light text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 cursor-pointer relative overflow-hidden">
            <span className="relative z-10">Our Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
          <button className="group px-8 py-4 rounded-2xl bg-white text-black font-light text-sm transition-all duration-300 hover:bg-white/90 hover:scale-105 cursor-pointer relative overflow-hidden">
            <span className="relative z-10">Read Thoughts</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </main>
  )
}
