/**
 * PUZZLE SYSTEM
 * Adaptive difficulty - if player fails, easier puzzle replaces it
 * If player succeeds easily, harder puzzles appear
 * Hidden puzzles scattered throughout the site
 */

class PuzzleSystem {
    constructor(profile) {
        this.profile = profile;
        this.puzzleDatabase = this.initializePuzzleDatabase();
        this.activePuzzles = new Map();
    }

    initializePuzzleDatabase() {
        return {
            // ============================================
            // TIER 1: BEGINNER PUZZLES (Difficulty 1-3)
            // ============================================
            'hover_patience_1': {
                id: 'hover_patience_1',
                tier: 1,
                difficulty: 1,
                type: 'hover',
                title: 'The Patient Observer',
                description: 'Some things reveal themselves only to those who wait...',
                target: '.logo-text',
                requirement: { hoverTime: 3000 },
                hint: 'Try hovering over the logo for a few seconds',
                skills: { patience: 2, curiosity: 1 },
                xp: 10
            },

            'click_rhythm_1': {
                id: 'click_rhythm_1',
                tier: 1,
                difficulty: 2,
                type: 'click_pattern',
                title: 'The Rhythm of Discovery',
                description: 'Three clicks, swift and true',
                target: '.nav-logo',
                requirement: { clicks: 3, maxTime: 2000 },
                hint: 'Click the logo three times quickly',
                skills: { speed: 2, agility: 1 },
                xp: 15
            },

            'scroll_explorer_1': {
                id: 'scroll_explorer_1',
                tier: 1,
                difficulty: 2,
                type: 'scroll',
                title: 'The Explorer',
                description: 'Journey through all lands',
                requirement: { visitAllSections: true },
                hint: 'Explore every section of the site',
                skills: { curiosity: 3 },
                xp: 20
            },

            // ============================================
            // TIER 2: INTERMEDIATE PUZZLES (Difficulty 4-6)
            // ============================================
            'sequence_mystery_1': {
                id: 'sequence_mystery_1',
                tier: 2,
                difficulty: 4,
                type: 'sequence',
                title: 'The Hidden Path',
                description: 'Follow the trail: Home, About, Projects, Skills, Contact',
                requirement: {
                    sequence: ['#home', '#about', '#projects', '#skills', '#contact'],
                    maxTime: 10000
                },
                hint: 'Navigate through sections in a specific order',
                skills: { intelligence: 2, patternRecognition: 3 },
                xp: 40
            },

            'code_inspector_1': {
                id: 'code_inspector_1',
                tier: 2,
                difficulty: 5,
                type: 'inspect',
                title: 'The Code Whisperer',
                description: 'Hidden messages lie within the source',
                requirement: { findHiddenComment: '<!-- QUEST_KEY: SHADOWS -->' },
                hint: 'Inspect the page source for hidden comments',
                skills: { codeReading: 4, intelligence: 2 },
                xp: 50
            },

            'timing_precision_1': {
                id: 'timing_precision_1',
                tier: 2,
                difficulty: 6,
                type: 'timing',
                title: 'Perfect Timing',
                description: 'Click when the moon aligns',
                target: '.moon-icon',
                requirement: { clickAtTime: 'animation_peak' },
                hint: 'Watch the animation carefully and click at the right moment',
                skills: { precision: 3, agility: 2, patience: 1 },
                xp: 60
            },

            // ============================================
            // TIER 3: ADVANCED PUZZLES (Difficulty 7-9)
            // ============================================
            'cipher_text_1': {
                id: 'cipher_text_1',
                tier: 3,
                difficulty: 7,
                type: 'cipher',
                title: 'The Ancient Cipher',
                description: 'Decode: UFSSF MM GMBVUU',
                answer: 'TERRELL K FLAUTT',
                cipher: 'caesar',
                shift: 1,
                hint: 'Caesar cipher with shift of 1',
                skills: { problemSolving: 4, intelligence: 3, patience: 2 },
                xp: 80
            },

            'memory_palace_1': {
                id: 'memory_palace_1',
                tier: 3,
                difficulty: 8,
                type: 'memory',
                title: 'The Memory Palace',
                description: 'Remember the pattern shown for 3 seconds, then recreate it',
                requirement: {
                    pattern: [1, 4, 2, 8, 5, 3, 7, 6],
                    showTime: 3000,
                    maxAttempts: 3
                },
                hint: 'Focus on the sequence and commit it to memory',
                skills: { attention: 4, wisdom: 3, intelligence: 2 },
                xp: 100
            },

            'multi_step_quest_1': {
                id: 'multi_step_quest_1',
                tier: 3,
                difficulty: 9,
                type: 'quest',
                title: 'The Scholar\'s Trial',
                description: 'Complete all three challenges without hints',
                requirement: {
                    steps: [
                        { type: 'hover', target: '.about-section', time: 5000 },
                        { type: 'click', target: '.hidden-rune-1' },
                        { type: 'input', answer: 'KNOWLEDGE' }
                    ],
                    noHints: true
                },
                hint: 'This challenge must be completed without assistance',
                skills: { wisdom: 5, intelligence: 4, patience: 3 },
                xp: 150
            },

            // ============================================
            // TIER 4: EXPERT PUZZLES (Difficulty 10-12)
            // ============================================
            'steganography_1': {
                id: 'steganography_1',
                tier: 4,
                difficulty: 10,
                type: 'steganography',
                title: 'Hidden in Plain Sight',
                description: 'The image contains a secret message',
                requirement: { decodeImage: 'hero-background.png' },
                hint: 'Use steganography tools to decode the image',
                skills: { problemSolving: 5, codeReading: 4, creativity: 4 },
                xp: 200
            },

            'logic_riddle_hard': {
                id: 'logic_riddle_hard',
                tier: 4,
                difficulty: 11,
                type: 'riddle',
                title: 'The Sphinx\'s Challenge',
                description: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?',
                answer: 'echo',
                alternateAnswers: ['an echo', 'the echo'],
                hint: 'Think about sound and nature',
                skills: { wisdom: 5, intelligence: 5, creativity: 3 },
                xp: 250
            },

            'code_execution_1': {
                id: 'code_execution_1',
                tier: 4,
                difficulty: 12,
                type: 'code',
                title: 'The Developer\'s Gate',
                description: 'Open the console and execute: window.unlockSecretPath()',
                requirement: { executeCode: 'window.unlockSecretPath()' },
                hint: 'Use the browser console to run JavaScript',
                skills: { codeReading: 6, problemSolving: 4, creativity: 3 },
                xp: 300
            },

            // ============================================
            // TIER 5: MASTER PUZZLES (Difficulty 13-15)
            // ============================================
            'time_locked_puzzle': {
                id: 'time_locked_puzzle',
                tier: 5,
                difficulty: 13,
                type: 'time_locked',
                title: 'The Patience of Ages',
                description: 'This puzzle can only be solved after visiting the site for 7 consecutive days',
                requirement: { consecutiveDays: 7 },
                hint: 'Return each day to unlock this challenge',
                skills: { patience: 10, wisdom: 5, vitality: 4 },
                xp: 500
            },

            'ultimate_sequence': {
                id: 'ultimate_sequence',
                tier: 5,
                difficulty: 15,
                type: 'ultimate',
                title: 'The Master\'s Trial',
                description: 'Complete the ultimate test of all your skills',
                requirement: {
                    steps: [
                        { type: 'cipher', answer: 'ENLIGHTENMENT' },
                        { type: 'sequence', path: ['hidden', 'secret', 'truth'] },
                        { type: 'timing', precision: 50 }, // 50ms window
                        { type: 'memory', pattern: 16 }, // 16 items
                        { type: 'riddle', answer: 'reflection' }
                    ],
                    timeLimit: 300000, // 5 minutes
                    noHints: true
                },
                hint: 'No hints are available for this challenge. You must rely on everything you\'ve learned.',
                skills: {
                    intelligence: 10,
                    wisdom: 10,
                    agility: 10,
                    patience: 10,
                    creativity: 10,
                    problemSolving: 10
                },
                xp: 1000
            }
        };
    }

    getPuzzleForDifficulty(difficulty) {
        // Get puzzles matching current difficulty level
        const availablePuzzles = Object.values(this.puzzleDatabase).filter(puzzle => {
            // Check if puzzle hasn't been completed
            const completed = this.profile.puzzles.completed.includes(puzzle.id);
            if (completed) return false;

            // Check if puzzle difficulty matches player level (±2)
            const diffRange = 2;
            return Math.abs(puzzle.difficulty - difficulty) <= diffRange;
        });

        // Sort by difficulty and return closest match
        availablePuzzles.sort((a, b) => {
            return Math.abs(a.difficulty - difficulty) - Math.abs(b.difficulty - difficulty);
        });

        return availablePuzzles[0] || null;
    }

    activatePuzzle(puzzleId) {
        const puzzle = this.puzzleDatabase[puzzleId];
        if (!puzzle) return null;

        // Create puzzle instance
        const instance = {
            ...puzzle,
            startTime: Date.now(),
            attempts: 0,
            hintsUsed: 0,
            state: 'active'
        };

        this.activePuzzles.set(puzzleId, instance);
        return instance;
    }

    async attemptPuzzle(puzzleId, solution) {
        const instance = this.activePuzzles.get(puzzleId);
        if (!instance) return { success: false, error: 'Puzzle not active' };

        instance.attempts++;

        const isCorrect = this.validateSolution(instance, solution);

        if (isCorrect) {
            return await this.handlePuzzleSuccess(instance);
        } else {
            return await this.handlePuzzleFailure(instance);
        }
    }

    validateSolution(puzzle, solution) {
        switch (puzzle.type) {
            case 'hover':
                return solution.hoverTime >= puzzle.requirement.hoverTime;

            case 'click_pattern':
                return solution.clicks === puzzle.requirement.clicks &&
                       solution.timeSpent <= puzzle.requirement.maxTime;

            case 'sequence':
                return JSON.stringify(solution.sequence) === JSON.stringify(puzzle.requirement.sequence);

            case 'cipher':
                const normalized = solution.toLowerCase().trim();
                return normalized === puzzle.answer.toLowerCase();

            case 'riddle':
                const answer = solution.toLowerCase().trim();
                return answer === puzzle.answer ||
                       (puzzle.alternateAnswers && puzzle.alternateAnswers.includes(answer));

            case 'code':
                return solution.executed === puzzle.requirement.executeCode;

            default:
                return false;
        }
    }

    async handlePuzzleSuccess(puzzle) {
        const timeTaken = Date.now() - puzzle.startTime;

        // Award skills
        Object.entries(puzzle.skills).forEach(([skill, amount]) => {
            this.profile.skills[skill] = (this.profile.skills[skill] || 0) + amount;
        });

        // Award XP
        const xpBonus = puzzle.hintsUsed === 0 ? 1.5 : 1.0; // 50% bonus for no hints
        const totalXP = Math.floor(puzzle.xp * xpBonus);

        // Record completion
        this.profile.puzzles.completed.push({
            id: puzzle.id,
            completedAt: Date.now(),
            attempts: puzzle.attempts,
            hintsUsed: puzzle.hintsUsed,
            timeTaken,
            xpEarned: totalXP
        });

        // Adjust difficulty upward (player is doing well)
        this.profile.puzzles.currentDifficulty = Math.min(
            15,
            this.profile.puzzles.currentDifficulty + 0.5
        );

        // Remove from active
        this.activePuzzles.delete(puzzle.id);

        // Check for unlocks
        this.checkPuzzleUnlocks();

        return {
            success: true,
            puzzle: puzzle.title,
            skillsGained: puzzle.skills,
            xpGained: totalXP,
            bonus: xpBonus > 1 ? 'No Hints Bonus!' : null,
            newDifficulty: this.profile.puzzles.currentDifficulty
        };
    }

    async handlePuzzleFailure(puzzle) {
        // Track failure
        if (puzzle.attempts >= 3) {
            // Failed too many times - replace with easier puzzle
            this.profile.puzzles.failed.push({
                id: puzzle.id,
                failedAt: Date.now(),
                attempts: puzzle.attempts
            });

            // Reduce difficulty
            this.profile.puzzles.currentDifficulty = Math.max(
                1,
                this.profile.puzzles.currentDifficulty - 1
            );

            // Remove from active
            this.activePuzzles.delete(puzzle.id);

            // Get easier replacement
            const easierPuzzle = this.getPuzzleForDifficulty(
                this.profile.puzzles.currentDifficulty
            );

            return {
                success: false,
                failed: true,
                message: 'Puzzle replaced with an easier challenge',
                replacement: easierPuzzle,
                newDifficulty: this.profile.puzzles.currentDifficulty
            };
        }

        return {
            success: false,
            failed: false,
            attemptsRemaining: 3 - puzzle.attempts,
            hint: puzzle.attempts >= 2 ? puzzle.hint : null
        };
    }

    checkPuzzleUnlocks() {
        // Unlock new content based on completed puzzles
        const completedCount = this.profile.puzzles.completed.length;

        const unlocks = {
            5: 'secret_shop',
            10: 'advanced_quests',
            20: 'master_challenges',
            30: 'hidden_realm',
            50: 'ultimate_trial'
        };

        Object.entries(unlocks).forEach(([count, unlock]) => {
            if (completedCount >= parseInt(count) && !this.profile.unlocked.includes(unlock)) {
                this.profile.unlocked.push(unlock);
                this.notifyUnlock(unlock);
            }
        });
    }

    notifyUnlock(content) {
        // Visual notification of new content
        console.log(`🔓 New content unlocked: ${content}`);
        // Show UI notification
    }

    getHint(puzzleId) {
        const instance = this.activePuzzles.get(puzzleId);
        if (!instance) return null;

        instance.hintsUsed++;
        return instance.hint;
    }
}
