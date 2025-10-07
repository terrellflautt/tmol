// User Profile Tracking System
// Comprehensive user journey and behavior analysis

const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION || 'us-east-1'
});

const TABLE_NAME = 'terrellflautt-user-profiles';

// Create comprehensive user profile
router.post('/profile', async (req, res) => {
    try {
        const {
            magicId,
            fingerprint,
            session,
            location,
            device,
            behavior,
            discoveries,
            answers,
            journey
        } = req.body;

        const timestamp = Date.now();
        const profile = {
            userId: magicId,
            fingerprint,
            createdAt: timestamp,
            lastActive: timestamp,

            // Identity data
            identity: {
                magicId,
                sessionId: session,
                fingerprint,
                firstSeen: timestamp
            },

            // Location intelligence
            location: {
                ip: location?.ip,
                city: location?.city,
                country: location?.country,
                timezone: location?.timezone,
                lat: location?.lat,
                lon: location?.lon,
                isp: location?.org
            },

            // Device fingerprint
            device: {
                userAgent: device?.userAgent,
                screen: device?.screen,
                platform: device?.platform,
                language: device?.language,
                timezone: device?.timezone,
                cookies: device?.cookieEnabled,
                connection: device?.connection
            },

            // Behavioral patterns
            behavior: {
                visits: 0,
                totalTime: 0,
                interactions: [],
                clickPatterns: [],
                scrollBehavior: {},
                timePatterns: {},
                curiosityScore: 0
            },

            // Discovery journey
            discoveries: [],

            // User answers/responses
            answers: {},

            // Journey mapping
            journey: {
                steps: [],
                milestones: [],
                achievements: [],
                personalizations: []
            },

            // Intelligence gathered
            intelligence: {
                personality: {},
                interests: [],
                patterns: {},
                predictions: {}
            }
        };

        await dynamodb.put({
            TableName: TABLE_NAME,
            Item: profile
        }).promise();

        res.json({ success: true, userId: magicId });

    } catch (error) {
        console.error('Profile creation error:', error);
        res.status(500).json({ error: 'Failed to create profile' });
    }
});

// Update user profile with new data
router.put('/profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;
        const timestamp = Date.now();

        const updateExpression = [];
        const expressionAttributeValues = {};
        const expressionAttributeNames = {};

        // Update last active
        updateExpression.push('#lastActive = :timestamp');
        expressionAttributeNames['#lastActive'] = 'lastActive';
        expressionAttributeValues[':timestamp'] = timestamp;

        // Handle different update types
        if (updates.discovery) {
            updateExpression.push('#discoveries = list_append(if_not_exists(#discoveries, :empty_list), :discovery)');
            expressionAttributeNames['#discoveries'] = 'discoveries';
            expressionAttributeValues[':discovery'] = [{
                ...updates.discovery,
                timestamp
            }];
            expressionAttributeValues[':empty_list'] = [];
        }

        if (updates.answer) {
            updateExpression.push('#answers.#answerId = :answer');
            expressionAttributeNames['#answers'] = 'answers';
            expressionAttributeNames['#answerId'] = updates.answer.id;
            expressionAttributeValues[':answer'] = {
                ...updates.answer,
                timestamp
            };
        }

        if (updates.journeyStep) {
            updateExpression.push('#journey.#steps = list_append(if_not_exists(#journey.#steps, :empty_list), :step)');
            expressionAttributeNames['#journey'] = 'journey';
            expressionAttributeNames['#steps'] = 'steps';
            expressionAttributeValues[':step'] = [{
                ...updates.journeyStep,
                timestamp
            }];
            expressionAttributeValues[':empty_list'] = [];
        }

        if (updates.behavior) {
            if (updates.behavior.interaction) {
                updateExpression.push('#behavior.#interactions = list_append(if_not_exists(#behavior.#interactions, :empty_list), :interaction)');
                expressionAttributeNames['#behavior'] = 'behavior';
                expressionAttributeNames['#interactions'] = 'interactions';
                expressionAttributeValues[':interaction'] = [{
                    ...updates.behavior.interaction,
                    timestamp
                }];
                expressionAttributeValues[':empty_list'] = [];
            }

            if (updates.behavior.curiosityIncrease) {
                updateExpression.push('#behavior.#curiosityScore = if_not_exists(#behavior.#curiosityScore, :zero) + :increase');
                expressionAttributeNames['#behavior'] = 'behavior';
                expressionAttributeNames['#curiosityScore'] = 'curiosityScore';
                expressionAttributeValues[':increase'] = updates.behavior.curiosityIncrease;
                expressionAttributeValues[':zero'] = 0;
            }
        }

        if (updates.intelligence) {
            Object.keys(updates.intelligence).forEach(key => {
                updateExpression.push(`#intelligence.#${key} = :${key}`);
                expressionAttributeNames['#intelligence'] = 'intelligence';
                expressionAttributeNames[`#${key}`] = key;
                expressionAttributeValues[`:${key}`] = updates.intelligence[key];
            });
        }

        await dynamodb.update({
            TableName: TABLE_NAME,
            Key: { userId },
            UpdateExpression: `SET ${updateExpression.join(', ')}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues
        }).promise();

        res.json({ success: true });

    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Get user profile
router.get('/profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await dynamodb.get({
            TableName: TABLE_NAME,
            Key: { userId }
        }).promise();

        if (!result.Item) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json(result.Item);

    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Track specific user action
router.post('/track/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { action, data } = req.body;
        const timestamp = Date.now();

        const tracking = {
            userId,
            action,
            data,
            timestamp,
            sessionTime: timestamp,
            url: data?.url || req.headers.referer,
            userAgent: req.headers['user-agent'],
            ip: req.ip || req.connection.remoteAddress
        };

        // Store in separate tracking table for detailed analytics
        await dynamodb.put({
            TableName: 'terrellflautt-user-tracking',
            Item: tracking
        }).promise();

        // Update main profile based on action type
        const updateData = {};

        switch (action) {
            case 'page_view':
                updateData.behavior = {
                    interaction: {
                        type: 'page_view',
                        page: data.page,
                        timeSpent: data.timeSpent
                    }
                };
                break;

            case 'discovery':
                updateData.discovery = {
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    context: data.context
                };
                break;

            case 'answer':
                updateData.answer = {
                    id: data.questionId,
                    question: data.question,
                    answer: data.answer,
                    context: data.context
                };
                break;

            case 'interaction':
                updateData.behavior = {
                    interaction: {
                        type: data.type,
                        element: data.element,
                        details: data.details
                    },
                    curiosityIncrease: 1
                };
                break;

            case 'journey_step':
                updateData.journeyStep = {
                    step: data.step,
                    action: data.action,
                    context: data.context,
                    progress: data.progress
                };
                break;
        }

        // Update profile if we have update data
        if (Object.keys(updateData).length > 0) {
            await router.handle({
                method: 'PUT',
                url: `/profile/${userId}`,
                params: { userId },
                body: updateData
            }, res);
        } else {
            res.json({ success: true, tracked: true });
        }

    } catch (error) {
        console.error('Tracking error:', error);
        res.status(500).json({ error: 'Failed to track action' });
    }
});

// Get user analytics
router.get('/analytics/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Get main profile
        const profile = await dynamodb.get({
            TableName: TABLE_NAME,
            Key: { userId }
        }).promise();

        // Get detailed tracking data
        const tracking = await dynamodb.query({
            TableName: 'terrellflautt-user-tracking',
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            },
            ScanIndexForward: false,
            Limit: 100
        }).promise();

        const analytics = {
            profile: profile.Item,
            recentActivity: tracking.Items,
            summary: {
                totalInteractions: tracking.Items.length,
                discoveriesCount: profile.Item?.discoveries?.length || 0,
                answersCount: Object.keys(profile.Item?.answers || {}).length,
                journeyProgress: profile.Item?.journey?.steps?.length || 0,
                curiosityScore: profile.Item?.behavior?.curiosityScore || 0
            }
        };

        res.json(analytics);

    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Failed to get analytics' });
    }
});

// Get all user profiles (admin endpoint)
router.get('/profiles', async (req, res) => {
    try {
        const { limit = 50, lastKey } = req.query;

        const params = {
            TableName: TABLE_NAME,
            Limit: parseInt(limit)
        };

        if (lastKey) {
            params.ExclusiveStartKey = JSON.parse(decodeURIComponent(lastKey));
        }

        const result = await dynamodb.scan(params).promise();

        const response = {
            profiles: result.Items,
            count: result.Items.length,
            lastKey: result.LastEvaluatedKey ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey)) : null
        };

        res.json(response);

    } catch (error) {
        console.error('Profiles fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch profiles' });
    }
});

module.exports = router;