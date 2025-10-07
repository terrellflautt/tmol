/**
 * Arabian Combat System
 * Turn-based combat with animated sprites and skill integration
 * Enemies can be encountered in specific city locations
 */

class ArabianCombatSystem {
    constructor() {
        this.inCombat = false;
        this.currentEnemy = null;
        this.playerHealth = 100;
        this.playerMaxHealth = 100;
        this.playerMana = 50;
        this.playerMaxMana = 50;
        this.combatLog = [];
        this.playerSprites = {}; // Could add player sprites later
        this.enemySprites = {};

        this.enemies = {
            desert_bandit: {
                id: 'desert_bandit',
                name: 'Desert Bandit',
                health: 80,
                maxHealth: 80,
                attack: 15,
                defense: 5,
                speed: 12,
                loot: ['gold_coins', 'desert_wisdom'],
                spriteSheet: 'homem-segurando-o-personagem-de-pixel-art-de-ataque-de-madeira-pronto-para-uso-em-animacao-e-jogo-aseprite-sprite-sheet_642384-38-288773523.jpg',
                animations: {
                    idle: { frames: [0], duration: 1000 },
                    walk: { frames: [0, 1, 2, 3, 4], duration: 600 },
                    attack: { frames: [10, 11, 12, 13, 14, 15, 16], duration: 800 },
                    death: { frames: [5, 6, 7, 8, 9], duration: 1000, loop: false },
                    hit: { frames: [5], duration: 300 }
                },
                locations: ['desert_outskirts', 'thieves_den'],
                dialogue: [
                    'You dare trespass in our territory?',
                    'Your gold or your life, traveler!',
                    'The desert claims another victim...'
                ],
                defeatedDialogue: 'Perhaps... there is honor in you after all...'
            },

            palace_guard: {
                id: 'palace_guard',
                name: 'Palace Guard',
                health: 120,
                maxHealth: 120,
                attack: 20,
                defense: 10,
                speed: 8,
                loot: ['royal_seal', 'guard_wisdom'],
                spriteSheet: 'homem-segurando-o-personagem-de-pixel-art-de-ataque-de-madeira-pronto-para-uso-em-animacao-e-jogo-aseprite-sprite-sheet_642384-38-288773523.jpg',
                animations: {
                    idle: { frames: [0], duration: 1000 },
                    walk: { frames: [0, 1, 2, 3, 4], duration: 600 },
                    attack: { frames: [10, 11, 12, 13, 14, 15, 16], duration: 800 },
                    death: { frames: [5, 6, 7, 8, 9], duration: 1000, loop: false },
                    hit: { frames: [5], duration: 300 }
                },
                locations: ['palace_entrance', 'royal_gardens'],
                dialogue: [
                    'Halt! State your business here!',
                    'The palace is forbidden to outsiders!',
                    'You shall not pass!'
                ],
                defeatedDialogue: 'You... you fight with honor. The palace recognizes your worth.'
            },

            thief_captain: {
                id: 'thief_captain',
                name: 'Thief Captain',
                health: 100,
                maxHealth: 100,
                attack: 18,
                defense: 8,
                speed: 15,
                loot: ['thieves_key', 'cunning_wisdom'],
                spriteSheet: 'homem-segurando-o-personagem-de-pixel-art-de-ataque-de-madeira-pronto-para-uso-em-animacao-e-jogo-aseprite-sprite-sheet_642384-38-288773523.jpg',
                animations: {
                    idle: { frames: [0], duration: 1000 },
                    walk: { frames: [0, 1, 2, 3, 4], duration: 600 },
                    attack: { frames: [10, 11, 12, 13, 14, 15, 16], duration: 800 },
                    death: { frames: [5, 6, 7, 8, 9], duration: 1000, loop: false },
                    hit: { frames: [5], duration: 300 }
                },
                locations: ['back_alleys', 'thieves_den'],
                dialogue: [
                    'Well, well... what have we here?',
                    'You think you can outsmart the thieves?',
                    'Time to teach you the rules of the street!'
                ],
                defeatedDialogue: 'Ha! You\'ve got the spirit of a true rogue. I respect that.'
            }
        };

        this.init();
    }

    init() {
        this.loadProgress();
        this.setupEventListeners();
        this.preloadSprites();
    }

    loadProgress() {
        const saved = localStorage.getItem('arabianCombatProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.playerHealth = progress.health || 100;
            this.playerMaxHealth = progress.maxHealth || 100;
            this.playerMana = progress.mana || 50;
            this.playerMaxMana = progress.maxMana || 50;
        }
    }

    saveProgress() {
        const progress = {
            health: this.playerHealth,
            maxHealth: this.playerMaxHealth,
            mana: this.playerMana,
            maxMana: this.playerMaxMana
        };
        localStorage.setItem('arabianCombatProgress', JSON.stringify(progress));
    }

    preloadSprites() {
        // Preload sprite sheets
        Object.values(this.enemies).forEach(enemy => {
            if (enemy.spriteSheet && !this.enemySprites[enemy.spriteSheet]) {
                const img = new Image();
                img.src = enemy.spriteSheet;
                this.enemySprites[enemy.spriteSheet] = img;
            }
        });
    }

    triggerRandomEncounter(locationId) {
        // Check if combat should trigger at this location
        const availableEnemies = Object.values(this.enemies).filter(enemy =>
            enemy.locations.includes(locationId)
        );

        if (availableEnemies.length === 0) return false;

        // Random chance based on location and player actions
        const encounterChance = this.calculateEncounterChance(locationId);

        if (Math.random() < encounterChance) {
            const randomEnemy = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
            this.startCombat(randomEnemy);
            return true;
        }

        return false;
    }

    calculateEncounterChance(locationId) {
        const baseChances = {
            'desert_outskirts': 0.3,
            'thieves_den': 0.4,
            'back_alleys': 0.25,
            'palace_entrance': 0.2,
            'royal_gardens': 0.15
        };

        let chance = baseChances[locationId] || 0.1;

        // Reduce chance if player has certain skills
        const skills = window.skillMasterySystem?.getUnlockedSkills() || [];
        if (skills.includes('stealth')) chance *= 0.5;
        if (skills.includes('bond')) chance *= 0.7;

        return Math.min(chance, 0.5); // Cap at 50%
    }

    startCombat(enemyTemplate) {
        if (this.inCombat) return;

        // Create enemy instance
        this.currentEnemy = {
            ...enemyTemplate,
            health: enemyTemplate.maxHealth,
            currentAnimation: 'idle',
            animationFrame: 0,
            animationTime: 0
        };

        this.inCombat = true;
        this.combatLog = [];

        this.createCombatInterface();
        this.addCombatMessage(`${this.currentEnemy.name} appears!`);
        this.addCombatMessage(this.getRandomDialogue(this.currentEnemy.dialogue));

        // Start combat animations
        this.startCombatAnimations();
    }

    createCombatInterface() {
        const combatModal = document.createElement('div');
        combatModal.id = 'combat-modal';
        combatModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(139, 69, 19, 0.9), rgba(218, 165, 32, 0.8));
            z-index: 15000;
            display: flex;
            flex-direction: column;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;

        // Combat area
        const combatArea = document.createElement('div');
        combatArea.style.cssText = `
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            position: relative;
        `;

        // Player side (left)
        const playerSide = document.createElement('div');
        playerSide.style.cssText = `
            width: 200px;
            height: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `;

        const playerAvatar = document.createElement('div');
        playerAvatar.id = 'player-avatar';
        playerAvatar.textContent = '🧙‍♂️';
        playerAvatar.style.cssText = `
            font-size: 80px;
            margin-bottom: 20px;
            animation: playerIdle 2s ease-in-out infinite;
        `;

        const playerHealthBar = this.createHealthBar('player', this.playerHealth, this.playerMaxHealth);
        playerSide.appendChild(playerAvatar);
        playerSide.appendChild(playerHealthBar);

        // Enemy side (right)
        const enemySide = document.createElement('div');
        enemySide.style.cssText = `
            width: 200px;
            height: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `;

        const enemySprite = this.createEnemySprite();
        const enemyHealthBar = this.createHealthBar('enemy', this.currentEnemy.health, this.currentEnemy.maxHealth);
        enemySide.appendChild(enemySprite);
        enemySide.appendChild(enemyHealthBar);

        combatArea.appendChild(playerSide);
        combatArea.appendChild(enemySide);

        // Combat log
        const combatLogDiv = document.createElement('div');
        combatLogDiv.id = 'combat-log';
        combatLogDiv.style.cssText = `
            height: 150px;
            background: rgba(0, 0, 0, 0.7);
            color: #FFD700;
            padding: 15px;
            overflow-y: auto;
            border-top: 2px solid #DAA520;
            font-family: 'Courier New', monospace;
        `;

        // Combat actions
        const actionsDiv = this.createCombatActions();

        combatModal.appendChild(combatArea);
        combatModal.appendChild(combatLogDiv);
        combatModal.appendChild(actionsDiv);

        document.body.appendChild(combatModal);

        // Add combat animations
        this.addCombatStyles();

        // Fade in
        setTimeout(() => {
            combatModal.style.opacity = '1';
        }, 100);
    }

    createEnemySprite() {
        const spriteContainer = document.createElement('div');
        spriteContainer.id = 'enemy-sprite';
        spriteContainer.style.cssText = `
            width: 100px;
            height: 100px;
            background-image: url('${this.currentEnemy.spriteSheet}');
            background-size: 1700% 300%; /* Adjust based on sprite sheet layout */
            background-repeat: no-repeat;
            background-position: 0% 0%;
            image-rendering: pixelated;
            transform: scaleX(-1); /* Face left towards player */
            margin-bottom: 20px;
        `;

        return spriteContainer;
    }

    createHealthBar(type, current, max) {
        const container = document.createElement('div');
        container.style.cssText = `
            width: 150px;
            background: rgba(0, 0, 0, 0.5);
            border: 2px solid #DAA520;
            border-radius: 10px;
            padding: 3px;
        `;

        const bar = document.createElement('div');
        bar.id = `${type}-health-bar`;
        bar.style.cssText = `
            height: 20px;
            background: linear-gradient(90deg, #ff4444, #ffaa00, #44ff44);
            border-radius: 5px;
            width: ${(current / max) * 100}%;
            transition: width 0.5s ease;
        `;

        const text = document.createElement('div');
        text.id = `${type}-health-text`;
        text.textContent = `${current}/${max}`;
        text.style.cssText = `
            text-align: center;
            color: #FFD700;
            font-size: 12px;
            margin-top: 5px;
        `;

        container.appendChild(bar);
        container.appendChild(text);
        return container;
    }

    createCombatActions() {
        const actionsDiv = document.createElement('div');
        actionsDiv.style.cssText = `
            background: rgba(139, 69, 19, 0.8);
            padding: 20px;
            display: flex;
            justify-content: center;
            gap: 15px;
            border-top: 2px solid #DAA520;
        `;

        const actions = [
            { text: '⚔️ Attack', action: 'attack' },
            { text: '🛡️ Defend', action: 'defend' },
            { text: '✨ Magic', action: 'magic' },
            { text: '🏃 Flee', action: 'flee' }
        ];

        actions.forEach(action => {
            const button = document.createElement('button');
            button.textContent = action.text;
            button.style.cssText = `
                padding: 15px 25px;
                background: linear-gradient(135deg, #8B4513, #DAA520);
                border: 2px solid #FFD700;
                border-radius: 8px;
                color: #FFD700;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.3s ease;
            `;

            button.addEventListener('click', () => this.performAction(action.action));
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.05)';
                button.style.boxShadow = '0 5px 15px rgba(218, 165, 32, 0.3)';
            });
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = 'none';
            });

            actionsDiv.appendChild(button);
        });

        return actionsDiv;
    }

    performAction(action) {
        if (!this.inCombat) return;

        switch (action) {
            case 'attack':
                this.playerAttack();
                break;
            case 'defend':
                this.playerDefend();
                break;
            case 'magic':
                this.playerMagic();
                break;
            case 'flee':
                this.playerFlee();
                break;
        }

        // Enemy turn (if still alive and in combat)
        if (this.inCombat && this.currentEnemy.health > 0) {
            setTimeout(() => this.enemyTurn(), 1500);
        }
    }

    playerAttack() {
        const damage = Math.floor(Math.random() * 20) + 15; // 15-35 damage
        this.dealDamageToEnemy(damage);
        this.addCombatMessage(`You attack for ${damage} damage!`);
        this.animatePlayerAction('attack');
    }

    playerDefend() {
        this.addCombatMessage('You raise your guard...');
        // Defending reduces next incoming damage by 50%
        this.playerDefending = true;
    }

    playerMagic() {
        if (this.playerMana < 20) {
            this.addCombatMessage('Not enough mana!');
            return;
        }

        const skills = window.skillMasterySystem?.getUnlockedSkills() || [];

        if (skills.includes('magic')) {
            const damage = Math.floor(Math.random() * 25) + 20; // 20-45 damage
            this.playerMana -= 20;
            this.dealDamageToEnemy(damage);
            this.addCombatMessage(`You cast a magical spell for ${damage} damage!`);
            this.animatePlayerAction('magic');
            this.updateManaBar();
        } else {
            this.addCombatMessage('You haven\'t learned magic yet!');
        }
    }

    playerFlee() {
        const fleeChance = 0.7; // 70% success rate
        if (Math.random() < fleeChance) {
            this.addCombatMessage('You successfully flee from combat!');
            setTimeout(() => this.endCombat(false), 1000);
        } else {
            this.addCombatMessage('You cannot escape!');
        }
    }

    enemyTurn() {
        if (!this.inCombat || this.currentEnemy.health <= 0) return;

        const actions = ['attack', 'special'];
        const action = actions[Math.floor(Math.random() * actions.length)];

        switch (action) {
            case 'attack':
                this.enemyAttack();
                break;
            case 'special':
                this.enemySpecialAttack();
                break;
        }
    }

    enemyAttack() {
        let damage = Math.floor(Math.random() * this.currentEnemy.attack) + 5;

        if (this.playerDefending) {
            damage = Math.floor(damage * 0.5);
            this.playerDefending = false;
            this.addCombatMessage(`${this.currentEnemy.name} attacks, but your defense reduces the damage!`);
        } else {
            this.addCombatMessage(`${this.currentEnemy.name} attacks!`);
        }

        this.dealDamageToPlayer(damage);
        this.animateEnemyAction('attack');
    }

    enemySpecialAttack() {
        const damage = Math.floor(Math.random() * this.currentEnemy.attack * 1.5) + 8;
        this.addCombatMessage(`${this.currentEnemy.name} uses a special attack!`);
        this.dealDamageToPlayer(damage);
        this.animateEnemyAction('attack');
    }

    dealDamageToEnemy(damage) {
        this.currentEnemy.health = Math.max(0, this.currentEnemy.health - damage);
        this.updateHealthBar('enemy', this.currentEnemy.health, this.currentEnemy.maxHealth);
        this.animateEnemyAction('hit');

        if (this.currentEnemy.health <= 0) {
            this.enemyDefeated();
        }
    }

    dealDamageToPlayer(damage) {
        this.playerHealth = Math.max(0, this.playerHealth - damage);
        this.updateHealthBar('player', this.playerHealth, this.playerMaxHealth);
        this.addCombatMessage(`You take ${damage} damage!`);

        if (this.playerHealth <= 0) {
            this.playerDefeated();
        }
    }

    enemyDefeated() {
        this.addCombatMessage(`${this.currentEnemy.name} is defeated!`);
        this.addCombatMessage(`"${this.currentEnemy.defeatedDialogue}"`);
        this.animateEnemyAction('death');

        // Award loot and experience
        this.awardVictoryRewards();

        setTimeout(() => this.endCombat(true), 3000);
    }

    playerDefeated() {
        this.addCombatMessage('You have been defeated...');
        this.addCombatMessage('But this is not the end of your story...');

        // Restore some health and end combat
        this.playerHealth = Math.floor(this.playerMaxHealth * 0.3);
        setTimeout(() => this.endCombat(false), 2000);
    }

    awardVictoryRewards() {
        // Award skill points
        if (window.skillMasterySystem) {
            window.skillMasterySystem.awardExperience('magic', 10);
            window.skillMasterySystem.awardExperience('flow', 5);
        }

        // Award user journey progress
        if (window.userJourneySystem) {
            window.userJourneySystem.recordEvent('combat_victory', {
                enemy: this.currentEnemy.name
            });
        }

        // Potential location discoveries
        if (window.arabianCityMap && this.currentEnemy.loot.includes('thieves_key')) {
            window.arabianCityMap.discoverLocationThroughNPC('underground_passage', 'defeated_enemy');
        }

        this.addCombatMessage('You gain experience and wisdom from this victory!');
    }

    updateHealthBar(type, current, max) {
        const bar = document.getElementById(`${type}-health-bar`);
        const text = document.getElementById(`${type}-health-text`);

        if (bar) {
            bar.style.width = `${(current / max) * 100}%`;
        }
        if (text) {
            text.textContent = `${current}/${max}`;
        }
    }

    updateManaBar() {
        // Could add mana bar visualization
    }

    animatePlayerAction(action) {
        const avatar = document.getElementById('player-avatar');
        if (!avatar) return;

        if (action === 'attack') {
            avatar.style.animation = 'playerAttack 0.8s ease-out';
        } else if (action === 'magic') {
            avatar.style.animation = 'playerMagic 1s ease-out';
        }

        setTimeout(() => {
            avatar.style.animation = 'playerIdle 2s ease-in-out infinite';
        }, 1000);
    }

    animateEnemyAction(action) {
        const sprite = document.getElementById('enemy-sprite');
        if (!sprite) return;

        const animation = this.currentEnemy.animations[action];
        if (!animation) return;

        this.currentEnemy.currentAnimation = action;
        this.currentEnemy.animationFrame = 0;
        this.currentEnemy.animationTime = 0;

        // Start animation cycle
        this.playEnemyAnimation();
    }

    playEnemyAnimation() {
        const sprite = document.getElementById('enemy-sprite');
        if (!sprite) return;

        const animation = this.currentEnemy.animations[this.currentEnemy.currentAnimation];
        const frame = animation.frames[this.currentEnemy.animationFrame];

        // Calculate sprite position (assuming 17 frames horizontally, 3 rows)
        const frameWidth = 100 / 17; // Percentage width per frame
        const frameHeight = 100 / 3; // Percentage height per row
        const x = (frame % 17) * frameWidth;
        const y = Math.floor(frame / 17) * frameHeight;

        sprite.style.backgroundPosition = `-${x}% -${y}%`;

        // Advance animation
        this.currentEnemy.animationTime += 16; // ~60fps
        if (this.currentEnemy.animationTime >= animation.duration / animation.frames.length) {
            this.currentEnemy.animationFrame++;
            this.currentEnemy.animationTime = 0;

            if (this.currentEnemy.animationFrame >= animation.frames.length) {
                if (animation.loop !== false) {
                    this.currentEnemy.animationFrame = 0;
                } else {
                    // Animation finished, return to idle
                    this.currentEnemy.currentAnimation = 'idle';
                    this.currentEnemy.animationFrame = 0;
                }
            }
        }

        // Continue animation loop
        if (this.inCombat) {
            requestAnimationFrame(() => this.playEnemyAnimation());
        }
    }

    startCombatAnimations() {
        this.currentEnemy.currentAnimation = 'idle';
        this.currentEnemy.animationFrame = 0;
        this.currentEnemy.animationTime = 0;
        this.playEnemyAnimation();
    }

    addCombatMessage(message) {
        this.combatLog.push(message);
        const logDiv = document.getElementById('combat-log');
        if (logDiv) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = `> ${message}`;
            messageDiv.style.marginBottom = '5px';
            logDiv.appendChild(messageDiv);
            logDiv.scrollTop = logDiv.scrollHeight;
        }
    }

    getRandomDialogue(dialogues) {
        return dialogues[Math.floor(Math.random() * dialogues.length)];
    }

    endCombat(victory) {
        this.inCombat = false;
        this.currentEnemy = null;
        this.saveProgress();

        const modal = document.getElementById('combat-modal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 500);
        }

        // Notify other systems
        if (window.userJourneySystem) {
            window.userJourneySystem.recordEvent('combat_ended', { victory });
        }
    }

    addCombatStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes playerIdle {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
            }

            @keyframes playerAttack {
                0% { transform: translateX(0) scale(1); }
                50% { transform: translateX(20px) scale(1.2); }
                100% { transform: translateX(0) scale(1); }
            }

            @keyframes playerMagic {
                0% { transform: scale(1); filter: hue-rotate(0deg); }
                50% { transform: scale(1.3); filter: hue-rotate(180deg); }
                100% { transform: scale(1); filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Close combat on escape (flee)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.inCombat) {
                this.playerFlee();
            }
        });
    }

    // Public API
    isInCombat() {
        return this.inCombat;
    }

    getPlayerHealth() {
        return { current: this.playerHealth, max: this.playerMaxHealth };
    }

    healPlayer(amount) {
        this.playerHealth = Math.min(this.playerMaxHealth, this.playerHealth + amount);
        this.saveProgress();
    }

    // Hook for location system
    onLocationEntered(locationId) {
        // Small delay before potential encounter
        setTimeout(() => {
            if (!this.inCombat) {
                this.triggerRandomEncounter(locationId);
            }
        }, 2000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.arabianCombatSystem = new ArabianCombatSystem();
    });
} else {
    window.arabianCombatSystem = new ArabianCombatSystem();
}