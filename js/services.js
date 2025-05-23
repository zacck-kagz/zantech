document.addEventListener('DOMContentLoaded', function() {
    // Service data
    const services = [
        {
            id: "cctv",
            name: "CCTV Installation",
            description: "Professional CCTV installation services to enhance your security.",
            icon: "assets/images/services/cctv.svg",
            features: [
                "HD and 4K resolution cameras",
                "Night vision capabilities",
                "Motion detection systems",
                "Remote viewing on mobile devices",
                "Custom setup for residential and commercial properties"
            ]
        },
        {
            id: "electric-fence",
            name: "Electric Fence Installation",
            description: "Reliable electric fence installation for maximum protection.",
            icon: "assets/images/services/electric-fence.svg",
            features: [
                "High-voltage deterrent systems",
                "Energizer backup battery options",
                "Smart monitoring systems",
                "Alarm integration capabilities",
                "Professional installation with safety compliance"
            ]
        },
        {
            id: "smart-doors",
            name: "Smart Doors & Locks",
            description: "Upgrade to smart doors for enhanced security and convenience.",
            icon: "assets/images/services/smart-doors.svg",
            features: [
                "Biometric fingerprint access",
                "PIN code and RFID card entry",
                "Smartphone control and monitoring",
                "Voice assistant compatibility",
                "Tamper alerts and automatic locking"
            ]
        },
        {
            id: "alarm-systems",
            name: "Alarm Systems",
            description: "Comprehensive alarm systems to keep your property safe.",
            icon: "assets/images/services/alarm.svg",
            features: [
                "Motion and intrusion sensors",
                "Glass break detectors",
                "Smoke and carbon monoxide detection",
                "24/7 monitoring service options",
                "Mobile alerts and notifications"
            ]
        },
        {
            id: "gate-automation",
            name: "Gate Automation",
            description: "Automate your gates for improved security and ease of access.",
            icon: "assets/images/services/gate.svg",
            features: [
                "Sliding and swing gate options",
                "Remote control access",
                "Intercom and video integration",
                "Vehicle detection systems",
                "Pedestrian access solutions"
            ]
        },
        {
            id: "networking",
            name: "Networking",
            description: "Reliable networking solutions for your security systems.",
            icon: "assets/images/services/networking.svg",
            features: [
                "Wired and wireless network installation",
                "Secure router configuration",
                "IP camera network setup",
                "Cloud storage solutions",
                "Remote access configuration"
            ]
        },
        {
            id: "repair-services",
            name: "Repair Services",
            description: "Professional repair services for all your security systems.",
            icon: "assets/images/services/repair.svg",
            features: [
                "CCTV and camera repairs",
                "Electric fence maintenance",
                "Gate automation troubleshooting",
                "Lock and door mechanism repairs",
                "Preventive maintenance packages"
            ]
        }
    ];

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Add animation class on scroll
        card.classList.add('animate');
        card.setAttribute('data-animation', 'slide-up');
        
        // Add hover interaction
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });
    
    // Add "Learn More" button functionality
    const learnMoreBtns = document.querySelectorAll('.service-card .btn');
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#contact') {
                e.preventDefault();
                
                // Get service name
                const serviceName = this.closest('.service-card').querySelector('h3').textContent;
                
                // Scroll to contact section
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Pre-select the service in the dropdown if it exists
                const serviceSelect = document.querySelector('#service');
                if (serviceSelect) {
                    // Find the option that matches the service name
                    const options = Array.from(serviceSelect.options);
                    const option = options.find(opt => opt.text.includes(serviceName));
                    
                    if (option) {
                        serviceSelect.value = option.value;
                    }
                }
            }
        });
    });
    
    // Animate service cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when at least 15% of the card is visible
        rootMargin: '0px'
    });
    
    // Observe each service card
    serviceCards.forEach((card, index) => {
        // Add delay to stagger animation
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Add hover effects for service icons
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon img');
        if (icon) {
            icon.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.15) rotate(5deg)';
            });
            
            icon.addEventListener('mouseout', function() {
                this.style.transform = '';
            });
        }
    });
});