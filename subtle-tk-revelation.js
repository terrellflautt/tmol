// Subtle T.K. Revelation System - Proper overlay, minimal text, deep engagement required
// Fixes positioning and reduces verbosity

class SubtleTKRevelation {
    constructor() {
        this.clickThreshold = 50;  // Much higher threshold
        this.timeThreshold = 300000; // 5 minutes of engagement
        this.visitThreshold = 5;   // Multiple return visits required
        this.interactionThreshold = 200; // Significant interaction count

        this.userProgress = this.loadProgress();
        this.init();
    }

    init() {
        this.setupNameClickTracking();
        this.overrideExistingTKSystems();
    }

    loadProgress() {
        const stored = localStorage.getItem('tk_revelation_progress');
        return stored ? JSON.parse(stored) : {
            nameClicks: 0,
            totalTime: 0,
            visits: 1,
            interactions: 0,
            tkRevealed: false,
            lastVisit: Date.now()
        };
    }

    saveProgress() {
        localStorage.setItem('tk_revelation_progress', JSON.stringify(this.userProgress));
    }

    setupNameClickTracking() {
        const nameElement = document.querySelector('.hero-title .title-line:first-child');
        if (!nameElement) return;

        nameElement.style.cursor = 'pointer';
        nameElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleNameClick();
        });

        // Track other interactions for threshold
        this.trackGeneralInteractions();
    }

    trackGeneralInteractions() {
        // Track scrolling
        let scrollCount = 0;
        window.addEventListener('scroll', () => {
            scrollCount++;
            if (scrollCount % 10 === 0) { // Every 10 scrolls
                this.userProgress.interactions++;
            }
        });

        // Track clicks
        document.addEventListener('click', () => {
            this.userProgress.interactions++;
        });

        // Track time spent
        const startTime = Date.now();
        setInterval(() => {
            this.userProgress.totalTime = Date.now() - startTime;
            this.saveProgress();
        }, 5000);
    }

    handleNameClick() {
        this.userProgress.nameClicks++;
        this.saveProgress();

        // Only reveal after extensive engagement
        if (this.shouldRevealTK()) {
            this.revealTK();
        } else {
            // Subtle feedback without explanation
            this.showSubtleFeedback();
        }
    }

    shouldRevealTK() {
        if (this.userProgress.tkRevealed) return false;

        return (
            this.userProgress.nameClicks >= this.clickThreshold &&
            this.userProgress.totalTime >= this.timeThreshold &&
            this.userProgress.visits >= this.visitThreshold &&
            this.userProgress.interactions >= this.interactionThreshold
        );
    }

    revealTK() {
        this.userProgress.tkRevealed = true;
        this.saveProgress();

        // Update name display to T.K.
        const nameElement = document.querySelector('.hero-title .title-line:first-child');
        if (nameElement) {
            nameElement.textContent = 'T.K.';
        }

        // Show minimal popup overlay
        this.showTKRevelation();
    }

    showTKRevelation() {
        // Remove any existing overlays
        const existing = document.querySelector('.tk-revelation-overlay');
        if (existing) existing.remove();

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'tk-revelation-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.85);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;

        // Create revelation content
        const content = document.createElement('div');
        content.className = 'tk-revelation-content';
        content.style.cssText = `
            background: var(--bg-secondary);
            border: 1px solid rgba(102, 126, 234, 0.3);
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            max-width: 300px;
            transform: scale(0.9);
            transition: all 0.5s ease;
        `;

        // Minimal content - much less text
        content.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 1rem;">⚡</div>
            <h3 style="margin: 0 0 1rem 0; color: var(--text-primary);">T.K.</h3>
            <p style="margin: 0 0 1.5rem 0; color: var(--text-secondary); font-size: 0.9rem;">The Knowledge</p>
            <button class="continue-btn" style="
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
                border: none;
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.2s ease;
            ">Continue</button>
        `;

        overlay.appendChild(content);
        document.body.appendChild(overlay);

        // Animate in
        setTimeout(() => {
            overlay.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 100);

        // Handle close
        const continueBtn = content.querySelector('.continue-btn');
        continueBtn.addEventListener('click', () => this.closeTKRevelation(overlay));

        // Close on click outside
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeTKRevelation(overlay);
            }
        });

        // Close on escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.closeTKRevelation(overlay);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Auto-close after 8 seconds
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                this.closeTKRevelation(overlay);
            }
        }, 8000);
    }

    closeTKRevelation(overlay) {
        overlay.style.opacity = '0';
        overlay.querySelector('.tk-revelation-content').style.transform = 'scale(0.9)';

        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, 500);
    }

    showSubtleFeedback() {
        // Very subtle visual feedback when clicked but not ready
        const nameElement = document.querySelector('.hero-title .title-line:first-child');
        if (!nameElement) return;

        // Brief glow effect
        nameElement.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.5)';
        setTimeout(() => {
            nameElement.style.textShadow = '';
        }, 300);
    }

    overrideExistingTKSystems() {
        // Disable any existing T.K. revelation systems that trigger too early
        if (window.magicUser && window.magicUser.revealTheKnowledge) {
            window.magicUser.revealTheKnowledge = () => {
                // Override with our system
                if (this.shouldRevealTK()) {
                    this.revealTK();
                }
            };
        }

        // Override any easter egg T.K. revelations
        if (window.easterEggs) {
            const originalTrigger = window.easterEggs.triggerDiscovery;
            window.easterEggs.triggerDiscovery = (id, title, message) => {
                // Filter out premature T.K. revelations
                if (message && message.includes('T.K.') && !this.userProgress.tkReveated) {
                    return; // Block it
                }
                if (originalTrigger) {
                    originalTrigger.call(window.easterEggs, id, title, message);
                }
            };
        }

        // Ensure name stays "Terrell K. Flautt" until proper threshold
        this.enforceNameDisplay();
    }

    enforceNameDisplay() {
        const nameElement = document.querySelector('.hero-title .title-line:first-child');
        if (!nameElement) return;

        // Force default name if T.K. not properly unlocked
        if (!this.userProgress.tkRevealed && nameElement.textContent !== 'Terrell K. Flautt') {
            nameElement.textContent = 'Terrell K. Flautt';
        }

        // Monitor for unauthorized changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    if (!this.userProgress.tkRevealed && nameElement.textContent !== 'Terrell K. Flautt') {
                        nameElement.textContent = 'Terrell K. Flautt';
                    }
                }
            });
        });

        observer.observe(nameElement, {
            childList: true,
            characterData: true,
            subtree: true
        });
    }

    // Public method to check if T.K. should be available
    isTKUnlocked() {
        return this.userProgress.tkRevealed;
    }

    // Debug method for testing (only in dev mode)
    forceReveal() {
        if (localStorage.getItem('dev_mode') === 'true') {
            this.revealTK();
        }
    }

    // Get progress for external systems
    getProgress() {
        return {
            ...this.userProgress,
            thresholds: {
                clicks: `${this.userProgress.nameClicks}/${this.clickThreshold}`,
                time: `${Math.round(this.userProgress.totalTime / 1000)}/${this.timeThreshold / 1000}s`,
                visits: `${this.userProgress.visits}/${this.visitThreshold}`,
                interactions: `${this.userProgress.interactions}/${this.interactionThreshold}`
            }
        };
    }
}

// Initialize the subtle T.K. revelation system
window.subtleTKRevelation = new SubtleTKRevelation();

// Expose for debugging
if (localStorage.getItem('dev_mode') === 'true') {
    console.log('🔍 T.K. Revelation Debug Mode');
    console.log('Progress:', window.subtleTKRevelation.getProgress());
    console.log('Force reveal: window.subtleTKRevelation.forceReveal()');
}