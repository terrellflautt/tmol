/**
 * FORUM MESSAGE BOARD API
 * Simple message board for forum.snapitsoftware.com
 * Section: "What is this website?"
 *
 * Features:
 * - Rate limiting: 3 comments per user per day
 * - DynamoDB storage
 * - S3 publishing for static access
 */

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const FORUM_TABLE = process.env.FORUM_TABLE || 'forum-messages-prod';
const RATE_LIMIT_TABLE = process.env.RATE_LIMIT_TABLE || 'forum-rate-limits-prod';
const BUCKET_NAME = process.env.BUCKET_NAME || 'forum-snapitsoftware-com';
const MAX_COMMENTS_PER_DAY = 3;

// CORS headers
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Content-Type': 'application/json'
};

/**
 * Check if user has exceeded rate limit
 */
async function checkRateLimit(userId) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const rateLimitKey = `${userId}#${today}`;

    try {
        const result = await dynamodb.get({
            TableName: RATE_LIMIT_TABLE,
            Key: { rateLimitKey }
        }).promise();

        if (!result.Item) {
            return { allowed: true, remaining: MAX_COMMENTS_PER_DAY };
        }

        const count = result.Item.count || 0;
        const remaining = MAX_COMMENTS_PER_DAY - count;

        return {
            allowed: count < MAX_COMMENTS_PER_DAY,
            remaining: Math.max(0, remaining),
            count
        };
    } catch (error) {
        console.error('Rate limit check error:', error);
        // Fail open - allow the request if we can't check
        return { allowed: true, remaining: MAX_COMMENTS_PER_DAY };
    }
}

/**
 * Increment rate limit counter
 */
async function incrementRateLimit(userId) {
    const today = new Date().toISOString().split('T')[0];
    const rateLimitKey = `${userId}#${today}`;
    const ttl = Math.floor(Date.now() / 1000) + (48 * 60 * 60); // 48 hours TTL

    try {
        await dynamodb.update({
            TableName: RATE_LIMIT_TABLE,
            Key: { rateLimitKey },
            UpdateExpression: 'ADD #count :inc SET #ttl = :ttl',
            ExpressionAttributeNames: {
                '#count': 'count',
                '#ttl': 'ttl'
            },
            ExpressionAttributeValues: {
                ':inc': 1,
                ':ttl': ttl
            }
        }).promise();
    } catch (error) {
        console.error('Rate limit increment error:', error);
    }
}

/**
 * POST new message
 */
async function postMessage(event) {
    try {
        const body = JSON.parse(event.body || '{}');
        const { userId, username, message } = body;

        // Validation
        if (!userId || !message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'userId and message are required'
                })
            };
        }

        if (message.length < 10) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'Message must be at least 10 characters'
                })
            };
        }

        if (message.length > 1000) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'Message must be less than 1000 characters'
                })
            };
        }

        // Check rate limit
        const rateLimit = await checkRateLimit(userId);
        if (!rateLimit.allowed) {
            return {
                statusCode: 429,
                headers,
                body: JSON.stringify({
                    error: 'Rate limit exceeded. You can only post 3 comments per day.',
                    limit: MAX_COMMENTS_PER_DAY,
                    remaining: 0,
                    resetTime: new Date(new Date().setHours(24, 0, 0, 0)).toISOString()
                })
            };
        }

        // Create message
        const timestamp = Date.now();
        const messageId = `msg_${timestamp}_${Math.random().toString(36).substr(2, 9)}`;

        const messageItem = {
            messageId,
            userId,
            username: username || 'Anonymous Explorer',
            message: message.trim(),
            timestamp,
            createdAt: new Date().toISOString(),
            section: 'what-is-this-website',
            likes: 0,
            reports: 0
        };

        // Save to DynamoDB
        await dynamodb.put({
            TableName: FORUM_TABLE,
            Item: messageItem
        }).promise();

        // Increment rate limit
        await incrementRateLimit(userId);

        // Publish to S3 (async - don't wait)
        publishMessagesToS3().catch(err => console.error('S3 publish error:', err));

        return {
            statusCode: 201,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Message posted successfully',
                messageId,
                rateLimit: {
                    remaining: rateLimit.remaining - 1,
                    limit: MAX_COMMENTS_PER_DAY
                }
            })
        };

    } catch (error) {
        console.error('Post message error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to post message' })
        };
    }
}

/**
 * GET all messages
 */
async function getMessages(event) {
    try {
        const queryParams = event.queryStringParameters || {};
        const limit = Math.min(parseInt(queryParams.limit) || 50, 100);

        const result = await dynamodb.scan({
            TableName: FORUM_TABLE,
            Limit: limit
        }).promise();

        // Sort by timestamp descending (newest first)
        const messages = (result.Items || []).sort((a, b) => b.timestamp - a.timestamp);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                messages,
                count: messages.length
            })
        };

    } catch (error) {
        console.error('Get messages error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to retrieve messages' })
        };
    }
}

/**
 * GET rate limit status for user
 */
async function getRateLimit(event) {
    try {
        const userId = event.queryStringParameters?.userId;

        if (!userId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'userId is required' })
            };
        }

        const rateLimit = await checkRateLimit(userId);
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(new Date().setHours(24, 0, 0, 0));

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                limit: MAX_COMMENTS_PER_DAY,
                remaining: rateLimit.remaining,
                used: rateLimit.count || 0,
                resetTime: tomorrow.toISOString(),
                date: today
            })
        };

    } catch (error) {
        console.error('Get rate limit error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to check rate limit' })
        };
    }
}

/**
 * Publish messages to S3 for static access
 */
async function publishMessagesToS3() {
    try {
        const result = await dynamodb.scan({
            TableName: FORUM_TABLE
        }).promise();

        const messages = (result.Items || []).sort((a, b) => b.timestamp - a.timestamp);

        const json = JSON.stringify({
            messages,
            count: messages.length,
            lastUpdated: new Date().toISOString()
        }, null, 2);

        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: 'messages.json',
            Body: json,
            ContentType: 'application/json',
            CacheControl: 'max-age=60' // 1 minute cache
        }).promise();

        console.log(`Published ${messages.length} messages to S3`);
    } catch (error) {
        console.error('S3 publish error:', error);
        throw error;
    }
}

/**
 * Main handler
 */
exports.handler = async (event) => {
    console.log('Forum API Request:', {
        method: event.httpMethod,
        path: event.path,
        queryParams: event.queryStringParameters
    });

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Route requests
    if (event.httpMethod === 'POST' && event.path === '/forum/messages') {
        return await postMessage(event);
    }

    if (event.httpMethod === 'GET' && event.path === '/forum/messages') {
        return await getMessages(event);
    }

    if (event.httpMethod === 'GET' && event.path === '/forum/rate-limit') {
        return await getRateLimit(event);
    }

    // 404
    return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Not found' })
    };
};
