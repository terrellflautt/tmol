/**
 * SKILL MASTERY & PROGRESSION SYSTEM
 * Skills improve through actual use - Quest for Glory style
 *
 * 5 Core Skills:
 * - Magic: Casting spells, solving magical puzzles, understanding arcane secrets
 * - Stealth: Finding hidden items, lockpicking, sneaking past obstacles
 * - Diplomacy (Charisma): Conversation choices, persuasion, NPC relationships
 * - Combat: Fighting enemies, defending, tactical choices
 * - Alchemy: Crafting potions, ingredient knowledge, recipe discovery
 *
 * Skills increase by DOING, not by spending points
 * Higher skills unlock new dialogue options, easier puzzles, special abilities
 */

class SkillMasteryProgression {
    constructor() {
        this.skills = {
            magic: {
                current: 0,
                max: 100,
                name: 'Magic',
                icon: '✨',
                description: 'The art of arcane manipulation',
                levelThresholds: [0, 20, 40, 60, 80, 100],
                levelNames: ['Novice', 'Apprentice', 'Adept', 'Expert', 'Master', 'Grand Master']
            },
            stealth: {
                current: 0,
                max: 100,
                name: 'Stealth',
                icon: '🗝️',
                description: 'The art of shadows and secrets',
                levelThresholds: [0, 20, 40, 60, 80, 100],
                levelNames: ['Novice', 'Apprentice', 'Adept', 'Expert', 'Master', 'Grand Master']
            },
            diplomacy: {
                current: 0,
                max: 100,
                name: 'Diplomacy',
                icon: '💬',
                description: 'The art of words and persuasion',
                levelThresholds: [0, 20, 40, 60, 80, 100],
                levelNames: ['Novice', 'Apprentice', 'Adept', 'Expert', 'Master', 'Grand Master']
            },
            combat: {
                current: 0,
                max: 100,
                name: 'Combat',
                icon: '⚔️',
                description: 'The art of battle and tactics',
                levelThresholds: [0, 20, 40, 60, 80, 100],
                levelNames: ['Novice', 'Apprentice', 'Adept', 'Expert', 'Master', 'Grand Master']
            },
            alchemy: {
                current: 0,
                max: 100,
                name: 'Alchemy',
                icon: '🧪',
                description: 'The art of transformation',
                levelThresholds: [0, 20, 40, 60, 80, 100],
                levelNames: ['Novice', 'Apprentice', 'Adept', 'Expert', 'Master', 'Grand Master']
            }
        };

        this.skillGainActions = {
            // Magic skill gains
            magic: {
                cast_spell: 5,
                solve_magical_puzzle: 10,
                defeat_elemental_with_magic: 15,
                craft_magical_item: 8,
                read_arcane_scroll: 3,
                channel_element: 12,
                dispel_curse: 20
            },

            // Stealth skill gains
            stealth: {
                find_hidden_item: 5,
                pick_lock: 10,
                discover_secret: 8,
                sneak_past_guard: 15,
                steal_item: 12,
                remain_undetected: 7,
                triple_click_discovery: 3,
                midnight_collection: 10
            },

            // Diplomacy skill gains
            diplomacy: {
                persuade_npc: 10,
                choose_wise_dialogue: 5,
                befriend_elemental: 15,
                negotiate_peace: 20,
                gain_trust: 8,
                tell_convincing_story: 7,
                compliment_successfully: 3,
                avoid_combat: 12
            },

            // Combat skill gains
            combat: {
                win_battle: 10,
                successful_attack: 3,
                successful_defense: 5,
                defeat_boss: 20,
                defeat_elemental_combat: 15,
                critical_hit: 8,
                survive_difficult_fight: 12,
                master_combo: 10
            },

            // Alchemy skill gains
            alchemy: {
                craft_potion: 10,
                discover_recipe: 15,
                identify_ingredient: 5,
                successful_experiment: 8,
                craft_dispel_potion: 25,
                mix_rare_ingredients: 12,
                study_alchemy_book: 7
            }
        };

        // Skill-based unlocks
        this.skillUnlocks = {
            magic: {
                20: {
                    name: 'Detect Magic',
                    description: 'Highlights magical items and secrets',
                    ability: 'detect_magic'
                },
                40: {
                    name: 'Elemental Affinity',
                    description: 'Elementals are easier to befriend',
                    bonus: 'elemental_diplomacy_bonus'
                },
                60: {
                    name: 'Mana Efficiency',
                    description: 'Spells cost 25% less mana',
                    bonus: 'reduced_mana_cost'
                },
                80: {
                    name: 'Arcane Vision',
                    description: 'See hidden magical paths',
                    ability: 'reveal_hidden_paths'
                },
                100: {
                    name: 'Master Wizard',
                    description: 'All spells unlocked, Aziza\'s respect earned',
                    title: 'Grand Wizard'
                }
            },

            stealth: {
                20: {
                    name: 'Eagle Eye',
                    description: 'Hidden items glow subtly when nearby',
                    ability: 'highlight_secrets'
                },
                40: {
                    name: 'Silent Movement',
                    description: 'Reduced detection chance in combat',
                    bonus: 'stealth_bonus'
                },
                60: {
                    name: 'Master Lockpick',
                    description: 'All locks easier to pick',
                    bonus: 'lockpick_bonus'
                },
                80: {
                    name: 'Shadow Form',
                    description: 'Avoid random combat encounters',
                    ability: 'combat_avoidance'
                },
                100: {
                    name: 'Master Thief',
                    description: 'Access to Thieves\' Guild, special items',
                    title: 'Shadow Master'
                }
            },

            diplomacy: {
                20: {
                    name: 'Charming Words',
                    description: 'NPCs offer better hints',
                    bonus: 'better_hints'
                },
                40: {
                    name: 'Persuasive',
                    description: 'New dialogue options appear',
                    ability: 'unlock_dialogue_paths'
                },
                60: {
                    name: 'Trusted Friend',
                    description: 'NPCs reveal deeper secrets',
                    bonus: 'deeper_npc_dialogue'
                },
                80: {
                    name: 'Silver Tongue',
                    description: 'Can talk your way out of most fights',
                    ability: 'avoid_combat_dialogue'
                },
                100: {
                    name: 'Master Diplomat',
                    description: 'Peaceful ending unlocked, all NPCs trust you',
                    title: 'Voice of Reason'
                }
            },

            combat: {
                20: {
                    name: 'Warrior\'s Stance',
                    description: '+10% damage in combat',
                    bonus: 'damage_boost'
                },
                40: {
                    name: 'Defensive Training',
                    description: '+15% defense',
                    bonus: 'defense_boost'
                },
                60: {
                    name: 'Battle Tactics',
                    description: 'Special combat moves unlocked',
                    ability: 'special_attacks'
                },
                80: {
                    name: 'Weapon Master',
                    description: 'Critical hit chance doubled',
                    bonus: 'critical_boost'
                },
                100: {
                    name: 'Legendary Warrior',
                    description: 'Warrior ending unlocked, NPCs fear you',
                    title: 'Champion'
                }
            },

            alchemy: {
                20: {
                    name: 'Ingredient Knowledge',
                    description: 'See ingredient properties',
                    ability: 'identify_ingredients'
                },
                40: {
                    name: 'Efficient Mixing',
                    description: 'Crafting requires 25% fewer ingredients',
                    bonus: 'reduced_ingredient_cost'
                },
                60: {
                    name: 'Recipe Intuition',
                    description: 'Discover hidden recipes',
                    ability: 'unlock_recipes'
                },
                80: {
                    name: 'Master Alchemist',
                    description: 'Create rare potions',
                    ability: 'rare_potions'
                },
                100: {
                    name: 'Grand Alchemist',
                    description: 'Dr. Cranium\'s full respect, all recipes',
                    title: 'Transmutation Master'
                }
            }
        };

        this.init();
    }

    init() {
        this.loadSkills();
        this.setupEventListeners();
        this.createSkillsUI();
        console.log('⚡ Skill Mastery & Progression System loaded');
    }

    loadSkills() {
        const saved = localStorage.getItem('user_skills');
        if (saved) {
            const savedSkills = JSON.parse(saved);
            Object.keys(this.skills).forEach(skill => {
                if (savedSkills[skill]) {
                    this.skills[skill].current = savedSkills[skill];
                }
            });
        }
    }

    saveSkills() {
        const skillValues = {};
        Object.keys(this.skills).forEach(skill => {
            skillValues[skill] = this.skills[skill].current;
        });
        localStorage.setItem('user_skills', JSON.stringify(skillValues));

        // Also send to DynamoDB
        this.syncToDynamoDB(skillValues);
    }

    async syncToDynamoDB(skillValues) {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            await fetch('https://api.terrellflautt.com/tracking/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    eventType: 'skill_update',
                    skills: skillValues,
                    timestamp: Date.now()
                })
            });
        } catch (error) {
            console.error('Skill sync error:', error);
        }
    }

    /**
     * CORE METHOD: Increase skill by doing an action
     */
    gainSkillExperience(skillName, actionType) {
        const skill = this.skills[skillName];
        if (!skill) return;

        const gainAmount = this.skillGainActions[skillName]?.[actionType] || 0;
        if (gainAmount === 0) return;

        const previousLevel = this.getSkillLevel(skillName);
        skill.current = Math.min(skill.max, skill.current + gainAmount);
        const newLevel = this.getSkillLevel(skillName);

        this.saveSkills();

        // Show skill gain notification
        this.showSkillGain(skill, gainAmount);

        // Check for level up
        if (newLevel > previousLevel) {
            this.handleLevelUp(skillName, newLevel);
        }

        // Update UI
        this.updateSkillsUI();

        // Dispatch event for other systems
        window.dispatchEvent(new CustomEvent('skill-gained', {
            detail: { skillName, actionType, amount: gainAmount, newValue: skill.current }
        }));
    }

    getSkillLevel(skillName) {
        const skill = this.skills[skillName];
        const thresholds = skill.levelThresholds;

        for (let i = thresholds.length - 1; i >= 0; i--) {
            if (skill.current >= thresholds[i]) {
                return i;
            }
        }
        return 0;
    }

    getSkillLevelName(skillName) {
        const level = this.getSkillLevel(skillName);
        return this.skills[skillName].levelNames[level];
    }

    handleLevelUp(skillName, newLevel) {
        const skill = this.skills[skillName];
        const unlock = this.skillUnlocks[skillName][skill.levelThresholds[newLevel]];

        if (unlock) {
            this.showLevelUpNotification(skill, newLevel, unlock);

            // Apply unlock abilities
            if (unlock.ability) {
                this.activateAbility(unlock.ability);
            }
            if (unlock.title) {
                this.unlockTitle(unlock.title);
            }

            // Aziza comments on mastery
            if (newLevel >= 4) {
                this.azizaCommentOnMastery(skillName, newLevel);
            }
        }
    }

    showSkillGain(skill, amount) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: linear-gradient(135deg, rgba(75, 0, 130, 0.95), rgba(138, 43, 226, 0.9));
            color: #DDA0DD;
            padding: 10px 20px;
            border-radius: 8px;
            border: 2px solid #DDA0DD;
            font-size: 14px;
            z-index: 25000;
            animation: skillGainSlide 0.5s ease-out;
        `;

        notification.innerHTML = `
            ${skill.icon} <strong>${skill.name}</strong> +${amount}
            <div style="font-size: 12px; opacity: 0.8; margin-top: 3px;">
                ${skill.current}/${skill.max} (${this.getSkillLevelName(skill.name)})
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'skillGainFade 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }

    showLevelUpNotification(skill, level, unlock) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 30000;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.5s ease-out;
        `;

        modal.innerHTML = `
            <div style="background: linear-gradient(135deg, #4B0082, #8A2BE2);
                        border: 3px solid #FFD700;
                        border-radius: 15px;
                        padding: 40px;
                        max-width: 500px;
                        text-align: center;
                        color: #FFD700;
                        box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);">
                <div style="font-size: 72px; margin-bottom: 20px;">⭐</div>
                <h2 style="font-size: 32px; margin-bottom: 10px;">LEVEL UP!</h2>
                <div style="font-size: 48px; margin-bottom: 20px;">${skill.icon}</div>
                <div style="font-size: 24px; margin-bottom: 10px;">${skill.name}</div>
                <div style="font-size: 20px; margin-bottom: 30px; color: #DDA0DD;">
                    ${skill.levelNames[level]}
                </div>
                <div style="background: rgba(0, 0, 0, 0.5);
                            border-radius: 10px;
                            padding: 20px;
                            margin-bottom: 30px;">
                    <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">
                        ${unlock.name}
                    </div>
                    <div style="font-size: 14px; opacity: 0.9;">
                        ${unlock.description}
                    </div>
                </div>
                <button onclick="this.closest('[style*=fixed]').remove()"
                        style="padding: 15px 40px;
                               background: linear-gradient(135deg, #FFD700, #FFA500);
                               border: none;
                               border-radius: 8px;
                               color: #000;
                               font-size: 18px;
                               font-weight: bold;
                               cursor: pointer;
                               box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);">
                    Continue
                </button>
            </div>
        `;

        document.body.appendChild(modal);
    }

    azizaCommentOnMastery(skillName, level) {
        const comments = {
            magic: {
                4: "The arcane flows through you now... Aziza sees the wizard you are becoming.",
                5: "Master of the mystic arts. Even Aziza must acknowledge your power."
            },
            stealth: {
                4: "The shadows embrace you. You walk between worlds unseen.",
                5: "Perfect silence. Perfect invisibility. You have transcended form itself."
            },
            diplomacy: {
                4: "Your words shape reality. Aziza listens when you speak.",
                5: "The voice of peace. Wars end when you enter the room."
            },
            combat: {
                4: "A warrior of legend. Aziza respects strength tempered with skill.",
                5: "Unstoppable. Undefeatable. The Champion walks among us."
            },
            alchemy: {
                4: "You transform the mundane into the miraculous. True alchemy.",
                5: "Grand Alchemist. You rival even Dr. Cranium's mastery."
            }
        };

        const comment = comments[skillName]?.[level];
        if (!comment) return;

        setTimeout(() => {
            if (window.craftingSystem) {
                window.craftingSystem.showAzizaNarration(comment);
            }
        }, 3000);
    }

    activateAbility(abilityName) {
        // Store activated abilities
        const abilities = JSON.parse(localStorage.getItem('unlocked_abilities') || '[]');
        if (!abilities.includes(abilityName)) {
            abilities.push(abilityName);
            localStorage.setItem('unlocked_abilities', JSON.stringify(abilities));
        }

        // Apply ability effects
        switch(abilityName) {
            case 'detect_magic':
                this.activateDetectMagic();
                break;
            case 'highlight_secrets':
                this.activateHighlightSecrets();
                break;
            case 'unlock_dialogue_paths':
                this.unlockNewDialogue();
                break;
            case 'combat_avoidance':
                this.enableCombatAvoidance();
                break;
        }
    }

    activateDetectMagic() {
        // Add subtle glow to magical elements
        document.querySelectorAll('.logo-container, #particles, .terminal-body').forEach(el => {
            el.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.5)';
        });
    }

    activateHighlightSecrets() {
        // Add pulse animation to secret locations
        const secretElements = document.querySelectorAll('[data-project], .skill-item, #contact');
        secretElements.forEach(el => {
            const highlight = document.createElement('div');
            highlight.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                width: 10px;
                height: 10px;
                background: #FFD700;
                border-radius: 50%;
                animation: secretPulse 2s ease-in-out infinite;
                pointer-events: none;
            `;
            el.style.position = 'relative';
            el.appendChild(highlight);
        });
    }

    unlockNewDialogue() {
        // Signal to NPC system that diplomatic options are available
        window.dispatchEvent(new CustomEvent('diplomacy-unlocked', {
            detail: { level: this.getSkillLevel('diplomacy') }
        }));
    }

    enableCombatAvoidance() {
        // Reduce random combat encounter rate
        if (window.arabianCombatSystem) {
            window.arabianCombatSystem.stealthModifier = 0.5; // 50% less encounters
        }
    }

    unlockTitle(title) {
        const titles = JSON.parse(localStorage.getItem('unlocked_titles') || '[]');
        if (!titles.includes(title)) {
            titles.push(title);
            localStorage.setItem('unlocked_titles', JSON.stringify(titles));
        }
    }

    createSkillsUI() {
        const button = document.createElement('button');
        button.id = 'skills-btn';
        button.textContent = '⚡';
        button.title = 'Skills';
        button.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: linear-gradient(135deg, #4B0082, #8A2BE2);
            color: #DDA0DD;
            border: 2px solid #DDA0DD;
            padding: 15px;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 28px;
            cursor: pointer;
            z-index: 14000;
            box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4);
            transition: all 0.3s ease;
        `;

        button.addEventListener('click', () => this.showSkillsPanel());
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 10px 25px rgba(138, 43, 226, 0.6)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 5px 15px rgba(138, 43, 226, 0.4)';
        });

        document.body.appendChild(button);
    }

    showSkillsPanel() {
        const modal = document.createElement('div');
        modal.id = 'skills-modal';
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
            animation: fadeIn 0.3s ease-out;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 3px solid #8A2BE2;
            border-radius: 15px;
            padding: 40px;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            color: #DDA0DD;
        `;

        content.innerHTML = `
            <h2 style="text-align: center; margin-bottom: 30px; font-size: 32px; color: #FFD700;">
                ⚡ Your Skills ⚡
            </h2>
            ${Object.keys(this.skills).map(skillKey => this.renderSkillBar(skillKey)).join('')}
            <button onclick="document.getElementById('skills-modal').remove()"
                    style="margin-top: 30px; padding: 15px 40px; width: 100%;
                           background: #8A2BE2; color: #fff; border: 2px solid #DDA0DD;
                           border-radius: 8px; cursor: pointer; font-size: 16px;">
                Close
            </button>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    renderSkillBar(skillKey) {
        const skill = this.skills[skillKey];
        const level = this.getSkillLevel(skillKey);
        const levelName = this.getSkillLevelName(skillKey);
        const percentage = (skill.current / skill.max) * 100;

        return `
            <div style="margin-bottom: 25px; background: rgba(138, 43, 226, 0.1);
                        padding: 15px; border-radius: 10px; border: 1px solid #8A2BE2;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <div style="font-size: 20px;">
                        ${skill.icon} <strong>${skill.name}</strong>
                    </div>
                    <div style="font-size: 16px; color: #FFD700;">
                        ${levelName}
                    </div>
                </div>
                <div style="font-size: 12px; opacity: 0.8; margin-bottom: 10px;">
                    ${skill.description}
                </div>
                <div style="background: rgba(0, 0, 0, 0.5); border-radius: 10px; height: 30px;
                            position: relative; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #8A2BE2, #DDA0DD);
                                height: 100%; width: ${percentage}%;
                                transition: width 0.5s ease;
                                border-radius: 10px;"></div>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                                color: #fff; font-size: 14px; font-weight: bold;">
                        ${skill.current} / ${skill.max}
                    </div>
                </div>
            </div>
        `;
    }

    updateSkillsUI() {
        // Update skill panel if open
        const modal = document.getElementById('skills-modal');
        if (modal) {
            const content = modal.querySelector('div');
            // Refresh the content
            this.showSkillsPanel();
            modal.remove();
        }
    }

    setupEventListeners() {
        // Listen for actions that should grant skill experience

        // Magic skill events
        window.addEventListener('spell-cast', (e) => {
            this.gainSkillExperience('magic', 'cast_spell');
        });

        window.addEventListener('elemental-defeated', (e) => {
            if (e.detail.method === 'magic') {
                this.gainSkillExperience('magic', 'defeat_elemental_with_magic');
            }
        });

        // Stealth skill events
        window.addEventListener('secret-discovered', () => {
            this.gainSkillExperience('stealth', 'discover_secret');
        });

        window.addEventListener('item-collected', (e) => {
            this.gainSkillExperience('stealth', 'find_hidden_item');
        });

        // Diplomacy skill events
        window.addEventListener('dialogue-choice', (e) => {
            if (e.detail.choiceType === 'diplomatic') {
                this.gainSkillExperience('diplomacy', 'choose_wise_dialogue');
            }
        });

        window.addEventListener('npc-befriended', () => {
            this.gainSkillExperience('diplomacy', 'gain_trust');
        });

        // Combat skill events
        window.addEventListener('combat-victory', () => {
            this.gainSkillExperience('combat', 'win_battle');
        });

        window.addEventListener('attack-successful', () => {
            this.gainSkillExperience('combat', 'successful_attack');
        });

        // Alchemy skill events
        window.addEventListener('item-crafted', (e) => {
            this.gainSkillExperience('alchemy', 'craft_potion');
        });
    }

    // Public API
    getSkill(skillName) {
        return this.skills[skillName]?.current || 0;
    }

    hasAbility(abilityName) {
        const abilities = JSON.parse(localStorage.getItem('unlocked_abilities') || '[]');
        return abilities.includes(abilityName);
    }

    getUnlockedTitles() {
        return JSON.parse(localStorage.getItem('unlocked_titles') || '[]');
    }

    getUnlockedSkills() {
        // Return list of all unlocked skills across all categories
        const unlockedSkills = [];
        const skills = JSON.parse(localStorage.getItem('skill_progress') || '{}');

        Object.keys(skills).forEach(category => {
            if (skills[category] && skills[category].unlocked) {
                unlockedSkills.push({
                    category,
                    level: skills[category].level || 1,
                    progress: skills[category].progress || 0
                });
            }
        });

        return unlockedSkills;
    }
}

// Add CSS animations
(function() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        @keyframes skillGainSlide {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes skillGainFade {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
        @keyframes secretPulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(styleEl);
})();

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.skillMasterySystem = new SkillMasteryProgression();
    });
} else {
    window.skillMasterySystem = new SkillMasteryProgression();
}
