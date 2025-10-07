/**
 * ADAPTIVE RPG SYSTEM
 * Progressive difficulty, hidden puzzles, skill-based progression
 * Inspired by Quest for Glory series - evolves over hundreds of hours
 *
 * Core Principles:
 * 1. Adaptive Difficulty: Adjusts based on player success/failure
 * 2. Progressive Revelation: New content unlocks over time and visits
 * 3. Hidden Discovery: Puzzles hidden in plain sight for attentive players
 * 4. Skill-Based Rewards: Different approaches earn different skills
 * 5. Persistent Evolution: Site morphs across hundreds of hours
 */

class AdaptiveRPGSystem {
    constructor() {
        this.userId = this.getUserId();
        this.profile = this.loadProfile();
        this.puzzleSystem = new PuzzleSystem(this.profile);
        this.skillSystem = new SkillSystem(this.profile);
        this.difficultyEngine = new DifficultyEngine(this.profile);
        this.contentScheduler = new ContentScheduler(this.profile);

        this.init();
    }

    init() {
        console.log('🎮 Adaptive RPG System initialized');

        // Track total time spent
        this.startSession();

        // Check for new content unlocks
        this.contentScheduler.checkUnlocks();

        // Activate hidden elements based on progress
        this.activateHiddenElements();

        // Monitor for discovery opportunities
        this.setupDiscoveryMonitoring();

        // Periodic autosave
        setInterval(() => this.saveProfile(), 60000); // Every minute
    }

    startSession() {
        this.sessionStart = Date.now();
        this.profile.stats.totalSessions = (this.profile.stats.totalSessions || 0) + 1;
        this.profile.stats.lastVisit = Date.now();

        // Calculate time since last visit
        if (this.profile.stats.lastVisit) {
            const daysSinceLastVisit = (Date.now() - this.profile.stats.lastVisit) / (1000 * 60 * 60 * 24);
            this.profile.stats.daysSinceLastVisit = daysSinceLastVisit;
        }

        this.saveProfile();
    }

    activateHiddenElements() {
        // Progressively reveal hidden UI elements based on skills/progress
        const level = this.skillSystem.getOverallLevel();

        // Level 1-5: Basic portfolio
        // Level 6-10: RPG elements start appearing
        if (level >= 6) {
            this.revealElement('.skill-indicator');
        }

        // Level 11-15: More game mechanics
        if (level >= 11) {
            this.revealElement('.quest-log-hint');
        }

        // Level 16-20: Advanced features
        if (level >= 16) {
            this.revealElement('.secret-shop-entrance');
        }

        // Level 21+: Master content
        if (level >= 21) {
            this.revealElement('.master-challenge-door');
        }
    }

    revealElement(selector) {
        const element = document.querySelector(selector);
        if (element && element.style.display === 'none') {
            element.style.opacity = '0';
            element.style.display = 'block';
            element.style.transition = 'opacity 3s ease';
            setTimeout(() => element.style.opacity = '1', 100);
        }
    }

    setupDiscoveryMonitoring() {
        // Hidden patterns that unlock content
        this.monitorSequences();
        this.monitorHoverPatterns();
        this.monitorReadingBehavior();
        this.monitorClickPatterns();
    }

    monitorSequences() {
        // Example: Hover over specific elements in order
        let sequence = [];
        const unlockSequence = ['logo', 'about-link', 'skills-icon'];

        document.addEventListener('mouseover', (e) => {
            if (e.target.dataset.sequenceId) {
                sequence.push(e.target.dataset.sequenceId);
                if (sequence.length > unlockSequence.length) {
                    sequence.shift();
                }

                if (JSON.stringify(sequence) === JSON.stringify(unlockSequence)) {
                    this.handleDiscovery('sequence_unlock', {
                        sequence: unlockSequence,
                        reward: 'hidden_content_1'
                    });
                    sequence = [];
                }
            }
        });
    }

    monitorHoverPatterns() {
        // Reward patience and curiosity
        const hoverTimes = new Map();

        document.querySelectorAll('[data-hover-secret]').forEach(element => {
            let hoverStart = null;

            element.addEventListener('mouseenter', () => {
                hoverStart = Date.now();
            });

            element.addEventListener('mouseleave', () => {
                if (hoverStart) {
                    const hoverDuration = Date.now() - hoverStart;
                    const secretId = element.dataset.hoverSecret;

                    // 3 seconds of hovering reveals secret
                    if (hoverDuration >= 3000) {
                        this.handleDiscovery('patient_hover', {
                            secretId,
                            duration: hoverDuration,
                            skillGain: { curiosity: 2, patience: 1 }
                        });
                    }
                }
                hoverStart = null;
            });
        });
    }

    monitorReadingBehavior() {
        // Detect if user actually reads content (not just scrolls)
        let readingSections = new Set();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.dataset.readableSection;
                    const startTime = Date.now();

                    entry.target.dataset.readingStart = startTime;

                    setTimeout(() => {
                        if (entry.target.dataset.readingStart === startTime.toString()) {
                            // Still reading after 10 seconds
                            readingSections.add(sectionId);

                            if (readingSections.size >= 3) {
                                this.handleDiscovery('thorough_reader', {
                                    sectionsRead: Array.from(readingSections),
                                    skillGain: { wisdom: 3, attention: 2 }
                                });
                            }
                        }
                    }, 10000);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-readable-section]').forEach(section => {
            observer.observe(section);
        });
    }

    monitorClickPatterns() {
        // Detect creative click patterns (Konami code style)
        const patterns = {
            'logo-3x-fast': {
                sequence: ['logo', 'logo', 'logo'],
                maxTime: 2000,
                reward: 'speed_bonus'
            },
            'nav-circle': {
                sequence: ['home', 'about', 'projects', 'contact', 'home'],
                maxTime: 5000,
                reward: 'navigation_master'
            }
        };

        let recentClicks = [];
        let clickTimes = [];

        document.addEventListener('click', (e) => {
            const clickId = e.target.dataset.clickId;
            if (!clickId) return;

            recentClicks.push(clickId);
            clickTimes.push(Date.now());

            // Keep only last 10 clicks
            if (recentClicks.length > 10) {
                recentClicks.shift();
                clickTimes.shift();
            }

            // Check patterns
            Object.entries(patterns).forEach(([patternId, pattern]) => {
                if (this.matchesPattern(recentClicks, clickTimes, pattern)) {
                    this.handleDiscovery('click_pattern', {
                        patternId,
                        reward: pattern.reward
                    });
                    recentClicks = [];
                    clickTimes = [];
                }
            });
        });
    }

    matchesPattern(clicks, times, pattern) {
        if (clicks.length < pattern.sequence.length) return false;

        const recentClicks = clicks.slice(-pattern.sequence.length);
        const recentTimes = times.slice(-pattern.sequence.length);

        // Check sequence matches
        if (JSON.stringify(recentClicks) !== JSON.stringify(pattern.sequence)) {
            return false;
        }

        // Check timing
        const timeDiff = recentTimes[recentTimes.length - 1] - recentTimes[0];
        return timeDiff <= pattern.maxTime;
    }

    handleDiscovery(type, data) {
        // Award skills based on discovery type
        if (data.skillGain) {
            this.skillSystem.awardSkills(data.skillGain);
        }

        // Record discovery
        this.profile.discoveries = this.profile.discoveries || [];
        this.profile.discoveries.push({
            type,
            data,
            timestamp: Date.now(),
            sessionNumber: this.profile.stats.totalSessions
        });

        // Check if discovery unlocks new content
        this.contentScheduler.checkDiscoveryUnlocks(type);

        // Show subtle notification
        this.showDiscoveryNotification(type, data);

        this.saveProfile();
    }

    showDiscoveryNotification(type, data) {
        // Subtle notification that doesn't break immersion
        const notification = document.createElement('div');
        notification.className = 'discovery-notification';
        notification.innerHTML = `
            <div class="discovery-glow"></div>
            <div class="discovery-text">
                Discovery: ${this.getDiscoveryTitle(type)}
                ${data.skillGain ? `<div class="skill-gain">+${Object.entries(data.skillGain).map(([k,v]) => `${k}(${v})`).join(' ')}</div>` : ''}
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 1000);
        }, 4000);
    }

    getDiscoveryTitle(type) {
        const titles = {
            'sequence_unlock': 'Hidden Sequence',
            'patient_hover': 'Patient Observer',
            'thorough_reader': 'Story Sage',
            'click_pattern': 'Pattern Master',
            'time_milestone': 'Dedicated Explorer',
            'visit_milestone': 'Loyal Visitor'
        };
        return titles[type] || 'Secret Found';
    }

    getUserId() {
        let id = localStorage.getItem('rpg_user_id');
        if (!id) {
            id = `rpg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('rpg_user_id', id);
        }
        return id;
    }

    loadProfile() {
        const saved = localStorage.getItem('rpg_profile');
        if (saved) {
            return JSON.parse(saved);
        }

        return {
            userId: this.userId,
            created: Date.now(),
            stats: {
                totalTimeSpent: 0,
                totalSessions: 0,
                lastVisit: null,
                daysSinceLastVisit: 0
            },
            skills: {
                // Primary Stats (QFG-inspired)
                strength: 0,
                intelligence: 0,
                agility: 0,
                vitality: 0,
                luck: 0,

                // Knowledge Skills
                wisdom: 0,
                curiosity: 0,
                attention: 0,

                // Behavioral Skills
                patience: 0,
                speed: 0,
                precision: 0,
                creativity: 0,

                // Technical Skills
                codeReading: 0,
                problemSolving: 0,
                patternRecognition: 0
            },
            puzzles: {
                attempted: [],
                completed: [],
                failed: [],
                currentDifficulty: 1.0 // Multiplier
            },
            discoveries: [],
            unlocked: [],
            activeQuests: [],
            completedQuests: []
        };
    }

    saveProfile() {
        // Update session time
        if (this.sessionStart) {
            const sessionTime = Date.now() - this.sessionStart;
            this.profile.stats.totalTimeSpent = (this.profile.stats.totalTimeSpent || 0) + sessionTime;
            this.sessionStart = Date.now(); // Reset for next interval
        }

        localStorage.setItem('rpg_profile', JSON.stringify(this.profile));

        // Also sync to backend
        this.syncToBackend();
    }

    async syncToBackend() {
        try {
            await fetch('https://api.terrellflautt.com/user-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: this.userId,
                    profile: this.profile,
                    timestamp: Date.now()
                })
            });
        } catch (error) {
            console.warn('Profile sync failed:', error);
        }
    }
}

/**
 * DIFFICULTY ENGINE
 * Adapts challenge difficulty based on player performance
 */
class DifficultyEngine {
    constructor(profile) {
        this.profile = profile;
    }

    adjustDifficulty(success, puzzleType) {
        if (success) {
            // Player succeeded - increase difficulty slightly
            this.profile.puzzles.currentDifficulty = Math.min(
                15,
                this.profile.puzzles.currentDifficulty + 0.3
            );
        } else {
            // Player failed - decrease difficulty
            this.profile.puzzles.currentDifficulty = Math.max(
                1,
                this.profile.puzzles.currentDifficulty - 0.5
            );
        }

        return this.profile.puzzles.currentDifficulty;
    }

    getDifficultyMultiplier() {
        // Returns multiplier for various game aspects
        return {
            puzzleComplexity: this.profile.puzzles.currentDifficulty / 5,
            enemyStrength: this.profile.puzzles.currentDifficulty / 3,
            hintCooldown: 1 + (this.profile.puzzles.currentDifficulty / 10)
        };
    }

    shouldOfferHint(puzzleAttempts) {
        // Adaptive hint system
        const baseHintThreshold = 3;
        const difficultyAdjustment = Math.floor(this.profile.puzzles.currentDifficulty / 5);

        return puzzleAttempts >= (baseHintThreshold - difficultyAdjustment);
    }

    getRecommendedContent() {
        const level = this.profile.level || 0;
        const difficulty = this.profile.puzzles.currentDifficulty;

        // Recommend content based on performance
        if (difficulty < 3) {
            return 'tutorial_content';
        } else if (difficulty < 7) {
            return 'intermediate_content';
        } else if (difficulty < 12) {
            return 'advanced_content';
        } else {
            return 'master_content';
        }
    }
}

// Initialize on page load
if (typeof window !== 'undefined') {
    window.adaptiveRPG = new AdaptiveRPGSystem();
}
