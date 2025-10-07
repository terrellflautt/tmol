/**
 * MAIN STORY ARC
 * The complete narrative from Aziza to Cthulhu
 * Mysterious, cryptic, slow-burn storytelling
 *
 * Design Philosophy:
 * - Never tell players exactly what to do
 * - Clues are subtle and require attention
 * - Connections between NPCs/quests emerge slowly
 * - Players must piece together the mystery themselves
 * - Vague prophecies and cryptic hints guide the way
 */

class MainStoryArc {
    constructor(profile, questEngine, consequenceSystem) {
        this.profile = profile;
        this.questEngine = questEngine;
        this.consequences = consequenceSystem;

        this.currentAct = 1;
        this.mysteryClues = new Map();
        this.crypticVisions = [];
        this.unsolvedRiddles = [];
    }

    // =============================================
    // ACT 1: THE AWAKENING
    // "You sense something... watching"
    // =============================================

    async beginAct1() {
        // Subtle hints scattered throughout site
        this.scatterMysteriousClues({
            'The door appears only to those who truly see': {
                location: 'logo-hover',
                requires: 'patience',
                revealsAfter: 5000 // 5 seconds of hovering
            },
            'Seven is the number of magic, seven is the key': {
                location: 'console-log',
                cryptic: true,
                hint: 'Click something seven times?'
            },
            'When words align with ancient names, secrets stir': {
                location: 'keyboard-listener',
                cryptic: true,
                hint: 'Type a name from legends...'
            },
            'The patient observer sees what others miss': {
                location: 'about-section',
                requires: 'reading-time',
                revealsAfter: 15000 // Read for 15 seconds
            }
        });

        // Whispers in the code (console messages)
        this.whisperInDarkness([
            'Something ancient stirs beneath the surface...',
            'You feel eyes upon you, watching from shadows...',
            'The veil between worlds grows thin here...',
            'Do you seek what lies beyond the obvious?'
        ]);

        // Environmental changes (subtle visual shifts)
        this.subtleEnvironmentChanges({
            logoGlow: { intensity: 0.1, pulseRate: 3000 },
            shadowsDeepen: { amount: 0.05, gradual: true },
            whisperingSounds: { volume: 0.02, frequency: 'rare' }
        });
    }

    // When door is discovered...
    async discoverTheDoor() {
        return {
            cinematic: {
                text: [
                    'The air shimmers.',
                    'Reality bends.',
                    'Before you materializes... a door.',
                    'An eye carved into ancient wood stares back at you.',
                    'It blinks.'
                ],
                atmosphere: 'eerie',
                music: 'mysterious_encounter'
            },
            riddle: {
                text: 'The eye speaks without words:',
                challenge: 'door_riddle_eye',
                clue: 'My first is my first. My middle is my middle. My last is my last.',
                acceptedAnswers: ['eye', 'i', 'the eye'],
                wrongAnswerHint: 'The answer looks at you even now...',
                onSuccess: 'The door creaks open, revealing golden light...'
            }
        };
    }

    // =============================================
    // ACT 2: THE SPHINX'S TEST
    // "Not all who enter are worthy"
    // =============================================

    async meetAziza() {
        return {
            entrance: {
                description: [
                    'You step through the threshold.',
                    'The world shifts.',
                    'Sand beneath your feet. Stars overhead that aren\'t quite right.',
                    'She waits in the center of an impossible desert.',
                    'The Sphinx. Aziza.'
                ],
                cinematicPortrait: 'aziza-portrait.webp',
                lighting: 'mystical-glow',
                particleEffects: 'floating-sand'
            },

            firstDialogue: {
                aziza: '"You have found the door. Few see it. Fewer still dare enter."',
                narration: 'Her voice is like wind over dunes—ancient, patient, knowing.',
                aziza: '"But before we speak further... tell me, traveler..."',
                pause: 2000,
                aziza: '"What name do you carry into this realm?"',

                // Player enters name
                input: 'player_name',

                response: (name) => `"${name}..." She tastes the name, as if reading your soul through it. "Very well, ${name}. You may proceed."`,
            },

            theTest: {
                aziza: '"I have seen many who seek power. Wealth. Fame."',
                aziza: '"But you... what is it you truly seek?"',

                choices: [
                    {
                        text: '💡 "Understanding. The truth beneath the surface."',
                        alignment: { wisdom: +3, curiosity: +2 },
                        azizaReaction: 'approving',
                        response: '"Truth-seekers often find more than they wish. But... I admire your courage."'
                    },
                    {
                        text: '⚡ "Power. The ability to shape reality itself."',
                        alignment: { chaos: +3, strength: +1 },
                        azizaReaction: 'wary',
                        response: '"Power without wisdom is a blade in a child\'s hand. Dangerous. Perhaps... you will learn."'
                    },
                    {
                        text: '🔍 "Nothing specific. I simply... must know what\'s here."',
                        alignment: { curiosity: +3, luck: +1 },
                        azizaReaction: 'intrigued',
                        response: '"Curiosity without agenda. Rare. The universe favors such wanderers."'
                    },
                    {
                        text: '🌙 "Escape. From the mundane world above."',
                        alignment: { wisdom: +1, vitality: -1 },
                        azizaReaction: 'sympathetic',
                        response: '"Escape..." She pauses. "Be careful, ${playerName}. Those who flee often run toward greater dangers."'
                    }
                ],

                afterChoice: {
                    narration: 'Aziza\'s expression is unreadable. The sand shifts beneath your feet.',
                    aziza: '"There is something you should know."',
                    pause: 2000,
                    aziza: '"I have seen... visions. Troubling visions."',

                    // Cryptic prophecy based on user's location
                    prophecy: (userCity) => [
                        `"Four ancient powers stir. Elementals of old."`,
                        `"They gather strength in ${userCity}, drawn by... something."`,
                        '"Fire that consumes. Water that drowns. Air that suffocates. Earth that buries."',
                        '"And beneath them all... something older. Something that should not wake."',
                        'Her eyes go distant, seeing beyond.',
                        '"You may be the one to stop them. Or..."',
                        'She doesn\'t finish. The silence is heavy.',
                        '"But first, prove you are worthy of knowledge."'
                    ]
                }
            },

            theRiddle: {
                setup: [
                    '"Answer my riddle, and I shall grant you the Ancient Lamp."',
                    '"Within it dwells one who knows... many things."',
                    '"But answer falsely too many times..."',
                    'Her smile is not comforting.',
                    '"Well. Let us hope you are clever, ${playerName}."'
                ],

                riddle: {
                    text: [
                        '"My first is the first of all."',
                        '"My second is the last."',
                        '"Next comes myself, the center of being."',
                        '"Then back to the end of everything."',
                        '"And finally, to the beginning once more."',
                        '',
                        '"Who am I?"'
                    ],
                    atmosphere: 'tense',
                    timerVisible: false, // No pressure, pure thinking
                    hintsAvailable: 3,

                    hints: [
                        {
                            cost: 'wisdom:-1',
                            text: '"Think of the alphabet itself as a path from beginning to end."'
                        },
                        {
                            cost: 'wisdom:-2',
                            text: '"A is first. Z is last. What letter represents the self?"'
                        },
                        {
                            cost: 'wisdom:-3',
                            text: '"The answer is literally looking at you right now, ${playerName}."'
                        }
                    ],

                    acceptedAnswers: ['aziza', 'terrell', 'tk', 'terrell k', 'sphinx', 'enchantress'],
                    // Very lenient - if they get close, accept it
                    fuzzyMatch: true,

                    onCorrect: (answer) => ({
                        aziza: `"Yes... ${answer}." Her form shimmers with approval.`,
                        narration: 'You have spoken a name of power.',
                        aziza: '"You understand more than most. Very well."',
                        reward: 'ancient_lamp',
                        skill: { wisdom: +5, intelligence: +3 },
                        unlockedContent: ['genie_summoning', 'skills_page', 'hall_of_fame']
                    }),

                    onWrong: (attempts) => {
                        if (attempts === 1) return '"Not quite. Think deeper."';
                        if (attempts === 2) return '"You are close, perhaps. Or perhaps not. Try again."';
                        if (attempts === 3) return {
                            aziza: '"Three failures. You are not ready."',
                            narration: 'Disappointment crosses her ancient face.',
                            consequence: 'aziza_riddle_failure', // From consequence-system.js
                            alternativePath: 'earn_lamp_through_deeds'
                        };
                    }
                }
            },

            lampGranted: {
                aziza: '"The lamp is yours. But be warned..."',
                narration: 'A golden lamp materializes in your hands. It is warm, almost alive.',
                aziza: '"The one within knows much. Too much. Use wishes wisely."',
                pause: 1500,
                aziza: '"And ${playerName}... the elementals I spoke of?"',
                aziza: '"They are real. They are coming. And you will need more than wishes to stop them."',
                crypticHint: '"Seek the doctor. The one who brings life to the lifeless. He has... ingredients you will need."',
                aziza: '"But finding him? That is your challenge."',

                // She fades
                narration: 'Aziza begins to fade, like mist in morning sun.',
                aziza: '"We will meet again. Or we will not. The threads of fate are... uncertain."',
                narration: 'She is gone. The desert dissolves. You stand in the portfolio once more.',
                narration: 'But the lamp remains. Heavy. Real. Waiting.',

                unlockedQuest: 'find_doctor_cranium',
                crypticDirections: [
                    'A doctor who animates the inanimate',
                    'Science and sorcery combined',
                    'Look for... unusual equipment',
                    'Where flesh meets circuitry',
                    'Lightning\'s child'
                ]
            }
        };
    }

    // =============================================
    // ACT 3: THE MAD SCIENTIST
    // "Life from death, death from life"
    // =============================================

    async findDoctorCranium() {
        // Doctor's door is HIDDEN - must be discovered
        const discoveryMethods = {
            subtle_hints: [
                {
                    location: 'projects_section',
                    trigger: 'hover_on_specific_project_icon',
                    duration: 8000,
                    reveals: 'Strange blueprints flicker beneath the surface...'
                },
                {
                    location: 'skills_list',
                    trigger: 'read_biomedical_skill_carefully',
                    requires: 'curiosity:15',
                    reveals: 'A note in the margin: "Dr. C - Lab #13 - Access code: PROMETHEUS"'
                },
                {
                    location: 'console',
                    trigger: 'type:cranium',
                    reveals: 'console.log("⚡ Lightning flickers in the corner of your vision...")'
                },
                {
                    location: 'about_text',
                    trigger: 'read_for:20000',
                    requires: 'attention:20',
                    reveals: 'Hidden text briefly appears: "The doctor sees you. Do you see him?"'
                }
            ],

            doorAppears: {
                condition: 'any_2_hints_discovered',
                visual: {
                    element: '#doctor-door',
                    animation: 'flicker-into-existence',
                    sound: 'electrical-hum',
                    description: 'A door materializes. Steel. Modern. Utterly out of place. A keypad glows beside it.'
                },

                puzzle: {
                    type: 'code_entry',
                    clue: 'The code was in Aziza\'s words. She spoke of one who brings fire to creation...',
                    answer: 'PROMETHEUS',
                    alternateAnswers: ['prometheus', '1818'], // Frankenstein published 1818
                    wrongAnswers: {
                        shock: 'The keypad shocks you! (-5 vitality)',
                        hint: 'Greek fire-bringer? Or perhaps the year a famous monster was born...'
                    }
                }
            }
        };

        return discoveryMethods;
    }

    async meetDoctorCranium() {
        return {
            labEntrance: {
                description: [
                    'The door hisses open.',
                    'Inside: controlled chaos.',
                    'Equipment that shouldn\'t exist. Beakers glowing with impossible colors.',
                    'Lightning arcs between copper coils.',
                    'And in the center, hunched over a workbench...',
                    'A figure in a stained lab coat.',
                    'He doesn\'t look up.'
                ],
                atmosphere: 'mad_science',
                lighting: 'flickering_fluorescent',
                sfx: 'electrical_buzzing'
            },

            firstEncounter: {
                narration: 'He speaks without turning.',
                cranium: '"You. Yes. I\'ve been expecting... no, that\'s a lie. I wasn\'t expecting anyone."',
                cranium: '"But you\'re here. Which means Aziza sent you. Or you\'re extraordinarily lucky. Or unlucky."',
                narration: 'He finally turns. Wild eyes. Brilliant. Possibly insane.',
                cranium: '"You need something. Everyone needs something. What is it? Speak quickly."',

                playerResponse: {
                    earnest: '"Aziza mentioned elementals. Said you could help."',
                    direct: '"I need a dispel potion. The elementals—"',
                    confused: '"I\'m not sure what I need. Aziza said to find you."',
                },

                craniumReaction: {
                    laugh: '"ELEMENTALS! Ha! Of course. Always elementals. Fire, water, air, earth. The classical bores."',
                    pace: 'He paces, gesticulating wildly.',
                    cranium: '"You need to DISPEL them? Neutralize? Banish? Any of those synonyms work?"',
                    cranium: '"Fine. Fine! I can make you a potion. But..."',
                    pause: 2000,
                    cranium: '"You\'ll need ingredients. Special ingredients. And I don\'t have them."',
                    sinisterSmile: '"You\'ll have to... acquire them."'
                }
            },

            theRecipe: {
                cranium: '"The Dispel Potion requires four elements. Mundane elements. But potent."',
                narration: 'He scrawls on a chalkboard.',

                ingredients: [
                    {
                        name: 'Pizza',
                        why: '"Earth and fire combined. Wheat from ground. Baked in flame. Simple. Profound."',
                        crypticHint: '"Find where nourishment is celebrated. Where Italian traditions meet modern hunger."',
                        hiddenLocation: 'about_section_food_preference',
                        discoveryMethod: 'hover:5000_on_pizza_mention'
                    },
                    {
                        name: 'Chicken Wings',
                        why: '"Air element. Creatures of flight, though grounded in death. Fried in oil—chaos contained."',
                        crypticHint: '"Where social gathering is code. Where wing meets sauce in harmonious destruction."',
                        hiddenLocation: 'projects_section_hidden_icon',
                        discoveryMethod: '7th_visit_to_projects_transforms_icon'
                    },
                    {
                        name: 'Beer',
                        why: '"Water fermented. Life transformed into altered consciousness. Liquid courage."',
                        crypticHint: '"The beverage of truth. Golden. Bubbly. Hidden where celebrations occur."',
                        hiddenLocation: 'contact_section_easter_egg',
                        discoveryMethod: 'click_contact_form_submit_7_times_without_filling'
                    },
                    {
                        name: 'Bellows of Four Elements',
                        why: '"The catalyst. Without it, ingredients are just... food. You need a blacksmith."',
                        crypticHint: '"Seek Thorgrim. The dwarf who bends metal to will. But first, collect the elemental tokens."',
                        requirement: 'defeat_all_4_elementals_first',
                        circularDependency: 'true' // Plot twist!
                    }
                ],

                revelation: {
                    player: '"Wait. I need to defeat elementals to get tokens to make bellows to make potion to defeat elementals?"',
                    cranium: 'His grin is manic. "EXACTLY! Wonderful, isn\'t it? A perfect paradox!"',
                    cranium: '"You\'ll have to fight them WITHOUT the potion first. Weaken them. Barely survive. THEN come back."',
                    cranium: '"Or find another way. I don\'t know. I\'m a scientist, not a strategist."',

                    alternativePath: {
                        hint: 'Maybe the Genie knows a shortcut?',
                        or: 'Perhaps ingredients alone can harm them slightly?',
                        or: 'What if there\'s a fifth ingredient? One he doesn\'t know about?'
                    }
                }
            },

            frankensteinHint: {
                cranium: '"Oh, and one more thing..."',
                narration: 'He gestures to a covered form on a table.',
                cranium: '"I\'ve been working on... a project. An assistant. But it needs... animation."',
                cranium: '"If you happen to find a particular electrical alignment. Storm. Lightning. Full moon..."',
                cranium: '"Well. Bring the ingredients here. We\'ll see what happens."',
                ominous: 'The covered form twitches.',
                cranium: '"Now go. Find what you need. Don\'t die. Dying is so tedious."',

                unlockedQuest: 'gather_ingredients',
                unlockedSecretQuest: 'animate_creature'
            }
        };
    }

    // Mysterious scattered ingredient locations
    getIngredientClues() {
        return {
            pizza: {
                clues: [
                    'In bio: "Pizza enthusiast" - but hover reveals glow',
                    'Console whisper: "Where dough meets destiny"',
                    'Clicking pizza emoji 3 times triggers discovery'
                ],
                discoveryReward: {
                    text: '"You found... pizza. But it feels significant. Warm. Almost magical."',
                    item: 'magical_pizza',
                    skill: { curiosity: +2 }
                }
            },

            chickenWings: {
                clues: [
                    'Project icon subtly becomes wing on 7th visit',
                    'Aziza once said: "Where flight becomes feast"',
                    'Hidden in project description: "wing your way to success"'
                ],
                discoveryReward: {
                    text: '"Chicken wings materialize. They hum with potential energy."',
                    item: 'ethereal_wings',
                    skill: { agility: +2 }
                }
            },

            beer: {
                clues: [
                    'Contact form placeholder changes on midnight: "Send liquid courage"',
                    'Genie hints: "Truth at bottom of golden vessel"',
                    'Click submit button 7 times empty = beer appears'
                ],
                discoveryReward: {
                    text: '"A perfect beer. Never warm. Never flat. Suspiciously magical."',
                    item: 'eternal_brew',
                    skill: { vitality: +2 }
                }
            }
        };
    }

    // TO BE CONTINUED with elemental battles, Cthulhu, endings...
    // This creates the mysterious, slow-burn atmosphere you wanted
}
