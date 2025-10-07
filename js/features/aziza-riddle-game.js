/**
 * AZIZA'S RIDDLE GAME
 * Quest for Glory inspired adventure game
 *
 * Game Flow:
 * 1. User discovers Aziza's door (hidden easter egg)
 * 2. Aziza presents elemental riddle
 * 3. Solve riddle → Get lamp
 * 4. Lamp unlocks Genie
 * 5. Genie grants wishes/powers
 */

class AzizaRiddleGame {
    constructor() {
        this.gameState = this.loadGameState();
        this.currentScene = null;
        this.init();
    }

    init() {
        // Listen for trigger to start game
        this.setupTriggers();

        // Check if already in progress
        if (this.gameState.inProgress && !this.gameState.completed) {
            this.showContinuePrompt();
        }
    }

    setupTriggers() {
        // Multiple ways to discover Aziza's door

        // 1. Click logo 7 times (Quest for Glory reference)
        let logoClicks = 0;
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.addEventListener('click', () => {
                logoClicks++;
                if (logoClicks === 7) {
                    this.discoverDoor('logo_sequence');
                }
            });
        }

        // 2. Type "aziza" anywhere on the page
        let typedSequence = '';
        document.addEventListener('keypress', (e) => {
            typedSequence += e.key.toLowerCase();
            if (typedSequence.includes('aziza')) {
                this.discoverDoor('typed_name');
                typedSequence = '';
            }
            // Keep last 10 chars
            if (typedSequence.length > 10) {
                typedSequence = typedSequence.slice(-10);
            }
        });

        // 3. Stay on site for 30 seconds and hover over specific element
        setTimeout(() => {
            const subtitle = document.querySelector('.hero-subtitle');
            if (subtitle) {
                subtitle.addEventListener('mouseenter', () => {
                    if (!this.gameState.doorDiscovered) {
                        this.discoverDoor('patience_reward');
                    }
                });
            }
        }, 30000);
    }

    discoverDoor(method) {
        if (this.gameState.doorDiscovered) return;

        this.gameState.doorDiscovered = true;
        this.gameState.discoveryMethod = method;
        this.saveGameState();

        this.showDoorDiscoveryAnimation();
    }

    showDoorDiscoveryAnimation() {
        const overlay = document.createElement('div');
        overlay.className = 'game-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.95);
            z-index: 100000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            animation: fadeIn 1s ease-out;
        `;

        overlay.innerHTML = `
            <div style="text-align: center; color: #ffd700; font-family: 'Georgia', serif;">
                <h1 style="font-size: 3rem; margin-bottom: 2rem; text-shadow: 0 0 20px #ffd700;">
                    ✨ A Secret Door Appears ✨
                </h1>
                <p style="font-size: 1.5rem; margin-bottom: 3rem; color: #fff;">
                    You have discovered the entrance to Aziza's chamber...
                </p>
                <button class="enter-door-btn" style="
                    padding: 15px 40px;
                    font-size: 1.2rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                    transition: transform 0.2s;
                ">
                    🚪 Enter
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        const enterBtn = overlay.querySelector('.enter-door-btn');
        enterBtn.addEventListener('mouseenter', () => {
            enterBtn.style.transform = 'scale(1.05)';
        });
        enterBtn.addEventListener('mouseleave', () => {
            enterBtn.style.transform = 'scale(1)';
        });
        enterBtn.addEventListener('click', () => {
            overlay.remove();
            this.startGame();
        });
    }

    startGame() {
        this.gameState.inProgress = true;
        this.saveGameState();
        this.showAzizaIntro();
    }

    showAzizaIntro() {
        const gameContainer = this.createGameContainer();

        gameContainer.innerHTML = `
            <div class="game-scene" style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(180deg, #1a0033 0%, #330066 100%);
            ">
                <div style="max-width: 800px; padding: 40px;">
                    <img src="images/game/aziza-portrait.webp"
                         alt="Aziza"
                         style="width: 200px; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 30px; border: 3px solid #ffd700;">

                    <div class="dialogue-box" style="
                        background: rgba(0, 0, 0, 0.8);
                        border: 2px solid #ffd700;
                        border-radius: 10px;
                        padding: 30px;
                        color: #fff;
                        font-family: 'Georgia', serif;
                        line-height: 1.8;
                    ">
                        <h2 style="color: #ffd700; margin-bottom: 20px;">Aziza, Guardian of Secrets</h2>
                        <p style="font-size: 1.1rem; margin-bottom: 20px;">
                            "Welcome, seeker. You have found my chamber, but to proceed further,
                            you must prove your wisdom."
                        </p>
                        <p style="font-size: 1.1rem; margin-bottom: 20px;">
                            "Answer my riddle correctly, and I shall grant you access to the Ancient Lamp—
                            a vessel of great power that holds the Genie of Wishes."
                        </p>
                        <p style="font-size: 1.1rem; color: #ff6b6b; margin-bottom: 30px;">
                            "But beware... answer incorrectly, and you must start your journey anew."
                        </p>
                        <button class="continue-btn" style="
                            padding: 12px 30px;
                            font-size: 1.1rem;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                            transition: transform 0.2s;
                        ">
                            I am ready →
                        </button>
                    </div>
                </div>
            </div>
        `;

        const continueBtn = gameContainer.querySelector('.continue-btn');
        continueBtn.addEventListener('click', () => {
            this.showElementalRiddle();
        });
    }

    showElementalRiddle() {
        const gameContainer = document.querySelector('.game-container');

        gameContainer.innerHTML = `
            <div class="riddle-scene" style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: url('images/game/aziza-elemental-riddle.jpg') center/cover;
                position: relative;
            ">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7);"></div>

                <div style="position: relative; z-index: 2; max-width: 700px; padding: 40px;">
                    <div class="riddle-box" style="
                        background: rgba(0, 0, 0, 0.9);
                        border: 3px solid #ffd700;
                        border-radius: 15px;
                        padding: 40px;
                        color: #fff;
                        font-family: 'Georgia', serif;
                        box-shadow: 0 0 40px rgba(255, 215, 0, 0.5);
                    ">
                        <h2 style="color: #ffd700; text-align: center; margin-bottom: 30px; font-size: 2rem;">
                            🔥💨💧⚡ The Elemental Riddle
                        </h2>

                        <div style="background: rgba(255, 215, 0, 0.1); padding: 25px; border-radius: 10px; margin-bottom: 30px;">
                            <p style="font-size: 1.2rem; line-height: 1.8; font-style: italic; color: #ffd700;">
                                "Elementals are very powerful and destructive.<br>
                                They can be weakened by the contrary Element,<br>
                                but they cannot be destroyed.<br><br>
                                Tell me, wise one: What force can weaken<br>
                                that which cannot be destroyed?"
                            </p>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 10px; color: #ffd700; font-size: 1.1rem;">
                                Your Answer:
                            </label>
                            <input type="text"
                                   id="riddle-answer"
                                   placeholder="Type your answer..."
                                   style="
                                       width: 100%;
                                       padding: 15px;
                                       font-size: 1.1rem;
                                       background: rgba(255, 255, 255, 0.1);
                                       border: 2px solid #667eea;
                                       border-radius: 8px;
                                       color: #fff;
                                       font-family: 'Georgia', serif;
                                   ">
                        </div>

                        <div id="hint-area" style="
                            min-height: 60px;
                            margin-bottom: 20px;
                            padding: 15px;
                            background: rgba(102, 126, 234, 0.2);
                            border-radius: 8px;
                            display: none;
                        ">
                            <p style="color: #667eea; font-size: 0.95rem;">
                                💡 <span id="hint-text"></span>
                            </p>
                        </div>

                        <div style="display: flex; gap: 15px; justify-content: center;">
                            <button class="submit-answer-btn" style="
                                padding: 15px 40px;
                                font-size: 1.1rem;
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                cursor: pointer;
                                transition: transform 0.2s;
                                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                            ">
                                Submit Answer
                            </button>
                            <button class="hint-btn" style="
                                padding: 15px 30px;
                                font-size: 1rem;
                                background: rgba(102, 126, 234, 0.3);
                                color: white;
                                border: 2px solid #667eea;
                                border-radius: 8px;
                                cursor: pointer;
                                transition: transform 0.2s;
                            ">
                                💡 Hint
                            </button>
                        </div>

                        <div id="result-area" style="margin-top: 20px; text-align: center;"></div>
                    </div>
                </div>
            </div>
        `;

        const answerInput = gameContainer.querySelector('#riddle-answer');
        const submitBtn = gameContainer.querySelector('.submit-answer-btn');
        const hintBtn = gameContainer.querySelector('.hint-btn');
        let hintsUsed = 0;

        // Press Enter to submit
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });

        submitBtn.addEventListener('click', () => {
            this.checkAnswer(answerInput.value, hintsUsed);
        });

        hintBtn.addEventListener('click', () => {
            this.showHint(hintsUsed);
            hintsUsed++;
        });
    }

    showHint(hintLevel) {
        const hintArea = document.querySelector('#hint-area');
        const hintText = document.querySelector('#hint-text');

        const hints = [
            "Think about the riddle's own words... what is mentioned that can affect elementals?",
            "The answer is hidden in plain sight. 'They can be weakened by the _____ Element'",
            "The answer is a single word. It describes an Element that opposes another."
        ];

        if (hintLevel < hints.length) {
            hintArea.style.display = 'block';
            hintText.textContent = hints[hintLevel];
        } else {
            hintText.textContent = "No more hints available! The answer relates to opposites...";
        }
    }

    checkAnswer(answer, hintsUsed) {
        const resultArea = document.querySelector('#result-area');
        const normalized = answer.toLowerCase().trim();

        // Correct answers (multiple acceptable)
        const correctAnswers = [
            'contrary',
            'opposite',
            'opposing',
            'contrary element',
            'opposite element',
            'opposing element'
        ];

        const isCorrect = correctAnswers.some(correct =>
            normalized === correct || normalized.includes(correct)
        );

        if (isCorrect) {
            this.gameState.riddleSolved = true;
            this.gameState.hintsUsed = hintsUsed;
            this.saveGameState();

            resultArea.innerHTML = `
                <div style="
                    padding: 20px;
                    background: rgba(76, 175, 80, 0.2);
                    border: 2px solid #4CAF50;
                    border-radius: 8px;
                    margin-top: 20px;
                ">
                    <p style="color: #4CAF50; font-size: 1.3rem; font-weight: bold; margin-bottom: 10px;">
                        ✓ Correct!
                    </p>
                    <p style="color: #fff; font-size: 1rem;">
                        "You have proven your wisdom, seeker. The lamp is yours..."
                    </p>
                </div>
            `;

            setTimeout(() => {
                this.showLampReward();
            }, 3000);
        } else {
            resultArea.innerHTML = `
                <div style="
                    padding: 20px;
                    background: rgba(244, 67, 54, 0.2);
                    border: 2px solid #f44336;
                    border-radius: 8px;
                    margin-top: 20px;
                ">
                    <p style="color: #f44336; font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">
                        ✗ Incorrect
                    </p>
                    <p style="color: #fff; font-size: 1rem;">
                        "Not quite, seeker. Think more carefully about the riddle's words..."
                    </p>
                </div>
            `;

            // Auto-clear error after 3 seconds
            setTimeout(() => {
                resultArea.innerHTML = '';
            }, 3000);
        }
    }

    showLampReward() {
        const gameContainer = document.querySelector('.game-container');

        gameContainer.innerHTML = `
            <div class="lamp-reward-scene" style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
                position: relative;
                overflow: hidden;
            ">
                <div class="stars" style="position: absolute; width: 100%; height: 100%;"></div>

                <div style="position: relative; z-index: 2; text-align: center; padding: 40px;">
                    <h1 style="color: #ffd700; font-size: 3rem; margin-bottom: 30px; text-shadow: 0 0 30px #ffd700;">
                        🪔 The Ancient Lamp 🪔
                    </h1>

                    <img src="images/game/genie-lamp.png"
                         alt="Ancient Lamp"
                         class="lamp-image"
                         style="
                             width: 300px;
                             height: auto;
                             margin-bottom: 30px;
                             filter: drop-shadow(0 0 40px #ffd700);
                             animation: lampFloat 3s ease-in-out infinite;
                         ">

                    <div style="
                        background: rgba(0, 0, 0, 0.8);
                        border: 2px solid #ffd700;
                        border-radius: 15px;
                        padding: 30px;
                        max-width: 600px;
                        margin: 0 auto;
                    ">
                        <p style="color: #fff; font-size: 1.3rem; line-height: 1.8; margin-bottom: 20px;">
                            Aziza smiles and hands you the ancient lamp.
                        </p>
                        <p style="color: #ffd700; font-size: 1.1rem; font-style: italic; margin-bottom: 30px;">
                            "Rub the lamp, and the Genie shall appear. Use your wishes wisely, for they are powerful beyond measure..."
                        </p>

                        <button class="rub-lamp-btn" style="
                            padding: 20px 50px;
                            font-size: 1.3rem;
                            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                            color: white;
                            border: none;
                            border-radius: 10px;
                            cursor: pointer;
                            box-shadow: 0 4px 20px rgba(245, 87, 108, 0.5);
                            transition: transform 0.2s;
                            animation: pulse 2s infinite;
                        ">
                            ✨ Rub the Lamp
                        </button>
                    </div>
                </div>
            </div>

            <style>
                @keyframes lampFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 4px 20px rgba(245, 87, 108, 0.5); }
                    50% { transform: scale(1.05); box-shadow: 0 6px 30px rgba(245, 87, 108, 0.8); }
                }

                .rub-lamp-btn:hover {
                    transform: scale(1.1);
                }
            </style>
        `;

        // Add twinkling stars effect
        this.createStarfield();

        const rubBtn = gameContainer.querySelector('.rub-lamp-btn');
        rubBtn.addEventListener('click', () => {
            this.summonGenie();
        });
    }

    createStarfield() {
        const stars = document.querySelector('.stars');
        if (!stars) return;

        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random()};
                animation: twinkle ${2 + Math.random() * 3}s infinite;
            `;
            stars.appendChild(star);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    summonGenie() {
        this.gameState.lampAcquired = true;
        this.gameState.completed = true;
        this.saveGameState();

        const gameContainer = document.querySelector('.game-container');

        gameContainer.innerHTML = `
            <div class="genie-scene" style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: radial-gradient(circle, #667eea 0%, #764ba2 50%, #1a0033 100%);
                position: relative;
                overflow: hidden;
            ">
                <div class="smoke-effect" style="position: absolute; width: 100%; height: 100%;"></div>

                <div style="position: relative; z-index: 2; text-align: center; padding: 40px; animation: genieAppear 2s ease-out;">
                    <h1 style="color: #ffd700; font-size: 4rem; margin-bottom: 30px; text-shadow: 0 0 40px #ffd700;">
                        🧞 THE GENIE AWAKENS 🧞
                    </h1>

                    <div style="
                        background: rgba(0, 0, 0, 0.85);
                        border: 3px solid #ffd700;
                        border-radius: 20px;
                        padding: 40px;
                        max-width: 700px;
                        margin: 0 auto;
                        box-shadow: 0 0 60px rgba(255, 215, 0, 0.6);
                    ">
                        <p style="color: #fff; font-size: 1.5rem; line-height: 1.8; margin-bottom: 30px;">
                            <em>"At last! After millennia of slumber, I am FREE!"</em>
                        </p>
                        <p style="color: #ffd700; font-size: 1.2rem; margin-bottom: 30px;">
                            "You have proven yourself worthy, brave seeker. As reward, I grant you:"
                        </p>

                        <div style="text-align: left; margin: 30px 0; padding: 20px; background: rgba(255, 215, 0, 0.1); border-radius: 10px;">
                            <h3 style="color: #ffd700; margin-bottom: 15px;">✨ Powers Granted:</h3>
                            <ul style="color: #fff; font-size: 1.1rem; line-height: 2;">
                                <li>🎯 Master Secret Finder Badge</li>
                                <li>🔮 Enhanced Site Navigation Powers</li>
                                <li>⚡ Access to Hidden Developer Features</li>
                                <li>🏆 Hall of Fame: "Riddle Master" Title</li>
                                <li>💎 Exclusive Content Unlocked</li>
                            </ul>
                        </div>

                        <button class="claim-powers-btn" style="
                            padding: 20px 50px;
                            font-size: 1.3rem;
                            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                            color: white;
                            border: none;
                            border-radius: 10px;
                            cursor: pointer;
                            box-shadow: 0 4px 20px rgba(245, 87, 108, 0.5);
                            transition: transform 0.2s;
                            margin-top: 20px;
                        ">
                            ⚡ Claim Your Powers
                        </button>
                    </div>
                </div>
            </div>

            <style>
                @keyframes genieAppear {
                    0% { opacity: 0; transform: scale(0.5) translateY(100px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
            </style>
        `;

        const claimBtn = gameContainer.querySelector('.claim-powers-btn');
        claimBtn.addEventListener('click', () => {
            this.grantPowers();
        });
    }

    grantPowers() {
        // Grant actual powers/features
        window.riddleMasterUnlocked = true;
        window.genieUnlocked = true;

        // Save to localStorage
        localStorage.setItem('riddle_master', 'true');
        localStorage.setItem('genie_unlocked', 'true');
        localStorage.setItem('game_completed_at', Date.now());

        // Add to hall of fame
        const hallOfFame = JSON.parse(localStorage.getItem('hall_of_fame') || '[]');
        hallOfFame.push({
            title: 'Riddle Master',
            achievement: 'Solved Aziza\'s Elemental Riddle',
            unlockedAt: Date.now(),
            description: 'Proven wisdom by answering the ancient riddle'
        });
        localStorage.setItem('hall_of_fame', JSON.stringify(hallOfFame));

        // Show completion message
        const gameContainer = document.querySelector('.game-container');
        gameContainer.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                animation: fadeIn 1s;
            ">
                <div style="text-align: center; color: white; padding: 40px;">
                    <h1 style="font-size: 3rem; margin-bottom: 20px;">🎉 Powers Granted! 🎉</h1>
                    <p style="font-size: 1.3rem; margin-bottom: 30px;">
                        Your journey has just begun. Explore the site with your new abilities...
                    </p>
                    <button class="close-game-btn" style="
                        padding: 15px 40px;
                        font-size: 1.2rem;
                        background: white;
                        color: #667eea;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: transform 0.2s;
                    ">
                        Return to Portfolio
                    </button>
                </div>
            </div>
        `;

        const closeBtn = gameContainer.querySelector('.close-game-btn');
        closeBtn.addEventListener('click', () => {
            this.closeGame();
        });

        // Console powers for developers
        console.log('%c🧞 GENIE POWERS UNLOCKED!', 'color: #ffd700; font-size: 20px; font-weight: bold;');
        console.log('%cType window.geniePowers() to see your new abilities', 'color: #667eea; font-size: 14px;');

        window.geniePowers = () => {
            console.log('%c✨ YOUR GENIE POWERS:', 'color: #f5576c; font-size: 16px; font-weight: bold;');
            console.log('• Enhanced navigation unlocked');
            console.log('• Secret content revealed');
            console.log('• Developer console access');
            console.log('• Hall of Fame title: Riddle Master');
        };
    }

    createGameContainer() {
        // Remove existing game container
        const existing = document.querySelector('.game-container');
        if (existing) existing.remove();

        const container = document.createElement('div');
        container.className = 'game-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 100000;
            overflow-y: auto;
        `;

        document.body.appendChild(container);
        return container;
    }

    closeGame() {
        const container = document.querySelector('.game-container');
        if (container) {
            container.style.animation = 'fadeOut 0.5s';
            setTimeout(() => container.remove(), 500);
        }
    }

    showContinuePrompt() {
        // Show option to continue from where they left off
        console.log('Game in progress detected. Ready to continue...');
    }

    loadGameState() {
        const saved = localStorage.getItem('aziza_game_state');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            doorDiscovered: false,
            discoveryMethod: null,
            inProgress: false,
            riddleSolved: false,
            lampAcquired: false,
            completed: false,
            hintsUsed: 0,
            startedAt: null,
            completedAt: null
        };
    }

    saveGameState() {
        localStorage.setItem('aziza_game_state', JSON.stringify(this.gameState));
    }
}

// Add fadeIn/fadeOut animations
const gameStyles = document.createElement('style');
gameStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(gameStyles);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.azizaGame = new AzizaRiddleGame();
    });
} else {
    window.azizaGame = new AzizaRiddleGame();
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AzizaRiddleGame;
}
