/**
 * NPC Character System
 * Quest for Glory style adventure characters
 * Elementals, Dr. Cranium, Blacksmith, Genie, Aziza
 */

class NPCCharacterSystem {
    constructor() {
        this.characters = this.defineCharacters();
        this.inventory = this.loadInventory();
        this.quests = this.loadQuests();
        this.relationships = this.loadRelationships();

        this.init();
    }

    init() {
        this.setupCharacterTriggers();
        this.checkQuestProgress();
    }

    /**
     * ====== CHARACTER DEFINITIONS ======
     */
    defineCharacters() {
        return {
            // ===== THE GENIE =====
            genie: {
                name: "The Genie",
                title: "Keeper of Knowledge",
                portrait: "genie.png",
                location: "magic-lamp",
                discovered: false,
                wishesPerDay: 3,

                dialogue: {
                    greeting: [
                        "Well, well! A {device} user! I see you've made {discoveries} discoveries so far. Impressive!",
                        "Ah, {returningPattern} visitor from {city}. The mysteries await you.",
                        "Greetings, {explorationStyle} explorer. Your journey has just begun."
                    ],
                    wisdom: [
                        "The elements cannot be defeated by force alone. Seek the mad scientist.",
                        "Dr. Cranium holds the key to elemental dispel. But first, you'll need ingredients...",
                        "The blacksmith's bellows can forge more than metal. They can forge destiny."
                    ],
                    farewell: [
                        "Return when you need guidance. You have {wishes} wishes remaining today.",
                        "May The Knowledge guide your path.",
                        "Until we meet again, {curiosity} one."
                    ]
                },

                quests: {
                    gives: ["seek_elementals", "find_cranium"],
                    requires: []
                }
            },

            // ===== AZIZA =====
            aziza: {
                name: "Aziza",
                title: "The Mysterious Sphinx",
                portrait: "assets/images/aziza.png",
                doorBackground: "assets/images/aziza_door.webp",
                elementalTeachingScene: "assets/images/aziza_air.jpg",
                location: "hidden-in-plain-sight",
                discovered: false,
                riddleRequired: true, // Must answer riddle at door to enter

                dialogue: {
                    greeting: [
                        "You found me. Most never do.",
                        "Observation is the first step to enlightenment.",
                        "I am Aziza. I am everywhere and nowhere."
                    ],
                    riddles: [
                        "I am the pause between thoughts, the space between words. What am I?",
                        "Click me thrice, and secrets arise.",
                        "The elements fear what they cannot consume. What is it?"
                    ],
                    wisdom: [
                        "The elementals are not your enemies. They are tests.",
                        "Fire, Water, Air, Earth - each guards a piece of The Knowledge.",
                        "To defeat them, you must become them."
                    ],
                    elementalTeaching: [
                        "Elementals are very powerful and destructive.",
                        "They can be weakened by the contrary Element,",
                        "but they cannot be destroyed.",
                        "Seek Dr. Cranium for the Dispel Potion recipe."
                    ]
                },

                quests: {
                    gives: ["aziza_riddle_master"],
                    requires: ["logo_evolution_complete"]
                }
            },

            // ===== DR. CRANIUM =====
            dr_cranium: {
                name: "Dr. Cranium",
                title: "Mad Scientist & Alchemist",
                portrait: "assets/images/dr_cranium.webp",
                entranceBackground: "assets/images/dr_cranium_entrance.png",
                puzzleBackground: "assets/images/dr_cranium_puzzle.png",
                location: "secret-lab",
                discovered: false,
                puzzlesRequired: 2, // Two-stage puzzle system

                dialogue: {
                    greeting: [
                        "*adjusts goggles* Ah! A test subject-- I mean, visitor!",
                        "SCIENCE! That's what you need! SCIENCE and... wait, where did I put that beaker?",
                        "*mad cackling* You seek to defeat the elementals? Excellent! I have just the formula!"
                    ],
                    dispel_potion: [
                        "The Elemental Dispel Potion requires three sacred ingredients:",
                        "1. PIZZA - The ancient sustenance of coders and wizards alike!",
                        "2. CHICKEN WINGS - Fiery passion to counter the elements!",
                        "3. BEER - The elixir of truth and debugging!",
                        "Mix these with bellows-forged fire and you'll have power over ALL elements!"
                    ],
                    science: [
                        "Did you know? Pizza contains all four elements! Dough (Earth), Sauce (Water), Cheese (Fire from digestion), Aroma (Air)!",
                        "The carbon in chicken wings vibrates at the exact frequency to disrupt elemental bonds!",
                        "Beer... well, beer is just magical. No science needed there. *winks*"
                    ],
                    warnings: [
                        "DO NOT drink the potion! It's for throwing AT the elementals!",
                        "Side effects may include: enlightenment, teleportation, spontaneous pizza cravings.",
                        "If you start seeing code in the Matrix, you've used too much. Or not enough. Science is unclear."
                    ]
                },

                quests: {
                    gives: ["collect_pizza", "collect_wings", "collect_beer", "get_bellows"],
                    requires: ["genie_wisdom_received"]
                },

                shop: {
                    items: [
                        { name: "Pizza", cost: "3 discoveries", type: "ingredient" },
                        { name: "Chicken Wings", cost: "5 discoveries", type: "ingredient" },
                        { name: "Beer", cost: "2 discoveries", type: "ingredient" },
                        { name: "Dispel Potion Recipe", cost: "10 discoveries", type: "recipe" }
                    ]
                }
            },

            // ===== THE BLACKSMITH =====
            blacksmith: {
                name: "Thorgrim Ironforge",
                title: "Master Blacksmith",
                portrait: "blacksmith.png",
                location: "forge",
                discovered: false,

                dialogue: {
                    greeting: [
                        "*hammering sounds* Aye, what brings ye to me forge?",
                        "Weapons? Armor? Or perhaps... something more unusual?",
                        "I've been smithing for 40 years, and I've never seen an order quite like yours."
                    ],
                    bellows: [
                        "The bellows, eh? Not many ask for 'em anymore.",
                        "These aren't ordinary bellows. They were forged in the first fire, cooled in the deepest water.",
                        "They breathe air that's been filtered through ancient earth.",
                        "Aye, they contain all four elements. Perfect for yer potion."
                    ],
                    forge_lore: [
                        "This forge has been burning for 100 years. Never extinguished.",
                        "Every item forged here carries a piece of that eternal flame.",
                        "The elementals respect what's made with true craft."
                    ],
                    conditions: [
                        "I'll give ye the bellows... but ye must prove yerself worthy.",
                        "Bring me proof that ye've faced each elemental in turn.",
                        "Or solve me riddle: What burns without fire, flows without water, moves without wind, and stands without earth?"
                    ]
                },

                quests: {
                    gives: ["obtain_bellows"],
                    requires: ["dr_cranium_met", "elemental_progress"]
                },

                shop: {
                    items: [
                        { name: "Bellows of the Four Elements", cost: "Elemental Tokens x4", type: "tool" },
                        { name: "Fire-Forged Blade", cost: "15 discoveries", type: "weapon" },
                        { name: "Elemental Armor", cost: "20 discoveries", type: "armor" }
                    ]
                }
            },

            // ===== FIRE ELEMENTAL =====
            fire_elemental: {
                name: "Ignis the Eternal Flame",
                title: "Guardian of Passion",
                portrait: "fire_elemental.png",
                location: "volcanic-realm",
                discovered: false,
                boss: true,

                dialogue: {
                    challenge: [
                        "🔥 MORTAL! You dare enter my domain?",
                        "I am the burning passion that drives creation! The fury that powers innovation!",
                        "Prove your worth, or be consumed!"
                    ],
                    defeated: [
                        "🔥 *flickers* You... understand fire. You don't fear it. You wield it.",
                        "Take this token. You've earned the respect of flame.",
                        "Remember: Passion without control burns everything. Channel it wisely."
                    ],
                    hint: [
                        "Fire cannot exist without fuel. Deny me mine, and I weaken.",
                        "What cools the hottest flame? Not water... but patience."
                    ]
                },

                battle: {
                    weakness: "dispel_potion",
                    phases: 3,
                    reward: "token_of_fire"
                }
            },

            // ===== WATER ELEMENTAL =====
            water_elemental: {
                name: "Aqualis the Ever-Flowing",
                title: "Guardian of Adaptability",
                portrait: "water_elemental.png",
                location: "deep-ocean-realm",
                discovered: false,
                boss: true,

                dialogue: {
                    challenge: [
                        "🌊 You seek to cross my depths?",
                        "I am adaptation itself. I flow around every obstacle.",
                        "Can you match my fluidity?"
                    ],
                    defeated: [
                        "🌊 *ripples* You move like water... no resistance, perfect flow.",
                        "This token represents your understanding of adaptation.",
                        "Remember: Water shapes itself to any container. Be formless."
                    ],
                    hint: [
                        "You cannot fight water with force. It simply moves around you.",
                        "Find what water cannot touch, and you've found the answer."
                    ]
                },

                battle: {
                    weakness: "dispel_potion",
                    phases: 3,
                    reward: "token_of_water"
                }
            },

            // ===== AIR ELEMENTAL =====
            air_elemental: {
                name: "Zephyrus the Unseen",
                title: "Guardian of Freedom",
                portrait: "air_elemental.png",
                location: "sky-fortress",
                discovered: false,
                boss: true,

                dialogue: {
                    challenge: [
                        "💨 Can you grasp what cannot be held?",
                        "I am freedom. Thought. The breath of life itself.",
                        "Prove you understand what it means to be unbound!"
                    ],
                    defeated: [
                        "💨 *whispers* You let go... and found control.",
                        "The token is yours. You've learned that true freedom requires discipline.",
                        "Remember: Air goes everywhere but is held nowhere. Master this paradox."
                    ],
                    hint: [
                        "Air escapes every trap. But it can be channeled.",
                        "What directs wind? The bellows know this secret."
                    ]
                },

                battle: {
                    weakness: "dispel_potion",
                    phases: 3,
                    reward: "token_of_air"
                }
            },

            // ===== EARTH ELEMENTAL =====
            earth_elemental: {
                name: "Terravon the Unmoving",
                title: "Guardian of Foundation",
                portrait: "earth_elemental.png",
                location: "mountain-core",
                discovered: false,
                boss: true,

                dialogue: {
                    challenge: [
                        "⛰️ HALT! You shall not pass without proving your foundation!",
                        "I am stability. Structure. The ground beneath all things.",
                        "Show me your strength is built on solid ground!"
                    ],
                    defeated: [
                        "⛰️ *rumbles* You stand firm... yet you know when to bend.",
                        "This token represents unshakeable foundation paired with flexibility.",
                        "Remember: The tallest mountain was once fluid magma. Never forget your origins."
                    ],
                    hint: [
                        "Earth cannot be moved... but it can be transformed.",
                        "What breaks stone? Not force. Time. Patience. The right ingredient."
                    ]
                },

                battle: {
                    weakness: "dispel_potion",
                    phases: 3,
                    reward: "token_of_earth"
                }
            }
        };
    }

    /**
     * ====== INVENTORY SYSTEM ======
     */
    loadInventory() {
        return JSON.parse(localStorage.getItem('terrellflautt_inventory') || '{}');
    }

    saveInventory() {
        localStorage.setItem('terrellflautt_inventory', JSON.stringify(this.inventory));
    }

    hasItem(item) {
        return this.inventory[item] === true || this.inventory[item] > 0;
    }

    addItem(item, quantity = 1) {
        if (typeof this.inventory[item] === 'number') {
            this.inventory[item] += quantity;
        } else {
            this.inventory[item] = quantity;
        }
        this.saveInventory();

        this.showNotification(`Obtained: ${item} ${quantity > 1 ? 'x' + quantity : ''}`);
    }

    removeItem(item, quantity = 1) {
        if (typeof this.inventory[item] === 'number') {
            this.inventory[item] = Math.max(0, this.inventory[item] - quantity);
        } else {
            delete this.inventory[item];
        }
        this.saveInventory();
    }

    /**
     * ====== QUEST SYSTEM ======
     */
    loadQuests() {
        return JSON.parse(localStorage.getItem('terrellflautt_quests') || '{}');
    }

    saveQuests() {
        localStorage.setItem('terrellflautt_quests', JSON.stringify(this.quests));
    }

    startQuest(questId) {
        this.quests[questId] = {
            status: 'active',
            startedAt: Date.now(),
            progress: {}
        };
        this.saveQuests();
    }

    completeQuest(questId) {
        if (this.quests[questId]) {
            this.quests[questId].status = 'completed';
            this.quests[questId].completedAt = Date.now();
            this.saveQuests();

            this.showNotification(`Quest Completed: ${questId}`, 'success');
        }
    }

    /**
     * ====== RELATIONSHIP SYSTEM ======
     */
    loadRelationships() {
        return JSON.parse(localStorage.getItem('terrellflautt_relationships') || '{}');
    }

    saveRelationships() {
        localStorage.setItem('terrellflautt_relationships', JSON.stringify(this.relationships));
    }

    updateRelationship(characterId, change) {
        if (!this.relationships[characterId]) {
            this.relationships[characterId] = 0;
        }

        this.relationships[characterId] += change;
        this.relationships[characterId] = Math.max(-100, Math.min(100, this.relationships[characterId]));

        this.saveRelationships();
    }

    /**
     * ====== CHARACTER TRIGGERS ======
     */
    setupCharacterTriggers() {
        // Dr. Cranium appears after Genie gives wisdom
        if (this.quests['genie_wisdom_received']?.status === 'completed') {
            this.unlockCharacter('dr_cranium');
        }

        // Blacksmith appears after meeting Dr. Cranium
        if (this.characters.dr_cranium.discovered) {
            this.unlockCharacter('blacksmith');
        }

        // Elementals appear after getting dispel potion recipe
        if (this.hasItem('dispel_potion_recipe')) {
            this.unlockElementals();
        }
    }

    unlockCharacter(characterId) {
        if (!this.characters[characterId].discovered) {
            this.characters[characterId].discovered = true;
            localStorage.setItem(`character_${characterId}_discovered`, 'true');

            this.showCharacterAppearance(characterId);
        }
    }

    unlockElementals() {
        ['fire_elemental', 'water_elemental', 'air_elemental', 'earth_elemental'].forEach(id => {
            this.unlockCharacter(id);
        });
    }

    showCharacterAppearance(characterId) {
        const character = this.characters[characterId];

        const modal = document.createElement('div');
        modal.className = 'character-appearance-modal';
        modal.innerHTML = `
            <div class="character-appearance-backdrop"></div>
            <div class="character-appearance-container">
                <div class="character-portrait">
                    <img src="/assets/characters/${character.portrait}" alt="${character.name}">
                </div>
                <div class="character-info">
                    <h2>${character.name}</h2>
                    <h3>${character.title}</h3>
                    <p class="appearance-text">
                        A new character has appeared!
                    </p>
                    <button class="meet-character-btn" data-character="${characterId}">
                        Meet ${character.name}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 50);

        modal.querySelector('.meet-character-btn').addEventListener('click', () => {
            modal.remove();
            this.openCharacterDialogue(characterId);
        });
    }

    /**
     * ====== DIALOGUE SYSTEM ======
     */
    openCharacterDialogue(characterId) {
        const character = this.characters[characterId];

        // Use existing RPG dialogue system
        if (window.rpgDialogue) {
            window.rpgDialogue.openDialogue({
                npc: character.name,
                portrait: character.portrait,
                initialDialogue: this.getContextualDialogue(characterId, 'greeting'),
                options: this.getDialogueOptions(characterId)
            });
        }
    }

    getContextualDialogue(characterId, type) {
        const character = this.characters[characterId];
        const dialogue = character.dialogue[type];

        if (!dialogue) return "...";

        // Pick random dialogue
        const line = dialogue[Math.floor(Math.random() * dialogue.length)];

        // Replace variables with user data
        return this.personalizeDialogue(line);
    }

    personalizeDialogue(text) {
        const profile = window.deepUserProfiler?.profile || {};

        const replacements = {
            '{device}': profile.device?.type || 'unknown',
            '{os}': profile.device?.os || 'unknown',
            '{city}': profile.location?.city || 'unknown lands',
            '{country}': profile.location?.country || 'the void',
            '{discoveries}': profile.interactions?.discoveries?.length || 0,
            '{returningPattern}': profile.usage?.returningPattern || 'mysterious',
            '{explorationStyle}': profile.psychology?.explorationStyle || 'unique',
            '{curiosity}': profile.psychology?.curiosity || 'curious',
            '{wishes}': window.genieWishSystem?.getWishesRemaining() || 0
        };

        let result = text;
        for (const [key, value] of Object.entries(replacements)) {
            result = result.replace(new RegExp(key, 'g'), value);
        }

        return result;
    }

    getDialogueOptions(characterId) {
        const character = this.characters[characterId];
        const options = [];

        // Dynamic options based on character and progress
        if (characterId === 'dr_cranium') {
            options.push(
                { text: "Tell me about the Dispel Potion", action: () => this.showDispelRecipe() },
                { text: "What do you know about the elementals?", action: () => this.showElementalInfo() },
                { text: "Can I buy ingredients?", action: () => this.openShop('dr_cranium') }
            );
        }

        if (characterId === 'blacksmith') {
            options.push(
                { text: "I need the bellows", action: () => this.requestBellows() },
                { text: "Tell me about your forge", action: () => this.showForgeLore() },
                { text: "What can you craft?", action: () => this.openShop('blacksmith') }
            );
        }

        if (character.boss) {
            options.push(
                { text: "I'm here to face you", action: () => this.startBattle(characterId) },
                { text: "Give me a hint", action: () => this.showHint(characterId) },
                { text: "I'm not ready yet", action: () => this.retreat() }
            );
        }

        options.push({ text: "Goodbye", action: () => this.closeDialogue() });

        return options;
    }

    /**
     * ====== SPECIAL ACTIONS ======
     */
    showDispelRecipe() {
        if (window.rpgDialogue) {
            window.rpgDialogue.typeText(this.characters.dr_cranium.dialogue.dispel_potion.join('\n\n'));
        }

        this.addItem('dispel_potion_recipe');
        this.startQuest('collect_ingredients');
    }

    showElementalInfo() {
        const info = `
The Four Elementals guard the deepest secrets of The Knowledge:

🔥 Ignis (Fire) - Represents Passion & Drive
🌊 Aqualis (Water) - Represents Adaptability
💨 Zephyrus (Air) - Represents Freedom & Thought
⛰️ Terravon (Earth) - Represents Foundation & Stability

Each must be faced and understood. Only then will they grant their tokens.
        `;

        if (window.rpgDialogue) {
            window.rpgDialogue.typeText(info);
        }
    }

    requestBellows() {
        const hasAllTokens = ['token_of_fire', 'token_of_water', 'token_of_air', 'token_of_earth']
            .every(token => this.hasItem(token));

        if (hasAllTokens) {
            this.addItem('bellows_of_four_elements');
            this.completeQuest('obtain_bellows');

            if (window.rpgDialogue) {
                window.rpgDialogue.typeText(
                    "*hands over ancient bellows* Ye've proven yerself worthy. These bellows contain the essence of all four elements. Use them wisely."
                );
            }
        } else {
            if (window.rpgDialogue) {
                window.rpgDialogue.typeText(
                    "Ye need the tokens from all four elementals first! Prove ye've faced them all."
                );
            }
        }
    }

    showForgeLore() {
        if (window.rpgDialogue) {
            window.rpgDialogue.typeText(this.characters.blacksmith.dialogue.forge_lore.join('\n\n'));
        }
    }

    openShop(characterId) {
        const character = this.characters[characterId];
        // Create shop UI (simplified for now)
        console.log('Shop:', character.shop);
    }

    startBattle(elementalId) {
        // Battle system would go here
        console.log(`Battle started with ${elementalId}`);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `game-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    checkQuestProgress() {
        // Check if user has all ingredients for dispel potion
        if (this.hasItem('pizza') && this.hasItem('chicken_wings') && this.hasItem('beer') && this.hasItem('bellows_of_four_elements')) {
            this.addItem('elemental_dispel_potion');
            this.showNotification('You can now craft the Elemental Dispel Potion!', 'success');
        }
    }
}

// Initialize
if (typeof window !== 'undefined') {
    window.npcCharacterSystem = new NPCCharacterSystem();
}
