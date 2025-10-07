// 🎬 Advanced Animation System
// Cutting-edge motion design with GSAP, WebGL, and scroll magic

class AdvancedAnimations {
    constructor() {
        this.scrollPosition = 0;
        this.isWebGLSupported = this.checkWebGLSupport();
        this.animationCallbacks = new Map();
        this.intersectionObserver = null;
        this.smoothScroll = null;
        this.splitTexts = [];

        this.init();
    }

    init() {
        this.loadDependencies()
            .then(() => {
                this.initializeSmoothScroll();
                this.setupScrollTriggers();
                this.initializeWebGL();
                this.setupSplitTextAnimations();
                this.createInfiniteScrollLoop();
                this.setupViewportDetection();
                this.createAdvancedEasing();
                this.startRenderLoop();
            })
            .catch(err => console.warn('Advanced animations initialization failed:', err));
    }

    async loadDependencies() {
        // Load GSAP and plugins
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js');

        // Load Locomotive Scroll
        await this.loadScript('https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.js');
        await this.loadCSS('https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.css');

        // Register GSAP plugins
        if (window.gsap) {
            gsap.registerPlugin(ScrollTrigger, TextPlugin);
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    loadCSS(href) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`link[href="${href}"]`)) {
                resolve();
                return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    initializeSmoothScroll() {
        if (!window.LocomotiveScroll) return;

        // Add smooth scroll container
        document.body.setAttribute('data-scroll-container', '');

        this.smoothScroll = new LocomotiveScroll({
            el: document.body,
            smooth: true,
            multiplier: 1,
            class: 'is-revealed',
            scrollbarContainer: false,
            lerp: 0.1,
            smartphone: {
                smooth: true
            },
            tablet: {
                smooth: true
            }
        });

        // Update ScrollTrigger
        this.smoothScroll.on('scroll', () => {
            if (window.ScrollTrigger) {
                ScrollTrigger.update();
            }
        });
    }

    setupScrollTriggers() {
        if (!window.gsap || !window.ScrollTrigger) return;

        // Hero parallax and scale
        gsap.to('.hero', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Stagger animations for sections
        gsap.utils.toArray('section').forEach((section, i) => {
            gsap.fromTo(section.children, {
                y: 100,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Advanced particle system scroll response
        this.setupParticleScrollTrigger();

        // Text reveal animations
        this.setupTextRevealAnimations();

        // Skills grid advanced animations
        this.setupSkillsAnimations();
    }

    setupParticleScrollTrigger() {
        if (!window.gsap) return;

        ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: self => {
                const progress = self.progress;
                this.updateParticleSystem(progress);
                this.updateColorPalette(progress);
            }
        });
    }

    updateParticleSystem(progress) {
        // Enhance existing particle system with scroll-based behavior
        const canvas = document.getElementById('particles');
        if (canvas && window.particleSystem) {
            // Modify particle density based on scroll
            const density = this.mapRange(progress, 0, 1, 0.5, 2);

            // Change particle colors through spectrum
            const hue = this.mapRange(progress, 0, 1, 180, 300);

            // Update particle system if methods exist
            if (window.particleSystem.updateDensity) {
                window.particleSystem.updateDensity(density);
            }
            if (window.particleSystem.updateHue) {
                window.particleSystem.updateHue(hue);
            }
        }
    }

    updateColorPalette(progress) {
        // Dynamic color shifting based on scroll position
        const hue = this.mapRange(progress, 0, 1, 180, 280);
        document.documentElement.style.setProperty('--dynamic-hue', hue);
        document.documentElement.style.setProperty('--scroll-progress', progress);
    }

    setupTextRevealAnimations() {
        if (!window.gsap) return;

        // Split text into characters for advanced animations
        gsap.utils.toArray('h1, h2, h3').forEach(heading => {
            this.splitTextElement(heading);
        });

        // Typewriter effect for important text
        gsap.utils.toArray('.typewriter').forEach(element => {
            this.createTypewriterEffect(element);
        });
    }

    splitTextElement(element) {
        const text = element.textContent;
        const chars = text.split('').map(char =>
            char === ' ' ? '<span class="char"> </span>' : `<span class="char">${char}</span>`
        ).join('');

        element.innerHTML = chars;
        this.splitTexts.push(element);

        // Animate characters in sequence
        gsap.fromTo(element.querySelectorAll('.char'), {
            y: 100,
            opacity: 0,
            rotateX: -90
        }, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: {
                amount: 0.8,
                from: 'random'
            },
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    setupSplitTextAnimations() {
        // Set up text splitting animations for fancy effects
        const textElements = document.querySelectorAll('.split-text, h1, h2, .hero-title');

        textElements.forEach(element => {
            if (!element.classList.contains('split-initialized') && element.textContent.length < 200) {
                element.classList.add('split-initialized');
                this.splitTextElement(element);
            }
        });

        console.debug('Split text animations initialized');
    }

    createTypewriterEffect(element) {
        if (!window.gsap) return;

        const text = element.textContent;
        element.textContent = '';

        gsap.to(element, {
            duration: text.length * 0.05,
            text: text,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    setupSkillsAnimations() {
        if (!window.gsap) return;

        const skillItems = gsap.utils.toArray('.skill-item, .project-card');

        skillItems.forEach((item, i) => {
            // Morphing hover effects
            gsap.set(item, {
                transformOrigin: 'center center'
            });

            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    scale: 1.05,
                    rotateY: 10,
                    z: 50,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    scale: 1,
                    rotateY: 0,
                    z: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });

            // Scroll-triggered entrance
            gsap.fromTo(item, {
                y: 100,
                opacity: 0,
                rotateX: 45,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                scale: 1,
                duration: 1.2,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    createInfiniteScrollLoop() {
        // Detect when user reaches bottom and smoothly return to top
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: self => {
                if (self.progress > 0.95) {
                    this.triggerReturnToTop();
                }
            }
        });
    }

    triggerReturnToTop() {
        if (this.isReturningToTop) return;
        this.isReturningToTop = true;

        // Create magical return to top animation
        gsap.to(window, {
            scrollTo: { y: 0, autoKill: false },
            duration: 2,
            ease: 'power2.inOut',
            onComplete: () => {
                this.isReturningToTop = false;
                this.createTopReachedEffect();
            }
        });
    }

    createTopReachedEffect() {
        // Burst of particles or visual effect when returning to top
        const burst = document.createElement('div');
        burst.className = 'scroll-burst';
        burst.innerHTML = '✨';
        burst.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 0;
            pointer-events: none;
            z-index: 10000;
        `;

        document.body.appendChild(burst);

        gsap.to(burst, {
            fontSize: '100px',
            duration: 0.5,
            ease: 'back.out(1.7)',
            onComplete: () => {
                gsap.to(burst, {
                    opacity: 0,
                    scale: 2,
                    duration: 0.5,
                    onComplete: () => burst.remove()
                });
            }
        });
    }

    setupViewportDetection() {
        // Advanced intersection observer for performance
        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: [0, 0.25, 0.5, 0.75, 1.0]
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const ratio = entry.intersectionRatio;

                // Dynamic opacity based on visibility
                gsap.to(element, {
                    opacity: this.mapRange(ratio, 0, 1, 0.3, 1),
                    duration: 0.3
                });

                // Trigger custom animations based on visibility
                if (ratio > 0.5) {
                    this.triggerElementAnimation(element);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('section, .project-card, .skill-item').forEach(el => {
            this.intersectionObserver.observe(el);
        });
    }

    triggerElementAnimation(element) {
        if (element.classList.contains('animated')) return;
        element.classList.add('animated');

        // Element-specific animations
        if (element.classList.contains('project-card')) {
            this.animateProjectCard(element);
        } else if (element.classList.contains('skill-item')) {
            this.animateSkillItem(element);
        }
    }

    animateProjectCard(card) {
        if (!window.gsap) return;

        gsap.fromTo(card, {
            rotateY: -45,
            transformPerspective: 1000
        }, {
            rotateY: 0,
            duration: 1,
            ease: 'power2.out'
        });
    }

    animateSkillItem(item) {
        if (!window.gsap) return;

        gsap.fromTo(item, {
            scale: 0.8,
            rotation: -10
        }, {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
    }

    createAdvancedEasing() {
        // Custom easing functions for unique feel
        if (!window.gsap) return;

        // Register custom eases
        gsap.registerEase('mystical', 'M0,0 C0.25,0.1 0.25,1 1,1');
        gsap.registerEase('ethereal', 'M0,0 C0.175,0.885 0.32,1 1,1');
    }

    initializeWebGL() {
        if (!this.isWebGLSupported) return;

        this.createWebGLCanvas();
        this.initializeShaders();
        this.startWebGLRenderLoop();
    }

    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext &&
                     canvas.getContext('webgl'));
        } catch (e) {
            return false;
        }
    }

    createWebGLCanvas() {
        this.webglCanvas = document.createElement('canvas');
        this.webglCanvas.id = 'webgl-bg';
        this.webglCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        `;

        document.body.insertBefore(this.webglCanvas, document.body.firstChild);

        this.gl = this.webglCanvas.getContext('webgl');
        this.resizeWebGLCanvas();

        window.addEventListener('resize', () => this.resizeWebGLCanvas());
    }

    resizeWebGLCanvas() {
        this.webglCanvas.width = window.innerWidth;
        this.webglCanvas.height = window.innerHeight;
        if (this.gl) {
            this.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        }
    }

    initializeShaders() {
        // Vertex shader
        const vertexShaderSource = `
            attribute vec2 a_position;
            varying vec2 v_uv;
            void main() {
                v_uv = a_position * 0.5 + 0.5;
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        // Fragment shader with cosmic effect
        const fragmentShaderSource = `
            precision mediump float;
            varying vec2 v_uv;
            uniform float u_time;
            uniform float u_scroll;
            uniform vec2 u_resolution;

            float noise(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            void main() {
                vec2 st = v_uv;

                // Cosmic wave effect based on scroll
                float wave = sin(st.x * 10.0 + u_time * 2.0 + u_scroll * 5.0) * 0.1;
                st.y += wave;

                // Dynamic color based on position and scroll
                vec3 color = vec3(
                    0.1 + sin(u_time + st.x * 3.0) * 0.1,
                    0.2 + sin(u_time * 1.3 + st.y * 4.0 + u_scroll) * 0.1,
                    0.3 + sin(u_time * 0.7 + (st.x + st.y) * 2.0) * 0.1
                );

                // Add noise for texture
                float n = noise(st * 10.0 + u_time * 0.1);
                color += n * 0.05;

                // Fade based on scroll position
                color *= 0.3 + u_scroll * 0.2;

                gl_FragColor = vec4(color, 0.8);
            }
        `;

        this.shaderProgram = this.createShaderProgram(vertexShaderSource, fragmentShaderSource);
        this.setupWebGLBuffers();
    }

    createShaderProgram(vertexSource, fragmentSource) {
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);

        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Shader program failed to link');
            return null;
        }

        return program;
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    setupWebGLBuffers() {
        // Full screen quad
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1
        ]);

        this.positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

        // Get uniform and attribute locations
        this.uniforms = {
            time: this.gl.getUniformLocation(this.shaderProgram, 'u_time'),
            scroll: this.gl.getUniformLocation(this.shaderProgram, 'u_scroll'),
            resolution: this.gl.getUniformLocation(this.shaderProgram, 'u_resolution')
        };

        this.attributes = {
            position: this.gl.getAttribLocation(this.shaderProgram, 'a_position')
        };
    }

    startWebGLRenderLoop() {
        const render = (time) => {
            if (!this.gl || !this.shaderProgram) return;

            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.useProgram(this.shaderProgram);

            // Update uniforms
            this.gl.uniform1f(this.uniforms.time, time * 0.001);
            this.gl.uniform1f(this.uniforms.scroll, this.scrollPosition);
            this.gl.uniform2f(this.uniforms.resolution, window.innerWidth, window.innerHeight);

            // Set up vertex attributes
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
            this.gl.enableVertexAttribArray(this.attributes.position);
            this.gl.vertexAttribPointer(this.attributes.position, 2, this.gl.FLOAT, false, 0, 0);

            // Draw
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    }

    startRenderLoop() {
        // Main animation loop with LERP
        const animate = () => {
            this.updateScrollPosition();
            this.updateAnimations();
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }

    updateScrollPosition() {
        const targetScroll = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
        this.scrollPosition = this.lerp(this.scrollPosition, targetScroll, 0.1);
    }

    updateAnimations() {
        // Update any frame-based animations
        this.updateMouseFollower();
        this.updateFloatingElements();
    }

    updateMouseFollower() {
        // Enhanced cursor following with transform hooks
        const cursor = document.querySelector('.cursor-follower');
        if (cursor && this.mousePosition) {
            gsap.to(cursor, {
                x: this.mousePosition.x,
                y: this.mousePosition.y,
                duration: 0.8,
                ease: 'power2.out'
            });
        }
    }

    updateFloatingElements() {
        // Floating animation for special elements
        document.querySelectorAll('.float-element').forEach((el, i) => {
            const time = Date.now() * 0.001;
            const offset = i * 0.5;

            gsap.set(el, {
                y: Math.sin(time + offset) * 10,
                rotation: Math.sin(time * 0.5 + offset) * 2
            });
        });
    }

    // Utility functions
    mapRange(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // Mouse tracking
    trackMouse() {
        document.addEventListener('mousemove', (e) => {
            this.mousePosition = {
                x: e.clientX,
                y: e.clientY
            };
        });
    }

    // Destroy method for cleanup
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }

        if (this.smoothScroll) {
            this.smoothScroll.destroy();
        }

        if (window.ScrollTrigger) {
            ScrollTrigger.killAll();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.advancedAnimations = new AdvancedAnimations();
});

// Export for integration
window.AdvancedAnimations = AdvancedAnimations;