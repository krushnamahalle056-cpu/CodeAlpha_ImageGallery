// Get all gallery images
const galleryItems = document.querySelectorAll(".gallery-item");


// Lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");


// Store currently visible images
let visibleItems = [];

let currentIndex = 0;


// Update visible items
function updateVisibleItems() {
    visibleItems = Array.from(galleryItems)
        .filter(item => item.style.display !== "none");
}


// Open Lightbox
function openLightbox(index) {

    updateVisibleItems();

    currentIndex = index;

    const item = visibleItems[currentIndex];

    const image = item.querySelector("img");
    const caption = item.querySelector(".caption");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

    lightboxCaption.textContent = caption.textContent;

    lightbox.classList.add("show");
}


// Open gallery image
galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        updateVisibleItems();

        const index = visibleItems.indexOf(item);

        openLightbox(index);

    });

});


// Next image
nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    showCurrentImage();

});


// Previous image
prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    showCurrentImage();

});


// Show current image
function showCurrentImage() {

    const item = visibleItems[currentIndex];

    const image = item.querySelector("img");
    const caption = item.querySelector(".caption");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

    lightboxCaption.textContent = caption.textContent;
}


// Close lightbox
closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("show");

});


// Close when clicking outside image
lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.classList.remove("show");
    }

});


// Keyboard support
document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }

    if (event.key === "Escape") {
        closeBtn.click();
    }

});


// Category Filters
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class
        button.classList.add("active");

        const filter = button.dataset.filter;


        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});