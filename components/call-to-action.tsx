"use client"

export default function CallToAction() {
  return (
    <section className="py-16 px-6 bg-muted">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
          Want to <span className="instrument font-medium">collaborate</span> with us?
        </h2>

        <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
          We're always open to connecting with fellow builders, innovators, and dreamers who share our passion for
          creating positive impact.
        </p>

        <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
          Get In Touch
        </button>
      </div>
    </section>
  )
}
