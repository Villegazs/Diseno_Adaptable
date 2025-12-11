// Doctor Website - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#FFFFFF';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonials Carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => card.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        // Show current testimonial
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
        }
        if (testimonialDots[index]) {
            testimonialDots[index].classList.add('active');
        }
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    // Event listeners for testimonials
    if (nextButton) {
        nextButton.addEventListener('click', nextTestimonial);
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', prevTestimonial);
    }

    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto-advance testimonials
    setInterval(nextTestimonial, 8000);

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.nombre || !data.email || !data.telefono || !data.servicio) {
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('.btn-primary');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('¡Solicitud enviada exitosamente! Te contactaremos pronto.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Generate WhatsApp message
                generateWhatsAppMessage(data);
                
            }, 2000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#48BB78' : type === 'error' ? '#F56565' : '#4299E1'};
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease-in forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Generate WhatsApp message
    function generateWhatsAppMessage(data) {
        const message = `Hola Dra. María Victoria Morales,

Mi nombre es ${data.nombre} y me gustaría agendar una cita.

📞 Teléfono: ${data.telefono}
✉️ Email: ${data.email}
🏥 Servicio de interés: ${data.servicio.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}

${data.mensaje ? `📝 Información adicional: ${data.mensaje}` : ''}

Espero su respuesta. ¡Gracias!`;

        const whatsappUrl = `https://wa.me/573152932213?text=${encodeURIComponent(message)}`;
        
        // Show option to open WhatsApp
        setTimeout(() => {
            if (confirm('¿Te gustaría abrir WhatsApp para confirmar tu cita directamente?')) {
                window.open(whatsappUrl, '_blank');
            }
        }, 3000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .patient-card, .highlight, .about-image img');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Loading animations
    const loadingElements = document.querySelectorAll('.hero-content, .hero-image, .section-header');
    loadingElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('loading');
        }, index * 200);
    });

    // Service cards hover effect with tilt
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #2B5F75, #4A90A4);
        z-index: 10000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Search functionality for services
    const createSearchFeature = () => {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar servicios...';
        searchInput.className = 'service-search';
        searchInput.style.cssText = `
            width: 100%;
            max-width: 400px;
            padding: 12px 20px;
            margin: 0 auto 2rem;
            border: 2px solid #E2E8F0;
            border-radius: 25px;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
            display: block;
        `;

        const servicesSection = document.querySelector('.services .container');
        const servicesGrid = document.querySelector('.services-grid');
        
        if (servicesSection && servicesGrid) {
            servicesSection.insertBefore(searchInput, servicesGrid);

            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const serviceCards = document.querySelectorAll('.service-card');

                serviceCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.3s ease-in';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });

            searchInput.addEventListener('focus', function() {
                this.style.borderColor = '#2B5F75';
                this.style.boxShadow = '0 0 0 3px rgba(43, 95, 117, 0.1)';
            });

            searchInput.addEventListener('blur', function() {
                this.style.borderColor = '#E2E8F0';
                this.style.boxShadow = 'none';
            });
        }
    };

    // Initialize search feature
    createSearchFeature();

    // Performance optimization: Debounce scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Scroll-dependent updates here
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Keyboard navigation accessibility
    document.addEventListener('keydown', function(e) {
        // Enable keyboard navigation for testimonials
        if (e.target.closest('.testimonials')) {
            if (e.key === 'ArrowLeft') {
                prevTestimonial();
            } else if (e.key === 'ArrowRight') {
                nextTestimonial();
            }
        }
    });

    // Initialize tooltips
    const initTooltips = () => {
        const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
        
        tooltipTriggers.forEach(trigger => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = trigger.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                white-space: nowrap;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            trigger.addEventListener('mouseenter', function(e) {
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            });
            
            trigger.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            });
        });
    };

    // Print functionality
    const addPrintStyles = () => {
        const printStyles = document.createElement('style');
        printStyles.textContent = `
            @media print {
                * { box-shadow: none !important; }
                .header, .whatsapp-float, .testimonial-nav { display: none !important; }
                .hero, .about, .services, .contact { page-break-inside: avoid; }
                body { font-size: 12pt; line-height: 1.4; }
                h1, h2, h3 { page-break-after: avoid; }
            }
        `;
        document.head.appendChild(printStyles);
    };

    // Initialize additional features
    initTooltips();
    addPrintStyles();

    // Console welcome message
    console.log('%c🏥 Dra. María Victoria Morales - Website Loaded Successfully! 🏥', 
                'background: linear-gradient(90deg, #2B5F75, #4A90A4); color: white; padding: 10px; border-radius: 5px; font-weight: bold;');

});

// FAQ Accordion functionality
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const faqContent = element.nextElementSibling;
    const allFaqItems = document.querySelectorAll('.faq-item');
    const isActive = element.classList.contains('active');
    
    // Close all FAQ items
    allFaqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        header.classList.remove('active');
        content.classList.remove('active');
    });
    
    // If the clicked item wasn't active, open it
    if (!isActive) {
        element.classList.add('active');
        faqContent.classList.add('active');
        
        // Smooth scroll to the opened FAQ item
        setTimeout(() => {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);
    }
}

// Send question functionality
function enviarPregunta() {
    const preguntaInput = document.getElementById('pregunta-personalizada');
    const pregunta = preguntaInput.value.trim();
    
    if (!pregunta) {
        showNotification('Por favor, escribe tu pregunta antes de enviar.', 'error');
        preguntaInput.focus();
        return;
    }
    
    if (pregunta.length < 10) {
        showNotification('Por favor, escribe una pregunta más específica (mínimo 10 caracteres).', 'error');
        preguntaInput.focus();
        return;
    }
    
    // Disable button temporarily
    const button = document.querySelector('.question-btn');
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    button.disabled = true;
    
    // Generate WhatsApp message for question
    const whatsappMessage = `Hola Dra. María Victoria Morales,

Tengo una pregunta específica sobre medicina física y rehabilitación:

❓ "${pregunta}"

Me gustaría agendar una consulta para recibir más información personalizada.

¡Gracias por su atención!`;

    const whatsappUrl = `https://wa.me/573152932213?text=${encodeURIComponent(whatsappMessage)}`;
    
    setTimeout(() => {
        showNotification('¡Pregunta preparada! Te redirigimos a WhatsApp para enviarla directamente.', 'success');
        preguntaInput.value = '';
        button.textContent = originalText;
        button.disabled = false;
        
        // Open WhatsApp after a short delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 2000);
        
    }, 1500);
}

// Enhanced keyboard navigation for FAQ
document.addEventListener('keydown', function(e) {
    if (e.target.closest('.faq-section')) {
        const faqHeaders = document.querySelectorAll('.faq-header');
        const currentIndex = Array.from(faqHeaders).findIndex(header => 
            header === document.activeElement || header.contains(document.activeElement)
        );
        
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target.classList.contains('faq-header') || e.target.closest('.faq-header')) {
                e.preventDefault();
                const header = e.target.classList.contains('faq-header') ? e.target : e.target.closest('.faq-header');
                toggleFaq(header);
            }
        }
        
        if (e.key === 'ArrowDown' && currentIndex < faqHeaders.length - 1) {
            e.preventDefault();
            faqHeaders[currentIndex + 1].focus();
        }
        
        if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            faqHeaders[currentIndex - 1].focus();
        }
    }
});

// Add FAQ accessibility attributes
document.addEventListener('DOMContentLoaded', function() {
    const faqHeaders = document.querySelectorAll('.faq-header');
    const faqContents = document.querySelectorAll('.faq-content');
    
    faqHeaders.forEach((header, index) => {
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('aria-controls', `faq-content-${index}`);
        
        const content = header.nextElementSibling;
        if (content) {
            content.setAttribute('id', `faq-content-${index}`);
            content.setAttribute('role', 'region');
            content.setAttribute('aria-labelledby', `faq-header-${index}`);
        }
        
        header.setAttribute('id', `faq-header-${index}`);
    });
    
    // Observer for FAQ animations
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        faqObserver.observe(item);
    });
});

// CSS Animations for dynamic elements
const additionalStyles = `
    <style>
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-in {
            animation: fadeIn 0.8s ease-out forwards;
        }

        .fade-in {
            animation: fadeIn 0.6s ease-out forwards;
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: auto;
        }

        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);