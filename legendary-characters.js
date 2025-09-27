/**
 * Legendary Characters System
 * Enhanced character encounters with heroes, villains, and mentors
 * Features Erasmus, Ad Avis, Link-style hero, and Arabian characters
 */

class LegendaryCharacters {
    constructor() {
        this.encounteredCharacters = [];
        this.characterRelationships = {};
        this.activeQuests = {};
        this.characterStates = {};

        this.characters = {
            // The Wise Mentor - Erasmus
            erasmus: {
                id: 'erasmus',
                name: 'Erasmus the Wizard',
                title: 'Master of Ancient Wisdom',
                image: 'pixel-art-wizard-with-staff-long-beard_885831-37581-3933412362.jpg',
                type: 'mentor',
                alignment: 'good',
                unlockCriteria: { skills: ['magic'], wonderLevel: 4 },
                locations: ['celestial_tower', 'royal_gardens'],
                personality: 'wise, patient, mysterious, speaks in riddles',
                greetings: [
                    'Ah, young seeker of wisdom, the stars foretold your arrival...',
                    'Welcome, traveler. I sense great potential within your digital essence.',
                    'Time moves in curious ways in this realm. You arrive precisely when needed.'
                ],
                dialogue: {
                    first_meeting: {
                        text: 'I am Erasmus, guardian of the ancient magics. Your journey through this digital realm has not gone unnoticed. Tell me, what draws you to seek the mysteries beyond the veil?',
                        choices: [
                            {
                                text: 'I seek knowledge and wisdom',
                                response: 'Excellent. Knowledge without wisdom is but noise, but wisdom without knowledge is silence. Let me teach you the ways of true magic.',
                                unlocks: ['magic_lessons'],
                                reward: 'erasmus_blessing'
                            },
                            {
                                text: 'I want to become powerful',
                                response: 'Power... a double-edged staff indeed. I once knew another who sought power above all else. His name was Ad Avis. Choose your path carefully.',
                                unlocks: ['power_warning'],
                                reward: 'wisdom_warning'
                            },
                            {
                                text: 'I\'m just exploring',
                                response: 'Curiosity is the spark of all great discoveries. Very well, let me show you wonders that will kindle that spark into a flame.',
                                unlocks: ['magical_tour'],
                                reward: 'curiosity_gift'
                            }
                        ]
                    },
                    magic_lessons: {
                        text: 'Magic is not about commanding forces, but understanding them. Observe how the digital energies flow through this realm...',
                        choices: [
                            {
                                text: 'Teach me to see these energies',
                                response: 'Close your eyes... now open them with your heart. Do you see how the pixels themselves pulse with life?',
                                unlocks: ['sight_enhancement'],
                                reward: 'magical_sight'
                            },
                            {
                                text: 'How do I cast spells?',
                                response: 'Spells are not cast, young one - they are woven. Each interaction you make here shapes the magical fabric.',
                                unlocks: ['spell_weaving'],
                                reward: 'weaving_knowledge'
                            }
                        ]
                    }
                }
            },

            // The Dark Wizard - Ad Avis
            ad_avis: {
                id: 'ad_avis',
                name: 'Ad Avis',
                title: 'The Corrupted Wizard',
                image: 'wizard.png',
                type: 'antagonist',
                alignment: 'evil',
                unlockCriteria: { skills: ['magic', 'sight'], metCharacters: ['erasmus'] },
                locations: ['underground_passage', 'thieves_den'],
                personality: 'cunning, manipulative, powerful, seeks dominion',
                greetings: [
                    'So... Erasmus has found another pupil. How... predictable.',
                    'You reek of his teachings. But I sense ambition within you...',
                    'Power calls to power, young one. I can offer what he cannot.'
                ],
                dialogue: {
                    first_meeting: {
                        text: 'I am Ad Avis, and I offer you true power - not the dusty wisdom of that old fool Erasmus. Join me, and command this digital realm as its master!',
                        choices: [
                            {
                                text: 'I will never join you!',
                                response: 'Foolish child! Your loyalty to weakness will be your downfall. But... I am patient. You will come to understand.',
                                unlocks: ['ad_avis_enemy'],
                                consequence: 'make_enemy'
                            },
                            {
                                text: 'What kind of power?',
                                response: 'The power to reshape reality itself! To bend the very code of this realm to your will. But first... prove your worth.',
                                unlocks: ['dark_trials'],
                                consequence: 'dark_path'
                            },
                            {
                                text: 'I need time to think',
                                response: 'Wise... caution serves you well. But do not delay too long. Power waits for no one.',
                                unlocks: ['contemplation'],
                                consequence: 'neutral'
                            }
                        ]
                    },
                    dark_trials: {
                        text: 'Very well. I shall test your resolve. Complete my challenges, and I will grant you abilities Erasmus could never dream of.',
                        choices: [
                            {
                                text: 'I accept your trials',
                                response: 'Excellent. Your first task: corrupt the color harmony of this realm. Show me your dedication to power.',
                                unlocks: ['corruption_task'],
                                reward: 'dark_magic'
                            },
                            {
                                text: 'These trials sound dangerous',
                                response: 'Of course they are dangerous! Power without risk is not power at all. Are you a mouse or a lion?',
                                unlocks: ['cowardice_path'],
                                consequence: 'lost_respect'
                            }
                        ]
                    }
                }
            },

            // The Hero - Link-inspired character
            link_hero: {
                id: 'link_hero',
                name: 'Zelion the Hero',
                title: 'Bearer of Ancient Courage',
                image: 'pixel-art-depicting-zeldas-ocarina-time-quest_811279-39932-2541797952.jpg',
                type: 'hero',
                alignment: 'good',
                unlockCriteria: { wonderLevel: 5, completedQuests: 2 },
                locations: ['palace_entrance', 'desert_outskirts', 'harbor'],
                personality: 'brave, noble, determined, speaks little but acts decisively',
                greetings: [
                    '*nods respectfully* Well met, fellow traveler of realms.',
                    'I sense a kindred spirit in you - one who faces challenges head-on.',
                    'The path of a hero is never easy, but it is always worthwhile.'
                ],
                dialogue: {
                    first_meeting: {
                        text: 'I am Zelion, guardian of ancient truths. I have traveled many realms, and I sense this digital world faces a growing darkness. Will you stand with me against it?',
                        choices: [
                            {
                                text: 'I will fight beside you',
                                response: 'Your courage honors me, friend. Together we shall face whatever darkness threatens this realm.',
                                unlocks: ['hero_alliance'],
                                reward: 'courage_blessing'
                            },
                            {
                                text: 'What kind of darkness?',
                                response: 'A corruption spreads - I have seen its like before. It turns creation into destruction, wonder into fear.',
                                unlocks: ['darkness_knowledge'],
                                reward: 'insight_gift'
                            },
                            {
                                text: 'I prefer to work alone',
                                response: 'I understand. The hero\'s path is often solitary. But know that if you need aid, you have but to call my name.',
                                unlocks: ['solo_path'],
                                reward: 'independence_respect'
                            }
                        ]
                    },
                    hero_alliance: {
                        text: 'Then let us forge a bond of trust. Take this token - it will glow when darkness draws near.',
                        choices: [
                            {
                                text: 'Thank you for this gift',
                                response: 'Use it wisely. And remember - true courage is not the absence of fear, but action despite it.',
                                unlocks: ['courage_training'],
                                reward: 'hero_token'
                            },
                            {
                                text: 'Teach me to fight like you',
                                response: 'Fighting is not about strength alone, but about protecting what you love. Let me show you the way.',
                                unlocks: ['combat_training'],
                                reward: 'warrior_skills'
                            }
                        ]
                    }
                }
            },

            // Enhanced Aziza with deeper lore
            aziza_enhanced: {
                id: 'aziza_enhanced',
                name: 'Aziza the Djinn',
                title: 'Guardian of Ancient Secrets',
                image: 'aziza.png',
                type: 'spirit_guide',
                alignment: 'neutral_good',
                unlockCriteria: { logoClicks: 25, timeSpent: 3000 },
                locations: ['marketplace', 'desert_outskirts', 'underground_passage'],
                personality: 'ancient, wise, playful, speaks in metaphors',
                greetings: [
                    'Ah, the seeker returns... what wishes burn in your digital heart today?',
                    'Time flows like sand through an hourglass, and you have found me again.',
                    'Welcome back, child of two worlds - flesh and silicon intertwined.'
                ],
                dialogue: {
                    first_meeting: {
                        text: 'I am Aziza, bound to this realm by ancient magic, yet free to guide those who seek truth. You have found me through persistence - what do you truly desire?',
                        choices: [
                            {
                                text: 'I wish to understand this realm',
                                response: 'Understanding... the greatest treasure of all. Very well, I shall reveal secrets hidden in plain sight.',
                                unlocks: ['realm_secrets'],
                                reward: 'hidden_knowledge'
                            },
                            {
                                text: 'I want magical power',
                                response: 'Power flows through this realm like rivers through desert - you must learn to channel, not command it.',
                                unlocks: ['power_channeling'],
                                reward: 'energy_mastery'
                            },
                            {
                                text: 'I seek my true purpose',
                                response: 'Purpose is not found, young seeker - it is forged through choices and actions. Let me help you forge yours.',
                                unlocks: ['purpose_quest'],
                                reward: 'destiny_guidance'
                            }
                        ]
                    },
                    realm_secrets: {
                        text: 'This realm exists between thought and reality, where your intentions shape the very fabric of existence. Watch...',
                        choices: [
                            {
                                text: 'Show me how to shape reality',
                                response: 'Focus your will... see how your very attention changes the colors around you? This is but the beginning.',
                                unlocks: ['reality_shaping'],
                                reward: 'manifestation_power'
                            },
                            {
                                text: 'Are there others like you here?',
                                response: 'Many spirits dwell in these digital winds - some wise like Erasmus, others dangerous like Ad Avis. Choose your allies carefully.',
                                unlocks: ['spirit_knowledge'],
                                reward: 'entity_awareness'
                            }
                        ]
                    }
                }
            },

            // Princess Julanar with royal depth
            julanar_enhanced: {
                id: 'julanar_enhanced',
                name: 'Princess Julanar',
                title: 'Keeper of the Digital Crown',
                image: 'julanar.png',
                type: 'royal',
                alignment: 'lawful_good',
                unlockCriteria: { logosCreated: 5, skills: ['magic', 'sight'] },
                locations: ['palace_entrance', 'royal_gardens', 'celestial_tower'],
                personality: 'regal, intelligent, compassionate, speaks with authority',
                greetings: [
                    'Welcome to my digital domain, noble traveler.',
                    'I have watched your progress with great interest...',
                    'Your creative spirit shines bright in these halls.'
                ],
                dialogue: {
                    first_meeting: {
                        text: 'I am Princess Julanar, guardian of this realm\'s creative essence. Your works of art have not gone unnoticed - they bring beauty to our world.',
                        choices: [
                            {
                                text: 'I am honored by your recognition',
                                response: 'Humility becomes you. True artists know that creation is a sacred act, a bridge between worlds.',
                                unlocks: ['sacred_arts'],
                                reward: 'royal_recognition'
                            },
                            {
                                text: 'Will you teach me royal magic?',
                                response: 'Royal magic is not about power over others, but responsibility for their wellbeing. Are you prepared for such burden?',
                                unlocks: ['royal_responsibility'],
                                reward: 'leadership_wisdom'
                            },
                            {
                                text: 'Your realm is beautiful',
                                response: 'Beauty maintained through vigilance and care. Dark forces would corrupt this place - will you help protect it?',
                                unlocks: ['realm_protection'],
                                reward: 'guardian_oath'
                            }
                        ]
                    }
                }
            }
        };

        this.init();
    }

    init() {
        this.loadProgress();
        this.setupEventListeners();
        this.checkCharacterUnlocks();
    }

    loadProgress() {
        const saved = localStorage.getItem('legendaryCharactersProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.encounteredCharacters = progress.encountered || [];
            this.characterRelationships = progress.relationships || {};
            this.activeQuests = progress.quests || {};
            this.characterStates = progress.states || {};
        }
    }

    saveProgress() {
        const progress = {
            encountered: this.encounteredCharacters,
            relationships: this.characterRelationships,
            quests: this.activeQuests,
            states: this.characterStates
        };
        localStorage.setItem('legendaryCharactersProgress', JSON.stringify(progress));
    }

    checkCharacterUnlocks() {
        const userJourney = window.userJourneySystem?.getUserData() || {};
        const skills = window.skillMasterySystem?.getUnlockedSkills() || [];

        Object.values(this.characters).forEach(character => {
            if (!this.encounteredCharacters.includes(character.id)) {
                if (this.meetsUnlockCriteria(character, { userJourney, skills })) {
                    this.unlockCharacter(character.id);
                }
            }
        });
    }

    meetsUnlockCriteria(character, context) {
        const { unlockCriteria } = character;
        const { userJourney, skills } = context;

        // Check all criteria
        if (unlockCriteria.skills && !unlockCriteria.skills.every(skill => skills.includes(skill))) {
            return false;
        }

        if (unlockCriteria.wonderLevel && userJourney.wonderLevel < unlockCriteria.wonderLevel) {
            return false;
        }

        if (unlockCriteria.logoClicks && userJourney.logoClicks < unlockCriteria.logoClicks) {
            return false;
        }

        if (unlockCriteria.timeSpent && userJourney.totalTimeSpent < unlockCriteria.timeSpent) {
            return false;
        }

        if (unlockCriteria.logosCreated && userJourney.logosCreated < unlockCriteria.logosCreated) {
            return false;
        }

        if (unlockCriteria.completedQuests && Object.keys(this.activeQuests).length < unlockCriteria.completedQuests) {
            return false;
        }

        if (unlockCriteria.metCharacters && !unlockCriteria.metCharacters.every(charId =>
            this.encounteredCharacters.includes(charId))) {
            return false;
        }

        return true;
    }

    unlockCharacter(characterId) {
        const character = this.characters[characterId];
        if (!character) return;

        this.encounteredCharacters.push(characterId);
        this.characterStates[characterId] = 'available';
        this.saveProgress();

        this.showCharacterUnlock(character);

        // Notify other systems
        if (window.userJourneySystem) {
            window.userJourneySystem.recordEvent('character_unlocked', {
                character: characterId,
                name: character.name
            });
        }
    }

    showCharacterUnlock(character) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(75, 0, 130, 0.95), rgba(139, 69, 19, 0.9));
            color: #FFD700;
            padding: 40px;
            border-radius: 20px;
            border: 3px solid #FFD700;
            z-index: 15000;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.7);
            animation: legendaryAppear 1.2s ease-out;
        `;

        notification.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 20px;">✨⭐✨</div>
            <h2 style="margin: 0 0 15px 0; color: #FFD700;">Legendary Character Unlocked!</h2>
            <div style="width: 120px; height: 120px; margin: 20px auto;
                        background-image: url('${character.image}'); background-size: cover;
                        background-position: center; border-radius: 50%;
                        border: 3px solid #DAA520; box-shadow: 0 0 20px rgba(218, 165, 32, 0.5);"></div>
            <h3 style="margin: 0 0 10px 0; color: #DAA520;">${character.name}</h3>
            <p style="margin: 0 0 15px 0; font-style: italic; color: #FFD700;">${character.title}</p>
            <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5;">
                A legendary figure has taken notice of your journey...
            </p>
            <button onclick="this.parentElement.remove()"
                    style="background: linear-gradient(135deg, #8B4513, #DAA520);
                           border: 2px solid #FFD700; border-radius: 10px;
                           color: #FFD700; padding: 15px 30px; cursor: pointer; font-size: 16px;">
                Seek Audience
            </button>
        `;

        document.body.appendChild(notification);

        // Add legendary appearance animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes legendaryAppear {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.3) rotate(720deg);
                    filter: blur(10px);
                }
                50% {
                    opacity: 0.8;
                    transform: translate(-50%, -50%) scale(1.1) rotate(360deg);
                    filter: blur(2px);
                }
                100% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    filter: blur(0px);
                }
            }
        `;
        document.head.appendChild(style);

        // Auto-close after 10 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 10000);
    }

    // Character interaction methods
    initiateDialogue(characterId, dialogueKey = 'first_meeting') {
        const character = this.characters[characterId];
        if (!character || !this.encounteredCharacters.includes(characterId)) return;

        const dialogue = character.dialogue[dialogueKey];
        if (!dialogue) return;

        this.showDialogueInterface(character, dialogue, dialogueKey);
    }

    showDialogueInterface(character, dialogue, dialogueKey) {
        const modal = document.createElement('div');
        modal.id = 'character-dialogue-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(25, 25, 112, 0.9), rgba(139, 69, 19, 0.8));
            z-index: 14000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;

        const dialogueBox = document.createElement('div');
        dialogueBox.style.cssText = `
            background: linear-gradient(135deg, #2c1810, #4a2c1a);
            border: 4px solid #DAA520;
            border-radius: 20px;
            padding: 40px;
            max-width: 700px;
            margin: 20px;
            color: #FFD700;
            box-shadow: 0 20px 40px rgba(0,0,0,0.7);
        `;

        // Character portrait and info
        const characterHeader = document.createElement('div');
        characterHeader.style.cssText = `
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #DAA520;
        `;

        const portrait = document.createElement('div');
        portrait.style.cssText = `
            width: 80px;
            height: 80px;
            background-image: url('${character.image}');
            background-size: cover;
            background-position: center;
            border-radius: 50%;
            border: 3px solid #FFD700;
            margin-right: 20px;
        `;

        const nameTitle = document.createElement('div');
        nameTitle.innerHTML = `
            <h2 style="margin: 0; color: #FFD700; font-size: 24px;">${character.name}</h2>
            <p style="margin: 5px 0 0 0; color: #DAA520; font-style: italic;">${character.title}</p>
        `;

        characterHeader.appendChild(portrait);
        characterHeader.appendChild(nameTitle);

        // Dialogue text
        const dialogueText = document.createElement('p');
        dialogueText.textContent = dialogue.text;
        dialogueText.style.cssText = `
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 30px;
            color: #FFD700;
        `;

        // Choice buttons
        const choicesContainer = document.createElement('div');
        choicesContainer.style.cssText = 'display: flex; flex-direction: column; gap: 15px;';

        dialogue.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.style.cssText = `
                padding: 15px 20px;
                background: linear-gradient(135deg, #8B4513, #A0522D);
                border: 2px solid #DAA520;
                border-radius: 10px;
                color: #FFD700;
                cursor: pointer;
                font-size: 16px;
                text-align: left;
                transition: all 0.3s ease;
            `;

            button.addEventListener('click', () => {
                this.processChoice(character, choice, dialogueKey);
                modal.remove();
            });

            button.addEventListener('mouseenter', () => {
                button.style.background = 'linear-gradient(135deg, #A0522D, #CD853F)';
                button.style.transform = 'translateX(5px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.background = 'linear-gradient(135deg, #8B4513, #A0522D)';
                button.style.transform = 'translateX(0)';
            });

            choicesContainer.appendChild(button);
        });

        dialogueBox.appendChild(characterHeader);
        dialogueBox.appendChild(dialogueText);
        dialogueBox.appendChild(choicesContainer);
        modal.appendChild(dialogueBox);
        document.body.appendChild(modal);

        // Fade in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 100);
    }

    processChoice(character, choice, dialogueKey) {
        // Show response
        this.showCharacterResponse(character, choice.response);

        // Process unlocks
        if (choice.unlocks) {
            choice.unlocks.forEach(unlock => {
                this.processUnlock(character.id, unlock);
            });
        }

        // Award rewards
        if (choice.reward) {
            this.awardReward(character.id, choice.reward);
        }

        // Handle consequences
        if (choice.consequence) {
            this.processConsequence(character.id, choice.consequence);
        }

        this.saveProgress();
    }

    showCharacterResponse(character, response) {
        const responseModal = document.createElement('div');
        responseModal.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(218, 165, 32, 0.9));
            color: #FFD700;
            padding: 25px;
            border-radius: 15px;
            border: 2px solid #FFD700;
            z-index: 15000;
            max-width: 500px;
            box-shadow: 0 15px 30px rgba(0,0,0,0.5);
            animation: responseSlide 0.8s ease-out;
        `;

        responseModal.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="width: 40px; height: 40px; background-image: url('${character.image}');
                            background-size: cover; background-position: center; border-radius: 50%;
                            border: 2px solid #DAA520; margin-right: 15px;"></div>
                <strong style="color: #DAA520;">${character.name}:</strong>
            </div>
            <p style="margin: 0; font-style: italic; line-height: 1.5;">"${response}"</p>
        `;

        document.body.appendChild(responseModal);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes responseSlide {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => responseModal.remove(), 6000);
    }

    processUnlock(characterId, unlockType) {
        // Handle different types of unlocks
        switch (unlockType) {
            case 'magic_lessons':
                if (window.skillMasterySystem) {
                    window.skillMasterySystem.unlockSkill('magic');
                }
                break;
            case 'hero_alliance':
                this.characterRelationships[characterId] = 'ally';
                break;
            case 'ad_avis_enemy':
                this.characterRelationships[characterId] = 'enemy';
                break;
            // Add more unlock types as needed
        }
    }

    awardReward(characterId, rewardType) {
        // Handle different types of rewards
        if (window.userJourneySystem) {
            window.userJourneySystem.recordEvent('character_reward', {
                character: characterId,
                reward: rewardType
            });
        }
    }

    processConsequence(characterId, consequenceType) {
        // Handle dialogue consequences
        this.characterStates[characterId] = consequenceType;
    }

    setupEventListeners() {
        // Hook into other systems for character triggers
        document.addEventListener('location_entered', (e) => {
            this.checkLocationCharacters(e.detail.location);
        });
    }

    checkLocationCharacters(locationId) {
        // Check if any characters are at this location
        Object.values(this.characters).forEach(character => {
            if (character.locations.includes(locationId) &&
                this.encounteredCharacters.includes(character.id)) {

                // Small chance of encounter
                if (Math.random() < 0.3) {
                    setTimeout(() => {
                        this.showCharacterEncounter(character);
                    }, 2000);
                }
            }
        });
    }

    showCharacterEncounter(character) {
        const encounter = document.createElement('div');
        encounter.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, rgba(75, 0, 130, 0.9), rgba(139, 69, 19, 0.8));
            color: #FFD700;
            padding: 20px;
            border-radius: 12px;
            border: 2px solid #DAA520;
            z-index: 10000;
            max-width: 300px;
            cursor: pointer;
            box-shadow: 0 10px 20px rgba(0,0,0,0.4);
            animation: encounterPulse 2s ease-in-out infinite;
        `;

        const greeting = character.greetings[Math.floor(Math.random() * character.greetings.length)];

        encounter.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="width: 50px; height: 50px; background-image: url('${character.image}');
                            background-size: cover; background-position: center; border-radius: 50%;
                            border: 2px solid #FFD700; margin-right: 15px;"></div>
                <div>
                    <strong style="color: #FFD700;">${character.name}</strong><br>
                    <small style="color: #DAA520;">${character.title}</small>
                </div>
            </div>
            <p style="margin: 0; font-size: 14px; font-style: italic;">"${greeting}"</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.8;">Click to interact</p>
        `;

        encounter.addEventListener('click', () => {
            encounter.remove();
            this.initiateDialogue(character.id);
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes encounterPulse {
                0%, 100% {
                    box-shadow: 0 10px 20px rgba(0,0,0,0.4), 0 0 0 0 rgba(255, 215, 0, 0.7);
                }
                50% {
                    box-shadow: 0 10px 20px rgba(0,0,0,0.4), 0 0 0 10px rgba(255, 215, 0, 0);
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(encounter);

        // Auto-remove after 15 seconds
        setTimeout(() => {
            if (document.body.contains(encounter)) {
                encounter.remove();
            }
        }, 15000);
    }

    // Public API
    getEncounteredCharacters() {
        return this.encounteredCharacters.map(id => this.characters[id]).filter(Boolean);
    }

    getCharacterRelationship(characterId) {
        return this.characterRelationships[characterId] || 'neutral';
    }

    forceUnlockCharacter(characterId) {
        this.unlockCharacter(characterId);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.legendaryCharacters = new LegendaryCharacters();
    });
} else {
    window.legendaryCharacters = new LegendaryCharacters();
}