/**
 * DAILY VISITOR REWARD SYSTEM
 * Ensures daily visitors always discover something new
 * Never the same experience twice
 */

class DailyVisitorRewardSystem {
    constructor() {
        this.userId = localStorage.getItem('omniscient_user_id') || 'anonymous';
        this.dailyRewards = new Map();
        this.contentRotation = new Map();
        this.personalizedElements = new Map();

        console.log('🎁 Daily visitor reward system activated');
        this.initializeDailyRewards();
    }

    async initializeDailyRewards() {
        await this.loadUserHistory();
        this.calculateDailyContent();
        this.rotateDynamicElements();
        this.setupPersonalizedGreetings();
        this.scheduleContentRotation();
    }

    async loadUserHistory() {
        try {
            // Load user's historical visits and discoveries
            this.visitHistory = JSON.parse(localStorage.getItem('visit_history') || '[]');
            this.discoveryHistory = JSON.parse(localStorage.getItem('discovery_history') || '[]');
            this.contentSeen = JSON.parse(localStorage.getItem('content_seen') || '[]');
            this.personalPreferences = JSON.parse(localStorage.getItem('personal_preferences') || '{}');

            // Track today's visit
            const today = new Date().toDateString();
            const todayVisits = this.visitHistory.filter(visit =>
                new Date(visit.date).toDateString() === today
            );

            this.isReturnVisitorToday = todayVisits.length > 0;
            this.todayVisitCount = todayVisits.length + 1;

            // Record this visit
            this.visitHistory.push({
                date: Date.now(),
                sessionId: this.generateSessionId(),
                timeOfDay: this.getTimeOfDay(),
                dayOfWeek: new Date().getDay()
            });

            localStorage.setItem('visit_history', JSON.stringify(this.visitHistory));

        } catch (error) {
            console.error('Error loading user history:', error);
            this.visitHistory = [];
            this.discoveryHistory = [];
            this.contentSeen = [];
        }
    }

    calculateDailyContent() {
        const today = new Date().toDateString();

        // Generate seed based on user + date for consistent daily content
        const dailySeed = this.generateDailySeed(today);

        // Calculate what content to show today
        this.todaysContent = {
            // Dynamic logo variations
            logoVariation: this.selectLogoVariation(dailySeed),

            // Color theme rotation
            colorTheme: this.selectDailyColorTheme(dailySeed),

            // Hidden element positions
            hiddenElements: this.generateHiddenElementPositions(dailySeed),

            // Dynamic greetings
            greetings: this.generateDailyGreetings(dailySeed),

            // Easter egg rotations
            easterEggSet: this.selectEasterEggSet(dailySeed),

            // Surprise elements
            surpriseElements: this.generateSurpriseElements(dailySeed),

            // Weather-based adaptations
            weatherAdaptations: this.generateWeatherAdaptations(),

            // Time-based content
            timeBasedContent: this.generateTimeBasedContent()
        };

        console.log('📅 Today\'s personalized content calculated:', this.todaysContent);
    }

    selectLogoVariation(seed) {
        const variations = [
            { text: 'Terrell K. Flautt', style: 'classic' },
            { text: 'T.K.', style: 'minimal' },
            { text: 'The Knowledge', style: 'expanded' },
            { text: 'Tech King', style: 'royal' },
            { text: 'Flautt', style: 'surname' },
            { text: 'TKF', style: 'initials' },
            { text: '⚡ T.K. ⚡', style: 'electric' },
            { text: '👑 King ⚡', style: 'royal_electric' }
        ];

        // Don't repeat logo from yesterday
        const yesterdayLogo = localStorage.getItem('yesterday_logo');
        const availableLogos = variations.filter(v => v.text !== yesterdayLogo);

        const selected = availableLogos[seed % availableLogos.length];
        localStorage.setItem('yesterday_logo', selected.text);

        return selected;
    }

    selectDailyColorTheme(seed) {
        const themes = [
            {
                name: 'cosmic_purple',
                primary: '#667eea',
                secondary: '#764ba2',
                accent: '#a8c8ec'
            },
            {
                name: 'sunset_orange',
                primary: '#ff9a9e',
                secondary: '#fecfef',
                accent: '#ffecd2'
            },
            {
                name: 'forest_green',
                primary: '#56ab2f',
                secondary: '#a8e6cf',
                accent: '#dcedc1'
            },
            {
                name: 'deep_ocean',
                primary: '#2980b9',
                secondary: '#6bb6ff',
                accent: '#c7ecee'
            },
            {
                name: 'royal_gold',
                primary: '#ffd700',
                secondary: '#ffed4e',
                accent: '#fff9c4'
            },
            {
                name: 'midnight_blue',
                primary: '#2c3e50',
                secondary: '#4a6741',
                accent: '#7fb3d3'
            }
        ];

        // Avoid yesterday's theme
        const yesterdayTheme = localStorage.getItem('yesterday_theme');
        const availableThemes = themes.filter(t => t.name !== yesterdayTheme);

        const selected = availableThemes[seed % availableThemes.length];
        localStorage.setItem('yesterday_theme', selected.name);

        return selected;
    }

    generateHiddenElementPositions(seed) {
        // Generate consistent but randomized positions for hidden elements
        const elements = [];
        const rng = this.seededRandom(seed);

        for (let i = 0; i < 5; i++) {
            elements.push({
                id: `hidden_${i}`,
                x: Math.floor(rng() * 80) + 10, // 10-90% from left
                y: Math.floor(rng() * 80) + 10, // 10-90% from top
                size: Math.floor(rng() * 30) + 20, // 20-50px
                rotation: Math.floor(rng() * 360),
                opacity: (rng() * 0.5) + 0.3 // 0.3-0.8
            });
        }

        return elements;
    }

    generateDailyGreetings(seed) {
        const timeOfDay = this.getTimeOfDay();
        const isReturnVisitor = this.isReturnVisitorToday;
        const visitCount = this.todayVisitCount;

        const greetings = {
            morning: [
                "🌅 Good morning, early explorer!",
                "☕ Morning! Ready for discovery?",
                "🌞 Rise and seek, adventurer!",
                "🐦 Early bird catches the mysteries!"
            ],
            afternoon: [
                "🌤️ Afternoon, knowledge seeker!",
                "☀️ Perfect timing for exploration!",
                "🌻 Afternoon adventures await!",
                "⚡ Energy peak - time to discover!"
            ],
            evening: [
                "🌆 Evening, mystery lover!",
                "🌙 Twilight wisdom beckons!",
                "⭐ Stars align for discovery!",
                "🔮 Evening enchantments await!"
            ],
            night: [
                "🌙 Night owl, welcome back!",
                "⭐ Midnight mysteries unfold!",
                "🦉 Nocturnal explorer arrives!",
                "🌌 Night brings deeper secrets!"
            ]
        };

        let selectedGreeting = greetings[timeOfDay][seed % greetings[timeOfDay].length];

        // Personalize for return visitors
        if (isReturnVisitor) {
            selectedGreeting += ` (Visit #${visitCount} today!)`;
        }

        return selectedGreeting;
    }

    generateSurpriseElements(seed) {
        const surprises = [
            {
                type: 'floating_words',
                words: ['curious', 'explore', 'discover', 'mystery', 'wonder'],
                animation: 'float_randomly'
            },
            {
                type: 'hidden_messages',
                messages: [
                    "You're special",
                    "Keep exploring",
                    "Wisdom awaits",
                    "Trust yourself",
                    "You matter"
                ]
            },
            {
                type: 'particle_effects',
                effect: ['sparkles', 'bubbles', 'fireflies', 'stardust'][seed % 4]
            },
            {
                type: 'background_shift',
                pattern: ['waves', 'particles', 'geometric', 'organic'][seed % 4]
            }
        ];

        return surprises[seed % surprises.length];
    }

    rotateDynamicElements() {
        // Apply today's theme
        this.applyDailyColorTheme();

        // Update logo
        this.updateDailyLogo();

        // Add hidden elements
        this.addHiddenElements();

        // Show daily greeting
        this.showDailyGreeting();

        // Add surprise elements
        this.addSurpriseElements();

        console.log('🔄 Dynamic elements rotated for today');
    }

    applyDailyColorTheme() {
        const theme = this.todaysContent.colorTheme;

        document.documentElement.style.setProperty('--daily-primary', theme.primary);
        document.documentElement.style.setProperty('--daily-secondary', theme.secondary);
        document.documentElement.style.setProperty('--daily-accent', theme.accent);

        // Add theme class to body
        document.body.classList.add(`theme-${theme.name}`);

        console.log(`🎨 Applied daily theme: ${theme.name}`);
    }

    updateDailyLogo() {
        const logoElement = document.querySelector('.logo-text');
        if (!logoElement) return;

        const variation = this.todaysContent.logoVariation;

        // Smooth transition
        logoElement.style.opacity = '0';

        setTimeout(() => {
            logoElement.textContent = variation.text;
            logoElement.className = `logo-text style-${variation.style}`;
            logoElement.style.opacity = '1';

            // Add special styling based on variation
            this.applyLogoStyling(logoElement, variation);

        }, 300);

        console.log(`📝 Logo updated to: ${variation.text}`);
    }

    applyLogoStyling(element, variation) {
        switch (variation.style) {
            case 'royal':
                element.style.textShadow = '0 0 10px gold';
                element.style.fontWeight = 'bold';
                break;
            case 'electric':
                element.style.animation = 'electricPulse 2s ease-in-out infinite';
                break;
            case 'minimal':
                element.style.fontSize = '1.2em';
                element.style.letterSpacing = '3px';
                break;
            case 'expanded':
                element.style.fontSize = '0.9em';
                element.style.letterSpacing = '1px';
                break;
        }
    }

    addHiddenElements() {
        const positions = this.todaysContent.hiddenElements;

        positions.forEach((pos, index) => {
            const element = document.createElement('div');
            element.className = 'daily-hidden-element';
            element.innerHTML = ['✨', '🌟', '💫', '⭐', '🔮'][index % 5];

            element.style.cssText = `
                position: fixed;
                left: ${pos.x}%;
                top: ${pos.y}%;
                font-size: ${pos.size}px;
                transform: rotate(${pos.rotation}deg);
                opacity: ${pos.opacity};
                z-index: 100;
                pointer-events: none;
                animation: gentleFloat 3s ease-in-out infinite;
                animation-delay: ${index * 0.5}s;
            `;

            document.body.appendChild(element);

            // Remove after session
            setTimeout(() => element.remove(), 300000); // 5 minutes
        });

        console.log('✨ Hidden elements added');
    }

    showDailyGreeting() {
        const greeting = this.todaysContent.greetings;

        const greetingElement = document.createElement('div');
        greetingElement.className = 'daily-greeting';
        greetingElement.textContent = greeting;

        greetingElement.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, var(--daily-primary), var(--daily-secondary));
            color: white;
            padding: 15px 30px;
            border-radius: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 500;
            opacity: 0;
            transition: all 0.5s ease;
        `;

        document.body.appendChild(greetingElement);

        // Animate in
        setTimeout(() => greetingElement.style.opacity = '1', 100);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            greetingElement.style.opacity = '0';
            setTimeout(() => greetingElement.remove(), 500);
        }, 5000);

        console.log(`👋 Daily greeting shown: ${greeting}`);
    }

    addSurpriseElements() {
        const surprise = this.todaysContent.surpriseElements;

        switch (surprise.type) {
            case 'floating_words':
                this.addFloatingWords(surprise.words);
                break;
            case 'particle_effects':
                this.addParticleEffect(surprise.effect);
                break;
            case 'background_shift':
                this.addBackgroundEffect(surprise.pattern);
                break;
        }
    }

    addFloatingWords(words) {
        words.forEach((word, index) => {
            setTimeout(() => {
                const wordElement = document.createElement('div');
                wordElement.textContent = word;
                wordElement.className = 'floating-word';

                wordElement.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 80 + 10}%;
                    top: ${Math.random() * 80 + 10}%;
                    color: var(--daily-accent);
                    font-size: 14px;
                    font-weight: 300;
                    opacity: 0.6;
                    pointer-events: none;
                    z-index: 50;
                    animation: wordFloat 8s ease-in-out infinite;
                `;

                document.body.appendChild(wordElement);

                // Remove after animation
                setTimeout(() => wordElement.remove(), 8000);

            }, index * 2000);
        });
    }

    scheduleContentRotation() {
        // Check for content updates every hour
        setInterval(() => {
            this.checkForContentUpdates();
        }, 3600000); // 1 hour

        // Micro-rotations every 10 minutes
        setInterval(() => {
            this.performMicroRotation();
        }, 600000); // 10 minutes
    }

    performMicroRotation() {
        // Small changes throughout the session
        const changes = [
            () => this.rotateHiddenElementPositions(),
            () => this.adjustColorIntensity(),
            () => this.addTemporaryAnimation(),
            () => this.showEncouragementMessage()
        ];

        const randomChange = changes[Math.floor(Math.random() * changes.length)];
        randomChange();
    }

    rotateHiddenElementPositions() {
        const hiddenElements = document.querySelectorAll('.daily-hidden-element');
        hiddenElements.forEach(element => {
            const newX = Math.random() * 80 + 10;
            const newY = Math.random() * 80 + 10;

            element.style.transition = 'all 2s ease';
            element.style.left = `${newX}%`;
            element.style.top = `${newY}%`;
        });
    }

    showEncouragementMessage() {
        const messages = [
            "Keep exploring! 🌟",
            "You're doing great! ⭐",
            "Mystery awaits! 🔮",
            "Stay curious! 🧠",
            "Almost there! 🎯"
        ];

        const message = messages[Math.floor(Math.random() * messages.length)];

        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--daily-primary);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        `;

        document.body.appendChild(messageElement);

        setTimeout(() => messageElement.style.opacity = '1', 100);
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => messageElement.remove(), 300);
        }, 3000);
    }

    // Utility methods
    generateDailySeed(date) {
        let hash = 0;
        const str = this.userId + date;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    seededRandom(seed) {
        let currentSeed = seed;
        return function() {
            currentSeed = (currentSeed * 9301 + 49297) % 233280;
            return currentSeed / 233280;
        };
    }

    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour < 6) return 'night';
        if (hour < 12) return 'morning';
        if (hour < 18) return 'afternoon';
        return 'evening';
    }

    // Placeholder methods for future implementation
    selectEasterEggSet() { return 'default'; }
    generateWeatherAdaptations() { return {}; }
    generateTimeBasedContent() { return {}; }
    addParticleEffect() { }
    addBackgroundEffect() { }
    checkForContentUpdates() { }
    adjustColorIntensity() { }
    addTemporaryAnimation() { }
}

// CSS animations for daily elements
const dailyAnimationStyles = document.createElement('style');
dailyAnimationStyles.textContent = `
    @keyframes gentleFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(5deg); }
    }

    @keyframes wordFloat {
        0% { opacity: 0; transform: translateY(20px); }
        25% { opacity: 0.6; }
        75% { opacity: 0.6; }
        100% { opacity: 0; transform: translateY(-20px); }
    }

    @keyframes electricPulse {
        0%, 100% { text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff; }
        50% { text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff; }
    }

    .theme-cosmic_purple {
        --theme-glow: 0 0 20px rgba(102, 126, 234, 0.3);
    }

    .theme-sunset_orange {
        --theme-glow: 0 0 20px rgba(255, 154, 158, 0.3);
    }

    .theme-forest_green {
        --theme-glow: 0 0 20px rgba(86, 171, 47, 0.3);
    }

    .theme-deep_ocean {
        --theme-glow: 0 0 20px rgba(41, 128, 185, 0.3);
    }

    .theme-royal_gold {
        --theme-glow: 0 0 20px rgba(255, 215, 0, 0.3);
    }

    .theme-midnight_blue {
        --theme-glow: 0 0 20px rgba(44, 62, 80, 0.3);
    }
`;

document.head.appendChild(dailyAnimationStyles);

// Export for use by other systems
window.DailyVisitorRewardSystem = DailyVisitorRewardSystem;