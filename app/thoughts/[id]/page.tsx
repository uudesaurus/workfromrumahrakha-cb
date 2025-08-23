"use client"

import { use, useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { createClient, Entry, EntrySkeletonType } from "contentful";
import ReactMarkdown from "react-markdown";

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
  author: any;
  content: string;
}

interface ArticleSkeleton extends EntrySkeletonType {
  contentTypeId: 'article';
  fields: ArticleFields;
}

type ArticleEntry = Entry<ArticleSkeleton, undefined, string>;


export default function ThoughtPage({ params }: { params: Promise<{ id: string }> }) {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  })

  const [article, setArticle] = useState<ArticleEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { id } = use(params)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        setError(null)
        const entry = await client.getEntry<ArticleSkeleton>(id, {
          include: 2 // Include linked entries (authors)
        })
        
        // Verify this is an Article content type
        if (entry.sys.contentType.sys.id !== 'article') {
          throw new Error('Content is not an article')
        }
        
        setArticle(entry)
      } catch (err) {
        console.error('Error fetching article:', err)
        setError(err instanceof Error ? err.message : 'Failed to load article')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 py-16 px-6 text-center flex items-center justify-center">
          <div className="animate-pulse max-w-3xl w-full">
            <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Error state
  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="py-16 px-6 text-center">
          <h1 className="text-2xl font-medium text-foreground mb-4">
            {error || "Article Not Found"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {error ? "There was an error loading this article." : "The article you're looking for doesn't exist."}
          </p>
          <a href="/thoughts" className="text-accent hover:text-primary transition-colors duration-200">
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
            <h1 className="text-3xl md:text-4xl font-light text-foreground mb-4 leading-tight">
              {article.fields.title}
            </h1>

            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <span>
                By {(() => {
                  const authors = article.fields.author;
                  if (Array.isArray(authors) && authors.length > 0) {
                    return authors.map((author: any, index: number) => (
                      <span key={author.sys?.id || index}>
                        {author.fields?.name || `Author ${index + 1}`}
                        {index < authors.length - 1 ? ', ' : ''}
                      </span>
                    ));
                  }
                  return 'Unknown Author';
                })()}
              </span>
              <span className="mx-2">•</span>
              <span>{new Date(article.sys.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              <span className="mx-2">•</span>
              <span>Last updated {new Date(article.sys.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-gray max-w-none">
            <div className="text-foreground leading-relaxed whitespace-pre-line min-h-full">
              <ReactMarkdown>{article.fields.content}</ReactMarkdown>
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Share this article:</p>
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  const url = window.location.href;
                  const text = `Check out this article: "${article.fields.title}"`;
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                }}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <span className="sr-only">Share on Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  const url = window.location.href;
                  const title = article.fields.title;
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
                }}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
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
