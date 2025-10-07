const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
};

exports.handler = async (event) => {
    try {
        const method = event.httpMethod;

        if (method === 'OPTIONS') {
            return {
                statusCode: 200,
                headers: corsHeaders
            };
        }

        if (method === 'POST') {
            return await syncTrackingData(event);
        } else if (method === 'GET') {
            return await getTrackingData(event);
        }

        return {
            statusCode: 405,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Method not allowed' })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};

async function syncTrackingData(event) {
    const body = JSON.parse(event.body);
    const { userId, email, metrics, events, timestamp, isDonater, isAdmin } = body;

    if (!userId) {
        return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'userId required' })
        };
    }

    // Save comprehensive tracking data
    const trackingItem = {
        userId: userId,
        email: email || null,
        timestamp: timestamp || Date.now(),
        metrics: metrics || {},
        isDonater: isDonater || false,
        isAdmin: isAdmin || false,
        lastSyncDate: new Date().toISOString(),
        ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year TTL
    };

    // Store main tracking data
    await dynamodb.put({
        TableName: process.env.TRACKING_TABLE || 'terrellflautt-comprehensive-tracking',
        Item: trackingItem
    }).promise();

    // Store individual events if provided
    if (events && events.length > 0) {
        const eventBatch = events.map(event => ({
            PutRequest: {
                Item: {
                    userId: userId,
                    eventId: `${event.timestamp}_${Math.random().toString(36).substr(2, 9)}`,
                    timestamp: event.timestamp,
                    eventType: event.type,
                    eventData: event.data || {},
                    sessionId: event.sessionId || null,
                    ttl: Math.floor(Date.now() / 1000) + (90 * 24 * 60 * 60) // 90 days TTL for events
                }
            }
        }));

        // Batch write events (DynamoDB batch limit is 25)
        for (let i = 0; i < eventBatch.length; i += 25) {
            const batch = eventBatch.slice(i, i + 25);
            await dynamodb.batchWrite({
                RequestItems: {
                    [process.env.TRACKING_EVENTS_TABLE || 'terrellflautt-tracking-events']: batch
                }
            }).promise();
        }
    }

    // Update Hall of Fame rankings
    await updateHallOfFame(userId, metrics);

    return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
            success: true,
            syncedAt: new Date().toISOString(),
            eventsProcessed: events ? events.length : 0
        })
    };
}

async function getTrackingData(event) {
    const userId = event.pathParameters?.userId || event.queryStringParameters?.userId;

    if (!userId) {
        return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'userId required' })
        };
    }

    try {
        // Get comprehensive tracking data
        const result = await dynamodb.get({
            TableName: process.env.TRACKING_TABLE || 'terrellflautt-comprehensive-tracking',
            Key: { userId: userId }
        }).promise();

        if (!result.Item) {
            return {
                statusCode: 404,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'User tracking data not found' })
            };
        }

        // Get recent events
        const eventsResult = await dynamodb.query({
            TableName: process.env.TRACKING_EVENTS_TABLE || 'terrellflautt-tracking-events',
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            },
            ScanIndexForward: false,
            Limit: 100
        }).promise();

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                trackingData: result.Item,
                recentEvents: eventsResult.Items || [],
                hallOfFamePosition: await getHallOfFamePosition(userId)
            })
        };

    } catch (error) {
        console.error('Error getting tracking data:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Failed to get tracking data' })
        };
    }
}

async function updateHallOfFame(userId, metrics) {
    if (!metrics) return;

    const hallOfFameCategories = {
        'Master Explorer': { metric: 'locationsDiscovered', icon: '🗺️' },
        'Story Sage': { metric: 'storiesHeard', icon: '📚' },
        'Skill Master': { metric: 'totalExperience', icon: '⭐' },
        'Creative Soul': { metric: 'creativeWorks', icon: '🎨' },
        'Generous Heart': { metric: 'donationTotal', icon: '💝' },
        'Time Traveler': { metric: 'totalTimeSpent', icon: '⏰' },
        'Secret Keeper': { metric: 'secretsFound', icon: '🔮' },
        'Reality Bender': { metric: 'realityManipulations', icon: '🌀' },
        'Cosmic Wanderer': { metric: 'cosmicAwareness', icon: '🌌' },
        'Hero of Legends': { metric: 'bossesDefeated', icon: '⚔️' }
    };

    const hallOfFameUpdates = [];

    // Update each category
    for (const [category, config] of Object.entries(hallOfFameCategories)) {
        const value = metrics[config.metric] || 0;
        if (value > 0) {
            hallOfFameUpdates.push({
                PutRequest: {
                    Item: {
                        category: category,
                        userId: userId,
                        value: value,
                        icon: config.icon,
                        timestamp: Date.now(),
                        ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year TTL
                    }
                }
            });
        }
    }

    // Batch write Hall of Fame updates
    if (hallOfFameUpdates.length > 0) {
        for (let i = 0; i < hallOfFameUpdates.length; i += 25) {
            const batch = hallOfFameUpdates.slice(i, i + 25);
            await dynamodb.batchWrite({
                RequestItems: {
                    [process.env.HALL_OF_FAME_TABLE || 'terrellflautt-hall-of-fame']: batch
                }
            }).promise();
        }
    }
}

async function getHallOfFamePosition(userId) {
    try {
        // Get user's position in different categories
        const categories = [
            'Master Explorer', 'Story Sage', 'Skill Master', 'Creative Soul',
            'Generous Heart', 'Time Traveler', 'Secret Keeper', 'Reality Bender',
            'Cosmic Wanderer', 'Hero of Legends'
        ];

        const positions = {};

        for (const category of categories) {
            const result = await dynamodb.query({
                TableName: process.env.HALL_OF_FAME_TABLE || 'terrellflautt-hall-of-fame',
                KeyConditionExpression: 'category = :category',
                ExpressionAttributeValues: {
                    ':category': category
                },
                ScanIndexForward: false // Get highest scores first
            }).promise();

            const userIndex = result.Items.findIndex(item => item.userId === userId);
            if (userIndex !== -1) {
                positions[category] = {
                    position: userIndex + 1,
                    totalUsers: result.Items.length,
                    value: result.Items[userIndex].value
                };
            }
        }

        return positions;

    } catch (error) {
        console.error('Error getting Hall of Fame position:', error);
        return {};
    }
}

// Get leaderboard for a specific category
async function getLeaderboard(category, limit = 10) {
    try {
        const result = await dynamodb.query({
            TableName: process.env.HALL_OF_FAME_TABLE || 'terrellflautt-hall-of-fame',
            KeyConditionExpression: 'category = :category',
            ExpressionAttributeValues: {
                ':category': category
            },
            ScanIndexForward: false,
            Limit: limit
        }).promise();

        return result.Items.map((item, index) => ({
            position: index + 1,
            userId: item.userId,
            value: item.value,
            icon: item.icon
        }));

    } catch (error) {
        console.error('Error getting leaderboard:', error);
        return [];
    }
}

// Export helper functions for testing
module.exports = {
    handler: exports.handler,
    getLeaderboard,
    updateHallOfFame
};