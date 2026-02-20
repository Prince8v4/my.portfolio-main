// Backend API URL (Change this to your Render/Railway URL after deployment)
const API_BASE_URL = 'https://my-portfolio-main-6cbj.onrender.com';

// const WEBHOOK_URL = "https://hook.eu2.make.com/uy4n9dgrlaqakthzik9jvtpyui3riuof" // Deprecated

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ==========================================
// VISITOR TRACKING (AUTOMATIC)
// ==========================================
async function trackVisit() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const ipAddress = data.ip;

    await fetch(`${API_BASE_URL}/api/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ipAddress: ipAddress,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      })
    });
    console.log('Visit tracked');
  } catch (error) {
    console.error('Error tracking visit:', error);
  }
}
document.addEventListener('DOMContentLoaded', trackVisit);


// Mobile menu toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navMenu = document.querySelector(".nav-menu")

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex"
  })
}

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 15, 0.95)"
  } else {
    navbar.style.background = "rgba(10, 10, 15, 0.8)"
  }
})



// Download Resume with Make.com logging
document.getElementById("downloadResume").addEventListener("click", async function () {

  const originalText = this.innerHTML

  try {
    // Log download to Make.com
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "resume_download",
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    })

    // Simulate resume download
    this.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg> Downloaded!'

    setTimeout(() => {
      this.innerHTML = originalText
    }, 2000)

    // In a real scenario, you would trigger an actual file download here
    console.log("Resume download initiated")
  } catch (error) {
    console.error("Error logging resume download:", error)
    this.innerHTML = originalText
  }
})

// Feedback Form Submission
document.getElementById("feedbackForm").addEventListener("submit", async function (e) {
  e.preventDefault()

  const submitButton = this.querySelector('button[type="submit"]')
  const btnText = submitButton.querySelector(".btn-text")
  const btnLoader = submitButton.querySelector(".btn-loader")
  const messageDiv = this.querySelector(".form-message")

  // Get form data
  const formData = {
    type: "feedback",
    name: this.querySelector("#feedback-name").value,
    email: this.querySelector("#feedback-email").value,
    message: this.querySelector("#feedback-message").value,
    timestamp: new Date().toISOString(),
  }

  // Show loading state
  submitButton.disabled = true
  btnText.style.display = "none"
  btnLoader.style.display = "inline-flex"
  messageDiv.style.display = "none"

  try {
    // Send to Backend API
    const response = await fetch(`${API_BASE_URL}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Backend expects: name, email, message
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message
      }),
    })

    if (response.ok) {
      messageDiv.textContent = "Thank you for your feedback! I'll get back to you soon."
      messageDiv.className = "form-message success"
      this.reset()
    } else {
      throw new Error("Failed to submit feedback")
    }
  } catch (error) {
    console.error("Error submitting feedback:", error)
    messageDiv.textContent = "Oops! Something went wrong. Please try again."
    messageDiv.className = "form-message error"
  } finally {
    submitButton.disabled = false
    btnText.style.display = "inline"
    btnLoader.style.display = "none"
  }
})

// Project Enquiry Form Submission
document.getElementById("enquiryForm").addEventListener("submit", async function (e) {
  e.preventDefault()

  const submitButton = this.querySelector('button[type="submit"]')
  const btnText = submitButton.querySelector(".btn-text")
  const btnLoader = submitButton.querySelector(".btn-loader")
  const messageDiv = this.querySelector(".form-message")

  // Get form data
  const formData = {
    type: "project_enquiry",
    name: this.querySelector("#enquiry-name").value,
    email: this.querySelector("#enquiry-email").value,
    projectType: this.querySelector("#enquiry-project").value,
    budget: this.querySelector("#enquiry-budget").value,
    details: this.querySelector("#enquiry-details").value,
    timestamp: new Date().toISOString(),
  }

  // Show loading state
  submitButton.disabled = true
  btnText.style.display = "none"
  btnLoader.style.display = "inline-flex"
  messageDiv.style.display = "none"

  try {
    // Send to Backend API
    const response = await fetch(`${API_BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Backend expects: name, email, projectType, budget, projectDetails- mapped from 'details'
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        budget: formData.budget,
        projectDetails: formData.details
      }),
    })

    if (response.ok) {
      messageDiv.textContent =
        "Thank you for your enquiry! I'll review your project details and get back to you within 24 hours."
      messageDiv.className = "form-message success"
      this.reset()
    } else {
      throw new Error("Failed to submit enquiry")
    }
  } catch (error) {
    console.error("Error submitting enquiry:", error)
    messageDiv.textContent = "Oops! Something went wrong. Please try again."
    messageDiv.className = "form-message error"
  } finally {
    submitButton.disabled = false
    btnText.style.display = "inline"
    btnLoader.style.display = "none"
  }
})

// Add scroll animations for sections
const sections = document.querySelectorAll(".section")
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px",
  },
)

sections.forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(20px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  sectionObserver.observe(section)
})
