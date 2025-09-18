// Progress Dashboard for returning users
class ProgressDashboard {
    constructor() {
        this.initializeDashboard();
    }

    initializeDashboard() {
        // Only show for returning users
        if (window.userJourney && window.userJourney.isReturningUser()) {
            this.showWelcomeBack();
            this.addProgressIndicator();
        }
    }

    showWelcomeBack() {
        const welcomeMessage = window.userJourney.getWelcomeMessage();
        const progress = window.userJourney.getProgressSummary();

        // Create welcome notification
        const welcome = document.createElement('div');
        welcome.className = 'welcome-back-notification';
        welcome.innerHTML = `
            <div class="welcome-content">
                <h3>🌟 ${welcomeMessage}</h3>
                <div class="progress-summary">
                    <div class="progress-stat">
                        <span class="stat-number">${progress.easterEggsFound}/${progress.totalEasterEggs}</span>
                        <span class="stat-label">Secrets Found</span>
                    </div>
                    <div class="progress-stat">
                        <span class="stat-number">${progress.visitCount}</span>
                        <span class="stat-label">Visits</span>
                    </div>
                    <div class="progress-stat">
                        <span class="stat-number">${progress.completionPercentage}%</span>
                        <span class="stat-label">Complete</span>
                    </div>
                </div>
                <button class="continue-journey-btn" onclick="this.parentElement.parentElement.remove()">
                    Continue Journey ✨
                </button>
            </div>
        `;

        // Style the welcome notification
        welcome.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 1.5rem;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            z-index: 9999;
            max-width: 300px;
            animation: slideInRight 0.5s ease-out;
            font-family: var(--font-primary);
        `;

        document.body.appendChild(welcome);

        // Auto-hide after 8 seconds
        setTimeout(() => {
            if (welcome.parentNode) {
                welcome.style.animation = 'slideOutRight 0.5s ease-in';
                setTimeout(() => {
                    if (welcome.parentNode) {
                        welcome.parentNode.removeChild(welcome);
                    }
                }, 500);
            }
        }, 8000);
    }

    addProgressIndicator() {
        const progress = window.userJourney.getProgressSummary();

        // Create floating progress indicator
        const indicator = document.createElement('div');
        indicator.className = 'floating-progress-indicator';
        indicator.innerHTML = `
            <div class="progress-circle" onclick="this.parentElement.classList.toggle('expanded')">
                <div class="progress-ring">
                    <svg width="50" height="50">
                        <circle cx="25" cy="25" r="20" stroke="rgba(255,255,255,0.3)" stroke-width="3" fill="none"/>
                        <circle cx="25" cy="25" r="20" stroke="#00ffff" stroke-width="3" fill="none"
                                stroke-dasharray="${2 * Math.PI * 20}"
                                stroke-dashoffset="${2 * Math.PI * 20 * (1 - progress.completionPercentage / 100)}"
                                transform="rotate(-90 25 25)"/>
                    </svg>
                    <span class="progress-percentage">${progress.completionPercentage}%</span>
                </div>
            </div>
            <div class="progress-details">
                <h4>Your Journey Progress</h4>
                <div class="detail-row">
                    <span>Transcendental Journey:</span>
                    <span>${progress.transcendentalCompleted ? '✅ Complete' : '⏳ Pending'}</span>
                </div>
                <div class="detail-row">
                    <span>Easter Eggs Found:</span>
                    <span>${progress.easterEggsFound}/${progress.totalEasterEggs}</span>
                </div>
                <div class="detail-row">
                    <span>Device Type:</span>
                    <span>${progress.deviceType}</span>
                </div>
                <div class="detail-row">
                    <span>Session Time:</span>
                    <span>${Math.floor(progress.sessionTime / 60)}m ${progress.sessionTime % 60}s</span>
                </div>
                ${progress.dominantTrait ? `
                    <div class="detail-row">
                        <span>Your Archetype:</span>
                        <span>${progress.dominantTrait}</span>
                    </div>
                ` : ''}
            </div>
        `;

        // Style the progress indicator
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 9998;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(indicator);

        console.log('📊 Progress dashboard initialized for returning user', progress);
    }
}

// CSS for progress dashboard
const progressCSS = `
<style>
.welcome-back-notification .welcome-content h3 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
}

.progress-summary {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
}

.progress-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
}

.stat-number {
    font-size: 1.2rem;
    font-weight: bold;
    color: #00ffff;
}

.stat-label {
    font-size: 0.8rem;
    opacity: 0.8;
}

.continue-journey-btn {
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    font-weight: 600;
}

.continue-journey-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
}

.floating-progress-indicator {
    background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(26,26,46,0.9));
    border: 2px solid #00ffff;
    border-radius: 15px;
    padding: 1rem;
    backdrop-filter: blur(10px);
    max-width: 60px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.floating-progress-indicator.expanded {
    max-width: 300px;
    max-height: 400px;
}

.progress-circle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.progress-ring {
    position: relative;
}

.progress-percentage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.7rem;
    font-weight: bold;
    color: #00ffff;
}

.progress-details {
    margin-top: 1rem;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    color: white;
    font-size: 0.9rem;
}

.floating-progress-indicator.expanded .progress-details {
    opacity: 1;
    transform: translateY(0);
}

.progress-details h4 {
    margin: 0 0 1rem 0;
    color: #00ffff;
    font-size: 1rem;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    padding: 0.25rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

.detail-row:last-child {
    border-bottom: none;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100%);
    }
}
</style>
`;

// Inject CSS
document.head.insertAdjacentHTML('beforeend', progressCSS);

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProgressDashboard();
});