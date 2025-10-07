/**
 * DOOR RIDDLE - Aziza's First Test
 * Before entering, the door itself poses a riddle
 */

// Add to QuestEngine class:
QuestEngine.prototype.showDoorRiddle = function() {
    const container = this.createGameContainer();

    container.innerHTML = `
        <div class="door-riddle-scene" style="
            width: 100%;
            min-height: 100vh;
            background: url('images/game/aziza-door.webp') center/cover;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
        ">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7);"></div>

            <div style="position: relative; z-index: 2; max-width: 800px; width: 100%;">
                <div style="
                    background: rgba(0, 0, 0, 0.92);
                    border: 3px solid #ffd700;
                    border-radius: 20px;
                    padding: 45px;
                    box-shadow: 0 0 60px rgba(255, 215, 0, 0.6);
                ">
                    <div style="text-align: center; margin-bottom: 35px;">
                        <div style="font-size: 5rem; margin-bottom: 20px; animation: eyePulse 3s infinite;">👁️</div>
                        <h2 style="color: #ffd700; font-size: 2.3rem; margin-bottom: 15px;">
                            The Door Speaks
                        </h2>
                    </div>

                    <div style="background: rgba(102, 126, 234, 0.15); padding: 35px; border-radius: 15px; margin-bottom: 35px; border-left: 4px solid #667eea;">
                        <p style="font-size: 1.4rem; line-height: 2.2; color: #fff; text-align: center; font-family: 'Georgia', serif; font-style: italic;">
                            "My first is my first,<br>
                            My middle is my middle,<br>
                            My last is my last...<br><br>
                            <span style="color: #ffd700; font-weight: bold;">What am I?</span>"
                        </p>
                    </div>

                    <div style="margin-bottom: 25px;">
                        <label style="display: block; margin-bottom: 15px; color: #ffd700; font-size: 1.2rem; text-align: center;">
                            Speak the answer to pass:
                        </label>
                        <input type="text"
                               id="door-answer"
                               placeholder="Type your answer..."
                               autocomplete="off"
                               style="
                                   width: 100%;
                                   padding: 18px;
                                   font-size: 1.2rem;
                                   background: rgba(255, 255, 255, 0.08);
                                   border: 2px solid #667eea;
                                   border-radius: 10px;
                                   color: #fff;
                                   font-family: 'Georgia', serif;
                                   text-align: center;
                               ">
                    </div>

                    <div id="door-hint-area" style="display: none; min-height: 60px; margin-bottom: 25px; padding: 18px; background: rgba(102, 126, 234, 0.25); border-radius: 10px; text-align: center;">
                        <p style="color: #88b3ff; font-size: 1rem;">
                            💡 <span id="door-hint-text"></span>
                        </p>
                    </div>

                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button class="submit-door-answer-btn" style="
                            padding: 18px 50px;
                            font-size: 1.2rem;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            border: none;
                            border-radius: 10px;
                            cursor: pointer;
                            transition: all 0.3s;
                            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
                        ">
                            Open the Door
                        </button>
                        <button class="door-hint-btn" style="
                            padding: 18px 40px;
                            font-size: 1.1rem;
                            background: rgba(102, 126, 234, 0.25);
                            color: white;
                            border: 2px solid #667eea;
                            border-radius: 10px;
                            cursor: pointer;
                            transition: all 0.3s;
                        ">
                            💡 Hint
                        </button>
                    </div>

                    <div id="door-result-area" style="margin-top: 25px; text-align: center;"></div>
                </div>
            </div>
        </div>

        <style>
            @keyframes eyePulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
            }

            #door-answer:focus {
                outline: none;
                border-color: #ffd700;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
            }

            .submit-door-answer-btn:hover, .door-hint-btn:hover {
                transform: translateY(-2px);
            }
        </style>
    `;

    const answerInput = container.querySelector('#door-answer');
    const submitBtn = container.querySelector('.submit-door-answer-btn');
    const hintBtn = container.querySelector('.door-hint-btn');

    let hintsUsed = 0;
    let attempts = 0;

    // Focus input
    answerInput.focus();

    // Enter to submit
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });

    submitBtn.addEventListener('click', () => {
        const answer = answerInput.value.trim();
        attempts++;
        this.checkDoorAnswer(answer, attempts, hintsUsed);
    });

    hintBtn.addEventListener('click', () => {
        this.showDoorHint(hintsUsed);
        hintsUsed++;
    });
};

QuestEngine.prototype.showDoorHint = function(hintLevel) {
    const hintArea = document.querySelector('#door-hint-area');
    const hintText = document.querySelector('#door-hint-text');

    const hints = [
        "Look at the riddle itself. The answer is hidden in the structure of the words...",
        "Think about what has a first, middle, and last that are all the same...",
        "It's a three-letter word. Each letter is the same as its position in the word."
    ];

    hintArea.style.display = 'block';
    hintArea.style.animation = 'fadeIn 0.4s';
    hintText.textContent = hints[hintLevel] || "The door has an eye upon it. What has one eye but cannot see? Think of the word itself...";
};

QuestEngine.prototype.checkDoorAnswer = function(answer, attempts, hintsUsed) {
    const normalized = answer.toLowerCase().trim();
    const resultArea = document.querySelector('#door-result-area');

    // Correct answers
    const correct = ['eye', 'the eye', 'an eye'];

    const isCorrect = correct.some(ans => normalized === ans || normalized.includes(ans));

    if (isCorrect) {
        // Success - door opens!
        resultArea.innerHTML = `
            <div style="
                padding: 25px;
                background: rgba(76, 175, 80, 0.25);
                border: 2px solid #4CAF50;
                border-radius: 12px;
                animation: fadeIn 0.5s;
            ">
                <p style="color: #4CAF50; font-size: 1.5rem; font-weight: bold; margin-bottom: 12px;">
                    ✓ CORRECT!
                </p>
                <p style="color: #fff; font-size: 1.15rem;">
                    The door's eye blinks once... and slowly opens.
                </p>
            </div>
        `;

        // Track door riddle solved
        this.trackEvent('riddle_solved', {
            riddleId: 'door_riddle',
            attemptCount: attempts,
            hintsUsed,
            timeTaken: 0
        });

        setTimeout(() => {
            this.showAzizaIntroduction();
        }, 2500);

    } else {
        resultArea.innerHTML = `
            <div style="
                padding: 20px;
                background: rgba(244, 67, 54, 0.2);
                border: 2px solid #f44336;
                border-radius: 10px;
                animation: shake 0.5s;
            ">
                <p style="color: #f44336; font-size: 1.3rem; font-weight: bold; margin-bottom: 10px;">
                    ✗ The door remains shut
                </p>
                <p style="color: #fff; font-size: 1rem;">
                    "Think deeper, seeker..."
                </p>
            </div>
        `;

        setTimeout(() => {
            resultArea.innerHTML = '';
            document.querySelector('#door-answer').value = '';
            document.querySelector('#door-answer').focus();
        }, 3000);
    }
};

// Export functions
if (typeof window !== 'undefined') {
    window.QuestEngine = QuestEngine;
}
