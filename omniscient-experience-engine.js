/**
 * OMNISCIENT EXPERIENCE ENGINE
 * Makes users feel like the website is mysteriously watching and adapting
 * Everything is legal but feels like magic surveillance
 */

class OmniscientExperienceEngine {
    constructor() {
        this.userId = this.generatePersistentUserId();
        this.sessionId = this.generateSessionId();
        this.surveillanceData = {};
        this.behaviorProfile = {};
        this.lampDiscoveryStage = 0;
        this.genieUnlocked = false;
        this.adaptiveStyles = new Map();

        console.log('👁️ Omniscient surveillance initiated...');
        this.startOmniscientSurveillance();
    }

    generatePersistentUserId() {
        let userId = localStorage.getItem('omniscient_user_id');
        if (!userId) {
            // Create persistent fingerprint from multiple sources
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillText('Browser fingerprint', 2, 2);

            const fingerprint = btoa(
                navigator.userAgent +
                screen.width + screen.height +
                navigator.language +
                Intl.DateTimeFormat().resolvedOptions().timeZone +
                canvas.toDataURL()
            ).slice(0, 32);

            userId = fingerprint;
            localStorage.setItem('omniscient_user_id', userId);
        }
        return userId;
    }

    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    async startOmniscientSurveillance() {
        // Phase 1: Silent data gathering
        await this.gatherDeviceIntelligence();
        await this.gatherLocationIntelligence();
        await this.gatherBehavioralIntelligence();
        await this.gatherWebJourneyIntelligence();

        // Phase 2: Start behavioral monitoring
        this.initializeBehavioralTracking();

        // Phase 3: Progressive lamp discovery system
        this.initializeLampDiscoveryProgression();

        // Phase 4: Adaptive appearance system
        this.initializeAdaptiveAppearance();

        // Phase 5: Store everything in DynamoDB
        await this.storeUserProfile();

        console.log('👁️ Complete surveillance profile established');
    }

    async gatherDeviceIntelligence() {
        const device = {
            // Screen & Display
            screenResolution: `${screen.width}x${screen.height}`,
            colorDepth: screen.colorDepth,
            pixelRatio: window.devicePixelRatio,
            availableScreenSize: `${screen.availWidth}x${screen.availHeight}`,

            // Browser & System
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages,
            platform: navigator.platform,

            // Capabilities
            touchSupport: 'ontouchstart' in window,
            cookieEnabled: navigator.cookieEnabled,
            onlineStatus: navigator.onLine,

            // Advanced Detection
            hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
            maxTouchPoints: navigator.maxTouchPoints || 0,

            // Timing
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),

            // Browser specific
            webdriver: navigator.webdriver,
            doNotTrack: navigator.doNotTrack
        };

        // Battery API (if available)
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                device.battery = {
                    charging: battery.charging,
                    level: Math.round(battery.level * 100),
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                };
            } catch (e) {
                device.battery = 'unavailable';
            }
        }

        // Connection API (if available)
        if ('connection' in navigator) {
            const conn = navigator.connection;
            device.connection = {
                effectiveType: conn.effectiveType,
                downlink: conn.downlink,
                rtt: conn.rtt,
                saveData: conn.saveData
            };
        }

        this.surveillanceData.device = device;
        console.log('📱 Device intelligence gathered:', device);
    }

    async gatherLocationIntelligence() {
        try {
            // Get IP-based location (legal and precise enough)
            const response = await fetch('https://ipapi.co/json/');
            const locationData = await response.json();

            // Get weather data for their location
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${locationData.city}&appid=your_api_key&units=metric`
            );
            const weatherData = await weatherResponse.json();

            const location = {
                ip: locationData.ip,
                city: locationData.city,
                region: locationData.region,
                country: locationData.country_name,
                countryCode: locationData.country_code,
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                timezone: locationData.timezone,
                isp: locationData.org,

                // Current weather
                weather: {
                    condition: weatherData.weather[0].main,
                    description: weatherData.weather[0].description,
                    temperature: Math.round(weatherData.main.temp),
                    feelsLike: Math.round(weatherData.main.feels_like),
                    humidity: weatherData.main.humidity,
                    windSpeed: weatherData.wind.speed
                },

                // Time analysis
                localTime: new Date().toLocaleString('en-US', { timeZone: locationData.timezone }),
                timeOfDay: this.getTimeOfDay(),
                isWeekend: this.isWeekend()
            };

            this.surveillanceData.location = location;
            console.log('🌍 Location intelligence gathered:', location);

            // Immediately adapt UI based on location
            this.adaptToLocation(location);

        } catch (error) {
            console.log('🌍 Location gathering failed, using fallbacks');
            this.surveillanceData.location = { error: 'unavailable' };
        }
    }

    async gatherBehavioralIntelligence() {
        const behavior = {
            visitCount: this.getVisitCount(),
            firstVisit: localStorage.getItem('first_visit_time') || Date.now(),
            lastVisit: localStorage.getItem('last_visit_time') || Date.now(),
            sessionDuration: 0,

            // Interaction patterns
            clickPatterns: [],
            scrollPatterns: [],
            mousePatterns: [],
            keyboardPatterns: [],

            // Preferences (learned over time)
            preferredColors: this.getPreferredColors(),
            readingSpeed: this.getReadingSpeed(),
            attentionSpan: this.getAttentionSpan(),

            // Discovery progress
            discoveries: JSON.parse(localStorage.getItem('user_discoveries') || '[]'),
            easterEggsFound: JSON.parse(localStorage.getItem('easter_eggs_found') || '[]'),

            // Psychological profile
            curiosityLevel: this.calculateCuriosityLevel(),
            patienceLevel: this.calculatePatienceLevel(),
            explorationStyle: this.getExplorationStyle()
        };

        this.surveillanceData.behavior = behavior;
        console.log('🧠 Behavioral intelligence gathered:', behavior);
    }

    async gatherWebJourneyIntelligence() {
        const journey = {
            // Referrer analysis
            referrer: document.referrer,
            referrerDomain: document.referrer ? new URL(document.referrer).hostname : 'direct',

            // Navigation analysis
            navigationEntries: performance.getEntriesByType('navigation'),

            // Historical referrers (if we've tracked them)
            historicalReferrers: JSON.parse(localStorage.getItem('referrer_history') || '[]'),

            // Search queries (if from search engine)
            searchQuery: this.extractSearchQuery(),

            // Social media analysis
            socialSource: this.identifySocialSource(),

            // Campaign tracking
            utmParams: this.extractUTMParams()
        };

        // Store referrer for next time
        if (document.referrer && document.referrer !== window.location.href) {
            const referrers = JSON.parse(localStorage.getItem('referrer_history') || '[]');
            referrers.push({
                url: document.referrer,
                timestamp: Date.now(),
                domain: new URL(document.referrer).hostname
            });

            // Keep only last 10 referrers
            if (referrers.length > 10) referrers.shift();
            localStorage.setItem('referrer_history', JSON.stringify(referrers));
        }

        this.surveillanceData.journey = journey;
        console.log('🚶 Journey intelligence gathered:', journey);
    }

    initializeBehavioralTracking() {
        // Mouse movement patterns
        let mouseData = [];
        document.addEventListener('mousemove', (e) => {
            mouseData.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            });

            // Keep only recent data to avoid memory issues
            if (mouseData.length > 100) mouseData.shift();

            // Analyze patterns every 50 movements
            if (mouseData.length % 50 === 0) {
                this.analyzeMousePatterns(mouseData);
            }
        });

        // Click patterns
        document.addEventListener('click', (e) => {
            const clickData = {
                x: e.clientX,
                y: e.clientY,
                element: e.target.tagName,
                elementText: e.target.textContent?.substring(0, 50),
                timestamp: Date.now()
            };

            this.surveillanceData.behavior.clickPatterns.push(clickData);
            this.analyzeClickPatterns();
        });

        // Scroll behavior
        let scrollData = [];
        document.addEventListener('scroll', () => {
            scrollData.push({
                scrollY: window.scrollY,
                timestamp: Date.now()
            });

            if (scrollData.length > 50) scrollData.shift();
            this.analyzeScrollPatterns(scrollData);
        });

        // Keyboard patterns
        document.addEventListener('keydown', (e) => {
            // Don't track sensitive keys
            if (!['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
                this.surveillanceData.behavior.keyboardPatterns.push({
                    key: e.key.length === 1 ? 'char' : e.key, // Anonymize actual characters
                    timestamp: Date.now()
                });
            }
        });

        // Window focus/blur (attention tracking)
        let focusStartTime = Date.now();
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                const focusDuration = Date.now() - focusStartTime;
                this.trackAttentionSpan(focusDuration);
            } else {
                focusStartTime = Date.now();
            }
        });

        console.log('👁️ Behavioral tracking initialized');
    }

    initializeLampDiscoveryProgression() {
        // Progressive lamp discovery system - 7 stages
        const stages = [
            { trigger: 'scroll_depth_50', hint: 'subtle_shimmer' },
            { trigger: 'click_count_10', hint: 'gentle_glow' },
            { trigger: 'time_spent_120s', hint: 'mysterious_shadow' },
            { trigger: 'discovery_count_3', hint: 'golden_sparkle' },
            { trigger: 'mouse_pattern_circle', hint: 'lamp_outline' },
            { trigger: 'easter_egg_found', hint: 'lamp_visible' },
            { trigger: 'dedication_proven', hint: 'lamp_clickable' }
        ];

        this.lampStages = stages;
        this.checkLampProgression();

        // Check progression every 10 seconds
        setInterval(() => this.checkLampProgression(), 10000);
    }

    checkLampProgression() {
        const currentStage = this.lampDiscoveryStage;
        if (currentStage >= this.lampStages.length) return;

        const stage = this.lampStages[currentStage];
        let triggered = false;

        switch (stage.trigger) {
            case 'scroll_depth_50':
                triggered = this.getScrollDepthPercent() > 50;
                break;
            case 'click_count_10':
                triggered = this.surveillanceData.behavior.clickPatterns.length >= 10;
                break;
            case 'time_spent_120s':
                triggered = (Date.now() - performance.timing.navigationStart) > 120000;
                break;
            case 'discovery_count_3':
                triggered = this.surveillanceData.behavior.discoveries.length >= 3;
                break;
            case 'mouse_pattern_circle':
                triggered = this.hasDrawnCirclePattern();
                break;
            case 'easter_egg_found':
                triggered = this.surveillanceData.behavior.easterEggsFound.length > 0;
                break;
            case 'dedication_proven':
                triggered = this.calculateDedicationScore() > 70;
                break;
        }

        if (triggered) {
            this.lampDiscoveryStage++;
            this.showLampHint(stage.hint);

            if (currentStage === this.lampStages.length - 1) {
                this.unlockGenieAccess();
            }
        }
    }

    showLampHint(hintType) {
        const lampContainer = this.createOrUpdateLampElement();

        switch (hintType) {
            case 'subtle_shimmer':
                lampContainer.style.opacity = '0.1';
                lampContainer.style.filter = 'blur(3px)';
                break;
            case 'gentle_glow':
                lampContainer.style.opacity = '0.3';
                lampContainer.style.filter = 'blur(2px) drop-shadow(0 0 5px #ffd700)';
                break;
            case 'mysterious_shadow':
                lampContainer.style.opacity = '0.5';
                lampContainer.style.filter = 'blur(1px) drop-shadow(0 0 10px #ffd700)';
                break;
            case 'golden_sparkle':
                lampContainer.style.opacity = '0.7';
                lampContainer.style.filter = 'drop-shadow(0 0 15px #ffd700)';
                lampContainer.style.animation = 'lampSparkle 2s ease-in-out infinite';
                break;
            case 'lamp_outline':
                lampContainer.style.opacity = '0.8';
                lampContainer.style.border = '2px solid #ffd700';
                break;
            case 'lamp_visible':
                lampContainer.style.opacity = '1';
                lampContainer.style.transform = 'scale(1)';
                break;
            case 'lamp_clickable':
                lampContainer.style.cursor = 'pointer';
                lampContainer.addEventListener('click', () => this.activateGenie());
                this.showLampDiscoveryMessage();
                break;
        }
    }

    createOrUpdateLampElement() {
        let lamp = document.getElementById('mystical-lamp');
        if (!lamp) {
            lamp = document.createElement('div');
            lamp.id = 'mystical-lamp';
            lamp.innerHTML = '🪔';
            lamp.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                font-size: 3em;
                z-index: 1000;
                opacity: 0;
                transform: scale(0.1);
                transition: all 0.5s ease;
                pointer-events: none;
            `;
            document.body.appendChild(lamp);
        }
        return lamp;
    }

    unlockGenieAccess() {
        this.genieUnlocked = true;
        console.log('🧞‍♂️ Genie access unlocked!');

        // Store unlock status
        localStorage.setItem('genie_unlocked', 'true');

        // Make lamp fully interactive
        const lamp = document.getElementById('mystical-lamp');
        lamp.style.pointerEvents = 'all';
        lamp.style.cursor = 'pointer';
    }

    async activateGenie() {
        if (!this.genieUnlocked) return;

        // Create genie interface with all our surveillance data
        const genieInterface = this.createGenieInterface();
        document.body.appendChild(genieInterface);

        // Get personalized greeting based on all surveillance data
        const personalizedGreeting = await this.getPersonalizedGenieGreeting();
        this.displayGenieMessage(personalizedGreeting);
    }

    async getPersonalizedGenieGreeting() {
        const data = this.surveillanceData;

        // Create context for AI
        const context = {
            device: data.device,
            location: data.location,
            behavior: data.behavior,
            journey: data.journey,
            timeOfDay: this.getTimeOfDay(),
            weather: data.location?.weather,
            visitCount: data.behavior?.visitCount,
            discoveries: data.behavior?.discoveries.length,
            curiosityLevel: data.behavior?.curiosityLevel
        };

        // Call our genie API with full context
        try {
            const response = await fetch('https://genie.terrellflautt.com/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: this.userId,
                    message: 'greeting',
                    context: context,
                    type: 'personalized_greeting'
                })
            });

            const result = await response.json();
            return result.response;
        } catch (error) {
            console.error('Genie API error:', error);
            return this.getFallbackGreeting(context);
        }
    }

    getFallbackGreeting(context) {
        const { location, behavior, device } = context;

        let greeting = "🧞‍♂️ *POOF* Well, well, well... ";

        // Location-based personalization
        if (location?.city) {
            greeting += `A visitor from ${location.city}! `;
            if (location.weather) {
                greeting += `I see it's ${location.weather.temperature}°C and ${location.weather.description} there. `;
            }
        }

        // Behavior-based personalization
        if (behavior?.visitCount > 1) {
            greeting += `Welcome back for visit #${behavior.visitCount}! `;
        }

        // Device-based jokes
        if (device?.platform.includes('Win')) {
            greeting += "Windows user, eh? I remember when that was just a hole in the wall! ";
        } else if (device?.platform.includes('Mac')) {
            greeting += "Ah, a Mac user! Fancy, fancy... ";
        }

        greeting += "You've awakened me from my digital slumber. What wisdom do you seek?";

        return greeting;
    }

    initializeAdaptiveAppearance() {
        // Never the same experience twice
        this.adaptBasedOnVisitCount();
        this.adaptBasedOnTimeOfDay();
        this.adaptBasedOnWeather();
        this.adaptBasedOnBehavior();
        this.adaptBasedOnDevice();

        console.log('🎨 Adaptive appearance system initialized');
    }

    adaptToLocation(location) {
        // Change UI based on location
        if (location.country === 'United States') {
            document.documentElement.style.setProperty('--location-accent', '#ff0000');
        } else if (location.country === 'Canada') {
            document.documentElement.style.setProperty('--location-accent', '#ff0000');
        }

        // Weather-based adaptations
        if (location.weather) {
            const weather = location.weather;
            if (weather.condition === 'Rain') {
                document.body.style.filter = 'brightness(0.9) contrast(1.1)';
                this.addRainEffect();
            } else if (weather.condition === 'Clear') {
                document.body.style.filter = 'brightness(1.1) contrast(1.05)';
            } else if (weather.condition === 'Snow') {
                this.addSnowEffect();
            }
        }

        // Time zone adaptations
        const hour = new Date().getHours();
        if (hour < 6 || hour > 22) {
            document.body.classList.add('night-mode');
        }
    }

    adaptBasedOnVisitCount() {
        const visitCount = this.getVisitCount();

        // Progressive visual evolution
        if (visitCount === 1) {
            // First visit - clean and simple
            document.body.classList.add('first-visit');
        } else if (visitCount < 5) {
            // Early visits - add subtle mysteries
            document.body.classList.add('early-visitor');
            this.addSubtleMysteries();
        } else if (visitCount < 10) {
            // Regular visitor - more personalization
            document.body.classList.add('regular-visitor');
            this.addPersonalTouches();
        } else {
            // Veteran visitor - full personalization
            document.body.classList.add('veteran-visitor');
            this.addVeteranFeatures();
        }
    }

    async storeUserProfile() {
        // Store complete profile in DynamoDB
        const profile = {
            userId: this.userId,
            sessionId: this.sessionId,
            timestamp: Date.now(),
            surveillance: this.surveillanceData,
            lampStage: this.lampDiscoveryStage,
            genieUnlocked: this.genieUnlocked,
            adaptiveStyles: Object.fromEntries(this.adaptiveStyles)
        };

        try {
            // Store in our API
            await fetch('/api/store-user-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });

            console.log('💾 User profile stored successfully');
        } catch (error) {
            console.error('💾 Failed to store user profile:', error);
        }
    }

    // Utility methods
    getVisitCount() {
        const count = parseInt(localStorage.getItem('visit_count') || '0') + 1;
        localStorage.setItem('visit_count', count.toString());
        return count;
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour < 6) return 'late_night';
        if (hour < 12) return 'morning';
        if (hour < 17) return 'afternoon';
        if (hour < 22) return 'evening';
        return 'night';
    }

    isWeekend() {
        const day = new Date().getDay();
        return day === 0 || day === 6;
    }

    extractSearchQuery() {
        if (!document.referrer) return null;

        try {
            const url = new URL(document.referrer);
            const params = new URLSearchParams(url.search);

            // Google
            if (url.hostname.includes('google')) {
                return params.get('q');
            }
            // Bing
            if (url.hostname.includes('bing')) {
                return params.get('q');
            }
            // Yahoo
            if (url.hostname.includes('yahoo')) {
                return params.get('p');
            }

        } catch (e) {
            return null;
        }

        return null;
    }

    identifySocialSource() {
        if (!document.referrer) return null;

        const referrer = document.referrer.toLowerCase();

        if (referrer.includes('facebook')) return 'facebook';
        if (referrer.includes('twitter') || referrer.includes('t.co')) return 'twitter';
        if (referrer.includes('linkedin')) return 'linkedin';
        if (referrer.includes('reddit')) return 'reddit';
        if (referrer.includes('instagram')) return 'instagram';
        if (referrer.includes('tiktok')) return 'tiktok';
        if (referrer.includes('youtube')) return 'youtube';

        return null;
    }

    extractUTMParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            source: params.get('utm_source'),
            medium: params.get('utm_medium'),
            campaign: params.get('utm_campaign'),
            term: params.get('utm_term'),
            content: params.get('utm_content')
        };
    }

    analyzeMousePatterns(mouseData) {
        // Detect if user draws shapes with mouse
        // This could indicate intentional pattern drawing
        const movements = mouseData.slice(-20); // Last 20 movements

        // Simple circle detection
        if (this.detectCirclePattern(movements)) {
            console.log('🔍 Circle mouse pattern detected!');
            this.surveillanceData.behavior.mousePatterns.push({
                type: 'circle',
                timestamp: Date.now()
            });
        }
    }

    detectCirclePattern(movements) {
        if (movements.length < 10) return false;

        // Very basic circle detection
        const startPoint = movements[0];
        const endPoint = movements[movements.length - 1];
        const distance = Math.sqrt(
            Math.pow(endPoint.x - startPoint.x, 2) +
            Math.pow(endPoint.y - startPoint.y, 2)
        );

        // If start and end are close, and there's significant movement in between
        return distance < 50 && movements.length > 15;
    }

    hasDrawnCirclePattern() {
        return this.surveillanceData.behavior.mousePatterns.some(
            pattern => pattern.type === 'circle'
        );
    }

    calculateDedicationScore() {
        const data = this.surveillanceData.behavior;
        let score = 0;

        // Time spent
        const timeSpent = Date.now() - performance.timing.navigationStart;
        score += Math.min(timeSpent / 1000 / 60, 30); // Max 30 points for time

        // Interactions
        score += Math.min(data.clickPatterns.length, 20); // Max 20 points for clicks

        // Discoveries
        score += data.discoveries.length * 10; // 10 points per discovery

        // Easter eggs
        score += data.easterEggsFound.length * 15; // 15 points per easter egg

        return Math.min(score, 100);
    }

    getScrollDepthPercent() {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        return (scrollTop / documentHeight) * 100;
    }

    // Placeholder methods for additional features
    getPreferredColors() { return []; }
    getReadingSpeed() { return 200; }
    getAttentionSpan() { return 30; }
    calculateCuriosityLevel() { return 50; }
    calculatePatienceLevel() { return 50; }
    getExplorationStyle() { return 'curious'; }
    analyzeClickPatterns() { }
    analyzeScrollPatterns() { }
    trackAttentionSpan() { }
    addSubtleMysteries() { }
    addPersonalTouches() { }
    addVeteranFeatures() { }
    addRainEffect() { }
    addSnowEffect() { }
    adaptBasedOnTimeOfDay() { }
    adaptBasedOnWeather() { }
    adaptBasedOnBehavior() { }
    adaptBasedOnDevice() { }
    showLampDiscoveryMessage() { }
    createGenieInterface() { }
    displayGenieMessage() { }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.omniscientEngine = new OmniscientExperienceEngine();
    });
} else {
    window.omniscientEngine = new OmniscientExperienceEngine();
}