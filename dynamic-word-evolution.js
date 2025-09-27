/**
 * Dynamic Word Evolution System
 * Peaceful text transformations based on user engagement
 */

class DynamicWordEvolution {
    constructor() {
        this.evolutionActive = false;
        this.evolvedElements = new Map();
        this.evolutionIntensity = 0;
        this.misspelledElements = new Map();
        this.correctionRewards = 0;

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
            '.nav-link',
            'h1', 'h2', 'h3',
            '.btn'
        ];

        targetSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.prepareElementForEvolution(element);
                this.makeElementClickable(element);
            });
        });

        // Load saved word changes
        this.loadSavedChanges();

        // Sometimes introduce misspellings
        this.startMisspellingSystem();
    }

    prepareElementForEvolution(element) {
        const originalText = element.textContent.trim();
        const elementId = this.getElementId(element);

        this.evolvedElements.set(element, {
            original: originalText,
            evolved: false,
            stage: 0,
            clickCount: 0,
            elementId: elementId,
            savedChange: null
        });
    }

    getElementId(element) {
        // Create unique ID for element based on its text and position
        const text = element.textContent.trim().substring(0, 20);
        const tagName = element.tagName.toLowerCase();
        const parent = element.parentElement?.tagName.toLowerCase() || '';
        return `${tagName}_${parent}_${text.replace(/\s+/g, '_')}`;
    }

    makeElementClickable(element) {
        // Skip certain elements that shouldn't be clickable
        if (element.tagName.toLowerCase() === 'a' ||
            element.closest('a') ||
            element.closest('button')) {
            return;
        }

        element.style.cursor = 'pointer';
        element.style.transition = 'all 0.3s ease';

        element.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleWordClick(element);
        });

        // Subtle hover effect
        element.addEventListener('mouseenter', () => {
            element.style.opacity = '0.8';
        });

        element.addEventListener('mouseleave', () => {
            element.style.opacity = '1';
        });
    }

    handleWordClick(element) {
        const data = this.evolvedElements.get(element);
        if (!data) return;

        data.clickCount++;

        // Visual feedback
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 100);

        // Evolution after 3+ clicks
        if (data.clickCount >= 3) {
            this.evolveClickedElement(element);
        }
    }

    evolveClickedElement(element) {
        const data = this.evolvedElements.get(element);
        if (!data || data.evolved) return;

        const evolution = this.getTextEvolution(data.original);
        if (evolution) {
            this.animateTextChange(element, data.original, evolution);
            data.evolved = true;
            data.stage++;

            // Sometimes save the change
            if (Math.random() < 0.3) { // 30% chance to remember
                this.saveWordChange(data.elementId, evolution);
                data.savedChange = evolution;
            }
        }
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
        // Expanded text evolutions - more subtle head-messing
        const evolutions = {
            // Navigation
            'About': 'Discovery',
            'Projects': 'Creations',
            'Contact': 'Connect',
            'Home': 'Origin',

            // Professional terms
            'DevOps': 'Builder',
            'Cloud': 'Sky',
            'Engineer': 'Architect',
            'Lead': 'Guide',

            // Action words
            'View': 'Explore',
            'Get': 'Make',
            'Work': 'Magic',
            'Touch': 'Connection',

            // Descriptive words
            'innovative': 'magical',
            'professional': 'mystical',
            'experience': 'journey',
            'solutions': 'spells',
            'technology': 'wizardry',
            'development': 'creation',
            'design': 'craft',
            'build': 'manifest',

            // Fun evolutions
            'Terrell': 'The Wizard',
            'portfolio': 'grimoire',
            'skills': 'powers',
            'team': 'guild',
            'client': 'seeker'
        };

        for (const [original, evolved] of Object.entries(evolutions)) {
            if (originalText.toLowerCase().includes(original.toLowerCase())) {
                return originalText.replace(
                    new RegExp(original, 'gi'),
                    evolved
                );
            }
        }

        // Random silly evolutions for common words
        const sillyEvolutions = {
            'and': '&',
            'the': '✨',
            'with': '🔮',
            'for': '4',
            'you': 'u'
        };

        if (Math.random() < 0.1) { // 10% chance for silly evolution
            for (const [original, evolved] of Object.entries(sillyEvolutions)) {
                if (originalText.toLowerCase().includes(original)) {
                    return originalText.replace(
                        new RegExp(`\\b${original}\\b`, 'gi'),
                        evolved
                    );
                }
            }
        }

        return null;
    }

    saveWordChange(elementId, newText) {
        const savedChanges = JSON.parse(localStorage.getItem('terrellflautt_word_changes') || '{}');
        savedChanges[elementId] = {
            text: newText,
            timestamp: Date.now(),
            visits: (savedChanges[elementId]?.visits || 0) + 1
        };
        localStorage.setItem('terrellflautt_word_changes', JSON.stringify(savedChanges));
    }

    startMisspellingSystem() {
        // Only for returning visitors - magical illusions to encourage exploration
        const visitCount = parseInt(localStorage.getItem('terrellflautt_visit_count') || '0');
        const totalTime = parseInt(localStorage.getItem('terrellflautt_total_time') || '0');

        // Only activate for visitors with 2+ visits and 5+ minutes total time
        if (visitCount < 2 || totalTime < 300000) return;

        // After user has been on site for a bit, introduce magical "misspellings"
        setTimeout(() => {
            this.introduceMagicalIllusions();
        }, 60000); // 1 minute for returning visitors

        // Periodically add more illusions
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance every 2 minutes
                this.introduceMagicalIllusions();
            }
        }, 120000);
    }"}

    introduceMagicalIllusions() {
        const elements = Array.from(this.evolvedElements.keys());
        const availableElements = elements.filter(el => {
            const data = this.evolvedElements.get(el);
            return !data.evolved && !this.misspelledElements.has(el) && data.original.length > 4;
        });

        if (availableElements.length === 0) return;

        const targetElement = availableElements[Math.floor(Math.random() * availableElements.length)];
        const originalText = this.evolvedElements.get(targetElement).original;
        const misspelling = this.createMisspelling(originalText);

        if (misspelling) {
            this.applyMisspelling(targetElement, misspelling);
        }
    }

    createMisspelling(text) {
        const misspellings = {
            // Common typos
            'experience': 'experiance',
            'professional': 'profesional',
            'development': 'developement',
            'technology': 'tecnology',
            'solutions': 'solutinos',
            'projects': 'projets',
            'contact': 'contct',
            'portfolio': 'porfolio',
            'services': 'servies',
            'innovative': 'inovative',
            'engineering': 'enginering',
            'architecture': 'architecutre',
            'infrastructure': 'infrastrcuture',
            'automation': 'automtion',
            'deployment': 'deploment',
            'optimization': 'optimiztion',
            'collaboration': 'colaboration',
            'implementation': 'implimentation'
        };

        // Check for exact word matches
        for (const [correct, wrong] of Object.entries(misspellings)) {
            if (text.toLowerCase().includes(correct.toLowerCase())) {
                return text.replace(new RegExp(correct, 'gi'), wrong);
            }
        }

        // Create random letter swaps for longer words
        if (text.length > 6 && Math.random() < 0.3) {
            const words = text.split(' ');
            const longWords = words.filter(w => w.length > 6);

            if (longWords.length > 0) {
                const word = longWords[Math.floor(Math.random() * longWords.length)];
                const swapIndex = Math.floor(Math.random() * (word.length - 2)) + 1;
                const chars = word.split('');
                [chars[swapIndex], chars[swapIndex + 1]] = [chars[swapIndex + 1], chars[swapIndex]];
                const misspelledWord = chars.join('');
                return text.replace(word, misspelledWord);
            }
        }

        return null;
    }

    applyMisspelling(element, misspelledText) {
        const data = this.evolvedElements.get(element);
        if (!data) return;

        // Store misspelling info
        this.misspelledElements.set(element, {
            original: data.original,
            misspelled: misspelledText,
            corrected: false
        });

        // Apply misspelling with subtle animation
        element.style.transition = 'opacity 1s ease';
        element.style.opacity = '0.7';

        setTimeout(() => {
            element.textContent = misspelledText;
            element.style.opacity = '1';
            element.style.cursor = 'pointer';
            element.style.textDecoration = 'underline dotted rgba(255, 0, 0, 0.3)';

            // Add click handler for correction
            element.addEventListener('click', this.handleMisspellingClick.bind(this), { once: true });
        }, 500);
    }

    handleMisspellingClick(event) {
        const element = event.target;
        const misspellingData = this.misspelledElements.get(element);

        if (!misspellingData || misspellingData.corrected) return;

        // Correct the misspelling
        this.correctMisspelling(element, misspellingData);
        this.rewardCorrection();
    }

    correctMisspelling(element, misspellingData) {
        misspellingData.corrected = true;

        // Visual feedback for correction
        element.style.transition = 'all 0.5s ease';
        element.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
        element.style.textDecoration = 'none';

        setTimeout(() => {
            element.textContent = misspellingData.original;
            element.style.backgroundColor = '';
            element.style.cursor = '';
        }, 250);

        // Remove from misspelled elements after animation
        setTimeout(() => {
            this.misspelledElements.delete(element);
        }, 1000);
    }

    rewardCorrection() {
        this.correctionRewards++;

        // Show reward notification
        const reward = document.createElement('div');
        reward.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 150, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.75rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 1s ease;
            pointer-events: none;
        `;
        reward.textContent = `✨ Illusion discovered! (+${this.correctionRewards})`;

        document.body.appendChild(reward);

        setTimeout(() => {
            reward.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            reward.style.opacity = '0';
            setTimeout(() => reward.remove(), 1000);
        }, 2000);

        // Track in memory palace if available
        if (window.memoryPalace) {
            window.memoryPalace.recordUserAction('correction_reward', {
                totalCorrections: this.correctionRewards,
                timestamp: Date.now()
            });
        }

        // Unlock special features after multiple corrections
        if (this.correctionRewards >= 3) {
            this.unlockGrammarianBadge();
        }
    }

    unlockGrammarianBadge() {
        const badge = document.createElement('div');
        badge.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: linear-gradient(45deg, #4a90e2, #7b68ee);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 0.8rem;
            z-index: 1001;
            opacity: 0;
            transition: opacity 2s ease;
            pointer-events: none;
            box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
        `;
        badge.innerHTML = '📝 Grammarian Badge Unlocked!<br><small>Master of corrections</small>';

        document.body.appendChild(badge);

        setTimeout(() => {
            badge.style.opacity = '1';
        }, 500);

        setTimeout(() => {
            badge.style.opacity = '0';
            setTimeout(() => badge.remove(), 2000);
        }, 5000);
    }

    loadSavedChanges() {
        const savedChanges = JSON.parse(localStorage.getItem('terrellflautt_word_changes') || '{}');
        const now = Date.now();

        this.evolvedElements.forEach((data, element) => {
            const saved = savedChanges[data.elementId];

            if (saved) {
                const daysSinceChange = (now - saved.timestamp) / (1000 * 60 * 60 * 24);

                // Only apply if change is recent (within 7 days) and has multiple visits
                if (daysSinceChange < 7 && saved.visits >= 2) {
                    // Sometimes apply the saved change on page load
                    if (Math.random() < 0.5) { // 50% chance
                        setTimeout(() => {
                            this.applySavedChange(element, saved.text);
                        }, 1000 + Math.random() * 3000); // 1-4 seconds delay
                    }
                }

                // Clean up old changes
                if (daysSinceChange > 30) {
                    delete savedChanges[data.elementId];
                }
            }
        });

        // Save cleaned up changes
        localStorage.setItem('terrellflautt_word_changes', JSON.stringify(savedChanges));
    }

    applySavedChange(element, newText) {
        const data = this.evolvedElements.get(element);
        if (!data) return;

        element.style.transition = 'opacity 2s ease';
        element.style.opacity = '0.5';

        setTimeout(() => {
            element.textContent = newText;
            element.style.opacity = '1';
            data.evolved = true;
            data.savedChange = newText;
        }, 1000);
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