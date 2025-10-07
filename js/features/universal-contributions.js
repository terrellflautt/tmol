/**
 * Universal Contribution System
 * Simple checkout for any amount, any project, any frequency
 */

class UniversalContributions {
    constructor() {
        this.apiBase = 'https://api.terrellflautt.com';
        this.init();
    }

    init() {
        this.addContributeButton();
        this.checkContributionStatus();
    }

    /**
     * Add single "Support" button to main page
     * DISABLED: Each project now has its own contribution page
     */
    addContributeButton() {
        // Disabled - each project handles its own contributions
        return;
    }

    /**
     * Open universal contribution modal
     */
    openContributionModal() {
        const existing = document.getElementById('universal-contribute-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'universal-contribute-modal';
        modal.className = 'contribution-modal';
        modal.innerHTML = `
            <div class="contribution-backdrop"></div>
            <div class="contribution-container">
                <div class="contribution-header">
                    <h3>Support terrellflautt.com</h3>
                    <button class="contribution-close">&times;</button>
                </div>

                <div class="contribution-content">
                    <p class="contribution-intro">
                        If you appreciate the content, please consider pledging $5/month or a custom amount to support open source development.
                    </p>

                    <div class="contribution-form">
                        <div class="form-group">
                            <label>Amount (USD)</label>
                            <div class="amount-input-wrapper">
                                <span class="currency-symbol">$</span>
                                <input type="number"
                                       id="contributionAmount"
                                       placeholder="5.00"
                                       min="1"
                                       step="0.01"
                                       value="5.00">
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Frequency</label>
                            <div class="frequency-selector">
                                <button class="frequency-btn" data-frequency="one-time">
                                    One-Time
                                </button>
                                <button class="frequency-btn active" data-frequency="monthly">
                                    Monthly ($5/mo suggested)
                                </button>
                                <button class="frequency-btn" data-frequency="yearly">
                                    Yearly
                                </button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Email (optional)</label>
                            <input type="email"
                                   id="contributionEmail"
                                   placeholder="your@email.com">
                            <div class="form-checkbox">
                                <input type="checkbox" id="joinMailingList" checked>
                                <label for="joinMailingList">
                                    Join mailing list for updates and become a blog contributor (minimum $1 donation)
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Message (optional)</label>
                            <textarea id="contributionMessage"
                                      rows="3"
                                      placeholder="Which project do you want to support? Any message for the developer?"></textarea>
                        </div>

                        <button class="contribute-submit-btn" id="universalContributeSubmit">
                            Continue to Checkout
                        </button>

                        <p class="contribution-note">
                            Powered by Stripe. Secure and encrypted.
                        </p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 50);

        this.setupModalEvents(modal);
    }

    setupModalEvents(modal) {
        const close = modal.querySelector('.contribution-close');
        const backdrop = modal.querySelector('.contribution-backdrop');
        const frequencyBtns = modal.querySelectorAll('.frequency-btn');
        const submitBtn = modal.querySelector('#universalContributeSubmit');

        let selectedFrequency = 'monthly';

        // Close handlers
        close.addEventListener('click', () => this.closeModal(modal));
        backdrop.addEventListener('click', () => this.closeModal(modal));

        // Frequency selector
        frequencyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                frequencyBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedFrequency = btn.dataset.frequency;
            });
        });

        // Submit
        submitBtn.addEventListener('click', () => {
            const amount = parseFloat(document.getElementById('contributionAmount').value);
            const email = document.getElementById('contributionEmail').value.trim();
            const message = document.getElementById('contributionMessage').value.trim();
            const joinMailingList = document.getElementById('joinMailingList').checked;

            if (!amount || amount < 1) {
                alert('Please enter an amount of at least $1.00');
                return;
            }

            this.createCheckout({
                amount: Math.round(amount * 100), // Convert to cents
                frequency: selectedFrequency,
                email: email || null,
                message: message || null,
                joinMailingList
            });
        });
    }

    async createCheckout({ amount, frequency, email, message, joinMailingList }) {
        try {
            const userId = this.getUserId();

            const response = await fetch(`${this.apiBase}/contributions/create-checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount,
                    frequency,
                    email,
                    message,
                    userId,
                    joinMailingList
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const { sessionUrl } = await response.json();
            window.location.href = sessionUrl;

        } catch (error) {
            console.error('Checkout error:', error);
            alert('Unable to process contribution. Please try again.');
        }
    }

    checkContributionStatus() {
        const params = new URLSearchParams(window.location.search);

        if (params.get('contribution') === 'success') {
            this.showSuccessMessage();
            // Clean URL
            window.history.replaceState({}, '', window.location.pathname);
        } else if (params.get('contribution') === 'cancelled') {
            console.log('Contribution cancelled by user');
        }
    }

    showSuccessMessage() {
        const banner = document.createElement('div');
        banner.className = 'contribution-success-banner';
        banner.innerHTML = `
            <div class="success-content">
                <span class="success-icon">✨</span>
                <span class="success-text">Thank you for your contribution!</span>
                <button class="success-close">&times;</button>
            </div>
        `;
        banner.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
            z-index: 10000;
            animation: slideInRight 0.5s ease;
        `;

        document.body.appendChild(banner);

        banner.querySelector('.success-close').addEventListener('click', () => {
            banner.remove();
        });

        setTimeout(() => banner.remove(), 8000);
    }

    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }

    getUserId() {
        return localStorage.getItem('terrellflautt_user_id') || 'anonymous';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.universalContributions = new UniversalContributions();
});

// CSS for success banner animation
(function() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .success-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .success-icon {
        font-size: 1.5rem;
    }

    .success-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        line-height: 1;
    }
`;
    document.head.appendChild(styleEl);
})();
