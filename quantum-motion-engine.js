// 🚀 QUANTUM MOTION ENGINE 🚀
// The most advanced animation system ever created
// Revolutionary motion design that responds to human consciousness

class QuantumMotionEngine {
    constructor() {
        this.isInitialized = false;
        this.dependencies = {
            gsap: null,
            scrollTrigger: null,
            locomotiveScroll: null,
            splitText: null
        };

        this.motionState = {
            scrollProgress: 0,
            scrollVelocity: 0,
            userMotion: { x: 0, y: 0, velocity: 0 },
            viewportDimensions: { width: 0, height: 0 },
            devicePixelRatio: window.devicePixelRatio || 1
        };

        this.animations = new Map();
        this.webglEffects = new Map();
        this.textSplitters = new Map();
        this.transformHooks = new Map();
        this.lerpValues = new Map();

        this.loadDependencies().then(() => this.initialize());
    }

    // 📦 Load Advanced Animation Dependencies
    async loadDependencies() {
        const scripts = [
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/MorphSVGPlugin.min.js',
            'https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.js',
            'https://unpkg.com/split-type'
        ];

        const styleSheets = [
            'https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.css'
        ];

        // Load stylesheets
        for (const href of styleSheets) {
            await this.loadCSS(href);
        }

        // Load scripts
        for (const src of scripts) {
            await this.loadScript(src);
        }

        // Initialize dependencies
        if (window.gsap) {
            this.dependencies.gsap = window.gsap;
            if (window.ScrollTrigger) {
                this.dependencies.gsap.registerPlugin(ScrollTrigger);
                this.dependencies.scrollTrigger = ScrollTrigger;
            }
        }

        if (window.LocomotiveScroll) {
            this.dependencies.locomotiveScroll = window.LocomotiveScroll;
        }

        if (window.SplitType) {
            this.dependencies.splitText = window.SplitType;
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

    // 🎬 Initialize Quantum Motion System
    initialize() {
        if (this.isInitialized) return;

        this.setupSmoothScroll();
        this.initializeScrollTracking();
        this.setupInfiniteScrollLoop();
        this.initializeViewportDetection();
        this.setupTextSplitting();
        this.initializeWebGL();
        this.startQuantumLoop();
        this.createResponsiveAnimations();

        this.isInitialized = true;
        console.log('🚀 Quantum Motion Engine Initialized');
    }

    // 🌊 Setup Advanced Smooth Scroll with Locomotive
    setupSmoothScroll() {
        if (!this.dependencies.locomotiveScroll) return;

        // Add smooth scroll container
        document.body.setAttribute('data-scroll-container', '');

        this.locomotiveScroll = new this.dependencies.locomotiveScroll({
            el: document.body,
            smooth: true,
            multiplier: 1.2,
            class: 'is-revealed',
            scrollbarContainer: false,
            lerp: 0.08,
            smartphone: { smooth: true },
            tablet: { smooth: true },
            getDirection: true,
            getSpeed: true
        });

        // Sync with GSAP ScrollTrigger
        if (this.dependencies.scrollTrigger) {
            this.locomotiveScroll.on('scroll', this.dependencies.scrollTrigger.update);

            this.dependencies.scrollTrigger.scrollerProxy(document.body, {
                scrollTop: (value) => {
                    return arguments.length ? this.locomotiveScroll.scrollTo(value, 0, 0) : this.locomotiveScroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                },
                pinType: document.body.style.transform ? "transform" : "fixed"
            });

            this.dependencies.scrollTrigger.addEventListener("refresh", () => this.locomotiveScroll.update());
            this.dependencies.scrollTrigger.refresh();
        }
    }

    // 📊 Advanced Scroll Tracking
    initializeScrollTracking() {
        if (!this.dependencies.gsap || !this.dependencies.scrollTrigger) return;

        // Track scroll progress
        this.dependencies.scrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                this.motionState.scrollProgress = self.progress;
                this.updateScrollBasedAnimations(self.progress, self.velocity);
            }
        });

        // Track scroll velocity for motion-based effects
        let lastScrollY = 0;
        let lastTime = Date.now();

        const updateVelocity = () => {
            const currentTime = Date.now();
            const currentScrollY = window.scrollY || this.locomotiveScroll?.scroll.instance.scroll.y || 0;
            const deltaTime = currentTime - lastTime;
            const deltaScroll = currentScrollY - lastScrollY;

            this.motionState.scrollVelocity = deltaScroll / deltaTime;

            lastScrollY = currentScrollY;
            lastTime = currentTime;

            requestAnimationFrame(updateVelocity);
        };

        updateVelocity();
    }

    // ♾️ Infinite Scroll Loop (Bottom to Top)
    setupInfiniteScrollLoop() {
        if (!this.dependencies.scrollTrigger) return;

        this.dependencies.scrollTrigger.create({
            trigger: document.body,
            start: "bottom bottom-=100",
            onEnter: () => this.triggerInfiniteLoop(),
            onEnterBack: () => this.triggerInfiniteLoop()
        });
    }

    triggerInfiniteLoop() {
        // Create quantum portal effect
        this.createQuantumPortal();

        // Smooth transition to top
        if (this.locomotiveScroll) {
            this.locomotiveScroll.scrollTo(0, {
                duration: 2000,
                easing: [0.25, 0.0, 0.35, 1.0]
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // 👁️ Advanced Viewport Detection
    initializeViewportDetection() {
        // Enhanced Intersection Observer with consciousness detection
        this.viewportObserver = new IntersectionObserver(
            (entries) => this.handleViewportChanges(entries),
            {
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
                rootMargin: '-10% 0px -10% 0px'
            }
        );

        // Observe all animatable elements
        document.querySelectorAll('[data-animate], .quantum-text, .neural-element, h1, h2, h3, p, .quantum-card').forEach(el => {
            this.viewportObserver.observe(el);
            this.setupElementAnimations(el);
        });

        // Track viewport dimensions
        this.updateViewportDimensions();
        window.addEventListener('resize', () => this.updateViewportDimensions());
    }

    updateViewportDimensions() {
        this.motionState.viewportDimensions = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // Update CSS custom properties
        document.documentElement.style.setProperty('--vw', `${window.innerWidth}px`);
        document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    }

    // ✂️ Revolutionary Text Splitting System
    setupTextSplitting() {
        if (!this.dependencies.splitText) return;

        // Find all text elements for splitting
        const textSelectors = [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            '.quantum-heading', '.hero-title', '.hero-subtitle',
            '[data-split="chars"]', '[data-split="words"]', '[data-split="lines"]'
        ];

        textSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                this.createAdvancedTextSplit(element);
            });
        });
    }

    createAdvancedTextSplit(element) {
        const splitType = element.getAttribute('data-split') || 'chars';

        const splitText = new this.dependencies.splitText(element, {
            types: splitType === 'chars' ? 'chars,words,lines' : splitType,
            tagName: 'span'
        });

        this.textSplitters.set(element, splitText);

        // Create quantum text animations
        this.animateQuantumText(element, splitText, splitType);
    }

    animateQuantumText(element, splitText, type) {
        if (!this.dependencies.gsap) return;

        const chars = splitText.chars || [];
        const words = splitText.words || [];
        const lines = splitText.lines || [];

        // Quantum character emergence
        if (type === 'chars' || type === 'chars,words,lines') {
            this.dependencies.gsap.set(chars, {
                opacity: 0,
                y: 100,
                rotationX: 90,
                transformOrigin: "50% 50% -50px"
            });

            this.dependencies.scrollTrigger.create({
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                onEnter: () => {
                    this.dependencies.gsap.to(chars, {
                        opacity: 1,
                        y: 0,
                        rotationX: 0,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                        stagger: {
                            amount: 0.8,
                            from: "random"
                        }
                    });
                }
            });

            // Mouse interaction effects
            chars.forEach((char, index) => {
                char.addEventListener('mouseenter', () => {
                    this.dependencies.gsap.to(char, {
                        scale: 1.5,
                        color: '#00ff88',
                        duration: 0.3,
                        ease: "back.out(2.7)"
                    });
                });

                char.addEventListener('mouseleave', () => {
                    this.dependencies.gsap.to(char, {
                        scale: 1,
                        color: '',
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });
        }

        // Word-based morphing animations
        if (words.length > 0) {
            this.createWordMorphing(words);
        }

        // Line reveal animations
        if (lines.length > 0) {
            this.createLineReveal(lines);
        }
    }

    createWordMorphing(words) {
        words.forEach((word, index) => {
            // Quantum word breathing
            this.dependencies.gsap.to(word, {
                scale: 1.05,
                duration: 2 + Math.random() * 2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: index * 0.1
            });

            // Scroll-based word animations
            this.dependencies.scrollTrigger.create({
                trigger: word,
                start: "top 90%",
                end: "bottom 10%",
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const hue = 220 + (progress * 140);
                    this.dependencies.gsap.set(word, {
                        filter: `hue-rotate(${hue}deg) saturate(${1 + progress})`
                    });
                }
            });
        });
    }

    createLineReveal(lines) {
        lines.forEach((line, index) => {
            // Quantum line emergence
            this.dependencies.gsap.set(line, {
                clipPath: "inset(0 100% 0 0)"
            });

            this.dependencies.scrollTrigger.create({
                trigger: line,
                start: "top 85%",
                end: "bottom 15%",
                scrub: 0.5,
                onUpdate: (self) => {
                    const progress = self.progress;
                    this.dependencies.gsap.set(line, {
                        clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`
                    });
                }
            });
        });
    }

    // 🎮 WebGL Quantum Effects
    initializeWebGL() {
        this.webglCanvas = document.createElement('canvas');
        this.webglCanvas.id = 'quantum-webgl-canvas';
        this.webglCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 0;
            mix-blend-mode: screen;
            opacity: 0.6;
        `;

        document.body.appendChild(this.webglCanvas);

        this.gl = this.webglCanvas.getContext('webgl2') || this.webglCanvas.getContext('webgl');

        if (this.gl) {
            this.initializeShaders();
            this.setupWebGLUniforms();
            this.resizeWebGL();
            window.addEventListener('resize', () => this.resizeWebGL());
        }
    }

    initializeShaders() {
        // Revolutionary vertex shader
        const vertexShaderSource = `
            attribute vec2 a_position;
            attribute vec2 a_texCoord;
            varying vec2 v_texCoord;

            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
                v_texCoord = a_texCoord;
            }
        `;

        // Quantum fragment shader with consciousness response
        const fragmentShaderSource = `
            precision mediump float;

            uniform float u_time;
            uniform float u_scrollProgress;
            uniform float u_scrollVelocity;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            uniform float u_consciousness;

            varying vec2 v_texCoord;

            // Quantum noise function
            float noise(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            // Consciousness-responsive wave function
            float consciousnessWave(vec2 pos, float time) {
                float wave1 = sin(pos.x * 3.0 + time * 2.0) * 0.5;
                float wave2 = cos(pos.y * 4.0 + time * 1.5) * 0.3;
                float wave3 = sin(length(pos - 0.5) * 8.0 + time * 3.0) * 0.2;

                return (wave1 + wave2 + wave3) * u_consciousness;
            }

            // Quantum field distortion
            vec2 quantumDistort(vec2 pos, float time) {
                float distortion = consciousnessWave(pos, time);
                vec2 distortedPos = pos + vec2(
                    sin(pos.y * 10.0 + time) * distortion * 0.1,
                    cos(pos.x * 12.0 + time) * distortion * 0.1
                );
                return distortedPos;
            }

            void main() {
                vec2 st = gl_FragCoord.xy / u_resolution.xy;
                st = quantumDistort(st, u_time);

                // Consciousness-based color palette
                vec3 color1 = vec3(0.2, 0.4, 0.8); // Neural blue
                vec3 color2 = vec3(0.8, 0.2, 0.6); // Quantum pink
                vec3 color3 = vec3(0.2, 0.8, 0.4); // Consciousness green

                // Dynamic color mixing based on scroll and consciousness
                float mixFactor = sin(u_time + u_scrollProgress * 6.28) * 0.5 + 0.5;
                vec3 baseColor = mix(color1, color2, mixFactor);
                baseColor = mix(baseColor, color3, u_consciousness);

                // Quantum interference patterns
                float pattern = 0.0;
                pattern += sin(st.x * 20.0 + u_time * 2.0) * 0.1;
                pattern += cos(st.y * 25.0 + u_time * 1.5) * 0.1;
                pattern += sin(length(st - vec2(u_mouse.x, 1.0 - u_mouse.y)) * 50.0 + u_time * 4.0) * 0.2;

                // Scroll velocity effects
                pattern += u_scrollVelocity * sin(st.y * 100.0 + u_time * 10.0) * 0.3;

                // Final color composition
                vec3 finalColor = baseColor + pattern;
                finalColor *= (1.0 + u_consciousness * 0.5);

                gl_FragColor = vec4(finalColor, 0.8);
            }
        `;

        this.shaderProgram = this.createShaderProgram(vertexShaderSource, fragmentShaderSource);
    }

    createShaderProgram(vertexSource, fragmentSource) {
        const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fragmentSource);

        const shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);

        return shaderProgram;
    }

    loadShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        return shader;
    }

    setupWebGLUniforms() {
        this.uniforms = {
            time: this.gl.getUniformLocation(this.shaderProgram, 'u_time'),
            scrollProgress: this.gl.getUniformLocation(this.shaderProgram, 'u_scrollProgress'),
            scrollVelocity: this.gl.getUniformLocation(this.shaderProgram, 'u_scrollVelocity'),
            resolution: this.gl.getUniformLocation(this.shaderProgram, 'u_resolution'),
            mouse: this.gl.getUniformLocation(this.shaderProgram, 'u_mouse'),
            consciousness: this.gl.getUniformLocation(this.shaderProgram, 'u_consciousness')
        };

        // Create quad vertices
        const vertices = new Float32Array([
            -1, -1,  0, 0,
             1, -1,  1, 0,
            -1,  1,  0, 1,
             1,  1,  1, 1
        ]);

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
    }

    resizeWebGL() {
        if (!this.gl) return;

        this.webglCanvas.width = window.innerWidth * this.motionState.devicePixelRatio;
        this.webglCanvas.height = window.innerHeight * this.motionState.devicePixelRatio;
        this.webglCanvas.style.width = window.innerWidth + 'px';
        this.webglCanvas.style.height = window.innerHeight + 'px';

        this.gl.viewport(0, 0, this.webglCanvas.width, this.webglCanvas.height);
    }

    // 🔄 Quantum Animation Loop with LERP
    startQuantumLoop() {
        let lastTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;

        const quantumFrame = (currentTime) => {
            const deltaTime = currentTime - lastTime;

            if (deltaTime >= frameInterval) {
                this.updateLerpValues(deltaTime);
                this.updateQuantumAnimations(currentTime);
                this.renderWebGL(currentTime);
                this.updateTransformHooks();

                lastTime = currentTime;
            }

            requestAnimationFrame(quantumFrame);
        };

        requestAnimationFrame(quantumFrame);
    }

    // 📐 Advanced LERP System
    updateLerpValues(deltaTime) {
        this.lerpValues.forEach((config, key) => {
            const alpha = Math.min(1, (config.speed * deltaTime) / 16.67); // 60fps baseline
            config.current = this.lerp(config.current, config.target, alpha);

            if (Math.abs(config.current - config.target) < 0.001) {
                config.current = config.target;
            }
        });
    }

    lerp(start, end, alpha) {
        return start + (end - start) * alpha;
    }

    addLerpValue(key, initial, target, speed = 0.1) {
        this.lerpValues.set(key, {
            current: initial,
            target,
            speed
        });
    }

    // 🎯 Map Function for Value Transformation
    mapValue(value, inputMin, inputMax, outputMin, outputMax) {
        return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
    }

    mapRange(value, inputRange, outputRange) {
        return this.mapValue(value, inputRange[0], inputRange[1], outputRange[0], outputRange[1]);
    }

    // 🔮 Transform Hooks System
    createTransformHook(element, property, mapper) {
        const hookId = Symbol();
        this.transformHooks.set(hookId, {
            element,
            property,
            mapper,
            lastValue: null
        });
        return hookId;
    }

    updateTransformHooks() {
        this.transformHooks.forEach((hook) => {
            const newValue = hook.mapper();

            if (newValue !== hook.lastValue) {
                if (hook.property === 'transform') {
                    hook.element.style.transform = newValue;
                } else if (hook.property === 'opacity') {
                    hook.element.style.opacity = newValue;
                } else if (hook.property === 'scale') {
                    hook.element.style.transform = `scale(${newValue})`;
                } else {
                    hook.element.style[hook.property] = newValue;
                }

                hook.lastValue = newValue;
            }
        });
    }

    // 🎨 Render WebGL Effects
    renderWebGL(time) {
        if (!this.gl || !this.shaderProgram) return;

        this.gl.useProgram(this.shaderProgram);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        // Update uniforms
        this.gl.uniform1f(this.uniforms.time, time * 0.001);
        this.gl.uniform1f(this.uniforms.scrollProgress, this.motionState.scrollProgress);
        this.gl.uniform1f(this.uniforms.scrollVelocity, this.motionState.scrollVelocity);
        this.gl.uniform2f(this.uniforms.resolution, this.webglCanvas.width, this.webglCanvas.height);

        if (this.motionState.userMotion) {
            this.gl.uniform2f(this.uniforms.mouse,
                this.motionState.userMotion.x / window.innerWidth,
                this.motionState.userMotion.y / window.innerHeight
            );
        }

        // Consciousness value from Neural Symphony
        const consciousness = window.neuralSymphony?.getConsciousnessState?.()?.attention || 0;
        this.gl.uniform1f(this.uniforms.consciousness, consciousness);

        // Draw quad
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    // 🌟 Create Responsive Animations
    createResponsiveAnimations() {
        this.createScrollBasedAnimations();
        this.createMouseFollowAnimations();
        this.createViewportAnimations();
        this.createQuantumPortalEffect();
    }

    createScrollBasedAnimations() {
        if (!this.dependencies.gsap) return;

        // Page-filling text animations
        document.querySelectorAll('.hero-title, .quantum-heading').forEach(element => {
            this.dependencies.scrollTrigger.create({
                trigger: element,
                start: "top 50%",
                end: "bottom top",
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const scale = this.mapValue(progress, 0, 1, 1, 3);
                    const opacity = this.mapValue(progress, 0, 1, 1, 0.3);

                    this.dependencies.gsap.set(element, {
                        scale,
                        opacity,
                        filter: `blur(${progress * 2}px)`
                    });
                }
            });
        });

        // Quantum card morphing
        document.querySelectorAll('.quantum-card').forEach((card, index) => {
            this.dependencies.scrollTrigger.create({
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 0.5,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const rotation = this.mapValue(progress, 0, 1, -15, 15);
                    const skew = this.mapValue(progress, 0, 1, 0, 5);

                    this.dependencies.gsap.set(card, {
                        rotationY: rotation,
                        skewY: skew,
                        transformOrigin: "center center"
                    });
                }
            });
        });
    }

    createMouseFollowAnimations() {
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            this.motionState.userMotion = { x: mouseX, y: mouseY };
        });

        // Smooth mouse following with LERP
        const updateMouseAnimations = () => {
            currentX = this.lerp(currentX, mouseX, 0.1);
            currentY = this.lerp(currentY, mouseY, 0.1);

            // Update mouse-following elements
            document.querySelectorAll('[data-mouse-follow]').forEach(element => {
                const intensity = parseFloat(element.getAttribute('data-mouse-follow')) || 0.5;
                const offsetX = (currentX - window.innerWidth / 2) * intensity * 0.01;
                const offsetY = (currentY - window.innerHeight / 2) * intensity * 0.01;

                element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });

            requestAnimationFrame(updateMouseAnimations);
        };

        updateMouseAnimations();
    }

    createViewportAnimations() {
        // Enhanced viewport-based animations
        const viewportElements = document.querySelectorAll('[data-viewport-animate]');

        viewportElements.forEach(element => {
            const animationType = element.getAttribute('data-viewport-animate');
            this.createViewportSpecificAnimation(element, animationType);
        });
    }

    createViewportSpecificAnimation(element, type) {
        if (!this.dependencies.scrollTrigger) return;

        switch (type) {
            case 'quantum-emerge':
                this.dependencies.gsap.set(element, {
                    opacity: 0,
                    scale: 0.5,
                    rotationY: 90
                });

                this.dependencies.scrollTrigger.create({
                    trigger: element,
                    start: "top 80%",
                    onEnter: () => {
                        this.dependencies.gsap.to(element, {
                            opacity: 1,
                            scale: 1,
                            rotationY: 0,
                            duration: 1.2,
                            ease: "back.out(1.7)"
                        });
                    }
                });
                break;

            case 'neural-pulse':
                this.dependencies.gsap.to(element, {
                    scale: 1.05,
                    duration: 2,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true
                });
                break;

            case 'consciousness-glow':
                this.dependencies.scrollTrigger.create({
                    trigger: element,
                    start: "top 90%",
                    end: "bottom 10%",
                    scrub: 1,
                    onUpdate: (self) => {
                        const glowIntensity = self.progress * 20;
                        element.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(0, 255, 136, 0.6))`;
                    }
                });
                break;
        }
    }

    // 🌀 Quantum Portal Effect
    createQuantumPortal() {
        const portal = document.createElement('div');
        portal.className = 'quantum-portal';
        portal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: radial-gradient(circle,
                rgba(0, 255, 136, 0.8) 0%,
                rgba(34, 193, 195, 0.6) 50%,
                transparent 100%);
            transform: translate(-50%, -50%) scale(0);
            z-index: 10000;
            pointer-events: none;
            filter: blur(2px);
        `;

        document.body.appendChild(portal);

        // Animate portal appearance
        if (this.dependencies.gsap) {
            this.dependencies.gsap.to(portal, {
                scale: 5,
                opacity: 0,
                duration: 2,
                ease: "power2.out",
                onComplete: () => portal.remove()
            });
        }
    }

    // 📊 Handle Viewport Changes
    handleViewportChanges(entries) {
        entries.forEach(entry => {
            const element = entry.target;
            const ratio = entry.intersectionRatio;

            // Consciousness-based animation intensity
            if (ratio > 0.5) {
                element.classList.add('in-consciousness');
                this.activateElementConsciousness(element, ratio);
            } else {
                element.classList.remove('in-consciousness');
            }
        });
    }

    activateElementConsciousness(element, ratio) {
        // Add element to consciousness field
        if (window.neuralSymphony) {
            window.neuralSymphony.enhanceElement(element, { consciousness: ratio });
        }
    }

    // 📊 Update Scroll-Based Animations
    updateScrollBasedAnimations(progress, velocity) {
        // Update CSS custom properties
        document.documentElement.style.setProperty('--scroll-progress', progress);
        document.documentElement.style.setProperty('--scroll-velocity', Math.abs(velocity));

        // Update LERP targets
        this.lerpValues.forEach((config, key) => {
            if (key.toString().includes('scroll')) {
                config.target = progress;
            }
        });
    }

    // 🔄 Update Quantum Animations
    updateQuantumAnimations(time) {
        // Update time-based animations
        this.animations.forEach((animation, element) => {
            if (animation.type === 'quantum-breathing') {
                const breathe = Math.sin(time * 0.002) * 0.02 + 1;
                element.style.transform = `scale(${breathe})`;
            } else if (animation.type === 'neural-rotation') {
                const rotation = (time * 0.05) % 360;
                element.style.transform = `rotate(${rotation}deg)`;
            }
        });
    }

    // 🎭 Setup Element Animations
    setupElementAnimations(element) {
        const animationType = element.getAttribute('data-animate') || 'quantum-emerge';

        switch (animationType) {
            case 'fullscreen-text':
                this.createFullscreenTextAnimation(element);
                break;
            case 'quantum-morph':
                this.createQuantumMorphAnimation(element);
                break;
            case 'neural-pulse':
                this.createNeuralPulseAnimation(element);
                break;
            default:
                this.createDefaultAnimation(element);
        }
    }

    createFullscreenTextAnimation(element) {
        if (!this.dependencies.gsap) return;

        // Make text fill viewport on scroll
        this.dependencies.scrollTrigger.create({
            trigger: element,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const fontSize = this.mapValue(progress, 0, 1, 1, 10);
                const spread = this.mapValue(progress, 0, 1, 0, 100);

                this.dependencies.gsap.set(element, {
                    fontSize: `${fontSize}em`,
                    letterSpacing: `${spread}px`,
                    textAlign: 'center',
                    lineHeight: 0.8
                });
            }
        });
    }

    createQuantumMorphAnimation(element) {
        this.animations.set(element, { type: 'quantum-breathing' });
    }

    createNeuralPulseAnimation(element) {
        this.animations.set(element, { type: 'neural-rotation' });
    }

    createDefaultAnimation(element) {
        if (!this.dependencies.gsap) return;

        this.dependencies.gsap.set(element, {
            opacity: 0,
            y: 50,
            scale: 0.8
        });

        this.dependencies.scrollTrigger.create({
            trigger: element,
            start: "top 80%",
            onEnter: () => {
                this.dependencies.gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "back.out(1.7)"
                });
            }
        });
    }

    // 🎯 Public API
    enhanceElement(element, options = {}) {
        this.setupElementAnimations(element);
        if (options.splitText) {
            this.createAdvancedTextSplit(element);
        }
        if (options.webgl) {
            this.webglEffects.set(element, options.webgl);
        }
    }

    createCustomAnimation(element, animation) {
        this.animations.set(element, animation);
    }

    updateMotionState(property, value) {
        this.motionState[property] = value;
    }

    // 🔄 Cleanup
    destroy() {
        if (this.locomotiveScroll) {
            this.locomotiveScroll.destroy();
        }

        if (this.viewportObserver) {
            this.viewportObserver.disconnect();
        }

        if (this.dependencies.scrollTrigger) {
            this.dependencies.scrollTrigger.killAll();
        }

        if (this.webglCanvas) {
            this.webglCanvas.remove();
        }

        this.animations.clear();
        this.textSplitters.clear();
        this.transformHooks.clear();
        this.lerpValues.clear();
    }
}

// 🚀 Initialize Quantum Motion Engine
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.quantumMotion = new QuantumMotionEngine();
    });
} else {
    window.quantumMotion = new QuantumMotionEngine();
}

// 🎭 Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumMotionEngine;
}