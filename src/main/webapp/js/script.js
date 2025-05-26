document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")
  const overlay = document.querySelector(".overlay")
  const closeMenu = document.querySelector(".mobile-menu-close")

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active")
    overlay.classList.add("active")
    document.body.style.overflow = "hidden"
  })

  function closeMenuFunction() {
    mobileMenu.classList.remove("active")
    overlay.classList.remove("active")
    document.body.style.overflow = ""
  }

  closeMenu.addEventListener("click", closeMenuFunction)
  overlay.addEventListener("click", closeMenuFunction)

  // Product Actions Animation
  const addToCartButtons = document.querySelectorAll(".add-to-cart")

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      // Create a small circle element
      const circle = document.createElement("div")
      circle.classList.add("cart-animation")
      circle.style.width = "20px"
      circle.style.height = "20px"
      circle.style.backgroundColor = "#3498db"
      circle.style.borderRadius = "50%"
      circle.style.position = "absolute"
      circle.style.zIndex = "100"

      // Position the circle at the button's position
      const buttonRect = this.getBoundingClientRect()
      circle.style.top = `${buttonRect.top + window.scrollY}px`
      circle.style.left = `${buttonRect.left + window.scrollX}px`

      document.body.appendChild(circle)

      // Get the cart icon position
      const cartIcon = document.querySelector(".cart-icon")
      const cartRect = cartIcon.getBoundingClientRect()

      // Animate the circle to the cart
      circle.style.transition = "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)"
      circle.style.top = `${cartRect.top + window.scrollY}px`
      circle.style.left = `${cartRect.left + window.scrollX}px`
      circle.style.opacity = "0"
      circle.style.transform = "scale(0.5)"

      // Update cart count
      setTimeout(() => {
        const cartCount = document.querySelector(".cart-count")
        cartCount.textContent = Number.parseInt(cartCount.textContent) + 1

        // Remove the circle element
        document.body.removeChild(circle)
      }, 800)
    })
  })

  // Newsletter Form Submission
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value

      if (email) {
        // Show success message (in a real app, you would send this to a server)
        alert("Thank you for subscribing to our newsletter!")
        emailInput.value = ""
      }
    })
  }

  // Smooth Scroll for Navigation Links
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href !== "#") {
        e.preventDefault()
        const targetElement = document.querySelector(href)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })

          // Close mobile menu if open
          if (mobileMenu.classList.contains("active")) {
            closeMenuFunction()
          }
        }
      }
    })
  })
})
