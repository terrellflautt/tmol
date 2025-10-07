/**
 * FIRST MOMENTS MAGIC
 * Creates instant wonder and trains users to be curious
 * Rewards: Curiosity, Attention to Detail, Patience
 *
 * Philosophy: The first 60 seconds must teach users that:
 * 1. Details matter (hover effects, subtle changes)
 * 2. Exploration is rewarded (clicking, scrolling)
 * 3. Patience reveals secrets (waiting, observing)
 * 4. Reflection brings wisdom (reading, contemplating)
 */

class FirstMomentsMagic {
    constructor() {
        this.discoveries = new Set();
        this.microMoments = 0;
        this.curiosityScore = 0;
        this.attentionScore = 0;

        this.init();
    }

    init() {
        console.log('✨ First Moments Magic initialized - Training curiosity...');

        // Immediate (0-3 seconds): Instant gratification
        this.setupInstantMagic();

        // Quick (3-10 seconds): Reward quick exploration
        setTimeout(() => this.setupQuickRewards(), 3000);

        // Patient (10-30 seconds): Reward observation
        setTimeout(() => this.setupPatientRewards(), 10000);

        // Persistent (30-60 seconds): Reward dedication
        setTimeout(() => this.setupPersistentRewards(), 30000);

        // Track user's attention to detail
        this.trackAttentionToDetail();
    }

    /**
     * INSTANT MAGIC (0-3 seconds)
     * Goal: Create immediate wonder, show the site is alive
     */
    setupInstantMagic() {
        // 1. Logo Hover - Instant feedback
        const logo = document.querySelector('.logo-text, h1, .hero-title');
        if (logo) {
            logo.style.transition = 'all 0.3s ease';

            logo.addEventListener('mouseenter', () => {
                logo.style.textShadow = '0 0 20px rgba(102, 126, 234, 0.8)';
                logo.style.transform = 'scale(1.02)';
                logo.style.letterSpacing = '0.05em';

                this.rewardCuriosity('logo_hover', 'You noticed the glow! ✨');
            });

            logo.addEventListener('mouseleave', () => {
                logo.style.textShadow = '';
                logo.style.transform = '';
                logo.style.letterSpacing = '';
            });
        }

        // 2. Cursor creates light trail immediately
        this.enhanceCursorTrail();

        // 3. Page breathing is visible
        this.emphasizeBreathing();

        // 4. Subtle welcome message for the observant
        this.showSubtleWelcome();
    }

    /**
     * QUICK REWARDS (3-10 seconds)
     * Goal: Train clicking and interaction
     */
    setupQuickRewards() {
        // 1. Footer 2025 shimmer
        const footer = document.querySelector('.footer, footer');
        if (footer) {
            const yearText = this.findTextNode(footer, '2025');
            if (yearText) {
                const span = document.createElement('span');
                span.className = 'future-vision-trigger';
                span.textContent = '2025';
                span.style.cssText = `
                    cursor: help;
                    position: relative;
                    display: inline-block;
                    animation: gentleShimmer 3s infinite;
                `;

                yearText.parentNode.replaceChild(span, yearText);

                span.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.triggerFutureVision();
                });
            }
        }

        // 2. Begin Journey button pulse
        const journeyBtn = document.querySelector('button, .cta-button, [href*="journey"]');
        if (journeyBtn && journeyBtn.textContent.toLowerCase().includes('journey')) {
            journeyBtn.style.animation = 'gentlePulse 2s infinite';

            journeyBtn.addEventListener('mouseenter', () => {
                journeyBtn.style.animation = 'none';
                journeyBtn.style.transform = 'scale(1.05)';
                journeyBtn.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.6)';
            });

            journeyBtn.addEventListener('mouseleave', () => {
                journeyBtn.style.animation = 'gentlePulse 2s infinite';
                journeyBtn.style.transform = '';
                journeyBtn.style.boxShadow = '';
            });
        }

        // 3. Contact email shimmer
        const links = document.querySelectorAll('a[href^="mailto:"]');
        links.forEach(link => {
            link.style.position = 'relative';
            link.style.transition = 'all 0.3s ease';

            link.addEventListener('mouseenter', () => {
                link.style.color = '#667eea';
                link.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.5)';
                this.rewardCuriosity('contact_hover', 'Communication is connection 💌');
            });
        });
    }

    /**
     * PATIENT REWARDS (10-30 seconds)
     * Goal: Reward those who observe and wait
     */
    setupPatientRewards() {
        // 1. Hidden message appears for those who wait
        if (!this.discoveries.has('patience_reward')) {
            this.showPatientMessage();
        }

        // 2. Logo starts subtle evolution hints
        const logo = document.querySelector('.logo-text, h1, .hero-title');
        if (logo) {
            // Add very subtle hint that it's clickable
            logo.style.cursor = 'pointer';
            logo.title = 'Something feels different here...';
        }

        // 3. Navigation items get subtle hover hints
        const navItems = document.querySelectorAll('.nav-links a, nav a');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';

                item.addEventListener('mouseenter', () => {
                    item.style.letterSpacing = '0.1em';
                    this.microMoments++;
                });
            }, index * 300); // Stagger the enhancements
        });
    }

    /**
     * PERSISTENT REWARDS (30-60 seconds)
     * Goal: Reward dedication and exploration
     */
    setupPersistentRewards() {
        // Calculate user's curiosity score
        const score = this.calculateCuriosityScore();

        if (score > 5) {
            // User is actively exploring - reveal a secret
            this.revealCuriositySecret();
        }

        // Make Aziza period more obvious for persistent users
        this.enhanceAzizaPeriod();

        // Show subtle "keep exploring" encouragement
        if (!this.discoveries.has('genie_found')) {
            this.encourageContinuedExploration();
        }
    }

    /**
     * HELPER METHODS
     */
    enhanceCursorTrail() {
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursorFollower) {
            let mouseX = 0, mouseY = 0;
            let followerX = 0, followerY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;

                this.microMoments++;
            });

            const animateCursor = () => {
                followerX += (mouseX - followerX) * 0.1;
                followerY += (mouseY - followerY) * 0.1;

                cursorFollower.style.left = followerX + 'px';
                cursorFollower.style.top = followerY + 'px';

                // Add sparkle effect based on movement speed
                const speed = Math.abs(mouseX - followerX) + Math.abs(mouseY - followerY);
                if (speed > 5) {
                    const brightness = Math.min(speed / 20, 1);
                    cursorFollower.style.opacity = brightness;
                    cursorFollower.style.filter = `blur(${10 - speed / 10}px)`;
                }

                requestAnimationFrame(animateCursor);
            };

            animateCursor();
        }
    }

    emphasizeBreathing() {
        // Make breathing more noticeable for first-time visitors
        const visitCount = parseInt(localStorage.getItem('visits') || '0');

        if (visitCount < 3) {
            // Enhance breathing for newcomers
            document.body.style.animation = 'pageBreathing 4s ease-in-out infinite';
        }
    }

    showSubtleWelcome() {
        const welcome = document.createElement('div');
        welcome.className = 'subtle-welcome';
        welcome.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: rgba(102, 126, 234, 0.9);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            opacity: 0;
            animation: fadeInOut 6s ease-in-out;
            pointer-events: none;
            z-index: 1000;
            border: 1px solid rgba(102, 126, 234, 0.3);
            backdrop-filter: blur(10px);
        `;
        welcome.textContent = '✨ Curiosity is rewarded here...';

        document.body.appendChild(welcome);

        setTimeout(() => welcome.remove(), 6000);
    }

    triggerFutureVision() {
        if (this.discoveries.has('future_vision')) return;

        this.discoveries.add('future_vision');
        this.rewardCuriosity('future_vision', 'You see what others miss! The future is built in the present. 🔮', 3000);

        // Track this discovery
        const discoveries = parseInt(localStorage.getItem('discoveries') || '0');
        localStorage.setItem('discoveries', discoveries + 1);
    }

    showPatientMessage() {
        this.discoveries.add('patience_reward');

        const message = document.createElement('div');
        message.className = 'patience-reward-message';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(102, 126, 234, 0.1);
            border: 2px solid rgba(102, 126, 234, 0.4);
            border-radius: 12px;
            padding: 20px 30px;
            color: rgba(102, 126, 234, 0.9);
            font-size: 1rem;
            text-align: center;
            opacity: 0;
            animation: fadeInOut 8s ease-in-out;
            pointer-events: none;
            z-index: 10000;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 30px rgba(102, 126, 234, 0.3);
        `;
        message.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 10px;">🌟</div>
            <div style="font-weight: 600;">Patience reveals truth</div>
            <div style="font-size: 0.85rem; margin-top: 8px; opacity: 0.8;">Those who observe carefully see what others cannot</div>
        `;

        document.body.appendChild(message);

        setTimeout(() => message.remove(), 8000);

        this.attentionScore += 5;
    }

    revealCuriositySecret() {
        const secret = document.createElement('div');
        secret.className = 'curiosity-secret';
        secret.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(255, 215, 0, 0.1);
            border: 2px solid rgba(255, 215, 0, 0.4);
            border-radius: 12px;
            padding: 15px 20px;
            color: rgba(255, 215, 0, 0.9);
            font-size: 0.9rem;
            opacity: 0;
            animation: slideInRight 0.5s ease-out forwards;
            z-index: 10000;
            max-width: 300px;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
        `;
        secret.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 8px;">💡</div>
            <div style="font-weight: 600; margin-bottom: 6px;">Curious Explorer Detected!</div>
            <div style="font-size: 0.85rem; opacity: 0.9;">
                Your curiosity score: <strong>${this.curiosityScore}</strong><br>
                Keep exploring - secrets await the persistent.
                Try clicking the logo... ✨
            </div>
        `;

        document.body.appendChild(secret);

        setTimeout(() => {
            secret.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => secret.remove(), 500);
        }, 10000);
    }

    enhanceAzizaPeriod() {
        // Make the period more visible for users who've been here 30+ seconds
        const period = document.querySelector('.magic-period');
        if (period) {
            period.style.opacity = '0.9';
            period.style.color = 'rgba(102, 126, 234, 0.9)';
            period.style.cursor = 'help';
            period.title = 'Something mysterious...';
        }
    }

    encourageContinuedExploration() {
        const encouragement = document.createElement('div');
        encouragement.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: rgba(0, 0, 0, 0.85);
            color: rgba(255, 255, 255, 0.8);
            padding: 12px 18px;
            border-radius: 8px;
            font-size: 0.85rem;
            opacity: 0;
            animation: fadeIn 1s ease-out forwards;
            z-index: 1000;
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 250px;
        `;
        encouragement.textContent = '🔍 The curious find more than they seek...';

        document.body.appendChild(encouragement);

        setTimeout(() => {
            encouragement.style.animation = 'fadeOut 1s ease-in forwards';
            setTimeout(() => encouragement.remove(), 1000);
        }, 8000);
    }

    trackAttentionToDetail() {
        // Track how many different elements user interacts with
        const elements = document.querySelectorAll('*');
        const interactedElements = new Set();

        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (!interactedElements.has(el)) {
                    interactedElements.add(el);
                    this.attentionScore++;

                    // Reward high attention to detail
                    if (interactedElements.size === 10) {
                        this.rewardCuriosity('detail_master_10', 'You notice everything! 👁️');
                    }
                    if (interactedElements.size === 25) {
                        this.rewardCuriosity('detail_master_25', 'Master of Observation! Details reveal secrets. 🔍');
                    }
                }
            }, { once: true, passive: true });
        });

        // Track scroll attention
        let lastScrollTop = 0;
        let scrollDirectionChanges = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if ((scrollTop > lastScrollTop && lastScrollTop !== 0) ||
                (scrollTop < lastScrollTop)) {
                scrollDirectionChanges++;

                if (scrollDirectionChanges === 5) {
                    this.rewardCuriosity('scroll_explorer', 'You explore thoroughly! 📜', 2000);
                }
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }

    calculateCuriosityScore() {
        // Score based on interactions, time, and discoveries
        const timeOnPage = (Date.now() - (window.pageLoadTime || Date.now())) / 1000;

        this.curiosityScore =
            this.discoveries.size * 3 +
            Math.min(this.microMoments / 10, 5) +
            Math.min(timeOnPage / 10, 3) +
            Math.min(this.attentionScore / 5, 5);

        return Math.floor(this.curiosityScore);
    }

    rewardCuriosity(id, message, duration = 4000) {
        if (this.discoveries.has(id)) return;

        this.discoveries.add(id);
        this.curiosityScore += 2;

        const reward = document.createElement('div');
        reward.className = 'curiosity-reward';
        reward.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: rgba(102, 126, 234, 0.15);
            border: 2px solid rgba(102, 126, 234, 0.5);
            border-radius: 12px;
            padding: 15px 25px;
            color: rgba(102, 126, 234, 1);
            font-size: 0.95rem;
            text-align: center;
            animation: rewardAppear 0.5s ease-out forwards;
            pointer-events: none;
            z-index: 10001;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 30px rgba(102, 126, 234, 0.3);
        `;
        reward.textContent = message;

        document.body.appendChild(reward);

        setTimeout(() => {
            reward.style.animation = 'rewardDisappear 0.5s ease-in forwards';
            setTimeout(() => reward.remove(), 500);
        }, duration);
    }

    findTextNode(element, text) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes(text)) {
                return node;
            }
        }
        return null;
    }
}

// Add necessary CSS animations
const firstMomentsStyles = document.createElement('style');
firstMomentsStyles.textContent = `
    @keyframes gentleShimmer {
        0%, 100% {
            opacity: 0.7;
            text-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
        }
        50% {
            opacity: 1;
            text-shadow: 0 0 15px rgba(102, 126, 234, 0.6);
        }
    }

    @keyframes gentlePulse {
        0%, 100% {
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        50% {
            box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
        }
    }

    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
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
            transform: translateX(50px);
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes rewardAppear {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }

    @keyframes rewardDisappear {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.1);
        }
    }

    @keyframes pageBreathing {
        0%, 100% {
            filter: brightness(1);
        }
        50% {
            filter: brightness(1.02);
        }
    }

    .future-vision-trigger:hover {
        color: rgba(102, 126, 234, 1) !important;
        text-shadow: 0 0 10px rgba(102, 126, 234, 0.8);
    }
`;
document.head.appendChild(firstMomentsStyles);

// Track page load time for curiosity scoring
window.pageLoadTime = Date.now();

// Initialize First Moments Magic
document.addEventListener('DOMContentLoaded', () => {
    window.firstMomentsMagic = new FirstMomentsMagic();
});

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FirstMomentsMagic;
}
