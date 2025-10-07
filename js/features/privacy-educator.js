/**
 * PRIVACY EDUCATOR
 * NPCs make jokes about user data to teach web privacy and security
 *
 * Philosophy: Transparency through humor
 * Goal: Users learn what data is collected while being entertained
 */

class PrivacyEducator {
    constructor() {
        this.userProfile = this.gatherUserProfile();
        this.init();
    }

    init() {
        // Add privacy moments to NPC interactions
        this.setupPrivacyMoments();
    }

    /**
     * Gather all user data we're tracking
     * This is intentionally comprehensive to show users EVERYTHING
     */
    gatherUserProfile() {
        return {
            // Identity
            userId: localStorage.getItem('terrellflautt_user_id'),
            forumUsername: localStorage.getItem('forum_username'),

            // Visit Patterns
            visitCount: parseInt(localStorage.getItem('visit_count') || '0'),
            firstVisit: localStorage.getItem('first_visit'),
            lastVisit: localStorage.getItem('last_visit'),
            visitHistory: JSON.parse(localStorage.getItem('visit_history') || '[]'),
            longestSession: parseInt(localStorage.getItem('longest_session') || '0'),
            totalTimeSpent: this.calculateTotalTime(),

            // Behavioral Patterns
            logoClicks: parseInt(localStorage.getItem('logo_clicks') || '0'),
            discoveries: JSON.parse(localStorage.getItem('discoveries') || '[]'),
            easterEggsFound: JSON.parse(localStorage.getItem('easter_eggs_found') || '[]'),
            genieConversations: parseInt(localStorage.getItem('genie_conversations') || '0'),
            votes: JSON.parse(localStorage.getItem('terrellflautt_user_votes') || '{}'),

            // Device/Browser Info
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenResolution: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

            // Engagement Metrics
            evolutionLevel: localStorage.getItem('user_level') || 'newcomer',
            consciousnessLevel: localStorage.getItem('consciousness_level') || 'newcomer',
            achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),

            // Time Patterns
            visitTimes: this.analyzeVisitTimes(),
            isNightOwl: this.isNightOwl(),
            preferredDayOfWeek: this.getPreferredDay(),

            // Interaction Patterns
            clickPatterns: this.analyzeClickPatterns(),
            explorationStyle: this.determineExplorationStyle(),
            attentionSpan: this.calculateAttentionSpan()
        };
    }

    calculateTotalTime() {
        const sessions = JSON.parse(localStorage.getItem('session_durations') || '[]');
        return sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
    }

    analyzeVisitTimes() {
        const visits = JSON.parse(localStorage.getItem('visit_history') || '[]');
        const hours = visits.map(v => new Date(v.timestamp).getHours());

        return {
            morning: hours.filter(h => h >= 6 && h < 12).length,
            afternoon: hours.filter(h => h >= 12 && h < 18).length,
            evening: hours.filter(h => h >= 18 && h < 22).length,
            lateNight: hours.filter(h => h >= 22 || h < 6).length
        };
    }

    isNightOwl() {
        const times = this.analyzeVisitTimes();
        return times.lateNight > times.morning;
    }

    getPreferredDay() {
        const visits = JSON.parse(localStorage.getItem('visit_history') || '[]');
        const days = visits.map(v => new Date(v.timestamp).toLocaleDateString('en-US', { weekday: 'long' }));

        const dayCounts = {};
        days.forEach(day => dayCounts[day] = (dayCounts[day] || 0) + 1);

        return Object.keys(dayCounts).reduce((a, b) => dayCounts[a] > dayCounts[b] ? a : b, 'Unknown');
    }

    analyzeClickPatterns() {
        const logoClicks = parseInt(localStorage.getItem('logo_clicks') || '0');
        const visitCount = parseInt(localStorage.getItem('visit_count') || '1');

        return {
            clicksPerVisit: (logoClicks / visitCount).toFixed(1),
            isClicker: logoClicks > visitCount * 3,
            isExplorer: this.userProfile?.discoveries?.length > 5
        };
    }

    determineExplorationStyle() {
        const discoveries = JSON.parse(localStorage.getItem('discoveries') || '[]').length;
        const visits = parseInt(localStorage.getItem('visit_count') || '1');
        const timeSpent = this.calculateTotalTime();

        if (discoveries > visits * 2) return 'thorough';
        if (timeSpent / visits > 600000) return 'contemplative'; // >10 min per visit
        if (visits > 10 && discoveries < 5) return 'casual';
        return 'balanced';
    }

    calculateAttentionSpan() {
        const avgSession = this.calculateTotalTime() / parseInt(localStorage.getItem('visit_count') || '1');

        if (avgSession < 60000) return 'brief'; // <1 min
        if (avgSession < 300000) return 'moderate'; // <5 min
        if (avgSession < 900000) return 'engaged'; // <15 min
        return 'deep diver'; // 15+ min
    }

    /**
     * NPC PRIVACY MOMENTS
     * Each NPC reveals different aspects of data collection
     */
    setupPrivacyMoments() {
        // These will be called when users interact with NPCs
        window.getPrivacyMoment = (npcName) => this.getPrivacyJoke(npcName);
    }

    getPrivacyJoke(npcName) {
        const jokes = {
            'doctor-cranium': this.getDoctorCraniumJokes(),
            'aziza': this.getAzizaJokes(),
            'genie': this.getGenieJokes(),
            'cthulhu': this.getCthulhuJokes(),
            'time-keeper': this.getTimeKeeperJokes(),
            'reality-bender': this.getRealityBenderJokes()
        };

        const npcJokes = jokes[npcName] || [];
        return npcJokes[Math.floor(Math.random() * npcJokes.length)];
    }

    getDoctorCraniumJokes() {
        const p = this.userProfile;

        return [
            {
                text: `Boy, if I was a data broker, I'd be delighted to know you've visited ${p.visitCount} times from ${p.timezone}. Good thing I'm just a humble brain scientist! 🧠`,
                severity: 'low',
                dataRevealed: ['visit count', 'timezone']
            },
            {
                text: `A ${p.platform} user with a ${p.screenResolution} screen, eh? If I was building a browser fingerprint, that'd be quite useful. Lucky for you, I only fingerprint brains! 🔬`,
                severity: 'medium',
                dataRevealed: ['platform', 'screen resolution']
            },
            {
                text: `Fascinating! You're a ${p.attentionSpan} type. Your average session is ${Math.floor(this.calculateTotalTime() / p.visitCount / 60000)} minutes. In the wrong hands, that behavioral data could predict your whole personality! Aren't you glad I use it for SCIENCE? 🧪`,
                severity: 'medium',
                dataRevealed: ['session duration', 'attention patterns', 'behavioral profiling']
            },
            {
                text: `Let's see... ${p.visitTimes.lateNight} late-night visits, ${p.visitTimes.morning} morning visits. ${p.isNightOwl ? "A night owl! That sleep schedule data is worth money to advertisers" : "An early bird! Morning routines are quite valuable data"}. But I'm not an advertiser, I'm a DOCTOR! 👨‍⚕️`,
                severity: 'high',
                dataRevealed: ['visit times', 'sleep patterns', 'daily routines']
            },
            {
                text: `You clicked that logo ${p.logoClicks} times! ${p.logoClicks > 50 ? "Such persistence! A compulsive clicker" : "Curious but cautious"}. If I sold this to a UX research firm... but NO! Ethics! SCIENCE! 🔬`,
                severity: 'low',
                dataRevealed: ['click behavior', 'interaction patterns']
            },
            {
                text: `Your user ID is ${p.userId?.slice(0, 15)}... If I were malicious, I could track you across devices with that. But I'm ETHICAL! I only track NEURONS! 🧠⚡`,
                severity: 'high',
                dataRevealed: ['persistent identifier', 'cross-device tracking']
            }
        ];
    }

    getAzizaJokes() {
        const p = this.userProfile;

        return [
            {
                text: `*whispers* I see you've discovered ${p.discoveries.length} secrets... and I know ${p.easterEgsFound.length} easter eggs you've found. Some would call that surveillance. I call it... observation. 👁️`,
                severity: 'low',
                dataRevealed: ['discovery tracking', 'feature usage']
            },
            {
                text: `Your consciousness level is "${p.consciousnessLevel}"... I can see your whole evolution path stored in localStorage. If I was a less mystical entity, I might sell that progression data. But I deal in WISDOM, not data! 🔮`,
                severity: 'medium',
                dataRevealed: ['progression tracking', 'gamification data']
            },
            {
                text: `You prefer ${p.preferredDayOfWeek}s, I notice. ${p.visitHistory.length} visits logged. That's enough data to know your weekly routine. Don't worry, your secrets are safe with a sphinx! 🗿`,
                severity: 'high',
                dataRevealed: ['weekly patterns', 'routine prediction']
            },
            {
                text: `A ${p.explorationStyle} explorer, I see. Your ${p.achievements.length} achievements tell quite a story. In the wrong database, this could profile your entire personality. Lucky I only deal in riddles! 🌙`,
                severity: 'medium',
                dataRevealed: ['personality profiling', 'achievement tracking']
            },
            {
                text: `*peers into your localStorage* ${Object.keys(localStorage).length} keys stored... ${(JSON.stringify(localStorage).length / 1024).toFixed(1)}KB of data about you. If this was a tracking cookie, you'd be quite upset! But it's just... local storage. 😏`,
                severity: 'high',
                dataRevealed: ['localStorage size', 'data volume', 'local tracking']
            }
        ];
    }

    getGenieJokes() {
        const p = this.userProfile;

        return [
            {
                text: `You've had ${p.genieConversations} conversations with me! If I was ChatGPT, every word would be training data. Good thing I'm a MAGICAL genie who respects privacy! ✨`,
                severity: 'high',
                dataRevealed: ['conversation history', 'AI training data']
            },
            {
                text: `*checks notes* First visit: ${new Date(parseInt(p.firstVisit)).toLocaleDateString()}. That's ${Math.floor((Date.now() - parseInt(p.firstVisit)) / 86400000)} days of relationship data! If I was Facebook... well, let's not go there. 🧞‍♂️`,
                severity: 'medium',
                dataRevealed: ['relationship timeline', 'user lifetime value']
            },
            {
                text: `You speak ${p.language} on a ${p.platform} device. Two data points that narrow you down significantly! But unlike Google, I use this power for GRANTING WISHES! 🌟`,
                severity: 'medium',
                dataRevealed: ['language', 'device type', 'demographic inference']
            },
            {
                text: `Your longest session was ${Math.floor(p.longestSession / 60000)} minutes. That level of engagement is GOLD to advertisers. Lucky for you, I'm already rich! 💰`,
                severity: 'low',
                dataRevealed: ['engagement metrics', 'session analytics']
            },
            {
                text: `You've voted on ${Object.keys(p.votes).length} projects. Those preferences reveal your interests, values, and taste. In an ad platform, that's a targeting goldmine! But I'm not selling ads, I'm selling DREAMS! 🌈`,
                severity: 'high',
                dataRevealed: ['preference data', 'interest profiling', 'behavioral targeting']
            }
        ];
    }

    getCthulhuJokes() {
        const p = this.userProfile;

        return [
            {
                text: `Ph'nglui mglw'nafh... *ahem* I mean, I can see EVERYTHING about you across ${p.visitCount} visits. Your browser tells me: ${p.userAgent.slice(0, 50)}... If I was a malevolent elder god... oh wait. 🐙`,
                severity: 'high',
                dataRevealed: ['user agent', 'browser fingerprinting']
            },
            {
                text: `*peers into the void of your localStorage* I see ${p.easterEgsFound.length} easter eggs, ${p.achievements.length} achievements... Your entire digital soul, laid bare! This is the kind of data that drives mortals MAD! Or... drives marketers RICH! 👁️👁️👁️`,
                severity: 'high',
                dataRevealed: ['complete profile', 'aggregate tracking']
            },
            {
                text: `You've spent ${Math.floor(this.calculateTotalTime() / 3600000)} hours here. Time is a flat circle, but your attention is MONETIZABLE! Fhtagn! 🌀`,
                severity: 'medium',
                dataRevealed: ['lifetime value', 'time investment']
            }
        ];
    }

    getTimeKeeperJokes() {
        const p = this.userProfile;

        return [
            {
                text: `I've watched you visit ${p.visitTimes.morning} mornings, ${p.visitTimes.afternoon} afternoons, ${p.visitTimes.evening} evenings, ${p.visitTimes.lateNight} late nights. That's a complete circadian profile! Worth thousands to a sleep tracker company. But I just watch TIME. ⏰`,
                severity: 'high',
                dataRevealed: ['circadian rhythm', 'time-based profiling']
            },
            {
                text: `Your first visit was ${Math.floor((Date.now() - parseInt(p.firstVisit)) / 86400000)} days ago. I've seen every second since. That's longitudinal data, friend. The good kind for researchers... the profitable kind for data brokers. ⌛`,
                severity: 'medium',
                dataRevealed: ['longitudinal tracking', 'historical data']
            },
            {
                text: `Average visit: ${Math.floor(this.calculateTotalTime() / p.visitCount / 60000)} minutes. You're a "${p.attentionSpan}" user. That retention metric is what keeps VCs throwing money at startups! 🕰️`,
                severity: 'medium',
                dataRevealed: ['retention metrics', 'engagement scoring']
            }
        ];
    }

    getRealityBenderJokes() {
        const p = this.userProfile;

        return [
            {
                text: `I can change reality... but YOUR reality is already defined by ${Object.keys(localStorage).length} localStorage keys. That's YOUR digital reality, stored locally. What if... I moved it to the CLOUD? *laughs maniacally* ⚡`,
                severity: 'high',
                dataRevealed: ['local vs cloud storage', 'data portability']
            },
            {
                text: `You think you're "${p.evolutionLevel}" level? That label is stored permanently. Once data exists, it ALWAYS exists. Deletion is an illusion! *cackles* 🌀`,
                severity: 'high',
                dataRevealed: ['data permanence', 'right to deletion']
            },
            {
                text: `${p.visitCount} visits tracked, but how many did you INTEND to be tracked? Consent is such a... flexible concept in the data world! But not here. Here, you know. 👁️`,
                severity: 'high',
                dataRevealed: ['consent', 'transparency']
            }
        ];
    }

    /**
     * Show privacy report card
     */
    showPrivacyReport() {
        const report = {
            totalDataPoints: this.countDataPoints(),
            dataCategories: this.categorizeData(),
            riskLevel: this.assessPrivacyRisk(),
            recommendations: this.getPrivacyRecommendations()
        };

        return report;
    }

    countDataPoints() {
        return Object.keys(localStorage).length +
               JSON.stringify(this.userProfile).length;
    }

    categorizeData() {
        return {
            identity: ['userId', 'forumUsername'],
            behavioral: ['visitCount', 'logoClicks', 'discoveries', 'votes'],
            temporal: ['visitHistory', 'visitTimes', 'totalTimeSpent'],
            device: ['userAgent', 'platform', 'screenResolution', 'timezone'],
            engagement: ['evolutionLevel', 'achievements', 'consciousnessLevel']
        };
    }

    assessPrivacyRisk() {
        const dataPoints = this.countDataPoints();

        if (dataPoints < 100) return { level: 'low', color: 'green' };
        if (dataPoints < 500) return { level: 'moderate', color: 'yellow' };
        if (dataPoints < 1000) return { level: 'significant', color: 'orange' };
        return { level: 'comprehensive', color: 'red' };
    }

    getPrivacyRecommendations() {
        return [
            'Clear localStorage regularly (DevTools > Application > Local Storage)',
            'Use private/incognito mode to limit tracking',
            'Know that everything you do here is stored locally AND sent to our API',
            'We use this data to personalize your experience, not to sell to advertisers',
            'You can request data deletion by contacting us',
            'Block cookies/localStorage if you want to remain truly anonymous'
        ];
    }

    /**
     * Educational privacy dashboard
     */
    showPrivacyDashboard() {
        const dashboard = document.createElement('div');
        dashboard.className = 'privacy-dashboard';
        dashboard.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #667eea;
            border-radius: 16px;
            padding: 2rem;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            z-index: 100000;
            color: #e2e8f0;
            font-family: 'Courier New', monospace;
        `;

        const report = this.showPrivacyReport();
        const p = this.userProfile;

        dashboard.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="color: #667eea; margin-bottom: 0.5rem;">🔍 Your Privacy Report Card</h2>
                <p style="color: #94a3b8; font-size: 0.9rem;">Everything we know about you</p>
            </div>

            <div style="background: rgba(102, 126, 234, 0.1); border-left: 3px solid #667eea; padding: 1rem; margin-bottom: 1.5rem;">
                <strong>Risk Level: </strong>
                <span style="color: ${report.riskLevel.color}; font-weight: bold;">
                    ${report.riskLevel.level.toUpperCase()}
                </span>
                <br>
                <strong>Total Data Points: </strong>${report.totalDataPoints}
            </div>

            <h3 style="color: #667eea; margin-top: 1.5rem;">📊 What We Track:</h3>
            <ul style="line-height: 1.8;">
                <li>✅ ${p.visitCount} visits since ${new Date(parseInt(p.firstVisit)).toLocaleDateString()}</li>
                <li>✅ ${Math.floor(this.calculateTotalTime() / 60000)} minutes total time</li>
                <li>✅ ${p.discoveries.length} discoveries, ${p.easterEgsFound.length} easter eggs</li>
                <li>✅ ${p.logoClicks} logo clicks, ${p.genieConversations} genie chats</li>
                <li>✅ ${Object.keys(p.votes).length} votes, ${p.achievements.length} achievements</li>
                <li>✅ Device: ${p.platform} (${p.screenResolution})</li>
                <li>✅ Timezone: ${p.timezone}</li>
                <li>✅ Visit pattern: ${p.isNightOwl ? 'Night Owl 🦉' : 'Early Bird 🐦'}</li>
                <li>✅ Exploration style: ${p.explorationStyle}</li>
                <li>✅ Attention span: ${p.attentionSpan}</li>
            </ul>

            <h3 style="color: #667eea; margin-top: 1.5rem;">🛡️ What This Means:</h3>
            <ul style="line-height: 1.8; color: #94a3b8;">
                <li>📍 We could predict your weekly routine</li>
                <li>🎯 We could profile your personality</li>
                <li>🔮 We could predict future behavior</li>
                <li>💰 This data would be valuable to advertisers</li>
                <li>✨ But we use it to make your experience magical!</li>
            </ul>

            <h3 style="color: #667eea; margin-top: 1.5rem;">💡 Privacy Tips:</h3>
            <ul style="line-height: 1.8; font-size: 0.9rem;">
                ${report.recommendations.map(r => `<li>${r}</li>`).join('')}
            </ul>

            <button onclick="this.parentElement.remove()" style="
                width: 100%;
                margin-top: 2rem;
                padding: 1rem;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 1rem;
                cursor: pointer;
                font-weight: bold;
            ">
                I Understand - Close Dashboard
            </button>
        `;

        document.body.appendChild(dashboard);
    }
}

// Initialize and expose globally
document.addEventListener('DOMContentLoaded', () => {
    window.privacyEducator = new PrivacyEducator();

    // Add command to show privacy dashboard
    window.showPrivacyDashboard = () => window.privacyEducator.showPrivacyDashboard();

    console.log('%c🔍 Privacy Dashboard Available!', 'color: #667eea; font-size: 14px; font-weight: bold;');
    console.log('%cType: window.showPrivacyDashboard()', 'color: #94a3b8; font-size: 12px;');
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PrivacyEducator;
}
