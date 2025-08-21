"use client"

import { motion } from "framer-motion"

export default function PulsingCircle() {
  return (
    <div className="absolute bottom-8 right-8 z-30">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Custom pulsing circle with CSS animations */}
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full rounded-full border-2 border-white/20 animate-pulse"></div>
          <div className="absolute inset-0 w-full h-full rounded-full border border-white/40 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 w-full h-full rounded-full border border-white/30 animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Inner glowing circle */}
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 shadow-lg shadow-white/20"></div>

        {/* Rotating text circle */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ transform: "scale(1.6)" }}
        >
          <defs>
            <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="text-sm fill-white/80 font-serif">
            <textPath href="#circle" startOffset="0%">
              building for impact • building for impact • building for impact •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  )
}
