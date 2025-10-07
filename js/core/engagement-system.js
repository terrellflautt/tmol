class VotingSystem {
    constructor() {
        this.API_URL = 'https://api.terrellflautt.com';
        this.votes = {};
        this.userId = this.getUserId();
    }

    async init() {
        this.loadVoteCounts();
        this.attachVoteListeners();
        this.setupFeedbackLink();
    }

    async loadVoteCounts() {
        // First, load from localStorage immediately
        this.votes = JSON.parse(localStorage.getItem('terrellflautt_votes') || '{}');
        this.updateVoteDisplay();

        // Then try to sync with API for latest counts
        try {
            const response = await fetch(`${this.API_URL}/votes`);
            if (response.ok) {
                const apiVotes = await response.json();
                this.votes = { ...this.votes, ...apiVotes }; // Merge with local votes
                this.updateVoteDisplay();
            }
        } catch (error) {
            console.debug('🔮 Vote API offline, using local vote counts');
        }
    }

    updateVoteDisplay() {
        document.querySelectorAll('.vote-btn').forEach(btn => {
            const project = btn.dataset.project;
            const count = this.votes[project] || 0;
            btn.querySelector('.vote-count').textContent = count;
        });
    }

    attachVoteListeners() {
        document.querySelectorAll('.vote-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleVote(e));
        });
    }

    async handleVote(e) {
        const btn = e.currentTarget;
        const project = btn.dataset.project;

        try {
            const response = await fetch(`${this.API_URL}/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId: project,
                    userId: this.userId,
                    userAgent: navigator.userAgent,
                    ipAddress: 'client'
                })
            });

            if (response.ok) {
                const result = await response.json();
                this.votes[project] = result.count;
                this.updateVoteDisplay();
                this.showVoteMessage('✅ Vote recorded!');
            }
        } catch (error) {
            this.showVoteMessage('❌ Vote failed', 'error');
        }
    }

    showVoteMessage(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `vote-toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    setupFeedbackLink() {
        const projectInquiriesItem = document.querySelector('a[href="mailto:birthmybuild@gmail.com"]')?.closest('.contact-item');

        if (projectInquiriesItem) {
            const feedbackItem = document.createElement('div');
            feedbackItem.className = 'contact-item';
            feedbackItem.innerHTML = `
                <div class="contact-label">Website Feedback</div>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSc8hQG7xQbHZV9XhFzP2wN5YjK4mL6sB3pR8tC9vX2qA1oE7w/viewform" target="_blank" class="feedback-link">💭 Share Your Thoughts</a>
            `;

            const contributeItem = document.createElement('div');
            contributeItem.className = 'contact-item';
            contributeItem.innerHTML = `
                <div class="contact-label">Support Development</div>
                <a href="contribute.html" class="contribute-link">🚀 Contribute</a>
            `;

            projectInquiriesItem.parentElement.insertBefore(feedbackItem, projectInquiriesItem.nextSibling);
            projectInquiriesItem.parentElement.insertBefore(contributeItem, feedbackItem.nextSibling);
        }
    }

    getUserId() {
        // Get or create a unique user ID
        let userId = localStorage.getItem('terrellflautt_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('terrellflautt_user_id', userId);
        }
        return userId;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const votingSystem = new VotingSystem();
    votingSystem.init();
});