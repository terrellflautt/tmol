/**
 * Dynamic Word Evolution System
 * Peaceful text transformations based on user engagement
 */

class DynamicWordEvolution {
    constructor() {
        this.evolutionActive = false;
        this.evolvedElements = new Map();
        this.evolutionIntensity = 0;

        this.init();
    }

    init() {
        this.setupWordElements();
        this.startSubtleEvolution();
    }

    setupWordElements() {
        // Target specific text elements for evolution
        const targetSelectors = [
            '.hero-title',
            '.hero-subtitle',
            '.section-title',
            '.project-card h4',
            '.nav-link'
        ];

        targetSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.prepareElementForEvolution(element);
            });
        });
    }

    prepareElementForEvolution(element) {
        const originalText = element.textContent;
        this.evolvedElements.set(element, {
            original: originalText,
            evolved: false,
            stage: 0
        });
    }

    enableSubtleEvolution() {
        this.evolutionActive = true;
        this.evolutionIntensity = 0.1;

        // Very gradual evolution
        this.startEvolutionCycle();
    }

    enableAdvancedEvolution() {
        this.evolutionActive = true;
        this.evolutionIntensity = 0.3;

        // More noticeable evolution for engaged users
        this.startEvolutionCycle();
    }

    startSubtleEvolution() {
        // Start with minimal evolution
        setTimeout(() => {
            this.enableSubtleEvolution();
        }, 60000); // After 1 minute
    }

    startEvolutionCycle() {
        if (!this.evolutionActive) return;

        setInterval(() => {
            this.evolveRandomElement();
        }, 30000); // Every 30 seconds
    }

    evolveRandomElement() {
        const elements = Array.from(this.evolvedElements.keys());
        const randomElement = elements[Math.floor(Math.random() * elements.length)];

        if (randomElement && this.isElementVisible(randomElement)) {
            this.evolveElement(randomElement);
        }
    }

    evolveElement(element) {
        const data = this.evolvedElements.get(element);
        if (!data || data.evolved) return;

        const evolution = this.getTextEvolution(data.original);
        if (evolution) {
            this.animateTextChange(element, data.original, evolution);
            data.evolved = true;
            data.stage++;
        }
    }

    getTextEvolution(originalText) {
        // Simple text evolutions
        const evolutions = {
            'About': 'Discovery',
            'Projects': 'Creations',
            'Contact': 'Connect',
            'Home': 'Origin',
            'DevOps': 'Builder',
            'Cloud': 'Sky'
        };

        for (const [original, evolved] of Object.entries(evolutions)) {
            if (originalText.includes(original)) {
                return originalText.replace(original, evolved);
            }
        }

        return null;
    }

    animateTextChange(element, fromText, toText) {
        element.style.transition = 'opacity 2s ease';
        element.style.opacity = '0.7';

        setTimeout(() => {
            element.textContent = toText;
            element.style.opacity = '1';
        }, 1000);

        // Revert after some time
        setTimeout(() => {
            element.style.opacity = '0.7';
            setTimeout(() => {
                element.textContent = fromText;
                element.style.opacity = '1';
                this.evolvedElements.get(element).evolved = false;
            }, 1000);
        }, 10000);
    }

    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }

    pauseEvolution() {
        this.evolutionActive = false;
    }

    resumeEvolution() {
        this.evolutionActive = true;
    }

    resetEvolution() {
        this.evolvedElements.forEach((data, element) => {
            element.textContent = data.original;
            data.evolved = false;
            data.stage = 0;
        });
    }
}

// Initialize
if (typeof window !== 'undefined') {
    window.dynamicWordEvolution = new DynamicWordEvolution();
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DynamicWordEvolution;
}