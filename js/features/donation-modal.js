/**
 * Donation Modal System
 * Handles Stripe checkout for one-time and recurring donations
 */

class DonationModal {
    constructor() {
        this.modal = document.getElementById('donationModal');
        this.contributeBtn = document.getElementById('contributeBtn');
        this.closeBtn = document.querySelector('.donation-modal-close');
        this.proceedBtn = document.getElementById('proceedToDonationBtn');
        this.amountInput = document.getElementById('donationAmountInput');
        this.emailInput = document.getElementById('donationEmail');
        this.frequencyText = document.getElementById('frequencyText');

        this.init();
    }

    init() {
        // Open modal
        this.contributeBtn?.addEventListener('click', () => this.openModal());

        // Close modal
        this.closeBtn?.addEventListener('click', () => this.closeModal());
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('show')) {
                this.closeModal();
            }
        });

        // Handle donation type change
        const typeRadios = document.querySelectorAll('input[name="donationType"]');
        typeRadios.forEach(radio => {
            radio.addEventListener('change', () => this.updateFrequencyText());
        });

        // Handle preset buttons
        const presetBtns = document.querySelectorAll('.preset-btn');
        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const amount = btn.dataset.amount;
                this.amountInput.value = amount;

                // Visual feedback
                presetBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Handle proceed to payment
        this.proceedBtn?.addEventListener('click', () => this.proceedToStripe());
    }

    openModal() {
        this.modal?.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal?.classList.remove('show');
        document.body.style.overflow = '';
    }

    updateFrequencyText() {
        const donationType = document.querySelector('input[name="donationType"]:checked')?.value;
        if (this.frequencyText) {
            this.frequencyText.textContent = donationType === 'monthly' ? '/ month' : '';
        }
    }

    async proceedToStripe() {
        const amount = parseInt(this.amountInput.value);
        const email = this.emailInput.value.trim();
        const donationType = document.querySelector('input[name="donationType"]:checked')?.value;

        if (!amount || amount < 1) {
            alert('Please enter a valid amount (minimum $1)');
            return;
        }

        // Disable button during processing
        this.proceedBtn.disabled = true;
        this.proceedBtn.innerHTML = '<span>Processing...</span>';

        try {
            const response = await fetch('https://api.terrellflautt.com/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: amount * 100, // Convert to cents
                    recurring: donationType === 'monthly',
                    email: email || null,
                    successUrl: window.location.origin + '?donation=success',
                    cancelUrl: window.location.origin + '?donation=cancel'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const data = await response.json();

            if (data.url) {
                // Redirect to Stripe Checkout
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL received');
            }

        } catch (error) {
            console.error('Donation error:', error);
            alert('There was an error processing your request. Please try again.');
            this.proceedBtn.disabled = false;
            this.proceedBtn.innerHTML = '<span>Proceed to Payment</span>';
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.donationModal = new DonationModal();

    // Check for donation success/cancel in URL
    const urlParams = new URLSearchParams(window.location.search);
    const donationStatus = urlParams.get('donation');

    if (donationStatus === 'success') {
        // Show success message
        const message = document.createElement('div');
        message.className = 'donation-success-message';
        message.innerHTML = `
            <div class="success-content">
                <h3>🎉 Thank You for Your Support!</h3>
                <p>Your contribution helps keep these tools free and open-source for everyone.</p>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        message.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            z-index: 10002;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        document.body.appendChild(message);

        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DonationModal;
}
