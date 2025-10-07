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
            this.checkForPendingRevert();
            this.setupLogoClicks();
            this.startSessionTracking();
            this.checkForSessionEvolution();
        }
    }

    checkForPendingRevert() {
        // Check if logo should revert from previous session
        const shouldRevert = localStorage.getItem('terrellflautt_logo_should_revert');
        if (shouldRevert === 'true') {
            // Ensure logo is original text and clear the flag
            this.logoElement.textContent = this.originalText;
            localStorage.removeItem('terrellflautt_logo_should_revert');

            // Subtle hint that something changed
            setTimeout(() => {
                this.showEvolutionMessage('Something feels different...');
            }, 3000);
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

        // Add subtle hover effects to hint at interactivity
        this.logoElement.addEventListener('mouseenter', () => {
            this.logoElement.style.transform = 'scale(1.02)';
            this.logoElement.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.2)';
        });

        this.logoElement.addEventListener('mouseleave', () => {
            this.logoElement.style.transform = 'scale(1)';
            this.logoElement.style.textShadow = '';
        });

        // Subtle first-time visitor hint
        const visitCount = parseInt(localStorage.getItem('terrellflautt_visit_count') || '0');
        if (visitCount <= 2) {
            setTimeout(() => {
                this.showFirstTimeHint();
            }, 12000); // After 12 seconds, give a gentle hint
        }
    }

    showFirstTimeHint() {
        // Check if user has already discovered clicking
        const hasClickedLogo = localStorage.getItem('terrellflautt_logo_discovery');
        if (hasClickedLogo) return;

        const hint = document.createElement('div');
        hint.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: rgba(255, 255, 255, 0.7);
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 0.7rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 2s ease;
            pointer-events: none;
            white-space: nowrap;
        `;
        hint.textContent = 'psst... try clicking';

        this.logoElement.style.position = 'relative';
        this.logoElement.appendChild(hint);

        setTimeout(() => {
            hint.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            hint.style.opacity = '0';
            setTimeout(() => {
                if (hint.parentNode) hint.remove();
            }, 2000);
        }, 4000);
    }

    handleLogoClick() {
        this.clickCount++;

        // Track discovery on first click
        if (this.clickCount === 1) {
            localStorage.setItem('terrellflautt_logo_discovery', 'true');
            this.showDiscoveryEncouragement();
            this.addLogoMakerToMenu(); // Add menu item after first interaction
        }

        // Clear any existing reset timeout
        if (this.resetTimeout) {
            clearTimeout(this.resetTimeout);
        }

        // Evolve logo based on click count
        if (this.clickCount >= 3) {
            this.evolveLogo();
        } else if (this.clickCount === 2) {
            this.showProgressHint();
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

    showDiscoveryEncouragement() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.85);
            color: rgba(102, 126, 234, 0.9);
            padding: 10px 16px;
            border-radius: 6px;
            font-size: 0.8rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 2s ease;
            pointer-events: none;
        `;
        message.textContent = 'Nice discovery! Keep clicking...';

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 2000);
        }, 3000);
    }

    showProgressHint() {
        const hint = document.createElement('div');
        hint.style.cssText = `
            position: fixed;
            top: 50px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.85);
            color: rgba(255, 255, 255, 0.8);
            padding: 8px 14px;
            border-radius: 6px;
            font-size: 0.75rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 2s ease;
            pointer-events: none;
        `;
        hint.textContent = 'Something is stirring... continue...';

        document.body.appendChild(hint);

        setTimeout(() => {
            hint.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            hint.style.opacity = '0';
            setTimeout(() => hint.remove(), 2000);
        }, 2500);
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
            if (window.memoryPalace && typeof window.memoryPalace.recordUserAction === 'function') {
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
        // Show achievement notification first
        this.showAchievementNotification();

        // Then show the portal hint
        setTimeout(() => {
            const hint = document.createElement('div');
            hint.style.cssText = `
                position: fixed;
                bottom: 70px;
                right: 20px;
                background: rgba(0, 0, 0, 0.95);
                color: #ffd700;
                padding: 12px 16px;
                border-radius: 8px;
                font-size: 0.8rem;
                z-index: 1001;
                opacity: 0;
                transition: opacity 2s ease;
                pointer-events: none;
                max-width: 200px;
                text-align: center;
                border: 1px solid rgba(255, 215, 0, 0.3);
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
            `;
            hint.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 4px;">🎨 Logo Maker Unlocked!</div>
                <div style="font-size: 0.7rem; opacity: 0.8;">Click the golden portal to create</div>
            `;

            document.body.appendChild(hint);

            setTimeout(() => {
                hint.style.opacity = '1';
            }, 100);

            setTimeout(() => {
                hint.style.opacity = '0';
                setTimeout(() => hint.remove(), 2000);
            }, 7000);
        }, 1500);
    }

    showAchievementNotification() {
        const achievement = document.createElement('div');
        achievement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.95), rgba(255, 107, 107, 0.95));
            color: white;
            padding: 25px 35px;
            border-radius: 15px;
            font-size: 1.1rem;
            z-index: 1002;
            opacity: 0;
            transition: all 1s ease;
            text-align: center;
            border: 2px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 20px 40px rgba(255, 215, 0, 0.3);
        `;
        achievement.innerHTML = `
            <div style="font-size: 2em; margin-bottom: 10px;">🏆</div>
            <div style="font-weight: bold; margin-bottom: 8px;">MASTER ACHIEVEMENT</div>
            <div style="font-size: 0.9rem; opacity: 0.9;">Logo Maker Portal Activated</div>
        `;

        document.body.appendChild(achievement);

        setTimeout(() => {
            achievement.style.opacity = '1';
            achievement.style.transform = 'translate(-50%, -50%) scale(1.05)';
        }, 100);

        setTimeout(() => {
            achievement.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);

        setTimeout(() => {
            achievement.style.opacity = '0';
            achievement.style.transform = 'translate(-50%, -50%) scale(0.95)';
            setTimeout(() => achievement.remove(), 1000);
        }, 3000);
    }

    openLogoMaker() {
        // Open logo maker in new tab
        window.open('https://logo.terrellflautt.com', '_blank');

        // Track this achievement
        if (window.memoryPalace && typeof window.memoryPalace.recordUserAction === 'function') {
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

    /**
     * Add Logo Maker link to navigation menu after user interacts with logo
     */
    addLogoMakerToMenu() {
        // Check if already added
        if (document.querySelector('.nav-link[href*="logo"]')) {
            return;
        }

        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        // Create logo maker link
        const logoMakerLink = document.createElement('a');
        logoMakerLink.href = 'https://logo.terrellflautt.com';
        logoMakerLink.target = '_blank';
        logoMakerLink.className = 'nav-link logo-maker-link';
        logoMakerLink.textContent = 'Logo Maker ✨';
        logoMakerLink.style.cssText = `
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.5s ease;
        `;

        // Insert before Contact link
        const contactLink = navLinks.querySelector('a[href="#contact"]');
        if (contactLink) {
            navLinks.insertBefore(logoMakerLink, contactLink);
        } else {
            navLinks.appendChild(logoMakerLink);
        }

        // Animate in
        setTimeout(() => {
            logoMakerLink.style.opacity = '1';
            logoMakerLink.style.transform = 'translateY(0)';
        }, 100);

        console.log('✨ Logo Maker added to navigation menu');
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

        // Visit 1-2: Show personalized data (time, location hints, IP)
        if (!this.sessionEvolutionApplied && visitCount < 3 && this.sessionTime >= 60) {
            this.showPersonalizedData();
        }

        // Visit 3+: Show "T.K. Flautt" to indicate familiarity
        if (!this.sessionEvolutionApplied && visitCount >= 3 && this.sessionTime >= 120) {
            this.applySessionEvolution();
        }

        // If user created a logo, potentially show it
        if (!this.sessionEvolutionApplied && visitCount >= 5 && this.sessionTime >= 180) {
            this.checkForUserLogo();
        }
    }

    showPersonalizedData() {
        if (this.isEvolved) return;

        this.sessionEvolutionApplied = true;
        const personalData = this.getPersonalizedGreeting();

        this.logoElement.style.transition = 'opacity 2s ease';
        this.logoElement.style.opacity = '0.5';

        setTimeout(() => {
            this.logoElement.textContent = personalData;
            this.logoElement.style.opacity = '1';
            this.isEvolved = true;

            // Revert after showing
            this.scheduleSessionRevert();
        }, 1500);
    }

    getPersonalizedGreeting() {
        const now = new Date();
        const hour = now.getHours();
        const visitCount = parseInt(localStorage.getItem('terrellflautt_visit_count') || '0');

        // Detect browser
        const ua = navigator.userAgent;
        let browser = 'Browser';
        if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera';
        else if (ua.includes('Edg')) browser = 'Edge';
        else if (ua.includes('Chrome')) browser = 'Chrome';
        else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
        else if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Brave')) browser = 'Brave';

        // Detect device
        const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
        const isTablet = /Tablet|iPad/i.test(ua);
        const device = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';

        // Cycle through different personal data each visit
        const greetings = [
            `${hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'}`,
            `${now.toLocaleDateString('en-US', { weekday: 'long' })}`,
            `${browser} User`,
            `${device} Device`,
            `Visit #${visitCount}`,
            `${Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop()}`
        ];

        return greetings[visitCount % greetings.length];
    }

    applySessionEvolution() {
        if (this.isEvolved) return;

        this.sessionEvolutionApplied = true;
        this.logoElement.style.transition = 'opacity 3s ease';
        this.logoElement.style.opacity = '0.5';

        setTimeout(() => {
            this.logoElement.textContent = 'T.K. Flautt';
            this.logoElement.style.opacity = '1';
            this.isEvolved = true;

            // Subtle notification
            this.showEvolutionMessage('Welcome back, friend.');

            // ALWAYS revert back after this session
            this.scheduleSessionRevert();
        }, 1500);
    }

    checkForUserLogo() {
        // Check if user created a logo in logo maker
        const userLogo = localStorage.getItem('user_created_logo');
        if (userLogo && !this.isEvolved) {
            this.displayUserLogo(userLogo);
        }
    }

    displayUserLogo(logoData) {
        // Show user's custom logo instead of text (future enhancement)
        console.log('User has a custom logo!', logoData);
        // TODO: Replace logo text with user's custom logo image
    }

    scheduleSessionRevert() {
        // Set flag to revert logo on next visit
        localStorage.setItem('terrellflautt_logo_should_revert', 'true');

        // Also revert if they stay on page too long (10+ minutes)
        setTimeout(() => {
            this.revertToOriginal('Extended session - logo refreshed');
        }, 600000); // 10 minutes

        // Revert on page visibility change (user switches tabs/windows)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                setTimeout(() => {
                    if (!document.hidden && this.isEvolved && this.sessionEvolutionApplied) {
                        this.revertToOriginal('Welcome back!');
                    }
                }, 2000); // 2 seconds after they return
            }
        });
    }

    revertToOriginal(message) {
        if (!this.isEvolved || !this.sessionEvolutionApplied) return;

        this.logoElement.style.transition = 'opacity 2s ease';
        this.logoElement.style.opacity = '0.3';

        setTimeout(() => {
            this.logoElement.textContent = this.originalText;
            this.logoElement.style.opacity = '1';
            this.isEvolved = false;
            this.sessionEvolutionApplied = false;

            if (message) {
                this.showEvolutionMessage(message);
            }

            // Clear the revert flag
            localStorage.removeItem('terrellflautt_logo_should_revert');
        }, 1000);
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