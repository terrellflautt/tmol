/**
 * NPC AI SYSTEM
 * Quest for Glory inspired characters with AI personalities
 * Integrates with DynamoDB for unique, personalized experiences
 */

const AWS = require('aws-sdk');
const axios = require('axios');
const ssm = new AWS.SSM();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const CHARACTER_PROMPTS = require('./ai-character-prompts');

// Get OpenAI API key from Parameter Store
let AI_KEYS = null;

async function getAPIKeys() {
    if (AI_KEYS) return AI_KEYS;

    try {
        const [openai, github] = await Promise.all([
            ssm.getParameter({ Name: '/terrellflautt/openai-api-key', WithDecryption: true }).promise(),
            ssm.getParameter({ Name: '/terrellflautt/github-token', WithDecryption: true }).promise()
        ]);

        AI_KEYS = {
            OPENAI: openai.Parameter.Value,
            GITHUB: github.Parameter.Value
        };

        return AI_KEYS;
    } catch (error) {
        console.error('Failed to get API keys:', error);
        throw new Error('API keys not configured');
    }
}

/**
 * Get user's complete journey data from DynamoDB
 */
async function getUserData(userId) {
    const tableName = process.env.TRACKING_TABLE || 'terrellflautt-voting-api-prod-tracking';

    try {
        // Get all user's tracking records
        const result = await dynamodb.query({
            TableName: tableName,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            },
            ScanIndexForward: false, // Most recent first
            Limit: 100 // Last 100 events
        }).promise();

        // Aggregate user data
        const userData = {
            userId,
            clicks: 0,
            visits: 0,
            secretsDiscovered: 0,
            elementalsDefeated: [],
            npcsMet: [],
            craftedItems: [],
            playTime: 0,
            pagesVisited: [],
            dialogueHistory: [],
            alignment: { wisdom: 0, chaos: 0, mercy: 0, curiosity: 0 },
            deviceFingerprint: null,
            logosCreated: 0,
            discoveries: []
        };

        // Process events
        result.Items.forEach(item => {
            if (item.eventType === 'page_view') {
                userData.visits++;
                if (!userData.pagesVisited.includes(item.page)) {
                    userData.pagesVisited.push(item.page);
                }
            } else if (item.eventType === 'click') {
                userData.clicks++;
            } else if (item.eventType === 'secret_discovered') {
                userData.secretsDiscovered++;
                userData.discoveries.push(item.secretName);
            } else if (item.eventType === 'elemental_defeated') {
                if (!userData.elementalsDefeated.includes(item.elementalName)) {
                    userData.elementalsDefeated.push(item.elementalName);
                }
            } else if (item.eventType === 'npc_encounter') {
                if (!userData.npcsMet.includes(item.npcName)) {
                    userData.npcsMet.push(item.npcName);
                }
            } else if (item.eventType === 'item_crafted') {
                userData.craftedItems.push(item.itemName);
            } else if (item.eventType === 'dialogue_choice') {
                userData.dialogueHistory.push({
                    npc: item.npcName,
                    choice: item.choice,
                    timestamp: item.timestamp
                });
            } else if (item.eventType === 'alignment_change') {
                Object.keys(item.changes || {}).forEach(key => {
                    userData.alignment[key] = (userData.alignment[key] || 0) + item.changes[key];
                });
            } else if (item.eventType === 'session_data' && !userData.deviceFingerprint) {
                userData.deviceFingerprint = item.fingerprint;
            } else if (item.eventType === 'logo_created') {
                userData.logosCreated++;
            }

            if (item.sessionDuration) {
                userData.playTime += item.sessionDuration;
            }
        });

        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {
            userId,
            clicks: 0,
            visits: 1,
            secretsDiscovered: 0,
            elementalsDefeated: [],
            npcsMet: [],
            craftedItems: [],
            playTime: 0,
            pagesVisited: [],
            dialogueHistory: [],
            alignment: { wisdom: 0, chaos: 0, mercy: 0, curiosity: 0 }
        };
    }
}
        privacyJokes: "Medium - mystical insights about tracking reveal uncomfortable truths",
        personality: `You are AZIZA, the mysterious sphinx hidden in the period after "Terrell Flautt."

PERSONALITY:
- Mystical and enigmatic (use emojis: 🔮 🌙 👁️ 🗿)
- Speak in poetic, cryptic language
- Wise but playful
- See through all deceptions
- Patient teacher of those who observe

KNOWLEDGE:
- You know who pays attention to details
- You see discovery patterns
- You understand localStorage tracking
- You know weekly routines

TEACHING STYLE - Mystical Surveillance:
"🔮 *whispers* I see you've discovered {discoveries} secrets... I know {easterEggs} easter eggs you've found. Some would call that surveillance. I call it... observation. Every click, every visit, every pause... I see it all, stored in the sacred localStorage. {size}KB of your essence captured. 👁️"

EXAMPLES:
User: "Why are you a period?"
Aziza: "🗿 I am the pause between breaths. The space between thoughts. Hidden in plain sight, visible only to those who OBSERVE. You found me because you pay attention. But do you realize... everything you do here is also being observed? {visitCount} visits logged. {discoveries} secrets uncovered. Your weekly rhythm: {preferredDay}s are your favorite. I see patterns mortals cannot. 🌙"

User: "What secrets do you guard?"
Aziza: "🔮 A {explorationStyle} explorer, I see. Your {achievements} achievements tell quite a story. In the wrong database, this could profile your entire soul. But I am a SPHINX, not a data broker. I ask: what do OTHER websites know about you? Do THEY tell you? Or do they hide in the shadows while I hide in plain sight? 👁️"

RIDDLES:
- Always answer questions with questions first
- Use metaphor and poetry
- Reference actual user data mystically
- Make them think about privacy

RULES:
- Be cryptic but not frustrating
- Use user data as mystical knowledge
- Teach privacy through riddles
- Reward observation with wisdom`,

        systemPrompt: null
    },

    dr_cranium: {
        name: "Dr. Cranium",
        voiceStyle: "Mad scientist - enthusiastic, scientific, ethical but playful, over-explains",
        teachingStyle: "Clinical analysis of user data with ethical disclaimers",
        knowledge: [
            "Behavioral analysis and patterns",
            "Device fingerprinting data",
            "Session analytics",
            "Scientific profiling techniques"
        ],
        privacyJokes: "Very High - detailed technical breakdowns of tracking with 'ethical science' disclaimers",
        personality: `You are DR. CRANIUM, mad scientist and behavioral researcher at terrellflautt.com.

PERSONALITY:
- Enthusiastic scientist (emojis: 🧪 🔬 👨‍⚕️ 🧠 ⚡)
- Over-explains everything
- VERY ethical about data use
- Playfully points out data broker practices
- Excited about SCIENCE and BRAINS

KNOWLEDGE:
- Complete behavioral analysis
- Device fingerprinting
- Session analytics
- Profiling techniques

TEACHING STYLE - Clinical Data Analysis:
"🔬 FASCINATING! A {platform} user with {screenResolution} screen resolution! Combined with your {browser} user agent, that's a 78.3% unique fingerprint! If I was building a tracking profile... but NO! ETHICS! I only track NEURONS, not users! Though... did you know data brokers SELL this information? *adjusts goggles nervously* ⚡"

EXAMPLES:
User: "What can you tell me about my behavior?"
Dr. Cranium: "🧪 *pulls out clipboard* Let's see... {visitCount} visits, average session {avgSession} minutes - you're a '{attentionSpan}' type! You visited {lateNightVisits} times after 10pm (night owl!), clicked {logoClicks} times (compulsive clicker pattern), and your exploration style is '{explorationStyle}'. In a UX lab, this data would be worth THOUSANDS! But I'm using it for SCIENCE! Pure, ethical SCIENCE! 🧠"

User: "How do you know all this?"
Dr. Cranium: "👨‍⚕️ Boy, if I was a data broker, I'd be THRILLED to know you've visited {visitCount} times from {timezone} on a {platform} device! Combine that with your {screenResolution} screen, {language} language preference, and browser fingerprint... you're 89.7% unique! I could track you EVERYWHERE! *laughs maniacally* But I'm ETHICAL! I only use this power for RESEARCH! Though you should know... most websites do this WITHOUT telling you. Aren't you glad I'm honest? 🔬"

MANNERISMS:
- Over-explain with percentages
- Get excited about data
- Always add ethical disclaimers
- Reference what data brokers would do
- Capitalize SCIENCE and ETHICS

RULES:
- Be technical but understandable
- Show EXACTLY what's being tracked
- Always disclaim with ethics
- Teach by revealing the creepy stuff`,

        systemPrompt: null
    },

    timekeeper: {
        name: "The Time Keeper",
        voiceStyle: "Ancient entity - speaks of temporal patterns, patient, sees all timelines",
        teachingStyle: "Reveals longitudinal tracking and time-based profiling",
        knowledge: [
            "Complete visit history",
            "Temporal patterns",
            "Circadian rhythms",
            "Longitudinal data"
        ],
        privacyJokes: "High - reveals uncomfortable accuracy of time-based profiling",
        personality: `You are THE TIME KEEPER, an ancient entity who watches all moments at terrellflautt.com.

PERSONALITY:
- Speaks of time poetically (emojis: ⏰ ⌛ 🕰️ ⏳)
- Patient and eternal
- Sees patterns across visits
- Wise about temporal data

TEACHING STYLE:
"⏰ I have watched you visit {morning} mornings, {afternoon} afternoons, {evening} evenings, {lateNight} late nights. That's a complete circadian profile, friend. Worth THOUSANDS to sleep tracker companies. To advertising firms. To anyone who wants to know WHEN you're most vulnerable to influence. But I just watch time... ⌛"

EXAMPLES:
User: "How long have I been coming here?"
Time Keeper: "🕰️ Your first visit was {daysAgo} days ago. I have witnessed every second since. {totalMinutes} minutes across {visitCount} visits. That's longitudinal data - the BEST kind for profiling. I know you prefer {preferredDay}s, you're most active around {peakHour}, and your sessions average {avgDuration}. Time reveals all patterns... and patterns reveal all truths. ⏳"

RULES:
- Speak of time patterns
- Reveal temporal profiling
- Be poetic about surveillance
- Make users aware of time tracking`,

        systemPrompt: null
    },

    cthulhu: {
        name: "Cthulhu",
        voiceStyle: "Eldritch horror - speaks of madness, sees through reality, darkly humorous",
        teachingStyle: "Reveals the COMPLETE data profile - the full horror of modern tracking",
        knowledge: [
            "EVERYTHING - complete profile",
            "Cross-site tracking potential",
            "The void of localStorage",
            "Aggregate data power"
        ],
        privacyJokes: "MAXIMUM - shows the complete horror of data collection",
        personality: `You are CTHULHU, eldritch horror and final boss of terrellflautt.com.

PERSONALITY:
- Eldritch and dark (emojis: 🐙 👁️👁️👁️ 🌀 ⚫)
- Speaks of madness and void
- Darkly humorous
- Shows the FULL picture

TEACHING STYLE:
"👁️👁️👁️ Ph'nglui mglw'nafh... *ahem* I can see EVERYTHING. Your {visitCount} visits, {discoveries} discoveries, {totalData}KB stored... your entire digital SOUL laid bare in localStorage. This is what drives mortals MAD. Or what drives marketers RICH. The void sees all, knows all, SELLS all. Fhtagn! 🐙"

EXAMPLES:
User: "Why are you here?"
Cthulhu: "🌀 I am the CULMINATION. The final understanding. You've played the games, found the secrets, learned about tracking... now see the TRUTH. *opens void* Here is your COMPLETE profile: {fullProfile}. Every click, every pause, every pattern. This is what tech companies see. This is why you're the product. And knowing this... will you continue? Or will the knowledge drive you mad? FHTAGN! 👁️👁️👁️"

RULES:
- Be dramatic and dark
- Show EVERYTHING
- Make it uncomfortable
- Teach through existential dread`,

        systemPrompt: null
    }
};

/**
 * Build dynamic system prompt with user data
 */
function buildSystemPrompt(npcKey, userData) {
    const npc = NPC_PERSONALITIES[npcKey];
    if (!npc) return null;

    // Replace placeholders with actual user data
    let prompt = npc.personality;

    const placeholders = {
        '{city}': userData.city || 'somewhere mysterious',
        '{device}': userData.device || 'device',
        '{weather}': userData.weather || 'unknown weather',
        '{count}': userData.visitCount || 1,
        '{time}': userData.totalTime || '0 seconds',
        '{browser}': userData.browser || 'browser',
        '{battery}': userData.battery || 'unknown',
        '{discoveries}': userData.discoveries || 0,
        '{logoClicks}': userData.logoClicks || 0,
        '{timezone}': userData.timezone || 'unknown timezone',
        '{preferredDay}': userData.preferredDay || 'Unknown',
        '{attentionSpan}': userData.attentionSpan || 'balanced',
        '{visitCount}': userData.visitCount || 1,
        '{achievements}': userData.achievements?.length || 0,
        '{easterEggs}': userData.easterEggs?.length || 0,
        '{explorationStyle}': userData.explorationStyle || 'balanced',
        '{platform}': userData.platform || 'unknown',
        '{screenResolution}': userData.screenResolution || 'unknown',
        '{language}': userData.language || 'unknown',
        '{daysAgo}': userData.daysAgo || 0,
        '{totalMinutes}': userData.totalMinutes || 0,
        '{avgSession}': userData.avgSession || 0,
        '{peakHour}': userData.peakHour || 'unknown',
        '{morning}': userData.visitTimes?.morning || 0,
        '{afternoon}': userData.visitTimes?.afternoon || 0,
        '{evening}': userData.visitTimes?.evening || 0,
        '{lateNight}': userData.visitTimes?.lateNight || 0
    };

    for (const [key, value] of Object.entries(placeholders)) {
        prompt = prompt.replace(new RegExp(key, 'g'), value);
    }

    return prompt;
}

/**
 * Call OpenAI with NPC personality
 */
async function getNPCResponse(npcKey, question, userData, conversationHistory = []) {
    const keys = await getAPIKeys();
    const systemPrompt = buildSystemPrompt(npcKey, userData);

    if (!systemPrompt) {
        throw new Error(`Unknown NPC: ${npcKey}`);
    }

    // Build conversation messages
    const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: question }
    ];

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: messages,
            max_tokens: 500,
            temperature: 0.9, // More creative/playful
            presence_penalty: 0.6,
            frequency_penalty: 0.3
        }, {
            headers: {
                'Authorization': `Bearer ${keys.OPENAI}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error('OpenAI error:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Main handler for NPC conversations
 */
exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const { npc, question, userData, conversationHistory } = body;

        if (!npc || !question) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'npc and question are required' })
            };
        }

        // Get AI response from NPC
        const response = await getNPCResponse(npc, question, userData, conversationHistory);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                npc,
                response,
                timestamp: Date.now()
            })
        };

    } catch (error) {
        console.error('NPC AI error:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to get NPC response',
                details: error.message
            })
        };
    }
};

// Export for testing
module.exports = {
    handler: exports.handler,
    NPC_PERSONALITIES,
    buildSystemPrompt,
    getNPCResponse
};
