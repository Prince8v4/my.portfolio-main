"use client"

import { ExternalLink } from "lucide-react"
import { useEffect, useRef } from "react"

export default function ProjectsSection() {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-spin-slow")
          }
        })
      },
      { threshold: 0.5 },
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-20 bg-card/30">
      <div className="container max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 neon-text bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          My Projects
        </h2>

        <div className="space-y-8">
          <div
            ref={imageRef}
            className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-primary/50 neon-glow transition-transform duration-1000"
            style={{ animation: "spin 20s linear infinite" }}
          >
            <img
              src="/modern-web-development-project-screenshot.jpg"
              alt="Prince Infra Pvt Ltd Project"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">Prince Infra Pvt Ltd</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive web solution showcasing modern design principles and cutting-edge development techniques.
            </p>
            <a
              href="https://princeinfrapvtltd.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 text-lg font-medium group"
            >
              Visit Project
              <ExternalLink className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  )
}
