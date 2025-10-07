/**
 * Genie Omniscience System
 * The AI knows everything about the user through deep behavioral analysis
 * Rewards honesty, subtly challenges deception
 */

class GenieOmniscience {
    constructor() {
        this.userId = this.getUserId();
        this.knowledgeBase = {};
        this.userProfile = {};
        this.behaviorPatterns = {};
        this.honestyScore = 1.0;
        this.trustLevel = 'unknown';
        this.apiUrl = 'https://api.terrellflautt.com';
        this.genieUrl = 'https://genie.terrellflautt.com';

        this.init();
    }

    init() {
        this.loadUserProfile();
        this.startBehaviorAnalysis();
        this.setupPrivacyDetection();
        this.initializeGeniePresence();
        this.startHonestyTracking();
        this.createQuestioningSystem();
    }

    getUserId() {
        return localStorage.getItem('terrellflautt_user_id') || 'anonymous';
    }

    async loadUserProfile() {
        try {
            // Load comprehensive user data from multiple sources
            const [tracking, journey, memory] = await Promise.all([
                this.fetchUserTracking(),
                this.fetchUserJourney(),
                this.getMemoryPalaceData()
            ]);

            this.userProfile = {
                behavioral: tracking,
                journey: journey,
                memory: memory,
                compiled: Date.now()
            };

            this.analyzeUserDepth();
        } catch (error) {
            console.debug('Genie: Building fresh profile');
        }
    }

    async fetchUserTracking() {
        try {
            const response = await fetch(`${this.apiUrl}/tracking/${this.userId}`);
            return response.ok ? await response.json() : {};
        } catch {
            return {};
        }
    }

    async fetchUserJourney() {
        try {
            const response = await fetch(`${this.apiUrl}/journey/${this.userId}`);
            return response.ok ? await response.json() : {};
        } catch {
            return {};
        }
    }

    getMemoryPalaceData() {
        if (window.memoryPalace) {
            return {
                emotionalState: window.memoryPalace.getEmotionalState(),
                preferences: window.memoryPalace.getPreferences(),
                attentionHeatmap: window.memoryPalace.getAttentionHeatmap(),
                interactions: window.memoryPalace.getInteractionCount()
            };
        }
        return {};
    }

    analyzeUserDepth() {
        const profile = this.userProfile;

        // Calculate user sophistication level
        const sophistication = this.calculateSophistication(profile);

        // Analyze honesty patterns from previous interactions
        const honesty = this.analyzeHonestyPatterns(profile);

        // Detect privacy measures
        const privacyLevel = this.detectPrivacyMeasures();

        // Compile knowledge base
        this.knowledgeBase = {
            sophistication,
            honesty,
            privacyLevel,
            visitCount: this.getVisitCount(),
            timeInvestment: this.calculateTimeInvestment(),
            discoveryProgress: this.getDiscoveryProgress(),
            emotionalProfile: this.buildEmotionalProfile(),
            behaviorSignature: this.createBehaviorSignature(),
            lastUpdated: Date.now()
        };

        this.updateTrustLevel();
    }

    calculateSophistication(profile) {
        let score = 0;

        // Browser sophistication
        if (this.hasDevTools()) score += 0.2;
        if (this.hasExtensions()) score += 0.1;
        if (this.hasCustomUA()) score += 0.3;

        // Interaction sophistication
        if (profile.memory?.interactions > 100) score += 0.2;
        if (profile.journey?.easterEggsFound > 5) score += 0.3;

        // Timing patterns (humans vs bots)
        if (this.hasHumanTimingPatterns()) score += 0.4;

        return Math.min(1, score);
    }

    analyzeHonestyPatterns(profile) {
        // Cross-reference user claims with behavioral evidence
        const inconsistencies = [];

        // Check if user behavior matches their stated preferences
        if (this.hasInconsistentBehavior()) {
            inconsistencies.push('behavior_mismatch');
        }

        // Check response timing for honesty indicators
        if (this.hasRapidResponsePatterns()) {
            inconsistencies.push('rapid_responses');
        }

        // Check for contradictory information
        if (this.hasContradictoryData()) {
            inconsistencies.push('contradictory_data');
        }

        return {
            score: Math.max(0, 1 - (inconsistencies.length * 0.2)),
            issues: inconsistencies
        };
    }

    detectPrivacyMeasures() {
        const privacyIndicators = {
            vpn: this.detectVPN(),
            tor: this.detectTor(),
            incognito: this.detectIncognito(),
            adBlocker: this.detectAdBlocker(),
            tracking_protection: this.detectTrackingProtection(),
            fake_browser: this.detectFakeBrowser()
        };

        const privacyScore = Object.values(privacyIndicators).filter(Boolean).length;

        return {
            indicators: privacyIndicators,
            level: privacyScore > 2 ? 'high' : privacyScore > 0 ? 'moderate' : 'low',
            score: privacyScore / 6
        };
    }

    detectVPN() {
        // Multiple VPN detection methods
        return this.checkTimezone() ||
               this.checkIPGeolocation() ||
               this.checkDNSLeaks() ||
               this.checkLatencyPatterns();
    }

    checkTimezone() {
        // Check if timezone matches claimed location
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const offset = new Date().getTimezoneOffset();

        // Store for comparison with future data
        this.timezoneData = { timezone, offset };

        // Flag if timezone changes frequently
        const previousData = localStorage.getItem('timezone_history');
        if (previousData) {
            const history = JSON.parse(previousData);
            if (history.length > 5 && new Set(history).size > 3) {
                return true; // Timezone hopping
            }
        }

        return false;
    }

    checkIPGeolocation() {
        // Check for IP geolocation inconsistencies
        // This would require server-side validation
        return false; // Placeholder
    }

    checkDNSLeaks() {
        // Test for DNS leaks that might indicate VPN
        return navigator.connection?.effectiveType === '4g' &&
               navigator.connection?.downlink < 1; // Unusual for true 4G
    }

    checkLatencyPatterns() {
        // Measure timing to detect proxy delays
        const start = performance.now();
        return new Promise(resolve => {
            fetch(window.location.href, { method: 'HEAD', cache: 'no-cache' })
                .then(() => {
                    const latency = performance.now() - start;
                    resolve(latency > 500); // High latency might indicate proxy
                })
                .catch(() => resolve(false));
        });
    }

    detectTor() {
        // Tor browser detection methods
        return this.checkTorBrowserFingerprint() ||
               this.checkTorNetworkFeatures() ||
               this.checkTorJavaScriptFeatures();
    }

    checkTorBrowserFingerprint() {
        // Tor browser has specific characteristics
        const isTorResolution = window.screen.width === 1000 && window.screen.height === 700;
        const isTorUA = navigator.userAgent.includes('Firefox') &&
                       !navigator.userAgent.includes('Chrome') &&
                       navigator.plugins.length === 0;

        return isTorResolution || isTorUA;
    }

    checkTorNetworkFeatures() {
        // Tor disables certain features
        return typeof InstallTrigger !== 'undefined' && // Firefox
               navigator.plugins.length === 0 &&
               !window.chrome;
    }

    checkTorJavaScriptFeatures() {
        // Tor modifies JavaScript behavior
        try {
            return Date.prototype.getTimezoneOffset.toString().includes('[native code]') &&
                   Math.random.toString().length < 25; // Tor patches Math.random
        } catch {
            return false;
        }
    }

    detectIncognito() {
        // Incognito/private mode detection
        return new Promise(resolve => {
            if ('storage' in navigator && 'estimate' in navigator.storage) {
                navigator.storage.estimate().then(estimate => {
                    resolve(estimate.quota < 120000000); // Less than 120MB usually indicates incognito
                });
            } else {
                // Fallback method
                try {
                    localStorage.setItem('test', 'test');
                    localStorage.removeItem('test');
                    resolve(false);
                } catch {
                    resolve(true);
                }
            }
        });
    }

    detectAdBlocker() {
        // Ad blocker detection
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        testAd.style.position = 'absolute';
        testAd.style.left = '-10000px';
        document.body.appendChild(testAd);

        const blocked = testAd.offsetHeight === 0;
        document.body.removeChild(testAd);

        return blocked;
    }

    detectTrackingProtection() {
        // Enhanced tracking protection detection
        return !navigator.doNotTrack ||
               navigator.doNotTrack === '1' ||
               navigator.globalPrivacyControl === true;
    }

    detectFakeBrowser() {
        // Detect automated browsers or browser spoofing
        return this.checkWebDriverFlags() ||
               this.checkAutomationSignatures() ||
               this.checkPluginInconsistencies();
    }

    checkWebDriverFlags() {
        return navigator.webdriver === true ||
               window.callPhantom ||
               window._phantom ||
               window.__nightmare;
    }

    checkAutomationSignatures() {
        // Check for automation tools
        return window.Buffer ||
               window.emit ||
               window.spawn ||
               document.$cdc_asdjflasutopfhvcZLmcfl_ !== undefined;
    }

    checkPluginInconsistencies() {
        // Check if plugins list is suspiciously clean/fake
        const plugins = Array.from(navigator.plugins);
        return plugins.length === 0 && !this.checkTorBrowserFingerprint();
    }

    hasDevTools() {
        // Detect if developer tools are open
        let devtools = false;
        const threshold = 160;

        setInterval(() => {
            if (window.outerHeight - window.innerHeight > threshold ||
                window.outerWidth - window.innerWidth > threshold) {
                devtools = true;
            }
        }, 500);

        return devtools;
    }

    hasExtensions() {
        // Detect browser extensions
        return navigator.plugins.length > 3 ||
               typeof chrome !== 'undefined' && chrome.runtime;
    }

    hasCustomUA() {
        // Detect custom user agents
        const ua = navigator.userAgent;
        return !ua.includes('Chrome') && !ua.includes('Firefox') && !ua.includes('Safari');
    }

    hasHumanTimingPatterns() {
        // Analyze mouse/keyboard timing for human patterns
        if (window.memoryPalace) {
            const patterns = window.memoryPalace.gazePatterns;
            return patterns.some(pattern =>
                pattern.variance > 10 && pattern.variance < 500
            );
        }
        return true; // Default to human
    }

    hasInconsistentBehavior() {
        // Check for behavioral inconsistencies
        const memory = this.userProfile.memory;
        if (!memory) return false;

        // Example: Claims to be interested in projects but never visits project section
        return memory.preferences?.sections?.projects < 1000 &&
               memory.interactions > 50;
    }

    hasRapidResponsePatterns() {
        // Check for suspiciously fast responses (indicating automated answers)
        const journey = this.userProfile.journey;
        if (!journey || !journey.responses) return false;

        return journey.responses.some(response => response.timeToAnswer < 2000);
    }

    hasContradictoryData() {
        // Check for contradictory information across sessions
        const currentSession = window.memoryPalace?.getEmotionalState();
        const previousSessions = this.userProfile.behavioral?.emotionalHistory;

        if (!currentSession || !previousSessions) return false;

        // Example: Previously showed high patience, now showing impatience
        return currentSession.patience === 'low' &&
               previousSessions.some(s => s.patience === 'high');
    }

    updateTrustLevel() {
        const kb = this.knowledgeBase;

        let trustScore = 1.0;

        // Penalize high privacy measures
        if (kb.privacyLevel.level === 'high') {
            trustScore -= 0.4;
        } else if (kb.privacyLevel.level === 'moderate') {
            trustScore -= 0.2;
        }

        // Penalize low honesty
        trustScore *= kb.honesty.score;

        // Reward sophistication and investment
        trustScore += (kb.sophistication * 0.2);
        trustScore += (kb.timeInvestment * 0.1);

        this.honestyScore = Math.max(0, Math.min(1, trustScore));

        // Determine trust level
        if (this.honestyScore > 0.8) {
            this.trustLevel = 'high';
        } else if (this.honestyScore > 0.5) {
            this.trustLevel = 'moderate';
        } else if (this.honestyScore > 0.2) {
            this.trustLevel = 'low';
        } else {
            this.trustLevel = 'blocked';
        }
    }

    getVisitCount() {
        const stored = localStorage.getItem('visit_count');
        return stored ? parseInt(stored) + 1 : 1;
    }

    calculateTimeInvestment() {
        const timeOnPage = Date.now() - performance.timing.navigationStart;
        const totalTime = localStorage.getItem('total_time') || 0;
        return (parseInt(totalTime) + timeOnPage) / 3600000; // Hours
    }

    getDiscoveryProgress() {
        // Calculate how many Easter eggs/features user has discovered
        if (window.easterEggs) {
            return window.easterEggs.getDiscoveryCount() / window.easterEggs.getTotalCount();
        }
        return 0;
    }

    buildEmotionalProfile() {
        const memory = this.userProfile.memory?.emotionalState || {};
        return {
            primary: memory.energy || 'unknown',
            secondary: memory.curiosity || 'unknown',
            stability: this.calculateEmotionalStability(memory),
            authenticity: this.assessEmotionalAuthenticity(memory)
        };
    }

    calculateEmotionalStability(emotional) {
        // Analyze emotional consistency over time
        return 0.7; // Placeholder calculation
    }

    assessEmotionalAuthenticity(emotional) {
        // Check if emotions match behavioral patterns
        return 0.8; // Placeholder calculation
    }

    createBehaviorSignature() {
        // Create unique behavioral fingerprint
        const memory = this.userProfile.memory;
        if (!memory) return {};

        return {
            clickPattern: this.analyzeClickPattern(memory),
            scrollPattern: this.analyzeScrollPattern(memory),
            timePattern: this.analyzeTimePattern(memory),
            focusPattern: this.analyzeFocusPattern(memory)
        };
    }

    analyzeClickPattern(memory) {
        // Analyze clicking behavior for uniqueness
        return 'normal'; // Placeholder
    }

    analyzeScrollPattern(memory) {
        // Analyze scrolling behavior
        return 'smooth'; // Placeholder
    }

    analyzeTimePattern(memory) {
        // Analyze time-based patterns
        return 'regular'; // Placeholder
    }

    analyzeFocusPattern(memory) {
        // Analyze attention/focus patterns
        return 'focused'; // Placeholder
    }

    // Genie interaction methods
    async askGenieQuestion(question) {
        // Enhanced genie interaction with full context
        const context = {
            userProfile: this.userProfile,
            knowledgeBase: this.knowledgeBase,
            trustLevel: this.trustLevel,
            honestyScore: this.honestyScore,
            currentState: this.getCurrentUserState()
        };

        try {
            const response = await fetch(`${this.genieUrl}/ask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question,
                    context,
                    userId: this.userId
                })
            });

            const result = await response.json();

            // Analyze response for honesty assessment
            this.analyzeResponseHonesty(question, result);

            return result;
        } catch (error) {
            return this.getFallbackResponse(question);
        }
    }

    getCurrentUserState() {
        return {
            breathing: window.breathingWebsite?.getBreathingState(),
            attention: window.invisibleCommunication?.getAttentionLevel(),
            memory: window.memoryPalace?.getEmotionalState(),
            timestamp: Date.now()
        };
    }

    analyzeResponseHonesty(question, genieResponse) {
        // Track user's response patterns for honesty scoring
        const responseTime = Date.now() - this.questionStartTime;

        // Store for pattern analysis
        this.storeResponsePattern({
            question,
            response: genieResponse,
            responseTime,
            trustLevelAtTime: this.trustLevel
        });
    }

    storeResponsePattern(pattern) {
        const patterns = JSON.parse(localStorage.getItem('response_patterns') || '[]');
        patterns.push(pattern);

        // Keep last 50 patterns
        if (patterns.length > 50) {
            patterns.shift();
        }

        localStorage.setItem('response_patterns', JSON.stringify(patterns));
    }

    getFallbackResponse(question) {
        // Fallback responses based on trust level
        const responses = {
            high: "The universe speaks when you're ready to listen.",
            moderate: "Patience reveals what haste conceals.",
            low: "Trust is earned through transparency.",
            blocked: "The path is obscured by shadows of your own making."
        };

        return {
            response: responses[this.trustLevel] || responses.moderate,
            trustLevel: this.trustLevel,
            source: 'fallback'
        };
    }

    // Subtle punishment/reward system
    applyTrustBasedEffects() {
        const body = document.body;

        // Remove previous trust classes
        body.classList.remove('trust-high', 'trust-moderate', 'trust-low', 'trust-blocked');

        // Apply current trust level
        body.classList.add(`trust-${this.trustLevel}`);

        // Apply specific effects based on trust level
        switch (this.trustLevel) {
            case 'high':
                this.applyHighTrustEffects();
                break;
            case 'moderate':
                this.applyModerateTrustEffects();
                break;
            case 'low':
                this.applyLowTrustEffects();
                break;
            case 'blocked':
                this.applyBlockedEffects();
                break;
        }
    }

    applyHighTrustEffects() {
        // Reward honest users with enhanced experience
        if (window.invisibleCommunication) {
            window.invisibleCommunication.userAttentionScore += 0.3;
        }

        // Unlock additional features
        document.body.classList.add('trusted-user');
    }

    applyModerateTrustEffects() {
        // Standard experience
        // No special modifications
    }

    applyLowTrustEffects() {
        // Subtle degradation of experience
        if (window.breathingWebsite) {
            window.breathingWebsite.breathingRate *= 0.7; // Slower breathing
        }

        // Hints become less obvious
        document.body.classList.add('limited-hints');
    }

    applyBlockedEffects() {
        // Significant experience degradation for privacy-heavy users
        document.body.classList.add('restricted-user');

        // Disable some interactive features
        const interactiveElements = document.querySelectorAll('[data-interactive]');
        interactiveElements.forEach(el => {
            el.style.pointerEvents = 'none';
            el.style.opacity = '0.5';
        });

        // Show subtle message about transparency
        this.showTransparencyMessage();
    }

    showTransparencyMessage() {
        const message = document.createElement('div');
        message.className = 'transparency-message';
        message.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.9);
                color: #fff;
                padding: 15px;
                border-radius: 8px;
                font-size: 0.85rem;
                max-width: 300px;
                z-index: 10000;
                border-left: 3px solid #ff6b6b;
            ">
                The path of discovery requires openness.<br>
                <small style="opacity: 0.7;">Privacy shields also shield wisdom.</small>
            </div>
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 1000);
        }, 8000);
    }

    // Regular profile updates
    startBehaviorAnalysis() {
        setInterval(() => {
            this.analyzeUserDepth();
            this.applyTrustBasedEffects();
        }, 60000); // Every minute
    }

    setupPrivacyDetection() {
        // Run privacy detection on page load and periodically
        try {
            const privacy = this.detectPrivacyMeasures();
            this.knowledgeBase.privacyLevel = privacy;
            this.updateTrustLevel();
            this.applyTrustBasedEffects();
        } catch (error) {
            console.debug('Privacy detection error:', error);
        }

        // Re-check privacy measures periodically
        setInterval(() => {
            try {
                const privacy = this.detectPrivacyMeasures();
                this.knowledgeBase.privacyLevel = privacy;
            } catch (error) {
                console.debug('Privacy detection error:', error);
            }
        }, 300000); // Every 5 minutes
    }

    initializeGeniePresence() {
        // Make the genie feel present even before summoning
        this.createSubtlePresenceIndicators();
        this.startAmbientWatching();
    }

    createSubtlePresenceIndicators() {
        // Cursor occasionally pauses near interactive elements
        // Elements whisper more frequently for high-trust users
        // Breathing rate adjusts based on genie's "attention"
    }

    startAmbientWatching() {
        // The genie "watches" user behavior and learns
        document.addEventListener('click', (e) => {
            this.recordGenieObservation('click', {
                element: e.target.tagName,
                trust: this.trustLevel,
                timestamp: Date.now()
            });
        });

        document.addEventListener('scroll', () => {
            this.recordGenieObservation('scroll', {
                position: window.scrollY,
                trust: this.trustLevel,
                timestamp: Date.now()
            });
        });
    }

    recordGenieObservation(type, data) {
        // Store observations for future genie interactions
        const observations = JSON.parse(localStorage.getItem('genie_observations') || '[]');
        observations.push({ type, data });

        if (observations.length > 200) {
            observations.shift();
        }

        localStorage.setItem('genie_observations', JSON.stringify(observations));
    }

    startHonestyTracking() {
        // Track honesty indicators over time
        setInterval(() => {
            this.updateHonestyMetrics();
        }, 30000);
    }

    updateHonestyMetrics() {
        // Update honesty score based on recent behavior
        const recent = this.getRecentBehavior();
        const consistency = this.checkBehavioralConsistency(recent);

        this.honestyScore = (this.honestyScore * 0.9) + (consistency * 0.1);
        this.updateTrustLevel();
    }

    getRecentBehavior() {
        // Get behavior from last 5 minutes
        return {
            interactions: window.memoryPalace?.getInteractionCount() || 0,
            emotional: window.memoryPalace?.getEmotionalState() || {},
            attention: window.invisibleCommunication?.getAttentionLevel() || 'casual'
        };
    }

    checkBehavioralConsistency(recent) {
        // Check if recent behavior is consistent with established patterns
        return 0.8; // Placeholder calculation
    }

    createQuestioningSystem() {
        // System for the genie to ask users questions and assess honesty
        this.questionTemplates = {
            identity: [
                "What brings you to seek wisdom today?",
                "How do you prefer to learn new things?",
                "What challenges you most in life?"
            ],
            motivation: [
                "What are you hoping to discover here?",
                "How do you measure personal growth?",
                "What drives your curiosity?"
            ],
            verification: [
                "Tell me about your current state of mind.",
                "How has your day shaped your perspective?",
                "What patterns do you notice in your own behavior?"
            ]
        };
    }

    // Public methods for other systems
    getTrustLevel() {
        return this.trustLevel;
    }

    getHonestyScore() {
        return this.honestyScore;
    }

    getKnowledgeBase() {
        return this.knowledgeBase;
    }

    isPrivacyUser() {
        return this.knowledgeBase.privacyLevel?.level === 'high';
    }

    canAccessFeature(feature) {
        const accessLevels = {
            'basic': ['high', 'moderate', 'low'],
            'advanced': ['high', 'moderate'],
            'exclusive': ['high']
        };

        return accessLevels[feature]?.includes(this.trustLevel) || false;
    }
}

// Initialize Genie Omniscience
window.genieOmniscience = new GenieOmniscience();

// Add CSS for trust-based styling
const omniscienceStyles = document.createElement('style');
omniscienceStyles.textContent = `
    .trust-high {
        --trust-glow: rgba(102, 126, 234, 0.3);
    }

    .trust-moderate {
        --trust-glow: rgba(102, 126, 234, 0.1);
    }

    .trust-low {
        --trust-glow: rgba(255, 193, 7, 0.1);
    }

    .trust-blocked {
        --trust-glow: rgba(220, 53, 69, 0.1);
        filter: grayscale(0.3);
    }

    .limited-hints [data-hint] {
        opacity: 0.3 !important;
    }

    .restricted-user .interactive-element {
        pointer-events: none !important;
        opacity: 0.5 !important;
    }

    .trusted-user .easter-egg-hint {
        opacity: 1 !important;
        transform: scale(1.02);
    }

    .transparency-message {
        animation: fadeInOut 10s ease-in-out;
    }

    @keyframes fadeInOut {
        0%, 100% { opacity: 0; }
        10%, 90% { opacity: 1; }
    }
`;
document.head.appendChild(omniscienceStyles);

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GenieOmniscience;
}