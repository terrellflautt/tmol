// 🧞‍♂️ GENIE API ENDPOINT - Personalized AI Assistant for Each User's Path

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const GenieAI = require('./genie-ai');

const app = express();
const genieAI = new GenieAI();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting - 5 requests per minute per IP
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 requests per minute
    message: { error: "The genie needs rest. Try again soon." }
});

app.use('/api/genie', limiter);

// 🧞‍♂️ MAIN GENIE ENDPOINT
app.post('/api/genie/ask', async (req, res) => {
    try {
        const { userId, question, sessionId } = req.body;
        const userIp = req.ip || req.connection.remoteAddress;

        // Validation
        if (!userId || !question) {
            return res.status(400).json({
                success: false,
                error: "User ID and question required"
            });
        }

        if (question.length > 200) {
            return res.status(400).json({
                success: false,
                error: "Question too long. Be brief with the genie."
            });
        }

        // Get personalized AI response
        const result = await genieAI.handleGenieRequest(userId, question, userIp);

        res.json(result);

    } catch (error) {
        console.error('Genie endpoint error:', error);
        res.status(500).json({
            success: false,
            error: "The mystical energies are disturbed."
        });
    }
});

// Get user's genie usage status
app.get('/api/genie/status/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const remaining = await genieAI.getRemainingQuestions(userId);

        res.json({
            success: true,
            remainingQuestions: remaining,
            dailyLimit: 3,
            canAsk: remaining > 0
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Cannot read the mystical records."
        });
    }
});

// Get user's personalized path insights
app.get('/api/genie/insights/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const insights = await genieAI.generatePathInsights(userId);

        res.json({
            success: true,
            insights: insights
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: "The path remains hidden."
        });
    }
});

// Health check
app.get('/api/genie/health', (req, res) => {
    res.json({
        status: 'The genie awakens',
        timestamp: new Date().toISOString(),
        apis: {
            openai: !!process.env.OPENAI_API_KEY,
            deepseek: !!process.env.DEEPSEEK_API_KEY,
            google: !!process.env.GOOGLE_API_KEY,
            groq: !!process.env.GROQ_API_KEY,
            anthropic: !!process.env.ANTHROPIC_API_KEY,
            dynamodb: !!process.env.AWS_ACCESS_KEY_ID
        },
        configured: {
            primary: process.env.OPENAI_API_KEY ? 'OpenAI GPT-4o-mini' : 'None',
            fallbacks: [
                process.env.DEEPSEEK_API_KEY ? 'DeepSeek Chat' : null,
                process.env.GOOGLE_API_KEY ? 'Google Gemini' : null,
                process.env.GROQ_API_KEY ? 'Groq Llama' : null,
                process.env.ANTHROPIC_API_KEY ? 'Anthropic Claude' : null
            ].filter(Boolean),
            total_apis: [
                process.env.OPENAI_API_KEY,
                process.env.DEEPSEEK_API_KEY,
                process.env.GOOGLE_API_KEY,
                process.env.GROQ_API_KEY,
                process.env.ANTHROPIC_API_KEY
            ].filter(Boolean).length
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🧞‍♂️ Genie AI API running on port ${PORT}`);
    console.log(`🔑 APIs configured: ${Object.keys(process.env).filter(k => k.includes('API_KEY')).length}`);
});

module.exports = app;