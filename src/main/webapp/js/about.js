/**
 * About Page JavaScript
 * Handles testimonial slider and other interactive elements
 */

document.addEventListener("DOMContentLoaded", () => {
  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialDots = document.querySelectorAll(".testimonial-dot")
  let currentSlide = 0
  let slideInterval

  /**
   * Initialize the about page
   */
  function initAboutPage() {
    setupEventListeners()
    startSlideshow()
  }

  /**
   * Set up all event listeners
   */
  function setupEventListeners() {
    // Testimonial dots click
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index)
      })
    })

    // Pause slideshow on hover
    const testimonialSlider = document.querySelector(".testimonials-slider")
    if (testimonialSlider) {
      testimonialSlider.addEventListener("mouseenter", () => {
        clearInterval(slideInterval)
      })

      testimonialSlider.addEventListener("mouseleave", () => {
        startSlideshow()
      })
    }

    // Timeline animation on scroll
    window.addEventListener("scroll", animateOnScroll)
  }

  /**
   * Show a specific testimonial slide
   * @param {number} index - The index of the slide to show
   */
  function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Deactivate all dots
    testimonialDots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show the selected slide
    testimonialSlides[index].classList.add("active")
    testimonialDots[index].classList.add("active")

    // Update current slide index
    currentSlide = index
  }

  /**
   * Start the testimonial slideshow
   */
  function startSlideshow() {
    // Clear any existing interval
    clearInterval(slideInterval)

    // Set up new interval
    slideInterval = setInterval(() => {
      // Calculate next slide index
      const nextSlide = (currentSlide + 1) % testimonialSlides.length
      showSlide(nextSlide)
    }, 5000) // Change slide every 5 seconds
  }

  /**
   * Animate elements when they come into view
   */
  function animateOnScroll() {
    // Timeline items animation
    const timelineItems = document.querySelectorAll(".timeline-item")

    timelineItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (itemTop < windowHeight * 0.8) {
        item.classList.add("animate")
      }
    })

    // Value items animation
    const valueItems = document.querySelectorAll(".value-item")

    valueItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (itemTop < windowHeight * 0.8) {
        item.classList.add("animate")
      }
    })
  }

  // Initialize the about page
  initAboutPage()
})
