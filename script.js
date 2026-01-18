// YouTube Video Loader
function loadVideo(element) {
    const videoWrapper = element.closest('.video-wrapper');
    const iframeContainer = videoWrapper.querySelector('.video-iframe');
    
    // Only load the video if it hasn't been loaded yet
    if (!iframeContainer.hasAttribute('data-loaded')) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', 'https://www.youtube.com/embed/QxzkHRL-ekk?autoplay=1&rel=0&modestbranding=1&showinfo=0&autohide=1');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.5s ease';
        
        iframeContainer.appendChild(iframe);
        iframeContainer.setAttribute('data-loaded', 'true');
        
        // Small delay to ensure the iframe is in the DOM before fading in
        setTimeout(() => {
            iframe.style.opacity = '1';
        }, 50);
    }
    
    // Add a small delay before showing the iframe to allow for smooth transition
    setTimeout(() => {
        element.classList.add('hidden');
        iframeContainer.classList.add('visible');
    }, 100);
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Header scroll effect with parallax
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    // Header effects
    if (scrolled > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    // Parallax effect for hero background only (not affecting layout)
    if (hero) {
        const parallaxSpeed = scrolled * 0.3;
        hero.style.backgroundPosition = `center ${parallaxSpeed}px`;
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.product-card, .contact-item, .feature, .yarn-type');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(element);
    });
    
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                if (finalValue.includes('+')) {
                    animateCounter(target, parseInt(finalValue), '+');
                } else if (finalValue.includes('%')) {
                    animateCounter(target, parseInt(finalValue), '%');
                } else {
                    animateCounter(target, parseInt(finalValue), '');
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => statsObserver.observe(stat));
});

// Counter animation function
function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Form handling
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const product = this.querySelector('select').value;
    const message = this.querySelector('textarea').value;
    
    // Basic validation
    if (!name || !email || !product) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        maxWidth: '300px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#6b8e23';
    } else if (type === 'error') {
        notification.style.background = '#dc3545';
    } else {
        notification.style.background = '#17a2b8';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add mobile menu styles dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            transform: translateY(-20px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-links li {
            margin-bottom: 1rem;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            // If image is already loaded
            if (img.complete) {
                img.style.opacity = '1';
            }
            
            observer.unobserve(img);
        }
    });
});

// Observe all product images
document.addEventListener('DOMContentLoaded', () => {
    const productImages = document.querySelectorAll('.product-image img');
    productImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// Image error handling
document.querySelectorAll('.product-image img').forEach(img => {
    img.addEventListener('error', function() {
        // Create a fallback with gradient background and icon
        const fallback = document.createElement('div');
        fallback.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #6b8e23 0%, #5a7a1f 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
        `;
        
        const icon = this.closest('.product-card').querySelector('.product-overlay .product-icon i').className;
        fallback.innerHTML = `<i class="${icon}"></i>`;
        
        this.parentNode.insertBefore(fallback, this);
        this.style.display = 'none';
    });
});

// Mouse movement effects
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const particles = document.querySelectorAll('.particle');
    
    if (hero) {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create dynamic cursor trail effect
        particles.forEach((particle, index) => {
            const moveX = (x - rect.width / 2) * (index + 1) * 0.01;
            const moveY = (y - rect.height / 2) * (index + 1) * 0.01;
            
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
});

// Interactive cursor for buttons and cards
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('.btn-primary, .btn-secondary, .product-card');
    const manufacturingShowcase = document.querySelector('.manufacturing-showcase');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
        
        // Tilt effect on mouse move (excluding manufacturing showcase)
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
    
    // Special handling for manufacturing showcase - simpler hover effect
    if (manufacturingShowcase) {
        manufacturingShowcase.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        manufacturingShowcase.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    }
});

// Add loading animation for page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Page reveal animation
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Animate hero elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroTitle) {
            heroTitle.style.transform = 'translateY(-50px)';
            heroTitle.style.opacity = '0';
            setTimeout(() => {
                heroTitle.style.transition = 'all 0.8s ease';
                heroTitle.style.transform = 'translateY(0)';
                heroTitle.style.opacity = '1';
            }, 200);
        }
        
        if (heroSubtitle) {
            heroSubtitle.style.transform = 'translateY(30px)';
            heroSubtitle.style.opacity = '0';
            setTimeout(() => {
                heroSubtitle.style.transition = 'all 0.8s ease';
                heroSubtitle.style.transform = 'translateY(0)';
                heroSubtitle.style.opacity = '1';
            }, 400);
        }
    }, 100);
});
