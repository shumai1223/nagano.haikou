// Enhanced Interactions and Animations

document.addEventListener('DOMContentLoaded', () => {
    
    // Enhanced Preloader
    function enhancePreloader() {
        const preloader = document.getElementById('preloader');
        const loaderRing = preloader.querySelector('.loader-ring');
        
        // Create enhanced loader structure
        loaderRing.className = 'enhanced-loader';
        loaderRing.innerHTML = `
            <div class="loader-ring"></div>
            <div class="loader-ring"></div>
            <div class="loader-ring"></div>
        `;
        
        // Add loading dots
        const loadingText = document.createElement('div');
        loadingText.className = 'loading-dots';
        loadingText.innerHTML = `
            <span>読み込み中</span>
            <div class="loading-dots">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </div>
        `;
        loadingText.style.marginTop = '20px';
        loadingText.style.color = '#a7f3d0';
        loadingText.style.fontSize = '1.1em';
        loaderRing.appendChild(loadingText);
    }
    
    // Scroll Progress Indicator
    function createScrollProgress() {
        const progressElement = document.createElement('div');
        progressElement.className = 'scroll-progress';
        progressElement.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressElement);
        
        const progressBar = progressElement.querySelector('.scroll-progress-bar');
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    // Enhanced Navigation Indicator
    function enhanceNavigation() {
        const nav = document.getElementById('desktop-nav');
        if (!nav) return;
        
        const indicator = document.createElement('div');
        indicator.className = 'nav-indicator';
        nav.style.position = 'relative';
        nav.appendChild(indicator);
        
        const links = nav.querySelectorAll('a:not(#adminLink)');
        
        function updateIndicator(activeLink) {
            const rect = activeLink.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();
            indicator.style.width = rect.width + 'px';
            indicator.style.left = (rect.left - navRect.left) + 'px';
        }
        
        links.forEach(link => {
            link.addEventListener('mouseenter', () => updateIndicator(link));
            
            if (link.classList.contains('active')) {
                updateIndicator(link);
            }
        });
        
        nav.addEventListener('mouseleave', () => {
            const activeLink = nav.querySelector('a.active');
            if (activeLink) updateIndicator(activeLink);
        });
    }
    
    // Enhanced Card Animations
    function enhanceCards() {
        const cards = document.querySelectorAll('.member, .idea, .admin-feature-block');
        cards.forEach(card => {
            card.classList.add('card-3d');
        });
        
        // Add magnetic effect to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.classList.add('btn-magnetic');
        });
    }
    
    // Enhanced Form Interactions
    function enhanceForms() {
        const formInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea');
        
        formInputs.forEach(input => {
            const parent = input.parentElement;
            const label = parent.querySelector('label');
            
            if (label && !parent.classList.contains('password-wrapper')) {
                // Create enhanced form group
                const formGroup = document.createElement('div');
                formGroup.className = 'form-group';
                
                input.classList.add('form-input');
                input.placeholder = ' '; // For CSS selector
                
                label.classList.add('form-label');
                
                parent.insertBefore(formGroup, input);
                formGroup.appendChild(input);
                formGroup.appendChild(label);
            }
        });
    }
    
    // Enhanced Intersection Observer
    function setupEnhancedAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Special handling for staggered containers
                    if (entry.target.classList.contains('stagger-container')) {
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, 100);
                    }
                    
                    // Counter animation
                    if (entry.target.classList.contains('counter-number')) {
                        animateCounter(entry.target);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Add animation classes to elements
        const animatedElements = document.querySelectorAll('.animated-item');
        animatedElements.forEach((el, index) => {
            const animations = ['fade-in-up', 'fade-in-left', 'fade-in-right', 'scale-in'];
            const randomAnimation = animations[index % animations.length];
            el.classList.add(randomAnimation);
            observer.observe(el);
        });
        
        // Add stagger containers
        const sections = document.querySelectorAll('section ul, .team');
        sections.forEach(section => {
            section.classList.add('stagger-container');
            const items = section.querySelectorAll('li, .member');
            items.forEach(item => item.classList.add('stagger-item'));
            observer.observe(section);
        });
    }
    
    // Counter Animation
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/,/g, ''));
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 20);
    }
    
    // Enhanced Mobile Menu
    function enhanceMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        
        document.body.appendChild(overlay);
        
        const hamburgerBtn = document.getElementById('hamburger-btn');
        
        function toggleMenu(isOpen) {
            overlay.classList.toggle('active', isOpen);
            if (isOpen) {
                mobileMenu.style.transformOrigin = 'top right';
            }
        }
        
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('is-open');
            toggleMenu(!isOpen);
        });
        
        overlay.addEventListener('click', () => {
            hamburgerBtn.click();
        });
    }
    
    // Floating Elements
    function addFloatingElements() {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index % 2 === 0) {
                section.classList.add('floating');
            }
        });
    }
    
    // Parallax Background
    function addParallaxBackground() {
        const header = document.querySelector('header');
        if (header) {
            header.classList.add('parallax-section');
            const parallaxBg = document.createElement('div');
            parallaxBg.className = 'parallax-bg';
            header.appendChild(parallaxBg);
        }
    }
    
    // Text Reveal Animation
    function addTextRevealAnimation() {
        const headings = document.querySelectorAll('h1, h2');
        headings.forEach(heading => {
            heading.classList.add('text-reveal');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('text-reveal-line');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(heading);
        });
    }
    
    // Enhanced Button Interactions
    function enhanceButtonInteractions() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Success/Error feedback
                if (this.type === 'submit') {
                    this.classList.add('success-pulse');
                    setTimeout(() => {
                        this.classList.remove('success-pulse');
                    }, 600);
                }
            });
        });
    }
    
    // Enhanced Form Validation
    function enhanceFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                input.addEventListener('invalid', function() {
                    this.classList.add('error-shake');
                    setTimeout(() => {
                        this.classList.remove('error-shake');
                    }, 600);
                });
                
                input.addEventListener('input', function() {
                    if (this.validity.valid) {
                        this.classList.remove('error-shake');
                    }
                });
            });
        });
    }
    
    // Enhanced Loading States
    function enhanceLoadingStates() {
        const originalShowLoading = window.showLoading;
        const originalHideLoading = window.hideLoading;
        
        window.showLoading = function(button) {
            if (originalShowLoading) originalShowLoading(button);
            button.style.transform = 'scale(0.95)';
        };
        
        window.hideLoading = function(button) {
            if (originalHideLoading) originalHideLoading(button);
            button.style.transform = 'scale(1)';
        };
    }
    
    // Smooth Scroll Enhancement
    function enhanceSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Keyboard Navigation Enhancement
    function enhanceKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Focus visible styles
        const focusableElements = document.querySelectorAll('button, input, textarea, a, [tabindex]');
        focusableElements.forEach(el => {
            el.addEventListener('focus', function() {
                if (document.body.classList.contains('keyboard-navigation')) {
                    this.classList.add('focus-visible');
                }
            });
            
            el.addEventListener('blur', function() {
                this.classList.remove('focus-visible');
            });
        });
    }
    
    // Performance Optimization
    function optimizePerformance() {
        // Throttle scroll events
        let scrollTimeout;
        const originalScrollHandler = window.onscroll;
        
        window.onscroll = function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                if (originalScrollHandler) originalScrollHandler();
            }, 16); // ~60fps
        };
        
        // Optimize animations for mobile
        if (window.innerWidth <= 768) {
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
        }
    }
    
    // Initialize all enhancements
    function initializeEnhancements() {
        enhancePreloader();
        createScrollProgress();
        enhanceNavigation();
        enhanceCards();
        enhanceForms();
        setupEnhancedAnimations();
        enhanceMobileMenu();
        addFloatingElements();
        addParallaxBackground();
        addTextRevealAnimation();
        enhanceButtonInteractions();
        enhanceFormValidation();
        enhanceLoadingStates();
        enhanceSmoothScroll();
        enhanceKeyboardNavigation();
        optimizePerformance();
    }
    
    // Run enhancements
    initializeEnhancements();
    
    // Add CSS custom properties for dynamic animations
    document.documentElement.style.setProperty('--primary-color', '#a7f3d0');
    document.documentElement.style.setProperty('--secondary-color', '#7bdcb5');
    document.documentElement.style.setProperty('--accent-color', '#bfdbfe');
    
    console.log('🎉 Enhanced animations and interactions loaded successfully!');
});

// Utility functions for external use
window.enhancedAnimations = {
    // Trigger custom animation on element
    animate: function(element, animationType = 'bounce') {
        const animations = {
            bounce: 'transform: translateY(-10px); transition: transform 0.3s ease;',
            pulse: 'transform: scale(1.05); transition: transform 0.3s ease;',
            shake: 'animation: error-shake 0.6s ease;',
            glow: 'box-shadow: 0 0 20px rgba(167, 243, 208, 0.5); transition: box-shadow 0.3s ease;'
        };
        
        if (animations[animationType]) {
            element.style.cssText += animations[animationType];
            setTimeout(() => {
                element.style.transform = '';
                element.style.boxShadow = '';
                element.style.animation = '';
            }, 600);
        }
    },
    
    // Show notification with animation
    showNotification: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#22c55e' : '#ef4444'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            transform: translateX(400px);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 10000;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 400);
        }, 3000);
    }
};