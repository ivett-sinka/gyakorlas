/**
 * Photo Gallery - Infinite Slider with Drag & Resume
 * Features:
 * - Infinite auto-scroll (right to left)
 * - Drag and touch support with resume from position
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

// ===================================
// Auto-scroll Animation Variables
// ===================================

let scrollPosition = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartScrollPosition = 0;
let autoScrollSpeed = 0.5; // pixels per frame
let animationFrameId = null;
let itemWidth = 348; // Width of one gallery item
let gap = 30; // Gap between items
let totalWidth = 0; // Total width of original items

// ===================================
// Initialize
// ===================================

function init() {
    // Calculate total width of original items (half of track)
    const itemCount = totalImages;
    totalWidth = (itemWidth + gap) * itemCount;

    // Start auto-scroll
    startAutoScroll();

    console.log('Photo Gallery initialized');
    console.log(`Total unique images: ${totalImages}`);
    console.log(`Total width (one loop): ${totalWidth}px`);
    console.log('Features: Drag & Resume, Infinite scroll, Lightbox navigation');
}

// ===================================
// Auto-scroll Animation
// ===================================

function startAutoScroll() {
    function animate() {
        if (!isDragging) {
            // Move left (increase scroll position)
            scrollPosition += autoScrollSpeed;

            // Reset position when reached end of first set
            if (scrollPosition >= totalWidth) {
                scrollPosition = 0;
            }

            // Apply transform
            updateSliderPosition();
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    animate();
}

function stopAutoScroll() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

function updateSliderPosition() {
    sliderTrack.style.transform = `translateX(-${scrollPosition}px)`;
}

// ===================================
// Drag & Touch Support
// ===================================

/**
 * Get X position from mouse or touch event
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
    dragStartX = getPositionX(event);
    dragStartScrollPosition = scrollPosition;

    sliderWrapper.style.cursor = 'grabbing';
}

/**
 * While dragging
 */
function drag(event) {
    if (!isDragging) return;

    event.preventDefault();

    const currentX = getPositionX(event);
    const diff = dragStartX - currentX; // Positive = dragging left, Negative = dragging right

    // Update scroll position based on drag
    scrollPosition = dragStartScrollPosition + diff;

    // Handle infinite loop boundaries
    if (scrollPosition < 0) {
        // Dragging right past the beginning - wrap to end
        scrollPosition = totalWidth + scrollPosition;
        dragStartScrollPosition = scrollPosition;
        dragStartX = currentX;
    } else if (scrollPosition >= totalWidth) {
        // Dragging left past the end - wrap to beginning
        scrollPosition = scrollPosition - totalWidth;
        dragStartScrollPosition = scrollPosition;
        dragStartX = currentX;
    }

    updateSliderPosition();
}

/**
 * End dragging
 */
function dragEnd() {
    if (!isDragging) return;

    isDragging = false;
    sliderWrapper.style.cursor = 'grab';

    // Auto-scroll continues from current position
    // No need to do anything - the animation loop handles it
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
sliderWrapper.addEventListener('touchmove', drag, { passive: false });
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
}

/**
 * Close lightbox
 */
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');
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
// Start Everything
// ===================================

// Wait for images to load before calculating dimensions
window.addEventListener('load', () => {
    // Get actual dimensions from first item
    const firstItem = document.querySelector('.gallery-item');
    if (firstItem) {
        const style = window.getComputedStyle(firstItem);
        itemWidth = firstItem.offsetWidth;

        const trackStyle = window.getComputedStyle(sliderTrack);
        gap = parseInt(trackStyle.gap) || 30;

        console.log(`Calculated item width: ${itemWidth}px, gap: ${gap}px`);
    }

    init();
});
