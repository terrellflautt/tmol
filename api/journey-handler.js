const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * Save user's journey progress
 */
module.exports.saveProgress = async (event) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders };
    }

    try {
        const userId = event.pathParameters?.userId;
        const progress = JSON.parse(event.body);

        if (!userId) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ error: 'User ID required' })
            };
        }

        const timestamp = Date.now();

        await dynamodb.put({
            TableName: process.env.USER_PROFILES_TABLE || 'terrellflautt-user-api-profiles-prod',
            Item: {
                userId,
                timestamp,
                progress,
                updatedAt: new Date().toISOString()
            }
        }).promise();

        console.log(`✅ Journey progress saved for user ${userId}`);

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                success: true,
                userId,
                timestamp
            })
        };

    } catch (error) {
        console.error('Error saving journey progress:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                error: 'Failed to save progress',
                message: error.message
            })
        };
    }
};

/**
 * Get user's journey progress
 */
module.exports.getProgress = async (event) => {
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

        const result = await dynamodb.query({
            TableName: process.env.USER_PROFILES_TABLE || 'terrellflautt-user-api-profiles-prod',
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            },
            ScanIndexForward: false,
            Limit: 1
        }).promise();

        if (!result.Items || result.Items.length === 0) {
            return {
                statusCode: 404,
                headers: corsHeaders,
                body: JSON.stringify({
                    error: 'Progress not found',
                    userId,
                    newUser: true
                })
            };
        }

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                userId,
                progress: result.Items[0].progress,
                lastUpdated: result.Items[0].updatedAt
            })
        };

    } catch (error) {
        console.error('Error getting journey progress:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                error: 'Failed to get progress',
                message: error.message
            })
        };
    }
};
