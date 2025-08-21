"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const projects = [
  {
    id: 1,
    title: "AI-Powered Education Platform",
    description:
      "A revolutionary platform that makes quality education accessible to everyone through AI-driven personalized learning experiences. Built with passion to impact thousands of learners worldwide.",
    contributors: ["Rakha", "Umar"],
    impact: ["Reached 10k+ users", "Open-sourced on GitHub", "Featured in TechCrunch"],
    tags: ["AI", "Web", "Education"],
    status: "Active",
  },
  {
    id: 2,
    title: "Sustainable Supply Chain Tracker",
    description:
      "Blockchain-based solution for tracking sustainable practices across global supply chains. Empowers consumers to make informed choices while helping businesses demonstrate their environmental commitment.",
    contributors: ["Uud", "Narin"],
    impact: ["Partnered with 50+ companies", "Reduced carbon footprint by 30%", "Won Green Tech Award"],
    tags: ["Sustainability", "Blockchain", "Web"],
    status: "Active",
  },
  {
    id: 3,
    title: "Mental Health Support Bot",
    description:
      "AI-powered chatbot providing 24/7 mental health support and resources. Designed with empathy and privacy at its core to help individuals during difficult times.",
    contributors: ["Narin", "Rakha"],
    impact: ["Helped 5k+ individuals", "99% positive feedback", "Integrated with healthcare systems"],
    tags: ["AI", "Healthcare", "Mobile"],
    status: "Active",
  },
  {
    id: 4,
    title: "Community Garden Network",
    description:
      "Digital platform connecting urban communities to create and maintain shared garden spaces. Promotes food security, environmental awareness, and community building.",
    contributors: ["Umar", "Uud"],
    impact: ["200+ gardens created", "Improved food access for 1k+ families", "Featured in local news"],
    tags: ["Sustainability", "Web", "Community"],
    status: "Completed",
  },
  {
    id: 5,
    title: "Open Source Learning Management",
    description:
      "Free, open-source LMS designed for developing countries. Provides essential educational tools without the high costs, making learning accessible to underserved communities.",
    contributors: ["Rakha", "Umar", "Narin"],
    impact: ["Used in 25+ schools", "Saved $100k+ in licensing fees", "Translated to 8 languages"],
    tags: ["Education", "Web", "Open Source"],
    status: "Active",
  },
  {
    id: 6,
    title: "Climate Data Visualization",
    description:
      "Interactive dashboard making climate data accessible and understandable for policymakers and citizens. Transforms complex environmental data into actionable insights.",
    contributors: ["Uud", "Narin"],
    impact: ["Used by 10+ governments", "Influenced 5 policy changes", "1M+ data points visualized"],
    tags: ["Sustainability", "Data", "Web"],
    status: "Active",
  },
]

const allTags = [
  "All",
  "AI",
  "Web",
  "Sustainability",
  "Education",
  "Healthcare",
  "Blockchain",
  "Mobile",
  "Community",
  "Open Source",
  "Data",
]

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState("All")
  const [visibleProjects, setVisibleProjects] = useState(6)

  const filteredProjects =
    selectedTag === "All" ? projects : projects.filter((project) => project.tags.includes(selectedTag))

  const displayedProjects = filteredProjects.slice(0, visibleProjects)

  const loadMore = () => {
    setVisibleProjects((prev) => prev + 6)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            Our <span className="instrument font-medium">Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover the solutions we've built to make a positive impact on the world. Each project represents our
            commitment to innovation and social good.
          </p>
        </div>
      </section>

      {/* Filter Tags */}
      <section className="py-8 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
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

      {/* Projects Grid */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
              <div key={project.id} className="bg-card rounded-lg border border-border overflow-hidden">
                {/* Project Image Placeholder */}
                <div className="w-full h-48 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Project Screenshot</span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-card-foreground">{project.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "Active"
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Contributors:</p>
                    <p className="text-xs font-medium text-card-foreground">{project.contributors.join(", ")}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Impact:</p>
                    <ul className="text-xs text-card-foreground space-y-1">
                      {project.impact.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-accent rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 2 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                          +{project.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <button className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {filteredProjects.length > visibleProjects && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              >
                Load More Projects
              </button>
            </div>
          )}

          {/* No Projects Message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found for the selected filter.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
