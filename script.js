// Get all gallery items
const galleryItems = document.querySelectorAll(".gallery-item");

// Get filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");

// Lightbox elements
const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxCaption = document.getElementById("lightboxCaption");

const closeBtn = document.getElementById("closeBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");


// Store currently visible images
let visibleItems = [];


// Current image index
let currentIndex = 0;


// Initially show all images
visibleItems = Array.from(galleryItems);


// FILTER FUNCTION

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");


        // Get selected category
        const filter = button.dataset.filter;


        // Filter images
        galleryItems.forEach(item => {

            const category = item.dataset.category;


            if (filter === "all" || category === filter) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });


        // Update visible items
        visibleItems = Array.from(galleryItems).filter(item => {

            return item.style.display !== "none";

        });

    });

});


// OPEN LIGHTBOX

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        // Find clicked item's position
        currentIndex = visibleItems.indexOf(item);

        showImage();

    });

});


// SHOW IMAGE


function showImage() {

    if (visibleItems.length === 0) {
        return;
    }


    const item = visibleItems[currentIndex];


    // Get image
    const image = item.querySelector("img");


    // Get caption
    const caption = item.querySelector("h3");


    // Set image
    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;


    // Set caption
    lightboxCaption.textContent = caption.textContent;


    // Show lightbox
    lightbox.style.display = "flex";

}







