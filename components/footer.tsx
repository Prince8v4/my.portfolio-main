import { Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ]

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Social Media Icons */}
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center hover:from-neon-purple hover:to-neon-pink transition-all duration-300 hover:scale-110 neon-glow"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6 text-primary-foreground" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Prince Kumar. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70">Built with passion and modern web technologies</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
