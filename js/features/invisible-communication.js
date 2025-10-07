/**
 * Invisible Communication Layer
 * Elements whisper to those who pay attention
 */

class InvisibleCommunication {
    constructor() {
        this.magneticStrength = 0.1;
        this.whisperDistance = 50;
        this.userAttentionScore = 0;
        this.elementMemory = new Map();
        this.cursorTrail = [];
        this.maxTrailLength = 20;
        this.lastWhisperTime = 0;
        this.whisperCooldown = 10000; // 10 seconds between whispers
        this.activeWhispers = 0;
        this.maxActiveWhispers = 1;
        this.interactionCount = 0;

        this.init();
    }

    init() {
        this.createMagneticCursor();
        this.attachWhisperElements();
        this.startAttentionTracking();
        this.enableSubtleHints();
    }

    createMagneticCursor() {
        let mouseX = 0, mouseY = 0;
        let isNearInteractive = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            this.updateCursorTrail(mouseX, mouseY);
            this.checkElementProximity(mouseX, mouseY);
        });

        // Subtle magnetic pull toward interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [data-interactive], .vote-btn, .logo-text');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                isNearInteractive = true;
                this.userAttentionScore += 0.1;
                this.interactionCount++;
                this.magneticCursorEffect(element);
            });

            element.addEventListener('click', () => {
                this.interactionCount += 2; // Clicks count more
                this.userAttentionScore += 0.2;
            });

            element.addEventListener('mouseleave', () => {
                isNearInteractive = false;
            });
        });
    }

    updateCursorTrail(x, y) {
        this.cursorTrail.push({ x, y, timestamp: Date.now() });

        if (this.cursorTrail.length > this.maxTrailLength) {
            this.cursorTrail.shift();
        }

        // Detect hovering patterns (curiosity indicator)
        if (this.cursorTrail.length >= 10) {
            const recentPositions = this.cursorTrail.slice(-10);
            const avgMovement = this.calculateMovementVariance(recentPositions);

            if (avgMovement < 5 && this.interactionCount > 5) { // User is hovering/lingering AND has interacted
                this.userAttentionScore += 0.05;
                this.triggerSubtleHint(x, y);
            }
        }
    }

    calculateMovementVariance(positions) {
        if (positions.length < 2) return 0;

        let totalMovement = 0;
        for (let i = 1; i < positions.length; i++) {
            const dx = positions[i].x - positions[i-1].x;
            const dy = positions[i].y - positions[i-1].y;
            totalMovement += Math.sqrt(dx * dx + dy * dy);
        }

        return totalMovement / positions.length;
    }

    magneticCursorEffect(element) {
        // Subtle cursor magnetism - barely perceptible
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create invisible attraction zone
        element.style.position = 'relative';
        element.style.transition = 'transform 0.3s ease-out';
        element.style.transform = 'scale(1.001)'; // Microscopically larger

        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }

    attachWhisperElements() {
        // Elements that whisper when approached with attention
        const whisperElements = [
            { selector: '.logo-text', message: 'Identity evolves with understanding', proximity: 30 },
            { selector: '.nav-link', message: 'Navigation follows intention', proximity: 25 },
            { selector: '.project-card', message: 'Each creation holds secrets', proximity: 40 },
            { selector: '.vote-btn', message: 'Every choice shapes reality', proximity: 20 },
            { selector: '.hero-title', message: 'Names carry power', proximity: 50 }
        ];

        whisperElements.forEach(({ selector, message, proximity }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.attachWhisper(element, message, proximity);
            });
        });
    }

    attachWhisper(element, message, proximity) {
        element.addEventListener('mouseenter', () => {
            // Only show whispers after significant interaction and time
            const now = Date.now();
            const timeSinceLastWhisper = now - this.lastWhisperTime;

            if (this.userAttentionScore > 3.0 && // Much higher threshold
                this.interactionCount > 10 && // Must have interacted at least 10 times
                timeSinceLastWhisper > this.whisperCooldown && // Cooldown period
                this.activeWhispers < this.maxActiveWhispers) { // Only one at a time
                this.createWhisper(element, message, proximity);
            }
        });

        element.addEventListener('mouseleave', () => {
            this.clearWhisper(element);
        });
    }

    createWhisper(element, message, proximity) {
        // Track active whispers
        this.activeWhispers++;
        this.lastWhisperTime = Date.now();

        // Create subtle tooltip that appears for attentive users
        const whisper = document.createElement('div');
        whisper.className = 'invisible-whisper';
        whisper.textContent = message;
        whisper.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.85);
            color: #ffffff;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 300;
            pointer-events: auto;
            z-index: 10000;
            opacity: 0;
            transform: translateY(10px);
            transition: all 2s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            cursor: pointer;
        `;

        element.style.position = 'relative';
        element.appendChild(whisper);

        // Position whisper
        const rect = element.getBoundingClientRect();
        whisper.style.top = `-${whisper.offsetHeight + 10}px`;
        whisper.style.left = '50%';
        whisper.style.transform = 'translateX(-50%) translateY(10px)';

        // Add click and right-click dismissal
        whisper.addEventListener('click', () => {
            this.quickDismissWhisper(element);
        });

        whisper.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.quickDismissWhisper(element);
        });

        // Fade in slowly
        setTimeout(() => {
            whisper.style.opacity = '1';
            whisper.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);

        // Auto-dismiss after 8 seconds
        setTimeout(() => {
            this.clearWhisper(element);
        }, 8000);
    }

    clearWhisper(element) {
        const whisper = element.querySelector('.invisible-whisper');
        if (whisper) {
            this.activeWhispers = Math.max(0, this.activeWhispers - 1);
            whisper.style.transition = 'all 2s ease';
            whisper.style.opacity = '0';
            whisper.style.transform = 'translateX(-50%) translateY(-10px)';
            setTimeout(() => whisper.remove(), 2000);
        }
    }

    quickDismissWhisper(element) {
        const whisper = element.querySelector('.invisible-whisper');
        if (whisper) {
            this.activeWhispers = Math.max(0, this.activeWhispers - 1);
            whisper.style.transition = 'all 0.5s ease';
            whisper.style.opacity = '0';
            whisper.style.transform = 'translateX(-50%) translateY(-10px) scale(0.9)';
            setTimeout(() => whisper.remove(), 500);
        }
    }

    checkElementProximity(mouseX, mouseY) {
        const hiddenElements = document.querySelectorAll('[data-hidden-interactive]');

        hiddenElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const distance = this.calculateDistance(
                mouseX, mouseY,
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );

            if (distance < this.whisperDistance) {
                this.activateHiddenElement(element, distance);
            }
        });
    }

    calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    activateHiddenElement(element, distance) {
        const intensity = Math.max(0, 1 - (distance / this.whisperDistance));
        element.style.opacity = Math.max(0.1, intensity);
        element.style.filter = `brightness(${1 + intensity * 0.2})`;
    }

    triggerSubtleHint(x, y) {
        // Micro-animation for patient users
        const nearbyElements = document.elementsFromPoint(x, y);
        const interactiveElement = nearbyElements.find(el =>
            el.matches('a, button, [data-interactive], .vote-btn, .logo-text, .nav-link')
        );

        if (interactiveElement && !this.elementMemory.has(interactiveElement)) {
            this.elementMemory.set(interactiveElement, true);

            // Subtle glow for 0.5 seconds
            interactiveElement.style.transition = 'box-shadow 0.5s ease';
            interactiveElement.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.1)';

            setTimeout(() => {
                interactiveElement.style.boxShadow = '';
            }, 500);
        }
    }

    startAttentionTracking() {
        // Track user attention patterns
        let idleTimer;

        document.addEventListener('mousemove', () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                this.userAttentionScore = Math.max(0, this.userAttentionScore - 0.1);
            }, 3000);
        });

        // Reward continued engagement
        setInterval(() => {
            if (document.hasFocus()) {
                this.userAttentionScore = Math.min(2, this.userAttentionScore + 0.01);
            }
        }, 1000);
    }

    enableSubtleHints() {
        // Add invisible data attributes to elements that can be discovered
        const hintElements = [
            { selector: '.section-title', hint: 'Sections hold deeper meaning' },
            { selector: '.project-description', hint: 'Every project tells a story' },
            { selector: '.contact-label', hint: 'Connection is the key to growth' }
        ];

        hintElements.forEach(({ selector, hint }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.setAttribute('data-hint', hint);
                element.setAttribute('data-hidden-interactive', 'true');
            });
        });
    }

    // Public method to get current attention level
    getAttentionLevel() {
        if (this.userAttentionScore < 0.3) return 'casual';
        if (this.userAttentionScore < 0.8) return 'interested';
        if (this.userAttentionScore < 1.5) return 'engaged';
        return 'devoted';
    }
}

// Initialize the invisible communication layer
window.invisibleCommunication = new InvisibleCommunication();

// Export for integration with other systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InvisibleCommunication;
}