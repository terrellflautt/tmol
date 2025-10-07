// ✨ GENIE SYSTEM JAVASCRIPT ANIMATIONS ✨

class GenieAnimations {
    constructor() {
        this.isAnimating = false;
        this.particles = [];
        this.genieState = 'normal'; // normal, talking, laughing
        this.currentGenieImage = null;
        this.dailySummonLimit = 3;
        this.userStuckThreshold = 300000; // 5 minutes of inactivity
        this.lastActivityTime = Date.now();
        this.init();
    }

    init() {
        // Enhance existing animations with JavaScript
        this.setupDynamicEffects();
        this.setupParticleSystem();
        this.preloadGenieImages();
        this.setupActivityTracking();
        this.setupDailySummonTracking();
        console.log('🎭 Genie animations initialized');
    }

    // Track daily summons (3 questions per day limit)
    setupDailySummonTracking() {
        const today = new Date().toDateString();
        const storedData = localStorage.getItem('genie_summons');

        if (storedData) {
            const data = JSON.parse(storedData);
            if (data.date === today) {
                this.todaySummons = data.count;
            } else {
                // New day, reset count
                this.todaySummons = 0;
                this.saveDailySummons();
            }
        } else {
            this.todaySummons = 0;
            this.saveDailySummons();
        }
    }

    saveDailySummons() {
        const today = new Date().toDateString();
        localStorage.setItem('genie_summons', JSON.stringify({
            date: today,
            count: this.todaySummons
        }));
    }

    // Check if user can summon genie
    canSummonGenie() {
        return this.todaySummons < this.dailySummonLimit;
    }

    // Use one summon
    useSummon() {
        if (this.canSummonGenie()) {
            this.todaySummons++;
            this.saveDailySummons();
            return true;
        }
        return false;
    }

    // Track user activity to detect when stuck
    setupActivityTracking() {
        // Track various user interactions
        const activities = ['click', 'keypress', 'scroll', 'touchstart'];

        activities.forEach(event => {
            document.addEventListener(event, () => {
                this.lastActivityTime = Date.now();
            });
        });

        // Check periodically if user seems stuck
        setInterval(() => {
            this.checkIfUserStuck();
        }, 60000); // Check every minute
    }

    // Detect if user appears to be stuck
    checkIfUserStuck() {
        const timeSinceActivity = Date.now() - this.lastActivityTime;

        if (timeSinceActivity > this.userStuckThreshold && this.canSummonGenie()) {
            // User seems stuck and can still summon genie
            this.offerGenieHelp();
        }
    }

    // Offer subtle genie help when user is stuck
    offerGenieHelp() {
        // Don't offer if already showing genie
        if (document.querySelector('.genie-appearance')) return;

        const helpOffer = document.createElement('div');
        helpOffer.className = 'genie-help-offer';
        helpOffer.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: #ffd700;
            padding: 15px;
            border-radius: 10px;
            border: 2px solid #667aea;
            font-size: 0.9em;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.5s ease;
            cursor: pointer;
            max-width: 250px;
        `;

        helpOffer.innerHTML = `
            <div style="text-align: center;">
                ✨ Need guidance? ✨<br>
                <small>The genie senses your struggle...</small><br>
                <em>(${this.dailySummonLimit - this.todaySummons} questions left today)</em>
            </div>
        `;

        helpOffer.addEventListener('click', () => {
            helpOffer.remove();
            this.summonGenieForHelp();
        });

        document.body.appendChild(helpOffer);

        // Fade in
        setTimeout(() => {
            helpOffer.style.opacity = '1';
        }, 100);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (helpOffer.parentNode) {
                helpOffer.style.opacity = '0';
                setTimeout(() => helpOffer.remove(), 500);
            }
        }, 10000);
    }

    // Summon genie specifically for help when stuck
    summonGenieForHelp() {
        if (!this.useSummon()) {
            this.showDailyLimitMessage();
            return;
        }

        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            text-align: center;
        `;
        document.body.appendChild(container);

        const stuckMessages = [
            'Path unclear?',
            'Seek patience.',
            'Try again.',
            'Look closer.',
            'Different angle.'
        ];

        const response = stuckMessages[Math.floor(Math.random() * stuckMessages.length)];
        this.showGenieWisdom(container, response);

        // Auto-remove after showing message
        setTimeout(() => {
            container.remove();
        }, 5000);
    }

    // Preload all genie images for smooth transitions
    preloadGenieImages() {
        this.genieImages = {
            normal: new Image(),
            laughing: new Image(),
            lamp: new Image()
        };

        this.genieImages.normal.src = 'assets/images/GENIE.png';
        this.genieImages.laughing.src = 'assets/images/GENIE-LAUGH.jpg';
        this.genieImages.lamp.src = 'assets/images/LAMP.jpg';

        // Ensure images are loaded
        this.genieImages.normal.onload = () => console.log('✨ Normal genie image loaded');
        this.genieImages.laughing.onload = () => console.log('😄 Laughing genie image loaded');
        this.genieImages.lamp.onload = () => console.log('🪔 Lamp image loaded');
    }

    // Create pixel-perfect genie image element
    createGenieImage(state = 'normal', className = '') {
        const img = document.createElement('img');
        img.className = `genie-image ${className} ${state}`;
        img.src = this.genieImages[state].src;
        img.alt = `Genie ${state}`;
        return img;
    }

    // Create interactive lamp image
    createLampImage(className = '') {
        const img = document.createElement('img');
        img.className = `lamp-image ${className}`;
        img.src = this.genieImages.lamp.src;
        img.alt = 'Magic Lamp';
        return img;
    }

    // Transition genie between states with smooth animation
    transitionGenieState(genieElement, newState, duration = 300) {
        if (!genieElement || !this.genieImages[newState]) return;

        return new Promise((resolve) => {
            // Fade out current image
            genieElement.style.opacity = '0';
            genieElement.style.transform = 'scale(0.9)';

            setTimeout(() => {
                // Change image source and class
                genieElement.src = this.genieImages[newState].src;
                genieElement.className = genieElement.className.replace(/\b(normal|talking|laughing)\b/g, newState);

                // Fade in new image
                genieElement.style.opacity = '1';
                genieElement.style.transform = 'scale(1)';

                this.genieState = newState;
                this.currentGenieImage = genieElement;

                resolve();
            }, duration);
        });
    }

    // Dynamic lamp glow that responds to user proximity
    createProximityGlow(lampElement) {
        if (!lampElement) return;

        const glowIntensity = (distance) => {
            const maxDistance = 100;
            const intensity = Math.max(0, (maxDistance - distance) / maxDistance);
            return intensity;
        };

        document.addEventListener('mousemove', (e) => {
            const rect = lampElement.getBoundingClientRect();
            const lampCenter = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };

            const distance = Math.sqrt(
                Math.pow(e.clientX - lampCenter.x, 2) +
                Math.pow(e.clientY - lampCenter.y, 2)
            );

            const intensity = glowIntensity(distance);
            const glowSize = 20 + (intensity * 30);
            const opacity = 0.3 + (intensity * 0.4);

            lampElement.style.filter = `drop-shadow(0 0 ${glowSize}px rgba(255, 215, 0, ${opacity}))`;
            lampElement.style.transform = `scale(${1 + intensity * 0.1})`;
        });
    }

    // Enhanced lamp rubbing with pixel art image
    createInteractiveLamp(container) {
        const lampImg = this.createLampImage('interactive floating');

        // Add rubbing interaction
        let isRubbing = false;
        let rubCount = 0;
        const smokeContainer = document.createElement('div');
        smokeContainer.className = 'rubbing-smoke-container';
        smokeContainer.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
            z-index: 1;
        `;

        const lampContainer = document.createElement('div');
        lampContainer.style.cssText = `
            position: relative;
            display: inline-block;
            margin: 20px;
        `;

        lampContainer.appendChild(lampImg);
        lampContainer.appendChild(smokeContainer);

        // Mouse events for rubbing
        const startRubbing = () => {
            if (isRubbing) return;
            isRubbing = true;
            lampImg.classList.add('rubbing');
            this.startRubbingSmoke(smokeContainer);
        };

        const stopRubbing = () => {
            if (!isRubbing) return;
            isRubbing = false;
            lampImg.classList.remove('rubbing');
            this.stopRubbingSmoke(smokeContainer);

            rubCount++;
            if (rubCount >= 3) {
                this.triggerGenieAppearance(container);
                rubCount = 0;
            }
        };

        // Touch and mouse events
        lampImg.addEventListener('mousedown', startRubbing);
        lampImg.addEventListener('touchstart', startRubbing);
        document.addEventListener('mouseup', stopRubbing);
        document.addEventListener('touchend', stopRubbing);

        container.appendChild(lampContainer);
        return { lampContainer, lampImg };
    }

    // Animated smoke effect during lamp rubbing
    startRubbingSmoke(smokeContainer) {
        this.smokeInterval = setInterval(() => {
            this.createSmokeParticle(smokeContainer);
        }, 150);
    }

    stopRubbingSmoke(smokeContainer) {
        clearInterval(this.smokeInterval);
        setTimeout(() => {
            smokeContainer.innerHTML = '';
        }, 1000);
    }

    // Show daily limit reached message
    showDailyLimitMessage() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                border-radius: 15px;
                padding: 30px;
                text-align: center;
                border: 2px solid #667aea;
                max-width: 400px;
            ">
                <div style="font-size: 3em; margin-bottom: 15px;">🧞‍♂️</div>
                <h3 style="color: #ffd700; margin-bottom: 15px;">Genie Rests</h3>
                <p style="color: #e2e8f0; line-height: 1.5; margin-bottom: 20px;">
                    The ancient spirit has granted you ${this.dailySummonLimit} questions today.
                    Return tomorrow to seek more wisdom.
                </p>
                <button onclick="this.parentElement.parentElement.remove()"
                        style="
                            background: linear-gradient(135deg, #667aea, #764ba2);
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 20px;
                            cursor: pointer;
                        ">
                    Understood
                </button>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Trigger genie appearance after sufficient rubbing
    triggerGenieAppearance(container) {
        // Check if user has summons left
        if (!this.canSummonGenie()) {
            this.showDailyLimitMessage();
            return;
        }

        // Use one summon
        if (!this.useSummon()) {
            this.showDailyLimitMessage();
            return;
        }

        // 🎵 TRIGGER VISUAL MUSIC EXPERIENCE! 🎵
        // Integrate with the amazing visual music system
        this.triggerMysticalMusicExperience();

        // Create dramatic emergence effect
        this.createParticleBurst(container, {
            count: 80,
            colors: ['#667aea', '#ffd700', '#9f7aea', '#ff6b6b'],
            duration: 3000,
            speed: 8
        });

        // Show genie with typewriter effect and summon count
        setTimeout(() => {
            const remaining = this.dailySummonLimit - this.todaySummons;
            const message = remaining > 0 ?
                `Awakened. ${remaining} questions remain.` :
                "Awakened. Final question.";

            this.showGenieWithMessage(container, message);
        }, 1500);
    }

    // 🎵 Integrate with Visual Music Experience System 🎵
    triggerMysticalMusicExperience() {
        // Check if the visual music system exists (created by other Claude)
        if (typeof window.triggerVisualMusicExperience === 'function') {
            // Trigger the floating music player with mystical/transcendental music
            window.triggerVisualMusicExperience({
                type: 'genie_summoning',
                intensity: 'mystical',
                visualStyle: 'cosmic_particles', // Use cosmic particles for genie
                musicType: 'transcendental',
                autoplay: false, // Let user choose to play
                message: '🧞‍♂️ The genie awakens with mystical energies...'
            });
        } else if (typeof window.createHoveringMusicPlayer === 'function') {
            // Fallback to hovering music player
            window.createHoveringMusicPlayer({
                achievement: 'Genie Summoned',
                musicUrl: 'https://www.youtube.com/watch?v=t9-CS2v8wcc', // Mystical music
                visualType: 'cosmic'
            });
        } else {
            console.log('🎵 Visual music system not available, using audio-only effects');
            this.playMysticalSoundEffect();
        }
    }

    // Audio-only mystical sound effect (fallback)
    playMysticalSoundEffect() {
        try {
            // Create subtle mystical audio context
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Mystical frequency (528 Hz - "Love frequency")
            oscillator.frequency.setValueAtTime(528, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(432, audioContext.currentTime + 2);

            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.5);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 2);
        } catch (error) {
            console.log('🔇 Audio context not available');
        }
    }

    // Show genie with pixel art and message
    showGenieWithMessage(container, message, isWisdom = false) {
        const genieContainer = document.createElement('div');
        genieContainer.className = 'genie-appearance';
        genieContainer.style.cssText = `
            text-align: center;
            margin: 30px 0;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.8s ease;
        `;

        // Choose genie state based on message type
        const state = isWisdom ? 'normal' : 'laughing';
        const genieImg = this.createGenieImage(state, 'large floating');

        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            color: #ffd700;
            font-size: 1.3em;
            margin-top: 20px;
            font-style: italic;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        `;

        genieContainer.appendChild(genieImg);
        genieContainer.appendChild(messageDiv);
        container.appendChild(genieContainer);

        // Animate appearance
        setTimeout(() => {
            genieContainer.style.opacity = '1';
            genieContainer.style.transform = 'scale(1)';
        }, 100);

        // Add floating sparkles
        setTimeout(() => {
            this.createFloatingSparkles(genieImg);
        }, 800);

        // Show message with typewriter effect
        setTimeout(() => {
            this.typewriterEffect(messageDiv, [message], 80);
        }, 1200);

        this.currentGenieImage = genieImg;
        return { genieContainer, genieImg, messageDiv };
    }

    // Create brief, vague genie responses with contextual hints
    getGenieResponse(questionType = 'general', userProgress = null) {
        const baseResponses = {
            general: ['Perhaps.', 'Indeed.', 'Seek deeper.', 'Hmm.', 'Time reveals all.'],
            wisdom: ['Know yourself.', 'Look within.', 'Truth lies hidden.', 'Journey awaits.'],
            future: ['Unclear.', 'Many paths.', 'Soon.', 'Patience.', 'Stars know.'],
            help: ['You have power.', 'Trust instincts.', 'Answer within.', 'Keep searching.'],
            stuck: ['Path unclear?', 'Seek patience.', 'Try again.', 'Look closer.', 'Different angle.']
        };

        // Contextual hints based on progress
        const contextualHints = {
            'aziza_riddle': ['Hidden names.', 'Who am I?', 'Look deeper.'],
            'easter_eggs': ['Click around.', 'Explore more.', 'Hidden secrets.'],
            'discoveries': ['More to find.', 'Keep exploring.', 'Secrets await.'],
            'voting_progress': ['Choose wisely.', 'Voice matters.', 'Direction unclear.'],
            'transcendental': ['Beyond sight.', 'Higher plane.', 'Consciousness shifts.']
        };

        // Check if we can provide a contextual hint
        if (userProgress && this.shouldGiveHint(userProgress)) {
            for (const [key, hints] of Object.entries(contextualHints)) {
                if (this.isUserStuckOn(key, userProgress)) {
                    return hints[Math.floor(Math.random() * hints.length)];
                }
            }
        }

        const responseSet = baseResponses[questionType] || baseResponses.general;
        return responseSet[Math.floor(Math.random() * responseSet.length)];
    }

    // Determine if user needs a hint based on their progress
    shouldGiveHint(userProgress) {
        // Only give hints if user seems genuinely stuck
        return Math.random() < 0.6; // 60% chance of contextual hint
    }

    // Check if user appears stuck on specific elements
    isUserStuckOn(element, userProgress) {
        const now = Date.now();
        const timeSinceActivity = now - this.lastActivityTime;

        switch (element) {
            case 'aziza_riddle':
                return !localStorage.getItem('aziza_riddle_solved_undefined') && timeSinceActivity > 120000;
            case 'easter_eggs':
                return userProgress && userProgress.discoveries && userProgress.discoveries.length < 3;
            case 'voting_progress':
                return document.querySelector('.voting-system') && timeSinceActivity > 180000;
            default:
                return false;
        }
    }

    // Integrate with multiple free AI APIs with fallback chain
    async getAIGenieResponse(question, userProgress = null) {
        const systemPrompt = `You are the mystical genie from Aladdin, like Robin Williams' character - wise, ancient, and magical, but you speak VERY briefly. Your responses must be 1-3 words maximum. Be cryptic, mysterious, and helpful but never give direct answers. You have cosmic wisdom but express it in the briefest way possible. Examples: "Perhaps.", "Seek deeper.", "Hidden truths.", "Time reveals.", "Look within.", "Indeed.", "Hmm.", "Patience.". NEVER break character. NEVER give long responses. NEVER be direct.`;

        // Try multiple APIs in order
        const apis = [
            () => this.tryGroqAPI(question, systemPrompt),
            () => this.tryHuggingFaceAPI(question, systemPrompt),
            () => this.tryOllamaAPI(question, systemPrompt),
            () => this.tryCohere(question, systemPrompt)
        ];

        for (const apiCall of apis) {
            try {
                const response = await apiCall();
                // Validate character consistency
                if (response && this.validateGenieResponse(response)) {
                    return response;
                }
            } catch (error) {
                console.log('🧞 API failed, trying next...');
                continue;
            }
        }

        // Final fallback to local responses
        console.log('🧞 All APIs unavailable, using mystical fallback');
        return this.getGenieResponse(this.categorizeQuestion(question), userProgress);
    }

    // Validate that AI response stays in character
    validateGenieResponse(response) {
        const cleaned = response.toLowerCase().trim();

        // Length check - must be very brief
        if (cleaned.length > 25) {
            console.log('🧞 Response too long, using fallback');
            return false;
        }

        // Character-breaking phrases to avoid
        const forbiddenPhrases = [
            'i am an ai', 'as an ai', 'i cannot', 'i am not',
            'according to', 'i think', 'in my opinion',
            'i would suggest', 'you should', 'i recommend',
            'let me explain', 'to be honest', 'actually'
        ];

        for (const phrase of forbiddenPhrases) {
            if (cleaned.includes(phrase)) {
                console.log('🧞 Response breaks character, using fallback');
                return false;
            }
        }

        // Acceptable mystical words/phrases
        const mysticalWords = [
            'perhaps', 'indeed', 'hmm', 'seek', 'hidden', 'truth',
            'time', 'reveals', 'within', 'deeper', 'patience',
            'journey', 'path', 'unclear', 'stars', 'know',
            'power', 'trust', 'instinct', 'closer', 'angle'
        ];

        // Check if response contains mystical language or is very brief
        const isMystical = mysticalWords.some(word => cleaned.includes(word));
        const isVeryBrief = cleaned.length <= 10;

        return isMystical || isVeryBrief;
    }

    // Groq API (fastest, free tier)
    async tryGroqAPI(question, systemPrompt) {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem('groq_api_key') || ''),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: question }
                ],
                max_tokens: 10,
                temperature: 0.9
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data.choices[0]?.message?.content?.trim();
        }
        throw new Error('Groq failed');
    }

    // Hugging Face Inference API (free)
    async tryHuggingFaceAPI(question, systemPrompt) {
        const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem('hf_api_key') || ''),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: `${systemPrompt}\nUser: ${question}\nGenie:`,
                parameters: {
                    max_length: 15,
                    temperature: 0.9,
                    return_full_text: false
                }
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data[0]?.generated_text?.trim();
        }
        throw new Error('HuggingFace failed');
    }

    // Local Ollama instance (if user has it running)
    async tryOllamaAPI(question, systemPrompt) {
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama2',
                prompt: `${systemPrompt}\n\nQuestion: ${question}\nResponse:`,
                stream: false,
                options: {
                    num_predict: 5,
                    temperature: 0.9
                }
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data.response?.trim();
        }
        throw new Error('Ollama failed');
    }

    // Cohere API (has free tier)
    async tryCohere(question, systemPrompt) {
        const response = await fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem('cohere_api_key') || ''),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'command-light',
                prompt: `${systemPrompt}\n\nQuestion: ${question}\nResponse:`,
                max_tokens: 10,
                temperature: 0.9
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data.generations[0]?.text?.trim();
        }
        throw new Error('Cohere failed');
    }

    // Get API key (implement secure storage in production)
    getGroqApiKey() {
        // This should be stored securely - for demo purposes only
        return localStorage.getItem('groq_api_key') || 'your-groq-api-key-here';
    }

    // Show genie giving wisdom (normal state) with REAL AI integration
    async showGenieWisdom(container, question = '') {
        // Check if user can ask questions
        const canAsk = await this.checkGenieStatus();
        if (!canAsk.canAsk) {
            this.showDailyLimitMessage();
            return;
        }

        // Show thinking state first
        const thinkingGenie = this.showGenieWithMessage(container, '...', true);

        try {
            // Get REAL AI response from backend
            const response = await this.askRealGenieAI(question);

            // Update with actual response
            setTimeout(() => {
                thinkingGenie.messageDiv.innerHTML = '';
                this.typewriterEffect(thinkingGenie.messageDiv, [response.response], 80);

                // Switch to laughing state when talking
                setTimeout(() => {
                    this.transitionGenieState(thinkingGenie.genieImg, 'laughing', 200);
                }, 500);

                // Show insights if available
                if (response.insights) {
                    this.showPersonalizedInsights(container, response.insights);
                }
            }, 1000);

        } catch (error) {
            // Fallback to local response
            const fallbackResponse = this.getGenieResponse('general');
            thinkingGenie.messageDiv.innerHTML = '';
            this.typewriterEffect(thinkingGenie.messageDiv, [fallbackResponse], 80);
        }

        return thinkingGenie;
    }

    // Connect to REAL AI backend API
    async askRealGenieAI(question) {
        const userId = this.getUserId();

        const response = await fetch('/api/genie/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                question: question,
                sessionId: this.getSessionId()
            })
        });

        if (!response.ok) {
            throw new Error('Genie API failed');
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Genie unavailable');
        }

        return data;
    }

    // Check genie status and remaining questions
    async checkGenieStatus() {
        try {
            const userId = this.getUserId();
            const response = await fetch(`/api/genie/status/${userId}`);
            const data = await response.json();

            if (data.success) {
                return {
                    canAsk: data.canAsk,
                    remaining: data.remainingQuestions,
                    limit: data.dailyLimit
                };
            }
        } catch (error) {
            console.log('Status check failed, allowing local mode');
        }

        // Fallback to local limits
        return { canAsk: this.canSummonGenie(), remaining: this.dailySummonLimit - this.todaySummons };
    }

    // Show personalized insights from AI
    showPersonalizedInsights(container, insights) {
        if (!insights || insights.length === 0) return;

        const insightsDiv = document.createElement('div');
        insightsDiv.className = 'genie-insights';
        insightsDiv.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            background: rgba(102, 122, 234, 0.1);
            border-radius: 10px;
            border-left: 3px solid #667aea;
            font-size: 0.9em;
            color: #a0aec0;
            font-style: italic;
        `;

        const insightText = this.formatInsights(insights);
        insightsDiv.innerHTML = `<small>✨ The genie senses: ${insightText}</small>`;

        container.appendChild(insightsDiv);

        // Fade in effect
        setTimeout(() => {
            insightsDiv.style.opacity = '0';
            insightsDiv.style.transform = 'translateY(10px)';
            insightsDiv.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                insightsDiv.style.opacity = '1';
                insightsDiv.style.transform = 'translateY(0)';
            }, 100);
        }, 2000);
    }

    // Format insights for display
    formatInsights(insights) {
        const messages = {
            'seeker_new': 'A new seeker begins their journey',
            'seeker_advanced': 'An experienced explorer of mysteries',
            'aziza_stuck': 'Confusion around ancient riddles',
            'civic_engaged': 'A voice that participates in the collective',
            'discovery_master': 'One who uncovers hidden secrets'
        };

        return insights.map(insight => messages[insight] || 'Unknown paths').join(', ');
    }

    // Get or create user ID
    getUserId() {
        let userId = localStorage.getItem('genie_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('genie_user_id', userId);
        }
        return userId;
    }

    // Get session ID
    getSessionId() {
        let sessionId = sessionStorage.getItem('genie_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('genie_session_id', sessionId);
        }
        return sessionId;
    }

    // Show genie talking/responding (laughing state)
    showGenieTalking(container, message) {
        return this.showGenieWithMessage(container, message, false);
    }

    // Categorize question for appropriate response
    categorizeQuestion(question) {
        const q = question.toLowerCase();
        if (q.includes('future') || q.includes('will') || q.includes('when')) return 'future';
        if (q.includes('wise') || q.includes('know') || q.includes('truth')) return 'wisdom';
        if (q.includes('help') || q.includes('how') || q.includes('should')) return 'help';
        return 'general';
    }

    createSmokeParticle(container) {
        const smoke = document.createElement('div');
        smoke.textContent = '💨';
        smoke.style.cssText = `
            position: absolute;
            font-size: ${0.8 + Math.random() * 0.4}em;
            opacity: 0.7;
            pointer-events: none;
            left: ${-10 + Math.random() * 20}px;
        `;

        container.appendChild(smoke);

        // Animate smoke particle
        let opacity = 0.7;
        let yPos = 0;
        let xDrift = (Math.random() - 0.5) * 20;

        const animateSmoke = () => {
            yPos -= 2;
            xDrift += (Math.random() - 0.5) * 2;
            opacity -= 0.02;

            smoke.style.transform = `translateY(${yPos}px) translateX(${xDrift}px)`;
            smoke.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animateSmoke);
            } else {
                smoke.remove();
            }
        };

        requestAnimationFrame(animateSmoke);
    }

    // Dramatic genie emergence with particles
    createGenieEmergence(container) {
        return new Promise((resolve) => {
            // Create particle burst
            this.createParticleBurst(container, {
                count: 50,
                colors: ['#667aea', '#ffd700', '#9f7aea'],
                duration: 3000
            });

            // Animated text appearance
            this.typewriterEffect(container, [
                "The ancient spirit stirs...",
                "Mystical energy fills the air...",
                "The genie awakens!"
            ], 1000).then(resolve);
        });
    }

    // Typewriter effect for dramatic text
    typewriterEffect(container, messages, speed = 100) {
        return new Promise((resolve) => {
            const textElement = document.createElement('div');
            textElement.style.cssText = `
                color: #ffd700;
                font-size: 1.2em;
                text-align: center;
                margin: 20px 0;
                min-height: 1.5em;
                font-family: monospace;
            `;
            container.appendChild(textElement);

            let messageIndex = 0;
            let charIndex = 0;

            const typeNextChar = () => {
                if (messageIndex < messages.length) {
                    const currentMessage = messages[messageIndex];

                    if (charIndex < currentMessage.length) {
                        textElement.textContent += currentMessage[charIndex];
                        charIndex++;
                        setTimeout(typeNextChar, speed);
                    } else {
                        // Message complete, pause then move to next
                        setTimeout(() => {
                            messageIndex++;
                            charIndex = 0;
                            textElement.textContent = '';

                            if (messageIndex < messages.length) {
                                typeNextChar();
                            } else {
                                // All messages complete
                                setTimeout(() => {
                                    textElement.remove();
                                    resolve();
                                }, 1000);
                            }
                        }, 1500);
                    }
                }
            };

            typeNextChar();
        });
    }

    // Particle system for magical effects
    setupParticleSystem() {
        this.particleCanvas = document.createElement('canvas');
        this.particleCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        this.particleCtx = this.particleCanvas.getContext('2d');

        // Only add to body when needed
        this.particleSystemActive = false;
    }

    activateParticleSystem() {
        if (!this.particleSystemActive) {
            document.body.appendChild(this.particleCanvas);
            this.resizeParticleCanvas();
            this.particleCanvas.style.opacity = '1';
            this.particleSystemActive = true;
            this.animateParticles();
        }
    }

    deactivateParticleSystem() {
        if (this.particleSystemActive) {
            this.particleCanvas.style.opacity = '0';
            setTimeout(() => {
                if (this.particleCanvas.parentNode) {
                    this.particleCanvas.parentNode.removeChild(this.particleCanvas);
                }
                this.particleSystemActive = false;
                this.particles = [];
            }, 500);
        }
    }

    resizeParticleCanvas() {
        this.particleCanvas.width = window.innerWidth;
        this.particleCanvas.height = window.innerHeight;
    }

    createParticleBurst(targetElement, options = {}) {
        const defaults = {
            count: 30,
            colors: ['#ffd700', '#667aea'],
            duration: 2000,
            speed: 5
        };

        const config = { ...defaults, ...options };

        if (!this.particleSystemActive) {
            this.activateParticleSystem();
        }

        const rect = targetElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < config.count; i++) {
            const angle = (Math.PI * 2 * i) / config.count;
            const speed = config.speed * (0.5 + Math.random() * 0.5);

            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: config.colors[Math.floor(Math.random() * config.colors.length)],
                size: 2 + Math.random() * 4,
                life: config.duration,
                maxLife: config.duration,
                decay: 0.98
            });
        }
    }

    animateParticles() {
        if (!this.particleSystemActive) return;

        this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);

        this.particles = this.particles.filter(particle => {
            // Update particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= particle.decay;
            particle.vy *= particle.decay;
            particle.life -= 16; // Assuming 60fps

            // Draw particle
            const alpha = particle.life / particle.maxLife;
            this.particleCtx.save();
            this.particleCtx.globalAlpha = alpha;
            this.particleCtx.fillStyle = particle.color;
            this.particleCtx.beginPath();
            this.particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.particleCtx.fill();
            this.particleCtx.restore();

            return particle.life > 0;
        });

        // Continue animation if particles exist
        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animateParticles());
        } else if (this.particleSystemActive) {
            // Auto-deactivate when no particles remain
            setTimeout(() => {
                if (this.particles.length === 0) {
                    this.deactivateParticleSystem();
                }
            }, 1000);
        }
    }

    // Floating sparkles around genie
    createFloatingSparkles(container) {
        const sparkleCount = 8;
        const sparkles = [];

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = ['✧', '✦', '⋆', '✨'][Math.floor(Math.random() * 4)];
            sparkle.style.cssText = `
                position: absolute;
                color: #ffd700;
                font-size: ${0.8 + Math.random() * 0.6}em;
                pointer-events: none;
                opacity: 0.7;
            `;

            container.appendChild(sparkle);
            sparkles.push({
                element: sparkle,
                angle: (Math.PI * 2 * i) / sparkleCount,
                radius: 80 + Math.random() * 40,
                speed: 0.02 + Math.random() * 0.01,
                bobOffset: Math.random() * Math.PI * 2
            });
        }

        let animationId;
        const animateSparkles = (time) => {
            sparkles.forEach((sparkle, index) => {
                sparkle.angle += sparkle.speed;
                const x = Math.cos(sparkle.angle) * sparkle.radius;
                const y = Math.sin(sparkle.angle) * sparkle.radius + Math.sin(time * 0.003 + sparkle.bobOffset) * 10;

                sparkle.element.style.transform = `translate(${x}px, ${y}px)`;
                sparkle.element.style.opacity = 0.5 + Math.sin(time * 0.005 + index) * 0.3;
            });

            animationId = requestAnimationFrame(animateSparkles);
        };

        animationId = requestAnimationFrame(animateSparkles);

        // Return cleanup function
        return () => {
            cancelAnimationFrame(animationId);
            sparkles.forEach(sparkle => sparkle.element.remove());
        };
    }

    // Genie dialogue text animation
    animateGenieText(textElement, text) {
        textElement.style.opacity = '0';
        textElement.style.transform = 'translateY(20px)';

        // Create text reveal effect
        const words = text.split(' ');
        textElement.innerHTML = words.map(word => `<span style="opacity: 0; transform: translateY(10px); display: inline-block;">${word}</span>`).join(' ');

        const wordElements = textElement.querySelectorAll('span');

        // Fade in container
        setTimeout(() => {
            textElement.style.opacity = '1';
            textElement.style.transform = 'translateY(0)';
        }, 100);

        // Animate words individually
        wordElements.forEach((word, index) => {
            setTimeout(() => {
                word.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, 200 + index * 100);
        });
    }

    // Cave entrance transition
    createCaveTransition() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, transparent 0%, black 70%);
            z-index: 9999;
            opacity: 0;
            transition: opacity 1s ease;
            pointer-events: none;
        `;

        document.body.appendChild(overlay);

        // Animate transition
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);

        return {
            complete: () => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 1000);
            }
        };
    }

    // Setup dynamic effects for existing elements
    setupDynamicEffects() {
        // Enhance lamp links when they appear
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.classList && node.classList.contains('mystical-lamp-link')) {
                        this.createProximityGlow(node.querySelector('.lamp-icon'));
                    }

                    if (node.classList && node.classList.contains('lamp-interactive')) {
                        const smokeEffect = this.createRubbingSmoke(node);

                        // Hook into rubbing events
                        node.addEventListener('mousedown', smokeEffect.start);
                        node.addEventListener('touchstart', smokeEffect.start);
                        document.addEventListener('mouseup', smokeEffect.stop);
                        document.addEventListener('touchend', smokeEffect.stop);
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.genieAnimations = new GenieAnimations();
});

// Enhance the existing magic user system with animations
if (window.magicUser) {
    // Hook into existing genie summoning
    const originalSummonGenie = window.magicUser.summonGenieSpirit;
    if (originalSummonGenie) {
        window.magicUser.summonGenieSpirit = function(cave) {
            // Add particle effects before summoning
            if (window.genieAnimations) {
                window.genieAnimations.createParticleBurst(cave, {
                    count: 100,
                    colors: ['#667aea', '#ffd700', '#9f7aea', '#ff6b6b'],
                    duration: 4000
                });
            }

            // Call original function
            return originalSummonGenie.call(this, cave);
        };
    }

    // Hook into genie interface display
    const originalShowGenieInterface = window.magicUser.showGenieInterface;
    if (originalShowGenieInterface) {
        window.magicUser.showGenieInterface = function(cave) {
            // Call original function
            const result = originalShowGenieInterface.call(this, cave);

            // Add floating sparkles around genie
            setTimeout(() => {
                const genieAvatar = cave.querySelector('.genie-avatar');
                if (genieAvatar && window.genieAnimations) {
                    window.genieAnimations.createFloatingSparkles(genieAvatar);
                }
            }, 1000);

            return result;
        };
    }

    // Hook into text animation
    const originalAnimateGenieResponse = window.magicUser.animateGenieResponse;
    if (originalAnimateGenieResponse) {
        window.magicUser.animateGenieResponse = function(messageElement, response) {
            // Use enhanced text animation
            if (window.genieAnimations) {
                window.genieAnimations.animateGenieText(messageElement, response);
            } else {
                // Fallback to original
                return originalAnimateGenieResponse.call(this, messageElement, response);
            }
        };
    }
}