/**
 * Memory Palace System
 * Remembers everything about the user's journey - stores privately in DynamoDB
 */

class MemoryPalace {
    constructor() {
        this.userId = this.getUserId();
        this.sessionId = this.generateSessionId();
        this.visitMemory = new Map();
        this.interactionMemory = new Map();
        this.gazePatterns = [];
        this.emotionalState = {};
        this.preferences = {};
        this.apiUrl = 'https://api.terrellflautt.com';

        this.init();
    }

    init() {
        this.loadExistingMemory();
        this.startGazeTracking();
        this.startInteractionMemory();
        this.startEmotionalInference();
        this.startPreferenceTracking();
        this.startMemoryPersistence();
        this.applyMemoryEffects();
    }

    getUserId() {
        let userId = localStorage.getItem('terrellflautt_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('terrellflautt_user_id', userId);
        }
        return userId;
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }

    async loadExistingMemory() {
        try {
            const response = await fetch(`${this.apiUrl}/tracking/${this.userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                this.processStoredMemory(data);
            }
        } catch (error) {
            console.debug('Memory palace: Starting fresh journey');
        }
    }

    processStoredMemory(data) {
        // Process previously stored user behavior patterns
        if (data.gazePatterns) {
            this.gazePatterns = data.gazePatterns.slice(-100); // Keep last 100 patterns
        }

        if (data.preferences) {
            this.preferences = data.preferences;
        }

        if (data.emotionalState) {
            this.emotionalState = data.emotionalState;
        }

        // Apply memory-based visual effects
        this.applyMemoryEffects();
    }

    startGazeTracking() {
        let mouseTrail = [];
        let lastGazeRecord = Date.now();

        document.addEventListener('mousemove', (e) => {
            mouseTrail.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now(),
                element: this.getElementPath(e.target)
            });

            // Limit trail size
            if (mouseTrail.length > 50) {
                mouseTrail.shift();
            }

            // Record gaze patterns every 2 seconds
            if (Date.now() - lastGazeRecord > 2000) {
                this.recordGazePattern(mouseTrail);
                lastGazeRecord = Date.now();
            }
        }, { passive: true });

        // Track scroll behavior
        let scrollMemory = [];
        document.addEventListener('scroll', () => {
            scrollMemory.push({
                scrollY: window.scrollY,
                timestamp: Date.now()
            });

            if (scrollMemory.length > 20) {
                scrollMemory.shift();
            }
        }, { passive: true });

        // Store scroll patterns
        setInterval(() => {
            if (scrollMemory.length > 0) {
                this.recordScrollPattern(scrollMemory);
                scrollMemory = [];
            }
        }, 10000);
    }

    getElementPath(element) {
        if (!element || element === document) return '';

        const path = [];
        while (element && element !== document.body) {
            let selector = element.tagName.toLowerCase();

            if (element.id) {
                selector += '#' + element.id;
            } else if (element.className) {
                // Handle both string and SVGAnimatedString className
                const className = typeof element.className === 'string'
                    ? element.className
                    : element.className.baseVal || element.className.animVal || '';

                if (className && className.split) {
                    const firstClass = className.split(' ')[0];
                    if (firstClass) {
                        selector += '.' + firstClass;
                    }
                }
            }

            path.unshift(selector);
            element = element.parentElement;
        }

        return path.join(' > ');
    }

    recordGazePattern(trail) {
        if (trail.length < 3) return;

        const pattern = {
            duration: trail[trail.length - 1].timestamp - trail[0].timestamp,
            path: trail.map(point => ({
                x: Math.round(point.x / 50) * 50, // Discretize for privacy
                y: Math.round(point.y / 50) * 50,
                element: point.element
            })),
            variance: this.calculateMovementVariance(trail),
            focusElements: this.identifyFocusAreas(trail)
        };

        this.gazePatterns.push(pattern);

        // Limit stored patterns
        if (this.gazePatterns.length > 200) {
            this.gazePatterns.shift();
        }
    }

    calculateMovementVariance(trail) {
        if (trail.length < 2) return 0;

        let totalMovement = 0;
        for (let i = 1; i < trail.length; i++) {
            const dx = trail[i].x - trail[i-1].x;
            const dy = trail[i].y - trail[i-1].y;
            totalMovement += Math.sqrt(dx * dx + dy * dy);
        }

        return totalMovement / trail.length;
    }

    identifyFocusAreas(trail) {
        // Identify elements where user spent most time
        const elementTime = {};

        trail.forEach(point => {
            if (point.element) {
                elementTime[point.element] = (elementTime[point.element] || 0) + 1;
            }
        });

        return Object.entries(elementTime)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([element]) => element);
    }

    recordScrollPattern(scrollData) {
        const pattern = {
            startPosition: scrollData[0].scrollY,
            endPosition: scrollData[scrollData.length - 1].scrollY,
            duration: scrollData[scrollData.length - 1].timestamp - scrollData[0].timestamp,
            velocity: this.calculateScrollVelocity(scrollData),
            timestamp: Date.now()
        };

        // Store in interaction memory
        this.interactionMemory.set(`scroll_${Date.now()}`, pattern);
    }

    calculateScrollVelocity(scrollData) {
        if (scrollData.length < 2) return 0;

        let totalDistance = 0;
        let totalTime = 0;

        for (let i = 1; i < scrollData.length; i++) {
            totalDistance += Math.abs(scrollData[i].scrollY - scrollData[i-1].scrollY);
            totalTime += scrollData[i].timestamp - scrollData[i-1].timestamp;
        }

        return totalTime > 0 ? totalDistance / totalTime : 0;
    }

    startInteractionMemory() {
        // Remember every click with context
        document.addEventListener('click', (e) => {
            this.recordInteraction('click', {
                element: this.getElementPath(e.target),
                coordinates: { x: e.clientX, y: e.clientY },
                timestamp: Date.now(),
                context: this.getCurrentContext()
            });
        });

        // Remember text selections
        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            if (selection.toString().length > 3) {
                this.recordInteraction('text_selection', {
                    text: selection.toString().substring(0, 100), // First 100 chars
                    timestamp: Date.now()
                });
            }
        });

        // Remember form interactions
        document.addEventListener('input', (e) => {
            if (e.target.type !== 'password') { // Never track passwords
                this.recordInteraction('form_input', {
                    field: e.target.name || e.target.id,
                    fieldType: e.target.type,
                    timestamp: Date.now()
                });
            }
        });

        // Remember hover patterns
        let hoverStart = null;
        document.addEventListener('mouseenter', (e) => {
            hoverStart = Date.now();
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (hoverStart) {
                const hoverDuration = Date.now() - hoverStart;
                if (hoverDuration > 1000) { // Only track meaningful hovers
                    this.recordInteraction('hover', {
                        element: this.getElementPath(e.target),
                        duration: hoverDuration,
                        timestamp: Date.now()
                    });
                }
            }
        }, true);
    }

    recordInteraction(type, data) {
        const interactionId = `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

        this.interactionMemory.set(interactionId, {
            type,
            ...data,
            sessionId: this.sessionId
        });

        // Limit memory size
        if (this.interactionMemory.size > 500) {
            const firstKey = this.interactionMemory.keys().next().value;
            this.interactionMemory.delete(firstKey);
        }

        // Update emotional state based on interaction
        this.updateEmotionalInference(type, data);
    }

    getCurrentContext() {
        return {
            scrollPosition: window.scrollY,
            timeOnPage: Date.now() - performance.timing.navigationStart,
            viewportSize: { width: window.innerWidth, height: window.innerHeight },
            pageSection: this.getCurrentSection()
        };
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id], div[id]');
        let currentSection = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section.id || section.className;
            }
        });

        return currentSection;
    }

    startEmotionalInference() {
        // Infer emotional state from behavior patterns
        setInterval(() => {
            this.analyzeEmotionalState();
        }, 30000); // Every 30 seconds
    }

    analyzeEmotionalState() {
        const recentInteractions = Array.from(this.interactionMemory.values())
            .filter(interaction => Date.now() - interaction.timestamp < 60000); // Last minute

        if (recentInteractions.length === 0) return;

        // Analyze interaction patterns
        const clickFrequency = recentInteractions.filter(i => i.type === 'click').length;
        const hoverDurations = recentInteractions
            .filter(i => i.type === 'hover')
            .map(i => i.duration);

        const avgHoverDuration = hoverDurations.length > 0
            ? hoverDurations.reduce((a, b) => a + b, 0) / hoverDurations.length
            : 0;

        // Infer emotional state
        let newState = {};

        if (clickFrequency > 10) {
            newState.energy = 'high';
        } else if (clickFrequency < 2) {
            newState.energy = 'contemplative';
        } else {
            newState.energy = 'moderate';
        }

        if (avgHoverDuration > 3000) {
            newState.curiosity = 'high';
        } else if (avgHoverDuration > 1500) {
            newState.curiosity = 'moderate';
        } else {
            newState.curiosity = 'low';
        }

        // Update emotional state
        this.emotionalState = {
            ...this.emotionalState,
            ...newState,
            lastUpdated: Date.now()
        };
    }

    updateEmotionalInference(interactionType, data) {
        // Real-time emotional updates based on specific interactions
        switch (interactionType) {
            case 'hover':
                if (data.duration > 5000) {
                    this.emotionalState.patience = 'high';
                }
                break;
            case 'click':
                if (data.element.includes('project') || data.element.includes('logo')) {
                    this.emotionalState.interest = 'creative';
                }
                break;
            case 'text_selection':
                this.emotionalState.engagement = 'reading';
                break;
        }
    }

    startPreferenceTracking() {
        // Track user preferences based on behavior
        const preferenceTracker = () => {
            // Color preferences (based on time spent in sections)
            const sectionTimes = this.calculateSectionPreferences();

            // Interaction style preferences
            const interactionStyle = this.analyzeInteractionStyle();

            // Content preferences
            const contentPreferences = this.analyzeContentPreferences();

            this.preferences = {
                ...this.preferences,
                sections: sectionTimes,
                interactionStyle,
                content: contentPreferences,
                lastUpdated: Date.now()
            };
        };

        setInterval(preferenceTracker, 60000); // Every minute
    }

    calculateSectionPreferences() {
        // Analyze which sections user spends most time in
        const sectionMetrics = {};

        this.gazePatterns.forEach(pattern => {
            pattern.focusElements.forEach(element => {
                const section = this.extractSection(element);
                if (section) {
                    sectionMetrics[section] = (sectionMetrics[section] || 0) + pattern.duration;
                }
            });
        });

        return sectionMetrics;
    }

    extractSection(elementPath) {
        if (elementPath.includes('hero')) return 'hero';
        if (elementPath.includes('about')) return 'about';
        if (elementPath.includes('project')) return 'projects';
        if (elementPath.includes('contact')) return 'contact';
        return 'unknown';
    }

    analyzeInteractionStyle() {
        const interactions = Array.from(this.interactionMemory.values());
        const clickCount = interactions.filter(i => i.type === 'click').length;
        const hoverCount = interactions.filter(i => i.type === 'hover').length;

        if (hoverCount > clickCount * 2) return 'explorer';
        if (clickCount > hoverCount) return 'direct';
        return 'balanced';
    }

    analyzeContentPreferences() {
        const selectedTexts = Array.from(this.interactionMemory.values())
            .filter(i => i.type === 'text_selection')
            .map(i => i.text);

        // Simple keyword analysis
        const keywords = {};
        selectedTexts.forEach(text => {
            text.toLowerCase().split(/\s+/).forEach(word => {
                if (word.length > 4) {
                    keywords[word] = (keywords[word] || 0) + 1;
                }
            });
        });

        return keywords;
    }

    applyMemoryEffects() {
        // Apply visual effects based on stored memory
        this.applyVisitedElementEffects();
        this.applyPersonalizedHints();
        this.applyPreferenceBasedStyling();
    }

    applyVisitedElementEffects() {
        // Elements that user has interacted with before get subtle memory glows
        this.interactionMemory.forEach(interaction => {
            if (interaction.type === 'click' && interaction.element) {
                try {
                    const element = document.querySelector(this.convertPathToSelector(interaction.element));
                    if (element) {
                        element.classList.add('memory-touched');
                        element.style.opacity = '0.95'; // Slightly transparent
                    }
                } catch (e) {
                    // Ignore selector errors
                }
            }
        });
    }

    convertPathToSelector(path) {
        // Convert element path back to CSS selector (simplified)
        return path.split(' > ').pop() || path;
    }

    applyPersonalizedHints() {
        // Show different hints based on user's previous behavior
        if (this.emotionalState.curiosity === 'high') {
            document.body.classList.add('curious-user');
        }

        if (this.preferences.interactionStyle === 'explorer') {
            document.body.classList.add('explorer-user');
        }
    }

    applyPreferenceBasedStyling() {
        // Subtly adjust the site based on user preferences
        if (this.preferences.sections?.projects > this.preferences.sections?.about) {
            // User prefers projects section
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                projectsSection.style.transform = 'scale(1.002)'; // Microscopic emphasis
            }
        }
    }

    startMemoryPersistence() {
        // Save memory to DynamoDB periodically
        setInterval(() => {
            this.syncMemoryToDynamoDB();
        }, 30000); // Every 30 seconds

        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.syncMemoryToDynamoDB();
        });

        // Save on visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.syncMemoryToDynamoDB();
            }
        });
    }

    async syncMemoryToDynamoDB() {
        try {
            const memoryData = {
                userId: this.userId,
                sessionId: this.sessionId,
                timestamp: Date.now(),
                gazePatterns: this.gazePatterns.slice(-50), // Last 50 patterns
                interactions: Array.from(this.interactionMemory.entries()).slice(-100), // Last 100 interactions
                emotionalState: this.emotionalState,
                preferences: this.preferences,
                metrics: {
                    timeOnPage: Date.now() - performance.timing.navigationStart,
                    totalInteractions: this.interactionMemory.size,
                    totalGazePatterns: this.gazePatterns.length
                }
            };

            const response = await fetch(`${this.apiUrl}/tracking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(memoryData)
            });

            if (response.ok) {
                console.debug('Memory palace: Memories preserved');
            }
        } catch (error) {
            console.debug('Memory palace: Storing locally');
            // Fallback to local storage
            localStorage.setItem('memory_palace_backup', JSON.stringify({
                gazePatterns: this.gazePatterns.slice(-20),
                preferences: this.preferences,
                emotionalState: this.emotionalState
            }));
        }
    }

    // Public methods for integration with other systems
    getEmotionalState() {
        return this.emotionalState;
    }

    getPreferences() {
        return this.preferences;
    }

    getAttentionHeatmap() {
        // Return areas where user has focused most
        const heatmap = {};
        this.gazePatterns.forEach(pattern => {
            pattern.focusElements.forEach(element => {
                heatmap[element] = (heatmap[element] || 0) + pattern.duration;
            });
        });
        return heatmap;
    }

    hasVisitedElement(selector) {
        // Check if user has interacted with a specific element
        return Array.from(this.interactionMemory.values())
            .some(interaction => interaction.element && interaction.element.includes(selector));
    }

    getInteractionCount(type = null) {
        if (type) {
            return Array.from(this.interactionMemory.values())
                .filter(interaction => interaction.type === type).length;
        }
        return this.interactionMemory.size;
    }

    // Missing method that quantum-canvas.js is trying to call
    getUserState() {
        return {
            emotionalState: this.emotionalState,
            preferences: this.preferences,
            visitMemory: Array.from(this.visitMemory.entries()),
            interactionMemory: Array.from(this.interactionMemory.entries()),
            userId: this.userId,
            sessionId: this.sessionId
        };
    }

    /**
     * Record user action - called by other features
     * @param {string} actionType - Type of action (e.g., 'logo_evolution', 'easter_egg_found')
     * @param {object} data - Additional data about the action
     */
    recordUserAction(actionType, data = {}) {
        const actionId = `${actionType}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

        const action = {
            type: actionType,
            timestamp: Date.now(),
            sessionId: this.sessionId,
            ...data
        };

        // Store in interaction memory
        this.interactionMemory.set(actionId, action);

        // Log for debugging
        console.log(`📝 Memory Palace: Recorded action "${actionType}"`, data);

        // Update emotional state based on action
        this.updateEmotionalStateFromAction(actionType, data);

        // Limit memory size
        if (this.interactionMemory.size > 500) {
            const firstKey = this.interactionMemory.keys().next().value;
            this.interactionMemory.delete(firstKey);
        }

        return actionId;
    }

    /**
     * Update emotional state based on user actions
     */
    updateEmotionalStateFromAction(actionType, data) {
        // Increment curiosity for discoveries
        if (actionType.includes('discover') || actionType.includes('evolution')) {
            this.emotionalState.curiosity = (this.emotionalState.curiosity || 0) + 0.1;
        }

        // Increment engagement for interactions
        if (actionType.includes('click') || actionType.includes('unlock')) {
            this.emotionalState.engagement = (this.emotionalState.engagement || 0) + 0.05;
        }

        // Cap values at 1.0
        Object.keys(this.emotionalState).forEach(key => {
            if (this.emotionalState[key] > 1) {
                this.emotionalState[key] = 1;
            }
        });
    }
}

// Initialize Memory Palace
window.memoryPalace = new MemoryPalace();

// Add CSS for memory effects
const memoryStyles = document.createElement('style');
memoryStyles.textContent = `
    .memory-touched {
        position: relative;
    }

    .memory-touched::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, transparent, rgba(102, 126, 234, 0.1), transparent);
        border-radius: 4px;
        z-index: -1;
        opacity: 0.3;
    }

    .curious-user .nav-link:hover {
        transform: scale(1.05);
        transition: transform 0.2s ease;
    }

    .explorer-user [data-hidden-interactive] {
        opacity: 0.8 !important;
    }
`;
document.head.appendChild(memoryStyles);

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MemoryPalace;
}