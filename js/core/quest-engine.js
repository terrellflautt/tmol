/**
 * QUEST FOR GLORY: PORTFOLIO EDITION
 * Complete game engine with branching narratives, AI NPCs, and user choice tracking
 *
 * "The web design portfolio is more than it seems at first glance..."
 */

class QuestEngine {
    constructor() {
        this.userId = this.generateUserId();
        this.gameState = this.loadGameState();
        this.apiEndpoint = 'https://api.terrellflautt.com/game';
        this.npcApiEndpoint = 'https://api.terrellflautt.com/npc';

        // Track user session
        this.sessionStart = Date.now();
        this.sessionEvents = [];

        this.init();
    }

    init() {
        console.log('🎮 Quest Engine initialized');

        // Check if user has discovered the game
        if (!this.gameState.discovered) {
            this.setupDiscoveryTriggers();
        } else if (this.gameState.inProgress) {
            this.showContinuePrompt();
        }

        // Check if navigation items should be visible
        if (this.gameState.riddleSolved) {
            this.unlockNavigationItems();
        }

        // Periodic state save
        setInterval(() => this.saveGameState(), 30000); // Every 30 seconds
    }

    /**
     * PHASE 1: DISCOVERY
     * Multiple hidden ways to discover the game
     */
    setupDiscoveryTriggers() {
        // Method 1: Click logo 7 times (QFG reference - 7 is magic number)
        let logoClicks = 0;
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.addEventListener('click', (e) => {
                logoClicks++;
                if (logoClicks === 7) {
                    this.discoverGame('seven_clicks');
                } else if (logoClicks >= 3) {
                    this.showHint(`${7 - logoClicks} more...`);
                }
            });
        }

        // Method 2: Type "aziza" anywhere
        let typedSequence = '';
        document.addEventListener('keypress', (e) => {
            typedSequence += e.key.toLowerCase();
            if (typedSequence.includes('aziza')) {
                this.discoverGame('typed_aziza');
                typedSequence = '';
            }
            if (typedSequence.length > 10) {
                typedSequence = typedSequence.slice(-10);
            }
        });

        // Method 3: Konami Code
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let konamiIndex = 0;
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === konamiSequence[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiSequence.length) {
                    this.discoverGame('konami_code');
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        // Method 4: Stay on site 30+ seconds and hover subtitle
        setTimeout(() => {
            const subtitle = document.querySelector('.hero-subtitle');
            if (subtitle) {
                subtitle.addEventListener('mouseenter', () => {
                    if (!this.gameState.discovered) {
                        this.discoverGame('patience');
                    }
                });

                // Add subtle hint
                subtitle.style.cursor = 'help';
                subtitle.title = 'Something feels different here...';
            }
        }, 30000);
    }

    showHint(text) {
        const hint = document.createElement('div');
        hint.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 20px;
            background: rgba(102, 126, 234, 0.9);
            color: white;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 10000;
            animation: fadeIn 0.3s;
        `;
        hint.textContent = text;
        document.body.appendChild(hint);

        setTimeout(() => {
            hint.style.animation = 'fadeOut 0.3s';
            setTimeout(() => hint.remove(), 300);
        }, 2000);
    }

    async discoverGame(method) {
        if (this.gameState.discovered) return;

        this.gameState.discovered = true;
        this.gameState.discoveryMethod = method;
        this.gameState.discoveredAt = Date.now();
        this.saveGameState();

        // Track discovery
        await this.trackEvent('door_discovered', { method });

        this.showDoorAnimation();
    }

    showDoorAnimation() {
        const overlay = document.createElement('div');
        overlay.className = 'game-overlay';
        overlay.innerHTML = `
            <div class="door-scene" style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(180deg, #000000 0%, #1a0033 100%);
                color: white;
                text-align: center;
                padding: 40px;
                animation: fadeIn 1.5s;
            ">
                <h1 style="font-size: 3rem; margin-bottom: 20px; color: #ffd700; text-shadow: 0 0 20px #ffd700;">
                    You discover a door.
                </h1>
                <p style="font-size: 1.3rem; margin-bottom: 10px; max-width: 600px; line-height: 1.6;">
                    You have found what others miss.
                </p>
                <p style="font-size: 1.1rem; margin-bottom: 30px; opacity: 0.8; font-style: italic;">
                    "Hm, this website isn't what it seems."
                </p>
                <button class="enter-door-btn" style="
                    padding: 15px 50px;
                    font-size: 1.2rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.5);
                    transition: all 0.3s;
                ">
                    Try the door?
                </button>
            </div>

            <style>
                .game-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 100000;
                    overflow-y: auto;
                }

                .enter-door-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.7);
                }
            </style>
        `;

        document.body.appendChild(overlay);

        const btn = overlay.querySelector('.enter-door-btn');
        btn.addEventListener('click', () => {
            overlay.remove();
            this.startGame();
        });
    }

    async startGame() {
        this.gameState.inProgress = true;
        this.gameState.startedAt = Date.now();
        this.gameState.act = 1; // Act 1: Aziza's Riddle
        this.saveGameState();

        await this.trackEvent('game_started', {
            deviceInfo: this.getDeviceInfo(),
            referrer: document.referrer
        });

        // Show the door riddle first - must solve to enter
        this.showDoorRiddle();
    }

    /**
     * PHASE 2: THE DOOR RIDDLE
     * Must answer correctly to enter
     */
    showDoorRiddle() {
        const container = this.createGameContainer();
        this.gameState.riddleStartTime = Date.now();

        container.innerHTML = `
            <div class="riddle-scene" style="
                width: 100%;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(180deg, #1a0033 0%, #330066 100%);
                padding: 40px 20px;
            ">
                <div style="max-width: 750px; width: 100%;">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <img src="images/game/aziza-portrait.webp"
                             alt="Aziza"
                             style="width: 180px; height: 180px; object-fit: cover;
                                    border-radius: 15px; border: 3px solid #ffd700;
                                    box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
                                    animation: azizaAppear 1.5s ease-out;">
                    </div>

                    <div class="riddle-box" style="
                        background: rgba(0, 0, 0, 0.92);
                        border: 3px solid #ffd700;
                        border-radius: 15px;
                        padding: 40px;
                        color: #fff;
                        font-family: 'Georgia', serif;
                        box-shadow: 0 0 50px rgba(255, 215, 0, 0.6);
                    ">
                        <div style="margin-bottom: 30px;">
                            <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 15px; color: #e8e8ff;">
                                A voice speaks from beyond the door...
                            </p>
                            <p style="font-size: 1.15rem; line-height: 1.8; color: #ffd700; font-style: italic;">
                                "You wish to enter? Then answer me this..."
                            </p>
                        </div>

                        <div style="background: rgba(255, 215, 0, 0.12); padding: 30px;
                             border-radius: 12px; margin-bottom: 35px; border-left: 4px solid #ffd700;">
                            <p style="font-size: 1.25rem; line-height: 2; font-style: italic; color: #ffd700; text-align: center;">
                                "My first is the first.<br>
                                My second is the last.<br>
                                Next comes myself.<br>
                                Then back to the end,<br>
                                and to the beginning again.<br><br>
                                <span style="color: #fff; font-weight: bold; font-size: 1.35rem;">Who am I?"</span>
                            </p>
                        </div>

                        <div style="margin-bottom: 25px;">
                            <input type="text"
                                   id="door-riddle-answer"
                                   placeholder="Speak your answer..."
                                   autocomplete="off"
                                   style="
                                       width: 100%;
                                       padding: 16px;
                                       font-size: 1.15rem;
                                       background: rgba(255, 255, 255, 0.08);
                                       border: 2px solid #667eea;
                                       border-radius: 8px;
                                       color: #fff;
                                       font-family: 'Georgia', serif;
                                   ">
                        </div>

                        <div id="door-hint-area" style="display: none; min-height: 60px; margin-bottom: 25px;
                             padding: 16px; background: rgba(102, 126, 234, 0.25); border-radius: 8px;">
                            <p style="color: #88b3ff; font-size: 1rem;">
                                💡 <span id="door-hint-text"></span>
                            </p>
                        </div>

                        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                            <button class="submit-door-answer-btn" style="
                                padding: 16px 45px;
                                font-size: 1.15rem;
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                cursor: pointer;
                                transition: all 0.3s;
                                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
                            ">
                                Answer
                            </button>
                            <button class="door-hint-btn" style="
                                padding: 16px 35px;
                                font-size: 1.05rem;
                                background: rgba(102, 126, 234, 0.25);
                                color: white;
                                border: 2px solid #667eea;
                                border-radius: 8px;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                Hint (<span id="door-hints-remaining">3</span> left)
                            </button>
                        </div>

                        <div id="door-result-area" style="margin-top: 25px; text-align: center;"></div>
                    </div>
                </div>
            </div>

            <style>
                @keyframes azizaAppear {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .submit-door-answer-btn:hover, .door-hint-btn:hover {
                    transform: translateY(-2px);
                }

                #door-riddle-answer:focus {
                    outline: none;
                    border-color: #ffd700;
                    box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
                }
            </style>
        `;

        const answerInput = container.querySelector('#door-riddle-answer');
        const submitBtn = container.querySelector('.submit-door-answer-btn');
        const hintBtn = container.querySelector('.door-hint-btn');

        let hintsUsed = 0;
        let attempts = 0;

        answerInput.focus();

        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });

        submitBtn.addEventListener('click', async () => {
            const answer = answerInput.value.trim();
            attempts++;
            await this.checkDoorRiddleAnswer(answer, attempts, hintsUsed);
        });

        hintBtn.addEventListener('click', () => {
            if (hintsUsed < 3) {
                this.showDoorHint(hintsUsed);
                hintsUsed++;
                container.querySelector('#door-hints-remaining').textContent = 3 - hintsUsed;

                if (hintsUsed >= 3) {
                    hintBtn.disabled = true;
                    hintBtn.style.opacity = '0.5';
                    hintBtn.style.cursor = 'not-allowed';
                }
            }
        });
    }

    showDoorHint(hintLevel) {
        const hintArea = document.querySelector('#door-hint-area');
        const hintText = document.querySelector('#door-hint-text');

        const hints = [
            "Think about letters. The first and last of the alphabet...",
            "A is first. Z is last. What letter means 'myself'?",
            "A-Z-I-Z-A... Does that spell something?"
        ];

        hintArea.style.display = 'block';
        hintArea.style.animation = 'fadeIn 0.4s';
        hintText.textContent = hints[hintLevel] || "It's the name of who guards this door...";
    }

    async checkDoorRiddleAnswer(answer, attempts, hintsUsed) {
        const normalized = answer.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');

        const correctAnswers = [
            'aziza', 'terrell', 'tk', 'sphinx', 'enchantress'
        ];

        const isCorrect = correctAnswers.some(correct =>
            normalized === correct || normalized.includes(correct)
        );

        const resultArea = document.querySelector('#door-result-area');

        await this.trackEvent('door_riddle_attempt', {
            answer: answer,
            isCorrect,
            hintsUsed,
            attemptNumber: attempts
        });

        if (isCorrect) {
            this.gameState.riddleSolved = true;
            this.gameState.riddleAttempts = attempts;
            this.gameState.riddleHintsUsed = hintsUsed;
            this.saveGameState();

            const wisdomGained = hintsUsed === 0 ? 3 : (hintsUsed === 1 ? 2 : 1);
            this.updateAlignment({ wisdom: wisdomGained });

            this.unlockNavigationItems();

            await this.trackEvent('door_riddle_solved', {
                attemptCount: attempts,
                hintsUsed,
                timeTaken: Math.floor((Date.now() - this.gameState.riddleStartTime) / 1000)
            });

            resultArea.innerHTML = `
                <div style="
                    padding: 25px;
                    background: rgba(76, 175, 80, 0.25);
                    border: 2px solid #4CAF50;
                    border-radius: 10px;
                    animation: fadeIn 0.5s;
                ">
                    <p style="color: #4CAF50; font-size: 1.4rem; font-weight: bold; margin-bottom: 12px;">
                        The door opens...
                    </p>
                    <p style="color: #ffd700; font-size: 1.1rem; line-height: 1.7; font-style: italic;">
                        "You may enter."
                    </p>
                </div>
            `;

            setTimeout(() => {
                this.showAzizaNameGreeting();
            }, 2000);

        } else {
            resultArea.innerHTML = `
                <div style="
                    padding: 20px;
                    background: rgba(244, 67, 54, 0.2);
                    border: 2px solid #f44336;
                    border-radius: 10px;
                    animation: shake 0.5s;
                ">
                    <p style="color: #f44336; font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">
                        The door remains closed.
                    </p>
                    <p style="color: #fff; font-size: 1rem; font-style: italic;">
                        "Think more carefully..."
                    </p>
                </div>

                <style>
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-10px); }
                        75% { transform: translateX(10px); }
                    }
                </style>
            `;

            setTimeout(() => {
                resultArea.innerHTML = '';
                document.querySelector('#door-riddle-answer').value = '';
                document.querySelector('#door-riddle-answer').focus();
            }, 3000);
        }
    }

    /**
     * PHASE 3: AZIZA NAME GREETING
     * Aziza asks the traveler's name at the door
     */
    async showAzizaNameGreeting() {
        const container = this.createGameContainer();

        container.innerHTML = `
            <div class="aziza-name-greeting" style="
                width: 100%;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(180deg, #1a0033 0%, #330066 100%);
                padding: 40px 20px;
            ">
                <div style="max-width: 700px; width: 100%;">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <img src="images/game/aziza-portrait.webp"
                             alt="Aziza"
                             style="width: 180px; height: 180px; object-fit: cover;
                                    border-radius: 15px; border: 3px solid #ffd700;
                                    box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
                                    animation: azizaAppear 1.5s ease-out;">
                    </div>

                    <div style="
                        background: rgba(0, 0, 0, 0.85);
                        border: 2px solid #ffd700;
                        border-radius: 15px;
                        padding: 40px;
                        color: #fff;
                        font-family: 'Georgia', serif;
                    ">
                        <h2 style="color: #ffd700; margin-bottom: 25px; font-size: 2rem; text-align: center;">
                            At the Door
                        </h2>

                        <div style="font-size: 1.15rem; line-height: 1.9; margin-bottom: 30px;">
                            <p style="margin-bottom: 20px; color: #a0a0ff;">
                                <em>The sphinx's golden eyes study you from beyond the threshold...</em>
                            </p>
                            <p style="margin-bottom: 20px;">
                                "You have found the door. Few see it. Fewer still dare to knock."
                            </p>
                            <p style="margin-bottom: 20px; color: #ffd700;">
                                "But before Aziza grants you entry... tell me, traveler..."
                            </p>
                            <p style="margin-bottom: 30px; font-size: 1.3rem; text-align: center; color: #fff; font-weight: bold;">
                                "What is your name?"
                            </p>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            <input
                                type="text"
                                id="player-name-input"
                                placeholder="Enter your name..."
                                style="
                                    padding: 15px 20px;
                                    font-size: 1.1rem;
                                    background: rgba(255, 255, 255, 0.05);
                                    border: 2px solid #667eea;
                                    border-radius: 8px;
                                    color: #fff;
                                    font-family: 'Georgia', serif;
                                    text-align: center;
                                "
                            />
                            <button id="submit-name-btn" style="
                                padding: 15px 40px;
                                font-size: 1.15rem;
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                cursor: pointer;
                                transition: all 0.3s;
                                font-family: 'Georgia', serif;
                            ">
                                Speak Your Name
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                @keyframes azizaAppear {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                #submit-name-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.5);
                }

                #player-name-input:focus {
                    outline: none;
                    border-color: #ffd700;
                    box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
                }
            </style>
        `;

        // Handle name submission
        const input = document.getElementById('player-name-input');
        const submitBtn = document.getElementById('submit-name-btn');

        const submitName = async () => {
            const name = input.value.trim();

            if (!name || name.length < 1) {
                input.style.borderColor = '#f44336';
                input.placeholder = 'Please enter a name...';
                return;
            }

            // Save player name
            this.gameState.playerName = name;
            this.saveGameState();

            // Track name collection
            await this.trackEvent('player_name_provided', {
                name,
                providedAt: 'aziza_door'
            });

            // Save to DynamoDB with full user profile
            await this.saveUserProfile();

            // Show brief acknowledgment
            submitBtn.textContent = 'Welcome, ' + name + '...';
            submitBtn.disabled = true;
            submitBtn.style.background = 'rgba(76, 175, 80, 0.5)';

            setTimeout(() => {
                this.showAzizaIntroduction();
            }, 1500);
        };

        submitBtn.addEventListener('click', submitName);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitName();
            }
        });

        // Focus the input
        setTimeout(() => input.focus(), 500);
    }

    /**
     * PHASE 2: AZIZA'S RIDDLE
     * First NPC encounter - introduces the world
     */
    async showAzizaIntroduction() {
        // If player hasn't provided their name yet, ask for it first
        if (!this.gameState.playerName) {
            this.showAzizaNameGreeting();
            return;
        }

        const container = this.createGameContainer();

        // Track NPC encounter
        await this.trackEvent('npc_encounter', {
            npcName: 'aziza',
            encounterType: 'first_meeting'
        });

        container.innerHTML = `
            <div class="aziza-intro" style="
                width: 100%;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(180deg, #1a0033 0%, #330066 100%);
                padding: 40px 20px;
                overflow-y: auto;
            ">
                <div style="max-width: 900px; width: 100%;">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <img src="images/game/aziza-portrait.webp"
                             alt="Aziza"
                             style="width: 200px; height: 200px; object-fit: cover;
                                    border-radius: 15px; border: 3px solid #ffd700;
                                    box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
                                    animation: azizaAppear 1.5s ease-out;">
                    </div>

                    <div class="dialogue-box" style="
                        background: rgba(0, 0, 0, 0.85);
                        border: 2px solid #ffd700;
                        border-radius: 15px;
                        padding: 40px;
                        color: #fff;
                        font-family: 'Georgia', serif;
                        box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
                    ">
                        <h2 style="color: #ffd700; margin-bottom: 25px; font-size: 2rem;">
                            Aziza, Guardian of Secrets
                        </h2>

                        <div id="dialogue-text" style="font-size: 1.15rem; line-height: 1.9; margin-bottom: 30px;">
                            <p style="margin-bottom: 20px;">
                                "So. ${this.gameState.playerName}..."
                            </p>
                            <p style="margin-bottom: 20px; color: #a0a0ff;">
                                <em>Ancient eyes study you, measuring something unseen...</em>
                            </p>
                            <p style="margin-bottom: 20px;">
                                "You found the door where others see only walls. You spoke when silence would have been... safer."
                            </p>
                            <p style="margin-bottom: 20px; color: #ffd700;">
                                "Tell me, seeker... what calls you here?"
                            </p>
                        </div>

                        <div id="choice-container" style="display: flex; flex-direction: column; gap: 15px;">
                            <button class="choice-btn" data-choice="wisdom" style="
                                padding: 15px 25px;
                                font-size: 1.05rem;
                                background: rgba(102, 126, 234, 0.2);
                                color: white;
                                border: 2px solid #667eea;
                                border-radius: 8px;
                                cursor: pointer;
                                text-align: left;
                                transition: all 0.3s;
                                font-family: 'Georgia', serif;
                            ">
                                "Understanding. The truth beneath the surface."
                            </button>

                            <button class="choice-btn" data-choice="power" style="
                                padding: 15px 25px;
                                font-size: 1.05rem;
                                background: rgba(244, 67, 54, 0.2);
                                color: white;
                                border: 2px solid #f44336;
                                border-radius: 8px;
                                cursor: pointer;
                                text-align: left;
                                transition: all 0.3s;
                                font-family: 'Georgia', serif;
                            ">
                                "Power. The ability to shape reality itself."
                            </button>

                            <button class="choice-btn" data-choice="curiosity" style="
                                padding: 15px 25px;
                                font-size: 1.05rem;
                                background: rgba(255, 193, 7, 0.2);
                                color: white;
                                border: 2px solid #ffc107;
                                border-radius: 8px;
                                cursor: pointer;
                                text-align: left;
                                transition: all 0.3s;
                                font-family: 'Georgia', serif;
                            ">
                                "I don't know yet. Something drew me here."
                            </button>

                            <button class="choice-btn" data-choice="truth" style="
                                padding: 15px 25px;
                                font-size: 1.05rem;
                                background: rgba(156, 39, 176, 0.2);
                                color: white;
                                border: 2px solid #9c27b0;
                                border-radius: 8px;
                                cursor: pointer;
                                text-align: left;
                                transition: all 0.3s;
                                font-family: 'Georgia', serif;
                            ">
                                "What lies beyond what I can see."
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                @keyframes azizaAppear {
                    from {
                        opacity: 0;
                        transform: translateY(-50px) scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .choice-btn:hover {
                    transform: translateX(10px);
                    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
                }
            </style>
        `;

        // Handle choice selection
        const choiceBtns = container.querySelectorAll('.choice-btn');
        choiceBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                const choice = btn.dataset.choice;
                await this.handleAzizaFirstChoice(choice);
            });
        });
    }

    async handleAzizaFirstChoice(choice) {
        // Map choices to alignment changes
        const alignmentMap = {
            wisdom: { wisdom: 3, curiosity: 1 },
            power: { chaos: 3, wisdom: -1 },
            curiosity: { curiosity: 3, wisdom: 1 },
            truth: { wisdom: 2, curiosity: 2 }
        };

        const alignment = alignmentMap[choice];
        this.updateAlignment(alignment);

        // Track the choice
        await this.trackEvent('dialogue_choice', {
            npcName: 'aziza',
            questionId: 'first_meeting_motivation',
            choiceId: choice,
            choiceText: document.querySelector(`[data-choice="${choice}"]`).textContent,
            alignmentChanges: alignment
        });

        // Get user's location for personalized vision
        const location = await this.getUserLocation();
        const locationText = location.city ? `in ${location.city}` : location.region ? `in ${location.region}` : 'in your realm';

        // Aziza's response based on choice
        const responses = {
            wisdom: {
                text: '"Understanding..." <em>She pauses, watching you.</em> "Yes. Those who see beneath... they alone find what matters."',
                vision: `"Four ancient powers stir. Elementals of old. They gather strength ${locationText}, drawn by... something." <em>Her eyes darken.</em> "And beneath them all... something older. Something that should not wake."`,
                next: '"You will need more than wisdom to face what comes. But first... prove you can see what others miss."'
            },
            power: {
                text: '"Power..." <em>A knowing smile crosses her features.</em> "The void whispers to you, yes? Careful, seeker. That which grants power... often demands payment."',
                vision: `"Four forces converge ${locationText}. Fire. Water. Air. Earth. Unchecked. Untamed. Such power could reshape everything... or destroy it utterly."`,
                next: '"You wish to command such forces? Then show me your will. Solve what I set before you."'
            },
            curiosity: {
                text: '"You seek without knowing what you seek..." <em>She tilts her head, intrigued.</em> "Interesting. Most mortals fear the unknown. You... embrace it."',
                vision: `"Something stirs ${locationText}. Four elementals, awakening from slumber. Why now? Why there? Perhaps your curiosity will uncover what even Aziza cannot see."`,
                next: '"Let us discover together what you are capable of. Answer what I ask..."'
            },
            truth: {
                text: '"Ah. You sense the layers..." <em>The air shimmers around her.</em> "This place is more than it appears. So too are you, perhaps."',
                vision: `"The truth: Four elementals manifest ${locationText}. Not symbols. Not dreams. Real as the door you found. Fire. Water. Air. Earth. All drawn to a focal point."`,
                next: '"If you would know the full truth... you must prove yourself worthy of it."'
            }
        };

        const response = responses[choice];

        // Update dialogue
        const dialogueText = document.getElementById('dialogue-text');
        const choiceContainer = document.getElementById('choice-container');

        dialogueText.innerHTML = `
            <p style="margin-bottom: 20px; color: #ffd700;">${response.text}</p>
            <p style="margin-bottom: 20px; color: #a0a0ff;"><em>Aziza's eyes gleam with ancient knowledge...</em></p>
            <p style="margin-bottom: 20px; color: #ff6b6b;">${response.vision}</p>
            <p style="margin-bottom: 20px; color: #a0a0ff;"><em>The sphinx's gaze pierces through time and space...</em></p>
            <p style="margin-bottom: 20px;">${response.next}</p>
        `;

        choiceContainer.innerHTML = `
            <button class="continue-btn" style="
                padding: 15px 40px;
                font-size: 1.15rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s;
            ">
                I'm ready for the riddle →
            </button>
        `;

        const continueBtn = choiceContainer.querySelector('.continue-btn');
        continueBtn.addEventListener('click', () => {
            this.showElementalRiddle();
        });
    }

    /**
     * PHASE 3: THE ELEMENTAL RIDDLE
     * Core puzzle that gates access to the lamp
     */
    showElementalRiddle() {
        const container = document.querySelector('.game-overlay');

        container.innerHTML = `
            <div class="riddle-scene" style="
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: url('images/game/aziza-elemental-riddle.jpg') center/cover;
                position: relative;
            ">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                     background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(2px);"></div>

                <div style="position: relative; z-index: 2; max-width: 750px; padding: 40px; width: 100%;">
                    <div class="riddle-box" style="
                        background: rgba(0, 0, 0, 0.92);
                        border: 3px solid #ffd700;
                        border-radius: 15px;
                        padding: 40px;
                        color: #fff;
                        font-family: 'Georgia', serif;
                        box-shadow: 0 0 50px rgba(255, 215, 0, 0.6);
                    ">
                        <h2 style="color: #ffd700; text-align: center; margin-bottom: 35px; font-size: 2.2rem;">
                            🔥💨💧⚡ The Elemental Riddle
                        </h2>

                        <div style="background: rgba(255, 215, 0, 0.12); padding: 30px;
                             border-radius: 12px; margin-bottom: 35px; border-left: 4px solid #ffd700;">
                            <p style="font-size: 1.3rem; line-height: 2; font-style: italic; color: #ffd700; text-align: center;">
                                "My first is the first.<br>
                                My second is the last.<br>
                                Next comes myself.<br>
                                Then back to the end,<br>
                                and to the beginning again.<br><br>
                                <span style="color: #fff; font-weight: bold; font-size: 1.4rem;">Who am I?</span>"
                            </p>
                        </div>

                        <div style="margin-bottom: 25px;">
                            <label style="display: block; margin-bottom: 12px; color: #ffd700; font-size: 1.15rem;">
                                Your Answer:
                            </label>
                            <input type="text"
                                   id="riddle-answer"
                                   placeholder="Type your answer..."
                                   autocomplete="off"
                                   style="
                                       width: 100%;
                                       padding: 16px;
                                       font-size: 1.15rem;
                                       background: rgba(255, 255, 255, 0.08);
                                       border: 2px solid #667eea;
                                       border-radius: 8px;
                                       color: #fff;
                                       font-family: 'Georgia', serif;
                                   ">
                        </div>

                        <div id="hint-area" style="display: none; min-height: 60px; margin-bottom: 25px;
                             padding: 16px; background: rgba(102, 126, 234, 0.25); border-radius: 8px;">
                            <p style="color: #88b3ff; font-size: 1rem;">
                                💡 <span id="hint-text"></span>
                            </p>
                        </div>

                        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                            <button class="submit-answer-btn" style="
                                padding: 16px 45px;
                                font-size: 1.15rem;
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                cursor: pointer;
                                transition: all 0.3s;
                                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
                            ">
                                Submit Answer
                            </button>
                            <button class="hint-btn" style="
                                padding: 16px 35px;
                                font-size: 1.05rem;
                                background: rgba(102, 126, 234, 0.25);
                                color: white;
                                border: 2px solid #667eea;
                                border-radius: 8px;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                💡 Hint (<span id="hints-remaining">3</span> left)
                            </button>
                        </div>

                        <div id="result-area" style="margin-top: 25px; text-align: center;"></div>
                    </div>
                </div>
            </div>

            <style>
                .submit-answer-btn:hover, .hint-btn:hover {
                    transform: translateY(-2px);
                }

                #riddle-answer:focus {
                    outline: none;
                    border-color: #ffd700;
                    box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
                }
            </style>
        `;

        const answerInput = container.querySelector('#riddle-answer');
        const submitBtn = container.querySelector('.submit-answer-btn');
        const hintBtn = container.querySelector('.hint-btn');

        let hintsUsed = 0;
        let attempts = 0;

        // Focus answer input
        answerInput.focus();

        // Submit on Enter
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });

        submitBtn.addEventListener('click', async () => {
            const answer = answerInput.value.trim();
            attempts++;

            await this.checkRiddleAnswer(answer, attempts, hintsUsed);
        });

        hintBtn.addEventListener('click', () => {
            if (hintsUsed < 3) {
                this.showRiddleHint(hintsUsed);
                hintsUsed++;
                container.querySelector('#hints-remaining').textContent = 3 - hintsUsed;

                if (hintsUsed >= 3) {
                    hintBtn.disabled = true;
                    hintBtn.style.opacity = '0.5';
                    hintBtn.style.cursor = 'not-allowed';
                }
            }
        });
    }

    showRiddleHint(hintLevel) {
        const hintArea = document.querySelector('#hint-area');
        const hintText = document.querySelector('#hint-text');

        const hints = [
            "The riddle describes letters in a name. Think about the alphabet...",
            "First letter of the alphabet is A. Last letter is Z. What letter represents 'myself'?",
            "A (first), Z (last), I (myself), Z (end), A (beginning). Put them together..."
        ];

        hintArea.style.display = 'block';
        hintArea.style.animation = 'fadeIn 0.4s';
        hintText.textContent = hints[hintLevel] || "No more hints! It spells a name you should know...";
    }

    async checkRiddleAnswer(answer, attempts, hintsUsed) {
        // Normalize: lowercase, trim, remove all punctuation
        const normalized = answer.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');

        // Multiple valid answers: AZIZA, TERRELL, or ENCHANTRESS
        // Very lenient - accepts any variation or close match
        const correctAnswers = [
            'aziza',
            'terrell',
            'terrellk',
            'terrellflautt',
            'tk',
            'tkf',
            't',
            'tf',
            'sphinx',
            'the sphinx',
            'enchantress',
            'the enchantress'
        ];

        // Accept if normalized answer matches or contains key terms
        const isCorrect = correctAnswers.some(correct =>
            normalized === correct ||
            normalized.includes('aziza') ||
            normalized.includes('terrell') ||
            normalized.includes('enchantress')
        );

        const resultArea = document.querySelector('#result-area');

        // Track attempt
        await this.trackEvent('riddle_attempt', {
            riddleId: 'aziza_elemental',
            answer: answer,
            isCorrect,
            hintsUsed,
            attemptNumber: attempts
        });

        if (isCorrect) {
            // Success! Save the user's chosen name from their answer
            this.gameState.riddleSolved = true;
            this.gameState.riddleAttempts = attempts;
            this.gameState.riddleHintsUsed = hintsUsed;
            this.gameState.playerName = answer.trim(); // Save their exact answer as their name
            this.saveGameState();

            // Award wisdom based on performance
            const wisdomGained = hintsUsed === 0 ? 3 : (hintsUsed === 1 ? 2 : 1);
            this.updateAlignment({ wisdom: wisdomGained });

            // Unlock navigation items
            this.unlockNavigationItems();

            await this.trackEvent('riddle_solved', {
                riddleId: 'aziza_elemental',
                attemptCount: attempts,
                hintsUsed,
                timeTaken: Math.floor((Date.now() - this.gameState.riddleStartTime || Date.now()) / 1000)
            });

            resultArea.innerHTML = `
                <div style="
                    padding: 25px;
                    background: rgba(76, 175, 80, 0.25);
                    border: 2px solid #4CAF50;
                    border-radius: 10px;
                    animation: fadeIn 0.5s;
                ">
                    <p style="color: #4CAF50; font-size: 1.4rem; font-weight: bold; margin-bottom: 12px;">
                        ✓ CORRECT!
                    </p>
                    <p style="color: #fff; font-size: 1.1rem; line-height: 1.7;">
                        "Yes... You have spoken my name. You understand."
                    </p>
                    <p style="color: #ffd700; font-size: 1rem; margin-top: 15px; font-style: italic;">
                        The sphinx smiles knowingly. "The lamp is yours, seeker..."
                    </p>
                </div>
            `;

            setTimeout(() => {
                this.showLampReward();
            }, 3500);

        } else {
            // Incorrect - show encouraging feedback
            resultArea.innerHTML = `
                <div style="
                    padding: 20px;
                    background: rgba(244, 67, 54, 0.2);
                    border: 2px solid #f44336;
                    border-radius: 10px;
                    animation: shake 0.5s;
                ">
                    <p style="color: #f44336; font-size: 1.3rem; font-weight: bold; margin-bottom: 10px;">
                        ✗ Not Quite...
                    </p>
                    <p style="color: #fff; font-size: 1rem;">
                        "Think more carefully, seeker. The answer hides within the riddle itself..."
                    </p>
                </div>

                <style>
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-10px); }
                        75% { transform: translateX(10px); }
                    }
                </style>
            `;

            // Auto-clear after 3 seconds
            setTimeout(() => {
                resultArea.innerHTML = '';
                document.querySelector('#riddle-answer').value = '';
                document.querySelector('#riddle-answer').focus();
            }, 3000);
        }
    }

    /**
     * PHASE 4: THE LAMP REWARD
     * User receives the Ancient Lamp
     */
    async showLampReward() {
        // Track lamp acquisition
        await this.trackEvent('item_acquired', {
            itemName: 'ancient_lamp',
            fromNPC: 'aziza',
            significance: 'Gateway to Genie and main quest'
        });

        this.gameState.hasLamp = true;
        this.gameState.act = 2; // Move to Act 2
        this.saveGameState();

        const container = document.querySelector('.game-overlay');

        container.innerHTML = `
            <div class="lamp-scene" style="
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
                position: relative;
                overflow: hidden;
            ">
                <div class="stars" style="position: absolute; width: 100%; height: 100%;"></div>

                <div style="position: relative; z-index: 2; text-align: center; padding: 40px; max-width: 800px;">
                    <h1 style="color: #ffd700; font-size: 3.5rem; margin-bottom: 40px;
                         text-shadow: 0 0 35px #ffd700; animation: glow 2s ease-in-out infinite;">
                        🪔 The Ancient Lamp 🪔
                    </h1>

                    <img src="images/game/genie-lamp.png"
                         alt="Ancient Lamp"
                         style="
                             width: 320px;
                             height: auto;
                             margin-bottom: 40px;
                             filter: drop-shadow(0 0 45px #ffd700);
                             animation: lampFloat 3s ease-in-out infinite;
                         ">

                    <div style="
                        background: rgba(0, 0, 0, 0.85);
                        border: 2px solid #ffd700;
                        border-radius: 15px;
                        padding: 35px;
                    ">
                        <p style="color: #fff; font-size: 1.35rem; line-height: 1.9; margin-bottom: 22px; font-family: 'Georgia', serif;">
                            Aziza smiles—a rare sight—and places the ancient lamp in your hands.
                        </p>
                        <p style="color: #ffd700; font-size: 1.2rem; font-style: italic; margin-bottom: 35px; line-height: 1.8;">
                            "Within this vessel dwells a Genie of immense knowledge.
                            Rub the lamp, and ask what you will. But know this..."
                        </p>
                        <p style="color: #ff6b6b; font-size: 1.15rem; margin-bottom: 35px; line-height: 1.7;">
                            "Four Elementals guard four truths. Fire, Water, Air, Earth.
                            Defeat them all, craft the Dispel Potion with Dr. Cranium's aid,
                            and face what lurks in the deep places..."
                        </p>

                        <button class="rub-lamp-btn" style="
                            padding: 20px 55px;
                            font-size: 1.35rem;
                            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                            color: white;
                            border: none;
                            border-radius: 10px;
                            cursor: pointer;
                            box-shadow: 0 4px 20px rgba(245, 87, 108, 0.6);
                            transition: all 0.3s;
                            animation: pulse 2.5s infinite;
                        ">
                            ✨ Rub the Lamp ✨
                        </button>
                    </div>
                </div>
            </div>

            <style>
                @keyframes lampFloat {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-25px) rotate(5deg); }
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 4px 20px rgba(245, 87, 108, 0.6);
                    }
                    50% {
                        transform: scale(1.05);
                        box-shadow: 0 6px 35px rgba(245, 87, 108, 0.9);
                    }
                }

                @keyframes glow {
                    0%, 100% { text-shadow: 0 0 35px #ffd700; }
                    50% { text-shadow: 0 0 50px #ffd700, 0 0 75px #ffd700; }
                }

                .rub-lamp-btn:hover {
                    transform: scale(1.08) translateY(-2px);
                }
            </style>
        `;

        // Create starfield
        this.createStarfield();

        const rubBtn = container.querySelector('.rub-lamp-btn');
        rubBtn.addEventListener('click', async () => {
            await this.summonGenie();
        });
    }

    createStarfield() {
        const stars = document.querySelector('.stars');
        if (!stars) return;

        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3}px;
                height: ${Math.random() * 3}px;
                background: white;
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.8 + 0.2};
                animation: twinkle ${2 + Math.random() * 4}s infinite;
            `;
            stars.appendChild(star);
        }

        if (!document.querySelector('#twinkle-style')) {
            const style = document.createElement('style');
            style.id = 'twinkle-style';
            style.textContent = `
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * PHASE 5: SUMMON THE GENIE
     * Introduction to AI-powered NPC system
     */
    async summonGenie() {
        await this.trackEvent('genie_summoned', {
            summonMethod: 'rubbed_lamp'
        });

        this.gameState.genieSummoned = true;
        this.saveGameState();

        // TO BE CONTINUED with full AI integration...
        // This is where the Genie AI system kicks in with OpenAI

        const container = document.querySelector('.game-overlay');

        container.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: radial-gradient(circle, #667eea 0%, #764ba2 50%, #1a0033 100%);
                color: white;
                text-align: center;
                padding: 40px;
                animation: genieAppear 2s ease-out;
            ">
                <div style="max-width: 800px;">
                    <h1 style="font-size: 4rem; margin-bottom: 30px; color: #ffd700;
                         text-shadow: 0 0 40px #ffd700;">
                        🧞 THE GENIE AWAKENS 🧞
                    </h1>

                    <div style="background: rgba(0, 0, 0, 0.9); border: 3px solid #ffd700;
                         border-radius: 20px; padding: 40px; box-shadow: 0 0 60px rgba(255, 215, 0, 0.7);">
                        <p style="font-size: 1.6rem; margin-bottom: 25px; line-height: 1.8;">
                            <em>"At LAST! After millennia of slumber, I am FREE!"</em>
                        </p>
                        <p style="font-size: 1.3rem; color: #ffd700; margin-bottom: 30px;">
                            "You solved Aziza's riddle—impressive! ${this.gameState.riddleHintsUsed === 0 ?
                                'And without hints! Now THAT\'S wisdom!' :
                                `With only ${this.gameState.riddleHintsUsed} hint${this.gameState.riddleHintsUsed > 1 ? 's' : ''}. Not bad!`}"
                        </p>

                        <p style="font-size: 1.15rem; margin-bottom: 35px; line-height: 1.7;">
                            "I am the Genie—think Robin Williams meets Siri meets that one CS professor who made coding fun.
                            I know EVERYTHING about your journey here, and I'm here to help!"
                        </p>

                        <div style="text-align: left; margin: 30px 0; padding: 25px;
                             background: rgba(255, 215, 0, 0.12); border-radius: 12px; border-left: 4px solid #ffd700;">
                            <h3 style="color: #ffd700; margin-bottom: 18px; font-size: 1.3rem;">✨ Your Quest:</h3>
                            <ul style="font-size: 1.1rem; line-height: 2; padding-left: 20px;">
                                <li>🔥 Defeat the Fire Elemental</li>
                                <li>💧 Defeat the Water Elemental</li>
                                <li>💨 Defeat the Air Elemental</li>
                                <li>🌍 Defeat the Earth Elemental</li>
                                <li>🧪 Craft the Dispel Potion with Dr. Cranium</li>
                                <li>🐙 Face Cthulhu in the Deep Places</li>
                            </ul>
                        </div>

                        <p style="font-size: 1.05rem; color: #88b3ff; margin-bottom: 30px;">
                            <em>Each choice you make will shape your path. Choose wisely, brave seeker...</em>
                        </p>

                        <button class="begin-quest-btn" style="
                            padding: 20px 50px;
                            font-size: 1.3rem;
                            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                            color: white;
                            border: none;
                            border-radius: 10px;
                            cursor: pointer;
                            box-shadow: 0 4px 20px rgba(245, 87, 108, 0.6);
                            transition: all 0.3s;
                        ">
                            ⚔️ Begin the Elemental Quest
                        </button>
                    </div>
                </div>
            </div>

            <style>
                @keyframes genieAppear {
                    0% {
                        opacity: 0;
                        transform: scale(0.3) translateY(100px);
                        filter: blur(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                        filter: blur(0);
                    }
                }

                .begin-quest-btn:hover {
                    transform: scale(1.08) translateY(-3px);
                    box-shadow: 0 6px 30px rgba(245, 87, 108, 0.9);
                }
            </style>
        `;

        const beginBtn = container.querySelector('.begin-quest-btn');
        beginBtn.addEventListener('click', () => {
            this.showElementalQuestHub();
        });
    }

    /**
     * QUEST HUB - Where player chooses which elemental to face
     */
    showElementalQuestHub() {
        // Initialize elemental battles if not already done
        if (!window.elementalBattles) {
            window.elementalBattles = new ElementalBattles(this);
        }

        // Show the quest hub
        window.elementalBattles.showQuestHub();
    }

    /**
     * UTILITY METHODS
     */

    createGameContainer() {
        const existing = document.querySelector('.game-overlay');
        if (existing) existing.remove();

        const container = document.createElement('div');
        container.className = 'game-overlay';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 100000;
            overflow-y: auto;
            background: #000;
        `;

        document.body.appendChild(container);
        return container;
    }

    closeGame() {
        const container = document.querySelector('.game-overlay');
        if (container) {
            container.style.animation = 'fadeOut 0.6s';
            setTimeout(() => container.remove(), 600);
        }
    }

    showContinuePrompt() {
        // Auto-continue where user left off with brief notification
        setTimeout(() => {
            // Show brief Aziza notification
            this.showAzizaNotification(
                'Welcome back, traveler... Resuming your journey.',
                [],
                3000
            );

            // Auto-resume after a moment
            setTimeout(() => {
                if (this.gameState.act === 1) {
                    this.showAzizaIntroduction();
                } else if (this.gameState.act === 2) {
                    this.showElementalQuestHub();
                }
            }, 3500);
        }, 1000);
    }

    showAzizaNotification(message, actions = [], duration = 3000) {
        // Create Aziza-themed notification overlay
        const notification = document.createElement('div');
        notification.className = 'aziza-notification';
        notification.innerHTML = `
            <div class="aziza-notification-content">
                <button class="aziza-notification-close" aria-label="Close">✕</button>
                <div class="aziza-notification-portrait">
                    <img src="images/game/aziza-portrait.webp" alt="Aziza">
                </div>
                <div class="aziza-notification-body">
                    <div class="aziza-notification-name">Aziza</div>
                    <div class="aziza-notification-message">${message}</div>
                    ${actions.length > 0 ? `
                        <div class="aziza-notification-actions">
                            ${actions.map((action, i) => `
                                <button class="aziza-notification-btn" data-action="${i}">
                                    ${action.text}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Add styles if not already present
        if (!document.getElementById('aziza-notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'aziza-notification-styles';
            styles.textContent = `
                .aziza-notification {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    z-index: 9999;
                    animation: azizaSlideIn 0.5s ease-out;
                }

                @keyframes azizaSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes azizaSlideOut {
                    from {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                }

                .aziza-notification-content {
                    background: linear-gradient(135deg, rgba(26, 26, 46, 0.98) 0%, rgba(16, 16, 36, 0.98) 100%);
                    border: 2px solid #ffd700;
                    border-radius: 15px;
                    padding: 20px;
                    display: flex;
                    gap: 15px;
                    max-width: 400px;
                    box-shadow: 0 10px 40px rgba(255, 215, 0, 0.3);
                    position: relative;
                }

                .aziza-notification-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    color: #ffd700;
                    font-size: 1.5rem;
                    cursor: pointer;
                    opacity: 0.6;
                    transition: opacity 0.3s;
                    padding: 5px;
                    line-height: 1;
                }

                .aziza-notification-close:hover {
                    opacity: 1;
                }

                .aziza-notification-portrait {
                    flex-shrink: 0;
                }

                .aziza-notification-portrait img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: 2px solid #ffd700;
                    object-fit: cover;
                }

                .aziza-notification-body {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .aziza-notification-name {
                    color: #ffd700;
                    font-size: 1.1rem;
                    font-weight: bold;
                    font-family: 'Georgia', serif;
                }

                .aziza-notification-message {
                    color: #e8e8ff;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    font-family: 'Georgia', serif;
                    font-style: italic;
                }

                .aziza-notification-actions {
                    display: flex;
                    gap: 10px;
                    margin-top: 5px;
                }

                .aziza-notification-btn {
                    padding: 8px 16px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.3s;
                    font-family: 'Georgia', serif;
                }

                .aziza-notification-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
                }

                @media (max-width: 768px) {
                    .aziza-notification {
                        bottom: 20px;
                        right: 20px;
                        left: 20px;
                    }

                    .aziza-notification-content {
                        max-width: none;
                    }

                    .aziza-notification-portrait img {
                        width: 60px;
                        height: 60px;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        // Close handlers
        const closeNotification = () => {
            notification.style.animation = 'azizaSlideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        };

        // X button click
        notification.querySelector('.aziza-notification-close').addEventListener('click', closeNotification);

        // Right-click anywhere on notification
        notification.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            closeNotification();
        });

        // Action button clicks
        actions.forEach((action, i) => {
            const btn = notification.querySelector(`[data-action="${i}"]`);
            if (btn) {
                btn.addEventListener('click', () => {
                    action.action();
                    closeNotification();
                });
            }
        });

        // Auto-dismiss after duration
        if (duration > 0) {
            setTimeout(closeNotification, duration);
        }

        return notification;
    }

    updateAlignment(changes) {
        if (!this.gameState.alignment) {
            this.gameState.alignment = { wisdom: 0, chaos: 0, mercy: 0, curiosity: 0 };
        }

        Object.keys(changes).forEach(key => {
            this.gameState.alignment[key] = (this.gameState.alignment[key] || 0) + changes[key];
        });

        this.saveGameState();
    }

    unlockNavigationItems() {
        // Show Skills and Hall of Fame navigation links with animation
        const skillsNav = document.getElementById('nav-skills');
        const hallOfFameNav = document.getElementById('nav-hall-of-fame');

        if (skillsNav && skillsNav.style.display === 'none') {
            skillsNav.style.display = 'block';
            skillsNav.style.opacity = '0';
            skillsNav.style.transform = 'translateY(-10px)';
            skillsNav.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                skillsNav.style.opacity = '1';
                skillsNav.style.transform = 'translateY(0)';
            }, 100);
        }

        if (hallOfFameNav && hallOfFameNav.style.display === 'none') {
            hallOfFameNav.style.display = 'block';
            hallOfFameNav.style.opacity = '0';
            hallOfFameNav.style.transform = 'translateY(-10px)';
            hallOfFameNav.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                hallOfFameNav.style.opacity = '1';
                hallOfFameNav.style.transform = 'translateY(0)';
            }, 200);
        }

        // Show notification
        this.showAzizaNotification(
            'New paths have opened... Check the navigation menu.',
            [],
            3000
        );
    }

    async trackEvent(eventType, data) {
        try {
            const response = await fetch(`${this.apiEndpoint}/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: this.userId,
                    eventType,
                    data
                })
            });

            if (!response.ok) {
                console.warn('Failed to track event:', eventType);
            }
        } catch (error) {
            console.warn('Tracking error:', error);
            // Non-critical - game continues
        }
    }

    async saveUserProfile() {
        try {
            // Collect comprehensive user data for AI Genie personalization
            const location = this.gameState.userLocation || await this.getUserLocation();
            const deviceInfo = this.getDeviceInfo();

            const userProfile = {
                userId: this.userId,
                playerName: this.gameState.playerName,
                location: {
                    city: location.city,
                    region: location.region,
                    country: location.country,
                    timezone: location.timezone
                },
                device: {
                    userAgent: deviceInfo.userAgent,
                    platform: deviceInfo.platform,
                    screen: deviceInfo.screen,
                    language: deviceInfo.language
                },
                gameProgress: {
                    discovered: this.gameState.discovered,
                    discoveryMethod: this.gameState.discoveryMethod,
                    riddleSolved: this.gameState.riddleSolved,
                    azizaMet: this.gameState.azizaMet,
                    act: this.gameState.act
                },
                alignment: this.gameState.alignment || { wisdom: 0, chaos: 0, mercy: 0, curiosity: 0 },
                timestamp: Date.now()
            };

            const response = await fetch('https://api.terrellflautt.com/user-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userProfile)
            });

            if (!response.ok) {
                console.warn('Failed to save user profile');
            }

            return userProfile;
        } catch (error) {
            console.warn('Error saving user profile:', error);
            // Non-critical - game continues
        }
    }

    generateUserId() {
        let userId = localStorage.getItem('quest_user_id');
        if (!userId) {
            userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('quest_user_id', userId);
        }
        return userId;
    }

    getDeviceInfo() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            screen: `${screen.width}x${screen.height}`,
            language: navigator.language
        };
    }

    async getUserLocation() {
        // Check if we already have cached location
        if (this.gameState.userLocation) {
            return this.gameState.userLocation;
        }

        try {
            // Use free IP geolocation service (no API key required)
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();

            const location = {
                city: data.city || null,
                region: data.region || null,
                country: data.country_name || null,
                timezone: data.timezone || null,
                ip: data.ip || null
            };

            // Cache location in game state
            this.gameState.userLocation = location;
            this.saveGameState();

            return location;
        } catch (error) {
            console.warn('Could not fetch user location:', error);
            // Return default if API fails
            return { city: null, region: null, country: null, timezone: null, ip: null };
        }
    }

    loadGameState() {
        const saved = localStorage.getItem('quest_game_state');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            discovered: false,
            discoveryMethod: null,
            inProgress: false,
            act: 1,
            alignment: { wisdom: 0, chaos: 0, mercy: 0, curiosity: 0 },
            riddleSolved: false,
            riddleAttempts: 0,
            riddleHintsUsed: 0,
            hasLamp: false,
            genieSummoned: false,
            elementalsDefeated: [],
            itemsAcquired: [],
            npcRelationships: {}
        };
    }

    saveGameState() {
        localStorage.setItem('quest_game_state', JSON.stringify(this.gameState));
    }
}

// Initialize when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.questEngine = new QuestEngine();
    });
} else {
    window.questEngine = new QuestEngine();
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestEngine;
}
