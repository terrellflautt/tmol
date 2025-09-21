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
        if (this.form) {
            this.accessKeyField = this.form.querySelector('input[name="access_key"]');
            this.init();
        }
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupEmailLinks();
        }
    }

    setupEmailLinks() {
        // Handle different email submissions
        const emailLinks = document.querySelectorAll('a[data-email]');
        emailLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleEmailClick(e));
        });
    }

    handleEmailClick(e) {
        e.preventDefault();
        const email = e.target.dataset.email;
        const accessKeys = {
            'Terrell.Flautt@gmail.com': 'eafc242f-6c42-4d16-9253-28c7b6969aa7',
            'birthmybuild@gmail.com': '0da4e560-820a-4b81-8b85-91a90e019e01',
            'nickelpiedev@gmail.com': '0f2722a4-2b59-46c6-9fbb-833d5c605900',
            'snapitsaas@gmail.com': '941dde05-6699-4793-b170-fb81b1659e32'
        };

        if (accessKeys[email]) {
            // Set the correct access key for routing
            this.accessKeyField.value = accessKeys[email];

            // Update form subject to indicate which email was clicked
            const subjectField = this.form.querySelector('input[name="subject"]');
            if (subjectField) {
                subjectField.value = `New Contact Form Submission for ${email} from terrellflautt.com`;
            }

            // Scroll to form and focus
            this.form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                document.getElementById('name').focus();
            }, 500);

            // Visual feedback that email was selected
            this.showEmailSelected(email);
        }
    }

    showEmailSelected(email) {
        // Add a subtle indicator showing which email will receive the message
        let indicator = document.querySelector('.email-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'email-indicator';
            indicator.style.cssText = `
                margin-bottom: 1rem;
                padding: 0.5rem;
                background: rgba(102, 126, 234, 0.1);
                border: 1px solid rgba(102, 126, 234, 0.2);
                border-radius: 5px;
                color: rgba(102, 126, 234, 0.9);
                font-size: 0.9rem;
                text-align: center;
            `;
            this.form.insertBefore(indicator, this.form.firstChild);
        }
        indicator.textContent = `Message will be sent to: ${email}`;

        // Remove indicator after form submission or 10 seconds
        setTimeout(() => {
            if (indicator && indicator.parentNode) {
                indicator.remove();
            }
        }, 10000);
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
                this.showMessage('Message sent successfully!', 'success');
                this.form.reset();
                this.resetFormLabels();
                this.clearEmailIndicator();
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

    clearEmailIndicator() {
        const indicator = document.querySelector('.email-indicator');
        if (indicator && indicator.parentNode) {
            indicator.remove();
        }
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

// Quiet Details - Subtle touches for the observant
class QuietDetails {
    constructor() {
        this.visitCount = parseInt(localStorage.getItem('visits') || '0') + 1;
        localStorage.setItem('visits', this.visitCount.toString());

        this.init();
    }

    init() {
        // Very occasionally, add a small detail for returning visitors
        if (this.visitCount > 1 && Math.random() < 0.3) {
            this.addReturnVisitorDetail();
        }

        // Hidden click area in empty space
        this.createHiddenInteraction();

        // Subtle time-based changes
        this.addTimeBasedDetails();
    }

    addReturnVisitorDetail() {
        // Subtly change one small thing for returning visitors
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle && this.visitCount > 2) {
            setTimeout(() => {
                subtitle.textContent = 'Building tomorrow\'s infrastructure, one visit at a time';
                setTimeout(() => {
                    subtitle.textContent = 'Building tomorrow\'s infrastructure';
                }, 3000);
            }, 2000);
        }
    }

    createHiddenInteraction() {
        // One tiny invisible area that responds when clicked
        const hiddenArea = document.createElement('div');
        hiddenArea.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 10px;
            height: 10px;
            cursor: crosshair;
            opacity: 0;
        `;

        hiddenArea.addEventListener('click', () => {
            // Brief, subtle animation
            hiddenArea.style.background = 'rgba(102, 126, 234, 0.3)';
            hiddenArea.style.borderRadius = '50%';
            hiddenArea.style.opacity = '1';
            hiddenArea.style.transform = 'scale(3)';
            hiddenArea.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                hiddenArea.style.opacity = '0';
                hiddenArea.style.transform = 'scale(1)';
            }, 1000);
        });

        document.body.appendChild(hiddenArea);
    }

    addTimeBasedDetails() {
        const hour = new Date().getHours();

        // Very subtle greeting based on time of day
        if (hour >= 22 || hour <= 5) {
            // Late night/early morning - slightly dimmer particles
            const canvas = document.getElementById('particles');
            if (canvas) {
                setTimeout(() => {
                    canvas.style.opacity = '0.7';
                }, 5000);
            }
        }

        // Progressive discovery system
        this.setupProgressiveDiscovery();
    }

    setupProgressiveDiscovery() {
        let interactionCount = 0;
        let scrollDepth = 0;
        let timeSpent = 0;
        let hoverCount = 0;

        const startTime = Date.now();

        // Track scroll engagement
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            scrollDepth = Math.max(scrollDepth, currentScroll / maxScroll);

            this.checkDiscoveryTriggers(interactionCount, scrollDepth, timeSpent, hoverCount);
        });

        // Track hover engagement
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a, button, .project-card, .skill-item')) {
                hoverCount++;
                this.checkDiscoveryTriggers(interactionCount, scrollDepth, timeSpent, hoverCount);
            }
        });

        // Track click engagement
        document.addEventListener('click', () => {
            interactionCount++;
            this.checkDiscoveryTriggers(interactionCount, scrollDepth, timeSpent, hoverCount);
        });

        // Track time spent
        setInterval(() => {
            timeSpent = (Date.now() - startTime) / 1000;
            this.checkDiscoveryTriggers(interactionCount, scrollDepth, timeSpent, hoverCount);
        }, 5000);
    }

    checkDiscoveryTriggers(interactions, scroll, time, hovers) {
        const journeyGateway = document.getElementById('journey-gateway');
        if (!journeyGateway) return;

        // Level 1: Easy discovery - After some basic engagement
        if (interactions >= 2 && scroll > 0.3 && time > 15) {
            this.revealJourneyGateway(journeyGateway);
        }

        // Level 2: Medium discovery - After more exploration
        if (interactions >= 5 && scroll > 0.6 && time > 45 && hovers >= 3) {
            this.enhanceDiscoveries();
        }

        // Level 3: Advanced discovery - For engaged users
        if (interactions >= 10 && scroll > 0.8 && time > 90 && hovers >= 8) {
            this.unlockAdvancedFeatures();
        }
    }

    revealJourneyGateway(gateway) {
        if (gateway.style.opacity === '0') {
            gateway.style.opacity = '1';
            gateway.style.transform = 'translateY(0)';

            // Add click handler for the journey button
            const journeyBtn = document.getElementById('begin-journey');
            if (journeyBtn && !journeyBtn.dataset.activated) {
                journeyBtn.dataset.activated = 'true';
                journeyBtn.addEventListener('click', () => {
                    this.beginUserJourney();
                });
            }
        }
    }

    enhanceDiscoveries() {
        // Subtle text changes for engaged users
        const subtitleText = document.querySelector('.subtitle-text');
        if (subtitleText && !subtitleText.dataset.enhanced) {
            subtitleText.dataset.enhanced = 'true';
            setTimeout(() => {
                subtitleText.textContent = 'Building tomorrow\'s infrastructure with you';
                setTimeout(() => {
                    subtitleText.textContent = 'Building tomorrow\'s infrastructure';
                }, 3000);
            }, 1000);
        }

        // Make hidden area slightly more visible
        this.createSecondaryHiddenArea();
    }

    unlockAdvancedFeatures() {
        // For highly engaged users, unlock more subtle features
        this.addAdvancedInteractions();
        this.enableWordEvolution();
        this.revealColorConsciousnessGame();
    }

    createSecondaryHiddenArea() {
        if (document.getElementById('secondary-discovery')) return;

        const secondaryArea = document.createElement('div');
        secondaryArea.id = 'secondary-discovery';
        secondaryArea.style.cssText = `
            position: fixed;
            top: 50%;
            left: 10px;
            width: 8px;
            height: 8px;
            cursor: pointer;
            opacity: 0.1;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            transition: all 0.3s ease;
        `;

        secondaryArea.addEventListener('click', () => {
            this.triggerSecondaryDiscovery();
        });

        secondaryArea.addEventListener('mouseenter', () => {
            secondaryArea.style.opacity = '0.5';
            secondaryArea.style.transform = 'scale(1.5)';
        });

        secondaryArea.addEventListener('mouseleave', () => {
            secondaryArea.style.opacity = '0.1';
            secondaryArea.style.transform = 'scale(1)';
        });

        document.body.appendChild(secondaryArea);
    }

    beginUserJourney() {
        // Save that user has begun their journey
        localStorage.setItem('journey_begun', 'true');

        // Subtle confirmation
        const journeyBtn = document.getElementById('begin-journey');
        journeyBtn.textContent = 'Journey Begun';
        journeyBtn.style.background = 'rgba(102, 126, 234, 0.8)';

        setTimeout(() => {
            journeyBtn.textContent = 'Begin Journey';
            journeyBtn.style.background = '';
        }, 2000);

        // Enable additional features for journey users
        this.enableJourneyFeatures();
    }

    triggerSecondaryDiscovery() {
        // Create a subtle ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            top: 50%;
            left: 10px;
            width: 2px;
            height: 2px;
            border: 1px solid rgba(102, 126, 234, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: discoverRipple 2s ease-out forwards;
            transform: translate(-50%, -50%);
        `;

        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 2000);

        // Track discovery
        const discoveries = parseInt(localStorage.getItem('discoveries') || '0') + 1;
        localStorage.setItem('discoveries', discoveries.toString());

        if (discoveries >= 3) {
            this.unlockReturnVisitorFeatures();
        }
    }

    enableJourneyFeatures() {
        // Activate returning visitor evolution
        if (window.returningVisitorEvolution) {
            window.returningVisitorEvolution.activateJourneyMode();
        }

        // Enable word evolution for journey users
        if (window.dynamicWordEvolution) {
            window.dynamicWordEvolution.enableSubtleEvolution();
        }
    }

    addAdvancedInteractions() {
        // Add more sophisticated hidden interactions for engaged users
        document.querySelectorAll('.project-card').forEach(card => {
            if (!card.dataset.advancedEnabled) {
                card.dataset.advancedEnabled = 'true';

                let doubleClickTimer = null;
                card.addEventListener('click', () => {
                    if (doubleClickTimer) {
                        clearTimeout(doubleClickTimer);
                        doubleClickTimer = null;
                        this.triggerAdvancedCardFeature(card);
                    } else {
                        doubleClickTimer = setTimeout(() => {
                            doubleClickTimer = null;
                        }, 300);
                    }
                });
            }
        });
    }

    triggerAdvancedCardFeature(card) {
        // Subtle highlight for double-clicked cards
        card.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
        setTimeout(() => {
            card.style.boxShadow = '';
        }, 1500);
    }

    enableWordEvolution() {
        // Allow subtle word changes for highly engaged users
        if (window.dynamicWordEvolution) {
            window.dynamicWordEvolution.enableAdvancedEvolution();
        }
    }

    unlockReturnVisitorFeatures() {
        // Special features for users who discover multiple secrets
        localStorage.setItem('advanced_user', 'true');
    }

    revealColorConsciousnessGame() {
        if (document.getElementById('color-consciousness-game')) return;

        // Create a subtle indicator for the color game
        const gameIndicator = document.createElement('div');
        gameIndicator.id = 'color-game-indicator';
        gameIndicator.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3);
            border-radius: 50%;
            cursor: pointer;
            opacity: 0.3;
            transition: all 0.3s ease;
            animation: colorPulse 3s infinite ease-in-out;
        `;

        gameIndicator.addEventListener('mouseenter', () => {
            gameIndicator.style.opacity = '0.8';
            gameIndicator.style.transform = 'scale(1.2)';
        });

        gameIndicator.addEventListener('mouseleave', () => {
            gameIndicator.style.opacity = '0.3';
            gameIndicator.style.transform = 'scale(1)';
        });

        gameIndicator.addEventListener('click', () => {
            this.launchColorConsciousnessGame();
            gameIndicator.remove();
        });

        document.body.appendChild(gameIndicator);
    }

    launchColorConsciousnessGame() {
        const game = document.createElement('div');
        game.id = 'color-consciousness-game';
        game.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h3>🌈 Color Consciousness</h3>
                    <button class="close-game">×</button>
                </div>
                <div class="color-grid">
                    <div class="color-cell" data-color="red" style="background: #ff6b6b;"></div>
                    <div class="color-cell" data-color="blue" style="background: #4ecdc4;"></div>
                    <div class="color-cell" data-color="green" style="background: #45b7d1;"></div>
                    <div class="color-cell" data-color="yellow" style="background: #feca57;"></div>
                    <div class="color-cell" data-color="purple" style="background: #ff9ff3;"></div>
                    <div class="color-cell" data-color="orange" style="background: #fd9644;"></div>
                </div>
                <div class="game-controls">
                    <button class="start-sequence-btn">Start Sequence</button>
                    <div class="score">Level: <span class="level">1</span></div>
                </div>
            </div>
        `;

        game.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            width: 300px;
            background: rgba(0, 0, 0, 0.95);
            color: white;
            padding: 20px;
            border-radius: 15px;
            z-index: 10000;
            opacity: 0;
            transition: all 0.3s ease;
            border: 1px solid rgba(102, 126, 234, 0.3);
        `;

        document.body.appendChild(game);

        // Animate in
        setTimeout(() => {
            game.style.opacity = '1';
            game.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);

        // Set up game logic
        this.setupColorGameLogic(game);
    }

    setupColorGameLogic(gameElement) {
        let sequence = [];
        let playerSequence = [];
        let level = 1;
        let isPlaying = false;
        let isPlayerTurn = false;

        const cells = gameElement.querySelectorAll('.color-cell');
        const startBtn = gameElement.querySelector('.start-sequence-btn');
        const levelDisplay = gameElement.querySelector('.level');
        const closeBtn = gameElement.querySelector('.close-game');

        closeBtn.addEventListener('click', () => {
            gameElement.remove();
        });

        startBtn.addEventListener('click', () => {
            if (!isPlaying) {
                startNewLevel();
            }
        });

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                if (isPlayerTurn) {
                    const color = cell.dataset.color;
                    playerSequence.push(color);
                    flashCell(cell, 300);

                    // Check if correct
                    const currentIndex = playerSequence.length - 1;
                    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
                        resetGame();
                    } else if (playerSequence.length === sequence.length) {
                        level++;
                        levelDisplay.textContent = level;
                        setTimeout(startNewLevel, 800);
                    }
                }
            });
        });

        function startNewLevel() {
            isPlaying = true;
            isPlayerTurn = false;
            playerSequence = [];
            startBtn.disabled = true;

            // Generate new sequence
            sequence = [];
            for (let i = 0; i < level + 1; i++) {
                const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
                sequence.push(colors[Math.floor(Math.random() * colors.length)]);
            }

            // Show sequence
            showSequence();
        }

        function showSequence() {
            let index = 0;
            const interval = setInterval(() => {
                if (index < sequence.length) {
                    const color = sequence[index];
                    const cell = gameElement.querySelector(`[data-color="${color}"]`);
                    flashCell(cell, 600);
                    index++;
                } else {
                    clearInterval(interval);
                    // Player's turn
                    setTimeout(() => {
                        isPlayerTurn = true;
                        startBtn.disabled = false;
                    }, 800);
                }
            }, 800);
        }

        function flashCell(cell, duration) {
            const originalOpacity = cell.style.opacity || '0.7';
            cell.style.opacity = '1';
            cell.style.transform = 'scale(1.1)';
            setTimeout(() => {
                cell.style.opacity = originalOpacity;
                cell.style.transform = 'scale(1)';
            }, duration);
        }

        function resetGame() {
            isPlaying = false;
            isPlayerTurn = false;
            level = 1;
            levelDisplay.textContent = level;
            startBtn.disabled = false;
        }

        // Initialize cell styles
        cells.forEach(cell => {
            cell.style.opacity = '0.7';
            cell.style.transition = 'all 0.2s ease';
            cell.style.cursor = 'pointer';
            cell.style.border = '2px solid transparent';
        });
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

    // Add quiet details for the observant
    new QuietDetails();

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