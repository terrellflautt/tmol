// Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() * 60 + 180 // Cyan to blue range
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.vx += dx * force * 0.0001;
                particle.vy += dy * force * 0.0001;
            }

            // Boundary wrapping
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();

            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                    this.ctx.strokeStyle = `hsl(${(particle.hue + otherParticle.hue) / 2}, 70%, 60%)`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Cursor Follower
class CursorFollower {
    constructor() {
        this.cursor = document.querySelector('.cursor-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        this.animate();
    }

    animate() {
        this.cursorX += (this.mouseX - this.cursorX) * 0.1;
        this.cursorY += (this.mouseY - this.cursorY) * 0.1;

        this.cursor.style.transform = `translate(${this.cursorX - 10}px, ${this.cursorY - 10}px)`;

        requestAnimationFrame(() => this.animate());
    }
}

// Smooth Scrolling Navigation
class SmoothNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');

        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', () => this.updateActiveNav());
    }

    updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Terminal Animation
class TerminalAnimation {
    constructor() {
        this.terminal = document.querySelector('.terminal-body');
        this.commands = [
            { command: 'whoami', output: 'Lead DevOps Engineer' },
            { command: 'cat mission.txt', output: 'Building scalable, beautiful infrastructure that empowers innovation' },
            { command: 'kubectl get inspiration', output: 'NAME\t\tREADY\t\tSTATUS\t\tAGE\ncreativity\t\t1/1\t\tRunning\t\t∞\ninnovation\t\t1/1\t\tRunning\t\t∞\npassion\t\t\t1/1\t\tRunning\t\t∞' }
        ];
        this.currentCommand = 0;
        this.init();
    }

    init() {
        if (this.terminal) {
            this.startAnimation();
        }
    }

    async startAnimation() {
        await this.sleep(2000);

        for (let i = 0; i < this.commands.length; i++) {
            await this.typeCommand(this.commands[i].command);
            await this.sleep(1000);
            await this.showOutput(this.commands[i].output);
            await this.sleep(1500);
        }

        // Add final typing command
        const finalLine = document.createElement('div');
        finalLine.className = 'terminal-line';
        finalLine.innerHTML = '<span class="prompt">$</span> <span class="command typing">echo "Ready to build amazing things together"</span>';
        this.terminal.appendChild(finalLine);
    }

    async typeCommand(command) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = '<span class="prompt">$</span> <span class="command"></span>';
        this.terminal.appendChild(line);

        const commandElement = line.querySelector('.command');

        for (let i = 0; i < command.length; i++) {
            commandElement.textContent += command[i];
            await this.sleep(50);
        }
    }

    async showOutput(output) {
        const outputElement = document.createElement('div');
        outputElement.className = 'terminal-output';
        outputElement.textContent = output;
        this.terminal.appendChild(outputElement);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );

        this.init();
    }

    init() {
        const animatedElements = document.querySelectorAll(
            '.section-title, .section-subtitle, .project-card, .skill-category, .contact-item, .category-title, .category-description, .stat-item'
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Contact Form Handler with Web3Forms Integration
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.formStatus = document.getElementById('formStatus');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate form before submission
        if (!this.validateForm()) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);
        this.showMessage('Sending your message...', 'loading');

        try {
            // Create FormData from form
            const formData = new FormData(this.form);

            // Submit to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.form.reset();
                this.resetFormLabels();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm() {
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Check required fields
        if (!name || !email || !message) {
            this.showMessage('Please fill in all required fields.', 'error');
            return false;
        }

        // Validate email format
        if (!this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        // Check message length
        if (message.length < 10) {
            this.showMessage('Please provide a more detailed message (at least 10 characters).', 'error');
            return false;
        }

        // Check for potential spam (honeypot)
        const botcheck = formData.get('botcheck');
        if (botcheck) {
            this.showMessage('Spam detected. Please try again.', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showMessage(message, type) {
        // Clear existing status
        this.formStatus.className = 'form-status';
        this.formStatus.textContent = message;

        // Add appropriate class and show
        this.formStatus.classList.add(type, 'show');

        // Auto-hide success/error messages after 8 seconds
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                this.formStatus.classList.remove('show');
            }, 8000);
        }
    }

    resetFormLabels() {
        // Reset floating labels to initial state
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.value === '') {
                input.classList.remove('has-value');
            }
        });
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.init();
    }

    init() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleNav());
        }
    }

    toggleNav() {
        this.navLinks.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();

        // Preload critical resources
        this.preloadResources();

        // Optimize scroll events
        this.optimizeScrollEvents();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadResources() {
        // External fonts disabled - using system fonts only
        console.log('Font preloading disabled - using system fonts');
    }

    optimizeScrollEvents() {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Handle scroll-dependent updates here
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const particlesCanvas = document.getElementById('particles');
    if (particlesCanvas) {
        new ParticleSystem(particlesCanvas);
    }

    // Initialize other components
    new CursorFollower();
    new SmoothNavigation();
    new TerminalAnimation();
    new ScrollAnimations();
    new ContactForm();
    new MobileNavigation();
    new PerformanceOptimizer();

    // Add loading animation completion
    document.body.classList.add('loaded');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.classList.add('paused');
    } else {
        // Resume animations when page is visible
        document.body.classList.remove('paused');
    }
});

// Add error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration for PWA capabilities
// Service worker removed - not needed for this project