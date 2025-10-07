/**
 * Smart Blog Recommendation System
 * Learns user preferences and displays relevant content
 */

class SmartBlog {
    constructor() {
        this.userPreferences = this.loadUserPreferences();
        this.readingHistory = this.loadReadingHistory();
        this.interactionPatterns = this.loadInteractionPatterns();
        this.blogCategories = {
            'ai': {
                weight: 0,
                keywords: ['artificial intelligence', 'machine learning', 'ai', 'neural', 'automation'],
                posts: []
            },
            'programming': {
                weight: 0,
                keywords: ['javascript', 'coding', 'development', 'api', 'frontend', 'backend'],
                posts: []
            },
            'devops': {
                weight: 0,
                keywords: ['cloud', 'aws', 'deployment', 'infrastructure', 'docker', 'kubernetes'],
                posts: []
            },
            'design': {
                weight: 0,
                keywords: ['ui', 'ux', 'interface', 'user experience', 'visual', 'typography'],
                posts: []
            },
            'business': {
                weight: 0,
                keywords: ['startup', 'entrepreneur', 'strategy', 'growth', 'marketing'],
                posts: []
            }
        };

        this.init();
    }

    init() {
        this.trackUserBehavior();
        this.loadBlogPosts();
        this.createBlogRecommendationWidget();
        this.analyzeUserInterests();
    }

    loadUserPreferences() {
        return JSON.parse(localStorage.getItem('terrellflautt_blog_preferences') || '{}');
    }

    loadReadingHistory() {
        return JSON.parse(localStorage.getItem('terrellflautt_reading_history') || '[]');
    }

    loadInteractionPatterns() {
        return JSON.parse(localStorage.getItem('terrellflautt_interaction_patterns') || '{}');
    }

    trackUserBehavior() {
        // Track scrolling patterns to detect interest
        let scrollDepth = 0;
        let timeOnPage = Date.now();

        window.addEventListener('scroll', () => {
            const currentDepth = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            scrollDepth = Math.max(scrollDepth, currentDepth);
        });

        // Track clicks on different content types
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-category], .project-card, .nav-link');
            if (target) {
                this.recordInteraction(target);
            }
        });

        // Track time spent on different sections
        this.trackSectionTime();
    }

    trackSectionTime() {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.startSectionTimer(sectionId);
                } else {
                    const sectionId = entry.target.id;
                    this.endSectionTimer(sectionId);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    startSectionTimer(sectionId) {
        if (!this.interactionPatterns.sectionTime) {
            this.interactionPatterns.sectionTime = {};
        }
        this.interactionPatterns.sectionTime[sectionId + '_start'] = Date.now();
    }

    endSectionTimer(sectionId) {
        if (this.interactionPatterns.sectionTime && this.interactionPatterns.sectionTime[sectionId + '_start']) {
            const timeSpent = Date.now() - this.interactionPatterns.sectionTime[sectionId + '_start'];

            if (!this.interactionPatterns.sectionTime[sectionId + '_total']) {
                this.interactionPatterns.sectionTime[sectionId + '_total'] = 0;
            }

            this.interactionPatterns.sectionTime[sectionId + '_total'] += timeSpent;
            delete this.interactionPatterns.sectionTime[sectionId + '_start'];

            this.saveInteractionPatterns();
        }
    }

    recordInteraction(element) {
        const category = this.inferCategoryFromElement(element);
        const timestamp = Date.now();

        // Record interaction
        if (!this.interactionPatterns.clicks) {
            this.interactionPatterns.clicks = {};
        }

        if (!this.interactionPatterns.clicks[category]) {
            this.interactionPatterns.clicks[category] = 0;
        }

        this.interactionPatterns.clicks[category]++;
        this.saveInteractionPatterns();

        // Update category weights
        this.updateCategoryWeight(category, 0.1);
    }

    inferCategoryFromElement(element) {
        const text = element.textContent.toLowerCase();
        const dataCategory = element.getAttribute('data-category');

        if (dataCategory) return dataCategory;

        // Analyze text content to infer category
        for (const [category, data] of Object.entries(this.blogCategories)) {
            for (const keyword of data.keywords) {
                if (text.includes(keyword)) {
                    return category;
                }
            }
        }

        // Check project-specific categories
        if (text.includes('devops') || text.includes('cloud') || text.includes('aws')) return 'devops';
        if (text.includes('design') || text.includes('ui') || text.includes('ux')) return 'design';
        if (text.includes('development') || text.includes('programming')) return 'programming';

        return 'general';
    }

    updateCategoryWeight(category, increment) {
        if (this.blogCategories[category]) {
            this.blogCategories[category].weight += increment;
            this.userPreferences[category] = (this.userPreferences[category] || 0) + increment;
            this.saveUserPreferences();
        }
    }

    async loadBlogPosts() {
        // Load blog post metadata
        const blogIndex = {
            'programming': [
                {
                    title: 'Portfolio Magic System',
                    description: 'Building an interactive portfolio with hidden features',
                    file: 'portfolio-magic-system.html',
                    keywords: ['javascript', 'portfolio', 'interactive', 'web development'],
                    readTime: 8
                },
                {
                    title: 'User Fingerprinting Techniques',
                    description: 'Ethical user tracking and personalization methods',
                    file: 'user-fingerprinting.html',
                    keywords: ['tracking', 'analytics', 'user experience', 'privacy'],
                    readTime: 6
                },
                {
                    title: 'Logo Evolution System',
                    description: 'Dynamic brand identity that responds to user interaction',
                    file: 'logo-evolution.html',
                    keywords: ['branding', 'animation', 'user interaction', 'design'],
                    readTime: 5
                },
                {
                    title: 'Adaptive Menu Design',
                    description: 'Creating menus that learn from user behavior',
                    file: 'adaptive-menu.html',
                    keywords: ['ui', 'ux', 'adaptive design', 'navigation'],
                    readTime: 4
                }
            ],
            'ai': [],
            'devops': [],
            'design': [],
            'business': []
        };

        // Store blog posts
        for (const [category, posts] of Object.entries(blogIndex)) {
            this.blogCategories[category].posts = posts;
        }
    }

    analyzeUserInterests() {
        // Analyze reading history and interaction patterns
        const totalInteractions = Object.values(this.interactionPatterns.clicks || {})
            .reduce((sum, count) => sum + count, 0);

        if (totalInteractions === 0) {
            // New user - show general programming content
            this.userPreferences.programming = 0.3;
            this.userPreferences.devops = 0.2;
            return;
        }

        // Calculate category preferences based on interactions
        for (const [category, data] of Object.entries(this.blogCategories)) {
            const clickCount = this.interactionPatterns.clicks?.[category] || 0;
            const sectionTime = this.interactionPatterns.sectionTime?.[category + '_total'] || 0;

            // Combine click frequency and time spent
            const timeWeight = Math.min(sectionTime / 60000, 1); // Cap at 1 minute
            const clickWeight = Math.min(clickCount / totalInteractions, 0.5);

            data.weight = (timeWeight * 0.6) + (clickWeight * 0.4);
            this.userPreferences[category] = data.weight;
        }

        this.saveUserPreferences();
    }

    createBlogRecommendationWidget() {
        // Only show if user has shown interest (2+ visits or 5+ minutes)
        const visitCount = parseInt(localStorage.getItem('terrellflautt_visit_count') || '0');
        const totalTime = parseInt(localStorage.getItem('terrellflautt_total_time') || '0');

        if (visitCount < 2 && totalTime < 300000) return;

        const recommendations = this.getPersonalizedRecommendations();
        if (recommendations.length === 0) return;

        this.showBlogWidget(recommendations);
    }

    getPersonalizedRecommendations() {
        const allPosts = [];

        // Collect all posts with category weights
        for (const [category, data] of Object.entries(this.blogCategories)) {
            data.posts.forEach(post => {
                allPosts.push({
                    ...post,
                    category,
                    score: this.calculatePostScore(post, category)
                });
            });
        }

        // Sort by score and return top 3
        return allPosts
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .filter(post => post.score > 0.1); // Only show relevant posts
    }

    calculatePostScore(post, category) {
        const categoryWeight = this.userPreferences[category] || 0;
        const keywordMatches = this.getKeywordMatches(post);
        const readingHistoryBonus = this.getReadingHistoryBonus(post);

        return (categoryWeight * 0.5) + (keywordMatches * 0.3) + (readingHistoryBonus * 0.2);
    }

    getKeywordMatches(post) {
        // Analyze user's past interactions for keyword preferences
        const userKeywords = this.extractUserKeywords();
        let matches = 0;

        post.keywords.forEach(keyword => {
            if (userKeywords.includes(keyword.toLowerCase())) {
                matches += 0.1;
            }
        });

        return Math.min(matches, 0.5);
    }

    extractUserKeywords() {
        // Extract keywords from interaction history
        const keywords = [];
        // This would analyze clicked elements, search terms, etc.
        return keywords;
    }

    getReadingHistoryBonus(post) {
        // Boost similar posts if user has read related content
        const relatedReads = this.readingHistory.filter(read =>
            read.category === post.category ||
            read.keywords.some(k => post.keywords.includes(k))
        );

        return Math.min(relatedReads.length * 0.1, 0.3);
    }

    showBlogWidget(recommendations) {
        // Create subtle blog recommendation widget
        const widget = document.createElement('div');
        widget.id = 'blog-recommendations';
        widget.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            max-width: 300px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 16px;
            border-radius: 12px;
            font-size: 0.85rem;
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;

        widget.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h4 style="margin: 0; font-size: 0.9rem; color: #00ffff;">📚 Recommended for You</h4>
                <button id="close-blog-widget" style="background: none; border: none; color: #888; cursor: pointer; font-size: 1.2rem;">×</button>
            </div>
            <div class="blog-recommendations-list">
                ${recommendations.map(post => `
                    <div class="blog-recommendation" data-category="${post.category}" data-file="${post.file}" style="
                        margin-bottom: 10px;
                        padding: 8px;
                        border-radius: 6px;
                        background: rgba(255, 255, 255, 0.05);
                        cursor: pointer;
                        transition: background 0.3s ease;
                    ">
                        <div style="font-weight: 500; color: #ffffff; margin-bottom: 4px;">${post.title}</div>
                        <div style="font-size: 0.75rem; color: #cccccc; margin-bottom: 4px;">${post.description}</div>
                        <div style="font-size: 0.7rem; color: #888;">
                            <span>${post.readTime} min read</span>
                            <span style="margin-left: 8px; color: #00ffff;">${post.category}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        document.body.appendChild(widget);

        // Show with delay
        setTimeout(() => {
            widget.style.opacity = '1';
            widget.style.transform = 'translateY(0)';
        }, 2000);

        // Add click handlers
        this.setupBlogWidgetHandlers(widget);

        // Auto-hide after 15 seconds
        setTimeout(() => {
            this.hideBlogWidget(widget);
        }, 15000);
    }

    setupBlogWidgetHandlers(widget) {
        // Close button
        widget.querySelector('#close-blog-widget').addEventListener('click', () => {
            this.hideBlogWidget(widget);
        });

        // Blog post clicks
        widget.querySelectorAll('.blog-recommendation').forEach(rec => {
            rec.addEventListener('click', () => {
                const category = rec.getAttribute('data-category');
                const file = rec.getAttribute('data-file');
                this.openBlogPost(category, file);
                this.hideBlogWidget(widget);
            });
        });
    }

    openBlogPost(category, file) {
        const url = `/blog/${category}/${file}`;

        // Record reading intention
        this.recordBlogInteraction(category, file);

        // Open blog post
        window.open(url, '_blank');
    }

    recordBlogInteraction(category, file) {
        // Record that user showed interest in this type of content
        this.updateCategoryWeight(category, 0.2);

        // Add to reading history
        this.readingHistory.push({
            category,
            file,
            timestamp: Date.now(),
            source: 'recommendation'
        });

        this.saveReadingHistory();
    }

    hideBlogWidget(widget) {
        widget.style.opacity = '0';
        widget.style.transform = 'translateY(20px)';
        setTimeout(() => widget.remove(), 500);
    }

    saveUserPreferences() {
        localStorage.setItem('terrellflautt_blog_preferences', JSON.stringify(this.userPreferences));
    }

    saveReadingHistory() {
        // Keep only last 50 entries
        if (this.readingHistory.length > 50) {
            this.readingHistory = this.readingHistory.slice(-50);
        }
        localStorage.setItem('terrellflautt_reading_history', JSON.stringify(this.readingHistory));
    }

    saveInteractionPatterns() {
        localStorage.setItem('terrellflautt_interaction_patterns', JSON.stringify(this.interactionPatterns));
    }

    // Public method to get user interests for other systems
    getUserInterests() {
        return {
            preferences: this.userPreferences,
            topCategory: this.getTopCategory(),
            engagementLevel: this.getEngagementLevel()
        };
    }

    getTopCategory() {
        return Object.entries(this.userPreferences)
            .sort(([,a], [,b]) => b - a)[0]?.[0] || 'programming';
    }

    getEngagementLevel() {
        const totalWeight = Object.values(this.userPreferences)
            .reduce((sum, weight) => sum + weight, 0);

        if (totalWeight < 0.1) return 'new';
        if (totalWeight < 0.5) return 'casual';
        if (totalWeight < 1.0) return 'interested';
        return 'engaged';
    }
}

// Initialize smart blog system
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.smartBlog = new SmartBlog();
    });
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartBlog;
}