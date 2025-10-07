// 🎨 Logo Creation Tool
// Unlocked after light progression - create professional logos with AI assistance

class LogoCreationTool {
    constructor() {
        this.platformDimensions = this.initializePlatformDimensions();
        this.githubTemplate = this.initializeGithubTemplate();
        this.designTools = this.initializeDesignTools();
        this.creationWorkflow = this.initializeCreationWorkflow();

        this.userProgress = this.loadUserProgress();
        this.isUnlocked = this.checkUnlockStatus();
        this.dailyUsage = this.loadDailyUsage();

        this.init();
    }

    initializePlatformDimensions() {
        return {
            github: { width: 1280, height: 640, name: "GitHub Repository" },
            linkedin: { width: 1200, height: 627, name: "LinkedIn" },
            twitter: { width: 1200, height: 675, name: "Twitter/X" },
            facebook: { width: 1200, height: 630, name: "Facebook/Meta" },
            instagram: { width: 1080, height: 1080, name: "Instagram" },
            pinterest: { width: 1000, height: 1500, name: "Pinterest" },
            youtube: { width: 1280, height: 720, name: "YouTube" },
            discord: { width: 1920, height: 1080, name: "Discord" },
            general: { width: 1200, height: 630, name: "General Social Media" }
        };
    }

    initializeGithubTemplate() {
        return {
            name: "GitHub Repository Template",
            description: "Default template based on GitHub's repository open graph template",
            baseTemplate: {
                background: "linear-gradient(135deg, #24292e, #586069)",
                textColor: "#ffffff",
                accentColor: "#f9826c",
                layout: "centered_text_with_icon",
                typography: "GitHub Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
            },
            variations: {
                dark: { background: "linear-gradient(135deg, #0d1117, #21262d)" },
                light: { background: "linear-gradient(135deg, #f6f8fa, #ffffff)", textColor: "#24292e" },
                colorful: { background: "linear-gradient(135deg, #7c3aed, #3b82f6)" },
                minimalist: { background: "#ffffff", textColor: "#24292e", accentColor: "#0969da" }
            }
        };
    }

    initializeDesignTools() {
        return {
            aiLogoGenerator: {
                name: "AI Logo Generator",
                description: "Advanced AI-powered logo creation using learned context",
                capabilities: [
                    'context_aware_generation',
                    'style_transfer',
                    'brand_consistency',
                    'multi_variant_creation'
                ]
            },

            vectorEditor: {
                name: "Vector Design Editor",
                description: "Professional vector editing tools",
                tools: [
                    'shape_manipulation',
                    'typography_control',
                    'color_palette_management',
                    'effects_and_filters'
                ]
            },

            brandingAssistant: {
                name: "Branding Strategy Assistant",
                description: "AI assistant for brand strategy and consistency",
                features: [
                    'brand_analysis',
                    'target_audience_optimization',
                    'competitive_differentiation',
                    'scalability_planning'
                ]
            },

            collaborativeWorkspace: {
                name: "Collaborative Design Space",
                description: "Work with other masters on logo projects",
                features: [
                    'real_time_collaboration',
                    'version_control',
                    'feedback_systems',
                    'community_voting'
                ]
            }
        };
    }

    initializeUnlockCriteria() {
        return {
            // Progressive unlocking system
            basicAccess: {
                requirement: "Complete transcendental journey + 15 discoveries",
                unlocks: ['simple_template_access', 'basic_customization']
            },

            intermediateAccess: {
                requirement: "Achieve mystic level + mentor 1 newcomer",
                unlocks: ['advanced_templates', 'ai_assistance', 'color_theory_tools']
            },

            advancedAccess: {
                requirement: "Master level + create original puzzle + 30 visits",
                unlocks: ['full_vector_editor', 'brand_strategy_assistant', 'export_options']
            },

            masterAccess: {
                requirement: "All mastery requirements + community recognition",
                unlocks: ['collaborative_workspace', 'unlimited_creation', 'teaching_tools']
            }
        };
    }

    initializeCreationWorkflow() {
        return {
            // Step-by-step logo creation process
            discovery: {
                name: "Discovery & Strategy",
                steps: [
                    'project_analysis',
                    'target_audience_definition',
                    'brand_personality_mapping',
                    'competitive_landscape_review'
                ]
            },

            conceptualization: {
                name: "Concept Development",
                steps: [
                    'brainstorming_session',
                    'mood_board_creation',
                    'style_direction_selection',
                    'initial_sketches'
                ]
            },

            design: {
                name: "Design Execution",
                steps: [
                    'vector_creation',
                    'typography_selection',
                    'color_palette_development',
                    'refinement_iterations'
                ]
            },

            validation: {
                name: "Testing & Validation",
                steps: [
                    'scalability_testing',
                    'application_mockups',
                    'feedback_collection',
                    'final_optimizations'
                ]
            },

            delivery: {
                name: "Delivery & Guidelines",
                steps: [
                    'file_format_export',
                    'usage_guidelines_creation',
                    'brand_asset_package',
                    'implementation_support'
                ]
            }
        };
    }

    init() {
        this.checkUnlockStatus();

        // Add to magic user system for discovery
        if (window.magicUserSystem) {
            window.magicUserSystem.addDiscoverableElement({
                id: 'logo_creation_tool',
                element: 'hidden_initially',
                hint: 'Create something beautiful...',
                difficulty: 'intermediate',
                unlockCondition: () => this.isUnlocked,
                onActivate: () => this.activateLogoCreationTool()
            });
        }

        console.log('🎨 Logo Creation Tool initialized');
    }

    checkUnlockStatus() {
        const magicUser = window.magicUserSystem;
        if (!magicUser) return false;

        // Very accessible - just 3 easter eggs, even on first visit
        const discoveries = magicUser.getDiscoveryCount();

        // Simple unlock criteria: 3 discoveries
        this.isUnlocked = discoveries >= 3;

        // Check daily usage limit (1 time per day)
        const canUseToday = this.checkDailyUsageLimit();
        this.canUseToday = canUseToday;

        return this.isUnlocked && canUseToday;
    }

    getUserProgress() {
        // Gather all user progress data
        return {
            discoveries: window.magicUser?.shadowProgress?.discoveries?.length || 0,
            visits: parseInt(localStorage.getItem('visit_count') || '0'),
            stage: window.returningVisitorEvolution?.currentStage || 'newcomer',
            transcendentalComplete: localStorage.getItem('transcendental_complete') === 'true',
            mentorshipRecord: JSON.parse(localStorage.getItem('mentorship_record') || '[]'),
            createdPuzzles: JSON.parse(localStorage.getItem('created_puzzles') || '[]'),
            sharedInsights: JSON.parse(localStorage.getItem('shared_insights') || '[]'),
            communityContributions: JSON.parse(localStorage.getItem('community_contributions') || '[]'),
            streakRecord: this.calculateVisitStreak(),
            hallOfFameRank: this.getHallOfFameRank()
        };
    }

    loadUserProgress() {
        const magicUser = window.magicUserSystem;
        if (!magicUser) return { discoveries: 0, visits: 0 };

        return {
            discoveries: magicUser.getDiscoveryCount(),
            visits: magicUser.getVisitCount()
        };
    }

    loadDailyUsage() {
        const today = new Date().toDateString();
        const usage = JSON.parse(localStorage.getItem('logo_tool_daily_usage') || '{}');
        return usage[today] || 0;
    }

    checkDailyUsageLimit() {
        const dailyLimit = 1;
        const todaysUsage = this.loadDailyUsage();
        return todaysUsage < dailyLimit;
    }

    incrementDailyUsage() {
        const today = new Date().toDateString();
        const usage = JSON.parse(localStorage.getItem('logo_tool_daily_usage') || '{}');
        usage[today] = (usage[today] || 0) + 1;
        localStorage.setItem('logo_tool_daily_usage', JSON.stringify(usage));
    }

    getDailyUsageDisplay() {
        return this.canUseToday ? '0/1 used today' : '1/1 used today';
    }

    showDailyLimitMessage() {
        const message = document.createElement('div');
        message.className = 'daily-limit-message';
        message.innerHTML = `
            <div class="limit-content">
                <div class="limit-icon">⏰</div>
                <h3>Daily Creation Limit Reached</h3>
                <p>The logo creation tool can be used once per day to maintain its special nature.</p>
                <p>Return tomorrow for another creation session.</p>
                <button class="close-limit-msg">Continue Exploring</button>
            </div>
        `;

        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 30px;
            border-radius: 15px;
            z-index: 10003;
            text-align: center;
            max-width: 400px;
        `;

        message.querySelector('.close-limit-msg').addEventListener('click', () => {
            message.remove();
        });

        document.body.appendChild(message);
    }

    showProgressToUnlock() {
        const progress = document.createElement('div');
        progress.className = 'unlock-progress';
        progress.innerHTML = `
            <div class="progress-content">
                <div class="progress-icon">🎨</div>
                <h3>Logo Creation Tool</h3>
                <p>Discover ${3 - this.userProgress.discoveries} more easter eggs to unlock.</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.min(100, (this.userProgress.discoveries / 3) * 100)}%"></div>
                </div>
                <button class="continue-exploring">Continue Exploring</button>
            </div>
        `;

        progress.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 30px;
            border-radius: 15px;
            z-index: 10001;
            text-align: center;
            max-width: 400px;
        `;

        progress.querySelector('.continue-exploring').addEventListener('click', () => {
            progress.remove();
        });

        document.body.appendChild(progress);
    }

    showQuickMessage(text) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255,0,0,0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 10000;
        `;
        message.textContent = text;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }

    activateLogoCreationTool() {
        if (!this.canUseToday) {
            this.showDailyLimitMessage();
            return;
        }

        this.createLogoInterface();
    }

    showMasteryAchievement() {
        const achievement = document.createElement('div');
        achievement.className = 'mastery-achievement';
        achievement.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">🏆🎨</div>
                <h2>ULTIMATE MASTERY ACHIEVED!</h2>
                <h3>Logo Creation Tool Unlocked</h3>
                <p>You have demonstrated complete mastery of all aspects of Terrell K. Flautt's journey, philosophy, and technical systems.</p>
                <p>As a true digital mystic and master teacher, you now have access to the Logo Creation Mastery Tool.</p>
                <div class="mastery-stats">
                    <div class="stat">
                        <span class="stat-label">Personal Knowledge</span>
                        <span class="stat-value">✓ Mastered</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Technical Mastery</span>
                        <span class="stat-value">✓ Achieved</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Wisdom & Teaching</span>
                        <span class="stat-value">✓ Demonstrated</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Loyalty & Dedication</span>
                        <span class="stat-value">✓ Proven</span>
                    </div>
                </div>
                <button class="begin-creation-btn">Begin Creating Logos</button>
            </div>
        `;

        achievement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #f7b731, #f39c12, #e74c3c);
            color: white;
            padding: 40px;
            border-radius: 20px;
            z-index: 10003;
            backdrop-filter: blur(15px);
            border: 3px solid rgba(255,255,255,0.3);
            text-align: center;
            max-width: 600px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
            animation: masteryAppear 2s ease-out;
        `;

        // Add achievement styles
        if (!document.querySelector('style[data-mastery-styles]')) {
            const styles = document.createElement('style');
            styles.setAttribute('data-mastery-styles', 'true');
            styles.textContent = `
                @keyframes masteryAppear {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.5) rotateY(180deg);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1) rotateY(0deg);
                    }
                }
                .mastery-achievement {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .achievement-icon {
                    font-size: 4em;
                    margin-bottom: 20px;
                    animation: pulse 2s ease-in-out infinite;
                }
                .mastery-achievement h2 {
                    margin: 0 0 10px 0;
                    font-size: 2em;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                }
                .mastery-achievement h3 {
                    margin: 0 0 20px 0;
                    font-size: 1.3em;
                    opacity: 0.9;
                }
                .mastery-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin: 30px 0;
                    text-align: left;
                }
                .stat {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(255,255,255,0.1);
                    padding: 10px 15px;
                    border-radius: 8px;
                }
                .stat-label {
                    font-weight: 500;
                }
                .stat-value {
                    color: #2ecc71;
                    font-weight: bold;
                }
                .begin-creation-btn {
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 25px;
                    font-size: 1.1em;
                    cursor: pointer;
                    margin-top: 20px;
                    transition: transform 0.3s ease;
                }
                .begin-creation-btn:hover {
                    transform: scale(1.05);
                }
            `;
            document.head.appendChild(styles);
        }

        achievement.querySelector('.begin-creation-btn').addEventListener('click', () => {
            achievement.remove();
            this.createLogoInterface();
        });

        document.body.appendChild(achievement);
    }

    createLogoInterface() {
        const logoTool = document.createElement('div');
        logoTool.id = 'logo-creation-tool';
        logoTool.innerHTML = `
            <div class="logo-tool-container">
                <div class="tool-header">
                    <h2>🎨 Logo Creation Mastery Tool</h2>
                    <p>Create professional logos with AI-powered assistance and deep context understanding</p>
                    <button class="minimize-tool">−</button>
                    <button class="close-tool">×</button>
                </div>

                <div class="tool-content">
                    <div class="creation-workflow">
                        <div class="workflow-step active" data-step="project">
                            <h3>1. Project Setup</h3>
                            <div class="step-content">
                                <div class="input-group">
                                    <label>Project Name</label>
                                    <input type="text" id="project-name" placeholder="Your company or project name">
                                </div>
                                <div class="input-group">
                                    <label>Platform</label>
                                    <select id="platform-select">
                                        <option value="github">GitHub (1280×640)</option>
                                        <option value="linkedin">LinkedIn (1200×627)</option>
                                        <option value="twitter">Twitter/X (1200×675)</option>
                                        <option value="facebook">Facebook (1200×630)</option>
                                        <option value="instagram">Instagram (1080×1080)</option>
                                        <option value="pinterest">Pinterest (1000×1500)</option>
                                        <option value="youtube">YouTube (1280×720)</option>
                                        <option value="general">General Social (1200×630)</option>
                                    </select>
                                </div>
                                <div class="input-group">
                                    <label>Description (optional)</label>
                                    <textarea id="project-description" placeholder="Brief description to help AI understand your brand..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="workflow-step" data-step="style">
                            <h3>2. Style Selection</h3>
                            <div class="step-content">
                                <div class="template-grid">
                                    ${this.renderTemplateOptions()}
                                </div>
                            </div>
                        </div>

                        <div class="workflow-step" data-step="customize">
                            <h3>3. Customization</h3>
                            <div class="step-content">
                                <div class="customization-panels">
                                    <div class="panel">
                                        <h4>Colors</h4>
                                        <div class="color-picker-grid">
                                            ${this.renderColorOptions()}
                                        </div>
                                    </div>
                                    <div class="panel">
                                        <h4>Typography</h4>
                                        <div class="font-selection">
                                            ${this.renderFontOptions()}
                                        </div>
                                    </div>
                                    <div class="panel">
                                        <h4>Elements</h4>
                                        <div class="element-selection">
                                            ${this.renderElementOptions()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="workflow-step" data-step="generate">
                            <h3>4. AI Generation</h3>
                            <div class="step-content">
                                <div class="usage-info">
                                    <p>Daily usage: 0/1 used today</p>
                                </div>
                                <div class="generation-controls">
                                    <button class="generate-logo-btn">🎨 Create Logo</button>
                                    <div class="generation-options">
                                        <label>
                                            <input type="checkbox" id="include-text" checked> Include project name
                                        </label>
                                        <label>
                                            <input type="checkbox" id="multiple-variants"> Generate 3 variants
                                        </label>
                                    </div>
                                </div>
                                <div class="generation-preview">
                                    <div class="preview-placeholder">
                                        <p>Your AI-generated logo will appear here</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="workflow-step" data-step="export">
                            <h3>5. Export & Guidelines</h3>
                            <div class="step-content">
                                <div class="export-options">
                                    <div class="format-selection">
                                        <h4>Export Formats</h4>
                                        <div class="format-grid">
                                            <label><input type="checkbox" checked> SVG (Vector)</label>
                                            <label><input type="checkbox" checked> PNG (High-Res)</label>
                                            <label><input type="checkbox"> JPG</label>
                                            <label><input type="checkbox"> PDF</label>
                                        </div>
                                    </div>
                                    <div class="guidelines-section">
                                        <h4>Brand Guidelines</h4>
                                        <label>
                                            <input type="checkbox" id="generate-guidelines"> Generate Usage Guidelines
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="workflow-navigation">
                        <button class="nav-btn prev-btn" disabled>Previous</button>
                        <div class="progress-indicator">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 20%"></div>
                            </div>
                            <span class="progress-text">Step 1 of 5</span>
                        </div>
                        <button class="nav-btn next-btn">Next</button>
                    </div>
                </div>
            </div>
        `;

        logoTool.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 1000px;
            height: 90%;
            max-height: 800px;
            background: linear-gradient(135deg, rgba(0,0,0,0.95), rgba(30,30,30,0.95));
            color: white;
            border-radius: 20px;
            z-index: 10002;
            backdrop-filter: blur(15px);
            border: 2px solid rgba(255,255,255,0.1);
            overflow: hidden;
            animation: toolSlideIn 1s ease-out;
        `;

        this.setupLogoToolInteractions(logoTool);
        document.body.appendChild(logoTool);
    }

    renderTemplateOptions() {
        return Object.entries(this.logoTemplates).map(([key, template]) => `
            <div class="template-option" data-template="${key}">
                <div class="template-preview">
                    <div class="template-icon">${this.getTemplateIcon(key)}</div>
                </div>
                <h4>${template.name}</h4>
                <p>${template.description}</p>
            </div>
        `).join('');
    }

    renderColorOptions() {
        const colorSchemes = [
            ['#667eea', '#764ba2'], // Tech gradient
            ['#f093fb', '#f5576c'], // Creative gradient
            ['#4facfe', '#00f2fe'], // Innovation gradient
            ['#fa709a', '#fee140'], // Energy gradient
            ['#a8edea', '#fed6e3'], // Calm gradient
            ['#ffecd2', '#fcb69f']  // Warm gradient
        ];

        return colorSchemes.map((scheme, index) => `
            <div class="color-scheme" data-scheme="${index}">
                <div class="color-preview" style="background: linear-gradient(45deg, ${scheme[0]}, ${scheme[1]})"></div>
            </div>
        `).join('');
    }

    renderFontOptions() {
        const fonts = [
            'Inter', 'Roboto', 'Poppins', 'Montserrat', 'Lato', 'Open Sans'
        ];

        return fonts.map(font => `
            <div class="font-option" data-font="${font}">
                <span style="font-family: ${font}">${font}</span>
            </div>
        `).join('');
    }

    renderElementOptions() {
        const elements = [
            { name: 'Geometric Shapes', icon: '🔷' },
            { name: 'Tech Icons', icon: '⚙️' },
            { name: 'Abstract Forms', icon: '🌀' },
            { name: 'Minimalist', icon: '◦' },
            { name: 'Organic Curves', icon: '🌊' },
            { name: 'Typography Focus', icon: 'Aa' }
        ];

        return elements.map(element => `
            <div class="element-option" data-element="${element.name}">
                <span class="element-icon">${element.icon}</span>
                <span class="element-name">${element.name}</span>
            </div>
        `).join('');
    }

    setupLogoToolInteractions(toolElement) {
        // Navigation
        const nextBtn = toolElement.querySelector('.next-btn');
        const prevBtn = toolElement.querySelector('.prev-btn');
        let currentStep = 0;
        const totalSteps = 5;

        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps - 1) {
                currentStep++;
                this.updateWorkflowStep(toolElement, currentStep);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                this.updateWorkflowStep(toolElement, currentStep);
            }
        });

        // Logo generation
        const generateBtn = toolElement.querySelector('.generate-logo-btn');
        generateBtn.addEventListener('click', () => {
            this.generateLogoWithAI(toolElement);
        });

        // Tool controls
        const minimizeBtn = toolElement.querySelector('.minimize-tool');
        const closeBtn = toolElement.querySelector('.close-tool');

        minimizeBtn.addEventListener('click', () => {
            toolElement.style.transform = 'translate(-50%, -50%) scale(0.1)';
            toolElement.style.opacity = '0.5';
            setTimeout(() => {
                toolElement.style.transform = 'translate(-50%, -50%) scale(1)';
                toolElement.style.opacity = '1';
            }, 10000);
        });

        closeBtn.addEventListener('click', () => {
            toolElement.remove();
        });
    }

    updateWorkflowStep(toolElement, stepIndex) {
        const steps = toolElement.querySelectorAll('.workflow-step');
        const progressFill = toolElement.querySelector('.progress-fill');
        const progressText = toolElement.querySelector('.progress-text');
        const prevBtn = toolElement.querySelector('.prev-btn');
        const nextBtn = toolElement.querySelector('.next-btn');

        // Update step visibility
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });

        // Update progress
        const progress = ((stepIndex + 1) / steps.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Step ${stepIndex + 1} of ${steps.length}`;

        // Update navigation buttons
        prevBtn.disabled = stepIndex === 0;
        nextBtn.disabled = stepIndex === steps.length - 1;
    }

    generateLogoWithAI(toolElement) {
        const projectName = toolElement.querySelector('#project-name').value;
        const platform = toolElement.querySelector('#platform-select').value;
        const description = toolElement.querySelector('#project-description').value;
        const includeText = toolElement.querySelector('#include-text').checked;
        const multipleVariants = toolElement.querySelector('#multiple-variants').checked;

        if (!projectName.trim()) {
            this.showQuickMessage('Please enter a project name');
            return;
        }

        if (!this.canUseToday) {
            this.showDailyLimitMessage();
            return;
        }

        // Increment usage counter
        this.incrementDailyUsage();
        this.canUseToday = false;

        // Show generation in progress
        const preview = toolElement.querySelector('.generation-preview');
        preview.innerHTML = `
            <div class="generation-loading">
                <div class="loading-spinner">🎨</div>
                <p>Creating your ${this.platformDimensions[platform].name} logo...</p>
                <div class="loading-progress">
                    <div class="loading-bar"></div>
                </div>
            </div>
        `;

        // Update usage display
        toolElement.querySelector('.usage-info p').textContent = this.getDailyUsageDisplay();
        toolElement.querySelector('.generate-logo-btn').disabled = true;

        // Simulate AI generation process
        setTimeout(() => {
            this.displayGeneratedLogos(preview, {
                projectName,
                platform,
                description,
                includeText,
                multipleVariants
            });
        }, 3000);
    }

    displayGeneratedLogos(container, params) {
        // Simulate generated logo results
        const logos = this.createMockLogos(params);

        container.innerHTML = `
            <div class="generated-logos">
                <h4>Generated Logo Variants</h4>
                <div class="logo-grid">
                    ${logos.map((logo, index) => `
                        <div class="logo-variant" data-variant="${index}">
                            <div class="logo-preview" style="background: ${logo.background}">
                                <div class="logo-content">${logo.content}</div>
                            </div>
                            <div class="logo-info">
                                <span class="logo-name">${logo.name}</span>
                                <div class="logo-actions">
                                    <button class="select-logo" data-index="${index}">Select</button>
                                    <button class="refine-logo" data-index="${index}">Refine</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Add selection handlers
        container.querySelectorAll('.select-logo').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                this.selectLogo(logos[index]);
            });
        });
    }

    createMockLogos(params) {
        const { projectName, platform, includeText, multipleVariants } = params;
        const dimensions = this.platformDimensions[platform];
        const initials = projectName.split(' ').map(word => word[0]).join('').toUpperCase();

        const logos = [
            {
                name: 'GitHub Style',
                content: includeText ? projectName : initials,
                background: 'linear-gradient(135deg, #24292e, #586069)',
                textColor: '#ffffff',
                dimensions: dimensions
            }
        ];

        if (multipleVariants) {
            logos.push(
                {
                    name: 'Minimalist',
                    content: includeText ? projectName : initials,
                    background: '#ffffff',
                    textColor: '#24292e',
                    dimensions: dimensions
                },
                {
                    name: 'Tech Style',
                    content: includeText ? `⚡ ${projectName}` : `⚡${initials}`,
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    textColor: '#ffffff',
                    dimensions: dimensions
                }
            );
        }

        return logos;
    }

    selectLogo(logo) {
        console.log('Logo selected:', logo);
        // Handle logo selection and export
        this.prepareFinalLogo(logo);
    }

    prepareFinalLogo(logo) {
        // Prepare final logo files and guidelines
        const finalPackage = {
            logo: logo,
            formats: ['svg', 'png', 'jpg'],
            guidelines: this.generateBrandGuidelines(logo),
            timestamp: Date.now()
        };

        this.downloadLogoPackage(finalPackage);
    }

    generateBrandGuidelines(logo) {
        return {
            colorPalette: logo.colors,
            typography: logo.fonts,
            spacing: logo.spacing,
            usageRules: [
                'Maintain minimum clear space equal to the height of the logo',
                'Do not alter colors, fonts, or proportions',
                'Ensure sufficient contrast on all backgrounds',
                'Use provided file formats for best quality'
            ]
        };
    }

    downloadLogoPackage(logoPackage) {
        console.log('Downloading logo package:', logoPackage);
        // In a real implementation, this would generate and download files
        alert('Logo package ready for download! (In a real implementation, files would be generated and downloaded)');
    }

    showProgressToUnlock() {
        const progress = document.createElement('div');
        progress.className = 'mastery-progress';
        progress.innerHTML = `
            <div class="progress-content">
                <h3>🏆 Progress to Logo Creation Mastery</h3>
                <p>Complete all requirements to unlock the ultimate creation tool</p>
                <div class="mastery-checklist">
                    ${this.renderMasteryChecklist()}
                </div>
                <div class="access-level">
                    <p>Current Access Level: <strong>${this.accessLevel.toUpperCase()}</strong></p>
                    ${this.accessLevel !== 'none' ? this.renderPartialAccess() : ''}
                </div>
                <button class="close-progress">Continue Journey</button>
            </div>
        `;

        // Show progress interface
        progress.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 30px;
            border-radius: 15px;
            z-index: 10001;
            max-width: 500px;
            text-align: center;
        `;

        progress.querySelector('.close-progress').addEventListener('click', () => {
            progress.remove();
        });

        document.body.appendChild(progress);
    }

    renderMasteryChecklist() {
        return Object.entries(this.masteryStatus).map(([area, completed]) => `
            <div class="checklist-item ${completed ? 'completed' : 'pending'}">
                <span class="check-icon">${completed ? '✅' : '⏳'}</span>
                <span class="check-label">${this.masteryRequirements[area].name}</span>
            </div>
        `).join('');
    }

    renderPartialAccess() {
        const unlockedFeatures = this.unlockCriteria[this.accessLevel + 'Access']?.unlocks || [];
        return `
            <div class="partial-access">
                <h4>Unlocked Features:</h4>
                <ul>
                    ${unlockedFeatures.map(feature => `<li>${feature.replace('_', ' ')}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Helper methods
    getTemplateIcon(template) {
        const icons = {
            devopsThemed: '☁️',
            mysticalTech: '🔮',
            leadershipVision: '👑',
            personalBrand: '🌟',
            communityBuilder: '🤝'
        };
        return icons[template] || '🎨';
    }

    calculateVisitStreak() {
        const history = JSON.parse(localStorage.getItem('visit_history') || '[]');
        let streak = 0;
        const today = new Date().toDateString();

        for (let i = history.length - 1; i >= 0; i--) {
            const visitDate = new Date(history[i].timestamp).toDateString();
            if (visitDate === today) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    getHallOfFameRank() {
        // This would integrate with the existing Hall of Fame system
        return parseInt(localStorage.getItem('hall_of_fame_rank') || '999');
    }

    loadUserMastery() {
        return JSON.parse(localStorage.getItem('user_mastery_progress') || '{}');
    }

    saveUserMastery() {
        localStorage.setItem('user_mastery_progress', JSON.stringify(this.userMastery));
    }
}

// Initialize the Logo Creation Tool
window.logoCreationTool = new LogoCreationTool();

// Export for integration
window.LogoCreationTool = LogoCreationTool;