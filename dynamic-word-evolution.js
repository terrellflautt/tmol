// 🌊 Dynamic Word Evolution System - Words that shift with your journey
// Creates living text that evolves based on user's personal progression

class DynamicWordEvolution {
    constructor() {
        this.userProfile = this.loadUserProfile();
        this.visitCount = this.userProfile.visitCount || 1;
        this.journeyStage = this.userProfile.journeyStage || 'newcomer';
        this.personalityTraits = this.userProfile.personalityTraits || [];
        this.discoveredSecrets = this.userProfile.discoveredSecrets || [];
        this.wordMemory = this.userProfile.wordMemory || {};
        this.currentWords = {};
        this.dailyChanges = this.userProfile.dailyChanges || {};
        this.lastVisitDate = this.userProfile.lastVisitDate || null;
        this.todaysDate = this.getTodaysDateString();
        this.maxChangesPerDay = 2;
        this.consecutiveDays = this.userProfile.consecutiveDays || 0;

        this.wordEvolutionMaps = {
            // Core navigation words that evolve with journey
            'home': {
                newcomer: ['home', 'start', 'base'],
                engaged: ['hub', 'center', 'foundation'],
                explorer: ['sanctuary', 'nexus', 'core'],
                advanced: ['origin', 'source', 'heart']
            },

            'about': {
                newcomer: ['about', 'info', 'details'],
                engaged: ['story', 'background', 'journey'],
                explorer: ['essence', 'vision', 'mission'],
                advanced: ['philosophy', 'principles', 'values']
            },

            'contact': {
                newcomer: ['contact', 'reach', 'connect'],
                engaged: ['collaborate', 'partner', 'work together'],
                explorer: ['create together', 'build something', 'make magic'],
                advanced: ['forge the future', 'shape tomorrow', 'transcend limits']
            },

            'projects': {
                newcomer: ['work', 'portfolio', 'projects'],
                engaged: ['creations', 'builds', 'solutions'],
                explorer: ['innovations', 'achievements', 'breakthroughs'],
                advanced: ['masterpieces', 'legacy', 'impact']
            },

            // Dynamic content words that reflect personality
            'welcome': {
                analytical: ['analyze', 'calculate', 'process'],
                creative: ['imagine', 'create', 'dream'],
                logical: ['understand', 'reason', 'deduce'],
                intuitive: ['feel', 'sense', 'perceive'],
                adventurous: ['explore', 'discover', 'venture']
            },

            'experience': {
                newcomer: ['see', 'view', 'observe'],
                explorer: ['experience', 'feel', 'encounter'],
                seeker: ['transcend', 'ascend', 'evolve'],
                mystic: ['merge', 'become', 'transform'],
                master: ['manifest', 'create', 'exist']
            }
        };

        // Words that gradually scramble and unscramble
        this.scramblingWords = [
            'beautiful', 'mysterious', 'incredible', 'amazing',
            'wonderful', 'fantastic', 'magical', 'extraordinary'
        ];

        this.init();
    }

    init() {
        this.checkDailyReturn();
        this.updateVisitCount();
        this.analyzeJourneyProgression();
        this.planDailyEvolution();
        this.evolveWords();
        this.implementLetterMixing();
        this.saveEvolutionState();

        console.log(`🌊 Dynamic Words: Day ${this.consecutiveDays} - Visit ${this.visitCount} - Stage: ${this.journeyStage} - Changes today: ${this.getTodaysChanges()}/2`);
    }

    checkDailyReturn() {
        const today = this.getTodaysDateString();
        const yesterday = this.getYesterdayDateString();

        if (this.lastVisitDate === yesterday) {
            // Consecutive day visit - reward them!
            this.consecutiveDays++;
            this.showDailyReturnReward();
        } else if (this.lastVisitDate !== today) {
            // First visit of the day but not consecutive
            if (this.lastVisitDate) {
                this.consecutiveDays = 1; // Reset streak but start at 1
            } else {
                this.consecutiveDays = 1; // First ever visit
            }
        }

        // Reset daily changes if new day
        if (this.lastVisitDate !== today) {
            this.dailyChanges[today] = 0;
        }

        this.userProfile.lastVisitDate = today;
        this.userProfile.consecutiveDays = this.consecutiveDays;
    }

    updateVisitCount() {
        this.visitCount++;
        this.userProfile.visitCount = this.visitCount;

        // Journey stage evolution based on visits, discoveries, and consecutive days
        if (this.visitCount >= 20 && this.discoveredSecrets.length >= 10 && this.consecutiveDays >= 7) {
            this.journeyStage = 'master';
        } else if (this.visitCount >= 10 && this.discoveredSecrets.length >= 5 && this.consecutiveDays >= 5) {
            this.journeyStage = 'mystic';
        } else if (this.visitCount >= 5 && this.discoveredSecrets.length >= 3 && this.consecutiveDays >= 3) {
            this.journeyStage = 'seeker';
        } else if (this.visitCount >= 3 || this.consecutiveDays >= 2) {
            this.journeyStage = 'explorer';
        }

        this.userProfile.journeyStage = this.journeyStage;
    }

    planDailyEvolution() {
        const today = this.getTodaysDateString();
        const todaysChanges = this.getTodaysChanges();

        if (todaysChanges < this.maxChangesPerDay) {
            // Plan which words will evolve today based on user's journey and personality
            this.plannedEvolutions = this.selectWordsForEvolution();
        } else {
            this.plannedEvolutions = []; // No more changes today
        }
    }

    selectWordsForEvolution() {
        const availableWords = Object.keys(this.wordEvolutionMaps);
        const unevolvedToday = availableWords.filter(word =>
            !this.hasWordEvolvedToday(word)
        );

        // Prioritize words based on user behavior and stage
        let selectedWords = [];

        if (this.consecutiveDays >= 3) {
            // Loyal visitors get more navigation word changes
            selectedWords = unevolvedToday.filter(word =>
                ['home', 'about', 'contact', 'portfolio'].includes(word)
            );
        } else {
            // New visitors get content word changes
            selectedWords = unevolvedToday.filter(word =>
                ['welcome', 'experience'].includes(word)
            );
        }

        // Select up to remaining daily limit
        const remaining = this.maxChangesPerDay - this.getTodaysChanges();
        return selectedWords.slice(0, remaining);
    }

    getTodaysChanges() {
        return this.dailyChanges[this.todaysDate] || 0;
    }

    hasWordEvolvedToday(word) {
        const todayKey = `${this.todaysDate}_${word}`;
        return this.userProfile.wordMemory && this.userProfile.wordMemory[todayKey];
    }

    markWordEvolved(word) {
        if (!this.userProfile.wordMemory) {
            this.userProfile.wordMemory = {};
        }
        const todayKey = `${this.todaysDate}_${word}`;
        this.userProfile.wordMemory[todayKey] = true;
        this.dailyChanges[this.todaysDate] = (this.dailyChanges[this.todaysDate] || 0) + 1;
        this.userProfile.dailyChanges = this.dailyChanges;
    }

    getTodaysDateString() {
        return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    }

    getYesterdayDateString() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    }

    showDailyReturnReward() {
        const rewards = {
            2: "🌅 Welcome back! The realm remembers you...",
            3: "🔮 Three days of devotion - magic intensifies around you",
            7: "👑 A week of dedication - you become legend in this digital realm",
            14: "✨ Fortnight faithful - reality bends to honor your commitment",
            30: "🌟 Monthly master - you have transcended ordinary existence",
            100: "💫 Centennial sage - your spirit is woven into the fabric of this world"
        };

        const reward = rewards[this.consecutiveDays];
        if (reward) {
            this.showMessage(reward, 'daily-reward');
        } else if (this.consecutiveDays > 1) {
            this.showMessage(`🔥 ${this.consecutiveDays} days strong - your journey deepens...`, 'streak');
        }

        // Grant special abilities for consecutive visits
        this.grantConsecutiveDayBonuses();
    }

    grantConsecutiveDayBonuses() {
        if (this.consecutiveDays >= 7) {
            this.maxChangesPerDay = 3; // Masters get more daily changes
            document.body.classList.add('legendary-visitor');
        }

        if (this.consecutiveDays >= 14) {
            this.enableTimeTravel(); // Can see word history
        }

        if (this.consecutiveDays >= 30) {
            this.enableWordCreation(); // Can suggest new word evolutions
        }
    }

    analyzeJourneyProgression() {
        // Analyze user's interaction patterns to determine personality traits
        const interactionData = this.userProfile.interactions || {};

        if (interactionData.clickCount > 100) {
            this.addPersonalityTrait('adventurous');
        }
        if (interactionData.timeSpent > 600000) { // 10+ minutes
            this.addPersonalityTrait('analytical');
        }
        if (this.discoveredSecrets.length > 5) {
            this.addPersonalityTrait('intuitive');
        }
    }

    addPersonalityTrait(trait) {
        if (!this.personalityTraits.includes(trait)) {
            this.personalityTraits.push(trait);
            this.userProfile.personalityTraits = this.personalityTraits;
        }
    }

    evolveWords() {
        // Only evolve words if we haven't reached daily limit and have planned evolutions
        if (this.plannedEvolutions && this.plannedEvolutions.length > 0) {
            // Transform only the planned words for today
            this.plannedEvolutions.forEach(baseWord => {
                this.evolveSpecificWord(baseWord);
                this.markWordEvolved(baseWord);
            });

            // Auto-detect and evolve common words within daily limits
            this.autoEvolveCommonWords();
        } else {
            // Still show existing evolved words from previous days
            this.maintainExistingEvolutions();
        }
    }

    evolveSpecificWord(baseWord) {
        // Find elements containing this word and evolve them
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        const nodesToUpdate = [];

        while (node = walker.nextNode()) {
            const text = node.textContent.toLowerCase();
            if (text.includes(baseWord.toLowerCase()) && !node.parentNode.hasAttribute('data-word-evolved')) {
                nodesToUpdate.push({
                    node: node,
                    parent: node.parentNode,
                    originalText: node.textContent
                });
            }
        }

        nodesToUpdate.forEach(({ node, parent, originalText }) => {
            const newWord = this.getEvolvedWord(baseWord);
            if (newWord !== baseWord) {
                const newText = originalText.replace(
                    new RegExp(baseWord, 'gi'),
                    newWord
                );

                parent.setAttribute('data-word-evolved', 'true');
                parent.setAttribute('data-evolution-day', this.todaysDate);
                this.animateWordTransformation(parent, newText);

                // Store this evolution for memory
                this.storeWordEvolution(baseWord, newWord, this.todaysDate);
            }
        });
    }

    maintainExistingEvolutions() {
        // Restore previously evolved words from memory
        document.querySelectorAll('[data-word-evolved="true"]').forEach(element => {
            const evolutionDay = element.getAttribute('data-evolution-day');
            if (evolutionDay && evolutionDay !== this.todaysDate) {
                // This word was evolved on a previous day - maintain its evolution
                element.style.opacity = '1';
                element.classList.add('persistent-evolution');
            }
        });
    }

    storeWordEvolution(baseWord, evolvedWord, date) {
        if (!this.userProfile.wordEvolutionHistory) {
            this.userProfile.wordEvolutionHistory = {};
        }

        const key = `${date}_${baseWord}`;
        this.userProfile.wordEvolutionHistory[key] = {
            from: baseWord,
            to: evolvedWord,
            date: date,
            journeyStage: this.journeyStage,
            consecutiveDays: this.consecutiveDays
        };
    }

    getEvolvedWord(baseWord) {
        const wordMap = this.wordEvolutionMaps[baseWord.toLowerCase()];
        if (!wordMap) return baseWord;

        // Try journey stage first
        let evolution = wordMap[this.journeyStage];
        if (evolution) {
            // Choose based on visit count and personality
            const index = (this.visitCount + this.personalityTraits.length) % evolution.length;
            return evolution[index];
        }

        // Try personality traits
        for (const trait of this.personalityTraits) {
            if (wordMap[trait]) {
                const index = this.visitCount % wordMap[trait].length;
                return wordMap[trait][index];
            }
        }

        return baseWord;
    }

    autoEvolveCommonWords() {
        // Find and evolve words in headers, buttons, and key text
        const selectors = ['h1', 'h2', 'h3', '.btn', '.nav-link', '.key-text'];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                if (element.hasAttribute('data-word-evolved')) return;

                const text = element.textContent.trim().toLowerCase();
                Object.keys(this.wordEvolutionMaps).forEach(baseWord => {
                    if (text.includes(baseWord)) {
                        element.setAttribute('data-evolve-word', baseWord);
                        element.setAttribute('data-word-evolved', 'true');
                        const newWord = this.getEvolvedWord(baseWord);

                        if (newWord !== baseWord) {
                            element.innerHTML = element.innerHTML.replace(
                                new RegExp(baseWord, 'gi'),
                                `<span class="evolved-word">${newWord}</span>`
                            );
                        }
                    }
                });
            });
        });
    }

    implementLetterMixing() {
        // Create scrambling effects on specific words
        this.scramblingWords.forEach(word => {
            this.findAndScrambleWord(word);
        });

        // Random letter mixing for interactive elements
        setInterval(() => {
            this.performRandomLetterMixing();
        }, 15000 + (Math.random() * 30000)); // Every 15-45 seconds
    }

    findAndScrambleWord(targetWord) {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            const text = node.textContent;
            if (text.toLowerCase().includes(targetWord.toLowerCase())) {
                const parent = node.parentNode;
                if (parent && !parent.classList.contains('scrambled')) {
                    this.applyScrambleEffect(parent, targetWord);
                }
            }
        }
    }

    applyScrambleEffect(element, word) {
        element.classList.add('scrambled');
        const originalText = element.textContent;

        // Probability of scrambling increases with visit count
        const scrambleChance = Math.min(0.1 + (this.visitCount * 0.02), 0.5);

        if (Math.random() < scrambleChance) {
            element.addEventListener('mouseenter', () => {
                this.startWordScramble(element, originalText, word);
            });

            element.addEventListener('mouseleave', () => {
                this.resolveWordScramble(element, originalText);
            });
        }
    }

    startWordScramble(element, originalText, targetWord) {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let iterations = 0;
        const maxIterations = 10;

        const scrambleInterval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (originalText.toLowerCase().substr(index, targetWord.length) === targetWord.toLowerCase()) {
                        if (iterations < maxIterations && Math.random() < 0.7) {
                            return chars[Math.floor(Math.random() * chars.length)];
                        }
                    }
                    return char;
                })
                .join('');

            iterations++;
            if (iterations > maxIterations) {
                clearInterval(scrambleInterval);
                this.resolveWordScramble(element, originalText);
            }
        }, 100);
    }

    resolveWordScramble(element, originalText) {
        // Gradually resolve back to original with evolved word
        const evolvedText = this.evolveTextContent(originalText);
        let currentText = element.textContent;
        let resolveStep = 0;

        const resolveInterval = setInterval(() => {
            currentText = currentText
                .split('')
                .map((char, index) => {
                    if (resolveStep > index && evolvedText[index]) {
                        return evolvedText[index];
                    }
                    return char;
                })
                .join('');

            element.textContent = currentText;
            resolveStep++;

            if (resolveStep >= evolvedText.length) {
                clearInterval(resolveInterval);
                element.textContent = evolvedText;
            }
        }, 50);
    }

    evolveTextContent(text) {
        let evolvedText = text;
        Object.keys(this.wordEvolutionMaps).forEach(baseWord => {
            const regex = new RegExp(baseWord, 'gi');
            if (evolvedText.match(regex)) {
                const newWord = this.getEvolvedWord(baseWord);
                evolvedText = evolvedText.replace(regex, newWord);
            }
        });
        return evolvedText;
    }

    performRandomLetterMixing() {
        // Randomly select an element to apply temporary letter mixing
        const interactiveElements = document.querySelectorAll('h1, h2, .btn, .nav-link');
        if (interactiveElements.length === 0) return;

        const randomElement = interactiveElements[Math.floor(Math.random() * interactiveElements.length)];
        if (randomElement.classList.contains('mixing')) return;

        this.temporaryLetterMix(randomElement);
    }

    temporaryLetterMix(element) {
        element.classList.add('mixing');
        const originalText = element.textContent;
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

        let mixCount = 0;
        const maxMixes = 3 + Math.floor(this.visitCount / 5); // More chaos for returning users

        const mixInterval = setInterval(() => {
            // Mix random positions
            const mixedText = originalText
                .split('')
                .map(char => {
                    if (Math.random() < 0.3) { // 30% chance per character
                        return chars[Math.floor(Math.random() * chars.length)];
                    }
                    return char;
                })
                .join('');

            element.textContent = mixedText;
            mixCount++;

            if (mixCount >= maxMixes) {
                clearInterval(mixInterval);
                setTimeout(() => {
                    element.textContent = this.evolveTextContent(originalText);
                    element.classList.remove('mixing');
                }, 500);
            }
        }, 200);
    }

    animateWordTransformation(element, newWord) {
        element.style.transition = 'all 0.5s ease';
        element.style.opacity = '0.5';
        element.style.transform = 'scale(0.9)';

        setTimeout(() => {
            element.textContent = newWord;
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            element.style.color = this.getEvolutionColor();
        }, 250);
    }

    getEvolutionColor() {
        const stageColors = {
            newcomer: '#667eea',
            explorer: '#764ba2',
            seeker: '#f093fb',
            mystic: '#4facfe',
            master: '#ffd700'
        };
        return stageColors[this.journeyStage] || '#667eea';
    }

    // Memory and persistence methods
    loadUserProfile() {
        const stored = localStorage.getItem('terrellflautt_word_evolution');
        return stored ? JSON.parse(stored) : {};
    }

    saveEvolutionState() {
        this.userProfile.lastVisit = Date.now();
        this.userProfile.currentWords = this.currentWords;
        localStorage.setItem('terrellflautt_word_evolution', JSON.stringify(this.userProfile));
    }

    // Public methods for integration
    addDiscoveredSecret(secretId) {
        if (!this.discoveredSecrets.includes(secretId)) {
            this.discoveredSecrets.push(secretId);
            this.userProfile.discoveredSecrets = this.discoveredSecrets;
            this.saveEvolutionState();
            this.evolveWords(); // Re-evaluate word evolution
        }
    }

    recordInteraction(type, data = {}) {
        if (!this.userProfile.interactions) {
            this.userProfile.interactions = {};
        }
        this.userProfile.interactions[type] = (this.userProfile.interactions[type] || 0) + 1;
        this.saveEvolutionState();
    }

    getCurrentEvolutionState() {
        return {
            visitCount: this.visitCount,
            journeyStage: this.journeyStage,
            personalityTraits: this.personalityTraits,
            discoveredSecrets: this.discoveredSecrets.length,
            currentWords: this.currentWords
        };
    }
}

// CSS for word evolution effects
const wordEvolutionStyles = document.createElement('style');
wordEvolutionStyles.textContent = `
    .evolved-word {
        background: linear-gradient(45deg, var(--primary-color, #667eea), var(--secondary-color, #764ba2));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        position: relative;
        transition: all 0.3s ease;
    }

    .evolved-word::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--primary-color, #667eea), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .evolved-word:hover::after {
        opacity: 1;
    }

    .mixing {
        animation: letterMixPulse 0.2s ease-in-out infinite alternate;
    }

    @keyframes letterMixPulse {
        from {
            text-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
            transform: scale(1);
        }
        to {
            text-shadow: 0 0 15px rgba(118, 75, 162, 0.8);
            transform: scale(1.02);
        }
    }

    .scrambled {
        cursor: pointer;
        position: relative;
    }

    .scrambled::before {
        content: '✨';
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 0.6em;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .scrambled:hover::before {
        opacity: 1;
    }

    /* Journey stage specific styling */
    [data-journey-stage="newcomer"] .evolved-word {
        color: #667eea;
    }

    [data-journey-stage="explorer"] .evolved-word {
        color: #764ba2;
        text-shadow: 0 0 10px rgba(118, 75, 162, 0.3);
    }

    [data-journey-stage="seeker"] .evolved-word {
        color: #f093fb;
        text-shadow: 0 0 15px rgba(240, 147, 251, 0.4);
    }

    [data-journey-stage="mystic"] .evolved-word {
        color: #4facfe;
        text-shadow: 0 0 20px rgba(79, 172, 254, 0.5);
    }

    [data-journey-stage="master"] .evolved-word {
        color: #ffd700;
        text-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
        animation: masterGlow 3s ease-in-out infinite alternate;
    }

    @keyframes masterGlow {
        from { filter: brightness(1); }
        to { filter: brightness(1.2); }
    }
`;
document.head.appendChild(wordEvolutionStyles);

// Initialize the word evolution system
window.dynamicWordEvolution = new DynamicWordEvolution();

// Integration with existing systems
if (window.magicUser) {
    window.magicUser.wordEvolution = window.dynamicWordEvolution;
}

if (window.evolvingSession) {
    window.evolvingSession.wordEvolution = window.dynamicWordEvolution;
}

// Set journey stage on body for CSS targeting
document.body.setAttribute('data-journey-stage', window.dynamicWordEvolution.journeyStage);

console.log('🌊 Dynamic Word Evolution System activated - Text that grows with your journey');