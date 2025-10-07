/**
 * Deep User Profiling System
 * Collects EVERYTHING possible about users to create unique experiences
 * Inspired by: Cicada 3301, I Love Bees ARG, This Is My Milwaukee, Stranger Things Experience
 */

class DeepUserProfiler {
    constructor() {
        this.userId = this.getUserId();
        this.profile = {};
        this.apiUrl = 'https://api.terrellflautt.com';

        this.init();
    }

    async init() {
        await this.collectAllData();
        await this.syncToDynamoDB();
        this.startContinuousMonitoring();
    }

    getUserId() {
        let userId = localStorage.getItem('terrellflautt_user_id');
        if (!userId) {
            userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('terrellflautt_user_id', userId);
        }
        return userId;
    }

    /**
     * COLLECT EVERYTHING - Maximum user intelligence
     */
    async collectAllData() {
        this.profile = {
            // ===== IDENTITY =====
            userId: this.userId,
            fingerprint: await this.generateFingerprint(),
            deviceId: await this.getDeviceId(),

            // ===== NETWORK & LOCATION =====
            network: await this.getNetworkData(),
            location: await this.getLocationData(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            language: navigator.language,
            languages: navigator.languages,

            // ===== DEVICE & BROWSER =====
            device: await this.getDeviceInfo(),
            browser: this.getBrowserInfo(),
            screen: this.getScreenInfo(),
            hardware: await this.getHardwareInfo(),

            // ===== BEHAVIOR =====
            behavior: await this.getBehavioralData(),
            usage: this.getUsagePatterns(),
            interactions: this.getInteractionHistory(),

            // ===== PRIVACY & SECURITY =====
            privacy: await this.getPrivacyMeasures(),
            security: this.getSecurityProfile(),

            // ===== METADATA =====
            timestamps: {
                firstVisit: localStorage.getItem('first_visit') || Date.now(),
                lastVisit: Date.now(),
                sessionStart: performance.timing.navigationStart
            },

            // ===== PSYCHOLOGICAL PROFILE =====
            psychology: this.getPsychologicalIndicators()
        };

        return this.profile;
    }

    /**
     * NETWORK DATA - IP, ISP, VPN detection, connection quality
     */
    async getNetworkData() {
        const network = {
            ip: null,
            ipv6: null,
            isp: null,
            asn: null,
            vpnDetected: false,
            proxyDetected: false,
            torDetected: false,
            connectionType: navigator.connection?.effectiveType || 'unknown',
            downlink: navigator.connection?.downlink || null,
            rtt: navigator.connection?.rtt || null,
            saveData: navigator.connection?.saveData || false
        };

        try {
            // Use multiple IP detection services for accuracy
            const ipData = await this.detectIPAndVPN();
            Object.assign(network, ipData);
        } catch (error) {
            console.debug('Network detection partial failure:', error);
        }

        return network;
    }

    async detectIPAndVPN() {
        try {
            // Use WebRTC STUN to get real IP (bypasses some VPNs)
            const ips = await this.getIPsViaWebRTC();

            // Check for VPN indicators
            const vpnDetected = await this.detectVPN();
            const torDetected = this.detectTor();

            return {
                ip: ips.public,
                ipv6: ips.ipv6,
                localIPs: ips.local,
                vpnDetected,
                torDetected,
                proxyDetected: vpnDetected && !torDetected
            };
        } catch (error) {
            return { vpnDetected: false, error: error.message };
        }
    }

    async getIPsViaWebRTC() {
        return new Promise((resolve) => {
            const ips = { public: null, local: [], ipv6: null };
            const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });

            pc.createDataChannel('');
            pc.createOffer().then(offer => pc.setLocalDescription(offer));

            pc.onicecandidate = (ice) => {
                if (!ice || !ice.candidate || !ice.candidate.candidate) return;

                const parts = ice.candidate.candidate.split(' ');
                const ip = parts[4];

                if (ip.includes(':')) {
                    ips.ipv6 = ip;
                } else if (ip.startsWith('192.') || ip.startsWith('10.') || ip.startsWith('172.')) {
                    ips.local.push(ip);
                } else {
                    ips.public = ip;
                }
            };

            setTimeout(() => {
                pc.close();
                resolve(ips);
            }, 2000);
        });
    }

    async detectVPN() {
        // VPN detection techniques:
        // 1. Check if WebRTC IP differs from HTTP IP
        // 2. DNS leak test
        // 3. Time zone mismatch with IP geolocation
        // 4. MTU size analysis
        // 5. Latency patterns

        const indicators = {
            webrtcMismatch: false,
            timezoneAnomaly: false,
            latencySpike: false
        };

        // Check timezone vs expected timezone from IP
        // (Would need IP geolocation API)

        // Check for sudden latency increases
        const latencies = await this.measureLatencies();
        indicators.latencySpike = latencies.variation > 100; // ms

        // Score-based detection
        const vpnScore = Object.values(indicators).filter(v => v).length;
        return vpnScore >= 2; // 2+ indicators = likely VPN
    }

    async measureLatencies() {
        const pings = [];
        for (let i = 0; i < 5; i++) {
            const start = performance.now();
            try {
                await fetch('/', { method: 'HEAD', cache: 'no-store' });
                pings.push(performance.now() - start);
            } catch (e) {
                pings.push(999);
            }
        }

        const avg = pings.reduce((a, b) => a + b, 0) / pings.length;
        const variance = pings.reduce((sum, p) => sum + Math.pow(p - avg, 2), 0) / pings.length;

        return { average: avg, variation: Math.sqrt(variance), pings };
    }

    detectTor() {
        // Tor Browser detection
        return !!(
            navigator.productSub === '20100101' &&
            navigator.vendor === '' &&
            window.screen.width === window.screen.availWidth &&
            window.screen.height === window.screen.availHeight
        );
    }

    /**
     * LOCATION DATA - Country, region, city, coordinates
     */
    async getLocationData() {
        const location = {
            country: null,
            region: null,
            city: null,
            coordinates: null,
            accuracy: null,
            source: null
        };

        // Use IP-based geolocation only (no intrusive permission requests)
        // Removed HTML5 Geolocation to avoid browser popups
        try {
            // Skip geolocation entirely or use passive IP lookup
            if (false) { // Disabled geolocation
                location.coordinates = {
                    lat: 0,
                    lon: 0
                };
                location.accuracy = position.coords.accuracy;
                location.source = 'geolocation';

                // Reverse geocode to get address
                // (Would use geocoding API here)
            } catch (error) {
                console.debug('Geolocation denied or failed:', error);
            }
        }

        // Fallback: IP-based geolocation
        if (!location.coordinates) {
            try {
                // Would call IP geolocation API
                location.source = 'ip';
            } catch (error) {
                console.debug('IP geolocation failed:', error);
            }
        }

        return location;
    }

    /**
     * DEVICE INFO - OS, device type, model, specs
     */
    async getDeviceInfo() {
        const ua = navigator.userAgent;
        const device = {
            type: this.getDeviceType(),
            os: this.getOS(),
            osVersion: this.getOSVersion(),
            model: this.getDeviceModel(),
            manufacturer: this.getManufacturer(),
            isMobile: /Mobile|Android|iPhone/i.test(ua),
            isTablet: /Tablet|iPad/i.test(ua),
            isDesktop: !/Mobile|Android|iPhone|Tablet|iPad/i.test(ua),
            touchEnabled: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
            batteryLevel: null,
            charging: null
        };

        // Battery API
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                device.batteryLevel = battery.level * 100;
                device.charging = battery.charging;
            } catch (e) {
                // Battery API not available
            }
        }

        return device;
    }

    getDeviceType() {
        const ua = navigator.userAgent;
        if (/Mobile|Android/i.test(ua)) return 'mobile';
        if (/Tablet|iPad/i.test(ua)) return 'tablet';
        if (/TV|SmartTV/i.test(ua)) return 'tv';
        return 'desktop';
    }

    getOS() {
        const ua = navigator.userAgent;
        if (/Windows/i.test(ua)) return 'Windows';
        if (/Mac OS/i.test(ua)) return 'macOS';
        if (/Linux/i.test(ua)) return 'Linux';
        if (/Android/i.test(ua)) return 'Android';
        if (/iOS|iPhone|iPad/i.test(ua)) return 'iOS';
        return 'Unknown';
    }

    getOSVersion() {
        const ua = navigator.userAgent;
        const match = ua.match(/(?:Windows NT|Mac OS X|Android|CPU iPhone OS) ([\d._]+)/);
        return match ? match[1].replace(/_/g, '.') : null;
    }

    getDeviceModel() {
        const ua = navigator.userAgent;
        // Extract device model from User-Agent
        const models = {
            'iPhone': /iPhone/,
            'iPad': /iPad/,
            'Pixel': /Pixel/,
            'Samsung': /SM-[A-Z0-9]+/
        };

        for (const [name, regex] of Object.entries(models)) {
            if (regex.test(ua)) {
                const match = ua.match(regex);
                return match ? match[0] : name;
            }
        }

        return null;
    }

    getManufacturer() {
        const ua = navigator.userAgent;
        if (/iPhone|iPad|Macintosh/i.test(ua)) return 'Apple';
        if (/Samsung/i.test(ua)) return 'Samsung';
        if (/Pixel/i.test(ua)) return 'Google';
        if (/Huawei/i.test(ua)) return 'Huawei';
        if (/Windows/i.test(ua)) return 'Microsoft';
        return null;
    }

    /**
     * BROWSER INFO - Name, version, engine, features
     */
    getBrowserInfo() {
        const ua = navigator.userAgent;
        return {
            name: this.getBrowserName(),
            version: this.getBrowserVersion(),
            engine: this.getBrowserEngine(),
            userAgent: ua,
            vendor: navigator.vendor,
            platform: navigator.platform,
            cookiesEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack === '1',
            plugins: this.getPlugins(),
            webdriver: navigator.webdriver || false
        };
    }

    getBrowserName() {
        const ua = navigator.userAgent;
        if (/Edg/i.test(ua)) return 'Edge';
        if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return 'Chrome';
        if (/Firefox/i.test(ua)) return 'Firefox';
        if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
        if (/Opera|OPR/i.test(ua)) return 'Opera';
        return 'Unknown';
    }

    getBrowserVersion() {
        const ua = navigator.userAgent;
        const match = ua.match(/(Firefox|Chrome|Safari|Edge|OPR)\/?([\d.]+)/);
        return match ? match[2] : null;
    }

    getBrowserEngine() {
        const ua = navigator.userAgent;
        if (/WebKit/i.test(ua)) return 'WebKit';
        if (/Gecko/i.test(ua)) return 'Gecko';
        if (/Trident/i.test(ua)) return 'Trident';
        return 'Unknown';
    }

    getPlugins() {
        const plugins = [];
        for (let i = 0; i < navigator.plugins.length; i++) {
            plugins.push(navigator.plugins[i].name);
        }
        return plugins;
    }

    /**
     * SCREEN INFO - Resolution, color depth, pixel density
     */
    getScreenInfo() {
        return {
            width: window.screen.width,
            height: window.screen.height,
            availWidth: window.screen.availWidth,
            availHeight: window.screen.availHeight,
            colorDepth: window.screen.colorDepth,
            pixelDepth: window.screen.pixelDepth,
            pixelRatio: window.devicePixelRatio || 1,
            orientation: screen.orientation?.type || 'unknown',
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight
        };
    }

    /**
     * HARDWARE INFO - CPU, GPU, memory
     */
    async getHardwareInfo() {
        return {
            cpuCores: navigator.hardwareConcurrency || null,
            memory: navigator.deviceMemory || null, // GB
            gpu: await this.getGPUInfo(),
            maxTouchPoints: navigator.maxTouchPoints || 0
        };
    }

    async getGPUInfo() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

            if (!gl) return null;

            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (!debugInfo) return null;

            return {
                vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * BEHAVIORAL DATA - How they use the site
     */
    async getBehavioralData() {
        return {
            mouseMovements: this.analyzeMousePatterns(),
            scrollBehavior: this.analyzeScrollPatterns(),
            clickPatterns: this.analyzeClickPatterns(),
            typingSpeed: this.getTypingSpeed(),
            readingSpeed: this.estimateReadingSpeed(),
            attentionSpan: this.measureAttentionSpan(),
            navigationStyle: this.analyzeNavigationStyle()
        };
    }

    analyzeMousePatterns() {
        const movements = JSON.parse(sessionStorage.getItem('mouse_movements') || '[]');
        if (movements.length === 0) return null;

        return {
            speed: this.calculateAverageSpeed(movements),
            precision: this.calculatePrecision(movements),
            hesitation: this.detectHesitation(movements),
            pattern: this.classifyMovementPattern(movements)
        };
    }

    calculateAverageSpeed(movements) {
        if (movements.length < 2) return 0;

        let totalSpeed = 0;
        for (let i = 1; i < movements.length; i++) {
            const dx = movements[i].x - movements[i-1].x;
            const dy = movements[i].y - movements[i-1].y;
            const dt = movements[i].time - movements[i-1].time;
            const distance = Math.sqrt(dx*dx + dy*dy);
            totalSpeed += distance / (dt || 1);
        }

        return totalSpeed / (movements.length - 1);
    }

    calculatePrecision(movements) {
        // Measure how straight lines are (low deviation = high precision)
        // This would need actual implementation
        return 0.5; // Placeholder
    }

    detectHesitation(movements) {
        // Look for pauses or backtracking
        let hesitations = 0;
        for (let i = 2; i < movements.length; i++) {
            const dt = movements[i].time - movements[i-1].time;
            if (dt > 1000) hesitations++; // 1 second pause
        }
        return hesitations;
    }

    classifyMovementPattern(movements) {
        // Classify as: direct, exploratory, scanning, hunting
        // Based on movement entropy and direction changes
        return 'exploratory'; // Placeholder
    }

    analyzeScrollPatterns() {
        const scrolls = JSON.parse(sessionStorage.getItem('scroll_events') || '[]');
        return {
            maxDepth: Math.max(...scrolls.map(s => s.depth), 0),
            averageSpeed: scrolls.length > 0 ? scrolls.reduce((sum, s) => sum + (s.speed || 0), 0) / scrolls.length : 0,
            backtracking: scrolls.filter(s => s.direction === 'up').length
        };
    }

    analyzeClickPatterns() {
        const clicks = JSON.parse(sessionStorage.getItem('click_events') || '[]');
        return {
            total: clicks.length,
            doubleClicks: clicks.filter(c => c.type === 'dblclick').length,
            rightClicks: clicks.filter(c => c.button === 2).length,
            averageInterval: this.calculateAverageInterval(clicks)
        };
    }

    calculateAverageInterval(events) {
        if (events.length < 2) return 0;
        let totalInterval = 0;
        for (let i = 1; i < events.length; i++) {
            totalInterval += events[i].time - events[i-1].time;
        }
        return totalInterval / (events.length - 1);
    }

    getTypingSpeed() {
        // WPM calculation from form inputs
        const typing = sessionStorage.getItem('typing_speed');
        return typing ? parseInt(typing) : null;
    }

    estimateReadingSpeed() {
        // Estimate based on time spent on blog articles
        const timeOnPage = Date.now() - performance.timing.navigationStart;
        const wordsOnPage = document.body.innerText.split(/\s+/).length;
        const wpm = (wordsOnPage / (timeOnPage / 60000));
        return wpm > 1000 ? null : Math.round(wpm); // Filter outliers
    }

    measureAttentionSpan() {
        // How long before first tab switch / blur
        const firstBlur = sessionStorage.getItem('first_blur_time');
        return firstBlur ? parseInt(firstBlur) : null;
    }

    analyzeNavigationStyle() {
        // Do they use: mouse, keyboard, both?
        const keyboardNav = sessionStorage.getItem('keyboard_nav_count') || 0;
        const mouseNav = sessionStorage.getItem('mouse_nav_count') || 0;

        if (keyboardNav > mouseNav * 2) return 'keyboard-power-user';
        if (mouseNav > keyboardNav * 5) return 'mouse-only';
        return 'mixed';
    }

    /**
     * USAGE PATTERNS - Visit frequency, session duration, etc.
     */
    getUsagePatterns() {
        return {
            visits: {
                total: parseInt(localStorage.getItem('visit_count') || '0'),
                thisWeek: this.getVisitsThisWeek(),
                thisMonth: this.getVisitsThisMonth()
            },
            sessions: {
                averageDuration: this.getAverageSessionDuration(),
                longestSession: parseInt(localStorage.getItem('longest_session') || '0'),
                currentDuration: Date.now() - performance.timing.navigationStart
            },
            timeOfDay: this.getVisitTimeDistribution(),
            dayOfWeek: this.getVisitDayDistribution(),
            returningPattern: this.classifyReturningPattern()
        };
    }

    getVisitsThisWeek() {
        const visits = JSON.parse(localStorage.getItem('visit_history') || '[]');
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        return visits.filter(v => v > oneWeekAgo).length;
    }

    getVisitsThisMonth() {
        const visits = JSON.parse(localStorage.getItem('visit_history') || '[]');
        const oneMonthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        return visits.filter(v => v > oneMonthAgo).length;
    }

    getAverageSessionDuration() {
        const sessions = JSON.parse(localStorage.getItem('session_durations') || '[]');
        if (sessions.length === 0) return 0;
        return sessions.reduce((a, b) => a + b, 0) / sessions.length;
    }

    getVisitTimeDistribution() {
        const visits = JSON.parse(localStorage.getItem('visit_history') || '[]');
        const hours = visits.map(v => new Date(v).getHours());

        const distribution = {};
        hours.forEach(h => {
            distribution[h] = (distribution[h] || 0) + 1;
        });

        return distribution;
    }

    getVisitDayDistribution() {
        const visits = JSON.parse(localStorage.getItem('visit_history') || '[]');
        const days = visits.map(v => new Date(v).getDay());

        const distribution = {};
        days.forEach(d => {
            distribution[d] = (distribution[d] || 0) + 1;
        });

        return distribution;
    }

    classifyReturningPattern() {
        const visits = JSON.parse(localStorage.getItem('visit_history') || '[]');
        if (visits.length < 3) return 'new';

        const intervals = [];
        for (let i = 1; i < visits.length; i++) {
            intervals.push(visits[i] - visits[i-1]);
        }

        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const dayInMs = 24 * 60 * 60 * 1000;

        if (avgInterval < dayInMs) return 'obsessive';
        if (avgInterval < 3 * dayInMs) return 'frequent';
        if (avgInterval < 7 * dayInMs) return 'regular';
        if (avgInterval < 30 * dayInMs) return 'occasional';
        return 'rare';
    }

    /**
     * INTERACTION HISTORY - What they've discovered
     */
    getInteractionHistory() {
        return {
            discoveries: JSON.parse(localStorage.getItem('discoveries') || '[]'),
            easterEggs: JSON.parse(localStorage.getItem('easter_eggs_found') || '[]'),
            achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
            votes: JSON.parse(localStorage.getItem('terrellflautt_user_votes') || '{}'),
            conversations: parseInt(localStorage.getItem('genie_conversations') || '0'),
            logoClicks: parseInt(localStorage.getItem('logo_clicks') || '0'),
            sectionsVisited: JSON.parse(sessionStorage.getItem('sections_visited') || '[]')
        };
    }

    /**
     * PRIVACY MEASURES - What they're hiding
     */
    async getPrivacyMeasures() {
        return {
            adBlocker: await this.detectAdBlocker(),
            trackingProtection: this.detectTrackingProtection(),
            privateMode: this.detectPrivateMode(),
            vpn: this.profile.network?.vpnDetected || false,
            tor: this.profile.network?.torDetected || false,
            doNotTrack: navigator.doNotTrack === '1',
            cookiesBlocked: !navigator.cookieEnabled,
            canvasBlocking: await this.detectCanvasBlocking()
        };
    }

    async detectAdBlocker() {
        // Try to fetch a dummy ad script
        try {
            await fetch('/ads.js', { method: 'HEAD' });
            return false;
        } catch (e) {
            return true;
        }
    }

    detectTrackingProtection() {
        // Check if tracking scripts are blocked
        return typeof window.ga === 'undefined'; // Google Analytics
    }

    detectPrivateMode() {
        // Various techniques to detect incognito/private mode
        try {
            localStorage.setItem('test', '1');
            localStorage.removeItem('test');
            return false;
        } catch (e) {
            return true;
        }
    }

    async detectCanvasBlocking() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillText('test', 2, 2);
        const data = canvas.toDataURL();

        // Blocked canvases return consistent hash
        return data === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    }

    /**
     * SECURITY PROFILE - Risk assessment
     */
    getSecurityProfile() {
        return {
            riskScore: this.calculateRiskScore(),
            botProbability: this.assessBotProbability(),
            automationDetected: navigator.webdriver || false,
            suspiciousActivity: this.detectSuspiciousActivity()
        };
    }

    calculateRiskScore() {
        let score = 0;

        if (this.profile.privacy?.vpn) score += 2;
        if (this.profile.privacy?.tor) score += 5;
        if (this.profile.privacy?.privateMode) score += 1;
        if (this.profile.browser?.webdriver) score += 10;
        if (!this.profile.browser?.cookiesEnabled) score += 3;

        return Math.min(score, 10);
    }

    assessBotProbability() {
        const indicators = [];

        if (navigator.webdriver) indicators.push('webdriver');
        if (!navigator.languages || navigator.languages.length === 0) indicators.push('no-languages');
        if (navigator.plugins.length === 0) indicators.push('no-plugins');
        if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0 && /Mobile/i.test(navigator.userAgent)) {
            indicators.push('mobile-no-touch');
        }

        return {
            probability: indicators.length / 4,
            indicators
        };
    }

    detectSuspiciousActivity() {
        const suspicious = [];

        // Too many requests too fast
        const requestCount = parseInt(sessionStorage.getItem('request_count') || '0');
        if (requestCount > 100) suspicious.push('excessive-requests');

        // Impossible mouse movements
        const movements = JSON.parse(sessionStorage.getItem('mouse_movements') || '[]');
        if (movements.some(m => Math.abs(m.speed) > 10000)) suspicious.push('impossible-mouse-speed');

        return suspicious;
    }

    /**
     * PSYCHOLOGICAL INDICATORS - Personality insights
     */
    getPsychologicalIndicators() {
        return {
            curiosity: this.measureCuriosity(),
            patience: this.measurePatience(),
            attention: this.measureAttention(),
            explorationStyle: this.classifyExplorationStyle(),
            challengePreference: this.assessChallengePreference(),
            socialBehavior: this.analyzeSocialBehavior()
        };
    }

    measureCuriosity() {
        // Based on discoveries, clicks, exploration depth
        const discoveries = JSON.parse(localStorage.getItem('discoveries') || '[]').length;
        const easterEggs = JSON.parse(localStorage.getItem('easter_eggs_found') || '[]').length;
        const sectionsVisited = new Set(JSON.parse(sessionStorage.getItem('sections_visited') || '[]')).size;

        const score = (discoveries * 2) + (easterEggs * 3) + sectionsVisited;

        if (score > 50) return 'extremely-curious';
        if (score > 25) return 'very-curious';
        if (score > 10) return 'curious';
        return 'casual';
    }

    measurePatience() {
        // Based on puzzle solving time, return visits
        const longestSession = parseInt(localStorage.getItem('longest_session') || '0');
        const puzzleAttempts = JSON.parse(localStorage.getItem('puzzle_attempts') || '[]');

        if (longestSession > 30 * 60 * 1000) return 'very-patient'; // 30+ mins
        if (puzzleAttempts.length > 10) return 'persistent';
        if (longestSession > 10 * 60 * 1000) return 'patient';
        return 'impatient';
    }

    measureAttention() {
        // Based on scroll depth, time on page, focused time
        const scrollDepth = parseInt(sessionStorage.getItem('max_scroll') || '0');
        const focusedTime = parseInt(sessionStorage.getItem('focused_time') || '0');
        const timeOnPage = Date.now() - performance.timing.navigationStart;

        const focusRatio = focusedTime / timeOnPage;

        if (focusRatio > 0.8 && scrollDepth > 80) return 'highly-focused';
        if (focusRatio > 0.5) return 'focused';
        return 'easily-distracted';
    }

    classifyExplorationStyle() {
        // Linear (follows path) vs Chaotic (jumps around)
        const nav = JSON.parse(sessionStorage.getItem('navigation_history') || '[]');

        let backtracking = 0;
        for (let i = 1; i < nav.length; i++) {
            if (nav[i] === nav[i-1]) backtracking++;
        }

        if (backtracking / nav.length > 0.3) return 'methodical';
        if (new Set(nav).size / nav.length > 0.7) return 'exploratory';
        return 'linear';
    }

    assessChallengePreference() {
        // Do they try hard puzzles or stick to easy ones?
        const easterEggs = JSON.parse(localStorage.getItem('easter_eggs_found') || '[]');
        const hardEggs = easterEggs.filter(e => e.difficulty >= 4).length;

        if (hardEggs > 3) return 'challenge-seeker';
        if (easterEggs.length > 5) return 'achievement-focused';
        return 'casual';
    }

    analyzeSocialBehavior() {
        // Do they engage with community features?
        const votes = Object.keys(JSON.parse(localStorage.getItem('terrellflautt_user_votes') || '{}')).length;
        const feedback = localStorage.getItem('feedback_given') === 'true';
        const contributions = parseInt(localStorage.getItem('contribution_count') || '0');

        if (votes + contributions > 5) return 'active-contributor';
        if (feedback || votes > 0) return 'engaged';
        return 'observer';
    }

    /**
     * ADVANCED: Canvas Fingerprint (most unique identifier)
     */
    async generateFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Draw specific pattern
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('terrellflautt.com', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('terrellflautt.com', 4, 17);

        const hash = this.hashString(canvas.toDataURL());
        return hash;
    }

    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }

    async getDeviceId() {
        // Composite ID from multiple sources
        const components = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset(),
            this.profile.fingerprint || '',
            navigator.hardwareConcurrency || '',
            navigator.deviceMemory || ''
        ];

        return this.hashString(components.join('|'));
    }

    /**
     * Sync to DynamoDB
     */
    async syncToDynamoDB() {
        try {
            await fetch(`${this.apiUrl}/tracking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: this.userId,
                    profile: this.profile,
                    timestamp: Date.now()
                })
            });
        } catch (error) {
            console.debug('Profile sync failed (graceful):', error);
        }
    }

    /**
     * Continuous monitoring
     */
    startContinuousMonitoring() {
        // Update profile every 30 seconds
        setInterval(() => {
            this.collectAllData();
            this.syncToDynamoDB();
        }, 30000);
    }
}

// Initialize
if (typeof window !== 'undefined') {
    window.deepUserProfiler = new DeepUserProfiler();
}
