//

class ContributeAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupParticleCanvas();
        this.createFloatingShapes();
        this.animateCounters();
        this.setupScrollAnimations();
    }

    setupParticleCanvas() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: 0, y: 0 };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse movement tracking
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 3 + 1;
                this.color = `rgba(0, 255, 255, ${Math.random() * 0.3 + 0.1})`;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.vx += dx * 0.0001;
                    this.vy += dy * 0.0001;
                }

                // Boundary checks
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Keep particles within bounds
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((a, i) => {
                particles.slice(i + 1).forEach(b => {
                    const distance = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    createFloatingShapes() {
        const container = document.getElementById('floatingShapes');
        if (!container) return;

        const createShape = () => {
            const shape = document.createElement('div');
            shape.className = 'shape';

            const size = Math.random() * 100 + 20;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;

            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.left = `${left}%`;
            shape.style.animationDuration = `${animationDuration}s`;
            shape.style.animationDelay = `${delay}s`;

            container.appendChild(shape);

            // Remove shape after animation
            setTimeout(() => {
                if (shape.parentNode) {
                    shape.parentNode.removeChild(shape);
                }
            }, (animationDuration + delay) * 1000);
        };

        // Create initial shapes
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createShape(), i * 2000);
        }

        // Continue creating shapes
        setInterval(createShape, 3000);
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');

        const animateNumber = (element, target, duration = 2000) => {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            element.classList.add('counting');

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                    element.classList.remove('counting');
                }

                if (target === '∞') {
                    element.textContent = '∞';
                    clearInterval(timer);
                    element.classList.remove('counting');
                } else if (target.includes('%')) {
                    element.textContent = Math.floor(current) + '%';
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 16);
        };

        // Intersection Observer for counter animation
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target.textContent.trim();
                    if (target === '2') {
                        animateNumber(entry.target, 2);
                    } else if (target === '100%') {
                        animateNumber(entry.target, 100);
                    } else if (target === '∞') {
                        entry.target.textContent = '∞';
                        entry.target.classList.add('counting');
                        setTimeout(() => entry.target.classList.remove('counting'), 1000);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    setupScrollAnimations() {
        // Add scroll-triggered animations for cards
        const cards = document.querySelectorAll('.contribution-card, .impact-item');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContributeAnimations();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContributeAnimations;
}