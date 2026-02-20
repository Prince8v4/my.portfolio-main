"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function EnquirySection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectDetails: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://hook.eu2.make.com/bwnlsnjvkbepc4lxebmjsfneffokjeka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "project_enquiry",
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        toast({
          title: "Enquiry Submitted!",
          description: "I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", company: "", projectDetails: "" })
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit enquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="enquiry" className="min-h-screen flex items-center justify-center px-4 py-20 bg-card/30">
      <div className="container max-w-2xl">
        <Card className="border-2 border-secondary/30 bg-card/50 backdrop-blur-sm neon-glow">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Project Enquiry
            </CardTitle>
            <CardDescription className="text-base">Let's discuss your next project</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="enquiry-name" className="text-foreground">
                  Name
                </Label>
                <Input
                  id="enquiry-name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/50 border-secondary/30 focus:border-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enquiry-email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="enquiry-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50 border-secondary/30 focus:border-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">
                  Company (Optional)
                </Label>
                <Input
                  id="company"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-background/50 border-secondary/30 focus:border-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-details" className="text-foreground">
                  Project Details
                </Label>
                <Textarea
                  id="project-details"
                  placeholder="Tell me about your project..."
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  required
                  rows={5}
                  className="bg-background/50 border-secondary/30 focus:border-secondary resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-blue transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
