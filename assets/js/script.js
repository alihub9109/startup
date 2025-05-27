// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for everything to load
window.addEventListener('load', function() {
    // Loading animation
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');

    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            loadingScreen.remove();
            // Refresh ScrollTrigger after loading screen is gone
            ScrollTrigger.refresh();
        }, 1000);
    }, 2000);

    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');

            gsap.to('.menu-line:first-child', {
                rotation: mobileMenuBtn.classList.contains('active') ? 45 : 0,
                y: mobileMenuBtn.classList.contains('active') ? 7 : 0,
                duration: 0.3
            });

            gsap.to('.menu-line:nth-child(2)', {
                opacity: mobileMenuBtn.classList.contains('active') ? 0 : 1,
                duration: 0.3
            });

            gsap.to('.menu-line:last-child', {
                rotation: mobileMenuBtn.classList.contains('active') ? -45 : 0,
                y: mobileMenuBtn.classList.contains('active') ? -7 : 0,
                duration: 0.3
            });
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                    gsap.to('.menu-line', {
                        rotation: 0,
                        y: 0,
                        opacity: 1,
                        duration: 0.3
                    });
                }
            });
        });
    }

    // Magnetic button effect
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.8,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });

    // Hero animation
    const headlineLines = gsap.utils.toArray('.headline-line');
    const heroSubhead = document.querySelector('.hero-subhead');
    const heroCta = document.querySelector('.cta-btn');
    const scrollIndicator = document.querySelector('.scroll-circle');
    const undrawIllustrations = document.querySelectorAll('.undraw-illustration');

    if (headlineLines.length) {
        gsap.to(headlineLines, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            delay: 0.5
        });
    }

    if (heroSubhead && heroCta) {
        gsap.to([heroSubhead, heroCta], {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            delay: 1.2,
            ease: "power2.out"
        });
    }

    if (scrollIndicator) {
        gsap.to(scrollIndicator, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.8,
            ease: "power2.out"
        });

        gsap.to('.scroll-circle .dot', {
            y: 20,
            opacity: 0,
            duration: 2,
            repeat: -1,
            ease: "power1.inOut"
        });

        document.querySelector('.hero-scroll-indicator')?.addEventListener('click', () => {
            gsap.to(window, {
                scrollTo: '#how-it-works',
                duration: 1,
                ease: "power2.inOut"
            });
        });
    }

    if (undrawIllustrations.length) {
        gsap.to(undrawIllustrations, {
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            delay: 1.5,
            ease: "power2.out"
        });
    }

    const screenMockup = document.querySelector('.screen-mockup');
    if (screenMockup) {
        gsap.from(screenMockup, {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: "back.out(1.7)"
        });
    }

    const humaaans1 = document.querySelector('.humaaans-1');
    const humaaans2 = document.querySelector('.humaaans-2');
    if (humaaans1 && humaaans2) {
        gsap.from([humaaans1, humaaans2], {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            delay: 1,
            ease: "back.out(1.7)"
        });
    }

    // Improved animateOnScroll function with fallbacks
    function animateOnScroll(selector, options = {}) {
        const elements = gsap.utils.toArray(selector);
        if (!elements.length) return;

        elements.forEach((element, i) => {
            // Make sure elements are visible before animating
            gsap.set(element, { opacity: 1, visibility: 'visible' });

            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    markers: false,
                    onEnter: () => {
                        element.style.visibility = 'visible';
                    }
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: "power2.out",
                ...options
            });
        });
    }

    // Initialize section animations with safety checks
    function initSectionAnimations() {
        // First make sure all sections are visible
        document.querySelectorAll('section').forEach(section => {
            section.style.visibility = 'visible';
            section.style.opacity = '1';
        });

        // Then animate them
        animateOnScroll('.section-title');
        animateOnScroll('.section-subtitle');
        animateOnScroll('.section-divider', { scaleX: 1 });
        animateOnScroll('.step-card');
        animateOnScroll('.feature-card');
        animateOnScroll('.stat-item');
        animateOnScroll('.project-tile');
        animateOnScroll('.testimonial-card');
        animateOnScroll('.faq-item');
        animateOnScroll('.form-group');

        // Step connector animation
        const stepConnector = document.querySelector('.step-connector path');
        if (stepConnector) {
            gsap.to(stepConnector, {
                scrollTrigger: {
                    trigger: '.steps-container',
                    start: "top 70%",
                    toggleActions: "play none none none"
                },
                strokeDashoffset: 0,
                duration: 2,
                ease: "power2.out"
            });
        }

        // Feature highlights
        document.querySelectorAll('.highlight-point').forEach((point, i) => {
            gsap.to(point, {
                scrollTrigger: {
                    trigger: '.feature-visualization',
                    start: "top 70%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                duration: 0.5,
                delay: i * 0.3,
                ease: "power2.out"
            });
        });

        // Stats counter
        document.querySelectorAll('.stat-number').forEach(number => {
            const target = +number.getAttribute('data-count');
            const suffixMatch = number.textContent.match(/\D+$/);
            const suffix = suffixMatch ? suffixMatch[0] : '';

            gsap.to({ num: 0 }, {
                num: target,
                duration: 2,
                scrollTrigger: {
                    trigger: number,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                onUpdate: function() {
                    number.textContent = Math.floor(this.targets()[0].num) + suffix;
                }
            });
        });
    }

    // Initialize animations after a slight delay to ensure DOM is ready
    setTimeout(initSectionAnimations, 100);

    // Project tile hover animations
    document.querySelectorAll('.project-tile').forEach(tile => {
        tile.addEventListener('mousemove', (e) => {
            const rect = tile.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const angleX = (y - rect.height / 2) / 20;
            const angleY = (rect.width / 2 - x) / 20;

            gsap.to(tile, {
                rotationX: angleX,
                rotationY: angleY,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        tile.addEventListener('mouseleave', () => {
            gsap.to(tile, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
        });

        const overlay = tile.querySelector('.project-overlay');
        const viewBtn = tile.querySelector('.project-view-btn');

        tile.addEventListener('mouseenter', () => {
            gsap.to(overlay, { opacity: 1, y: 0, duration: 0.5 });
            gsap.to(viewBtn, { opacity: 1, y: 0, duration: 0.5, delay: 0.2 });
        });

        tile.addEventListener('mouseleave', () => {
            gsap.to(overlay, { opacity: 0, y: 20, duration: 0.5 });
            gsap.to(viewBtn, { opacity: 0, y: 10, duration: 0.3 });
        });
    });

    // Modal logic
    const projectModal = document.querySelector('.project-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    if (projectModal && modalCloseBtn) {
        document.querySelectorAll('.project-view-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                const tile = btn.closest('.project-tile');
                const modalTitle = document.querySelector('.modal-title');
                const modalImage = document.querySelector('.modal-image');
                
                if (tile && modalTitle && modalImage) {
                    const title = tile.querySelector('.project-title')?.textContent || 'Project';
                    modalTitle.textContent = title;
                    modalImage.style.backgroundImage = window.getComputedStyle(tile).backgroundImage;
                    projectModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        modalCloseBtn.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Testimonials
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    if (testimonialCards.length && testimonialDots.length) {
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonialCards.forEach((card, i) => card.classList.toggle('active', i === index));
            testimonialDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            currentTestimonial = index;
        }

        testimonialDots.forEach((dot, i) => dot.addEventListener('click', () => showTestimonial(i)));

        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showTestimonial((currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showTestimonial((currentTestimonial + 1) % testimonialCards.length);
            });
        }

        setInterval(() => {
            showTestimonial((currentTestimonial + 1) % testimonialCards.length);
        }, 8000);
    }

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const isActive = question.classList.contains('active');
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                gsap.to(q.nextElementSibling, { maxHeight: 0, duration: 0.3 });
            });
            if (!isActive) {
                question.classList.add('active');
                gsap.to(question.nextElementSibling, { maxHeight: '500px', duration: 0.3 });
            }
        });
    });

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    const formConfirmation = document.querySelector('.form-confirmation');
    const confirmationClose = document.querySelector('.confirmation-close');
    
    if (contactForm && formConfirmation && confirmationClose) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            setTimeout(() => {
                contactForm.reset();
                formConfirmation.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 1000);
        });

        confirmationClose.addEventListener('click', () => {
            formConfirmation.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Back to top
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.pageYOffset > 300);
        });
        backToTop.addEventListener('click', () => {
            gsap.to(window, { scrollTo: 0, duration: 1, ease: "power2.out" });
        });
    }

    // Final refresh of ScrollTrigger after all animations are set up
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 1500);
});