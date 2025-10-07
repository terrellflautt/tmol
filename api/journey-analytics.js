// Journey Analytics for Development Insights
// Analyzes user data to identify journey optimization opportunities

const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION || 'us-east-1'
});

// Get journey optimization insights
router.get('/insights', async (req, res) => {
    try {
        const insights = await generateJourneyInsights();
        res.json(insights);
    } catch (error) {
        console.error('Insights generation error:', error);
        res.status(500).json({ error: 'Failed to generate insights' });
    }
});

// Get drop-off analysis
router.get('/dropoffs', async (req, res) => {
    try {
        const dropoffs = await analyzeDropoffPoints();
        res.json(dropoffs);
    } catch (error) {
        console.error('Dropoff analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze dropoffs' });
    }
});

// Get engagement patterns
router.get('/engagement', async (req, res) => {
    try {
        const patterns = await analyzeEngagementPatterns();
        res.json(patterns);
    } catch (error) {
        console.error('Engagement analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze engagement' });
    }
});

// Get discovery completion rates
router.get('/discoveries', async (req, res) => {
    try {
        const discoveries = await analyzeDiscoveryRates();
        res.json(discoveries);
    } catch (error) {
        console.error('Discovery analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze discoveries' });
    }
});

async function generateJourneyInsights() {
    // Get all user profiles
    const profiles = await getAllProfiles();

    const insights = {
        totalUsers: profiles.length,
        timestamp: Date.now(),

        // Journey progression analysis
        journeyProgression: {
            averageSteps: calculateAverageJourneySteps(profiles),
            commonPaths: identifyCommonPaths(profiles),
            stuckPoints: identifyStuckPoints(profiles),
            successfulJourneys: identifySuccessfulJourneys(profiles)
        },

        // Discovery analysis
        discoveryAnalysis: {
            mostFound: getMostFoundDiscoveries(profiles),
            leastFound: getLeastFoundDiscoveries(profiles),
            discoverySequences: analyzeDiscoverySequences(profiles),
            abandonmentPoints: findDiscoveryAbandonments(profiles)
        },

        // User behavior insights
        behaviorInsights: {
            timePatterns: analyzeTimePatterns(profiles),
            interactionPatterns: analyzeInteractionPatterns(profiles),
            curiosityDistribution: analyzeCuriosityDistribution(profiles),
            returningUserBehavior: analyzeReturningUsers(profiles)
        },

        // Technical insights
        technicalInsights: {
            deviceBreakdown: analyzeDeviceUsage(profiles),
            locationInsights: analyzeLocationPatterns(profiles),
            performanceImpacts: analyzePerformanceImpacts(profiles)
        },

        // Development recommendations
        recommendations: generateDevelopmentRecommendations(profiles)
    };

    return insights;
}

async function analyzeDropoffPoints() {
    const profiles = await getAllProfiles();
    const dropoffs = {};

    profiles.forEach(profile => {
        const journey = profile.journey?.steps || [];
        if (journey.length > 0) {
            const lastStep = journey[journey.length - 1];
            const stepKey = `${lastStep.step}_${lastStep.action}`;

            if (!dropoffs[stepKey]) {
                dropoffs[stepKey] = {
                    step: lastStep.step,
                    action: lastStep.action,
                    count: 0,
                    averageTime: 0,
                    contexts: []
                };
            }

            dropoffs[stepKey].count++;
            dropoffs[stepKey].contexts.push(lastStep.context);
        }
    });

    // Sort by highest dropoff rates
    return Object.values(dropoffs)
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);
}

async function analyzeEngagementPatterns() {
    const profiles = await getAllProfiles();

    const patterns = {
        highEngagement: [],
        mediumEngagement: [],
        lowEngagement: [],
        engagementFactors: {
            timeOfDay: {},
            dayOfWeek: {},
            discoveryTriggers: {},
            interactionTypes: {}
        }
    };

    profiles.forEach(profile => {
        const curiosityScore = profile.behavior?.curiosityScore || 0;
        const discoveries = profile.discoveries?.length || 0;
        const interactions = profile.behavior?.interactions?.length || 0;

        const engagementScore = curiosityScore + (discoveries * 5) + interactions;

        const userData = {
            userId: profile.userId,
            engagementScore,
            curiosityScore,
            discoveries,
            interactions,
            location: profile.location,
            device: profile.device,
            timePatterns: profile.behavior?.timePatterns
        };

        if (engagementScore > 100) {
            patterns.highEngagement.push(userData);
        } else if (engagementScore > 25) {
            patterns.mediumEngagement.push(userData);
        } else {
            patterns.lowEngagement.push(userData);
        }

        // Analyze engagement factors
        analyzeEngagementFactors(profile, patterns.engagementFactors);
    });

    return patterns;
}

async function analyzeDiscoveryRates() {
    const profiles = await getAllProfiles();
    const discoveryStats = {};

    profiles.forEach(profile => {
        (profile.discoveries || []).forEach(discovery => {
            if (!discoveryStats[discovery.id]) {
                discoveryStats[discovery.id] = {
                    id: discovery.id,
                    title: discovery.title,
                    count: 0,
                    averageTime: 0,
                    contexts: [],
                    userTypes: {
                        new: 0,
                        returning: 0
                    }
                };
            }

            discoveryStats[discovery.id].count++;
            discoveryStats[discovery.id].contexts.push(discovery.context);

            if (profile.behavior?.visits > 1) {
                discoveryStats[discovery.id].userTypes.returning++;
            } else {
                discoveryStats[discovery.id].userTypes.new++;
            }
        });
    });

    return {
        discoveryStats: Object.values(discoveryStats)
            .sort((a, b) => b.count - a.count),

        completionRates: calculateDiscoveryCompletionRates(discoveryStats, profiles.length),

        discoveryFlow: analyzeDiscoveryFlow(profiles),

        recommendations: generateDiscoveryRecommendations(discoveryStats)
    };
}

function generateDevelopmentRecommendations(profiles) {
    const recommendations = [];

    // Analyze common patterns
    const commonIssues = findCommonIssues(profiles);
    const successPatterns = findSuccessPatterns(profiles);
    const improvementAreas = identifyImprovementAreas(profiles);

    // Generate specific recommendations
    if (commonIssues.lowDiscoveryRate) {
        recommendations.push({
            priority: 'high',
            type: 'discovery',
            issue: 'Low discovery completion rates',
            suggestion: 'Add more intuitive discovery triggers and clearer visual cues',
            affectedUsers: commonIssues.lowDiscoveryRate.count,
            expectedImpact: 'medium'
        });
    }

    if (commonIssues.quickBounce) {
        recommendations.push({
            priority: 'high',
            type: 'engagement',
            issue: 'High bounce rate on first visit',
            suggestion: 'Improve initial engagement with immediate interactive elements',
            affectedUsers: commonIssues.quickBounce.count,
            expectedImpact: 'high'
        });
    }

    if (improvementAreas.mobileExperience) {
        recommendations.push({
            priority: 'medium',
            type: 'technical',
            issue: 'Mobile user engagement lower than desktop',
            suggestion: 'Optimize touch interactions and mobile-specific discovery methods',
            affectedUsers: improvementAreas.mobileExperience.count,
            expectedImpact: 'medium'
        });
    }

    return recommendations;
}

async function getAllProfiles() {
    const params = {
        TableName: 'terrellflautt-user-profiles'
    };

    const result = await dynamodb.scan(params).promise();
    return result.Items || [];
}

// Helper functions for analysis
function calculateAverageJourneySteps(profiles) {
    const totalSteps = profiles.reduce((sum, profile) => {
        return sum + (profile.journey?.steps?.length || 0);
    }, 0);
    return totalSteps / profiles.length;
}

function identifyCommonPaths(profiles) {
    const pathCounts = {};

    profiles.forEach(profile => {
        const steps = profile.journey?.steps || [];
        if (steps.length > 1) {
            const path = steps.map(step => step.step).join(' -> ');
            pathCounts[path] = (pathCounts[path] || 0) + 1;
        }
    });

    return Object.entries(pathCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([path, count]) => ({ path, count }));
}

function identifyStuckPoints(profiles) {
    const stuckPoints = {};

    profiles.forEach(profile => {
        const steps = profile.journey?.steps || [];
        if (steps.length > 0) {
            const lastStep = steps[steps.length - 1];
            const timeSinceLastStep = Date.now() - lastStep.timestamp;

            // If user hasn't progressed in over 24 hours, consider them stuck
            if (timeSinceLastStep > 24 * 60 * 60 * 1000) {
                const stuckAt = lastStep.step;
                stuckPoints[stuckAt] = (stuckPoints[stuckAt] || 0) + 1;
            }
        }
    });

    return Object.entries(stuckPoints)
        .sort(([,a], [,b]) => b - a)
        .map(([step, count]) => ({ step, count }));
}

module.exports = router;