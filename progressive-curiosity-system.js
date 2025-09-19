// 🔮 Progressive Curiosity Training System
// Trains first-time visitors to look where others do not and return often

class ProgressiveCuriositySystem {
    constructor() {
        this.curiosityLevel = 0;
        this.trainingPhases = this.initializeTrainingPhases();
        this.adaptivePuzzles = this.initializeAdaptivePuzzles();
        this.returnVisitorRewards = this.initializeReturnVisitorRewards();
        this.microInteractions = this.initializeMicroInteractions();
        this.gameProgressions = this.initializeGameProgressions();
        this.secretSociety = this.initializeSecretSociety();

        this.init();
    }

    initializeTrainingPhases() {
        return {
            // Phase 1: Basic Attention Training (0-2 discoveries)
            novice: {
                name: "The Awakening",
                description: "Learning to see beyond the obvious",
                interactions: [
                    'gentle_hover_hints',
                    'obvious_click_targets',
                    'simple_pattern_recognition',
                    'color_change_rewards'
                ],
                rewards: ['encouraging_messages', 'small_visual_effects']
            },

            // Phase 2: Pattern Recognition (3-7 discoveries)
            apprentice: {
                name: "The Pattern Seeker",
                description: "Discovering hidden connections",
                interactions: [
                    'sequence_puzzles',
                    'hidden_word_games',
                    'timing_based_challenges',
                    'multi_element_combinations'
                ],
                rewards: ['sound_effects', 'particle_animations', 'color_themes']
            },

            // Phase 3: Deep Investigation (8-15 discoveries)
            investigator: {
                name: "The Deep Diver",
                description: "Exploring layers within layers",
                interactions: [
                    'multi_step_riddles',
                    'cross_page_puzzles',
                    'memory_challenges',
                    'logic_sequences'
                ],
                rewards: ['music_unlocks', 'secret_content', 'personalized_experiences']
            },

            // Phase 4: Master Level (16-25 discoveries)
            master: {
                name: "The Enlightened",
                description: "Seeing the invisible, knowing the unknowable",
                interactions: [
                    'meta_puzzles',
                    'reality_bending_challenges',
                    'philosophical_riddles',
                    'consciousness_tests'
                ],
                rewards: ['reality_alterations', 'time_manipulation', 'dimensional_shifts']
            },

            // Phase 5: Transcendent (25+ discoveries)
            transcendent: {
                name: "The Transcendent Master",
                description: "Beyond the veil of ordinary perception",
                interactions: [
                    'creation_challenges',
                    'wisdom_trials',
                    'unity_experiences',
                    'infinite_games'
                ],
                rewards: ['creation_powers', 'teaching_abilities', 'cosmic_understanding']
            }
        };
    }

    initializeAdaptivePuzzles() {
        return {
            // Puzzles that adapt based on user behavior and preferences
            mouseMovementPuzzles: {
                name: "The Dance of Intention",
                description: "Mouse movements reveal hidden pathways",
                variations: [
                    'spiral_unlock', 'figure_eight_portal', 'heartbeat_rhythm',
                    'constellation_connect', 'energy_channeling'
                ]
            },

            timingPuzzles: {
                name: "Temporal Mastery",
                description: "Time-based challenges that test patience and precision",
                variations: [
                    'meditation_timer', 'breath_sync', 'golden_ratio_clicks',
                    'fibonacci_sequence', 'prime_number_intervals'
                ]
            },

            memoryPuzzles: {
                name: "Palace of Mind",
                description: "Multi-visit memory challenges spanning days",
                variations: [
                    'daily_symbol_sequence', 'color_pattern_recall',
                    'position_memory', 'story_continuation', 'dream_fragments'
                ]
            },

            creativePuzzles: {
                name: "The Creator's Test",
                description: "Puzzles requiring imagination and creative thinking",
                variations: [
                    'poem_completion', 'color_emotion_matching',
                    'sound_visualization', 'abstract_interpretation', 'synesthesia_games'
                ]
            },

            collaborativePuzzles: {
                name: "The Collective Mind",
                description: "Puzzles that require multiple visitors to solve",
                variations: [
                    'shared_sequence_building', 'collective_story_writing',
                    'group_meditation_sync', 'wisdom_exchange', 'energy_amplification'
                ]
            }
        };
    }

    initializeReturnVisitorRewards() {
        return {
            dailyMysteries: {
                name: "Daily Cosmic Mysteries",
                description: "New puzzles appear each day for returning visitors",
                types: ['philosophical_riddles', 'creative_challenges', 'wisdom_quests']
            },

            seasonalEvolutions: {
                name: "Seasonal Website Evolution",
                description: "The website transforms with seasons and cosmic events",
                types: ['solstice_modes', 'lunar_phases', 'astrological_alignments']
            },

            personalizedJourneys: {
                name: "Your Unique Path",
                description: "Custom content based on individual discovery patterns",
                types: ['trait_based_content', 'learning_style_adaptation', 'interest_cultivation']
            },

            communityRewards: {
                name: "The Growing Circle",
                description: "Rewards for bringing others into the experience",
                types: ['referral_mysteries', 'teaching_bonuses', 'wisdom_sharing']
            }
        };
    }

    initializeMicroInteractions() {
        return {
            // Tiny interactions that build curiosity habits
            breathing: {
                name: "Synchronized Breathing",
                description: "UI elements that breathe with the user",
                trigger: "mouse_idle_3_seconds"
            },

            eyeGaze: {
                name: "The Knowing Glance",
                description: "Elements that seem to look back at you",
                trigger: "mouse_position_tracking"
            },

            whispers: {
                name: "Digital Whispers",
                description: "Barely visible text that appears and fades",
                trigger: "random_intervals"
            },

            ripples: {
                name: "Consciousness Ripples",
                description: "Click effects that spread across reality",
                trigger: "any_click_event"
            },

            mirroring: {
                name: "Digital Mirror",
                description: "Website subtly mirrors user's behavior",
                trigger: "behavior_pattern_recognition"
            }
        };
    }

    initializeGameProgressions() {
        return {
            simonMaster: {
                name: "Simon Says: Consciousness Edition",
                levels: [
                    { name: "Memory", sequences: 4, speed: 1000 },
                    { name: "Attention", sequences: 6, speed: 800 },
                    { name: "Focus", sequences: 8, speed: 600 },
                    { name: "Awareness", sequences: 12, speed: 400 },
                    { name: "Transcendence", sequences: 16, speed: 200 }
                ]
            },

            treasureHunter: {
                name: "The Infinite Treasure Hunt",
                levels: [
                    { name: "Seeker", treasures: 3, difficulty: "obvious" },
                    { name: "Finder", treasures: 5, difficulty: "hidden" },
                    { name: "Discoverer", treasures: 8, difficulty: "invisible" },
                    { name: "Master Hunter", treasures: 12, difficulty: "quantum" },
                    { name: "Treasure Creator", treasures: "infinite", difficulty: "imaginative" }
                ]
            },

            riddleMaster: {
                name: "The Riddle Weaver",
                categories: [
                    "Logic Labyrinths", "Philosophical Paradoxes", "Creative Conundrums",
                    "Wisdom Wordplay", "Consciousness Puzzles", "Reality Riddles"
                ]
            },

            rhythmKeeper: {
                name: "The Cosmic Rhythm",
                elements: ["heartbeat", "breath", "mouse_movement", "scroll_rhythm", "click_patterns"]
            }
        };
    }

    initializeSecretSociety() {
        return {
            name: "The Order of Digital Mystics",
            levels: [
                { name: "Initiate", requirement: "First hidden discovery" },
                { name: "Acolyte", requirement: "5 discoveries + 1 return visit" },
                { name: "Practitioner", requirement: "15 discoveries + weekly visits" },
                { name: "Adept", requirement: "25 discoveries + daily engagement" },
                { name: "Master", requirement: "Complete all challenges + teach others" },
                { name: "Illuminated", requirement: "Transcend the system entirely" }
            ],
            privileges: [
                "secret_chat_room", "exclusive_content", "early_access",
                "creation_tools", "teaching_abilities", "reality_modification"
            ]
        };
    }

    init() {
        this.assessCurrentCuriosityLevel();
        this.setupProgressiveInteractions();
        this.initializeDailyMysteries();
        this.createReturnVisitorDetection();
        this.setupMicroInteractionSystem();
        this.activateAdaptivePuzzleSystem();

        console.log('🔮 Progressive Curiosity Training System initialized');
    }

    assessCurrentCuriosityLevel() {
        // Analyze user's discovery history to determine current phase
        const discoveries = this.getDiscoveryCount();
        const visits = this.getVisitCount();
        const timeSpent = this.getTotalTimeSpent();

        if (discoveries < 3) {
            this.curiosityLevel = 'novice';
        } else if (discoveries < 8) {
            this.curiosityLevel = 'apprentice';
        } else if (discoveries < 16) {
            this.curiosityLevel = 'investigator';
        } else if (discoveries < 26) {
            this.curiosityLevel = 'master';
        } else {
            this.curiosityLevel = 'transcendent';
        }

        console.log(`🎭 Curiosity Level: ${this.curiosityLevel} (${discoveries} discoveries)`);
    }

    setupProgressiveInteractions() {
        const currentPhase = this.trainingPhases[this.curiosityLevel];

        currentPhase.interactions.forEach(interaction => {
            this.activateInteraction(interaction);
        });

        // Show phase progression notification
        this.showPhaseNotification(currentPhase);
    }

    activateInteraction(interactionType) {
        switch(interactionType) {
            case 'gentle_hover_hints':
                this.setupGentleHoverHints();
                break;
            case 'obvious_click_targets':
                this.setupObviousClickTargets();
                break;
            case 'sequence_puzzles':
                this.setupSequencePuzzles();
                break;
            case 'multi_step_riddles':
                this.setupMultiStepRiddles();
                break;
            case 'meta_puzzles':
                this.setupMetaPuzzles();
                break;
            case 'creation_challenges':
                this.setupCreationChallenges();
                break;
        }
    }

    setupGentleHoverHints() {
        // For novices: very gentle guidance
        const interactiveElements = document.querySelectorAll('h1, h2, .btn, .nav-link');

        interactiveElements.forEach(element => {
            let hintTimeout;

            element.addEventListener('mouseenter', () => {
                hintTimeout = setTimeout(() => {
                    this.showGentleHint(element, "Something special might happen if you explore here...");
                }, 2000);
            });

            element.addEventListener('mouseleave', () => {
                clearTimeout(hintTimeout);
                this.hideGentleHint(element);
            });
        });
    }

    setupObviousClickTargets() {
        // Create clearly visible interactive elements for beginners
        const targets = [
            { selector: '.logo-text', hint: "The name holds power - click to discover" },
            { selector: '.hero-title', hint: "Titles often hide secrets" },
            { selector: '.footer', hint: "Even footers have stories to tell" }
        ];

        targets.forEach(target => {
            const element = document.querySelector(target.selector);
            if (element) {
                this.addSubtleGlow(element);
                this.addClickHandler(element, target.hint);
            }
        });
    }

    setupSequencePuzzles() {
        // For apprentices: pattern-based challenges
        this.createColorSequenceGame();
        this.createTimingSequenceGame();
        this.createSpatialSequenceGame();
    }

    setupMultiStepRiddles() {
        // For investigators: complex multi-part puzzles
        this.createCrossPageRiddle();
        this.createMemoryBasedPuzzle();
        this.createLogicChainPuzzle();
    }

    setupMetaPuzzles() {
        // For masters: puzzles about the nature of the puzzles themselves
        this.createSelfAwarePuzzle();
        this.createRealityBendingChallenge();
        this.createConsciousnessPuzzle();
    }

    setupCreationChallenges() {
        // For transcendent: tools to create new experiences
        this.createPuzzleCreationTools();
        this.createRealityModificationInterface();
        this.createWisdomSharingPlatform();
    }

    createColorSequenceGame() {
        // A sophisticated color memory game that grows in complexity
        const game = document.createElement('div');
        game.className = 'color-sequence-game hidden-game';
        game.innerHTML = `
            <div class="game-container">
                <h3>🌈 Color Consciousness Game</h3>
                <p>Remember the sequence of colors that flash before you</p>
                <div class="color-grid">
                    <div class="color-cell" data-color="red"></div>
                    <div class="color-cell" data-color="blue"></div>
                    <div class="color-cell" data-color="green"></div>
                    <div class="color-cell" data-color="yellow"></div>
                    <div class="color-cell" data-color="purple"></div>
                    <div class="color-cell" data-color="orange"></div>
                </div>
                <div class="game-controls">
                    <button class="start-sequence-btn">Start Sequence</button>
                    <div class="score">Level: <span class="level">1</span></div>
                </div>
            </div>
        `;

        // Position randomly but accessibly
        game.style.cssText = `
            position: fixed;
            top: 20%;
            right: 20px;
            width: 200px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 15px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.5s ease;
        `;

        // Add game logic
        this.setupColorSequenceLogic(game);

        // Show game when user reaches apprentice level
        if (this.curiosityLevel === 'apprentice') {
            document.body.appendChild(game);
            setTimeout(() => game.style.transform = 'translateX(0)', 1000);
        }
    }

    setupColorSequenceLogic(gameElement) {
        let sequence = [];
        let playerSequence = [];
        let level = 1;
        let isPlaying = false;

        const colorCells = gameElement.querySelectorAll('.color-cell');
        const startBtn = gameElement.querySelector('.start-sequence-btn');
        const levelDisplay = gameElement.querySelector('.level');

        // Color definitions
        const colors = {
            red: '#ff4757',
            blue: '#5352ed',
            green: '#7bed9f',
            yellow: '#ffa502',
            purple: '#a55eea',
            orange: '#ff6348'
        };

        // Apply colors to cells
        colorCells.forEach(cell => {
            const color = cell.dataset.color;
            cell.style.backgroundColor = colors[color];
            cell.style.opacity = '0.3';
            cell.style.cursor = 'pointer';
            cell.style.transition = 'all 0.3s ease';
        });

        startBtn.addEventListener('click', () => {
            if (!isPlaying) {
                startNewSequence();
            }
        });

        function startNewSequence() {
            isPlaying = true;
            playerSequence = [];

            // Generate sequence
            sequence = [];
            for (let i = 0; i < level + 2; i++) {
                const randomIndex = Math.floor(Math.random() * colorCells.length);
                sequence.push(colorCells[randomIndex].dataset.color);
            }

            // Play sequence
            playSequence();
        }

        function playSequence() {
            startBtn.textContent = 'Watch...';
            let index = 0;

            const playNext = () => {
                if (index < sequence.length) {
                    const color = sequence[index];
                    const cell = gameElement.querySelector(`[data-color="${color}"]`);

                    // Flash the cell
                    cell.style.opacity = '1';
                    cell.style.transform = 'scale(1.1)';

                    setTimeout(() => {
                        cell.style.opacity = '0.3';
                        cell.style.transform = 'scale(1)';
                        index++;
                        setTimeout(playNext, 300);
                    }, 500);
                } else {
                    // Sequence complete, player's turn
                    startBtn.textContent = 'Your Turn!';
                    enablePlayerInput();
                }
            };

            playNext();
        }

        function enablePlayerInput() {
            colorCells.forEach(cell => {
                cell.addEventListener('click', handlePlayerClick);
            });
        }

        function handlePlayerClick(e) {
            const clickedColor = e.target.dataset.color;
            playerSequence.push(clickedColor);

            // Visual feedback
            e.target.style.opacity = '1';
            e.target.style.transform = 'scale(1.1)';
            setTimeout(() => {
                e.target.style.opacity = '0.3';
                e.target.style.transform = 'scale(1)';
            }, 200);

            // Check if correct
            const currentIndex = playerSequence.length - 1;
            if (playerSequence[currentIndex] !== sequence[currentIndex]) {
                // Wrong! Game over
                gameOver();
                return;
            }

            // Check if sequence complete
            if (playerSequence.length === sequence.length) {
                // Level complete!
                levelComplete();
            }
        }

        function levelComplete() {
            level++;
            levelDisplay.textContent = level;
            startBtn.textContent = 'Next Level';

            // Disable input
            colorCells.forEach(cell => {
                cell.removeEventListener('click', handlePlayerClick);
            });

            // Trigger visual music experience for significant levels
            if (level % 3 === 0 && window.visualMusicExperience) {
                window.visualMusicExperience.triggerForDifficultProgress({
                    type: 'color_sequence_mastery',
                    level: level,
                    timestamp: Date.now()
                });
            }

            isPlaying = false;
        }

        function gameOver() {
            startBtn.textContent = 'Try Again';
            level = Math.max(1, level - 1);
            levelDisplay.textContent = level;

            // Disable input
            colorCells.forEach(cell => {
                cell.removeEventListener('click', handlePlayerClick);
            });

            isPlaying = false;
        }
    }

    initializeDailyMysteries() {
        // Create content that changes daily to encourage return visits
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('last_mystery_date');

        if (today !== lastVisit) {
            this.generateDailyMystery();
            localStorage.setItem('last_mystery_date', today);
        }
    }

    generateDailyMystery() {
        const mysteries = [
            "What if every click was a choice that shaped your reality?",
            "Hidden in plain sight: find the element that doesn't belong",
            "Today's challenge: discover something beautiful in the ordinary",
            "The answer to today's puzzle lies in the spaces between words",
            "What story do the colors on this page tell together?"
        ];

        const todaysMystery = mysteries[new Date().getDay() % mysteries.length];
        this.showDailyMystery(todaysMystery);
    }

    showDailyMystery(mystery) {
        const mysteryElement = document.createElement('div');
        mysteryElement.className = 'daily-mystery';
        mysteryElement.innerHTML = `
            <div class="mystery-content">
                <div class="mystery-icon">🌟</div>
                <div class="mystery-text">${mystery}</div>
                <div class="mystery-date">Daily Mystery</div>
                <button class="mystery-close">×</button>
            </div>
        `;

        mysteryElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
            color: white;
            padding: 30px;
            border-radius: 20px;
            z-index: 10001;
            backdrop-filter: blur(10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 400px;
            animation: mysteryAppear 1s ease-out;
        `;

        // Add styles if not present
        if (!document.querySelector('style[data-mystery-styles]')) {
            const styles = document.createElement('style');
            styles.setAttribute('data-mystery-styles', 'true');
            styles.textContent = `
                @keyframes mysteryAppear {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                .mystery-content {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .mystery-icon {
                    font-size: 2em;
                    margin-bottom: 15px;
                }
                .mystery-text {
                    font-size: 1.1em;
                    margin-bottom: 15px;
                    line-height: 1.4;
                }
                .mystery-date {
                    font-size: 0.9em;
                    opacity: 0.8;
                    margin-bottom: 20px;
                }
                .mystery-close {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5em;
                    cursor: pointer;
                    opacity: 0.7;
                }
                .mystery-close:hover {
                    opacity: 1;
                }
            `;
            document.head.appendChild(styles);
        }

        mysteryElement.querySelector('.mystery-close').addEventListener('click', () => {
            mysteryElement.remove();
        });

        document.body.appendChild(mysteryElement);

        // Auto-remove after 15 seconds
        setTimeout(() => {
            if (mysteryElement.parentNode) {
                mysteryElement.remove();
            }
        }, 15000);
    }

    createReturnVisitorDetection() {
        const visitCount = parseInt(localStorage.getItem('visit_count') || '0') + 1;
        localStorage.setItem('visit_count', visitCount.toString());

        if (visitCount > 1) {
            this.activateReturnVisitorFeatures(visitCount);
        }
    }

    activateReturnVisitorFeatures(visitCount) {
        // Show welcome back message
        this.showWelcomeBackMessage(visitCount);

        // Unlock new content based on return frequency
        if (visitCount >= 3) {
            this.unlockLoyaltyRewards();
        }

        if (visitCount >= 7) {
            this.unlockWeeklyMasterFeatures();
        }

        if (visitCount >= 30) {
            this.unlockMonthlyLegendStatus();
        }
    }

    showWelcomeBackMessage(visitCount) {
        const messages = [
            "Welcome back, curious soul! Something new awaits you today...",
            "Your third visit reveals new depths to explore...",
            "A returning seeker! The mysteries deepen with each visit...",
            "Week after week, you return. True dedication to the path...",
            "A month of visits! You've earned legendary status here..."
        ];

        let messageIndex = 0;
        if (visitCount >= 30) messageIndex = 4;
        else if (visitCount >= 7) messageIndex = 3;
        else if (visitCount >= 3) messageIndex = 2;
        else if (visitCount === 2) messageIndex = 1;

        this.showTemporaryMessage(messages[messageIndex], 'welcome-back');
    }

    showTemporaryMessage(text, className = '') {
        const message = document.createElement('div');
        message.className = `temporary-message ${className}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            z-index: 10000;
            animation: messageSlideIn 0.5s ease-out;
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'messageSlideOut 0.5s ease-in';
            setTimeout(() => message.remove(), 500);
        }, 4000);
    }

    // Helper methods
    getDiscoveryCount() {
        return window.magicUser?.shadowProgress?.discoveries?.length || 0;
    }

    getVisitCount() {
        return parseInt(localStorage.getItem('visit_count') || '0');
    }

    getTotalTimeSpent() {
        return parseInt(localStorage.getItem('total_time_spent') || '0');
    }

    showGentleHint(element, text) {
        const hint = document.createElement('div');
        hint.className = 'gentle-hint';
        hint.textContent = text;
        hint.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 5px;
            font-size: 0.8em;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const rect = element.getBoundingClientRect();
        hint.style.top = (rect.bottom + 10) + 'px';
        hint.style.left = rect.left + 'px';

        document.body.appendChild(hint);
        setTimeout(() => hint.style.opacity = '1', 100);

        element._gentleHint = hint;
    }

    hideGentleHint(element) {
        if (element._gentleHint) {
            element._gentleHint.remove();
            delete element._gentleHint;
        }
    }

    addSubtleGlow(element) {
        element.style.transition = 'box-shadow 0.3s ease';
        element.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
    }

    addClickHandler(element, hint) {
        element.addEventListener('click', () => {
            if (window.magicUser) {
                window.magicUser.addDiscovery(
                    'curiosity_training_' + Date.now(),
                    'Curiosity Awakened',
                    hint
                );
            }
        });
    }
}

// Initialize the system
window.progressiveCuriositySystem = new ProgressiveCuriositySystem();

// Export for integration
window.ProgressiveCuriositySystem = ProgressiveCuriositySystem;