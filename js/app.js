// Simple script for hero banner slider (optional)
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');

    // Do not initialise the slider on pages without slides.
    if (slides.length === 0) return;

    const prevBtn = document.querySelector('.slide-btn.prev');
    const nextBtn = document.querySelector('.slide-btn.next');
    let currentSlide = 0;

    // Function to show slide
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[n].classList.add('active');
        currentSlide = n;
    }

    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            let nextSlide = (currentSlide + 1) % slides.length;
            showSlide(nextSlide);
        });
    }

    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            let prevSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevSlide);
        });
    }

    // Auto slide change every 5 seconds
    setInterval(function () {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000);
});