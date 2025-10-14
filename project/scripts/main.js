// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded',
            mobileMenu.classList.contains('active'));
    });
}

// Testimonial Slider
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const testimonials = document.querySelectorAll('.testimonial');

if (testimonialDots.length > 0 && testimonials.length > 0) {
    // Auto-rotate testimonials
    let currentTestimonial = 0;
    const testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Manual testimonial controls
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showTestimonial(index);
            // Reset auto-rotation
            clearInterval(testimonialInterval);
        });
    });

    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });

        // Remove active class from all dots
        testimonialDots.forEach(d => {
            d.classList.remove('active');
        });

        // Show selected testimonial
        testimonials[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
}

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Save current page to localStorage for persistence
function saveCurrentPage() {
    const currentPage = window.location.pathname;
    localStorage.setItem('currentPage', currentPage);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    saveCurrentPage();

    // Add loading="lazy" to all images below the fold
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        if (index > 2) { // First few images are above the fold
            img.setAttribute('loading', 'lazy');
        }
    });
});
// Video background handling
function initVideoBackground() {
    const video = document.getElementById('hero-video');
    const heroSection = document.querySelector('.hero');
    
    if (video) {
        // Check if video can play
        video.addEventListener('error', function() {
            console.log('Video failed to load, using fallback image');
            heroSection.classList.add('no-video');
        });
        
        // Check if video is supported and can autoplay
        video.addEventListener('canplay', function() {
            console.log('Video can play');
        });
        
        // For mobile devices, we might need user interaction to play video
        video.addEventListener('loadeddata', function() {
            // Try to play the video
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Video autoplay failed:', error);
                    // Fallback to image background
                    heroSection.classList.add('no-video');
                });
            }
        });
        
        // Pause video when page is not visible (to save resources)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                video.pause();
            } else {
                video.play().catch(e => console.log('Video play failed:', e));
            }
        });
    }
}

// Initialize video background when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initVideoBackground();
    // ... rest of your existing code
});