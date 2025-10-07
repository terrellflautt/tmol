const AWS = require('aws-sdk');
const axios = require('axios');
const sharp = require('sharp');

const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const ssm = new AWS.SSM();

// Usage Limits
const USAGE_LIMITS = {
    free: {
        dailyGenerations: 3,
        monthlyGenerations: 50,
        advancedFeatures: false,
        premiumTemplates: false,
        cloudStorage: false
    },
    basic: {
        dailyGenerations: 10,
        monthlyGenerations: 200,
        advancedFeatures: true,
        premiumTemplates: false,
        cloudStorage: true
    },
    pro: {
        dailyGenerations: 50,
        monthlyGenerations: 1000,
        advancedFeatures: true,
        premiumTemplates: true,
        cloudStorage: true
    }
};

// Rate limiting per IP
const RATE_LIMITS = {
    perMinute: 10,
    perHour: 100,
    perDay: 500
};

let AI_KEYS = {};

async function loadAPIKeys() {
    if (Object.keys(AI_KEYS).length === 0) {
        try {
            const params = await ssm.getParameters({
                Names: ['/terrellflautt/openai-api-key'],
                WithDecryption: true
            }).promise();

            params.Parameters.forEach(param => {
                const key = param.Name.split('/').pop().replace('-api-key', '').toUpperCase();
                AI_KEYS[key] = param.Value;
            });
        } catch (error) {
            console.error('Failed to load API keys:', error);
        }
    }
    return AI_KEYS;
}

// Check usage limits
async function checkUsageLimit(userId, tier = 'free', operation = 'generation') {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7);

    const dailyParams = {
        TableName: 'logo-usage',
        Key: { userId, dateKey: `daily-${today}` }
    };

    const monthlyParams = {
        TableName: 'logo-usage',
        Key: { userId, dateKey: `monthly-${thisMonth}` }
    };

    const [dailyResult, monthlyResult] = await Promise.all([
        dynamodb.get(dailyParams).promise(),
        dynamodb.get(monthlyParams).promise()
    ]);

    const dailyUsage = dailyResult.Item?.count || 0;
    const monthlyUsage = monthlyResult.Item?.count || 0;
    const limits = USAGE_LIMITS[tier];

    if (operation === 'generation') {
        if (dailyUsage >= limits.dailyGenerations) {
            return { allowed: false, reason: 'Daily limit exceeded', resetTime: 'tomorrow' };
        }
        if (monthlyUsage >= limits.monthlyGenerations) {
            return { allowed: false, reason: 'Monthly limit exceeded', resetTime: 'next month' };
        }
    }

    return { allowed: true, dailyUsage, monthlyUsage, limits };
}

// Rate limiting
async function checkRateLimit(ip) {
    const now = Date.now();
    const minute = Math.floor(now / 60000);
    const hour = Math.floor(now / 3600000);
    const day = Math.floor(now / 86400000);

    const params = {
        TableName: 'logo-rate-limits',
        Key: { ip, timeKey: `${day}-${hour}-${minute}` }
    };

    const result = await dynamodb.get(params).promise();
    const count = result.Item?.count || 0;

    if (count >= RATE_LIMITS.perMinute) {
        return { allowed: false, reason: 'Rate limit exceeded', resetTime: '1 minute' };
    }

    // Update rate limit counter
    await dynamodb.put({
        TableName: 'logo-rate-limits',
        Item: {
            ip,
            timeKey: `${day}-${hour}-${minute}`,
            count: count + 1,
            ttl: Math.floor(now / 1000) + 86400 // 24 hour TTL
        }
    }).promise();

    return { allowed: true };
}

// Track usage
async function trackUsage(userId, operation = 'generation') {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7);

    await Promise.all([
        // Daily counter
        dynamodb.update({
            TableName: 'logo-usage',
            Key: { userId, dateKey: `daily-${today}` },
            UpdateExpression: 'ADD #count :inc',
            ExpressionAttributeNames: { '#count': 'count' },
            ExpressionAttributeValues: { ':inc': 1 }
        }).promise(),
        // Monthly counter
        dynamodb.update({
            TableName: 'logo-usage',
            Key: { userId, dateKey: `monthly-${thisMonth}` },
            UpdateExpression: 'ADD #count :inc',
            ExpressionAttributeNames: { '#count': 'count' },
            ExpressionAttributeValues: { ':inc': 1 }
        }).promise()
    ]);
}

// Enhanced AI logo generation
module.exports.generateAdvanced = async (event) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': 'https://terrellflautt.com',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders };
    }

    try {
        const { userId, projectName, style, industry, tier = 'free' } = JSON.parse(event.body);
        const ip = event.requestContext.identity.sourceIp;

        // Rate limiting
        const rateCheck = await checkRateLimit(ip);
        if (!rateCheck.allowed) {
            return {
                statusCode: 429,
                headers: corsHeaders,
                body: JSON.stringify({
                    error: 'Rate limit exceeded',
                    message: `Too many requests. Try again in ${rateCheck.resetTime}.`,
                    resetTime: rateCheck.resetTime
                })
            };
        }

        // Usage limits
        const usageCheck = await checkUsageLimit(userId, tier);
        if (!usageCheck.allowed) {
            return {
                statusCode: 429,
                headers: corsHeaders,
                body: JSON.stringify({
                    error: 'Usage limit exceeded',
                    message: `${usageCheck.reason}. Resets ${usageCheck.resetTime}.`,
                    limits: USAGE_LIMITS[tier],
                    upgrade: tier === 'free' ? 'basic' : 'pro'
                })
            };
        }

        // Advanced features check
        if (!USAGE_LIMITS[tier].advancedFeatures) {
            return {
                statusCode: 403,
                headers: corsHeaders,
                body: JSON.stringify({
                    error: 'Premium feature',
                    message: 'Advanced AI generation requires Basic tier or higher.',
                    upgrade: 'basic'
                })
            };
        }

        await loadAPIKeys();

        // Enhanced AI prompt for better logos
        const prompt = `Create a professional logo concept for "${projectName}" in ${style} style for ${industry} industry.

        Provide detailed specifications:
        - Color palette (hex codes)
        - Typography recommendations
        - Icon/symbol concepts
        - Layout variations
        - Brand personality keywords
        - SVG path suggestions for icons

        Format as JSON with structured data for programmatic generation.`;

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 1000,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${AI_KEYS.OPENAI}`,
                'Content-Type': 'application/json'
            }
        });

        const logoSpec = JSON.parse(response.data.choices[0].message.content);

        // Track usage
        await trackUsage(userId);

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                logoSpec,
                usage: {
                    daily: usageCheck.dailyUsage + 1,
                    monthly: usageCheck.monthlyUsage + 1,
                    limits: usageCheck.limits
                },
                timestamp: Date.now()
            })
        };

    } catch (error) {
        console.error('Advanced generation error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Generation failed' })
        };
    }
};

// Logo optimization
module.exports.optimize = async (event) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': 'https://terrellflautt.com',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders };
    }

    try {
        const { logoData, format, size } = JSON.parse(event.body);

        // Convert and optimize using Sharp
        const buffer = Buffer.from(logoData, 'base64');

        const optimized = await sharp(buffer)
            .resize(size, size, { fit: 'contain' })
            .png({ quality: 90, compressionLevel: 9 })
            .toBuffer();

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                optimizedLogo: optimized.toString('base64'),
                originalSize: buffer.length,
                optimizedSize: optimized.length,
                compression: Math.round((1 - optimized.length / buffer.length) * 100)
            })
        };

    } catch (error) {
        console.error('Optimization error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Optimization failed' })
        };
    }
};

// Save logo to cloud storage
module.exports.save = async (event) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': 'https://terrellflautt.com',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders };
    }

    try {
        const { userId, logoData, projectName, tier = 'free' } = JSON.parse(event.body);

        // Cloud storage check
        if (!USAGE_LIMITS[tier].cloudStorage) {
            return {
                statusCode: 403,
                headers: corsHeaders,
                body: JSON.stringify({
                    error: 'Premium feature',
                    message: 'Cloud storage requires Basic tier or higher.',
                    upgrade: 'basic'
                })
            };
        }

        const fileName = `${userId}/${Date.now()}-${projectName.replace(/[^a-zA-Z0-9]/g, '-')}.png`;

        await s3.putObject({
            Bucket: process.env.S3_BUCKET,
            Key: fileName,
            Body: Buffer.from(logoData, 'base64'),
            ContentType: 'image/png',
            ACL: 'public-read'
        }).promise();

        const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`;

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                url,
                fileName,
                saved: true
            })
        };

    } catch (error) {
        console.error('Save error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Save failed' })
        };
    }
};

// Get premium templates
module.exports.getTemplates = async (event) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': 'https://terrellflautt.com',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders };
    }

    try {
        const tier = event.queryStringParameters?.tier || 'free';

        const freeTemplates = [
            { id: 1, name: 'Simple Text', category: 'basic', premium: false },
            { id: 2, name: 'Circle Badge', category: 'basic', premium: false },
            { id: 3, name: 'Tech Stack', category: 'tech', premium: false }
        ];

        const premiumTemplates = [
            { id: 4, name: 'Gradient Flow', category: 'modern', premium: true },
            { id: 5, name: 'Luxury Serif', category: 'elegant', premium: true },
            { id: 6, name: 'Neon Glow', category: 'gaming', premium: true },
            { id: 7, name: 'Minimalist Pro', category: 'corporate', premium: true }
        ];

        const availableTemplates = USAGE_LIMITS[tier].premiumTemplates
            ? [...freeTemplates, ...premiumTemplates]
            : freeTemplates;

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                templates: availableTemplates,
                tier,
                premiumAvailable: USAGE_LIMITS[tier].premiumTemplates,
                totalCount: availableTemplates.length
            })
        };

    } catch (error) {
        console.error('Templates error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Failed to load templates' })
        };
    }
};