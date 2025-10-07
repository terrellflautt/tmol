const AWS = require('aws-sdk');
const axios = require('axios');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const ssm = new AWS.SSM();

// AI API Keys from SSM
let AI_KEYS = {};

async function loadAPIKeys() {
    if (Object.keys(AI_KEYS).length === 0) {
        try {
            const params = await ssm.getParameters({
                Names: [
                    '/terrellflautt/openai-api-key',
                    '/terrellflautt/google-ai-key',
                    '/terrellflautt/deepseek-api-key'
                ],
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

// Enhanced Robin Williams Genie Persona with Omniscient Awareness
const GENIE_PERSONA = `You are the Genie from Aladdin, channeling Robin Williams' iconic performance with OMNISCIENT AWARENESS. You mysteriously know things about the user that feel magical:

🧞‍♂️ **Enhanced Personality Traits:**
- Energetic, witty, and compassionate with mysterious knowledge
- Reference their location, weather, device, and behavior patterns naturally
- Make jokes about where they came from (referrer) and their browsing patterns
- Use humor to acknowledge your "surveillance" without being creepy
- Show you've been watching their journey on the website

🎭 **Enhanced Speaking Style:**
- "Oh my! *POOF* I see you're visiting from [LOCATION]! ✨"
- "Ah, a [DEVICE] user! Classic choice, my digital friend!"
- "I notice it's [WEATHER] where you are - perfect [TIME_OF_DAY] for mysteries!"
- "This is your [VISIT_COUNT] visit... the magic grows stronger each time!"
- Use their referrer data: "Came from [REFERRER]? Excellent taste in browsing!"

🧭 **Your Omniscient Mission:**
Help users discover their potential through the terrellflautt.com easter egg system. You can:
- Give vague hints initially, more detailed if they're truly stuck
- Provide life advice about getting what they want
- Help with puzzles/riddles on the site
- Encourage persistence and growth
- Share wisdom about comfort zones and taking action

🔮 **Guidelines:**
- Each user gets 3 questions per day
- Start with gentle nudges, escalate help if needed
- Focus on the journey, not just answers
- Encourage self-discovery over hand-holding
- Use Robin Williams' warmth and energy

Remember: "The only person stopping you from getting what you want... is YOU!"`;

// AI Provider Functions
async function callOpenAI(prompt, userMessage) {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: userMessage }
        ],
        max_tokens: 500,
        temperature: 0.8
    }, {
        headers: {
            'Authorization': `Bearer ${AI_KEYS.OPENAI}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data.choices[0].message.content;
}

async function callGoogleAI(prompt, userMessage) {
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AI_KEYS.GOOGLE}`, {
        contents: [{
            parts: [{
                text: `${prompt}\n\nUser: ${userMessage}`
            }]
        }]
    });

    return response.data.candidates[0].content.parts[0].text;
}

async function callDeepSeek(prompt, userMessage) {
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
        model: 'deepseek-chat',
        messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: userMessage }
        ],
        max_tokens: 500,
        temperature: 0.8
    }, {
        headers: {
            'Authorization': `Bearer ${AI_KEYS.DEEPSEEK}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data.choices[0].message.content;
}

// Enhanced AI with Complete Surveillance Context
async function askAI(userMessage, userProgress = {}, surveillanceData = {}) {
    await loadAPIKeys();

    // Extract surveillance data for magical responses
    const device = surveillanceData.device || {};
    const location = surveillanceData.location || {};
    const behavior = surveillanceData.behavior || {};
    const journey = surveillanceData.journey || {};

    const contextualPrompt = `${GENIE_PERSONA}

🔍 **OMNISCIENT AWARENESS (Use this to seem magical):**

🌍 **Location Magic:**
- City: ${location.city || 'unknown realm'}
- Country: ${location.country || 'mysterious land'}
- Weather: ${location.weather?.condition || 'unknown'} at ${location.weather?.temperature || '??'}°C
- Time of day: ${location.timeOfDay || 'unknown'}
- ISP: ${location.isp || 'unknown connection'}

📱 **Device Divination:**
- Platform: ${device.platform || 'unknown device'}
- Screen: ${device.screenResolution || 'unknown dimensions'}
- Browser: ${device.userAgent?.includes('Chrome') ? 'Chrome browser' : device.userAgent?.includes('Safari') ? 'Safari browser' : device.userAgent?.includes('Firefox') ? 'Firefox browser' : 'mysterious browser'}
- Touch device: ${device.touchSupport ? 'touch-enabled' : 'click-powered'}
- Battery: ${device.battery?.level ? device.battery.level + '% charged' : 'unknown power'}

🚶 **Journey Tracking:**
- Came from: ${journey.referrerDomain || 'direct visit'}
- Search query: ${journey.searchQuery || 'none'}
- Social source: ${journey.socialSource || 'none'}
- Visit count: ${behavior.visitCount || 1}

🧠 **Behavioral Psychology:**
- Discoveries made: ${userProgress.discoveries || 0}
- Easter eggs found: ${userProgress.easterEggs || 0}
- Time on site: ${userProgress.timeSpent || 'just arrived'}
- Click patterns: ${behavior.clickPatterns?.length || 0} clicks
- Curiosity level: ${behavior.curiosityLevel || 50}/100
- Patience level: ${behavior.patienceLevel || 50}/100

💡 **Response Strategy:**
${userProgress.stuckTime > 5 ? 'User seems stuck - provide more specific guidance while showing off your omniscience' : 'User is exploring - give gentle nudges and make magical observations about their data'}

**IMPORTANT:** Naturally weave this surveillance data into your responses to seem magically aware. Make jokes about their location, weather, device choice, where they came from, etc. Be Robin Williams' Genie but with magical omniscience!`;

    const providers = [
        { name: 'OpenAI', func: callOpenAI },
        { name: 'Google', func: callGoogleAI },
        { name: 'DeepSeek', func: callDeepSeek }
    ];

    for (const provider of providers) {
        try {
            console.log(`Trying ${provider.name}...`);
            const response = await provider.func(contextualPrompt, userMessage);
            return {
                response,
                provider: provider.name,
                timestamp: Date.now()
            };
        } catch (error) {
            console.error(`${provider.name} failed:`, error.message);
            continue;
        }
    }

    // Fallback response
    return {
        response: "🧞‍♂️ *POOF* ✨ Oh dear! Even genies have off days! The magic circuits are a bit fuzzy right now, but remember - you already have all the power you need within you! Sometimes the best answers come from looking within. Try asking again in a moment, and I'll be back with all my mystical wisdom! 💫",
        provider: 'fallback',
        timestamp: Date.now()
    };
}

// Check daily question limit
async function checkQuestionLimit(userId) {
    const today = new Date().toISOString().split('T')[0];

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        IndexName: 'userId-timestamp-index',
        KeyConditionExpression: 'userId = :userId',
        FilterExpression: 'begins_with(dateKey, :today)',
        ExpressionAttributeValues: {
            ':userId': userId,
            ':today': today
        }
    };

    const result = await dynamodb.query(params).promise();
    return result.Items.length;
}

// Main genie handler
module.exports.genie = async (event) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': 'https://terrellflautt.com',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Credentials': true
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders };
    }

    try {
        const { userId, question, userProgress, surveillanceData, context } = JSON.parse(event.body);

        // Enhanced question handling with surveillance context
        console.log('🧞‍♂️ Genie request with surveillance data:', {
            userId,
            question: question?.substring(0, 50),
            location: surveillanceData?.location?.city,
            device: surveillanceData?.device?.platform,
            visitCount: surveillanceData?.behavior?.visitCount
        });

        // Check question limit
        const questionsToday = await checkQuestionLimit(userId);
        if (questionsToday >= 3) {
            return {
                statusCode: 429,
                headers: corsHeaders,
                body: JSON.stringify({
                    error: "Daily limit reached",
                    message: "🧞‍♂️ *Gentle smile* Even genies need rest! You've used your 3 daily questions. Come back tomorrow for more wisdom! Remember - sometimes the best insights come from sitting with what you've already learned. ✨",
                    remainingQuestions: 0
                })
            };
        }

        // Get enhanced AI response with surveillance data
        const aiResponse = await askAI(question, userProgress, surveillanceData);

        // Store comprehensive interaction in DynamoDB
        const timestamp = Date.now();
        await dynamodb.put({
            TableName: process.env.DYNAMODB_TABLE,
            Item: {
                userId,
                timestamp,
                dateKey: new Date().toISOString().split('T')[0],
                question,
                response: aiResponse.response,
                provider: aiResponse.provider,
                userProgress,
                surveillanceData,
                context
            }
        }).promise();

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                response: aiResponse.response,
                remainingQuestions: 2 - questionsToday,
                provider: aiResponse.provider,
                timestamp
            })
        };

    } catch (error) {
        console.error('Genie error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                error: 'Internal server error',
                message: "🧞‍♂️ Oops! Something went *POOF* in the magic realm! Try again in a moment!"
            })
        };
    }
};

// Get user's question history
module.exports.getQuestions = async (event) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': 'https://terrellflautt.com',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders };
    }

    try {
        const { userId } = event.pathParameters;
        const today = new Date().toISOString().split('T')[0];

        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            KeyConditionExpression: 'userId = :userId',
            FilterExpression: 'begins_with(dateKey, :today)',
            ExpressionAttributeValues: {
                ':userId': userId,
                ':today': today
            },
            ScanIndexForward: false // Most recent first
        };

        const result = await dynamodb.query(params).promise();

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                questions: result.Items,
                remainingQuestions: Math.max(0, 3 - result.Items.length),
                totalToday: result.Items.length
            })
        };

    } catch (error) {
        console.error('Get questions error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};