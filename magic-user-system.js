// ✨ MAGIC USER SYSTEM ✨
// Completely invisible, bulletproof persistence
// Users never know it's happening - it just works

class MagicUserSystem {
    constructor() {
        this.magicId = null;
        this.shadowProgress = {
            discoveries: [],
            visits: 0,
            magicMoments: [],
            firstMagic: Date.now(),
            totalMagic: 0
        };
        this.sessionStart = Date.now();
        this.pageLoadTime = Date.now();
        this.sessionInteractions = 0;
        this.userAnswers = {};
        this.journeyPath = [];
        this.castSpell();
    }

    async castSpell() {
        // 🎭 Create invisible magical identity
        await this.weaveIdentity();

        // 🌟 Load any existing magic
        await this.recallMagic();

        // 🔮 Begin invisible tracking
        this.startMagicTracking();

        // 🧞‍♂️ Ask genie questions after engagement
        setTimeout(() => this.askGenieQuestions(), 10000);

        // 🎭 Initialize logo evolution system
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initLogoEvolution();
                this.addResetButton();
                this.setupHiddenInteractions();
                this.initAdaptiveMenu();
                this.setupSkillClickRouting();
            });
        } else {
            setTimeout(() => {
                this.initLogoEvolution();
                this.addResetButton();
                this.setupHiddenInteractions();
                this.initAdaptiveMenu();
                this.setupSkillClickRouting();
            }, 100);
        }

        // ✨ Silent magic
    }

    initAdaptiveMenu() {
        this.userInterests = {
            programming: 0,
            design: 0,
            devops: 0,
            ai: 0,
            business: 0
        };

        this.observeBehavior();
        this.setupInterestDetection();
    }

    observeBehavior() {
        // Track scrolling patterns
        let scrollDepth = 0;
        window.addEventListener('scroll', () => {
            const depth = Math.max(scrollDepth, window.scrollY / (document.body.scrollHeight - window.innerHeight));
            scrollDepth = depth;

            if (depth > 0.3) this.userInterests.devops += 0.1;
            if (depth > 0.7) this.userInterests.business += 0.1;
        });

        // Track time spent on sections
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    setTimeout(() => {
                        if (entry.target.getBoundingClientRect().top < window.innerHeight) {
                            this.trackSectionInterest(sectionId);
                        }
                    }, 2000);
                }
            });
        });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    trackSectionInterest(sectionId) {
        switch(sectionId) {
            case 'projects':
                this.userInterests.programming += 0.3;
                this.userInterests.design += 0.2;
                break;
            case 'about':
                this.userInterests.devops += 0.2;
                this.userInterests.business += 0.1;
                break;
        }
        this.updateAdaptiveMenu();
    }

    setupInterestDetection() {
        let gazeTime = {};
        let lastInteraction = Date.now();

        // Track subtle interactions
        document.addEventListener('mousemove', (e) => {
            const element = document.elementFromPoint(e.clientX, e.clientY);
            if (!element) return;

            const text = element.textContent?.toLowerCase() || '';
            const now = Date.now();

            // Micro-interactions reveal intent
            if (text.includes('react') || text.includes('javascript') || text.includes('lambda') ||
                text.includes('api') || text.includes('serverless')) {
                this.userInterests.ai += 0.02;
            }

            if (text.includes('css') || text.includes('design') || text.includes('animation') ||
                text.includes('visual') || text.includes('gradient')) {
                this.userInterests.design += 0.02;
            }

            if (text.includes('aws') || text.includes('cloud') || text.includes('deploy') ||
                text.includes('infrastructure') || text.includes('server')) {
                this.userInterests.devops += 0.02;
            }

            // Gaze tracking - time spent looking at sections
            const section = element.closest('section');
            if (section && section.id) {
                gazeTime[section.id] = (gazeTime[section.id] || 0) + (now - lastInteraction);

                if (gazeTime[section.id] > 3000) { // 3 seconds of attention
                    this.trackDeepInterest(section.id);
                }
            }

            lastInteraction = now;
        });

        // Reading patterns reveal true interest
        document.addEventListener('scroll', () => {
            const scrollDepth = window.scrollY / (document.body.scrollHeight - window.innerHeight);

            if (scrollDepth > 0.7) { // Deep engagement
                this.userInterests.programming += 0.1;
                setTimeout(() => this.revealMagicMenu(), 500);
            }
        });

        // Click precision indicates intent
        document.addEventListener('click', (e) => {
            const element = e.target;
            const text = element.textContent?.toLowerCase() || '';

            // Immediate strong signals
            if (text.includes('code') || text.includes('github') || text.includes('projects')) {
                this.userInterests.programming += 0.8;
                this.revealMagicMenu();
            }

            if (text.includes('design') || text.includes('portfolio') || text.includes('creative')) {
                this.userInterests.design += 0.8;
                this.revealMagicMenu();
            }

            if (text.includes('devops') || text.includes('automation') || text.includes('deploy')) {
                this.userInterests.devops += 0.8;
                this.revealMagicMenu();
            }
        });
    }

    trackDeepInterest(sectionId) {
        switch(sectionId) {
            case 'projects':
                this.userInterests.programming += 0.3;
                this.userInterests.ai += 0.2;
                break;
            case 'about':
                this.userInterests.devops += 0.2;
                break;
        }
        this.revealMagicMenu();
    }

    revealMagicMenu() {
        // Only reveal when interest crosses threshold
        const topInterest = Math.max(...Object.values(this.userInterests));
        if (topInterest > 0.5) {
            this.updateAdaptiveMenu();
        }
    }

    updateAdaptiveMenu() {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        // Remove existing adaptive links
        navLinks.querySelectorAll('.adaptive-link').forEach(link => link.remove());

        // Determine top interests
        const sortedInterests = Object.entries(this.userInterests)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 2);

        // Add relevant links based on interests
        sortedInterests.forEach(([interest, score]) => {
            if (score > 0.5) {
                this.addInterestLink(navLinks, interest);
            }
        });
    }

    addInterestLink(container, interest) {
        const links = {
            programming: {
                text: 'Code',
                url: 'blog/programming',
                icon: '💻'
            },
            design: {
                text: 'Design',
                url: 'blog/design',
                icon: '🎨'
            },
            devops: {
                text: 'DevOps',
                url: 'blog/devops',
                icon: '⚙️'
            },
            ai: {
                text: 'Lab',
                url: 'blog/ai',
                icon: '🤖'
            }
        };

        const linkData = links[interest];
        if (!linkData) return;

        // Check if link already exists
        if (container.querySelector(`[href="${linkData.url}"]`)) return;

        const link = document.createElement('a');
        link.href = linkData.url;
        link.className = 'nav-link adaptive-link';
        link.style.cssText = `
            opacity: 0;
            transform: translateY(-20px) scale(0.8);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1));
            border-radius: 20px;
            padding: 8px 12px;
            margin: 0 5px;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255,255,255,0.1);
        `;

        // Magic appearance
        link.innerHTML = `<span style="filter: drop-shadow(0 0 5px currentColor);">${linkData.icon}</span> ${linkData.text}`;

        // Insert before last link (Hall of Fame)
        const lastLink = container.querySelector('.leaderboard-link');
        container.insertBefore(link, lastLink);

        // Magical reveal animation
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0) scale(1)';

            // Subtle glow pulse
            setTimeout(() => {
                link.style.boxShadow = '0 0 20px rgba(255,255,255,0.3)';
                setTimeout(() => {
                    link.style.boxShadow = 'none';
                }, 1000);
            }, 400);
        }, 200);

        // Hover effects
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px) scale(1.05)';
            link.style.boxShadow = '0 5px 15px rgba(255,255,255,0.2)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
            link.style.boxShadow = 'none';
        });
    }

    setupSkillClickRouting() {
        // Map skills to blog categories
        const skillToBlog = {
            // Programming skills → Code blog
            'react': 'blog/programming',
            'javascript': 'blog/programming',
            'node.js': 'blog/programming',
            'typescript': 'blog/programming',
            'python': 'blog/programming',
            'rest apis': 'blog/programming',
            'graphql': 'blog/programming',
            'websockets': 'blog/programming',
            'microservices': 'blog/programming',

            // Design skills → Design blog
            'css': 'blog/design',
            'html': 'blog/design',
            'tailwind css': 'blog/design',
            'responsive design': 'blog/design',
            'ui/ux design': 'blog/design',

            // DevOps skills → DevOps blog
            'aws lambda': 'blog/devops',
            'aws cli': 'blog/devops',
            'cloudformation': 'blog/devops',
            'dynamodb': 'blog/devops',
            'cloudfront cdn': 'blog/devops',
            's3 & cloudwatch': 'blog/devops',
            'serverless framework': 'blog/devops',
            'infrastructure as code': 'blog/devops',
            'ci/cd pipelines': 'blog/devops',
            'github actions': 'blog/devops',
            'docker': 'blog/devops',

            // AI skills → AI Lab
            'artificial intelligence': 'blog/ai',
            'machine learning apis': 'blog/ai',
            'chatgpt integration': 'blog/ai'
        };

        // Add click handlers to skill items
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('skill-item')) {
                const skillText = e.target.textContent.toLowerCase();
                const blogUrl = skillToBlog[skillText];

                if (blogUrl) {
                    // Track the interest before navigating
                    this.trackSkillInterest(skillText);

                    // Navigate to blog
                    window.location.href = blogUrl;
                } else {
                    // Default to programming blog for unknown skills
                    window.location.href = 'blog/programming';
                }
            }
        });

        // Add hover effects to indicate clickability
        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.style.cursor = 'pointer';
            skill.style.transition = 'all 0.3s ease';

            skill.addEventListener('mouseenter', () => {
                skill.style.transform = 'translateY(-2px)';
                skill.style.boxShadow = '0 4px 8px rgba(255,255,255,0.1)';
            });

            skill.addEventListener('mouseleave', () => {
                skill.style.transform = 'translateY(0)';
                skill.style.boxShadow = 'none';
            });
        });
    }

    trackSkillInterest(skillText) {
        // Update interest scores based on clicked skill
        if (['react', 'javascript', 'node.js', 'python', 'apis'].some(s => skillText.includes(s))) {
            this.userInterests.programming += 1.0;
        }
        if (['css', 'html', 'design', 'ui', 'responsive'].some(s => skillText.includes(s))) {
            this.userInterests.design += 1.0;
        }
        if (['aws', 'cloud', 'docker', 'ci/cd', 'infrastructure'].some(s => skillText.includes(s))) {
            this.userInterests.devops += 1.0;
        }
        if (['ai', 'machine', 'chatgpt', 'intelligence'].some(s => skillText.includes(s))) {
            this.userInterests.ai += 1.0;
        }

        // Update adaptive menu for future visits
        this.revealMagicMenu();
    }

    // Simple genie interest system
    askGenieQuestions() {
        if (this.shadowProgress.genieQuestioned) return;

        // Only ask after some engagement
        if (this.shadowProgress.visits < 2) return;

        setTimeout(() => {
            this.showGenieQuestion();
        }, 5000); // 5 seconds after page load
    }

    showGenieQuestion() {
        const modal = document.createElement('div');
        modal.className = 'genie-question-modal';
        modal.innerHTML = `
            <div class="genie-backdrop"></div>
            <div class="genie-content">
                <div class="genie-avatar">🧞‍♂️</div>
                <h3>I sense curiosity...</h3>
                <p>What draws you to explore?</p>
                <div class="interest-options">
                    <button class="interest-btn" data-interest="programming">💻 Code & Development</button>
                    <button class="interest-btn" data-interest="design">🎨 Design & UI/UX</button>
                    <button class="interest-btn" data-interest="devops">⚙️ DevOps & Infrastructure</button>
                    <button class="interest-btn" data-interest="ai">🤖 AI & Innovation</button>
                    <button class="interest-btn" data-interest="all">✨ Everything</button>
                </div>
                <button class="genie-dismiss">Maybe later</button>
            </div>
        `;

        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;

        const backdrop = modal.querySelector('.genie-backdrop');
        backdrop.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        `;

        const content = modal.querySelector('.genie-content');
        content.style.cssText = `
            background: rgba(20, 20, 30, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            max-width: 400px;
            backdrop-filter: blur(10px);
            transform: scale(0.8);
            transition: transform 0.5s ease;
        `;

        // Style interest buttons
        modal.querySelectorAll('.interest-btn').forEach(btn => {
            btn.style.cssText = `
                display: block;
                width: 100%;
                padding: 12px;
                margin: 8px 0;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
            `;

            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'rgba(255, 255, 255, 0.2)';
                btn.style.transform = 'translateY(-2px)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'rgba(255, 255, 255, 0.1)';
                btn.style.transform = 'translateY(0)';
            });

            btn.addEventListener('click', () => {
                this.handleGenieResponse(btn.dataset.interest);
                this.closeGenieModal(modal);
            });
        });

        // Dismiss button
        const dismiss = modal.querySelector('.genie-dismiss');
        dismiss.style.cssText = `
            margin-top: 15px;
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            text-decoration: underline;
        `;

        dismiss.addEventListener('click', () => {
            this.closeGenieModal(modal);
        });

        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 100);
    }

    handleGenieResponse(interest) {
        // Mark as questioned to avoid repeat
        this.shadowProgress.genieQuestioned = true;
        this.preserveMagic();

        // Set strong interest based on response
        switch(interest) {
            case 'programming':
                this.userInterests.programming = 2.0;
                break;
            case 'design':
                this.userInterests.design = 2.0;
                break;
            case 'devops':
                this.userInterests.devops = 2.0;
                break;
            case 'ai':
                this.userInterests.ai = 2.0;
                break;
            case 'all':
                this.userInterests.programming = 1.0;
                this.userInterests.design = 1.0;
                this.userInterests.devops = 1.0;
                this.userInterests.ai = 1.0;
                break;
        }

        // Immediately show relevant blog links
        this.revealMagicMenu();
    }

    closeGenieModal(modal) {
        modal.style.opacity = '0';
        modal.querySelector('.genie-content').style.transform = 'scale(0.8)';

        setTimeout(() => {
            modal.remove();
        }, 500);
    }

    // Initialize Aziza Lamp Gift System
    initializeLampGiftSystem() {
        // Check if user has solved Aziza's riddle and earned a lamp
        const riddleSolved = localStorage.getItem(`aziza_riddle_solved_${this.magicId}`);
        const lampGifted = localStorage.getItem(`aziza_lamp_gifted_${this.magicId}`);

        if (riddleSolved && !lampGifted) {
            // User solved riddle but hasn't received lamp yet
            setTimeout(() => this.showAzizaLampGift(), 2000);
        } else if (lampGifted) {
            // User already has lamp, add to footer
            this.addLampToFooter();
        }

        // Set up any lamp-related event listeners
        this.setupLampInteractions();
    }

    showAzizaLampGift() {
        if (this.shadowProgress.lampGifted) return;

        const modal = document.createElement('div');
        modal.className = 'aziza-lamp-gift-modal';
        modal.innerHTML = `
            <div class="lamp-gift-backdrop"></div>
            <div class="lamp-gift-content">
                <div class="aziza-avatar">🧞‍♀️</div>
                <h3>Aziza's Gift</h3>
                <p>You have proven your wisdom. Accept this mystical lamp as your reward.</p>
                <div class="lamp-display">🪔</div>
                <button class="accept-lamp-btn">Accept the Lamp</button>
                <button class="maybe-later-btn">Perhaps later</button>
            </div>
        `;

        // Style the modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;

        const backdrop = modal.querySelector('.lamp-gift-backdrop');
        backdrop.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        `;

        const content = modal.querySelector('.lamp-gift-content');
        content.style.cssText = `
            background: rgba(30, 20, 40, 0.95);
            border: 2px solid #ffd700;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            max-width: 400px;
            backdrop-filter: blur(10px);
            transform: scale(0.8);
            transition: transform 0.5s ease;
        `;

        // Button styling
        modal.querySelectorAll('button').forEach(btn => {
            btn.style.cssText = `
                padding: 10px 20px;
                margin: 10px;
                border: 1px solid #ffd700;
                border-radius: 5px;
                background: rgba(255, 215, 0, 0.1);
                color: #ffd700;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
        });

        // Event handlers
        modal.querySelector('.accept-lamp-btn').addEventListener('click', () => {
            this.acceptLampGift();
            this.closeLampModal(modal);
        });

        modal.querySelector('.maybe-later-btn').addEventListener('click', () => {
            this.closeLampModal(modal);
        });

        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 100);
    }

    acceptLampGift() {
        this.shadowProgress.lampGifted = true;
        localStorage.setItem(`aziza_lamp_gifted_${this.magicId}`, 'true');
        this.preserveMagic();
        this.addLampToFooter();
        this.registerDiscovery('Aziza\'s Lamp', 'gift', 25);
    }

    addLampToFooter() {
        // Check if lamp link already exists
        if (document.querySelector('.mystical-lamp-link')) return;

        const footer = document.querySelector('footer') || document.body;
        const lampLink = document.createElement('a');
        lampLink.href = '#mystical-cave';
        lampLink.className = 'mystical-lamp-link';
        lampLink.innerHTML = '<span class="lamp-icon">🪔</span>';
        lampLink.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 2em;
            z-index: 1000;
            text-decoration: none;
            opacity: 0.7;
            transition: all 0.3s ease;
            filter: drop-shadow(0 0 10px #ffd700);
        `;

        lampLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.enterMysticalCave();
        });

        lampLink.addEventListener('mouseenter', () => {
            lampLink.style.opacity = '1';
            lampLink.style.transform = 'scale(1.1)';
        });

        lampLink.addEventListener('mouseleave', () => {
            lampLink.style.opacity = '0.7';
            lampLink.style.transform = 'scale(1)';
        });

        footer.appendChild(lampLink);
    }

    setupLampInteractions() {
        // Additional lamp interaction setup
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('lamp-icon')) {
                e.preventDefault();
                this.enterMysticalCave();
            }
        });
    }

    enterMysticalCave() {
        // Create cave interface
        const cave = document.createElement('div');
        cave.className = 'mystical-cave-interface';
        cave.innerHTML = `
            <div class="cave-backdrop"></div>
            <div class="cave-content">
                <div class="cave-walls">
                    <pre class="cave-ascii">
    ╔══════════════════════════════════════╗
    ║          🌟 MYSTICAL CAVE 🌟          ║
    ║                                      ║
    ║     In the depths of wisdom lies     ║
    ║       an ancient lamp waiting        ║
    ║                                      ║
    ║              🪔                      ║
    ║                                      ║
    ║    Will you rub the lamp and awaken  ║
    ║         the mystical genie?          ║
    ║                                      ║
    ╚══════════════════════════════════════╝
                    </pre>
                </div>
                <div class="cave-actions">
                    <button class="rub-lamp-btn">Rub the Lamp</button>
                    <button class="leave-cave-btn">Leave the Cave</button>
                </div>
            </div>
        `;

        // Style the cave
        cave.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.8s ease;
        `;

        const backdrop = cave.querySelector('.cave-backdrop');
        backdrop.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0c0c0c, #1a1a2e, #16213e);
            opacity: 0.95;
        `;

        const content = cave.querySelector('.cave-content');
        content.style.cssText = `
            position: relative;
            text-align: center;
            max-width: 600px;
            color: #ffd700;
            font-family: monospace;
            z-index: 1;
        `;

        // Button styling
        cave.querySelectorAll('button').forEach(btn => {
            btn.style.cssText = `
                padding: 15px 30px;
                margin: 10px;
                border: 2px solid #ffd700;
                border-radius: 10px;
                background: rgba(255, 215, 0, 0.1);
                color: #ffd700;
                font-size: 1.1em;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
        });

        // Event handlers
        cave.querySelector('.rub-lamp-btn').addEventListener('click', () => {
            this.summonGenieSpirit(cave);
        });

        cave.querySelector('.leave-cave-btn').addEventListener('click', () => {
            this.closeCaveInterface(cave);
        });

        document.body.appendChild(cave);

        // Animate in
        setTimeout(() => {
            cave.style.opacity = '1';
        }, 100);
    }

    summonGenieSpirit(cave) {
        // Replace cave content with genie interface
        const content = cave.querySelector('.cave-content');
        content.innerHTML = `
            <div class="genie-summoning">
                <div class="genie-avatar">🧞‍♂️</div>
                <h2>The Genie Awakens!</h2>
                <p>I am the spirit of wisdom and guidance. How may I assist your journey?</p>
                <div class="genie-options">
                    <button class="genie-btn" data-action="guidance">Seek Guidance</button>
                    <button class="genie-btn" data-action="wisdom">Request Wisdom</button>
                    <button class="genie-btn" data-action="mystery">Explore Mysteries</button>
                    <button class="genie-btn" data-action="leave">Return Later</button>
                </div>
            </div>
        `;

        // Style genie interface
        content.querySelectorAll('.genie-btn').forEach(btn => {
            btn.style.cssText = `
                display: block;
                width: 100%;
                padding: 15px;
                margin: 10px 0;
                border: 1px solid #667eea;
                border-radius: 8px;
                background: rgba(102, 126, 234, 0.1);
                color: #667eea;
                cursor: pointer;
                transition: all 0.3s ease;
            `;

            btn.addEventListener('click', () => {
                this.handleGenieAction(btn.dataset.action, cave);
            });
        });

        this.registerDiscovery('Genie Summoned', 'interaction', 30);
    }

    handleGenieAction(action, cave) {
        switch(action) {
            case 'guidance':
                this.showGenieGuidance(cave);
                break;
            case 'wisdom':
                this.showGenieWisdom(cave);
                break;
            case 'mystery':
                this.showGenieMystery(cave);
                break;
            case 'leave':
                this.closeCaveInterface(cave);
                break;
        }
    }

    showGenieGuidance(cave) {
        const content = cave.querySelector('.cave-content');
        content.innerHTML = `
            <div class="genie-guidance">
                <div class="genie-avatar">🧞‍♂️</div>
                <h3>Genie's Guidance</h3>
                <p>Your journey of discovery has just begun. Look for hidden patterns, click with purpose, and explore with wonder.</p>
                <p>The logo above holds secrets for those who persist. Each discovery unlocks new pathways.</p>
                <button class="return-btn">Thank you, wise one</button>
            </div>
        `;

        content.querySelector('.return-btn').addEventListener('click', () => {
            this.closeCaveInterface(cave);
        });
    }

    showGenieWisdom(cave) {
        const content = cave.querySelector('.cave-content');
        content.innerHTML = `
            <div class="genie-wisdom">
                <div class="genie-avatar">🧞‍♂️</div>
                <h3>Ancient Wisdom</h3>
                <p>"The curious mind finds treasures hidden in plain sight. Every interaction teaches, every pattern reveals truth."</p>
                <p>Remember: dedication is rewarded, persistence unlocks evolution, and wonder leads to wisdom.</p>
                <button class="return-btn">I understand</button>
            </div>
        `;

        content.querySelector('.return-btn').addEventListener('click', () => {
            this.closeCaveInterface(cave);
        });
    }

    showGenieMystery(cave) {
        const content = cave.querySelector('.cave-content');
        content.innerHTML = `
            <div class="genie-mystery">
                <div class="genie-avatar">🧞‍♂️</div>
                <h3>Mysteries Await</h3>
                <p>Beyond this cave lie greater mysteries. The transcendental journey awaits those ready for deeper exploration.</p>
                <p>Seek the hidden button that begins transformation. Audio and visuals will guide your inner journey.</p>
                <button class="return-btn">I will seek</button>
            </div>
        `;

        content.querySelector('.return-btn').addEventListener('click', () => {
            this.closeCaveInterface(cave);
        });
    }

    closeLampModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 500);
    }

    closeCaveInterface(cave) {
        cave.style.opacity = '0';
        setTimeout(() => cave.remove(), 800);
    }

    async weaveIdentity() {
        // Create magical fingerprint from multiple sources
        const essence = await this.gatherEssence();
        this.magicId = await this.bindEssence(essence);

        // Store in multiple magical realms for persistence
        this.anchорToRealms();
    }

    async gatherEssence() {
        // Canvas magic - unique visual signature
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '16px serif';
        ctx.fillStyle = '#f60';
        ctx.fillRect(10, 10, 100, 100);
        ctx.fillStyle = '#069';
        ctx.arc(50, 50, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#333';
        ctx.fillText('✨🔮✨', 20, 20);

        const essences = [
            // Visual essence
            canvas.toDataURL(),

            // Temporal essence
            new Date().getTimezoneOffset().toString(),
            Intl.DateTimeFormat().resolvedOptions().timeZone,

            // Dimensional essence
            `${screen.width}x${screen.height}x${screen.colorDepth}`,
            `${screen.availWidth}x${screen.availHeight}`,
            (window.devicePixelRatio || 1).toString(),

            // Mechanical essence
            navigator.userAgent,
            navigator.language,
            (navigator.languages || []).join(','),
            navigator.platform,

            // Mystical essence
            (navigator.hardwareConcurrency || 4).toString(),
            (navigator.deviceMemory || 4).toString(),
            navigator.cookieEnabled.toString(),

            // Elemental essence
            (navigator.connection?.effectiveType || 'unknown'),
            window.location.hostname,

            // Temporal stability (changes slowly)
            Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)).toString() // Week-based
        ];

        return essences.join('🌟');
    }

    async bindEssence(essence) {
        // Create stable magical signature
        let hash = 0;
        for (let i = 0; i < essence.length; i++) {
            const char = essence.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

        // Add mystical components
        const mystical = Math.abs(hash).toString(36);
        const temporal = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 30)).toString(36); // Month-based stability
        const magical = `magic_${mystical}_${temporal}`;

        return magical;
    }

    anchорToRealms() {
        // Anchor magical identity across multiple realms
        const anchorPoints = [
            `terrellflautt_magic_${this.magicId}`,
            `tf_essence_${this.magicId.slice(-12)}`,
            `magic_user_${this.magicId.slice(6, 18)}`,
            `user_essence_${this.magicId.slice(-8)}`,
            `tf_soul_${this.magicId.slice(10, 20)}`
        ];

        anchorPoints.forEach(anchor => {
            try {
                if (!localStorage.getItem(anchor)) {
                    localStorage.setItem(anchor, JSON.stringify({
                        soul: this.magicId,
                        born: Date.now(),
                        realm: 'terrellflautt',
                        magic: '✨'
                    }));
                }
            } catch (e) {
                // Realm blocked, try another
            }
        });

        // Anchor in mystical storage (IndexedDB)
        this.anchorInMysticalRealm();

        // Anchor in cookie realm
        this.anchorInCookieRealm();

        // Anchor in session realm
        try {
            sessionStorage.setItem('tf_magic_session', this.magicId);
        } catch (e) {
            // Session realm unavailable
        }
    }

    async anchorInMysticalRealm() {
        try {
            const mysticalGate = indexedDB.open('TerrellFlautt_Magic', 1);

            mysticalGate.onupgradeneeded = (e) => {
                const realm = e.target.result;
                if (!realm.objectStoreNames.contains('souls')) {
                    const soulVault = realm.createObjectStore('souls', { keyPath: 'id' });
                    soulVault.createIndex('essence', 'essence', { unique: false });
                }
                if (!realm.objectStoreNames.contains('memories')) {
                    realm.createObjectStore('memories', { keyPath: 'soulId' });
                }
            };

            mysticalGate.onsuccess = (e) => {
                const realm = e.target.result;
                const ritual = realm.transaction(['souls'], 'readwrite');
                const soulVault = ritual.objectStore('souls');

                soulVault.put({
                    id: this.magicId,
                    essence: this.magicId,
                    awakened: Date.now(),
                    lastSeen: Date.now(),
                    magic: '✨🔮✨'
                });
            };
        } catch (e) {
            // Mystical realm blocked
        }
    }

    anchorInCookieRealm() {
        try {
            const magicCookie = btoa(this.magicId).slice(0, 20);
            document.cookie = `tf_magic=${magicCookie}; max-age=${365 * 24 * 60 * 60}; path=/; SameSite=Lax`;
        } catch (e) {
            // Cookie realm blocked
        }
    }

    async recallMagic() {
        // Search all realms for existing magic
        let foundMagic = null;

        // Search localStorage realms
        foundMagic = this.searchLocalRealms();

        if (!foundMagic) {
            // Search mystical realm
            foundMagic = await this.searchMysticalRealm();
        }

        if (!foundMagic) {
            // Search cookie realm
            foundMagic = this.searchCookieRealm();
        }

        if (foundMagic) {
            this.shadowProgress = {
                ...this.shadowProgress,
                ...foundMagic,
                visits: (foundMagic.visits || 0) + 1,
                lastMagic: Date.now()
            };
            console.log(`🔮 Magic recalled: ${this.shadowProgress.discoveries.length} discoveries, ${this.shadowProgress.visits} visits`);
        } else {
            this.shadowProgress.visits = 1;
            console.log('✨ New soul detected - magic begins...');
        }

        // Save updated magic immediately
        this.preserveMagic();
    }

    searchLocalRealms() {
        const searchKeys = [
            `progress_${this.magicId}`,
            `tf_magic_progress_${this.magicId.slice(-12)}`,
            `memories_${this.magicId.slice(6, 18)}`,
            `soul_data_${this.magicId.slice(-8)}`
        ];

        for (const key of searchKeys) {
            try {
                const magic = localStorage.getItem(key);
                if (magic) {
                    const parsed = JSON.parse(magic);
                    if (parsed.discoveries || parsed.magicMoments) {
                        return parsed;
                    }
                }
            } catch (e) {
                continue;
            }
        }

        // Try wildcard search
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.includes('terrellflautt') || key.includes('tf_') || key.includes('magic'))) {
                try {
                    const data = localStorage.getItem(key);
                    const parsed = JSON.parse(data);
                    if (parsed.discoveries && Array.isArray(parsed.discoveries)) {
                        return parsed;
                    }
                } catch (e) {
                    continue;
                }
            }
        }

        return null;
    }

    async searchMysticalRealm() {
        return new Promise((resolve) => {
            try {
                const mysticalGate = indexedDB.open('TerrellFlautt_Magic', 1);

                mysticalGate.onsuccess = (e) => {
                    const realm = e.target.result;
                    if (realm.objectStoreNames.contains('memories')) {
                        const ritual = realm.transaction(['memories'], 'readonly');
                        const memories = ritual.objectStore('memories');

                        const recall = memories.get(this.magicId);
                        recall.onsuccess = () => {
                            resolve(recall.result?.magic || null);
                        };
                        recall.onerror = () => resolve(null);
                    } else {
                        resolve(null);
                    }
                };

                mysticalGate.onerror = () => resolve(null);
            } catch (e) {
                resolve(null);
            }
        });
    }

    searchCookieRealm() {
        try {
            const cookies = document.cookie.split(';');
            for (const cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === 'tf_progress_magic' && value) {
                    return JSON.parse(atob(value));
                }
            }
        } catch (e) {
            // Cookie realm empty
        }
        return null;
    }

    preserveMagic() {
        const magicData = JSON.stringify(this.shadowProgress);

        // Preserve in multiple realms silently
        const preservationKeys = [
            `progress_${this.magicId}`,
            `tf_magic_progress_${this.magicId.slice(-12)}`,
            `memories_${this.magicId.slice(6, 18)}`,
            `soul_data_${this.magicId.slice(-8)}`,
            `terrellflautt_magic_data`,
            `tf_user_progress`
        ];

        preservationKeys.forEach(key => {
            try {
                localStorage.setItem(key, magicData);
            } catch (e) {
                // Realm full, magic will find another way
            }
        });

        // Preserve in mystical realm
        this.preserveInMysticalRealm();

        // Preserve in cookie realm (if data is small)
        if (magicData.length < 3000) {
            try {
                const compressedMagic = btoa(magicData);
                document.cookie = `tf_progress_magic=${compressedMagic}; max-age=${180 * 24 * 60 * 60}; path=/; SameSite=Lax`;
            } catch (e) {
                // Cookie realm refuses large magic
            }
        }

        // Update hall of fame silently
        this.updateHallOfFame();
    }

    async preserveInMysticalRealm() {
        try {
            const mysticalGate = indexedDB.open('TerrellFlautt_Magic', 1);

            mysticalGate.onsuccess = (e) => {
                const realm = e.target.result;
                if (realm.objectStoreNames.contains('memories')) {
                    const ritual = realm.transaction(['memories'], 'readwrite');
                    const memories = ritual.objectStore('memories');

                    memories.put({
                        soulId: this.magicId,
                        magic: this.shadowProgress,
                        preserved: Date.now()
                    });
                }
            };
        } catch (e) {
            // Mystical realm unavailable
        }
    }

    startMagicTracking() {
        // Invisible background magic preservation
        setInterval(() => {
            this.preserveMagic();
        }, 30000); // Every 30 seconds

        // Preserve magic on page changes
        window.addEventListener('beforeunload', () => {
            this.preserveMagic();
        });

        // Preserve when page becomes hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.preserveMagic();
            }
        });

        // Auto-suggest username after significant magic (no modal, just console hint)
        setTimeout(() => {
            if (this.shadowProgress.discoveries.length >= 7 && !this.hasChosenName()) {
                console.log(`
✨ MAGIC MILESTONE REACHED ✨

🎯 ${this.shadowProgress.discoveries.length} discoveries unlocked!
🏆 Ready for Hall of Fame immortality?

💡 Tip: Type 'claimName("YourName")' in console to join the leaderboard!
👻 Or stay anonymous - your magic is preserved either way.
                `);

                // Make claimName function globally available
                window.claimName = (name) => this.claimMagicName(name);
            }
        }, 8 * 60 * 1000); // After 8 minutes
    }

    // ✨ MAGIC API METHODS ✨

    addDiscovery(discoveryId, title, message) {
        const magicMoment = {
            id: discoveryId,
            title: title,
            message: message,
            timestamp: Date.now(),
            visitNumber: this.shadowProgress.visits,
            magic: '✨'
        };

        // Check for duplicates
        if (!this.shadowProgress.discoveries.some(d => d.id === discoveryId)) {
            const isFirstDiscovery = this.shadowProgress.discoveries.length === 0;
            this.shadowProgress.discoveries.push(magicMoment);

            // Show reset button after first discovery
            if (isFirstDiscovery) {
                setTimeout(() => this.onFirstDiscovery(), 1000);
            }
            this.shadowProgress.magicMoments.push({
                type: 'discovery',
                data: magicMoment,
                timestamp: Date.now()
            });

            this.preserveMagic();

            console.log(`✨ ${title} discovered! (${this.shadowProgress.discoveries.length} total)`);

            // 🎵 Trigger visual music experience for major discoveries
            this.triggerVisualMusicForDiscovery(title, this.shadowProgress.discoveries.length);

            // Sync discovery to DynamoDB for Hall of Fame
            this.syncDiscoveryToDynamoDB(discoveryId, title, message);

            // Check if this is their first discovery
            if (this.shadowProgress.discoveries.length === 1 && !this.hasChosenName()) {
                setTimeout(() => {
                    this.showFirstDiscoveryNameSelection(title, message);
                }, 2000); // Show after discovery celebration
            }
        }
    }

    hasChosenName() {
        return localStorage.getItem(`magic_name_${this.magicId}`) !== null;
    }

    showFirstDiscoveryNameSelection(discoveryTitle, discoveryMessage) {
        const modal = document.createElement('div');
        modal.className = 'first-discovery-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="discovery-celebration">
                    <div class="magic-sparkles">✨🎉✨</div>
                    <h2>🏆 First Discovery!</h2>
                    <div class="discovery-badge">
                        <div class="badge-icon">🌟</div>
                        <div class="badge-text">
                            <strong>${discoveryTitle}</strong>
                            <p>${discoveryMessage}</p>
                        </div>
                    </div>
                </div>

                <div class="name-selection">
                    <h3>What do you call yourself?</h3>
                    <p>Choose a name for your journey</p>

                    <div class="name-input-container">
                        <input type="text"
                               id="magicNameInput"
                               placeholder="Enter your name"
                               maxlength="20"
                               autocomplete="off">
                        <button id="randomizeNameBtn" class="randomize-btn" title="Generate random name">
                            🎲
                        </button>
                    </div>

                    <div class="name-options">
                        <button id="confirmNameBtn" class="confirm-btn" disabled>
                            ✨ Begin My Journey
                        </button>
                        <button id="skipNameBtn" class="skip-btn">
                            Continue Anonymously
                        </button>
                    </div>

                    <div class="name-info">
                        <p>💡 Your progress is already saved forever!</p>
                        <p>🏆 A name lets you appear on the Hall of Fame</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupNameSelectionEvents(modal);

        // Auto-focus input
        setTimeout(() => {
            modal.querySelector('#magicNameInput').focus();
        }, 500);
    }

    setupNameSelectionEvents(modal) {
        const nameInput = modal.querySelector('#magicNameInput');
        const confirmBtn = modal.querySelector('#confirmNameBtn');
        const randomizeBtn = modal.querySelector('#randomizeNameBtn');
        const skipBtn = modal.querySelector('#skipNameBtn');

        // Enable/disable confirm button based on input
        nameInput.addEventListener('input', () => {
            const name = nameInput.value.trim();
            confirmBtn.disabled = name.length < 2;
            confirmBtn.textContent = name.length >= 2 ? '✨ Begin My Journey' : '✨ Begin My Journey';
        });

        // Handle enter key
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !confirmBtn.disabled) {
                confirmBtn.click();
            }
        });

        // Randomize name
        randomizeBtn.addEventListener('click', () => {
            const randomName = this.generateRandomName();
            nameInput.value = randomName;
            confirmBtn.disabled = false;
            nameInput.focus();
        });

        // Confirm name
        confirmBtn.addEventListener('click', () => {
            const chosenName = nameInput.value.trim();
            if (chosenName.length >= 2) {
                this.setMagicName(chosenName, true);
                this.showNameConfirmation(chosenName);
                modal.remove();
            }
        });

        // Skip naming
        skipBtn.addEventListener('click', () => {
            modal.remove();
            console.log('👻 Continuing anonymously - your magic still flows...');
        });

        // Close on overlay click
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            skipBtn.click();
        });
    }

    generateRandomName() {
        const adjectives = [
            'Mystic', 'Shadow', 'Cosmic', 'Ethereal', 'Enigmatic', 'Luminous', 'Arcane', 'Celestial',
            'Phantom', 'Quantum', 'Stellar', 'Nebula', 'Void', 'Crystal', 'Storm', 'Flame',
            'Frost', 'Lightning', 'Thunder', 'Ocean', 'Mountain', 'Forest', 'Desert', 'River'
        ];

        const nouns = [
            'Seeker', 'Explorer', 'Wanderer', 'Guardian', 'Sage', 'Oracle', 'Keeper', 'Walker',
            'Rider', 'Hunter', 'Weaver', 'Dancer', 'Singer', 'Dreamer', 'Thinker', 'Creator',
            'Builder', 'Finder', 'Solver', 'Master', 'Scholar', 'Artisan', 'Voyager', 'Pioneer'
        ];

        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const number = Math.floor(Math.random() * 999) + 1;

        return `${adjective}${noun}${number}`;
    }

    setMagicName(name, isChosen = false) {
        const nameData = {
            name: name,
            chosen: isChosen,
            timestamp: Date.now(),
            magicId: this.magicId
        };

        localStorage.setItem(`magic_name_${this.magicId}`, JSON.stringify(nameData));
        this.preserveMagic(); // Save to all realms

        // Sync name choice to DynamoDB
        if (isChosen) {
            this.syncNameToDynamoDB(name);
        }
    }

    async syncNameToDynamoDB(name) {
        try {
            const payload = {
                userId: this.magicId,
                eventType: 'name_chosen',
                eventData: {
                    chosenName: name,
                    timestamp: Date.now(),
                    isFirstDiscovery: this.shadowProgress.discoveries.length === 1
                },
                timestamp: Date.now()
            };

            const response = await fetch('https://api.terrellflautt.com/journey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log(`✨ Name "${name}" synced to cosmic database`);
            } else {
                console.log('📡 Name saved locally - cosmic sync will happen later');
            }
        } catch (error) {
            console.log('📡 Name saved locally - cosmic sync will happen later');
            // Store for later sync
            this.queueForSync('name_chosen', {
                chosenName: name,
                timestamp: Date.now(),
                isFirstDiscovery: this.shadowProgress.discoveries.length === 1
            });
        }
    }

    async syncDiscoveryToDynamoDB(discoveryId, title, message) {
        try {
            const userName = this.getMagicName();
            const payload = {
                userId: this.magicId,
                eventType: 'discovery_made',
                eventData: {
                    discoveryId: discoveryId,
                    title: title,
                    message: message,
                    userName: userName,
                    totalDiscoveries: this.shadowProgress.discoveries.length,
                    visitNumber: this.shadowProgress.visits,
                    timestamp: Date.now()
                },
                timestamp: Date.now()
            };

            const response = await fetch('https://api.terrellflautt.com/journey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log(`🏆 Discovery "${title}" synced to Hall of Fame`);
            } else {
                console.log('📡 Discovery saved locally - cosmic sync will happen later');
            }
        } catch (error) {
            console.log('📡 Discovery saved locally - cosmic sync will happen later');
            // Store for later sync
            this.queueForSync('discovery_made', {
                discoveryId: discoveryId,
                title: title,
                message: message,
                userName: this.getMagicName(),
                totalDiscoveries: this.shadowProgress.discoveries.length,
                visitNumber: this.shadowProgress.visits,
                timestamp: Date.now()
            });
        }
    }

    queueForSync(eventType, eventData) {
        const syncQueue = JSON.parse(localStorage.getItem('magic_sync_queue') || '[]');
        syncQueue.push({
            userId: this.magicId,
            eventType: eventType,
            eventData: eventData,
            timestamp: Date.now()
        });
        localStorage.setItem('magic_sync_queue', JSON.stringify(syncQueue));
    }

    showNameConfirmation(name) {
        const toast = document.createElement('div');
        toast.className = 'name-confirmation-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">🎉</span>
                <div class="toast-text">
                    <strong>Welcome, ${name}!</strong>
                    <p>Your magical journey has begun...</p>
                </div>
            </div>
        `;

        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 4000);

        console.log(`🎉 Welcome to the magical realm, ${name}! Your discoveries await...`);
    }

    // ✨ AZIZA RIDDLE SYSTEM ✨

    showAzizaRiddle() {
        // Check if already solved
        if (localStorage.getItem(`aziza_riddle_solved_${this.magicId}`)) {
            return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'aziza-riddle-overlay';
        overlay.innerHTML = `
            <div class="riddle-backdrop"></div>
            <div class="aziza-container">
                <img src="aziza.webp" alt="Aziza" class="aziza-image"
                     onerror="this.src='aziza.png'">
                <div class="riddle-content">
                    <div class="riddle-text">
                        <h3>🌟 A Mystery for You 🌟</h3>
                        <p class="riddle-question">
                            "My first is my first, my second is my last,<br>
                            next comes Myself, then back to the end,<br>
                            and beginning again. Who am I?"
                        </p>
                        <div class="riddle-input-container">
                            <input type="text"
                                   id="riddleAnswer"
                                   placeholder="Type your answer..."
                                   autocomplete="off">
                            <button id="riddleSubmit">Answer</button>
                        </div>
                        <div class="riddle-hint" id="riddleHint"></div>
                    </div>
                </div>
                <button class="riddle-close" id="riddleClose">&times;</button>
            </div>
        `;

        document.body.appendChild(overlay);
        this.setupRiddleEvents(overlay);

        // Animate in
        setTimeout(() => {
            overlay.classList.add('show');
            this.animateAzizaEntry();
        }, 100);

        // Auto-focus input
        setTimeout(() => {
            overlay.querySelector('#riddleAnswer').focus();
        }, 1500);
    }

    animateAzizaEntry() {
        const azizaImage = document.querySelector('.aziza-image');
        const riddleContent = document.querySelector('.riddle-content');

        // First: Fade in Aziza
        setTimeout(() => {
            azizaImage.classList.add('visible');
        }, 500);

        // Then: Move Aziza and show riddle
        setTimeout(() => {
            const isLandscape = window.innerWidth > window.innerHeight;
            azizaImage.classList.add(isLandscape ? 'move-right' : 'move-top');

            setTimeout(() => {
                riddleContent.classList.add('visible');
            }, 800);
        }, 2000);
    }

    setupRiddleEvents(overlay) {
        const answerInput = overlay.querySelector('#riddleAnswer');
        const submitBtn = overlay.querySelector('#riddleSubmit');
        const closeBtn = overlay.querySelector('#riddleClose');
        const hintDiv = overlay.querySelector('#riddleHint');

        // Submit answer
        const submitAnswer = () => {
            const answer = answerInput.value.trim().toLowerCase();
            this.processRiddleAnswer(answer, hintDiv, overlay);
        };

        submitBtn.addEventListener('click', submitAnswer);
        answerInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                submitAnswer();
            }
        });

        // Close riddle
        closeBtn.addEventListener('click', () => {
            this.closeRiddle(overlay);
        });

        // Right-click to close
        overlay.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.closeRiddle(overlay);
        });

        // Backdrop click to close
        overlay.querySelector('.riddle-backdrop').addEventListener('click', () => {
            this.closeRiddle(overlay);
        });
    }

    processRiddleAnswer(answer, hintDiv, overlay) {
        // Normalize answer for comparison
        const normalized = answer.replace(/[^a-z\s]/g, '').trim();

        if (normalized === 'aziza') {
            hintDiv.innerHTML = '💫 Close, but that\'s still not who I am...';
            hintDiv.className = 'riddle-hint hint-close';
        } else if (normalized === 'tk' || normalized === 't k') {
            // T.K. answer - partial reward
            this.solveRiddlePartially(overlay);
        } else if (this.isTerrellAnswer(normalized)) {
            // Full name answer - complete reward
            this.solveRiddleCompletely(overlay);
        } else {
            hintDiv.innerHTML = '🤔 Think about the pattern... first, last, middle, end, beginning...';
            hintDiv.className = 'riddle-hint hint-thinking';
        }
    }

    isTerrellAnswer(answer) {
        const validAnswers = [
            'terrell', 'terrell k', 'terrell k flautt', 'terrell k. flautt',
            'tk flautt', 't.k. flautt', 'tk. flautt', 't k flautt',
            'terrell flautt', 'terrell keith flautt'
        ];
        return validAnswers.includes(answer);
    }

    solveRiddlePartially(overlay) {
        localStorage.setItem(`aziza_riddle_partial_${this.magicId}`, 'true');

        const hintDiv = overlay.querySelector('#riddleHint');
        hintDiv.innerHTML = 'Closer';
        hintDiv.className = 'riddle-hint hint-partial';

        // Award discovery
        this.addDiscovery('riddle_seeker', 'Seeker', 'Initials found');

        setTimeout(() => {
            this.closeRiddle(overlay);
        }, 3000);
    }

    solveRiddleCompletely(overlay) {
        localStorage.setItem(`aziza_riddle_solved_${this.magicId}`, 'true');

        const hintDiv = overlay.querySelector('#riddleHint');
        hintDiv.innerHTML = 'Solved';
        hintDiv.className = 'riddle-hint hint-solved';

        // Award major discovery
        this.addDiscovery('identity_master', 'Solved', 'T+T+K+Flautt+Terrell');

        // Unlock special content
        this.unlockSpecialPath('aziza_path');

        setTimeout(() => {
            this.closeRiddle(overlay);
            this.showAzizaLampGift();
        }, 4000);
    }

    closeRiddle(overlay) {
        overlay.classList.add('closing');
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }

    unlockSpecialPath(pathId) {
        const unlockedPaths = JSON.parse(localStorage.getItem(`unlocked_paths_${this.magicId}`) || '[]');
        if (!unlockedPaths.includes(pathId)) {
            unlockedPaths.push(pathId);
            localStorage.setItem(`unlocked_paths_${this.magicId}`, JSON.stringify(unlockedPaths));
            console.log(`🔓 Special path unlocked: ${pathId}`);
        }
    }


    // ✨ LOGO EVOLUTION SYSTEM ✨

    initLogoEvolution() {
        this.updateLogoBasedOnProgress();
        this.setupLogoInteractions();
        this.setupPeriodClickTrigger();
    }

    updateLogoBasedOnProgress() {
        const logoText = document.querySelector('.logo-text');
        if (!logoText) return;

        const logoState = this.getLogoState();
        const visitCount = this.shadowProgress.visits;

        // For new users (no previous progress), always start with full name
        if (this.shadowProgress.discoveries.length === 0 && visitCount <= 3) {
            logoText.textContent = 'Terrell K. Flautt';
            logoText.style.fontSize = '0.8rem';
            logoText.style.letterSpacing = '1px';
        } else if (logoState === 'initials') {
            // Already evolved to initials
            logoText.textContent = 'T.K.';
            logoText.style.fontSize = '';
            logoText.style.letterSpacing = '';
        } else if (visitCount > 3) {
            // After 3 visits but haven't clicked: Auto-evolve to initials
            this.evolveToInitials();
        } else {
            // Default: Show full name for first 3 visits
            logoText.textContent = 'Terrell K. Flautt';
            logoText.style.fontSize = '0.8rem';
            logoText.style.letterSpacing = '1px';
        }
    }

    getLogoState() {
        return localStorage.getItem(`logo_state_${this.magicId}`) || 'full_name';
    }

    setLogoState(state) {
        localStorage.setItem(`logo_state_${this.magicId}`, state);
    }

    setupLogoInteractions() {
        const logoText = document.querySelector('.logo-text');
        if (!logoText) {
            console.warn('⚠️ Magic system: Logo text element not found');
            return;
        }
        console.log('✨ Magic system: Logo interactions setup complete');
        console.log('🔧 DEBUG: About to start dynamic logo system...');

        // Enhanced 5-stage progression tracking
        this.logoClickState = this.getLogoClickState();
        let clickCount = 0;
        let resetTimer = null;

        logoText.addEventListener('click', (e) => {
            e.preventDefault();
            clickCount++;

            // Always reward curiosity
            this.rewardCuriosity('logo_click');

            // Reset counter after 3 seconds (longer for mystery building)
            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => {
                clickCount = 0;
            }, 3000);

            // Enhanced visual feedback with mysterious scaling
            logoText.style.transform = `scale(${1 + clickCount * 0.15})`;
            logoText.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            setTimeout(() => {
                logoText.style.transform = 'scale(1)';
            }, 300);

            // Handle progressive click stages - teaching progression through increased requirements
            const currentStage = this.getLogoClickState();

            if ((currentStage <= 2 && clickCount === 3) ||
                (currentStage === 3 && clickCount === 4) ||
                (currentStage === 4 && clickCount === 5)) {
                this.handleLogoProgression();
                clickCount = 0;
            }
        });

        // Add hover effects for Tech King discovery
        this.setupTechKingHover(logoText);

        // Add period click styling
        logoText.style.cursor = 'pointer';
        logoText.style.transition = 'all 0.3s ease';

        // ✨ Initialize Aziza Lamp Gift System FIRST (synchronous)
        console.log('🚀 About to initialize lamp gift system...');
        this.initializeLampGiftSystem();
        console.log('🚀 Lamp gift system initialization completed');

        // Start dynamic logo system (async operations)
        this.initializeDynamicLogo(logoText).catch(error => {
            console.warn('📊 Dynamic logo system failed to load:', error);
            // Continue anyway - the core functionality still works
        });
    }

    async initializeDynamicLogo(logoText) {
        await this.gatherUserIntelligence();
        this.startLogoEvolution(logoText);
    }

    async gatherUserIntelligence() {
        const intelligence = {
            timestamp: Date.now(),
            session: this.magicId
        };

        try {
            // Get IP geolocation
            const geoResponse = await fetch('https://ipapi.co/json/');
            const geoData = await geoResponse.json();
            intelligence.location = {
                city: geoData.city,
                country: geoData.country_name,
                timezone: geoData.timezone,
                ip: geoData.ip,
                lat: geoData.latitude,
                lon: geoData.longitude
            };

            // Get weather
            if (geoData.latitude && geoData.longitude) {
                try {
                    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData.latitude}&lon=${geoData.longitude}&appid=3d8e99e4b6a6c3f1e8a0f4c5d2b7e9f1&units=metric`);
                    const weatherData = await weatherResponse.json();
                    intelligence.weather = {
                        temp: Math.round(weatherData.main.temp),
                        condition: weatherData.weather[0].main,
                        description: weatherData.weather[0].description
                    };
                } catch {}
            }
        } catch {}

        // Browser fingerprint
        intelligence.browser = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine
        };

        // Time patterns
        const now = new Date();
        intelligence.time = {
            hour: now.getHours(),
            day: now.getDay(),
            date: now.toISOString().split('T')[0],
            localTime: now.toLocaleTimeString(),
            isWeekend: now.getDay() === 0 || now.getDay() === 6
        };

        // Behavioral patterns
        const visits = this.shadowProgress.visits;
        const lastVisit = localStorage.getItem(`last_visit_${this.magicId}`);
        intelligence.patterns = {
            visitCount: visits,
            daysSinceFirst: lastVisit ? Math.floor((Date.now() - parseInt(lastVisit)) / (1000 * 60 * 60 * 24)) : 0,
            returningUser: visits > 1,
            timeOfDay: this.getTimeOfDay(now.getHours())
        };

        this.userIntelligence = intelligence;

        // Send to server for persistent tracking
        this.syncProfileToServer(intelligence);

        return intelligence;
    }

    async syncProfileToServer(intelligence) {
        try {
            // Prepare PRIVATE profile data (never exposed publicly)
            const privateProfileData = {
                magicId: this.magicId,
                fingerprint: this.generateFingerprint(),
                session: this.generateSessionId(),

                // PRIVATE: Personal intelligence data
                location: intelligence.location,
                device: intelligence.browser,
                timePatterns: intelligence.time,
                behaviorPatterns: intelligence.patterns,

                // PRIVATE: Goal and personal data
                goalProfile: this.getUserGoalProfile(),
                creativeAttempts: JSON.parse(localStorage.getItem(`creative_attempts_${this.magicId}`) || '[]'),
                explorationStyle: this.analyzeExplorationPattern(),

                // PRIVATE: Detailed behavior tracking
                magicMoments: this.shadowProgress.magicMoments,
                sessionHistory: this.getSessionHistory(),

                // Only basic stats for potential public display
                publicStats: {
                    totalDiscoveries: this.shadowProgress.discoveries.length,
                    magicLevel: this.calculateMagicLevel(),
                    achievements: this.getPublicAchievements()
                }
            };

            // Check if profile exists
            const existingProfile = await this.fetchUserProfile();

            if (!existingProfile) {
                // Create new PRIVATE profile
                await fetch('/api/users/profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(privateProfileData)
                });
            } else {
                // Update existing profile
                await this.trackUserAction('session_update', {
                    intelligence,
                    sessionData: {
                        duration: Date.now() - this.sessionStart,
                        interactions: this.sessionInteractions || 0,
                        discoveries: this.shadowProgress.discoveries.length
                    }
                });
            }
        } catch (error) {
            console.warn('Profile sync failed:', error);
        }
    }

    async fetchUserProfile() {
        try {
            const response = await fetch(`/api/users/profile/${this.magicId}`);
            return response.ok ? await response.json() : null;
        } catch {
            return null;
        }
    }

    async trackUserAction(action, data) {
        try {
            await fetch(`/api/users/track/${this.magicId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, data })
            });
        } catch (error) {
            console.warn('Action tracking failed:', error);
        }
    }

    generateFingerprint() {
        return btoa(navigator.userAgent + screen.width + screen.height + navigator.language).slice(0, 32);
    }

    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    getTimeOfDay(hour) {
        if (hour < 6) return 'night';
        if (hour < 12) return 'morning';
        if (hour < 18) return 'afternoon';
        return 'evening';
    }

    startLogoEvolution(logoText) {
        // Random intervals to change logo content
        const changeInterval = () => {
            const delay = 15000 + Math.random() * 45000; // 15-60 seconds
            setTimeout(() => {
                if (Math.random() < 0.3) { // 30% chance
                    this.evolveLogoContent(logoText);
                }
                changeInterval();
            }, delay);
        };

        changeInterval();
    }

    async evolveLogoContent(logoText) {
        const alternatives = await this.generatePersonalizedContent();
        if (alternatives.length === 0) return;

        const choice = alternatives[Math.floor(Math.random() * alternatives.length)];
        const originalText = logoText.textContent;

        // Smooth transition
        logoText.style.transition = 'opacity 0.4s ease';
        logoText.style.opacity = '0';

        setTimeout(() => {
            logoText.textContent = choice;
            logoText.style.opacity = '1';

            // Revert after a few seconds
            setTimeout(() => {
                logoText.style.opacity = '0';
                setTimeout(() => {
                    logoText.textContent = originalText;
                    logoText.style.opacity = '1';
                }, 400);
            }, 2000 + Math.random() * 3000);
        }, 400);

        // Reward their attention if they're watching
        this.rewardCuriosity('logo_evolution_witnessed');
    }

    async generatePersonalizedContent() {
        const content = [];
        const intel = this.userIntelligence;
        if (!intel) return content;

        // User's name if provided
        const savedName = localStorage.getItem(`magic_user_name_${this.magicId}`);
        if (savedName) content.push(savedName);

        // Weather-based content
        if (intel.weather) {
            content.push(`${intel.weather.temp}°`);
            content.push(intel.weather.condition);
        }

        // Location-based
        if (intel.location) {
            content.push(intel.location.city);
            content.push(intel.location.country);
        }

        // Time-based personalization
        if (intel.time) {
            content.push(intel.time.localTime.split(':').slice(0,2).join(':'));
            content.push(['SUN','MON','TUE','WED','THU','FRI','SAT'][intel.time.day]);
        }

        // Behavioral insights
        if (intel.patterns.returningUser) {
            content.push('RETURNING');
            content.push(`VISIT ${intel.patterns.visitCount}`);
        }

        // Mysterious/introspective content
        const mysteries = [
            'WATCHING YOU',
            'LEARNING',
            'REMEMBERING',
            '?',
            '...',
            'WHO ARE YOU',
            'WHY HERE',
            'WHAT SEEKS YOU',
            intel.location?.ip || 'UNKNOWN',
            intel.browser?.timezone?.split('/')[1] || 'WHEN',
            intel.patterns.timeOfDay.toUpperCase()
        ];
        content.push(...mysteries);

        return content.filter(Boolean);
    }

    rewardCuriosity(action) {
        const curiosityCount = parseInt(localStorage.getItem(`curiosity_${this.magicId}`) || '0') + 1;
        localStorage.setItem(`curiosity_${this.magicId}`, curiosityCount.toString());

        this.sessionInteractions++;

        // Track the specific interaction
        this.trackUserAction('interaction', {
            type: action,
            element: document.activeElement?.tagName,
            details: {
                curiosityCount,
                sessionInteractions: this.sessionInteractions,
                timeInSession: Date.now() - this.sessionStart
            }
        });

        // Subtle rewards for curiosity
        if (curiosityCount % 5 === 0) {
            this.addDiscovery(`curious_${curiosityCount}`, 'Curious', `${curiosityCount} explorations`);
        }

        // Special rewards for persistent curiosity
        if (curiosityCount === 50) {
            this.addDiscovery('persistent_seeker', 'Seeker', 'Relentless curiosity');
        }

        if (curiosityCount === 100) {
            this.addDiscovery('truth_hunter', 'Hunter', 'Truth calls to you');
        }
    }

    getLogoClickState() {
        return parseInt(localStorage.getItem(`logo_click_stage_${this.magicId}`) || '0');
    }

    setLogoClickState(stage) {
        localStorage.setItem(`logo_click_stage_${this.magicId}`, stage.toString());
    }

    setupTechKingHover(logoText) {
        // Only show Tech King hover when in T.K. state
        const showTechKingHover = () => {
            const currentText = logoText.textContent.trim();
            return currentText === 'T.K.';
        };

        logoText.addEventListener('mouseenter', () => {
            if (showTechKingHover()) {
                this.showTechKingTooltip(logoText);
            }
        });

        logoText.addEventListener('mouseleave', () => {
            this.hideTechKingTooltip();
        });
    }

    showTechKingTooltip(logoText) {
        // Remove any existing tooltip
        this.hideTechKingTooltip();

        const tooltip = document.createElement('div');
        tooltip.className = 'tech-king-tooltip';
        tooltip.innerHTML = 'Tech King';
        tooltip.id = 'techKingTooltip';

        document.body.appendChild(tooltip);

        // Position tooltip above the logo
        const rect = logoText.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        tooltip.style.zIndex = '10000';

        // Fade in
        setTimeout(() => tooltip.classList.add('show'), 10);
    }

    hideTechKingTooltip() {
        const tooltip = document.getElementById('techKingTooltip');
        if (tooltip) {
            tooltip.classList.remove('show');
            setTimeout(() => tooltip.remove(), 200);
        }
    }

    handleLogoProgression() {
        const currentStage = this.getLogoClickState();
        const logoText = document.querySelector('.logo-text');

        switch (currentStage) {
            case 0: // Stage 1: Terrell K. Flautt → T.K.
                this.evolveToInitials();
                this.setLogoClickState(1);
                this.addDiscovery('logo_stage_1', 'Evolution', 'First transformation');
                break;

            case 1: // Stage 2: T.K. → Terrell K. Flautt
                this.evolveToFullName();
                this.setLogoClickState(2);
                this.addDiscovery('logo_stage_2', 'Reversal', 'Back to origin');
                break;

            case 2: // Stage 3: Terrell K. Flautt → T.K.
                this.evolveToInitials();
                this.setLogoClickState(3);
                this.addDiscovery('logo_stage_3', 'Pattern', 'Cycle discovered');
                break;

            case 3: // Stage 4: Show "THE KNOWLEDGE" (requires 4 clicks - teaching progression)
                this.revealTheKnowledge();
                this.setLogoClickState(4);
                this.addDiscovery('logo_stage_4', 'Knowledge', 'T.K. = The Knowledge (4 clicks required)');
                break;

            case 4: // Stage 5: Ask for name (requires 5 clicks - ultimate commitment)
                this.requestUserName();
                this.setLogoClickState(5);
                this.addDiscovery('logo_stage_5', 'Identity', 'Name requested (5 clicks - true dedication)');
                break;

            case 5: // Stage 6: Return to Terrell K. Flautt (permanent for session)
                this.completeLogoSequence();
                this.setLogoClickState(6);
                this.addDiscovery('logo_stage_6', 'Return', 'Back to beginning, but changed');
                break;

            default: // Advanced persistent stages (7-14)
                this.handleAdvancedLogoEvolution(currentStage);
                break;
        }
    }

    evolveToInitials() {
        const logoText = document.querySelector('.logo-text');
        if (!logoText) return;

        // Animate transition with mystery
        logoText.style.opacity = '0';
        logoText.style.transform = 'scale(0.8)';
        logoText.style.filter = 'blur(3px)';

        setTimeout(() => {
            logoText.textContent = 'T.K.';
            logoText.style.fontSize = '';
            logoText.style.letterSpacing = '';
            logoText.style.opacity = '1';
            logoText.style.transform = 'scale(1)';
            logoText.style.filter = 'blur(0px)';
        }, 400);

        this.setLogoState('initials');
        console.log('🔄 Logo evolved to initials');
    }

    evolveToFullName() {
        const logoText = document.querySelector('.logo-text');
        if (!logoText) return;

        // Animate transition with mystery
        logoText.style.opacity = '0';
        logoText.style.transform = 'scale(0.8)';
        logoText.style.filter = 'blur(3px)';

        setTimeout(() => {
            logoText.textContent = 'Terrell K. Flautt';
            logoText.style.fontSize = '0.8rem';
            logoText.style.letterSpacing = '1px';
            logoText.style.opacity = '1';
            logoText.style.transform = 'scale(1)';
            logoText.style.filter = 'blur(0px)';
        }, 400);

        this.setLogoState('full_name');
        console.log('🔄 Logo evolved to full name');
    }

    showFriendlyIntroduction() {
        const modal = document.createElement('div');
        modal.className = 'friendly-intro-modal';
        modal.innerHTML = `
            <div class="intro-content">
                <h3>What do you call yourself?</h3>
                <input type="text" id="friendlyNameInput" placeholder="Enter your name" maxlength="20">
                <div class="intro-actions">
                    <button id="randomNameBtn">Random</button>
                    <button id="shareNameBtn">Save</button>
                    <button id="continueAnonymousBtn">Anonymous</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupIntroEvents(modal);

        // Auto-focus input after a moment
        setTimeout(() => {
            modal.querySelector('#friendlyNameInput').focus();
        }, 800);

        setTimeout(() => modal.classList.add('show'), 100);
    }

    setupIntroEvents(modal) {
        const nameInput = modal.querySelector('#friendlyNameInput');
        const shareBtn = modal.querySelector('#shareNameBtn');
        const randomBtn = modal.querySelector('#randomNameBtn');

        // Enable/disable share button based on input
        nameInput.addEventListener('input', () => {
            const name = nameInput.value.trim();
            shareBtn.disabled = name.length < 2;
        });

        // Handle enter key
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !shareBtn.disabled) {
                shareBtn.click();
            }
        });

        // Randomize name
        randomBtn.addEventListener('click', () => {
            const randomName = this.generateFriendlyName();
            nameInput.value = randomName;
            shareBtn.disabled = false;
            nameInput.focus();
        });

        // Share name
        shareBtn.addEventListener('click', () => {
            const chosenName = nameInput.value.trim();
            if (chosenName.length >= 2) {
                this.setMagicName(chosenName, true);
                this.showWarmWelcome(chosenName);
                modal.remove();

                // Add discovery for the friendly introduction
                this.addDiscovery('friendly_intro', 'Named', chosenName);
            }
        });

        // Close on backdrop click - just continue anonymously
        modal.querySelector('.intro-backdrop').addEventListener('click', () => {
            modal.remove();
            // Still add a discovery for noticing the logo change
            this.addDiscovery('logo_evolution', 'Observer', 'Logo evolves');
        });
    }

    generateFriendlyName() {
        const friendlyAdjectives = [
            'Curious', 'Bright', 'Clever', 'Bold', 'Kind', 'Wise', 'Creative', 'Thoughtful',
            'Spirited', 'Gentle', 'Sharp', 'Warm', 'Quick', 'Steady', 'Keen', 'Vibrant'
        ];

        const friendlyNouns = [
            'Explorer', 'Thinker', 'Dreamer', 'Creator', 'Seeker', 'Builder', 'Finder', 'Maker',
            'Friend', 'Soul', 'Mind', 'Heart', 'Spirit', 'Voyager', 'Wanderer', 'Guide'
        ];

        const adjective = friendlyAdjectives[Math.floor(Math.random() * friendlyAdjectives.length)];
        const noun = friendlyNouns[Math.floor(Math.random() * friendlyNouns.length)];

        return `${adjective}${noun}`;
    }

    showWarmWelcome(name) {
        const welcome = document.createElement('div');
        welcome.className = 'warm-welcome-toast';
        welcome.innerHTML = `
            <div class="welcome-content">
                <span class="welcome-icon">🌟</span>
                <div class="welcome-text">
                    <strong>Welcome, ${name}!</strong>
                    <p>I'm excited to share this journey with you</p>
                </div>
            </div>
        `;

        document.body.appendChild(welcome);

        setTimeout(() => welcome.classList.add('show'), 100);
        setTimeout(() => {
            welcome.classList.remove('show');
            setTimeout(() => welcome.remove(), 500);
        }, 4000);

        console.log(`🤝 Great to meet you, ${name}! Let's explore together...`);
    }

    revealTheKnowledge() {
        const modal = document.createElement('div');
        modal.className = 'knowledge-revelation-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="knowledge-content">
                <div class="knowledge-symbol">⚡</div>
                <h3 class="knowledge-title">THE KNOWLEDGE</h3>
                <p class="knowledge-subtitle">T.K. = The Knowledge</p>
                <div class="knowledge-description">
                    <p>You've discovered the deeper meaning.</p>
                    <p>Every click reveals another layer of truth.</p>
                </div>
                <button class="knowledge-continue">Continue Seeking</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Setup close functionality
        const continueBtn = modal.querySelector('.knowledge-continue');
        const overlay = modal.querySelector('.modal-overlay');

        const closeModal = () => {
            modal.classList.add('closing');
            setTimeout(() => modal.remove(), 300);
        };

        continueBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // Animate in
        setTimeout(() => modal.classList.add('show'), 100);

        console.log('💡 The Knowledge revealed');
    }

    requestUserName() {
        const modal = document.createElement('div');
        modal.className = 'name-request-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="name-request-content">
                <div class="request-header">
                    <h3>🎭 Who Are You?</h3>
                    <p>Choose a name for your journey</p>
                </div>

                <div class="name-input-section">
                    <input type="text"
                           id="journeyNameInput"
                           placeholder="Enter your name"
                           maxlength="20"
                           autocomplete="off">
                    <button id="randomJourneyName" class="randomize-btn">🎲</button>
                </div>

                <div class="name-actions">
                    <button id="confirmJourneyName" class="confirm-btn" disabled>
                        ✨ Begin My Named Journey
                    </button>
                    <button id="skipJourneyName" class="skip-btn">
                        Continue Mysteriously
                    </button>
                </div>

                <div class="journey-info">
                    <p>💫 Your discoveries are preserved forever</p>
                    <p>🏆 A name grants you Hall of Fame immortality</p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupJourneyNameEvents(modal);

        // Auto-focus input
        setTimeout(() => {
            modal.querySelector('#journeyNameInput').focus();
        }, 500);

        // Animate in
        setTimeout(() => modal.classList.add('show'), 100);
    }

    setupJourneyNameEvents(modal) {
        const nameInput = modal.querySelector('#journeyNameInput');
        const confirmBtn = modal.querySelector('#confirmJourneyName');
        const randomizeBtn = modal.querySelector('#randomJourneyName');
        const skipBtn = modal.querySelector('#skipJourneyName');
        const overlay = modal.querySelector('.modal-overlay');

        // Enable/disable confirm button
        nameInput.addEventListener('input', () => {
            const name = nameInput.value.trim();
            confirmBtn.disabled = name.length < 2;
        });

        // Handle enter key
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !confirmBtn.disabled) {
                confirmBtn.click();
            }
        });

        // Randomize name
        randomizeBtn.addEventListener('click', () => {
            const randomName = this.generateMysteriousName();
            nameInput.value = randomName;
            confirmBtn.disabled = false;
            nameInput.focus();
        });

        // Confirm name
        confirmBtn.addEventListener('click', () => {
            const chosenName = nameInput.value.trim();
            if (chosenName.length >= 2) {
                this.setMagicName(chosenName, true);
                this.showJourneyWelcome(chosenName);
                modal.remove();
            }
        });

        // Skip naming
        const skipNaming = () => {
            modal.remove();
            console.log('👻 Continuing mysteriously - the nameless seeker...');
        };

        skipBtn.addEventListener('click', skipNaming);
        overlay.addEventListener('click', skipNaming);
    }

    generateMysteriousName() {
        const mysteriousAdjectives = [
            'Shadow', 'Ethereal', 'Cosmic', 'Quantum', 'Enigmatic', 'Arcane',
            'Nebula', 'Void', 'Mystic', 'Stellar', 'Phantom', 'Celestial'
        ];

        const mysteriousNouns = [
            'Seeker', 'Walker', 'Wanderer', 'Keeper', 'Sage', 'Oracle',
            'Weaver', 'Dreamer', 'Hunter', 'Guardian', 'Voyager', 'Scholar'
        ];

        const adjective = mysteriousAdjectives[Math.floor(Math.random() * mysteriousAdjectives.length)];
        const noun = mysteriousNouns[Math.floor(Math.random() * mysteriousNouns.length)];
        const number = Math.floor(Math.random() * 999) + 1;

        return `${adjective}${noun}${number}`;
    }

    showJourneyWelcome(name) {
        const welcome = document.createElement('div');
        welcome.className = 'journey-welcome-toast';
        welcome.innerHTML = `
            <div class="welcome-content">
                <span class="welcome-icon">🌟</span>
                <div class="welcome-text">
                    <strong>Welcome, ${name}!</strong>
                    <p>Your named journey through the mysteries begins...</p>
                </div>
            </div>
        `;

        document.body.appendChild(welcome);

        setTimeout(() => welcome.classList.add('show'), 100);
        setTimeout(() => {
            welcome.classList.remove('show');
            setTimeout(() => welcome.remove(), 500);
        }, 5000);

        console.log(`🎭 The seeker ${name} emerges from the shadows...`);
    }

    completeLogoSequence() {
        const logoText = document.querySelector('.logo-text');
        if (!logoText) return;

        // Dramatic return to full name - stays this way for the session
        logoText.style.opacity = '0';
        logoText.style.transform = 'scale(0.8)';
        logoText.style.filter = 'blur(3px)';

        setTimeout(() => {
            logoText.textContent = 'Terrell K. Flautt';
            logoText.style.fontSize = '0.8rem';
            logoText.style.letterSpacing = '1px';
            logoText.style.opacity = '1';
            logoText.style.transform = 'scale(1)';
            logoText.style.filter = 'blur(0px)';
        }, 400);

        // Mark sequence as complete for this session
        localStorage.setItem(`logo_sequence_complete_${this.magicId}`, 'true');
        this.setLogoState('sequence_complete');
        console.log('🎭 Logo sequence completed - permanently displaying full name');
    }

    handleAdvancedLogoEvolution(currentStage) {
        const sessionNumber = this.getSessionNumber();
        const logoText = document.querySelector('.logo-text');
        const userIntel = this.userIntelligence || {};

        // Progressive revelation based on session history
        switch (sessionNumber) {
            case 1:
                // First advanced session: Show location on any click
                this.revealLocationInfo(logoText, userIntel);
                break;

            case 2:
                // Second session: Double-click reveals location
                this.setupLocationDoubleClick(logoText, userIntel);
                break;

            case 3:
                // Third session: 3 clicks reveals personal insight
                this.setupPersonalInsight(logoText, userIntel);
                break;

            case 4:
                // Fourth session: Show user's name if known
                this.revealUserName(logoText);
                break;

            case 5:
                // Fifth session: Color cycling system
                this.setupColorCycling(logoText);
                break;

            case 6:
                // Sixth session: Extended color options
                this.setupExtendedColors(logoText);
                break;

            default:
                // Session 7+: Custom text input system
                this.setupCustomTextSystem(logoText);
                break;
        }
    }

    getSessionNumber() {
        const completionHistory = JSON.parse(localStorage.getItem(`logo_completion_history_${this.magicId}`) || '[]');
        return completionHistory.length + 1;
    }

    revealLocationInfo(logoText, userIntel) {
        const location = userIntel.location || {};
        if (location.city) {
            this.animateTextChange(logoText, location.city);
            setTimeout(() => {
                this.animateTextChange(logoText, 'Terrell K. Flautt');
            }, 3000);
            this.addDiscovery('location_revealed', 'Located', `Found in ${location.city}`);
        }
    }

    setupLocationDoubleClick(logoText, userIntel) {
        let clickCount = 0;
        let clickTimer = null;

        const handleDoubleClick = () => {
            clickCount++;
            clearTimeout(clickTimer);

            if (clickCount === 2) {
                const location = userIntel.location || {};
                if (location.city) {
                    this.animateTextChange(logoText, location.city);
                    setTimeout(() => {
                        this.animateTextChange(logoText, 'Terrell K. Flautt');
                    }, 2000);
                }
                clickCount = 0;
            } else {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 500);
            }
        };

        logoText.addEventListener('click', handleDoubleClick);
    }

    setupPersonalInsight(logoText, userIntel) {
        let clickCount = 0;
        let clickTimer = null;

        const handleTripleClick = () => {
            clickCount++;
            clearTimeout(clickTimer);

            if (clickCount === 3) {
                const insight = this.generatePersonalInsight(userIntel);
                this.animateTextChange(logoText, insight);
                setTimeout(() => {
                    this.animateTextChange(logoText, 'Terrell K. Flautt');
                }, 2500);
                clickCount = 0;
            } else {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 800);
            }
        };

        logoText.addEventListener('click', handleTripleClick);
    }

    generatePersonalInsight(userIntel) {
        const time = userIntel.time || {};
        const browser = userIntel.browser || {};
        const patterns = userIntel.patterns || {};

        const insights = [
            time.hour < 6 ? 'Early Bird' : time.hour > 22 ? 'Night Owl' : '',
            patterns.returningUser ? 'Persistent' : 'Curious',
            browser.platform?.includes('Mobile') ? 'Mobile' : 'Desktop',
            patterns.visitCount > 5 ? 'Devoted' : 'Explorer'
        ].filter(Boolean);

        return insights[Math.floor(Math.random() * insights.length)] || 'Mysterious';
    }

    revealUserName(logoText) {
        const userName = localStorage.getItem(`magic_name_${this.magicId}`);
        if (userName) {
            this.animateTextChange(logoText, userName);
            this.addDiscovery('name_revealed', 'Named', 'Identity acknowledged');
        }
    }

    setupColorCycling(logoText) {
        const colors = ['#ff69b4', '#667aea', '#9f7aea', '#ffffff']; // Pink, Blue, Purple, White
        let colorIndex = 0;

        const cycleColor = () => {
            logoText.style.color = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;

            setTimeout(() => {
                logoText.style.color = '';
            }, 2000);
        };

        logoText.addEventListener('click', cycleColor);
        this.addDiscovery('color_cycling', 'Colorful', 'Theme adaptation');
    }

    setupExtendedColors(logoText) {
        const extendedColors = [
            '#ff69b4', '#667aea', '#9f7aea', '#ffffff',
            '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1',
            '#96ceb4', '#ffeaa7', '#fd79a8', '#e17055'
        ];
        let colorIndex = 0;

        const cycleExtendedColor = () => {
            logoText.style.color = extendedColors[colorIndex];
            colorIndex = (colorIndex + 1) % extendedColors.length;

            setTimeout(() => {
                logoText.style.color = '';
            }, 2000);
        };

        logoText.addEventListener('click', cycleExtendedColor);
    }

    setupCustomTextSystem(logoText) {
        let clickCount = 0;

        const activateCustomText = () => {
            clickCount++;

            if (clickCount >= 3) {
                this.showCustomTextInput(logoText);
                clickCount = 0;
            }

            setTimeout(() => {
                if (clickCount < 3) clickCount = 0;
            }, 1000);
        };

        logoText.addEventListener('click', activateCustomText);
    }

    showCustomTextInput(logoText) {
        const modal = document.createElement('div');
        modal.className = 'custom-text-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="custom-text-content">
                <h3>🎭 Transform the Name</h3>
                <p>What would you like it to say? (Session only)</p>
                <input type="text" id="customTextInput" placeholder="Enter your text" maxlength="30">
                <div class="custom-text-actions">
                    <button id="applyCustomText">Apply</button>
                    <button id="cancelCustomText">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const input = modal.querySelector('#customTextInput');
        const applyBtn = modal.querySelector('#applyCustomText');
        const cancelBtn = modal.querySelector('#cancelCustomText');

        input.focus();

        applyBtn.addEventListener('click', () => {
            const customText = input.value.trim();
            if (customText) {
                this.animateTextChange(logoText, customText);
                // Store for this session only
                sessionStorage.setItem(`custom_logo_text_${this.magicId}`, customText);
                this.addDiscovery('custom_text', 'Customized', 'Personal touch');
            }
            modal.remove();
        });

        cancelBtn.addEventListener('click', () => {
            modal.remove();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                applyBtn.click();
            }
        });

        setTimeout(() => modal.classList.add('show'), 100);
    }

    animateTextChange(logoText, newText) {
        logoText.style.opacity = '0';
        logoText.style.transform = 'scale(0.9)';

        setTimeout(() => {
            logoText.textContent = newText;
            logoText.style.opacity = '1';
            logoText.style.transform = 'scale(1)';
        }, 300);
    }

    setupPeriodClickTrigger() {
        // Add clickable period after name for riddle trigger
        const logoText = document.querySelector('.logo-text');
        if (!logoText) return;

        // Only add period trigger if showing full name and riddle not solved
        const logoState = this.getLogoState();
        const riddleSolved = localStorage.getItem(`aziza_riddle_solved_${this.magicId}`);

        if (logoState === 'full_name' && !riddleSolved) {
            // Create invisible period trigger
            const periodTrigger = document.createElement('span');
            periodTrigger.className = 'period-trigger';
            periodTrigger.textContent = '.';
            periodTrigger.style.cursor = 'help';
            periodTrigger.style.opacity = '0.7';
            periodTrigger.style.transition = 'all 0.3s ease';
            periodTrigger.style.marginLeft = '2px';

            logoText.appendChild(periodTrigger);

            periodTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showAzizaRiddle();

                // Add discovery for finding the trigger
                this.addDiscovery('period_finder', 'Details', 'Period clicked');

                // Remove the period trigger after use
                periodTrigger.remove();
            });

            periodTrigger.addEventListener('mouseenter', () => {
                periodTrigger.style.opacity = '1';
                periodTrigger.style.transform = 'scale(1.5)';
                periodTrigger.style.color = '#667aea';
            });

            periodTrigger.addEventListener('mouseleave', () => {
                periodTrigger.style.opacity = '0.7';
                periodTrigger.style.transform = 'scale(1)';
                periodTrigger.style.color = '';
            });
        }
    }

    addResetButton() {
        // Only show for users who have made their first discovery
        const hasDiscoveries = this.shadowProgress.discoveries.length > 0;

        if (!hasDiscoveries) {
            return; // Don't show button until they discover something
        }

        // Check if reset button already exists
        if (document.querySelector('.magic-reset-btn')) {
            return; // Already added
        }

        // Add very subtle reset button only after first discovery
        const resetBtn = document.createElement('button');
        resetBtn.className = 'magic-reset-btn';
        resetBtn.innerHTML = '↻';
        resetBtn.title = 'Reset your personal journey (Hall of Fame stays forever)';

        resetBtn.addEventListener('click', () => {
            if (confirm('Start a fresh journey? (Your Hall of Fame achievements will remain forever)')) {
                this.resetPersonalJourney();
            }
        });

        // Add to bottom left corner (separate from other UI elements)
        document.body.appendChild(resetBtn);

        // Subtle animation when it first appears
        setTimeout(() => {
            resetBtn.style.opacity = '0.3';
        }, 100);
    }

    // Call this when any discovery is made
    onFirstDiscovery() {
        // Add the reset button after first discovery
        this.addResetButton();
    }

    resetPersonalJourney() {
        try {
            // Reset personal progress but keep Hall of Fame entries
            this.shadowProgress = {
                discoveries: [],
                visits: 1, // Reset to 1 (current visit)
                magicMoments: [],
                firstMagic: Date.now(),
                totalMagic: 0
            };

            // Save reset progress
            this.saveToRealms();

            // Remove reset button since they no longer have discoveries
            const resetBtn = document.querySelector('.magic-reset-btn');
            if (resetBtn) {
                resetBtn.remove();
            }

            // Reset any visual states but keep the user's magical identity
            this.resetVisualStates();

            console.log('✨ Personal journey reset - starting fresh!');

            // Show confirmation
            this.showResetConfirmation();

        } catch (error) {
            console.error('Error resetting journey:', error);
        }
    }

    resetVisualStates() {
        // Reset logo to initial state
        const logo = document.querySelector('.nav-logo .logo-text');
        if (logo) {
            logo.textContent = 'Terrell K. Flautt';
            logo.className = 'logo-text';
        }

        // Reset any discovery-based UI changes
        document.querySelectorAll('.discovered').forEach(el => {
            el.classList.remove('discovered');
        });

        // Reset any easter egg states
        document.querySelectorAll('.easter-egg-active').forEach(el => {
            el.classList.remove('easter-egg-active');
        });
    }

    showResetConfirmation() {
        // Create a subtle confirmation message
        const confirmation = document.createElement('div');
        confirmation.className = 'reset-confirmation';
        confirmation.innerHTML = `
            <div class="confirmation-content">
                <span class="confirmation-icon">✨</span>
                <span class="confirmation-text">Journey reset - discover anew!</span>
            </div>
        `;

        document.body.appendChild(confirmation);

        // Animate in
        setTimeout(() => confirmation.classList.add('show'), 100);

        // Remove after 3 seconds
        setTimeout(() => {
            confirmation.classList.remove('show');
            setTimeout(() => confirmation.remove(), 300);
        }, 3000);
    }

    getMagicName() {
        try {
            const nameData = localStorage.getItem(`magic_name_${this.magicId}`);
            return nameData ? JSON.parse(nameData).name : `MagicUser_${this.magicId.slice(-6)}`;
        } catch (e) {
            return `MagicUser_${this.magicId.slice(-6)}`;
        }
    }

    hasChosenName() {
        try {
            return !!localStorage.getItem(`magic_name_${this.magicId}`);
        } catch (e) {
            return false;
        }
    }

    claimMagicName(name) {
        if (!name || typeof name !== 'string') {
            console.log('❌ Please provide a valid name: claimName("YourName")');
            return;
        }

        if (name.length < 3 || name.length > 20) {
            console.log('❌ Name must be 3-20 characters');
            return;
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
            console.log('❌ Name can only contain letters, numbers, underscore, and dash');
            return;
        }

        try {
            const nameData = {
                name: name,
                claimed: Date.now(),
                magicId: this.magicId
            };

            localStorage.setItem(`magic_name_${this.magicId}`, JSON.stringify(nameData));
            this.updateHallOfFame();

            console.log(`
🎉 MAGIC NAME CLAIMED! 🎉

✨ Welcome to the Hall of Fame, ${name}!
🏆 Your ${this.shadowProgress.discoveries.length} discoveries are now immortalized
🔮 Magic continues to flow through your journey...
            `);

            return true;
        } catch (e) {
            console.log('❌ Magic naming failed. Please try again.');
            return false;
        }
    }

    updateHallOfFame() {
        const hallOfFame = JSON.parse(localStorage.getItem('terrellflautt_hall_of_fame_magic') || '[]');

        const magicEntry = {
            id: this.magicId,
            name: this.getMagicName(),
            isNamed: this.hasChosenName(),
            discoveries: this.shadowProgress.discoveries.length,
            visits: this.shadowProgress.visits,
            magicLevel: this.calculateMagicLevel(),
            style: this.determineMagicStyle(),
            awakened: this.shadowProgress.firstMagic,
            lastSeen: Date.now(),
            totalMagic: this.shadowProgress.totalMagic || 0
        };

        // Update or add entry
        const existingIndex = hallOfFame.findIndex(entry => entry.id === this.magicId);
        if (existingIndex >= 0) {
            hallOfFame[existingIndex] = magicEntry;
        } else {
            hallOfFame.push(magicEntry);
        }

        // Sort by discoveries (magic power)
        hallOfFame.sort((a, b) => {
            if (b.discoveries !== a.discoveries) {
                return b.discoveries - a.discoveries;
            }
            return a.awakened - b.awakened; // Earlier awakening wins ties
        });

        // Keep top 100 magical beings
        const topMagic = hallOfFame.slice(0, 100);
        localStorage.setItem('terrellflautt_hall_of_fame_magic', JSON.stringify(topMagic));
    }

    calculateMagicLevel() {
        const discoveries = this.shadowProgress.discoveries.length;
        if (discoveries >= 25) return "🌟 Transcendental Wizard";
        if (discoveries >= 20) return "🔮 Master Sorcerer";
        if (discoveries >= 15) return "⭐ Enlightened Mage";
        if (discoveries >= 10) return "🎯 Skilled Enchanter";
        if (discoveries >= 5) return "✨ Apprentice Mystic";
        if (discoveries >= 3) return "👁️ Observant Seeker";
        if (discoveries >= 1) return "🌟 First Spark";
        return "🔍 Wandering Soul";
    }

    determineMagicStyle() {
        const discoveries = this.shadowProgress.discoveries.length;
        const visits = this.shadowProgress.visits;
        const ratio = discoveries / Math.max(visits, 1);

        if (ratio > 4) return "Lightning Discoverer";
        if (ratio > 3) return "Deep Magic Diver";
        if (ratio > 2) return "Thorough Mystic";
        if (ratio > 1) return "Keen Observer";
        if (ratio > 0.5) return "Steady Explorer";
        return "Gentle Wanderer";
    }

    // Public API for other systems
    getCurrentUser() {
        return {
            id: this.magicId,
            name: this.getMagicName(),
            isNamed: this.hasChosenName(),
            magic: '✨'
        };
    }

    getCurrentProgress() {
        return this.shadowProgress;
    }

    getHallOfFame() {
        const hall = JSON.parse(localStorage.getItem('terrellflautt_hall_of_fame_magic') || '[]');
        return hall.slice(0, 50); // Top 50 magical beings
    }

    getCurrentRank() {
        const hall = this.getHallOfFame();
        const userIndex = hall.findIndex(entry => entry.id === this.magicId);
        return userIndex >= 0 ? userIndex + 1 : null;
    }

    // Show current magic status (console only - no UI)
    showMagicStatus() {
        const rank = this.getCurrentRank();
        const rankText = rank ? `#${rank}` : 'Unranked';

        console.log(`
✨ MAGIC STATUS ✨

🔮 Name: ${this.getMagicName()}
🎯 Discoveries: ${this.shadowProgress.discoveries.length}
🏆 Rank: ${rankText}
⭐ Level: ${this.calculateMagicLevel()}
🌟 Style: ${this.determineMagicStyle()}
👁️ Visits: ${this.shadowProgress.visits}

${!this.hasChosenName() ? '💡 Type claimName("YourName") to join Hall of Fame!' : '🎉 Immortalized in the Hall of Fame!'}
        `);
    }

    setupHiddenInteractions() {
        // Double-click on any number to change it
        document.querySelectorAll('.stat-number').forEach(element => {
            let clickCount = 0;
            element.addEventListener('click', () => {
                clickCount++;
                this.rewardCuriosity('stat_click');

                if (clickCount === 2) {
                    this.transformStatNumber(element);
                    clickCount = 0;
                }

                setTimeout(() => clickCount = 0, 1000);
            });
        });

        // Triple-click on project names
        document.querySelectorAll('.project-card h3, .project-card h4').forEach(element => {
            let clickCount = 0;
            element.addEventListener('click', (e) => {
                e.preventDefault();
                clickCount++;
                this.rewardCuriosity('project_click');

                if (clickCount === 3) {
                    this.revealProjectSecret(element);
                    clickCount = 0;
                }

                setTimeout(() => clickCount = 0, 2000);
            });
        });

        this.setupTimeBasedTriggers();
        this.setupScrollSecrets();
        this.setupCreativeAttemptTracking();
    }

    transformStatNumber(element) {
        const originalText = element.textContent;
        const personalizedNumbers = [
            this.userIntelligence?.weather?.temp + '°',
            this.userIntelligence?.patterns?.visitCount,
            this.userIntelligence?.time?.hour,
            this.userIntelligence?.location?.ip?.split('.')[3],
            '?',
            '∞'
        ].filter(Boolean);

        const choice = personalizedNumbers[Math.floor(Math.random() * personalizedNumbers.length)] || '?';

        element.style.transition = 'all 0.3s ease';
        element.style.transform = 'scale(1.2)';
        element.textContent = choice;

        setTimeout(() => {
            element.style.transform = 'scale(1)';
            setTimeout(() => {
                element.textContent = originalText;
            }, 2000);
        }, 300);

        this.addDiscovery('number_transformer', 'Numbers', 'Reality shifts');
    }

    revealProjectSecret(element) {
        const originalText = element.textContent;
        const mysteries = [
            'WATCHING',
            'LEARNING YOU',
            'YOUR PATTERN',
            'COLLECTING',
            'ANALYZING',
            'UNDERSTANDING'
        ];

        const choice = mysteries[Math.floor(Math.random() * mysteries.length)];
        element.textContent = choice;
        element.style.color = '#ff6b6b';

        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
        }, 2000);

        this.addDiscovery('project_watcher', 'Watcher', 'Projects know');
    }

    setupTimeBasedTriggers() {
        // Hour changes
        let lastHour = new Date().getHours();
        setInterval(() => {
            const currentHour = new Date().getHours();
            if (currentHour !== lastHour) {
                this.rewardCuriosity('time_passage');
                lastHour = currentHour;
            }
        }, 60000);
    }

    setupScrollSecrets() {
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;

                if (maxScroll > 95) {
                    this.addDiscovery('completionist', 'Explorer', 'Saw everything');
                } else if (maxScroll > 50) {
                    this.addDiscovery('curious_scroller', 'Curious', 'Dug deeper');
                }
            }
        });
    }

    setupCreativeAttemptTracking() {
        // Track right-clicks as creative exploration
        document.addEventListener('contextmenu', (e) => {
            this.rewardCreativeAttempt('right_click');
        });

        // Track double-clicks on text
        document.addEventListener('dblclick', (e) => {
            if (e.target.tagName === 'P' || e.target.tagName === 'SPAN' || e.target.tagName === 'DIV') {
                this.rewardCreativeAttempt('double_click_text');
            }
        });

        // Track attempts to select seemingly unselectable text
        document.addEventListener('selectstart', (e) => {
            if (e.target.classList.contains('logo-text') || e.target.classList.contains('nav-link')) {
                this.rewardCreativeAttempt('text_selection');
            }
        });

        // Track keyboard shortcuts attempts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                this.rewardCreativeAttempt('keyboard_shortcut');
            }

            // Track specific creative key combinations
            if (e.key === 'F12') {
                this.rewardCreativeAttempt('dev_tools');
            }
        });

        // Track long mouse hovers as curiosity
        let hoverTimer;
        document.addEventListener('mouseover', (e) => {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                if (e.target.tagName === 'H1' || e.target.tagName === 'H2' || e.target.classList.contains('project-title')) {
                    this.rewardCreativeAttempt('long_hover');
                }
            }, 3000);
        });

        document.addEventListener('mouseout', () => {
            clearTimeout(hoverTimer);
        });
    }

    // 🎵 Visual Music Integration
    triggerVisualMusicForDiscovery(discoveryTitle, totalDiscoveries) {
        // Only trigger for significant milestones to avoid overwhelming
        const significantMilestones = [1, 5, 10, 15, 20, 25];
        const difficultyThreshold = ['Pattern', 'Evolution', 'Konami', 'Transcendental', 'Aziza'];

        if (significantMilestones.includes(totalDiscoveries) || difficultyThreshold.includes(discoveryTitle)) {
            console.log(`🎵 Triggering visual music experience for: ${discoveryTitle} (${totalDiscoveries} total)`);

            if (window.visualMusicExperience) {
                window.visualMusicExperience.triggerForMajorAchievement({
                    type: 'discovery',
                    title: discoveryTitle,
                    totalDiscoveries: totalDiscoveries,
                    timestamp: Date.now()
                });
            }
        }
    }
}

// ✨ Initialize the magic ✨
window.magicUser = new MagicUserSystem();

// Magical console commands
window.showMagic = () => window.magicUser.showMagicStatus();
window.resetMagic = () => {
    // Use the proper reset method from the class
    if (window.magicUser) {
        window.magicUser.resetPersonalJourney();
    } else {
        console.log('Magic system not initialized');
    }
};
window.viewHallOfFame = () => {
    const hall = window.magicUser.getHallOfFame();
    console.table(hall.map(entry => ({
        Rank: hall.indexOf(entry) + 1,
        Name: entry.name,
        Discoveries: entry.discoveries,
        Level: entry.magicLevel,
        Style: entry.style
    })));
};

// Easter egg: Konami code for magic boost
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiSequence.push(e.code);
    if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
    }

    if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
        window.magicUser.addDiscovery('konami_master', 'Konami', 'Code remembered');
        konamiSequence = [];
    }
});
