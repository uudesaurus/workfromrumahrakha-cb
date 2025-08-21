"use client"

export default function FeaturedWork() {
  return (
    <section className="py-16 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-card-foreground mb-4">
            <span className="instrument">Latest</span> Project
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Our most recent contribution to making the world better
          </p>
        </div>

        <div className="bg-background rounded-lg border border-border p-8 max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Project Screenshot</span>
            </div>
          </div>

          <h3 className="text-xl font-medium text-foreground mb-3">AI-Powered Education Platform</h3>

          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            A revolutionary platform that makes quality education accessible to everyone through AI-driven personalized
            learning experiences. Built with passion to impact thousands of learners worldwide.
          </p>

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">Contributors: Rakha, Umar</div>
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
