"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const thoughts = [
  {
    id: 1,
    title: "The Future of Human-AI Collaboration",
    author: ["Narin"],
    date: "2025-01-15",
    excerpt:
      "As we stand at the intersection of human creativity and artificial intelligence, we explore how this partnership will reshape the way we solve global challenges and create meaningful impact. The key lies not in replacement, but in augmentation...",
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
  {
    id: 2,
    title: "Building Sustainable Tech for Developing Nations",
    author: ["Rakha", "Umar"],
    date: "2025-01-10",
    excerpt:
      "Technology has the power to leapfrog traditional development challenges, but only when designed with sustainability and accessibility in mind. Our experience building solutions for underserved communities has taught us valuable lessons...",
    content: `Technology has the power to leapfrog traditional development challenges, but only when designed with sustainability and accessibility in mind. Our experience building solutions for underserved communities has taught us valuable lessons.

## The Challenge

Developing nations face unique technological challenges that require innovative approaches. Traditional solutions often fail due to infrastructure limitations, cost constraints, and cultural barriers.

## Our Approach

1. **Local-First Design**: Solutions that work offline and with limited connectivity
2. **Cost-Effective Implementation**: Using open-source technologies and local resources
3. **Community Involvement**: Ensuring local ownership and maintenance capabilities

## Lessons Learned

The most successful projects are those that empower local communities rather than creating dependency on external support.`,
    tags: ["Sustainability", "Impact", "Tech"],
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "The Psychology of User-Centered Design",
    author: ["Uud"],
    date: "2025-01-05",
    excerpt:
      "Great design goes beyond aesthetics—it understands human psychology and behavior. In our journey of creating impactful digital experiences, we've learned that empathy is the most powerful design tool...",
    content: `Great design goes beyond aesthetics—it understands human psychology and behavior. In our journey of creating impactful digital experiences, we've learned that empathy is the most powerful design tool.

## Understanding User Needs

Effective design starts with deep understanding of user motivations, fears, and aspirations. This requires moving beyond assumptions and engaging directly with users.

## Design Principles

1. **Cognitive Load Reduction**: Simplifying complex interactions
2. **Emotional Connection**: Creating meaningful user experiences
3. **Accessibility First**: Designing for all users, regardless of abilities

## The Impact

When design truly serves users, it becomes a force for positive change in their lives.`,
    tags: ["Design", "Psychology", "UX"],
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "Open Source as a Force for Global Good",
    author: ["Umar", "Narin"],
    date: "2024-12-28",
    excerpt:
      "Open source software has democratized access to powerful tools and technologies. Our commitment to open source stems from a belief that knowledge should be freely shared to accelerate human progress...",
    content: `Open source software has democratized access to powerful tools and technologies. Our commitment to open source stems from a belief that knowledge should be freely shared to accelerate human progress.

## The Power of Collaboration

Open source projects harness collective intelligence, leading to more robust and innovative solutions than any single organization could create alone.

## Benefits Beyond Code

1. **Knowledge Transfer**: Sharing expertise across borders
2. **Economic Impact**: Reducing costs for organizations worldwide
3. **Innovation Acceleration**: Building upon existing solutions

## Our Commitment

We believe in contributing back to the community that has given us so much.`,
    tags: ["Open Source", "Community", "Impact"],
    readTime: "3 min read",
  },
  {
    id: 5,
    title: "Climate Tech: Innovation for Planetary Health",
    author: ["Narin", "Uud"],
    date: "2024-12-20",
    excerpt:
      "The climate crisis demands unprecedented innovation and collaboration. Technology alone won't solve climate change, but it can be a powerful catalyst for the systemic changes we need...",
    content: `The climate crisis demands unprecedented innovation and collaboration. Technology alone won't solve climate change, but it can be a powerful catalyst for the systemic changes we need.

## The Role of Technology

Climate tech encompasses everything from renewable energy systems to carbon tracking platforms. Each solution contributes to a larger ecosystem of change.

## Key Areas of Focus

1. **Data Transparency**: Making environmental impact visible and actionable
2. **Behavioral Change**: Using technology to encourage sustainable practices
3. **System Optimization**: Improving efficiency across industries

## The Path Forward

Success requires collaboration between technologists, policymakers, and communities worldwide.`,
    tags: ["Climate", "Sustainability", "Innovation"],
    readTime: "4 min read",
  },
]

const allTags = [
  "All",
  "Tech",
  "Future",
  "AI",
  "Sustainability",
  "Impact",
  "Design",
  "Psychology",
  "UX",
  "Open Source",
  "Community",
  "Climate",
  "Innovation",
]

export default function ThoughtsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("All")

  const filteredThoughts = thoughts.filter((thought) => {
    const matchesSearch =
      thought.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thought.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thought.author.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesTag = selectedTag === "All" || thought.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            Our <span className="instrument font-medium">Thoughts</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Collective insights on technology, future, innovation, and our journey of building for a better world.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search thoughts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground border border-border"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Thoughts List */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          {filteredThoughts.length > 0 ? (
            <div className="space-y-8">
              {filteredThoughts.map((thought) => (
                <article key={thought.id} className="bg-card rounded-lg border border-border p-8">
                  <div className="mb-4">
                    <h2 className="text-2xl font-medium text-card-foreground mb-3">
                      <a href={`/thoughts/${thought.id}`} className="hover:text-accent transition-colors duration-200">
                        {thought.title}
                      </a>
                    </h2>

                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <span>By {thought.author.join(", ")}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(thought.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{thought.readTime}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">{thought.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {thought.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`/thoughts/${thought.id}`}
                      className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                    >
                      Read More
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No thoughts found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
