/**
 * GitHub Project Contributions System
 * Stripe integration for one-time and recurring donations
 */

class ContributionSystem {
    constructor() {
        this.stripePublishableKey = null;
        this.projects = this.defineProjects();

        this.init();
    }

    init() {
        this.loadStripeKey();
        this.setupContributionButtons();
    }

    /**
     * Define all GitHub projects with contribution tiers
     */
    defineProjects() {
        return {
            'pgp-forum': {
                name: 'PGP Forum',
                github: 'https://github.com/terrellflautt/PGP-Forum',
                description: 'Privacy-first community platform with end-to-end encryption',
                tiers: [
                    { name: 'Coffee', amount: 500, emoji: '☕', description: 'Buy me a coffee' },
                    { name: 'Supporter', amount: 1000, emoji: '💙', description: 'Monthly supporter' },
                    { name: 'Sponsor', amount: 5000, emoji: '⭐', description: 'Monthly sponsor' },
                    { name: 'Custom', amount: 'custom', emoji: '🎁', description: 'Custom amount' }
                ]
            },
            'tmol': {
                name: 'TMOL (This Portfolio!)',
                github: 'https://github.com/terrellflautt/tmol',
                description: 'Interactive portfolio with RPG elements and easter eggs',
                tiers: [
                    { name: 'Coffee', amount: 500, emoji: '☕', description: 'Buy me a coffee' },
                    { name: 'Supporter', amount: 1000, emoji: '💙', description: 'Monthly supporter' },
                    { name: 'Patron', amount: 2500, emoji: '✨', description: 'Monthly patron' },
                    { name: 'Custom', amount: 'custom', emoji: '🎁', description: 'Custom amount' }
                ]
            },
            'snapiturl': {
                name: 'SnapIt URL',
                github: 'https://github.com/terrellflautt/snapiturl',
                description: 'Link shortening and management platform',
                tiers: [
                    { name: 'Coffee', amount: 500, emoji: '☕', description: 'Buy me a coffee' },
                    { name: 'Supporter', amount: 1000, emoji: '💙', description: 'Monthly supporter' },
                    { name: 'Custom', amount: 'custom', emoji: '🎁', description: 'Custom amount' }
                ]
            },
            'snapitsoftware': {
                name: 'SnapIt Software',
                github: 'https://github.com/terrellflautt/snapitsoftware',
                description: 'Main SnapIt platform and ecosystem',
                tiers: [
                    { name: 'Coffee', amount: 500, emoji: '☕', description: 'Buy me a coffee' },
                    { name: 'Supporter', amount: 1000, emoji: '💙', description: 'Monthly supporter' },
                    { name: 'Sponsor', amount: 5000, emoji: '⭐', description: 'Monthly sponsor' },
                    { name: 'Custom', amount: 'custom', emoji: '🎁', description: 'Custom amount' }
                ]
            },
            'nickelpie': {
                name: 'NickelPie',
                github: 'https://github.com/terrellflautt/nickelpie',
                description: 'Micro-payments and tipping platform',
                tiers: [
                    { name: 'Coffee', amount: 500, emoji: '☕', description: 'Buy me a coffee' },
                    { name: 'Supporter', amount: 1000, emoji: '💙', description: 'Monthly supporter' },
                    { name: 'Custom', amount: 'custom', emoji: '🎁', description: 'Custom amount' }
                ]
            },
            'snapitforms': {
                name: 'SnapIt Forms',
                github: 'https://github.com/terrellflautt/snapitforms',
                description: 'Serverless form handling platform',
                tiers: [
                    { name: 'Coffee', amount: 500, emoji: '☕', description: 'Buy me a coffee' },
                    { name: 'Supporter', amount: 1000, emoji: '💙', description: 'Monthly supporter' },
                    { name: 'Custom', amount: 'custom', emoji: '🎁', description: 'Custom amount' }
                ]
            },
            'urlstatuschecker': {
                name: 'URL Status Checker',
                github: 'https://github.com/terrellflautt/urlstatuschecker.com',
                description: 'Website uptime monitoring and status checking',
                tiers: [
                    { name: 'Coffee', amount: 500, emoji: '☕', description: 'Buy me a coffee' },
                    { name: 'Supporter', amount: 1000, emoji: '💙', description: 'Monthly supporter' },
                    { name: 'Custom', amount: 'custom', emoji: '🎁', description: 'Custom amount' }
                ]
            },
            'snapitagent': {
                name: 'SnapIt Agent',
                github: 'https://github.com/terrellflautt/snapitagent',
                description: 'AI automation platform',
                tiers: [
                    { name: 'Coffee', amount: 500, emoji: '☕', description: 'Buy me a coffee' },
                    { name: 'Supporter', amount: 1000, emoji: '💙', description: 'Monthly supporter' },
                    { name: 'Sponsor', amount: 5000, emoji: '⭐', description: 'Monthly sponsor' },
                    { name: 'Custom', amount: 'custom', emoji: '🎁', description: 'Custom amount' }
                ]
            },
            'snapitanalytics': {
                name: 'SnapIt Analytics',
                github: 'https://github.com/terrellflautt/snapitanalytics',
                description: 'Real-time analytics and data pipeline',
                tiers: [
                    { name: 'Coffee', amount: 500, emoji: '☕', description: 'Buy me a coffee' },
                    { name: 'Supporter', amount: 1000, emoji: '💙', description: 'Monthly supporter' },
                    { name: 'Custom', amount: 'custom', emoji: '🎁', description: 'Custom amount' }
                ]
            },
            'pdf-snapitsoftware': {
                name: 'PDF SnapIt',
                github: 'https://github.com/terrellflautt/pdf.snapitsoftware.com',
                description: 'PDF generation and manipulation service',
                tiers: [
                    { name: 'Coffee', amount: 500, emoji: '☕', description: 'Buy me a coffee' },
                    { name: 'Supporter', amount: 1000, emoji: '💙', description: 'Monthly supporter' },
                    { name: 'Custom', amount: 'custom', emoji: '🎁', description: 'Custom amount' }
                ]
            }
        };
    }

    async loadStripeKey() {
        // In production, this would be loaded from backend
        // For now, we'll use a placeholder that gets replaced by actual key
        this.stripePublishableKey = 'pk_test_placeholder';
    }

    /**
     * Add contribution buttons to all project cards
     */
    setupContributionButtons() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            const projectId = this.getProjectIdFromCard(card);
            if (projectId && this.projects[projectId]) {
                this.addContributionButton(card, projectId);
            }
        });
    }

    getProjectIdFromCard(card) {
        // Extract project ID from vote button or card data
        const voteBtn = card.querySelector('.vote-btn');
        if (!voteBtn) return null;

        const dataProject = voteBtn.dataset.project;

        // Map project names to GitHub repo IDs
        const mapping = {
            'snapitforum': 'pgp-forum',
            'snapitsoftware': 'snapitsoftware',
            'snapiturl': 'snapiturl',
            'snapitforms': 'snapitforms',
            'snapitqr': 'snapitsoftware', // Part of main repo
            'snapitanalytics': 'snapitanalytics',
            'snapitagent': 'snapitagent',
            'urlstatuschecker': 'urlstatuschecker',
            'nickelpie': 'nickelpie'
        };

        return mapping[dataProject] || null;
    }

    addContributionButton(card, projectId) {
        const actionsDiv = card.querySelector('.project-actions');
        if (!actionsDiv) return;

        // Check if button already exists
        if (actionsDiv.querySelector('.contribute-btn')) return;

        const contributeBtn = document.createElement('a');
        contributeBtn.className = 'project-link contribute-btn';
        contributeBtn.href = '#';
        contributeBtn.innerHTML = `
            <span>💝 Support</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        contributeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openContributionModal(projectId);
        });

        actionsDiv.appendChild(contributeBtn);
    }

    /**
     * Open contribution modal for specific project
     */
    openContributionModal(projectId) {
        const project = this.projects[projectId];
        if (!project) return;

        // Remove existing modal
        const existing = document.getElementById('contribution-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'contribution-modal';
        modal.className = 'contribution-modal';
        modal.innerHTML = `
            <div class="contribution-backdrop"></div>
            <div class="contribution-container">
                <div class="contribution-header">
                    <h3>Support ${project.name}</h3>
                    <button class="contribution-close">&times;</button>
                </div>

                <div class="contribution-content">
                    <div class="project-info">
                        <p class="project-description">${project.description}</p>
                        <a href="${project.github}" class="github-link" target="_blank">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                            View on GitHub
                        </a>
                    </div>

                    <div class="contribution-type-selector">
                        <button class="type-btn active" data-type="one-time">
                            One-Time
                        </button>
                        <button class="type-btn" data-type="monthly">
                            Monthly
                        </button>
                    </div>

                    <div class="contribution-tiers" id="contributionTiers">
                        ${this.renderTiers(project.tiers, 'one-time')}
                    </div>

                    <div class="custom-amount-container hidden" id="customAmountContainer">
                        <input type="number"
                               id="customAmount"
                               placeholder="Enter amount"
                               min="1"
                               step="1">
                        <span class="currency">USD</span>
                    </div>

                    <button class="contribute-submit-btn" id="contributeSubmit">
                        Contribute Now
                    </button>

                    <p class="contribution-note">
                        Powered by Stripe. Your contribution supports open source development.
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 50);

        this.setupModalEvents(modal, projectId);
    }

    renderTiers(tiers, type) {
        return tiers.map(tier => `
            <div class="tier-option ${tier.amount === 'custom' ? 'custom-tier' : ''}"
                 data-amount="${tier.amount}">
                <div class="tier-emoji">${tier.emoji}</div>
                <div class="tier-info">
                    <div class="tier-name">${tier.name}</div>
                    ${tier.amount !== 'custom' ? `
                        <div class="tier-amount">$${(tier.amount / 100).toFixed(2)}${type === 'monthly' ? '/mo' : ''}</div>
                    ` : ''}
                    <div class="tier-description">${tier.description}</div>
                </div>
            </div>
        `).join('');
    }

    setupModalEvents(modal, projectId) {
        const close = modal.querySelector('.contribution-close');
        const backdrop = modal.querySelector('.contribution-backdrop');
        const typeButtons = modal.querySelectorAll('.type-btn');
        const tierOptions = modal.querySelectorAll('.tier-option');
        const customContainer = modal.querySelector('#customAmountContainer');
        const submitBtn = modal.querySelector('#contributeSubmit');

        let selectedType = 'one-time';
        let selectedAmount = null;

        // Close handlers
        close.addEventListener('click', () => this.closeModal(modal));
        backdrop.addEventListener('click', () => this.closeModal(modal));

        // Type selector
        typeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                typeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedType = btn.dataset.type;

                // Re-render tiers with updated type
                const tiersContainer = modal.querySelector('#contributionTiers');
                tiersContainer.innerHTML = this.renderTiers(this.projects[projectId].tiers, selectedType);

                // Re-attach tier listeners
                this.attachTierListeners(modal);
            });
        });

        // Tier selection
        this.attachTierListeners(modal);

        // Submit button
        submitBtn.addEventListener('click', () => {
            const customInput = modal.querySelector('#customAmount');
            const amount = customInput && !customInput.parentElement.classList.contains('hidden')
                ? parseFloat(customInput.value) * 100
                : selectedAmount;

            if (!amount || amount < 100) {
                alert('Please select an amount (minimum $1.00)');
                return;
            }

            this.createCheckoutSession(projectId, amount, selectedType);
        });
    }

    attachTierListeners(modal) {
        const tierOptions = modal.querySelectorAll('.tier-option');
        const customContainer = modal.querySelector('#customAmountContainer');

        tierOptions.forEach(option => {
            option.addEventListener('click', () => {
                tierOptions.forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');

                const amount = option.dataset.amount;
                if (amount === 'custom') {
                    customContainer.classList.remove('hidden');
                    customContainer.querySelector('#customAmount').focus();
                } else {
                    customContainer.classList.add('hidden');
                    this.selectedAmount = parseFloat(amount);
                }
            });
        });
    }

    async createCheckoutSession(projectId, amount, type) {
        try {
            const project = this.projects[projectId];

            // Call backend to create Stripe checkout session
            const response = await fetch('https://api.terrellflautt.com/contributions/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId,
                    projectName: project.name,
                    amount: Math.round(amount),
                    type: type, // 'one-time' or 'monthly'
                    githubUrl: project.github,
                    userId: this.getUserId()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const { sessionUrl } = await response.json();

            // Redirect to Stripe checkout
            window.location.href = sessionUrl;

        } catch (error) {
            console.error('Checkout error:', error);
            alert('Unable to process contribution at this time. Please try again later.');
        }
    }

    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }

    getUserId() {
        return localStorage.getItem('terrellflautt_user_id') || 'anonymous';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.contributionSystem = new ContributionSystem();
});

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContributionSystem;
}
