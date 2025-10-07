/**
 * Returning Visitor Evolution System
 * Peaceful, gradual enhancements for returning users
 */

class ReturningVisitorEvolution {
    constructor() {
        this.visitCount = parseInt(localStorage.getItem('terrellflautt_visit_count') || '0');
        this.lastVisit = parseInt(localStorage.getItem('terrellflautt_last_visit') || '0');
        this.totalTimeSpent = parseInt(localStorage.getItem('terrellflautt_total_time') || '0');
        this.currentSessionStart = Date.now();
        this.preferences = JSON.parse(localStorage.getItem('terrellflautt_preferences') || '{}');

        this.incrementVisitCount();
        this.init();
    }

    init() {
        this.trackCurrentSession();
        this.activatePersonalizations();
        this.enableGradualFeatures();

        // Track session time
        setInterval(() => {
            this.updateSessionTime();
        }, 30000); // Every 30 seconds
    }

    incrementVisitCount() {
        this.visitCount++;
        localStorage.setItem('terrellflautt_visit_count', this.visitCount.toString());
        localStorage.setItem('terrellflautt_last_visit', Date.now().toString());
    }

    trackCurrentSession() {
        // Track session duration
        window.addEventListener('beforeunload', () => {
            this.saveSessionData();
        });

        // Auto-save every minute
        setInterval(() => {
            this.saveSessionData();
        }, 60000);
    }

    updateSessionTime() {
        const sessionTime = Date.now() - this.currentSessionStart;
        this.totalTimeSpent += 30000; // Add 30 seconds
        localStorage.setItem('terrellflautt_total_time', this.totalTimeSpent.toString());
    }

    saveSessionData() {
        const sessionDuration = Date.now() - this.currentSessionStart;
        this.totalTimeSpent += sessionDuration;
        localStorage.setItem('terrellflautt_total_time', this.totalTimeSpent.toString());
    }

    activatePersonalizations() {
        // Apply saved preferences very subtly
        if (this.preferences.preferredSection) {
            setTimeout(() => {
                this.highlightPreferredSection(this.preferences.preferredSection);
            }, 3000);
        }

        if (this.visitCount > 3) {
            this.enableSubtleHints();
        }

        if (this.visitCount > 5) {
            this.enableAdvancedFeatures();
        }
    }

    // Backward compatibility alias
    applyPersonalizations() {
        return this.activatePersonalizations();
    }

    highlightPreferredSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.transition = 'box-shadow 3s ease';
            section.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.1)';

            setTimeout(() => {
                section.style.boxShadow = '';
            }, 5000);
        }
    }

    enableSubtleHints() {
        // Very subtle hints for returning visitors
        if (this.visitCount >= 3) {
            setTimeout(() => {
                this.showSubtleWelcomeBack();
            }, 5000);
        }
    }

    enableGradualFeatures() {
        // Gradually unlock features based on engagement
        if (this.visitCount >= 2) {
            this.enableJourneyDiscovery();
        }

        if (this.visitCount >= 5) {
            this.enableAdvancedInteractions();
        }
    }

    enableJourneyDiscovery() {
        // Make journey button slightly more visible for returning visitors
        setTimeout(() => {
            const journeyBtn = document.getElementById('journey-gateway');
            if (journeyBtn && this.totalTimeSpent > 120000) { // After 2 minutes total
                journeyBtn.style.opacity = '0.3';
            }
        }, 30000); // After 30 seconds on current visit
    }

    enableAdvancedInteractions() {
        // Enable advanced features for highly engaged users
        if (this.totalTimeSpent > 600000) { // 10 minutes total
            this.unlockAdvancedFeatures();
        }
    }

    enableAdvancedFeatures() {
        // Advanced features for very engaged returning visitors
        console.log('Advanced features enabled for returning visitor');
    }

    unlockAdvancedFeatures() {
        // Unlock the most advanced features
        console.log('Advanced features unlocked for highly engaged visitor');
    }

    showSubtleWelcomeBack() {
        if (this.visitCount <= 3) return; // Only for frequent visitors

        const welcomeMessage = document.createElement('div');
        welcomeMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 0.85rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 3s ease;
            pointer-events: none;
        `;
        welcomeMessage.textContent = `Welcome back! Visit #${this.visitCount}`;

        document.body.appendChild(welcomeMessage);

        setTimeout(() => {
            welcomeMessage.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            welcomeMessage.style.opacity = '0';
            setTimeout(() => welcomeMessage.remove(), 3000);
        }, 4000);
    }

    recordPreference(key, value) {
        this.preferences[key] = value;
        localStorage.setItem('terrellflautt_preferences', JSON.stringify(this.preferences));
    }

    getEngagementLevel() {
        const minutes = this.totalTimeSpent / 60000;

        if (minutes < 1) return 'new';
        if (minutes < 5) return 'exploring';
        if (minutes < 15) return 'interested';
        if (minutes < 30) return 'engaged';
        return 'devoted';
    }

    getVisitorType() {
        if (this.visitCount === 1) return 'first-time';
        if (this.visitCount <= 3) return 'returning';
        if (this.visitCount <= 10) return 'regular';
        return 'frequent';
    }
}

// Initialize for returning visitors - only if not already initialized
if (typeof window !== 'undefined' && !window.returningVisitorEvolution) {
    window.returningVisitorEvolutionSimple = new ReturningVisitorEvolution();
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReturningVisitorEvolution;
}