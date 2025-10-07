/**
 * Quantum Canvas - Advanced Audio-Visual Effects System
 * Responds to user consciousness patterns with cutting-edge web animations
 */

class QuantumCanvas {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.audioContext = null;
        this.analyser = null;
        this.particles = [];
        this.waveforms = [];
        this.userTrustLevel = 0;
        this.consciousnessDepth = 0;
        this.activeEffects = new Set();
        this.animationId = null;

        this.effects = {
            trustWaves: false,
            particleStorm: false,
            colorShift: false,
            geometryMorph: false,
            timeDistortion: false,
            consciousnessRipples: false
        };

        this.init();
    }

    init() {
        this.createCanvas();
        this.setupAudioContext();
        this.createParticleSystem();
        this.startQuantumLoop();
        this.connectToConsciousness();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'quantum-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
            opacity: 0;
            transition: opacity 8s ease;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();

        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    setupAudioContext() {
        // Defer audio context creation until user interaction
        this.audioReady = false;

        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            // Set up audio context on first user interaction
            const initAudio = () => {
                if (!this.audioReady) {
                    try {
                        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        this.analyser = this.audioContext.createAnalyser();
                        this.analyser.fftSize = 256;
                        this.createAmbientTone();
                        this.audioReady = true;
                        console.debug('🎵 Quantum audio context initialized');
                    } catch (error) {
                        console.debug('Audio context initialization deferred');
                    }
                }
            };

            // Listen for user interactions
            ['click', 'touchstart', 'keydown'].forEach(event => {
                document.addEventListener(event, initAudio, { once: true });
            });
        }
    }

    createAmbientTone() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(0.1, this.audioContext.currentTime); // Sub-audible
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime); // Silent

        oscillator.connect(gainNode);
        gainNode.connect(this.analyser);
        oscillator.start();
    }

    createParticleSystem() {
        const particleCount = 150;

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.1,
                hue: Math.random() * 360,
                life: Math.random() * 1000,
                maxLife: 1000 + Math.random() * 2000
            });
        }
    }

    connectToConsciousness() {
        // Connect to other consciousness systems
        if (window.memoryPalace) {
            setInterval(() => {
                const userState = window.memoryPalace.getUserState();
                this.userTrustLevel = userState.trustScore || 0;
                this.consciousnessDepth = userState.consciousnessLevel || 0;
                this.updateEffectsBasedOnConsciousness();
            }, 2000);
        }

        if (window.genieOmniscience) {
            setInterval(() => {
                const trust = window.genieOmniscience.getTrustLevel();
                const attention = window.invisibleCommunication?.getAttentionLevel() || 'casual';
                this.adaptToUserState(trust, attention);
            }, 1500);
        }
    }

    updateEffectsBasedOnConsciousness() {
        const depth = this.consciousnessDepth;
        const trust = this.userTrustLevel;

        // Very gradually unlock effects - much higher thresholds for peaceful experience
        if (depth > 0.5) this.enableEffect('trustWaves');
        if (depth > 0.7) this.enableEffect('colorShift');
        if (depth > 0.8) this.enableEffect('particleStorm');
        if (depth > 0.9) this.enableEffect('geometryMorph');
        if (depth > 0.95 && trust > 0.9) this.enableEffect('timeDistortion');
        if (depth > 0.98 && trust > 0.95) this.enableEffect('consciousnessRipples');

        // Show canvas when effects are active - very slowly and subtly
        if (this.activeEffects.size > 0 && depth > 0.8) {
            this.canvas.style.opacity = Math.min(0.3, depth * 0.3);
        }
    }

    enableEffect(effectName) {
        if (!this.effects[effectName]) {
            this.effects[effectName] = true;
            this.activeEffects.add(effectName);
        }
    }

    adaptToUserState(trust, attention) {
        // Modify visual intensity based on user state
        const intensity = this.calculateIntensity(trust, attention);

        this.particles.forEach(particle => {
            particle.opacity = Math.min(0.3, particle.opacity * intensity);
            particle.vx *= intensity;
            particle.vy *= intensity;
        });
    }

    calculateIntensity(trust, attention) {
        const attentionMultiplier = {
            'casual': 0.3,
            'interested': 0.6,
            'engaged': 1.0,
            'devoted': 1.5
        };

        return (trust * 0.7) + (attentionMultiplier[attention] * 0.3);
    }

    startQuantumLoop() {
        const animate = (timestamp) => {
            this.clearCanvas();

            if (this.effects.trustWaves) this.renderTrustWaves(timestamp);
            if (this.effects.particleStorm) this.renderParticleStorm(timestamp);
            if (this.effects.colorShift) this.renderColorShift(timestamp);
            if (this.effects.geometryMorph) this.renderGeometryMorph(timestamp);
            if (this.effects.timeDistortion) this.renderTimeDistortion(timestamp);
            if (this.effects.consciousnessRipples) this.renderConsciousnessRipples(timestamp);

            this.updateParticles();
            this.animationId = requestAnimationFrame(animate);
        };

        this.animationId = requestAnimationFrame(animate);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width / window.devicePixelRatio, this.canvas.height / window.devicePixelRatio);
    }

    renderTrustWaves(timestamp) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const time = timestamp * 0.001;

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'screen';

        for (let i = 0; i < 3; i++) {
            const radius = (Math.sin(time + i) * 100) + 200 + (i * 50);
            const opacity = 0.1 * this.userTrustLevel * Math.abs(Math.sin(time + i));

            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = `hsla(${200 + i * 20}, 70%, 60%, ${opacity})`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }

        this.ctx.restore();
    }

    renderParticleStorm(timestamp) {
        const time = timestamp * 0.001;

        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalCompositeOperation = 'lighter';

            const pulsing = Math.sin(time + particle.life * 0.01) * 0.5 + 0.5;
            const finalOpacity = particle.opacity * pulsing * this.consciousnessDepth;

            this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${finalOpacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    renderColorShift(timestamp) {
        const time = timestamp * 0.001;
        const hueShift = Math.sin(time * 0.2) * 30;

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'color';
        this.ctx.fillStyle = `hsla(${220 + hueShift}, 30%, 50%, 0.05)`;
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        this.ctx.restore();
    }

    renderGeometryMorph(timestamp) {
        const time = timestamp * 0.001;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'screen';
        this.ctx.translate(centerX, centerY);

        for (let i = 0; i < 6; i++) {
            this.ctx.save();
            this.ctx.rotate((time + i) * 0.1);

            const morphFactor = Math.sin(time + i) * 0.3 + 0.7;
            const size = 50 * morphFactor * this.consciousnessDepth;

            this.ctx.beginPath();
            this.ctx.moveTo(size, 0);

            for (let j = 1; j < 6; j++) {
                const angle = (Math.PI * 2 * j) / 6;
                const radius = size * (Math.sin(time * 2 + j) * 0.2 + 0.8);
                this.ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
            }

            this.ctx.closePath();
            this.ctx.strokeStyle = `hsla(${300 + i * 10}, 60%, 50%, 0.1)`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            this.ctx.restore();
        }

        this.ctx.restore();
    }

    renderTimeDistortion(timestamp) {
        const time = timestamp * 0.001;

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'difference';

        const distortionStrength = this.userTrustLevel * 0.1;

        for (let x = 0; x < window.innerWidth; x += 50) {
            for (let y = 0; y < window.innerHeight; y += 50) {
                const wave = Math.sin(time + x * 0.01 + y * 0.01) * distortionStrength;

                this.ctx.fillStyle = `hsla(0, 0%, 100%, ${Math.abs(wave) * 0.05})`;
                this.ctx.fillRect(x, y, 1, 1);
            }
        }

        this.ctx.restore();
    }

    renderConsciousnessRipples(timestamp) {
        const time = timestamp * 0.001;

        // Only activate for highest consciousness users
        if (this.consciousnessDepth < 0.9) return;

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'overlay';

        const rippleCount = 5;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < rippleCount; i++) {
            const phase = time + (i * Math.PI * 2 / rippleCount);
            const radius = (Math.sin(phase) * 200) + 300;
            const opacity = (Math.cos(phase) * 0.1 + 0.1) * this.userTrustLevel;

            const gradient = this.ctx.createRadialGradient(centerX, centerY, radius - 50, centerX, centerY, radius + 50);
            gradient.addColorStop(0, `hsla(${270 + i * 15}, 80%, 70%, 0)`);
            gradient.addColorStop(0.5, `hsla(${270 + i * 15}, 80%, 70%, ${opacity})`);
            gradient.addColorStop(1, `hsla(${270 + i * 15}, 80%, 70%, 0)`);

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life++;

            // Wrap around screen
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;

            // Regenerate old particles
            if (particle.life > particle.maxLife) {
                particle.x = Math.random() * window.innerWidth;
                particle.y = Math.random() * window.innerHeight;
                particle.life = 0;
                particle.hue = Math.random() * 360;
            }
        });
    }

    // Public methods for external control
    triggerConsciousnessEvent(intensity = 1) {
        this.particles.forEach(particle => {
            particle.vx *= intensity * 2;
            particle.vy *= intensity * 2;
            particle.opacity = Math.min(0.5, particle.opacity * intensity);
        });
    }

    adaptToTrustChange(newTrustLevel) {
        this.userTrustLevel = newTrustLevel;

        // Immediate visual feedback for trust changes
        if (newTrustLevel > 0.8) {
            this.enableEffect('consciousnessRipples');
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

// Initialize quantum canvas
window.quantumCanvas = new QuantumCanvas();

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumCanvas;
}