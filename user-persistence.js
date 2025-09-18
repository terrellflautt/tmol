// User Journey Persistence & Device Detection System
class UserJourneyManager {
    constructor() {
        this.storageKey = 'terrellflautt_journey';
        this.deviceKey = 'terrellflautt_device';
        this.userData = this.loadUserData();
        this.deviceInfo = this.detectDevice();
        this.initializeTracking();
    }

    // Load existing user data or create new profile
    loadUserData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const data = JSON.parse(stored);
                console.log('🔄 Welcome back! Your journey continues...', data);
                return data;
            }
        } catch (error) {
            console.warn('Could not load user data:', error);
        }

        // Create new user profile
        const newUser = {
            userId: this.generateUserId(),
            createdAt: new Date().toISOString(),
            lastVisit: new Date().toISOString(),
            visitCount: 1,
            transcendentalJourney: {
                completed: false,
                answers: [],
                personalityProfile: {},
                dominantTrait: null,
                completedAt: null
            },
            easterEggs: {
                aiWisdomLevel1: false,
                aiWisdomLevel2: false,
                konamiCode: false,
                techKingReveal: false,
                matrixMode: false,
                hiddenSymbolsFound: [],
                transcendentalCompleted: false
            },
            preferences: {
                theme: 'default',
                animations: true,
                soundEnabled: false
            },
            analytics: {
                timeSpent: 0,
                sessionStart: new Date().toISOString(),
                interactions: [],
                pagesViewed: ['home']
            }
        };

        console.log('✨ New journey begins! Welcome to the experience.');
        return newUser;
    }

    // Comprehensive device detection
    detectDevice() {
        const deviceInfo = {
            timestamp: new Date().toISOString(),
            screen: {
                width: window.screen.width,
                height: window.screen.height,
                availWidth: window.screen.availWidth,
                availHeight: window.screen.availHeight,
                pixelRatio: window.devicePixelRatio || 1,
                orientation: this.getOrientation()
            },
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            device: {
                type: this.getDeviceType(),
                mobile: this.isMobile(),
                tablet: this.isTablet(),
                desktop: this.isDesktop(),
                touch: 'ontouchstart' in window,
                platform: navigator.platform,
                userAgent: navigator.userAgent
            },
            browser: {
                name: this.getBrowserName(),
                version: this.getBrowserVersion(),
                language: navigator.language,
                languages: navigator.languages,
                cookieEnabled: navigator.cookieEnabled,
                onLine: navigator.onLine
            },
            features: {
                localStorage: this.supportsLocalStorage(),
                sessionStorage: this.supportsSessionStorage(),
                webGL: this.supportsWebGL(),
                canvas: this.supportsCanvas(),
                geolocation: 'geolocation' in navigator,
                serviceWorker: 'serviceWorker' in navigator
            },
            performance: {
                connectionType: this.getConnectionType(),
                hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
                memory: navigator.deviceMemory || 'unknown'
            }
        };

        // Store device info
        try {
            localStorage.setItem(this.deviceKey, JSON.stringify(deviceInfo));
        } catch (error) {
            console.warn('Could not store device info:', error);
        }

        return deviceInfo;
    }

    // Generate unique user ID
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Device type detection
    getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            || window.innerWidth < 768;
    }

    isTablet() {
        return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768 && window.innerWidth < 1024;
    }

    isDesktop() {
        return window.innerWidth >= 1024 && !this.isMobile();
    }

    getOrientation() {
        if (screen.orientation) {
            return screen.orientation.type;
        }
        return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }

    // Browser detection
    getBrowserName() {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
        if (userAgent.indexOf('Safari') > -1) return 'Safari';
        if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
        if (userAgent.indexOf('Edge') > -1) return 'Edge';
        if (userAgent.indexOf('Opera') > -1) return 'Opera';
        return 'Unknown';
    }

    getBrowserVersion() {
        const userAgent = navigator.userAgent;
        const match = userAgent.match(/(chrome|safari|firefox|edge|opera)\/(\d+)/i);
        return match ? match[2] : 'Unknown';
    }

    // Feature detection
    supportsLocalStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    }

    supportsSessionStorage() {
        try {
            sessionStorage.setItem('test', 'test');
            sessionStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    }

    supportsWebGL() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    supportsCanvas() {
        try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext && canvas.getContext('2d'));
        } catch (e) {
            return false;
        }
    }

    getConnectionType() {
        if ('connection' in navigator) {
            return navigator.connection.effectiveType || 'unknown';
        }
        return 'unknown';
    }

    // Journey tracking methods
    updateLastVisit() {
        this.userData.lastVisit = new Date().toISOString();
        this.userData.visitCount += 1;
        this.saveUserData();
    }

    saveTranscendentalProgress(answers, personalityProfile, dominantTrait) {
        this.userData.transcendentalJourney = {
            completed: true,
            answers: answers,
            personalityProfile: personalityProfile,
            dominantTrait: dominantTrait,
            completedAt: new Date().toISOString()
        };
        this.userData.easterEggs.transcendentalCompleted = true;
        this.saveUserData();
        console.log('🌟 Transcendental journey saved! Your insights are preserved.');
    }

    markEasterEggFound(eggType) {
        if (this.userData.easterEggs.hasOwnProperty(eggType)) {
            this.userData.easterEggs[eggType] = true;
            this.trackInteraction('easter_egg_found', { type: eggType });
            this.saveUserData();
            console.log(`🎉 Easter egg unlocked: ${eggType}`);
        }
    }

    addHiddenSymbolFound(symbolType) {
        if (!this.userData.easterEggs.hiddenSymbolsFound.includes(symbolType)) {
            this.userData.easterEggs.hiddenSymbolsFound.push(symbolType);
            this.trackInteraction('hidden_symbol_found', { symbol: symbolType });
            this.saveUserData();
            console.log(`🔮 Hidden symbol discovered: ${symbolType}`);
        }
    }

    trackInteraction(type, data = {}) {
        const interaction = {
            type: type,
            timestamp: new Date().toISOString(),
            data: data,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };

        this.userData.analytics.interactions.push(interaction);

        // Keep only last 100 interactions to prevent storage bloat
        if (this.userData.analytics.interactions.length > 100) {
            this.userData.analytics.interactions = this.userData.analytics.interactions.slice(-100);
        }

        this.saveUserData();
    }

    // Save user data to localStorage
    saveUserData() {
        try {
            // Update session analytics
            this.userData.analytics.timeSpent = this.getSessionTime();
            localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
        } catch (error) {
            console.warn('Could not save user data:', error);
        }
    }

    getSessionTime() {
        const sessionStart = new Date(this.userData.analytics.sessionStart);
        const now = new Date();
        return Math.floor((now - sessionStart) / 1000); // seconds
    }

    // Initialize tracking
    initializeTracking() {
        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.trackInteraction('page_hidden');
                this.saveUserData();
            } else {
                this.trackInteraction('page_visible');
                this.userData.analytics.sessionStart = new Date().toISOString();
            }
        });

        // Track window resize
        window.addEventListener('resize', () => {
            this.deviceInfo.viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            this.trackInteraction('window_resize', {
                newSize: this.deviceInfo.viewport,
                deviceType: this.getDeviceType()
            });
        });

        // Track orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.deviceInfo.screen.orientation = this.getOrientation();
                this.trackInteraction('orientation_change', {
                    orientation: this.deviceInfo.screen.orientation
                });
            }, 100);
        });

        // Save data before page unload
        window.addEventListener('beforeunload', () => {
            this.trackInteraction('page_unload');
            this.saveUserData();
        });

        console.log('🎯 User journey tracking initialized', {
            userId: this.userData.userId,
            deviceType: this.deviceInfo.device.type,
            visitCount: this.userData.visitCount,
            returningUser: this.userData.visitCount > 1
        });
    }

    // Get user progress summary
    getProgressSummary() {
        const easterEggs = this.userData.easterEggs;
        const foundCount = Object.values(easterEggs).filter(found => found === true).length +
                          easterEggs.hiddenSymbolsFound.length;
        const totalCount = 7 + 4; // 7 main easter eggs + 4 hidden symbols

        return {
            userId: this.userData.userId,
            visitCount: this.userData.visitCount,
            transcendentalCompleted: this.userData.transcendentalJourney.completed,
            dominantTrait: this.userData.transcendentalJourney.dominantTrait,
            easterEggsFound: foundCount,
            totalEasterEggs: totalCount,
            completionPercentage: Math.round((foundCount / totalCount) * 100),
            deviceType: this.deviceInfo.device.type,
            sessionTime: this.getSessionTime(),
            totalInteractions: this.userData.analytics.interactions.length
        };
    }

    // Check if user is returning visitor
    isReturningUser() {
        return this.userData.visitCount > 1;
    }

    // Get personalized welcome message
    getWelcomeMessage() {
        if (this.isReturningUser()) {
            const lastVisit = new Date(this.userData.lastVisit);
            const daysSince = Math.floor((new Date() - lastVisit) / (1000 * 60 * 60 * 24));

            if (this.userData.transcendentalJourney.completed) {
                return `Welcome back, ${this.userData.transcendentalJourney.dominantTrait}! Your journey continues...`;
            } else {
                return `Welcome back! Ready to continue your transcendental journey?`;
            }
        } else {
            return `Welcome to a transcendental experience. Your journey begins now...`;
        }
    }

    // Export user data for analytics
    exportUserData() {
        return {
            userData: this.userData,
            deviceInfo: this.deviceInfo,
            progressSummary: this.getProgressSummary()
        };
    }
}

// Initialize global user journey manager
window.userJourney = new UserJourneyManager();