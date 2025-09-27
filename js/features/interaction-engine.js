/* Micro-Interaction Rewards System - Instant gratification for tiny user actions */

class MicroInteractionRewards {
    constructor(progressiveCuriosity, habitTraining) {
        this.progressiveCuriosity = progressiveCuriosity;
        this.habitTraining = habitTraining;

        // Reward types and their probabilities
        this.rewardTypes = {
            sparkle: { probability: 0.4, intensity: 'low' },
            glow: { probability: 0.3, intensity: 'medium' },
            pulse: { probability: 0.15, intensity: 'medium' },
            shimmer: { probability: 0.1, intensity: 'high' },
            burst: { probability: 0.04, intensity: 'very_high' },
            jackpot: { probability: 0.01, intensity: 'legendary' }
        };

        // Variable ratio reinforcement schedule
        this.reinforcementSchedule = {
            baseRate: 0.3, // 30% base chance of reward
            streakMultiplier: 1.2, // Increases with consecutive interactions
            timeDecay: 0.95, // Decreases over time without interaction
            surpriseBonus: 0.1 // Random bonus chance
        };

        this.interactionStreak = 0;
        this.lastInteractionTime = 0;
        this.rewardHistory = [];
        this.anticipationBuilding = false;

        // Sound effects for different reward types
        this.audioContext = null;
        this.initializeAudio();

        this.initialize();
    }

    initialize() {
        this.setupMicroInteractionListeners();
        this.createRewardElements();
        this.startAnticipationSystem();
    }

    initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio context not available');
        }
    }

    setupMicroInteractionListeners() {
        // Track all micro-interactions
        const microInteractionEvents = [
            'mouseenter', 'mouseleave', 'click', 'focus', 'scroll'
        ];

        microInteractionEvents.forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                if (this.isRewardableInteraction(e)) {
                    this.processMicroInteraction(e);
                }
            }, { passive: true });
        });

        // Special hover tracking for subtle elements
        document.addEventListener('mousemove', (e) => {
            this.processMouseMovement(e);
        }, { passive: true });

        // Keyboard interactions
        document.addEventListener('keydown', (e) => {
            if (this.isRewardableKeypress(e)) {
                this.processMicroInteraction(e);
            }
        });
    }

    isRewardableInteraction(event) {
        const target = event.target;

        // Interactive elements that deserve rewards
        const rewardableSelectors = [
            'button', 'a', 'input', '.interactive',
            '.curiosity-trigger', '.mystery-element',
            '.easter-egg', '.hover-reveal', '.clickable'
        ];

        return rewardableSelectors.some(selector =>
            target.matches?.(selector) || target.closest?.(selector)
        );
    }

    isRewardableKeypress(event) {
        // Special key combinations or easter egg keys
        const rewardableKeys = [
            'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
            'Space', 'Enter', 'Escape'
        ];

        return rewardableKeys.includes(event.code) ||
               (event.ctrlKey && event.shiftKey) ||
               event.key.length === 1; // Single character keys
    }

    processMicroInteraction(event) {
        const now = Date.now();
        const timeSinceLastInteraction = now - this.lastInteractionTime;

        // Update streak
        if (timeSinceLastInteraction < 5000) { // Within 5 seconds
            this.interactionStreak++;
        } else {
            this.interactionStreak = 1;
        }

        this.lastInteractionTime = now;

        // Calculate reward probability
        const shouldReward = this.calculateRewardProbability();

        if (shouldReward) {
            this.deliverMicroReward(event);
        } else {
            // Even without a reward, provide subtle feedback
            this.provideSubtleFeedback(event.target);
        }

        // Build anticipation for next interaction
        this.buildAnticipation();
    }

    calculateRewardProbability() {
        let probability = this.reinforcementSchedule.baseRate;

        // Streak bonus
        probability *= Math.min(
            Math.pow(this.reinforcementSchedule.streakMultiplier, this.interactionStreak - 1),
            3.0 // Cap at 3x
        );

        // Time decay since last reward
        const timeSinceLastReward = Date.now() - (this.getLastRewardTime() || 0);
        const decayMinutes = timeSinceLastReward / (1000 * 60);
        probability *= Math.pow(this.reinforcementSchedule.timeDecay, decayMinutes);

        // Random surprise bonus
        if (Math.random() < this.reinforcementSchedule.surpriseBonus) {
            probability *= 2;
        }

        // Progressive curiosity stage modifier
        if (this.progressiveCuriosity) {
            const stageMultiplier = 1 + (this.progressiveCuriosity.getCurrentStage() - 1) * 0.1;
            probability *= stageMultiplier;
        }

        return Math.random() < Math.min(probability, 0.8); // Cap at 80%
    }

    deliverMicroReward(event) {
        const rewardType = this.selectRewardType();
        const target = event.target;
        const rewardPosition = this.getRewardPosition(target, event);

        // Create visual reward
        this.createVisualReward(rewardType, rewardPosition);

        // Play audio reward
        this.playAudioReward(rewardType);

        // Provide haptic feedback if available
        this.triggerHapticFeedback(rewardType);

        // Track the reward
        this.trackReward(rewardType, event);

        // Reset anticipation
        this.anticipationBuilding = false;

        console.log(`🎁 Micro-reward delivered: ${rewardType}`);
    }

    selectRewardType() {
        const random = Math.random();
        let cumulativeProbability = 0;

        for (const [type, data] of Object.entries(this.rewardTypes)) {
            cumulativeProbability += data.probability;
            if (random <= cumulativeProbability) {
                return type;
            }
        }

        return 'sparkle'; // Fallback
    }

    getRewardPosition(target, event) {
        if (event.clientX && event.clientY) {
            return { x: event.clientX, y: event.clientY };
        }

        const rect = target.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }

    createVisualReward(type, position) {
        const reward = document.createElement('div');
        reward.className = `micro-reward micro-reward-${type}`;
        reward.style.left = position.x + 'px';
        reward.style.top = position.y + 'px';
        reward.style.position = 'fixed';
        reward.style.pointerEvents = 'none';
        reward.style.zIndex = '10000';

        // Type-specific styling
        switch (type) {
            case 'sparkle':
                reward.innerHTML = '✨';
                reward.style.animation = 'sparkle-reward 0.8s ease-out forwards';
                break;
            case 'glow':
                reward.innerHTML = '🌟';
                reward.style.animation = 'glow-reward 1.2s ease-out forwards';
                break;
            case 'pulse':
                reward.innerHTML = '💫';
                reward.style.animation = 'pulse-reward 1s ease-out forwards';
                break;
            case 'shimmer':
                reward.innerHTML = '⭐';
                reward.style.animation = 'shimmer-reward 1.5s ease-out forwards';
                break;
            case 'burst':
                reward.innerHTML = '💥';
                reward.style.animation = 'burst-reward 2s ease-out forwards';
                this.createBurstParticles(position);
                break;
            case 'jackpot':
                reward.innerHTML = '🎊';
                reward.style.animation = 'jackpot-reward 3s ease-out forwards';
                this.createJackpotCelebration(position);
                break;
        }

        document.body.appendChild(reward);

        // Remove after animation
        setTimeout(() => {
            reward.remove();
        }, 3000);
    }

    createBurstParticles(position) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'burst-particle';
            particle.style.left = position.x + 'px';
            particle.style.top = position.y + 'px';
            particle.style.position = 'fixed';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';

            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const endX = position.x + Math.cos(angle) * distance;
            const endY = position.y + Math.sin(angle) * distance;

            particle.style.transform = `translate(${endX - position.x}px, ${endY - position.y}px)`;
            particle.style.animation = `burst-particle 1s ease-out forwards`;

            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }
    }

    createJackpotCelebration(position) {
        // Create confetti effect
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'jackpot-confetti';
            confetti.style.left = (position.x + Math.random() * 200 - 100) + 'px';
            confetti.style.top = (position.y - 50) + 'px';
            confetti.style.position = 'fixed';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9998';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            confetti.style.animation = `jackpot-confetti ${1 + Math.random()}s ease-out forwards`;

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 2000);
        }

        // Show celebration message
        this.showCelebrationMessage('🎊 JACKPOT! 🎊', position);
    }

    showCelebrationMessage(text, position) {
        const message = document.createElement('div');
        message.className = 'celebration-message';
        message.textContent = text;
        message.style.left = position.x + 'px';
        message.style.top = (position.y - 30) + 'px';
        message.style.position = 'fixed';
        message.style.pointerEvents = 'none';
        message.style.zIndex = '10001';
        message.style.animation = 'celebration-message 2s ease-out forwards';

        document.body.appendChild(message);

        setTimeout(() => message.remove(), 2000);
    }

    playAudioReward(type) {
        if (!this.audioContext) return;

        const audioParams = {
            sparkle: { frequency: 800, duration: 0.1 },
            glow: { frequency: 600, duration: 0.2 },
            pulse: { frequency: 400, duration: 0.15 },
            shimmer: { frequency: 1000, duration: 0.3 },
            burst: { frequency: 300, duration: 0.5 },
            jackpot: { frequency: 500, duration: 1.0 }
        };

        const params = audioParams[type];
        this.createTone(params.frequency, params.duration);
    }

    createTone(frequency, duration) {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    triggerHapticFeedback(type) {
        if ('vibrate' in navigator) {
            const patterns = {
                sparkle: [50],
                glow: [100],
                pulse: [50, 50, 50],
                shimmer: [100, 50, 100],
                burst: [200],
                jackpot: [100, 100, 100, 100, 100]
            };

            navigator.vibrate(patterns[type] || [50]);
        }
    }

    provideSubtleFeedback(target) {
        // Even when no reward is given, provide minimal feedback
        target.style.transition = 'transform 0.1s ease';
        target.style.transform = 'scale(1.02)';

        setTimeout(() => {
            target.style.transform = 'scale(1)';
        }, 100);

        // Add subtle class for CSS animations
        target.classList.add('micro-feedback');
        setTimeout(() => {
            target.classList.remove('micro-feedback');
        }, 300);
    }

    processMouseMovement(event) {
        // Detect when mouse hovers over special areas
        const target = event.target;

        if (target.matches('.hover-surprise') && !target.dataset.hoverProcessed) {
            target.dataset.hoverProcessed = 'true';

            // Small chance of surprise reward for hovering
            if (Math.random() < 0.05) { // 5% chance
                this.deliverMicroReward(event);
            }

            // Reset after a delay
            setTimeout(() => {
                delete target.dataset.hoverProcessed;
            }, 2000);
        }
    }

    buildAnticipation() {
        if (this.anticipationBuilding) return;

        this.anticipationBuilding = true;

        // Subtle visual cues that a reward might be coming
        const anticipationElements = document.querySelectorAll('.anticipation-zone');
        anticipationElements.forEach(el => {
            el.classList.add('anticipation-building');
        });

        // Clear anticipation after random time
        setTimeout(() => {
            anticipationElements.forEach(el => {
                el.classList.remove('anticipation-building');
            });
        }, 2000 + Math.random() * 3000);
    }

    startAnticipationSystem() {
        // Create zones that build anticipation
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every 5 seconds
                this.createAnticipationZone();
            }
        }, 5000);
    }

    createAnticipationZone() {
        const zone = document.createElement('div');
        zone.className = 'anticipation-zone';
        zone.style.position = 'fixed';
        zone.style.left = Math.random() * (window.innerWidth - 100) + 'px';
        zone.style.top = Math.random() * (window.innerHeight - 100) + 'px';
        zone.style.width = '50px';
        zone.style.height = '50px';
        zone.style.pointerEvents = 'none';
        zone.style.background = 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)';
        zone.style.borderRadius = '50%';
        zone.style.animation = 'anticipation-pulse 3s ease-in-out';
        zone.style.zIndex = '1000';

        document.body.appendChild(zone);

        setTimeout(() => zone.remove(), 3000);
    }

    trackReward(type, event) {
        const reward = {
            type,
            timestamp: Date.now(),
            target: event.target.tagName,
            streak: this.interactionStreak
        };

        this.rewardHistory.push(reward);

        // Keep only recent rewards
        if (this.rewardHistory.length > 100) {
            this.rewardHistory = this.rewardHistory.slice(-50);
        }

        // Track with comprehensive tracking system
        if (window.comprehensiveTrackingSystem) {
            window.comprehensiveTrackingSystem.trackEvent('micro_reward', {
                rewardType: type,
                streak: this.interactionStreak,
                targetElement: event.target.tagName
            });
        }
    }

    getLastRewardTime() {
        return this.rewardHistory.length > 0 ?
               this.rewardHistory[this.rewardHistory.length - 1].timestamp : 0;
    }

    // Analytics and debugging
    getRewardStats() {
        const stats = {
            totalRewards: this.rewardHistory.length,
            rewardsByType: {},
            averageStreak: 0,
            recentRewardRate: 0
        };

        this.rewardHistory.forEach(reward => {
            stats.rewardsByType[reward.type] = (stats.rewardsByType[reward.type] || 0) + 1;
            stats.averageStreak += reward.streak;
        });

        stats.averageStreak /= this.rewardHistory.length || 1;

        // Calculate recent reward rate (last 10 minutes)
        const tenMinutesAgo = Date.now() - (10 * 60 * 1000);
        const recentRewards = this.rewardHistory.filter(r => r.timestamp > tenMinutesAgo);
        stats.recentRewardRate = recentRewards.length / 10; // per minute

        return stats;
    }

    // Debug methods
    forceReward(type = 'sparkle') {
        const fakeEvent = {
            target: document.body,
            clientX: window.innerWidth / 2,
            clientY: window.innerHeight / 2
        };
        this.deliverMicroReward(fakeEvent);
    }

    setRewardRate(rate) {
        this.reinforcementSchedule.baseRate = Math.max(0, Math.min(1, rate));
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (window.progressiveCuriosityEscalation && window.habitTrainingSystem) {
        window.microInteractionRewards = new MicroInteractionRewards(
            window.progressiveCuriosityEscalation,
            window.habitTrainingSystem
        );

        console.log('🎁 Micro-Interaction Rewards System initialized');
    }
});