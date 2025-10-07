// Leaderboard Management System
class LeaderboardManager {
    constructor() {
        this.storageKey = 'terrellflautt_leaderboard';
        this.currentUserKey = 'terrellflautt_current_user';
        this.leaderboardData = this.loadLeaderboard();
        this.currentFilter = 'all';
        this.userProgress = null;
        this.initializeLeaderboard();
    }

    initializeLeaderboard() {
        this.loadUserProgress();
        this.setupEventListeners();
        this.updateStats();
        this.renderLeaderboard();
        this.checkUserEligibility();
        this.setupCharacterCounter();
    }

    loadUserProgress() {
        if (window.userJourney) {
            this.userProgress = window.userJourney.getProgressSummary();
            console.log('📊 User progress loaded for leaderboard', this.userProgress);
        }
    }

    loadLeaderboard() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Could not load leaderboard data:', error);
        }

        // Return default leaderboard with some example entries
        return [
            {
                id: 'demo_1',
                name: 'The Seeker',
                message: 'This journey opened my mind to possibilities I never imagined. The transcendental experience was life-changing! 🌟',
                location: 'San Francisco, CA',
                score: 2850,
                achievements: ['transcendental', 'ai-wisdom', 'easter-eggs', 'speed-run'],
                submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
                deviceType: 'desktop',
                completionTime: 180 // seconds
            },
            {
                id: 'demo_2',
                name: 'Digital Nomad',
                message: 'Found this while traveling and it completely shifted my perspective on personal growth. Amazing work!',
                location: 'Bali, Indonesia',
                score: 2650,
                achievements: ['transcendental', 'ai-wisdom', 'explorer'],
                submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
                deviceType: 'mobile',
                completionTime: 420
            },
            {
                id: 'demo_3',
                name: 'Code Wizard',
                message: 'As a developer, I appreciate both the technical excellence and philosophical depth. Bravo! 🚀',
                location: 'Austin, TX',
                score: 2400,
                achievements: ['transcendental', 'easter-eggs', 'explorer'],
                submittedAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 1 week ago
                deviceType: 'desktop',
                completionTime: 300
            }
        ];
    }

    saveLeaderboard() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.leaderboardData));
        } catch (error) {
            console.warn('Could not save leaderboard data:', error);
        }
    }

    calculateUserScore(progress) {
        let score = 0;

        // Transcendental Journey completion
        if (progress.transcendentalCompleted) {
            score += 500;
        }

        // Easter eggs
        const easterEggPoints = {
            'aiWisdomLevel1': 100,
            'aiWisdomLevel2': 100,
            'konamiCode': 100,
            'techKingReveal': 100,
            'matrixMode': 100
        };

        // Calculate easter egg score
        if (window.userJourney && window.userJourney.userData.easterEggs) {
            const eggs = window.userJourney.userData.easterEggs;
            Object.keys(easterEggPoints).forEach(egg => {
                if (eggs[egg]) {
                    score += easterEggPoints[egg];
                }
            });

            // Hidden symbols
            score += eggs.hiddenSymbolsFound.length * 50;
        }

        // Visit bonus
        score += Math.min(progress.visitCount * 50, 500); // Max 500 points

        // Speed bonus (if completed in under 5 minutes)
        if (progress.sessionTime > 0 && progress.sessionTime < 300) {
            score += 1000;
        }

        // Explorer bonus for high completion percentage
        if (progress.completionPercentage >= 90) {
            score += 300;
        }

        return score;
    }

    getUserAchievements(progress) {
        const achievements = [];

        if (progress.transcendentalCompleted) {
            achievements.push('transcendental');
        }

        if (window.userJourney && window.userJourney.userData.easterEggs) {
            const eggs = window.userJourney.userData.easterEggs;

            if (eggs.aiWisdomLevel1 && eggs.aiWisdomLevel2) {
                achievements.push('ai-wisdom');
            }

            if (eggs.konamiCode && eggs.techKingReveal && eggs.matrixMode) {
                achievements.push('easter-eggs');
            }

            if (eggs.hiddenSymbolsFound.length >= 3) {
                achievements.push('explorer');
            }
        }

        if (progress.sessionTime > 0 && progress.sessionTime < 300) {
            achievements.push('speed-run');
        }

        if (progress.visitCount >= 5) {
            achievements.push('returning');
        }

        return achievements;
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderLeaderboard();
            });
        });

        // Submit entry
        const submitBtn = document.getElementById('submit-entry');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitEntry());
        }

        // Enter key in name field
        const nameInput = document.getElementById('explorer-name');
        if (nameInput) {
            nameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.submitEntry();
                }
            });
        }

        // Modal close
        const modal = document.getElementById('achievement-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-close')) {
                    modal.style.display = 'none';
                }
            });
        }

        // Category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                this.showAchievementDetails(card.dataset.category);
            });
        });
    }

    setupCharacterCounter() {
        const messageInput = document.getElementById('explorer-message');
        const charCount = document.getElementById('char-count');

        if (messageInput && charCount) {
            messageInput.addEventListener('input', () => {
                charCount.textContent = messageInput.value.length;

                // Change color based on length
                if (messageInput.value.length > 250) {
                    charCount.style.color = '#ff6b6b';
                } else if (messageInput.value.length > 200) {
                    charCount.style.color = '#feca57';
                } else {
                    charCount.style.color = '#b8c6db';
                }
            });
        }
    }

    checkUserEligibility() {
        const entrySection = document.getElementById('user-entry-section');
        const achievementsDiv = document.getElementById('your-achievements');

        if (!this.userProgress || !entrySection) return;

        // Check if user already submitted
        const existingEntry = this.leaderboardData.find(entry =>
            entry.userId === this.userProgress.userId
        );

        if (existingEntry) {
            entrySection.style.display = 'none';
            return;
        }

        // Check if user has any achievements
        const achievements = this.getUserAchievements(this.userProgress);
        const score = this.calculateUserScore(this.userProgress);

        if (achievements.length === 0 || score < 100) {
            entrySection.style.display = 'none';
            return;
        }

        // Show user's achievements
        achievementsDiv.innerHTML = `
            <h4>🎉 Your Achievements</h4>
            <div class="achievement-summary">
                <div class="score-display">
                    <span class="score-number">${score}</span>
                    <span class="score-label">Total Points</span>
                </div>
                <div class="achievements-earned">
                    ${achievements.map(achievement => `
                        <span class="achievement-badge">${this.getAchievementIcon(achievement)} ${this.getAchievementName(achievement)}</span>
                    `).join('')}
                </div>
            </div>
            <p>You've earned the right to join the Hall of Fame! 🌟</p>
        `;
    }

    submitEntry() {
        const nameInput = document.getElementById('explorer-name');
        const messageInput = document.getElementById('explorer-message');
        const locationInput = document.getElementById('explorer-location');
        const submitBtn = document.getElementById('submit-entry');

        if (!nameInput || !messageInput || !this.userProgress) return;

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        const location = locationInput ? locationInput.value.trim() : '';

        // Validation
        if (name.length < 3 || name.length > 20) {
            this.showError('Name must be between 3 and 20 characters');
            return;
        }

        if (message.length < 10 || message.length > 280) {
            this.showError('Message must be between 10 and 280 characters');
            return;
        }

        // Check for inappropriate content (basic filter)
        if (this.containsInappropriateContent(name + ' ' + message)) {
            this.showError('Please keep your message appropriate for all audiences');
            return;
        }

        // Show loading
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        // Create entry
        const entry = {
            id: 'user_' + Date.now(),
            userId: this.userProgress.userId,
            name: name,
            message: message,
            location: location || '🌍 Earth',
            score: this.calculateUserScore(this.userProgress),
            achievements: this.getUserAchievements(this.userProgress),
            submittedAt: new Date().toISOString(),
            deviceType: this.userProgress.deviceType,
            completionTime: this.userProgress.sessionTime
        };

        // Add to leaderboard
        this.leaderboardData.push(entry);
        this.saveLeaderboard();

        // Store current user
        localStorage.setItem(this.currentUserKey, JSON.stringify(entry));

        // Update display
        setTimeout(() => {
            this.updateStats();
            this.renderLeaderboard();
            document.getElementById('user-entry-section').style.display = 'none';

            this.showSuccess('🎉 Welcome to the Hall of Fame! Your entry has been added to the leaderboard.');

            // Scroll to leaderboard
            document.querySelector('.main-leaderboard').scrollIntoView({
                behavior: 'smooth'
            });
        }, 1000);
    }

    containsInappropriateContent(text) {
        const inappropriate = [
            'spam', 'scam', 'click here', 'buy now', 'make money',
            // Add more filters as needed
        ];

        const lowerText = text.toLowerCase();
        return inappropriate.some(word => lowerText.includes(word));
    }

    updateStats() {
        const totalExplorers = document.getElementById('total-explorers');
        const totalDiscoveries = document.getElementById('total-discoveries');
        const transcendentalMasters = document.getElementById('transcendental-masters');

        if (totalExplorers) {
            totalExplorers.textContent = this.leaderboardData.length;
        }

        if (totalDiscoveries) {
            const discoveries = this.leaderboardData.reduce((sum, entry) =>
                sum + entry.achievements.length, 0
            );
            totalDiscoveries.textContent = discoveries;
        }

        if (transcendentalMasters) {
            const masters = this.leaderboardData.filter(entry =>
                entry.achievements.includes('transcendental')
            ).length;
            transcendentalMasters.textContent = masters;
        }
    }

    renderLeaderboard() {
        let filteredData = [...this.leaderboardData];

        // Apply filters
        if (this.currentFilter === 'week') {
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            filteredData = filteredData.filter(entry =>
                new Date(entry.submittedAt) > weekAgo
            );
        } else if (this.currentFilter === 'month') {
            const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            filteredData = filteredData.filter(entry =>
                new Date(entry.submittedAt) > monthAgo
            );
        }

        // Sort by score
        filteredData.sort((a, b) => b.score - a.score);

        // Update podium
        this.updatePodium(filteredData);

        // Update table
        this.updateTable(filteredData);
    }

    updatePodium(data) {
        const positions = ['first', 'second', 'third'];

        positions.forEach((position, index) => {
            const nameEl = document.getElementById(`${position}-place-name`);
            const scoreEl = document.getElementById(`${position}-place-score`);
            const achievementsEl = document.getElementById(`${position}-place-achievements`);

            if (data[index]) {
                const entry = data[index];
                if (nameEl) nameEl.textContent = entry.name;
                if (scoreEl) scoreEl.textContent = entry.score.toLocaleString();
                if (achievementsEl) {
                    achievementsEl.innerHTML = entry.achievements
                        .map(achievement => this.getAchievementIcon(achievement))
                        .join(' ');
                }
            } else {
                if (nameEl) nameEl.textContent = '---';
                if (scoreEl) scoreEl.textContent = '0';
                if (achievementsEl) achievementsEl.innerHTML = '';
            }
        });
    }

    updateTable(data) {
        const tableBody = document.getElementById('leaderboard-entries');
        if (!tableBody) return;

        tableBody.innerHTML = data.map((entry, index) => `
            <div class="leaderboard-entry" style="animation-delay: ${index * 0.1}s">
                <div class="entry-rank">
                    ${index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
                </div>
                <div class="entry-explorer">
                    <div class="explorer-name">${entry.name}</div>
                    <div class="explorer-location">${entry.location}</div>
                </div>
                <div class="entry-score">${entry.score.toLocaleString()}</div>
                <div class="entry-achievements">
                    ${entry.achievements.map(achievement => `
                        <span class="achievement-badge" title="${this.getAchievementName(achievement)}">
                            ${this.getAchievementIcon(achievement)}
                        </span>
                    `).join('')}
                </div>
                <div class="entry-message">
                    <div class="message-text">${entry.message}</div>
                    ${entry.message.length > 100 ? '<span class="message-expand">Read more...</span>' : ''}
                </div>
            </div>
        `).join('');

        // Add click listeners for message expansion
        tableBody.querySelectorAll('.message-expand').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const messageText = e.target.previousElementSibling;
                messageText.style.webkitLineClamp = 'none';
                e.target.style.display = 'none';
            });
        });
    }

    getAchievementIcon(achievement) {
        const icons = {
            'transcendental': '✨',
            'easter-eggs': '🥚',
            'ai-wisdom': '🤖',
            'speed-run': '⚡',
            'explorer': '🔍',
            'returning': '🔄'
        };
        return icons[achievement] || '🏆';
    }

    getAchievementName(achievement) {
        const names = {
            'transcendental': 'Transcendental Master',
            'easter-eggs': 'Easter Egg Hunter',
            'ai-wisdom': 'AI Wisdom Seeker',
            'speed-run': 'Speed Runner',
            'explorer': 'Master Explorer',
            'returning': 'Loyal Visitor'
        };
        return names[achievement] || 'Achievement';
    }

    showAchievementDetails(category) {
        const modal = document.getElementById('achievement-modal');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');

        if (!modal || !title || !body) return;

        const details = this.getAchievementDetails(category);

        title.textContent = details.title;
        body.innerHTML = details.content;
        modal.style.display = 'flex';
    }

    getAchievementDetails(category) {
        const details = {
            'transcendental': {
                title: '✨ Transcendental Masters',
                content: `
                    <p>Complete the full transcendental journey by answering all 5 philosophical questions and receiving your personalized archetype.</p>
                    <h4>Requirements:</h4>
                    <ul>
                        <li>Answer all journey questions honestly</li>
                        <li>Receive your personality archetype</li>
                        <li>Read your personalized guidance</li>
                    </ul>
                    <h4>Reward:</h4>
                    <p><strong>500 points</strong> + Permanent archetype recognition</p>
                `
            },
            'easter-eggs': {
                title: '🥚 Easter Egg Hunters',
                content: `
                    <p>Discover all the hidden secrets and easter eggs throughout the website.</p>
                    <h4>Easter Eggs to Find:</h4>
                    <ul>
                        <li>🤖 AI Wisdom (Type "AI" 3 times)</li>
                        <li>⬆️⬆️⬇️⬇️←→←→BA Konami Code</li>
                        <li>🖱️ Tech King (Click T.K. logo 3 times)</li>
                        <li>🌿 Matrix Mode (Ctrl+Shift+M)</li>
                        <li>🔮 Hidden Discovery Symbols</li>
                    </ul>
                    <h4>Reward:</h4>
                    <p><strong>100 points each</strong> + Special hunter badge</p>
                `
            },
            'ai-wisdom': {
                title: '🤖 AI Wisdom Seekers',
                content: `
                    <p>Unlock both levels of AI wisdom by typing "AI" three times multiple times.</p>
                    <h4>Wisdom Levels:</h4>
                    <ul>
                        <li>Level 1: "Wait for AI to get smarter"</li>
                        <li>Level 2: "If it's not child's play, do something else"</li>
                    </ul>
                    <h4>Reward:</h4>
                    <p><strong>200 points total</strong> + Wisdom seeker recognition</p>
                `
            },
            'speed-run': {
                title: '⚡ Speed Runners',
                content: `
                    <p>Unlock all major features in under 5 minutes - true digital exploration mastery!</p>
                    <h4>Requirements:</h4>
                    <ul>
                        <li>Complete transcendental journey</li>
                        <li>Find multiple easter eggs</li>
                        <li>All within 5 minutes</li>
                    </ul>
                    <h4>Reward:</h4>
                    <p><strong>1000 bonus points</strong> + Speed master badge</p>
                `
            },
            'explorer': {
                title: '🔍 Master Explorers',
                content: `
                    <p>Find all hidden discovery symbols by hovering over special elements throughout the site.</p>
                    <h4>Discovery Locations:</h4>
                    <ul>
                        <li>🔮 Hero subtitle</li>
                        <li>👁️ Section titles</li>
                        <li>🗝️ Terminal title</li>
                        <li>🌟 Footer text</li>
                    </ul>
                    <h4>Reward:</h4>
                    <p><strong>300 points</strong> + Master explorer badge</p>
                `
            },
            'returning': {
                title: '🔄 Loyal Visitors',
                content: `
                    <p>Return to the site multiple times to continue your journey and discover new aspects.</p>
                    <h4>Benefits:</h4>
                    <ul>
                        <li>Journey progress is saved</li>
                        <li>Personalized welcome messages</li>
                        <li>Progress tracking dashboard</li>
                    </ul>
                    <h4>Reward:</h4>
                    <p><strong>50 points per visit</strong> (up to 500 total)</p>
                `
            }
        };

        return details[category] || { title: 'Achievement', content: 'Details not found.' };
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10001;
            max-width: 300px;
            animation: slideInRight 0.5s ease-out;
            background: ${type === 'error' ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' :
                        type === 'success' ? 'linear-gradient(135deg, #00d2d3, #54a0ff)' :
                        'linear-gradient(135deg, #667eea, #764ba2)'};
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }
}

// Leaderboard Particles (similar to main site but themed)
class LeaderboardParticles {
    constructor() {
        this.canvas = document.getElementById('leaderboard-particles');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.mouse = { x: 0, y: 0 };

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                color: `hsl(${200 + Math.random() * 60}, 70%, 60%)`,
                opacity: Math.random() * 0.8 + 0.2
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                particle.vx += dx * 0.00005;
                particle.vy += dy * 0.00005;
            }

            // Draw particle
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw connections
            this.particles.forEach(other => {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) {
                    this.ctx.globalAlpha = (80 - distance) / 80 * 0.2;
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LeaderboardManager();
    new LeaderboardParticles();
});