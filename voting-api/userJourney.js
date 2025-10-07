const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
};

// Progressive Easter Egg System - 5 Levels
const EASTER_EGG_LEVELS = {
    1: {
        name: "Awakening",
        description: "First steps into self-discovery",
        triggers: [
            { type: "click", target: "logo", count: 3, message: "Tech King Revealed", difficulty: "easy" },
            { type: "hover", target: "hidden-symbols", count: 2, message: "Hidden Wisdom Found", difficulty: "easy" }
        ],
        unlocks: ["basic_wisdom", "first_reflection"]
    },
    2: {
        name: "Recognition",
        description: "Recognizing patterns and comfort zones",
        triggers: [
            { type: "keysequence", sequence: "SELF", message: "Self-Reliance Awakened", difficulty: "medium" },
            { type: "behavioral", action: "space_hold_3s", message: "Power of Pause", difficulty: "medium" }
        ],
        unlocks: ["comfort_zone_challenge", "self_reliance_wisdom"]
    },
    3: {
        name: "Challenge",
        description: "Confronting limitations and fears",
        triggers: [
            { type: "keysequence", sequence: "RIGHT", message: "Moral Compass Activated", difficulty: "medium" },
            { type: "behavioral", action: "double_escape", message: "Escape Comfort Zone", difficulty: "medium" },
            { type: "clicks", count: 7, time: 1000, message: "Inner Strength Unlocked", difficulty: "hard" }
        ],
        unlocks: ["moral_compass", "uncertainty_wisdom", "inner_strength"]
    },
    4: {
        name: "Mastery",
        description: "Embracing uncertainty and building legacy",
        triggers: [
            { type: "keysequence", sequence: "UNKNWN", message: "Uncertainty Mastery", difficulty: "hard" },
            { type: "keysequence", sequence: "BUILD", message: "Legacy Builder", difficulty: "hard" },
            { type: "combination", triggers: ["konami_code", "ai_wisdom"], message: "Master Hacker", difficulty: "expert" }
        ],
        unlocks: ["uncertainty_mastery", "legacy_builder", "advanced_hacker"]
    },
    5: {
        name: "Transcendence",
        description: "Living the philosophy - becoming the message",
        triggers: [
            { type: "keysequence", sequence: "TRUTH", message: "Truth Seeker", difficulty: "expert" },
            { type: "journey_completion", requirement: "transcendental_experience", message: "Awakened One", difficulty: "master" },
            { type: "time_based", requirement: "return_visitor_7days", message: "Committed Seeker", difficulty: "master" }
        ],
        unlocks: ["truth_seeker", "awakened_one", "philosophy_master"]
    }
};

exports.handler = async (event) => {
    try {
        const method = event.httpMethod;

        if (method === 'OPTIONS') {
            return {
                statusCode: 200,
                headers: corsHeaders
            };
        }

        if (method === 'POST') {
            return await updateUserJourney(event);
        } else if (method === 'GET') {
            return await getUserJourney(event);
        }

        return {
            statusCode: 405,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Method not allowed' })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};

async function updateUserJourney(event) {
    const body = JSON.parse(event.body);
    const { userId, eventType, eventData, timestamp } = body;

    if (!userId || !eventType) {
        return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'userId and eventType required' })
        };
    }

    // Get current user journey
    const userJourney = await getCurrentJourney(userId);

    // Process the event and determine progression
    const updatedJourney = await processJourneyEvent(userJourney, eventType, eventData);

    // Save the journey event
    const journeyItem = {
        userId: userId,
        timestamp: timestamp || Date.now(),
        eventType: eventType,
        eventData: eventData,
        currentLevel: updatedJourney.level,
        unlockedTriggers: updatedJourney.unlockedTriggers,
        completedChallenges: updatedJourney.completedChallenges,
        ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year TTL
    };

    await dynamodb.put({
        TableName: process.env.USER_JOURNEY_TABLE,
        Item: journeyItem
    }).promise();

    // Check for level progression
    const progressionResult = checkLevelProgression(updatedJourney);

    return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
            success: true,
            journey: updatedJourney,
            progression: progressionResult,
            nextChallenges: getNextChallenges(updatedJourney.level)
        })
    };
}

async function getUserJourney(event) {
    const userId = event.pathParameters.userId;

    if (!userId) {
        return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'userId required' })
        };
    }

    const journey = await getCurrentJourney(userId);
    const nextChallenges = getNextChallenges(journey.level);
    const availableTriggers = getAvailableTriggers(journey.level);

    return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
            journey,
            nextChallenges,
            availableTriggers,
            philosophy: getPhilosophyForLevel(journey.level)
        })
    };
}

async function getCurrentJourney(userId) {
    try {
        const result = await dynamodb.query({
            TableName: process.env.USER_JOURNEY_TABLE,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            },
            ScanIndexForward: false,
            Limit: 50
        }).promise();

        if (result.Items.length === 0) {
            return {
                userId,
                level: 1,
                unlockedTriggers: [],
                completedChallenges: [],
                startedAt: Date.now(),
                lastActive: Date.now()
            };
        }

        // Reconstruct journey from events
        const events = result.Items;
        const journey = {
            userId,
            level: 1,
            unlockedTriggers: [],
            completedChallenges: [],
            startedAt: events[events.length - 1].timestamp,
            lastActive: events[0].timestamp
        };

        // Process events to rebuild journey state
        for (const event of events.reverse()) {
            await processJourneyEvent(journey, event.eventType, event.eventData);
        }

        return journey;

    } catch (error) {
        console.error('Error getting journey:', error);
        return {
            userId,
            level: 1,
            unlockedTriggers: [],
            completedChallenges: [],
            startedAt: Date.now(),
            lastActive: Date.now()
        };
    }
}

async function processJourneyEvent(journey, eventType, eventData) {
    journey.lastActive = Date.now();

    switch (eventType) {
        case 'easter_egg_found':
            if (!journey.unlockedTriggers.includes(eventData.triggerId)) {
                journey.unlockedTriggers.push(eventData.triggerId);
            }
            break;

        case 'challenge_completed':
            if (!journey.completedChallenges.includes(eventData.challengeId)) {
                journey.completedChallenges.push(eventData.challengeId);
            }
            break;

        case 'transcendental_journey_started':
            journey.transcendentalStarted = true;
            break;

        case 'transcendental_journey_completed':
            journey.transcendentalCompleted = true;
            journey.personalityArchetype = eventData.archetype;
            break;

        case 'philosophy_unlocked':
            if (!journey.philosophyUnlocked) {
                journey.philosophyUnlocked = [];
            }
            if (!journey.philosophyUnlocked.includes(eventData.philosophyId)) {
                journey.philosophyUnlocked.push(eventData.philosophyId);
            }
            break;
    }

    return journey;
}

function checkLevelProgression(journey) {
    const currentLevel = journey.level;
    let newLevel = currentLevel;

    // Check progression criteria for each level
    for (let level = currentLevel; level <= 5; level++) {
        const levelData = EASTER_EGG_LEVELS[level];
        const requiredTriggers = levelData.triggers.map(t => t.message.toLowerCase().replace(/\s+/g, '_'));

        const hasRequiredTriggers = requiredTriggers.every(trigger =>
            journey.unlockedTriggers.some(unlocked =>
                unlocked.toLowerCase().includes(trigger) || trigger.includes(unlocked.toLowerCase())
            )
        );

        if (hasRequiredTriggers && level > newLevel) {
            newLevel = level;
        }
    }

    // Special progression rules
    if (journey.transcendentalCompleted && newLevel < 4) {
        newLevel = Math.max(newLevel, 4);
    }

    if (journey.philosophyUnlocked && journey.philosophyUnlocked.length >= 4 && newLevel < 5) {
        newLevel = Math.max(newLevel, 5);
    }

    const leveledUp = newLevel > currentLevel;
    journey.level = newLevel;

    return {
        leveledUp,
        oldLevel: currentLevel,
        newLevel: newLevel,
        message: leveledUp ? `🎉 Level Up! Welcome to ${EASTER_EGG_LEVELS[newLevel].name}` : null
    };
}

function getNextChallenges(level) {
    if (level > 5) return [];

    const levelData = EASTER_EGG_LEVELS[level];
    return levelData.triggers.map(trigger => ({
        type: trigger.type,
        difficulty: trigger.difficulty,
        hint: getTriggerHint(trigger),
        reward: trigger.message
    }));
}

function getAvailableTriggers(level) {
    const triggers = [];

    for (let i = 1; i <= Math.min(level, 5); i++) {
        triggers.push(...EASTER_EGG_LEVELS[i].triggers);
    }

    return triggers;
}

function getTriggerHint(trigger) {
    const hints = {
        'click_logo_3': "The king's crown holds secrets... try clicking it multiple times",
        'hover_hidden_symbols': "Some things are hidden in plain sight... look for mysterious symbols",
        'keysequence_SELF': "Type a word that represents who you truly are",
        'space_hold_3s': "Sometimes wisdom comes in moments of stillness... hold the space bar",
        'keysequence_RIGHT': "What guides your moral decisions? Type it out",
        'double_escape': "When you want to escape your comfort zone, what key do you press?",
        'clicks_7_1000': "Lucky number seven, but you'll need to be quick",
        'keysequence_UNKNWN': "Embrace the unknown... but how do you spell it when letters are missing?",
        'keysequence_BUILD': "What do visionaries do? They _____ something greater",
        'konami_code': "Classic gamers know this sequence: ↑↑↓↓←→←→BA",
        'keysequence_TRUTH': "The foundation of everything that matters... speak it",
        'transcendental_experience': "Begin your journey to unlock your deepest truth"
    };

    const key = `${trigger.type}_${trigger.sequence || trigger.action || trigger.count}`;
    return hints[key] || "Explore and discover...";
}

function getPhilosophyForLevel(level) {
    const philosophies = {
        1: {
            title: "The Awakening",
            message: "You are beginning to see that everything you need is already within you.",
            principle: "Self-awareness is the first step to self-mastery."
        },
        2: {
            title: "The Recognition",
            message: "You're recognizing the patterns that have kept you small. This awareness is power.",
            principle: "Comfort zones are beautiful prisons - recognize them to escape them."
        },
        3: {
            title: "The Challenge",
            message: "You're ready to confront your limitations. This is where growth begins.",
            principle: "Do what's right, not what's comfortable. Character is built in difficult moments."
        },
        4: {
            title: "The Mastery",
            message: "You understand that uncertainty is where possibility lives. You're becoming unstoppable.",
            principle: "The most successful people are comfortable with being uncomfortable."
        },
        5: {
            title: "The Transcendence",
            message: "You've become the philosophy. You are the message. Now help others find their path.",
            principle: "Your legacy isn't what you achieve - it's who you become and who you help others become."
        }
    };

    return philosophies[Math.min(level, 5)] || philosophies[1];
}