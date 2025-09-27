/**
 * Subtle Logo Evolution System
 * Peaceful logo transformations based on user curiosity
 */

class LogoEvolution {
    constructor() {
        this.clickCount = 0;
        this.logoElement = null;
        this.originalText = 'Terrell K. Flautt';
        this.userProfile = this.getUserProfile();
        this.sessionTime = 0;
        this.evolutions = [
            'T.K. Flautt',
            'T. Flautt',
            'T.F.',
            'TF',
            '⚡',
            '🔮',
            '✨'
        ];
        this.currentEvolution = 0;
        this.isEvolved = false;
        this.resetTimeout = null;
        this.sessionEvolutionApplied = false;

        this.init();
    }

    init() {
        this.logoElement = document.querySelector('.logo-text');
        if (this.logoElement) {
            this.setupLogoClicks();
            this.startSessionTracking();
            this.checkForSessionEvolution();
        }
    }

    setupLogoClicks() {
        this.logoElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogoClick();
        });

        // Add subtle cursor hint
        this.logoElement.style.cursor = 'pointer';
        this.logoElement.style.transition = 'all 0.5s ease';
    }

    handleLogoClick() {
        this.clickCount++;

        // Clear any existing reset timeout
        if (this.resetTimeout) {
            clearTimeout(this.resetTimeout);
        }

        // Evolve logo based on click count
        if (this.clickCount >= 3) {
            this.evolveLogo();
        }

        // Subtle feedback for each click
        this.logoElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.logoElement.style.transform = 'scale(1)';
        }, 100);

        // Reset after 10 seconds of no clicks
        this.resetTimeout = setTimeout(() => {
            this.resetLogo();
        }, 10000);
    }

    evolveLogo() {
        if (this.currentEvolution < this.evolutions.length) {
            const newText = this.evolutions[this.currentEvolution];

            // Peaceful fade transition
            this.logoElement.style.opacity = '0.5';

            setTimeout(() => {
                this.logoElement.textContent = newText;
                this.logoElement.style.opacity = '1';
                this.isEvolved = true;

                // Special effects for certain evolutions
                this.addEvolutionEffects(this.currentEvolution);

                this.currentEvolution++;
            }, 250);

            // Track evolution in memory palace if available
            if (window.memoryPalace) {
                window.memoryPalace.recordUserAction('logo_evolution', {
                    evolution: this.currentEvolution,
                    clickCount: this.clickCount
                });
            }
        }
    }

    addEvolutionEffects(evolutionLevel) {
        switch(evolutionLevel) {
            case 4: // ⚡ evolution
                this.addGlowEffect('#00ffff');
                break;
            case 5: // 🔮 evolution
                this.addGlowEffect('#9966ff');
                this.unlockSpecialFeature();
                break;
            case 6: // ✨ evolution
                this.addGlowEffect('#ffd700');
                this.unlockLogoMaker();
                break;
        }
    }

    addGlowEffect(color) {
        this.logoElement.style.textShadow = `0 0 10px ${color}, 0 0 20px ${color}40, 0 0 30px ${color}20`;

        setTimeout(() => {
            this.logoElement.style.textShadow = '';
        }, 3000);
    }

    unlockSpecialFeature() {
        // Reveal logo maker hint very subtly
        const hint = document.createElement('div');
        hint.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: #9966ff;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.75rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 2s ease;
            pointer-events: none;
        `;
        hint.textContent = 'You sense something awakening...';

        document.body.appendChild(hint);

        setTimeout(() => {
            hint.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            hint.style.opacity = '0';
            setTimeout(() => hint.remove(), 2000);
        }, 3000);
    }

    unlockLogoMaker() {
        // Show logo maker portal very subtly
        const portal = document.createElement('div');
        portal.id = 'logo-maker-portal';
        portal.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: linear-gradient(45deg, #ffd700, #ff6b6b);
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            transition: all 1s ease;
            z-index: 1000;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        `;

        portal.addEventListener('click', () => {
            this.openLogoMaker();
        });

        document.body.appendChild(portal);

        setTimeout(() => {
            portal.style.opacity = '0.7';
        }, 500);

        // Show hint
        this.showLogoMakerHint();
    }

    showLogoMakerHint() {
        const hint = document.createElement('div');
        hint.style.cssText = `
            position: fixed;
            bottom: 70px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: #ffd700;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.75rem;
            z-index: 1001;
            opacity: 0;
            transition: opacity 2s ease;
            pointer-events: none;
            max-width: 150px;
            text-align: center;
        `;
        hint.textContent = 'Logo Maker Unlocked! Click the golden orb.';

        document.body.appendChild(hint);

        setTimeout(() => {
            hint.style.opacity = '1';
        }, 1000);

        setTimeout(() => {
            hint.style.opacity = '0';
            setTimeout(() => hint.remove(), 2000);
        }, 5000);
    }

    openLogoMaker() {
        // Open logo maker in new tab
        window.open('https://logo.terrellflautt.com', '_blank');

        // Track this achievement
        if (window.memoryPalace) {
            window.memoryPalace.recordUserAction('logo_maker_unlocked', {
                totalClicks: this.clickCount,
                timestamp: Date.now()
            });
        }

        // Hide the portal after use
        const portal = document.getElementById('logo-maker-portal');
        if (portal) {
            portal.style.opacity = '0';
            setTimeout(() => portal.remove(), 1000);
        }
    }

    getUserProfile() {
        // Check for user profile from various sources
        const memoryPalaceUser = localStorage.getItem('terrellflautt_user_profile');
        const donorProfile = localStorage.getItem('terrellflautt_current_donor');
        const leaderboardUser = localStorage.getItem('terrellflautt_current_user');

        if (memoryPalaceUser) {
            return JSON.parse(memoryPalaceUser);
        }
        if (donorProfile) {
            return JSON.parse(donorProfile);
        }
        if (leaderboardUser) {
            return JSON.parse(leaderboardUser);
        }

        return null;
    }

    startSessionTracking() {
        // Track session time for logo evolution
        setInterval(() => {
            this.sessionTime += 30; // 30 seconds
            this.checkForSessionEvolution();
        }, 30000);
    }

    checkForSessionEvolution() {
        const visitCount = parseInt(localStorage.getItem('terrellflautt_visit_count') || '0');
        const totalTime = parseInt(localStorage.getItem('terrellflautt_total_time') || '0');

        // After 3+ visits and 2+ minutes on current session, evolve to T.K.
        if (!this.sessionEvolutionApplied &&
            visitCount >= 3 &&
            this.sessionTime >= 120 &&
            totalTime > 300000) { // 5+ minutes total

            this.applySessionEvolution();
        }

        // If user has a chosen name and high engagement, use their name
        if (!this.sessionEvolutionApplied &&
            this.userProfile &&
            this.userProfile.username &&
            visitCount >= 5 &&
            this.sessionTime >= 180) { // 3 minutes current session

            this.applyPersonalizedEvolution();
        }
    }

    applySessionEvolution() {
        if (this.isEvolved) return;

        this.sessionEvolutionApplied = true;
        this.logoElement.style.transition = 'opacity 3s ease';
        this.logoElement.style.opacity = '0.5';

        setTimeout(() => {
            this.logoElement.textContent = 'T.K.';
            this.logoElement.style.opacity = '1';
            this.isEvolved = true;

            // Subtle notification
            this.showEvolutionMessage('Welcome back, friend.');
        }, 1500);
    }

    applyPersonalizedEvolution() {
        if (this.isEvolved || !this.userProfile?.username) return;

        this.sessionEvolutionApplied = true;
        this.logoElement.style.transition = 'opacity 3s ease';
        this.logoElement.style.opacity = '0.5';

        setTimeout(() => {
            this.logoElement.textContent = this.userProfile.username;
            this.logoElement.style.opacity = '1';
            this.isEvolved = true;

            // Personal welcome
            this.showEvolutionMessage(`Welcome back, ${this.userProfile.username}.`);
        }, 1500);
    }

    showEvolutionMessage(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: rgba(255, 255, 255, 0.8);
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 0.75rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 3s ease;
            pointer-events: none;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 3000);
        }, 4000);
    }

    resetLogo() {
        if (this.isEvolved && !this.sessionEvolutionApplied) {
            this.logoElement.style.opacity = '0.5';

            setTimeout(() => {
                this.logoElement.textContent = this.originalText;
                this.logoElement.style.opacity = '1';
                this.logoElement.style.textShadow = '';
                this.isEvolved = false;
                this.currentEvolution = 0;
                this.clickCount = 0;
            }, 250);
        }
    }

    // Public method to trigger evolution programmatically
    triggerEvolution(level) {
        this.clickCount = Math.max(3, level);
        this.currentEvolution = level;
        this.evolveLogo();
    }

    // Get current state
    getCurrentState() {
        return {
            clickCount: this.clickCount,
            currentEvolution: this.currentEvolution,
            isEvolved: this.isEvolved,
            currentText: this.logoElement ? this.logoElement.textContent : null
        };
    }
}

// Initialize logo evolution
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.logoEvolution = new LogoEvolution();
    });
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LogoEvolution;
}