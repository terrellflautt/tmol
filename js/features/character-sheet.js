/**
 * Character Sheet - Quest for Glory Style
 * Displays player stats, achievements, and progression
 */

class CharacterSheet {
    constructor() {
        this.userId = this.getUserId();
        this.profile = null;
        this.skillSystem = null;
        this.init();
    }

    getUserId() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userId', userId);
        }
        return userId;
    }

    async init() {
        try {
            // Load profile from localStorage first (fast)
            const localProfile = localStorage.getItem('rpgProfile');
            if (localProfile) {
                this.profile = JSON.parse(localProfile);
                this.renderCharacterSheet();
            }

            // Then sync with server (authoritative)
            await this.loadProfileFromServer();

            // Initialize skill system if available
            if (typeof SkillSystem !== 'undefined') {
                this.skillSystem = new SkillSystem(this.profile);
            }

            // Render the complete character sheet
            this.renderCharacterSheet();
            this.animateStatBars();
            this.setupEventListeners();

        } catch (error) {
            console.error('Character sheet initialization error:', error);
            this.showDefaultCharacter();
        }
    }

    async loadProfileFromServer() {
        try {
            const response = await fetch(`https://api.terrellflautt.com/user-profile/${this.userId}`);
            if (response.ok) {
                const serverProfile = await response.json();

                // Merge server profile with local (server is authoritative)
                this.profile = {
                    ...this.profile,
                    ...serverProfile,
                    skills: { ...this.profile?.skills, ...serverProfile.skills },
                    stats: { ...this.profile?.stats, ...serverProfile.stats }
                };

                // Update localStorage
                localStorage.setItem('rpgProfile', JSON.stringify(this.profile));
            }
        } catch (error) {
            console.warn('Could not load profile from server, using local data:', error);
        }
    }

    showDefaultCharacter() {
        // Show default "new player" character
        this.profile = {
            playerName: 'Unknown Seeker',
            title: 'Novice Explorer',
            class: 'Wanderer',
            level: 1,
            skills: {},
            stats: {
                totalVisits: 1,
                timeSpent: 0,
                discoveries: 0,
                puzzlesSolved: 0
            },
            phase: 1,
            achievements: []
        };
        this.renderCharacterSheet();
    }

    renderCharacterSheet() {
        if (!this.profile) return;

        // Update character info
        this.updateCharacterInfo();

        // Update all skill bars
        this.updateSkillBars();

        // Update journey statistics
        this.updateJourneyStats();

        // Update achievements
        this.updateAchievements();
    }

    updateCharacterInfo() {
        const nameEl = document.getElementById('characterName');
        const titleEl = document.getElementById('characterTitle');
        const classEl = document.getElementById('characterClass');
        const levelEl = document.getElementById('playerLevel');

        if (nameEl) {
            nameEl.textContent = this.profile.playerName || 'Unknown Seeker';
        }

        if (titleEl) {
            titleEl.textContent = this.getPlayerTitle();
        }

        if (classEl) {
            classEl.textContent = this.getPlayerClass();
        }

        if (levelEl) {
            const level = this.calculateLevel();
            levelEl.textContent = level;
        }

        // Update portrait (if we have user data that suggests an image)
        this.updatePortrait();
    }

    getPlayerTitle() {
        if (this.profile.title) return this.profile.title;

        const level = this.calculateLevel();
        const puzzles = this.profile.stats?.puzzlesSolved || 0;

        if (level >= 50) return 'Master of Mysteries';
        if (level >= 40) return 'Legendary Hero';
        if (level >= 30) return 'Epic Adventurer';
        if (level >= 20) return 'Renowned Explorer';
        if (level >= 15) return 'Seasoned Seeker';
        if (level >= 10) return 'Skilled Traveler';
        if (level >= 5) return 'Curious Wanderer';
        if (puzzles >= 1) return 'Awakened Seeker';
        return 'Novice Explorer';
    }

    getPlayerClass() {
        if (this.profile.class) return this.profile.class;

        const skills = this.profile.skills || {};
        const intelligence = skills.intelligence || 0;
        const strength = skills.strength || 0;
        const agility = skills.agility || 0;

        // Determine class based on highest stats
        if (intelligence > strength && intelligence > agility) {
            return intelligence >= 50 ? 'Wizard' : 'Mage';
        } else if (strength > intelligence && strength > agility) {
            return strength >= 50 ? 'Paladin' : 'Fighter';
        } else if (agility > intelligence && agility > strength) {
            return agility >= 50 ? 'Master Thief' : 'Thief';
        }

        // Balanced stats = hero
        const total = intelligence + strength + agility;
        if (total >= 150) return 'Hero';

        return 'Wanderer';
    }

    calculateLevel() {
        if (this.profile.level) return this.profile.level;

        const skills = this.profile.skills || {};
        const totalSkillPoints = Object.values(skills).reduce((sum, val) => sum + (val || 0), 0);

        // QFG style: total skill points / 50 = level
        return Math.floor(totalSkillPoints / 50) + 1;
    }

    updateSkillBars() {
        const skills = this.profile.skills || {};
        const skillNames = [
            'strength', 'intelligence', 'agility', 'vitality', 'luck',
            'wisdom', 'curiosity', 'attention',
            'patience', 'speed', 'precision', 'creativity',
            'codeReading', 'problemSolving', 'patternRecognition'
        ];

        skillNames.forEach(skillName => {
            const skillValue = skills[skillName] || 0;
            const statBar = document.querySelector(`[data-stat="${skillName}"]`);

            if (statBar) {
                const fill = statBar.querySelector(`.${skillName}-fill`);
                const number = statBar.querySelector('.stat-number');

                if (fill) {
                    fill.setAttribute('data-value', skillValue);
                }

                if (number) {
                    number.textContent = `${skillValue}/100`;
                }
            }
        });
    }

    animateStatBars() {
        // Animate all stat bars to their current values
        const allFills = document.querySelectorAll('.stat-fill');

        allFills.forEach((fill, index) => {
            const targetValue = parseInt(fill.getAttribute('data-value')) || 0;
            const percentage = Math.min(100, targetValue);

            // Stagger the animations slightly for visual effect
            setTimeout(() => {
                fill.style.width = `${percentage}%`;

                // Add glow effect for high stats
                if (targetValue >= 75) {
                    fill.style.boxShadow = `0 0 20px currentColor`;
                } else if (targetValue >= 50) {
                    fill.style.boxShadow = `0 0 15px currentColor`;
                }
            }, index * 50);
        });
    }

    updateJourneyStats() {
        const stats = this.profile.stats || {};

        // Time spent
        const timeEl = document.getElementById('timeSpent');
        if (timeEl) {
            const hours = Math.floor((stats.timeSpent || 0) / 3600000);
            const minutes = Math.floor(((stats.timeSpent || 0) % 3600000) / 60000);

            if (hours > 0) {
                timeEl.textContent = `${hours}h ${minutes}m`;
            } else {
                timeEl.textContent = `${minutes} minutes`;
            }
        }

        // Total visits
        const visitsEl = document.getElementById('totalVisits');
        if (visitsEl) {
            visitsEl.textContent = stats.totalVisits || 0;
        }

        // Discoveries
        const discoveriesEl = document.getElementById('totalDiscoveries');
        if (discoveriesEl) {
            const discoveries = this.profile.discoveries?.length || 0;
            discoveriesEl.textContent = discoveries;
        }

        // Puzzles solved
        const puzzlesEl = document.getElementById('puzzlesSolved');
        if (puzzlesEl) {
            puzzlesEl.textContent = stats.puzzlesSolved || 0;
        }

        // Current phase
        const phaseEl = document.getElementById('currentPhase');
        if (phaseEl) {
            phaseEl.textContent = this.getPhaseDescription();
        }
    }

    getPhaseDescription() {
        const phase = this.profile.phase || 1;
        const phases = {
            1: 'Phase 1: Awakening',
            2: 'Phase 2: Discovery',
            3: 'Phase 3: Training',
            4: 'Phase 4: Gathering',
            5: 'Phase 5: Trials by Fire',
            6: 'Phase 6: Dark Revelations',
            7: 'Phase 7: Cosmic Horror',
            8: 'Phase 8: Infinite Realms'
        };
        return phases[phase] || phases[1];
    }

    updateAchievements() {
        const achievements = this.profile.achievements || [];
        const achievementsList = document.getElementById('achievementsList');

        if (!achievementsList) return;

        // Define possible achievements
        const allAchievements = [
            { id: 'first_secret', icon: '🔓', text: 'First Secret Discovered', check: () => (this.profile.discoveries?.length || 0) >= 1 },
            { id: 'riddle_master', icon: '🧩', text: 'Solved the Door Riddle', check: () => this.profile.riddleSolved === true },
            { id: 'aziza_met', icon: '🦁', text: 'Met the Sphinx', check: () => this.profile.azizaMet === true },
            { id: 'skilled_novice', icon: '⭐', text: 'Reached Level 5', check: () => this.calculateLevel() >= 5 },
            { id: 'skilled_adept', icon: '✨', text: 'Reached Level 10', check: () => this.calculateLevel() >= 10 },
            { id: 'puzzle_solver', icon: '🎯', text: 'Solved 5 Puzzles', check: () => (this.profile.stats?.puzzlesSolved || 0) >= 5 },
            { id: 'puzzle_master', icon: '🏆', text: 'Solved 25 Puzzles', check: () => (this.profile.stats?.puzzlesSolved || 0) >= 25 },
            { id: 'dedicated_explorer', icon: '🗺️', text: '10+ Hours Explored', check: () => (this.profile.stats?.timeSpent || 0) >= 36000000 },
            { id: 'master_skill', icon: '💯', text: 'Mastered a Skill (100)', check: () => {
                const skills = this.profile.skills || {};
                return Object.values(skills).some(val => val >= 100);
            }},
            { id: 'balanced_hero', icon: '⚖️', text: 'All Stats Above 25', check: () => {
                const skills = this.profile.skills || {};
                const primary = ['strength', 'intelligence', 'agility', 'vitality', 'luck'];
                return primary.every(skill => (skills[skill] || 0) >= 25);
            }},
            { id: 'secret_hunter', icon: '🕵️', text: 'Found 10 Secrets', check: () => (this.profile.discoveries?.length || 0) >= 10 },
            { id: 'returner', icon: '🔄', text: 'Visited 5+ Times', check: () => (this.profile.stats?.totalVisits || 0) >= 5 }
        ];

        // Render achievements
        achievementsList.innerHTML = '';
        allAchievements.forEach(achievement => {
            const unlocked = achievement.check();
            const div = document.createElement('div');
            div.className = `achievement ${unlocked ? 'unlocked' : 'locked'}`;
            div.innerHTML = `
                <span class="achievement-icon">${unlocked ? achievement.icon : '🔒'}</span>
                <span>${achievement.text}</span>
            `;
            achievementsList.appendChild(div);
        });
    }

    updatePortrait() {
        const portraitEl = document.getElementById('characterPortrait');
        if (!portraitEl) return;

        // Check if user has progressed enough to reveal portrait
        const level = this.calculateLevel();

        if (level >= 10) {
            // Could potentially load user's actual portrait if we collected one
            // For now, just show a mystical symbol based on class
            const placeholder = portraitEl.querySelector('.portrait-placeholder');
            if (placeholder) {
                const playerClass = this.getPlayerClass();
                const classSymbols = {
                    'Wizard': '🧙',
                    'Mage': '✨',
                    'Paladin': '⚔️',
                    'Fighter': '🛡️',
                    'Master Thief': '🗝️',
                    'Thief': '🎭',
                    'Hero': '🏅',
                    'Wanderer': '🧭'
                };
                placeholder.textContent = classSymbols[playerClass] || '?';
            }
        }
    }

    setupEventListeners() {
        // Find opponent button
        const findOpponentBtn = document.getElementById('findOpponentBtn');
        if (findOpponentBtn) {
            findOpponentBtn.addEventListener('click', () => this.initiatePvP());
        }

        // Stat bar hover effects
        const statBars = document.querySelectorAll('.stat-bar');
        statBars.forEach(bar => {
            bar.addEventListener('mouseenter', (e) => {
                const statName = bar.getAttribute('data-stat');
                this.showStatTooltip(statName, bar);
            });

            bar.addEventListener('mouseleave', () => {
                this.hideStatTooltip();
            });
        });
    }

    showStatTooltip(statName, element) {
        // Show helpful info about what each stat does
        const statDescriptions = {
            strength: 'Physical power and combat prowess',
            intelligence: 'Knowledge, logic, and magical aptitude',
            agility: 'Speed, reflexes, and evasion',
            vitality: 'Health, endurance, and stamina',
            luck: 'Fortune favors the bold',
            wisdom: 'Experience and insight',
            curiosity: 'Desire to discover and explore',
            attention: 'Observational skills',
            patience: 'Ability to persist through challenges',
            speed: 'Quick thinking and rapid actions',
            precision: 'Accuracy and attention to detail',
            creativity: 'Innovative problem-solving',
            codeReading: 'Understanding technical information',
            problemSolving: 'Analytical thinking',
            patternRecognition: 'Seeing connections and patterns'
        };

        const skills = this.profile.skills || {};
        const value = skills[statName] || 0;
        const description = statDescriptions[statName] || '';

        // Simple tooltip - could be enhanced
        element.title = `${description}\n\nCurrent: ${value}/100`;
    }

    hideStatTooltip() {
        // Clear any tooltips
    }

    initiatePvP() {
        // This will be handled by pvp-system.js
        console.log('Initiating PvP...');

        if (typeof PvPSystem !== 'undefined') {
            const pvpSystem = new PvPSystem(this.profile);
            pvpSystem.findOpponent();
        } else {
            console.warn('PvP system not loaded');
            alert('PvP system is coming soon!');
        }
    }

    // Public method to refresh the character sheet
    refresh() {
        this.init();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.characterSheet = new CharacterSheet();
    });
} else {
    window.characterSheet = new CharacterSheet();
}
