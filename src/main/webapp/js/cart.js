document.addEventListener("DOMContentLoaded", () => {
  // Quantity Selectors
  const quantityInputs = document.querySelectorAll(".quantity-selector input")
  const minusButtons = document.querySelectorAll(".quantity-btn.minus")
  const plusButtons = document.querySelectorAll(".quantity-btn.plus")

  // Initialize quantity selectors
  minusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const input = quantityInputs[index]
      const currentValue = Number.parseInt(input.value)
      if (currentValue > 1) {
        input.value = currentValue - 1
        updateSubtotal(index)
      }
    })
  })

  plusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const input = quantityInputs[index]
      const currentValue = Number.parseInt(input.value)
      const max = Number.parseInt(input.getAttribute("max"))
      if (currentValue < max) {
        input.value = currentValue + 1
        updateSubtotal(index)
      }
    })
  })

  quantityInputs.forEach((input, index) => {
    input.addEventListener("change", () => {
      const value = Number.parseInt(input.value)
      const min = Number.parseInt(input.getAttribute("min"))
      const max = Number.parseInt(input.getAttribute("max"))

      if (value < min) {
        input.value = min
      } else if (value > max) {
        input.value = max
      }

      updateSubtotal(index)
    })
  })

  // Update subtotal when quantity changes
  function updateSubtotal(index) {
    const cartItems = document.querySelectorAll(".cart-item")
    const cartItem = cartItems[index]
    const priceElement = cartItem.querySelector(".cart-item-price")
    const quantityInput = cartItem.querySelector(".quantity-selector input")
    const subtotalElement = cartItem.querySelector(".cart-item-subtotal")

    const price = Number.parseFloat(priceElement.textContent.replace("$", ""))
    const quantity = Number.parseInt(quantityInput.value)
    const subtotal = price * quantity

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`

    // In a real application, this would also update the cart total
    // For this demo, we'll keep the hardcoded values
  }

  // Remove item from cart
  const removeButtons = document.querySelectorAll(".remove-item")

  removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const cartItems = document.querySelectorAll(".cart-item")
      const cartItem = cartItems[index]

      // Add fade-out animation
      cartItem.style.transition = "opacity 0.3s ease"
      cartItem.style.opacity = "0"

      // Remove the item after animation completes
      setTimeout(() => {
        cartItem.remove()

        // Check if cart is empty
        const remainingItems = document.querySelectorAll(".cart-item")
        if (remainingItems.length === 0) {
          document.querySelector(".cart-container").style.display = "none"
          document.querySelector(".empty-cart").style.display = "block"
        }

        // In a real application, this would also update the cart total and item count
        // For this demo, we'll keep the hardcoded values
      }, 300)
    })
  })

  // Continue Shopping Button
  const continueShoppingBtn = document.querySelector(".continue-shopping")

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
      window.location.href = "products.html"
    })
  }

  // Update Cart Button
  const updateCartBtn = document.querySelector(".update-cart")

  if (updateCartBtn) {
    updateCartBtn.addEventListener("click", () => {
      // In a real application, this would send the updated quantities to the server
      // For this demo, we'll just show an alert
      alert("Cart updated successfully!")
    })
  }

  // Shipping Options
  const shippingOptions = document.querySelectorAll('input[name="shipping"]')

  shippingOptions.forEach((option) => {
    option.addEventListener("change", () => {
      // In a real application, this would update the shipping cost and total
      // For this demo, we'll keep the hardcoded values
    })
  })

  // Apply Coupon Button
  const applyCouponBtn = document.querySelector(".coupon-input button")

  if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", () => {
      const couponInput = document.querySelector(".coupon-input input")
      const couponCode = couponInput.value.trim()

      if (couponCode) {
        // In a real application, this would validate the coupon and apply the discount
        // For this demo, we'll just show an alert
        alert(`Coupon code "${couponCode}" applied!`)
        couponInput.value = ""
      } else {
        alert("Please enter a coupon code.")
      }
    })
  }

  // Checkout Button
  const checkoutBtn = document.querySelector(".checkout-btn")

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      // In a real application, this would redirect to the checkout page
      // For this demo, we'll just show an alert
      alert("Proceeding to checkout...")
    })
  }
})
