/**
 * MASTER STORY INTEGRATION SYSTEM
 * The definitive branching narrative experience for terrellflautt.com
 *
 * Connects:
 * - NPCs (Genie, Dr. Cranium, Aziza, Julanar)
 * - Elemental battles (Fire, Water, Air, Earth)
 * - Combat system (Arabian enemies)
 * - Atlantis/Cthulhu final arc
 * - Multiple endings based on choices
 *
 * Estimated Playtime: 2-4 hours for full completion
 */

class MasterStoryIntegration {
    constructor() {
        this.storyState = {
            act: 1, // Acts 1-5
            phase: 'introduction',
            npcsMet: [],
            elementalsDefeated: [],
            combatVictories: [],
            majorChoices: [],
            alignment: { // -10 to +10
                wisdom: 0,      // Scholar vs Warrior
                chaos: 0,       // Order vs Chaos
                mercy: 0,       // Justice vs Mercy
                curiosity: 0    // Caution vs Exploration
            },
            inventory: [],
            skills: {
                magic: 0,
                combat: 0,
                stealth: 0,
                diplomacy: 0,
                alchemy: 0
            },
            playTime: 0,
            secretsFound: 0,
            endingUnlocked: null
        };

        this.endings = {
            scholar_sage: {
                id: 'scholar_sage',
                name: 'The Transcendent Scholar',
                requirements: { wisdom: 7, magic: 50, elementalsDefeated: 4 },
                description: 'You mastered the arcane arts and united the elementals in harmony.',
                cinematicArt: 'pixel-art-wizard-with-staff-long-beard_885831-37581-3933412362.jpg',
                reward: 'cosmic_wisdom_title'
            },
            warrior_champion: {
                id: 'warrior_champion',
                name: 'Champion of the Desert',
                requirements: { wisdom: -3, combat: 60, combatVictories: 10 },
                description: 'Through strength and valor, you conquered all challenges.',
                cinematicArt: 'homem-segurando-o-personagem-de-pixel-art-de-ataque-de-madeira-pronto-para-uso-em-animacao-e-jogo-aseprite-sprite-sheet_642384-38-288773523.jpg',
                reward: 'legendary_warrior_title'
            },
            peacekeeper: {
                id: 'peacekeeper',
                name: 'The Peacekeeper',
                requirements: { mercy: 7, diplomacy: 40, combatVictories: 0 },
                description: 'You resolved every conflict through wisdom and compassion.',
                cinematicArt: 'julanar.png',
                reward: 'peace_bringer_title'
            },
            chaos_lord: {
                id: 'chaos_lord',
                name: 'Servant of Cthulhu',
                requirements: { chaos: 8, curiosity: 9, alignment: 'dark' },
                description: 'You embraced the cosmic horror and became one with the void.',
                cinematicArt: 'cthulu-final-fight.png',
                reward: 'eldritch_power'
            },
            balanced_hero: {
                id: 'balanced_hero',
                name: 'The Balanced Hero',
                requirements: { allAlignments: 'near_zero', skillsBalanced: true },
                description: 'You walked the middle path, mastering all aspects of existence.',
                cinematicArt: 'pixel-art-depicting-zeldas-ocarina-time-quest_811279-39932-2541797952.jpg',
                reward: 'true_hero_title'
            },
            atlantis_king: {
                id: 'atlantis_king',
                name: 'Ruler of Atlantis',
                requirements: { atlantisQuest: 'completed', reputation: 'atlantis_high' },
                description: 'The sea people crowned you as their sovereign.',
                cinematicArt: 'Cthulhu-Rising-2-865665388.png',
                reward: 'atlantean_crown'
            }
        };

        this.storyArcs = {
            // ACT 1: AWAKENING (15-20 min)
            act1_awakening: {
                act: 1,
                name: 'The Digital Awakening',
                phases: [
                    {
                        id: 'first_visit',
                        trigger: { visitCount: 1 },
                        npc: null,
                        narrative: 'You discover the portfolio of Terrell Flautt. Something feels... different about this website.',
                        choices: []
                    },
                    {
                        id: 'genie_introduction',
                        trigger: { clicks: 10, logoClicked: true },
                        npc: 'genie',
                        narrative: 'The lamp glows. A digital genie materializes, offering cryptic wisdom.',
                        choices: [
                            {
                                text: 'Ask about the website\'s secrets',
                                effect: { curiosity: +2, unlocks: 'easter_egg_hint' }
                            },
                            {
                                text: 'Request knowledge of the elementals',
                                effect: { wisdom: +2, unlocks: 'elemental_quest' }
                            },
                            {
                                text: 'Politely decline and explore alone',
                                effect: { curiosity: -1, unlocks: 'solo_path' }
                            }
                        ]
                    },
                    {
                        id: 'first_challenge',
                        trigger: { curiosity: 2 },
                        narrative: 'The Genie challenges you to find 3 hidden secrets.',
                        unlocks: ['konami_code', 'triple_click', 'forum_discovery']
                    }
                ]
            },

            // ACT 2: THE FOUR ELEMENTALS (40-60 min)
            act2_elementals: {
                act: 2,
                name: 'Masters of the Elements',
                phases: [
                    {
                        id: 'aziza_encounter',
                        trigger: { secretsFound: 3 },
                        npc: 'aziza',
                        narrative: 'Aziza appears at her purple-curtained door, teaching about elementals.',
                        cinematicArt: 'aziza_door.webp',
                        quest: {
                            name: 'Elemental Mastery',
                            objective: 'Defeat or befriend all 4 elementals',
                            elementals: [
                                {
                                    name: 'Fire Elemental',
                                    location: 'logomaker',
                                    health: 150,
                                    weakness: 'water',
                                    dialogue: 'I am the flame of creation! Prove your worth!',
                                    defeatArt: 'aziza_air.jpg',
                                    choices: [
                                        { text: 'Fight with water magic', path: 'combat', alignment: { wisdom: +1, magic: +10 } },
                                        { text: 'Channel fire into creative force', path: 'peaceful', alignment: { mercy: +2, diplomacy: +10 } }
                                    ]
                                },
                                {
                                    name: 'Water Elemental',
                                    location: 'forum',
                                    health: 180,
                                    weakness: 'earth',
                                    dialogue: 'The tides of knowledge flow through me...',
                                    defeatArt: 'Cthulhu-Rising-2-865665388.png',
                                    choices: [
                                        { text: 'Use earth to ground the water', path: 'combat', alignment: { wisdom: +1, magic: +10 } },
                                        { text: 'Meditate with the water', path: 'peaceful', alignment: { mercy: +3, diplomacy: +15 } }
                                    ]
                                },
                                {
                                    name: 'Air Elemental',
                                    location: 'projects_section',
                                    health: 120,
                                    weakness: 'none',
                                    dialogue: 'Catch me if you can, mortal!',
                                    defeatArt: 'aziza_air.jpg',
                                    choices: [
                                        { text: 'Chase with speed spell', path: 'combat', alignment: { combat: +15 } },
                                        { text: 'Wait patiently for it to settle', path: 'peaceful', alignment: { wisdom: +3, mercy: +2 } }
                                    ]
                                },
                                {
                                    name: 'Earth Elemental',
                                    location: 'contact_form',
                                    health: 200,
                                    weakness: 'air',
                                    dialogue: 'I am the foundation. Unmovable. Eternal.',
                                    defeatArt: 'pixel-art-ancient-arabic-city-desert-with-buildings-palm-trees-background-8-bit-game-ai_985124-1627-3716854050.jpg',
                                    choices: [
                                        { text: 'Use air to erode the stone', path: 'combat', alignment: { magic: +15 } },
                                        { text: 'Offer to strengthen its foundation', path: 'peaceful', alignment: { mercy: +3, wisdom: +2, diplomacy: +20 } }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        id: 'elemental_completion',
                        trigger: { elementalsDefeated: 4 },
                        npc: 'aziza',
                        narrative: 'Aziza reveals the true nature of the elementals - they are fragments of the website\'s soul.',
                        cinematicArt: 'aziza_air.jpg',
                        reward: 'dispel_potion_recipe',
                        unlocks: 'act3_dr_cranium'
                    }
                ]
            },

            // ACT 3: THE MAD SCIENTIST (30-40 min)
            act3_dr_cranium: {
                act: 3,
                name: 'Dr. Cranium\'s Laboratory',
                phases: [
                    {
                        id: 'lab_discovery',
                        trigger: { elementalsDefeated: 4, secretsFound: 5 },
                        npc: 'dr_cranium',
                        narrative: 'You discover Dr. Cranium\'s hidden laboratory. A two-stage puzzle blocks entry.',
                        cinematicArt: 'dr_cranium_entrance.png',
                        puzzle: {
                            stage1: {
                                type: 'keyhole',
                                image: 'dr_cranium_puzzle.png',
                                solution: 'correct_key_pattern',
                                hint: 'The elements point the way...'
                            },
                            stage2: {
                                type: 'riddle',
                                question: 'I track your every move, yet respect your privacy. What am I?',
                                answer: 'analytics',
                                hint: 'Think about what Dr. Cranium studies...'
                            }
                        }
                    },
                    {
                        id: 'cranium_revelation',
                        trigger: { lab_entered: true },
                        npc: 'dr_cranium',
                        narrative: 'Dr. Cranium reveals he\'s been studying YOU - your behavioral patterns, your journey.',
                        dialogue: [
                            '🔬 FASCINATING! You\'ve clicked {totalClicks} times!',
                            'Your fingerprint uniqueness: {fingerprint}%',
                            'But I only study this for SCIENCE! Not tracking! ETHICS!'
                        ],
                        cinematicArt: 'dr_cranium.webp',
                        choices: [
                            {
                                text: 'Be alarmed about tracking',
                                effect: { chaos: +2, alignment: 'privacy_aware' }
                            },
                            {
                                text: 'Find it fascinating',
                                effect: { wisdom: +2, curiosity: +3 }
                            },
                            {
                                text: 'Ask to see the data',
                                effect: { wisdom: +3, unlocks: 'privacy_dashboard' }
                            }
                        ]
                    },
                    {
                        id: 'dispel_potion',
                        trigger: { cranium_trust: 'gained' },
                        narrative: 'Dr. Cranium teaches you the Dispel Potion recipe - crucial for the final battle.',
                        reward: 'dispel_potion',
                        unlocks: 'act4_atlantis'
                    }
                ]
            },

            // ACT 4: ATLANTIS SEA ADVENTURE (45-60 min)
            act4_atlantis: {
                act: 4,
                name: 'The Sunken City',
                phases: [
                    {
                        id: 'erasmus_tale',
                        trigger: { act3_complete: true, timeSpent: 3600 },
                        npc: 'erasmus',
                        narrative: 'The wizard Erasmus tells the tale of the Meridian Star and Cthulhu.',
                        cinematicArt: 'pixel-art-wizard-with-staff-long-beard_885831-37581-3933412362.jpg',
                        unlocks: 'atlantis_quest'
                    },
                    {
                        id: 'archetype_choice',
                        trigger: { atlantis_quest: 'unlocked' },
                        narrative: 'Choose your path to the sunken city:',
                        choices: [
                            {
                                text: 'Fighter Path - Strength and courage',
                                archetype: 'fighter',
                                quests: ['defeat_palace_guards', 'battle_sea_monster', 'earn_captain_silva_respect']
                            },
                            {
                                text: 'Thief Path - Cunning and stealth',
                                archetype: 'thief',
                                quests: ['steal_underwater_map', 'befriend_pirates', 'discover_secret_entrance']
                            },
                            {
                                text: 'Magic User Path - Wisdom and spells',
                                archetype: 'magic_user',
                                quests: ['learn_water_breathing', 'commune_with_sea_spirits', 'decipher_atlantean_runes']
                            }
                        ]
                    },
                    {
                        id: 'julanar_guidance',
                        trigger: { archetype: 'selected' },
                        npc: 'julanar',
                        narrative: 'Princess Julanar, guardian of the sea, offers her wisdom.',
                        cinematicArt: 'julanar.png',
                        guidance: 'The path you\'ve chosen will determine your fate. But know this - mercy is not weakness.'
                    },
                    {
                        id: 'atlantis_arrival',
                        trigger: { quests_complete: 3 },
                        narrative: 'You descend into the drowned ruins of Atlantis...',
                        cinematicArt: 'Cthulhu-Rising-2-865665388.png',
                        encounter: 'sea_people_council'
                    },
                    {
                        id: 'artifact_choice',
                        trigger: { sea_people_trust: 'earned' },
                        narrative: 'The artifacts of the Meridian Star lie before you:',
                        choices: [
                            {
                                text: 'Take the Crystal of Eternal Wisdom',
                                effect: { wisdom: +5, magic: +20, item: 'wisdom_crystal' }
                            },
                            {
                                text: 'Take the Binding Chains of the Old Gods',
                                effect: { combat: +30, item: 'binding_chains' }
                            },
                            {
                                text: 'Leave the artifacts undisturbed',
                                effect: { mercy: +5, wisdom: +3, unlocks: 'peaceful_ending' }
                            }
                        ]
                    }
                ]
            },

            // ACT 5: THE FINAL CONFRONTATION (20-30 min)
            act5_finale: {
                act: 5,
                name: 'Cthulhu Rising',
                phases: [
                    {
                        id: 'cthulhu_awakens',
                        trigger: { artifacts_taken: true },
                        narrative: 'The sea trembles. Cthulhu rises from R\'lyeh\'s digital depths!',
                        cinematicArt: 'Cthulhu-Rising-2-865665388.png',
                        boss: {
                            name: 'Cthulhu, the Great Old One',
                            health: 1000,
                            phases: 3,
                            sanityDrain: true,
                            attacks: ['reality_distortion', 'cosmic_whispers', 'tentacle_grasp']
                        }
                    },
                    {
                        id: 'final_choice',
                        trigger: { cthulhu_health: '<30%' },
                        narrative: 'Cthulhu weakens. You have three paths:',
                        choices: [
                            {
                                text: 'Use Dispel Potion to banish Cthulhu',
                                requirements: { item: 'dispel_potion' },
                                ending: 'scholar_sage',
                                cinematicArt: 'pixel-art-wizard-with-staff-long-beard_885831-37581-3933412362.jpg'
                            },
                            {
                                text: 'Strike with Binding Chains',
                                requirements: { item: 'binding_chains', combat: 50 },
                                ending: 'warrior_champion',
                                cinematicArt: 'cthulu-final-fight.png'
                            },
                            {
                                text: 'Offer yourself as Cthulhu\'s servant',
                                requirements: { chaos: 5 },
                                ending: 'chaos_lord',
                                cinematicArt: 'Cthulhu-Rising-2-865665388.png'
                            },
                            {
                                text: 'Reason with Cthulhu using ancient wisdom',
                                requirements: { wisdom: 10, diplomacy: 60 },
                                ending: 'peacekeeper',
                                cinematicArt: 'pixel-art-depicting-zeldas-ocarina-time-quest_811279-39932-2541797952.jpg'
                            },
                            {
                                text: 'Sacrifice the artifacts to seal the rift',
                                requirements: { mercy: 8 },
                                ending: 'balanced_hero',
                                cinematicArt: 'pixel-art-ancient-arabic-city-desert-with-buildings-palm-trees-background-8-bit-game-ai_985124-1627-3716854050.jpg'
                            }
                        ]
                    }
                ]
            }
        };

        this.init();
    }

    init() {
        this.loadProgress();
        this.setupIntegrations();
        this.startStoryTracking();
        console.log('🎮 Master Story Integration System loaded');
    }

    loadProgress() {
        const saved = localStorage.getItem('masterStoryProgress');
        if (saved) {
            this.storyState = { ...this.storyState, ...JSON.parse(saved) };
        }
    }

    saveProgress() {
        localStorage.setItem('masterStoryProgress', JSON.stringify(this.storyState));
    }

    setupIntegrations() {
        // Integrate with existing systems
        this.integrateNPCSystem();
        this.integrateCombatSystem();
        this.integrateElementalSystem();
        this.integrateJourneyTracking();
    }

    integrateNPCSystem() {
        // Listen for NPC encounters
        window.addEventListener('npc-encountered', (e) => {
            const { npcName } = e.detail;
            if (!this.storyState.npcsMet.includes(npcName)) {
                this.storyState.npcsMet.push(npcName);
                this.checkPhaseProgress();
                this.saveProgress();
            }
        });
    }

    integrateCombatSystem() {
        window.addEventListener('combat-victory', (e) => {
            const { enemy } = e.detail;
            this.storyState.combatVictories.push(enemy);
            this.storyState.skills.combat += 5;
            this.checkPhaseProgress();
            this.saveProgress();
        });
    }

    integrateElementalSystem() {
        // Create elemental encounter system
        window.addEventListener('elemental-encounter', (e) => {
            const { elemental, location } = e.detail;
            this.startElementalBattle(elemental, location);
        });
    }

    integrateJourneyTracking() {
        // Track play time
        setInterval(() => {
            this.storyState.playTime += 1;
            this.checkPhaseProgress();
        }, 1000);

        // Track secrets found
        window.addEventListener('secret-discovered', () => {
            this.storyState.secretsFound++;
            this.checkPhaseProgress();
        });
    }

    startElementalBattle(elemental, location) {
        const elementalData = this.findElementalData(elemental);
        if (!elementalData) return;

        this.showCinematicArt(elementalData.defeatArt || 'aziza_air.jpg', () => {
            this.displayElementalChoice(elementalData);
        });
    }

    findElementalData(elementalName) {
        const act2 = this.storyArcs.act2_elementals;
        const azizaPhase = act2.phases.find(p => p.id === 'aziza_encounter');
        return azizaPhase?.quest.elementals.find(e => e.name === elementalName);
    }

    displayElementalChoice(elemental) {
        const modal = document.createElement('div');
        modal.className = 'elemental-choice-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 20000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 3px solid #00d4ff;
            border-radius: 15px;
            padding: 40px;
            max-width: 600px;
            color: #00d4ff;
            text-align: center;
        `;

        content.innerHTML = `
            <h2 style="margin-bottom: 20px; font-size: 32px; text-shadow: 0 0 10px #00d4ff;">
                ${elemental.name}
            </h2>
            <p style="font-style: italic; margin-bottom: 30px; font-size: 18px;">
                "${elemental.dialogue}"
            </p>
            <div class="elemental-choices"></div>
        `;

        const choicesDiv = content.querySelector('.elemental-choices');
        elemental.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.textContent = choice.text;
            btn.style.cssText = `
                display: block;
                width: 100%;
                margin: 10px 0;
                padding: 15px;
                background: linear-gradient(135deg, #0f3460, #16213e);
                border: 2px solid #00d4ff;
                color: #00d4ff;
                font-size: 16px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            `;

            btn.addEventListener('click', () => {
                this.handleElementalChoice(elemental, choice);
                modal.remove();
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'linear-gradient(135deg, #16213e, #0f3460)';
                btn.style.transform = 'scale(1.05)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'linear-gradient(135deg, #0f3460, #16213e)';
                btn.style.transform = 'scale(1)';
            });

            choicesDiv.appendChild(btn);
        });

        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    handleElementalChoice(elemental, choice) {
        // Apply alignment changes
        Object.entries(choice.alignment).forEach(([key, value]) => {
            if (key in this.storyState.alignment) {
                this.storyState.alignment[key] += value;
            } else if (key in this.storyState.skills) {
                this.storyState.skills[key] += value;
            }
        });

        // Mark elemental as defeated
        if (!this.storyState.elementalsDefeated.includes(elemental.name)) {
            this.storyState.elementalsDefeated.push(elemental.name);
        }

        // Show result
        const resultMessage = choice.path === 'peaceful'
            ? `You befriended the ${elemental.name}! It joins your cause.`
            : `You defeated the ${elemental.name} in combat!`;

        this.showNotification(resultMessage, 'success');

        // Show cinematic art
        this.showCinematicArt(elemental.defeatArt);

        this.saveProgress();
        this.checkPhaseProgress();
    }

    showCinematicArt(imagePath, callback) {
        const cinematic = document.createElement('div');
        cinematic.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 25000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 1s ease;
        `;

        const img = document.createElement('img');
        img.src = `assets/images/${imagePath}`;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border: 5px solid #FFD700;
            box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
            border-radius: 10px;
        `;

        cinematic.appendChild(img);
        document.body.appendChild(cinematic);

        setTimeout(() => {
            cinematic.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            cinematic.style.opacity = '0';
            setTimeout(() => {
                cinematic.remove();
                if (callback) callback();
            }, 1000);
        }, 4000);
    }

    checkPhaseProgress() {
        // Check if current phase conditions are met
        const currentArc = this.getCurrentArc();
        if (!currentArc) return;

        const currentPhase = currentArc.phases.find(p =>
            this.evaluateTrigger(p.trigger)
        );

        if (currentPhase && currentPhase.id !== this.storyState.phase) {
            this.triggerPhase(currentPhase);
        }
    }

    evaluateTrigger(trigger) {
        if (!trigger) return false;

        return Object.entries(trigger).every(([key, value]) => {
            if (key === 'visitCount') {
                return parseInt(localStorage.getItem('visit_count') || '0') >= value;
            }
            if (key === 'clicks') {
                return window.memoryPalace?.totalInteractions >= value;
            }
            if (key === 'elementalsDefeated') {
                return this.storyState.elementalsDefeated.length >= value;
            }
            if (key === 'secretsFound') {
                return this.storyState.secretsFound >= value;
            }
            if (key === 'timeSpent') {
                return this.storyState.playTime >= value;
            }
            if (this.storyState[key] === value) {
                return true;
            }
            return false;
        });
    }

    getCurrentArc() {
        return Object.values(this.storyArcs).find(arc => arc.act === this.storyState.act);
    }

    triggerPhase(phase) {
        this.storyState.phase = phase.id;
        this.saveProgress();

        if (phase.cinematicArt) {
            this.showCinematicArt(phase.cinematicArt);
        }

        if (phase.npc) {
            this.triggerNPCDialogue(phase.npc, phase.narrative);
        }

        if (phase.choices) {
            setTimeout(() => {
                this.displayChoices(phase.choices);
            }, phase.cinematicArt ? 5000 : 1000);
        }
    }

    triggerNPCDialogue(npcName, narrative) {
        const event = new CustomEvent('trigger-npc-dialogue', {
            detail: { npcName, narrative }
        });
        window.dispatchEvent(event);
    }

    displayChoices(choices) {
        if (window.rpgDialogueSystem) {
            window.rpgDialogueSystem.showChoices(choices.map(c => c.text));
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00d4ff' : '#ff6b6b'};
            color: #000;
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 16px;
            z-index: 30000;
            animation: slideIn 0.5s ease-out;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    triggerEnding(endingId) {
        const ending = this.endings[endingId];
        if (!ending) return;

        this.storyState.endingUnlocked = endingId;
        this.saveProgress();

        // Epic ending cinematic
        this.showEndingCinematic(ending);
    }

    showEndingCinematic(ending) {
        const cinematic = document.createElement('div');
        cinematic.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #000000, #1a1a2e, #000000);
            z-index: 30000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #FFD700;
            text-align: center;
            opacity: 0;
            transition: opacity 2s ease;
        `;

        cinematic.innerHTML = `
            <img src="assets/images/${ending.cinematicArt}"
                 style="max-width: 80%; max-height: 50%; border: 5px solid #FFD700;
                        box-shadow: 0 0 50px rgba(255, 215, 0, 0.5); margin-bottom: 40px;
                        border-radius: 10px;">
            <h1 style="font-size: 48px; margin-bottom: 20px; text-shadow: 0 0 20px #FFD700;">
                ${ending.name}
            </h1>
            <p style="font-size: 24px; max-width: 800px; line-height: 1.6; font-style: italic;">
                ${ending.description}
            </p>
            <div style="margin-top: 40px; font-size: 18px;">
                <p>🏆 Reward Unlocked: ${ending.reward}</p>
                <p style="margin-top: 10px; opacity: 0.8;">
                    Playtime: ${Math.floor(this.storyState.playTime / 60)} minutes
                </p>
            </div>
            <button onclick="location.reload()"
                    style="margin-top: 40px; padding: 15px 40px; background: linear-gradient(135deg, #8B4513, #DAA520);
                           border: 2px solid #FFD700; color: #FFD700; font-size: 18px; border-radius: 8px;
                           cursor: pointer; transition: all 0.3s ease;">
                Begin New Journey
            </button>
        `;

        document.body.appendChild(cinematic);
        setTimeout(() => {
            cinematic.style.opacity = '1';
        }, 100);
    }

    // Public API
    getStoryState() {
        return this.storyState;
    }

    checkEndingEligibility() {
        const eligible = [];
        Object.values(this.endings).forEach(ending => {
            if (this.meetsEndingRequirements(ending)) {
                eligible.push(ending);
            }
        });
        return eligible;
    }

    meetsEndingRequirements(ending) {
        return Object.entries(ending.requirements).every(([key, value]) => {
            if (key in this.storyState.alignment) {
                return this.storyState.alignment[key] >= value;
            }
            if (key in this.storyState.skills) {
                return this.storyState.skills[key] >= value;
            }
            if (key === 'elementalsDefeated') {
                return this.storyState.elementalsDefeated.length >= value;
            }
            if (key === 'combatVictories') {
                return this.storyState.combatVictories.length >= value;
            }
            return this.storyState[key] === value;
        });
    }

    startStoryTracking() {
        console.log('📖 Story tracking started');
        console.log('Current Act:', this.storyState.act);
        console.log('Current Phase:', this.storyState.phase);
        console.log('Playtime:', Math.floor(this.storyState.playTime / 60), 'minutes');
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.masterStory = new MasterStoryIntegration();
    });
} else {
    window.masterStory = new MasterStoryIntegration();
}
