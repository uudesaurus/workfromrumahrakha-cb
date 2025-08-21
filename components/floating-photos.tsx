"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Image from "next/image"

const photos = [
  "/images/foto1.PNG",
  "/images/foto2.PNG", 
  "/images/foto3.PNG",
  "/images/foto4.JPG",
  "/images/foto5.PNG",
  "/images/foto6.PNG"
]

interface PhysicsObject {
  id: number
  src: string
  x: number
  y: number
  vx: number
  vy: number
  scale: number
  rotation: number
  mass: number
  radius: number
  isGrabbed: boolean
  isDragging: boolean
  dragOffset: { x: number; y: number }
  bounceCount: number
  friction: number
  elasticity: number
  airResistance: number
  spin: number
  spinDecay: number
  trail: Array<{ x: number; y: number; opacity: number }>
}

export default function FloatingPhotos() {
  const [physicsObjects, setPhysicsObjects] = useState<PhysicsObject[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [grabbedObject, setGrabbedObject] = useState<number | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null)
  const lastPointerVelRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 })

  // Space-like physics constants
  const AIR_RESISTANCE = 0.995
  const FRICTION = 0.99
  const ELASTICITY = 0.98
  const MAX_BOUNCE = 1000000
  const TRAIL_LENGTH = 8

  // Generate physics objects with realistic properties (starts on right side)
  const generatePhysicsObjects = useCallback((areaWidth: number, areaHeight: number) => {
    const shuffled = [...photos].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 3)
    
    const objects: PhysicsObject[] = []
    
    selected.forEach((src, index) => {
      let attempts = 0
      let x: number, y: number
      const radius = 80
      
      // Ensure minimum distance between objects and stay under header area
      do {
        // Position near the right side within a band (75 to 450px from right)
        const offsetFromRight = Math.random() * 450 + 75
        x = Math.max(radius, Math.min(areaWidth - radius, areaWidth - offsetFromRight))
        // Vertical band below header (roughly > 120px)
        y = Math.random() * Math.max(0, areaHeight - 200) + 120
        attempts++
        
        const tooClose = objects.some(obj => {
          const distance = Math.sqrt(Math.pow(x - obj.x, 2) + Math.pow(y - obj.y, 2))
          return distance < 2 * radius - 10
        })
        
        if (!tooClose) break
      } while (attempts < 50)
      
      objects.push({
        id: index,
        src,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6, // Small drift by default
        vy: (Math.random() - 0.5) * 0.6,
        scale: 0.9 + Math.random() * 0.4,
        rotation: (Math.random() - 0.5) * 5,
        mass: 1 + Math.random() * 2,
        radius,
        isGrabbed: false,
        isDragging: false,
        dragOffset: { x: 0, y: 0 },
        bounceCount: 0,
        friction: FRICTION + (Math.random() - 0.5) * 0.01,
        elasticity: ELASTICITY + (Math.random() - 0.5) * 0.01,
        airResistance: AIR_RESISTANCE + (Math.random() - 0.5) * 0.002,
        spin: (Math.random() - 0.5) * 0.1,
        spinDecay: 0.995 + (Math.random() - 0.5) * 0.003,
        trail: []
      })
    })
    
    return objects
  }, [])

  useEffect(() => {
    // Initialize when we have container size
    const rect = canvasRef.current?.getBoundingClientRect()
    const width = rect?.width ?? window.innerWidth
    const height = rect?.height ?? window.innerHeight
    setPhysicsObjects(generatePhysicsObjects(width, height))
    
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [generatePhysicsObjects])

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent, objectId: number) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    lastPointerRef.current = { x: mouseX, y: mouseY }
    lastPointerVelRef.current = { vx: 0, vy: 0 }
    
    setPhysicsObjects(prev => prev.map(obj => {
      if (obj.id === objectId) {
        const offsetX = mouseX - obj.x
        const offsetY = mouseY - obj.y
        
        return {
          ...obj,
          isGrabbed: true,
          isDragging: true,
          dragOffset: { x: offsetX, y: offsetY },
          vx: 0,
          vy: 0,
          spin: 0
        }
      }
      return obj
    }))
    
    setGrabbedObject(objectId)
    setIsDragging(true)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || grabbedObject === null) return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    if (lastPointerRef.current) {
      const dx = mouseX - lastPointerRef.current.x
      const dy = mouseY - lastPointerRef.current.y
      lastPointerVelRef.current = { vx: dx, vy: dy }
    }

    lastPointerRef.current = { x: mouseX, y: mouseY }
    
    setPhysicsObjects(prev => prev.map(obj => {
      if (obj.id === grabbedObject) {
        return {
          ...obj,
          x: mouseX - obj.dragOffset.x,
          y: mouseY - obj.dragOffset.y
        }
      }
      return obj
    }))
  }, [isDragging, grabbedObject])

  const handleMouseUp = useCallback(() => {
    if (grabbedObject !== null) {
      const throwVel = lastPointerVelRef.current
      setPhysicsObjects(prev => prev.map(obj => {
        if (obj.id === grabbedObject) {
          let vx = throwVel.vx * 0.8
          let vy = throwVel.vy * 0.8
          if (Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) {
            vx = (Math.random() - 0.5) * 2
            vy = (Math.random() - 0.5) * 2
          }
          const maxSpeed = 12
          const speed = Math.hypot(vx, vy)
          if (speed > maxSpeed) {
            const scale = maxSpeed / speed
            vx *= scale
            vy *= scale
          }
          return {
            ...obj,
            isGrabbed: false,
            isDragging: false,
            vx,
            vy
          }
        }
        return obj
      }))
    }
    
    setGrabbedObject(null)
    setIsDragging(false)
    lastPointerRef.current = null
    lastPointerVelRef.current = { vx: 0, vy: 0 }
  }, [grabbedObject])

  // Physics simulation loop with pairwise collisions
  const updatePhysics = useCallback((deltaTime: number) => {
    setPhysicsObjects(prev => {
      // First pass: integrate motion and boundaries
      const rect = canvasRef.current?.getBoundingClientRect()
      const width = rect?.width ?? window.innerWidth
      const height = rect?.height ?? window.innerHeight

      const newObjs = prev.map(obj => {
        if (obj.isGrabbed || obj.isDragging) {
          return { ...obj, trail: [...obj.trail] }
        }

        const newTrail = [...obj.trail, { x: obj.x, y: obj.y, opacity: 1 }]
        if (newTrail.length > TRAIL_LENGTH) newTrail.shift()
        newTrail.forEach((point, index) => {
          point.opacity = (index + 1) / TRAIL_LENGTH
        })

        let vx = obj.vx * obj.airResistance
        let vy = obj.vy * obj.airResistance
        if (Math.abs(vx) < 0.02) vx += (Math.random() - 0.5) * 0.02
        if (Math.abs(vy) < 0.02) vy += (Math.random() - 0.5) * 0.02

        let x = obj.x + vx
        let y = obj.y + vy
        let rotation = obj.rotation + obj.spin
        let spin = obj.spin * obj.spinDecay
        let bounceCount = obj.bounceCount

        const maxX = width - obj.radius
        const maxY = height - obj.radius
        if (x < obj.radius) { x = obj.radius; vx = -vx * obj.elasticity; bounceCount++ }
        else if (x > maxX) { x = maxX; vx = -vx * obj.elasticity; bounceCount++ }
        if (y < obj.radius) { y = obj.radius; vy = -vy * obj.elasticity; bounceCount++ }
        else if (y > maxY) { y = maxY; vy = -vy * obj.elasticity; bounceCount++ }

        if (Math.abs(vx) < 0.005) vx = (Math.random() - 0.5) * 0.01
        if (Math.abs(vy) < 0.005) vy = (Math.random() - 0.5) * 0.01
        if (Math.abs(spin) < 0.002) spin = 0

        return { ...obj, x, y, vx, vy, rotation, spin, bounceCount, trail: newTrail }
      })

      // Second pass: pairwise collisions (elastic)
      for (let i = 0; i < newObjs.length; i++) {
        for (let j = i + 1; j < newObjs.length; j++) {
          const a = newObjs[i]
          const b = newObjs[j]
          // Skip grabbed objects
          if (a.isGrabbed || a.isDragging || b.isGrabbed || b.isDragging) continue

          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.hypot(dx, dy)
          const minDist = a.radius + b.radius
          if (dist > 0 && dist < minDist) {
            const nx = dx / dist
            const ny = dy / dist
            const overlap = minDist - dist
            // Positional correction to prevent sinking
            const totalMass = a.mass + b.mass
            const correctionA = (overlap * (b.mass / totalMass)) * 0.5
            const correctionB = (overlap * (a.mass / totalMass)) * 0.5
            a.x -= nx * correctionA
            a.y -= ny * correctionA
            b.x += nx * correctionB
            b.y += ny * correctionB

            // Relative velocity
            const rvx = b.vx - a.vx
            const rvy = b.vy - a.vy
            const velAlongNormal = rvx * nx + rvy * ny
            if (velAlongNormal < 0) {
              const restitution = Math.min(a.elasticity, b.elasticity)
              const jImpulse = -(1 + restitution) * velAlongNormal / (1 / a.mass + 1 / b.mass)
              const impulseX = jImpulse * nx
              const impulseY = jImpulse * ny
              a.vx -= impulseX / a.mass
              a.vy -= impulseY / a.mass
              b.vx += impulseX / b.mass
              b.vy += impulseY / b.mass
            }
          }
        }
      }

      return newObjs
    })
  }, [])

  // Animation loop (others keep moving even when dragging)
  useEffect(() => {
    const animate = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime
      }
      
      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime

      if (isVisible) {
        updatePhysics(deltaTime)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    if (isVisible) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible, updatePhysics])

  // Global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div 
      ref={canvasRef}
      className="fixed top-0 right-0 w-full h-full pointer-events-none z-30"
    >
      {physicsObjects.map((obj) => (
        <div
          key={obj.id}
          className="absolute pointer-events-auto cursor-grab active:cursor-grabbing"
          style={{
            left: obj.x - obj.radius,
            top: obj.y - obj.radius,
            transform: `scale(${obj.scale}) rotate(${obj.rotation}deg)`,
            zIndex: obj.isGrabbed ? 60 : 40,
          }}
          onMouseDown={(e) => handleMouseDown(e, obj.id)}
        >
          {/* Motion trail synchronized behind */}
          {obj.trail.map((point, index) => (
            <div
              key={index}
              className="absolute w-40 h-40 rounded-3xl"
              style={{
                left: point.x - obj.x,
                top: point.y - obj.y,
                opacity: point.opacity * 0.2,
                filter: "blur(4px)",
                background: "rgba(255,255,255,0.10)",
              }}
            />
          ))}

          {/* Main photo object */}
          <div
            className={`relative overflow-hidden rounded-3xl border shadow-2xl transition-all duration-150 ${
              obj.isGrabbed 
                ? 'w-40 h-40 border-blue-400/70 shadow-blue-400/40 bg-blue-900/20 backdrop-blur-md scale-105' 
                : 'w-40 h-40 border-white/30 shadow-black/60 bg-black/20 backdrop-blur-sm'
            }`}
          >
            <Image
              src={obj.src}
              alt={`Physics photo ${obj.id + 1}`}
              fill
              className="object-cover"
              sizes="160px"
              priority={false}
            />
            {/* Physics info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <div className="text-white text-xs font-mono">
                v: ({obj.vx.toFixed(1)}, {obj.vy.toFixed(1)}) • bounces: {obj.bounceCount}
              </div>
            </div>
            {/* Grab indicator */}
            {obj.isGrabbed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-400/80 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}