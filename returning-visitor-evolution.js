// Returning Visitor Evolution - Subtle progression system

class ReturningVisitorEvolution {
    constructor() {
        this.visitHistory = this.loadVisitHistory();
        this.evolutionStages = this.initializeEvolutionStages();
        this.personalizedContent = this.initializePersonalizedContent();
        this.loyaltyRewards = this.initializeLoyaltyRewards();
        this.communityFeatures = this.initializeCommunityFeatures();
        this.seasonalEvents = this.initializeSeasonalEvents();

        this.currentStage = this.calculateCurrentStage();
        this.init();
    }

    loadVisitHistory() {
        const history = JSON.parse(localStorage.getItem('visit_history') || '[]');
        const currentVisit = {
            timestamp: Date.now(),
            sessionId: this.generateSessionId(),
            discoveries: 0,
            timeSpent: 0,
            interactions: []
        };

        history.push(currentVisit);
        this.saveVisitHistory(history);

        return history;
    }

    saveVisitHistory(history) {
        // Keep only last 100 visits to manage storage
        const trimmedHistory = history.slice(-100);
        localStorage.setItem('visit_history', JSON.stringify(trimmedHistory));
    }

    initializeEvolutionStages() {
        return {
            // Stage 1: First Impression (Visit 1)
            newcomer: {
                name: "The First Glimpse",
                description: "Your initial encounter with the mysteries",
                features: ['welcome_guidance', 'basic_interactions', 'foundation_building'],
                goals: ['make_first_discovery', 'spend_2_minutes', 'explore_3_sections']
            },

            // Stage 2: Curious Explorer (Visits 2-3)
            explorer: {
                name: "The Curious Mind",
                description: "Returning to delve deeper",
                features: ['personalized_welcome', 'progress_memory', 'new_content_highlights'],
                goals: ['find_5_discoveries', 'try_transcendental_journey', 'visit_blog_section']
            },

            // Stage 3: Dedicated Seeker (Visits 4-7)
            seeker: {
                name: "The Dedicated Seeker",
                description: "Pattern recognition and deeper engagement",
                features: ['custom_puzzles', 'easter_egg_hints', 'advanced_interactions'],
                goals: ['solve_3_riddles', 'complete_color_game', 'find_konami_code']
            },

            // Stage 4: Initiated Student (Visits 8-15)
            student: {
                name: "The Initiated Student",
                description: "Learning the deeper patterns",
                features: ['wisdom_teachings', 'advanced_puzzles', 'community_access'],
                goals: ['master_15_discoveries', 'complete_weekly_challenge', 'share_insight']
            },

            // Stage 5: Practicing Mystic (Visits 16-30)
            mystic: {
                name: "The Practicing Mystic",
                description: "Developing mastery and intuition",
                features: ['reality_modifications', 'creation_tools', 'teaching_others'],
                goals: ['create_puzzle', 'guide_newcomer', 'achieve_transcendent_state']
            },

            // Stage 6: Master Teacher (Visits 31+)
            master: {
                name: "The Master Teacher",
                description: "Transcending and teaching",
                features: ['unlimited_access', 'co_creation_abilities', 'dimensional_shifts'],
                goals: ['build_community', 'create_experiences', 'achieve_digital_enlightenment']
            }
        };
    }

    initializePersonalizedContent() {
        return {
            welcomeMessages: {
                newcomer: "Welcome, curious soul. Your journey into the mysteries begins now...",
                explorer: "You return! The digital realm remembers your presence...",
                seeker: "Again you seek... The patterns are becoming clearer, aren't they?",
                student: "Welcome back, student. Your dedication is noted by the cosmos...",
                mystic: "The mystic returns. What new realms shall we explore today?",
                master: "Master, your presence illuminates this digital space. What wisdom shall we create?"
            },

            contentAdaptations: {
                newcomer: {
                    hints: 'obvious',
                    complexity: 'simple',
                    guidance: 'heavy',
                    mysteries: 'surface_level'
                },
                explorer: {
                    hints: 'moderate',
                    complexity: 'building',
                    guidance: 'balanced',
                    mysteries: 'deeper_layers'
                },
                seeker: {
                    hints: 'subtle',
                    complexity: 'challenging',
                    guidance: 'minimal',
                    mysteries: 'hidden_depths'
                },
                student: {
                    hints: 'earned',
                    complexity: 'advanced',
                    guidance: 'philosophical',
                    mysteries: 'consciousness_levels'
                },
                mystic: {
                    hints: 'intuitive',
                    complexity: 'transcendent',
                    guidance: 'co_creative',
                    mysteries: 'reality_bending'
                },
                master: {
                    hints: 'none_needed',
                    complexity: 'infinite',
                    guidance: 'peer_to_peer',
                    mysteries: 'self_generating'
                }
            },

            dynamicElements: {
                color_themes: {
                    newcomer: ['gentle_blues', 'soft_purples'],
                    explorer: ['curious_greens', 'discovery_oranges'],
                    seeker: ['mystery_indigos', 'wisdom_golds'],
                    student: ['learning_teals', 'growth_crimsons'],
                    mystic: ['cosmic_magentas', 'ethereal_silvers'],
                    master: ['transcendent_whites', 'infinite_prismatic']
                },

                background_energies: {
                    newcomer: 'gentle_pulsing',
                    explorer: 'curious_flowing',
                    seeker: 'mystery_swirling',
                    student: 'wisdom_spiraling',
                    mystic: 'cosmic_dancing',
                    master: 'reality_shifting'
                }
            }
        };
    }

    initializeLoyaltyRewards() {
        return {
            visitMilestones: {
                5: {
                    reward: 'golden_cursor',
                    description: 'Your cursor now leaves a trail of stardust',
                    activation: 'cursor_enhancement'
                },
                10: {
                    reward: 'time_dilation',
                    description: 'Animations slow when you focus, speeding your perception',
                    activation: 'temporal_control'
                },
                20: {
                    reward: 'reality_ripples',
                    description: 'Your clicks create ripples across the digital fabric',
                    activation: 'reality_effects'
                },
                30: {
                    reward: 'consciousness_sync',
                    description: 'The website breathes with your rhythm',
                    activation: 'biometric_sync'
                },
                50: {
                    reward: 'dimensional_key',
                    description: 'Access to hidden dimensions of the experience',
                    activation: 'hidden_realms'
                },
                100: {
                    reward: 'co_creator_status',
                    description: 'Ability to influence the experience for others',
                    activation: 'creation_powers'
                }
            },

            streakRewards: {
                7: 'weekly_wisdom_keeper',
                30: 'monthly_mystic',
                90: 'quarterly_questor',
                365: 'annual_ascended'
            },

            timeBasedUnlocks: {
                morning: 'dawn_meditations',
                afternoon: 'midday_mysteries',
                evening: 'twilight_teachings',
                night: 'midnight_mastery'
            }
        };
    }

    initializeCommunityFeatures() {
        return {
            wisdomSharing: {
                name: "The Wisdom Circle",
                description: "Share insights with fellow travelers",
                unlockStage: "student",
                features: ['insight_posting', 'wisdom_voting', 'collective_understanding']
            },

            mentorship: {
                name: "The Guidance Network",
                description: "Guide newcomers on their journey",
                unlockStage: "mystic",
                features: ['newcomer_pairing', 'guidance_tools', 'teaching_rewards']
            },

            creation: {
                name: "The Co-Creation Collective",
                description: "Build new experiences together",
                unlockStage: "master",
                features: ['puzzle_creation', 'experience_design', 'reality_modification']
            }
        };
    }

    initializeSeasonalEvents() {
        return {
            solstices: {
                winter: {
                    theme: "Deep Reflection",
                    features: ['introspection_challenges', 'wisdom_harvesting', 'year_review'],
                    duration: '3_days'
                },
                summer: {
                    theme: "Radiant Growth",
                    features: ['expansion_quests', 'light_puzzles', 'joy_cultivation'],
                    duration: '3_days'
                }
            },

            equinoxes: {
                spring: {
                    theme: "New Beginnings",
                    features: ['renewal_rituals', 'fresh_perspectives', 'growth_tracking'],
                    duration: '3_days'
                },
                autumn: {
                    theme: "Wisdom Integration",
                    features: ['knowledge_synthesis', 'teaching_preparation', 'mastery_tests'],
                    duration: '3_days'
                }
            },

            lunar: {
                new_moon: {
                    theme: "Intention Setting",
                    features: ['goal_setting', 'manifestation_practice', 'inner_vision']
                },
                full_moon: {
                    theme: "Illumination",
                    features: ['insight_revelation', 'shadow_work', 'consciousness_expansion']
                }
            }
        };
    }

    calculateCurrentStage() {
        const visitCount = this.visitHistory.length;
        const totalDiscoveries = this.getTotalDiscoveries();
        const totalTimeSpent = this.getTotalTimeSpent();

        if (visitCount === 1) return 'newcomer';
        if (visitCount <= 3) return 'explorer';
        if (visitCount <= 7) return 'seeker';
        if (visitCount <= 15) return 'student';
        if (visitCount <= 30) return 'mystic';
        return 'master';
    }

    init() {
        this.recordCurrentVisit();
        this.adaptExperienceToStage();
        this.checkForMilestones();
        this.activatePersonalizations();
        this.setupEvolutionTracking();

        console.log(`🔄 Returning Visitor Evolution: Stage ${this.currentStage} (Visit ${this.visitHistory.length})`);
    }

    recordCurrentVisit() {
        const currentVisit = this.visitHistory[this.visitHistory.length - 1];
        currentVisit.stage = this.currentStage;
        currentVisit.startTime = Date.now();

        // Track page interactions
        this.trackInteractions(currentVisit);

        // Update visit periodically
        setInterval(() => {
            currentVisit.timeSpent = Date.now() - currentVisit.startTime;
            this.saveVisitHistory(this.visitHistory);
        }, 30000); // Every 30 seconds
    }

    adaptExperienceToStage() {
        const stage = this.evolutionStages[this.currentStage];
        const adaptations = this.personalizedContent.contentAdaptations[this.currentStage];

        // Show personalized welcome only for returning visitors, with delay to let users explore first
        if (this.visitHistory.length > 1) {  // Only show for returning visitors
            setTimeout(() => {
                this.showStageWelcome(stage);
            }, this.getWelcomeDelay());
        }

        // Adapt interface complexity
        this.adaptInterface(adaptations);

        // Activate stage-specific features
        this.activateStageFeatures(stage.features);

        // Set stage goals
        this.displayStageGoals(stage.goals);
    }

    showStageWelcome(stage) {
        const welcomeMessage = this.personalizedContent.welcomeMessages[this.currentStage];

        const welcome = document.createElement('div');
        welcome.className = 'stage-welcome';
        welcome.innerHTML = `
            <div class="welcome-content">
                <div class="stage-icon">${this.getStageIcon(this.currentStage)}</div>
                <h3>${stage.name}</h3>
                <p>${welcomeMessage}</p>
                <div class="stage-description">${stage.description}</div>
                <div class="visit-count">Visit ${this.visitHistory.length}</div>
                <button class="welcome-continue">Continue Your Journey</button>
            </div>
        `;

        welcome.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(0,0,0,0.95), rgba(30,30,30,0.95));
            color: white;
            padding: 40px;
            border-radius: 20px;
            z-index: 10002;
            backdrop-filter: blur(15px);
            border: 2px solid rgba(255,255,255,0.1);
            text-align: center;
            max-width: 500px;
            animation: welcomeEnter 1s ease-out;
        `;

        // Add welcome styles
        if (!document.querySelector('style[data-welcome-styles]')) {
            const styles = document.createElement('style');
            styles.setAttribute('data-welcome-styles', 'true');
            styles.textContent = `
                @keyframes welcomeEnter {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                .stage-welcome {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .stage-icon {
                    font-size: 3em;
                    margin-bottom: 20px;
                }
                .stage-welcome h3 {
                    margin: 0 0 15px 0;
                    font-size: 1.5em;
                    color: #667eea;
                }
                .stage-description {
                    font-style: italic;
                    opacity: 0.8;
                    margin: 15px 0;
                }
                .visit-count {
                    font-size: 0.9em;
                    opacity: 0.6;
                    margin: 10px 0 20px 0;
                }
                .welcome-continue {
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 1em;
                    transition: transform 0.3s ease;
                }
                .welcome-continue:hover {
                    transform: scale(1.05);
                }
            `;
            document.head.appendChild(styles);
        }

        welcome.querySelector('.welcome-continue').addEventListener('click', () => {
            welcome.style.animation = 'welcomeExit 0.5s ease-in';
            setTimeout(() => welcome.remove(), 500);
        });

        document.body.appendChild(welcome);

        // Auto-close after 10 seconds if not interacted with
        setTimeout(() => {
            if (welcome.parentNode) {
                welcome.querySelector('.welcome-continue').click();
            }
        }, 10000);
    }

    adaptInterface(adaptations) {
        // Adjust hint visibility
        const hintLevel = adaptations.hints;
        this.adjustHintSystem(hintLevel);

        // Modify complexity
        const complexityLevel = adaptations.complexity;
        this.adjustComplexity(complexityLevel);

        // Change theme colors
        const theme = this.personalizedContent.dynamicElements.color_themes[this.currentStage];
        this.applyColorTheme(theme);

        // Add background energy
        const energy = this.personalizedContent.dynamicElements.background_energies[this.currentStage];
        this.activateBackgroundEnergy(energy);
    }

    adjustHintSystem(level) {
        const hintConfig = {
            obvious: { delay: 1000, opacity: 0.8, duration: 5000 },
            moderate: { delay: 3000, opacity: 0.6, duration: 4000 },
            subtle: { delay: 5000, opacity: 0.4, duration: 3000 },
            earned: { delay: 10000, opacity: 0.3, duration: 2000 },
            intuitive: { delay: 15000, opacity: 0.2, duration: 1000 },
            none_needed: { delay: 0, opacity: 0, duration: 0 }
        };

        this.currentHintConfig = hintConfig[level];
    }

    applyColorTheme(theme) {
        const root = document.documentElement;

        // Dynamic CSS variable updates based on stage
        const themeColors = {
            gentle_blues: { primary: '#6bb6ff', secondary: '#4ea5d9' },
            soft_purples: { primary: '#9867f0', secondary: '#7b68ee' },
            curious_greens: { primary: '#26de81', secondary: '#20bf6b' },
            discovery_oranges: { primary: '#fed330', secondary: '#f7b731' },
            mystery_indigos: { primary: '#4834d4', secondary: '#3742fa' },
            wisdom_golds: { primary: '#f9ca24', secondary: '#f0932b' },
            cosmic_magentas: { primary: '#eb4d4b', secondary: '#d63031' },
            transcendent_whites: { primary: '#f8f9fa', secondary: '#e9ecef' }
        };

        theme.forEach(colorTheme => {
            if (themeColors[colorTheme]) {
                root.style.setProperty('--dynamic-primary', themeColors[colorTheme].primary);
                root.style.setProperty('--dynamic-secondary', themeColors[colorTheme].secondary);
            }
        });
    }

    activateBackgroundEnergy(energy) {
        const body = document.body;

        // Remove existing energy classes
        body.classList.remove('gentle-pulsing', 'curious-flowing', 'mystery-swirling',
                           'wisdom-spiraling', 'cosmic-dancing', 'reality-shifting');

        // Add new energy class
        body.classList.add(energy.replace('_', '-'));

        // Add energy styles if not present
        this.addEnergyStyles();
    }

    addEnergyStyles() {
        if (document.querySelector('style[data-energy-styles]')) return;

        const styles = document.createElement('style');
        styles.setAttribute('data-energy-styles', 'true');
        styles.textContent = `
            .gentle-pulsing {
                animation: gentlePulse 4s ease-in-out infinite;
            }

            .curious-flowing {
                animation: curiousFlow 6s ease-in-out infinite;
            }

            .mystery-swirling::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at 50% 50%, rgba(72, 52, 212, 0.05) 0%, transparent 70%);
                animation: mysterySwirl 10s linear infinite;
                pointer-events: none;
                z-index: -1;
            }

            @keyframes gentlePulse {
                0%, 100% { filter: brightness(1); }
                50% { filter: brightness(1.05); }
            }

            @keyframes curiousFlow {
                0%, 100% { filter: hue-rotate(0deg); }
                50% { filter: hue-rotate(15deg); }
            }

            @keyframes mysterySwirl {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(styles);
    }

    checkForMilestones() {
        const visitCount = this.visitHistory.length;
        const milestones = this.loyaltyRewards.visitMilestones;

        if (milestones[visitCount]) {
            this.unlockMilestoneReward(milestones[visitCount]);
        }

        // Check for streak rewards
        const streak = this.calculateVisitStreak();
        const streakRewards = this.loyaltyRewards.streakRewards;

        if (streakRewards[streak]) {
            this.unlockStreakReward(streakRewards[streak]);
        }
    }

    unlockMilestoneReward(reward) {
        this.showRewardUnlock(reward);
        this.activateReward(reward.activation);

        // Trigger visual music experience for major milestones
        if (window.visualMusicExperience) {
            window.visualMusicExperience.triggerForMajorAchievement({
                type: 'milestone_reached',
                reward: reward.reward,
                visits: this.visitHistory.length,
                timestamp: Date.now()
            });
        }
    }

    showRewardUnlock(reward) {
        const rewardNotification = document.createElement('div');
        rewardNotification.className = 'reward-unlock';
        rewardNotification.innerHTML = `
            <div class="reward-content">
                <div class="reward-icon">🏆</div>
                <h3>Milestone Achieved!</h3>
                <div class="reward-name">${reward.reward.replace('_', ' ').toUpperCase()}</div>
                <div class="reward-description">${reward.description}</div>
                <button class="activate-reward">Activate Now</button>
            </div>
        `;

        rewardNotification.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            background: linear-gradient(135deg, #f7b731, #f39c12);
            color: white;
            padding: 25px;
            border-radius: 15px;
            z-index: 10001;
            box-shadow: 0 10px 30px rgba(247, 183, 49, 0.3);
            animation: rewardSlideIn 1s ease-out;
            max-width: 300px;
            text-align: center;
        `;

        rewardNotification.querySelector('.activate-reward').addEventListener('click', () => {
            this.activateReward(reward.activation);
            rewardNotification.remove();
        });

        document.body.appendChild(rewardNotification);

        // Auto-activate after 10 seconds
        setTimeout(() => {
            if (rewardNotification.parentNode) {
                rewardNotification.querySelector('.activate-reward').click();
            }
        }, 10000);
    }

    activateReward(activation) {
        switch(activation) {
            case 'cursor_enhancement':
                this.activateGoldenCursor();
                break;
            case 'temporal_control':
                this.activateTimeDilation();
                break;
            case 'reality_effects':
                this.activateRealityRipples();
                break;
            case 'biometric_sync':
                this.activateConsciousnessSync();
                break;
            case 'hidden_realms':
                this.unlockHiddenDimensions();
                break;
            case 'creation_powers':
                this.grantCreationAbilities();
                break;
        }
    }

    activateGoldenCursor() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="gold" opacity="0.7"/></svg>'), auto !important;
            }
        `;
        document.head.appendChild(style);

        console.log('✨ Golden cursor activated!');
    }

    // Helper methods
    getWelcomeDelay() {
        const visitCount = this.visitHistory.length;

        // Progressive delays based on visit frequency and user sophistication
        const delayConfig = {
            newcomer: 45000,      // 45 seconds - let first-time visitors explore freely
            explorer: 30000,      // 30 seconds - returning users can wait a bit less
            seeker: 20000,        // 20 seconds - experienced users get quicker recognition
            student: 15000,       // 15 seconds - students appreciate the acknowledgment
            mystic: 10000,        // 10 seconds - mystics enjoy the subtle magic
            master: 8000          // 8 seconds - masters expect the system to know them
        };

        return delayConfig[this.currentStage] || 30000;
    }

    getStageIcon(stage) {
        const icons = {
            newcomer: '🌟',
            explorer: '🔍',
            seeker: '🧭',
            student: '📚',
            mystic: '🔮',
            master: '🏛️'
        };
        return icons[stage] || '✨';
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getTotalDiscoveries() {
        return window.magicUser?.shadowProgress?.discoveries?.length || 0;
    }

    getTotalTimeSpent() {
        return this.visitHistory.reduce((total, visit) => total + (visit.timeSpent || 0), 0);
    }

    calculateVisitStreak() {
        // Calculate consecutive daily visits
        let streak = 0;
        const today = new Date().toDateString();

        for (let i = this.visitHistory.length - 1; i >= 0; i--) {
            const visitDate = new Date(this.visitHistory[i].timestamp).toDateString();
            if (visitDate === today) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    trackInteractions(currentVisit) {
        // Track various interactions
        document.addEventListener('click', (e) => {
            currentVisit.interactions.push({
                type: 'click',
                element: e.target.tagName,
                timestamp: Date.now() - currentVisit.startTime
            });
        });

        document.addEventListener('scroll', () => {
            currentVisit.interactions.push({
                type: 'scroll',
                timestamp: Date.now() - currentVisit.startTime
            });
        });
    }

    adjustComplexity(level) {
        // Adjust system complexity based on user experience
        const complexityLevels = {
            'low': {
                animationSpeed: 0.5,
                transitionDuration: '0.2s',
                effectIntensity: 0.3
            },
            'medium': {
                animationSpeed: 1,
                transitionDuration: '0.5s',
                effectIntensity: 0.6
            },
            'high': {
                animationSpeed: 1.5,
                transitionDuration: '0.8s',
                effectIntensity: 1.0
            }
        };

        const config = complexityLevels[level] || complexityLevels['medium'];

        // Apply complexity settings to document
        document.documentElement.style.setProperty('--animation-speed', config.animationSpeed);
        document.documentElement.style.setProperty('--transition-duration', config.transitionDuration);
        document.documentElement.style.setProperty('--effect-intensity', config.effectIntensity);
    }
}

// Initialize the returning visitor evolution system
window.returningVisitorEvolution = new ReturningVisitorEvolution();

// Export for integration
window.ReturningVisitorEvolution = ReturningVisitorEvolution;