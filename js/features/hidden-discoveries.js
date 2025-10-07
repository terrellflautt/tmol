/**
 * HIDDEN DISCOVERIES SYSTEM
 * Keep users looking for things - secrets hidden throughout the portfolio
 * Each discovery unlocks more, creating a breadcrumb trail
 */

class HiddenDiscoveries {
    constructor() {
        this.discoveries = this.loadDiscoveries();
        this.secrets = this.initializeSecrets();
        this.init();
    }

    initializeSecrets() {
        return {
            // SECRET 1: Hover over specific words in project descriptions
            hover_secrets: {
                id: 'hover_secrets',
                discovered: false,
                hints: ['Certain words feel... different'],
                trigger: 'hover over glowing words',
                reward: 'Unlocks hidden project details',
                words: ['serverless', 'CloudFront', 'DynamoDB', 'lambda', 'AI']
            },

            // SECRET 2: Click the period after "Terrell K. Flautt" in nav
            nav_period: {
                id: 'nav_period',
                discovered: false,
                hints: ['The smallest details matter'],
                trigger: 'click the invisible',
                reward: 'Aziza whispers a clue',
                unlocks: 'aziza_hint_1'
            },

            // SECRET 3: Type "debug" anywhere on page
            debug_mode: {
                id: 'debug_mode',
                discovered: false,
                hints: ['Developers have special powers'],
                trigger: 'type debug',
                reward: 'Dev console activates',
                unlocks: 'dev_tools'
            },

            // SECRET 4: Click project cards in specific order
            project_sequence: {
                id: 'project_sequence',
                discovered: false,
                hints: ['The order of creation tells a story'],
                trigger: 'click projects: SnapIt Forms → QR → Analytics',
                reward: 'Hidden "Evolution" timeline appears',
                sequence: ['snapitforms', 'snapitqr', 'snapitanalytics']
            },

            // SECRET 5: Scroll to exact middle of page and wait 5 seconds
            middle_secret: {
                id: 'middle_secret',
                discovered: false,
                hints: ['Balance is key. Find the center.'],
                trigger: 'scroll to exact middle, wait',
                reward: 'Genie lamp icon appears briefly',
                unlocks: 'lamp_location_hint'
            },

            // SECRET 6: Double-click the hero subtitle
            subtitle_secret: {
                id: 'subtitle_secret',
                discovered: false,
                hints: ['Some things reveal more when examined closely'],
                trigger: 'double-click subtitle',
                reward: 'Subtitle changes to reveal hidden message',
                messages: [
                    'Design your magical world',
                    'Every pixel has purpose',
                    'The journey is hidden in plain sight',
                    'Four elements await the wise'
                ]
            },

            // SECRET 7: Inspect console - hidden ASCII art
            console_art: {
                id: 'console_art',
                discovered: false,
                hints: ['Open your developer tools'],
                trigger: 'open console',
                reward: 'ASCII art quest map + hint',
                auto_trigger: true
            },

            // SECRET 8: Click "View Work" button 3 times rapidly
            rapid_clicks: {
                id: 'rapid_clicks',
                discovered: false,
                hints: ['Impatience reveals hidden paths'],
                trigger: 'triple-click View Work',
                reward: 'Secret project "The Masterpiece" appears',
                unlocks: 'hidden_project'
            },

            // SECRET 9: Hover footer copyright exactly 10 seconds
            footer_secret: {
                id: 'footer_secret',
                discovered: false,
                hints: ['Time reveals truth at the foundation'],
                trigger: 'hover copyright 10+ seconds',
                reward: 'Footer reveals: "Built with ❤️ and ancient magic"',
                unlocks: 'magic_acknowledgment'
            },

            // SECRET 10: Resize window to exactly 1337px wide (leet)
            leet_width: {
                id: 'leet_width',
                discovered: false,
                hints: ['Hackers know the sacred number'],
                trigger: 'resize to 1337px width',
                reward: 'Matrix rain falls briefly + achievement',
                unlocks: 'hacker_badge'
            },

            // SECRET 11: Type user's name in any input field
            name_recognition: {
                id: 'name_recognition',
                discovered: false,
                hints: ['Identity matters'],
                trigger: 'type your real name',
                reward: 'Site personalizes: "Welcome back, [Name]"',
                unlocks: 'personalization'
            },

            // SECRET 12: Visit at exactly midnight
            midnight_secret: {
                id: 'midnight_secret',
                discovered: false,
                hints: ['The witching hour holds secrets'],
                trigger: 'visit between 00:00-00:05',
                reward: 'Dark mode auto-activates + special message',
                unlocks: 'night_mode'
            },

            // SECRET 13: Click all skill tags in alphabetical order
            skill_sequence: {
                id: 'skill_sequence',
                discovered: false,
                hints: ['Order from chaos'],
                trigger: 'click skills alphabetically',
                reward: 'Skills rearrange into hidden pattern',
                unlocks: 'skill_mastery'
            },

            // SECRET 14: Scroll past footer (overscroll)
            overscroll: {
                id: 'overscroll',
                discovered: false,
                hints: ['Go beyond the expected boundaries'],
                trigger: 'scroll past end',
                reward: 'Hidden "Credits" section appears',
                unlocks: 'credits_scroll'
            },

            // SECRET 15: Use browser back button from game
            browser_back: {
                id: 'browser_back',
                discovered: false,
                hints: ['Not all paths are forward'],
                trigger: 'use back button during game',
                reward: 'Aziza: "You cannot escape destiny that easily, seeker"',
                unlocks: 'aziza_awareness'
            }
        };
    }

    init() {
        console.log('🔍 Hidden Discovery System Active');
        this.setupSecretTriggers();
        this.showConsoleArt();
        this.checkMidnightVisit();
        this.trackWindowResize();
    }

    setupSecretTriggers() {
        // SECRET 2: Nav period click
        this.addInvisiblePeriod();

        // SECRET 3: Type "debug"
        this.listenForDebugCommand();

        // SECRET 6: Double-click subtitle
        this.setupSubtitleSecret();

        // SECRET 8: Triple-click View Work
        this.setupRapidClicks();

        // SECRET 9: Footer hover
        this.setupFooterSecret();

        // SECRET 14: Overscroll
        this.setupOverscroll();

        // More triggers...
        this.setupHoverSecrets();
        this.setupSkillSequence();
    }

    addInvisiblePeriod() {
        const logo = document.querySelector('.logo-text');
        if (!logo) return;

        // Add invisible period after the name
        const period = document.createElement('span');
        period.textContent = '.';
        period.style.cssText = `
            opacity: 0;
            cursor: help;
            transition: opacity 0.3s;
            font-size: 0.8em;
        `;
        period.className = 'secret-period';

        logo.appendChild(period);

        // Reveal on hover
        logo.addEventListener('mouseenter', () => {
            period.style.opacity = '0.3';
        });
        logo.addEventListener('mouseleave', () => {
            period.style.opacity = '0';
        });

        // Click triggers discovery
        period.addEventListener('click', (e) => {
            e.stopPropagation();
            this.discoverSecret('nav_period');
            this.showAzizaWhisper();
        });
    }

    showAzizaWhisper() {
        const whisper = document.createElement('div');
        whisper.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #ffd700;
            border-radius: 15px;
            padding: 30px;
            max-width: 500px;
            z-index: 99999;
            color: #ffd700;
            font-family: 'Georgia', serif;
            text-align: center;
            animation: fadeIn 0.5s;
        `;

        whisper.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 15px;">🔮</div>
            <p style="font-size: 1.2rem; font-style: italic; line-height: 1.8;">
                "You see what others miss, seeker...<br>
                The period. The pause. The space between breaths.<br>
                There are ${Object.keys(this.secrets).length} secrets hidden here.<br>
                You have found ${this.discoveries.length}."
            </p>
            <div style="margin-top: 20px; font-size: 0.9rem; opacity: 0.7;">
                Click anywhere to continue
            </div>
        `;

        document.body.appendChild(whisper);

        whisper.addEventListener('click', () => {
            whisper.style.animation = 'fadeOut 0.5s';
            setTimeout(() => whisper.remove(), 500);
        });
    }

    listenForDebugCommand() {
        let typed = '';
        document.addEventListener('keypress', (e) => {
            typed += e.key.toLowerCase();

            if (typed.includes('debug')) {
                this.discoverSecret('debug_mode');
                this.activateDebugMode();
                typed = '';
            }

            if (typed.length > 10) {
                typed = typed.slice(-10);
            }
        });
    }

    activateDebugMode() {
        console.clear();
        console.log('%c🛠️ DEBUG MODE ACTIVATED', 'color: #00ff00; font-size: 20px; font-weight: bold; background: #000; padding: 10px;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00ff00;');
        console.log('%cYou have unlocked developer powers!', 'color: #ffff00; font-size: 14px;');
        console.log('');
        console.log('%cAvailable Commands:', 'color: #00ffff; font-size: 12px; font-weight: bold;');
        console.log('%cwindow.showAllSecrets()', 'color: #fff;', '→ Reveal all hidden secrets');
        console.log('%cwindow.skipToGame()', 'color: #fff;', '→ Jump directly to quest');
        console.log('%cwindow.getDiscoveries()', 'color: #fff;', '→ See what you\'ve found');
        console.log('%cwindow.grantWisdom()', 'color: #fff;', '→ Max out wisdom stat');
        console.log('');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00ff00;');

        // Add global debug functions
        window.showAllSecrets = () => {
            console.table(this.secrets);
            console.log(`%c${this.discoveries.length}/${Object.keys(this.secrets).length} discovered`, 'color: #ffd700; font-size: 14px;');
        };

        window.skipToGame = () => {
            if (window.questEngine) {
                window.questEngine.discoverGame('debug_skip');
            }
        };

        window.getDiscoveries = () => {
            return this.discoveries;
        };

        window.grantWisdom = () => {
            if (window.questEngine) {
                window.questEngine.updateAlignment({ wisdom: 10 });
                console.log('%c+10 Wisdom Granted!', 'color: #667eea; font-size: 16px;');
            }
        };

        this.showNotification('🛠️ Debug Mode Active', 'Check console for commands');
    }

    setupSubtitleSecret() {
        const subtitle = document.querySelector('.subtitle-text');
        if (!subtitle) return;

        let clickCount = 0;
        let clickTimer;

        subtitle.addEventListener('dblclick', () => {
            this.discoverSecret('subtitle_secret');
            this.cycleSubtitleMessages(subtitle);
        });
    }

    cycleSubtitleMessages(element) {
        const messages = this.secrets.subtitle_secret.messages;
        let index = 0;

        const cycle = () => {
            element.textContent = messages[index];
            element.style.color = index === 3 ? '#ffd700' : '';
            index = (index + 1) % messages.length;
        };

        setInterval(cycle, 3000);
        cycle(); // Start immediately
    }

    setupRapidClicks() {
        const viewWorkBtn = document.querySelector('.btn-primary');
        if (!viewWorkBtn) return;

        let clicks = 0;
        let clickTimer;

        viewWorkBtn.addEventListener('click', (e) => {
            clicks++;

            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clicks = 0;
            }, 500);

            if (clicks === 3) {
                e.preventDefault();
                this.discoverSecret('rapid_clicks');
                this.revealHiddenProject();
                clicks = 0;
            }
        });
    }

    revealHiddenProject() {
        this.showNotification(
            '🎨 Hidden Project Unlocked!',
            '"The Masterpiece" - A portfolio that transcends portfolios'
        );

        // Could add actual hidden project card here
        console.log('%c✨ THE MASTERPIECE', 'color: #ffd700; font-size: 18px; font-weight: bold;');
        console.log('%cA web portfolio that becomes a Quest for Glory adventure.', 'color: #fff; font-size: 12px;');
        console.log('%cYou\'re experiencing it right now.', 'color: #667eea; font-size: 12px; font-style: italic;');
    }

    setupFooterSecret() {
        const footer = document.querySelector('footer') || document.querySelector('.footer');
        if (!footer) return;

        let hoverTimer;
        let hoverDuration = 0;

        const copyright = footer.querySelector('p') || footer;

        copyright.addEventListener('mouseenter', () => {
            hoverTimer = setInterval(() => {
                hoverDuration += 100;
                if (hoverDuration >= 10000) {
                    clearInterval(hoverTimer);
                    this.discoverSecret('footer_secret');
                    this.revealFooterMagic(copyright);
                }
            }, 100);
        });

        copyright.addEventListener('mouseleave', () => {
            clearInterval(hoverTimer);
            hoverDuration = 0;
        });
    }

    revealFooterMagic(element) {
        const original = element.textContent;
        element.style.transition = 'all 0.5s';
        element.textContent = '✨ Built with ❤️ and ancient magic by Terrell K. Flautt ✨';
        element.style.color = '#ffd700';
        element.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';

        setTimeout(() => {
            element.textContent = original;
            element.style.color = '';
            element.style.textShadow = '';
        }, 5000);
    }

    setupOverscroll() {
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            // Check if scrolled past bottom
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                this.discoverSecret('overscroll');
                this.showCreditsSection();
            }

            lastScrollTop = scrollTop;
        });
    }

    showCreditsSection() {
        // Only show once
        if (document.querySelector('.hidden-credits')) return;

        const credits = document.createElement('div');
        credits.className = 'hidden-credits';
        credits.style.cssText = `
            padding: 60px 20px;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: white;
            text-align: center;
            animation: slideUp 1s ease-out;
        `;

        credits.innerHTML = `
            <h3 style="color: #ffd700; font-size: 2rem; margin-bottom: 20px;">
                🎮 You Found the Credits!
            </h3>
            <p style="font-size: 1.2rem; margin-bottom: 30px; line-height: 1.8;">
                This portfolio-turned-adventure was inspired by:<br>
                <strong>Quest for Glory</strong> series by Sierra On-Line<br>
                Created with modern web tech and a love for gaming
            </p>
            <div style="margin-top: 30px; font-size: 0.9rem; opacity: 0.7;">
                Secrets found: ${this.discoveries.length}/${Object.keys(this.secrets).length}
            </div>
        `;

        document.body.appendChild(credits);
    }

    setupHoverSecrets() {
        // Add glowing effect to special words
        const words = this.secrets.hover_secrets.words;

        // Find and highlight these words in project descriptions
        document.querySelectorAll('.project-description, .skill-item').forEach(el => {
            words.forEach(word => {
                const regex = new RegExp(`\\b${word}\\b`, 'gi');
                el.innerHTML = el.innerHTML.replace(regex, (match) => {
                    return `<span class="secret-word" data-word="${match.toLowerCase()}">${match}</span>`;
                });
            });
        });

        // Add styles and interaction
        const style = document.createElement('style');
        style.textContent = `
            .secret-word {
                position: relative;
                cursor: help;
                animation: subtleGlow 3s infinite;
            }

            .secret-word:hover {
                color: #ffd700;
                text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
            }

            @keyframes subtleGlow {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);

        // Track hovers
        document.querySelectorAll('.secret-word').forEach(word => {
            word.addEventListener('mouseenter', () => {
                const wordText = word.dataset.word;
                this.trackWordHover(wordText);
            });
        });
    }

    trackWordHover(word) {
        if (!this.wordHovers) this.wordHovers = {};
        this.wordHovers[word] = (this.wordHovers[word] || 0) + 1;

        // Discover after hovering 5 unique words
        const uniqueWords = Object.keys(this.wordHovers).length;
        if (uniqueWords >= 5 && !this.secrets.hover_secrets.discovered) {
            this.discoverSecret('hover_secrets');
            this.showNotification(
                '✨ Word Secrets Unlocked!',
                'You found the glowing words. Each holds meaning...'
            );
        }
    }

    setupSkillSequence() {
        let clicked = [];

        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.addEventListener('click', () => {
                clicked.push(skill.textContent.trim());

                // Check if alphabetically ordered
                const isAlphabetical = clicked.every((skill, i) => {
                    if (i === 0) return true;
                    return skill.localeCompare(clicked[i - 1]) >= 0;
                });

                if (clicked.length >= 5 && isAlphabetical) {
                    this.discoverSecret('skill_sequence');
                    this.showNotification(
                        '🎯 Pattern Recognized!',
                        'Order from chaos reveals hidden truths'
                    );
                    clicked = [];
                }

                // Reset after 10 seconds of inactivity
                clearTimeout(this.skillTimeout);
                this.skillTimeout = setTimeout(() => {
                    clicked = [];
                }, 10000);
            });
        });
    }

    trackWindowResize() {
        window.addEventListener('resize', () => {
            const width = window.innerWidth;

            // 1337 is "leet" in hacker culture
            if (width === 1337 && !this.secrets.leet_width.discovered) {
                this.discoverSecret('leet_width');
                this.triggerMatrixRain();
            }
        });
    }

    triggerMatrixRain() {
        this.showNotification(
            '🔢 1337 - Elite Hacker!',
            'You know the sacred number'
        );

        // Brief matrix effect
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 999999;
            opacity: 0.6;
        `;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(0);

        let frame = 0;
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            frame++;
            if (frame < 150) { // 5 seconds at 30fps
                requestAnimationFrame(draw);
            } else {
                canvas.style.animation = 'fadeOut 1s';
                setTimeout(() => canvas.remove(), 1000);
            }
        };

        draw();
    }

    checkMidnightVisit() {
        const hour = new Date().getHours();

        if (hour === 0 && !this.secrets.midnight_secret.discovered) {
            this.discoverSecret('midnight_secret');
            this.activateMidnightMode();
        }
    }

    activateMidnightMode() {
        document.body.style.transition = 'all 2s';
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';

        this.showNotification(
            '🌙 The Witching Hour',
            'Midnight reveals what daylight hides...'
        );

        setTimeout(() => {
            if (confirm('Keep this dark aesthetic?')) {
                localStorage.setItem('dark_mode', 'true');
            } else {
                document.body.style.filter = '';
            }
        }, 3000);
    }

    showConsoleArt() {
        if (this.secrets.console_art.discovered) return;

        console.log(`
    ╔═══════════════════════════════════════════════════════╗
    ║                                                       ║
    ║        🗺️  QUEST MAP - SHAPEIR (Terrell's Port)     ║
    ║                                                       ║
    ║     🏠 Portfolio Plaza (You are here)                ║
    ║            ↓                                         ║
    ║     🚪 Hidden Door (Click logo 7×)                   ║
    ║            ↓                                         ║
    ║     👁️  Aziza's Riddle                               ║
    ║            ↓                                         ║
    ║     🪔 The Ancient Lamp                              ║
    ║            ↓                                         ║
    ║     🧞 Genie's Quest                                 ║
    ║            ↓                                         ║
    ║     ⚔️  Four Elementals                              ║
    ║     🔥💧💨🌍                                         ║
    ║            ↓                                         ║
    ║     🧪 Dr. Cranium's Lab                             ║
    ║            ↓                                         ║
    ║     🐙 The Final Darkness                            ║
    ║                                                       ║
    ║   Secrets Hidden: ${Object.keys(this.secrets).length}                               ║
    ║   Secrets Found: ${this.discoveries.length}                                 ║
    ║                                                       ║
    ╚═══════════════════════════════════════════════════════╝
        `);

        console.log('%cType window.showAllSecrets() to reveal hidden discoveries', 'color: #ffd700; font-size: 12px;');

        this.discoverSecret('console_art');
    }

    discoverSecret(secretId) {
        const secret = this.secrets[secretId];
        if (!secret || secret.discovered) return;

        secret.discovered = true;
        this.discoveries.push(secretId);
        this.saveDiscoveries();

        console.log(`%c🔓 SECRET DISCOVERED: ${secretId}`, 'color: #4CAF50; font-size: 14px; font-weight: bold;');
        console.log(`%c${secret.reward}`, 'color: #ffd700; font-size: 12px;');

        // Track discovery
        if (window.questEngine) {
            window.questEngine.trackEvent('secret_discovered', {
                secretName: secretId,
                discoveryMethod: secret.trigger
            });
        }

        // Show progress
        const total = Object.keys(this.secrets).length;
        const found = this.discoveries.length;
        console.log(`%cProgress: ${found}/${total} secrets found`, 'color: #667eea; font-size: 11px;');
    }

    showNotification(title, message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #ffd700;
            border-radius: 10px;
            padding: 20px;
            max-width: 350px;
            z-index: 100000;
            color: white;
            animation: slideInRight 0.5s;
            box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
        `;

        notification.innerHTML = `
            <div style="font-size: 1.1rem; font-weight: bold; color: #ffd700; margin-bottom: 10px;">
                ${title}
            </div>
            <div style="font-size: 0.95rem; line-height: 1.6;">
                ${message}
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    loadDiscoveries() {
        const saved = localStorage.getItem('hidden_discoveries');
        return saved ? JSON.parse(saved) : [];
    }

    saveDiscoveries() {
        localStorage.setItem('hidden_discoveries', JSON.stringify(this.discoveries));
    }
}

// Add animations
const discoveryStyles = document.createElement('style');
discoveryStyles.textContent = `
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

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(discoveryStyles);

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.hiddenDiscoveries = new HiddenDiscoveries();
    });
} else {
    window.hiddenDiscoveries = new HiddenDiscoveries();
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HiddenDiscoveries;
}
