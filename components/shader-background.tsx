"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let time = 0
    const particles: Array<{ 
      x: number; 
      y: number; 
      size: number; 
      opacity: number;
      metallic: number;
    }> = []

    // Initialize subtle metallic particles
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.15 + 0.05,
        metallic: Math.random(),
      })
    }

    const animate = () => {
      // Create subtle fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.002 // Much slower movement

      // Draw subtle flowing waves
      for (let i = 0; i < 2; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 - i * 0.01})`
        ctx.lineWidth = 1.5 - i * 0.5

        for (let x = 0; x < canvas.width; x += 8) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.003 + time * 0.5 + i * 0.3) * 40 +
            Math.sin(x * 0.002 + time * 0.3 + i * 0.2) * 25

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Update and draw subtle metallic particles
      particles.forEach((particle) => {
        // Very slow movement
        particle.x += Math.sin(time * 0.1 + particle.metallic) * 0.1
        particle.y += Math.cos(time * 0.1 + particle.metallic) * 0.1

        // Boundary wrap
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw subtle metallic particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        
        // Create subtle metallic gradient
        const gradient = ctx.createRadialGradient(
          particle.x - particle.size/2, 
          particle.y - particle.size/2, 
          0, 
          particle.x, 
          particle.y, 
          particle.size
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity * 0.8})`)
        gradient.addColorStop(1, `rgba(200, 200, 200, ${particle.opacity * 0.3})`)
        
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw very subtle grid overlay (much less prominent)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)"
      ctx.lineWidth = 0.5

      for (let x = 0; x < canvas.width; x += 120) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += 120) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "screen" }} />

      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/20 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/2 to-transparent opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-900/3 to-transparent opacity-30" />

      {children}
    </div>
  )
}
