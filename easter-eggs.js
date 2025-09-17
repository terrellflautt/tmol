class TranscendentalExperience {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.personalityProfile = {};
        this.initializeSystem();
    }

    initializeSystem() {
        // Enhanced question system with deeper psychological insights
        this.questions = [
            {
                text: "When you imagine the life you truly want, what drives that vision?",
                type: "motivation",
                options: [
                    { text: "Creating something that outlasts me", trait: "legacy", intensity: 5 },
                    { text: "Understanding the deeper patterns of existence", trait: "wisdom", intensity: 4 },
                    { text: "Connecting with others in meaningful ways", trait: "connection", intensity: 4 },
                    { text: "Pushing the boundaries of what's possible", trait: "innovation", intensity: 5 },
                    { text: "Finding peace in the present moment", trait: "presence", intensity: 3 }
                ]
            },
            {
                text: "What would you do if you knew you could not fail?",
                type: "aspiration",
                options: [
                    { text: "Solve humanity's greatest challenges", trait: "purpose", intensity: 5 },
                    { text: "Create art that moves souls", trait: "creation", intensity: 4 },
                    { text: "Explore the unknown realms of consciousness", trait: "exploration", intensity: 4 },
                    { text: "Build bridges between divided communities", trait: "unity", intensity: 4 },
                    { text: "Live each day with complete authenticity", trait: "authenticity", intensity: 3 }
                ]
            },
            {
                text: "In your darkest moments, what has been your greatest teacher?",
                type: "wisdom",
                options: [
                    { text: "Solitude showed me my own strength", trait: "resilience", intensity: 4 },
                    { text: "Failure taught me humility and growth", trait: "growth", intensity: 5 },
                    { text: "Loss revealed what truly matters", trait: "clarity", intensity: 4 },
                    { text: "Pain opened my heart to others' suffering", trait: "compassion", intensity: 5 },
                    { text: "Confusion led me to deeper questions", trait: "inquiry", intensity: 4 }
                ]
            },
            {
                text: "If you could give your past self one piece of guidance, what would it be?",
                type: "reflection",
                options: [
                    { text: "Trust the process, even when you can't see the path", trait: "faith", intensity: 4 },
                    { text: "Your weird ideas are actually your superpowers", trait: "uniqueness", intensity: 4 },
                    { text: "Love yourself as fiercely as you love others", trait: "self_love", intensity: 5 },
                    { text: "The right people will find you when you're authentically you", trait: "authenticity", intensity: 4 },
                    { text: "Every setback is setting you up for something greater", trait: "optimism", intensity: 4 }
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
                    console.error('❌ Transcendental button not found!');
                }
            }, 100);
        }
    }

    startJourney() {
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

        this.currentQuestion++;

        if (this.currentQuestion < this.questions.length) {
            setTimeout(() => this.showQuestion(), 500);
        } else {
            setTimeout(() => this.generatePersonalizedExperience(), 800);
        }
    }

    generatePersonalizedExperience() {
        // Find dominant trait
        const dominantTrait = Object.keys(this.personalityProfile)
            .reduce((a, b) => this.personalityProfile[a] > this.personalityProfile[b] ? a : b);

        // Get secondary traits for nuanced experiences
        const sortedTraits = Object.entries(this.personalityProfile)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3);

        // Generate multi-layered experience
        const primaryExperience = this.rewardGenerators[dominantTrait] ?
            this.rewardGenerators[dominantTrait](sortedTraits) :
            this.createUniversalExperience(sortedTraits);

        this.showPersonalizedReward(primaryExperience, dominantTrait, sortedTraits);
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
                        <button class="btn-take-action" onclick="this.innerHTML='✨ Journey Integrated ✨'; this.disabled=true;">
                            Begin This Path
                        </button>
                        <button class="btn-retake" onclick="document.querySelector('.transcendental-overlay').remove(); new TranscendentalExperience().startJourney();">
                            Take Journey Again
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
        this.initializeEasterEggs();
    }

    initializeEasterEggs() {
        this.setupKonamiCode();
        this.setupHiddenLinks();
        this.setupSecretInteractions();
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
                    this.revealAIWisdom();
                    this.aiWisdomCount = 0;
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
        const logo = document.querySelector('.logo-text');
        if (logo) {
            logo.style.transform = 'scale(1.2)';
            logo.style.color = '#00ffff';
            setTimeout(() => {
                logo.innerHTML = 'T.K.';
                const tooltip = document.createElement('div');
                tooltip.innerHTML = 'Tech King';
                tooltip.className = 'tech-king-tooltip';
                tooltip.style.cssText = `
                    position: absolute;
                    top: 120%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #000;
                    color: #00ffff;
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    white-space: nowrap;
                    z-index: 1000;
                    animation: fadeInScale 0.5s ease-out;
                `;
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

    revealAIWisdom() {
        const overlay = document.createElement('div');
        overlay.className = 'ai-wisdom-overlay';
        overlay.innerHTML = `
            <div class="ai-wisdom-container">
                <div class="ai-wisdom-header">
                    <h2 class="ai-wisdom-title">🤖 AI Wisdom Unlocked 🤖</h2>
                    <button class="close-ai-wisdom">&times;</button>
                </div>
                <div class="ai-wisdom-content">
                    <div class="wisdom-quote">
                        <div class="quote-mark">"</div>
                        <p class="wisdom-text">
                            Sometimes when you are having trouble with AI, all you need to do is wait for it to get smarter.
                            3 months from now what you are doing now will look like child's play.
                        </p>
                        <div class="quote-mark quote-end">"</div>
                    </div>
                    <div class="wisdom-author">
                        <span>— Terrell K. Flautt, Tech King</span>
                    </div>
                    <div class="wisdom-discovery">
                        <p>🎉 <strong>Secret Discovery:</strong> You typed "AI" three times! This wisdom is for those struggling with artificial intelligence challenges.</p>
                        <p>✨ <em>Remember: AI is rapidly evolving. Today's limitations are tomorrow's foundations.</em></p>
                    </div>
                    <div class="wisdom-ascii">
                        <pre>
    ┌─────────────────────────────────┐
    │  🤖 AI EVOLUTION TIMELINE 🤖    │
    │                                 │
    │  Today → 3 Months → Future      │
    │    ↓        ↓         ↓        │
    │ Struggle  Growth   Mastery      │
    │                                 │
    │ "Intelligence amplifies with    │
    │  time, patience, and wisdom"    │
    └─────────────────────────────────┘
                        </pre>
                    </div>
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

        console.log('🤖 AI Wisdom Easter Egg Activated! You discovered the secret by typing "AI" three times.');
    }

    activateMatrixMode() {
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
}

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize both systems
    new TranscendentalExperience();
    new EasterEggSystem();
});