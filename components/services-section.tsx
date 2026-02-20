"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Sparkles } from "lucide-react"

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Building responsive, modern websites and web applications using the latest technologies and best practices.",
    gradient: "from-neon-blue to-neon-purple",
  },
  {
    icon: Sparkles,
    title: "AI Prompting",
    description:
      "Crafting effective AI prompts and integrating AI capabilities to enhance user experiences and automate workflows.",
    gradient: "from-neon-purple to-neon-pink",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center neon-text bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
          My Services
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-2 border-primary/30 bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-500 hover:scale-105 hover:neon-glow"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <CardHeader>
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
