"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            <span className="instrument font-medium">About</span> Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are Rakha, Umar, Uud, and Narin—a group of passionate builders who frequent 'Rumah Rakha' to create
            impactful projects and share ideas on tech and the future.
          </p>
        </div>
      </section>

      {/* Team Profiles */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-card-foreground mb-4">
              <span className="instrument">Meet</span> the Team
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Four minds united by a shared vision of positive impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Rakha */}
            <div className="bg-background rounded-lg border border-border p-6 text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-medium text-muted-foreground">R</span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">Rakha</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Visionary leader and founder of our collective. Passionate about creating scalable solutions that drive
                meaningful change in communities worldwide.
              </p>
            </div>

            {/* Umar */}
            <div className="bg-background rounded-lg border border-border p-6 text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-medium text-muted-foreground">U</span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">Umar</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full-stack developer with expertise in modern web technologies. Focuses on building robust, user-centric
                applications that solve real-world problems.
              </p>
            </div>

            {/* Uud */}
            <div className="bg-background rounded-lg border border-border p-6 text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-medium text-muted-foreground">U</span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">Uud</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Creative designer and user experience specialist. Crafts intuitive interfaces and compelling visual
                narratives that make technology accessible to all.
              </p>
            </div>

            {/* Narin */}
            <div className="bg-background rounded-lg border border-border p-6 text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-medium text-muted-foreground">N</span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">Narin</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Strategic innovator and thought leader. Specializes in emerging technologies and their potential to
                reshape industries and improve lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
            Our <span className="instrument font-medium">Mission</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            This site collects what we've built out of love, to inspire and improve the world. We believe that
            technology, when guided by passion and purpose, has the power to create lasting positive change.
          </p>
          <div className="bg-card rounded-lg border border-border p-8 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground leading-relaxed">
              "We don't build for profit or recognition. We build because we believe in a better tomorrow, and we know
              that every line of code, every design decision, and every innovative idea brings us one step closer to
              that future."
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
