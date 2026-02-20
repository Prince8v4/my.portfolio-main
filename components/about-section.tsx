"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"

export default function AboutSection() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadResume = async () => {
    setIsDownloading(true)

    // Log download to Make.com
    try {
      await fetch("https://hook.eu2.make.com/bwnlsnjvkbepc4lxebmjsfneffokjeka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "resume_download",
          timestamp: new Date().toISOString(),
          name: "Prince Kumar",
        }),
      })
    } catch (error) {
      console.error("Failed to log download:", error)
    }

    // Simulate resume download
    setTimeout(() => {
      setIsDownloading(false)
      // In production, trigger actual download here
      alert("Resume download logged! (Add your actual resume file to enable download)")
    }, 1000)
  }

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Profile Picture */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/50 neon-glow">
                <img src="/professional-portrait.png" alt="Prince Kumar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right side - Info */}
          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold neon-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                Prince Kumar
              </h1>
              <p className="text-xl text-muted-foreground">Web Developer & AI Prompt Engineer</p>
            </div>

            <p className="text-lg text-foreground/80 leading-relaxed">
              Passionate about creating innovative web solutions and leveraging AI technology to build exceptional
              digital experiences. Specializing in modern web development and AI-powered applications.
            </p>

            <Button
              size="lg"
              onClick={handleDownloadResume}
              disabled={isDownloading}
              className="rounded-full px-8 py-6 text-lg font-semibold bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink transition-all duration-300 hover:scale-105 neon-glow"
            >
              <Download className="mr-2 h-5 w-5" />
              {isDownloading ? "Downloading..." : "Download Resume"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
