/**
 * Photo Gallery - Infinite Slider with Lightbox
 * Features:
 * - Infinite auto-scroll (right to left)
 * - Drag and touch support
 * - Lightbox with navigation
 * - Keyboard controls
 */

// ===================================
// Gallery Setup
// ===================================

const sliderTrack = document.querySelector('.slider-track');
const sliderWrapper = document.querySelector('.slider-wrapper');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

// Get all original gallery items (not clones)
const galleryItems = document.querySelectorAll('.gallery-item');
const totalImages = 6; // Number of unique images

let currentImageIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

// ===================================
// Lightbox Functions
// ===================================

/**
 * Open lightbox with specific image
 */
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.classList.add('no-scroll');

    // Pause slider animation
    sliderTrack.style.animationPlayState = 'paused';
}

/**
 * Close lightbox
 */
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');

    // Resume slider animation after closing
    setTimeout(() => {
        sliderTrack.style.animationPlayState = 'running';
    }, 300);
}

/**
 * Update lightbox image
 */
function updateLightboxImage() {
    const currentItem = Array.from(galleryItems).find(
        item => parseInt(item.dataset.index) === currentImageIndex
    );

    if (currentItem) {
        const img = currentItem.querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
    }
}

/**
 * Show next image in lightbox
 */
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateLightboxImage();
}

/**
 * Show previous image in lightbox
 */
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateLightboxImage();
}

// ===================================
// Event Listeners - Lightbox
// ===================================

// Open lightbox on zoom button click
galleryItems.forEach(item => {
    const zoomBtn = item.querySelector('.gallery-zoom-btn');
    zoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(item.dataset.index);
        openLightbox(index);
    });
});

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

// Navigation
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
    }
});

// ===================================
// Drag & Touch Support for Slider
// ===================================

/**
 * Get position from mouse or touch event
 */
function getPositionX(event) {
    return event.type.includes('mouse')
        ? event.pageX
        : event.touches[0].clientX;
}

/**
 * Start dragging
 */
function dragStart(event) {
    // Don't drag if clicking on zoom button
    if (event.target.closest('.gallery-zoom-btn')) return;

    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    sliderTrack.style.cursor = 'grabbing';

    // Pause auto-scroll animation while dragging
    sliderTrack.style.animationPlayState = 'paused';
}

/**
 * While dragging
 */
function drag(event) {
    if (!isDragging) return;

    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
}

/**
 * End dragging
 */
function dragEnd() {
    if (!isDragging) return;

    isDragging = false;
    cancelAnimationFrame(animationID);
    prevTranslate = currentTranslate;
    sliderTrack.style.cursor = 'grab';

    // Resume auto-scroll animation after dragging
    setTimeout(() => {
        sliderTrack.style.animationPlayState = 'running';
    }, 100);
}

/**
 * Animation loop for smooth dragging
 */
function animation() {
    if (isDragging) {
        setSliderPosition();
        requestAnimationFrame(animation);
    }
}

/**
 * Set slider position
 */
function setSliderPosition() {
    sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
}

// ===================================
// Event Listeners - Drag & Touch
// ===================================

// Mouse events
sliderWrapper.addEventListener('mousedown', dragStart);
sliderWrapper.addEventListener('mousemove', drag);
sliderWrapper.addEventListener('mouseup', dragEnd);
sliderWrapper.addEventListener('mouseleave', dragEnd);

// Touch events
sliderWrapper.addEventListener('touchstart', dragStart, { passive: true });
sliderWrapper.addEventListener('touchmove', drag, { passive: true });
sliderWrapper.addEventListener('touchend', dragEnd);

// Prevent context menu on long press
sliderWrapper.addEventListener('contextmenu', (e) => e.preventDefault());

// ===================================
// Prevent Image Dragging
// ===================================

galleryItems.forEach(item => {
    const img = item.querySelector('img');
    img.addEventListener('dragstart', (e) => e.preventDefault());
});

// ===================================
// Reset animation after manual drag
// ===================================

let dragTimeout;

sliderWrapper.addEventListener('mouseup', resetAnimation);
sliderWrapper.addEventListener('touchend', resetAnimation);

function resetAnimation() {
    clearTimeout(dragTimeout);

    dragTimeout = setTimeout(() => {
        // Get current computed transform
        const style = window.getComputedStyle(sliderTrack);
        const matrix = new DOMMatrix(style.transform);
        const currentX = matrix.m41;

        // Remove inline transform to resume CSS animation
        sliderTrack.style.transform = '';
        sliderTrack.style.animationPlayState = 'running';

        // Reset tracking variables
        currentTranslate = 0;
        prevTranslate = 0;
    }, 200);
}

// ===================================
// Initialize
// ===================================

console.log('Photo Gallery initialized');
console.log(`Total unique images: ${totalImages}`);
console.log('Features: Infinite scroll, Drag & Touch, Lightbox navigation');
