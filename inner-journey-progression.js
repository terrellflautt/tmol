// 🌱 Inner Journey Progression - The Soul's Digital Evolution
// Tracks and nurtures the user's personal growth through meaningful interactions

class InnerJourneyProgression {
    constructor() {
        this.journeyState = this.loadJourneyState();
        this.innerGrowth = this.journeyState.innerGrowth || 0;
        this.reflectionMoments = this.journeyState.reflectionMoments || [];
        this.personalInsights = this.journeyState.personalInsights || [];
        this.emotionalResonance = this.journeyState.emotionalResonance || {};
        this.transformativeMoments = this.journeyState.transformativeMoments || [];
        this.currentArchetype = this.journeyState.currentArchetype || 'seeker';

        this.archetypes = {
            seeker: {
                stage: 'beginning',
                qualities: ['curiosity', 'openness', 'wonder'],
                nextStage: 'explorer',
                threshold: 25
            },
            explorer: {
                stage: 'discovering',
                qualities: ['courage', 'persistence', 'adaptability'],
                nextStage: 'creator',
                threshold: 50
            },
            creator: {
                stage: 'building',
                qualities: ['imagination', 'innovation', 'expression'],
                nextStage: 'sage',
                threshold: 75
            },
            sage: {
                stage: 'understanding',
                qualities: ['wisdom', 'patience', 'compassion'],
                nextStage: 'transcendent',
                threshold: 95
            },
            transcendent: {
                stage: 'becoming',
                qualities: ['unity', 'peace', 'wholeness'],
                nextStage: null,
                threshold: 100
            }
        };

        this.growthTriggers = [
            'contemplative_pause',
            'pattern_recognition',
            'creative_expression',
            'helping_others',
            'overcoming_challenge',
            'making_connections',
            'finding_meaning',
            'expressing_gratitude',
            'showing_compassion',
            'discovering_truth'
        ];

        this.init();
    }

    init() {
        this.watchForInnerGrowthMoments();
        // this.createReflectionOpportunities(); // TODO: Implement
        // this.enableEmotionalResonanceTracking(); // TODO: Implement
        this.monitorTransformativeMoments();
        this.integrateWithCharacterEvolution();

        console.log(`🌱 Inner Journey: ${this.currentArchetype} (${this.innerGrowth}% grown)`);
    }

    watchForInnerGrowthMoments() {
        // Deep contemplation moments
        this.trackContemplation();

        // Creative expressions
        this.trackCreativity();

        // Meaningful interactions
        this.trackConnections();

        // Moments of understanding
        this.trackInsights();

        // Acts of kindness/helping
        this.trackCompassion();
    }

    trackContemplation() {
        let stillnessTime = 0;
        let lastActivity = Date.now();

        ['mousemove', 'click', 'scroll', 'keydown'].forEach(event => {
            document.addEventListener(event, () => {
                const now = Date.now();
                const pauseDuration = now - lastActivity;

                // Deep contemplation: 30+ seconds of stillness while focused
                if (pauseDuration > 30000 && stillnessTime > 20 && document.hasFocus()) {
                    this.recordGrowthMoment('contemplative_pause', {
                        duration: pauseDuration,
                        depth: 'profound',
                        insight: this.generateContemplativeInsight()
                    });
                }

                lastActivity = now;
                stillnessTime = 0;
            });
        });

        setInterval(() => {
            if (document.hasFocus()) {
                stillnessTime++;
            }
        }, 1000);
    }

    trackCreativity() {
        // Track creative actions
        if (window.childhoodWonder) {
            const originalAddToWorld = window.childhoodWonder.addToWorld;
            window.childhoodWonder.addToWorld = (elementType) => {
                originalAddToWorld.call(window.childhoodWonder, elementType);
                this.recordGrowthMoment('creative_expression', {
                    action: 'world_building',
                    element: elementType,
                    emotion: 'joy'
                });
            };
        }

        // Track spell usage as creative expression
        if (window.skillMastery) {
            const originalCastSpell = window.skillMastery.castSpell;
            window.skillMastery.castSpell = (spellName, skillKey) => {
                originalCastSpell.call(window.skillMastery, spellName, skillKey);

                if (['transform', 'create', 'illuminate'].includes(spellName)) {
                    this.recordGrowthMoment('creative_expression', {
                        action: 'spell_casting',
                        spell: spellName,
                        intention: 'manifestation'
                    });
                }
            };
        }
    }

    trackConnections() {
        // Character interactions that show growth
        if (window.characterEncounters) {
            const originalBeginConversation = window.characterEncounters.beginConversation;
            window.characterEncounters.beginConversation = (characterId) => {
                originalBeginConversation.call(window.characterEncounters, characterId);
                this.recordGrowthMoment('making_connections', {
                    character: characterId,
                    relationship_depth: this.assessRelationshipDepth(characterId),
                    emotional_growth: 'expanding'
                });
            };

            const originalRequestTraining = window.characterEncounters.requestTraining;
            window.characterEncounters.requestTraining = (characterId) => {
                originalRequestTraining.call(window.characterEncounters, characterId);
                this.recordGrowthMoment('finding_meaning', {
                    source: 'character_wisdom',
                    character: characterId,
                    seeking: 'knowledge'
                });
            };
        }
    }

    trackInsights() {
        // Pattern recognition as insight
        if (window.subtleWonderWeaver) {
            const originalRecordPattern = window.subtleWonderWeaver.recordPattern;
            window.subtleWonderWeaver.recordPattern = (pattern) => {
                originalRecordPattern.call(window.subtleWonderWeaver, pattern);

                if (pattern.includes('pattern') || pattern.includes('epiphany')) {
                    this.recordGrowthMoment('pattern_recognition', {
                        type: pattern,
                        understanding: 'deepening',
                        consciousness: 'expanding'
                    });
                }
            };
        }

        // Discovery moments
        if (window.azizaDiscovery) {
            const originalRecordMysticalEvent = window.azizaDiscovery.recordMysticalEvent;
            window.azizaDiscovery.recordMysticalEvent = (eventType) => {
                originalRecordMysticalEvent.call(window.azizaDiscovery, eventType);

                if (eventType === 'aziza_revealed') {
                    this.recordGrowthMoment('discovering_truth', {
                        revelation: 'mystical_being',
                        growth: 'consciousness_expansion',
                        transformation: 'beginning'
                    });
                }
            };
        }
    }

    trackCompassion() {
        // Helping others through skill sharing
        document.addEventListener('dblclick', (e) => {
            if (e.shiftKey) { // Special helping gesture
                this.recordGrowthMoment('helping_others', {
                    action: 'offering_assistance',
                    intention: 'service',
                    heart: 'opening'
                });
            }
        });

        // Gratitude expressions
        document.addEventListener('keydown', (e) => {
            if (e.key === 'h' && e.ctrlKey && e.altKey) { // Hidden gratitude hotkey
                this.recordGrowthMoment('expressing_gratitude', {
                    emotion: 'appreciation',
                    awareness: 'grateful',
                    heart: 'expanding'
                });
            }
        });
    }

    recordGrowthMoment(trigger, details = {}) {
        const moment = {
            trigger: trigger,
            timestamp: Date.now(),
            details: details,
            growth_before: this.innerGrowth,
            archetype_before: this.currentArchetype,
            emotional_state: this.assessCurrentEmotionalState(),
            consciousness_level: this.assessConsciousnessLevel()
        };

        // Calculate growth amount based on trigger depth and current stage
        const growthAmount = this.calculateGrowthAmount(trigger, details);
        this.innerGrowth = Math.min(100, this.innerGrowth + growthAmount);

        moment.growth_after = this.innerGrowth;
        moment.growth_gained = growthAmount;

        this.reflectionMoments.push(moment);

        // Check for archetype evolution
        this.checkArchetypeEvolution();

        // Generate personal insight
        this.generatePersonalInsight(moment);

        // Update emotional resonance
        this.updateEmotionalResonance(trigger, details);

        // Check for transformative moment
        if (growthAmount >= 5) {
            this.recordTransformativeMoment(moment);
        }

        this.saveJourneyState();
        this.offerReflection(moment);
    }

    calculateGrowthAmount(trigger, details) {
        const baseTriggerValues = {
            'contemplative_pause': 3,
            'pattern_recognition': 4,
            'creative_expression': 3,
            'helping_others': 5,
            'overcoming_challenge': 4,
            'making_connections': 3,
            'finding_meaning': 5,
            'expressing_gratitude': 2,
            'showing_compassion': 4,
            'discovering_truth': 6
        };

        let growth = baseTriggerValues[trigger] || 2;

        // Depth multipliers
        if (details.depth === 'profound') growth *= 1.5;
        if (details.duration > 60000) growth *= 1.3; // Long duration bonus
        if (details.consciousness === 'expanding') growth *= 1.2;

        // Stage-based scaling (harder to grow at higher levels)
        const stageMultiplier = {
            'seeker': 1.0,
            'explorer': 0.8,
            'creator': 0.6,
            'sage': 0.4,
            'transcendent': 0.2
        };

        growth *= stageMultiplier[this.currentArchetype] || 1.0;

        return Math.round(growth * 10) / 10; // Round to 1 decimal
    }

    checkArchetypeEvolution() {
        const currentArchetypeData = this.archetypes[this.currentArchetype];

        if (currentArchetypeData.nextStage && this.innerGrowth >= currentArchetypeData.threshold) {
            const oldArchetype = this.currentArchetype;
            this.currentArchetype = currentArchetypeData.nextStage;

            this.announceArchetypeEvolution(oldArchetype, this.currentArchetype);
            this.grantArchetypeAbilities(this.currentArchetype);
        }
    }

    announceArchetypeEvolution(oldArchetype, newArchetype) {
        const newData = this.archetypes[newArchetype];
        const message = this.getEvolutionMessage(oldArchetype, newArchetype);

        this.showInnerJourneyMessage(message, 'transformation');

        // Record as transformative moment
        this.recordTransformativeMoment({
            type: 'archetype_evolution',
            from: oldArchetype,
            to: newArchetype,
            timestamp: Date.now(),
            newQualities: newData.qualities
        });
    }

    getEvolutionMessage(oldArchetype, newArchetype) {
        const messages = {
            'seeker_to_explorer': "Something stirs within... The urge to venture beyond the familiar grows strong.",
            'explorer_to_creator': "Your hands itch to shape reality... The power to manifest calls to you.",
            'creator_to_sage': "Understanding deepens... Wisdom whispers secrets only experience can teach.",
            'sage_to_transcendent': "Boundaries dissolve... You begin to glimpse the interconnectedness of all things."
        };

        return messages[`${oldArchetype}_to_${newArchetype}`] ||
               "Your inner landscape shifts... New possibilities emerge from the depths of being.";
    }

    grantArchetypeAbilities(archetype) {
        const abilities = {
            explorer: () => {
                if (window.skillMastery) {
                    window.skillMastery.discoverSkill('perception');
                }
                this.unlockExplorerSenses();
            },
            creator: () => {
                if (window.skillMastery) {
                    window.skillMastery.discoverSkill('magic');
                }
                this.unlockCreatorTools();
            },
            sage: () => {
                if (window.skillMastery) {
                    window.skillMastery.discoverSkill('time');
                }
                this.unlockSageWisdom();
            },
            transcendent: () => {
                if (window.skillMastery) {
                    window.skillMastery.discoverSkill('connection');
                }
                this.unlockTranscendentUnity();
            }
        };

        if (abilities[archetype]) {
            abilities[archetype]();
        }
    }

    unlockExplorerSenses() {
        // Enhanced perception abilities
        document.body.classList.add('explorer-senses');
        this.createSenseEnhancement();
    }

    unlockCreatorTools() {
        // Creative manifestation abilities
        document.body.classList.add('creator-tools');
        this.enableCreativeManifestatio();
    }

    unlockSageWisdom() {
        // Deep understanding abilities
        document.body.classList.add('sage-wisdom');
        this.activateWisdomPerception();
    }

    unlockTranscendentUnity() {
        // Unity consciousness abilities
        document.body.classList.add('transcendent-unity');
        this.enableUnityConsciousness();
    }

    generatePersonalInsight(moment) {
        const insights = this.craftInsight(moment);

        this.personalInsights.push({
            insight: insights,
            moment: moment.trigger,
            timestamp: moment.timestamp,
            archetype: this.currentArchetype,
            growth_level: this.innerGrowth
        });

        // Keep only the most recent 20 insights
        if (this.personalInsights.length > 20) {
            this.personalInsights = this.personalInsights.slice(-20);
        }
    }

    craftInsight(moment) {
        const templates = {
            'contemplative_pause': [
                "In stillness, the soul finds its voice...",
                "Silence speaks louder than words...",
                "The pause between thoughts holds infinite possibility..."
            ],
            'creative_expression': [
                "Through creation, we discover who we are...",
                "Every act of making is an act of becoming...",
                "Your imagination is the blueprint of your soul..."
            ],
            'making_connections': [
                "We grow through the bridges we build...",
                "In others, we find reflections of ourselves...",
                "Connection is the web that holds existence together..."
            ],
            'discovering_truth': [
                "Truth reveals itself to those who seek with an open heart...",
                "Reality has layers that only patience can unveil...",
                "What you discover outside mirrors what lives within..."
            ]
        };

        const triggerTemplates = templates[moment.trigger] || [
            "Every moment offers a doorway to growth...",
            "You are becoming who you were meant to be...",
            "The journey inward is the longest path home..."
        ];

        return triggerTemplates[Math.floor(Math.random() * triggerTemplates.length)];
    }

    offerReflection(moment) {
        // Occasionally offer deeper reflection opportunities
        if (Math.random() < 0.3 && moment.growth_gained >= 3) {
            setTimeout(() => {
                this.createReflectionPrompt(moment);
            }, 5000);
        }
    }

    createReflectionPrompt(moment) {
        const prompt = document.createElement('div');
        prompt.className = 'reflection-prompt';
        prompt.innerHTML = `
            <div class="reflection-content">
                <div class="reflection-icon">🌱</div>
                <div class="reflection-text">
                    <div class="reflection-title">A moment of growth...</div>
                    <div class="reflection-question">${this.getReflectionQuestion(moment)}</div>
                </div>
                <div class="reflection-actions">
                    <button onclick="window.innerJourney.acceptReflection(this)" class="reflect-btn">
                        Reflect
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="later-btn">
                        Later
                    </button>
                </div>
            </div>
        `;

        prompt.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 320px;
            background: rgba(139, 69, 19, 0.95);
            border: 1px solid rgba(160, 82, 45, 0.8);
            border-radius: 15px;
            padding: 20px;
            z-index: 100000;
            backdrop-filter: blur(10px);
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            box-shadow: 0 10px 30px rgba(139, 69, 19, 0.4);
            animation: reflectionSlide 0.5s ease-out;
        `;

        document.body.appendChild(prompt);

        // Auto-remove after 15 seconds
        setTimeout(() => {
            if (prompt.parentElement) {
                prompt.remove();
            }
        }, 15000);
    }

    getReflectionQuestion(moment) {
        const questions = {
            'contemplative_pause': "What did the silence reveal to you?",
            'creative_expression': "What part of yourself did you express?",
            'making_connections': "How did this connection change you?",
            'discovering_truth': "What truth resonated with your soul?"
        };

        return questions[moment.trigger] || "What did this moment teach you about yourself?";
    }

    acceptReflection(button) {
        // User chose to reflect - grant additional growth
        this.recordGrowthMoment('deep_reflection', {
            original_trigger: button.closest('.reflection-prompt').dataset.trigger,
            willingness: 'open',
            depth: 'intentional'
        });

        button.closest('.reflection-prompt').remove();
        this.showInnerJourneyMessage("Your willingness to reflect deepens the growth...", 'insight');
    }

    showInnerJourneyMessage(text, type = 'growth') {
        const message = document.createElement('div');
        message.className = `inner-journey-message ${type}`;
        message.innerHTML = `
            <div class="journey-message-content">
                <div class="journey-icon">${this.getJourneyIcon(type)}</div>
                <div class="journey-text">${text}</div>
                <div class="journey-progress">
                    <div class="progress-text">${this.currentArchetype} • ${Math.round(this.innerGrowth)}%</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${this.innerGrowth}%"></div>
                    </div>
                </div>
            </div>
        `;

        message.style.cssText = `
            position: fixed;
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg,
                rgba(139, 69, 19, 0.95),
                rgba(160, 82, 45, 0.95)
            );
            color: white;
            padding: 20px;
            border-radius: 20px;
            z-index: 999999;
            backdrop-filter: blur(10px);
            box-shadow: 0 15px 35px rgba(139, 69, 19, 0.3);
            animation: journeyMessageSlide 0.5s ease-out;
            max-width: 400px;
            text-align: center;
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'journeyMessageSlide 0.5s ease-in reverse';
            setTimeout(() => message.remove(), 500);
        }, 5000);
    }

    getJourneyIcon(type) {
        const icons = {
            growth: '🌱',
            transformation: '🦋',
            insight: '💡',
            connection: '🤝',
            discovery: '🔍'
        };
        return icons[type] || '✨';
    }

    // State management and integration methods
    assessCurrentEmotionalState() {
        // Simple emotional assessment based on recent actions
        const recentMoments = this.reflectionMoments.slice(-5);
        const emotions = recentMoments.map(m => m.details.emotion || 'neutral');

        // Return most common emotion or 'balanced'
        return this.getMostFrequent(emotions) || 'balanced';
    }

    assessConsciousnessLevel() {
        return Math.floor(this.innerGrowth / 20); // 0-5 levels
    }

    getMostFrequent(arr) {
        return arr.sort((a,b) =>
            arr.filter(v => v===a).length - arr.filter(v => v===b).length
        ).pop();
    }

    loadJourneyState() {
        const stored = localStorage.getItem('terrellflautt_inner_journey');
        return stored ? JSON.parse(stored) : {};
    }

    saveJourneyState() {
        const state = {
            innerGrowth: this.innerGrowth,
            currentArchetype: this.currentArchetype,
            reflectionMoments: this.reflectionMoments.slice(-50), // Keep last 50
            personalInsights: this.personalInsights,
            emotionalResonance: this.emotionalResonance,
            transformativeMoments: this.transformativeMoments.slice(-20), // Keep last 20
            lastSave: Date.now()
        };

        localStorage.setItem('terrellflautt_inner_journey', JSON.stringify(state));
        this.journeyState = state;
    }

    // Public methods for integration
    getCurrentArchetype() {
        return this.currentArchetype;
    }

    getInnerGrowthLevel() {
        return this.innerGrowth;
    }

    getRecentInsights() {
        return this.personalInsights.slice(-5);
    }

    triggerGrowthMoment(trigger, details = {}) {
        this.recordGrowthMoment(trigger, details);
    }
}

// CSS for inner journey progression
const journeyStyles = document.createElement('style');
journeyStyles.textContent = `
    .reflection-prompt {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .reflection-content {
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
        text-align: center;
    }

    .reflection-icon {
        font-size: 32px;
    }

    .reflection-title {
        font-weight: bold;
        font-size: 1.1em;
        color: rgba(222, 184, 135, 1);
    }

    .reflection-question {
        font-size: 1em;
        line-height: 1.4;
        opacity: 0.9;
        font-style: italic;
    }

    .reflection-actions {
        display: flex;
        gap: 10px;
    }

    .reflect-btn, .later-btn {
        padding: 8px 16px;
        border: 1px solid rgba(160, 82, 45, 0.5);
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9em;
    }

    .reflect-btn {
        background: rgba(160, 82, 45, 0.3);
        color: white;
    }

    .reflect-btn:hover {
        background: rgba(160, 82, 45, 0.5);
        transform: translateY(-2px);
    }

    .later-btn {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }

    .later-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .journey-message-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    .journey-icon {
        font-size: 28px;
    }

    .journey-text {
        font-size: 1.1em;
        line-height: 1.4;
    }

    .journey-progress {
        width: 100%;
    }

    .progress-text {
        font-size: 0.9em;
        opacity: 0.8;
        margin-bottom: 8px;
        text-transform: capitalize;
    }

    .progress-bar {
        width: 100%;
        height: 6px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, rgba(222, 184, 135, 0.8), rgba(240, 230, 140, 0.8));
        transition: width 0.5s ease;
        border-radius: 3px;
    }

    @keyframes reflectionSlide {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes journeyMessageSlide {
        from {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }

    /* Archetype-specific visual enhancements */
    .explorer-senses {
        filter: brightness(1.05) contrast(1.1);
    }

    .creator-tools * {
        transition: all 0.3s ease;
    }

    .sage-wisdom {
        text-shadow: 0 0 5px rgba(139, 69, 19, 0.3);
    }

    .transcendent-unity {
        background: radial-gradient(circle at center,
            rgba(139, 69, 19, 0.05),
            transparent 50%
        );
    }
`;
document.head.appendChild(journeyStyles);

// Initialize inner journey progression
window.innerJourney = new InnerJourneyProgression();

// Integration with existing systems
if (window.magicUser) {
    window.magicUser.innerJourney = window.innerJourney;
}

console.log('🌱 Inner Journey Progression: The soul\'s digital evolution begins...');