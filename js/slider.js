
document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider functionality with modern approach
    const testimonialSlider = {
        currentSlide: 0,
        testimonials: document.querySelectorAll('.testimonial'),
        prevBtn: document.getElementById('prev-testimonial'),
        nextBtn: document.getElementById('next-testimonial'),
        autoAdvanceInterval: null,
        
        init: function() {
            if (this.testimonials.length === 0) return;
            
            // Set up initial state
            this.hideAllTestimonials();
            this.showTestimonial(this.currentSlide);
            
            // Set up event listeners
            if (this.prevBtn && this.nextBtn) {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                this.nextBtn.addEventListener('click', () => this.nextSlide());
                
                // Add pulse animation to buttons
                this.addButtonEffects();
            }
            
            // Set up hover pause effect
            this.setupHoverPause();
            
            // Auto-advance slides every 7 seconds
            this.startAutoAdvance();
        },
        
        hideAllTestimonials: function() {
            this.testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
        },
        
        showTestimonial: function(index) {
            // Display the testimonial
            this.testimonials[index].classList.add('active');
            
            // Animate the controls to indicate current slide
            this.updateIndicators(index);
        },
        
        nextSlide: function() {
            this.hideAllTestimonials();
            this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
            this.showTestimonial(this.currentSlide);
        },
        
        prevSlide: function() {
            this.hideAllTestimonials();
            this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
            this.showTestimonial(this.currentSlide);
        },
        
        addButtonEffects: function() {
            // Add modern hover effects
            [this.prevBtn, this.nextBtn].forEach(btn => {
                btn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px)';
                });
                
                btn.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            });
        },
        
        updateIndicators: function(index) {
            // Could add indicators/dots here in the future
        },
        
        startAutoAdvance: function() {
            // Clear any existing interval
            if (this.autoAdvanceInterval) {
                clearInterval(this.autoAdvanceInterval);
            }
            
            // Start a new auto-advance interval
            this.autoAdvanceInterval = setInterval(() => this.nextSlide(), 7000);
        },
        
        stopAutoAdvance: function() {
            if (this.autoAdvanceInterval) {
                clearInterval(this.autoAdvanceInterval);
                this.autoAdvanceInterval = null;
            }
        },
        
        setupHoverPause: function() {
            const testimonialSection = document.getElementById('testimonials');
            if (testimonialSection) {
                testimonialSection.addEventListener('mouseenter', () => this.stopAutoAdvance());
                testimonialSection.addEventListener('mouseleave', () => this.startAutoAdvance());
            }
        }
    };
    
    // Initialize the testimonial slider
    testimonialSlider.init();
});