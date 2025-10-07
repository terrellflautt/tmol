/**
 * PvP System - Player vs Player Combat
 * Turn-based dueling using actual player stats
 */

class PvPSystem {
    constructor(playerProfile) {
        this.playerProfile = playerProfile;
        this.userId = localStorage.getItem('userId');
        this.currentBattle = null;
        this.battleLog = [];
    }

    async findOpponent() {
        const battleArea = document.getElementById('pvpBattleArea');
        const findBtn = document.getElementById('findOpponentBtn');

        if (!battleArea || !findBtn) return;

        // Disable button during search
        findBtn.disabled = true;
        findBtn.textContent = 'Searching...';

        try {
            // Fetch random opponent from hall of fame
            const opponent = await this.fetchRandomOpponent();

            if (!opponent) {
                throw new Error('No worthy opponents found');
            }

            // Initialize battle
            this.initiateBattle(opponent);

            // Show battle area
            battleArea.style.display = 'block';

        } catch (error) {
            console.error('Error finding opponent:', error);
            alert('Unable to find opponent. Try again later.');
        } finally {
            findBtn.disabled = false;
            findBtn.textContent = 'Find Opponent';
        }
    }

    async fetchRandomOpponent() {
        try {
            // Try to fetch real player from server
            const response = await fetch('https://api.terrellflautt.com/pvp/random-opponent');

            if (response.ok) {
                const data = await response.json();
                return data.opponent;
            }
        } catch (error) {
            console.warn('Using simulated opponent:', error);
        }

        // Fallback: generate simulated opponent
        return this.generateSimulatedOpponent();
    }

    generateSimulatedOpponent() {
        const level = this.calculatePlayerLevel(this.playerProfile);
        const opponentLevel = Math.max(1, level + Math.floor(Math.random() * 5 - 2));

        const names = [
            'Erasmus the Wise', 'Brutus the Strong', 'Silvia the Swift',
            'Magnus the Brave', 'Elara the Cunning', 'Thaddeus the Bold',
            'Rasha the Mysterious', 'Korak the Fierce', 'Nawar the Scholar',
            'Khaveen the Dark', 'Shameen the Merchant', 'Shema the Fighter'
        ];

        const classes = ['Fighter', 'Wizard', 'Thief', 'Paladin', 'Hero'];

        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomClass = classes[Math.floor(Math.random() * classes.length)];

        // Generate stats based on level and class
        const baseStats = this.generateStatsForClass(randomClass, opponentLevel);

        return {
            playerName: randomName,
            class: randomClass,
            level: opponentLevel,
            skills: baseStats,
            isSimulated: true
        };
    }

    generateStatsForClass(className, level) {
        const baseValue = level * 5;
        const variance = 10;

        const stats = {
            strength: baseValue + Math.random() * variance,
            intelligence: baseValue + Math.random() * variance,
            agility: baseValue + Math.random() * variance,
            vitality: baseValue + Math.random() * variance,
            luck: baseValue + Math.random() * variance
        };

        // Boost primary stat for class
        switch (className) {
            case 'Fighter':
            case 'Paladin':
                stats.strength += 15;
                stats.vitality += 10;
                break;
            case 'Wizard':
                stats.intelligence += 20;
                break;
            case 'Thief':
                stats.agility += 15;
                stats.luck += 10;
                break;
            case 'Hero':
                // Balanced stats
                Object.keys(stats).forEach(key => stats[key] += 5);
                break;
        }

        return stats;
    }

    calculatePlayerLevel(profile) {
        if (profile.level) return profile.level;

        const skills = profile.skills || {};
        const totalSkillPoints = Object.values(skills).reduce((sum, val) => sum + (val || 0), 0);
        return Math.floor(totalSkillPoints / 50) + 1;
    }

    initiateBattle(opponent) {
        this.currentBattle = {
            player: {
                name: this.playerProfile.playerName || 'Unknown Hero',
                class: this.playerProfile.class || 'Wanderer',
                level: this.calculatePlayerLevel(this.playerProfile),
                hp: 100,
                maxHp: 100,
                skills: this.playerProfile.skills || {}
            },
            opponent: {
                name: opponent.playerName,
                class: opponent.class,
                level: opponent.level,
                hp: 100,
                maxHp: 100,
                skills: opponent.skills
            },
            turn: 'player',
            round: 1,
            winner: null
        };

        this.battleLog = [];
        this.renderBattleUI();
    }

    renderBattleUI() {
        const battleArea = document.getElementById('pvpBattleArea');
        if (!battleArea) return;

        const { player, opponent } = this.currentBattle;

        battleArea.innerHTML = `
            <div class="pvp-battle-header">
                <h3>⚔️ Round ${this.currentBattle.round}</h3>
            </div>

            <div class="pvp-combatants">
                <!-- Player Side -->
                <div class="pvp-combatant player-side">
                    <div class="combatant-name">${player.name}</div>
                    <div class="combatant-info">${player.class} - Level ${player.level}</div>
                    <div class="combatant-hp-bar">
                        <div class="hp-fill" style="width: ${(player.hp / player.maxHp) * 100}%"></div>
                        <div class="hp-text">${player.hp}/${player.maxHp} HP</div>
                    </div>
                </div>

                <div class="pvp-vs">VS</div>

                <!-- Opponent Side -->
                <div class="pvp-combatant opponent-side">
                    <div class="combatant-name">${opponent.name}</div>
                    <div class="combatant-info">${opponent.class} - Level ${opponent.level}</div>
                    <div class="combatant-hp-bar">
                        <div class="hp-fill opponent-hp" style="width: ${(opponent.hp / opponent.maxHp) * 100}%"></div>
                        <div class="hp-text">${opponent.hp}/${opponent.maxHp} HP</div>
                    </div>
                </div>
            </div>

            <!-- Battle Actions -->
            <div class="pvp-actions">
                <button class="pvp-action-btn" onclick="window.pvpSystem.attack()">⚔️ Attack</button>
                <button class="pvp-action-btn" onclick="window.pvpSystem.defend()">🛡️ Defend</button>
                <button class="pvp-action-btn" onclick="window.pvpSystem.specialAttack()">✨ Special</button>
                <button class="pvp-action-btn forfeit" onclick="window.pvpSystem.forfeit()">🏳️ Forfeit</button>
            </div>

            <!-- Battle Log -->
            <div class="pvp-battle-log">
                <div class="battle-log-header">Battle Log</div>
                <div class="battle-log-content" id="battleLogContent">
                    <div class="log-entry system">Battle begins! May the best warrior win!</div>
                </div>
            </div>
        `;

        // Store reference for easy access
        window.pvpSystem = this;
    }

    attack() {
        if (this.currentBattle.winner) return;
        if (this.currentBattle.turn !== 'player') return;

        const { player, opponent } = this.currentBattle;

        // Calculate damage based on strength and agility
        const playerStr = player.skills.strength || 10;
        const playerAgl = player.skills.agility || 10;
        const opponentAgl = opponent.skills.agility || 10;

        const baseDamage = 10 + (playerStr / 5);
        const hitChance = 0.7 + (playerAgl / 200) - (opponentAgl / 400);

        let damage = 0;
        let message = '';

        if (Math.random() < hitChance) {
            damage = Math.floor(baseDamage + Math.random() * 10);
            opponent.hp = Math.max(0, opponent.hp - damage);
            message = `You strike ${opponent.name} for ${damage} damage!`;
        } else {
            message = `Your attack misses!`;
        }

        this.addLogEntry(message, 'player-action');
        this.checkBattleEnd() || this.opponentTurn();
    }

    defend() {
        if (this.currentBattle.winner) return;
        if (this.currentBattle.turn !== 'player') return;

        const { player } = this.currentBattle;

        // Defending reduces incoming damage next turn
        player.defending = true;

        const vitality = player.skills.vitality || 10;
        const healAmount = Math.floor(5 + (vitality / 10));

        player.hp = Math.min(player.maxHp, player.hp + healAmount);

        this.addLogEntry(`You take a defensive stance and recover ${healAmount} HP!`, 'player-action');
        this.opponentTurn();
    }

    specialAttack() {
        if (this.currentBattle.winner) return;
        if (this.currentBattle.turn !== 'player') return;

        const { player, opponent } = this.currentBattle;

        // Special attack uses intelligence or class-specific power
        const intelligence = player.skills.intelligence || 10;
        const luck = player.skills.luck || 10;

        const spellPower = 15 + (intelligence / 3);
        const critChance = 0.2 + (luck / 200);

        let damage = Math.floor(spellPower + Math.random() * 15);
        let message = '';

        if (Math.random() < critChance) {
            damage *= 2;
            message = `💥 CRITICAL HIT! Your special attack devastates ${opponent.name} for ${damage} damage!`;
        } else {
            message = `Your special attack hits ${opponent.name} for ${damage} damage!`;
        }

        opponent.hp = Math.max(0, opponent.hp - damage);

        this.addLogEntry(message, 'player-action critical');
        this.checkBattleEnd() || this.opponentTurn();
    }

    forfeit() {
        this.currentBattle.winner = 'opponent';
        this.addLogEntry('You have forfeited the battle.', 'system');
        this.endBattle();
    }

    opponentTurn() {
        if (this.currentBattle.winner) return;

        this.currentBattle.turn = 'opponent';
        this.currentBattle.round++;

        // AI decision making
        setTimeout(() => {
            const { opponent, player } = this.currentBattle;

            // Simple AI logic
            const opponentStr = opponent.skills.strength || 10;
            const opponentInt = opponent.skills.intelligence || 10;
            const opponentHpPercent = opponent.hp / opponent.maxHp;

            let action = 'attack';

            // Defend if low HP
            if (opponentHpPercent < 0.3) {
                action = Math.random() < 0.6 ? 'defend' : 'attack';
            }
            // Use special if high intelligence
            else if (opponentInt > 40 && Math.random() < 0.4) {
                action = 'special';
            }

            this.executeOpponentAction(action);
        }, 1000);
    }

    executeOpponentAction(action) {
        const { opponent, player } = this.currentBattle;

        if (action === 'attack') {
            const opponentStr = opponent.skills.strength || 10;
            const baseDamage = 10 + (opponentStr / 5);

            let damage = Math.floor(baseDamage + Math.random() * 10);

            // Reduce damage if player is defending
            if (player.defending) {
                damage = Math.floor(damage * 0.5);
                player.defending = false;
            }

            player.hp = Math.max(0, player.hp - damage);
            this.addLogEntry(`${opponent.name} attacks you for ${damage} damage!`, 'opponent-action');

        } else if (action === 'defend') {
            const vitality = opponent.skills.vitality || 10;
            const healAmount = Math.floor(5 + (vitality / 10));
            opponent.hp = Math.min(opponent.maxHp, opponent.hp + healAmount);
            this.addLogEntry(`${opponent.name} defends and recovers ${healAmount} HP!`, 'opponent-action');

        } else if (action === 'special') {
            const opponentInt = opponent.skills.intelligence || 10;
            const damage = Math.floor(15 + (opponentInt / 3) + Math.random() * 15);

            player.hp = Math.max(0, player.hp - damage);
            this.addLogEntry(`${opponent.name} unleashes a special attack for ${damage} damage!`, 'opponent-action');
        }

        this.updateBattleUI();
        this.checkBattleEnd() || this.playerTurn();
    }

    playerTurn() {
        this.currentBattle.turn = 'player';
    }

    checkBattleEnd() {
        const { player, opponent } = this.currentBattle;

        if (player.hp <= 0) {
            this.currentBattle.winner = 'opponent';
            this.addLogEntry(`💀 You have been defeated by ${opponent.name}!`, 'system defeat');
            this.endBattle();
            return true;
        }

        if (opponent.hp <= 0) {
            this.currentBattle.winner = 'player';
            this.addLogEntry(`🏆 Victory! You have defeated ${opponent.name}!`, 'system victory');
            this.endBattle();
            return true;
        }

        return false;
    }

    async endBattle() {
        const { player, opponent, winner } = this.currentBattle;

        // Disable action buttons
        const actionButtons = document.querySelectorAll('.pvp-action-btn');
        actionButtons.forEach(btn => btn.disabled = true);

        // Record battle result
        await this.recordBattleResult({
            winner: winner,
            playerHp: player.hp,
            opponentHp: opponent.hp,
            rounds: this.currentBattle.round,
            opponent: opponent.name
        });

        // Show restart button
        setTimeout(() => {
            const battleArea = document.getElementById('pvpBattleArea');
            const restartBtn = document.createElement('button');
            restartBtn.className = 'pvp-button';
            restartBtn.textContent = winner === 'player' ? '🎉 Find Another Opponent' : '⚔️ Try Again';
            restartBtn.onclick = () => {
                battleArea.style.display = 'none';
                this.findOpponent();
            };

            const actionsDiv = battleArea.querySelector('.pvp-actions');
            if (actionsDiv) {
                actionsDiv.innerHTML = '';
                actionsDiv.appendChild(restartBtn);
            }
        }, 2000);
    }

    async recordBattleResult(result) {
        try {
            await fetch('https://api.terrellflautt.com/pvp/record-battle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: this.userId,
                    result: result,
                    timestamp: Date.now()
                })
            });
        } catch (error) {
            console.warn('Could not record battle result:', error);
        }
    }

    addLogEntry(message, className = '') {
        this.battleLog.push({ message, className, timestamp: Date.now() });

        const logContent = document.getElementById('battleLogContent');
        if (logContent) {
            const entry = document.createElement('div');
            entry.className = `log-entry ${className}`;
            entry.textContent = message;
            logContent.appendChild(entry);

            // Auto-scroll to bottom
            logContent.scrollTop = logContent.scrollHeight;
        }
    }

    updateBattleUI() {
        const { player, opponent } = this.currentBattle;

        // Update HP bars
        const playerHpBar = document.querySelector('.player-side .hp-fill');
        const opponentHpBar = document.querySelector('.opponent-side .hp-fill');

        if (playerHpBar) {
            const playerHpPercent = (player.hp / player.maxHp) * 100;
            playerHpBar.style.width = `${playerHpPercent}%`;

            const playerHpText = document.querySelector('.player-side .hp-text');
            if (playerHpText) {
                playerHpText.textContent = `${player.hp}/${player.maxHp} HP`;
            }
        }

        if (opponentHpBar) {
            const opponentHpPercent = (opponent.hp / opponent.maxHp) * 100;
            opponentHpBar.style.width = `${opponentHpPercent}%`;

            const opponentHpText = document.querySelector('.opponent-side .hp-text');
            if (opponentHpText) {
                opponentHpText.textContent = `${opponent.hp}/${opponent.maxHp} HP`;
            }
        }

        // Update round number
        const roundHeader = document.querySelector('.pvp-battle-header h3');
        if (roundHeader) {
            roundHeader.textContent = `⚔️ Round ${this.currentBattle.round}`;
        }
    }
}

// Add PvP-specific styles dynamically
const pvpStyles = document.createElement('style');
pvpStyles.textContent = `
    .pvp-battle-header {
        text-align: center;
        margin-bottom: 30px;
    }

    .pvp-battle-header h3 {
        font-size: 24px;
        color: #d4af37;
        margin: 0;
    }

    .pvp-combatants {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
        flex-wrap: wrap;
    }

    .pvp-combatant {
        flex: 1;
        min-width: 200px;
        padding: 20px;
        background: rgba(44, 24, 16, 0.6);
        border: 2px solid #8b6914;
        border-radius: 10px;
    }

    .player-side {
        border-color: #4444ff;
    }

    .opponent-side {
        border-color: #ff4444;
    }

    .combatant-name {
        font-size: 20px;
        font-weight: bold;
        color: #d4af37;
        margin-bottom: 5px;
    }

    .combatant-info {
        font-size: 14px;
        color: #c9a961;
        margin-bottom: 15px;
    }

    .combatant-hp-bar {
        position: relative;
        height: 24px;
        background: #1a1410;
        border: 2px solid #8b6914;
        border-radius: 12px;
        overflow: hidden;
    }

    .hp-fill {
        height: 100%;
        background: linear-gradient(90deg, #00ff00 0%, #44ff44 100%);
        transition: width 0.5s ease;
    }

    .opponent-hp {
        background: linear-gradient(90deg, #ff0000 0%, #ff4444 100%);
    }

    .hp-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-weight: bold;
        font-size: 14px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    }

    .pvp-vs {
        font-size: 32px;
        font-weight: bold;
        color: #ff4444;
        text-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
    }

    .pvp-actions {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        margin-bottom: 30px;
    }

    .pvp-action-btn {
        padding: 15px 20px;
        font-size: 16px;
        font-weight: bold;
        color: #1a1410;
        background: linear-gradient(135deg, #d4af37 0%, #f0d478 100%);
        border: 2px solid #8b6914;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .pvp-action-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
    }

    .pvp-action-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .pvp-action-btn.forfeit {
        background: linear-gradient(135deg, #666 0%, #888 100%);
    }

    .pvp-battle-log {
        background: rgba(26, 20, 16, 0.8);
        border: 2px solid #8b6914;
        border-radius: 10px;
        overflow: hidden;
    }

    .battle-log-header {
        padding: 10px;
        background: #8b6914;
        color: #1a1410;
        font-weight: bold;
        text-align: center;
    }

    .battle-log-content {
        padding: 15px;
        max-height: 200px;
        overflow-y: auto;
    }

    .log-entry {
        padding: 8px 0;
        border-bottom: 1px solid rgba(139, 105, 20, 0.2);
        color: #e8d5b7;
    }

    .log-entry:last-child {
        border-bottom: none;
    }

    .log-entry.player-action {
        color: #4444ff;
    }

    .log-entry.opponent-action {
        color: #ff4444;
    }

    .log-entry.system {
        color: #d4af37;
        font-style: italic;
    }

    .log-entry.victory {
        color: #00ff00;
        font-weight: bold;
    }

    .log-entry.defeat {
        color: #ff0000;
        font-weight: bold;
    }

    .log-entry.critical {
        font-weight: bold;
        animation: flash 0.5s;
    }

    @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    @media (max-width: 768px) {
        .pvp-combatants {
            flex-direction: column;
        }

        .pvp-vs {
            transform: rotate(90deg);
        }
    }
`;
document.head.appendChild(pvpStyles);
