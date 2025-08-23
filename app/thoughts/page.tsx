"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { createClient, Entry, EntrySkeletonType } from "contentful"
import ReactMarkdown from "react-markdown"

// TypeScript interfaces for Contentful Article content model
interface AuthorFields {
  name: string;
  [key: string]: any;
}

interface AuthorSkeleton extends EntrySkeletonType {
  contentTypeId: 'author';
  fields: AuthorFields;
}

type AuthorEntry = Entry<AuthorSkeleton, undefined, string>;

interface ArticleFields {
  title: string;
  author: any; // Using any for now since Contentful returns complex linked entries
  content: string;
  // tags: string[]; // Commented out as it doesn't exist in Contentful yet
  // excerpt: string; // Commented out as it doesn't exist in Contentful yet
  // readTime: string; // Commented out as it doesn't exist in Contentful yet
}

interface ArticleSkeleton extends EntrySkeletonType {
  contentTypeId: 'article';
  fields: ArticleFields;
}

type ArticleEntry = Entry<ArticleSkeleton, undefined, string>;

// Fallback hardcoded data for development/testing
const fallbackThoughts = [
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
  const [articles, setArticles] = useState<ArticleEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  })

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await client.getEntries<ArticleSkeleton>({
          content_type: 'article',
          include: 2, // Include linked entries (authors)
          order: ['-sys.createdAt'] // Order by creation date, newest first
        })
        
        setArticles(response.items)
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError(err instanceof Error ? err.message : 'Failed to load articles')
        // Use fallback data on error
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Helper function to generate excerpt from content
  const generateExcerpt = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength).trim() + '...'
  }

  // Helper function to estimate read time
  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  }

  const filteredThoughts = articles.filter((article) => {
    const title = String(article.fields.title || '')
    const content = String(article.fields.content || '')
    const authors = Array.isArray(article.fields.author) ? article.fields.author : []
    
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      authors.some((author: any) => {
        const authorName = author?.fields?.name || ''
        return String(authorName).toLowerCase().includes(searchTerm.toLowerCase())
      })

    // For now, since tags don't exist in Contentful, we'll show all articles when "All" is selected
    // and hide articles when specific tags are selected (until tags are implemented)
    const matchesTag = selectedTag === "All"
    // TODO: Implement tag filtering when tags field is added to Contentful
    // const matchesTag = selectedTag === "All" || article.fields.tags?.includes(selectedTag)

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

          {/* Filter Tags - Temporarily disabled until tags are added to Contentful */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag("All")}
              className="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 bg-primary text-primary-foreground"
            >
              All Articles
            </button>
            {/* TODO: Enable tag filtering when tags field is added to Contentful */}
            {/* {allTags.slice(1).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 bg-background text-foreground hover:bg-accent hover:text-accent-foreground border border-border opacity-50 cursor-not-allowed"
                disabled
              >
                {tag}
              </button>
            ))} */}
          </div>
        </div>
      </section>

      {/* Thoughts List */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-lg border border-border p-8 animate-pulse">
                  <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-4/6"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <div className="h-6 bg-muted rounded w-12"></div>
                      <div className="h-6 bg-muted rounded w-16"></div>
                    </div>
                    <div className="h-8 bg-muted rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Error loading articles: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          ) : filteredThoughts.length > 0 ? (
            <div className="space-y-8">
              {filteredThoughts.map((article) => (
                <article key={article.sys.id} className="bg-card rounded-lg border border-border p-8">
                  <div className="mb-4">
                    <h2 className="text-2xl font-medium text-card-foreground mb-3">
                      <a href={`/thoughts/${article.sys.id}`} className="hover:text-accent transition-colors duration-200">
                        {article.fields.title}
                      </a>
                    </h2>

                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <span>
                        By {(() => {
                          const authors = article.fields.author;
                          if (Array.isArray(authors) && authors.length > 0) {
                            return authors.map((author: any) => author.fields?.name || 'Unknown Author').join(', ');
                          }
                          return 'Unknown Author';
                        })()}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{new Date(article.sys.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{estimateReadTime(article.fields.content)}</span>
                    </div>
                  </div>

                  <span className="text-muted-foreground leading-relaxed mb-6">
                    {<ReactMarkdown>{generateExcerpt(article.fields.content)}</ReactMarkdown>}
                  </span>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {/* TODO: Add tags when available in Contentful */}
                      {/* {article.fields.tags?.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                          {tag}
                        </span>
                      ))} */}
                      <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                        Article
                      </span>
                    </div>
                    <a
                      href={`/thoughts/${article.sys.id}`}
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
