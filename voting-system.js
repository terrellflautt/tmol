/**
 * Project Voting System
 * Handles voting with DynamoDB backend - one vote per user per project
 */

class VotingSystem {
    constructor() {
        this.apiBase = 'https://api.terrellflautt.com';
        this.userId = this.getUserId();
        this.userVotes = {}; // Track which projects user has voted for
        this.voteCounts = {}; // Track total vote counts per project

        this.init();
    }

    async init() {
        this.setupVoteButtons();
        await this.loadAllVoteCounts();
        this.updateUI();
    }

    setupVoteButtons() {
        const voteButtons = document.querySelectorAll('.vote-btn');

        voteButtons.forEach(button => {
            const projectId = button.dataset.project;

            button.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.handleVote(projectId, button);
            });
        });
    }

    async handleVote(projectId, button) {
        // Prevent multiple clicks while processing
        if (button.classList.contains('voting')) return;

        try {
            button.classList.add('voting');
            const countSpan = button.querySelector('.vote-count');
            const wasVoted = button.classList.contains('voted');

            // Submit vote to API (backend handles toggle logic)
            const response = await fetch(`${this.apiBase}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectId: projectId,
                    userId: this.userId,
                    timestamp: Date.now()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const result = await response.json();

            // Update UI based on backend response
            this.voteCounts[projectId] = result.count;
            countSpan.textContent = result.count;

            if (result.voted) {
                // User just voted
                button.classList.add('voted');
                button.title = 'Click to remove your vote';
                this.userVotes[projectId] = true;
                this.showMessage(`Vote recorded! (+1 Hall of Fame point)`, 'success');
            } else {
                // User just removed their vote
                button.classList.remove('voted');
                button.title = 'Click to vote for this project';
                this.userVotes[projectId] = false;
                this.showMessage('Vote removed', 'info');
            }

            // Save user votes to localStorage
            localStorage.setItem('terrellflautt_user_votes', JSON.stringify(this.userVotes));

            button.classList.remove('voting');

        } catch (error) {
            console.error('Voting error:', error);
            button.classList.remove('voting');
            this.showMessage('Failed to record vote. Please try again.', 'error');
        }
    }

    async loadAllVoteCounts() {
        const voteButtons = document.querySelectorAll('.vote-btn');
        const projectIds = Array.from(voteButtons).map(btn => btn.dataset.project);

        // Load saved user votes from localStorage
        const savedUserVotes = localStorage.getItem('terrellflautt_user_votes');
        if (savedUserVotes) {
            try {
                this.userVotes = JSON.parse(savedUserVotes);
            } catch (e) {
                this.userVotes = {};
            }
        }

        // Fetch current vote count for each project
        for (const projectId of projectIds) {
            try {
                const response = await fetch(`${this.apiBase}/vote/${projectId}`);
                if (response.ok) {
                    const data = await response.json();
                    this.voteCounts[projectId] = data.count || 0;
                }
            } catch (error) {
                console.warn(`Failed to load votes for ${projectId}:`, error);
                this.voteCounts[projectId] = 0;
            }
        }
    }

    updateUI() {
        const voteButtons = document.querySelectorAll('.vote-btn');

        voteButtons.forEach(button => {
            const projectId = button.dataset.project;
            const countSpan = button.querySelector('.vote-count');

            // Update count
            if (countSpan) {
                countSpan.textContent = this.voteCounts[projectId] || 0;
            }

            // Update voted state
            if (this.userVotes[projectId]) {
                button.classList.add('voted');
                button.title = 'Click to remove your vote';
            } else {
                button.classList.remove('voted');
                button.title = 'Click to vote for this project';
            }
        });
    }

    getUserId() {
        let userId = localStorage.getItem('terrellflautt_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('terrellflautt_user_id', userId);
        }
        return userId;
    }

    showMessage(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `vote-toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;

        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2d5a27' : type === 'error' ? '#5a2727' : '#2d4a5a'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 10000;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Get voting statistics
    getTopProjects() {
        const sorted = Object.entries(this.voteCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        return sorted.map(([projectId, count]) => ({ projectId, count }));
    }

    getTotalVotes() {
        return Object.values(this.voteCounts).reduce((sum, count) => sum + count, 0);
    }
}

// Initialize voting system
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.votingSystem = new VotingSystem();
    });
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VotingSystem;
}
