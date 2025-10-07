/**
 * CONSCIOUSNESS SYNC ENDPOINT
 * Receives and stores cross-system consciousness state
 */

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Content-Type': 'application/json'
};

exports.handler = async (event) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        if (event.httpMethod === 'POST') {
            return await syncConsciousness(event);
        } else if (event.httpMethod === 'GET') {
            return await getConsciousness(event);
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };

    } catch (error) {
        console.error('Consciousness error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};

async function syncConsciousness(event) {
    const body = JSON.parse(event.body || '{}');
    const { userId, consciousnessState, sourceSystem, timestamp } = body;

    if (!userId || !consciousnessState) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'userId and consciousnessState required' })
        };
    }

    // Store consciousness state
    const item = {
        userId,
        timestamp: timestamp || Date.now(),
        consciousnessState,
        sourceSystem: sourceSystem || 'unknown',
        syncedAt: new Date().toISOString(),
        ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year TTL
    };

    await dynamodb.put({
        TableName: process.env.TRACKING_TABLE || 'terrellflautt-voting-api-prod-tracking',
        Item: item
    }).promise();

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            success: true,
            message: 'Consciousness synchronized',
            timestamp: item.timestamp
        })
    };
}

async function getConsciousness(event) {
    const userId = event.pathParameters?.userId || event.queryStringParameters?.userId;

    if (!userId) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'userId required' })
        };
    }

    try {
        const result = await dynamodb.get({
            TableName: process.env.TRACKING_TABLE || 'terrellflautt-voting-api-prod-tracking',
            Key: { userId }
        }).promise();

        if (!result.Item) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Consciousness state not found' })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                userId,
                consciousnessState: result.Item.consciousnessState,
                timestamp: result.Item.timestamp
            })
        };

    } catch (error) {
        console.error('Get consciousness error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to retrieve consciousness' })
        };
    }
}
