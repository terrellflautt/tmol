// Comprehensive Journey System - Multiple paths with unlockable rewards
// Stores user progress in DynamoDB and evolves name display based on learning

class ComprehensiveJourneySystem {
    constructor() {
        this.apiEndpoint = 'https://api.terrellflautt.com/user-progress';
        this.userId = this.generateOrGetUserId();
        this.userProgress = this.loadUserProgress();

        this.journeyPaths = this.initializeJourneyPaths();
        this.nameEvolution = this.initializeNameEvolution();
        this.questionnaires = this.initializeQuestionnaires();
        this.rewards = this.initializeRewards();

        this.init();
    }

    initializeJourneyPaths() {
        return {
            // Path 1: Technical Mastery Journey
            technicalMastery: {
                name: "The DevOps Apprentice Path",
                totalStages: 12,
                estimatedTime: "6-12 months",
                questions: 48,
                rewards: {
                    stages: [3, 6, 9, 12],
                    unlocks: ['Advanced tools', 'Secret code repos', 'Personal mentoring', 'Co-developer status']
                },
                questionnaires: [
                    { stage: 1, title: "DevOps Fundamentals", questions: 4 },
                    { stage: 2, title: "Cloud Architecture", questions: 4 },
                    { stage: 3, title: "Container Orchestration", questions: 4 },
                    { stage: 4, title: "CI/CD Mastery", questions: 4 },
                    { stage: 5, title: "Infrastructure as Code", questions: 4 },
                    { stage: 6, title: "Monitoring & Observability", questions: 4 },
                    { stage: 7, title: "Security & Compliance", questions: 4 },
                    { stage: 8, title: "Performance Optimization", questions: 4 },
                    { stage: 9, title: "Disaster Recovery", questions: 4 },
                    { stage: 10, title: "Team Leadership", questions: 4 },
                    { stage: 11, title: "Innovation & Strategy", questions: 4 },
                    { stage: 12, title: "Transcendent Engineering", questions: 4 }
                ]
            },

            // Path 2: Creative Innovation Journey
            creativeInnovation: {
                name: "The Digital Artist Path",
                totalStages: 10,
                estimatedTime: "4-8 months",
                questions: 40,
                rewards: {
                    stages: [2, 5, 8, 10],
                    unlocks: ['Design tools access', 'Creative collaborations', 'Art gallery features', 'Innovation partner status']
                },
                questionnaires: [
                    { stage: 1, title: "Design Principles", questions: 4 },
                    { stage: 2, title: "User Experience", questions: 4 },
                    { stage: 3, title: "Visual Storytelling", questions: 4 },
                    { stage: 4, title: "Interactive Media", questions: 4 },
                    { stage: 5, title: "Brand Development", questions: 4 },
                    { stage: 6, title: "Digital Innovation", questions: 4 },
                    { stage: 7, title: "Creative Technology", questions: 4 },
                    { stage: 8, title: "Aesthetic Philosophy", questions: 4 },
                    { stage: 9, title: "Cultural Impact", questions: 4 },
                    { stage: 10, title: "Artistic Transcendence", questions: 4 }
                ]
            },

            // Path 3: Business Strategy Journey
            businessStrategy: {
                name: "The Entrepreneur Path",
                totalStages: 8,
                estimatedTime: "3-6 months",
                questions: 32,
                rewards: {
                    stages: [2, 4, 6, 8],
                    unlocks: ['Business tools', 'Strategy sessions', 'Investor connections', 'Partner status']
                },
                questionnaires: [
                    { stage: 1, title: "Market Analysis", questions: 4 },
                    { stage: 2, title: "Product Strategy", questions: 4 },
                    { stage: 3, title: "Financial Planning", questions: 4 },
                    { stage: 4, title: "Team Building", questions: 4 },
                    { stage: 5, title: "Growth Hacking", questions: 4 },
                    { stage: 6, title: "Strategic Partnerships", questions: 4 },
                    { stage: 7, title: "Innovation Leadership", questions: 4 },
                    { stage: 8, title: "Visionary Thinking", questions: 4 }
                ]
            },

            // Path 4: Philosophical Exploration Journey
            philosophicalExploration: {
                name: "The Digital Philosopher Path",
                totalStages: 15,
                estimatedTime: "12-24 months",
                questions: 60,
                rewards: {
                    stages: [3, 6, 9, 12, 15],
                    unlocks: ['Wisdom archives', 'Philosophy discussions', 'Consciousness experiments', 'Enlightenment tools', 'Transcendent communion']
                },
                questionnaires: [
                    { stage: 1, title: "Technology Ethics", questions: 4 },
                    { stage: 2, title: "Digital Consciousness", questions: 4 },
                    { stage: 3, title: "AI Philosophy", questions: 4 },
                    { stage: 4, title: "Virtual Reality", questions: 4 },
                    { stage: 5, title: "Information Theory", questions: 4 },
                    { stage: 6, title: "Cybernetics", questions: 4 },
                    { stage: 7, title: "Digital Ontology", questions: 4 },
                    { stage: 8, title: "Computational Thinking", questions: 4 },
                    { stage: 9, title: "Emergence Theory", questions: 4 },
                    { stage: 10, title: "Complexity Science", questions: 4 },
                    { stage: 11, title: "Quantum Computing", questions: 4 },
                    { stage: 12, title: "Consciousness Studies", questions: 4 },
                    { stage: 13, title: "Transhumanism", questions: 4 },
                    { stage: 14, title: "Digital Metaphysics", questions: 4 },
                    { stage: 15, title: "Technological Singularity", questions: 4 }
                ]
            },

            // Path 5: Personal Development Journey
            personalDevelopment: {
                name: "The Self-Actualization Path",
                totalStages: 7,
                estimatedTime: "2-4 months",
                questions: 28,
                rewards: {
                    stages: [2, 4, 7],
                    unlocks: ['Personal insights', 'Growth tools', 'Mentorship access']
                },
                questionnaires: [
                    { stage: 1, title: "Self-Awareness", questions: 4 },
                    { stage: 2, title: "Goal Setting", questions: 4 },
                    { stage: 3, title: "Learning Strategies", questions: 4 },
                    { stage: 4, title: "Communication Skills", questions: 4 },
                    { stage: 5, title: "Leadership Development", questions: 4 },
                    { stage: 6, title: "Innovation Mindset", questions: 4 },
                    { stage: 7, title: "Purpose Discovery", questions: 4 }
                ]
            },

            // Path 6: Mystery & Discovery Journey
            mysteryDiscovery: {
                name: "The Digital Explorer Path",
                totalStages: 20,
                estimatedTime: "Ongoing",
                questions: 80,
                rewards: {
                    stages: [1, 3, 5, 8, 12, 16, 20],
                    unlocks: ['Hidden features', 'Secret tools', 'Advanced games', 'Easter egg access', 'Master explorer status', 'Reality manipulation', 'Dimensional travel']
                },
                questionnaires: [
                    { stage: 1, title: "Curiosity Assessment", questions: 4 },
                    { stage: 2, title: "Pattern Recognition", questions: 4 },
                    { stage: 3, title: "Problem Solving", questions: 4 },
                    { stage: 4, title: "Creative Thinking", questions: 4 },
                    { stage: 5, title: "System Analysis", questions: 4 },
                    { stage: 6, title: "Hidden Connections", questions: 4 },
                    { stage: 7, title: "Code Breaking", questions: 4 },
                    { stage: 8, title: "Mystery Solving", questions: 4 },
                    { stage: 9, title: "Lateral Thinking", questions: 4 },
                    { stage: 10, title: "Intuitive Insights", questions: 4 },
                    { stage: 11, title: "Deep Exploration", questions: 4 },
                    { stage: 12, title: "Advanced Discovery", questions: 4 },
                    { stage: 13, title: "Reality Perception", questions: 4 },
                    { stage: 14, title: "Dimensional Awareness", questions: 4 },
                    { stage: 15, title: "Consciousness Expansion", questions: 4 },
                    { stage: 16, title: "Transcendent Logic", questions: 4 },
                    { stage: 17, title: "Universal Patterns", questions: 4 },
                    { stage: 18, title: "Infinite Possibilities", questions: 4 },
                    { stage: 19, title: "Master Explorer Skills", questions: 4 },
                    { stage: 20, title: "Digital Enlightenment", questions: 4 }
                ]
            }
        };
    }

    initializeNameEvolution() {
        return {
            // Default name - stays this way for a LONG time
            default: "Terrell K. Flautt",

            // Name evolution based on extensive learning and return visits
            evolutions: [
                { threshold: 0, name: "Terrell K. Flautt" },        // Default
                { threshold: 200, name: "T.K." },                    // Major breakthrough only
                { threshold: 1000, name: "T.K. Flautt" },           // Deep engagement
                { threshold: 2500, name: "TKF" },                   // Advanced user
                { threshold: 5000, name: "⚡ TKF ⚡" },              // Master level
                { threshold: 10000, name: "∞ THE ARCHITECT ∞" }     // Transcendent
            ],

            // Special contextual variations (rare)
            contextual: {
                midnight: "The Night Coder",
                highEngagement: "T.K.",
                returnVisitor: "Welcome Back",
                developer: "Fellow Builder"
            }
        };
    }

    initializeQuestionnaires() {
        return {
            // Sample questions for each path
            technicalMastery: {
                stage1: [
                    {
                        id: "tm_s1_q1",
                        question: "What's the primary benefit of Infrastructure as Code?",
                        type: "multiple_choice",
                        options: ["Cost reduction", "Reproducibility", "Speed", "Security"],
                        correct: 1,
                        explanation: "Reproducibility ensures consistent deployments across environments."
                    },
                    {
                        id: "tm_s1_q2",
                        question: "In your experience, what's the biggest challenge in DevOps adoption?",
                        type: "open_ended",
                        category: "experience",
                        learning_value: 10
                    },
                    {
                        id: "tm_s1_q3",
                        question: "Rate your current knowledge of container orchestration (1-10):",
                        type: "scale",
                        min: 1,
                        max: 10,
                        learning_value: 5
                    },
                    {
                        id: "tm_s1_q4",
                        question: "What would you like to build with advanced DevOps skills?",
                        type: "open_ended",
                        category: "aspiration",
                        learning_value: 15
                    }
                ]
            },

            creativeInnovation: {
                stage1: [
                    {
                        id: "ci_s1_q1",
                        question: "What principle is most important in user interface design?",
                        type: "multiple_choice",
                        options: ["Aesthetics", "Functionality", "User empathy", "Innovation"],
                        correct: 2,
                        explanation: "User empathy drives designs that truly serve people's needs."
                    },
                    {
                        id: "ci_s1_q2",
                        question: "Describe a digital experience that inspired you recently:",
                        type: "open_ended",
                        category: "inspiration",
                        learning_value: 12
                    },
                    {
                        id: "ci_s1_q3",
                        question: "How important is artistic beauty in technology (1-10)?",
                        type: "scale",
                        min: 1,
                        max: 10,
                        learning_value: 8
                    },
                    {
                        id: "ci_s1_q4",
                        question: "What creative project would you love to collaborate on?",
                        type: "open_ended",
                        category: "collaboration",
                        learning_value: 18
                    }
                ]
            },

            mysteryDiscovery: {
                stage1: [
                    {
                        id: "md_s1_q1",
                        question: "What drives your curiosity most?",
                        type: "multiple_choice",
                        options: ["Solving puzzles", "Understanding systems", "Finding hidden things", "Creating connections"],
                        learning_value: 20
                    },
                    {
                        id: "md_s1_q2",
                        question: "If you found a hidden door in a website, what would you do?",
                        type: "open_ended",
                        category: "exploration",
                        learning_value: 25
                    },
                    {
                        id: "md_s1_q3",
                        question: "How comfortable are you with uncertainty (1-10)?",
                        type: "scale",
                        min: 1,
                        max: 10,
                        learning_value: 15
                    },
                    {
                        id: "md_s1_q4",
                        question: "What's the most interesting pattern you've noticed recently?",
                        type: "open_ended",
                        category: "pattern_recognition",
                        learning_value: 30
                    }
                ]
            }
        };
    }

    initializeRewards() {
        return {
            // Games and Puzzles
            games: {
                colorConsciousness: { unlocked: false, requiredLearning: 10 },
                codeBreaker: { unlocked: false, requiredLearning: 25 },
                systemPuzzle: { unlocked: false, requiredLearning: 50 },
                realityHacker: { unlocked: false, requiredLearning: 100 },
                dimensionalMaze: { unlocked: false, requiredLearning: 200 },
                consciousnessGame: { unlocked: false, requiredLearning: 500 },
                quantumChess: { unlocked: false, requiredLearning: 1000 },
                infiniteBuilder: { unlocked: false, requiredLearning: 2000 }
            },

            // Special Features
            features: {
                advancedTerminal: { unlocked: false, requiredLearning: 15 },
                secretAPIs: { unlocked: false, requiredLearning: 30 },
                hiddenDashboard: { unlocked: false, requiredLearning: 75 },
                personalityAI: { unlocked: false, requiredLearning: 150 },
                creativeSuite: { unlocked: false, requiredLearning: 300 },
                timeTravel: { unlocked: false, requiredLearning: 750 },
                realityEditor: { unlocked: false, requiredLearning: 1500 },
                consciousnessInterface: { unlocked: false, requiredLearning: 3000 }
            },

            // Evolution Stages
            evolution: {
                nameDisplay: { current: "Terrell K. Flautt", learningPoints: 0 },
                interfaceTheme: { current: "professional", unlocked: ["professional"] },
                secretAccess: { level: 0, maxLevel: 10 },
                mentorship: { available: false, requiredLearning: 500 },
                collaboration: { available: false, requiredLearning: 1000 },
                transcendence: { available: false, requiredLearning: 5000 }
            }
        };
    }

    async init() {
        // Load user progress from DynamoDB
        await this.loadProgressFromDynamoDB();

        // Update name display based on learning
        this.updateNameDisplay();

        // Check for newly unlocked rewards
        this.checkUnlockedRewards();

        // Set up auto-save
        this.setupAutoSave();
    }

    generateOrGetUserId() {
        let userId = localStorage.getItem('terrellflautt_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('terrellflautt_user_id', userId);
        }
        return userId;
    }

    async loadProgressFromDynamoDB() {
        try {
            const response = await fetch(`${this.apiEndpoint}/progress/${this.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.userProgress = { ...this.userProgress, ...data };
            }
        } catch (error) {
            console.log('Loading from local storage as fallback');
            // Fallback to localStorage if DynamoDB isn't available
            const stored = localStorage.getItem('terrellflautt_progress');
            if (stored) {
                this.userProgress = { ...this.userProgress, ...JSON.parse(stored) };
            }
        }
    }

    async saveProgressToDynamoDB() {
        try {
            await fetch(`${this.apiEndpoint}/progress/${this.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: this.userId,
                    progress: this.userProgress,
                    lastUpdated: new Date().toISOString()
                })
            });
        } catch (error) {
            // Fallback to localStorage
            localStorage.setItem('terrellflautt_progress', JSON.stringify(this.userProgress));
        }
    }

    async submitQuestionnaireAnswer(pathId, stageId, questionId, answer) {
        const answerData = {
            userId: this.userId,
            pathId,
            stageId,
            questionId,
            answer,
            timestamp: new Date().toISOString()
        };

        // Store locally
        if (!this.userProgress.answers) this.userProgress.answers = {};
        this.userProgress.answers[questionId] = answerData;

        // Calculate learning points from answer
        const learningPoints = this.calculateLearningPoints(pathId, stageId, questionId, answer);
        this.addLearningPoints(learningPoints);

        // Save to DynamoDB
        try {
            await fetch(`${this.apiEndpoint}/answers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answerData)
            });
        } catch (error) {
            console.log('Answer saved locally, will sync when connection available');
        }

        return learningPoints;
    }

    calculateLearningPoints(pathId, stageId, questionId, answer) {
        // Base points for participation
        let points = 5;

        // Additional points based on answer quality and type
        if (typeof answer === 'string' && answer.length > 50) {
            points += 10; // Thoughtful written responses
        }

        if (typeof answer === 'string' && answer.length > 200) {
            points += 15; // Deep, detailed responses
        }

        // Path-specific bonuses
        const pathBonuses = {
            technicalMastery: 10,
            creativeInnovation: 12,
            businessStrategy: 8,
            philosophicalExploration: 15,
            personalDevelopment: 7,
            mysteryDiscovery: 20
        };

        points += pathBonuses[pathId] || 5;

        return points;
    }

    addLearningPoints(points) {
        if (!this.userProgress.totalLearningPoints) {
            this.userProgress.totalLearningPoints = 0;
        }
        this.userProgress.totalLearningPoints += points;

        // Update name display
        this.updateNameDisplay();

        // Check for new unlocks
        this.checkUnlockedRewards();

        // Save progress
        this.saveProgressToDynamoDB();
    }

    updateNameDisplay() {
        const totalPoints = this.userProgress.totalLearningPoints || 0;
        const nameElement = document.querySelector('.hero-title .title-line:first-child');

        if (nameElement) {
            let newName = "Terrell K. Flautt"; // Default

            // Find the highest threshold the user has reached
            for (let i = this.nameEvolution.evolutions.length - 1; i >= 0; i--) {
                const evolution = this.nameEvolution.evolutions[i];
                if (totalPoints >= evolution.threshold) {
                    newName = evolution.name;
                    break;
                }
            }

            nameElement.textContent = newName;

            // Update rewards tracking
            this.rewards.evolution.nameDisplay.current = newName;
            this.rewards.evolution.nameDisplay.learningPoints = totalPoints;
        }
    }

    checkUnlockedRewards() {
        const totalPoints = this.userProgress.totalLearningPoints || 0;

        // Check games
        Object.keys(this.rewards.games).forEach(gameId => {
            const game = this.rewards.games[gameId];
            if (!game.unlocked && totalPoints >= game.requiredLearning) {
                game.unlocked = true;
                this.showUnlockNotification('game', gameId);
            }
        });

        // Check features
        Object.keys(this.rewards.features).forEach(featureId => {
            const feature = this.rewards.features[featureId];
            if (!feature.unlocked && totalPoints >= feature.requiredLearning) {
                feature.unlocked = true;
                this.showUnlockNotification('feature', featureId);
            }
        });
    }

    showUnlockNotification(type, id) {
        // Subtle notification that something new is available
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(102, 126, 234, 0.1);
            border: 1px solid rgba(102, 126, 234, 0.3);
            padding: 1rem;
            border-radius: 8px;
            color: rgba(102, 126, 234, 0.9);
            z-index: 10001;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        notification.textContent = `New ${type} unlocked!`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    loadUserProgress() {
        const stored = localStorage.getItem('terrellflautt_comprehensive_progress');
        return stored ? JSON.parse(stored) : {
            currentPaths: [],
            completedStages: {},
            answers: {},
            totalLearningPoints: 0,
            unlocked: {},
            achievements: [],
            startDate: new Date().toISOString()
        };
    }

    setupAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            this.saveProgressToDynamoDB();
        }, 30000);

        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveProgressToDynamoDB();
        });
    }

    // Public methods for journey interaction
    startJourney(pathId) {
        if (!this.userProgress.currentPaths.includes(pathId)) {
            this.userProgress.currentPaths.push(pathId);
            this.saveProgressToDynamoDB();
        }
    }

    getCurrentStage(pathId) {
        const completed = this.userProgress.completedStages[pathId] || 0;
        return completed + 1;
    }

    getAvailableRewards() {
        const available = {};

        Object.keys(this.rewards.games).forEach(gameId => {
            if (this.rewards.games[gameId].unlocked) {
                available[gameId] = 'game';
            }
        });

        Object.keys(this.rewards.features).forEach(featureId => {
            if (this.rewards.features[featureId].unlocked) {
                available[featureId] = 'feature';
            }
        });

        return available;
    }

    getTotalProgress() {
        return {
            learningPoints: this.userProgress.totalLearningPoints || 0,
            pathsStarted: this.userProgress.currentPaths.length,
            questionsAnswered: Object.keys(this.userProgress.answers || {}).length,
            currentName: this.rewards.evolution.nameDisplay.current,
            unlockedRewards: this.getAvailableRewards()
        };
    }
}

// Initialize the comprehensive journey system
window.comprehensiveJourney = new ComprehensiveJourneySystem();

// Expose methods for integration
window.startLearningJourney = (pathId) => window.comprehensiveJourney.startJourney(pathId);
window.submitAnswer = (pathId, stageId, questionId, answer) =>
    window.comprehensiveJourney.submitQuestionnaireAnswer(pathId, stageId, questionId, answer);
window.getUserProgress = () => window.comprehensiveJourney.getTotalProgress();