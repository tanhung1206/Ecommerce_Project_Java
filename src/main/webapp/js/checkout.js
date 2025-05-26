/**
 * Checkout Page JavaScript
 * Handles form validation, step navigation, and dynamic updates
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const checkoutSteps = document.querySelectorAll(".checkout-step")
  const progressSteps = document.querySelectorAll(".progress-step")
  const progressLines = document.querySelectorAll(".progress-line")
  const forms = {
    contact: document.getElementById("contact-form"),
    shipping: document.getElementById("shipping-form"),
    payment: document.getElementById("payment-form"),
    review: document.getElementById("review-form"),
  }
  const backButtons = document.querySelectorAll(".back-btn")
  const editButtons = document.querySelectorAll(".edit-btn")
  const billingSameCheckbox = document.getElementById("billing-same")
  const billingAddressContainer = document.getElementById("billing-address-container")
  const shippingMethodRadios = document.querySelectorAll('input[name="shipping-method"]')
  const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]')
  const paymentMethodContents = document.querySelectorAll(".payment-method-content")
  const summaryToggle = document.querySelector(".toggle-summary")
  const summaryHeader = document.querySelector(".summary-header")
  const shippingCost = document.getElementById("shipping-cost")
  const orderTotal = document.getElementById("order-total")

  // Current step tracker
  let currentStep = 1

  /**
   * Initialize the checkout page
   */
  function initCheckout() {
    setupEventListeners()
    setupFormValidation()
    updateOrderSummary()
  }

  /**
   * Set up all event listeners
   */
  function setupEventListeners() {
    // Form submissions
    if (forms.contact) {
      forms.contact.addEventListener("submit", (e) => {
        e.preventDefault()
        if (validateForm(forms.contact)) {
          goToStep(2)
        }
      })
    }

    if (forms.shipping) {
      forms.shipping.addEventListener("submit", (e) => {
        e.preventDefault()
        if (validateForm(forms.shipping)) {
          goToStep(3)
        }
      })
    }

    if (forms.payment) {
      forms.payment.addEventListener("submit", (e) => {
        e.preventDefault()
        if (validateForm(forms.payment)) {
          goToStep(4)
        }
      })
    }

    if (forms.review) {
      forms.review.addEventListener("submit", (e) => {
        e.preventDefault()
        if (validateForm(forms.review)) {
          completeOrder()
        }
      })
    }

    // Back buttons
    backButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const step = Number.parseInt(button.getAttribute("data-step"))
        goToStep(step)
      })
    })

    // Edit buttons
    editButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const step = Number.parseInt(button.getAttribute("data-step"))
        goToStep(step)
      })
    })

    // Billing address toggle
    if (billingSameCheckbox) {
      billingSameCheckbox.addEventListener("change", () => {
        billingAddressContainer.style.display = billingSameCheckbox.checked ? "none" : "block"
      })
    }

    // Shipping method selection
    shippingMethodRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        updateShippingCost(radio.value)
      })
    })

    // Payment method selection
    paymentMethodRadios.forEach((radio, index) => {
      radio.addEventListener("change", () => {
        // Hide all payment method contents
        paymentMethodContents.forEach((content) => {
          content.style.display = "none"
        })

        // Show the selected payment method content
        if (paymentMethodContents[index]) {
          paymentMethodContents[index].style.display = "block"
        }
      })
    })

    // Order summary toggle (mobile)
    if (summaryToggle) {
      summaryToggle.addEventListener("click", () => {
        summaryHeader.classList.toggle("active")
        summaryToggle.classList.toggle("active")
      })
    }
  }

  /**
   * Set up form validation
   */
  function setupFormValidation() {
    // Add blur event listeners to required inputs
    const requiredInputs = document.querySelectorAll("input[required], select[required]")

    requiredInputs.forEach((input) => {
      input.addEventListener("blur", () => {
        validateInput(input)
      })

      input.addEventListener("input", () => {
        // Clear error when user starts typing
        const errorElement = input.nextElementSibling
        if (errorElement && errorElement.classList.contains("error-message")) {
          errorElement.textContent = ""
        }
      })
    })
  }

  /**
   * Validate a specific input field
   * @param {HTMLElement} input - The input element to validate
   * @returns {boolean} - Whether the input is valid
   */
  function validateInput(input) {
    const errorElement = input.nextElementSibling
    let isValid = true

    if (input.value.trim() === "") {
      if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.textContent = "This field is required"
      }
      isValid = false
    } else {
      // Validate specific input types
      if (input.type === "email" && !isValidEmail(input.value)) {
        if (errorElement && errorElement.classList.contains("error-message")) {
          errorElement.textContent = "Please enter a valid email address"
        }
        isValid = false
      } else if (input.id === "phone" && !isValidPhone(input.value)) {
        if (errorElement && errorElement.classList.contains("error-message")) {
          errorElement.textContent = "Please enter a valid phone number"
        }
        isValid = false
      } else if (input.id === "card-number" && !isValidCardNumber(input.value)) {
        if (errorElement && errorElement.classList.contains("error-message")) {
          errorElement.textContent = "Please enter a valid card number"
        }
        isValid = false
      } else if (input.id === "expiry-date" && !isValidExpiryDate(input.value)) {
        if (errorElement && errorElement.classList.contains("error-message")) {
          errorElement.textContent = "Please enter a valid expiry date (MM/YY)"
        }
        isValid = false
      } else if (input.id === "cvv" && !isValidCVV(input.value)) {
        if (errorElement && errorElement.classList.contains("error-message")) {
          errorElement.textContent = "Please enter a valid security code"
        }
        isValid = false
      } else if (input.id === "zip" && !isValidZip(input.value)) {
        if (errorElement && errorElement.classList.contains("error-message")) {
          errorElement.textContent = "Please enter a valid ZIP code"
        }
        isValid = false
      }
    }

    // Visual feedback
    if (!isValid) {
      input.classList.add("error")
      input.classList.remove("success")
    } else {
      input.classList.remove("error")
      input.classList.add("success")
      if (errorElement) {
        errorElement.textContent = ""
      }
    }

    return isValid
  }

  /**
   * Validate an entire form
   * @param {HTMLFormElement} form - The form to validate
   * @returns {boolean} - Whether the form is valid
   */
  function validateForm(form) {
    const inputs = form.querySelectorAll("input[required], select[required]")
    let isValid = true

    inputs.forEach((input) => {
      if (!validateInput(input)) {
        isValid = false
      }
    })

    // Special case for terms checkbox in review step
    if (form.id === "review-form") {
      const termsCheckbox = document.getElementById("terms")
      const termsError = document.getElementById("terms-error")

      if (termsCheckbox && !termsCheckbox.checked) {
        if (termsError) {
          termsError.textContent = "You must agree to the Terms of Service and Privacy Policy"
        }
        isValid = false
      } else if (termsError) {
        termsError.textContent = ""
      }
    }

    return isValid
  }

  /**
   * Navigate to a specific step
   * @param {number} step - The step number to navigate to
   */
  function goToStep(step) {
    // Hide all steps
    checkoutSteps.forEach((stepElement) => {
      stepElement.classList.remove("active")
    })

    // Show the target step
    const targetStep = document.getElementById(`step-${step}`)
    if (targetStep) {
      targetStep.classList.add("active")
    }

    // Update progress indicators
    updateProgress(step)

    // Update current step tracker
    currentStep = step

    // Scroll to top of checkout section
    const checkoutSection = document.querySelector(".checkout-section")
    if (checkoutSection) {
      window.scrollTo({
        top: checkoutSection.offsetTop - 20,
        behavior: "smooth",
      })
    }
  }

  /**
   * Update the progress indicators
   * @param {number} currentStep - The current step number
   */
  function updateProgress(currentStep) {
    progressSteps.forEach((step, index) => {
      const stepNumber = index + 1

      if (stepNumber < currentStep) {
        // Previous steps are completed
        step.classList.add("completed")
        step.classList.remove("active")
      } else if (stepNumber === currentStep) {
        // Current step is active
        step.classList.add("active")
        step.classList.remove("completed")
      } else {
        // Future steps are inactive
        step.classList.remove("active")
        step.classList.remove("completed")
      }
    })

    // Update progress lines
    progressLines.forEach((line, index) => {
      if (index < currentStep - 1) {
        line.classList.add("active")
      } else {
        line.classList.remove("active")
      }
    })
  }

  /**
   * Update shipping cost and order total based on selected shipping method
   * @param {string} shippingMethod - The selected shipping method
   */
  function updateShippingCost(shippingMethod) {
    let cost = "Free"
    let costValue = 0

    if (shippingMethod === "express") {
      cost = "$9.99"
      costValue = 9.99
    } else if (shippingMethod === "next-day") {
      cost = "$14.99"
      costValue = 14.99
    }

    // Update shipping cost display
    if (shippingCost) {
      shippingCost.textContent = cost
    }

    // Update shipping method summary
    const shippingMethodSummary = document.getElementById("shipping-method-summary")
    if (shippingMethodSummary) {
      let methodName = "Standard Shipping"
      if (shippingMethod === "express") {
        methodName = "Express Shipping"
      } else if (shippingMethod === "next-day") {
        methodName = "Next Day Delivery"
      }

      shippingMethodSummary.textContent = `${methodName} · ${cost}`
    }

    // Update order total
    updateOrderTotal(costValue)
  }

  /**
   * Update the order total based on subtotal, shipping, and tax
   * @param {number} shippingCost - The shipping cost
   */
  function updateOrderTotal(shippingCost) {
    const subtotal = 409.97 // Hardcoded for demo
    const taxRate = 0.06 // 6% tax rate
    const tax = subtotal * taxRate
    const total = subtotal + shippingCost + tax

    if (orderTotal) {
      orderTotal.textContent = `$${total.toFixed(2)}`
    }
  }

  /**
   * Update the order summary with current information
   */
  function updateOrderSummary() {
    // This would typically fetch the latest cart data
    // For this demo, we're using hardcoded values
  }

  /**
   * Complete the order and show confirmation
   */
  function completeOrder() {
    // Hide all steps
    checkoutSteps.forEach((stepElement) => {
      stepElement.classList.remove("active")
    })

    // Show confirmation
    const confirmationStep = document.getElementById("confirmation")
    if (confirmationStep) {
      confirmationStep.classList.add("active")
    }

    // Scroll to top of checkout section
    const checkoutSection = document.querySelector(".checkout-section")
    if (checkoutSection) {
      window.scrollTo({
        top: checkoutSection.offsetTop - 20,
        behavior: "smooth",
      })
    }
  }

  /**
   * Validation helper functions
   */
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  function isValidPhone(phone) {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    return re.test(phone)
  }

  function isValidCardNumber(cardNumber) {
    // Remove spaces and dashes
    const cleanedNumber = cardNumber.replace(/[\s-]/g, "")
    // Check if it contains only digits and has a valid length
    return /^\d{13,19}$/.test(cleanedNumber)
  }

  function isValidExpiryDate(expiryDate) {
    // Check format MM/YY
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return false
    }

    const [month, year] = expiryDate.split("/")
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100 // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1 // 1-12

    // Convert to numbers
    const monthNum = Number.parseInt(month, 10)
    const yearNum = Number.parseInt(year, 10)

    // Check if month is valid
    if (monthNum < 1 || monthNum > 12) {
      return false
    }

    // Check if date is in the future
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return false
    }

    return true
  }

  function isValidCVV(cvv) {
    // CVV is typically 3-4 digits
    return /^\d{3,4}$/.test(cvv)
  }

  function isValidZip(zip) {
    // US ZIP code (5 digits or 5+4)
    return /^\d{5}(-\d{4})?$/.test(zip)
  }

  // Initialize the checkout page
  initCheckout()
})
