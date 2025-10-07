/**
 * FORUM DISCOVERY QUEST
 * Hidden reward for engaged users (2+ visits, some points/discoveries)
 *
 * Philosophy: Community access is a privilege for the curious
 */

class ForumDiscoveryQuest {
    constructor() {
        this.forumUrl = 'https://forum.terrellflautt.com';
        this.discovered = localStorage.getItem('forum_discovered') === 'true';
        this.init();
    }

    init() {
        // Only check for eligibility if not already discovered
        if (!this.discovered) {
            this.checkEligibility();
        } else {
            this.showForumAccess();
        }
    }

    /**
     * Check if user qualifies for forum access
     * Requirements:
     * - At least 2 visits
     * - At least 3 discoveries OR 1 achievement
     */
    checkEligibility() {
        const visitCount = parseInt(localStorage.getItem('visit_count') || '0');
        const discoveries = parseInt(localStorage.getItem('discoveries') || '0');
        const achievements = JSON.parse(localStorage.getItem('achievements') || '[]').length;
        const easterEggs = JSON.parse(localStorage.getItem('easter_eggs_found') || '[]').length;

        const meetsVisitRequirement = visitCount >= 2;
        const meetsEngagementRequirement = discoveries >= 3 || achievements >= 1 || easterEggs >= 2;

        if (meetsVisitRequirement && meetsEngagementRequirement) {
            this.unlockForumQuest();
        }
    }

    /**
     * Unlock the forum discovery quest
     */
    unlockForumQuest() {
        // Wait a bit before showing hint (don't be too obvious)
        setTimeout(() => {
            this.showForumHint();
        }, 10000); // 10 seconds after page load
    }

    /**
     * Show subtle hint about the forum
     */
    showForumHint() {
        // Create a mysterious message that appears in footer
        const footer = document.querySelector('.footer-content') || document.querySelector('footer');
        if (!footer) return;

        const hint = document.createElement('div');
        hint.className = 'forum-hint';
        hint.style.cssText = `
            margin-top: 2rem;
            padding: 1rem;
            background: rgba(102, 126, 234, 0.05);
            border: 1px solid rgba(102, 126, 234, 0.2);
            border-radius: 8px;
            text-align: center;
            animation: fadeIn 2s ease-out;
            cursor: help;
        `;

        hint.innerHTML = `
            <div style="font-size: 0.9rem; color: #94a3b8; font-style: italic;">
                <span style="color: #667eea;">🗨️</span>
                "Those who explore deeply discover hidden communities..."
                <span style="color: #667eea;">🗨️</span>
            </div>
            <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem; opacity: 0.7;">
                *whispers* Look for the hidden gathering place
            </div>
        `;

        // Clicking hint reveals more
        hint.addEventListener('click', () => {
            this.revealForumClue();
            hint.remove();
        });

        footer.appendChild(hint);
    }

    /**
     * Reveal actual forum clue
     */
    revealForumClue() {
        const clue = document.createElement('div');
        clue.className = 'forum-clue';
        clue.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #667eea;
            border-radius: 16px;
            padding: 2rem;
            max-width: 500px;
            z-index: 100000;
            box-shadow: 0 0 50px rgba(102, 126, 234, 0.5);
            animation: slideIn 0.5s ease-out;
        `;

        const discoveries = parseInt(localStorage.getItem('discoveries') || '0');
        const visitCount = parseInt(localStorage.getItem('visit_count') || '0');

        clue.innerHTML = `
            <div style="text-align: center; color: #e2e8f0;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🏛️</div>
                <h2 style="color: #667eea; margin-bottom: 1rem;">Community Unlocked</h2>
                <p style="line-height: 1.6; margin-bottom: 1.5rem;">
                    You've proven yourself worthy with <strong>${visitCount}</strong> visits
                    and <strong>${discoveries}</strong> discoveries.
                </p>
                <p style="line-height: 1.6; margin-bottom: 1.5rem; font-style: italic; color: #94a3b8;">
                    There exists a gathering place for those who seek deeper understanding.
                    A forum where discoverers share their journey.
                </p>
                <div style="background: rgba(102, 126, 234, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <div style="font-family: 'Courier New', monospace; color: #667eea; font-size: 1.1rem;">
                        forum.terrellflautt.com
                    </div>
                    <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 0.5rem;">
                        The hidden gathering place
                    </div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 0.75rem 2rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    margin-right: 1rem;
                ">
                    I'll Visit Later
                </button>
                <button onclick="window.open('${this.forumUrl}', '_blank'); this.parentElement.parentElement.remove();" style="
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 0.75rem 2rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    font-weight: bold;
                ">
                    Visit Forum Now 🚀
                </button>
            </div>
        `;

        document.body.appendChild(clue);

        // Mark as discovered
        localStorage.setItem('forum_discovered', 'true');
        this.discovered = true;

        // Track discovery
        const totalDiscoveries = parseInt(localStorage.getItem('discoveries') || '0') + 1;
        localStorage.setItem('discoveries', totalDiscoveries.toString());

        // Add to achievements
        const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
        if (!achievements.includes('forum_discoverer')) {
            achievements.push('forum_discoverer');
            localStorage.setItem('achievements', JSON.stringify(achievements));
        }
    }

    /**
     * Show forum access for users who already discovered it
     */
    showForumAccess() {
        // Add subtle forum link to footer
        const footer = document.querySelector('.footer-content') || document.querySelector('footer');
        if (!footer) return;

        const link = document.createElement('a');
        link.href = this.forumUrl;
        link.target = '_blank';
        link.className = 'forum-access-link';
        link.style.cssText = `
            display: inline-block;
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: rgba(102, 126, 234, 0.1);
            border: 1px solid rgba(102, 126, 234, 0.3);
            border-radius: 6px;
            color: #667eea;
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        `;

        link.innerHTML = `🏛️ Visit Forum`;

        link.addEventListener('mouseenter', () => {
            link.style.background = 'rgba(102, 126, 234, 0.2)';
            link.style.borderColor = 'rgba(102, 126, 234, 0.5)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.background = 'rgba(102, 126, 234, 0.1)';
            link.style.borderColor = 'rgba(102, 126, 234, 0.3)';
        });

        footer.appendChild(link);
    }
}

// Add animations
const forumStyles = document.createElement('style');
forumStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideIn {
        from { opacity: 0; transform: translate(-50%, -60%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
    }

    .forum-hint:hover {
        background: rgba(102, 126, 234, 0.1);
        border-color: rgba(102, 126, 234, 0.4);
        transform: scale(1.02);
    }
`;
document.head.appendChild(forumStyles);

// Initialize forum discovery quest
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit before initializing to not interfere with other systems
    setTimeout(() => {
        window.forumQuest = new ForumDiscoveryQuest();
    }, 2000);
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ForumDiscoveryQuest;
}
