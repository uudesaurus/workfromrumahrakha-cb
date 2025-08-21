"use client"

export default function FeaturedThoughts() {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            <span className="instrument">Latest</span> Thoughts
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Our collective insights on technology, future, and innovation
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-medium text-card-foreground mb-3">The Future of Human-AI Collaboration</h3>

          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            As we stand at the intersection of human creativity and artificial intelligence, we explore how this
            partnership will reshape the way we solve global challenges and create meaningful impact...
          </p>

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">By Narin • 3 min read</div>
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
