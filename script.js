// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (in production, this would send to a server)
        showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
        
        // In production, you would send the data to your server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        // });
    });
}

function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Help Contact Form Handling
const helpContactForm = document.getElementById('helpContactForm');
const helpFormMessage = document.getElementById('helpFormMessage');

if (helpContactForm) {
    helpContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(helpContactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showHelpFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showHelpFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (in production, this would send to a server)
        showHelpFormMessage('Thank you for your message! We will get back to you soon.', 'success');
        helpContactForm.reset();
    });
}

function showHelpFormMessage(message, type) {
    if (helpFormMessage) {
        helpFormMessage.textContent = message;
        helpFormMessage.className = `form-message ${type}`;
        helpFormMessage.style.display = 'block';
        
        // Scroll to message
        helpFormMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 5 seconds
        setTimeout(() => {
            helpFormMessage.style.display = 'none';
        }, 5000);
    }
}

// Internal testing modal (only on index)
const internalTestingModal = document.getElementById('internal-testing-modal');
const internalTestingForm = document.getElementById('internal-testing-form');

function openInternalTestingModal() {
    if (!internalTestingModal) return;
    internalTestingModal.classList.add('is-open');
    internalTestingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeInternalTestingModal() {
    if (!internalTestingModal) return;
    internalTestingModal.classList.remove('is-open');
    internalTestingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.location.hash === '#join-internal-testing') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }
}

if (internalTestingModal) {
    if (window.location.hash === '#join-internal-testing') openInternalTestingModal();
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#join-internal-testing') openInternalTestingModal();
        else closeInternalTestingModal();
    });
    document.querySelectorAll('.js-internal-testing-cta').forEach(link => {
        link.addEventListener('click', (e) => {
            const isIndex = /index\.html$|\/$/.test(window.location.pathname) || window.location.pathname === '';
            if (isIndex) {
                e.preventDefault();
                openInternalTestingModal();
            }
        });
    });
    internalTestingModal.querySelectorAll('[data-close-modal]').forEach(el => {
        el.addEventListener('click', closeInternalTestingModal);
    });
}

if (internalTestingForm) {
    internalTestingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = internalTestingForm.querySelector('.modal-submit');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending…';
        }
        const formData = new FormData(internalTestingForm);
        fetch('https://formspree.io/f/xvzbqdpb', {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
        })
            .then(r => r.json())
            .then(() => {
                if (submitBtn) {
                    submitBtn.textContent = 'Link sent! Check your email.';
                    submitBtn.disabled = false;
                }
                internalTestingForm.reset();
                setTimeout(closeInternalTestingModal, 2000);
            })
            .catch(() => {
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
                alert('Something went wrong. Please try again or email us directly.');
            });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current page nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Header scroll effect
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Optimize hero image loading
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    // Check if image is already loaded (cached)
    if (heroImage.complete && heroImage.naturalHeight !== 0) {
        heroImage.classList.add('loaded');
    } else {
        // Wait for image to load
        heroImage.addEventListener('load', () => {
            heroImage.classList.add('loaded');
        });
        // Fallback: show image after timeout even if load event doesn't fire
        setTimeout(() => {
            heroImage.classList.add('loaded');
        }, 100);
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize scroll animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll-fade-in class to all cards and interactive elements
    const animatedElements = document.querySelectorAll(`
        .feature-card,
        .trust-item,
        .host-benefit-card,
        .problem-item,
        .differentiator-item,
        .host-step-card,
        .host-step-item,
        .booking-item,
        .finance-info-card,
        .booking-feature-item,
        .help-contact-form-wrapper,
        .blog-card,
        .car-item,
        .benefit-content,
        .faq-item,
        .host-section-block,
        .content-block,
        .legal-section
    `);
    
    animatedElements.forEach((el, index) => {
        // Skip if element is in a hero section
        if (el.closest('.hero, .about-hero, .host-page-hero, .legal-hero, .page-header, .apps-hero')) {
            return;
        }
        
        el.classList.add('scroll-fade-in');
        
        // Add staggered delay for cards in grids (only for direct children)
        const parent = el.parentElement;
        if (parent && (
            parent.classList.contains('features-grid') ||
            parent.classList.contains('trust-grid') ||
            parent.classList.contains('problems-grid') ||
            parent.classList.contains('differentiators-grid') ||
            parent.classList.contains('differentiators-list') ||
            parent.classList.contains('host-steps-list') ||
            parent.classList.contains('host-steps-grid') ||
            parent.classList.contains('finances-info-grid') ||
            parent.classList.contains('bookings-features-grid') ||
            parent.classList.contains('blogs-grid') ||
            parent.classList.contains('host-benefits')
        )) {
            const siblings = Array.from(parent.children);
            const delayIndex = siblings.indexOf(el) % 3;
            if (delayIndex === 1) el.classList.add('scroll-fade-in-delay-1');
            if (delayIndex === 2) el.classList.add('scroll-fade-in-delay-2');
        }
        
        scrollObserver.observe(el);
    });
    
    // Animate sections (excluding hero sections)
    const sections = document.querySelectorAll(`
        .features,
        .safety-trust,
        .become-host,
        .faq-section,
        .cta,
        .problems-section,
        .differentiators-section,
        .story-section,
        .help-section,
        .blogs-section,
        .host-content-section,
        .host-steps-section,
        .bookings-section,
        .content-section
    `);
    
    sections.forEach(section => {
        section.classList.add('scroll-fade-in');
        scrollObserver.observe(section);
    });
    
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        if (!title.closest('.hero, .about-hero, .host-page-hero, .legal-hero, .page-header, .apps-hero')) {
            title.classList.add('scroll-fade-in');
            scrollObserver.observe(title);
        }
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});