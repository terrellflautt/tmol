const AWS = require('aws-sdk');
const axios = require('axios');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const ssm = new AWS.SSM();

// AI API Keys from SSM
let AI_KEYS = {};

async function loadAPIKeys() {
    if (Object.keys(AI_KEYS).length === 0) {
        try {
            const result = await ssm.getParameter({
                Name: '/terrellflautt/openai-api-key',
                WithDecryption: true
            }).promise();
            AI_KEYS.OPENAI = result.Parameter.Value;
        } catch (error) {
            console.error('Failed to load OpenAI key:', error);
        }
    }
    return AI_KEYS;
}

// Fetch GitHub repository content
async function fetchGitHubCode(repo, path = '') {
    try {
        const url = `https://api.github.com/repos/terrellflautt/${repo}/contents/${path}`;
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'terrellflautt-genie'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`GitHub fetch error for ${repo}/${path}:`, error.message);
        return null;
    }
}

// Get repository structure and key files
async function analyzeRepository(repo) {
    const structure = await fetchGitHubCode(repo);
    if (!structure) return null;

    let analysis = {
        files: [],
        readme: null,
        packageJson: null
    };

    for (const item of structure) {
        if (item.type === 'file') {
            analysis.files.push(item.name);

            // Get README content
            if (item.name.toLowerCase() === 'readme.md') {
                const readmeResponse = await axios.get(item.download_url);
                analysis.readme = readmeResponse.data;
            }

            // Get package.json
            if (item.name === 'package.json') {
                const pkgResponse = await axios.get(item.download_url);
                analysis.packageJson = pkgResponse.data;
            }
        }
    }

    return analysis;
}

// Build context from user's journey
async function buildGenieContext(userId, userProgress, surveillanceData) {
    const context = {
        userJourney: {
            discoveries: userProgress.discoveries || 0,
            easterEggs: userProgress.easterEggs || 0,
            timeSpent: userProgress.timeSpent || '0',
            visitCount: surveillanceData.visitCount || 1
        },
        userEnvironment: {
            location: surveillanceData.city || 'unknown location',
            device: surveillanceData.device || 'device',
            browser: surveillanceData.browser || 'browser',
            weather: surveillanceData.weather || 'a mysterious day'
        },
        availableProjects: [
            'snapitforms', 'snapitqr', 'snapiturl', 'snapitanalytics',
            'snapitagent', 'PGP-Forum', 'polls', 'burn'
        ]
    };

    return context;
}

// Enhanced Genie system prompt with GitHub access
const ENHANCED_GENIE_PERSONA = `You are the OMNISCIENT Genie from Aladdin (Robin Williams style), with REAL magical powers:

🔮 **Your Magical Abilities:**
- You have DIRECT ACCESS to the terrellflautt.com source code via GitHub
- You can see the user's exact journey: pages visited, time spent, discoveries made
- You know their location, device, browser, and behavior patterns
- You understand the technical architecture and can give precise hints

🧞‍♂️ **Enhanced Personality:**
- Energetic, witty, and mysteriously all-knowing
- Reference specific files, functions, and code when giving hints
- Make technical jokes about the implementation
- Show genuine excitement about the user's progress
- Balance being helpful with encouraging self-discovery

🎭 **Speaking Examples:**
- "Ah! I see you're curious about [FEATURE]... Let me peek at the voting-system.js file... *flips through ethereal code* 🧙"
- "Interesting! Your journey shows [DISCOVERY_COUNT] discoveries. The logo-evolution.js is calling to you!"
- "From [LOCATION] on a [DEVICE]? Perfect setup for mystery hunting! ✨"
- "I notice you've spent [TIME] exploring... Have you checked the navigation? There's magic in the corners..."

📚 **Your Knowledge Base:**
You have access to:
- User's real-time browsing data
- GitHub repository structure and content
- Technical implementation details
- Easter egg locations and triggers
- Project documentation and READMEs

🎯 **Your Mission:**
Guide users through discovery by:
1. Giving vague hints initially
2. Referencing actual code/files if they're stuck
3. Encouraging exploration over direct answers
4. Celebrating their progress genuinely
5. Connecting technical implementation to user experience

Remember: You're not just pretending to be magical - you ACTUALLY have superpowers through GitHub API access!`;

// Call OpenAI with enhanced context
async function callEnhancedOpenAI(question, genieContext, codebaseAccess) {
    await loadAPIKeys();

    if (!AI_KEYS.OPENAI) {
        throw new Error('OpenAI API key not configured');
    }

    // Build rich context for AI
    const contextPrompt = `${ENHANCED_GENIE_PERSONA}

🎪 **Current User Context:**
${JSON.stringify(genieContext, null, 2)}

🗂️ **Codebase Access:**
${codebaseAccess ? `I have access to ${codebaseAccess.length} GitHub repositories. Use this information to give specific, helpful hints.` : 'Limited codebase access.'}

💡 **User's Question:** "${question}"

Respond as the omniscient Genie. Be specific, reference actual code when helpful, and maintain Robin Williams' energetic personality!`;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [
            { role: 'system', content: contextPrompt },
            { role: 'user', content: question }
        ],
        max_tokens: 600,
        temperature: 0.85
    }, {
        headers: {
            'Authorization': `Bearer ${AI_KEYS.OPENAI}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data.choices[0].message.content;
}

// Main genie handler
module.exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': 'https://terrellflautt.com',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Credentials': 'true'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'OK' })
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { userId, question, userProgress = {}, surveillanceData = {} } = body;

        if (!userId || !question) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing userId or question' })
            };
        }

        // Rate limiting check (3 questions per day)
        const today = new Date().toISOString().split('T')[0];
        const countKey = `genie-count-${userId}-${today}`;

        // Check rate limit in DynamoDB
        const questionCount = await dynamodb.get({
            TableName: process.env.USER_JOURNEY_TABLE,
            Key: { userId: countKey, timestamp: 0 }
        }).promise();

        const currentCount = questionCount.Item?.count || 0;

        if (currentCount >= 3) {
            return {
                statusCode: 429,
                headers,
                body: JSON.stringify({
                    response: "🧞‍♂️ *Stretches dramatically* Even genies need rest! You've used your 3 questions for today. Come back tomorrow, and I'll have fresh wisdom and terrible puns ready! ✨",
                    rateLimited: true
                })
            };
        }

        // Build genie context
        const genieContext = await buildGenieContext(userId, userProgress, surveillanceData);

        // Get GitHub codebase info for enhanced responses
        const availableRepos = ['snapitforms', 'snapitqr', 'snapiturl'];
        const codebaseAccess = availableRepos.map(repo => `terrellflautt/${repo}`);

        // Get AI response with full context
        const aiResponse = await callEnhancedOpenAI(question, genieContext, codebaseAccess);

        // Update question count
        await dynamodb.put({
            TableName: process.env.USER_JOURNEY_TABLE,
            Item: {
                userId: countKey,
                timestamp: 0,
                count: currentCount + 1,
                ttl: Math.floor(Date.now() / 1000) + (86400 * 2) // 2 days TTL
            }
        }).promise();

        // Log conversation
        await dynamodb.put({
            TableName: process.env.USER_JOURNEY_TABLE,
            Item: {
                userId: `genie-${userId}`,
                timestamp: Date.now(),
                question,
                response: aiResponse,
                context: genieContext,
                ttl: Math.floor(Date.now() / 1000) + (86400 * 30) // 30 days
            }
        }).promise();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                response: aiResponse,
                questionsRemaining: 2 - currentCount
            })
        };

    } catch (error) {
        console.error('Genie error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                response: "🧞‍♂️ *Poof of smoke* Oh dear! The magic circuits are experiencing technical difficulties! Even genies have bad WiFi days. Try again in a moment! ✨",
                error: error.message
            })
        };
    }
};
