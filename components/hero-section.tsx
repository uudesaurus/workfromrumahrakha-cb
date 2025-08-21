"use client"

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-background">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-light text-foreground mb-6 leading-tight">
          <span className="font-medium instrument">Building</span> for a
          <br />
          <span className="font-light">Better World</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Projects and Thoughts from Rakha, Umar, Uud, and Narin
        </p>

        <p className="text-sm md:text-base text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          We are passionate builders who create impactful solutions and share our collective thoughts on technology, the
          future, and making the world better through innovation.
        </p>

        <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
          Explore Our Work
        </button>
      </div>
    </section>
  )
}
