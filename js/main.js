// DOM Elements
const body = document.querySelector('body');
const themeToggle = document.querySelector('.theme-toggle');
const loadingScreen = document.querySelector('.loading-screen');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const skillItems = document.querySelectorAll('.skill-item');
const contactForm = document.getElementById('contactForm');

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        if (this.theme === 'dark') {
            body.classList.add('dark-theme');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        
        if (body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            this.theme = 'dark';
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            this.theme = 'light';
        }
        
        localStorage.setItem('theme', this.theme);
    }
}

// Loading Screen
class LoadingScreen {
    static hide() {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Skill Animations
class SkillsAnimation {
    static init() {
        const observerOptions = {
            threshold: 0.5
        };

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItem = entry.target;
                    const level = skillItem.dataset.level;
                    const progressBar = skillItem.querySelector('.skill-progress');
                    progressBar.style.width = `${level}%`;
                    skillObserver.unobserve(skillItem);
                }
            });
        }, observerOptions);

        skillItems.forEach(item => skillObserver.observe(item));
    }
}

// Smooth Scrolling
class SmoothScroll {
    static init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }
}

// Mobile Menu
class MobileMenu {
    static init() {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-content') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    }
}

// Form Handler
class FormHandler {
    static init() {
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                try {
                    const formData = new FormData(contactForm);
                    const data = Object.fromEntries(formData.entries());
                    
                    // Show loading state
                    const submitBtn = contactForm.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;

                    // Simulate API call (replace with actual API endpoint)
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Show success message
                    this.showMessage('Message sent successfully!', 'success');
                    contactForm.reset();
                } catch (error) {
                    this.showMessage('Failed to send message. Please try again.', 'error');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    }

    static showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        contactForm.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 3000);
    }
}

// Scroll Animation
class ScrollAnimation {
    static init() {
        const observerOptions = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(
            element => observer.observe(element)
        );
    }
}

// Typing Animation
class TypingAnimation {
    static init() {
        const element = document.querySelector('.hero-description');
        if (!element) return;

        const text = element.textContent;
        element.textContent = '';
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        }

        type();
    }
}

// Tech Stack Banner Animation
class TechStackScroll {
    static init() {
        const scrollers = document.querySelectorAll('.tech-stack-scroll');
        
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            this.addAnimation(scrollers);
        }
    }

    static addAnimation(scrollers) {
        scrollers.forEach(scroller => {
            // Clone items for smooth infinite scroll
            scroller.innerHTML += scroller.innerHTML;
            
            // Add data attributes for animation
            scroller.setAttribute('data-animated', true);
            
            // Optional: Pause on hover
            scroller.addEventListener('mouseover', () => {
                scroller.style.animationPlayState = 'paused';
            });
            
            scroller.addEventListener('mouseout', () => {
                scroller.style.animationPlayState = 'running';
            });
        });
    }
}

// Statistics Counter Animation
class StatisticsCounter {
    static init() {
        const stats = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateValue(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        stats.forEach(stat => observer.observe(stat));
    }

    static animateValue(obj) {
        const target = parseInt(obj.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            obj.textContent = Math.round(current);

            if (current >= target) {
                obj.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
}

// Enhanced Typing Animation
class EnhancedTypingAnimation {
    static init() {
        const elements = document.querySelectorAll('[data-type]');
        elements.forEach(element => {
            const words = JSON.parse(element.getAttribute('data-type'));
            this.typeWriter(element, words);
        });
    }

    static typeWriter(element, words) {
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                element.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                element.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }
}

// Parallax Effect
class ParallaxEffect {
    static init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');

            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-parallax');
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    LoadingScreen.hide();
    SkillsAnimation.init();
    SmoothScroll.init();
    MobileMenu.init();
    FormHandler.init();
    ScrollAnimation.init();
    TypingAnimation.init();
    
    // New feature initializations
    TechStackScroll.init();
    StatisticsCounter.init();
    EnhancedTypingAnimation.init();
    ParallaxEffect.init();

    // Add animation classes to elements
    document.querySelectorAll('.project-card, .skill-category, .timeline-item')
        .forEach(el => el.classList.add('animate-on-scroll'));

    // Enhanced animations for elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('animate');
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });
});

// Particle background (optional - uncomment if you want to use it)
/*
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: { enable: true, speed: 6 }
    }
});
*/

// Handle scroll to top
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add smooth cursor effect
class SmoothCursor {
    static init() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', e => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Add hover effect for interactive elements
        document.querySelectorAll('a, button, .interactive').forEach(element => {
            element.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            element.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }
}

// Initialize smooth cursor
SmoothCursor.init(); 