/**
 * FORUM MESSAGE BOARD
 * For discoverers of forum.snapitsoftware.com
 */

const API_URL = 'https://api.terrellflautt.com';

class ForumBoard {
    constructor() {
        this.userId = this.getUserId();
        this.username = localStorage.getItem('forum_username') || '';
        this.messages = [];
        this.rateLimit = null;

        this.init();
    }

    getUserId() {
        let userId = localStorage.getItem('forum_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('forum_user_id', userId);
        }
        return userId;
    }

    init() {
        this.setupEventListeners();
        this.loadMessages();
        this.checkRateLimit();

        // Auto-refresh every 30 seconds
        setInterval(() => this.loadMessages(), 30000);

        // Restore username if previously entered
        const usernameInput = document.getElementById('username');
        if (this.username) {
            usernameInput.value = this.username;
        }
    }

    setupEventListeners() {
        // Post form
        const postForm = document.getElementById('postForm');
        postForm.addEventListener('submit', (e) => this.handleSubmit(e));

        // Character counter
        const messageInput = document.getElementById('message');
        const charCount = document.getElementById('charCount');
        messageInput.addEventListener('input', () => {
            const count = messageInput.value.length;
            charCount.textContent = `${count}/1000`;

            if (count > 900) {
                charCount.style.color = 'var(--warning)';
            } else {
                charCount.style.color = 'var(--text-secondary)';
            }
        });

        // Refresh button
        const refreshBtn = document.getElementById('refreshBtn');
        refreshBtn.addEventListener('click', () => this.loadMessages());

        // Save username
        const usernameInput = document.getElementById('username');
        usernameInput.addEventListener('change', (e) => {
            this.username = e.target.value;
            localStorage.setItem('forum_username', this.username);
        });
    }

    async checkRateLimit() {
        try {
            const response = await fetch(`${API_URL}/forum/rate-limit?userId=${this.userId}`);
            const data = await response.json();

            this.rateLimit = data;
            this.updateRateLimitDisplay();
        } catch (error) {
            console.error('Failed to check rate limit:', error);
        }
    }

    updateRateLimitDisplay() {
        const rateLimitText = document.getElementById('rateLimitText');

        if (!this.rateLimit) {
            rateLimitText.textContent = 'Checking rate limit...';
            return;
        }

        const { remaining, limit, used } = this.rateLimit;

        if (remaining === 0) {
            rateLimitText.innerHTML = `
                <span style="color: var(--error)">
                    You've used all ${limit} comments today. Resets at midnight.
                </span>
            `;
        } else if (remaining === 1) {
            rateLimitText.innerHTML = `
                <span style="color: var(--warning)">
                    ${remaining} comment remaining today
                </span>
            `;
        } else {
            rateLimitText.innerHTML = `
                <span style="color: var(--success)">
                    ${remaining} of ${limit} comments remaining today
                </span>
            `;
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');
        const messageInput = document.getElementById('message');
        const usernameInput = document.getElementById('username');

        // Disable form
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Posting...';

        try {
            const response = await fetch(`${API_URL}/forum/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: this.userId,
                    username: usernameInput.value.trim() || 'Anonymous Explorer',
                    message: messageInput.value.trim()
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Success
                formMessage.className = 'form-message success';
                formMessage.textContent = '✨ Message posted successfully!';

                // Clear message input
                messageInput.value = '';
                document.getElementById('charCount').textContent = '0/1000';

                // Update rate limit
                this.rateLimit = {
                    ...this.rateLimit,
                    remaining: data.rateLimit.remaining,
                    used: (this.rateLimit.used || 0) + 1
                };
                this.updateRateLimitDisplay();

                // Reload messages
                setTimeout(() => this.loadMessages(), 1000);

                // Clear success message after 5s
                setTimeout(() => {
                    formMessage.className = 'form-message';
                }, 5000);

            } else {
                // Error
                formMessage.className = 'form-message error';

                if (response.status === 429) {
                    formMessage.textContent = '⏱️ ' + data.error;
                    this.checkRateLimit(); // Refresh rate limit display
                } else {
                    formMessage.textContent = '❌ ' + (data.error || 'Failed to post message');
                }
            }

        } catch (error) {
            console.error('Post error:', error);
            formMessage.className = 'form-message error';
            formMessage.textContent = '❌ Network error. Please try again.';
        } finally {
            // Re-enable form
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').textContent = 'Post Message';
        }
    }

    async loadMessages() {
        const messagesList = document.getElementById('messagesList');
        const messageCount = document.getElementById('messageCount');

        try {
            const response = await fetch(`${API_URL}/forum/messages?limit=50`);
            const data = await response.json();

            this.messages = data.messages || [];
            messageCount.textContent = this.messages.length;

            this.renderMessages();

        } catch (error) {
            console.error('Failed to load messages:', error);
            messagesList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">⚠️</div>
                    <p>Failed to load messages. Please refresh the page.</p>
                </div>
            `;
        }
    }

    renderMessages() {
        const messagesList = document.getElementById('messagesList');

        if (this.messages.length === 0) {
            messagesList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">💬</div>
                    <p>No messages yet. Be the first to share your discovery!</p>
                </div>
            `;
            return;
        }

        messagesList.innerHTML = this.messages.map(msg => this.createMessageCard(msg)).join('');
    }

    createMessageCard(message) {
        const { username, message: text, timestamp, createdAt } = message;
        const timeAgo = this.getTimeAgo(timestamp || new Date(createdAt).getTime());

        return `
            <div class="message-card">
                <div class="message-header">
                    <span class="message-author">${this.escapeHtml(username || 'Anonymous Explorer')}</span>
                    <span class="message-time">${timeAgo}</span>
                </div>
                <div class="message-text">${this.escapeHtml(text)}</div>
            </div>
        `;
    }

    getTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

        const date = new Date(timestamp);
        return date.toLocaleDateString();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize forum when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.forumBoard = new ForumBoard();

    // Track forum discovery
    if (!localStorage.getItem('forum_discovered')) {
        localStorage.setItem('forum_discovered', Date.now());
        localStorage.setItem('discoveries', (parseInt(localStorage.getItem('discoveries') || '0') + 1).toString());

        // Show special welcome for first-time discoverers
        setTimeout(() => {
            const rateLimitDisplay = document.getElementById('rateLimitDisplay');
            const originalContent = rateLimitDisplay.innerHTML;

            rateLimitDisplay.innerHTML = `
                <span style="font-size: 1.2rem;">🎉</span>
                <span style="color: var(--success); font-weight: 600;">
                    Welcome, discoverer! You found the hidden forum.
                </span>
            `;

            setTimeout(() => {
                rateLimitDisplay.innerHTML = originalContent;
                window.forumBoard.updateRateLimitDisplay();
            }, 5000);
        }, 1000);
    }
});
