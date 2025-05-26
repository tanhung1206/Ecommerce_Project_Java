document.addEventListener("DOMContentLoaded", () => {
  // Toggle Password Visibility
  const togglePasswordButtons = document.querySelectorAll(".toggle-password")

  togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.previousElementSibling
      const icon = this.querySelector("i")

      if (input.type === "password") {
        input.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        input.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  })

  // Password Strength Meter
  const passwordInput = document.getElementById("password")
  const strengthSegments = document.querySelectorAll(".strength-segment")
  const strengthText = document.querySelector(".strength-text")

  if (passwordInput && strengthSegments.length) {
    passwordInput.addEventListener("input", function () {
      const password = this.value
      let strength = 0

      // Check password length
      if (password.length >= 8) {
        strength += 1
      }

      // Check for mixed case
      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
        strength += 1
      }

      // Check for numbers
      if (password.match(/\d/)) {
        strength += 1
      }

      // Check for special characters
      if (password.match(/[^a-zA-Z\d]/)) {
        strength += 1
      }

      // Update strength meter
      strengthSegments.forEach((segment, index) => {
        segment.className = "strength-segment"
        if (index < strength) {
          if (strength === 1) {
            segment.classList.add("weak")
          } else if (strength === 2 || strength === 3) {
            segment.classList.add("medium")
          } else {
            segment.classList.add("strong")
          }
        }
      })

      // Update strength text
      if (password.length === 0) {
        strengthText.textContent = "Password strength"
      } else if (strength < 2) {
        strengthText.textContent = "Weak password"
      } else if (strength < 4) {
        strengthText.textContent = "Medium password"
      } else {
        strengthText.textContent = "Strong password"
      }
    })
  }

  // Form Validation
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")

  // Login Form Validation
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      // e.preventDefault()
      let isValid = true

      // Email validation
      const emailInput = document.getElementById("email")
      const emailError = document.getElementById("email-error")
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailInput.value.trim()) {
        emailError.textContent = "Email is required"
        emailInput.parentElement.classList.add("error")
        isValid = false
      } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address"
        emailInput.parentElement.classList.add("error")
        isValid = false
      } else {
        emailError.textContent = ""
        emailInput.parentElement.classList.remove("error")
        emailInput.parentElement.classList.add("success")
      }

      // Password validation
      const passwordInput = document.getElementById("password")
      const passwordError = document.getElementById("password-error")

      if (!passwordInput.value) {
        passwordError.textContent = "Password is required"
        passwordInput.parentElement.classList.add("error")
        isValid = false
      } else if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters"
        passwordInput.parentElement.classList.add("error")
        isValid = false
      } else {
        passwordError.textContent = ""
        passwordInput.parentElement.classList.remove("error")
        passwordInput.parentElement.classList.add("success")
      }

      // If form is valid, submit
      if (!isValid) {
        // In a real application, this would send the form data to the server
        // For this demo, we'll just show an alert and redirect
        // alert("Login successful!")
        // window.location.href = "index.html"
        e.preventDefault();
      }
    })
  }

  // Register Form Validation
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      // e.preventDefault()
      let isValid = true

      // First name validation
      // const firstNameInput = document.getElementById("first-name")
      // const firstNameError = document.getElementById("first-name-error")

      // if (!firstNameInput.value.trim()) {
      //   firstNameError.textContent = "First name is required"
      //   firstNameInput.parentElement.classList.add("error")
      //   isValid = false
      // } else {
      //   firstNameError.textContent = ""
      //   firstNameInput.parentElement.classList.remove("error")
      //   firstNameInput.parentElement.classList.add("success")
      // }

      // Last name validation
      // const lastNameInput = document.getElementById("last-name")
      // const lastNameError = document.getElementById("last-name-error")
      //
      // if (!lastNameInput.value.trim()) {
      //   lastNameError.textContent = "Last name is required"
      //   lastNameInput.parentElement.classList.add("error")
      //   isValid = false
      // } else {
      //   lastNameError.textContent = ""
      //   lastNameInput.parentElement.classList.remove("error")
      //   lastNameInput.parentElement.classList.add("success")
      // }
      const fullNameInput=document.getElementById("full-name");
      const fullNameError=document.getElementById("full-name-error");

      if (!fullNameInput.value.trim()) {
        fullNameError.textContent = "Full name is required"
        fullNameInput.parentElement.classList.add("error")
        isValid = false
      } else {
        fullNameError.textContent = ""
        fullNameInput.parentElement.classList.remove("error")
        fullNameInput.parentElement.classList.add("success")
      }


      // Email validation
      const emailInput = document.getElementById("email")
      const emailError = document.getElementById("email-error")
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailInput.value.trim()) {
        emailError.textContent = "Email is required"
        emailInput.parentElement.classList.add("error")
        isValid = false
      } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address"
        emailInput.parentElement.classList.add("error")
        isValid = false
      } else {
        emailError.textContent = ""
        emailInput.parentElement.classList.remove("error")
        emailInput.parentElement.classList.add("success")
      }

      // Password validation
      const passwordInput = document.getElementById("password")
      const passwordError = document.getElementById("password-error")

      if (!passwordInput.value) {
        passwordError.textContent = "Password is required"
        passwordInput.parentElement.classList.add("error")
        isValid = false
      } else if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters"
        passwordInput.parentElement.classList.add("error")
        isValid = false
      } else {
        passwordError.textContent = ""
        passwordInput.parentElement.classList.remove("error")
        passwordInput.parentElement.classList.add("success")
      }

      // Confirm password validation
      const confirmPasswordInput = document.getElementById("confirm-password")
      const confirmPasswordError = document.getElementById("confirm-password-error")

      if (!confirmPasswordInput.value) {
        confirmPasswordError.textContent = "Please confirm your password"
        confirmPasswordInput.parentElement.classList.add("error")
        isValid = false
      } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = "Passwords do not match"
        confirmPasswordInput.parentElement.classList.add("error")
        isValid = false
      } else {
        confirmPasswordError.textContent = ""
        confirmPasswordInput.parentElement.classList.remove("error")
        confirmPasswordInput.parentElement.classList.add("success")
      }

      // // Terms checkbox validation
      // const termsCheckbox = document.getElementById("terms")
      // const termsError = document.getElementById("terms-error")
      //
      // if (!termsCheckbox.checked) {
      //   termsError.textContent = "You must agree to the Terms of Service and Privacy Policy"
      //   isValid = false
      // } else {
      //   termsError.textContent = ""
      // }

      // If form is valid, submit
      if (!isValid) {
        // In a real application, this would send the form data to the server
        // For this demo, we'll just show an alert and redirect
        // alert("Registration successful!")
        // window.location.href = "index.html"
        e.preventDefault();

      }
    })
  }

  // Social Auth Buttons
  // const socialAuthButtons = document.querySelectorAll(".social-auth-btn")

  // socialAuthButtons.forEach((button) => {
  //   button.addEventListener("click", function () {
  //     const provider = this.classList.contains("google") ? "Google" : "Facebook"
  //     // In a real application, this would initiate OAuth flow
  //     // For this demo, we'll just show an alert
  //     alert(`Sign in with ${provider} initiated!`)
  //   })
  // })

  // Forgot Password Link
  const forgotPasswordLink = document.querySelector(".forgot-password")

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault()
      // In a real application, this would redirect to a password reset page
      // For this demo, we'll just show an alert
      alert("Password reset functionality would be implemented here.")
    })
  }
})
