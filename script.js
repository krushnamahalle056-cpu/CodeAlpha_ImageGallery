
const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let visibleItems = [...galleryItems];
let currentIndex = 0;
let lastFocusedElement = null;


// FILTER IMAGES
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.filter;

        filterButtons.forEach(btn => {
            const isActive = btn === button;

            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-pressed", String(isActive));
        });

        galleryItems.forEach(item => {
            const matches =
                selectedCategory === "all" ||
                item.dataset.category === selectedCategory;

            item.style.display = matches ? "" : "none";
        });

        visibleItems = galleryItems.filter(
            item => item.style.display !== "none"
        );
    });
});


// OPEN LIGHTBOX
function openLightbox(item) {
    currentIndex = visibleItems.indexOf(item);

    if (currentIndex === -1) {
        return;
    }

    lastFocusedElement = document.activeElement;
    showImage();

    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeBtn.focus();
}


// OPEN IMAGE ON CLICK, ENTER OR SPACE
galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        openLightbox(item);
    });

    item.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox(item);
        }
    });
});


// DISPLAY CURRENT IMAGE
function showImage() {
    if (visibleItems.length === 0) {
        return;
    }

    const item = visibleItems[currentIndex];
    const image = item.querySelector("img");
    const caption = item.querySelector(".caption h2");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxCaption.textContent = caption.textContent;
}


// NEXT IMAGE
nextBtn.addEventListener("click", () => {
    if (visibleItems.length === 0) return;

    currentIndex = (currentIndex + 1) % visibleItems.length;
    showImage();
});


// PREVIOUS IMAGE
prevBtn.addEventListener("click", () => {
    if (visibleItems.length === 0) return;

    currentIndex =
        (currentIndex - 1 + visibleItems.length) % visibleItems.length;

    showImage();
});


// CLOSE LIGHTBOX
function closeLightbox() {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

closeBtn.addEventListener("click", closeLightbox);


// CLOSE WHEN CLICKING OUTSIDE THE IMAGE
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});


// KEYBOARD CONTROLS
document.addEventListener("keydown", event => {
    if (lightbox.style.display !== "flex") {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextBtn.click();
    } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevBtn.click();
    }
});


const searchInput = document.getElementById("searchInput");

function filterGallery() {
    const activeButton = document.querySelector(".filter-btn.active");
    const selectedCategory = activeButton.dataset.filter;
    const searchText = searchInput.value.toLowerCase().trim();

    galleryItems.forEach(item => {
        const category = item.dataset.category;
        const title = item.querySelector(".caption h2").textContent.toLowerCase();

        const matchesCategory =
            selectedCategory === "all" || category === selectedCategory;

        const matchesSearch = title.includes(searchText);

        item.style.display =
            matchesCategory && matchesSearch ? "" : "none";
    });

    visibleItems = galleryItems.filter(
        item => item.style.display !== "none"
    );
}

searchInput.addEventListener("input", filterGallery);
