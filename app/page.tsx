"use client"

import ShaderBackground from "@/components/shader-background"
import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import PulsingCircle from "@/components/pulsing-circle"
import FloatingPhotos from "@/components/floating-photos"

export default function HomePage() {
  return (
    <ShaderBackground>
      <Header />
      <HeroContent />
      <PulsingCircle />
      <FloatingPhotos />
    </ShaderBackground>
  )
}
