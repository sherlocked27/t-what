// Image loader utility for wedding website
class ImageLoader {
    constructor() {
        this.imagePaths = {
            engagement: 'images/couple/engagement.jpg',
            vacation: 'images/couple/something.jpg', 
            proposal: 'images/couple/proposal.jpg',
            date: 'images/couple/date.jpg'
        };
    }

    // Check if image exists and get dimensions
    async imageExists(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve({
                exists: true,
                width: img.naturalWidth,
                height: img.naturalHeight,
                aspectRatio: img.naturalWidth / img.naturalHeight
            });
            img.onerror = () => resolve({ exists: false });
            img.src = src;
        });
    }

    // Determine image orientation class
    getOrientationClass(aspectRatio) {
        if (aspectRatio > 1.2) {
            return 'landscape';
        } else if (aspectRatio < 0.8) {
            return 'portrait';
        } else {
            return 'square';
        }
    }

    // Load real images or fallback to SVG placeholders
    async loadCarouselImages() {
        const slides = document.querySelectorAll('.photo-slide');
        const imageKeys = ['engagement', 'vacation', 'proposal', 'date'];

        for (let i = 0; i < slides.length && i < imageKeys.length; i++) {
            const slide = slides[i];
            const imageKey = imageKeys[i];
            const imagePath = this.imagePaths[imageKey];
            
            const imageInfo = await this.imageExists(imagePath);
            
            if (imageInfo.exists) {
                // Get orientation class for smart sizing
                const orientationClass = this.getOrientationClass(imageInfo.aspectRatio);
                
                // Replace placeholder with real image
                const placeholder = slide.querySelector('.photo-placeholder');
                if (placeholder) {
                    // Create image element
                    const img = document.createElement('img');
                    img.src = imagePath;
                    img.alt = imageKey;
                    img.className = orientationClass;
                    img.loading = 'lazy';
                    
                    // Create label
                    const label = document.createElement('div');
                    label.className = 'photo-label';
                    label.textContent = this.getImageLabel(imageKey);
                    
                    // Clear and add new content
                    placeholder.innerHTML = '';
                    placeholder.appendChild(img);
                    placeholder.appendChild(label);
                    
                    // Adjust carousel height based on image
                    img.onload = () => {
                        const carousel = slide.closest('.photo-carousel');
                        if (carousel && orientationClass === 'portrait') {
                            carousel.style.height = 'auto';
                            carousel.style.minHeight = '300px';
                        }
                    };
                }
            }
        }
    }

    getImageLabel(key) {
        const labels = {
            engagement: 'Our Engagement',
            vacation: 'Sunflowers', 
            proposal: 'The Proposal',
            date: 'Date Night'
        };
        return labels[key] || key;
    }
}

// Auto-load images when page loads
document.addEventListener('DOMContentLoaded', function() {
    const imageLoader = new ImageLoader();
    // Small delay to ensure carousel is initialized
    setTimeout(() => imageLoader.loadCarouselImages(), 500);
});