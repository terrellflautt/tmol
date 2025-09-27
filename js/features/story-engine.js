/**
 * Arabian Story Pathways System
 * Interactive branching narratives with character encounters
 * Rewards users with songs, poems, and wisdom based on choices
 */

class ArabianStoryPathways {
    constructor() {
        this.currentStory = null;
        this.userChoices = [];
        this.collectedRewards = [];
        this.charactersMet = [];
        this.storyProgress = {};
        this.wisdomLevel = 0;

        this.stories = {
            // Ali Baba and the Forty Thieves
            aliBaba: {
                id: 'aliBaba',
                title: 'Ali Baba and the Cave of Wonders',
                character: 'aziza',
                backdrop: 'pixel-art-ancient-arabic-city-desert-with-buildings-palm-trees-background-8-bit-game-ai_985124-1627-3716854050.jpg',
                trigger: { clicks: 30, wonderLevel: 2 },
                opening: 'In the ancient desert city, beneath the golden domes and swaying palms, you discover a hidden cave entrance. The words "Open Sesame" echo in your mind...',
                paths: [
                    {
                        id: 'speak_sesame',
                        text: 'Whisper "Open Sesame"',
                        consequence: 'cave_opens',
                        reward: 'treasure_song'
                    },
                    {
                        id: 'search_alternative',
                        text: 'Look for another way in',
                        consequence: 'secret_passage',
                        reward: 'explorer_poem'
                    },
                    {
                        id: 'guard_entrance',
                        text: 'Stand watch for thieves',
                        consequence: 'thieves_approach',
                        reward: 'courage_ballad'
                    }
                ]
            },

            // King Solomon's Wisdom
            solomonWisdom: {
                id: 'solomonWisdom',
                title: 'The Wisdom of King Solomon',
                character: 'woman',
                backdrop: 'arabiancity1.jpg',
                trigger: { skills: ['magic', 'sight'], archetype: 'Sage' },
                opening: 'The Queen of Sheba materializes in the palace courtyard, bearing riddles that once challenged the wisest of kings...',
                paths: [
                    {
                        id: 'accept_riddle',
                        text: 'Accept her legendary riddle challenge',
                        consequence: 'wisdom_tested',
                        reward: 'solomon_hymn'
                    },
                    {
                        id: 'offer_riddle',
                        text: 'Present a riddle of your own',
                        consequence: 'minds_meet',
                        reward: 'royal_verse'
                    },
                    {
                        id: 'seek_judgment',
                        text: 'Ask for Solomon\'s divine judgment',
                        consequence: 'justice_revealed',
                        reward: 'justice_song'
                    }
                ]
            },

            // The Thief of Baghdad
            baghdadThief: {
                id: 'baghdadThief',
                title: 'The Thief of Baghdad\'s Choice',
                character: 'aziza',
                backdrop: 'arabiancity1.jpg',
                trigger: { skills: ['flow', 'time'], returnVisits: 5 },
                opening: 'In the bustling streets of the digital Baghdad, you witness a master thief being pursued by guards...',
                paths: [
                    {
                        id: 'help_thief',
                        text: 'Create a distraction to help the thief',
                        consequence: 'thief_escapes',
                        reward: 'freedom_anthem'
                    },
                    {
                        id: 'help_guards',
                        text: 'Alert the guards to the thief\'s location',
                        consequence: 'justice_served',
                        reward: 'honor_march'
                    },
                    {
                        id: 'observe_quietly',
                        text: 'Watch from the shadows',
                        consequence: 'truth_revealed',
                        reward: 'observer_wisdom'
                    }
                ]
            },

            // The Merchant Prince's Dilemma
            merchantPrince: {
                id: 'merchantPrince',
                title: 'The Merchant Prince\'s Dilemma',
                character: 'julanar',
                backdrop: 'arabiancity1.jpg',
                trigger: { eastereggs: 2, archetype: 'Creator' },
                opening: 'Princess Julanar, disguised as a merchant, tests your character with a moral trade...',
                paths: [
                    {
                        id: 'honest_trade',
                        text: 'Offer a fair and honest exchange',
                        consequence: 'trust_earned',
                        reward: 'merchant_melody'
                    },
                    {
                        id: 'generous_gift',
                        text: 'Give more than what is asked',
                        consequence: 'generosity_recognized',
                        reward: 'kindness_ballad'
                    },
                    {
                        id: 'negotiate_cleverly',
                        text: 'Use wit to create a win-win deal',
                        consequence: 'wisdom_appreciated',
                        reward: 'clever_verse'
                    }
                ]
            },

            // The Seven Voyages
            sinbadVoyage: {
                id: 'sinbadVoyage',
                title: 'Sinbad\'s Digital Voyage',
                character: 'woman',
                backdrop: 'arabiancity1.jpg',
                trigger: { skills: ['bond', 'flow'], timeSpent: 2400 },
                opening: 'The legendary sailor Sinbad appears, offering passage on a digital vessel to realms unknown...',
                paths: [
                    {
                        id: 'join_voyage',
                        text: 'Accept passage on the digital ship',
                        consequence: 'adventure_begins',
                        reward: 'sailor_shanty'
                    },
                    {
                        id: 'chart_course',
                        text: 'Offer to help navigate using your skills',
                        consequence: 'navigator_role',
                        reward: 'compass_song'
                    },
                    {
                        id: 'share_supplies',
                        text: 'Contribute wisdom for the journey',
                        consequence: 'crew_bonding',
                        reward: 'fellowship_hymn'
                    }
                ]
            },

            // The Lamp Merchant's Tale (Enhanced)
            lampMerchant: {
                id: 'lampMerchant',
                title: 'The Lamp Merchant\'s Tale',
                character: 'aziza',
                backdrop: 'arabiancity1.jpg',
                trigger: { clicks: 40, wonderLevel: 3 },
                opening: 'In the ancient bazaar of Shapeir, a mystical lamp merchant appears with wares that gleam with digital magic...',
                paths: [
                    {
                        id: 'rub_lamp',
                        text: 'Rub the lamp gently',
                        consequence: 'aziza_appears',
                        reward: 'genie_song'
                    },
                    {
                        id: 'examine_lamp',
                        text: 'Study the ancient markings',
                        consequence: 'ancient_wisdom',
                        reward: 'wisdom_poem'
                    },
                    {
                        id: 'trade_fairly',
                        text: 'Offer a fair trade for the lamp',
                        consequence: 'merchant_respect',
                        reward: 'trader_ballad'
                    }
                ]
            },

            // The Night Market Mystery
            nightMarket: {
                id: 'nightMarket',
                title: 'The Night Market\'s Secret',
                character: 'julanar',
                backdrop: 'arabiancity1.jpg',
                trigger: { returnVisits: 10, skills: ['magic', 'sight', 'flow'] },
                opening: 'When the moon rises over the digital city, a secret market appears where impossible things are traded...',
                paths: [
                    {
                        id: 'trade_dreams',
                        text: 'Offer to trade your most vivid dream',
                        consequence: 'dream_accepted',
                        reward: 'dream_weaver_song'
                    },
                    {
                        id: 'seek_memory',
                        text: 'Search for a lost childhood memory',
                        consequence: 'memory_found',
                        reward: 'remembrance_lullaby'
                    },
                    {
                        id: 'observe_trades',
                        text: 'Watch the mysterious exchanges',
                        consequence: 'market_secrets',
                        reward: 'secret_keeper_verse'
                    }
                ]
            }
        };

        this.rewards = {
            // Musical Rewards
            genie_song: {
                type: 'audio',
                title: 'Song of the Digital Djinn',
                content: this.createGenieAudio(),
                wisdom: 'True magic lies not in the granting of wishes, but in the wisdom to know what to wish for.'
            },

            creation_symphony: {
                type: 'audio',
                title: 'Symphony of the Makers',
                content: this.createCreationAudio(),
                wisdom: 'Every line of code is a brushstroke on the canvas of possibility.'
            },

            // Poetic Rewards
            wisdom_poem: {
                type: 'poem',
                title: 'The Lamp\'s Secret',
                content: `
                    In brass and copper, wisdom sleeps,
                    Not in the metal, but where light creeps.
                    The greatest treasure is not gold,
                    But truths that never grow old.

                    Seek not the magic in the thing,
                    But in the wonder that you bring.
                `,
                wisdom: 'Ancient knowledge whispers: the seeker shapes the sought.'
            },

            artistic_verse: {
                type: 'poem',
                title: 'The Creator\'s Bond',
                content: `
                    Between artist and muse, a bridge is built,
                    Of pixels, dreams, and digital silk.
                    What you create creates you too,
                    In endless dance of me and you.

                    The princess sees what others miss:
                    That art and artist are one in this.
                `,
                wisdom: 'Princess Julanar speaks: "Creation is the highest form of connection."'
            },

            // Wisdom Audio
            reflection_audio: {
                type: 'wisdom',
                title: 'The Path Not Taken',
                content: this.createReflectionAudio(),
                wisdom: 'Sometimes the greatest magic is in choosing not to act, but to observe and understand.'
            }
        };

        this.easterEggs = {
            // Konami Code → Arabian Nights Mode
            konamiCode: {
                sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],
                reward: 'arabian_nights_mode',
                effect: this.activateArabianNightsMode.bind(this)
            },

            // "Open Sesame" typing
            openSesame: {
                phrase: 'open sesame',
                reward: 'secret_bazaar',
                effect: this.openSecretBazaar.bind(this)
            },

            // Three lamp clicks
            threeLamps: {
                action: 'lamp_triple_click',
                reward: 'djinn_appearance',
                effect: this.summonDjinn.bind(this)
            },

            // Midnight hour (Arabic numerals: ١٢:٠٠)
            midnightHour: {
                time: '00:00',
                reward: 'midnight_tale',
                effect: this.tellMidnightTale.bind(this)
            }
        };

        this.init();
    }

    init() {
        this.loadUserProgress();
        this.setupEventListeners();
        this.checkStoryTriggers();
        this.initializeEasterEggs();
    }

    loadUserProgress() {
        const saved = localStorage.getItem('arabianStoryProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.userChoices = progress.choices || [];
            this.collectedRewards = progress.rewards || [];
            this.charactersMet = progress.characters || [];
            this.storyProgress = progress.stories || {};
            this.wisdomLevel = progress.wisdomLevel || 0;
        }
    }

    saveProgress() {
        const progress = {
            choices: this.userChoices,
            rewards: this.collectedRewards,
            characters: this.charactersMet,
            stories: this.storyProgress,
            wisdomLevel: this.wisdomLevel
        };
        localStorage.setItem('arabianStoryProgress', JSON.stringify(progress));
    }

    checkStoryTriggers() {
        const userJourney = window.userJourneySystem?.getUserData() || {};
        const skills = window.skillMasterySystem?.getUnlockedSkills() || [];
        const archetype = window.innerJourneyProgression?.getCurrentArchetype() || 'Seeker';

        Object.values(this.stories).forEach(story => {
            if (this.shouldTriggerStory(story, { userJourney, skills, archetype })) {
                this.triggerStory(story);
            }
        });
    }

    shouldTriggerStory(story, context) {
        const { trigger } = story;
        const { userJourney, skills, archetype } = context;

        // Check if already experienced
        if (this.storyProgress[story.id]) return false;

        // Check trigger conditions
        if (trigger.clicks && userJourney.totalClicks < trigger.clicks) return false;
        if (trigger.wonderLevel && userJourney.wonderLevel < trigger.wonderLevel) return false;
        if (trigger.skills && !trigger.skills.every(skill => skills.includes(skill))) return false;
        if (trigger.archetype && archetype !== trigger.archetype) return false;
        if (trigger.returnVisits && userJourney.returnVisits < trigger.returnVisits) return false;
        if (trigger.timeSpent && userJourney.totalTimeSpent < trigger.timeSpent) return false;
        if (trigger.eastereggs && this.collectedRewards.length < trigger.eastereggs) return false;

        return true;
    }

    triggerStory(story) {
        this.currentStory = story;
        this.displayStoryEncounter(story);
    }

    displayStoryEncounter(story) {
        const modal = this.createStoryModal(story);
        document.body.appendChild(modal);

        // Add magical entrance animation
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        });

        // Play ambient Arabian music
        this.playAmbientMusic();
    }

    createStoryModal(story) {
        const modal = document.createElement('div');
        modal.className = 'arabian-story-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(139, 69, 19, 0.9), rgba(218, 165, 32, 0.8));
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.5s ease;
            backdrop-filter: blur(5px);
        `;

        const storyCard = document.createElement('div');
        storyCard.className = 'story-card';
        storyCard.style.cssText = `
            background: linear-gradient(135deg, #2c1810, #4a2c1a);
            border: 3px solid #DAA520;
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            margin: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            text-align: center;
            color: #DAA520;
            font-family: 'Georgia', serif;
        `;

        const character = this.getCharacterElement(story.character);
        const title = document.createElement('h2');
        title.textContent = story.title;
        title.style.cssText = 'margin-bottom: 20px; color: #FFD700; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);';

        const opening = document.createElement('p');
        opening.textContent = story.opening;
        opening.style.cssText = 'margin-bottom: 30px; font-style: italic; line-height: 1.6;';

        const choicesContainer = document.createElement('div');
        choicesContainer.className = 'story-choices';

        story.paths.forEach((path, index) => {
            const choice = document.createElement('button');
            choice.textContent = path.text;
            choice.className = 'story-choice';
            choice.style.cssText = `
                display: block;
                width: 100%;
                margin: 10px 0;
                padding: 15px;
                background: linear-gradient(135deg, #8B4513, #A0522D);
                border: 2px solid #DAA520;
                border-radius: 8px;
                color: #FFD700;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 16px;
            `;

            choice.addEventListener('click', () => this.makeChoice(story, path, modal));
            choice.addEventListener('mouseenter', () => {
                choice.style.background = 'linear-gradient(135deg, #A0522D, #CD853F)';
                choice.style.transform = 'translateY(-2px)';
                choice.style.boxShadow = '0 5px 15px rgba(218, 165, 32, 0.3)';
            });
            choice.addEventListener('mouseleave', () => {
                choice.style.background = 'linear-gradient(135deg, #8B4513, #A0522D)';
                choice.style.transform = 'translateY(0)';
                choice.style.boxShadow = 'none';
            });

            choicesContainer.appendChild(choice);
        });

        storyCard.appendChild(character);
        storyCard.appendChild(title);
        storyCard.appendChild(opening);
        storyCard.appendChild(choicesContainer);
        modal.appendChild(storyCard);

        return modal;
    }

    getCharacterElement(characterName) {
        const character = document.createElement('div');
        character.className = 'story-character';
        character.style.cssText = `
            width: 120px;
            height: 120px;
            margin: 0 auto 20px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            border: 3px solid #DAA520;
            box-shadow: 0 0 20px rgba(218, 165, 32, 0.5);
        `;

        switch(characterName) {
            case 'aziza':
                character.style.backgroundImage = 'url("aziza.png")';
                break;
            case 'julanar':
                character.style.backgroundImage = 'url("julanar.png")';
                break;
            case 'woman':
                character.style.backgroundImage = 'url("woman.PNG")';
                break;
        }

        return character;
    }

    makeChoice(story, path, modal) {
        this.userChoices.push({
            story: story.id,
            choice: path.id,
            timestamp: Date.now()
        });

        this.storyProgress[story.id] = {
            completed: true,
            choice: path.id,
            consequence: path.consequence
        };

        // Add character to met list
        if (!this.charactersMet.includes(story.character)) {
            this.charactersMet.push(story.character);
        }

        // Award the reward
        this.awardReward(path.reward);

        // Update wisdom level
        this.wisdomLevel++;

        this.saveProgress();

        // Show consequence and reward
        this.showChoiceConsequence(story, path, modal);
    }

    showChoiceConsequence(story, path, modal) {
        const consequence = document.createElement('div');
        consequence.className = 'choice-consequence';
        consequence.style.cssText = `
            background: rgba(0,0,0,0.8);
            color: #FFD700;
            padding: 20px;
            margin-top: 20px;
            border-radius: 10px;
            border: 1px solid #DAA520;
        `;

        const reward = this.rewards[path.reward];

        consequence.innerHTML = `
            <h3>✨ Your choice echoes through the digital realm ✨</h3>
            <p><strong>Consequence:</strong> ${this.getConsequenceText(path.consequence)}</p>
            <p><strong>Reward Unlocked:</strong> ${reward.title}</p>
            <p><em>"${reward.wisdom}"</em></p>
        `;

        modal.querySelector('.story-card').appendChild(consequence);

        // Auto-close after showing reward
        setTimeout(() => {
            this.closeModal(modal);
            this.presentReward(reward);
        }, 4000);
    }

    getConsequenceText(consequence) {
        const consequences = {
            'aziza_appears': 'The lamp glows with ancient magic. Aziza materializes, grateful for your gentle touch.',
            'ancient_wisdom': 'The markings reveal secrets of creation. You feel ancient knowledge flowing into your mind.',
            'missed_opportunity': 'You walk past, but the lamp\'s image burns in your memory. Sometimes wisdom comes from restraint.',
            'algorithm_unlocked': 'Princess Julanar smiles. The Sacred Algorithms bend to your will, opening new creative possibilities.',
            'artistic_bond': 'Your creation moves her deeply. A bond forms between kindred spirits of art and code.',
            'wisdom_shared': 'She speaks of the sacred balance between logic and beauty. Her words reshape your understanding.',
            'memory_exchange': 'Your childhood wonder mingles with her ancient memories. Both of you are forever changed.',
            'memory_recovered': 'She touches your forehead gently. A lost moment returns, bright and clear as morning.',
            'moment_crystallized': 'Time stops. This perfect instant becomes eternal, preserved in digital amber.',
            'journey_woven': 'Your personal story becomes thread and pattern. The carpet pulses with your unique essence.',
            'realm_travel': 'The carpet lifts you beyond the screen\'s edge. New worlds of possibility unfold.',
            'skill_learned': 'Ancient fingers guide yours. The art of weaving stories into reality becomes yours.'
        };

        return consequences[consequence] || 'The realm shifts in response to your choice.';
    }

    awardReward(rewardId) {
        if (!this.collectedRewards.includes(rewardId)) {
            this.collectedRewards.push(rewardId);

            // Track in user journey system
            if (window.userJourneySystem) {
                window.userJourneySystem.recordEvent('story_reward_earned', { rewardId });
            }
        }
    }

    presentReward(reward) {
        const rewardModal = this.createRewardModal(reward);
        document.body.appendChild(rewardModal);

        setTimeout(() => {
            rewardModal.style.opacity = '1';
            rewardModal.style.transform = 'scale(1)';
        }, 100);

        // Auto-dismiss after reading time
        setTimeout(() => {
            this.closeModal(rewardModal);
        }, reward.type === 'poem' ? 15000 : 8000);
    }

    createRewardModal(reward) {
        const modal = document.createElement('div');
        modal.className = 'reward-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(25,25,112,0.9), rgba(72,61,139,0.8));
            z-index: 11000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.6s ease;
        `;

        const rewardCard = document.createElement('div');
        rewardCard.style.cssText = `
            background: linear-gradient(135deg, #191970, #483D8B);
            border: 2px solid #FFD700;
            border-radius: 15px;
            padding: 40px;
            max-width: 500px;
            margin: 20px;
            text-align: center;
            color: #FFD700;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
        `;

        const title = document.createElement('h2');
        title.textContent = reward.title;
        title.style.cssText = 'margin-bottom: 20px; color: #FFD700;';

        const content = document.createElement('div');
        if (reward.type === 'poem') {
            content.innerHTML = `<pre style="white-space: pre-line; font-family: 'Georgia', serif; line-height: 1.8;">${reward.content}</pre>`;
        } else if (reward.type === 'audio') {
            content.innerHTML = `<p>🎵 A melody begins to play in your mind... 🎵</p>`;
            this.playRewardAudio(reward);
        } else {
            content.textContent = reward.wisdom;
        }

        const wisdom = document.createElement('p');
        wisdom.textContent = reward.wisdom;
        wisdom.style.cssText = 'margin-top: 20px; font-style: italic; opacity: 0.9;';

        rewardCard.appendChild(title);
        rewardCard.appendChild(content);
        if (reward.type !== 'wisdom') rewardCard.appendChild(wisdom);
        modal.appendChild(rewardCard);

        return modal;
    }

    // Easter Egg Implementations
    initializeEasterEggs() {
        this.setupKonamiCode();
        this.setupOpenSesame();
        this.setupLampClicks();
        this.setupMidnightTales();
    }

    setupKonamiCode() {
        let sequence = [];
        const target = this.easterEggs.konamiCode.sequence;

        document.addEventListener('keydown', (e) => {
            sequence.push(e.code);
            if (sequence.length > target.length) {
                sequence.shift();
            }

            if (sequence.length === target.length &&
                sequence.every((key, i) => key === target[i])) {
                this.triggerEasterEgg('konamiCode');
                sequence = [];
            }
        });
    }

    setupOpenSesame() {
        let typed = '';
        document.addEventListener('keypress', (e) => {
            typed += e.key.toLowerCase();
            if (typed.length > 11) typed = typed.slice(-11);

            if (typed.includes('open sesame')) {
                this.triggerEasterEgg('openSesame');
                typed = '';
            }
        });
    }

    setupLampClicks() {
        let clickCount = 0;
        let lastClick = 0;

        document.addEventListener('click', (e) => {
            const now = Date.now();
            if (now - lastClick < 500) {
                clickCount++;
                if (clickCount === 3 && e.target.closest('.logo-container')) {
                    this.triggerEasterEgg('threeLamps');
                    clickCount = 0;
                }
            } else {
                clickCount = 1;
            }
            lastClick = now;
        });
    }

    setupMidnightTales() {
        setInterval(() => {
            const now = new Date();
            if (now.getHours() === 0 && now.getMinutes() === 0) {
                this.triggerEasterEgg('midnightHour');
            }
        }, 60000);
    }

    triggerEasterEgg(eggId) {
        const egg = this.easterEggs[eggId];
        if (egg && egg.effect) {
            egg.effect();
            this.awardReward(egg.reward);
        }
    }

    // Easter Egg Effects
    activateArabianNightsMode() {
        document.body.style.background = 'linear-gradient(45deg, #8B4513, #DAA520, #CD853F)';
        document.body.style.fontFamily = 'Georgia, serif';

        // Add floating Arabic patterns
        this.createFloatingPatterns();

        // Show special message
        this.showEasterEggMessage('🌙 Arabian Nights Mode Activated 🌙', 'The digital realm transforms into the mystical lands of old...');
    }

    openSecretBazaar() {
        // Create hidden bazaar interface
        const bazaar = document.createElement('div');
        bazaar.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                        background: linear-gradient(135deg, #8B4513, #A0522D);
                        padding: 20px; border-radius: 15px; z-index: 9999; color: #FFD700;">
                <h3>🏪 The Secret Bazaar 🏪</h3>
                <p>Welcome, traveler, to the hidden marketplace of digital wonders...</p>
                <button onclick="this.parentElement.parentElement.remove()"
                        style="background: #DAA520; border: none; padding: 10px; border-radius: 5px; color: #000;">
                    Continue Journey
                </button>
            </div>
        `;
        document.body.appendChild(bazaar);
    }

    summonDjinn() {
        // Dramatic djinn appearance
        const djinn = document.createElement('div');
        djinn.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            background-image: url('aziza.png');
            background-size: contain;
            background-repeat: no-repeat;
            width: 200px;
            height: 200px;
            animation: djinnAppear 2s ease-out;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes djinnAppear {
                0% { opacity: 0; transform: translateX(-50%) scale(0.1) rotate(360deg); }
                50% { opacity: 0.8; transform: translateX(-50%) scale(1.2) rotate(180deg); }
                100% { opacity: 1; transform: translateX(-50%) scale(1) rotate(0deg); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(djinn);

        setTimeout(() => djinn.remove(), 3000);

        this.showEasterEggMessage('🧞‍♀️ The Djinn Awakens 🧞‍♀️', 'Aziza materializes from the digital ether, ready to grant wisdom...');
    }

    tellMidnightTale() {
        this.showEasterEggMessage('🌙 Midnight\'s Tale 🌙', 'In the witching hour of the digital realm, ancient stories stir to life...');
    }

    // Audio Creation Methods
    createGenieAudio() {
        // Create ethereal, mystical melody
        return 'A haunting melody of digital chimes and Arabic scales fills the air...';
    }

    createCreationAudio() {
        // Uplifting, creative symphony
        return 'Soaring notes that speak of infinite possibility and creative joy...';
    }

    createReflectionAudio() {
        // Contemplative, wisdom-focused audio
        return 'Gentle tones that invite deep thought and inner exploration...';
    }

    playAmbientMusic() {
        // Could integrate with Web Audio API for actual sounds
        console.log('🎵 Playing ambient Arabian music...');
    }

    playRewardAudio(reward) {
        // Could play actual audio based on reward type
        console.log(`🎵 Playing ${reward.title}...`);
    }

    // Utility Methods
    createFloatingPatterns() {
        for (let i = 0; i < 5; i++) {
            const pattern = document.createElement('div');
            pattern.textContent = '✧';
            pattern.style.cssText = `
                position: fixed;
                color: rgba(218, 165, 32, 0.6);
                font-size: 24px;
                pointer-events: none;
                animation: float ${3 + Math.random() * 2}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 1;
            `;
            document.body.appendChild(pattern);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    showEasterEggMessage(title, message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #8B4513, #DAA520);
            color: #FFD700;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #FFD700;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            animation: slideIn 0.5s ease-out;
        `;

        notification.innerHTML = `
            <h4 style="margin: 0 0 10px 0;">${title}</h4>
            <p style="margin: 0; font-size: 14px;">${message}</p>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    closeModal(modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 500);
    }

    setupEventListeners() {
        // Close modals on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.arabian-story-modal, .reward-modal').forEach(modal => {
                    this.closeModal(modal);
                });
            }
        });
    }

    // Public API
    getUserStoryProgress() {
        return {
            storiesCompleted: Object.keys(this.storyProgress).length,
            charactersMet: this.charactersMet.length,
            rewardsCollected: this.collectedRewards.length,
            wisdomLevel: this.wisdomLevel,
            choices: this.userChoices
        };
    }

    hasMetCharacter(characterName) {
        return this.charactersMet.includes(characterName);
    }

    getCollectedRewards() {
        return this.collectedRewards.map(id => this.rewards[id]).filter(Boolean);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.arabianStoryPathways = new ArabianStoryPathways();
    });
} else {
    window.arabianStoryPathways = new ArabianStoryPathways();
}