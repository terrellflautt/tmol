/**
 * Quest for Glory Style RPG Dialogue System
 * Classic adventure game conversations with pixel art NPCs
 */

class RPGDialogue {
    constructor() {
        this.currentNPC = null;
        this.conversationState = {};
        this.typingSpeed = 30; // ms per character
        this.isTyping = false;

        this.init();
    }

    init() {
        this.setupGenieDiscovery();
        this.enhanceAzizaDiscovery();
        this.loadConversationHistory();
    }

    /**
     * GENIE DISCOVERY - Lamp is hidden until Aziza gives it to the user
     * Lamp appears only after solving Aziza's riddle
     */
    setupGenieDiscovery() {
        // Create hidden lamp - will be revealed by Aziza after riddle
        const lamp = document.createElement('div');
        lamp.id = 'magic-lamp';
        lamp.className = 'magic-lamp hidden';
        lamp.innerHTML = `
            <div class="lamp-container">
                <div class="lamp-glow"></div>
                <div class="lamp-icon">🪔</div>
                <div class="lamp-hint">Click to summon the Genie</div>
            </div>
        `;

        // Position at top right to not crowd genie button
        lamp.style.cssText = `
            position: fixed;
            top: 80px;
            right: 30px;
            z-index: 999;
            cursor: pointer;
            opacity: 0;
            display: none;
            transform: scale(0.8);
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0));
        `;

        document.body.appendChild(lamp);

        // Listen for Aziza's gift event instead of auto-showing
        document.addEventListener('aziza-gives-lamp', () => {
            this.revealLamp(lamp);
        });

        // Click to summon genie
        lamp.addEventListener('click', () => {
            // Animate lamp disappearing
            lamp.style.transform = 'scale(0) rotate(360deg)';
            lamp.style.opacity = '0';
            setTimeout(() => {
                lamp.style.display = 'none';
            }, 500);

            this.summonGenie();
            this.trackDiscovery('genie_summoned');
        });

        // Hover effect
        lamp.addEventListener('mouseenter', () => {
            lamp.style.transform = 'scale(1.1)';
            lamp.style.filter = 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.6))';
        });

        lamp.addEventListener('mouseleave', () => {
            lamp.style.transform = 'scale(1)';
            lamp.style.filter = 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))';
        });
    }

    /**
     * Reveal lamp when Aziza gives it to the user after solving her riddle
     */
    revealLamp(lamp) {
        lamp.style.display = 'block';
        lamp.classList.remove('hidden');

        // Animate lamp appearance
        setTimeout(() => {
            lamp.style.opacity = '1';
            lamp.style.transform = 'scale(1)';
            lamp.style.filter = 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))';
        }, 100);

        // Add glowing animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes lampGlow {
                0%, 100% { filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.6)); }
                50% { filter: drop-shadow(0 0 40px rgba(255, 215, 0, 1)); }
            }
            .lamp-glow {
                animation: lampGlow 2s infinite;
            }
        `;
        document.head.appendChild(style);

        // Save that user has received the lamp
        localStorage.setItem('aziza_lamp_received', 'true');

        console.log('🪔 Aziza has gifted you the magic lamp!');
    }

    /**
     * AZIZA DISCOVERY - Enhanced period shimmer
     * Easier to notice but still requires attention
     */
    enhanceAzizaDiscovery() {
        // Wait for logo to load
        setTimeout(() => {
            const logoText = document.querySelector('.logo-text');
            if (!logoText) return;

            // Only add period shimmer if logo still shows full name
            const checkLogo = () => {
                if (logoText.textContent.includes('Flautt.')) {
                    // Add shimmer to period
                    const text = logoText.textContent;
                    const parts = text.split('.');

                    logoText.innerHTML = `${parts[0]}.<span class="magic-period" title="Something mysterious here...">.</span>`;

                    const period = logoText.querySelector('.magic-period');
                    if (period) {
                        period.style.cssText = `
                            color: rgba(102, 126, 234, 0.6);
                            cursor: help;
                            position: relative;
                            animation: periodShimmer 3s infinite;
                        `;

                        // Enhanced hover effect
                        period.addEventListener('mouseenter', () => {
                            period.style.color = 'rgba(102, 126, 234, 1)';
                            period.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.8)';
                        });

                        period.addEventListener('mouseleave', () => {
                            period.style.color = 'rgba(102, 126, 234, 0.6)';
                            period.style.textShadow = 'none';
                        });

                        // Keep existing click handler
                        period.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.trackDiscovery('aziza_period_click');
                        });
                    }
                }
            };

            checkLogo();
            setInterval(checkLogo, 1000); // Keep checking in case logo changes
        }, 2000);
    }

    /**
     * SUMMON GENIE - Quest for Glory style dialogue
     */
    summonGenie() {
        this.currentNPC = 'genie';
        this.openDialogue({
            npc: 'genie',
            portrait: 'assets/images/GENIE.png',
            portraitLaugh: 'assets/images/GENIE-LAUGH.jpg',
            name: 'The Genie',
            greeting: this.getGenieGreeting(),
            choices: [
                { text: 'What is this place?', topic: 'about_site' },
                { text: 'Tell me about myself...', topic: 'about_user' },
                { text: 'I need a hint', topic: 'hint' },
                { text: 'What can I do here?', topic: 'features' },
                { text: 'Ask a question', topic: 'ask', allowInput: true },
                { text: 'Goodbye', topic: 'goodbye' }
            ]
        });
    }

    getGenieGreeting() {
        const userData = this.getUserSurveillanceData();
        const visitCount = parseInt(localStorage.getItem('visits') || '1');
        const discoveries = parseInt(localStorage.getItem('discoveries') || '0');
        const timeOfDay = this.getTimeOfDay();

        const greetings = [
            `*POOF!* ✨ Ah, ${timeOfDay}! A visitor from ${userData.city || 'the mysterious realm'}! This is visit number ${visitCount}... the magic grows stronger! What brings you to my digital domain?`,
            `🧞‍♂️ Well, well! A ${userData.device || 'mysterious device'} user! I see you've made ${discoveries} discoveries so far. Impressive! How may this humble genie assist you today?`,
            `*Appears in a puff of smoke* ✨ Greetings, seeker! I sense curiosity in you... and I know EVERYTHING about your journey here. Ask, and wisdom shall be yours!`,
            `Ah! Someone who actually found the lamp! You're more observant than most. I'm the Genie of terrellflautt.com, and I've been watching your journey with great interest...`
        ];

        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    /**
     * QUEST FOR GLORY STYLE DIALOGUE BOX
     */
    openDialogue(config) {
        // Remove any existing dialogue
        const existing = document.getElementById('rpg-dialogue');
        if (existing) existing.remove();

        const dialogue = document.createElement('div');
        dialogue.id = 'rpg-dialogue';
        dialogue.className = 'rpg-dialogue-container';

        dialogue.innerHTML = `
            <div class="dialogue-backdrop"></div>
            <div class="dialogue-box">
                <div class="dialogue-header">
                    <h3 class="npc-name">${config.name}</h3>
                    <button class="dialogue-close">&times;</button>
                </div>

                <div class="dialogue-content">
                    <div class="npc-portrait-container">
                        <img src="${config.portrait}" alt="${config.name}" class="npc-portrait" id="npcPortrait">
                        <div class="portrait-glow"></div>
                    </div>

                    <div class="dialogue-text-box">
                        <div class="text-content" id="dialogueText"></div>
                        <div class="typing-indicator" id="typingIndicator">▊</div>
                    </div>
                </div>

                <div class="dialogue-choices" id="dialogueChoices"></div>

                <div class="dialogue-input-container hidden" id="customInput">
                    <input type="text"
                           id="userQuestion"
                           placeholder="Ask your question..."
                           maxlength="200">
                    <button id="submitQuestion">Ask</button>
                    <button id="cancelQuestion">Back</button>
                </div>
            </div>
        `;

        document.body.appendChild(dialogue);

        // Animate in
        setTimeout(() => dialogue.classList.add('show'), 50);

        // Type out greeting
        this.typeText(config.greeting, document.getElementById('dialogueText'), () => {
            this.showChoices(config.choices);
        });

        // Setup close handler
        dialogue.querySelector('.dialogue-close').addEventListener('click', () => {
            this.closeDialogue();
        });

        // Backdrop click to close
        dialogue.querySelector('.dialogue-backdrop').addEventListener('click', () => {
            this.closeDialogue();
        });

        // Escape key to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeDialogue();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Store config for later use
        this.currentDialogueConfig = config;
    }

    /**
     * TYPING ANIMATION - Classic RPG effect
     */
    typeText(text, element, callback) {
        this.isTyping = true;
        element.textContent = '';
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.style.display = 'inline';

        let index = 0;
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, this.typingSpeed);
            } else {
                this.isTyping = false;
                if (indicator) indicator.style.display = 'none';
                if (callback) callback();
            }
        };

        type();

        // Click to skip typing
        element.addEventListener('click', () => {
            if (this.isTyping) {
                element.textContent = text;
                this.isTyping = false;
                if (indicator) indicator.style.display = 'none';
                if (callback) callback();
            }
        }, { once: true });
    }

    /**
     * SHOW DIALOGUE CHOICES - Quest for Glory style
     */
    showChoices(choices) {
        const choicesContainer = document.getElementById('dialogueChoices');
        if (!choicesContainer) return;

        choicesContainer.innerHTML = '';
        choicesContainer.style.opacity = '0';

        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'dialogue-choice';
            btn.innerHTML = `<span class="choice-arrow">▶</span> ${choice.text}`;

            btn.addEventListener('click', () => {
                this.handleChoice(choice);
            });

            choicesContainer.appendChild(btn);
        });

        // Fade in choices
        setTimeout(() => {
            choicesContainer.style.opacity = '1';
        }, 100);
    }

    /**
     * HANDLE USER CHOICE
     */
    async handleChoice(choice) {
        const textBox = document.getElementById('dialogueText');
        const choicesBox = document.getElementById('dialogueChoices');
        const inputBox = document.getElementById('customInput');

        // Hide choices during response
        choicesBox.style.opacity = '0';

        if (choice.topic === 'goodbye') {
            this.typeText("🧞‍♂️ *Bows gracefully* Until we meet again, seeker! May your journey be filled with discovery! ✨ *Disappears in a puff of smoke*", textBox, () => {
                setTimeout(() => this.closeDialogue(), 2000);
            });
            return;
        }

        if (choice.allowInput) {
            // Show custom input
            inputBox.classList.remove('hidden');
            inputBox.querySelector('#userQuestion').focus();

            const submitBtn = inputBox.querySelector('#submitQuestion');
            const cancelBtn = inputBox.querySelector('#cancelQuestion');
            const questionInput = inputBox.querySelector('#userQuestion');

            const submit = async () => {
                const question = questionInput.value.trim();
                if (!question) return;

                inputBox.classList.add('hidden');
                questionInput.value = '';

                // Get AI response
                await this.askGenieAI(question);
            };

            submitBtn.onclick = submit;
            questionInput.onkeydown = (e) => {
                if (e.key === 'Enter') submit();
            };
            cancelBtn.onclick = () => {
                inputBox.classList.add('hidden');
                this.showChoices(this.currentDialogueConfig.choices);
            };
            return;
        }

        // Handle predefined topics
        const response = await this.getTopicResponse(choice.topic);
        this.typeText(response, textBox, () => {
            this.showChoices(this.currentDialogueConfig.choices);
        });
    }

    /**
     * GET RESPONSE FOR TOPICS
     */
    async getTopicResponse(topic) {
        const userData = this.getUserSurveillanceData();
        const discoveries = parseInt(localStorage.getItem('discoveries') || '0');

        const responses = {
            about_site: `🧞‍♂️ *Gestures grandly* This, my friend, is no ordinary portfolio! It's a living mystery - an interactive adventure where every click might reveal a secret! ${discoveries} mysteries discovered so far. There are easter eggs hidden everywhere... some obvious, some requiring *true* observation. The more you explore, the more magic you'll find! ✨`,

            about_user: `🧞‍♂️ *Grins mischievously* Oh, I know EVERYTHING about you! You're visiting from ${userData.city || 'somewhere mysterious'} on a ${userData.device || 'device'}. It's ${userData.weather || 'a beautiful day'} where you are. This is visit #${userData.visitCount || 1}, and you've spent ${userData.timeOnSite || 'some time'} exploring. Your ${userData.browser || 'browser'} is at ${userData.battery || 'unknown'}% battery. Creepy? Maybe. Magical? Definitely! ✨`,

            hint: discoveries === 0
                ? `🧞‍♂️ Just getting started? Try clicking on things that seem... *different*. A period that shimmers, a button that calls to you, text that evolves. The site is alive! Start with the logo - there's more to it than meets the eye...`
                : `🧞‍♂️ You've found ${discoveries} secrets! Want more? Try triple-clicking sections, holding keys, checking the corners of your screen... The site responds to curiosity. And if you get *really* stuck, well... I'm always here to help! *winks*`,

            features: `🧞‍♂️ *Counts on fingers* Let's see... there's a hidden Hall of Fame, a riddle from Aziza, an evolving logo system, secret keyboard commands, time-based discoveries, and more! The site learns from you and changes over time. Some mysteries unlock others. And if you're REALLY dedicated... well, there are transcendental experiences waiting. But I've said too much! ✨`
        };

        return responses[topic] || "🧞‍♂️ *Scratches head* Hmm, I seem to have forgotten what we were talking about! The magic must be glitching. Ask me something else!";
    }

    /**
     * ASK GENIE AI (connects to backend)
     */
    async askGenieAI(question) {
        const textBox = document.getElementById('dialogueText');
        const portrait = document.getElementById('npcPortrait');

        // Show thinking state
        if (portrait && this.currentDialogueConfig.portraitLaugh) {
            portrait.src = this.currentDialogueConfig.portraitLaugh;
        }

        this.typeText("🧞‍♂️ *Thinks deeply* Hmm, let me consult the cosmic wisdom... ✨", textBox, async () => {
            try {
                const userData = this.getUserSurveillanceData();
                const userProgress = this.getUserProgress();

                // Call genie API
                const response = await fetch('https://api.terrellflautt.com/genie', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: this.getUserId(),
                        question: question,
                        userProgress: userProgress,
                        surveillanceData: userData
                    })
                });

                if (response.status === 429) {
                    const data = await response.json();
                    this.typeText(data.message, textBox, () => {
                        setTimeout(() => this.showChoices(this.currentDialogueConfig.choices), 2000);
                    });
                    return;
                }

                const data = await response.json();

                // Reset portrait
                if (portrait && this.currentDialogueConfig.portrait) {
                    portrait.src = this.currentDialogueConfig.portrait;
                }

                this.typeText(data.response || data.message, textBox, () => {
                    this.showChoices(this.currentDialogueConfig.choices);
                });

            } catch (error) {
                console.error('Genie AI error:', error);
                this.typeText("🧞‍♂️ *Poof of smoke* Oh dear! The magic circuits are fuzzy right now. Even genies have technical difficulties! But remember - you already have the power within you to find the answers. Try asking again in a moment! ✨", textBox, () => {
                    this.showChoices(this.currentDialogueConfig.choices);
                });
            }
        });
    }

    closeDialogue() {
        const dialogue = document.getElementById('rpg-dialogue');
        if (dialogue) {
            dialogue.classList.remove('show');
            setTimeout(() => {
                dialogue.remove();
                // Show lamp again when dialogue closes
                const lamp = document.getElementById('magic-lamp');
                if (lamp) {
                    lamp.style.display = 'block';
                    lamp.style.transform = 'scale(1)';
                    lamp.style.opacity = '0.9';
                }
            }, 300);
        }
    }

    // Helper functions
    getUserId() {
        return localStorage.getItem('terrellflautt_user_id') || 'anonymous';
    }

    getUserSurveillanceData() {
        return {
            city: 'your city', // Will be populated by actual tracking
            device: this.getDeviceType(),
            browser: this.getBrowserName(),
            battery: navigator.getBattery ? 'checking' : 'unknown',
            weather: 'unknown',
            visitCount: parseInt(localStorage.getItem('visits') || '1'),
            timeOnSite: this.getTimeOnSite()
        };
    }

    getUserProgress() {
        return {
            discoveries: parseInt(localStorage.getItem('discoveries') || '0'),
            easterEggs: parseInt(localStorage.getItem('easter_eggs') || '0'),
            timeSpent: sessionStorage.getItem('time_on_page') || '0'
        };
    }

    getDeviceType() {
        if (/mobile/i.test(navigator.userAgent)) return 'mobile';
        if (/tablet/i.test(navigator.userAgent)) return 'tablet';
        return 'desktop';
    }

    getBrowserName() {
        const ua = navigator.userAgent;
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Safari')) return 'Safari';
        return 'browser';
    }

    getTimeOnSite() {
        const seconds = parseInt(sessionStorage.getItem('time_on_page') || '0');
        if (seconds < 60) return `${seconds} seconds`;
        return `${Math.floor(seconds / 60)} minutes`;
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    }

    trackDiscovery(name) {
        const discoveries = parseInt(localStorage.getItem('discoveries') || '0') + 1;
        localStorage.setItem('discoveries', discoveries);
        console.log(`Discovery: ${name} (${discoveries} total)`);
    }

    loadConversationHistory() {
        // Load from localStorage if exists
        this.conversationState = JSON.parse(localStorage.getItem('genie_conversations') || '{}');
    }

    saveConversationHistory() {
        localStorage.setItem('genie_conversations', JSON.stringify(this.conversationState));
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.rpgDialogue = new RPGDialogue();
});

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RPGDialogue;
}
