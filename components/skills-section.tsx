"use client"

import { useEffect, useRef, useState } from "react"

const skills = [
  { name: "HTML", percentage: 95, color: { from: "#3b82f6", to: "#06b6d4" } },
  { name: "CSS", percentage: 90, color: { from: "#a855f7", to: "#ec4899" } },
  { name: "JavaScript", percentage: 85, color: { from: "#eab308", to: "#f97316" } },
  { name: "AI Prompting", percentage: 80, color: { from: "#22c55e", to: "#10b981" } },
  { name: "Web Development", percentage: 88, color: { from: "#6366f1", to: "#a855f7" } },
]

function CircularProgress({ skill, index }: { skill: (typeof skills)[0]; index: number }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= skill.percentage) {
              clearInterval(interval)
              return skill.percentage
            }
            return prev + 1
          })
        }, 20)
        return () => clearInterval(interval)
      }, index * 200)
      return () => clearTimeout(timer)
    }
  }, [isVisible, skill.percentage, index])

  const circumference = 2 * Math.PI * 70
  const offset = circumference - (progress / 100) * circumference

  return (
    <div ref={ref} className="flex flex-col items-center group">
      <div className="relative w-48 h-48">
        <svg className="transform -rotate-90 w-48 h-48">
          {/* Background circle */}
          <circle cx="96" cy="96" r="70" stroke="currentColor" strokeWidth="12" fill="none" className="text-muted/20" />
          {/* Progress circle */}
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke={`url(#gradient-${index})`}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out drop-shadow-[0_0_15px_rgba(99,102,241,0.8)] group-hover:drop-shadow-[0_0_25px_rgba(99,102,241,1)]"
          />
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={skill.color.from} />
              <stop offset="100%" stopColor={skill.color.to} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            {progress}%
          </span>
          <span className="text-sm font-medium text-muted-foreground mt-1">{skill.name}</span>
        </div>
      </div>
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-20 bg-card/30">
      <div className="container max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center neon-text bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
          My Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 justify-items-center">
          {skills.map((skill, index) => (
            <CircularProgress key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
