// 🌈 Childhood Wonder Evolution - Where Adults Become Children Again
// Gradually transforms the experience into a magical playground

class ChildhoodWonderEvolution {
    constructor() {
        this.wonderState = this.loadWonderState();
        this.childlikeScore = this.wonderState.childlikeScore || 0;
        this.playfulInteractions = this.wonderState.playfulInteractions || 0;
        this.worldElements = this.wonderState.worldElements || {};
        this.userChoices = this.wonderState.userChoices || [];
        this.personalStory = this.wonderState.personalStory || {};

        this.evolutionStages = {
            0: 'professional', // Adult, serious interface
            25: 'curious',     // First hints of wonder
            50: 'playful',     // More colorful, interactive
            75: 'magical',     // Full fantasy elements
            100: 'childlike'   // Complete wonderland
        };

        this.worldBuilding = {
            unlocked: false,
            structures: [],
            companions: [],
            customizations: {}
        };

        this.init();
    }

    init() {
        this.assessCurrentStage();
        this.initializeWonderTriggers();
        this.startGradualEvolution();
        this.enableWorldBuilding();
        this.createChoiceMoments();

        console.log(`🌈 Wonder Level: ${this.childlikeScore}/100 - Stage: ${this.getCurrentStage()}`);
    }

    getCurrentStage() {
        let currentStage = 'professional';
        Object.keys(this.evolutionStages).forEach(threshold => {
            if (this.childlikeScore >= parseInt(threshold)) {
                currentStage = this.evolutionStages[threshold];
            }
        });
        return currentStage;
    }

    initializeWonderTriggers() {
        // Actions that increase childlike wonder
        document.addEventListener('click', (e) => {
            if (this.isPlayfulClick(e)) {
                this.increaseWonder(1, 'playful_click');
            }
        });

        // Double-clicks increase wonder more
        document.addEventListener('dblclick', () => {
            this.increaseWonder(2, 'excited_interaction');
        });

        // Mouse movements that show curiosity
        let mouseTrail = [];
        document.addEventListener('mousemove', (e) => {
            mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            if (mouseTrail.length > 10) {
                mouseTrail.shift();
                this.analyzePlayfulMovement(mouseTrail);
            }
        });

        // Scrolling patterns
        this.detectExploratoryScrolling();

        // Time spent in wonder
        this.trackWonderTime();
    }

    isPlayfulClick(e) {
        // Detect clicks that show playful curiosity
        const target = e.target;
        const rapidClicks = this.detectRapidClicking();
        const exploratoryClick = this.isExploratoryClick(target);

        return rapidClicks || exploratoryClick;
    }

    detectRapidClicking() {
        if (!this.lastClickTime) {
            this.lastClickTime = Date.now();
            this.clickCount = 1;
            return false;
        }

        const timeDiff = Date.now() - this.lastClickTime;
        if (timeDiff < 500) { // Rapid clicking
            this.clickCount++;
            if (this.clickCount >= 3) {
                this.clickCount = 0;
                return true;
            }
        } else {
            this.clickCount = 1;
        }

        this.lastClickTime = Date.now();
        return false;
    }

    isExploratoryClick(target) {
        // Clicks on non-obvious elements show curiosity
        const unexpectedElements = ['div', 'span', 'p', 'section'];
        return unexpectedElements.includes(target.tagName.toLowerCase()) &&
               !target.classList.contains('btn') &&
               !target.onclick;
    }

    analyzePlayfulMovement(trail) {
        // Detect playful mouse movements
        if (this.isZigZagMovement(trail)) {
            this.increaseWonder(1, 'playful_movement');
        }

        if (this.isCircularMovement(trail)) {
            this.increaseWonder(2, 'curious_circles');
        }
    }

    isZigZagMovement(trail) {
        let directionChanges = 0;
        let lastDirection = null;

        for (let i = 1; i < trail.length; i++) {
            const dx = trail[i].x - trail[i-1].x;
            const currentDirection = dx > 0 ? 'right' : 'left';

            if (lastDirection && lastDirection !== currentDirection) {
                directionChanges++;
            }
            lastDirection = currentDirection;
        }

        return directionChanges >= 4; // Significant zig-zagging
    }

    detectExploratoryScrolling() {
        let scrollPattern = [];

        window.addEventListener('scroll', () => {
            scrollPattern.push({
                position: window.scrollY,
                time: Date.now()
            });

            if (scrollPattern.length > 20) {
                scrollPattern.shift();
                this.analyzeScrollPattern(scrollPattern);
            }
        });
    }

    analyzeScrollPattern(pattern) {
        // Detect playful scrolling (up and down exploration)
        let directionsChanges = 0;
        let lastDirection = null;

        for (let i = 1; i < pattern.length; i++) {
            const diff = pattern[i].position - pattern[i-1].position;
            const direction = diff > 0 ? 'down' : 'up';

            if (lastDirection && lastDirection !== direction) {
                directionsChanges++;
            }
            lastDirection = direction;
        }

        if (directionsChanges >= 5) {
            this.increaseWonder(1, 'exploratory_scrolling');
        }
    }

    trackWonderTime() {
        // Award points for time spent in wonder
        setInterval(() => {
            if (document.hasFocus() && this.childlikeScore < 100) {
                this.increaseWonder(0.1, 'wonder_time');
            }
        }, 30000); // Every 30 seconds
    }

    increaseWonder(amount, reason) {
        this.childlikeScore = Math.min(100, this.childlikeScore + amount);
        this.playfulInteractions++;

        this.recordWonderMoment(reason, amount);
        this.checkForStageEvolution();
        this.saveWonderState();
    }

    recordWonderMoment(reason, amount) {
        if (!this.wonderState.wonderMoments) {
            this.wonderState.wonderMoments = [];
        }

        this.wonderState.wonderMoments.push({
            reason: reason,
            amount: amount,
            timestamp: Date.now(),
            score: this.childlikeScore
        });

        // Keep only recent moments
        if (this.wonderState.wonderMoments.length > 100) {
            this.wonderState.wonderMoments = this.wonderState.wonderMoments.slice(-100);
        }
    }

    checkForStageEvolution() {
        const currentStage = this.getCurrentStage();
        const previousStage = this.wonderState.lastStage || 'professional';

        if (currentStage !== previousStage) {
            this.evolveToStage(currentStage);
            this.wonderState.lastStage = currentStage;
        }
    }

    evolveToStage(stage) {
        switch(stage) {
            case 'curious':
                this.beginCuriousPhase();
                break;
            case 'playful':
                this.beginPlayfulPhase();
                break;
            case 'magical':
                this.beginMagicalPhase();
                break;
            case 'childlike':
                this.beginChildlikePhase();
                break;
        }

        this.announceStageEvolution(stage);
    }

    beginCuriousPhase() {
        // Subtle color enhancements
        document.documentElement.style.setProperty('--wonder-saturation', '1.1');
        document.documentElement.style.setProperty('--wonder-brightness', '1.05');

        // Slightly more animated responses
        this.enableSubtleAnimations();

        // First hints of magic
        this.plantCuriositySeeds();
    }

    beginPlayfulPhase() {
        // More vibrant colors
        document.documentElement.style.setProperty('--wonder-saturation', '1.2');
        document.documentElement.style.setProperty('--wonder-brightness', '1.1');

        // Interactive elements become more responsive
        this.enhanceInteractivity();

        // Introduction of world-building concepts
        this.unlockBasicWorldBuilding();

        // Characters become more animated
        this.animateCharacters();
    }

    beginMagicalPhase() {
        // Rich, magical colors
        document.documentElement.style.setProperty('--wonder-saturation', '1.3');
        document.documentElement.style.setProperty('--wonder-brightness', '1.15');

        // Full RPG elements emerge
        this.unlockRPGElements();

        // Story choices become available
        this.enableStoryChoices();

        // World becomes truly customizable
        this.unlockAdvancedWorldBuilding();
    }

    beginChildlikePhase() {
        // Maximum wonder and magic
        document.documentElement.style.setProperty('--wonder-saturation', '1.4');
        document.documentElement.style.setProperty('--wonder-brightness', '1.2');

        // Complete transformation to wonderland
        this.transformToWonderland();

        // Unlimited creativity tools
        this.unlockCreativityTools();

        // Personal story completion
        this.enablePersonalNarrative();
    }

    plantCuriositySeeds() {
        // Add subtle interactive elements that respond to curiosity
        const seeds = document.querySelectorAll('h1, h2, .btn');
        seeds.forEach(element => {
            if (Math.random() < 0.3) { // 30% of elements
                this.makeCuriosityResponsive(element);
            }
        });
    }

    makeCuriosityResponsive(element) {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.02)';
            element.style.filter = 'brightness(1.1)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
            element.style.filter = 'brightness(1)';
        });

        // Reward curiosity
        element.addEventListener('click', () => {
            this.createCuriosityReward(element);
        });
    }

    createCuriosityReward(element) {
        const reward = document.createElement('div');
        reward.textContent = '✨';
        reward.style.cssText = `
            position: absolute;
            font-size: 20px;
            pointer-events: none;
            z-index: 9999;
            animation: curiosityReward 1s ease-out forwards;
        `;

        const rect = element.getBoundingClientRect();
        reward.style.left = rect.left + rect.width/2 + 'px';
        reward.style.top = rect.top + 'px';

        document.body.appendChild(reward);
        setTimeout(() => reward.remove(), 1000);
    }

    unlockBasicWorldBuilding() {
        this.worldBuilding.unlocked = true;
        this.createWorldBuildingInterface();
        this.showMessage("Your world awaits...", 'world-building');
    }

    createWorldBuildingInterface() {
        const interface = document.createElement('div');
        interface.className = 'world-building-panel';
        interface.innerHTML = `
            <div class="world-toggle" onclick="window.childhoodWonder.toggleWorldPanel()">
                🏰
            </div>
            <div class="world-content">
                <h3>Your World</h3>
                <div class="world-stats">
                    <div>Wonder: ${Math.round(this.childlikeScore)}/100</div>
                    <div>Stage: ${this.getCurrentStage()}</div>
                </div>
                <div class="world-tools">
                    <button onclick="window.childhoodWonder.addToWorld('flower')">🌸 Plant</button>
                    <button onclick="window.childhoodWonder.addToWorld('star')">⭐ Star</button>
                    <button onclick="window.childhoodWonder.addToWorld('castle')">🏰 Build</button>
                </div>
                <div class="world-elements-list"></div>
            </div>
        `;

        interface.style.cssText = `
            position: fixed;
            top: 20px;
            right: -280px;
            width: 300px;
            background: rgba(20, 20, 40, 0.95);
            border: 1px solid rgba(255, 182, 193, 0.5);
            border-radius: 15px;
            z-index: 10000;
            transition: right 0.3s ease;
            backdrop-filter: blur(10px);
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        document.body.appendChild(interface);
        this.updateWorldDisplay();
    }

    toggleWorldPanel() {
        const panel = document.querySelector('.world-building-panel');
        const isOpen = panel.style.right === '20px';
        panel.style.right = isOpen ? '-280px' : '20px';
    }

    addToWorld(elementType) {
        const element = {
            type: elementType,
            id: Date.now(),
            x: Math.random() * 80 + 10, // 10-90% of screen
            y: Math.random() * 80 + 10,
            created: Date.now()
        };

        this.worldElements[element.id] = element;
        this.createWorldElement(element);
        this.updateWorldDisplay();
        this.increaseWonder(2, 'world_building');
        this.saveWonderState();
    }

    createWorldElement(element) {
        const visual = document.createElement('div');
        visual.className = `world-element world-${element.type}`;
        visual.innerHTML = this.getElementIcon(element.type);

        visual.style.cssText = `
            position: fixed;
            left: ${element.x}%;
            top: ${element.y}%;
            font-size: 24px;
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
            animation: elementAppear 1s ease-out forwards;
            filter: drop-shadow(0 0 10px rgba(255, 182, 193, 0.5));
        `;

        document.body.appendChild(visual);

        // Make element interactive after a delay
        setTimeout(() => {
            visual.style.pointerEvents = 'auto';
            visual.style.cursor = 'pointer';
            visual.addEventListener('click', () => {
                this.interactWithElement(element);
            });
        }, 1000);
    }

    getElementIcon(type) {
        const icons = {
            flower: '🌸',
            star: '⭐',
            castle: '🏰',
            tree: '🌳',
            rainbow: '🌈',
            butterfly: '🦋',
            moon: '🌙',
            cloud: '☁️'
        };
        return icons[type] || '✨';
    }

    interactWithElement(element) {
        // Elements respond to interaction
        const responses = {
            flower: 'The flower blooms brighter...',
            star: 'The star twinkles with joy...',
            castle: 'Your castle grows larger...',
            tree: 'New leaves unfurl...',
            rainbow: 'Colors dance in the air...'
        };

        const response = responses[element.type] || 'Magic happens...';
        this.showMessage(response, 'element-interaction');
        this.increaseWonder(1, 'element_interaction');
    }

    enableStoryChoices() {
        // Present meaningful choices that shape the user's story
        setInterval(() => {
            if (Math.random() < 0.1 && this.childlikeScore >= 75) {
                this.presentStoryChoice();
            }
        }, 120000); // Every 2 minutes
    }

    presentStoryChoice() {
        const choices = [
            {
                question: "A mysterious door appears. What do you do?",
                options: [
                    { text: "Open it immediately", trait: 'brave' },
                    { text: "Listen first", trait: 'wise' },
                    { text: "Decorate it beautifully", trait: 'creative' }
                ]
            },
            {
                question: "You find a sleeping dragon. Your choice?",
                options: [
                    { text: "Befriend the dragon", trait: 'kind' },
                    { text: "Guard its dreams", trait: 'protective' },
                    { text: "Paint its portrait", trait: 'artistic' }
                ]
            },
            {
                question: "A shooting star grants one wish. You wish for...",
                options: [
                    { text: "Adventure", trait: 'adventurous' },
                    { text: "Knowledge", trait: 'curious' },
                    { text: "Others' happiness", trait: 'caring' }
                ]
            }
        ];

        const choice = choices[Math.floor(Math.random() * choices.length)];
        this.showChoiceDialog(choice);
    }

    showChoiceDialog(choice) {
        const dialog = document.createElement('div');
        dialog.className = 'story-choice-dialog';
        dialog.innerHTML = `
            <div class="choice-content">
                <h3>Your Story Unfolds...</h3>
                <p class="choice-question">${choice.question}</p>
                <div class="choice-options">
                    ${choice.options.map((option, index) => `
                        <button class="choice-btn" onclick="window.childhoodWonder.makeChoice('${option.trait}', ${index}, this)">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        dialog.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(20, 20, 40, 0.95);
            border: 2px solid rgba(255, 182, 193, 0.8);
            border-radius: 20px;
            padding: 30px;
            z-index: 999999;
            backdrop-filter: blur(15px);
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            text-align: center;
            max-width: 500px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        `;

        document.body.appendChild(dialog);
        this.currentChoice = choice;
    }

    makeChoice(trait, index, button) {
        // Record the choice and its impact on the user's story
        this.userChoices.push({
            trait: trait,
            choice: this.currentChoice.options[index].text,
            timestamp: Date.now()
        });

        // Update personal story
        this.updatePersonalStory(trait);

        // Show choice result
        const result = this.getChoiceResult(trait);
        this.showMessage(result, 'story-choice');

        // Remove dialog
        const dialog = document.querySelector('.story-choice-dialog');
        if (dialog) dialog.remove();

        this.increaseWonder(3, 'story_choice');
        this.saveWonderState();
    }

    updatePersonalStory(trait) {
        if (!this.personalStory.traits) {
            this.personalStory.traits = {};
        }

        this.personalStory.traits[trait] = (this.personalStory.traits[trait] || 0) + 1;

        // Determine dominant traits
        const dominantTrait = Object.keys(this.personalStory.traits).reduce((a, b) =>
            this.personalStory.traits[a] > this.personalStory.traits[b] ? a : b
        );

        this.personalStory.dominantTrait = dominantTrait;
        this.personalStory.characterType = this.getCharacterType(dominantTrait);
    }

    getCharacterType(trait) {
        const types = {
            brave: 'The Bold Explorer',
            wise: 'The Thoughtful Sage',
            creative: 'The Imaginative Artist',
            kind: 'The Gentle Heart',
            protective: 'The Noble Guardian',
            artistic: 'The Inspired Creator',
            adventurous: 'The Fearless Wanderer',
            curious: 'The Knowledge Seeker',
            caring: 'The Compassionate Soul'
        };
        return types[trait] || 'The Unique Spirit';
    }

    getChoiceResult(trait) {
        const results = {
            brave: "Your courage lights the way forward!",
            wise: "Your wisdom reveals hidden truths!",
            creative: "Your imagination shapes reality!",
            kind: "Your kindness spreads magic everywhere!",
            protective: "Your protection creates safe havens!",
            artistic: "Your art brings beauty to the world!",
            adventurous: "Your spirit opens new horizons!",
            curious: "Your questions unlock mysteries!",
            caring: "Your love heals and transforms!"
        };
        return results[trait] || "Your choice weaves new magic!";
    }

    transformToWonderland() {
        // Complete visual transformation
        document.body.classList.add('wonderland-mode');

        // Add magical background elements
        this.createMagicalBackground();

        // Transform interface elements
        this.enchantInterface();

        // Unlock all creative tools
        this.unlockAllTools();
    }

    createMagicalBackground() {
        const background = document.createElement('div');
        background.className = 'magical-background';
        background.innerHTML = `
            <div class="floating-element" style="left: 10%; animation-delay: 0s;">🌙</div>
            <div class="floating-element" style="left: 30%; animation-delay: 2s;">⭐</div>
            <div class="floating-element" style="left: 50%; animation-delay: 4s;">🌸</div>
            <div class="floating-element" style="left: 70%; animation-delay: 6s;">🦋</div>
            <div class="floating-element" style="left: 90%; animation-delay: 8s;">✨</div>
        `;

        background.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;

        document.body.appendChild(background);
    }

    announceStageEvolution(stage) {
        const messages = {
            curious: "🌟 Curiosity awakens...",
            playful: "🎨 Wonder blossoms...",
            magical: "✨ Magic flows through everything...",
            childlike: "🌈 Welcome to your wonderland!"
        };

        this.showMessage(messages[stage], 'stage-evolution');
    }

    showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `wonder-message wonder-${type}`;
        message.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
            </div>
        `;

        message.style.cssText = `
            position: fixed;
            top: 50px;
            right: 20px;
            background: linear-gradient(135deg,
                rgba(255, 182, 193, 0.95),
                rgba(255, 105, 180, 0.95)
            );
            color: white;
            padding: 15px 20px;
            border-radius: 25px;
            z-index: 999999;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(255, 182, 193, 0.3);
            animation: wonderMessageSlide 0.5s ease-out;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'wonderMessageSlide 0.5s ease-in reverse';
            setTimeout(() => message.remove(), 500);
        }, 4000);
    }

    updateWorldDisplay() {
        const elementsList = document.querySelector('.world-elements-list');
        if (!elementsList) return;

        const elementCount = Object.keys(this.worldElements).length;
        elementsList.innerHTML = `
            <div class="world-summary">
                <div>Elements: ${elementCount}</div>
                <div>Story Choices: ${this.userChoices.length}</div>
                ${this.personalStory.characterType ?
                  `<div>You are: ${this.personalStory.characterType}</div>` : ''}
            </div>
        `;
    }

    // State management
    loadWonderState() {
        const stored = localStorage.getItem('terrellflautt_childhood_wonder');
        return stored ? JSON.parse(stored) : {};
    }

    saveWonderState() {
        const state = {
            childlikeScore: this.childlikeScore,
            playfulInteractions: this.playfulInteractions,
            worldElements: this.worldElements,
            userChoices: this.userChoices,
            personalStory: this.personalStory,
            lastStage: this.wonderState.lastStage,
            wonderMoments: this.wonderState.wonderMoments || [],
            lastSave: Date.now()
        };

        localStorage.setItem('terrellflautt_childhood_wonder', JSON.stringify(state));
        this.wonderState = state;
    }

    // Public methods for integration
    getWonderLevel() {
        return this.childlikeScore;
    }

    getPersonalStory() {
        return this.personalStory;
    }

    getUserChoices() {
        return this.userChoices;
    }
}

// CSS for childhood wonder evolution
const wonderStyles = document.createElement('style');
wonderStyles.textContent = `
    .wonderland-mode {
        background: linear-gradient(45deg,
            rgba(255, 182, 193, 0.1),
            rgba(135, 206, 250, 0.1),
            rgba(255, 255, 224, 0.1)
        );
        transition: all 2s ease;
    }

    .floating-element {
        position: absolute;
        font-size: 24px;
        animation: wonderFloat 10s ease-in-out infinite;
        opacity: 0.6;
    }

    @keyframes wonderFloat {
        0%, 100% {
            transform: translateY(100vh) rotate(0deg);
        }
        50% {
            transform: translateY(-100px) rotate(180deg);
        }
    }

    @keyframes curiosityReward {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(1.5);
            opacity: 0;
        }
    }

    @keyframes elementAppear {
        0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }

    @keyframes wonderMessageSlide {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .world-building-panel {
        box-shadow: 0 10px 30px rgba(255, 182, 193, 0.3);
    }

    .world-toggle {
        position: absolute;
        left: -50px;
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        background: rgba(255, 182, 193, 0.8);
        border: none;
        border-radius: 10px 0 0 10px;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        transition: all 0.3s ease;
    }

    .world-toggle:hover {
        background: rgba(255, 182, 193, 1);
        transform: translateY(-50%) scale(1.1);
    }

    .world-content {
        padding: 20px;
    }

    .world-content h3 {
        margin: 0 0 15px 0;
        color: rgba(255, 182, 193, 1);
        text-align: center;
    }

    .world-stats {
        background: rgba(255, 182, 193, 0.1);
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 15px;
        font-size: 0.9em;
    }

    .world-tools {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 15px;
    }

    .world-tools button {
        padding: 8px 12px;
        background: rgba(255, 182, 193, 0.3);
        border: 1px solid rgba(255, 182, 193, 0.5);
        color: white;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.8em;
    }

    .world-tools button:hover {
        background: rgba(255, 182, 193, 0.5);
        transform: scale(1.05);
    }

    .story-choice-dialog h3 {
        color: rgba(255, 182, 193, 1);
        margin-bottom: 20px;
    }

    .choice-question {
        font-size: 1.1em;
        margin-bottom: 25px;
        line-height: 1.5;
    }

    .choice-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .choice-btn {
        padding: 12px 20px;
        background: rgba(255, 182, 193, 0.3);
        border: 1px solid rgba(255, 182, 193, 0.5);
        color: white;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1em;
    }

    .choice-btn:hover {
        background: rgba(255, 182, 193, 0.5);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 182, 193, 0.3);
    }

    .world-summary {
        background: rgba(255, 182, 193, 0.1);
        padding: 10px;
        border-radius: 8px;
        font-size: 0.85em;
        line-height: 1.4;
    }
`;
document.head.appendChild(wonderStyles);

// Initialize childhood wonder evolution
window.childhoodWonder = new ChildhoodWonderEvolution();

// Integration with existing systems
if (window.magicUser) {
    window.magicUser.childhoodWonder = window.childhoodWonder;
}

console.log('🌈 Childhood Wonder Evolution: Where grown-ups become kids again...');