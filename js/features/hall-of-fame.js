/**
 * Hall of Fame - Leaderboard System
 * Displays top players across different categories
 */

class HallOfFame {
    constructor() {
        this.currentCategory = 'overall';
        this.leaderboards = {};
        this.init();
    }

    async init() {
        this.setupTabs();
        await this.loadAllLeaderboards();
    }

    setupTabs() {
        const tabs = document.querySelectorAll('.leaderboard-tab');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');
                this.switchCategory(category);
            });
        });
    }

    switchCategory(category) {
        // Update active tab
        document.querySelectorAll('.leaderboard-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        const activeTab = document.querySelector(`[data-category="${category}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Update active content
        document.querySelectorAll('.leaderboard-content').forEach(content => {
            content.classList.remove('active');
        });

        const activeContent = document.getElementById(`leaderboard-${category}`);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        this.currentCategory = category;

        // Load leaderboard if not already loaded
        if (!this.leaderboards[category]) {
            this.loadLeaderboard(category);
        }
    }

    async loadAllLeaderboards() {
        // Load overall first (default view)
        await this.loadLeaderboard('overall');
    }

    async loadLeaderboard(category) {
        try {
            const response = await fetch(`https://api.terrellflautt.com/hall-of-fame/${category}`);

            if (response.ok) {
                const data = await response.json();
                this.leaderboards[category] = data.leaderboard || [];
            } else {
                // Fallback to simulated data
                this.leaderboards[category] = this.generateSimulatedLeaderboard(category);
            }
        } catch (error) {
            console.warn(`Failed to load ${category} leaderboard, using simulated data:`, error);
            this.leaderboards[category] = this.generateSimulatedLeaderboard(category);
        }

        this.renderLeaderboard(category);
    }

    generateSimulatedLeaderboard(category) {
        const names = [
            'Erasmus the Wise', 'Brutus the Strong', 'Silvia the Swift',
            'Magnus the Brave', 'Elara the Cunning', 'Thaddeus the Bold',
            'Rasha the Mysterious', 'Korak the Fierce', 'Nawar the Scholar',
            'Khaveen the Dark', 'Shameen the Merchant', 'Shema the Fighter',
            'Omar the Poet', 'Aziza the Sphinx', 'Abu the Merchant',
            'Keapon Laffin', 'Ferrari Al', 'Issur the Blacksmith',
            'Zayishah the Astrologer', 'Harik Attar the Apothecary'
        ];

        const classes = ['Fighter', 'Wizard', 'Thief', 'Paladin', 'Hero'];

        const leaderboard = [];

        for (let i = 0; i < 20; i++) {
            const name = names[i % names.length];
            const playerClass = classes[Math.floor(Math.random() * classes.length)];
            const level = 50 - i * 2;

            let score;
            switch (category) {
                case 'overall':
                    score = 10000 - (i * 500);
                    break;
                case 'level':
                    score = level;
                    break;
                case 'puzzles':
                    score = 100 - (i * 4);
                    break;
                case 'discoveries':
                    score = 50 - (i * 2);
                    break;
                case 'pvp':
                    score = 75 - (i * 3);
                    break;
                case 'time':
                    score = 200 - (i * 8); // hours
                    break;
                default:
                    score = 1000 - (i * 50);
            }

            leaderboard.push({
                playerName: name,
                class: playerClass,
                level: level,
                score: score
            });
        }

        return leaderboard;
    }

    renderLeaderboard(category) {
        const container = document.getElementById(`leaderboard-${category}`);
        if (!container) return;

        const data = this.leaderboards[category] || [];

        if (data.length === 0) {
            container.innerHTML = `
                <div class="leaderboard-table">
                    <p style="text-align: center; padding: 40px; color: #c9a961;">
                        No heroes have earned their place in this hall yet.<br>
                        Be the first to make your mark!
                    </p>
                </div>
            `;
            return;
        }

        const headers = this.getHeaders(category);

        const tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Level</th>
                        <th>${headers.scoreLabel}</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map((player, index) => this.renderPlayerRow(player, index + 1, category)).join('')}
                </tbody>
            </table>
        `;

        container.innerHTML = `<div class="leaderboard-table">${tableHTML}</div>`;
    }

    getHeaders(category) {
        const headers = {
            overall: { scoreLabel: 'Total Score' },
            level: { scoreLabel: 'Level' },
            puzzles: { scoreLabel: 'Puzzles Solved' },
            discoveries: { scoreLabel: 'Secrets Found' },
            pvp: { scoreLabel: 'Wins' },
            time: { scoreLabel: 'Hours Played' }
        };

        return headers[category] || headers.overall;
    }

    renderPlayerRow(player, rank, category) {
        const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';
        const rankBadge = `<span class="rank-badge ${rankClass}">${rank}</span>`;

        const score = this.formatScore(player.score, category);

        return `
            <tr>
                <td>${rankBadge}</td>
                <td>
                    <div class="player-name">${this.escapeHtml(player.playerName || 'Unknown Hero')}</div>
                </td>
                <td><span class="player-class">${this.escapeHtml(player.class || 'Wanderer')}</span></td>
                <td><span class="stat-value">${player.level || 1}</span></td>
                <td><span class="stat-value">${score}</span></td>
            </tr>
        `;
    }

    formatScore(score, category) {
        if (!score && score !== 0) return '-';

        switch (category) {
            case 'time':
                // Convert hours to readable format
                const hours = Math.floor(score);
                const minutes = Math.floor((score % 1) * 60);
                if (hours > 0) {
                    return `${hours}h ${minutes}m`;
                }
                return `${minutes}m`;

            case 'overall':
                // Add thousands separator
                return score.toLocaleString();

            default:
                return score;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Public method to refresh all leaderboards
    async refresh() {
        this.leaderboards = {};
        await this.loadAllLeaderboards();
        this.renderLeaderboard(this.currentCategory);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.hallOfFame = new HallOfFame();
    });
} else {
    window.hallOfFame = new HallOfFame();
}
