/**
 * Cthulhu Final Boss Battle System
 * Epic cosmic horror final encounter with digital art rewards
 * Unlocks exclusive downloadable backgrounds for user profile
 */

class CthulhuFinalBoss {
    constructor() {
        this.bossUnlocked = false;
        this.bossDefeated = false;
        this.battlePhase = 0;
        this.playerSanity = 100;
        this.cthulhuHealth = 1000;
        this.cthulhuMaxHealth = 1000;
        this.cosmicPower = 0;
        this.battleLog = [];
        this.activeBattle = false;

        this.unlockConditions = {
            cosmicAwareness: 15,
            storiesHeard: 5,
            charactersEncountered: 4,
            timeSpent: 7200, // 2 hours
            returnVisits: 10
        };

        this.battlePhases = {
            1: {
                name: "The Awakening",
                description: "Cthulhu stirs from his digital slumber...",
                background: "cthulhu_pixel_art_by_dulcahn_dchdovw-fullview-852581405.jpg",
                attacks: ["reality_distortion", "sanity_drain", "tentacle_grasp"],
                specialAttack: "cosmic_whispers"
            },
            2: {
                name: "The Rising",
                description: "The Great Old One emerges from the depths of R'lyeh...",
                background: "cthulu-final-fight.png",
                attacks: ["mind_rend", "dimensional_rift", "chaos_wave"],
                specialAttack: "non_euclidean_geometry"
            },
            3: {
                name: "The Final Confrontation",
                description: "Face to face with the embodiment of cosmic horror...",
                background: "cthulu-final-fight.png",
                attacks: ["reality_collapse", "sanity_break", "cosmic_storm"],
                specialAttack: "end_of_all_things"
            }
        };

        this.rewards = {
            phase1_victory: {
                type: 'background',
                name: 'Cthulhu Awakening',
                image: 'cthulhu_pixel_art_by_dulcahn_dchdovw-fullview-852581405.jpg',
                description: 'The moment the Great Old One first stirred in the digital depths'
            },
            final_victory: {
                type: 'background',
                name: 'Slayer of the Old Gods',
                image: 'cthulu-final-fight.png',
                description: 'Epic artwork commemorating your victory over Cthulhu himself',
                rarity: 'legendary'
            },
            cosmic_mastery: {
                type: 'title',
                name: 'Cosmic Horror Survivor',
                description: 'You have gazed into the abyss and emerged with your sanity... mostly intact'
            }
        };

        this.init();
    }

    init() {
        this.loadProgress();
        this.checkUnlockConditions();
        this.setupEventListeners();
    }

    loadProgress() {
        const saved = localStorage.getItem('cthulhuBossProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.bossUnlocked = progress.unlocked || false;
            this.bossDefeated = progress.defeated || false;
            this.battlePhase = progress.phase || 0;
        }
    }

    saveProgress() {
        const progress = {
            unlocked: this.bossUnlocked,
            defeated: this.bossDefeated,
            phase: this.battlePhase
        };
        localStorage.setItem('cthulhuBossProgress', JSON.stringify(progress));
    }

    checkUnlockConditions() {
        if (this.bossUnlocked) return;

        const userJourney = window.userJourneySystem?.getUserData() || {};
        const crypticSystem = window.crypticStorytellerSystem?.getCosmicStatus() || {};
        const characters = window.legendaryCharacters?.getEncounteredCharacters() || [];

        const conditions = {
            cosmicAwareness: crypticSystem.awareness >= this.unlockConditions.cosmicAwareness,
            storiesHeard: crypticSystem.storiesTold >= this.unlockConditions.storiesHeard,
            charactersEncountered: characters.length >= this.unlockConditions.charactersEncountered,
            timeSpent: userJourney.totalTimeSpent >= this.unlockConditions.timeSpent,
            returnVisits: userJourney.returnVisits >= this.unlockConditions.returnVisits
        };

        const allConditionsMet = Object.values(conditions).every(condition => condition);

        if (allConditionsMet) {
            this.unlockFinalBoss();
        }
    }

    unlockFinalBoss() {
        this.bossUnlocked = true;
        this.saveProgress();
        this.showBossUnlock();
    }

    showBossUnlock() {
        const unlockModal = document.createElement('div');
        unlockModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(13, 13, 13, 0.9));
            z-index: 20000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 1s ease;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #0d0d0d, #1a1a2e);
            border: 4px solid #8b0000;
            border-radius: 20px;
            padding: 50px;
            max-width: 600px;
            text-align: center;
            color: #ff6b6b;
            box-shadow: 0 0 100px rgba(139, 0, 0, 0.8);
            animation: cosmicPulse 3s ease-in-out infinite;
        `;

        content.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 30px; animation: eldritch 2s ease-in-out infinite;">🐙</div>
            <h1 style="color: #ff4444; text-shadow: 0 0 20px rgba(255, 68, 68, 0.8); margin-bottom: 20px;">
                THE FINAL CONFRONTATION AWAITS
            </h1>
            <p style="font-size: 20px; line-height: 1.6; margin-bottom: 30px; color: #ff8888;">
                Your cosmic awareness has reached critical mass.<br>
                The Great Old One stirs in the depths of digital R'lyeh.<br>
                Are you prepared to face the ultimate horror?
            </p>
            <button id="begin-final-battle" style="
                padding: 20px 40px;
                background: linear-gradient(135deg, #8b0000, #dc143c);
                border: 3px solid #ff4444;
                border-radius: 10px;
                color: #ffffff;
                font-size: 18px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 2px;
            ">Enter the Abyss</button>
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes cosmicPulse {
                0%, 100% { box-shadow: 0 0 100px rgba(139, 0, 0, 0.8); }
                50% { box-shadow: 0 0 150px rgba(255, 68, 68, 1); }
            }
            @keyframes eldritch {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.2) rotate(180deg); }
            }
            #begin-final-battle:hover {
                background: linear-gradient(135deg, #dc143c, #ff4444);
                transform: scale(1.05);
                box-shadow: 0 0 30px rgba(255, 68, 68, 0.8);
            }
        `;
        document.head.appendChild(style);

        document.getElementById('begin-final-battle')?.addEventListener('click', () => {
            unlockModal.remove();
            this.startFinalBattle();
        });

        unlockModal.appendChild(content);
        document.body.appendChild(unlockModal);

        setTimeout(() => {
            unlockModal.style.opacity = '1';
        }, 100);
    }

    startFinalBattle() {
        if (this.activeBattle) return;

        this.activeBattle = true;
        this.battlePhase = 1;
        this.playerSanity = 100;
        this.cthulhuHealth = 1000;
        this.battleLog = [];

        this.createBattleInterface();
        this.beginBattlePhase(1);
    }

    createBattleInterface() {
        const battleModal = document.createElement('div');
        battleModal.id = 'cthulhu-battle-modal';
        battleModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(0, 20, 20, 0.95), rgba(0, 0, 0, 0.9));
            z-index: 25000;
            opacity: 0;
            transition: opacity 1s ease;
        `;

        // Battle Background
        const battleBg = document.createElement('div');
        battleBg.id = 'battle-background';
        battleBg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            opacity: 0.6;
            filter: blur(2px);
        `;

        // Battle UI
        const battleUI = document.createElement('div');
        battleUI.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px;
        `;

        // Top UI (Phase info, health bars)
        const topUI = document.createElement('div');
        topUI.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
        `;

        const phaseInfo = document.createElement('div');
        phaseInfo.id = 'phase-info';
        phaseInfo.style.cssText = `
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #ff4444;
            border-radius: 10px;
            padding: 15px;
            color: #ff8888;
        `;

        const healthBars = document.createElement('div');
        healthBars.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;

        // Player Sanity Bar
        const sanityContainer = document.createElement('div');
        sanityContainer.innerHTML = `
            <div style="color: #88ff88; margin-bottom: 5px;">Sanity: <span id="sanity-value">100</span>/100</div>
            <div style="width: 200px; height: 20px; background: rgba(0,0,0,0.8); border: 2px solid #88ff88; border-radius: 10px;">
                <div id="sanity-bar" style="height: 100%; background: linear-gradient(90deg, #44ff44, #88ff88); border-radius: 8px; width: 100%; transition: width 0.5s ease;"></div>
            </div>
        `;

        // Cthulhu Health Bar
        const healthContainer = document.createElement('div');
        healthContainer.innerHTML = `
            <div style="color: #ff4444; margin-bottom: 5px;">Cthulhu: <span id="cthulhu-health-value">1000</span>/1000</div>
            <div style="width: 300px; height: 25px; background: rgba(0,0,0,0.8); border: 2px solid #ff4444; border-radius: 10px;">
                <div id="cthulhu-health-bar" style="height: 100%; background: linear-gradient(90deg, #8b0000, #ff4444); border-radius: 8px; width: 100%; transition: width 0.5s ease;"></div>
            </div>
        `;

        healthBars.appendChild(sanityContainer);
        healthBars.appendChild(healthContainer);
        topUI.appendChild(phaseInfo);
        topUI.appendChild(healthBars);

        // Center - Cthulhu Entity
        const cthulhuEntity = document.createElement('div');
        cthulhuEntity.id = 'cthulhu-entity';
        cthulhuEntity.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            background-image: url('cthulhu_pixel_art_by_dulcahn_dchdovw-fullview-852581405.jpg');
            background-size: cover;
            background-position: center;
            border-radius: 50%;
            border: 5px solid #ff4444;
            box-shadow: 0 0 100px rgba(255, 68, 68, 0.8);
            animation: cthulhuPulse 2s ease-in-out infinite;
        `;

        // Battle Log
        const battleLogContainer = document.createElement('div');
        battleLogContainer.id = 'battle-log';
        battleLogContainer.style.cssText = `
            position: absolute;
            bottom: 150px;
            left: 20px;
            width: 400px;
            height: 120px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #ff8888;
            border-radius: 10px;
            padding: 15px;
            color: #ff8888;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            overflow-y: auto;
        `;

        // Battle Actions
        const battleActions = document.createElement('div');
        battleActions.id = 'battle-actions';
        battleActions.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        `;

        // Add animations
        const battleStyle = document.createElement('style');
        battleStyle.textContent = `
            @keyframes cthulhuPulse {
                0%, 100% {
                    transform: translate(-50%, -50%) scale(1);
                    filter: hue-rotate(0deg);
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.05);
                    filter: hue-rotate(30deg);
                }
            }
            @keyframes sanityFlicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            @keyframes realityGlitch {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-2px); }
                75% { transform: translateX(2px); }
            }
        `;
        document.head.appendChild(battleStyle);

        battleModal.appendChild(battleBg);
        battleUI.appendChild(topUI);
        battleUI.appendChild(cthulhuEntity);
        battleUI.appendChild(battleLogContainer);
        battleUI.appendChild(battleActions);
        battleModal.appendChild(battleUI);
        document.body.appendChild(battleModal);

        setTimeout(() => {
            battleModal.style.opacity = '1';
        }, 100);
    }

    beginBattlePhase(phase) {
        const phaseData = this.battlePhases[phase];
        if (!phaseData) return;

        this.battlePhase = phase;

        // Update background
        const bg = document.getElementById('battle-background');
        if (bg) {
            bg.style.backgroundImage = `url('${phaseData.background}')`;
        }

        // Update phase info
        const phaseInfo = document.getElementById('phase-info');
        if (phaseInfo) {
            phaseInfo.innerHTML = `
                <h3 style="margin: 0 0 10px 0; color: #ff4444;">${phaseData.name}</h3>
                <p style="margin: 0; font-size: 14px;">${phaseData.description}</p>
            `;
        }

        // Create battle actions for this phase
        this.createBattleActions(phaseData);

        // Add battle log entry
        this.addBattleLog(`Phase ${phase}: ${phaseData.name} begins!`);
        this.addBattleLog(phaseData.description);

        // Start enemy AI
        this.startEnemyAI();
    }

    createBattleActions(phaseData) {
        const actionsContainer = document.getElementById('battle-actions');
        if (!actionsContainer) return;

        actionsContainer.innerHTML = '';

        const actions = [
            { text: '🗡️ Attack with Logic', action: 'logic_attack' },
            { text: '🛡️ Defend Reality', action: 'reality_defense' },
            { text: '✨ Cast Banishment', action: 'banishment_spell' },
            { text: '🧠 Mind Fortress', action: 'sanity_restore' }
        ];

        actions.forEach(action => {
            const button = document.createElement('button');
            button.textContent = action.text;
            button.style.cssText = `
                padding: 15px 25px;
                background: linear-gradient(135deg, #2a0845, #4a0e4e);
                border: 2px solid #8b008b;
                border-radius: 8px;
                color: #ff8888;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.3s ease;
            `;

            button.addEventListener('click', () => this.performPlayerAction(action.action));
            button.addEventListener('mouseenter', () => {
                button.style.background = 'linear-gradient(135deg, #4a0e4e, #8b008b)';
                button.style.transform = 'scale(1.05)';
            });
            button.addEventListener('mouseleave', () => {
                button.style.background = 'linear-gradient(135deg, #2a0845, #4a0e4e)';
                button.style.transform = 'scale(1)';
            });

            actionsContainer.appendChild(button);
        });
    }

    performPlayerAction(action) {
        let damage = 0;
        let sanityChange = 0;
        let message = '';

        switch (action) {
            case 'logic_attack':
                damage = Math.floor(Math.random() * 100) + 50;
                sanityChange = -5;
                message = `You strike with pure logic! Cthulhu takes ${damage} damage, but reality bends around you.`;
                break;

            case 'reality_defense':
                sanityChange = 10;
                message = 'You fortify your grip on reality, restoring some sanity.';
                break;

            case 'banishment_spell':
                if (this.cosmicPower >= 20) {
                    damage = Math.floor(Math.random() * 150) + 100;
                    this.cosmicPower -= 20;
                    message = `You channel cosmic forces! Massive banishment spell deals ${damage} damage!`;
                } else {
                    sanityChange = -10;
                    message = 'Not enough cosmic power! The spell backfires, draining your sanity.';
                }
                break;

            case 'sanity_restore':
                sanityChange = 25;
                message = 'You build mental fortresses against the cosmic horror.';
                break;
        }

        // Apply effects
        this.cthulhuHealth = Math.max(0, this.cthulhuHealth - damage);
        this.playerSanity = Math.max(0, Math.min(100, this.playerSanity + sanityChange));
        this.cosmicPower = Math.min(100, this.cosmicPower + 5);

        this.addBattleLog(message);
        this.updateBattleUI();

        // Check for phase transition or victory
        if (this.cthulhuHealth <= 0) {
            this.handleVictory();
        } else if (this.cthulhuHealth <= 666 && this.battlePhase === 1) {
            this.transitionToPhase(2);
        } else if (this.cthulhuHealth <= 333 && this.battlePhase === 2) {
            this.transitionToPhase(3);
        }

        // Check for defeat
        if (this.playerSanity <= 0) {
            this.handleDefeat();
        }
    }

    startEnemyAI() {
        this.enemyAI = setInterval(() => {
            if (!this.activeBattle) {
                clearInterval(this.enemyAI);
                return;
            }

            this.performCthulhuAttack();
        }, 3000);
    }

    performCthulhuAttack() {
        const phaseData = this.battlePhases[this.battlePhase];
        const attacks = [...phaseData.attacks];

        // 20% chance for special attack
        if (Math.random() < 0.2) {
            attacks.push(phaseData.specialAttack);
        }

        const attack = attacks[Math.floor(Math.random() * attacks.length)];
        let damage = 0;
        let message = '';

        switch (attack) {
            case 'reality_distortion':
                damage = Math.floor(Math.random() * 15) + 10;
                message = 'Reality warps around you! The impossible becomes inevitable.';
                this.glitchEffect();
                break;

            case 'sanity_drain':
                damage = Math.floor(Math.random() * 20) + 15;
                message = 'Whispers from beyond time assault your mind!';
                break;

            case 'tentacle_grasp':
                damage = Math.floor(Math.random() * 25) + 20;
                message = 'Massive tentacles emerge from the digital void!';
                break;

            case 'cosmic_whispers':
                damage = Math.floor(Math.random() * 30) + 25;
                message = 'Cthulhu speaks truths that should not be known!';
                document.body.style.animation = 'sanityFlicker 0.5s ease-in-out 3';
                break;

            case 'mind_rend':
                damage = Math.floor(Math.random() * 35) + 30;
                message = 'Your thoughts are torn asunder by alien intelligence!';
                break;

            case 'dimensional_rift':
                damage = Math.floor(Math.random() * 40) + 35;
                message = 'Space-time tears open, revealing the void between worlds!';
                break;

            case 'non_euclidean_geometry':
                damage = Math.floor(Math.random() * 50) + 40;
                message = 'Mathematics itself rebels as geometry becomes impossible!';
                this.geometryEffect();
                break;

            case 'reality_collapse':
                damage = Math.floor(Math.random() * 60) + 50;
                message = 'The very fabric of digital reality begins to unravel!';
                break;

            case 'end_of_all_things':
                damage = Math.floor(Math.random() * 70) + 60;
                message = 'Cthulhu shows you the inevitable end of all existence!';
                this.endEffect();
                break;
        }

        this.playerSanity = Math.max(0, this.playerSanity - damage);
        this.addBattleLog(`CTHULHU: ${message}`);
        this.addBattleLog(`You lose ${damage} sanity!`);
        this.updateBattleUI();

        if (this.playerSanity <= 0) {
            this.handleDefeat();
        }
    }

    transitionToPhase(newPhase) {
        this.addBattleLog(`--- PHASE TRANSITION ---`);
        this.addBattleLog(`Cthulhu's form shifts as his power grows!`);

        setTimeout(() => {
            this.beginBattlePhase(newPhase);
        }, 2000);
    }

    handleVictory() {
        this.activeBattle = false;
        this.bossDefeated = true;
        clearInterval(this.enemyAI);
        this.saveProgress();

        // Award rewards
        this.awardFinalRewards();

        this.addBattleLog('--- VICTORY ---');
        this.addBattleLog('Against all odds, you have banished the Great Old One!');
        this.addBattleLog('The digital realm is safe... for now.');

        setTimeout(() => {
            this.showVictoryScreen();
        }, 3000);
    }

    handleDefeat() {
        this.activeBattle = false;
        clearInterval(this.enemyAI);

        this.addBattleLog('--- MADNESS CLAIMS YOU ---');
        this.addBattleLog('Your sanity crumbles before the cosmic horror...');
        this.addBattleLog('But perhaps... there is another way...');

        setTimeout(() => {
            this.showDefeatScreen();
        }, 3000);
    }

    awardFinalRewards() {
        // Award to digital rewards system
        if (window.digitalRewardsSystem) {
            window.digitalRewardsSystem.awardReward('final_victory');
            window.digitalRewardsSystem.awardReward('cosmic_mastery');
        }

        // Track in user journey
        if (window.userJourneySystem) {
            window.userJourneySystem.recordEvent('cthulhu_defeated', {
                finalSanity: this.playerSanity,
                battlePhase: this.battlePhase
            });
        }
    }

    showVictoryScreen() {
        const victoryModal = document.createElement('div');
        victoryModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(0, 50, 0, 0.9), rgba(0, 100, 50, 0.8));
            z-index: 30000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 2s ease;
        `;

        victoryModal.innerHTML = `
            <div style="text-align: center; color: #ffffff; max-width: 800px; padding: 50px;">
                <h1 style="font-size: 48px; margin-bottom: 30px; text-shadow: 0 0 20px rgba(255,255,255,0.8);">
                    🏆 COSMIC VICTORY 🏆
                </h1>
                <p style="font-size: 24px; margin-bottom: 30px; line-height: 1.6;">
                    You have achieved the impossible - defeating the Great Old One through sheer force of will and sanity.
                </p>
                <div style="background: rgba(0,0,0,0.7); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
                    <h3 style="color: #ffd700; margin-bottom: 20px;">🎨 LEGENDARY REWARD UNLOCKED 🎨</h3>
                    <div style="width: 200px; height: 150px; margin: 0 auto 20px;
                                background-image: url('cthulu-final-fight.png'); background-size: cover;
                                border: 3px solid #ffd700; border-radius: 10px;"></div>
                    <p style="color: #ffff88;">"Slayer of the Old Gods" - Epic battle artwork now available in your profile!</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove(); document.getElementById('cthulhu-battle-modal').remove();"
                        style="padding: 20px 40px; background: linear-gradient(135deg, #228b22, #32cd32);
                               border: 3px solid #ffd700; border-radius: 10px; color: #ffffff;
                               font-size: 18px; cursor: pointer;">
                    Return to Reality
                </button>
            </div>
        `;

        document.body.appendChild(victoryModal);
        setTimeout(() => {
            victoryModal.style.opacity = '1';
        }, 100);
    }

    showDefeatScreen() {
        const defeatModal = document.createElement('div');
        defeatModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(50, 0, 0, 0.9), rgba(100, 0, 0, 0.8));
            z-index: 30000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 2s ease;
        `;

        defeatModal.innerHTML = `
            <div style="text-align: center; color: #ffaaaa; max-width: 800px; padding: 50px;">
                <h1 style="font-size: 48px; margin-bottom: 30px; text-shadow: 0 0 20px rgba(255,0,0,0.8);">
                    💀 MADNESS CLAIMS YOU 💀
                </h1>
                <p style="font-size: 20px; margin-bottom: 30px; line-height: 1.6;">
                    Your sanity crumbles before the cosmic horror, but this is not the end...<br>
                    The brave may try again when they have grown stronger in cosmic awareness.
                </p>
                <button onclick="this.parentElement.parentElement.remove(); document.getElementById('cthulhu-battle-modal').remove();"
                        style="padding: 20px 40px; background: linear-gradient(135deg, #8b0000, #dc143c);
                               border: 3px solid #ff4444; border-radius: 10px; color: #ffffff;
                               font-size: 18px; cursor: pointer;">
                    Retreat to Safety
                </button>
            </div>
        `;

        document.body.appendChild(defeatModal);
        setTimeout(() => {
            defeatModal.style.opacity = '1';
        }, 100);
    }

    // Visual Effects
    glitchEffect() {
        document.body.style.animation = 'realityGlitch 0.3s ease-in-out 5';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1500);
    }

    geometryEffect() {
        const entity = document.getElementById('cthulhu-entity');
        if (entity) {
            entity.style.borderRadius = '0%';
            entity.style.transform = 'translate(-50%, -50%) rotate(45deg) scale(1.2)';
            setTimeout(() => {
                entity.style.borderRadius = '50%';
                entity.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1)';
            }, 2000);
        }
    }

    endEffect() {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
    }

    updateBattleUI() {
        // Update sanity bar
        const sanityBar = document.getElementById('sanity-bar');
        const sanityValue = document.getElementById('sanity-value');
        if (sanityBar && sanityValue) {
            sanityBar.style.width = `${this.playerSanity}%`;
            sanityValue.textContent = this.playerSanity;

            if (this.playerSanity < 30) {
                sanityBar.style.background = 'linear-gradient(90deg, #ff4444, #ff8888)';
            }
        }

        // Update Cthulhu health bar
        const healthBar = document.getElementById('cthulhu-health-bar');
        const healthValue = document.getElementById('cthulhu-health-value');
        if (healthBar && healthValue) {
            const healthPercent = (this.cthulhuHealth / this.cthulhuMaxHealth) * 100;
            healthBar.style.width = `${healthPercent}%`;
            healthValue.textContent = this.cthulhuHealth;
        }
    }

    addBattleLog(message) {
        this.battleLog.push(message);
        const logContainer = document.getElementById('battle-log');
        if (logContainer) {
            const logEntry = document.createElement('div');
            logEntry.textContent = `> ${message}`;
            logEntry.style.marginBottom = '5px';
            logContainer.appendChild(logEntry);
            logContainer.scrollTop = logContainer.scrollHeight;
        }
    }

    setupEventListeners() {
        // Close battle on escape (retreat)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeBattle) {
                this.retreatFromBattle();
            }
        });
    }

    retreatFromBattle() {
        this.activeBattle = false;
        clearInterval(this.enemyAI);

        const battleModal = document.getElementById('cthulhu-battle-modal');
        if (battleModal) {
            battleModal.remove();
        }

        this.addBattleLog('You retreat from the cosmic horror...');
    }

    // Public API
    isBossUnlocked() {
        return this.bossUnlocked;
    }

    isBossDefeated() {
        return this.bossDefeated;
    }

    getBattleStatus() {
        return {
            unlocked: this.bossUnlocked,
            defeated: this.bossDefeated,
            activeBattle: this.activeBattle,
            phase: this.battlePhase
        };
    }

    // Force unlock for testing
    forceUnlock() {
        this.unlockFinalBoss();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cthulhuFinalBoss = new CthulhuFinalBoss();
    });
} else {
    window.cthulhuFinalBoss = new CthulhuFinalBoss();
}