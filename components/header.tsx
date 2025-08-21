"use client"

import { useState, useEffect } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="mx-6 mt-6 rounded-2xl bg-black/10 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <a href="/" className="relative cursor-pointer group">
              <h1 className="text-lg font-medium text-white tracking-wide group-hover:text-white/80 transition-colors duration-300">workfromrumahrakha</h1>
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-white/50 via-white/20 to-transparent group-hover:from-white/70 group-hover:via-white/40 transition-all duration-300"></div>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {["About", "Projects", "Thoughts", "Contact"].map((item, index) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`px-4 py-2 rounded-xl text-white/80 hover:text-white text-sm font-light transition-all duration-300 hover:bg-white/5 hover:backdrop-blur-sm transform hover:scale-105 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 top-2" : "top-0"}`}
              />
              <span
                className={`absolute w-full h-0.5 bg-white transition-all duration-300 top-2 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 top-2" : "top-4"}`}
              />
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 backdrop-blur-xl">
            <nav className="p-4 space-y-2">
              {["About", "Projects", "Thoughts", "Contact"].map((item, index) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`block px-4 py-3 rounded-xl text-white/80 hover:text-white text-sm font-light hover:bg-white/5 transition-all duration-300 transform ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
