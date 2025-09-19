// 🧩 Advanced Puzzle Generator System
// Creates dynamic, adaptive puzzles that grow in complexity

class AdvancedPuzzleGenerator {
    constructor() {
        this.puzzleTypes = this.initializePuzzleTypes();
        this.riddleCategories = this.initializeRiddleCategories();
        this.gameTemplates = this.initializeGameTemplates();
        this.adaptiveSystem = this.initializeAdaptiveSystem();
        this.collaborativePuzzles = this.initializeCollaborativePuzzles();
        this.metaPuzzles = this.initializeMetaPuzzles();

        this.userProfile = this.loadUserProfile();
        this.activePuzzles = new Map();

        this.init();
    }

    initializePuzzleTypes() {
        return {
            mathematical: {
                name: "Mathematical Mysteries",
                description: "Numbers hide profound truths",
                templates: [
                    'fibonacci_sequences', 'prime_patterns', 'golden_ratio_hunts',
                    'sacred_geometry', 'recursive_equations', 'infinite_series'
                ]
            },

            linguistic: {
                name: "Language Labyrinths",
                description: "Words within words within meaning",
                templates: [
                    'anagram_chains', 'palindrome_puzzles', 'semantic_webs',
                    'etymology_trails', 'cipher_messages', 'haiku_riddles'
                ]
            },

            visual: {
                name: "Visual Vortexes",
                description: "Seeing beyond sight",
                templates: [
                    'optical_illusions', 'pattern_recognition', 'color_logic',
                    'shape_metamorphosis', 'fractal_navigation', 'gestalt_games'
                ]
            },

            temporal: {
                name: "Time Twisted Challenges",
                description: "Past, present, and future collide",
                templates: [
                    'sequence_prediction', 'rhythm_games', 'memory_palaces',
                    'future_archaeology', 'temporal_loops', 'causality_puzzles'
                ]
            },

            philosophical: {
                name: "Philosophical Paradoxes",
                description: "Questions that question themselves",
                templates: [
                    'identity_riddles', 'consciousness_koans', 'reality_probes',
                    'ethics_dilemmas', 'existence_queries', 'wisdom_spirals'
                ]
            },

            interactive: {
                name: "Interactive Impossibilities",
                description: "Puzzles that respond to your being",
                templates: [
                    'biometric_riddles', 'emotion_detectors', 'intuition_tests',
                    'energy_puzzles', 'consciousness_mirrors', 'soul_scanners'
                ]
            }
        };
    }

    initializeRiddleCategories() {
        return {
            beginnerRiddles: [
                {
                    question: "I am the space between thoughts, the pause between breaths. What am I?",
                    answer: "silence",
                    alternatives: ["peace", "stillness", "presence"],
                    hint: "Listen to what isn't there",
                    reward: "mindfulness_badge"
                },
                {
                    question: "The more you share me, the more you have. What am I?",
                    answer: "love",
                    alternatives: ["knowledge", "wisdom", "joy"],
                    hint: "It multiplies when divided",
                    reward: "abundance_understanding"
                }
            ],

            intermediateRiddles: [
                {
                    question: "I am the mirror that shows not your face, but your choices. What am I?",
                    answer: "consequence",
                    alternatives: ["karma", "result", "reality"],
                    hint: "Every action has me",
                    reward: "responsibility_wisdom"
                },
                {
                    question: "I am born when you stop seeking me. What am I?",
                    answer: "peace",
                    alternatives: ["contentment", "satisfaction", "fulfillment"],
                    hint: "The seeking is the obstacle",
                    reward: "paradox_understanding"
                }
            ],

            advancedRiddles: [
                {
                    question: "I am the question that answers itself, the problem that solves itself. What am I?",
                    answer: "koan",
                    alternatives: ["meditation", "awareness", "consciousness"],
                    hint: "Zen masters use me to break minds open",
                    reward: "zen_mastery"
                },
                {
                    question: "I exist only when observed, yet I create the observer. What am I?",
                    answer: "consciousness",
                    alternatives: ["reality", "experience", "awareness"],
                    hint: "The hard problem of philosophy",
                    reward: "consciousness_insight"
                }
            ],

            masterRiddles: [
                {
                    question: "I am the riddle that has no answer because I am the answerer questioning itself. What am I?",
                    answer: "self",
                    alternatives: ["ego", "identity", "being"],
                    hint: "Who is asking this question?",
                    reward: "self_realization"
                },
                {
                    question: "I am what you are when you realize there is no 'you' to realize anything. What am I?",
                    answer: "emptiness",
                    alternatives: ["nothingness", "void", "unity"],
                    hint: "The final understanding",
                    reward: "enlightenment_glimpse"
                }
            ]
        };
    }

    initializeGameTemplates() {
        return {
            sequenceBuilder: {
                name: "Consciousness Sequence Builder",
                description: "Build sequences that reflect patterns of awareness",
                mechanics: {
                    elements: ['thoughts', 'emotions', 'sensations', 'insights'],
                    rules: ['balance', 'flow', 'transformation', 'integration'],
                    levels: [3, 5, 7, 9, 11, 13] // Odd numbers for balance
                }
            },

            realityWeaver: {
                name: "Reality Weaving Game",
                description: "Weave elements of reality into coherent patterns",
                mechanics: {
                    elements: ['past', 'present', 'future', 'possibility', 'actuality'],
                    rules: ['causation', 'synchronicity', 'probability', 'choice'],
                    dimensions: ['time', 'space', 'consciousness', 'meaning']
                }
            },

            wisdomSynthesizer: {
                name: "Wisdom Synthesis Challenge",
                description: "Combine disparate pieces of wisdom into new insights",
                mechanics: {
                    sources: ['eastern', 'western', 'indigenous', 'scientific', 'mystical'],
                    themes: ['love', 'truth', 'beauty', 'unity', 'transcendence'],
                    synthesis: 'create_new_understanding'
                }
            },

            compassionCultivator: {
                name: "Compassion Cultivation Game",
                description: "Grow understanding and empathy through perspective taking",
                mechanics: {
                    perspectives: ['self', 'other', 'enemy', 'stranger', 'nature'],
                    challenges: ['judgment', 'fear', 'anger', 'indifference', 'hatred'],
                    transformation: 'understanding_to_love'
                }
            }
        };
    }

    initializeAdaptiveSystem() {
        return {
            difficultyScaling: {
                factors: ['success_rate', 'time_spent', 'help_requests', 'creativity_shown'],
                adjustments: ['complexity', 'abstraction', 'time_pressure', 'hint_availability']
            },

            personalityAdaptation: {
                analytical: { preferences: ['logic', 'patterns', 'systems'], adjustments: ['more_structure'] },
                creative: { preferences: ['metaphors', 'stories', 'art'], adjustments: ['more_abstraction'] },
                practical: { preferences: ['concrete', 'useful', 'clear'], adjustments: ['more_examples'] },
                intuitive: { preferences: ['feelings', 'hunches', 'flow'], adjustments: ['more_ambiguity'] }
            },

            learningStyleAdaptation: {
                visual: { preferences: ['images', 'diagrams', 'colors'], delivery: 'visual_heavy' },
                auditory: { preferences: ['sounds', 'rhythm', 'music'], delivery: 'audio_enhanced' },
                kinesthetic: { preferences: ['movement', 'touch', 'action'], delivery: 'interactive_heavy' },
                reading: { preferences: ['text', 'lists', 'definitions'], delivery: 'text_rich' }
            }
        };
    }

    initializeCollaborativePuzzles() {
        return {
            globalRiddle: {
                name: "The Global Consciousness Riddle",
                description: "A puzzle that requires multiple minds to solve",
                mechanism: "collective_intelligence",
                currentPhase: 1,
                totalPhases: 7,
                participants: 0
            },

            wisdomExchange: {
                name: "Wisdom Exchange Network",
                description: "Trade insights to unlock deeper mysteries",
                mechanism: "peer_learning",
                categories: ['life_lessons', 'creative_insights', 'spiritual_experiences']
            },

            empathyBuilder: {
                name: "The Empathy Building Project",
                description: "Share perspectives to build collective understanding",
                mechanism: "perspective_sharing",
                themes: ['human_experience', 'cultural_wisdom', 'universal_truths']
            }
        };
    }

    initializeMetaPuzzles() {
        return {
            puzzleAboutPuzzles: {
                name: "The Puzzle About Puzzles",
                description: "A self-referential challenge about the nature of problems",
                type: "meta_cognitive"
            },

            gameAboutGaming: {
                name: "The Game About Gaming",
                description: "Playing with the concept of play itself",
                type: "meta_ludic"
            },

            riddleOfRiddling: {
                name: "The Riddle of Riddling",
                description: "Why do we pose questions to ourselves?",
                type: "meta_existential"
            }
        };
    }

    init() {
        this.loadUserProfile();
        this.setupPuzzleGeneration();
        this.initializeAdaptiveTracking();
        this.createPuzzleInterface();

        console.log('🧩 Advanced Puzzle Generator System initialized');
    }

    loadUserProfile() {
        return {
            solvedPuzzles: JSON.parse(localStorage.getItem('solved_puzzles') || '[]'),
            preferredTypes: JSON.parse(localStorage.getItem('puzzle_preferences') || '[]'),
            difficultyLevel: parseInt(localStorage.getItem('puzzle_difficulty') || '1'),
            learningStyle: localStorage.getItem('learning_style') || 'mixed',
            personalityType: localStorage.getItem('personality_type') || 'balanced'
        };
    }

    generateAdaptivePuzzle() {
        // Analyze user's history and preferences
        const userLevel = this.calculateUserLevel();
        const preferredType = this.determinePreferredType();
        const adaptationNeeds = this.analyzeAdaptationNeeds();

        // Generate puzzle based on analysis
        const puzzle = this.createCustomPuzzle(userLevel, preferredType, adaptationNeeds);

        return puzzle;
    }

    calculateUserLevel() {
        const totalSolved = this.userProfile.solvedPuzzles.length;
        const recentPerformance = this.analyzeRecentPerformance();

        // Level 1-10 based on progression
        if (totalSolved < 5) return 1;
        if (totalSolved < 15) return 2 + Math.floor(recentPerformance * 2);
        if (totalSolved < 30) return 4 + Math.floor(recentPerformance * 3);
        return Math.min(10, 7 + Math.floor(recentPerformance * 3));
    }

    analyzeRecentPerformance() {
        const recentPuzzles = this.userProfile.solvedPuzzles.slice(-10);
        if (recentPuzzles.length === 0) return 0.5;

        const successRate = recentPuzzles.filter(p => p.solved).length / recentPuzzles.length;
        const averageTime = recentPuzzles.reduce((sum, p) => sum + (p.timeSpent || 0), 0) / recentPuzzles.length;
        const averageHints = recentPuzzles.reduce((sum, p) => sum + (p.hintsUsed || 0), 0) / recentPuzzles.length;

        // Combine metrics for performance score (0-1)
        return (successRate * 0.5) + ((1 - Math.min(averageTime / 300, 1)) * 0.3) + ((1 - Math.min(averageHints / 3, 1)) * 0.2);
    }

    createCustomPuzzle(level, type, adaptations) {
        const puzzleTemplate = this.selectPuzzleTemplate(type, level);
        const customizedPuzzle = this.applyAdaptations(puzzleTemplate, adaptations);

        return {
            id: this.generatePuzzleId(),
            type: type,
            level: level,
            ...customizedPuzzle,
            created: Date.now(),
            attempts: 0,
            hintsUsed: 0
        };
    }

    selectPuzzleTemplate(type, level) {
        const templates = this.puzzleTypes[type].templates;
        const template = templates[Math.floor(Math.random() * templates.length)];

        // Generate content based on template and level
        switch(template) {
            case 'fibonacci_sequences':
                return this.createFibonacciPuzzle(level);
            case 'anagram_chains':
                return this.createAnagramChainPuzzle(level);
            case 'pattern_recognition':
                return this.createPatternRecognitionPuzzle(level);
            case 'consciousness_koans':
                return this.createConsciousnessKoan(level);
            default:
                return this.createDefaultPuzzle(level);
        }
    }

    createFibonacciPuzzle(level) {
        const sequence = this.generateFibonacciSequence(level + 5);
        const hiddenIndex = Math.floor(sequence.length / 2);
        const hiddenValue = sequence[hiddenIndex];
        const puzzleSequence = [...sequence];
        puzzleSequence[hiddenIndex] = '?';

        return {
            title: "The Golden Sequence",
            description: "Nature's most beloved pattern has a gap. Can you complete it?",
            sequence: puzzleSequence,
            answer: hiddenValue,
            hint: "Each number embraces the sum of its predecessors",
            context: "This sequence appears in flower petals, shell spirals, and galaxy arms"
        };
    }

    createAnagramChainPuzzle(level) {
        const words = this.getAnagramChain(level);
        const scrambled = words.map(word => this.scrambleWord(word));

        return {
            title: "Word Metamorphosis",
            description: "Transform each word into the next through the alchemy of letters",
            words: scrambled,
            chain: words,
            hint: "Each word contains all letters of the next, rearranged",
            context: "Language is the magic by which thought becomes reality"
        };
    }

    createPatternRecognitionPuzzle(level) {
        const pattern = this.generateVisualPattern(level);

        return {
            title: "The Visual Symphony",
            description: "Shapes dance in harmony. What comes next in their cosmic ballet?",
            pattern: pattern.sequence,
            answer: pattern.next,
            hint: "Look not just at what is, but at what becomes",
            context: "Patterns are the universe's way of thinking out loud"
        };
    }

    createConsciousnessKoan(level) {
        const koans = this.getKoanByLevel(level);
        const selectedKoan = koans[Math.floor(Math.random() * koans.length)];

        return {
            title: "The Mirror of Mind",
            description: selectedKoan.question,
            type: "koan",
            contemplation: selectedKoan.contemplation,
            hint: selectedKoan.hint,
            context: "This is not a puzzle to solve, but a riddle to be"
        };
    }

    createDailyChallenge() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

        // Use day of year as seed for consistent daily puzzles
        Math.seedrandom(dayOfYear.toString());

        const challenge = this.generateAdaptivePuzzle();
        challenge.isDailyChallenge = true;
        challenge.expires = new Date(today.getTime() + 24 * 60 * 60 * 1000);

        return challenge;
    }

    createWeeklyMegaPuzzle() {
        const week = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
        Math.seedrandom(week.toString());

        return {
            title: "The Weekly Wisdom Web",
            description: "A puzzle woven from seven days of contemplation",
            type: "mega_puzzle",
            phases: this.generateWeeklyPhases(),
            currentPhase: 0,
            completionReward: "wisdom_crystal",
            timeLimit: 7 * 24 * 60 * 60 * 1000 // 7 days
        };
    }

    setupPuzzleInterface() {
        // Create floating puzzle interface
        const puzzleInterface = document.createElement('div');
        puzzleInterface.id = 'puzzle-interface';
        puzzleInterface.innerHTML = `
            <div class="puzzle-container">
                <div class="puzzle-header">
                    <h3>🧩 Mind Puzzles</h3>
                    <div class="puzzle-controls">
                        <button class="generate-puzzle-btn">New Puzzle</button>
                        <button class="daily-challenge-btn">Daily Challenge</button>
                        <button class="minimize-puzzle-btn">−</button>
                    </div>
                </div>
                <div class="puzzle-content">
                    <div class="puzzle-placeholder">
                        <p>Ready to challenge your mind?</p>
                        <p>Click "New Puzzle" to begin your journey</p>
                    </div>
                </div>
            </div>
        `;

        puzzleInterface.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 300px;
            background: linear-gradient(135deg, rgba(0,0,0,0.9), rgba(30,30,30,0.9));
            color: white;
            border-radius: 15px;
            padding: 20px;
            z-index: 9999;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
            transform: translateY(100%);
            transition: transform 0.5s ease;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        // Add to page and show after delay
        document.body.appendChild(puzzleInterface);

        // Show interface when user reaches apprentice level
        setTimeout(() => {
            if (window.progressiveCuriositySystem?.curiosityLevel !== 'novice') {
                puzzleInterface.style.transform = 'translateY(0)';
            }
        }, 5000);

        this.setupPuzzleEventListeners(puzzleInterface);
    }

    setupPuzzleEventListeners(interface) {
        const generateBtn = interface.querySelector('.generate-puzzle-btn');
        const dailyBtn = interface.querySelector('.daily-challenge-btn');
        const minimizeBtn = interface.querySelector('.minimize-puzzle-btn');

        generateBtn.addEventListener('click', () => {
            const puzzle = this.generateAdaptivePuzzle();
            this.displayPuzzle(puzzle, interface);
        });

        dailyBtn.addEventListener('click', () => {
            const dailyChallenge = this.createDailyChallenge();
            this.displayPuzzle(dailyChallenge, interface);
        });

        minimizeBtn.addEventListener('click', () => {
            interface.style.transform = 'translateY(calc(100% - 60px))';
            setTimeout(() => {
                interface.style.transform = 'translateY(0)';
            }, 10000); // Auto-restore after 10 seconds
        });
    }

    displayPuzzle(puzzle, interface) {
        const content = interface.querySelector('.puzzle-content');

        content.innerHTML = `
            <div class="active-puzzle">
                <h4>${puzzle.title}</h4>
                <p class="puzzle-description">${puzzle.description}</p>
                <div class="puzzle-body">
                    ${this.renderPuzzleContent(puzzle)}
                </div>
                <div class="puzzle-actions">
                    <button class="hint-btn">💡 Hint</button>
                    <button class="submit-btn">Submit</button>
                    <button class="skip-btn">Skip</button>
                </div>
                <div class="puzzle-feedback"></div>
            </div>
        `;

        this.setupPuzzleInteraction(puzzle, content);
    }

    renderPuzzleContent(puzzle) {
        switch(puzzle.type) {
            case 'mathematical':
                return this.renderMathPuzzle(puzzle);
            case 'linguistic':
                return this.renderWordPuzzle(puzzle);
            case 'visual':
                return this.renderVisualPuzzle(puzzle);
            case 'philosophical':
                return this.renderPhilosophicalPuzzle(puzzle);
            default:
                return this.renderGenericPuzzle(puzzle);
        }
    }

    renderMathPuzzle(puzzle) {
        if (puzzle.sequence) {
            return `
                <div class="sequence-puzzle">
                    <div class="sequence">
                        ${puzzle.sequence.map((num, i) =>
                            `<span class="sequence-item ${num === '?' ? 'missing' : ''}">${num}</span>`
                        ).join('')}
                    </div>
                    <input type="number" class="puzzle-input" placeholder="What number goes here?">
                </div>
            `;
        }
        return '<div class="puzzle-content">Mathematical challenge loading...</div>';
    }

    renderWordPuzzle(puzzle) {
        if (puzzle.words) {
            return `
                <div class="word-puzzle">
                    ${puzzle.words.map((word, i) => `
                        <div class="word-item">
                            <span class="scrambled">${word}</span>
                            <input type="text" class="word-input" placeholder="Unscramble...">
                        </div>
                    `).join('')}
                </div>
            `;
        }
        return '<div class="puzzle-content">Word challenge loading...</div>';
    }

    renderVisualPuzzle(puzzle) {
        return `
            <div class="visual-puzzle">
                <div class="pattern-display">
                    ${puzzle.pattern ? this.renderPattern(puzzle.pattern) : 'Visual pattern loading...'}
                </div>
                <div class="pattern-options">
                    <!-- Options would be generated based on puzzle -->
                </div>
            </div>
        `;
    }

    renderPhilosophicalPuzzle(puzzle) {
        return `
            <div class="philosophical-puzzle">
                <div class="contemplation">
                    <p class="koan-text">${puzzle.description}</p>
                </div>
                <div class="reflection-space">
                    <textarea class="reflection-input" placeholder="Share your contemplation..."></textarea>
                </div>
            </div>
        `;
    }

    // Helper methods for puzzle generation
    generateFibonacciSequence(length) {
        const seq = [1, 1];
        for (let i = 2; i < length; i++) {
            seq[i] = seq[i-1] + seq[i-2];
        }
        return seq;
    }

    scrambleWord(word) {
        return word.split('').sort(() => Math.random() - 0.5).join('');
    }

    generatePuzzleId() {
        return 'puzzle_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Save progress
    savePuzzleProgress(puzzleId, progress) {
        const saved = JSON.parse(localStorage.getItem('puzzle_progress') || '{}');
        saved[puzzleId] = {
            ...progress,
            lastUpdated: Date.now()
        };
        localStorage.setItem('puzzle_progress', JSON.stringify(saved));
    }
}

// Initialize the puzzle generator
window.advancedPuzzleGenerator = new AdvancedPuzzleGenerator();

// Export for integration
window.AdvancedPuzzleGenerator = AdvancedPuzzleGenerator;