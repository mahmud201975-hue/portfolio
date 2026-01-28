// ===================================
// PORTFOLIO WEBSITE - PROFESSIONAL INTERACTIONS
// Vanilla JavaScript for Enhanced User Experience
// ===================================

(function () {
    'use strict';

    // ===================================
    // MOBILE NAVIGATION TOGGLE
    // ===================================
    function initMobileNav() {
        const nav = document.querySelector('nav');
        const header = document.querySelector('header');

        // Create hamburger button dynamically
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger-menu';
        hamburger.setAttribute('aria-label', 'Toggle navigation');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<span></span><span></span><span></span>';

        // Insert hamburger before nav
        header.insertBefore(hamburger, nav);

        // Toggle menu function
        function toggleMenu() {
            const isOpen = nav.classList.contains('nav-open');

            if (isOpen) {
                nav.classList.remove('nav-open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; // Re-enable scrolling
            } else {
                nav.classList.add('nav-open');
                hamburger.classList.add('active');
                hamburger.setAttribute('aria-expanded', 'true');
                // Prevent body scroll when menu is open on mobile
                if (window.innerWidth <= 768) {
                    document.body.style.overflow = 'hidden';
                }
            }
        }

        // Hamburger click event
        hamburger.addEventListener('click', toggleMenu);

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('nav-open')) {
                    toggleMenu();
                }
            }
        });

        // Handle window resize - close menu and reset on desktop
        let resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (window.innerWidth > 768) {
                    // Desktop view - ensure menu is visible and reset states
                    nav.classList.remove('nav-open');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }, 250);
        });
    }

    // ===================================
    // SMOOTH SCROLLING FOR NAVIGATION
    // ===================================
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('nav a');
        const nav = document.querySelector('nav');
        const hamburger = document.querySelector('.hamburger-menu');

        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Close mobile menu BEFORE scrolling
                    if (window.innerWidth <= 768 && nav.classList.contains('nav-open')) {
                        nav.classList.remove('nav-open');
                        if (hamburger) {
                            hamburger.classList.remove('active');
                            hamburger.setAttribute('aria-expanded', 'false');
                        }
                        document.body.style.overflow = ''; // Re-enable scrolling
                    }

                    // Small delay to allow menu close animation
                    setTimeout(function () {
                        // Smooth scroll to target
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);

                    // Update active state
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');

                    // Update URL without jumping
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // ===================================
    // STICKY HEADER ON SCROLL
    // ===================================
    function initStickyHeader() {
        const header = document.querySelector('header');
        let lastScrollTop = 0;

        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add 'scrolled' class when scrolling down
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop;
        });
    }

    // ===================================
    // SCROLL TO TOP BUTTON
    // ===================================
    function initScrollToTop() {
        // Create scroll to top button
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        scrollBtn.setAttribute('title', 'Back to top');
        document.body.appendChild(scrollBtn);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        scrollBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // ===================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ===================================
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');

        window.addEventListener('scroll', function () {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ===================================
    // CERTIFICATE CARD INTERACTIONS
    // ===================================
    function initCertificateCards() {
        const certificateCards = document.querySelectorAll('.certificate-card');

        certificateCards.forEach(card => {
            // Add keyboard accessibility
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');

            // Handle keyboard events
            card.addEventListener('keypress', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });

            // Add visual feedback on click
            card.addEventListener('click', function () {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(0, 123, 255, 0.3)';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.pointerEvents = 'none';
                ripple.style.animation = 'ripple 0.6s ease-out';

                this.style.position = 'relative';
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // ===================================
    // IMAGE LAZY LOADING FALLBACK
    // ===================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img');

        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            images.forEach(img => {
                img.loading = 'lazy';
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            const imageObserver = new IntersectionObserver(function (entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ===================================
    // FORM VALIDATION (if contact form exists)
    // ===================================
    function initFormValidation() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                // Basic validation
                const inputs = form.querySelectorAll('input, textarea');
                let isValid = true;

                inputs.forEach(input => {
                    if (input.hasAttribute('required') && !input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = '#dc3545';
                    } else {
                        input.style.borderColor = '';
                    }
                });

                if (isValid) {
                    // Form is valid, can submit
                    console.log('Form is valid and ready to submit');
                    // form.submit(); // Uncomment when ready
                }
            });
        });
    }

    // ===================================
    // ACCESSIBILITY ENHANCEMENTS
    // ===================================
    function initAccessibility() {
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#about';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #007bff;
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
        `;
        skipLink.addEventListener('focus', function () {
            this.style.top = '0';
        });
        skipLink.addEventListener('blur', function () {
            this.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Announce page changes to screen readers
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announcer);
    }

    // ===================================
    // PRINT OPTIMIZATION
    // ===================================
    function initPrintOptimization() {
        window.addEventListener('beforeprint', function () {
            // Expand all collapsed sections before printing
            const collapsedElements = document.querySelectorAll('[aria-expanded="false"]');
            collapsedElements.forEach(el => {
                el.setAttribute('aria-expanded', 'true');
            });
        });
    }

    // ===================================
    // ERROR HANDLING FOR MISSING IMAGES
    // ===================================
    function initImageErrorHandling() {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            img.addEventListener('error', function () {
                // Replace broken image with placeholder
                this.style.backgroundColor = '#f8f9fa';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.alt = 'Image not available';

                // Create placeholder text
                const placeholder = document.createElement('div');
                placeholder.textContent = '📷';
                placeholder.style.fontSize = '3rem';
                placeholder.style.color = '#dee2e6';

                // Only add if not already added
                if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('img-placeholder')) {
                    this.parentNode.style.position = 'relative';
                    placeholder.className = 'img-placeholder';
                    placeholder.style.position = 'absolute';
                    placeholder.style.top = '50%';
                    placeholder.style.left = '50%';
                    placeholder.style.transform = 'translate(-50%, -50%)';
                    this.parentNode.appendChild(placeholder);
                }
            });
        });
    }

    // ===================================
    // INITIALIZE ALL FEATURES
    // ===================================
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize mobile nav FIRST (creates hamburger button)
        initMobileNav();

        // Then initialize other features
        initSmoothScrolling();
        initStickyHeader();
        initScrollToTop();
        initScrollAnimations();
        initActiveNavigation();
        initCertificateCards();
        initLazyLoading();
        initFormValidation();
        initAccessibility();
        initPrintOptimization();
        initImageErrorHandling();

        // Log initialization
        console.log('Portfolio website initialized successfully');
    }

    // Start initialization
    init();

})();

// ===================================
// ADDITIONAL UTILITY FUNCTIONS
// ===================================

// Add required CSS dynamically for hamburger menu and animations
const style = document.createElement('style');
style.textContent = `
    /* Hamburger Menu Button */
    .hamburger-menu {
        display: none;
        flex-direction: column;
        justify-content: space-around;
        width: 30px;
        height: 25px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        z-index: 1001;
        position: absolute;
        right: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
    }
    
    .hamburger-menu span {
        width: 30px;
        height: 3px;
        background-color: #007bff;
        border-radius: 2px;
        transition: all 0.3s ease;
        transform-origin: center;
    }
    
    .hamburger-menu.active span:nth-child(1) {
        transform: translateY(11px) rotate(45deg);
    }
    
    .hamburger-menu.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger-menu.active span:nth-child(3) {
        transform: translateY(-11px) rotate(-45deg);
    }
    
    /* Mobile Navigation Styles */
    @media (max-width: 768px) {
        .hamburger-menu {
            display: flex;
        }
        
        header {
            position: relative;
        }
        
        nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            max-width: 300px;
            height: 100vh;
            background: #ffffff;
            box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
            padding: 5rem 2rem 2rem;
            transition: right 0.3s ease;
            z-index: 1000;
            overflow-y: auto;
        }
        
        nav.nav-open {
            right: 0;
        }
        
        nav a {
            margin: 0;
            padding: 1rem;
            display: block;
            border-bottom: 1px solid #e9ecef;
        }
        
        nav a:last-child {
            border-bottom: none;
        }
    }
    
    /* Ripple Animation */
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    /* Skip Link Focus */
    .skip-link:focus {
        top: 0 !important;
    }
`;
document.head.appendChild(style);

