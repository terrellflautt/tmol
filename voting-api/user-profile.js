/**
 * User Profile API Handler
 * Stores comprehensive user data in DynamoDB for AI NPC personalization
 */

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
    'Content-Type': 'application/json'
};

exports.handler = async (event) => {
    // Handle OPTIONS for CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: ''
        };
    }

    const tableName = process.env.TRACKING_TABLE || 'terrellflautt-voting-api-prod-tracking';

    try {
        // POST: Save user profile
        if (event.httpMethod === 'POST') {
            const data = JSON.parse(event.body);
            const { userId, profile } = data;

            if (!userId || !profile) {
                return {
                    statusCode: 400,
                    headers: CORS_HEADERS,
                    body: JSON.stringify({ error: 'Missing userId or profile' })
                };
            }

            const item = {
                userId,
                timestamp: Date.now(),
                eventType: 'user_profile_update',
                profile: {
                    // Device & Browser
                    device: profile.device || {},
                    browser: profile.browser || {},

                    // Location & Time
                    location: profile.location || {},
                    timezone: profile.timezone || {},

                    // Behavioral Data
                    behavior: {
                        visitCount: profile.behavior?.visitCount || 0,
                        totalTimeSpent: profile.behavior?.totalTimeSpent || 0,
                        clickCount: profile.behavior?.clickCount || 0,
                        scrollDepth: profile.behavior?.scrollDepth || 0,
                        discoveries: profile.behavior?.discoveries || [],
                        interactions: (profile.behavior?.interactions || []).slice(-50) // Keep last 50
                    },

                    // User Choices (dialogue, puzzles, etc.)
                    choices: (profile.choices || []).slice(-100), // Keep last 100 choices

                    // Skills & Progress
                    skills: profile.skills || {},
                    alignment: profile.alignment || {},

                    // NPCs Met
                    npcInteractions: profile.npcInteractions || {},

                    // Preferences
                    preferences: profile.preferences || {},

                    // Metadata
                    firstVisit: profile.firstVisit || Date.now(),
                    lastVisit: Date.now(),
                    sessionId: profile.sessionId
                },

                // Add TTL for data retention (30 days)
                ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
            };

            await dynamodb.put({
                TableName: tableName,
                Item: item
            }).promise();

            return {
                statusCode: 200,
                headers: CORS_HEADERS,
                body: JSON.stringify({
                    success: true,
                    message: 'Profile saved',
                    userId
                })
            };
        }

        // GET: Retrieve user profile
        if (event.httpMethod === 'GET') {
            const userId = event.pathParameters?.userId || event.queryStringParameters?.userId;

            if (!userId) {
                return {
                    statusCode: 400,
                    headers: CORS_HEADERS,
                    body: JSON.stringify({ error: 'Missing userId' })
                };
            }

            const result = await dynamodb.query({
                TableName: tableName,
                KeyConditionExpression: 'userId = :userId',
                FilterExpression: 'eventType = :eventType',
                ExpressionAttributeValues: {
                    ':userId': userId,
                    ':eventType': 'user_profile_update'
                },
                ScanIndexForward: false, // Most recent first
                Limit: 1
            }).promise();

            if (result.Items && result.Items.length > 0) {
                return {
                    statusCode: 200,
                    headers: CORS_HEADERS,
                    body: JSON.stringify(result.Items[0].profile)
                };
            }

            // No profile found, return empty
            return {
                statusCode: 200,
                headers: CORS_HEADERS,
                body: JSON.stringify({
                    userId,
                    behavior: { visitCount: 0 },
                    message: 'New user'
                })
            };
        }

        return {
            statusCode: 405,
            headers: CORS_HEADERS,
            body: JSON.stringify({ error: 'Method not allowed' })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: CORS_HEADERS,
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};
