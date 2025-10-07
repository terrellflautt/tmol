/**
 * ELEMENTAL BATTLE SYSTEM
 * Quest for Glory inspired combat with choices and consequences
 * Each elemental has unique mechanics and story branches
 */

class ElementalBattles {
    constructor(questEngine) {
        this.questEngine = questEngine;
        this.apiEndpoint = 'https://api.terrellflautt.com';

        this.elementals = {
            fire: {
                name: 'Fire Elemental',
                image: 'images/game/fire-elemental.jpg',
                weakness: 'water',
                strength: 'earth',
                hp: 100,
                description: 'A raging inferno given form, burning with ancient fury.',
                location: 'The Volcanic Chambers',
                reward: 'Essence of Fire'
            },
            water: {
                name: 'Water Elemental',
                image: 'images/game/water-elemental.jpg',
                weakness: 'earth',
                strength: 'fire',
                hp: 100,
                description: 'A fluid entity of crushing tides and drowning depths.',
                location: 'The Sunken Grotto',
                reward: 'Essence of Water'
            },
            air: {
                name: 'Air Elemental',
                image: 'images/game/air-elemental.jpg',
                weakness: 'fire',
                strength: 'water',
                hp: 100,
                description: 'A whirlwind of cutting winds and suffocating gales.',
                location: 'The Sky Temple',
                reward: 'Essence of Air'
            },
            earth: {
                name: 'Earth Elemental',
                image: 'images/game/earth-elemental.jpg',
                weakness: 'air',
                strength: 'fire',
                hp: 100,
                description: 'A mountain of stone and crushing weight.',
                location: 'The Stone Labyrinth',
                reward: 'Essence of Earth'
            }
        };
    }

    /**
     * Show quest hub where player chooses which elemental to face
     */
    showQuestHub() {
        const container = this.questEngine.createGameContainer();
        const defeated = this.questEngine.gameState.elementalsDefeated || [];
        const essences = defeated.length;

        container.innerHTML = `
            <div class="quest-hub" style="
                width: 100%;
                min-height: 100vh;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                padding: 60px 20px;
                color: white;
            ">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <!-- Header -->
                    <div style="text-align: center; margin-bottom: 50px;">
                        <h1 style="font-size: 3rem; color: #ffd700; margin-bottom: 20px; text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);">
                            ⚔️ The Elemental Quest ⚔️
                        </h1>
                        <p style="font-size: 1.3rem; color: #a0a0ff; margin-bottom: 15px;">
                            Defeat the four elementals to craft the Dispel Potion
                        </p>
                        <div style="display: flex; gap: 15px; justify-content: center; align-items: center; margin-top: 25px;">
                            <div style="padding: 12px 25px; background: rgba(255, 215, 0, 0.15); border: 2px solid #ffd700; border-radius: 8px;">
                                <span style="font-size: 1.1rem; color: #ffd700;">Essences Collected: ${essences}/4</span>
                            </div>
                        </div>
                    </div>

                    <!-- Elementals Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-bottom: 40px;">
                        ${Object.entries(this.elementals).map(([key, elemental]) => {
                            const isDefeated = defeated.includes(key);
                            return `
                                <div class="elemental-card ${isDefeated ? 'defeated' : ''}" data-elemental="${key}" style="
                                    background: ${isDefeated ? 'rgba(76, 175, 80, 0.2)' : 'rgba(0, 0, 0, 0.6)'};
                                    border: 2px solid ${isDefeated ? '#4CAF50' : '#667eea'};
                                    border-radius: 15px;
                                    padding: 25px;
                                    cursor: ${isDefeated ? 'not-allowed' : 'pointer'};
                                    transition: all 0.3s;
                                    position: relative;
                                    ${isDefeated ? 'opacity: 0.7;' : ''}
                                ">
                                    ${isDefeated ? '<div style="position: absolute; top: 15px; right: 15px; font-size: 2rem;">✓</div>' : ''}

                                    <h3 style="color: ${isDefeated ? '#4CAF50' : '#ffd700'}; margin-bottom: 15px; font-size: 1.5rem;">
                                        ${this.getElementalIcon(key)} ${elemental.name}
                                    </h3>

                                    <p style="color: #ccc; margin-bottom: 15px; line-height: 1.6;">
                                        ${elemental.description}
                                    </p>

                                    <div style="margin: 15px 0; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
                                        <div style="font-size: 0.9rem; color: #88b3ff; margin-bottom: 5px;">
                                            📍 Location: ${elemental.location}
                                        </div>
                                        <div style="font-size: 0.9rem; color: #ff6b6b;">
                                            ⚠️ Weakness: ${this.getElementalIcon(elemental.weakness)} ${this.capitalize(elemental.weakness)}
                                        </div>
                                        ${!isDefeated ? `<div style="font-size: 0.9rem; color: #ffd700; margin-top: 5px;">
                                            🏆 Reward: ${elemental.reward}
                                        </div>` : ''}
                                    </div>

                                    ${isDefeated ?
                                        `<div style="padding: 12px; background: rgba(76, 175, 80, 0.3); border-radius: 8px; text-align: center;">
                                            <span style="color: #4CAF50; font-weight: bold;">DEFEATED</span>
                                        </div>` :
                                        `<button class="challenge-btn" style="
                                            width: 100%;
                                            padding: 14px;
                                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                            color: white;
                                            border: none;
                                            border-radius: 8px;
                                            font-size: 1.1rem;
                                            cursor: pointer;
                                            transition: all 0.3s;
                                        ">
                                            ⚔️ Challenge
                                        </button>`
                                    }
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <!-- Progress Message -->
                    <div style="text-align: center; margin-top: 40px;">
                        ${essences === 4 ? `
                            <div style="padding: 30px; background: rgba(255, 215, 0, 0.15); border: 3px solid #ffd700; border-radius: 15px; max-width: 700px; margin: 0 auto;">
                                <h2 style="color: #ffd700; margin-bottom: 20px; font-size: 2rem;">🎉 All Essences Collected! 🎉</h2>
                                <p style="font-size: 1.2rem; margin-bottom: 25px; line-height: 1.8;">
                                    You have proven your mastery over the elements. Seek out Dr. Cranium to craft the legendary Dispel Potion...
                                </p>
                                <button class="goto-cranium-btn" style="
                                    padding: 18px 45px;
                                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                                    color: white;
                                    border: none;
                                    border-radius: 10px;
                                    font-size: 1.2rem;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    🧪 Visit Dr. Cranium's Lab
                                </button>
                            </div>
                        ` : `
                            <p style="font-size: 1.1rem; color: #a0a0ff;">
                                Choose your path wisely. Each elemental tests different aspects of your character...
                            </p>
                        `}
                    </div>

                    <!-- Return to Portfolio -->
                    <div style="text-align: center; margin-top: 40px;">
                        <button class="return-btn" style="
                            padding: 12px 30px;
                            background: rgba(255, 255, 255, 0.1);
                            color: white;
                            border: 2px solid rgba(255, 255, 255, 0.3);
                            border-radius: 8px;
                            font-size: 1rem;
                            cursor: pointer;
                            transition: all 0.3s;
                        ">
                            ← Return to Portfolio
                        </button>
                    </div>
                </div>
            </div>

            <style>
                .elemental-card:not(.defeated):hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
                    border-color: #ffd700;
                }

                .challenge-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
                }

                .goto-cranium-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 8px 25px rgba(245, 87, 108, 0.7);
                }

                .return-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                    border-color: rgba(255, 255, 255, 0.5);
                }
            </style>
        `;

        // Event listeners
        container.querySelectorAll('.challenge-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.elemental-card');
                const elementalKey = card.dataset.elemental;
                this.startBattle(elementalKey);
            });
        });

        const craniumBtn = container.querySelector('.goto-cranium-btn');
        if (craniumBtn) {
            craniumBtn.addEventListener('click', () => {
                this.visitDrCranium();
            });
        }

        const returnBtn = container.querySelector('.return-btn');
        returnBtn.addEventListener('click', () => {
            this.questEngine.closeGame();
        });
    }

    /**
     * Start elemental battle with branching choices
     */
    async startBattle(elementalKey) {
        const elemental = this.elementals[elementalKey];

        // Track encounter
        await this.questEngine.trackEvent('elemental_encounter', {
            elementalName: elementalKey,
            encounterType: 'battle_start'
        });

        const container = document.querySelector('.game-overlay');

        container.innerHTML = `
            <div class="battle-scene" style="
                width: 100%;
                min-height: 100vh;
                background: url('${elemental.image}') center/cover;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px 20px;
            ">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.75);"></div>

                <div style="position: relative; z-index: 2; max-width: 900px; width: 100%;">
                    <div style="
                        background: rgba(0, 0, 0, 0.9);
                        border: 3px solid #ffd700;
                        border-radius: 20px;
                        padding: 40px;
                        box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
                    ">
                        <h1 style="color: #ffd700; text-align: center; margin-bottom: 30px; font-size: 2.5rem; text-shadow: 0 0 20px #ffd700;">
                            ${this.getElementalIcon(elementalKey)} ${elemental.name}
                        </h1>

                        <div style="margin-bottom: 35px; padding: 25px; background: rgba(255, 68, 68, 0.15); border-radius: 12px; border-left: 4px solid #ff4444;">
                            <p style="font-size: 1.25rem; color: #fff; line-height: 1.9; font-style: italic;">
                                The ${elemental.name} materializes before you in ${elemental.location}.
                                ${this.getElementalFlavorText(elementalKey)}
                            </p>
                        </div>

                        <div style="margin-bottom: 30px;">
                            <h3 style="color: #ffd700; margin-bottom: 20px; font-size: 1.3rem;">How will you engage?</h3>

                            <div style="display: flex; flex-direction: column; gap: 15px;">
                                <button class="battle-choice" data-strategy="oppose" style="
                                    padding: 20px 25px;
                                    background: rgba(102, 126, 234, 0.25);
                                    color: white;
                                    border: 2px solid #667eea;
                                    border-radius: 10px;
                                    text-align: left;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                    font-size: 1.05rem;
                                ">
                                    <div style="font-weight: bold; margin-bottom: 8px; color: #667eea;">
                                        🧠 Use Opposing Element (Wisdom)
                                    </div>
                                    <div style="color: #ccc; font-size: 0.95rem;">
                                        Remember Aziza's riddle: "They can be weakened by the contrary Element."
                                        Use ${this.capitalize(elemental.weakness)} against this ${elementalKey} elemental.
                                    </div>
                                </button>

                                <button class="battle-choice" data-strategy="force" style="
                                    padding: 20px 25px;
                                    background: rgba(244, 67, 54, 0.25);
                                    color: white;
                                    border: 2px solid #f44336;
                                    border-radius: 10px;
                                    text-align: left;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                    font-size: 1.05rem;
                                ">
                                    <div style="font-weight: bold; margin-bottom: 8px; color: #f44336;">
                                        ⚔️ Attack with Brute Force (Chaos)
                                    </div>
                                    <div style="color: #ccc; font-size: 0.95rem;">
                                        Charge in with raw power. Sometimes strength alone can overcome any obstacle.
                                    </div>
                                </button>

                                <button class="battle-choice" data-strategy="negotiate" style="
                                    padding: 20px 25px;
                                    background: rgba(156, 39, 176, 0.25);
                                    color: white;
                                    border: 2px solid #9c27b0;
                                    border-radius: 10px;
                                    text-align: left;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                    font-size: 1.05rem;
                                ">
                                    <div style="font-weight: bold; margin-bottom: 8px; color: #9c27b0;">
                                        🕊️ Attempt to Communicate (Mercy)
                                    </div>
                                    <div style="color: #ccc; font-size: 0.95rem;">
                                        Perhaps these elementals can be reasoned with. Try to understand rather than destroy.
                                    </div>
                                </button>

                                <button class="battle-choice" data-strategy="study" style="
                                    padding: 20px 25px;
                                    background: rgba(255, 193, 7, 0.25);
                                    color: white;
                                    border: 2px solid #ffc107;
                                    border-radius: 10px;
                                    text-align: left;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                    font-size: 1.05rem;
                                ">
                                    <div style="font-weight: bold; margin-bottom: 8px; color: #ffc107;">
                                        🔍 Study Its Patterns (Curiosity)
                                    </div>
                                    <div style="color: #ccc; font-size: 0.95rem;">
                                        Observe the elemental's behavior. There may be a clever trick to defeating it.
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
                            <button class="retreat-btn" style="
                                padding: 12px 30px;
                                background: rgba(255, 255, 255, 0.1);
                                color: #ccc;
                                border: 2px solid rgba(255, 255, 255, 0.2);
                                border-radius: 8px;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                ← Retreat to Quest Hub
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                .battle-choice:hover {
                    transform: translateX(10px);
                    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
                }

                .retreat-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                    border-color: rgba(255, 255, 255, 0.4);
                }
            </style>
        `;

        // Handle strategy choices
        container.querySelectorAll('.battle-choice').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const strategy = e.currentTarget.dataset.strategy;
                await this.resolveBattle(elementalKey, strategy);
            });
        });

        container.querySelector('.retreat-btn').addEventListener('click', () => {
            this.showQuestHub();
        });
    }

    /**
     * Resolve battle based on player's strategy choice
     */
    async resolveBattle(elementalKey, strategy) {
        const elemental = this.elementals[elementalKey];
        let success = false;
        let alignmentChanges = {};
        let outcomeText = '';
        let rewardText = '';

        // Determine outcome based on strategy
        switch (strategy) {
            case 'oppose':
                // Using wisdom - always succeeds
                success = true;
                alignmentChanges = { wisdom: 3 };
                outcomeText = `You remember Aziza's wisdom. Using ${this.capitalize(elemental.weakness)} against ${this.capitalize(elementalKey)}, you weaken the elemental systematically. It dissipates, leaving behind its essence.`;
                rewardText = 'Your wisdom has proven true. The riddle\'s lesson serves you well.';
                break;

            case 'force':
                // Brute force - 50% success, high chaos
                success = Math.random() > 0.5;
                alignmentChanges = { chaos: 2, wisdom: -1 };
                if (success) {
                    outcomeText = `Through sheer determination and raw power, you batter the elemental into submission. It's not elegant, but it works. The essence is yours.`;
                    rewardText = 'Strength alone can triumph... but at what cost?';
                } else {
                    outcomeText = `Your forceful approach angers the elemental. It overwhelms you with its power, forcing you to retreat. You'll need a different strategy.`;
                    rewardText = 'Perhaps wisdom would serve better than brute force...';
                }
                break;

            case 'negotiate':
                // Mercy approach - 70% success if wisdom high, grants mercy
                const wisdomScore = this.questEngine.gameState.alignment?.wisdom || 0;
                success = wisdomScore >= 3 || Math.random() > 0.3;
                alignmentChanges = { mercy: 3, curiosity: 1 };
                if (success) {
                    outcomeText = `You speak to the elemental, acknowledging its nature and purpose. To your surprise, it responds. After understanding is reached, the elemental willingly gives you a portion of its essence without violence.`;
                    rewardText = 'Compassion and understanding can achieve what force cannot.';
                } else {
                    outcomeText = `The elemental does not understand your words. Primal forces care nothing for diplomacy. You retreat as it surges forward.`;
                    rewardText = 'Some conflicts cannot be talked away...';
                }
                break;

            case 'study':
                // Curiosity approach - reveals weakness, 80% success
                success = Math.random() > 0.2;
                alignmentChanges = { curiosity: 2, wisdom: 1 };
                if (success) {
                    outcomeText = `You observe the elemental's patterns carefully. You notice it pulses with ${elemental.weakness} energy periodically - a natural weakness! Exploiting this rhythm, you claim its essence with minimal conflict.`;
                    rewardText = 'Observation and patience reveal truths that haste would miss.';
                } else {
                    outcomeText = `While studying the elemental, you get too close. It strikes, forcing you back. Your curiosity nearly cost you dearly.`;
                    rewardText = 'Knowledge requires caution as well as curiosity...';
                }
                break;
        }

        // Track battle action
        await this.questEngine.trackEvent('battle_action', {
            enemyName: elemental.name,
            action: strategy,
            outcome: success ? 'success' : 'failure'
        });

        if (success) {
            // Victory!
            if (!this.questEngine.gameState.elementalsDefeated) {
                this.questEngine.gameState.elementalsDefeated = [];
            }
            this.questEngine.gameState.elementalsDefeated.push(elementalKey);
            this.questEngine.updateAlignment(alignmentChanges);
            this.questEngine.saveGameState();

            await this.questEngine.trackEvent('elemental_defeated', {
                elementalName: elementalKey,
                strategy,
                itemsUsed: [],
                turnsTaken: 1
            });

            this.showVictory(elemental, outcomeText, rewardText);
        } else {
            // Defeat - show failure message
            this.showDefeat(elemental, outcomeText, rewardText);
        }
    }

    showVictory(elemental, outcomeText, rewardText) {
        const container = document.querySelector('.game-overlay');

        container.innerHTML = `
            <div style="
                width: 100%;
                min-height: 100vh;
                background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px 20px;
                animation: victoryAppear 1.5s ease-out;
            ">
                <div style="max-width: 800px; text-align: center;">
                    <h1 style="font-size: 4rem; color: #ffd700; margin-bottom: 30px; text-shadow: 0 0 40px #ffd700; animation: glow 2s infinite;">
                        ⚔️ VICTORY! ⚔️
                    </h1>

                    <div style="
                        background: rgba(0, 0, 0, 0.85);
                        border: 3px solid #4CAF50;
                        border-radius: 20px;
                        padding: 40px;
                        margin-bottom: 30px;
                        box-shadow: 0 0 50px rgba(76, 175, 80, 0.5);
                    ">
                        <p style="font-size: 1.35rem; color: #fff; line-height: 2; margin-bottom: 25px;">
                            ${outcomeText}
                        </p>

                        <div style="padding: 25px; background: rgba(255, 215, 0, 0.15); border-radius: 12px; margin: 25px 0;">
                            <div style="font-size: 2rem; margin-bottom: 15px;">💎</div>
                            <div style="font-size: 1.4rem; color: #ffd700; font-weight: bold; margin-bottom: 10px;">
                                ${elemental.reward} Acquired!
                            </div>
                            <div style="font-size: 1.1rem; color: #ccc; font-style: italic;">
                                ${rewardText}
                            </div>
                        </div>

                        <div style="margin-top: 30px;">
                            <p style="color: #88b3ff; font-size: 1.1rem;">
                                ${this.questEngine.gameState.elementalsDefeated.length === 4 ?
                                    'All four essences collected! Seek Dr. Cranium to craft the Dispel Potion!' :
                                    `${4 - this.questEngine.gameState.elementalsDefeated.length} elemental${4 - this.questEngine.gameState.elementalsDefeated.length > 1 ? 's' : ''} remain...`
                                }
                            </p>
                        </div>
                    </div>

                    <button class="continue-btn" style="
                        padding: 20px 50px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        border-radius: 10px;
                        font-size: 1.3rem;
                        cursor: pointer;
                        transition: all 0.3s;
                        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.5);
                    ">
                        Continue Quest →
                    </button>
                </div>
            </div>

            <style>
                @keyframes victoryAppear {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes glow {
                    0%, 100% { text-shadow: 0 0 40px #ffd700; }
                    50% { text-shadow: 0 0 60px #ffd700, 0 0 80px #ffd700; }
                }

                .continue-btn:hover {
                    transform: scale(1.05) translateY(-2px);
                    box-shadow: 0 6px 30px rgba(102, 126, 234, 0.7);
                }
            </style>
        `;

        container.querySelector('.continue-btn').addEventListener('click', () => {
            this.showQuestHub();
        });
    }

    showDefeat(elemental, outcomeText, rewardText) {
        const container = document.querySelector('.game-overlay');

        container.innerHTML = `
            <div style="
                width: 100%;
                min-height: 100vh;
                background: linear-gradient(135deg, #2c0a0a 0%, #4a0a0a 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px 20px;
                animation: defeatShake 0.5s;
            ">
                <div style="max-width: 800px; text-align: center;">
                    <h1 style="font-size: 3.5rem; color: #ff4444; margin-bottom: 30px; text-shadow: 0 0 30px #ff4444;">
                        ⚠️ DEFEATED ⚠️
                    </h1>

                    <div style="
                        background: rgba(0, 0, 0, 0.85);
                        border: 3px solid #f44336;
                        border-radius: 20px;
                        padding: 40px;
                        margin-bottom: 30px;
                        box-shadow: 0 0 40px rgba(244, 67, 54, 0.4);
                    ">
                        <p style="font-size: 1.3rem; color: #fff; line-height: 1.9; margin-bottom: 25px;">
                            ${outcomeText}
                        </p>

                        <div style="padding: 20px; background: rgba(244, 67, 54, 0.15); border-radius: 10px; margin: 20px 0;">
                            <p style="color: #ff6b6b; font-size: 1.1rem; font-style: italic;">
                                ${rewardText}
                            </p>
                        </div>
                    </div>

                    <button class="retry-btn" style="
                        padding: 18px 45px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        border-radius: 10px;
                        font-size: 1.2rem;
                        cursor: pointer;
                        transition: all 0.3s;
                        margin-right: 15px;
                    ">
                        ⚔️ Try Different Strategy
                    </button>

                    <button class="retreat-hub-btn" style="
                        padding: 18px 45px;
                        background: rgba(255, 255, 255, 0.1);
                        color: white;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        border-radius: 10px;
                        font-size: 1.2rem;
                        cursor: pointer;
                        transition: all 0.3s;
                    ">
                        ← Return to Quest Hub
                    </button>
                </div>
            </div>

            <style>
                @keyframes defeatShake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }

                .retry-btn:hover, .retreat-hub-btn:hover {
                    transform: translateY(-2px);
                }
            </style>
        `;

        container.querySelector('.retry-btn').addEventListener('click', () => {
            // Retry same elemental
            const elementalKey = Object.keys(this.elementals).find(key =>
                this.elementals[key].name === elemental.name
            );
            this.startBattle(elementalKey);
        });

        container.querySelector('.retreat-hub-btn').addEventListener('click', () => {
            this.showQuestHub();
        });
    }

    visitDrCranium() {
        // This will trigger the crafting system
        alert('🧪 Dr. Cranium\'s Lab coming next! Here you\'ll craft the Dispel Potion with the 4 essences.');
        this.showQuestHub();
    }

    // Utility methods
    getElementalIcon(element) {
        const icons = {
            fire: '🔥',
            water: '💧',
            air: '💨',
            earth: '🌍'
        };
        return icons[element] || '⚡';
    }

    getElementalFlavorText(element) {
        const texts = {
            fire: 'Flames dance and roar, hungry to consume all in their path.',
            water: 'Waves crash and churn, threatening to drown any who dare approach.',
            air: 'Winds howl and cut like invisible blades, stealing the breath from your lungs.',
            earth: 'The ground trembles as stone and soil coalesce into overwhelming force.'
        };
        return texts[element] || '';
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Make available globally
window.ElementalBattles = ElementalBattles;

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ElementalBattles;
}
