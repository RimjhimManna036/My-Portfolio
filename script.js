document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    function toggleMenu() {
        if (!navLinks) return;

        const isOpen = navLinks.classList.toggle('active');

        menuToggle?.setAttribute('aria-expanded', String(isOpen));
        menuToggle?.setAttribute('aria-label',
            isOpen ? 'Close navigation' : 'Open navigation');
    }

    menuToggle?.addEventListener('click', toggleMenu);

    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle?.setAttribute('aria-expanded', 'false');
        });
    });

    // 2. Highlight navigation while scrolling
    const sections = document.querySelectorAll('main section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateNavigation() {
        let currentSection = '';

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 180) {
                currentSection = section.id;
            }
        });

        navItems.forEach(link => {
            const isActive =
                link.getAttribute('href') === `#${currentSection}`;

            link.classList.toggle('active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // 3. Header scroll effect
    const header = document.querySelector('.header');

    function updateHeader() {
        header?.classList.toggle('scrolled', window.scrollY > 40);
    }

    // One scroll listener for both effects
    window.addEventListener('scroll', () => {
        updateNavigation();
        updateHeader();
    }, { passive: true });

    updateNavigation();
    updateHeader();

    // 4. Interactive skills cards
    function makeCardsInteractive(selector) {
        const items = document.querySelectorAll(selector);

        items.forEach(item => {
            item.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');

                items.forEach(card => {
                    card.classList.remove('active');
                    card.setAttribute('aria-pressed', 'false');
                });

                if (!wasActive) {
                    item.classList.add('active');
                    item.setAttribute('aria-pressed', 'true');
                }
            });
        });
    }

    makeCardsInteractive('.skill-item');
    makeCardsInteractive('.experience-item');

    // 5. Scroll-reveal animation
    const revealElements = document.querySelectorAll(
        '.education-card, .skill-card, .experience-card, ' +
        '.achievement-card, .about-content'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(element => {
            element.classList.add('reveal-hidden');
            observer.observe(element);
        });
    }

    // 6. Contact form validation and feedback
    const contactForm = document.querySelector('.contact-form form');

    contactForm?.addEventListener('submit', event => {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const name = contactForm.querySelector('input[type="text"]');
        const email = contactForm.querySelector('input[type="email"]');
        const message = contactForm.querySelector('textarea');
        const button = contactForm.querySelector('button[type="submit"]');

        if (!name?.value.trim() ||
            !email?.value.trim() ||
            !message?.value.trim()) {
            alert('Please fill out all required fields.');
            return;
        }

        // This is only local feedback, not actual email delivery.
        alert('Your form is valid! Connect an email service to send it.');
    });
});
