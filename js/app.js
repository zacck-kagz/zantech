document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // Enhanced header scroll effect with dynamic transparency
    const header = document.querySelector('header');
    let lastScrollPosition = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        lastScrollPosition = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateHeaderOnScroll(lastScrollPosition);
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    function updateHeaderOnScroll(scrollPos) {
        // Add scrolled class at threshold
        if (scrollPos > 50) {
            header.classList.add('scrolled');
            
            // Apply dynamic transparency based on scroll position
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                const heroHeight = heroSection.offsetHeight;
                const scrollRatio = Math.min(scrollPos / heroHeight, 1);
                const opacity = 0.9 + (scrollRatio * 0.1); // Opacity between 0.9 and 1
                
                header.style.backgroundColor = `rgba(17, 24, 39, ${opacity})`;
                header.style.backdropFilter = `blur(${10 + scrollRatio * 5}px)`;
            }
        } else {
            header.classList.remove('scrolled');
            header.style.backgroundColor = 'rgba(3, 7, 18, 0.5)';
            header.style.backdropFilter = 'blur(15px)';
        }
    }

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Enhanced form submission handling with modern validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Live validation for fields
        const formFields = form.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Enhanced form validation
            let isValid = true;
            const formFields = this.querySelectorAll('input, select, textarea');
            
            formFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show loading indicator
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (would be an actual API call)
                setTimeout(() => {
                    // Success message with animation
                    const formContainer = this.closest('.contact-form') || this;
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="success-text">
                            <h4>Thank you!</h4>
                            <p>Your request has been submitted successfully. We'll get back to you shortly.</p>
                        </div>
                    `;
                    
                    // Fade out the form and fade in success message
                    this.style.opacity = '0';
                    setTimeout(() => {
                        formContainer.innerHTML = '';
                        formContainer.appendChild(successMessage);
                        
                        // Add animation to success message
                        setTimeout(() => {
                            successMessage.style.opacity = '1';
                            successMessage.style.transform = 'translateY(0)';
                        }, 10);
                    }, 300);
                    
                    // Analytics event (would be actual tracking in production)
                    console.log('Form submitted successfully');
                }, 1500);
            } else {
                // Scroll to first error
                const firstError = this.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
    
    // Function to validate a single field
    function validateField(field) {
        let isValid = true;
        const errorClass = 'error';
        
        // Clear existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Check if field is required and empty
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            showError(field, 'This field is required');
        } 
        // Email validation
        else if (field.type === 'email' && field.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value)) {
                isValid = false;
                showError(field, 'Please enter a valid email address');
            }
        }
        // Phone validation
        else if (field.type === 'tel' && field.value.trim()) {
            const phonePattern = /^[\d\s\-\+\(\)]{8,20}$/;
            if (!phonePattern.test(field.value)) {
                isValid = false;
                showError(field, 'Please enter a valid phone number');
            }
        }
        
        // Add/remove error class
        if (isValid) {
            field.classList.remove(errorClass);
        } else {
            field.classList.add(errorClass);
        }
        
        return isValid;
    }
    
    // Helper function to show error message
    function showError(field, message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        field.parentNode.appendChild(errorMessage);
    }
    
    // Add animation classes on scroll
    const animatedElements = document.querySelectorAll('.animate');
    
    const animateOnScroll = function() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                const animationClass = element.getAttribute('data-animation') || 'fade-in';
                element.classList.add(animationClass);
            }
        });
    };
    
    if (animatedElements.length > 0) {
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Initial check
    }

    // Add dynamic particles to the hero section
    const createParticles = () => {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;
        
        // Number of particles to create
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size between 3px and 8px
            const size = 3 + Math.random() * 5;
            
            // Random animation duration
            const duration = 10 + Math.random() * 20;
            
            // Random delay
            const delay = Math.random() * 5;
            
            // Set styles
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            // Add to hero section
            heroSection.appendChild(particle);
        }
    };
    
    createParticles();

    // Animate stats when they come into view
    const animateStats = () => {
        const statItems = document.querySelectorAll('.stat-item');
        if (statItems.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class with delay for each stat
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, Array.from(statItems).indexOf(entry.target) * 200);
                    
                    // Animate the numbers
                    const numberElement = entry.target.querySelector('h3');
                    if (numberElement) {
                        const targetValue = parseInt(numberElement.textContent.replace(/\D/g, ''));
                        if (!isNaN(targetValue)) {
                            animateNumber(numberElement, 0, targetValue);
                        }
                    }
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        statItems.forEach(item => {
            observer.observe(item);
        });
    };
    
    // Function to animate counting up numbers
    const animateNumber = (element, start, end) => {
        let current = start;
        const increment = Math.ceil(end / 50);
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / (end - start)));
        
        const timer = setInterval(() => {
            current += increment;
            
            // Handle special cases like "24/7"
            if (element.textContent.includes('/')) {
                if (current >= 24) {
                    element.textContent = '24/7';
                    clearInterval(timer);
                } else {
                    element.textContent = `${current}/7`;
                }
            } else {
                // Normal numbers with potential "+" suffix
                if (current >= end) {
                    element.textContent = element.textContent.includes('+') ? `${end}+` : end;
                    clearInterval(timer);
                } else {
                    element.textContent = element.textContent.includes('+') ? `${current}+` : current;
                }
            }
        }, stepTime);
    };
    
    animateStats();
});