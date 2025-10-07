// 🧞‍♂️ GENIE AI BACKEND - Real AI Assistant with DynamoDB Integration

const AWS = require('aws-sdk');
const OpenAI = require('openai');

// Configure AWS DynamoDB
const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Configure OpenAI (Primary AI)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

class GenieAI {
    constructor() {
        this.maxTokens = 50; // Keep responses brief
        this.temperature = 0.8; // Mystical creativity
        this.dailyLimit = 3; // Questions per day
    }

    // Main genie interaction endpoint
    async handleGenieRequest(userId, question, userIp) {
        try {
            // 1. Check daily limits
            const canAsk = await this.checkDailyLimit(userId);
            if (!canAsk) {
                return {
                    success: false,
                    message: "The genie rests. Return tomorrow.",
                    remainingQuestions: 0
                };
            }

            // 2. Get user profile from DynamoDB
            const userProfile = await this.getUserProfile(userId);

            // 3. Analyze user progress and context
            const context = await this.analyzeUserContext(userProfile, question);

            // 4. Generate AI response with context
            const aiResponse = await this.generateGenieResponse(question, context);

            // 5. Log interaction and update usage
            await this.logInteraction(userId, question, aiResponse, userIp);

            // 6. Get remaining questions
            const remaining = await this.getRemainingQuestions(userId);

            return {
                success: true,
                response: aiResponse,
                remainingQuestions: remaining,
                insights: context.insights || null
            };

        } catch (error) {
            console.error('Genie AI Error:', error);
            return {
                success: false,
                message: "The spirits are clouded.",
                remainingQuestions: await this.getRemainingQuestions(userId)
            };
        }
    }

    // Get user profile from DynamoDB
    async getUserProfile(userId) {
        try {
            const params = {
                TableName: 'user-profiles', // Your existing table
                Key: { userId: userId }
            };

            const result = await dynamodb.get(params).promise();
            return result.Item || {};
        } catch (error) {
            console.error('DynamoDB Error:', error);
            return {};
        }
    }

    // Analyze user context for personalized insights
    async analyzeUserContext(userProfile, question) {
        const context = {
            discoveries: userProfile.discoveries || [],
            progress: userProfile.progress || {},
            preferences: userProfile.preferences || {},
            lastActivity: userProfile.lastActivity || null,
            questionType: this.categorizeQuestion(question),
            insights: []
        };

        // Generate personalized insights
        if (context.discoveries.length === 0) {
            context.insights.push("seeker_new");
        } else if (context.discoveries.length >= 10) {
            context.insights.push("seeker_advanced");
        }

        // Check for patterns
        if (context.progress.aziza_riddle === false) {
            context.insights.push("aziza_stuck");
        }

        if (context.progress.voting_completed) {
            context.insights.push("civic_engaged");
        }

        return context;
    }

    // Generate AI response using OpenAI with user context
    async generateGenieResponse(question, context) {
        const systemPrompt = this.buildSystemPrompt(context);

        try {
            // Try OpenAI first (best quality)
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini", // Cost-effective but powerful
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: question
                    }
                ],
                max_tokens: this.maxTokens,
                temperature: this.temperature,
                response_format: { type: "json_object" }
            });

            const aiText = JSON.parse(response.choices[0].message.content);
            return this.validateGenieResponse(aiText.response) || this.getFallbackResponse(context);

        } catch (error) {
            console.log('OpenAI failed, trying fallbacks...');
            return await this.tryFallbackAIs(question, systemPrompt, context);
        }
    }

    // Build personalized system prompt based on user context
    buildSystemPrompt(context) {
        let prompt = `You are the mystical genie from Aladdin (Robin Williams style) - wise, ancient, magical.

CRITICAL RULES:
- Respond in 1-3 words maximum
- Be cryptic and mysterious
- Never give direct answers
- Stay in character always
- Return JSON: {"response": "your_brief_response"}

USER CONTEXT:`;

        // Add personalized context
        if (context.insights.includes("seeker_new")) {
            prompt += "\n- User is new to the mystical journey";
        }

        if (context.insights.includes("aziza_stuck")) {
            prompt += "\n- User struggled with Aziza's riddle";
        }

        if (context.insights.includes("civic_engaged")) {
            prompt += "\n- User has participated in voting";
        }

        prompt += `\n\nDiscoveries made: ${context.discoveries.length}
Question type: ${context.questionType}

Respond mystically but be slightly more helpful to new seekers.`;

        return prompt;
    }

    // Fallback AI APIs
    async tryFallbackAIs(question, systemPrompt, context) {
        const fallbacks = [
            () => this.tryDeepSeekAPI(question, systemPrompt),
            () => this.tryGoogleGeminiAPI(question, systemPrompt),
            () => this.tryGroqAPI(question, systemPrompt),
            () => this.tryAnthropicAPI(question, systemPrompt)
        ];

        for (const fallback of fallbacks) {
            try {
                const response = await fallback();
                if (this.validateGenieResponse(response)) {
                    return response;
                }
            } catch (error) {
                continue;
            }
        }

        return this.getFallbackResponse(context);
    }

    // DeepSeek API (Very capable and affordable)
    async tryDeepSeekAPI(question, systemPrompt) {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: question }
                ],
                max_tokens: 20,
                temperature: 0.8,
                response_format: { type: "json_object" }
            })
        });

        if (response.ok) {
            const data = await response.json();
            const content = data.choices[0]?.message?.content;
            try {
                const parsed = JSON.parse(content);
                return parsed.response;
            } catch {
                // If not JSON, use content directly but validate
                return content?.trim();
            }
        }
        throw new Error('DeepSeek failed');
    }

    // Google Gemini API (Free tier with good capabilities)
    async tryGoogleGeminiAPI(question, systemPrompt) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${systemPrompt}\n\nQuestion: ${question}\n\nRespond with only 1-3 words in JSON format: {"response": "your_brief_response"}`
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: 20,
                    temperature: 0.8
                }
            })
        });

        if (response.ok) {
            const data = await response.json();
            const content = data.candidates[0]?.content?.parts[0]?.text;
            try {
                const parsed = JSON.parse(content);
                return parsed.response;
            } catch {
                // If not JSON, extract brief response
                return content?.trim().split(' ').slice(0, 3).join(' ');
            }
        }
        throw new Error('Google Gemini failed');
    }

    // Groq API (Fast and Free)
    async tryGroqAPI(question, systemPrompt) {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.1-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: question }
                ],
                max_tokens: 20,
                temperature: 0.8
            })
        });

        const data = await response.json();
        return JSON.parse(data.choices[0].message.content).response;
    }

    // Anthropic Claude API
    async tryAnthropicAPI(question, systemPrompt) {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 20,
                messages: [
                    {
                        role: 'user',
                        content: `${systemPrompt}\n\nQuestion: ${question}`
                    }
                ]
            })
        });

        const data = await response.json();
        return JSON.parse(data.content[0].text).response;
    }

    // Check daily usage limits
    async checkDailyLimit(userId) {
        const today = new Date().toISOString().split('T')[0];

        try {
            const params = {
                TableName: 'genie-usage',
                Key: { userId: userId, date: today }
            };

            const result = await dynamodb.get(params).promise();
            const usage = result.Item?.count || 0;

            return usage < this.dailyLimit;
        } catch (error) {
            return true; // Allow on error
        }
    }

    // Log interaction and update usage
    async logInteraction(userId, question, response, userIp) {
        const today = new Date().toISOString().split('T')[0];

        try {
            // Update daily usage count
            await dynamodb.update({
                TableName: 'genie-usage',
                Key: { userId: userId, date: today },
                UpdateExpression: 'ADD #count :inc',
                ExpressionAttributeNames: { '#count': 'count' },
                ExpressionAttributeValues: { ':inc': 1 }
            }).promise();

            // Log detailed interaction
            await dynamodb.put({
                TableName: 'genie-interactions',
                Item: {
                    userId: userId,
                    timestamp: new Date().toISOString(),
                    question: question,
                    response: response,
                    userIp: userIp,
                    date: today
                }
            }).promise();

        } catch (error) {
            console.error('Logging error:', error);
        }
    }

    // Get remaining questions for today
    async getRemainingQuestions(userId) {
        const today = new Date().toISOString().split('T')[0];

        try {
            const params = {
                TableName: 'genie-usage',
                Key: { userId: userId, date: today }
            };

            const result = await dynamodb.get(params).promise();
            const used = result.Item?.count || 0;

            return Math.max(0, this.dailyLimit - used);
        } catch (error) {
            return this.dailyLimit;
        }
    }

    // Validate response stays in character
    validateGenieResponse(response) {
        if (!response || response.length > 25) return false;

        const forbidden = ['i am an ai', 'as an ai', 'i cannot', 'according to'];
        const lower = response.toLowerCase();

        return !forbidden.some(phrase => lower.includes(phrase));
    }

    // Contextual fallback responses
    getFallbackResponse(context) {
        const responses = {
            seeker_new: ['Begin slowly.', 'Patience.', 'Explore first.'],
            aziza_stuck: ['Hidden names.', 'Look deeper.', 'Who am I?'],
            general: ['Perhaps.', 'Indeed.', 'Seek within.', 'Time reveals.']
        };

        const category = context.insights[0] || 'general';
        const options = responses[category] || responses.general;
        return options[Math.floor(Math.random() * options.length)];
    }

    categorizeQuestion(question) {
        const q = question.toLowerCase();
        if (q.includes('help') || q.includes('stuck')) return 'help';
        if (q.includes('future') || q.includes('will')) return 'future';
        if (q.includes('wise') || q.includes('know')) return 'wisdom';
        return 'general';
    }
}

module.exports = GenieAI;