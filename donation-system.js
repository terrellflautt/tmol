/**
 * Donation System with Stripe Integration
 * Allows users to donate and unlock special features
 * Integrated with Google Auth and comprehensive tracking
 */

class DonationSystem {
    constructor() {
        this.stripe = null;
        this.donationAmounts = [5, 10, 25, 50, 100];
        this.donationRewards = {
            5: {
                title: "Cosmic Supporter",
                rewards: ["Access to secret character dialogues", "Special Hall of Fame badge", "Donater-only easter eggs"]
            },
            10: {
                title: "Reality Shaper",
                rewards: ["Custom website themes", "Exclusive story paths", "Behind-the-scenes content"]
            },
            25: {
                title: "Digital Mystic",
                rewards: ["Downloadable artwork collection", "Early access to new features", "Personal thank you from Terrell"]
            },
            50: {
                title: "Legendary Patron",
                rewards: ["Custom character in the story", "Exclusive video call session", "Limited edition digital certificate"]
            },
            100: {
                title: "Transcendent Benefactor",
                rewards: ["Co-creator status", "Input on future features", "Lifetime access to all content", "Special recognition page"]
            }
        };

        this.init();
    }

    init() {
        this.loadStripe();
        this.createDonationInterface();
        this.setupEventListeners();
    }

    async loadStripe() {
        // Load Stripe.js if not already loaded
        if (!window.Stripe) {
            await new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://js.stripe.com/v3/';
                script.onload = resolve;
                document.head.appendChild(script);
            });
        }

        // Initialize Stripe (replace with your actual publishable key)
        this.stripe = Stripe('pk_test_51QM9xjDQQX82JMrxGNPMl3l6sKjU0VGvQ4XgNKOQkJfRR3HHUB8UKbHw7xJPHUXVfWKyJKwNXgdyT0LMlHSgKnwh00W0sL9QGN');
    }

    createDonationInterface() {
        // Create donation trigger button (heart icon)
        const donationBtn = document.createElement('button');
        donationBtn.id = 'donation-trigger';
        donationBtn.innerHTML = '❤️';
        donationBtn.title = 'Support the Journey';
        donationBtn.style.cssText = `
            position: fixed;
            bottom: 210px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ff6b6b, #ff8e53);
            border: 2px solid #ff4757;
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
            animation: heartbeat 2s infinite;
        `;

        // Add heartbeat animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes heartbeat {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);

        donationBtn.addEventListener('click', () => this.showDonationModal());
        donationBtn.addEventListener('mouseenter', () => {
            donationBtn.style.transform = 'scale(1.1)';
            donationBtn.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.5)';
        });
        donationBtn.addEventListener('mouseleave', () => {
            donationBtn.style.transform = 'scale(1)';
            donationBtn.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.3)';
        });

        document.body.appendChild(donationBtn);
    }

    showDonationModal() {
        const modal = document.createElement('div');
        modal.id = 'donation-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 20000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: 3px solid #ffd700;
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            color: white;
            text-align: center;
            position: relative;
        `;

        content.innerHTML = this.generateDonationContent();

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        `;
        closeBtn.addEventListener('click', () => modal.remove());
        closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
        closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.7');

        content.appendChild(closeBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);

        // Setup donation amount buttons
        this.setupDonationButtons(content);

        setTimeout(() => {
            modal.style.opacity = '1';
        }, 100);
    }

    generateDonationContent() {
        return `
            <div style="margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; background: linear-gradient(45deg, #ffd700, #ffed4e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px;">
                    Support the Digital Journey
                </h2>
                <p style="margin: 0; font-size: 16px; opacity: 0.9; line-height: 1.6;">
                    Your support helps maintain this evolving digital realm and unlocks exclusive experiences that enhance your journey through the mysteries within.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                ${this.donationAmounts.map(amount => `
                    <div class="donation-option" data-amount="${amount}" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 2px solid rgba(255, 215, 0, 0.3);
                        border-radius: 15px;
                        padding: 20px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        position: relative;
                        overflow: hidden;
                    ">
                        <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px; color: #ffd700;">
                            $${amount}
                        </div>
                        <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px; color: #ffed4e;">
                            ${this.donationRewards[amount].title}
                        </div>
                        <div style="font-size: 12px; opacity: 0.8; line-height: 1.4;">
                            ${this.donationRewards[amount].rewards.slice(0, 2).join(' • ')}
                        </div>
                        <div class="glow-effect" style="
                            position: absolute;
                            top: -50%;
                            left: -50%;
                            width: 200%;
                            height: 200%;
                            background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.1), transparent);
                            transform: rotate(45deg);
                            transition: all 0.5s ease;
                            opacity: 0;
                        "></div>
                    </div>
                `).join('')}
            </div>

            <div style="margin-bottom: 20px; padding: 20px; background: rgba(0, 0, 0, 0.3); border-radius: 10px;">
                <h4 style="margin: 0 0 15px 0; color: #ffd700;">✨ What Your Support Enables:</h4>
                <div style="text-align: left; font-size: 14px; line-height: 1.6;">
                    • Continuous development of new story paths and characters<br>
                    • Server hosting and database maintenance<br>
                    • Creation of exclusive downloadable content<br>
                    • Enhanced user experiences and magical features<br>
                    • Recognition in the digital Hall of Fame
                </div>
            </div>

            <div style="font-size: 12px; opacity: 0.7; margin-top: 20px;">
                Secure payment processing by Stripe • One-time donation • No subscription
            </div>
        `;
    }

    setupDonationButtons(container) {
        const donationOptions = container.querySelectorAll('.donation-option');

        donationOptions.forEach(option => {
            option.addEventListener('mouseenter', () => {
                option.style.borderColor = '#ffd700';
                option.style.background = 'rgba(255, 215, 0, 0.1)';
                option.style.transform = 'translateY(-5px)';
                option.querySelector('.glow-effect').style.opacity = '1';
            });

            option.addEventListener('mouseleave', () => {
                option.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                option.style.background = 'rgba(255, 255, 255, 0.1)';
                option.style.transform = 'translateY(0)';
                option.querySelector('.glow-effect').style.opacity = '0';
            });

            option.addEventListener('click', () => {
                const amount = parseInt(option.dataset.amount);
                this.processDonation(amount);
            });
        });
    }

    async processDonation(amount) {
        if (!this.stripe) {
            alert('Payment system is loading, please try again in a moment.');
            return;
        }

        // Check if user is signed in with Google
        const trackingSystem = window.comprehensiveTrackingSystem;
        if (!trackingSystem || !trackingSystem.getUserEmail()) {
            this.showGoogleSignInPrompt(amount);
            return;
        }

        try {
            // Show loading state
            this.showLoadingState();

            // Create checkout session
            const response = await fetch('https://s2y50a6cf3.execute-api.us-east-1.amazonaws.com/prod/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount * 100, // Convert to cents
                    userId: trackingSystem.getUserId(),
                    email: trackingSystem.getUserEmail(),
                    rewardTier: this.donationRewards[amount].title
                }),
            });

            const session = await response.json();

            if (session.error) {
                throw new Error(session.error);
            }

            // Redirect to Stripe Checkout
            const { error } = await this.stripe.redirectToCheckout({
                sessionId: session.sessionId,
            });

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Donation error:', error);
            this.showErrorMessage('There was an issue processing your donation. Please try again.');
        }
    }

    showGoogleSignInPrompt(amount) {
        const prompt = document.createElement('div');
        prompt.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #4285f4, #357ae8);
            color: white;
            padding: 30px;
            border-radius: 15px;
            z-index: 25000;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            max-width: 400px;
        `;

        prompt.innerHTML = `
            <h3 style="margin: 0 0 20px 0;">Sign In Required</h3>
            <p style="margin: 0 0 20px 0; line-height: 1.6;">
                To process your donation and unlock exclusive features, please sign in with Google first.
            </p>
            <button id="sign-in-for-donation" style="
                padding: 12px 24px;
                background: white;
                border: none;
                border-radius: 8px;
                color: #4285f4;
                cursor: pointer;
                margin-right: 10px;
                font-weight: bold;
            ">
                Sign In with Google
            </button>
            <button onclick="this.parentElement.remove()" style="
                padding: 12px 24px;
                background: transparent;
                border: 2px solid white;
                border-radius: 8px;
                color: white;
                cursor: pointer;
            ">
                Cancel
            </button>
        `;

        document.body.appendChild(prompt);

        // Setup sign-in button
        prompt.querySelector('#sign-in-for-donation').addEventListener('click', () => {
            prompt.remove();

            // Enable donation mode for this user
            if (window.comprehensiveTrackingSystem) {
                window.comprehensiveTrackingSystem.isDonater = true;
                window.comprehensiveTrackingSystem.saveLocalData();
                window.comprehensiveTrackingSystem.updateAuthInterface();

                // Show Google sign-in
                if (window.google) {
                    google.accounts.id.prompt();
                }
            }

            // After sign-in, retry donation
            setTimeout(() => {
                if (window.comprehensiveTrackingSystem?.getUserEmail()) {
                    this.processDonation(amount);
                }
            }, 2000);
        });
    }

    showLoadingState() {
        const loading = document.createElement('div');
        loading.id = 'donation-loading';
        loading.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 30000;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 18px;
        `;

        loading.innerHTML = `
            <div style="text-align: center;">
                <div style="width: 50px; height: 50px; border: 3px solid #ffd700; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <div>Processing your generous donation...</div>
            </div>
        `;

        // Add spin animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(loading);
    }

    showErrorMessage(message) {
        // Remove loading state
        const loading = document.getElementById('donation-loading');
        if (loading) loading.remove();

        const error = document.createElement('div');
        error.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff6b6b, #ff8e53);
            color: white;
            padding: 30px;
            border-radius: 15px;
            z-index: 25000;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            max-width: 400px;
        `;

        error.innerHTML = `
            <h3 style="margin: 0 0 15px 0;">Oops!</h3>
            <p style="margin: 0 0 20px 0;">${message}</p>
            <button onclick="this.parentElement.remove()" style="
                padding: 10px 20px;
                background: white;
                border: none;
                border-radius: 8px;
                color: #ff6b6b;
                cursor: pointer;
                font-weight: bold;
            ">
                Try Again
            </button>
        `;

        document.body.appendChild(error);
        setTimeout(() => error.remove(), 5000);
    }

    setupEventListeners() {
        // Listen for successful donations
        document.addEventListener('donation_completed', (e) => {
            this.handleDonationSuccess(e.detail);
        });

        // Listen for page load to check for donation success
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('donation_success') === 'true') {
            this.handleDonationSuccess({
                amount: urlParams.get('amount'),
                sessionId: urlParams.get('session_id')
            });
        }
    }

    handleDonationSuccess(details) {
        // Update user status
        if (window.comprehensiveTrackingSystem) {
            window.comprehensiveTrackingSystem.isDonater = true;
            window.comprehensiveTrackingSystem.recordEvent('donation_made', {
                amount: details.amount,
                tier: details.rewardTier || 'supporter'
            });
        }

        // Show success modal
        this.showSuccessModal(details);

        // Unlock donater features
        this.unlockDonaterFeatures(details);
    }

    showSuccessModal(details) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 25000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: 3px solid #ffd700;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            color: white;
            text-align: center;
            animation: successGlow 2s ease-out;
        `;

        const amount = details.amount || '5';
        const tier = this.donationRewards[parseInt(amount)]?.title || 'Cosmic Supporter';

        content.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 20px;">🌟</div>
            <h2 style="margin: 0 0 20px 0; color: #ffd700;">Thank You!</h2>
            <p style="margin: 0 0 20px 0; font-size: 18px;">
                Your generous donation of $${amount} has unlocked your status as a <strong>${tier}</strong>!
            </p>
            <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 15px 0; color: #ffd700;">🎁 Rewards Unlocked:</h4>
                <div style="text-align: left; font-size: 14px; line-height: 1.6;">
                    ${this.donationRewards[parseInt(amount)]?.rewards.map(reward => `• ${reward}`).join('<br>') || '• Special recognition in Hall of Fame<br>• Access to exclusive content'}
                </div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                padding: 15px 30px;
                background: linear-gradient(135deg, #ffd700, #ffed4e);
                border: none;
                border-radius: 8px;
                color: #333;
                cursor: pointer;
                font-weight: bold;
                font-size: 16px;
            ">
                Continue Your Journey
            </button>
        `;

        // Add success animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes successGlow {
                0% { box-shadow: 0 0 0 rgba(255, 215, 0, 0.8); }
                50% { box-shadow: 0 0 50px rgba(255, 215, 0, 0.8); }
                100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.4); }
            }
        `;
        document.head.appendChild(style);

        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    unlockDonaterFeatures(details) {
        // Unlock special UI elements
        document.body.classList.add('donater-mode');

        // Trigger special visual effects
        this.triggerCelebrationEffects();

        // Enable access to donater-only content
        if (window.comprehensiveTrackingSystem) {
            window.comprehensiveTrackingSystem.createAuthInterface();
        }
    }

    triggerCelebrationEffects() {
        // Create floating golden particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: #ffd700;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 15000;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${window.innerHeight}px;
                    animation: floatUp 3s ease-out forwards;
                `;

                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 3000);
            }, i * 100);
        }

        // Add float animation
        if (!document.getElementById('celebration-styles')) {
            const style = document.createElement('style');
            style.id = 'celebration-styles';
            style.textContent = `
                @keyframes floatUp {
                    to {
                        transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Public API
    getDonaterStatus() {
        return window.comprehensiveTrackingSystem?.isDonaterUser() || false;
    }

    showDonationPrompt() {
        this.showDonationModal();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.donationSystem = new DonationSystem();
    });
} else {
    window.donationSystem = new DonationSystem();
}