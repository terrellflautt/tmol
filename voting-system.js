/**
 * Project Voting System
 * Handles voting with automatic project reordering
 */

class VotingSystem {
    constructor() {
        this.votes = JSON.parse(localStorage.getItem('terrellflautt_votes') || '{}');
        this.userVotes = JSON.parse(localStorage.getItem('terrellflautt_user_votes') || '{}');
        this.apiBase = 'https://api.terrellflautt.com';

        this.init();
    }

    init() {
        this.setupVoteButtons();
        this.loadVoteCounts();
        this.displayCurrentVotes();
    }

    setupVoteButtons() {
        const voteButtons = document.querySelectorAll('.vote-btn');

        voteButtons.forEach(button => {
            const projectId = button.dataset.project;

            // Check if user already voted
            if (this.userVotes[projectId]) {
                button.classList.add('voted');
                button.title = 'You voted for this project';
            }

            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleVote(projectId, button);
            });
        });
    }

    async handleVote(projectId, button) {
        // Prevent double voting
        if (this.userVotes[projectId]) {
            this.showMessage('You have already voted for this project', 'info');
            return;
        }

        try {
            // Optimistic UI update
            button.classList.add('voting');
            const countSpan = button.querySelector('.vote-count');
            const currentCount = parseInt(countSpan.textContent) || 0;
            countSpan.textContent = currentCount + 1;

            // Submit vote to API
            const response = await fetch(`${this.apiBase}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectId: projectId,
                    userId: this.getUserId(),
                    timestamp: Date.now()
                })
            });

            if (response.ok) {
                const result = await response.json();

                // Update local storage
                this.votes[projectId] = result.totalVotes || (currentCount + 1);
                this.userVotes[projectId] = true;

                localStorage.setItem('terrellflautt_votes', JSON.stringify(this.votes));
                localStorage.setItem('terrellflautt_user_votes', JSON.stringify(this.userVotes));

                // Update UI
                button.classList.remove('voting');
                button.classList.add('voted');
                button.title = 'You voted for this project';
                countSpan.textContent = this.votes[projectId];

                this.showMessage('Vote recorded successfully!', 'success');

                // Reorder projects after a short delay
                setTimeout(() => {
                    this.reorderProjects();
                }, 1000);

            } else {
                throw new Error('Failed to record vote');
            }

        } catch (error) {
            console.error('Voting error:', error);

            // Revert optimistic update
            button.classList.remove('voting');
            const countSpan = button.querySelector('.vote-count');
            countSpan.textContent = parseInt(countSpan.textContent) - 1;

            // Fallback: store vote locally
            this.votes[projectId] = (this.votes[projectId] || 0) + 1;
            this.userVotes[projectId] = true;

            localStorage.setItem('terrellflautt_votes', JSON.stringify(this.votes));
            localStorage.setItem('terrellflautt_user_votes', JSON.stringify(this.userVotes));

            button.classList.add('voted');
            countSpan.textContent = this.votes[projectId];

            this.showMessage('Vote recorded locally', 'info');
            this.reorderProjects();
        }
    }

    async loadVoteCounts() {
        try {
            const response = await fetch(`${this.apiBase}/votes`);
            if (response.ok) {
                const serverVotes = await response.json();

                // Merge server votes with local votes
                Object.keys(serverVotes).forEach(projectId => {
                    this.votes[projectId] = Math.max(
                        serverVotes[projectId] || 0,
                        this.votes[projectId] || 0
                    );
                });

                localStorage.setItem('terrellflautt_votes', JSON.stringify(this.votes));
                this.displayCurrentVotes();
            }
        } catch (error) {
            console.log('Using local vote counts only');
        }
    }

    displayCurrentVotes() {
        Object.keys(this.votes).forEach(projectId => {
            const button = document.querySelector(`[data-project="${projectId}"]`);
            if (button) {
                const countSpan = button.querySelector('.vote-count');
                if (countSpan) {
                    countSpan.textContent = this.votes[projectId] || 0;
                }
            }
        });
    }

    reorderProjects() {
        const projectsContainer = document.querySelector('.projects-grid');
        if (!projectsContainer) return;

        const projectCards = Array.from(projectsContainer.querySelectorAll('.project-card'));

        // Sort project cards by vote count
        projectCards.sort((a, b) => {
            const aButton = a.querySelector('.vote-btn');
            const bButton = b.querySelector('.vote-btn');

            if (!aButton || !bButton) return 0;

            const aProjectId = aButton.dataset.project;
            const bProjectId = bButton.dataset.project;

            const aVotes = this.votes[aProjectId] || 0;
            const bVotes = this.votes[bProjectId] || 0;

            return bVotes - aVotes; // Descending order
        });

        // Animate reordering
        projectCards.forEach((card, index) => {
            card.style.transition = 'transform 0.5s ease, opacity 0.3s ease';
            card.style.transform = 'translateY(-10px)';
            card.style.opacity = '0.7';

            setTimeout(() => {
                if (card.parentNode) {
                    projectsContainer.removeChild(card);
                }
                projectsContainer.appendChild(card);

                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 100);
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
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 0.85rem;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.5s ease;
            pointer-events: none;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // Get voting statistics
    getTopProjects() {
        const sorted = Object.entries(this.votes)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        return sorted.map(([projectId, votes]) => ({ projectId, votes }));
    }

    getTotalVotes() {
        return Object.values(this.votes).reduce((sum, count) => sum + count, 0);
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