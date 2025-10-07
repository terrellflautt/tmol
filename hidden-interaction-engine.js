/**
 * HIDDEN INTERACTION ENGINE
 * Makes everything subtly interactive without being obvious
 * Rewards exploration and curiosity
 */

class HiddenInteractionEngine {
    constructor() {
        this.interactions = new Map();
        this.sessionEvolution = {
            clicks: 0,
            hovers: 0,
            discoveries: 0,
            patterns: [],
            visualChanges: []
        };

        this.init();
    }

    init() {
        this.setupUniversalInteractions();
        this.startEvolutionTracking();
        console.log('🕵️ Hidden interactions activated');
    }

    setupUniversalInteractions() {
        // Make EVERYTHING secretly clickable
        this.addElementInteractions();
        this.addTextInteractions();
        this.addSpaceInteractions();
        this.addPatternDetection();
    }

    addElementInteractions() {
        // Headers become subtly interactive
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((header, index) => {
            this.makeInteractive(header, {
                type: 'header',
                reward: () => this.headerClick(header, index),
                hoverEffect: () => this.subtleGlow(header)
            });
        });

        // Paragraphs have hidden interactions
        document.querySelectorAll('p').forEach((p, index) => {
            this.makeInteractive(p, {
                type: 'paragraph',
                reward: () => this.paragraphInteraction(p, index),
                doubleClick: () => this.paragraphDoubleClick(p)
            });
        });

        // Images become discoverable
        document.querySelectorAll('img').forEach((img, index) => {
            this.makeInteractive(img, {
                type: 'image',
                reward: () => this.imageInteraction(img, index),
                longHover: () => this.imageLongHover(img)
            });
        });

        // Navigation items
        document.querySelectorAll('nav a').forEach((link, index) => {
            this.makeInteractive(link, {
                type: 'nav',
                reward: () => this.navInteraction(link, index),
                hoverEffect: () => this.navHover(link)
            });
        });

        // Skill items
        document.querySelectorAll('.skill-item').forEach((skill, index) => {
            this.makeInteractive(skill, {
                type: 'skill',
                reward: () => this.skillInteraction(skill, index),
                sequence: true
            });
        });
    }

    addTextInteractions() {
        // Find specific words and make them interactive
        const targetWords = ['code', 'cloud', 'devops', 'automation', 'innovation', 'serverless'];

        document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span').forEach(element => {
            let html = element.innerHTML;
            let changed = false;

            targetWords.forEach(word => {
                const regex = new RegExp(`\\b(${word})\\b`, 'gi');
                const newHtml = html.replace(regex, `<span class="hidden-word" data-word="${word.toLowerCase()}">$1</span>`);
                if (newHtml !== html) {
                    html = newHtml;
                    changed = true;
                }
            });

            if (changed) {
                element.innerHTML = html;
                element.querySelectorAll('.hidden-word').forEach(wordSpan => {
                    this.makeInteractive(wordSpan, {
                        type: 'word',
                        reward: () => this.wordDiscovery(wordSpan),
                        hoverEffect: () => this.wordHover(wordSpan)
                    });
                });
            }
        });
    }

    addSpaceInteractions() {
        // Empty spaces and margins become interactive
        document.addEventListener('click', (e) => {
            if (e.target === document.body || e.target === document.documentElement) {
                this.spaceClick(e);
            }
        });

        // Footer corners
        const footer = document.querySelector('footer');
        if (footer) {
            this.addCornerInteractions(footer);
        }

        // Section backgrounds
        document.querySelectorAll('section').forEach((section, index) => {
            this.makeInteractive(section, {
                type: 'section',
                reward: () => this.sectionBackgroundClick(section, index),
                backgroundOnly: true
            });
        });
    }

    addPatternDetection() {
        // Track click patterns
        let clickSequence = [];

        document.addEventListener('click', (e) => {
            clickSequence.push({
                element: e.target.tagName,
                timestamp: Date.now(),
                x: e.clientX,
                y: e.clientY
            });

            // Keep only recent clicks
            if (clickSequence.length > 10) clickSequence.shift();

            this.analyzePatterns(clickSequence);
        });

        // Track keyboard sequences
        let keySequence = [];
        document.addEventListener('keydown', (e) => {
            if (!e.target.matches('input, textarea')) {
                keySequence.push(e.key);
                if (keySequence.length > 20) keySequence.shift();
                this.analyzeKeyPatterns(keySequence);
            }
        });
    }

    makeInteractive(element, options) {
        const interactionId = Math.random().toString(36).substr(2, 9);
        this.interactions.set(interactionId, options);

        // Add subtle hover effects
        if (options.hoverEffect) {
            let hoverTimer;
            element.addEventListener('mouseenter', () => {
                hoverTimer = setTimeout(() => options.hoverEffect(), 500);
            });
            element.addEventListener('mouseleave', () => {
                clearTimeout(hoverTimer);
                this.removeSubtleEffects(element);
            });
        }

        // Add click handler
        element.addEventListener('click', (e) => {
            if (options.backgroundOnly && e.target !== element) return;

            this.sessionEvolution.clicks++;
            options.reward();
            this.trackInteraction(interactionId, options.type);

            // Prevent default for special elements
            if (options.type === 'word' || options.type === 'header') {
                e.preventDefault();
            }
        });

        // Add double-click handler if needed
        if (options.doubleClick) {
            element.addEventListener('dblclick', options.doubleClick);
        }

        // Add long hover detection
        if (options.longHover) {
            let longHoverTimer;
            element.addEventListener('mouseenter', () => {
                longHoverTimer = setTimeout(options.longHover, 3000);
            });
            element.addEventListener('mouseleave', () => {
                clearTimeout(longHoverTimer);
            });
        }
    }

    // Interaction rewards
    headerClick(header, index) {
        this.subtleTransform(header, 'pulse');
        this.addEvolution(`header_${index}`, () => {
            header.style.textShadow = '0 0 5px rgba(102, 126, 234, 0.3)';
        });
    }

    paragraphInteraction(p, index) {
        this.subtleTransform(p, 'highlight');
        this.addEvolution(`paragraph_${index}`, () => {
            p.style.borderLeft = '2px solid rgba(102, 126, 234, 0.2)';
            p.style.paddingLeft = '10px';
        });
    }

    paragraphDoubleClick(p) {
        this.subtleTransform(p, 'expand');
        p.style.transition = 'all 0.5s ease';
        p.style.fontSize = '1.1em';
        p.style.lineHeight = '1.8';
    }

    imageInteraction(img, index) {
        this.subtleTransform(img, 'focus');
        this.addEvolution(`image_${index}`, () => {
            img.style.filter = 'brightness(1.1) contrast(1.05)';
            img.style.transform = 'scale(1.02)';
        });
    }

    imageLongHover(img) {
        img.style.filter = 'sepia(0.2) brightness(1.1)';
        img.style.transition = 'filter 1s ease';
    }

    navInteraction(link, index) {
        this.subtleTransform(link, 'glow');
        this.addEvolution(`nav_${index}`, () => {
            link.style.textDecoration = 'underline';
            link.style.textDecorationColor = 'rgba(102, 126, 234, 0.5)';
        });
    }

    navHover(link) {
        link.style.color = '#667eea';
        link.style.transition = 'color 0.3s ease';
    }

    skillInteraction(skill, index) {
        this.subtleTransform(skill, 'activate');
        this.addEvolution(`skill_${index}`, () => {
            skill.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
            skill.style.borderColor = 'rgba(102, 126, 234, 0.3)';
        });
    }

    wordDiscovery(wordSpan) {
        const word = wordSpan.dataset.word;
        this.subtleTransform(wordSpan, 'discovered');
        this.sessionEvolution.discoveries++;

        this.addEvolution(`word_${word}`, () => {
            wordSpan.style.color = '#667eea';
            wordSpan.style.fontWeight = 'bold';
            wordSpan.style.cursor = 'pointer';
        });

        console.log(`🔍 Word discovered: ${word}`);
    }

    wordHover(wordSpan) {
        wordSpan.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
        wordSpan.style.borderRadius = '3px';
        wordSpan.style.padding = '2px 4px';
    }

    spaceClick(e) {
        // Create a temporary ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${e.clientX - 10}px;
            top: ${e.clientY - 10}px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.2);
            pointer-events: none;
            z-index: 9999;
            animation: spaceRipple 1s ease-out forwards;
        `;

        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);

        this.sessionEvolution.clicks++;
        if (this.sessionEvolution.clicks % 10 === 0) {
            this.addEvolution('space_explorer', () => {
                document.body.style.cursor = 'crosshair';
                setTimeout(() => document.body.style.cursor = '', 2000);
            });
        }
    }

    sectionBackgroundClick(section, index) {
        this.subtleTransform(section, 'reveal');
        this.addEvolution(`section_${index}`, () => {
            section.style.backgroundColor = 'rgba(102, 126, 234, 0.02)';
        });
    }

    addCornerInteractions(element) {
        const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

        corners.forEach(corner => {
            const cornerDiv = document.createElement('div');
            cornerDiv.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                ${corner.includes('top') ? 'top: 0;' : 'bottom: 0;'}
                ${corner.includes('left') ? 'left: 0;' : 'right: 0;'}
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            cornerDiv.addEventListener('click', () => {
                this.cornerClick(corner, element);
            });

            cornerDiv.addEventListener('mouseenter', () => {
                cornerDiv.style.opacity = '0.1';
                cornerDiv.style.backgroundColor = 'rgba(102, 126, 234, 0.3)';
            });

            element.style.position = 'relative';
            element.appendChild(cornerDiv);
        });
    }

    cornerClick(corner, element) {
        this.addEvolution(`corner_${corner}`, () => {
            element.style.borderRadius = '10px';
            element.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.1)';
        });
    }

    // Pattern analysis
    analyzePatterns(clickSequence) {
        // Detect rapid clicking
        if (clickSequence.length >= 5) {
            const recentClicks = clickSequence.slice(-5);
            const timeSpan = recentClicks[4].timestamp - recentClicks[0].timestamp;

            if (timeSpan < 2000) { // 5 clicks in 2 seconds
                this.rapidClickReward();
            }
        }

        // Detect geometric patterns
        if (clickSequence.length >= 4) {
            if (this.isCirclePattern(clickSequence.slice(-4))) {
                this.circlePatternReward();
            }
        }
    }

    analyzeKeyPatterns(keySequence) {
        const sequence = keySequence.join('').toLowerCase();

        // Hidden word sequences
        const secrets = ['hello', 'magic', 'secret', 'explore', 'discover'];

        secrets.forEach(secret => {
            if (sequence.includes(secret)) {
                this.secretWordReward(secret);
            }
        });
    }

    isCirclePattern(clicks) {
        // Simple circle detection based on click positions
        if (clicks.length < 4) return false;

        const centerX = clicks.reduce((sum, c) => sum + c.x, 0) / clicks.length;
        const centerY = clicks.reduce((sum, c) => sum + c.y, 0) / clicks.length;

        // Check if points are roughly equidistant from center
        const distances = clicks.map(c =>
            Math.sqrt((c.x - centerX) ** 2 + (c.y - centerY) ** 2)
        );

        const avgDistance = distances.reduce((sum, d) => sum + d, 0) / distances.length;
        const variance = distances.reduce((sum, d) => sum + (d - avgDistance) ** 2, 0) / distances.length;

        return variance < avgDistance * 0.3; // Low variance indicates circle
    }

    // Reward systems
    rapidClickReward() {
        this.addEvolution('rapid_clicker', () => {
            document.body.style.animation = 'rapidClickPulse 0.5s ease-in-out';
            setTimeout(() => document.body.style.animation = '', 500);
        });
    }

    circlePatternReward() {
        this.addEvolution('circle_master', () => {
            const effect = document.createElement('div');
            effect.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100px;
                height: 100px;
                border: 2px solid rgba(102, 126, 234, 0.5);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: circleReward 2s ease-out forwards;
            `;
            document.body.appendChild(effect);
            setTimeout(() => effect.remove(), 2000);
        });
    }

    secretWordReward(word) {
        this.addEvolution(`secret_${word}`, () => {
            console.log(`🔑 Secret word discovered: ${word}`);
            document.title = `${document.title} - ${word.toUpperCase()}`;
            setTimeout(() => {
                document.title = document.title.replace(` - ${word.toUpperCase()}`, '');
            }, 3000);
        });
    }

    // Visual effects
    subtleTransform(element, type) {
        element.style.transition = 'all 0.3s ease';

        switch (type) {
            case 'pulse':
                element.style.transform = 'scale(1.02)';
                setTimeout(() => element.style.transform = '', 300);
                break;
            case 'highlight':
                element.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
                break;
            case 'glow':
                element.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
                break;
            case 'focus':
                element.style.outline = '2px solid rgba(102, 126, 234, 0.3)';
                element.style.outlineOffset = '2px';
                break;
            case 'discovered':
                element.style.textShadow = '0 0 3px rgba(102, 126, 234, 0.5)';
                break;
        }
    }

    subtleGlow(element) {
        element.style.textShadow = '0 0 5px rgba(102, 126, 234, 0.3)';
        element.style.transition = 'text-shadow 0.3s ease';
    }

    removeSubtleEffects(element) {
        setTimeout(() => {
            element.style.boxShadow = '';
            element.style.outline = '';
            element.style.backgroundColor = '';
        }, 300);
    }

    addEvolution(key, effect) {
        if (!this.sessionEvolution.visualChanges.includes(key)) {
            this.sessionEvolution.visualChanges.push(key);
            effect();
        }
    }

    trackInteraction(id, type) {
        const interaction = this.interactions.get(id);
        if (interaction) {
            interaction.count = (interaction.count || 0) + 1;
        }
    }

    startEvolutionTracking() {
        // Gradually reveal more interactions as users explore
        setInterval(() => {
            this.checkEvolutionTriggers();
        }, 30000); // Every 30 seconds
    }

    checkEvolutionTriggers() {
        const { clicks, discoveries, visualChanges } = this.sessionEvolution;

        // Unlock new interaction types based on activity
        if (clicks > 20 && !this.unlocked?.doubleClick) {
            this.unlockDoubleClickInteractions();
            this.unlocked = { ...this.unlocked, doubleClick: true };
        }

        if (discoveries > 5 && !this.unlocked?.keyboard) {
            this.unlockKeyboardShortcuts();
            this.unlocked = { ...this.unlocked, keyboard: true };
        }

        if (visualChanges.length > 10 && !this.unlocked?.advanced) {
            this.unlockAdvancedPatterns();
            this.unlocked = { ...this.unlocked, advanced: true };
        }
    }

    unlockDoubleClickInteractions() {
        console.log('🔓 Double-click interactions unlocked');
        // Add more double-click targets
    }

    unlockKeyboardShortcuts() {
        console.log('🔓 Keyboard shortcuts unlocked');
        // Add more keyboard patterns
    }

    unlockAdvancedPatterns() {
        console.log('🔓 Advanced patterns unlocked');
        // Add complex interaction patterns
    }
}

// Add required CSS animations
const hiddenInteractionStyles = document.createElement('style');
hiddenInteractionStyles.textContent = `
    @keyframes spaceRipple {
        0% { transform: scale(1); opacity: 0.3; }
        100% { transform: scale(4); opacity: 0; }
    }

    @keyframes rapidClickPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.001); }
    }

    @keyframes circleReward {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
`;

document.head.appendChild(hiddenInteractionStyles);

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.hiddenInteractionEngine = new HiddenInteractionEngine();
    });
} else {
    window.hiddenInteractionEngine = new HiddenInteractionEngine();
}