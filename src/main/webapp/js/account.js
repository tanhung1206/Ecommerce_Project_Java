document.addEventListener("DOMContentLoaded", () => {
  // Profile Page - Edit Personal Info
  const editPersonalInfoBtn = document.getElementById("edit-personal-info")
  const cancelPersonalInfoBtn = document.getElementById("cancel-personal-info")
  const personalInfoView = document.getElementById("personal-info-view")
  const personalInfoEdit = document.getElementById("personal-info-edit")

  if (editPersonalInfoBtn && cancelPersonalInfoBtn && personalInfoView && personalInfoEdit) {
    editPersonalInfoBtn.addEventListener("click", () => {
      personalInfoView.style.display = "none"
      personalInfoEdit.style.display = "block"
    })

    cancelPersonalInfoBtn.addEventListener("click", () => {
      personalInfoView.style.display = "block"
      personalInfoEdit.style.display = "none"
    })

    // Form submission
    const personalInfoForm = personalInfoEdit.closest("form")
    if (personalInfoForm) {
      personalInfoForm.addEventListener("submit", (e) => {
        e.preventDefault()
        // In a real application, this would send the form data to the server
        // For this demo, we'll just show an alert and switch back to view mode
        alert("Personal information updated successfully!")
        personalInfoView.style.display = "block"
        personalInfoEdit.style.display = "none"
      })
    }
  }

  // Profile Page - Edit Password
  const editPasswordBtn = document.getElementById("edit-password")
  const cancelPasswordBtn = document.getElementById("cancel-password")
  const passwordView = document.getElementById("password-view")
  const passwordEdit = document.getElementById("password-edit")

  if (editPasswordBtn && cancelPasswordBtn && passwordView && passwordEdit) {
    editPasswordBtn.addEventListener("click", () => {
      passwordView.style.display = "none"
      passwordEdit.style.display = "block"
    })

    cancelPasswordBtn.addEventListener("click", () => {
      passwordView.style.display = "block"
      passwordEdit.style.display = "none"
    })

    // Form submission
    const passwordForm = passwordEdit.closest("form")
    if (passwordForm) {
      passwordForm.addEventListener("submit", (e) => {
        e.preventDefault()
        // In a real application, this would send the form data to the server
        // For this demo, we'll just show an alert and switch back to view mode
        alert("Password updated successfully!")
        passwordView.style.display = "block"
        passwordEdit.style.display = "none"
      })
    }
  }

  // Profile Page - Edit Preferences
  const editPreferencesBtn = document.getElementById("edit-preferences")
  const cancelPreferencesBtn = document.getElementById("cancel-preferences")
  const preferencesView = document.getElementById("preferences-view")
  const preferencesEdit = document.getElementById("preferences-edit")

  if (editPreferencesBtn && cancelPreferencesBtn && preferencesView && preferencesEdit) {
    editPreferencesBtn.addEventListener("click", () => {
      preferencesView.style.display = "none"
      preferencesEdit.style.display = "block"
    })

    cancelPreferencesBtn.addEventListener("click", () => {
      preferencesView.style.display = "block"
      preferencesEdit.style.display = "none"
    })

    // Form submission
    const preferencesForm = preferencesEdit.closest("form")
    if (preferencesForm) {
      preferencesForm.addEventListener("submit", (e) => {
        e.preventDefault()
        // In a real application, this would send the form data to the server
        // For this demo, we'll just show an alert and switch back to view mode
        alert("Communication preferences updated successfully!")
        preferencesView.style.display = "block"
        preferencesEdit.style.display = "none"
      })
    }
  }

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
  const newPasswordInput = document.getElementById("new-password")
  const strengthSegments = document.querySelectorAll(".strength-segment")
  const strengthText = document.querySelector(".strength-text")

  if (newPasswordInput && strengthSegments.length) {
    newPasswordInput.addEventListener("input", function () {
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

  // Delete Account Button
  const deleteAccountBtn = document.querySelector(".btn-danger")

  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        // In a real application, this would send a request to the server
        // For this demo, we'll just show an alert and redirect
        alert("Account deleted successfully!")
        window.location.href = "index.html"
      }
    })
  }

  // Avatar Upload Modal
  const changeAvatarBtn = document.querySelector(".change-avatar-btn")
  const avatarModal = document.getElementById("avatar-modal")
  const modalClose = document.querySelector(".modal-close")
  const modalCancel = document.querySelector(".modal-cancel")
  const modalSave = document.querySelector(".modal-save")
  const overlay = document.querySelector(".overlay")

  if (changeAvatarBtn && avatarModal) {
    changeAvatarBtn.addEventListener("click", () => {
      avatarModal.classList.add("active")
      overlay.classList.add("active")
      document.body.style.overflow = "hidden"
    })

    const closeModal = () => {
      avatarModal.classList.remove("active")
      overlay.classList.remove("active")
      document.body.style.overflow = ""
    }

    if (modalClose) modalClose.addEventListener("click", closeModal)
    if (modalCancel) modalCancel.addEventListener("click", closeModal)
    if (overlay) overlay.addEventListener("click", closeModal)

    if (modalSave) {
      modalSave.addEventListener("click", () => {
        // In a real application, this would upload the image to the server
        // For this demo, we'll just show an alert and close the modal
        alert("Profile picture updated successfully!")
        closeModal()
      })
    }

    // Avatar Upload Preview
    const avatarInput = document.getElementById("avatar-input")
    const avatarPreview = document.querySelector(".avatar-preview img")

    if (avatarInput && avatarPreview) {
      avatarInput.addEventListener("change", function () {
        if (this.files && this.files[0]) {
          const reader = new FileReader()
          reader.onload = (e) => {
            avatarPreview.src = e.target.result
          }
          reader.readAsDataURL(this.files[0])
        }
      })
    }
  }

  // Orders Page - View Order Details
  const viewDetailsButtons = document.querySelectorAll(".view-details")
  const orderDetailsModal = document.getElementById("order-details-modal")
  const orderDetailsClose = orderDetailsModal?.querySelector(".modal-close")

  if (viewDetailsButtons.length && orderDetailsModal) {
    viewDetailsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const orderId = button.getAttribute("data-order")
        // In a real application, this would fetch the order details from the server
        // For this demo, we'll just show the modal with hardcoded data
        orderDetailsModal.classList.add("active")
        overlay.classList.add("active")
        document.body.style.overflow = "hidden"
      })
    })

    const closeOrderDetailsModal = () => {
      orderDetailsModal.classList.remove("active")
      overlay.classList.remove("active")
      document.body.style.overflow = ""
    }

    if (orderDetailsClose) orderDetailsClose.addEventListener("click", closeOrderDetailsModal)
    if (overlay) overlay.addEventListener("click", closeOrderDetailsModal)
  }

  // Orders Page - Pagination
  const paginationNumbers = document.querySelectorAll(".pagination-number")
  const prevBtn = document.querySelector(".pagination-btn.prev")
  const nextBtn = document.querySelector(".pagination-btn.next")

  if (paginationNumbers.length) {
    paginationNumbers.forEach((number) => {
      number.addEventListener("click", function () {
        // Remove active class from all numbers
        paginationNumbers.forEach((num) => num.classList.remove("active"))

        // Add active class to clicked number
        this.classList.add("active")

        // Enable/disable prev/next buttons
        if (this.textContent === "1") {
          prevBtn.disabled = true
        } else {
          prevBtn.disabled = false
        }

        if (this.textContent === "3") {
          nextBtn.disabled = true
        } else {
          nextBtn.disabled = false
        }

        // In a real application, this would fetch the orders for the selected page
        // For this demo, we'll just scroll to the top of the orders list
        document.querySelector(".orders-list").scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      })
    })

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const activeNumber = document.querySelector(".pagination-number.active")
        const prevNumber = activeNumber.previousElementSibling

        if (prevNumber && prevNumber.classList.contains("pagination-number")) {
          prevNumber.click()
        }
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const activeNumber = document.querySelector(".pagination-number.active")
        const nextNumber = activeNumber.nextElementSibling

        if (nextNumber && nextNumber.classList.contains("pagination-number")) {
          nextNumber.click()
        }
      })
    }
  }

  // Orders Page - Filter
  const orderFilter = document.querySelector(".orders-filter select")

  if (orderFilter) {
    orderFilter.addEventListener("change", function () {
      const status = this.value
      // In a real application, this would filter the orders based on the selected status
      // For this demo, we'll just show an alert
      if (status === "all") {
        alert("Showing all orders")
      } else {
        alert(`Showing ${status} orders`)
      }
    })
  }

  // Orders Page - Search
  const orderSearch = document.querySelector(".orders-search")

  if (orderSearch) {
    orderSearch.addEventListener("submit", (e) => {
      e.preventDefault()
      const searchInput = orderSearch.querySelector("input")
      const searchTerm = searchInput.value.trim()

      if (searchTerm) {
        // In a real application, this would search for orders matching the search term
        // For this demo, we'll just show an alert
        alert(`Searching for orders matching "${searchTerm}"`)
      }
    })
  }
})
