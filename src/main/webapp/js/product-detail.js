document.addEventListener("DOMContentLoaded", () => {
  // Image Thumbnails
  const mainImage = document.getElementById("main-product-image")
  const thumbnails = document.querySelectorAll(".thumbnail")

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Update main image
      const imgSrc = this.getAttribute("data-img")
      mainImage.src = imgSrc

      // Update active thumbnail
      thumbnails.forEach((thumb) => thumb.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Quantity Selector
  const quantityInput = document.querySelector(".quantity-selector input")
  const minusBtn = document.querySelector(".quantity-btn.minus")
  const plusBtn = document.querySelector(".quantity-btn.plus")

  if (quantityInput && minusBtn && plusBtn) {
    minusBtn.addEventListener("click", () => {
      const currentValue = Number.parseInt(quantityInput.value)
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1
      }
    })

    plusBtn.addEventListener("click", () => {
      const currentValue = Number.parseInt(quantityInput.value)
      const max = Number.parseInt(quantityInput.getAttribute("max"))
      if (currentValue < max) {
        quantityInput.value = currentValue + 1
      }
    })

    quantityInput.addEventListener("change", () => {
      const value = Number.parseInt(quantityInput.value)
      const min = Number.parseInt(quantityInput.getAttribute("min"))
      const max = Number.parseInt(quantityInput.getAttribute("max"))

      if (value < min) {
        quantityInput.value = min
      } else if (value > max) {
        quantityInput.value = max
      }
    })
  }

  // Add to Cart Button
  const addToCartBtn = document.querySelector(".add-to-cart")

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      // In a real application, this would add the product to the cart
      // For this demo, we'll just show an alert
      alert("Product added to cart!")
    })
  }

  // Add to Wishlist Button
  // const addToWishlistBtn = document.querySelector(".add-to-wishlist")

  // if (addToWishlistBtn) {
  //   addToWishlistBtn.addEventListener("click", function () {
  //     // Toggle heart icon
  //     const heartIcon = this.querySelector("i")
  //     heartIcon.classList.toggle("far")
  //     heartIcon.classList.toggle("fas")
  //
  //     // In a real application, this would add/remove the product from the wishlist
  //     // For this demo, we'll just show an alert
  //     if (heartIcon.classList.contains("fas")) {
  //       alert("Product added to wishlist!")
  //     } else {
  //       alert("Product removed from wishlist!")
  //     }
  //   })
  // }

  // Product Tabs
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      // Update active tab button
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Show active tab content
      tabContents.forEach((content) => content.classList.remove("active"))
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Review Helpful Buttons
  // const helpfulButtons = document.querySelectorAll(".helpful-btn")

  // helpfulButtons.forEach((button) => {
  //   button.addEventListener("click", function () {
  //     // In a real application, this would send a request to the server
  //     // For this demo, we'll just update the count
  //     const countElement = this.textContent.match(/\d+/)
  //     if (countElement) {
  //       const count = Number.parseInt(countElement[0])
  //       this.innerHTML = this.innerHTML.replace(count, count + 1)
  //     }
  //   })
  // })

  // Related Products Slider
  const sliderPrevBtn = document.querySelector(".slider-btn.prev")
  const sliderNextBtn = document.querySelector(".slider-btn.next")
  const productsSlider = document.querySelector(".products-slider")

  if (sliderPrevBtn && sliderNextBtn && productsSlider) {
    sliderPrevBtn.addEventListener("click", () => {
      productsSlider.scrollBy({
        left: -300,
        behavior: "smooth",
      })
    })

    sliderNextBtn.addEventListener("click", () => {
      productsSlider.scrollBy({
        left: 300,
        behavior: "smooth",
      })
    })
  }

  // Write Review Button
  const writeReviewBtn = document.querySelector(".write-review")
  const reviewFormContainer = document.getElementById("reviewFormContainer")
  const cancelReviewBtn = document.getElementById("cancelReview")

  if (writeReviewBtn && reviewFormContainer) {
    writeReviewBtn.addEventListener("click", () => {
      reviewFormContainer.style.display = "block"
      writeReviewBtn.style.display = "none"

      // Scroll to the form
      reviewFormContainer.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }
  if (cancelReviewBtn && reviewFormContainer && writeReviewBtn) {
    cancelReviewBtn.addEventListener("click", () => {
      reviewFormContainer.style.display = "none"
      writeReviewBtn.style.display = "block"

      // Reset the form
      document.getElementById("reviewForm").reset()

      // Clear star ratings
      const starLabels = document.querySelectorAll(".star-rating label i")
      starLabels.forEach((star) => {
        star.className = "far fa-star"
      })

      // // Clear photo preview
      // const photoPreview = document.getElementById("photoPreview")
      // if (photoPreview) {
      //   photoPreview.innerHTML = ""
      // }
    })
  }
  // Star Rating
  const starLabels = document.querySelectorAll(".star-rating label")
  const starInputs = document.querySelectorAll(".star-rating input")

  // Function to update stars display
  function updateStars(selectedValue, isHover = false) {
    const starIcons = document.querySelectorAll(".star-rating label i")

    starIcons.forEach((star, index) => {
      // Convert from 0-based index to 1-based rating
      const starValue = 5 - index

      if (starValue <= selectedValue) {
        // Stars from 1 to selected value should be solid and colored
        star.className = "fas fa-star"
      } else {
        // Stars after selected value should be empty
        star.className = "far fa-star"
      }
    })
  }

  // Handle hover events
  starLabels.forEach((label) => {
    label.addEventListener("mouseenter", function () {
      const starValue = this.getAttribute("for").replace("star", "")
      updateStars(starValue, true)
    })
  })

  // Handle mouse leaving the star rating container
  document.querySelector(".star-rating").addEventListener("mouseleave", () => {
    // When mouse leaves, revert to the selected rating (if any)
    const checkedInput = document.querySelector(".star-rating input:checked")
    if (checkedInput) {
      const selectedValue = checkedInput.value
      updateStars(selectedValue)
    } else {
      // If no rating is selected, clear all stars
      document.querySelectorAll(".star-rating label i").forEach((star) => {
        star.className = "far fa-star"
      })
    }
  })

  // Handle click events
  starLabels.forEach((label) => {
    label.addEventListener("click", function () {
      const starValue = this.getAttribute("for").replace("star", "")
      updateStars(starValue)
    })
  })

  // Review Form Submission
  const reviewForm = document.getElementById("reviewForm")

  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      // e.preventDefault()

      // Get form values
      // const title = document.getElementById("reviewTitle").value
      // const rating = document.querySelector('input[name="rating"]:checked').value
      // const content = document.getElementById("reviewContent").value

      // Create new review element
      // const reviewsList = document.querySelector(".reviews-list")
      // const newReview = document.createElement("div")
      // newReview.className = "review-item"

      // Get current date
      // const now = new Date()
      // const options = { year: "numeric", month: "long", day: "numeric" }
      // const formattedDate = now.toLocaleDateString("en-US", options)

      // Create stars based on rating
      // let starsHTML = ""
      // for (let i = 1; i <= 5; i++) {
      //   if (i <= rating) {
      //     starsHTML += '<i class="fas fa-star"></i>'
      //   } else {
      //     starsHTML += '<i class="far fa-star"></i>'
      //   }
      // }

      // Create photo HTML if photos were uploaded
      // let photosHTML = ""
      // const photoItems = document.querySelectorAll(".photo-preview-item img")
      // if (photoItems.length > 0) {
      //   photosHTML = '<div class="review-photos">'
      //   photoItems.forEach((photo) => {
      //     photosHTML += `<img src="${photo.src}" alt="Review Photo">`
      //   })
      //   photosHTML += "</div>"
      // }

      // Set review HTML
      // newReview.innerHTML = `
      //   <div class="review-header">
      //     <div class="reviewer-info">
      //       <div class="reviewer-avatar">
      //         <img src="/placeholder.svg?height=50&width=50&text=You" alt="Your Avatar">
      //       </div>
      //       <div class="reviewer-details">
      //         <h4 class="reviewer-name">You</h4>
      //         <div class="review-date">${formattedDate}</div>
      //       </div>
      //     </div>
      //     <div class="review-rating">
      //       <div class="stars">
      //         ${starsHTML}
      //       </div>
      //     </div>
      //   </div>
      //   <div class="review-title">${title}</div>
      //   <div class="review-content">
      //     <p>${content}</p>
      //   </div>
      //   ${photosHTML}
      //   <div class="review-footer">
      //     <div class="review-helpful">
      //       <span>Was this review helpful?</span>
      //       <button class="helpful-btn"><i class="far fa-thumbs-up"></i> Yes (0)</button>
      //       <button class="helpful-btn"><i class="far fa-thumbs-down"></i> No (0)</button>
      //     </div>
      //   </div>
      // `

      // Add the new review to the top of the list
      // if (reviewsList.firstChild) {
      //   reviewsList.insertBefore(newReview, reviewsList.firstChild)
      // } else {
      //   reviewsList.appendChild(newReview)
      // }

      // Update review count
      // const reviewCountElements = document.querySelectorAll(".rating-count, .total-reviews")
      // reviewCountElements.forEach((element) => {
      //   const currentCount = Number.parseInt(element.textContent.match(/\d+/)[0])
      //   const newCount = currentCount + 1
      //   element.textContent = element.textContent.replace(currentCount, newCount)
      // })

      // Update tab button text
      // const reviewsTabBtn = document.querySelector('.tab-btn[data-tab="reviews"]')
      // if (reviewsTabBtn) {
      //   const currentCount = Number.parseInt(reviewsTabBtn.textContent.match(/\d+/)[0])
      //   const newCount = currentCount + 1
      //   reviewsTabBtn.textContent = reviewsTabBtn.textContent.replace(`(${currentCount})`, `(${newCount})`)
      // }

      // Hide the form and show the write review button
      // reviewFormContainer.style.display = "none"
      // writeReviewBtn.style.display = "block"
      //
      // // Reset the form
      // this.reset()

      // Clear star ratings
      // starLabels.forEach((label) => {
      //   const star = label.querySelector("i")
      //   if (star) {
      //     star.className = "far fa-star"
      //   }
      // })

      // Clear photo preview
      // photoPreview.innerHTML = ""

      // Show success message
      // alert("Thank you for your review!")
    })
  }

  // Photo Upload Preview
  // const reviewPhotosInput = document.getElementById("reviewPhotos")
  // const photoPreview = document.getElementById("photoPreview")
  //
  // if (reviewPhotosInput && photoPreview) {
  //   reviewPhotosInput.addEventListener("change", function () {
  //     photoPreview.innerHTML = ""
  //
  //     if (this.files) {
  //       Array.from(this.files).forEach((file, index) => {
  //         if (file.type.match("image.*")) {
  //           const reader = new FileReader()
  //
  //           reader.onload = (e) => {
  //             const previewItem = document.createElement("div")
  //             previewItem.className = "photo-preview-item"
  //             previewItem.innerHTML = `
  //               <img src="${e.target.result}" alt="Preview">
  //               <span class="remove-photo" data-index="${index}"><i class="fas fa-times"></i></span>
  //             `
  //             photoPreview.appendChild(previewItem)
  //
  //             // Add event listener to remove button
  //             const removeBtn = previewItem.querySelector(".remove-photo")
  //             removeBtn.addEventListener("click", () => {
  //               previewItem.remove()
  //               // Note: In a real application, you would need to handle removing the file from the FileList
  //             })
  //           }
  //
  //           reader.readAsDataURL(file)
  //         }
  //       })
  //     }
  //   })
  // }


  // Reviews Pagination
  const reviewPaginationNumbers = document.querySelectorAll(".reviews-pagination .pagination-number")
  const reviewPrevBtn = document.querySelector(".reviews-pagination .pagination-btn.prev")
  const reviewNextBtn = document.querySelector(".reviews-pagination .pagination-btn.next")

  reviewPaginationNumbers.forEach((number) => {
    number.addEventListener("click", () => {
      // Remove active class from all numbers
      reviewPaginationNumbers.forEach((num) => num.classList.remove("active"))

      // Add active class to clicked number
      number.classList.add("active")

      // Enable/disable prev/next buttons
      if (number.textContent === "1") {
        reviewPrevBtn.disabled = true
      } else {
        reviewPrevBtn.disabled = false
      }

      if (number.textContent === "4") {
        reviewNextBtn.disabled = true
      } else {
        reviewNextBtn.disabled = false
      }

      // In a real application, this would load the next page of reviews
      // For this demo, we'll just scroll to the top of the reviews section
      document.getElementById("reviews").scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  })

  if (reviewPrevBtn) {
    reviewPrevBtn.addEventListener("click", () => {
      const activeNumber = document.querySelector(".reviews-pagination .pagination-number.active")
      const prevNumber = activeNumber.previousElementSibling

      if (prevNumber) {
        prevNumber.click()
      }
    })
  }

  if (reviewNextBtn) {
    reviewNextBtn.addEventListener("click", () => {
      const activeNumber = document.querySelector(".reviews-pagination .pagination-number.active")
      const nextNumber = activeNumber.nextElementSibling

      if (nextNumber && nextNumber.classList.contains("pagination-number")) {
        nextNumber.click()
      }
    })
  }
})
