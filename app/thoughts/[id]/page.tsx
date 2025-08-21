"use client"

import { use } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const thoughts = [
  {
    id: 1,
    title: "The Future of Human-AI Collaboration",
    author: ["Narin"],
    date: "2025-01-15",
    content: `As we stand at the intersection of human creativity and artificial intelligence, we explore how this partnership will reshape the way we solve global challenges and create meaningful impact. The key lies not in replacement, but in augmentation.

## The Symbiotic Relationship

Human-AI collaboration represents a fundamental shift in how we approach problem-solving. Rather than viewing AI as a threat to human capabilities, we should embrace it as a powerful amplifier of human potential.

## Key Areas of Impact

1. **Creative Problem Solving**: AI can process vast amounts of data while humans provide context and creativity
2. **Ethical Decision Making**: Humans provide moral compass while AI offers analytical precision
3. **Innovation Acceleration**: Combined human intuition and AI processing power

The future belongs to those who can effectively bridge the gap between human wisdom and artificial intelligence.`,
    tags: ["Tech", "Future", "AI"],
    readTime: "3 min read",
  },
  // Add other thoughts here for individual pages...
]

export default function ThoughtPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const thought = thoughts.find((t) => t.id === Number.parseInt(id))

  if (!thought) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="py-16 px-6 text-center">
          <h1 className="text-2xl font-medium text-foreground mb-4">Thought Not Found</h1>
          <a href="/thoughts" className="text-accent hover:text-primary">
            ← Back to Thoughts
          </a>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <a
            href="/thoughts"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Thoughts
          </a>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-light text-foreground mb-4 leading-tight">{thought.title}</h1>

            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <span>By {thought.author.join(", ")}</span>
              <span className="mx-2">•</span>
              <span>{new Date(thought.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{thought.readTime}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {thought.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-gray max-w-none">
            <div className="text-foreground leading-relaxed whitespace-pre-line">{thought.content}</div>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Share this thought:</p>
            <div className="flex space-x-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <span className="sr-only">Share on Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <span className="sr-only">Share on LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
