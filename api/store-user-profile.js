const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * Store comprehensive user profile for omniscient experience
 */
module.exports.storeProfile = async (event) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders };
    }

    try {
        const profile = JSON.parse(event.body);

        console.log('📊 Storing user profile:', {
            userId: profile.userId,
            sessionId: profile.sessionId,
            location: profile.surveillance?.location?.city,
            device: profile.surveillance?.device?.platform,
            visitCount: profile.surveillance?.behavior?.visitCount
        });

        // Store in DynamoDB with TTL (auto-delete after 1 year)
        const ttl = Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60); // 1 year

        await dynamodb.put({
            TableName: process.env.USER_PROFILES_TABLE || 'terrellflautt-user-profiles',
            Item: {
                ...profile,
                ttl,
                createdAt: new Date().toISOString(),
                ipAddress: event.requestContext?.identity?.sourceIp,
                userAgent: event.headers?.['User-Agent']
            }
        }).promise();

        // Also update aggregated user intelligence
        await updateUserIntelligence(profile);

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                success: true,
                message: 'Profile stored successfully',
                timestamp: profile.timestamp
            })
        };

    } catch (error) {
        console.error('Error storing user profile:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                error: 'Failed to store profile',
                message: error.message
            })
        };
    }
};

/**
 * Update aggregated user intelligence for patterns
 */
async function updateUserIntelligence(profile) {
    try {
        const userId = profile.userId;
        const now = Date.now();

        // Get existing intelligence record
        let intelligence;
        try {
            const result = await dynamodb.get({
                TableName: process.env.USER_INTELLIGENCE_TABLE || 'terrellflautt-user-intelligence',
                Key: { userId }
            }).promise();

            intelligence = result.Item || {
                userId,
                firstSeen: now,
                sessions: [],
                patterns: {},
                preferences: {},
                discoveries: [],
                metadata: {}
            };
        } catch (e) {
            intelligence = {
                userId,
                firstSeen: now,
                sessions: [],
                patterns: {},
                preferences: {},
                discoveries: [],
                metadata: {}
            };
        }

        // Add current session
        intelligence.sessions.push({
            sessionId: profile.sessionId,
            timestamp: now,
            surveillance: profile.surveillance,
            lampStage: profile.lampStage,
            genieUnlocked: profile.genieUnlocked,
            adaptiveStyles: profile.adaptiveStyles
        });

        // Keep only last 50 sessions
        if (intelligence.sessions.length > 50) {
            intelligence.sessions = intelligence.sessions.slice(-50);
        }

        // Update patterns
        const surveillance = profile.surveillance;
        if (surveillance) {
            // Location patterns
            if (surveillance.location?.city) {
                intelligence.patterns.primaryLocation = surveillance.location.city;
                intelligence.patterns.country = surveillance.location.country;
                intelligence.patterns.timezone = surveillance.location.timezone;
            }

            // Device patterns
            if (surveillance.device?.platform) {
                intelligence.patterns.primaryDevice = surveillance.device.platform;
                intelligence.patterns.screenResolution = surveillance.device.screenResolution;
                intelligence.patterns.browserType = surveillance.device.userAgent;
            }

            // Behavioral patterns
            if (surveillance.behavior) {
                intelligence.patterns.visitCount = surveillance.behavior.visitCount;
                intelligence.patterns.totalDiscoveries = surveillance.behavior.discoveries?.length || 0;
                intelligence.patterns.curiosityLevel = surveillance.behavior.curiosityLevel;
                intelligence.patterns.patienceLevel = surveillance.behavior.patienceLevel;
            }

            // Journey patterns
            if (surveillance.journey) {
                if (!intelligence.patterns.referrers) intelligence.patterns.referrers = [];
                if (surveillance.journey.referrerDomain &&
                    !intelligence.patterns.referrers.includes(surveillance.journey.referrerDomain)) {
                    intelligence.patterns.referrers.push(surveillance.journey.referrerDomain);
                }
            }
        }

        // Update last seen
        intelligence.lastSeen = now;
        intelligence.totalSessions = intelligence.sessions.length;

        // Store updated intelligence
        await dynamodb.put({
            TableName: process.env.USER_INTELLIGENCE_TABLE || 'terrellflautt-user-intelligence',
            Item: intelligence
        }).promise();

        console.log(`📈 Updated intelligence for user ${userId}: ${intelligence.totalSessions} sessions`);

    } catch (error) {
        console.error('Error updating user intelligence:', error);
        // Don't fail the main request if intelligence update fails
    }
}

/**
 * Get user intelligence for personalization
 */
module.exports.getUserIntelligence = async (event) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders };
    }

    try {
        const userId = event.pathParameters?.userId;

        if (!userId) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'User ID required' })
            };
        }

        const result = await dynamodb.get({
            TableName: process.env.USER_INTELLIGENCE_TABLE || 'terrellflautt-user-intelligence',
            Key: { userId }
        }).promise();

        if (!result.Item) {
            return {
                statusCode: 404,
                headers: corsHeaders,
                body: JSON.stringify({
                    error: 'User not found',
                    userId,
                    newUser: true
                })
            };
        }

        // Return safe subset of intelligence data
        const safeIntelligence = {
            userId: result.Item.userId,
            firstSeen: result.Item.firstSeen,
            lastSeen: result.Item.lastSeen,
            totalSessions: result.Item.totalSessions,
            patterns: {
                visitCount: result.Item.patterns?.visitCount || 1,
                primaryLocation: result.Item.patterns?.primaryLocation,
                primaryDevice: result.Item.patterns?.primaryDevice,
                curiosityLevel: result.Item.patterns?.curiosityLevel || 50,
                patienceLevel: result.Item.patterns?.patienceLevel || 50,
                totalDiscoveries: result.Item.patterns?.totalDiscoveries || 0
            },
            recentSession: result.Item.sessions?.[result.Item.sessions.length - 1] || null
        };

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(safeIntelligence)
        };

    } catch (error) {
        console.error('Error getting user intelligence:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                error: 'Failed to get user intelligence',
                message: error.message
            })
        };
    }
};