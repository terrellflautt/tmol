/**
 * Breathing Website System
 * The site subtly breathes and evolves with user presence
 */

class BreathingWebsite {
    constructor() {
        this.breathingRate = 0.001; // Subtle, noticeable breathing - like calm meditation
        this.timeOnPage = 0;
        this.engagementDepth = 0;
        this.isUserPresent = true;
        this.breathingElements = [];
        this.backgroundHue = 220; // Starting blue hue
        this.saturationBase = 20;
        this.lastActivity = Date.now();

        this.init();
    }

    init() {
        this.setupBreathingElements();
        this.startTimeTracking();
        this.startPresenceDetection();
        this.startBreathingAnimation();
        this.startBackgroundEvolution();
        this.setupEngagementTracking();
    }

    setupBreathingElements() {
        // Elements that breathe with the site's life force
        const breathingSelectors = [
            '.hero-content',
            '.about-content',
            '.projects-grid',
            '.contact-content',
            '.nav-container'
        ];

        breathingSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.breathingElements.push({
                    element,
                    baseScale: 1,
                    breathPhase: Math.random() * Math.PI * 2, // Random starting phase
                    intensity: 0.005 + Math.random() * 0.003 // Subtle but visible variations
                });
            });
        });
    }

    startTimeTracking() {
        setInterval(() => {
            if (this.isUserPresent) {
                this.timeOnPage += 1000;
                this.updateEngagementDepth();
            }
        }, 1000);
    }

    updateEngagementDepth() {
        // Engagement grows with time, but plateaus
        const minutes = this.timeOnPage / 60000;
        this.engagementDepth = Math.min(1, Math.log(minutes + 1) / Math.log(10));
    }

    startPresenceDetection() {
        // Detect if user is actively present
        ['mousemove', 'scroll', 'keydown', 'click', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => {
                this.isUserPresent = true;
                this.lastActivity = Date.now();
            }, { passive: true });
        });

        // Check for idle state
        setInterval(() => {
            const idleTime = Date.now() - this.lastActivity;
            this.isUserPresent = idleTime < 30000; // 30 seconds idle threshold
        }, 5000);

        // Page visibility API
        document.addEventListener('visibilitychange', () => {
            this.isUserPresent = !document.hidden;
        });
    }

    startBreathingAnimation() {
        const breathe = () => {
            const time = Date.now() * 0.001; // Convert to seconds

            this.breathingElements.forEach(({ element, baseScale, breathPhase, intensity }) => {
                if (!element.isConnected) return;

                // Calculate breathing effect
                const breathCycle = Math.sin(time * this.breathingRate + breathPhase);
                const adjustedIntensity = intensity * (this.isUserPresent ? 1 : 0.3);
                const scale = baseScale + (breathCycle * adjustedIntensity);

                // Apply micro-scale breathing with smooth easing
                element.style.transform = `scale(${scale})`;
                element.style.transformOrigin = 'center center';
                element.style.transition = 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'; // Smooth, natural easing
            });

            requestAnimationFrame(breathe);
        };

        requestAnimationFrame(breathe);
    }

    startBackgroundEvolution() {
        const evolveBackground = () => {
            if (this.isUserPresent) {
                // Slowly shift background characteristics based on engagement
                const timeInfluence = (this.timeOnPage / 300000) * 10; // 5 minutes = full influence
                const engagementInfluence = this.engagementDepth * 15;

                // Hue shifts very slowly toward warmer tones with engagement
                this.backgroundHue = 220 - (timeInfluence + engagementInfluence) * 0.5;
                this.backgroundHue = Math.max(200, Math.min(220, this.backgroundHue));

                // Saturation increases slightly with deeper engagement
                const currentSaturation = this.saturationBase + (this.engagementDepth * 5);

                // Apply to body background
                const subtleGradient = this.createSubtleGradient(this.backgroundHue, currentSaturation);
                document.body.style.background = subtleGradient;
            }

            setTimeout(evolveBackground, 10000); // Update every 10 seconds
        };

        evolveBackground();
    }

    createSubtleGradient(hue, saturation) {
        const lightness1 = 98; // Very light
        const lightness2 = 96; // Slightly darker

        return `linear-gradient(
            135deg,
            hsl(${hue}, ${saturation}%, ${lightness1}%) 0%,
            hsl(${hue + 10}, ${saturation * 0.8}%, ${lightness2}%) 100%
        )`;
    }

    setupEngagementTracking() {
        // Track different engagement types
        const engagementEvents = {
            scroll: () => this.recordEngagement('exploration', 0.1),
            click: () => this.recordEngagement('interaction', 0.2),
            mousemove: () => this.recordEngagement('attention', 0.05),
            keydown: () => this.recordEngagement('input', 0.15)
        };

        Object.entries(engagementEvents).forEach(([event, handler]) => {
            document.addEventListener(event, handler, { passive: true });
        });
    }

    recordEngagement(type, value) {
        // Increase breathing intensity based on engagement (subtle)
        this.breathingRate = Math.min(0.002, this.breathingRate + (value * 0.00003));

        // Breathing rate naturally decays back to baseline
        setTimeout(() => {
            this.breathingRate = Math.max(0.0005, this.breathingRate * 0.98);
        }, 5000);
    }

    // Typography breathing effect for text elements
    startTypographyBreathing() {
        const textElements = document.querySelectorAll('h1, h2, h3, p, a');

        textElements.forEach(element => {
            const baseLetterSpacing = parseFloat(getComputedStyle(element).letterSpacing) || 0;

            setInterval(() => {
                if (this.isUserPresent && this.engagementDepth > 0.3) {
                    const breathEffect = Math.sin(Date.now() * 0.002) * 0.1;
                    const newSpacing = baseLetterSpacing + (breathEffect * this.engagementDepth);
                    element.style.letterSpacing = `${newSpacing}px`;
                }
            }, 100);
        });
    }

    // Subtle shadow breathing for depth
    startShadowBreathing() {
        const shadowElements = document.querySelectorAll('.project-card, .nav-container, .contact-form');

        shadowElements.forEach(element => {
            const baseShadow = getComputedStyle(element).boxShadow;

            setInterval(() => {
                if (this.isUserPresent) {
                    const shadowIntensity = 1 + (Math.sin(Date.now() * 0.003) * 0.1 * this.engagementDepth);
                    element.style.filter = `drop-shadow(0 4px 20px rgba(0, 0, 0, ${0.1 * shadowIntensity}))`;
                }
            }, 150);
        });
    }

    // Get current breathing state for other systems
    getBreathingState() {
        return {
            timeOnPage: this.timeOnPage,
            engagementDepth: this.engagementDepth,
            isUserPresent: this.isUserPresent,
            breathingRate: this.breathingRate,
            backgroundHue: this.backgroundHue
        };
    }

    // Allow other systems to influence breathing
    influenceBreathing(intensity, duration = 5000) {
        const originalRate = this.breathingRate;
        this.breathingRate = Math.min(0.02, this.breathingRate + intensity);

        setTimeout(() => {
            this.breathingRate = originalRate;
        }, duration);
    }

    // Emergency breathing (for dramatic moments)
    emergencyBreathing(duration = 3000) {
        const originalElements = [...this.breathingElements];

        // Temporarily increase breathing for all elements
        this.breathingElements.forEach(item => {
            item.intensity *= 3;
        });

        setTimeout(() => {
            this.breathingElements = originalElements;
        }, duration);
    }
}

// Initialize breathing website
window.breathingWebsite = new BreathingWebsite();

// Integration with existing systems
document.addEventListener('DOMContentLoaded', () => {
    if (window.breathingWebsite) {
        window.breathingWebsite.startTypographyBreathing();
        window.breathingWebsite.startShadowBreathing();
    }
});

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BreathingWebsite;
}