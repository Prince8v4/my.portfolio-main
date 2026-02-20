import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import ServicesSection from "@/components/services-section"
import SkillsSection from "@/components/skills-section"
import FeedbackSection from "@/components/feedback-section"
import EnquirySection from "@/components/enquiry-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <SkillsSection />
      <FeedbackSection />
      <EnquirySection />
      <Footer />
    </main>
  )
}
