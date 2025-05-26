document.addEventListener("DOMContentLoaded", () => {
    // Filter Sidebar Toggle (Mobile)
    const filterBtn = document.querySelector(".filter-btn")
    const filterSidebar = document.querySelector(".filter-sidebar")
    const closeFilters = document.querySelector(".close-filters")
    const overlay = document.querySelector(".overlay")

    if (filterBtn) {
        filterBtn.addEventListener("click", () => {
            filterSidebar.classList.add("active")
            overlay.classList.add("active")
            document.body.style.overflow = "hidden"
        })
    }

    if (closeFilters) {
        closeFilters.addEventListener("click", () => {
            filterSidebar.classList.remove("active")
            overlay.classList.remove("active")
            document.body.style.overflow = ""
        })
    }


    // Price Range Slider
    const rangeMin = document.querySelector(".range-min")
    const rangeMax = document.querySelector(".range-max")
    const minPrice = document.getElementById("min-price")
    const maxPrice = document.getElementById("max-price")
    const sliderTrack = document.querySelector(".slider-track")

    if (rangeMin && rangeMax) {
        // Update slider track
        function updateSliderTrack() {
            const min = Number.parseInt(rangeMin.value)
            const max = Number.parseInt(rangeMax.value)
            const minPercent = (min / Number.parseInt(rangeMin.max)) * 100
            const maxPercent = (max / Number.parseInt(rangeMax.max)) * 100

            sliderTrack.style.left = minPercent + "%"
            sliderTrack.style.right = 100 - maxPercent + "%"
        }


        // Update min range input
        rangeMin.addEventListener("input", () => {
            const min = Number.parseInt(rangeMin.value)
            const max = Number.parseInt(rangeMax.value)

            if (min > max) {
                rangeMin.value = max
            }

            minPrice.value = rangeMin.value
            updateSliderTrack()
        })

        // Update max range input
        rangeMax.addEventListener("input", () => {
            const min = Number.parseInt(rangeMin.value)
            const max = Number.parseInt(rangeMax.value)

            if (max < min) {
                rangeMax.value = min
            }

            maxPrice.value = rangeMax.value
            updateSliderTrack()
        })

        // Update range slider from min price input
        minPrice.addEventListener("input", () => {
            const min = Number.parseInt(minPrice.value);
            const max = Number.parseInt(maxPrice.value);
            if (!isNaN(min)) {
                if (min > max) {
                    minPrice.value = max;
                }
                rangeMin.value = minPrice.value;
                updateSliderTrack();
            }

        })

        // Update range slider from max price input
        maxPrice.addEventListener("input", () => {
            const min = Number.parseInt(minPrice.value);
            const max = Number.parseInt(maxPrice.value);
            if (!isNaN(max)) {
                if (max < min) {
                    maxPrice.value = min;
                }
                rangeMax.value = maxPrice.value
                updateSliderTrack()
            }
        })
    }

    const urlSearchParams = new URLSearchParams((new URL(window.location.href)).search);

    const searchButton = document.getElementById("search");
    const searchText = document.getElementById("searchText");
    searchButton.addEventListener("click", () => {
        if (searchText.value !== "") {
            window.location.href = `${window.location.pathname}?name=${searchText.value}`
        }
    });

    // init from URLSearchParam
    (function initParam() {
        const categoryId = urlSearchParams.get("categoryId") || 0;
        const brandId = urlSearchParams.get("brandId") || 0;
        const rating = urlSearchParams.get("rating") || 0;
        const min = urlSearchParams.get("minPrice") || 0;
        const max = urlSearchParams.get("maxPrice") || 1000;
        const name = urlSearchParams.get("name");
        const curPage = urlSearchParams.get("page") || 1;
        const sortId=urlSearchParams.get("sortId")
        urlSearchParams.delete("page")

        //init href for pagination
        const pages = document.querySelectorAll(".page");
        pages.forEach((page) => {
            page.href = `${page.href}?${urlSearchParams.toString()}${urlSearchParams.toString() !== "" ? '&' : ''}page=${page.getAttribute("value")}`
        });
        urlSearchParams.set("page",curPage);

        // Sort Products
        const sortSelect = document.querySelector(".sort-select");
        if(sortId){
            sortSelect.value=sortId;
        }

        sortSelect.addEventListener("change", () => {
            // In a real application, this would trigger a page reload or re-sort the products
            // For this demo, we'll just log the selected option
            // console.log("Sort by:", sortSelect.value)
            urlSearchParams.set("sortId", sortSelect.value);
            urlSearchParams.delete("page");
            window.location.href = `${window.location.pathname}?${urlSearchParams.toString()}`
        });


        if (name) {
            searchText.value = name;
        }

        const category = document.querySelector(`input[name="categoryId"][value="${categoryId}"]`);
        if (category) {
            category.checked = true;
        }
        const brand = document.querySelector(`input[name="brandId"][value="${brandId}"]`);
        if (brand) {
            brand.checked = true;
        }
        const _rating = document.querySelector(`input[name="rating"][value="${rating}"]`);
        if (_rating) {
            _rating.checked = true;
        }
        if (min <= max) {
            minPrice.value = min;
            maxPrice.value = max;
            rangeMin.value = min;
            rangeMax.value = max;
            updateSliderTrack();
        }
    })();


    // Apply Filters Button
    const applyFiltersBtn = document.querySelector(".apply-filters")
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener("click", () => {
            // In a real application, this would trigger a page reload or AJAX request
            // For this demo, we'll just close the mobile filter sidebar
            if (window.innerWidth < 768) {
                filterSidebar.classList.remove("active")
                overlay.classList.remove("active")
                document.body.style.overflow = ""
            }
            const categoryId = document.querySelector('input[name="categoryId"]:checked').value;
            const brandId = document.querySelector('input[name="brandId"]:checked').value;
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const min = minPrice.value;
            const max = maxPrice.value;
            // alert(categoryId+" "+brandId+" "+rating+" "+min+" "+max);
            if (categoryId !== '0') {
                urlSearchParams.set("categoryId", categoryId);
            } else {
                urlSearchParams.delete("categoryId");
            }
            if (brandId !== '0') {
                urlSearchParams.set("brandId", brandId);
            } else {
                urlSearchParams.delete("brandId")
            }
            if (rating !== '0') {
                urlSearchParams.set("rating", rating);
            } else {
                urlSearchParams.delete("rating");
            }
            if (min > 0) {
                urlSearchParams.set("minPrice", min);
            } else {
                urlSearchParams.delete("minPrice");
            }
            if (max < 1000) {
                urlSearchParams.set("maxPrice", max);
            } else {
                urlSearchParams.delete("maxPrice");
            }
            urlSearchParams.delete("page");
            // urlSearchParams.delete("sortId");
            window.location.href = `${window.location.pathname}?${urlSearchParams.toString()}`
        })
    }

    // // Pagination
    // const paginationNumbers = document.querySelectorAll(".pagination-number")
    // const prevBtn = document.querySelector(".pagination-btn.prev")
    // const nextBtn = document.querySelector(".pagination-btn.next")
    //
    // paginationNumbers.forEach((number) => {
    //     number.addEventListener("click", () => {
    //         // Remove active class from all numbers
    //         paginationNumbers.forEach((num) => num.classList.remove("active"))
    //
    //         // Add active class to clicked number
    //         number.classList.add("active")
    //
    //         // Enable/disable prev/next buttons
    //         if (number.textContent === "1") {
    //             prevBtn.disabled = true
    //         } else {
    //             prevBtn.disabled = false
    //         }
    //
    //         if (number.textContent === "4") {
    //             nextBtn.disabled = true
    //         } else {
    //             nextBtn.disabled = false
    //         }
    //
    //         // Scroll to top of products
    //         window.scrollTo({
    //             top: document.querySelector(".products-header").offsetTop - 100,
    //             behavior: "smooth",
    //         })
    //     })
    // })
    //
    // if (prevBtn) {
    //     prevBtn.addEventListener("click", () => {
    //         const activeNumber = document.querySelector(".pagination-number.active")
    //         const prevNumber = activeNumber.previousElementSibling
    //
    //         if (prevNumber) {
    //             prevNumber.click()
    //         }
    //     })
    // }
    //
    // if (nextBtn) {
    //     nextBtn.addEventListener("click", () => {
    //         const activeNumber = document.querySelector(".pagination-number.active")
    //         const nextNumber = activeNumber.nextElementSibling
    //
    //         if (nextNumber && nextNumber.classList.contains("pagination-number")) {
    //             nextNumber.click()
    //         }
    //     })
    // }
})
