// Gallery functionality for Zantech
document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Initial animation when gallery section comes into view
    const gallerySection = document.getElementById('gallery');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateGalleryItems('all');
            observer.unobserve(gallerySection);
        }
    }, { threshold: 0.1 });
    
    if (gallerySection) {
        observer.observe(gallerySection);
    }

    // Filter gallery items based on category
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Hide all gallery items first
            galleryItems.forEach(item => {
                item.classList.remove('show');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            });

            // Show filtered items
            setTimeout(() => {
                animateGalleryItems(filterValue);
            }, 350);
        });
    });
    
    // Function to animate gallery items
    function animateGalleryItems(filter) {
        let delay = 100;
        let visibleCount = 0;
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('show');
                }, delay);
                delay += 50; // Reduced delay for smoother animation with more items
                visibleCount++;
            }
        });
        
        // If no items are visible for a category, show a message
        const galleryGrid = document.querySelector('.gallery-grid');
        const noItemsMsg = document.getElementById('no-gallery-items');
        
        if (visibleCount === 0) {
            if (!noItemsMsg) {
                const message = document.createElement('div');
                message.id = 'no-gallery-items';
                message.className = 'no-items-message';
                message.textContent = 'No projects in this category yet.';
                galleryGrid.appendChild(message);
            }
        } else if (noItemsMsg) {
            noItemsMsg.remove();
        }
    }

    // Gallery Modal Functionality
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('gallery-modal-img');
    const modalCaption = document.getElementById('gallery-modal-caption');
    const closeBtn = document.getElementsByClassName('modal-close')[0];
    const galleryZoomBtns = document.querySelectorAll('.gallery-zoom');
    
    galleryZoomBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imgSrc = this.closest('.gallery-item').querySelector('img').src;
            const title = this.closest('.gallery-item').querySelector('h4').textContent;
            const description = this.closest('.gallery-item').querySelector('p').textContent;
            
            modal.style.display = 'block';
            modalImg.src = imgSrc;
            modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
            
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeBtn.click();
        }
    });
});
