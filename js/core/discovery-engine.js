class TranscendentalExperience {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.personalityProfile = {};
        this.contentLibrary = null;
        this.updateButtonState();
        this.audioSystem = null;
        this.visualSystem = null;
        this.initializeSystem();
    }

    initializeSystem() {
        // Profound psychological journey questions designed to understand the soul
        this.questions = [
            {
                text: "Right now, in this moment, what does your heart most need to hear?",
                type: "emotional_need",
                options: [
                    { text: "That everything will be okay", trait: "comfort", intensity: 5, emotion: "anxiety" },
                    { text: "That I'm enough exactly as I am", trait: "self_worth", intensity: 5, emotion: "insecurity" },
                    { text: "That my struggles have meaning", trait: "purpose", intensity: 4, emotion: "confusion" },
                    { text: "That I'm not alone in this", trait: "connection", intensity: 4, emotion: "isolation" },
                    { text: "That I have the strength to continue", trait: "resilience", intensity: 5, emotion: "overwhelm" }
                ]
            },
            {
                text: "When you feel lost or uncertain, what wisdom would your future self whisper to you?",
                type: "inner_guidance",
                options: [
                    { text: "Trust the journey, even in the darkness", trait: "faith", intensity: 5, emotion: "uncertainty" },
                    { text: "Your sensitivity is your greatest gift", trait: "empathy", intensity: 4, emotion: "overwhelm" },
                    { text: "Every ending is preparing you for a beautiful beginning", trait: "hope", intensity: 5, emotion: "grief" },
                    { text: "You are being guided, even when you can't see it", trait: "trust", intensity: 4, emotion: "fear" },
                    { text: "Your wounds will become your wisdom", trait: "transformation", intensity: 5, emotion: "pain" }
                ]
            },
            {
                text: "What part of yourself do you most need to forgive or embrace?",
                type: "self_compassion",
                options: [
                    { text: "The parts of me that feel broken or damaged", trait: "healing", intensity: 5, emotion: "shame" },
                    { text: "My tendency to doubt my own worth", trait: "self_love", intensity: 5, emotion: "insecurity" },
                    { text: "The dreams I abandoned out of fear", trait: "courage", intensity: 4, emotion: "regret" },
                    { text: "My need for others' approval", trait: "authenticity", intensity: 4, emotion: "people_pleasing" },
                    { text: "The way I push people away when I'm hurting", trait: "vulnerability", intensity: 5, emotion: "isolation" }
                ]
            },
            {
                text: "If your life were a story, what chapter are you writing now?",
                type: "narrative",
                options: [
                    { text: "The chapter where I learn to love myself", trait: "self_acceptance", intensity: 5, emotion: "growth" },
                    { text: "The chapter of brave new beginnings", trait: "courage", intensity: 4, emotion: "excitement" },
                    { text: "The chapter of letting go and healing", trait: "release", intensity: 5, emotion: "processing" },
                    { text: "The chapter where I find my true purpose", trait: "calling", intensity: 4, emotion: "searching" },
                    { text: "The chapter of deep inner peace", trait: "serenity", intensity: 3, emotion: "contentment" }
                ]
            },
            {
                text: "What does your soul most long to express to the world?",
                type: "soul_expression",
                options: [
                    { text: "That every person matters and has infinite worth", trait: "compassion", intensity: 5, emotion: "love" },
                    { text: "That it's okay to be vulnerable and imperfect", trait: "authenticity", intensity: 4, emotion: "acceptance" },
                    { text: "That beauty can be found in the darkest places", trait: "hope", intensity: 5, emotion: "inspiration" },
                    { text: "That we're all connected by invisible threads", trait: "unity", intensity: 4, emotion: "oneness" },
                    { text: "That your story isn't over - it's just beginning", trait: "hope", intensity: 5, emotion: "despair" }
                ]
            },
            {
                text: "What does transcendence mean to you right now?",
                type: "transcendence",
                options: [
                    { text: "Rising above the ego's limitations", trait: "spiritual", intensity: 5 },
                    { text: "Creating something greater than myself", trait: "creation", intensity: 4 },
                    { text: "Understanding my place in the cosmic dance", trait: "cosmic", intensity: 5 },
                    { text: "Helping others discover their own light", trait: "service", intensity: 4 },
                    { text: "Living from a place of unconditional love", trait: "love", intensity: 5 }
                ]
            }
        ];

        // Massive reward system with personalized content generators
        this.rewardGenerators = {
            legacy: this.createLegacyExperience.bind(this),
            wisdom: this.createWisdomExperience.bind(this),
            connection: this.createConnectionExperience.bind(this),
            innovation: this.createInnovationExperience.bind(this),
            purpose: this.createPurposeExperience.bind(this),
            creation: this.createCreationExperience.bind(this),
            spiritual: this.createSpiritualExperience.bind(this),
            growth: this.createGrowthExperience.bind(this),
            authenticity: this.createAuthenticityExperience.bind(this),
            love: this.createLoveExperience.bind(this)
        };

        this.setupEventListeners();
        this.easterEggSystem = new EasterEggSystem();
    }

    setupEventListeners() {
        // Set up immediately since DOM is already loaded when this runs
        const trigger = document.getElementById('transcendental-trigger');
        if (trigger) {
            console.log('✨ Transcendental button found and connected!');
            trigger.addEventListener('click', () => {
                console.log('🚀 Journey starting...');
                this.startJourney();
            });
        } else {
            console.log('⚠️ Transcendental button not found immediately, retrying...');
            // If not found immediately, wait a bit and try again
            setTimeout(() => {
                const delayedTrigger = document.getElementById('transcendental-trigger');
                if (delayedTrigger) {
                    console.log('✨ Transcendental button found on retry!');
                    delayedTrigger.addEventListener('click', () => {
                        console.log('🚀 Journey starting...');
                        this.startJourney();
                    });
                } else {
                    console.log('ℹ️ No transcendental button found - manual mode');
                }
            }, 100);
        }
    }

    updateButtonState() {
        const button = document.getElementById('transcendental-trigger');
        const buttonText = button?.querySelector('.btn-transcendental-text');

        // If the original structure doesn't exist (e.g., modified by Easter eggs),
        // use the button directly
        const targetElement = buttonText || button;

        if (!targetElement) return;

        const journeyState = this.getJourneyState();
        let newText = '';

        switch (journeyState) {
            case 'never_started':
                newText = 'Begin Your Journey';
                button?.classList.remove('journey-incomplete', 'journey-complete');
                break;
            case 'started_incomplete':
                newText = 'Reset Journey';
                button?.classList.add('journey-incomplete');
                button?.classList.remove('journey-complete');
                break;
            case 'completed':
                newText = 'Begin New Journey';
                button?.classList.add('journey-complete');
                button?.classList.remove('journey-incomplete');
                break;
        }

        // For buttons modified by Easter eggs, we need to handle the full content
        if (!buttonText) {
            // Easter egg modified button - update entire content but preserve the ✨
            const currentContent = button.textContent.trim();
            const hasSparkles = currentContent.includes('✨');
            const newContent = hasSparkles ? `${newText}\n                        ✨` : newText;

            if (button.textContent.trim() !== newContent.trim()) {
                button.style.opacity = '0.6';
                setTimeout(() => {
                    button.innerHTML = newContent;
                    button.style.opacity = '1';
                }, 150);
            }
        } else {
            // Original structure intact - update text span only
            if (buttonText.textContent !== newText) {
                buttonText.style.opacity = '0.6';
                setTimeout(() => {
                    buttonText.textContent = newText;
                    buttonText.style.opacity = '1';
                }, 150);
            }
        }
    }

    getJourneyState() {
        try {
            const transcendentalData = localStorage.getItem('transcendental_journey');
            if (!transcendentalData) return 'never_started';

            const data = JSON.parse(transcendentalData);

            if (data.completed) {
                return 'completed';
            } else if (data.started) {
                return 'started_incomplete';
            }

            return 'never_started';
        } catch (error) {
            return 'never_started';
        }
    }

    markJourneyStarted() {
        const journeyData = {
            started: true,
            completed: false,
            startTime: Date.now(),
            lastProgress: Date.now()
        };
        localStorage.setItem('transcendental_journey', JSON.stringify(journeyData));
        this.updateButtonState();
    }

    markJourneyCompleted() {
        try {
            const existing = JSON.parse(localStorage.getItem('transcendental_journey') || '{}');
            const journeyData = {
                ...existing,
                completed: true,
                completedTime: Date.now()
            };
            localStorage.setItem('transcendental_journey', JSON.stringify(journeyData));
            this.updateButtonState();
        } catch (error) {
            console.error('Error marking journey completed:', error);
        }
    }

    resetJourney() {
        localStorage.removeItem('transcendental_journey');
        this.currentQuestion = 0;
        this.answers = [];
        this.personalityProfile = {};
        this.updateButtonState();
    }

    startJourney() {
        const journeyState = this.getJourneyState();

        if (journeyState === 'started_incomplete') {
            // Automatically reset and start fresh - no annoying popup
            this.resetJourney();
        } else if (journeyState === 'completed') {
            // User wants to begin a new journey
            this.resetJourney(); // Clear previous completed journey
        }

        // Mark journey as started
        this.markJourneyStarted();

        this.currentQuestion = 0;
        this.answers = [];
        this.personalityProfile = {};
        this.createOverlay();
        this.showQuestion();
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'transcendental-overlay';
        overlay.innerHTML = `
            <div class="transcendental-container">
                <div class="transcendental-header">
                    <h2 class="transcendental-title">Your Journey Begins</h2>
                    <button class="close-transcendental">&times;</button>
                </div>
                <div class="transcendental-content" id="transcendental-content">
                    <div class="journey-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                        <span class="progress-text">Question 1 of ${this.questions.length}</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('.close-transcendental').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const existingOverlay = document.querySelector('.transcendental-overlay');
                if (existingOverlay) {
                    document.body.removeChild(existingOverlay);
                }
            }
        });
    }

    showQuestion() {
        const content = document.getElementById('transcendental-content');
        const question = this.questions[this.currentQuestion];
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;

        content.innerHTML = `
            <div class="journey-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <span class="progress-text">Question ${this.currentQuestion + 1} of ${this.questions.length}</span>
            </div>
            <div class="question-container">
                <h3 class="question-text">${question.text}</h3>
                <div class="options-container">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" data-index="${index}">
                            <span class="option-text">${option.text}</span>
                            <span class="option-icon">→</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Add click listeners to options
        content.querySelectorAll('.option-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.selectAnswer(index);
            });
        });
    }

    selectAnswer(optionIndex) {
        const question = this.questions[this.currentQuestion];
        const selectedOption = question.options[optionIndex];

        this.answers.push({
            question: question.text,
            answer: selectedOption.text,
            trait: selectedOption.trait,
            intensity: selectedOption.intensity,
            type: question.type
        });

        // Build personality profile
        if (!this.personalityProfile[selectedOption.trait]) {
            this.personalityProfile[selectedOption.trait] = 0;
        }
        this.personalityProfile[selectedOption.trait] += selectedOption.intensity;

        // 🎵 Trigger visual music for honest answers to emotional/deep questions
        if (selectedOption.intensity >= 4 && ['emotional_need', 'self_compassion', 'soul_expression'].includes(question.type)) {
            console.log(`🎵 Triggering visual music for honest answer: ${selectedOption.text}`);
            if (window.visualMusicExperience) {
                window.visualMusicExperience.triggerForHonestAnswer({
                    type: 'honest_answer',
                    question: question.text,
                    answer: selectedOption.text,
                    intensity: selectedOption.intensity,
                    questionType: question.type,
                    timestamp: Date.now()
                });
            }
        }

        this.currentQuestion++;

        if (this.currentQuestion < this.questions.length) {
            setTimeout(() => this.showQuestion(), 500);
        } else {
            // 🎵 Trigger visual music for completing the difficult transcendental journey
            console.log('🎵 Triggering visual music for completing transcendental journey');
            if (window.visualMusicExperience) {
                window.visualMusicExperience.triggerForDifficultProgress({
                    type: 'transcendental_completion',
                    totalAnswers: this.answers.length,
                    personalityTraits: Object.keys(this.personalityProfile),
                    timestamp: Date.now()
                });
            }
            setTimeout(() => this.generatePersonalizedExperience(), 800);
        }
    }

    async generatePersonalizedExperience() {
        // Initialize systems for transcendental experience
        this.contentLibrary = new TranscendentalContentLibrary();
        this.audioSystem = new TranscendentalAudio();

        // Create emotional profile for personalized content
        const emotionalProfile = {
            answers: this.answers.map(answer => ({ option: answer })),
            traits: this.personalityProfile
        };

        // Get personalized transformative content
        const transformativeContent = this.contentLibrary.getPersonalizedContent(emotionalProfile);

        // Save journey progress
        if (window.userJourney) {
            window.userJourney.saveTranscendentalProgress(this.answers, this.personalityProfile, transformativeContent.type);
        }

        // Begin the transcendental experience
        await this.beginTranscendentalExperience(transformativeContent);
    }

    async beginTranscendentalExperience(content) {
        // Create sacred space
        const overlay = this.createTranscendentalSpace();
        document.body.appendChild(overlay);

        try {
            // Initialize visual system
            const visualContainer = overlay.querySelector('.transcendental-visual-container');
            this.visualSystem = new TranscendentalVisuals(visualContainer);
            visualContainer.appendChild(this.visualSystem.getCanvas());

            // Create experience based on content type
            if (content.type === 'song') {
                await this.deliverSongExperience(content, overlay);
            } else {
                await this.deliverPoemExperience(content, overlay);
            }

            // Show completion message
            this.showCompletionBlessings(overlay);

        } catch (error) {
            console.error('Error in transcendental experience:', error);
            this.showFallbackBlessings(overlay);
        }
    }

    createTranscendentalSpace() {
        const overlay = document.createElement('div');
        overlay.className = 'transcendental-space';
        overlay.innerHTML = `
            <div class="transcendental-visual-container"></div>
            <div class="transcendental-content-container">
                <div class="transcendental-music-container"></div>
                <div class="transcendental-text-display">
                    <div class="breathing-circle"></div>
                    <div class="transcendental-title"></div>
                    <div class="transcendental-content"></div>
                    <div class="transcendental-controls">
                        <button class="volume-control" title="Adjust Volume">🔊</button>
                        <button class="pause-control" title="Pause">⏸️</button>
                        <button class="close-experience" title="Close">✨ Complete Journey ✨</button>
                    </div>
                </div>
            </div>
        `;

        // Add music platform interface
        const musicContainer = overlay.querySelector('.transcendental-music-container');
        this.audioSystem.createMusicPlayerInterface(musicContainer);

        // Add event listeners
        overlay.querySelector('.close-experience').addEventListener('click', () => {
            this.endTranscendentalExperience(overlay);
        });

        overlay.querySelector('.volume-control').addEventListener('click', (e) => {
            this.toggleVolumeControl(e.target);
        });

        overlay.querySelector('.pause-control').addEventListener('click', (e) => {
            this.togglePause(e.target);
        });

        return overlay;
    }

    async deliverPoemExperience(content, overlay) {
        const titleElement = overlay.querySelector('.transcendental-title');
        const contentElement = overlay.querySelector('.transcendental-content');
        const poem = content.content;

        // Set title
        titleElement.textContent = poem.title;
        titleElement.style.opacity = '1';

        // Determine visual theme
        const theme = this.getVisualTheme(poem.emotions);
        this.visualSystem[`start${theme.charAt(0).toUpperCase()}${theme.slice(1)}`]();

        // Start instrumental and display poem
        await this.audioSystem.playInstrumentalWithText(
            content,
            (text, lineIndex, totalLines) => {
                contentElement.innerHTML = text.replace(/\n/g, '<br>');
                contentElement.style.opacity = '1';

                // Create gentle breathing effect for text
                const progress = lineIndex / totalLines;
                contentElement.style.transform = `scale(${0.98 + progress * 0.04})`;
            },
            () => {
                // Poem complete
                this.addPersonalMessage(overlay);
            }
        );
    }

    async deliverSongExperience(content, overlay) {
        const titleElement = overlay.querySelector('.transcendental-title');
        const contentElement = overlay.querySelector('.transcendental-content');
        const song = content.content;

        // Set title
        titleElement.innerHTML = `${song.title} <span class="by-artist">by ${song.artist}</span>`;
        titleElement.style.opacity = '1';

        // Start connection visual theme
        this.visualSystem.startConnection();

        // Start song with synchronized lyrics
        await this.audioSystem.playSongWithLyrics(
            content,
            (lyric, index, total) => {
                contentElement.innerHTML = lyric;
                contentElement.style.opacity = '1';

                // Special effect for chorus
                if (lyric.includes('🎵')) {
                    contentElement.classList.add('chorus-highlight');
                    setTimeout(() => contentElement.classList.remove('chorus-highlight'), 2000);
                }
            },
            () => {
                // Song complete
                this.addPersonalMessage(overlay);
            }
        );
    }

    addPersonalMessage(overlay) {
        const contentElement = overlay.querySelector('.transcendental-content');

        setTimeout(() => {
            contentElement.innerHTML = `
                <div class="personal-blessing">
                    <h3>A Message For You</h3>
                    <p>You took the time for this journey, and that speaks to the beautiful depth of your soul.</p>
                    <p>Whatever brought you here today, know that you are seen, valued, and never alone.</p>
                    <p>Carry this moment with you. Return to it whenever you need reminder of your own light.</p>
                    <div class="blessing-signature">
                        With love and infinite respect for your journey,<br>
                        <em>— Terrell K. Flautt, Tech King</em>
                    </div>
                </div>
            `;
        }, 3000);
    }

    getVisualTheme(emotions) {
        if (emotions.includes('pain') || emotions.includes('healing')) return 'healing';
        if (emotions.includes('despair') || emotions.includes('hope')) return 'hope';
        if (emotions.includes('growth') || emotions.includes('transformation')) return 'growth';
        return 'connection';
    }

    showCompletionBlessings(overlay) {
        // Experience has been delivered - mark journey as completed
        this.markJourneyCompleted();

        // Show the close button
        overlay.querySelector('.close-experience').style.display = 'block';
    }

    showFallbackBlessings(overlay) {
        const contentElement = overlay.querySelector('.transcendental-content');
        contentElement.innerHTML = `
            <div class="fallback-blessing">
                <h3>Your Journey Continues</h3>
                <p>Even when technology fails us, the human spirit endures.</p>
                <p>Take a moment to breathe deeply and know that you are exactly where you need to be.</p>
                <p>Your path is unfolding perfectly, one step at a time.</p>
            </div>
        `;
        this.showCompletionBlessings(overlay);
    }

    toggleVolumeControl(button) {
        if (this.audioSystem) {
            const currentVolume = this.audioSystem.volume;
            const newVolume = currentVolume > 0.5 ? 0.2 : currentVolume > 0.2 ? 0 : 0.7;
            this.audioSystem.setVolume(newVolume);

            button.textContent = newVolume === 0 ? '🔇' : newVolume < 0.5 ? '🔉' : '🔊';
        }
    }

    togglePause(button) {
        if (this.audioSystem) {
            if (this.audioSystem.isPlaying) {
                this.audioSystem.pause();
                button.textContent = '▶️';
            } else {
                this.audioSystem.resume();
                button.textContent = '⏸️';
            }
        }
    }

    endTranscendentalExperience(overlay) {
        // Stop all systems gracefully
        if (this.audioSystem) {
            this.audioSystem.stop();
        }
        if (this.visualSystem) {
            this.visualSystem.stop();
        }

        // Fade out overlay
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 1000);

        // Show gratitude message
        this.showGratitudeToast();
    }

    showGratitudeToast() {
        const toast = document.createElement('div');
        toast.className = 'gratitude-toast';
        toast.innerHTML = '✨ Thank you for taking this journey with me ✨';
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }

    // Individual experience generators for each personality trait
    createLegacyExperience(traits) {
        const legacyRiddles = [
            "I am built in moments but remembered in lifetimes. What am I?",
            "The more you give me away, the more valuable I become. What am I?",
            "I exist in the space between what you were and what you could become. What am I?"
        ];

        const legacyPoems = [
            `The architect of tomorrow
            Builds with intention today,
            Each choice a cornerstone
            In the cathedral of forever.

            Your legacy lives not in stone,
            But in the hearts you've touched,
            The minds you've expanded,
            The souls you've awakened.`,

            `Time is the canvas,
            Your actions the paint—
            Create something beautiful
            That echoes through eternity.`
        ];

        const legacyAscii = `
        ┌─────────────────────────────────┐
        │  ⭐ THE LEGACY BUILDER ⭐         │
        │                                 │
        │    🏗️  Your Path Forward  🏗️     │
        │                                 │
        │  Build → Inspire → Transform    │
        │     ↓        ↓         ↓       │
        │   Today   Others   Tomorrow     │
        │                                 │
        └─────────────────────────────────┘
        `;

        return {
            type: 'legacy',
            title: 'The Legacy Builder',
            riddle: this.getRandomItem(legacyRiddles),
            riddle_answer: ["Impact", "Knowledge", "Potential"][Math.floor(Math.random() * 3)],
            poem: this.getRandomItem(legacyPoems),
            ascii: legacyAscii,
            personalGuidance: this.generateLegacyGuidance(traits),
            interactiveChallenge: this.createLegacyChallenge(),
            dailyPractice: "Each day, ask yourself: 'What am I building that will outlast me?'"
        };
    }

    createWisdomExperience(traits) {
        const wisdomRiddles = [
            "I grow stronger when shared, deeper when questioned, and more valuable when applied. What am I?",
            "The more you seek me, the more you realize how little you possess me. What am I?",
            "I am found in silence, born from experience, and gifted through story. What am I?"
        ];

        const wisdomPoems = [
            `In the stillness between thoughts,
            Wisdom whispers its secrets.
            Not in the noise of knowing,
            But in the grace of wondering.

            Each question births understanding,
            Each failure fathers growth,
            Each moment of confusion
            Clears the path to truth.`,

            `The wise person knows
            That knowing is not wisdom—
            Wisdom is the art
            Of beautiful uncertainty.`
        ];

        const wisdomAscii = `
        ┌─────────────────────────────────┐
        │      🦉 THE WISDOM SEEKER 🦉     │
        │                                 │
        │    Question → Reflect → Grow    │
        │       ↓          ↓       ↓     │
        │    Wonder     Pause    Evolve   │
        │                                 │
        │   "In knowing that you know      │
        │    nothing, you know everything" │
        └─────────────────────────────────┘
        `;

        return {
            type: 'wisdom',
            title: 'The Wisdom Seeker',
            riddle: this.getRandomItem(wisdomRiddles),
            riddle_answer: ["Wisdom", "Knowledge", "Understanding"][Math.floor(Math.random() * 3)],
            poem: this.getRandomItem(wisdomPoems),
            ascii: wisdomAscii,
            personalGuidance: this.generateWisdomGuidance(traits),
            interactiveChallenge: this.createWisdomChallenge(),
            dailyPractice: "Before making decisions, pause and ask: 'What would my wisest self do?'"
        };
    }

    createConnectionExperience(traits) {
        const connectionPoems = [
            `In the space between hearts,
            Magic happens.
            Not in the words we speak,
            But in the silence we share.

            Connection is the bridge
            Between souls recognizing
            Themselves in each other—
            The divine in the ordinary.`,

            `We are drops in an ocean,
            Thinking we are separate,
            Until love reminds us
            We are the ocean itself.`
        ];

        const connectionAscii = `
        ┌─────────────────────────────────┐
        │     💫 THE BRIDGE BUILDER 💫     │
        │                                 │
        │     You ←→ Others ←→ Universe   │
        │      ↓       ↓         ↓       │
        │    Love   Empathy   Oneness     │
        │                                 │
        │   "Connection is the purpose     │
        │    of human existence"          │
        └─────────────────────────────────┘
        `;

        return {
            type: 'connection',
            title: 'The Bridge Builder',
            poem: this.getRandomItem(connectionPoems),
            ascii: connectionAscii,
            personalGuidance: this.generateConnectionGuidance(traits),
            interactiveChallenge: this.createConnectionChallenge(),
            dailyPractice: "Each day, create one genuine moment of connection with another being."
        };
    }

    createInnovationExperience(traits) {
        const innovationAscii = `
        ┌─────────────────────────────────┐
        │   🚀 THE REALITY HACKER 🚀      │
        │                                 │
        │   Imagine → Create → Transform   │
        │      ↓        ↓         ↓      │
        │   Dream     Build    Change     │
        │                                 │
        │  "The future belongs to those   │
        │   who believe in their visions" │
        └─────────────────────────────────┘
        `;

        return {
            type: 'innovation',
            title: 'The Reality Hacker',
            ascii: innovationAscii,
            personalGuidance: this.generateInnovationGuidance(traits),
            interactiveChallenge: this.createInnovationChallenge(),
            dailyPractice: "Every day, ask: 'What if?' and follow the idea for 10 minutes."
        };
    }

    createSpiritualExperience(traits) {
        const spiritualPoems = [
            `You are not a drop in the ocean—
            You are the ocean in a drop.
            Not separate from the divine,
            But divinity experiencing itself.

            In every breath, resurrection.
            In every heartbeat, eternity.
            In every moment, the choice
            To remember who you really are.`,

            `The spiritual journey
            Is not about becoming something new—
            It's about remembering
            What you've always been.`
        ];

        const spiritualAscii = `
        ┌─────────────────────────────────┐
        │      🕉️ THE SOUL AWAKENER 🕉️     │
        │                                 │
        │     Ego → Soul → Universe       │
        │      ↓     ↓       ↓           │
        │   Forget Remember Transcend     │
        │                                 │
        │   "You are not a human being    │
        │   having a spiritual experience │
        │   but a spiritual being having  │
        │   a human experience"           │
        └─────────────────────────────────┘
        `;

        return {
            type: 'spiritual',
            title: 'The Soul Awakener',
            poem: this.getRandomItem(spiritualPoems),
            ascii: spiritualAscii,
            personalGuidance: this.generateSpiritualGuidance(traits),
            interactiveChallenge: this.createSpiritualChallenge(),
            dailyPractice: "Spend 5 minutes in silence each day, simply being present with what is."
        };
    }

    // Additional experience generators for other traits...
    createCreationExperience(traits) {
        return {
            type: 'creation',
            title: 'The Creative Force',
            ascii: `
            ┌─────────────────────────────────┐
            │     🎨 THE CREATIVE FORCE 🎨    │
            │                                 │
            │   Inspiration → Creation → Joy   │
            │       ↓           ↓        ↓   │
            │    Receive      Express   Share │
            │                                 │
            │  "Creativity is intelligence     │
            │   having fun"                   │
            └─────────────────────────────────┘
            `,
            personalGuidance: "Your creative energy is your soul's language. Trust it.",
            dailyPractice: "Create something every day, even if it's just a single line or brushstroke."
        };
    }

    createGrowthExperience(traits) {
        return {
            type: 'growth',
            title: 'The Eternal Student',
            ascii: `
            ┌─────────────────────────────────┐
            │   🌱 THE ETERNAL STUDENT 🌱     │
            │                                 │
            │  Challenge → Learn → Evolve     │
            │      ↓         ↓       ↓       │
            │   Struggle   Insight  Wisdom    │
            │                                 │
            │   "Every master was once        │
            │    a disaster"                  │
            └─────────────────────────────────┘
            `,
            personalGuidance: "Growth happens at the edge of your comfort zone. Lean into it.",
            dailyPractice: "Do one thing that scares you or challenges you each day."
        };
    }

    createAuthenticityExperience(traits) {
        return {
            type: 'authenticity',
            title: 'The Truth Speaker',
            ascii: `
            ┌─────────────────────────────────┐
            │   ✨ THE TRUTH SPEAKER ✨       │
            │                                 │
            │    Mask → Truth → Freedom       │
            │     ↓      ↓       ↓           │
            │   Hide   Reveal  Liberate       │
            │                                 │
            │  "Authenticity is the daily     │
            │   practice of letting go of     │
            │   who we think we're supposed   │
            │   to be"                        │
            └─────────────────────────────────┘
            `,
            personalGuidance: "Your authentic self is your greatest gift to the world.",
            dailyPractice: "In one interaction each day, be completely honest about who you are."
        };
    }

    createLoveExperience(traits) {
        return {
            type: 'love',
            title: 'The Love Embodiment',
            ascii: `
            ┌─────────────────────────────────┐
            │   💖 THE LOVE EMBODIMENT 💖     │
            │                                 │
            │   Fear → Love → Transformation  │
            │    ↓      ↓         ↓          │
            │  Close   Open    Illuminate     │
            │                                 │
            │  "Love is not something you do  │
            │   Love is something you are"    │
            └─────────────────────────────────┘
            `,
            personalGuidance: "You are love expressing itself in human form. Remember this truth.",
            dailyPractice: "Send love to someone who irritates you. Watch what happens."
        };
    }

    createPurposeExperience(traits) {
        return {
            type: 'purpose',
            title: 'The Mission Keeper',
            ascii: `
            ┌─────────────────────────────────┐
            │   🎯 THE MISSION KEEPER 🎯      │
            │                                 │
            │   Call → Serve → Fulfill        │
            │    ↓      ↓       ↓            │
            │  Hear   Answer  Complete        │
            │                                 │
            │  "Your purpose is the gift      │
            │   the world needs most"         │
            └─────────────────────────────────┘
            `,
            personalGuidance: "Your purpose is calling you. Listen with your heart, not your fears.",
            dailyPractice: "Ask daily: 'How can I serve?' Then follow the first answer that comes."
        };
    }

    createUniversalExperience(traits) {
        const universalRiddles = [
            "I am the space between what you know and what you seek. What am I?",
            "I exist in every moment but can only be found in presence. What am I?",
            "I am the bridge between who you are and who you're becoming. What am I?"
        ];

        const universalPoems = [
            `The seeker finds not what they seek,
            But something far more profound—
            The courage to continue seeking,
            The wisdom to remain unbound.

            Your journey is uniquely yours,
            No map can guide your way,
            Trust the compass of your heart,
            And let intuition say.`,

            `In the space between questions,
            Wisdom quietly grows,
            Between the known and unknown,
            The deepest mystery shows.

            You are both the seeker
            And the treasure being sought,
            The answer and the question,
            The lesson being taught.`
        ];

        return {
            type: 'universal',
            title: 'The Universal Seeker',
            riddle: this.getRandomItem(universalRiddles),
            riddle_answer: ["Mystery", "Presence", "Growth"][Math.floor(Math.random() * 3)],
            poem: this.getRandomItem(universalPoems),
            ascii: `
            ┌─────────────────────────────────┐
            │   🌟 THE UNIVERSAL SEEKER 🌟    │
            │                                 │
            │  Question → Seek → Discover     │
            │     ↓        ↓       ↓         │
            │   Wonder   Journey  Wisdom      │
            │                                 │
            │  "All paths lead to growth      │
            │   when walked with intention"   │
            └─────────────────────────────────┘
            `,
            personalGuidance: "Your path is unique, but you are not alone. Every seeker finds what they need when they need it most.",
            interactiveChallenge: this.createUniversalChallenge(),
            dailyPractice: "Each day, pause and ask: 'What is this moment trying to teach me?'"
        };
    }

    // Generate personalized guidance based on user's answers
    generateLegacyGuidance(traits) {
        const guidance = [
            "Your desire to create lasting impact shows a soul that understands the weight of time. Focus on building systems and relationships that compound over generations.",
            "Legacy isn't about monuments—it's about the ripple effects of your choices. Every decision you make today echoes into tomorrow.",
            "The greatest legacy builders plant trees whose shade they'll never enjoy. Your vision extends beyond your lifetime."
        ];
        return this.getRandomItem(guidance);
    }

    generateWisdomGuidance(traits) {
        const guidance = [
            "Wisdom isn't about having all the answers—it's about asking better questions. Your curiosity is your compass.",
            "True wisdom comes from integrating knowledge with experience. Trust your inner knowing as much as your learning.",
            "The wise person knows that every mistake is a lesson in disguise. Embrace your failures as teachers."
        ];
        return this.getRandomItem(guidance);
    }

    generateConnectionGuidance(traits) {
        const guidance = [
            "Your gift is seeing the humanity in everyone. Use this superpower to bridge divides and heal wounds.",
            "Connection is your love language with the universe. The more you give, the more you receive.",
            "You understand that we're all walking each other home. Your presence is a gift to the world."
        ];
        return this.getRandomItem(guidance);
    }

    generateInnovationGuidance(traits) {
        const guidance = [
            "Your mind sees possibilities where others see problems. Trust your vision, even when others can't see it yet.",
            "Innovation requires courage to be wrong in public. Your willingness to experiment is your strength.",
            "The future needs your ideas. Don't dim your light to make others comfortable."
        ];
        return this.getRandomItem(guidance);
    }

    generateSpiritualGuidance(traits) {
        const guidance = [
            "Your spiritual seeking is your soul's way of coming home to itself. Trust the journey, even in the darkness.",
            "You're being called to remember your true nature. Every moment of presence is a step toward awakening.",
            "Your spiritual insights are meant to be shared. You're here to help others remember their divinity too."
        ];
        return this.getRandomItem(guidance);
    }

    // Create interactive challenges
    createLegacyChallenge() {
        return {
            title: "The Legacy Vision Quest",
            description: "Write a letter to yourself 10 years from now. What legacy do you want to report?",
            action: "Take 5 minutes and write down 3 things you want your future self to thank you for starting today."
        };
    }

    createWisdomChallenge() {
        return {
            title: "The Question Keeper",
            description: "Wisdom grows from better questions, not better answers.",
            action: "For the next week, end each day by writing down the most interesting question that came to you."
        };
    }

    createConnectionChallenge() {
        return {
            title: "The Heart Bridge",
            description: "Connection is a practice, not an accident.",
            action: "Call someone you haven't spoken to in a while and tell them specifically how they've impacted your life."
        };
    }

    createInnovationChallenge() {
        return {
            title: "The Impossible Inventor",
            description: "Innovation starts with 'What if?'",
            action: "Choose something that frustrates you and spend 30 minutes imagining a radically different solution."
        };
    }

    createSpiritualChallenge() {
        return {
            title: "The Presence Practice",
            description: "Spirituality is the art of being fully alive.",
            action: "For one hour today, practice seeing the sacred in the ordinary. Report back what you discover."
        };
    }

    createUniversalChallenge() {
        return {
            title: "The Seeker's Journey",
            description: "Every path leads somewhere, but not every path leads where you want to go.",
            action: "Take a moment to reflect: What question has been calling to you lately? Write it down and commit to exploring it this week."
        };
    }

    showPersonalizedReward(experience, dominantTrait, allTraits) {
        const content = document.getElementById('transcendental-content');

        content.innerHTML = `
            <div class="experience-container">
                <div class="experience-header">
                    <h2 class="experience-title">${experience.title}</h2>
                    <div class="experience-subtitle">Your Personalized Journey Outcome</div>
                </div>

                <div class="experience-content">
                    ${experience.ascii ? `
                        <div class="ascii-art">
                            <pre>${experience.ascii}</pre>
                        </div>
                    ` : ''}

                    ${experience.poem ? `
                        <div class="wisdom-poem">
                            <h4>Your Personal Poem</h4>
                            <div class="poem-text">${experience.poem.replace(/\n/g, '<br>')}</div>
                        </div>
                    ` : ''}

                    ${experience.riddle ? `
                        <div class="personal-riddle">
                            <h4>Your Challenge Riddle</h4>
                            <p class="riddle-text">${experience.riddle}</p>
                            <button class="reveal-answer-btn" onclick="this.nextElementSibling.style.display='block'; this.style.display='none';">
                                Reveal Answer
                            </button>
                            <div class="riddle-answer" style="display: none;">
                                <strong>Answer:</strong> ${experience.riddle_answer}
                            </div>
                        </div>
                    ` : ''}

                    <div class="personal-guidance">
                        <h4>Your Personal Guidance</h4>
                        <p>${experience.personalGuidance}</p>
                    </div>

                    ${experience.interactiveChallenge ? `
                        <div class="interactive-challenge">
                            <h4>${experience.interactiveChallenge.title}</h4>
                            <p>${experience.interactiveChallenge.description}</p>
                            <div class="challenge-action">
                                <strong>Your Action:</strong> ${experience.interactiveChallenge.action}
                            </div>
                        </div>
                    ` : ''}

                    <div class="daily-practice">
                        <h4>Your Daily Practice</h4>
                        <p>${experience.dailyPractice}</p>
                    </div>

                    <div class="personality-insights">
                        <h4>Your Personality Spectrum</h4>
                        <div class="traits-visualization">
                            ${allTraits.map(([trait, score]) => `
                                <div class="trait-bar">
                                    <span class="trait-name">${trait.replace('_', ' ')}</span>
                                    <div class="trait-meter">
                                        <div class="trait-fill" style="width: ${(score / 5) * 100}%"></div>
                                    </div>
                                    <span class="trait-score">${score}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="journey-complete">
                        <button class="btn-take-action" onclick="
                            this.innerHTML='✨ Journey Integrated ✨';
                            this.disabled=true;
                            window.transcendentalExperience?.markJourneyCompleted();
                            setTimeout(() => {
                                document.querySelector('.transcendental-overlay')?.remove();
                            }, 2000);
                        ">
                            Integrate This Wisdom
                        </button>
                        <button class="btn-retake" onclick="
                            document.querySelector('.transcendental-overlay')?.remove();
                            const exp = new TranscendentalExperience();
                            exp.resetJourney();
                            exp.startJourney();
                        ">
                            Begin New Journey
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

// Enhanced Easter Egg System
class EasterEggSystem {
    constructor() {
        this.konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        this.konamiIndex = 0;
        this.secretClicks = 0;
        this.aiWisdomTrigger = [];
        this.aiWisdomSequence = [65, 73]; // A, I keys
        this.aiWisdomCount = 0;
        this.aiWisdomLevel = 1; // Track which level of wisdom to show
        this.hasSeenFirstWisdom = false;

        // Progressive Easter egg system - naturally embedded in page elements
        this.userProgress = {
            level: 1,
            visits: parseInt(localStorage.getItem('terrellflautt-visits') || '0'),
            discoveries: JSON.parse(localStorage.getItem('terrellflautt-discoveries') || '[]'),
            hints: JSON.parse(localStorage.getItem('terrellflautt-hints') || '[]'),
            lastVisit: parseInt(localStorage.getItem('terrellflautt-lastvisit') || Date.now()),
            currentSession: Date.now()
        };

        // Progressive discovery system - each level unlocks naturally
        this.progressiveTriggers = {
            level1: {
                name: "First Glimpse",
                description: "Notice the details that others miss",
                elements: [
                    { target: '.hero-title', type: 'word', word: 'Terrell', hint: 'name-glow', discovery: 'founder_essence' },
                    { target: 'footer p', type: 'year', word: '2025', hint: 'future-pulse', discovery: 'time_awareness' },
                    { target: '.logo', type: 'click', count: 3, hint: 'crown-shimmer', discovery: 'tech_king_revealed' }
                ]
            },
            level2: {
                name: "Deeper Sight",
                description: "Hidden symbols reveal themselves to persistent seekers",
                elements: [
                    { target: '.section-title', type: 'punctuation', char: '.', hint: 'dot-expand', discovery: 'completion_wisdom' },
                    { target: 'p', type: 'letter', char: 'I', hint: 'self-highlight', discovery: 'inner_strength' },
                    { target: 'a[href="#contact"]', type: 'hover', duration: 3000, hint: 'connection-warmth', discovery: 'bridge_builder' }
                ]
            },
            level3: {
                name: "Pattern Recognition",
                description: "The universe speaks through repetition and rhythm",
                elements: [
                    { target: '.project-card', type: 'sequence_hover', pattern: [1,2,3], hint: 'card-sequence', discovery: 'growth_pattern' },
                    { target: '.btn', type: 'word', word: 'Begin', hint: 'begin-pulse', discovery: 'journey_caller' },
                    { target: 'strong', type: 'double_click', hint: 'emphasis-glow', discovery: 'strength_seeker' }
                ]
            },
            level4: {
                name: "Hidden Messages",
                description: "Truth hides in plain sight for those who truly see",
                elements: [
                    { target: '.hero-subtitle', type: 'character_sequence', sequence: 'self', hint: 'letter-dance', discovery: 'self_reliance' },
                    { target: '.footer', type: 'corner_click', corner: 'bottom-right', hint: 'corner-glow', discovery: 'foundation_seeker' },
                    { target: 'img', type: 'alt_focus', duration: 5000, hint: 'image-meaning', discovery: 'visual_truth' }
                ]
            },
            level5: {
                name: "Master Discovery",
                description: "You see what others cannot, the deepest truths emerge",
                elements: [
                    { target: 'body', type: 'konami', sequence: '↑↑↓↓←→←→BA', hint: 'matrix-flicker', discovery: 'code_master' },
                    { target: '.transcendental-trigger', type: 'meditation_click', duration: 10000, hint: 'transcendent-aura', discovery: 'awakened_one' },
                    { target: 'title', type: 'title_focus', duration: 7000, hint: 'crown-energy', discovery: 'truth_seeker' }
                ]
            }
        };

        this.philosophicalLevel = 1;
        this.initializeEasterEggs();
    }

    initializeEasterEggs() {
        this.trackVisit();
        this.setupProgressiveDiscovery();
        this.setupHintSystem();
        // this.syncWithAPI(); // Disabled until API is deployed

        // Keep some classic Easter eggs for power users
        this.setupKonamiCode();
    }

    setupKonamiCode() {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === this.konamiSequence[this.konamiIndex]) {
                this.konamiIndex++;
                if (this.konamiIndex === this.konamiSequence.length) {
                    this.activateHackerMode();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    }

    setupHiddenLinks() {
        // Create hidden discovery elements throughout the page
        const hiddenSpots = [
            { element: '.hero-subtitle', text: '🔮' },
            { element: '.section-title', text: '👁️' },
            { element: '.terminal-title', text: '🗝️' },
            { element: '.footer-text', text: '🌟' }
        ];

        hiddenSpots.forEach(spot => {
            const element = document.querySelector(spot.element);
            if (element) {
                const hidden = document.createElement('span');
                hidden.innerHTML = spot.text;
                hidden.className = 'hidden-discovery';
                hidden.style.opacity = '0';
                hidden.style.cursor = 'pointer';
                hidden.style.transition = 'opacity 0.3s ease';
                hidden.addEventListener('click', () => this.triggerSecretReward());
                element.appendChild(hidden);

                // Reveal on hover
                element.addEventListener('mouseenter', () => {
                    hidden.style.opacity = '0.7';
                });
                element.addEventListener('mouseleave', () => {
                    hidden.style.opacity = '0';
                });
            }
        });
    }

    setupSecretInteractions() {
        // T.K. logo special interaction
        const logo = document.querySelector('.logo-text');
        if (logo) {
            logo.addEventListener('click', () => {
                this.secretClicks++;
                if (this.secretClicks === 3) {
                    this.revealTechKing();
                    this.secretClicks = 0;
                }
            });
        }

        // Matrix mode
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'M') {
                this.activateMatrixMode();
            }
        });

        // AI Wisdom Easter Egg - type "AI" three times quickly
        document.addEventListener('keydown', (e) => {
            // Check for A then I sequence
            if (e.keyCode === 65) { // A key
                this.aiWisdomTrigger = [65];
            } else if (e.keyCode === 73 && this.aiWisdomTrigger.length === 1 && this.aiWisdomTrigger[0] === 65) { // I key after A
                this.aiWisdomCount++;
                this.aiWisdomTrigger = [];

                if (this.aiWisdomCount === 3) {
                    this.revealAIWisdom(this.aiWisdomLevel);
                    this.aiWisdomCount = 0;

                    // Progress to next level after first viewing
                    if (this.aiWisdomLevel === 1) {
                        this.hasSeenFirstWisdom = true;
                        this.aiWisdomLevel = 2;
                    } else {
                        // Cycle back to level 1 after level 2
                        this.aiWisdomLevel = this.aiWisdomLevel === 2 ? 1 : 2;
                    }
                }

                // Reset count after 5 seconds if not completed
                setTimeout(() => {
                    if (this.aiWisdomCount < 3) {
                        this.aiWisdomCount = 0;
                    }
                }, 5000);
            } else {
                this.aiWisdomTrigger = [];
            }
        });
    }

    activateHackerMode() {
        // Track easter egg discovery
        if (window.userJourney) {
            window.userJourney.markEasterEggFound('konamiCode');
        }

        const overlay = document.createElement('div');
        overlay.className = 'hacker-mode-overlay';
        overlay.innerHTML = `
            <div class="hacker-terminal">
                <div class="hacker-header">
                    <span class="hacker-title">SYSTEM ACCESSED</span>
                    <button class="close-hacker">&times;</button>
                </div>
                <div class="hacker-content">
                    <div class="hacker-line">&gt; ACCESS GRANTED</div>
                    <div class="hacker-line">&gt; Loading personal data...</div>
                    <div class="hacker-line">&gt; Name: Terrell K. Flautt</div>
                    <div class="hacker-line">&gt; Alias: Tech King</div>
                    <div class="hacker-line">&gt; Origin: Started as website designer and video artist</div>
                    <div class="hacker-line">&gt; Philosophy: The answer to life is to transcend the need for an answer</div>
                    <div class="hacker-line">&gt; Build Time: This site was built in less than a day</div>
                    <div class="hacker-line">&gt; Purpose: Building magical experiences that reward the curious</div>
                    <div class="hacker-line typing">&gt; Remember: You found this because you were looking...</div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('.close-hacker').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
    }

    revealTechKing() {
        // Track easter egg discovery
        if (window.userJourney) {
            window.userJourney.markEasterEggFound('techKingReveal');
        }

        const logo = document.querySelector('.logo-text');
        if (logo) {
            logo.style.transform = 'scale(1.2)';
            logo.style.color = '#00ffff';
            setTimeout(() => {
                logo.innerHTML = 'T.K.';
                const tooltip = document.createElement('div');
                tooltip.innerHTML = 'Tech King';
                tooltip.className = 'tech-king-tooltip';
                logo.style.position = 'relative';
                logo.appendChild(tooltip);

                setTimeout(() => {
                    logo.style.transform = 'scale(1)';
                    logo.style.color = '';
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 3000);
            }, 500);
        }
    }

    revealAIWisdom(level = 1) {
        const wisdomData = this.getWisdomContent(level);

        const overlay = document.createElement('div');
        overlay.className = 'ai-wisdom-overlay';
        overlay.innerHTML = `
            <div class="ai-wisdom-container">
                <div class="ai-wisdom-header">
                    <h2 class="ai-wisdom-title">${wisdomData.title}</h2>
                    <button class="close-ai-wisdom">&times;</button>
                </div>
                <div class="ai-wisdom-content">
                    <div class="wisdom-quote">
                        <div class="quote-mark">"</div>
                        <p class="wisdom-text">
                            ${wisdomData.quote}
                        </p>
                        <div class="quote-mark quote-end">"</div>
                    </div>
                    <div class="wisdom-author">
                        <span>— Terrell K. Flautt, Tech King</span>
                    </div>
                    <div class="wisdom-discovery">
                        <p>🎉 <strong>Secret Discovery:</strong> ${wisdomData.discovery}</p>
                        <p>✨ <em>${wisdomData.insight}</em></p>
                        ${level === 2 ? '<p>🔥 <strong>Advanced Wisdom Unlocked!</strong> You\'ve progressed to the next level of AI enlightenment.</p>' : ''}
                    </div>
                    <div class="wisdom-ascii">
                        <pre>${wisdomData.ascii}</pre>
                    </div>
                    ${level === 2 && !this.hasSeenFirstWisdom ? `
                        <div class="wisdom-hint">
                            <p>💡 <strong>Hint:</strong> Type "AI" three times again to discover more wisdom...</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('.close-ai-wisdom').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        // Auto-close after 15 seconds
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 1s ease';
                setTimeout(() => {
                    if (overlay.parentNode) {
                        document.body.removeChild(overlay);
                    }
                }, 1000);
            }
        }, 15000);

        // Track easter egg discovery
        if (window.userJourney) {
            window.userJourney.markEasterEggFound(level === 1 ? 'aiWisdomLevel1' : 'aiWisdomLevel2');
        }

        console.log(`🤖 AI Wisdom Level ${level} Easter Egg Activated! You discovered the secret by typing "AI" three times.`);
    }

    getWisdomContent(level) {
        if (level === 1) {
            return {
                title: '🤖 AI Wisdom Unlocked 🤖',
                quote: 'Sometimes when you are having trouble with AI, all you need to do is wait for it to get smarter. 3 months from now what you are doing now will look like child\'s play.',
                discovery: 'You typed "AI" three times! This wisdom is for those struggling with artificial intelligence challenges.',
                insight: 'Remember: AI is rapidly evolving. Today\'s limitations are tomorrow\'s foundations.',
                ascii: `
    ┌─────────────────────────────────┐
    │  🤖 AI EVOLUTION TIMELINE 🤖    │
    │                                 │
    │  Today → 3 Months → Future      │
    │    ↓        ↓         ↓        │
    │ Struggle  Growth   Mastery      │
    │                                 │
    │ "Intelligence amplifies with    │
    │  time, patience, and wisdom"    │
    └─────────────────────────────────┘`
            };
        } else {
            return {
                title: '🧠 Advanced AI Wisdom 🧠',
                quote: 'If what you are doing now, doesn\'t look like child\'s play 3 months from now... Do something else.',
                discovery: 'You\'ve unlocked the advanced AI wisdom! This is for those ready to make strategic pivots.',
                insight: 'True wisdom is knowing when to persist and when to pivot. If progress isn\'t exponential, redirect your energy.',
                ascii: `
    ┌─────────────────────────────────┐
    │  🧠 THE PIVOT PRINCIPLE 🧠      │
    │                                 │
    │  Current → Evaluate → Pivot     │
    │     ↓          ↓        ↓      │
    │   Assess    Progress?  Redirect │
    │                                 │
    │ "Strategic pivots separate      │
    │  the wise from the stubborn"    │
    └─────────────────────────────────┘`
            };
        }
    }

    activateMatrixMode() {
        // Track easter egg discovery
        if (window.userJourney) {
            window.userJourney.markEasterEggFound('matrixMode');
        }

        const matrix = document.createElement('div');
        matrix.className = 'matrix-overlay';
        matrix.innerHTML = `
            <canvas id="matrix-canvas"></canvas>
            <div class="matrix-text">
                <h2>WAKE UP, NEO...</h2>
                <p>The matrix has you... but so does great code.</p>
                <button onclick="this.parentElement.parentElement.remove()">Take the Red Pill</button>
            </div>
        `;
        document.body.appendChild(matrix);

        // Add matrix rain effect
        this.createMatrixRain();
    }

    triggerSecretReward() {
        const rewards = [
            "🎯 You found a secret! The curious are always rewarded.",
            "🔑 Hidden wisdom: Every click has purpose, every search has meaning.",
            "✨ Secret unlocked: You see what others miss.",
            "🎪 Bonus discovery: Magic hides in plain sight.",
            "🦋 Easter egg found: Transformation happens to those who seek."
        ];

        const reward = rewards[Math.floor(Math.random() * rewards.length)];

        // Track hidden symbol discovery
        if (window.userJourney) {
            window.userJourney.addHiddenSymbolFound('discovery_symbol_' + Date.now());
        }

        this.showNotification(reward);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.innerHTML = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }

    createMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        const interval = setInterval(draw, 35);
        setTimeout(() => clearInterval(interval), 10000);
    }

    // Progressive Discovery System - Naturally Embedded Easter Eggs
    trackVisit() {
        this.userProgress.visits++;
        const timeSinceLastVisit = this.userProgress.currentSession - this.userProgress.lastVisit;
        const isReturningUser = timeSinceLastVisit > (24 * 60 * 60 * 1000); // 24 hours

        localStorage.setItem('terrellflautt-visits', this.userProgress.visits.toString());
        localStorage.setItem('terrellflautt-lastvisit', this.userProgress.currentSession.toString());

        if (isReturningUser) {
            this.checkProgressAndOfferHints();
        }
    }

    setupProgressiveDiscovery() {
        // Set up all the naturally embedded triggers
        this.setupWordHighlights();
        this.setupPunctuationTriggers();
        this.setupSequenceDetectors();
        this.setupInteractionTrackers();

        // Calculate current level based on discoveries
        this.userProgress.level = this.calculateCurrentLevel();
    }

    setupWordHighlights() {
        // Level 1: Word-based discoveries and fun facts
        this.setupWordTrigger('.hero-title', 'Terrell', 'founder_essence',
            "🏔️ The Foundation",
            "Every great journey begins with knowing who you are. You found the founder's essence."
        );

        this.setupWordTrigger('footer p', '2025', 'time_awareness',
            "⏰ Future Vision",
            "Awareness is the beginning of wisdom."
        );

        // Fun personal facts - easy discoveries embedded naturally
        this.createHiddenFact('2nd grade', 'qbasic_discovery',
            "👾 The Origin Story",
            "I built my first program in 2nd grade using Qbasic and ASCII art."
        );

        this.createHiddenFact('videography', 'education_discovery',
            "🎬 Plot Twist",
            "I did not go to school for programing but for videography."
        );

        this.createHiddenFact('Harvard', 'learning_discovery',
            "🎓 Free Learning",
            "If you want to learn how to code there are free harvard lectures on youtube. Start with javascript / python."
        );

        // Setup the 7-click challenge
        this.setupSevenClickChallenge();

        // Setup the space hold challenge
        this.setupSpaceHoldChallenge();

        // Setup the escape challenge
        this.setupEscapeChallenge();

        // Level 3: Action words
        this.setupWordTrigger('.btn', 'Begin', 'journey_caller',
            "🚀 The Caller",
            "You've recognized the word that changes everything. Every journey begins with a single step."
        );
    }

    setupPunctuationTriggers() {
        // Level 2: Punctuation awareness
        const periods = document.querySelectorAll('.section-title');
        periods.forEach(element => {
            const text = element.textContent;
            if (text.includes('.')) {
                this.setupPunctuationTrigger(element, '.', 'completion_wisdom',
                    "⚪ The Completion",
                    "Periods mark endings, but every ending is a new beginning. You see the cycles."
                );
            }
        });
    }

    setupSequenceDetectors() {
        // Level 3: Project card sequence hover
        const projectCards = document.querySelectorAll('.project-card');
        let hoverSequence = [];

        projectCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                hoverSequence.push(index + 1);
                if (hoverSequence.length > 3) {
                    hoverSequence = hoverSequence.slice(-3);
                }

                if (hoverSequence.join('') === '123') {
                    this.triggerDiscovery('growth_pattern',
                        "📈 The Growth Pattern",
                        "1, 2, 3... You understand that growth follows natural sequences. Patience and progression."
                    );
                }
            });
        });
    }

    setupInteractionTrackers() {
        // Level 2: Long hover for connection
        const contactLink = document.querySelector('a[href="#contact"]');
        if (contactLink) {
            let hoverStart = null;

            contactLink.addEventListener('mouseenter', () => {
                hoverStart = Date.now();
            });

            contactLink.addEventListener('mouseleave', () => {
                if (hoverStart && (Date.now() - hoverStart) > 3000) {
                    this.triggerDiscovery('bridge_builder',
                        "🌉 The Bridge Builder",
                        "You lingered on connection. You understand that relationships are the foundation of everything meaningful."
                    );
                }
                hoverStart = null;
            });
        }

        // Level 4: Character sequence in subtitle
        this.setupCharacterSequence('.hero-subtitle', 'self', 'self_reliance',
            "🏔️ Self Reliance",
            "You found 'self' hidden in plain sight. The only person you need permission from is you."
        );
    }

    setupWordTrigger(selector, word, discoveryId, title, message) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const text = element.textContent;
            const wordIndex = text.toLowerCase().indexOf(word.toLowerCase());

            if (wordIndex !== -1) {
                // Create clickable word span
                const beforeText = text.substring(0, wordIndex);
                const wordText = text.substring(wordIndex, wordIndex + word.length);
                const afterText = text.substring(wordIndex + word.length);

                element.innerHTML = `${beforeText}<span class="easter-word" data-discovery="${discoveryId}">${wordText}</span>${afterText}`;

                const wordSpan = element.querySelector(`[data-discovery="${discoveryId}"]`);
                wordSpan.addEventListener('click', () => {
                    this.triggerDiscovery(discoveryId, title, message);
                });
            }
        });
    }

    setupPunctuationTrigger(element, punctuation, discoveryId, title, message) {
        const text = element.textContent;
        const punctIndex = text.indexOf(punctuation);

        if (punctIndex !== -1) {
            const beforeText = text.substring(0, punctIndex);
            const punctText = punctuation;
            const afterText = text.substring(punctIndex + 1);

            element.innerHTML = `${beforeText}<span class="easter-punct" data-discovery="${discoveryId}">${punctText}</span>${afterText}`;

            const punctSpan = element.querySelector(`[data-discovery="${discoveryId}"]`);
            punctSpan.addEventListener('click', () => {
                this.triggerDiscovery(discoveryId, title, message);
            });
        }
    }

    setupCharacterSequence(selector, sequence, discoveryId, title, message) {
        const element = document.querySelector(selector);
        if (!element) return;

        const text = element.textContent.toLowerCase();
        let sequenceIndex = 0;
        let foundChars = [];

        // Find each character of the sequence in the text
        for (let char of sequence) {
            const charIndex = text.indexOf(char, sequenceIndex);
            if (charIndex !== -1) {
                foundChars.push(charIndex);
                sequenceIndex = charIndex + 1;
            } else {
                return; // Sequence not found
            }
        }

        // Create clickable character spans
        let modifiedText = text;
        let offset = 0;

        foundChars.forEach((charIndex, i) => {
            const actualIndex = charIndex + offset;
            const char = sequence[i];
            const before = modifiedText.substring(0, actualIndex);
            const after = modifiedText.substring(actualIndex + 1);
            const spanElement = `<span class="easter-char" data-sequence="${i}" data-discovery="${discoveryId}">${char}</span>`;

            modifiedText = before + spanElement + after;
            offset += spanElement.length - 1;
        });

        element.innerHTML = modifiedText;

        // Track character clicks
        let clickedSequence = [];
        const charSpans = element.querySelectorAll(`[data-discovery="${discoveryId}"]`);

        charSpans.forEach((span, index) => {
            span.addEventListener('click', () => {
                const sequenceNum = parseInt(span.dataset.sequence);
                clickedSequence.push(sequenceNum);

                if (clickedSequence.length === sequence.length &&
                    clickedSequence.every((val, i) => val === i)) {
                    this.triggerDiscovery(discoveryId, title, message);
                }

                // Reset if wrong sequence
                if (clickedSequence.length >= sequence.length) {
                    clickedSequence = [];
                }
            });
        });
    }

    setupHintSystem() {
        // Progressive hint system based on visits and time spent
        this.hintTimers = {};
        this.activeHints = new Set();

        // Start hint progression based on user behavior
        this.startHintProgression();
        this.trackTimeSpent();
        this.watchForStuckUsers();
    }

    startHintProgression() {
        // Much more patient hint system - hints appear over days/weeks, not minutes
        const daysSinceFirstVisit = this.getDaysSinceFirstVisit();
        const baseHintDelay = Math.max(180000 - (this.userProgress.visits * 30000), 60000); // 3-1 minutes base delay

        // Only start showing hints after 2+ visits AND some time has passed
        if (this.userProgress.visits < 2) return;

        const undiscoveredTriggers = this.getUndiscoveredTriggers();
        const maxHintsPerSession = Math.min(1 + Math.floor(daysSinceFirstVisit / 2), 3); // Max 1-3 hints per session

        // Only show hints for a few triggers per session
        const selectedTriggers = undiscoveredTriggers.slice(0, maxHintsPerSession);

        selectedTriggers.forEach((trigger, index) => {
            // Stagger hints over shorter periods for active users
            const delay = baseHintDelay + (index * 120000); // 2-minute stagger

            this.hintTimers[trigger.discoveryId] = setTimeout(() => {
                // Only show hint if user hasn't discovered it AND hasn't seen too many hints recently
                if (this.shouldShowHint(trigger.discoveryId)) {
                    this.showProgressiveHint(trigger);
                }
            }, delay);
        });
    }

    getDaysSinceFirstVisit() {
        const firstVisit = parseInt(localStorage.getItem('terrellflautt-first-visit') || Date.now());
        if (!localStorage.getItem('terrellflautt-first-visit')) {
            localStorage.setItem('terrellflautt-first-visit', firstVisit.toString());
        }
        return Math.floor((Date.now() - firstVisit) / (24 * 60 * 60 * 1000));
    }

    shouldShowHint(discoveryId) {
        const recentHints = this.userProgress.hints.filter(h =>
            h.discoveryId === discoveryId &&
            (Date.now() - h.timestamp) < (24 * 60 * 60 * 1000) // Within last 24 hours
        );

        const daysSinceFirstVisit = this.getDaysSinceFirstVisit();
        const maxHintsPerDay = Math.min(1 + Math.floor(daysSinceFirstVisit / 7), 2); // 1-2 hints per day max

        return recentHints.length < maxHintsPerDay;
    }

    trackTimeSpent() {
        let sessionStart = Date.now();
        let timeSpent = 0;

        // Track active time (not just page load time)
        let isActive = true;

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                timeSpent += Date.now() - sessionStart;
                isActive = false;
            } else {
                sessionStart = Date.now();
                isActive = true;
                // Accelerate hints when user returns
                this.accelerateHints();
            }
        });

        // Every 3 minutes of active time, very subtly increase hint possibility
        setInterval(() => {
            if (isActive) {
                timeSpent += 180000; // 3 minutes
                this.considerGentleHint(Math.floor(timeSpent / 180000));
            }
        }, 180000);
    }

    watchForStuckUsers() {
        // Only offer guidance to truly long-term visitors who seem genuinely stuck
        const stuckThreshold = 7 * 24 * 60 * 60 * 1000; // 7 days
        const daysSinceFirstVisit = this.getDaysSinceFirstVisit();

        // Only for users who have been visiting for over a week with minimal discoveries
        if (daysSinceFirstVisit >= 7 && this.userProgress.visits >= 8 && this.userProgress.discoveries.length <= 1) {
            setTimeout(() => {
                this.offerVeryGentleGuidance();
            }, 5 * 60 * 1000); // After 5 minutes in current session
        }
    }

    considerGentleHint(timeLevel) {
        // Very conservative hint system - only after extended engagement
        const daysSinceFirstVisit = this.getDaysSinceFirstVisit();

        if (timeLevel >= 2 && daysSinceFirstVisit >= 3) { // After 20+ minutes AND 3+ days
            // Maybe show one very subtle hint
            const undiscovered = this.getUndiscoveredTriggers();
            if (undiscovered.length > 0 && Math.random() < 0.3) { // 30% chance
                const randomTrigger = undiscovered[Math.floor(Math.random() * undiscovered.length)];
                if (this.shouldShowHint(randomTrigger.discoveryId)) {
                    this.showProgressiveHint(randomTrigger);
                }
            }
        }

        if (timeLevel >= 4 && daysSinceFirstVisit >= 7) { // After 40+ minutes AND a week
            // Show breadcrumb only for very patient users
            if (Math.random() < 0.2) { // 20% chance
                this.showPatientUserBreadcrumb();
            }
        }
    }

    showProgressiveHint(trigger) {
        if (this.userProgress.discoveries.some(d => d.id === trigger.discoveryId)) {
            return; // Already discovered
        }

        const hintLevel = this.calculateHintLevel(trigger.discoveryId);
        const element = document.querySelector(trigger.target);

        if (!element) return;

        switch (hintLevel) {
            case 1: // Subtle glow
                this.applySubtleHint(element, trigger);
                break;
            case 2: // Gentle pulse
                this.applyGentleHint(element, trigger);
                break;
            case 3: // Obvious highlight
                this.applyObviousHint(element, trigger);
                break;
            case 4: // Direct guidance
                this.applyDirectHint(element, trigger);
                break;
        }

        // Record hint shown
        this.userProgress.hints.push({
            discoveryId: trigger.discoveryId,
            level: hintLevel,
            timestamp: Date.now()
        });

        localStorage.setItem('terrellflautt-hints', JSON.stringify(this.userProgress.hints));
    }

    calculateHintLevel(discoveryId) {
        const existingHints = this.userProgress.hints.filter(h => h.discoveryId === discoveryId);
        const daysSinceFirstVisit = this.getDaysSinceFirstVisit();

        // Much more conservative hint levels - based on days, not visits
        let baseLevel = 1;
        if (daysSinceFirstVisit >= 14) baseLevel = 2; // 2 weeks for level 2 hints
        if (daysSinceFirstVisit >= 30) baseLevel = 3; // 1 month for level 3 hints
        if (daysSinceFirstVisit >= 60) baseLevel = 4; // 2 months for level 4 hints

        const hintProgression = Math.min(existingHints.length, 2); // Max 2 escalation levels

        return Math.min(baseLevel + hintProgression, 4);
    }

    applySubtleHint(element, trigger) {
        element.style.transition = 'all 3s ease-in-out';
        element.style.filter = 'drop-shadow(0 0 2px rgba(79, 172, 254, 0.3))';

        setTimeout(() => {
            element.style.filter = 'none';
        }, 3000);
    }

    applyGentleHint(element, trigger) {
        element.classList.add('easter-hint-pulse');

        // Remove hint after user interacts or 30 seconds
        const removeHint = () => {
            element.classList.remove('easter-hint-pulse');
        };

        element.addEventListener('click', removeHint, { once: true });
        element.addEventListener('mouseenter', removeHint, { once: true });
        setTimeout(removeHint, 30000);
    }

    applyObviousHint(element, trigger) {
        // More obvious visual cues
        element.classList.add('easter-hint-glow');

        // For word/character triggers, highlight specific parts
        if (trigger.type === 'word') {
            const wordSpan = element.querySelector(`[data-discovery="${trigger.discoveryId}"]`);
            if (wordSpan) {
                wordSpan.classList.add('easter-hint-word');
            }
        }

        // Remove after interaction or 45 seconds
        const removeHint = () => {
            element.classList.remove('easter-hint-glow');
            const wordSpan = element.querySelector(`[data-discovery="${trigger.discoveryId}"]`);
            if (wordSpan) wordSpan.classList.remove('easter-hint-word');
        };

        element.addEventListener('click', removeHint, { once: true });
        setTimeout(removeHint, 45000);
    }

    applyDirectHint(element, trigger) {
        // Show floating tooltip with direct instruction
        const tooltip = document.createElement('div');
        tooltip.className = 'easter-hint-tooltip';
        tooltip.innerHTML = this.getDirectHintMessage(trigger);

        // Position tooltip near element
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.top = (rect.top - 60) + 'px';
        tooltip.style.left = rect.left + 'px';
        tooltip.style.zIndex = '9999';

        document.body.appendChild(tooltip);

        // Animate in
        setTimeout(() => tooltip.classList.add('visible'), 100);

        // Remove after click or 60 seconds
        const removeTooltip = () => {
            tooltip.classList.remove('visible');
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 500);
        };

        element.addEventListener('click', removeTooltip, { once: true });
        tooltip.addEventListener('click', removeTooltip);
        setTimeout(removeTooltip, 60000);
    }

    getDirectHintMessage(trigger) {
        const hintMessages = {
            founder_essence: "💡 Click on the founder's name in the title",
            time_awareness: "💡 The year 2025 in the footer holds significance",
            tech_king_revealed: "💡 The crown logo has secrets - try clicking it 3 times",
            completion_wisdom: "💡 Even periods have meaning - click the dots",
            inner_strength: "💡 Look for the letter 'I' - it represents your inner strength",
            bridge_builder: "💡 Hover over 'Contact' for 3 seconds to build bridges",
            growth_pattern: "💡 Hover over project cards in order: 1, 2, 3",
            journey_caller: "💡 The word 'Begin' calls to action - click it",
            strength_seeker: "💡 Double-click any bold text to seek strength",
            self_reliance: "💡 Find and click the letters s-e-l-f in the subtitle, in order",
            foundation_seeker: "💡 Click in the bottom-right corner of the footer",
            visual_truth: "💡 Focus on any image for 5 seconds to see deeper truth"
        };

        return hintMessages[trigger.discoveryId] || "💡 Something special is hidden here...";
    }

    accelerateHints() {
        // When user returns, very slightly increase hint possibility
        const daysSinceFirstVisit = this.getDaysSinceFirstVisit();

        if (daysSinceFirstVisit >= 7 && this.userProgress.visits >= 5) {
            // Only slightly accelerate for experienced return visitors
            Object.keys(this.hintTimers).forEach(discoveryId => {
                if (this.hintTimers[discoveryId]) {
                    clearTimeout(this.hintTimers[discoveryId]);

                    // Show hint in 5 minutes instead of normal delay (much more patient)
                    this.hintTimers[discoveryId] = setTimeout(() => {
                        const trigger = this.findTriggerByDiscoveryId(discoveryId);
                        if (trigger && this.shouldShowHint(discoveryId)) {
                            this.showProgressiveHint(trigger);
                        }
                    }, 300000); // 5 minutes
                }
            });
        }
    }

    increaseHintIntensity(timeLevel) {
        // Every 2 minutes, make hints more obvious
        if (timeLevel >= 3) { // After 6 minutes
            // Start showing multiple hints simultaneously
            const undiscovered = this.getUndiscoveredTriggers().slice(0, 2);
            undiscovered.forEach(trigger => {
                this.showProgressiveHint(trigger);
            });
        }

        if (timeLevel >= 5) { // After 10 minutes
            // Show breadcrumb trail
            this.showBreadcrumbTrail();
        }
    }

    showBreadcrumbTrail() {
        const undiscovered = this.getUndiscoveredTriggers();
        if (undiscovered.length === 0) return;

        const breadcrumb = document.createElement('div');
        breadcrumb.className = 'easter-breadcrumb';
        breadcrumb.innerHTML = `
            <div class="breadcrumb-content">
                🔍 You've been exploring for a while!
                <span class="breadcrumb-hint">Try looking for hidden words, clicking special elements, or hovering longer...</span>
                <button class="breadcrumb-close">×</button>
            </div>
        `;

        document.body.appendChild(breadcrumb);

        breadcrumb.querySelector('.breadcrumb-close').addEventListener('click', () => {
            breadcrumb.remove();
        });

        // Auto-remove after 30 seconds
        setTimeout(() => {
            if (breadcrumb.parentNode) {
                breadcrumb.remove();
            }
        }, 30000);
    }

    showPatientUserBreadcrumb() {
        const breadcrumb = document.createElement('div');
        breadcrumb.className = 'easter-patient-breadcrumb';
        breadcrumb.innerHTML = `
            <div class="patient-breadcrumb-content">
                🌱 You've been patient in your exploration...
                <span class="patient-breadcrumb-hint">Sometimes the most beautiful discoveries come to those who observe quietly.</span>
                <button class="patient-breadcrumb-close">✨</button>
            </div>
        `;

        document.body.appendChild(breadcrumb);

        breadcrumb.querySelector('.patient-breadcrumb-close').addEventListener('click', () => {
            breadcrumb.remove();
        });

        setTimeout(() => {
            if (breadcrumb.parentNode) {
                breadcrumb.remove();
            }
        }, 45000);
    }

    offerVeryGentleGuidance() {
        const guidance = document.createElement('div');
        guidance.className = 'easter-gentle-guidance';
        guidance.innerHTML = `
            <div class="gentle-guidance-content">
                <h3>🔮 For the Persistent Explorer</h3>
                <p>You've been visiting for a while. This page holds secrets for those who look closely...</p>
                <p style="font-style: italic; color: #a8edea;">Names, dates, words, and symbols often carry deeper meaning.</p>
                <button class="gentle-guidance-close">Continue the Journey</button>
            </div>
        `;

        document.body.appendChild(guidance);

        guidance.querySelector('.gentle-guidance-close').addEventListener('click', () => {
            guidance.remove();
        });

        setTimeout(() => {
            if (guidance.parentNode) {
                guidance.remove();
            }
        }, 60000);
    }

    offerGuidance() {
        if (this.activeHints.has('guidance')) return;
        this.activeHints.add('guidance');

        const guidance = document.createElement('div');
        guidance.className = 'easter-guidance';
        guidance.innerHTML = `
            <div class="guidance-content">
                <h3>🌟 Need a hint?</h3>
                <p>Every element on this page has potential meaning. Try:</p>
                <ul>
                    <li>Clicking on names, years, and special words</li>
                    <li>Looking for patterns in text and punctuation</li>
                    <li>Hovering longer over links and buttons</li>
                    <li>Interacting with sequences (1,2,3...)</li>
                </ul>
                <button class="guidance-close">Continue Exploring</button>
            </div>
        `;

        document.body.appendChild(guidance);

        guidance.querySelector('.guidance-close').addEventListener('click', () => {
            guidance.remove();
            this.activeHints.delete('guidance');
        });

        // Auto-remove after 45 seconds
        setTimeout(() => {
            if (guidance.parentNode) {
                guidance.remove();
                this.activeHints.delete('guidance');
            }
        }, 45000);
    }

    getUndiscoveredTriggers() {
        const allTriggers = [
            // Level 1 - Easy discoveries and fun facts
            { target: '.hero-title', type: 'word', word: 'Terrell', discoveryId: 'founder_essence' },
            { target: 'footer p', type: 'year', word: '2025', discoveryId: 'time_awareness' },
            { target: '.logo', type: 'click', count: 3, discoveryId: 'tech_king_revealed' },
            { target: 'body', type: 'word', word: '2nd', discoveryId: 'qbasic_story' },
            { target: '#about', type: 'hover_repeat', count: 3, discoveryId: 'videography_path' },
            { target: '.skills-section', type: 'triple_click', discoveryId: 'free_learning_wisdom' },

            // Level 2 - Attention required
            { target: '.section-title', type: 'punctuation', char: '.', discoveryId: 'completion_wisdom' },
            { target: 'p', type: 'letter', char: 'I', discoveryId: 'inner_strength' },
            { target: 'a[href="#contact"]', type: 'hover', duration: 3000, discoveryId: 'bridge_builder' },

            // Level 3 - Pattern recognition
            { target: '.project-card', type: 'sequence_hover', pattern: [1,2,3], discoveryId: 'growth_pattern' },
            { target: '.btn', type: 'word', word: 'Begin', discoveryId: 'journey_caller' },
            { target: 'strong', type: 'double_click', discoveryId: 'strength_seeker' },
            { target: 'code', type: 'double_click', discoveryId: 'ascii_appreciation' },

            // Level 4+ - Advanced
            { target: '.hero-subtitle', type: 'character_sequence', sequence: 'self', discoveryId: 'self_reliance' },
            { target: '.footer', type: 'corner_click', discoveryId: 'foundation_seeker' },
            { target: 'img', type: 'long_hover', duration: 5000, discoveryId: 'visual_truth' },
            { target: 'body', type: 'word', word: 'Harvard', discoveryId: 'harvard_wisdom' }
        ];

        return allTriggers.filter(trigger =>
            !this.userProgress.discoveries.some(d => d.id === trigger.discoveryId)
        );
    }

    findTriggerByDiscoveryId(discoveryId) {
        return this.getUndiscoveredTriggers().find(t => t.discoveryId === discoveryId);
    }

    triggerDiscovery(discoveryId, title, message) {
        // Check if already discovered
        if (this.userProgress.discoveries.some(d => d.id === discoveryId)) {
            return;
        }

        // Add to discoveries
        const discovery = {
            id: discoveryId,
            title: title,
            message: message,
            timestamp: Date.now(),
            level: this.userProgress.level
        };

        this.userProgress.discoveries.push(discovery);
        localStorage.setItem('terrellflautt-discoveries', JSON.stringify(this.userProgress.discoveries));

        // Add to magic user system for bulletproof persistence
        if (window.magicUser) {
            window.magicUser.addDiscovery(discoveryId, title, message);
        }

        // Clear any pending hints for this discovery
        if (this.hintTimers[discoveryId]) {
            clearTimeout(this.hintTimers[discoveryId]);
            delete this.hintTimers[discoveryId];
        }

        // Show discovery notification
        this.showDiscoveryNotification(discovery);

        // Check for level progression
        this.checkLevelProgression();

        // Sync with API
        this.syncDiscoveryWithAPI(discovery);
    }

    showDiscoveryNotification(discovery) {
        const notification = document.createElement('div');
        notification.className = 'easter-discovery-notification';
        notification.innerHTML = `
            <div class="discovery-content">
                <div class="discovery-title">${discovery.title}</div>
                <div class="discovery-message">${discovery.message}</div>
                <div class="discovery-progress">Discovery ${this.userProgress.discoveries.length} • Level ${this.userProgress.level}</div>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('visible'), 100);

        // Remove after 6 seconds
        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 6000);
    }

    calculateCurrentLevel() {
        const discoveryCount = this.userProgress.discoveries.length;

        if (discoveryCount >= 8) return 5;
        if (discoveryCount >= 6) return 4;
        if (discoveryCount >= 4) return 3;
        if (discoveryCount >= 2) return 2;
        return 1;
    }

    checkLevelProgression() {
        const newLevel = this.calculateCurrentLevel();
        const oldLevel = this.userProgress.level;

        if (newLevel > oldLevel) {
            this.userProgress.level = newLevel;
            this.showLevelUpNotification(newLevel);

            // Unlock new triggers for the new level
            this.unlockNewTriggers(newLevel);
        }
    }

    showLevelUpNotification(level) {
        const levelNames = {
            1: "First Glimpse",
            2: "Deeper Sight",
            3: "Pattern Recognition",
            4: "Hidden Messages",
            5: "Master Discovery"
        };

        const notification = document.createElement('div');
        notification.className = 'easter-levelup-notification';
        notification.innerHTML = `
            <div class="levelup-content">
                <div class="levelup-title">🎉 LEVEL UP!</div>
                <div class="levelup-level">Level ${level}: ${levelNames[level]}</div>
                <div class="levelup-message">New mysteries have been unlocked...</div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('visible'), 100);

        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 8000);
    }

    unlockNewTriggers(level) {
        // Add new triggers based on level progression
        if (level >= 3) {
            this.setupAdvancedInteractions();
        }
        if (level >= 4) {
            this.setupMasterTriggers();
        }
        if (level >= 5) {
            this.setupTranscendentalTriggers();
        }
    }

    syncWithAPI() {
        // Generate or get user ID
        let userId = localStorage.getItem('terrellflautt-user-id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('terrellflautt-user-id', userId);
        }

        // Send initial journey data to API
        this.syncUserJourney(userId);
    }

    async syncUserJourney(userId) {
        // API disabled until deployed
        console.log('Journey sync disabled for user:', userId);
    }

    async syncDiscoveryWithAPI(discovery) {
        // API disabled until deployed
        console.log('Discovery sync disabled:', discovery);
    }

    setupAdvancedInteractions() {
        // Double-click on strong/bold text
        const strongElements = document.querySelectorAll('strong, b');
        strongElements.forEach(element => {
            let clickCount = 0;
            let clickTimer = null;

            element.addEventListener('click', () => {
                clickCount++;
                if (clickTimer) clearTimeout(clickTimer);

                if (clickCount === 2) {
                    this.triggerDiscovery('strength_seeker',
                        "💪 The Strength Seeker",
                        "You found strength in emphasis. Bold words carry bold truths - just like bold actions create bold lives."
                    );
                    clickCount = 0;
                } else {
                    clickTimer = setTimeout(() => clickCount = 0, 500);
                }
            });
        });

        // Setup punctuation offset discovery
        this.setupPunctuationOffset();

        // Setup misspelling correction discovery
        this.setupMisspellingCorrection();

        // Setup immediate skill-based discoveries
        this.setupImmediateDiscoveries();

        // Add some immediate discoverable elements (work on first visit)
        this.setupFirstVisitDiscoveries();

        // Add warm-up mini-games for exploration training
        this.setupWarmupMiniGames();

        // Create compelling reasons to return
        this.setupReturnIncentives();
    }

    setupPunctuationOffset() {
        // Create misplaced punctuation that corrects itself on next visit
        const visitCount = this.userProgress.visits;

        if (visitCount === 2) {
            // On second visit, show misplaced punctuation
            const paragraph = document.querySelector('p');
            if (paragraph && !localStorage.getItem('punctuation_discovered')) {
                const text = paragraph.textContent;
                if (text.includes('.')) {
                    const dotIndex = text.indexOf('.');
                    const beforeDot = text.substring(0, dotIndex);
                    const afterDot = text.substring(dotIndex + 1);

                    // Move the dot to wrong position
                    const wrongText = beforeDot + afterDot.substring(0, 3) + '.' + afterDot.substring(3);
                    paragraph.innerHTML = `<span class="offset-punctuation">${wrongText}</span>`;

                    // Make it clickable
                    const offsetSpan = paragraph.querySelector('.offset-punctuation');
                    offsetSpan.addEventListener('click', () => {
                        this.triggerDiscovery('punctuation_master',
                            "👁️ The Detail Detective",
                            "You see what others do not! The misplaced punctuation reveals itself to the observant."
                        );
                        localStorage.setItem('punctuation_discovered', 'true');

                        // Fix the punctuation immediately
                        setTimeout(() => {
                            paragraph.textContent = text; // Restore original
                        }, 2000);
                    });
                }
            }
        } else if (visitCount > 2 && localStorage.getItem('punctuation_discovered')) {
            // On subsequent visits, punctuation is already fixed (no action needed)
        }
    }

    setupMisspellingCorrection() {
        const visitCount = this.userProgress.visits;
        const misspellingFixed = localStorage.getItem('misspelling_corrected');

        // Words to intentionally misspell and their corrections
        const misspellings = [
            { wrong: 'expereince', correct: 'experience', target: 'experience' },
            { wrong: 'technolgy', correct: 'technology', target: 'technology' },
            { wrong: 'creatve', correct: 'creative', target: 'creative' },
            { wrong: 'inovation', correct: 'innovation', target: 'innovation' },
            { wrong: 'posibilities', correct: 'possibilities', target: 'possibilities' }
        ];

        if (visitCount >= 2 && !misspellingFixed) {
            // Find a word to misspell on second+ visit
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );

            let textNode;
            while (textNode = walker.nextNode()) {
                const content = textNode.textContent.toLowerCase();
                const parent = textNode.parentElement;

                // Skip if already processed or in script/style tags
                if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' ||
                    parent.classList.contains('misspelling-processed'))) {
                    continue;
                }

                // Find first word that can be misspelled
                for (const spelling of misspellings) {
                    if (content.includes(spelling.target.toLowerCase())) {
                        const originalText = textNode.textContent;
                        const regex = new RegExp(spelling.target, 'gi');
                        const misspelledText = originalText.replace(regex, spelling.wrong);

                        // Create misspelled version with hover correction
                        parent.innerHTML = parent.innerHTML.replace(
                            originalText,
                            `<span class="misspelled-word" data-correct="${spelling.correct}" data-wrong="${spelling.wrong}">${misspelledText}</span>`
                        );

                        const misspelledSpan = parent.querySelector('.misspelled-word');
                        if (misspelledSpan) {
                            // Create tooltip for correct spelling
                            const tooltip = document.createElement('div');
                            tooltip.className = 'spelling-tooltip';
                            tooltip.textContent = spelling.correct;
                            document.body.appendChild(tooltip);

                            misspelledSpan.addEventListener('mouseenter', (e) => {
                                const rect = e.target.getBoundingClientRect();
                                tooltip.style.left = rect.left + 'px';
                                tooltip.style.top = (rect.top - 35) + 'px';
                                tooltip.classList.add('show');

                                // Mark as corrected after hovering
                                setTimeout(() => {
                                    localStorage.setItem('misspelling_corrected', 'true');
                                    localStorage.setItem('corrected_word', spelling.correct);
                                }, 1000);
                            });

                            misspelledSpan.addEventListener('mouseleave', () => {
                                tooltip.classList.remove('show');
                            });

                            parent.classList.add('misspelling-processed');
                        }
                        return; // Only misspell one word per session
                    }
                }
            }
        } else if (visitCount > 2 && misspellingFixed) {
            // On subsequent visits, show the corrected word and reality message
            const correctedWord = localStorage.getItem('corrected_word');
            if (correctedWord && !localStorage.getItem('reality_message_shown')) {
                setTimeout(() => {
                    this.triggerDiscovery('reality_creator',
                        "🌟 The Reality Creator",
                        `You noticed the misspelling of "${correctedWord}" and now it's fixed! You literally create your own reality through observation and intention.`
                    );
                    localStorage.setItem('reality_message_shown', 'true');
                }, 2000);
            }
        }
    }

    setupImmediateDiscoveries() {
        // "tk" sequence discovery (already exists in logo but add more)
        this.createTextSequenceDiscovery('tk', 'tech_king_sequence',
            "👑 Tech King",
            "T.K. - The initials that unlock the kingdom of code."
        );

        // Quick triple-click discoveries
        const skillsSection = document.querySelector('.skills-section, #skills');
        if (skillsSection) {
            let clickCount = 0;
            let resetTimer = null;

            skillsSection.addEventListener('click', () => {
                clickCount++;
                clearTimeout(resetTimer);

                if (clickCount === 3) {
                    this.triggerDiscovery('skill_master',
                        "⚡ The Skill Master",
                        "Triple-click mastery! You understand that true skill comes from deliberate practice and focused attention."
                    );
                    clickCount = 0;
                } else {
                    resetTimer = setTimeout(() => clickCount = 0, 1000);
                }
            });
        }

        // Keyboard combination discoveries
        let keySequence = '';
        document.addEventListener('keydown', (e) => {
            keySequence += e.key.toLowerCase();

            // Keep only last 10 characters
            if (keySequence.length > 10) {
                keySequence = keySequence.slice(-10);
            }

            // Check for "create" sequence
            if (keySequence.includes('create')) {
                this.triggerDiscovery('creator_mindset',
                    "🎨 The Creator",
                    "You typed 'create' - the universe responds to intention. What will you create today?"
                );
                keySequence = '';
            }

            // Check for "code" sequence
            if (keySequence.includes('code')) {
                this.triggerDiscovery('code_whisperer',
                    "💻 The Code Whisperer",
                    "You typed 'code' - the language of digital magic. Every line of code is a spell cast into reality."
                );
                keySequence = '';
            }
        });

        // Reset key sequence after inactivity
        setInterval(() => {
            keySequence = '';
        }, 5000);
    }

    createTextSequenceDiscovery(sequence, discoveryId, title, message) {
        // Find instances of the sequence in text and make them clickable
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let textNode;
        while (textNode = walker.nextNode()) {
            const content = textNode.textContent.toLowerCase();
            const parent = textNode.parentElement;

            if (content.includes(sequence) && parent && !parent.classList.contains('easter-processed')) {
                const index = content.indexOf(sequence);
                const beforeText = textNode.textContent.substring(0, index);
                const matchText = textNode.textContent.substring(index, index + sequence.length);
                const afterText = textNode.textContent.substring(index + sequence.length);

                parent.innerHTML = parent.innerHTML.replace(
                    textNode.textContent,
                    `${beforeText}<span class="text-sequence" data-discovery="${discoveryId}">${matchText}</span>${afterText}`
                );

                const sequenceSpan = parent.querySelector(`[data-discovery="${discoveryId}"]`);
                if (sequenceSpan) {
                    sequenceSpan.addEventListener('click', () => {
                        this.triggerDiscovery(discoveryId, title, message);
                    });
                }

                parent.classList.add('easter-processed');
                break; // Only do first match
            }
        }
    }

    setupMasterTriggers() {
        // Bottom-right corner click
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.addEventListener('click', (e) => {
                const rect = footer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Check if click is in bottom-right corner (within 50px of corner)
                if (x > rect.width - 50 && y > rect.height - 50) {
                    this.triggerDiscovery('foundation_seeker',
                        "🏗️ The Foundation Seeker",
                        "You found the cornerstone. Every great structure needs a solid foundation - including your life."
                    );
                }
            });
        }
    }

    setupTranscendentalTriggers() {
        // Image focus for visual truth
        const images = document.querySelectorAll('img');
        images.forEach(image => {
            let focusStart = null;

            const focusHandler = () => focusStart = Date.now();
            const blurHandler = () => {
                if (focusStart && (Date.now() - focusStart) > 5000) {
                    this.triggerDiscovery('visual_truth',
                        "👁️ The Seer",
                        "You gazed beyond the surface. True sight comes from looking longer, deeper, with intention."
                    );
                }
                focusStart = null;
            };

            // Use both focus events and long hover as alternatives
            image.addEventListener('focus', focusHandler);
            image.addEventListener('blur', blurHandler);

            let hoverStart = null;
            image.addEventListener('mouseenter', () => hoverStart = Date.now());
            image.addEventListener('mouseleave', () => {
                if (hoverStart && (Date.now() - hoverStart) > 5000) {
                    this.triggerDiscovery('visual_truth',
                        "👁️ The Seer",
                        "You gazed beyond the surface. True sight comes from looking longer, deeper, with intention."
                    );
                }
                hoverStart = null;
            });
        });
    }

    createHiddenFact(searchText, discoveryId, title, message) {
        // Find the text on the page and make it clickable
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let textNode;
        while (textNode = walker.nextNode()) {
            const content = textNode.textContent;
            const index = content.toLowerCase().indexOf(searchText.toLowerCase());

            if (index !== -1 && textNode.parentNode.tagName !== 'SCRIPT') {
                const parent = textNode.parentNode;
                const beforeText = content.substring(0, index);
                const matchText = content.substring(index, index + searchText.length);
                const afterText = content.substring(index + searchText.length);

                parent.innerHTML = parent.innerHTML.replace(
                    textNode.textContent,
                    `${beforeText}<span class="easter-fact" data-discovery="${discoveryId}">${matchText}</span>${afterText}`
                );

                const factSpan = parent.querySelector(`[data-discovery="${discoveryId}"]`);
                if (factSpan) {
                    factSpan.addEventListener('click', () => {
                        this.triggerDiscovery(discoveryId, title, message);
                    });
                }
                break; // Only do first match
            }
        }
    }

    setupSevenClickChallenge() {
        // 7 rapid clicks anywhere triggers inner strength
        let clickCount = 0;
        let clickTimer = null;

        document.addEventListener('click', () => {
            clickCount++;
            if (clickTimer) clearTimeout(clickTimer);

            if (clickCount === 7) {
                this.triggerDiscovery('inner_strength',
                    "💪 Inner Strength",
                    "Seven clicks - the number of completion. You've found your inner strength through persistence."
                );
                clickCount = 0;
            } else {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 1000);
            }
        });
    }

    setupSpaceHoldChallenge() {
        // Hold space for 3 seconds to activate "pause and reflect" mode
        let spaceHoldStart = null;
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !spaceHoldStart) {
                spaceHoldStart = Date.now();
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.code === 'Space' && spaceHoldStart) {
                const holdDuration = Date.now() - spaceHoldStart;
                if (holdDuration >= 3000) {
                    this.activateReflectionMode();
                }
                spaceHoldStart = null;
            }
        });
    }

    setupEscapeChallenge() {
        // Double ESC for "escape comfort zone"
        let escCount = 0;
        let escTimer = null;
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                escCount++;
                if (escTimer) clearTimeout(escTimer);

                if (escCount === 2) {
                    this.triggerDiscovery('comfort_zone_escape',
                        "🚪 Comfort Zone Escape",
                        "Two escapes - you understand that breaking free requires deliberate action. Comfort zones are beautiful prisons."
                    );
                    escCount = 0;
                } else {
                    escTimer = setTimeout(() => escCount = 0, 500);
                }
            }
        });
    }

    activatePhilosophicalWisdom(triggerKey) {
        const wisdomMap = {
            selfReliance: this.showSelfRelianceWisdom.bind(this),
            moral: this.showMoralCompassWisdom.bind(this),
            uncertainty: this.showUncertaintyWisdom.bind(this),
            legacy: this.showLegacyWisdom.bind(this),
            comfort: this.showComfortZoneWisdom.bind(this),
            truth: this.showTruthWisdom.bind(this)
        };

        const wisdomFunction = wisdomMap[triggerKey];
        if (wisdomFunction) {
            wisdomFunction();
        }
    }

    showSelfRelianceWisdom() {
        const selfRelianceMessages = [
            {
                title: "🏔️ THE MOUNTAIN WITHIN",
                message: `
                <div style="text-align: left; line-height: 1.8; color: #e8f4fd;">
                    <h3 style="color: #4facfe; margin-bottom: 1rem;">The Only Person You Need Permission From Is You</h3>
                    <p><strong>The Truth:</strong> Every external validation you seek is really you asking yourself if you're worthy. The answer has always been yes.</p>

                    <p><strong>The Practice:</strong> Next time you want to ask "What do you think?" ask yourself first: "What do I think?" Trust that voice. It's wiser than you know.</p>

                    <p><strong>The Paradox:</strong> The moment you stop needing others to believe in you, they will. The moment you stop seeking approval, you become worthy of it.</p>

                    <p><strong>Your Next Move:</strong> Do one thing today that you've been waiting for permission to do. Start with something small. Build the muscle of self-authorization.</p>

                    <p style="color: #a8edea; font-style: italic; margin-top: 1rem;">"The cave you fear to enter holds the treasure you seek." - Joseph Campbell</p>
                </div>
                `
            }
        ];

        this.showPhilosophicalOverlay(selfRelianceMessages[0]);
    }

    showMoralCompassWisdom() {
        const moralMessages = [
            {
                title: "🧭 THE COMPASS THAT NEVER LIES",
                message: `
                <div style="text-align: left; line-height: 1.8; color: #e8f4fd;">
                    <h3 style="color: #4facfe; margin-bottom: 1rem;">Comfort Is The Enemy of Happiness</h3>
                    <p><strong>The Illusion:</strong> We think happiness comes from feeling good. But happiness comes from doing good - from doing what's right even when it's hard.</p>

                    <p><strong>The Test:</strong> When faced with a decision, ask: "What would I do if no one was watching and there were no consequences?" That's your moral compass.</p>

                    <p><strong>The Discipline:</strong> Do the right thing not because it will work out, but because it's who you are. Results are temporary. Character is permanent.</p>

                    <p><strong>The Revolution:</strong> Every time you choose what's right over what's easy, you're not just changing your life - you're changing the world. One choice at a time.</p>

                    <p style="color: #a8edea; font-style: italic; margin-top: 1rem;">"The most successful people are most comfortable with being uncomfortable." - Anonymous</p>
                </div>
                `
            }
        ];

        this.showPhilosophicalOverlay(moralMessages[0]);
    }

    showUncertaintyWisdom() {
        const uncertaintyMessages = [
            {
                title: "🌊 DANCING WITH THE UNKNOWN",
                message: `
                <div style="text-align: left; line-height: 1.8; color: #e8f4fd;">
                    <h3 style="color: #4facfe; margin-bottom: 1rem;">Uncertainty Is Where Possibility Lives</h3>
                    <p><strong>The Reframe:</strong> Uncertainty isn't something to overcome - it's something to dance with. The most successful people don't eliminate uncertainty, they get comfortable with it.</p>

                    <p><strong>The Strategy:</strong> Take calculated risks, not reckless ones. The difference? Research, preparation, and having a plan for when things don't go as planned.</p>

                    <p><strong>The Mindset:</strong> Don't take risks because of what you might gain. Take them because staying where you are would be the biggest risk of all.</p>

                    <p><strong>The Practice:</strong> Every day, do something slightly outside your comfort zone. Not because it feels good, but because growth lives in discomfort.</p>

                    <p style="color: #a8edea; font-style: italic; margin-top: 1rem;">"In the midst of winter, I found there was, within me, an invincible summer." - Albert Camus</p>
                </div>
                `
            }
        ];

        this.showPhilosophicalOverlay(uncertaintyMessages[0]);
    }

    showLegacyWisdom() {
        const legacyMessages = [
            {
                title: "🏛️ BUILDING SOMETHING ETERNAL",
                message: `
                <div style="text-align: left; line-height: 1.8; color: #e8f4fd;">
                    <h3 style="color: #4facfe; margin-bottom: 1rem;">Your Legacy Isn't What You Achieve - It's Who You Become</h3>
                    <p><strong>The Vision:</strong> The greatest builders in history didn't build for themselves. They built for people they'd never meet, for problems they'd never see solved.</p>

                    <p><strong>The Method:</strong> Start with service, not success. Ask not "What can I get?" but "What can I give?" The getting happens naturally when the giving is genuine.</p>

                    <p><strong>The Timeline:</strong> Think in decades, not days. Plant trees whose shade you'll never enjoy. Write code that will outlive you. Love people who may never love you back.</p>

                    <p><strong>The Secret:</strong> The moment you start building something bigger than yourself, you become bigger than yourself. Legacy isn't what you leave behind - it's who you become in the building.</p>

                    <p style="color: #a8edea; font-style: italic; margin-top: 1rem;">"A society grows great when old men plant trees whose shade they know they shall never sit in." - Greek Proverb</p>
                </div>
                `
            }
        ];

        this.showPhilosophicalOverlay(legacyMessages[0]);
    }

    showComfortZoneWisdom() {
        const comfortMessages = [
            {
                title: "⚡ THE COMFORT TRAP",
                message: `
                <div style="text-align: left; line-height: 1.8; color: #e8f4fd;">
                    <h3 style="color: #4facfe; margin-bottom: 1rem;">The Most Dangerous Place Is Your Comfort Zone</h3>
                    <p><strong>The Trap:</strong> Comfort feels like safety, but it's actually slow death. Every day you choose comfort over growth, you're choosing to become smaller.</p>

                    <p><strong>The Truth:</strong> What feels good isn't the same as what's good for you. Comfort is seductive because it promises ease, but it delivers stagnation.</p>

                    <p><strong>The Practice:</strong> Make friends with discomfort. Seek out challenges. Do things that scare you - not recklessly, but purposefully. Growth lives on the other side of fear.</p>

                    <p><strong>The Reward:</strong> Every time you choose growth over comfort, you expand your capacity for life. You become someone who can handle more, give more, be more.</p>

                    <p style="color: #a8edea; font-style: italic; margin-top: 1rem;">"If you are not willing to risk the unusual, you will have to settle for the ordinary." - Jim Rohn</p>
                </div>
                `
            }
        ];

        this.showPhilosophicalOverlay(comfortMessages[0]);
    }

    showTruthWisdom() {
        const truthMessages = [
            {
                title: "🔥 THE FIRE OF TRUTH",
                message: `
                <div style="text-align: left; line-height: 1.8; color: #e8f4fd;">
                    <h3 style="color: #4facfe; margin-bottom: 1rem;">Truth Is The Foundation of Everything That Matters</h3>
                    <p><strong>The Foundation:</strong> Every great life is built on a foundation of truth - truth about who you are, what you want, and what you're willing to do to get it.</p>

                    <p><strong>The Mirror:</strong> Be ruthlessly honest with yourself. Not cruel, but honest. You can't solve problems you won't acknowledge. You can't change patterns you won't see.</p>

                    <p><strong>The Courage:</strong> Truth requires courage because it often reveals that the life you're living isn't the life you want. But only by seeing clearly can you change direction.</p>

                    <p><strong>The Freedom:</strong> When you stop lying to yourself, you stop needing others to lie to you. When you face reality, reality becomes workable. Truth isn't comfortable, but it's powerful.</p>

                    <p style="color: #a8edea; font-style: italic; margin-top: 1rem;">"The truth will set you free, but first it will piss you off." - Gloria Steinem</p>
                </div>
                `
            }
        ];

        this.showPhilosophicalOverlay(truthMessages[0]);
    }

    activateInnerStrengthMode() {
        const strengthMessage = {
            title: "💎 THE UNBREAKABLE YOU",
            message: `
            <div style="text-align: center; line-height: 1.8; color: #e8f4fd;">
                <h3 style="color: #4facfe; margin-bottom: 2rem;">You Are More Resilient Than You Know</h3>

                <div style="text-align: left;">
                    <p>You've survived 100% of your worst days so far. That's not luck - that's strength.</p>

                    <p>Every challenge you've faced has made you more capable of handling the next one. You're not the same person who started this journey.</p>

                    <p><strong>Remember:</strong> You don't need to be perfect. You just need to keep going. Progress, not perfection.</p>

                    <p><strong>Your power:</strong> The ability to choose your response to any situation. That choice is always yours, no matter what happens around you.</p>
                </div>

                <p style="color: #a8edea; font-style: italic; margin-top: 2rem; font-size: 1.2rem;">"You are more resilient than you realize, more capable than you imagine, and more loved than you know."</p>
            </div>
            `
        };

        this.showPhilosophicalOverlay(strengthMessage);
    }

    activateReflectionMode() {
        const reflectionMessage = {
            title: "🧘 THE POWER OF PAUSE",
            message: `
            <div style="text-align: left; line-height: 1.8; color: #e8f4fd;">
                <h3 style="color: #4facfe; margin-bottom: 1rem;">In Stillness, Wisdom Speaks</h3>

                <p>You just demonstrated something profound - the ability to pause. In a world that demands constant action, you chose reflection.</p>

                <p><strong>The Practice:</strong> Before making important decisions, pause. Before reacting to strong emotions, pause. Before judging others or yourself, pause.</p>

                <p><strong>The Questions:</strong> In these moments of pause, ask:
                <br>• What is this situation trying to teach me?
                <br>• How can I respond from my highest self?
                <br>• What would I do if I were acting from love, not fear?</p>

                <p><strong>The Wisdom:</strong> The space between stimulus and response is where your power lives. Use it wisely.</p>

                <p style="color: #a8edea; font-style: italic; margin-top: 1rem;">"Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom." - Viktor Frankl</p>
            </div>
            `
        };

        this.showPhilosophicalOverlay(reflectionMessage);
    }

    activateComfortZoneChallenge() {
        const challengeMessage = {
            title: "🚀 ESCAPE VELOCITY",
            message: `
            <div style="text-align: left; line-height: 1.8; color: #e8f4fd;">
                <h3 style="color: #4facfe; margin-bottom: 1rem;">You Just Tried To Escape - Good Instinct</h3>

                <p>You pressed Escape twice. Your subconscious knows something important: sometimes the best thing to do is get out of where you are.</p>

                <p><strong>The Challenge:</strong> What are you trying to escape from in your real life? What comfort zone has become a prison? What pattern keeps you small?</p>

                <p><strong>The Method:</strong> Don't escape INTO something comfortable. Escape INTO something that scares and excites you. Escape INTO growth, not away from difficulty.</p>

                <p><strong>Your Mission:</strong> This week, identify one comfort zone you've been living in. Make one small move to escape it. Not dramatically, but deliberately.</p>

                <p style="color: #a8edea; font-style: italic; margin-top: 1rem;">"The cave you fear to enter holds the treasure you seek." - Joseph Campbell</p>
            </div>
            `
        };

        this.showPhilosophicalOverlay(challengeMessage);
    }

    showPhilosophicalOverlay(content) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'philosophical-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, rgba(0,0,0,0.95), rgba(26,26,46,0.95));
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 1s ease-out;
        `;

        const container = document.createElement('div');
        container.style.cssText = `
            max-width: 800px;
            width: 90%;
            background: linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(168, 237, 234, 0.1));
            border: 1px solid rgba(79, 172, 254, 0.3);
            border-radius: 20px;
            padding: 3rem;
            text-align: center;
            color: #ffffff;
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 1s ease-out;
            position: relative;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
        `;
        closeBtn.onmouseover = () => closeBtn.style.color = '#ff5252';
        closeBtn.onmouseout = () => closeBtn.style.color = 'rgba(255, 255, 255, 0.7)';

        const title = document.createElement('h2');
        title.innerHTML = content.title;
        title.style.cssText = `
            color: #4facfe;
            font-size: 2rem;
            margin-bottom: 2rem;
            font-weight: 300;
            letter-spacing: 1px;
        `;

        const message = document.createElement('div');
        message.innerHTML = content.message;

        container.appendChild(closeBtn);
        container.appendChild(title);
        container.appendChild(message);
        overlay.appendChild(container);

        closeBtn.onclick = () => {
            overlay.style.animation = 'fadeOut 0.5s ease-in';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 500);
        };

        // Close on overlay click
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                closeBtn.click();
            }
        };

        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeBtn.click();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        document.body.appendChild(overlay);

        // Track philosophical wisdom activation
        if (window.userJourney) {
            window.userJourney.addPhilosophicalWisdomUnlocked(content.title);
        }
    }

    setupWarmupMiniGames() {
        // Fun, easy-to-find mini-games that teach exploration
        console.log('🎮 Setting up exploration training mini-games...');

        // 1. COLOR CLICK GAME - Click elements that match a color
        this.setupColorClickGame();

        // 2. SIMON SAYS - Follow a sequence of element highlights
        this.setupSimonSaysGame();

        // 3. TREASURE HUNT - Find hidden sparkles
        this.setupTreasureHunt();

        // 4. TYPING TRAINER - Type secret words that appear
        this.setupTypingTrainer();

        // 5. HOVER EXPLORER - Hover over elements for rewards
        this.setupHoverExplorer();

        // 6. CLICK RHYTHM GAME - Click in rhythm
        this.setupRhythmGame();

        console.log('✨ 6 mini-games ready for discovery!');
    }

    setupColorClickGame() {
        // Randomly highlight an element in color, user must click it
        const gameElements = document.querySelectorAll('h1, h2, h3, .btn, .nav-item, .project-card');
        let gameActive = false;
        let targetElement = null;
        let gameScore = 0;

        const startColorGame = () => {
            if (gameActive || gameElements.length === 0) return;

            gameActive = true;
            targetElement = gameElements[Math.floor(Math.random() * gameElements.length)];

            // Highlight target with special color
            targetElement.style.transition = 'all 0.3s ease';
            targetElement.style.boxShadow = '0 0 20px #ff6b6b';
            targetElement.style.backgroundColor = 'rgba(255, 107, 107, 0.2)';
            targetElement.style.transform = 'scale(1.05)';

            // Add click listener
            const clickHandler = () => {
                gameScore++;
                targetElement.removeEventListener('click', clickHandler);

                // Success animation
                targetElement.style.boxShadow = '0 0 30px #00ff88';
                targetElement.style.backgroundColor = 'rgba(0, 255, 136, 0.3)';

                setTimeout(() => {
                    targetElement.style.boxShadow = '';
                    targetElement.style.backgroundColor = '';
                    targetElement.style.transform = '';
                }, 1000);

                if (gameScore >= 3) {
                    this.triggerDiscovery('color_master',
                        "🎨 Color Master",
                        `Perfect! You found all ${gameScore} colored targets. Your observation skills are sharp!`
                    );
                    gameActive = false;
                } else {
                    setTimeout(() => {
                        gameActive = false;
                        if (Math.random() < 0.7) startColorGame(); // 70% chance to continue
                    }, 2000);
                }
            };

            targetElement.addEventListener('click', clickHandler);

            // Auto-timeout after 10 seconds
            setTimeout(() => {
                if (gameActive && targetElement) {
                    targetElement.removeEventListener('click', clickHandler);
                    targetElement.style.boxShadow = '';
                    targetElement.style.backgroundColor = '';
                    targetElement.style.transform = '';
                    gameActive = false;
                }
            }, 10000);
        };

        // Start after user has been active for 30 seconds
        setTimeout(() => {
            if (this.userProgress.discoveries.length >= 1) {
                startColorGame();
            }
        }, 30000);
    }

    setupSimonSaysGame() {
        const sequence = [];
        const userSequence = [];
        const gameElements = document.querySelectorAll('.nav-item, .btn, h2, .project-card');
        let gameActive = false;
        let showingSequence = false;

        const playSequence = async () => {
            showingSequence = true;

            for (let i = 0; i < sequence.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 600));

                const element = sequence[i];
                element.style.backgroundColor = '#00ffff';
                element.style.transform = 'scale(1.1)';
                element.style.boxShadow = '0 0 20px #00ffff';

                await new Promise(resolve => setTimeout(resolve, 400));

                element.style.backgroundColor = '';
                element.style.transform = '';
                element.style.boxShadow = '';
            }

            showingSequence = false;
        };

        const addToSequence = () => {
            if (gameElements.length === 0) return;
            const randomElement = gameElements[Math.floor(Math.random() * gameElements.length)];
            sequence.push(randomElement);
        };

        const checkUserInput = (clickedElement) => {
            if (showingSequence || !gameActive) return;

            userSequence.push(clickedElement);

            // Check if current input is correct
            const currentIndex = userSequence.length - 1;
            if (userSequence[currentIndex] !== sequence[currentIndex]) {
                // Wrong! Reset game
                this.showMiniGameMessage('❌ Wrong sequence! Try again...', 'error');
                sequence.length = 0;
                userSequence.length = 0;
                gameActive = false;
                return;
            }

            // Correct input - flash green
            clickedElement.style.backgroundColor = '#00ff88';
            clickedElement.style.transform = 'scale(1.05)';
            setTimeout(() => {
                clickedElement.style.backgroundColor = '';
                clickedElement.style.transform = '';
            }, 200);

            // Check if sequence is complete
            if (userSequence.length === sequence.length) {
                if (sequence.length >= 4) {
                    // Game complete!
                    this.triggerDiscovery('simon_master',
                        "🎵 Simon Says Master",
                        `Incredible memory! You followed a sequence of ${sequence.length} elements perfectly.`
                    );
                    gameActive = false;
                } else {
                    // Add next element to sequence
                    userSequence.length = 0;
                    addToSequence();
                    setTimeout(() => playSequence(), 1000);
                }
            }
        };

        // Add click listeners to all game elements
        gameElements.forEach(element => {
            element.addEventListener('click', () => checkUserInput(element));
        });

        // Start Simon Says after some exploration
        setTimeout(() => {
            if (this.userProgress.discoveries.length >= 2) {
                this.showMiniGameMessage('🎵 Simon Says starting... Watch the pattern!', 'info');
                gameActive = true;
                addToSequence();
                setTimeout(() => playSequence(), 1500);
            }
        }, 45000);
    }

    setupTreasureHunt() {
        // Add hidden sparkle elements that users can find
        const treasureSpots = [
            { selector: 'footer', position: 'bottomRight' },
            { selector: '.hero-section', position: 'topLeft' },
            { selector: '.about-section', position: 'center' },
            { selector: '.skills-section', position: 'topRight' },
            { selector: '.contact-section', position: 'bottomLeft' }
        ];

        let treasuresFound = 0;
        const totalTreasures = 3;

        const createTreasure = (spot) => {
            const container = document.querySelector(spot.selector);
            if (!container) return null;

            const treasure = document.createElement('div');
            treasure.className = 'treasure-sparkle';
            treasure.innerHTML = '✨';
            treasure.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                cursor: pointer;
                z-index: 1000;
                animation: sparkle 2s ease-in-out infinite;
                font-size: 16px;
                opacity: 0.7;
                transition: all 0.3s ease;
            `;

            // Position based on spot.position
            const positions = {
                topLeft: { top: '10px', left: '10px' },
                topRight: { top: '10px', right: '10px' },
                center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
                bottomLeft: { bottom: '10px', left: '10px' },
                bottomRight: { bottom: '10px', right: '10px' }
            };

            Object.assign(treasure.style, positions[spot.position]);

            // Make container relative if needed
            if (getComputedStyle(container).position === 'static') {
                container.style.position = 'relative';
            }

            treasure.addEventListener('click', () => {
                treasuresFound++;
                treasure.style.transform += ' scale(2)';
                treasure.style.opacity = '0';

                setTimeout(() => treasure.remove(), 300);

                if (treasuresFound >= totalTreasures) {
                    this.triggerDiscovery('treasure_hunter',
                        "💎 Treasure Hunter",
                        `Amazing! You found all ${totalTreasures} hidden treasures. You have a keen eye for hidden details!`
                    );
                } else {
                    this.showMiniGameMessage(`✨ Treasure found! ${treasuresFound}/${totalTreasures}`, 'success');
                }
            });

            treasure.addEventListener('mouseenter', () => {
                treasure.style.transform += ' scale(1.3)';
                treasure.style.opacity = '1';
            });

            treasure.addEventListener('mouseleave', () => {
                treasure.style.transform = treasure.style.transform.replace(' scale(1.3)', '');
                treasure.style.opacity = '0.7';
            });

            container.appendChild(treasure);
            return treasure;
        };

        // Add sparkle animation
        const sparkleStyle = document.createElement('style');
        sparkleStyle.textContent = `
            @keyframes sparkle {
                0%, 100% { opacity: 0.7; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(sparkleStyle);

        // Create treasures after user shows interest
        setTimeout(() => {
            if (this.userProgress.discoveries.length >= 1) {
                this.showMiniGameMessage('💎 Hidden treasures have appeared... look for the sparkles! ✨', 'info');

                // Create random treasures
                const shuffled = treasureSpots.sort(() => 0.5 - Math.random());
                for (let i = 0; i < totalTreasures; i++) {
                    setTimeout(() => createTreasure(shuffled[i]), i * 1000);
                }
            }
        }, 60000);
    }

    setupTypingTrainer() {
        const secretWords = ['explore', 'discover', 'mystery', 'hidden', 'secret', 'magic', 'adventure'];
        let currentWord = '';
        let typedChars = '';
        let gameActive = false;

        const showTypingChallenge = () => {
            currentWord = secretWords[Math.floor(Math.random() * secretWords.length)];
            typedChars = '';
            gameActive = true;

            const challengeElement = document.createElement('div');
            challengeElement.className = 'typing-challenge';
            challengeElement.innerHTML = `
                <div class="typing-prompt">
                    <span class="typing-label">💬 Type the word:</span>
                    <span class="typing-word">${currentWord}</span>
                    <div class="typing-progress"></div>
                </div>
            `;
            challengeElement.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 20px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10000;
                font-family: monospace;
                max-width: 300px;
            `;

            document.body.appendChild(challengeElement);

            const updateProgress = () => {
                const progressElement = challengeElement.querySelector('.typing-progress');
                const matchedChars = typedChars.split('').map((char, index) => {
                    const expectedChar = currentWord[index];
                    if (char === expectedChar) {
                        return `<span style="color: #00ff88;">${char}</span>`;
                    } else {
                        return `<span style="color: #ff6b6b;">${char}</span>`;
                    }
                }).join('');

                progressElement.innerHTML = `
                    <div style="margin-top: 10px; font-size: 14px;">
                        ${matchedChars}<span style="opacity: 0.5;">${currentWord.slice(typedChars.length)}</span>
                    </div>
                `;
            };

            // Auto-remove after 10 seconds
            setTimeout(() => {
                if (challengeElement.parentNode) {
                    challengeElement.remove();
                    gameActive = false;
                }
            }, 10000);
        };

        const keyHandler = (e) => {
            if (!gameActive) return;

            const key = e.key.toLowerCase();

            if (key === 'backspace') {
                typedChars = typedChars.slice(0, -1);
            } else if (key.length === 1 && /[a-z]/.test(key)) {
                typedChars += key;
            } else {
                return;
            }

            // Update display
            const challengeElement = document.querySelector('.typing-challenge');
            if (challengeElement) {
                const updateProgress = () => {
                    const progressElement = challengeElement.querySelector('.typing-progress');
                    const matchedChars = typedChars.split('').map((char, index) => {
                        const expectedChar = currentWord[index];
                        if (char === expectedChar) {
                            return `<span style="color: #00ff88;">${char}</span>`;
                        } else {
                            return `<span style="color: #ff6b6b;">${char}</span>`;
                        }
                    }).join('');

                    progressElement.innerHTML = `
                        <div style="margin-top: 10px; font-size: 14px;">
                            ${matchedChars}<span style="opacity: 0.5;">${currentWord.slice(typedChars.length)}</span>
                        </div>
                    `;
                };
                updateProgress();
            }

            // Check if word is complete and correct
            if (typedChars === currentWord) {
                gameActive = false;
                const challengeElement = document.querySelector('.typing-challenge');
                if (challengeElement) {
                    challengeElement.style.backgroundColor = '#00ff88';
                    setTimeout(() => challengeElement.remove(), 1000);
                }

                this.triggerDiscovery('typing_master',
                    "⌨️ Typing Master",
                    `Perfect typing! You spelled "${currentWord}" correctly. Your keyboard skills unlock hidden paths.`
                );

                document.removeEventListener('keydown', keyHandler);
            }
        };

        document.addEventListener('keydown', keyHandler);

        // Start typing challenge after some activity
        setTimeout(() => {
            if (this.userProgress.discoveries.length >= 2) {
                showTypingChallenge();
            }
        }, 75000);
    }

    setupHoverExplorer() {
        // Reward users for hovering over different types of elements
        const hoverTargets = [
            { selector: 'h1, h2, h3', type: 'headings', name: 'titles' },
            { selector: '.btn, button', type: 'buttons', name: 'buttons' },
            { selector: 'img', type: 'images', name: 'images' },
            { selector: 'a', type: 'links', name: 'links' },
            { selector: '.project-card', type: 'cards', name: 'project cards' }
        ];

        const hoverProgress = {};
        let totalHoverTypes = 0;

        hoverTargets.forEach(target => {
            const elements = document.querySelectorAll(target.selector);
            if (elements.length === 0) return;

            hoverProgress[target.type] = false;

            elements.forEach(element => {
                let hoverTimer = null;

                element.addEventListener('mouseenter', () => {
                    hoverTimer = setTimeout(() => {
                        if (!hoverProgress[target.type]) {
                            hoverProgress[target.type] = true;
                            totalHoverTypes++;

                            // Visual feedback
                            element.style.transition = 'all 0.3s ease';
                            element.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.5)';

                            setTimeout(() => {
                                element.style.boxShadow = '';
                            }, 1000);

                            this.showMiniGameMessage(`✨ Discovered ${target.name}! (${totalHoverTypes}/5)`, 'success');

                            if (totalHoverTypes >= 3) {
                                this.triggerDiscovery('hover_explorer',
                                    "🖱️ Hover Explorer",
                                    `Excellent exploration! You hovered over ${totalHoverTypes} different element types. Curiosity leads to discovery!`
                                );
                            }
                        }
                    }, 1500); // 1.5 second hover required
                });

                element.addEventListener('mouseleave', () => {
                    if (hoverTimer) {
                        clearTimeout(hoverTimer);
                        hoverTimer = null;
                    }
                });
            });
        });
    }

    setupRhythmGame() {
        let rhythmPattern = [];
        let userPattern = [];
        let gameActive = false;
        const targetElement = document.querySelector('.hero-title, h1') || document.body;

        const beats = [100, 300, 100, 500]; // Millisecond intervals
        let lastClickTime = 0;

        const startRhythmGame = () => {
            gameActive = true;
            rhythmPattern = [];
            userPattern = [];

            this.showMiniGameMessage('🎵 Rhythm Game: Click in the rhythm! (4 clicks)', 'info');

            // Show rhythm visually
            let beatIndex = 0;
            const showBeat = () => {
                targetElement.style.backgroundColor = 'rgba(255, 107, 107, 0.3)';
                targetElement.style.transform = 'scale(1.02)';

                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                    targetElement.style.transform = '';
                }, 200);

                beatIndex++;
                if (beatIndex < beats.length) {
                    setTimeout(showBeat, beats[beatIndex - 1]);
                }
            };

            setTimeout(showBeat, 500);

            // Start listening for clicks
            setTimeout(() => {
                targetElement.addEventListener('click', rhythmClickHandler);
                lastClickTime = Date.now();
            }, 2000);

            // Auto-timeout
            setTimeout(() => {
                if (gameActive) {
                    targetElement.removeEventListener('click', rhythmClickHandler);
                    gameActive = false;
                }
            }, 10000);
        };

        const rhythmClickHandler = (e) => {
            if (!gameActive) return;

            const currentTime = Date.now();
            const interval = currentTime - lastClickTime;
            userPattern.push(interval);
            lastClickTime = currentTime;

            // Visual feedback
            targetElement.style.backgroundColor = 'rgba(0, 255, 136, 0.3)';
            setTimeout(() => {
                targetElement.style.backgroundColor = '';
            }, 150);

            if (userPattern.length >= 4) {
                // Check rhythm accuracy (within 30% tolerance)
                let accurate = true;
                for (let i = 1; i < userPattern.length; i++) {
                    const expectedInterval = beats[i - 1];
                    const actualInterval = userPattern[i];
                    const tolerance = expectedInterval * 0.4; // 40% tolerance

                    if (Math.abs(actualInterval - expectedInterval) > tolerance) {
                        accurate = false;
                        break;
                    }
                }

                targetElement.removeEventListener('click', rhythmClickHandler);
                gameActive = false;

                if (accurate) {
                    this.triggerDiscovery('rhythm_master',
                        "🎵 Rhythm Master",
                        "Perfect timing! You clicked in rhythm with the beat. Music and mystery go hand in hand."
                    );
                } else {
                    this.showMiniGameMessage('🎵 Close! Try again later...', 'info');
                }
            }
        };

        // Start rhythm game after user is warmed up
        setTimeout(() => {
            if (this.userProgress.discoveries.length >= 3) {
                startRhythmGame();
            }
        }, 90000);
    }

    showMiniGameMessage(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `mini-game-toast ${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#00ff88' : '#667eea'};
            color: ${type === 'success' ? '#000' : '#fff'};
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-size: 14px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    setupFirstVisitDiscoveries() {
        // Immediate discoveries for first-time users - no waiting required!

        // Make the logo immediately discoverable with visual hint
        const logo = document.querySelector('.nav-logo, .logo');
        if (logo) {
            logo.style.cursor = 'pointer';
            logo.style.transition = 'all 0.3s ease';
            logo.style.filter = 'drop-shadow(0 0 3px rgba(0, 255, 255, 0.3))';

            let clickCount = 0;
            let resetTimer = null;

            logo.addEventListener('click', () => {
                clickCount++;
                clearTimeout(resetTimer);

                if (clickCount === 3) {
                    this.triggerDiscovery('logo_triple_click',
                        "👑 The Crown Bearer",
                        "Triple-click mastery! You've discovered the logo secret. T.K. = Tech King. The crown chooses its bearer."
                    );
                    clickCount = 0;
                } else {
                    logo.style.transform = `scale(${1 + clickCount * 0.05})`;
                    resetTimer = setTimeout(() => {
                        clickCount = 0;
                        logo.style.transform = 'scale(1)';
                    }, 1500);
                }
            });
        }

        // Make name immediately clickable in hero section
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title, h1');
            if (heroTitle && heroTitle.textContent.toLowerCase().includes('terrell')) {
                heroTitle.style.cursor = 'pointer';
                heroTitle.addEventListener('click', () => {
                    this.triggerDiscovery('name_discovery',
                        "🎯 Name Recognition",
                        "You clicked the founder's name! Personal connections unlock hidden paths. There's always more beneath the surface."
                    );
                });
            }
        }, 500);

        // Immediate keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+E for immediate discovery
            if (e.ctrlKey && e.shiftKey && e.key === 'E') {
                this.triggerDiscovery('keyboard_explorer',
                    "⌨️ Keyboard Explorer",
                    "Ctrl+Shift+E discovered! You know the secret combinations. Power users always find the hidden shortcuts."
                );
            }

            // Spacebar for surprise (when not in input)
            if (e.key === ' ' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                if (!localStorage.getItem('spacebar_discovered')) {
                    this.triggerDiscovery('spacebar_secret',
                        "🚀 Space Explorer",
                        "Spacebar pressed! You've discovered the space between thoughts. Sometimes the pause reveals more than the action."
                    );
                    localStorage.setItem('spacebar_discovered', 'true');
                }
            }
        });

        // Add subtle pulse animation to discoverable elements
        this.addDiscoveryHints();
    }

    setupReturnIncentives() {
        const visitCount = this.userProgress.visits;

        if (visitCount === 1) {
            // On first visit, plant seeds of curiosity
            setTimeout(() => {
                this.showReturnTeaser();
            }, 45000); // After 45 seconds
        }

        // Update progress tracking for hall of fame
        this.updateProgressStats();
    }

    showReturnTeaser() {
        if (this.userProgress.discoveries.length > 0) {
            const timeSpent = this.getSessionTime();
            const journeyStats = this.calculateJourneyStats();

            const teaser = document.createElement('div');
            teaser.className = 'return-teaser';
            teaser.innerHTML = `
                <div class="teaser-content">
                    <h3>🎭 Your Discovery Journey</h3>
                    <div class="journey-stats">
                        <div class="stat-item">
                            <span class="stat-number">${this.userProgress.discoveries.length}</span>
                            <span class="stat-label">Secret${this.userProgress.discoveries.length === 1 ? '' : 's'} Found</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${timeSpent}</span>
                            <span class="stat-label">Minutes Exploring</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${journeyStats.completionPercent}%</span>
                            <span class="stat-label">Journey Complete</span>
                        </div>
                    </div>
                    <div class="achievement-badge">
                        <span class="badge-icon">${journeyStats.badge}</span>
                        <span class="badge-text">${journeyStats.level}</span>
                    </div>
                    <p class="return-hook">🔮 <strong>Your journey continues...</strong></p>
                    <p>✨ New mysteries unlock with each return visit</p>
                    <p>🎯 Some secrets only reveal themselves over time</p>
                    <button class="teaser-close">Continue Exploring</button>
                </div>
            `;
            document.body.appendChild(teaser);

            teaser.querySelector('.teaser-close').addEventListener('click', () => {
                teaser.remove();
            });

            setTimeout(() => {
                if (teaser.parentNode) teaser.remove();
            }, 20000);
        }
    }

    updateProgressStats() {
        const journeyStats = this.calculateJourneyStats();
        const timeStats = this.calculateTimeStats();

        const progressData = {
            // Core Progress
            visit_number: this.userProgress.visits,
            discoveries_found: this.userProgress.discoveries.length,
            total_time_minutes: Math.floor((Date.now() - this.userProgress.firstVisit) / 60000),
            session_time_minutes: this.getSessionTime(),

            // Journey Milestones
            achievement_level: journeyStats.level,
            completion_percent: journeyStats.completionPercent,
            discovery_rate: journeyStats.discoveryRate,

            // Time Investment
            average_time_per_visit: timeStats.avgTimePerVisit,
            days_since_first_visit: this.getDaysSinceFirstVisit(),
            return_frequency: timeStats.returnFrequency,

            // Exploration Depth
            exploration_style: this.determineExplorationStyle(),
            discovery_streak: this.calculateDiscoveryStreak(),

            // Timestamps for hall of fame
            last_discovery: this.userProgress.discoveries.length > 0 ?
                this.userProgress.discoveries[this.userProgress.discoveries.length - 1].timestamp : null,
            journey_started: this.userProgress.firstVisit
        };

        // Store for hall of fame without spoilers
        localStorage.setItem('terrellflautt_journey_stats', JSON.stringify(progressData));
    }

    calculateJourneyStats() {
        const discoveries = this.userProgress.discoveries.length;
        const estimatedTotal = 25; // Don't reveal exact total to avoid spoilers

        const completionPercent = Math.min(Math.floor((discoveries / estimatedTotal) * 100), 95);

        let level, badge;
        if (discoveries >= 20) { level = "Transcendental Master"; badge = "🏆"; }
        else if (discoveries >= 15) { level = "Enlightened Seeker"; badge = "⭐"; }
        else if (discoveries >= 10) { level = "Mystery Solver"; badge = "🔮"; }
        else if (discoveries >= 5) { level = "Pattern Recognition"; badge = "🎯"; }
        else if (discoveries >= 3) { level = "Observer"; badge = "👁️"; }
        else if (discoveries >= 1) { level = "First Discovery"; badge = "🌟"; }
        else { level = "Explorer"; badge = "🔍"; }

        const discoveryRate = discoveries / Math.max(this.userProgress.visits, 1);

        return { level, badge, completionPercent, discoveryRate };
    }

    calculateTimeStats() {
        const totalTime = Date.now() - this.userProgress.firstVisit;
        const avgTimePerVisit = totalTime / Math.max(this.userProgress.visits, 1) / 60000; // minutes
        const daysSinceFirst = this.getDaysSinceFirstVisit();
        const returnFrequency = daysSinceFirst > 0 ? this.userProgress.visits / daysSinceFirst : 1;

        return {
            avgTimePerVisit: Math.floor(avgTimePerVisit),
            returnFrequency: returnFrequency.toFixed(1)
        };
    }

    determineExplorationStyle() {
        const discoveries = this.userProgress.discoveries.length;
        const visits = this.userProgress.visits;
        const ratio = discoveries / Math.max(visits, 1);

        if (ratio > 3) return "Deep Diver";
        if (ratio > 2) return "Thorough Explorer";
        if (ratio > 1) return "Keen Observer";
        if (ratio > 0.5) return "Methodical Seeker";
        return "Casual Wanderer";
    }

    calculateDiscoveryStreak() {
        // Calculate consecutive discoveries in recent sessions
        if (this.userProgress.discoveries.length === 0) return 0;

        let streak = 0;
        const recentDiscoveries = this.userProgress.discoveries.slice(-5);
        const hourAgo = Date.now() - (60 * 60 * 1000);

        for (let i = recentDiscoveries.length - 1; i >= 0; i--) {
            if (recentDiscoveries[i].timestamp > hourAgo) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }

    getSessionTime() {
        return Math.floor((Date.now() - this.userProgress.currentSession) / 60000);
    }

    addDiscoveryHints() {
        // Add subtle visual cues and comprehensive console guide
        const style = document.createElement('style');
        style.textContent = `
            .nav-logo, .logo {
                animation: gentlePulse 4s ease-in-out infinite;
            }

            .hero-title, h1 {
                transition: text-shadow 0.3s ease;
            }

            .hero-title:hover, h1:hover {
                text-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
                cursor: pointer;
            }

            @keyframes gentlePulse {
                0%, 100% { filter: drop-shadow(0 0 3px rgba(0, 255, 255, 0.3)); }
                50% { filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.5)); }
            }

            .return-teaser {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(15px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.5s ease;
            }

            .teaser-content {
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                border: 2px solid rgba(0, 255, 255, 0.3);
                border-radius: 25px;
                padding: 2.5rem;
                max-width: 600px;
                text-align: center;
                color: white;
                box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
            }

            .teaser-content h3 {
                margin-top: 0;
                color: #00ffff;
                text-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
                font-size: 1.5rem;
            }

            .journey-stats {
                display: flex;
                justify-content: space-around;
                margin: 2rem 0;
                gap: 1rem;
            }

            .stat-item {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .stat-number {
                font-size: 2rem;
                font-weight: bold;
                color: #00ff88;
                text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
            }

            .stat-label {
                font-size: 0.85rem;
                color: #ccc;
                margin-top: 0.25rem;
            }

            .achievement-badge {
                background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
                border-radius: 20px;
                padding: 0.75rem 1.5rem;
                margin: 1.5rem auto;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: bold;
                box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
            }

            .badge-icon {
                font-size: 1.2rem;
            }

            .return-hook {
                color: #ffd700;
                font-size: 1.1rem;
                margin: 1.5rem 0 1rem 0;
            }

            .teaser-close {
                background: linear-gradient(135deg, #00ffff 0%, #ff6b6b 100%);
                border: none;
                color: white;
                padding: 15px 30px;
                border-radius: 30px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 1.5rem;
                transition: transform 0.3s ease;
                font-size: 1rem;
            }

            .teaser-close:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0, 255, 255, 0.4);
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }

            @media (max-width: 768px) {
                .journey-stats {
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .teaser-content {
                    margin: 1rem;
                    padding: 2rem;
                }
            }
        `;
        document.head.appendChild(style);

        // Comprehensive console guide
        setTimeout(() => {
            const journeyStats = this.calculateJourneyStats();
            console.log(`
    🎮 TERRELLFLAUTT.COM DISCOVERY SYSTEM 🎮

    📊 YOUR CURRENT STATS:
    ├─ Visit: ${this.userProgress.visits}
    ├─ Discoveries: ${this.userProgress.discoveries.length}/25+
    ├─ Achievement: ${journeyStats.badge} ${journeyStats.level}
    ├─ Completion: ${journeyStats.completionPercent}%
    └─ Session Time: ${this.getSessionTime()} minutes

    🎯 IMMEDIATE CHALLENGES (Work Right Now):
    ├─ 🖱️  Triple-click the glowing logo
    ├─ 👆  Click "Terrell" in the main title
    ├─ ⌨️  Press Ctrl+Shift+E
    ├─ 🚀  Press Spacebar (outside text fields)
    └─ 💻  Type "create" or "code" anywhere

    🔮 RETURN VISIT REWARDS:
    ├─ 🎭  Elements change between visits
    ├─ 📝  Misspellings correct themselves
    ├─ 📍  Punctuation moves and fixes
    ├─ ⏰  New hints appear after 3 minutes
    └─ 🏆  Hall of Fame tracks your journey

    💡 PRO TIPS:
    ├─ Some secrets need multiple visits to unlock
    ├─ Your progress is tracked without spoilers
    ├─ Each return visit reveals new layers
    └─ The journey itself transforms you

    🌟 The mystery deepens with each discovery...
            `);
        }, 3500);
    }
}

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main system with global reference
    window.transcendentalExperience = new TranscendentalExperience();

    // Initialize easter egg system
    new EasterEggSystem();

    console.log('🎭 Enhanced transcendental experience system ready!');
});