// Contribution Page JavaScript
class ContributionManager {
    constructor() {
        this.stripe = null;
        this.selectedAmount = null;
        this.donationType = 'monthly';
        this.language = window.SITE_LANGUAGE || 'en';
        this.init();
    }

    // Translation strings for different languages
    getTranslations() {
        return {
            en: {
                processing: 'Processing donation...',
                success: 'Thank you for your generosity!',
                successDesc: 'Your contribution fuels innovation and open-source development.',
                error: 'Payment failed. Please try again.',
                invalidAmount: 'Please enter a valid amount',
                emailInvalid: 'Please enter a valid email address',
                orderWelcome: 'Welcome to The Order!',
                enterCustomAmount: 'Enter custom amount'
            },
            es: {
                processing: 'Procesando donación...',
                success: '¡Gracias por tu generosidad!',
                successDesc: 'Tu contribución impulsa la innovación y el desarrollo de código abierto.',
                error: 'Pago falló. Por favor intenta de nuevo.',
                invalidAmount: 'Por favor ingresa una cantidad válida',
                emailInvalid: 'Por favor ingresa un email válido',
                orderWelcome: '¡Bienvenido a La Orden!',
                enterCustomAmount: 'Ingresa cantidad personalizada'
            }
        };
    }

    translate(key) {
        const translations = this.getTranslations();
        return translations[this.language] && translations[this.language][key]
            ? translations[this.language][key]
            : translations.en[key] || key;
    }

    setLanguage(lang) {
        this.language = lang;
        // Update any existing UI elements with new language
        this.updateUILanguage();
    }

    updateUILanguage() {
        // Update placeholder text for custom amount input
        const customAmountInput = document.querySelector('.custom-amount');
        if (customAmountInput) {
            customAmountInput.placeholder = this.translate('enterCustomAmount');
        }
    }

    async init() {
        // Initialize Stripe with your account
        try {
            const publishableKey = window.StripeConfig ? window.StripeConfig.getPublishableKey() : null;

            if (!publishableKey) {
                throw new Error('Stripe publishable key not configured. Please set up environment variables.');
            }
            this.stripe = Stripe(publishableKey);

            // Initialize Stripe Elements
            this.elements = this.stripe.elements({
                appearance: {
                    theme: 'night',
                    variables: {
                        colorPrimary: '#00ffff',
                        colorBackground: '#1a1a1a',
                        colorText: '#ffffff',
                        colorDanger: '#ff6b6b',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        spacingUnit: '4px',
                        borderRadius: '8px'
                    }
                }
            });
        } catch (error) {
            console.warn('Stripe not initialized - using demo mode');
        }

        this.setupEventListeners();
        this.generateQRCode();
        this.loadDonorData();
        this.createPaymentForm();
    }

    setupEventListeners() {
        // Amount button selection
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectAmount(e.target.dataset.amount);
                this.updateAmountButtons(e.target);
            });
        });

        // Custom amount input
        const customAmountInput = document.getElementById('customAmount');
        if (customAmountInput) {
            customAmountInput.addEventListener('input', (e) => {
                this.selectAmount(e.target.value);
                this.clearAmountButtons();
            });
        }

        // Donation type toggle
        document.querySelectorAll('input[name="donationType"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.donationType = e.target.value;
                this.updateDonationUI();
            });
        });

        // Continue button to show payment form
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                this.showPaymentForm();
            });
        }

        // Submit payment button
        const submitBtn = document.getElementById('submitPayment');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                this.handlePaymentSubmission();
            });
        }
    }

    selectAmount(amount) {
        this.selectedAmount = parseFloat(amount);
    }

    updateAmountButtons(selectedBtn) {
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        selectedBtn.classList.add('selected');
        document.getElementById('customAmount').value = '';
    }

    clearAmountButtons() {
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }

    updateDonationUI() {
        const currencySpan = document.getElementById('currencyLabel');
        if (currencySpan) {
            currencySpan.textContent = this.donationType === 'monthly' ? '$/month' : '$';
        }

        const frequencyDisplay = document.getElementById('frequencyDisplay');
        if (frequencyDisplay) {
            frequencyDisplay.textContent = this.donationType === 'monthly' ? 'monthly' : 'one-time';
        }

        const submitText = document.getElementById('submitText');
        if (submitText) {
            submitText.textContent = this.donationType === 'monthly' ?
                'Start Monthly Support' : 'Complete Donation';
        }
    }

    async showPaymentForm() {
        if (!this.selectedAmount || this.selectedAmount <= 0) {
            this.showMessage('Please select or enter a donation amount', 'error');
            return;
        }

        if (!this.stripe || !this.elements) {
            this.showMessage('Payment system not available. Please try again later.', 'error');
            return;
        }

        try {
            // Update display
            document.getElementById('selectedAmountDisplay').textContent = `$${this.selectedAmount}`;

            // Hide continue button, show payment form
            document.getElementById('continueBtn').style.display = 'none';
            document.getElementById('paymentSection').style.display = 'block';

            // Create payment intent on server
            const { clientSecret } = await this.createPaymentIntent();
            this.clientSecret = clientSecret;

            // Mount payment element
            this.paymentElement.mount('#payment-element');

        } catch (error) {
            console.error('Payment setup error:', error);
            this.showMessage('Failed to initialize payment. Please try again.', 'error');

            // Show continue button again
            document.getElementById('continueBtn').style.display = 'block';
            document.getElementById('paymentSection').style.display = 'none';
        }
    }

    createPaymentForm() {
        if (!this.stripe || !this.elements) return;

        // Create payment element
        this.paymentElement = this.elements.create('payment');
    }

    async createPaymentIntent() {
        // This will call your server endpoint
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: this.selectedAmount * 100, // Convert to cents
                currency: 'usd',
                payment_type: this.donationType,
                metadata: {
                    donation_type: this.donationType,
                    donor_amount: this.selectedAmount
                }
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create payment intent');
        }

        return await response.json();
    }

    async handlePaymentSubmission() {
        if (!this.stripe || !this.elements || !this.clientSecret) {
            this.showPaymentMessage('Payment system error. Please try again.', 'error');
            return;
        }

        const submitBtn = document.getElementById('submitPayment');
        const originalText = submitBtn.querySelector('span').textContent;

        // Show loading state
        submitBtn.querySelector('span').textContent = 'Processing...';
        submitBtn.disabled = true;

        try {
            const { error, paymentIntent } = await this.stripe.confirmPayment({
                elements: this.elements,
                clientSecret: this.clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/contribute.html?success=true`,
                },
                redirect: 'if_required'
            });

            if (error) {
                this.showPaymentMessage(error.message, 'error');
            } else if (paymentIntent.status === 'succeeded') {
                // Payment successful - simple success message
                await this.handlePaymentSuccess(paymentIntent);
                this.showSuccessMessage();
            }

        } catch (error) {
            console.error('Payment error:', error);
            this.showPaymentMessage('Payment failed. Please try again.', 'error');
        } finally {
            // Restore button state
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showSuccessMessage() {
        // Simple success - hide payment form and show thank you
        document.getElementById('paymentSection').style.display = 'none';

        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <div class="success-icon">🎉</div>
                <h3>Thank You!</h3>
                <p>Your contribution of $${this.selectedAmount} ${this.donationType === 'monthly' ? 'monthly' : ''} has been processed successfully.</p>
                <p>You're helping build the future of technology!</p>
                <button onclick="location.reload()" class="new-donation-btn">Make Another Contribution</button>
            </div>
        `;

        const donationCard = document.querySelector('.donation-card .donation-options');
        donationCard.appendChild(successMessage);

        // Show optional Gmail registration for Hall of Fame perks
        setTimeout(() => {
            this.showOptionalRegistration();
        }, 2000);
    }

    async handlePaymentSuccess(paymentIntent) {
        // Store successful payment data
        const paymentData = {
            paymentIntentId: paymentIntent.id,
            amount: this.selectedAmount,
            type: this.donationType,
            timestamp: Date.now()
        };

        localStorage.setItem('terrellflautt_last_payment', JSON.stringify(paymentData));
        console.log('Payment successful!', paymentData);
    }

    showPaymentMessage(message, type = 'info') {
        const messageElement = document.getElementById('paymentMessage');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `payment-message ${type}`;
            messageElement.style.display = 'block';

            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);
        }
    }

    showMessage(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `contribution-toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // Show toast
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }

    // Optional Gmail registration for Hall of Fame perks (only after donation)
    showOptionalRegistration() {
        const registrationOffer = document.createElement('div');
        registrationOffer.className = 'registration-offer';
        registrationOffer.innerHTML = `
            <div class="offer-content">
                <div class="mystery-reveal">
                    <div class="hidden-knowledge-icon">🔮</div>
                    <h4>✨ The Hidden Knowledge Awaits</h4>
                    <p class="revelation-text">
                        By contributing, you have discovered the <strong>Register</strong> button...
                        <br>You are now a member of the <em>Knowledge</em>.
                    </p>
                    <div class="order-invitation">
                        <p class="invitation-text">
                            Do you choose to accept your place in <strong>The Order</strong>?
                        </p>
                        <p class="wisdom-note">Join the Hall of Fame and be recognized among the enlightened.</p>
                    </div>
                </div>
                <div class="offer-actions">
                    <button id="linkGmail" class="gmail-link-btn accept-order">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Accept My Place in The Order
                    </button>
                    <button id="skipRegistration" class="skip-btn decline-order">Decline this Honor</button>
                </div>
            </div>
        `;

        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
            successMessage.appendChild(registrationOffer);

            // Setup event listeners
            document.getElementById('linkGmail').addEventListener('click', () => {
                this.linkGmailAccount();
            });

            document.getElementById('skipRegistration').addEventListener('click', () => {
                registrationOffer.remove();
            });
        }
    }

    async linkGmailAccount() {
        try {
            // This would integrate with Google OAuth
            // For now, we'll simulate it
            console.log('Gmail linking would happen here with Google OAuth');

            // Create donor Hall of Fame entry
            this.createDonorHallOfFameEntry({
                email: 'donor@example.com', // Would come from Google
                name: 'Generous Supporter', // Would come from Google
                picture: null // Would come from Google
            });

            this.showMessage('Successfully linked Gmail! You now appear on the Hall of Fame.', 'success');

        } catch (error) {
            console.error('Gmail linking error:', error);
            this.showMessage('Failed to link Gmail. Please try again.', 'error');
        }
    }

    createDonorHallOfFameEntry(googleData) {
        // Add donor to Hall of Fame with special badges
        const donorEntry = {
            id: this.generateDonorId(),
            username: googleData.name || `Donor_${Date.now()}`,
            email: googleData.email,
            profilePicture: googleData.picture,
            isDonor: true,
            donorType: this.donationType,
            donationAmount: this.selectedAmount,
            badges: this.getDonorBadges(),
            discoveries: 0, // They can still earn discovery badges
            visits: 1,
            totalTime: 0,
            achievementLevel: 'Generous Supporter',
            explorationStyle: 'Community Builder',
            lastActive: Date.now(),
            joinDate: Date.now(),
            isGoogleLinked: true,
            isVerified: true
        };

        // Add to leaderboard
        let leaderboard = JSON.parse(localStorage.getItem('terrellflautt_leaderboard') || '[]');
        leaderboard.push(donorEntry);

        // Sort leaderboard - donors get priority
        leaderboard.sort((a, b) => {
            if (a.isDonor && !b.isDonor) return -1;
            if (!a.isDonor && b.isDonor) return 1;

            if (a.isDonor && b.isDonor) {
                const aValue = a.donorType === 'monthly' ? a.donationAmount * 12 : a.donationAmount;
                const bValue = b.donorType === 'monthly' ? b.donationAmount * 12 : b.donationAmount;
                if (aValue !== bValue) return bValue - aValue;
            }

            return b.discoveries - a.discoveries;
        });

        localStorage.setItem('terrellflautt_leaderboard', JSON.stringify(leaderboard));
        console.log('🏆 Added to Hall of Fame with donor badges!');
    }

    getDonorBadges() {
        const badges = [];

        // Donation type badge
        if (this.donationType === 'monthly') {
            badges.push({
                id: 'monthly_supporter',
                name: 'Monthly Supporter',
                icon: '🔄',
                color: '#4CAF50',
                description: `$${this.selectedAmount}/month recurring support`
            });
        } else {
            badges.push({
                id: 'one_time_donor',
                name: 'Generous Donor',
                icon: '💎',
                color: '#2196F3',
                description: `$${this.selectedAmount} one-time contribution`
            });
        }

        // Tier badge based on amount
        if (this.selectedAmount >= 100) {
            badges.push({
                id: 'platinum_tier',
                name: 'Platinum Supporter',
                icon: '🏆',
                color: '#E5E4E2',
                description: 'Top-tier supporter'
            });
        } else if (this.selectedAmount >= 30) {
            badges.push({
                id: 'gold_tier',
                name: 'Gold Supporter',
                icon: '🥇',
                color: '#FFD700',
                description: 'Premium supporter'
            });
        } else if (this.selectedAmount >= 5) {
            badges.push({
                id: 'silver_tier',
                name: 'Silver Supporter',
                icon: '🥈',
                color: '#C0C0C0',
                description: 'Valued supporter'
            });
        }

        return badges;
    }

    generateDonorId() {
        return 'donor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContributionManager();
});
                <div class="modal-header">
                    <h2>Thank You for Your Contribution! 🎉</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="donation-success">
                        <div class="success-icon">✅</div>
                        <p>Your ${this.donationType} donation of $${this.selectedAmount} has been processed successfully!</p>
                    </div>

                    <div class="donor-benefits">
                        <h3>🏆 Unlock Your Donor Benefits</h3>
                        <div class="benefits-list">
                            <div class="benefit-item">
                                <span class="benefit-icon">🎖️</span>
                                <span>Special donor badge on Hall of Fame</span>
                            </div>
                            <div class="benefit-item">
                                <span class="benefit-icon">👤</span>
                                <span>Permanent profile with your Google account</span>
                            </div>
                            <div class="benefit-item">
                                <span class="benefit-icon">⭐</span>
                                <span>Priority support and early access</span>
                            </div>
                            <div class="benefit-item">
                                <span class="benefit-icon">🎨</span>
                                <span>Custom profile picture and username</span>
                            </div>
                        </div>
                    </div>

                    <div class="donor-registration">
                        <h4>Link Your Google Account (Optional)</h4>
                        <p>Connect your Gmail to get a permanent profile and display your donor status:</p>

                        <button id="linkGoogleAccount" class="google-link-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span>Link Google Account</span>
                        </button>

                        <div class="manual-registration">
                            <p>Or set up your profile manually:</p>
                            <div class="input-group">
                                <input type="text" id="donorUsername" placeholder="Choose a username" maxlength="20">
                                <input type="email" id="donorEmail" placeholder="Your email (optional)">
                            </div>
                            <button id="manualSetup" class="manual-setup-btn">Set Up Profile</button>
                        </div>

                        <button id="skipSetup" class="skip-setup-btn">Skip for Now</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Setup modal event listeners
        this.setupDonorModalListeners(modal);

        // Show modal with animation
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
    }

    setupDonorModalListeners(modal) {
        // Close modal
        const closeBtn = modal.querySelector('.close-modal');
        const skipBtn = modal.querySelector('#skipSetup');

        [closeBtn, skipBtn].forEach(btn => {
            btn?.addEventListener('click', () => {
                this.closeDonorModal(modal);
            });
        });

        // Google account linking
        const googleBtn = modal.querySelector('#linkGoogleAccount');
        googleBtn?.addEventListener('click', () => {
            this.linkGoogleAccount(modal);
        });

        // Manual setup
        const manualBtn = modal.querySelector('#manualSetup');
        manualBtn?.addEventListener('click', () => {
            this.setupManualProfile(modal);
        });

        // Close on overlay click
        modal.querySelector('.modal-overlay')?.addEventListener('click', () => {
            this.closeDonorModal(modal);
        });
    }

    async linkGoogleAccount(modal) {
        try {
            // Initialize Google Sign-In (you would need to include Google's SDK)
            // For demo purposes, we'll simulate the process
            await this.simulateGoogleAuth();

            // Create donor profile with Google data
            const donorProfile = {
                id: this.generateDonorId(),
                username: 'GoogleUser123', // Would come from Google
                email: 'user@gmail.com', // Would come from Google
                profilePicture: 'https://lh3.googleusercontent.com/a/default-user', // Would come from Google
                donorType: this.donationType,
                donationAmount: this.selectedAmount,
                donationDate: Date.now(),
                badges: this.getDonorBadges(),
                isGoogleLinked: true,
                isVerified: true
            };

            this.saveDonorProfile(donorProfile);
            this.updateHallOfFame(donorProfile);
            this.showSuccessMessage('Google account linked successfully!');
            this.closeDonorModal(modal);

        } catch (error) {
            console.error('Google linking error:', error);
            this.showMessage('Failed to link Google account. Please try manual setup.', 'error');
        }
    }

    setupManualProfile(modal) {
        const username = modal.querySelector('#donorUsername').value.trim();
        const email = modal.querySelector('#donorEmail').value.trim();

        if (!username) {
            this.showMessage('Please enter a username', 'error');
            return;
        }

        if (username.length < 3 || username.length > 20) {
            this.showMessage('Username must be 3-20 characters', 'error');
            return;
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
            this.showMessage('Username can only contain letters, numbers, underscore, and dash', 'error');
            return;
        }

        // Check if username is taken
        if (this.isUsernameTaken(username)) {
            this.showMessage('Username already taken. Please choose another.', 'error');
            return;
        }

        const donorProfile = {
            id: this.generateDonorId(),
            username: username,
            email: email || null,
            profilePicture: null,
            donorType: this.donationType,
            donationAmount: this.selectedAmount,
            donationDate: Date.now(),
            badges: this.getDonorBadges(),
            isGoogleLinked: false,
            isVerified: !!email
        };

        this.saveDonorProfile(donorProfile);
        this.updateHallOfFame(donorProfile);
        this.showSuccessMessage('Profile created successfully!');
        this.closeDonorModal(modal);
    }

    getDonorBadges() {
        const badges = [];

        if (this.donationType === 'monthly') {
            badges.push({
                id: 'monthly_supporter',
                name: 'Monthly Supporter',
                icon: '🔄',
                color: '#4CAF50',
                description: `$${this.selectedAmount}/month recurring donation`
            });
        } else {
            badges.push({
                id: 'one_time_donor',
                name: 'Generous Donor',
                icon: '💎',
                color: '#2196F3',
                description: `$${this.selectedAmount} one-time donation`
            });
        }

        // Add tier-based badges
        if (this.selectedAmount >= 100) {
            badges.push({
                id: 'platinum_tier',
                name: 'Platinum Tier',
                icon: '🏆',
                color: '#E5E4E2',
                description: 'Top-tier supporter'
            });
        } else if (this.selectedAmount >= 30) {
            badges.push({
                id: 'gold_tier',
                name: 'Gold Tier',
                icon: '🥇',
                color: '#FFD700',
                description: 'Premium supporter'
            });
        } else if (this.selectedAmount >= 5) {
            badges.push({
                id: 'silver_tier',
                name: 'Silver Tier',
                icon: '🥈',
                color: '#C0C0C0',
                description: 'Valued supporter'
            });
        } else {
            badges.push({
                id: 'bronze_tier',
                name: 'Bronze Tier',
                icon: '🥉',
                color: '#CD7F32',
                description: 'Community supporter'
            });
        }

        return badges;
    }

    generateDonorId() {
        return 'donor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    isUsernameTaken(username) {
        const donors = JSON.parse(localStorage.getItem('terrellflautt_donors') || '[]');
        const leaderboard = JSON.parse(localStorage.getItem('terrellflautt_leaderboard') || '[]');

        const takenInDonors = donors.some(donor =>
            donor.username.toLowerCase() === username.toLowerCase()
        );

        const takenInLeaderboard = leaderboard.some(entry =>
            entry.username.toLowerCase() === username.toLowerCase()
        );

        return takenInDonors || takenInLeaderboard;
    }

    saveDonorProfile(profile) {
        const donors = JSON.parse(localStorage.getItem('terrellflautt_donors') || '[]');
        donors.push(profile);
        localStorage.setItem('terrellflautt_donors', JSON.stringify(donors));

        // Also save as current donor session
        localStorage.setItem('terrellflautt_current_donor', JSON.stringify(profile));
    }

    updateHallOfFame(donorProfile) {
        // Get existing leaderboard data
        let leaderboard = JSON.parse(localStorage.getItem('terrellflautt_leaderboard') || '[]');

        // Create enhanced leaderboard entry for donor
        const leaderboardEntry = {
            id: donorProfile.id,
            username: donorProfile.username,
            isRegistered: true,
            isAnonymous: false,
            isDonor: true,
            donorType: donorProfile.donorType,
            donationAmount: donorProfile.donationAmount,
            profilePicture: donorProfile.profilePicture,
            badges: donorProfile.badges,
            discoveries: 0, // They can still earn discovery badges
            visits: 1,
            totalTime: 0,
            achievementLevel: 'Generous Supporter',
            explorationStyle: 'Community Builder',
            lastActive: Date.now(),
            joinDate: donorProfile.donationDate,
            streak: 0,
            isGoogleLinked: donorProfile.isGoogleLinked,
            isVerified: donorProfile.isVerified
        };

        // Add to leaderboard
        leaderboard.push(leaderboardEntry);

        // Sort leaderboard - donors get priority, then by donation amount, then by discoveries
        leaderboard.sort((a, b) => {
            // Donors first
            if (a.isDonor && !b.isDonor) return -1;
            if (!a.isDonor && b.isDonor) return 1;

            // Among donors, sort by donation amount (monthly donors valued higher)
            if (a.isDonor && b.isDonor) {
                const aValue = a.donorType === 'monthly' ? a.donationAmount * 12 : a.donationAmount;
                const bValue = b.donorType === 'monthly' ? b.donationAmount * 12 : b.donationAmount;
                if (aValue !== bValue) return bValue - aValue;
            }

            // Then by discoveries
            if (b.discoveries !== a.discoveries) {
                return b.discoveries - a.discoveries;
            }

            // Finally by join date
            return a.joinDate - b.joinDate;
        });

        localStorage.setItem('terrellflautt_leaderboard', JSON.stringify(leaderboard));
    }

    async simulateGoogleAuth() {
        // Simulate Google OAuth process
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In a real implementation, you would:
        // 1. Initialize Google OAuth
        // 2. Handle the auth flow
        // 3. Get user profile data
        // 4. Return the profile information

        return {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            picture: 'https://lh3.googleusercontent.com/a/default-user'
        };
    }

    closeDonorModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    showMessage(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `contribution-toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // Show toast
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }

    generateQRCode() {
        // Generate a simple QR code for donation links
        // In a real implementation, you would use a QR code library
        const qrContainer = document.getElementById('qrcode');
        if (qrContainer) {
            // For demo purposes, create a simple placeholder pattern
            qrContainer.innerHTML = `
                <rect width="160" height="160" fill="#000"/>
                <rect x="8" y="8" width="144" height="144" fill="#fff"/>
                <rect x="16" y="16" width="32" height="32" fill="#000"/>
                <rect x="112" y="16" width="32" height="32" fill="#000"/>
                <rect x="16" y="112" width="32" height="32" fill="#000"/>
                <text x="80" y="85" text-anchor="middle" fill="#000" font-size="12" font-family="monospace">DONATE</text>
            `;
        }
    }

    loadDonorData() {
        // Check if user is already a donor
        const currentDonor = localStorage.getItem('terrellflautt_current_donor');
        if (currentDonor) {
            try {
                const donor = JSON.parse(currentDonor);
                this.showDonorStatus(donor);
            } catch (error) {
                console.error('Error loading donor data:', error);
            }
        }
    }

    showDonorStatus(donor) {
        // Add donor status indicator to the page
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && donor.badges.length > 0) {
            const statusBadge = document.createElement('div');
            statusBadge.className = 'donor-status-badge';
            statusBadge.innerHTML = `
                <div class="status-content">
                    <span class="status-icon">${donor.badges[0].icon}</span>
                    <span class="status-text">Thank you, ${donor.username}!</span>
                    <span class="status-tier">${donor.badges[0].name}</span>
                </div>
            `;
            heroContent.appendChild(statusBadge);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContributionManager();
});

// Add cursor follower functionality
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});