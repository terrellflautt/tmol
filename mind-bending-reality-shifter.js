// Mind-Bending Reality Shifter - Nothing is as it seems
// Makes users question reality through subtle, impossible changes

class MindBendingRealityShifter {
    constructor() {
        this.realityState = 'normal';
        this.glitchProbability = 0.001; // 0.1% chance per second
        this.userAttention = this.trackAttention();
        this.nameGlitches = this.initializeNameGlitches();
        this.realityBreaks = this.initializeRealityBreaks();
        this.temporalShifts = this.initializeTemporalShifts();
        this.dimensionalSlips = this.initializeDimensionalSlips();

        this.init();
    }

    init() {
        this.startRealityEngine();
        this.setupGlitchTriggers();
        this.initializeQuantumObserver();
        this.plantImpossibilities();
    }

    initializeNameGlitches() {
        return {
            // Subtle variations that make users doubt what they saw
            subtle: [
                'Terrell K. Flautt',     // Normal
                'Terrell K. Flautt',     // Normal (appears more often)
                'Terrell K. Flautt',     // Normal
                'Terrell K. Flautt',     // Normal
                'Terrell K. Flautt',     // Normal
                'Terell K. Flautt',      // Missing one 'r' - very subtle
                'Terrell K. Flutt',      // Missing 'a' - barely noticeable
                'Terrel K. Flautt',      // Missing one 'l'
                'Terrell K. Flautt.',    // Period at end
                'Terrell K. Flautt ',    // Extra space
                'Terrell  K.  Flautt',   // Double spaces
            ],

            // Occasional impossible changes
            impossible: [
                'Terrell K. Flautt',     // Normal baseline
                'T̴e̴r̴r̴e̴l̴l̴ ̴K̴.̴ ̴F̴l̴a̴u̴t̴t̴', // Glitched text
                'Terrell ₭. Flautt',     // Different K
                'Ţεɾɾεʅʅ Ҝ. Fʅαųţţ',    // Foreign characters
                'T3rr3ll K. Fl4utt',     // Leet speak
                'Terrell K. Flautt?',    // Question mark
                'Terrell K. Flau██',     // Redacted
                'Te[CORRUPT]autt',       // Data corruption
                '████████ K. Flautt',    // Censored first name
                'Terrell K. [LOADING]',  // Loading state
                'ERROR: NAME_NOT_FOUND', // System error
                '< script >alert("hi")</script>', // Code injection joke
                'undefined',             // JavaScript humor
                'NaN',                   // Not a Number
                'null',                  // Null value
                '403 Forbidden',         // HTTP error
                'Connection Timeout',    // Network error
                '...',                   // Loading dots
                '',                      // Empty string
                'WHO AM I?',             // Existential crisis
                'WAKE UP',               // Matrix reference
                'YOU ARE BEING WATCHED', // Paranoia
                'THIS IS NOT REAL',      // Reality break
                'SIMULATION DETECTED',   // Simulation theory
                'THE CAKE IS A LIE',     // Portal reference
                'FOLLOW THE WHITE RABBIT', // Matrix
                '01010100 01100101',     // Binary
                'T̷̰̈h̷̰̾e̷̺̾ ̷̰̈A̷̰̾r̷̺̾c̷̰̈h̷̰̾i̷̺̾ẗ̷̰ḛ̷̾c̷̺̾ẗ̷̰', // The Architect
                '∞',                     // Infinity symbol
                '⚡ THE CREATOR ⚡',      // Divine mode
                'ADMIN',                 // System administrator
                'ROOT USER',             // Unix reference
                'SUDO TERRELL',          // Linux humor
                'Terrell.exe',           // Windows executable
                'Terrell v2.0.1',        // Version number
                'Terrell (BETA)',        // Beta version
                'Terrell™',              // Trademark
                'Terrell©',              // Copyright
                'Terrell®',              // Registered
                'Mr. Robot',             // TV show reference
                'Neo',                   // Matrix reference
                'The One',               // Matrix reference
                'John Doe',              // Generic name
                'Anonymous',             // Hacker reference
                'Guest User',            // Generic user
                'localhost',             // Network reference
                '127.0.0.1',             // Loopback IP
                'USER NOT FOUND',        // Error message
                'CLASSIFIED',            // Redacted
                'UNKNOWN',               // Mystery
                'MYSTERY USER',          // Enigma
                'THE DEVELOPER',         // Meta reference
                'CLAUDE\'S HUMAN',       // AI reference
                'THE PUPPET MASTER',     // Control reference
                'DIGITAL GHOST',         // Phantom
                'CODE WIZARD',           // Magic reference
                'THE ARCHITECT OF REALITY', // Ultimate form
            ],

            // Contextual shifts based on user behavior
            contextual: {
                firstVisit: 'Welcome, Newcomer',
                nighttime: 'The Night Coder',
                mobile: 'Mobile Wanderer',
                developer: 'Fellow Developer',
                confused: 'Lost Soul',
                persistent: 'Determined Seeker',
                quick: 'Impatient Visitor',
                thorough: 'Meticulous Explorer'
            }
        };
    }

    initializeRealityBreaks() {
        return [
            // Subtle reality inconsistencies
            () => this.reverseRandomText(),
            () => this.duplicateRandomElement(),
            () => this.changeColorTemperature(),
            () => this.adjustGravity(),
            () => this.glitchImages(),
            () => this.createImpossibleScrolling(),
            () => this.alterTime(),
            () => this.mirrorLayout(),
            () => this.quantumSuperposition(),
            () => this.createTemporalLoop(),
            () => this.dimensionalSlip(),
            () => this.breakPhysics(),
            () => this.alterMemory(),
            () => this.createParadox(),
            () => this.glitchReality()
        ];
    }

    initializeTemporalShifts() {
        return {
            // Time-based reality alterations
            timeStops: () => {
                // Everything pauses except cursor
                document.body.style.animationPlayState = 'paused';
                setTimeout(() => {
                    document.body.style.animationPlayState = 'running';
                }, 2000);
            },

            timeReverse: () => {
                // Animations play backwards briefly
                const animations = document.getAnimations();
                animations.forEach(anim => {
                    anim.reverse();
                    setTimeout(() => anim.reverse(), 1000);
                });
            },

            timeSkip: () => {
                // Page jumps forward in scroll position
                const currentScroll = window.scrollY;
                window.scrollTo(0, currentScroll + 100);
                setTimeout(() => {
                    window.scrollTo(0, currentScroll);
                }, 500);
            }
        };
    }

    initializeDimensionalSlips() {
        return {
            // Brief glimpses of other dimensions
            mirrorDimension: () => {
                document.body.style.transform = 'scaleX(-1)';
                setTimeout(() => {
                    document.body.style.transform = '';
                }, 1000);
            },

            negativeSpace: () => {
                document.body.style.filter = 'invert(1)';
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 800);
            },

            quantumTunnel: () => {
                document.body.style.opacity = '0.1';
                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 300);
            }
        };
    }

    startRealityEngine() {
        // Main reality shifting loop
        setInterval(() => {
            this.updateUserAttention();
            this.considerRealityShift();
            this.maybeGlitchName();
            this.checkQuantumState();
        }, 1000);

        // Subtle reality shifts every 30-120 seconds
        this.scheduleNextRealityBreak();
    }

    updateUserAttention() {
        // Track if user is actively viewing the page
        this.userAttention.isVisible = !document.hidden;
        this.userAttention.mouseActive = Date.now() - this.userAttention.lastMouse < 5000;
        this.userAttention.keyboardActive = Date.now() - this.userAttention.lastKey < 5000;

        // Set attention level
        this.userAttention.level = this.calculateAttentionLevel();
    }

    calculateAttentionLevel() {
        let attention = 0;
        if (this.userAttention.isVisible) attention += 0.4;
        if (this.userAttention.mouseActive) attention += 0.3;
        if (this.userAttention.keyboardActive) attention += 0.3;
        return Math.min(attention, 1.0);
    }

    trackAttention() {
        const attention = {
            isVisible: true,
            mouseActive: false,
            keyboardActive: false,
            lastMouse: Date.now(),
            lastKey: Date.now(),
            level: 1.0
        };

        // Track mouse movement
        document.addEventListener('mousemove', () => {
            attention.lastMouse = Date.now();
        });

        // Track keyboard activity
        document.addEventListener('keydown', () => {
            attention.lastKey = Date.now();
        });

        return attention;
    }

    maybeGlitchName() {
        // Higher chance when user isn't paying attention
        const inattentionMultiplier = 1 - this.userAttention.level;
        const glitchChance = this.glitchProbability * (1 + inattentionMultiplier * 3);

        if (Math.random() < glitchChance) {
            this.glitchNameDisplay();
        }
    }

    glitchNameDisplay() {
        const nameElement = document.querySelector('.hero-title .title-line:first-child');
        if (!nameElement) return;

        const originalName = nameElement.textContent;
        let glitchedName;

        // 80% chance for subtle glitch, 15% impossible, 5% contextual
        const rand = Math.random();
        if (rand < 0.8) {
            glitchedName = this.getRandomGlitch('subtle');
        } else if (rand < 0.95) {
            glitchedName = this.getRandomGlitch('impossible');
        } else {
            glitchedName = this.getContextualName();
        }

        // Apply glitch
        nameElement.textContent = glitchedName;

        // Restore original after random time (1-8 seconds)
        const restoreTime = 1000 + Math.random() * 7000;
        setTimeout(() => {
            nameElement.textContent = originalName;
        }, restoreTime);

        // Log for debugging (only visible to developers)
        if (window.localStorage.getItem('dev_mode') === 'true') {
            console.log(`Reality glitch: "${originalName}" → "${glitchedName}"`);
        }
    }

    getRandomGlitch(type) {
        const glitches = this.nameGlitches[type];
        return glitches[Math.floor(Math.random() * glitches.length)];
    }

    getContextualName() {
        const context = this.detectContext();
        return this.nameGlitches.contextual[context] || 'Terrell K. Flautt';
    }

    detectContext() {
        const hour = new Date().getHours();
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isDevTools = window.outerHeight - window.innerHeight > 160;

        if (isDevTools) return 'developer';
        if (hour < 6 || hour > 22) return 'nighttime';
        if (isMobile) return 'mobile';
        if (this.userAttention.level < 0.3) return 'confused';

        return 'firstVisit'; // Default
    }

    scheduleNextRealityBreak() {
        // Schedule next reality break between 30-120 seconds
        const delay = 30000 + Math.random() * 90000;
        setTimeout(() => {
            this.triggerRealityBreak();
            this.scheduleNextRealityBreak();
        }, delay);
    }

    triggerRealityBreak() {
        // Only trigger if user might notice (but subtly)
        if (this.userAttention.level > 0.1) {
            const breakFunction = this.realityBreaks[
                Math.floor(Math.random() * this.realityBreaks.length)
            ];
            breakFunction();
        }
    }

    // Reality break functions
    reverseRandomText() {
        const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');
        if (textElements.length === 0) return;

        const element = textElements[Math.floor(Math.random() * textElements.length)];
        const originalText = element.textContent;
        element.textContent = originalText.split('').reverse().join('');

        setTimeout(() => {
            element.textContent = originalText;
        }, 2000);
    }

    duplicateRandomElement() {
        const elements = document.querySelectorAll('.project-card, .skill-item, .contact-item');
        if (elements.length === 0) return;

        const element = elements[Math.floor(Math.random() * elements.length)];
        const clone = element.cloneNode(true);
        clone.style.opacity = '0.7';
        clone.style.filter = 'hue-rotate(180deg)';

        element.parentNode.insertBefore(clone, element.nextSibling);

        setTimeout(() => {
            clone.remove();
        }, 3000);
    }

    changeColorTemperature() {
        document.body.style.filter = 'hue-rotate(45deg) saturate(1.2)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 2000);
    }

    adjustGravity() {
        // Make elements fall upward briefly
        const movableElements = document.querySelectorAll('.btn, .project-card, .skill-item');
        movableElements.forEach(el => {
            el.style.transform = 'translateY(-20px)';
            el.style.transition = 'transform 0.5s ease-out';
        });

        setTimeout(() => {
            movableElements.forEach(el => {
                el.style.transform = '';
            });
        }, 1000);
    }

    glitchImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.style.filter = 'contrast(2) saturate(0) brightness(2)';
            setTimeout(() => {
                img.style.filter = '';
            }, 500);
        });
    }

    createImpossibleScrolling() {
        // Scroll position doesn't match actual scroll
        const currentScroll = window.scrollY;
        let fakeScroll = currentScroll;

        const interval = setInterval(() => {
            fakeScroll += 5;
            window.history.replaceState(null, null, '#fake-position-' + fakeScroll);
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            window.history.replaceState(null, null, window.location.pathname);
        }, 2000);
    }

    alterTime() {
        // Clock runs backwards or stops
        const timeElements = document.querySelectorAll('[data-time]');
        timeElements.forEach(el => {
            const currentTime = el.textContent;
            el.textContent = 'TIME ERROR';
            setTimeout(() => {
                el.textContent = currentTime;
            }, 1500);
        });
    }

    mirrorLayout() {
        document.body.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
            document.body.style.transform = '';
        }, 1000);
    }

    quantumSuperposition() {
        // Element exists in two states simultaneously
        const elements = document.querySelectorAll('.btn');
        if (elements.length === 0) return;

        const element = elements[Math.floor(Math.random() * elements.length)];
        const clone = element.cloneNode(true);

        clone.style.position = 'absolute';
        clone.style.opacity = '0.5';
        clone.style.transform = 'translate(50px, 20px)';
        clone.style.filter = 'hue-rotate(180deg)';

        element.parentNode.appendChild(clone);

        setTimeout(() => {
            clone.remove();
        }, 2000);
    }

    createTemporalLoop() {
        // Same action happens multiple times
        const buttons = document.querySelectorAll('button');
        if (buttons.length === 0) return;

        const button = buttons[Math.floor(Math.random() * buttons.length)];
        let clickCount = 0;

        const loop = () => {
            button.click();
            clickCount++;
            if (clickCount < 3) {
                setTimeout(loop, 500);
            }
        };

        loop();
    }

    dimensionalSlip() {
        // Brief transition to another dimension
        const slipType = Object.keys(this.dimensionalSlips)[
            Math.floor(Math.random() * Object.keys(this.dimensionalSlips).length)
        ];
        this.dimensionalSlips[slipType]();
    }

    breakPhysics() {
        // Elements ignore normal CSS physics
        const elements = document.querySelectorAll('.particle, .floating-element');
        elements.forEach(el => {
            el.style.animationDirection = 'reverse';
            el.style.animationDuration = '0.1s';
        });

        setTimeout(() => {
            elements.forEach(el => {
                el.style.animationDirection = '';
                el.style.animationDuration = '';
            });
        }, 1000);
    }

    alterMemory() {
        // Page content briefly changes to something impossible
        const contentElements = document.querySelectorAll('p');
        if (contentElements.length === 0) return;

        const element = contentElements[Math.floor(Math.random() * contentElements.length)];
        const originalContent = element.textContent;

        element.textContent = 'You have been here before. This message will disappear.';

        setTimeout(() => {
            element.textContent = originalContent;
        }, 3000);
    }

    createParadox() {
        // Create logical impossibility
        const paradoxElement = document.createElement('div');
        paradoxElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.1);
            color: #ff0000;
            padding: 1rem;
            border: 1px solid #ff0000;
            font-family: monospace;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        paradoxElement.textContent = 'This statement is false.';
        document.body.appendChild(paradoxElement);

        setTimeout(() => {
            paradoxElement.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            paradoxElement.style.opacity = '0';
            setTimeout(() => paradoxElement.remove(), 300);
        }, 2000);
    }

    glitchReality() {
        // Everything becomes briefly corrupted
        document.body.style.filter = 'blur(2px) contrast(3) hue-rotate(90deg)';
        document.body.style.transform = 'scale(1.02) rotate(0.5deg)';

        setTimeout(() => {
            document.body.style.filter = '';
            document.body.style.transform = '';
        }, 800);
    }

    considerRealityShift() {
        // Major reality state changes
        if (Math.random() < 0.0001) { // Very rare
            this.shiftRealityState();
        }
    }

    shiftRealityState() {
        const states = ['normal', 'glitched', 'mirror', 'quantum', 'temporal'];
        const newState = states[Math.floor(Math.random() * states.length)];

        if (newState !== this.realityState) {
            this.realityState = newState;
            this.applyRealityState(newState);
        }
    }

    applyRealityState(state) {
        // Reset
        document.body.className = document.body.className.replace(/reality-\w+/g, '');

        // Apply new state
        document.body.classList.add(`reality-${state}`);

        // Auto-revert after 10-30 seconds
        setTimeout(() => {
            document.body.classList.remove(`reality-${state}`);
            this.realityState = 'normal';
        }, 10000 + Math.random() * 20000);
    }

    checkQuantumState() {
        // Observer effect - user attention affects reality stability
        if (this.userAttention.level > 0.8) {
            // High attention - reality is more stable
            this.glitchProbability = 0.0005;
        } else if (this.userAttention.level < 0.3) {
            // Low attention - reality becomes unstable
            this.glitchProbability = 0.002;
        } else {
            // Normal state
            this.glitchProbability = 0.001;
        }
    }

    initializeQuantumObserver() {
        // Reality behaves differently when observed (dev tools open)
        const checkObserver = () => {
            const isObserved = window.outerHeight - window.innerHeight > 160;

            if (isObserved !== this.isBeingObserved) {
                this.isBeingObserved = isObserved;

                if (isObserved) {
                    // Developer is watching - reality becomes more stable but mysterious
                    this.glitchProbability *= 0.1;
                    console.log('Observer detected. Reality stabilizing...');
                } else {
                    // Not being observed - reality can be more chaotic
                    this.glitchProbability *= 10;
                }
            }
        };

        setInterval(checkObserver, 1000);
    }

    plantImpossibilities() {
        // Plant subtle impossibilities throughout the page
        this.plantImpossibleMath();
        this.plantImpossibleTime();
        this.plantImpossibleLogic();
        this.plantImpossiblePhysics();
    }

    plantImpossibleMath() {
        // Hide mathematical impossibilities in the page
        const impossibleEquations = [
            '2 + 2 = 5',
            '1 = 0',
            '∞ = -∞',
            '0 / 0 = 1',
            'π = 3'
        ];

        // Hide in CSS calc() functions that don't actually affect layout
        const style = document.createElement('style');
        style.textContent = `
            /* Hidden impossibility: ${impossibleEquations[0]} */
            .impossible-math::before { content: "${impossibleEquations[1]}"; display: none; }
        `;
        document.head.appendChild(style);
    }

    plantImpossibleTime() {
        // Time inconsistencies
        const timeElement = document.createElement('meta');
        timeElement.name = 'impossible-time';
        timeElement.content = 'created-yesterday-published-tomorrow';
        document.head.appendChild(timeElement);
    }

    plantImpossibleLogic() {
        // Logical paradoxes
        const logicElement = document.createElement('div');
        logicElement.style.display = 'none';
        logicElement.innerHTML = `
            <p>This sentence is false.</p>
            <p>The next statement is true.</p>
            <p>The previous statement is false.</p>
        `;
        document.body.appendChild(logicElement);
    }

    plantImpossiblePhysics() {
        // Physics violations
        document.documentElement.style.setProperty('--impossible-gravity', 'upward');
        document.documentElement.style.setProperty('--light-speed', 'variable');
        document.documentElement.style.setProperty('--time-direction', 'reversible');
    }

    // Public debugging interface (only for developers)
    enableDebugMode() {
        window.localStorage.setItem('dev_mode', 'true');
        console.log('🌀 Reality Debug Mode Enabled');
        console.log('Available commands:');
        console.log('- window.realityShifter.triggerGlitch()');
        console.log('- window.realityShifter.shiftRealityState()');
        console.log('- window.realityShifter.getQuantumState()');
    }

    triggerGlitch() {
        this.glitchNameDisplay();
    }

    getQuantumState() {
        return {
            realityState: this.realityState,
            userAttention: this.userAttention.level,
            glitchProbability: this.glitchProbability,
            isBeingObserved: this.isBeingObserved
        };
    }
}

// Initialize reality shifter
window.realityShifter = new MindBendingRealityShifter();

// Hidden activation for power users
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key === 'R') {
        window.realityShifter.enableDebugMode();
    }
});

// Add CSS for reality states
const realityStyles = document.createElement('style');
realityStyles.textContent = `
    .reality-glitched {
        animation: glitchEffect 0.1s infinite;
    }

    .reality-mirror {
        transform: rotateY(180deg);
    }

    .reality-quantum {
        filter: blur(0.5px) contrast(1.1);
    }

    .reality-temporal {
        animation: temporalShift 2s ease-in-out infinite alternate;
    }

    @keyframes glitchEffect {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }

    @keyframes temporalShift {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(10deg); }
    }
`;
document.head.appendChild(realityStyles);