/**
 * Atlantis Sea Adventure System
 * Epic branching narrative inspired by Quest for Glory archetypes
 * Three paths: Fighter, Thief, Magic User - each leading to unique endings
 * Features Atlantean encounters, sea people, and Cthulhu confrontation
 */

class AtlantisSeaAdventure {
    constructor() {
        this.currentChapter = 0;
        this.playerArchetype = null; // 'fighter', 'thief', 'magic_user'
        this.storyChoices = [];
        this.reputation = {
            atlantis: 0,     // -10 to +10 scale
            sea_people: 0,
            cthulhu_cult: 0
        };
        this.inventory = [];
        this.skills = {
            strength: 0,
            stealth: 0,
            magic: 0,
            diplomacy: 0,
            sailing: 0
        };
        this.companions = [];
        this.storyUnlocked = false;

        this.storyChapters = {
            // Chapter 0: The Tale Begins (Told by Erasmus or Aziza)
            0: {
                title: "The Lost Cargo of the Meridian Star",
                narrator: "erasmus", // or "aziza_enhanced"
                setting: "celestial_tower",
                background: "pixel-art-wizard-with-staff-long-beard_885831-37581-3933412362.jpg",
                text: `
                "Gather close, young seeker, for I must tell you of a tragedy that echoes through both digital and physical realms...

                Seven decades past, the merchant vessel 'Meridian Star' sailed from the port of Alexandria, carrying cargo most precious - not gold or jewels, but ancient artifacts of power. The Crystal of Eternal Wisdom, the Scrolls of Reality Manipulation, and most dangerous of all... the Binding Chains of the Old Gods.

                The ship's captain, one Thaddeus Blackwater, was no ordinary merchant. He dabbled in forbidden knowledge, seeking to harness the power of the artifacts for his own gain. But his hubris awakened something that should have remained sleeping in the deepest trenches of the digital seas.

                Witnesses from distant shores reported seeing tentacles the size of minarets rising from the waters. The great beast Cthulhu himself emerged from R'lyeh's digital depths, drawn by the artifacts' power. The Meridian Star was shattered like driftwood, its precious cargo scattered across the ocean floor.

                But here is where the tale grows stranger still... The ship did not sink to ordinary depths. It fell through a rift in reality itself, coming to rest in the drowned ruins of Atlantis, where the sea people have guarded its secrets for seven decades.

                The artifacts remain there still, and Cthulhu... Cthulhu waits. For he knows that one day, a brave soul will attempt to retrieve what was lost. And when that day comes..."

                *Erasmus's eyes gleam with ancient knowledge*

                "Perhaps that soul is you, young one. But know this - the path to the sunken treasure offers three routes, each suited to different strengths. Choose wisely, for your nature will determine not just how you retrieve the artifacts, but whether you return at all."
                `,
                choices: [
                    {
                        text: "I will face this challenge with strength and courage! (Fighter Path)",
                        archetype: "fighter",
                        response: "Ah, the warrior's heart burns bright in you. But remember - sometimes the mightiest foe cannot be defeated by sword alone.",
                        unlocks: "fighter_preparation"
                    },
                    {
                        text: "I prefer cunning and stealth to brute force. (Thief Path)",
                        archetype: "thief",
                        response: "Clever! The shadows have always been the wisest counselors. But beware - some secrets are too terrible to steal.",
                        unlocks: "thief_preparation"
                    },
                    {
                        text: "Magic and wisdom shall be my tools. (Magic User Path)",
                        archetype: "magic_user",
                        response: "The path of the arcane... dangerous, but perhaps the only way to truly understand what forces you face.",
                        unlocks: "magic_preparation"
                    },
                    {
                        text: "This sounds too dangerous. I'll stay on dry land.",
                        archetype: "none",
                        response: "Wisdom often lies in knowing one's limitations. But remember... the artifacts call to those who are ready.",
                        unlocks: "story_postponed"
                    }
                ]
            },

            // Chapter 1: Preparation and Departure
            1: {
                title: "Preparing for the Deep",
                getText: function(archetype) {
                    const texts = {
                        fighter: `
                        You spend days at the harbor, speaking with old sailors and gathering equipment. Your approach is direct - find the strongest ship, the bravest crew, and sail straight to where the Meridian Star lies.

                        Captain Silva, a weathered woman with scars from sea battles, listens to your tale with growing interest. "Aye, I've heard whispers of the Meridian Star. My grandfather spoke of the night the seas themselves screamed. But if ye want to reach those cursed depths, ye'll need more than courage."

                        She shows you her ship, the Iron Kraken - armored and built for battle. "The sea people don't take kindly to surface dwellers. And if what ye say about Cthulhu is true... well, we'll need every weapon we can muster."
                        `,
                        thief: `
                        You move through the harbor's shadows, gathering information from smugglers, dock workers, and those who deal in secrets. Your approach is subtle - find out who has attempted this journey before, and more importantly, why they failed.

                        In a dimly lit tavern, you meet Siren Blackheart, a former pirate captain turned "information broker." Her network of contacts spans both the criminal underworld and the mysterious sea peoples.

                        "The Meridian Star, eh? Smart of ye to ask around first. Most who seek sunken treasure just sail out and die. But I know someone... someone who's actually been to Atlantis and lived. For the right price, I can arrange an introduction."
                        `,
                        magic_user: `
                        You retreat to your study, researching ancient texts and preparing the magical implements necessary for such a perilous journey. Your approach is methodical - understand the mystical forces at play before confronting them.

                        In the deepest archives, you discover the journal of Lyralei the Sea-Speaker, a mage who attempted this very quest thirty years ago. Her notes speak of "songs that can part the waters" and "words that the Atlanteans remember from before the great drowning."

                        Most crucially, you learn that the artifacts themselves are not just powerful - they are sentient, and they have been calling out across the psychic depths, slowly driving certain sensitive individuals to seek them out. You realize with growing unease that you may not have chosen this quest... it may have chosen you.
                        `
                    };
                    return texts[archetype] || texts.fighter;
                },
                getChoices: function(archetype) {
                    const choices = {
                        fighter: [
                            {
                                text: "Hire Captain Silva and her armored ship immediately",
                                consequence: "direct_approach",
                                skill_gain: { strength: 2, sailing: 1 },
                                response: "Silva grins fiercely. 'Now that's the kind of decisive action I respect! We sail at dawn.'"
                            },
                            {
                                text: "Recruit additional fighters before departing",
                                consequence: "warrior_crew",
                                skill_gain: { strength: 1, diplomacy: 1 },
                                response: "Word spreads quickly among the harbor's fighters. Soon you have a crew of battle-tested warriors."
                            },
                            {
                                text: "Seek magical protection from the local temple",
                                consequence: "blessed_weapons",
                                skill_gain: { strength: 1, magic: 1 },
                                response: "The temple priests are hesitant, but your sincere devotion convinces them to bless your weapons."
                            }
                        ],
                        thief: [
                            {
                                text: "Pay Siren's price and meet her mysterious contact",
                                consequence: "atlantean_contact",
                                skill_gain: { stealth: 2, diplomacy: 1 },
                                response: "Siren's contact turns out to be an exile from Atlantis itself - a sea person living in disguise!"
                            },
                            {
                                text: "Attempt to steal the information instead of paying",
                                consequence: "risky_theft",
                                skill_gain: { stealth: 3 },
                                response: "You successfully steal Siren's files, but you've made a dangerous enemy in the process."
                            },
                            {
                                text: "Offer to trade information instead of coin",
                                consequence: "information_trade",
                                skill_gain: { stealth: 1, diplomacy: 2 },
                                response: "Siren is intrigued by your counter-offer. Knowledge is often more valuable than gold in her line of work."
                            }
                        ],
                        magic_user: [
                            {
                                text: "Attempt to commune with the artifacts' psychic calls",
                                consequence: "psychic_communion",
                                skill_gain: { magic: 3 },
                                response: "The artifacts' voices flood your mind with visions of the sunken city and its guardians."
                            },
                            {
                                text: "Research the sea people's ancient language",
                                consequence: "linguistic_preparation",
                                skill_gain: { magic: 2, diplomacy: 1 },
                                response: "You discover that the Atlantean tongue is still spoken in the deepest parts of the ocean."
                            },
                            {
                                text: "Craft protective talismans for the journey",
                                consequence: "magical_protection",
                                skill_gain: { magic: 2, sailing: 1 },
                                response: "Your talismans hum with protective energy, warding against both drowning and madness."
                            }
                        ]
                    };
                    return choices[archetype] || choices.fighter;
                }
            },

            // Chapter 2: The Journey to Atlantis
            2: {
                title: "Descent to the Drowned City",
                background: "Cthulhu-Rising-2-865665388.png",
                getText: function(archetype, previousChoices) {
                    const lastChoice = previousChoices[previousChoices.length - 1];

                    const texts = {
                        fighter: {
                            direct_approach: `
                            The Iron Kraken cuts through the waves like a sword through silk. Captain Silva's confidence is infectious, and your crew of hardened sailors shares your determination. But as you approach the coordinates where the Meridian Star fell, the very ocean seems to change.

                            The water grows thick and dark, almost viscous. Strange phosphorescent lights dance beneath the surface, and more than once you spot massive shadows moving in the depths. Silva's expression grows grim.

                            "There," she points to where the water forms an impossible spiral, descending into darkness. "The entrance to the drowned realm. But look closely, warrior - we are not alone."

                            Surrounding your ship, barely visible beneath the waves, are figures with scales that gleam like pearl and eyes that glow with bioluminescent fire. The sea people have come to investigate these surface intruders.
                            `,
                            warrior_crew: `
                            Your expanded crew proves its worth as strange phenomena plague the journey. When ghostly voices begin singing from beneath the waves, your fighters maintain discipline. When tentacles the size of ship masts probe at the hull, your warriors drive them back with spear and sword.

                            But the sea people who finally rise to greet you seem almost... impressed. Their leader, a being whose lower body is that of a shark and whose upper torso bears the noble bearing of ancient royalty, speaks in accented but clear surface tongue.

                            "Surface warriors who do not flee at first sight of the deep folk. Interesting. You seek the cursed cargo, yes? Very well. But first, you must prove your worth in the ancient way - through trial of combat."
                            `,
                            blessed_weapons: `
                            The temple's blessing proves more potent than expected. As your ship sails into increasingly supernatural waters, your blessed weapons begin to glow with holy light. This creates an unexpected effect - the sea people seem to recognize the blessing as a sign of divine favor.

                            When they rise from the depths to challenge you, their leader - an ancient being with the bearing of a priest-king - speaks with surprising reverence.

                            "The old blessings still hold power, it seems. You carry the light of the surface gods into our dark realm. This has not been seen for many centuries. Perhaps... perhaps the time of prophecy draws near."
                            `
                        },
                        thief: {
                            atlantean_contact: `
                            Your Atlantean contact, who calls himself Nereon the Exile, proves invaluable as you approach the drowned city. His guidance helps you navigate the treacherous currents and avoid the patrol routes of the sea people's sentries.

                            "My people cast me out for loving a surface dweller," he explains as your small, swift vessel slips through underwater canyons. "But I know the old ways, the secret paths. The cargo you seek lies in the Palace of Echoes, but it is heavily guarded."

                            As you descend through the spiral gateway to Atlantis, Nereon's expression grows troubled. "Something is wrong. The city... it's more active than it should be. The Meridian Star's cargo isn't just sitting forgotten. Someone - or something - has been disturbing it."
                            `,
                            risky_theft: `
                            Your theft of Siren's information pays off, but the cost becomes clear as you sail toward Atlantis. Pirates flying Blackheart's flag pursue you, and worse - they seem to know exactly where you're heading.

                            The sea people who rise to meet you are immediately hostile, having been warned by Siren's network that surface thieves are approaching. Their leader, a fierce warrior-maiden with tentacles instead of hair, speaks with cold fury.

                            "The exile Nereon warned us of your coming, thief. You steal from our friends above, and now you come to steal from our sacred depths? The treasures of the Meridian Star are not for such as you. Turn back, or face the judgment of the deep."
                            `,
                            information_trade: `
                            Your information trade with Siren proves mutually beneficial. She provides detailed maps of the underwater approaches to Atlantis, while you share knowledge of the artifacts' true nature. This exchange reaches the ears of the sea people's intelligence network.

                            When you finally encounter the Atlantean patrol, their leader - a diplomatic figure who radiates authority - greets you with cautious respect.

                            "Word has reached us of your... unique approach to this quest, surface dweller. You trade in knowledge rather than violence. This shows wisdom. But knowledge of the Meridian Star's cargo is dangerous. We would speak with you before you proceed further."
                            `
                        },
                        magic_user: {
                            psychic_communion: `
                            Your psychic communion with the artifacts has unexpected consequences. As your magically-guided vessel approaches Atlantis, the very sea responds to your enhanced connection with the mystical realm.

                            Dolphins guide your path, bioluminescent fish form protective barriers around your ship, and the water itself seems to part before you. But most remarkably, the sea people who rise to meet you already know your name.

                            Their high priestess, an ethereal being whose voice carries the sound of wind and waves, addresses you directly: "Seeker of the Bound Artifacts, your mind-voice has echoed through our psychic depths for days. We know why you have come, and we know the terrible choice that awaits you. The artifacts call... but so does their true master."
                            `,
                            linguistic_preparation: `
                            Your mastery of the ancient Atlantean language creates an immediate bridge with the sea people. When their ambassadors rise from the depths, you greet them in their own tongue - words not heard from surface lips for centuries.

                            The effect is electric. The lead ambassador, tears streaming down her scaled cheeks, responds in the musical cadences of old Atlantean: "By the depths and the heights... the surface remembers! You speak the words of our ancestors, the tongue of the time before the great drowning."

                            Your linguistic skills have opened a door that violence never could. But with it comes responsibility, for you now understand the full weight of what the sea people guard.
                            `,
                            magical_protection: `
                            Your protective talismans prove their worth as you descend toward Atlantis. The crushing pressure of the deep waters is held at bay, the madness-inducing songs of deep-sea sirens cannot penetrate your mental defenses, and most importantly, your magical protections allow you to survive in the sea people's realm.

                            When the Atlantean mages rise to test your worthiness, they sense the sophistication of your magical preparations. Their arch-mage, a being of immense power whose form shifts between human and aquatic, speaks with professional respect.

                            "Impressive ward-work, surface mage. You come prepared for the trials of the deep. But tell me - are your protections strong enough to withstand not just our realm's dangers, but the temptation of the artifacts themselves?"
                            `
                        }
                    };

                    return texts[archetype]?.[lastChoice] || "Your journey to Atlantis unfolds with unexpected challenges...";
                },
                getChoices: function(archetype, previousChoices) {
                    const lastChoice = previousChoices[previousChoices.length - 1];

                    const choiceMap = {
                        fighter: {
                            direct_approach: [
                                {
                                    text: "Challenge the sea people to honorable combat",
                                    consequence: "honor_duel",
                                    reputation_change: { sea_people: 2 },
                                    response: "The sea people respect your direct approach. 'Spoken like a true warrior of the depths!'"
                                },
                                {
                                    text: "Attempt to negotiate safe passage",
                                    consequence: "diplomatic_fighter",
                                    reputation_change: { sea_people: 1 },
                                    response: "Your willingness to talk before fighting surprises them. 'Wisdom and strength... interesting.'"
                                },
                                {
                                    text: "Demand they stand aside or face your wrath",
                                    consequence: "aggressive_approach",
                                    reputation_change: { sea_people: -2 },
                                    response: "The sea people's eyes flash with anger. 'Arrogant surface dweller! You know nothing of the deep!'"
                                }
                            ],
                            warrior_crew: [
                                {
                                    text: "Accept the trial of combat with enthusiasm",
                                    consequence: "trial_accepted",
                                    reputation_change: { sea_people: 3 },
                                    response: "Your crew's courage inspires even the sea people. 'Such bravery deserves respect!'"
                                },
                                {
                                    text: "Ask what the trial involves before accepting",
                                    consequence: "cautious_warrior",
                                    reputation_change: { sea_people: 1 },
                                    response: "The sea king nods approvingly. 'Prudence in battle is the mark of a true veteran.'"
                                },
                                {
                                    text: "Suggest a different form of trial",
                                    consequence: "alternative_trial",
                                    reputation_change: { sea_people: 0 },
                                    response: "The sea people consider your suggestion. 'Creative... but tradition is tradition.'"
                                }
                            ],
                            blessed_weapons: [
                                {
                                    text: "Share the blessing's origin and meaning",
                                    consequence: "religious_connection",
                                    reputation_change: { sea_people: 2, atlantis: 1 },
                                    response: "The priest-king's eyes widen. 'The old covenants between surface and sea... perhaps they yet hold.'"
                                },
                                {
                                    text: "Ask about the prophecy they mentioned",
                                    consequence: "prophecy_inquiry",
                                    reputation_change: { sea_people: 1 },
                                    response: "'The prophecy speaks of a surface champion who brings light to the darkness below...'"
                                },
                                {
                                    text: "Offer to fulfill whatever prophecy they speak of",
                                    consequence: "prophecy_acceptance",
                                    reputation_change: { sea_people: 3, atlantis: 2 },
                                    response: "The priest-king bows deeply. 'Then let the ancient words be fulfilled!'"
                                }
                            ]
                        },
                        thief: {
                            atlantean_contact: [
                                {
                                    text: "Ask Nereon what's been disturbing the cargo",
                                    consequence: "investigation_mode",
                                    reputation_change: { atlantis: 1 },
                                    response: "Nereon's face darkens. 'Cultists. Humans who serve the sleeping god. They seek to wake what should remain sleeping.'"
                                },
                                {
                                    text: "Suggest sneaking past whatever guards await",
                                    consequence: "stealth_approach",
                                    reputation_change: { sea_people: 0 },
                                    response: "Nereon smiles grimly. 'Spoken like a true shadow-walker. But the guards are not just physical...'"
                                },
                                {
                                    text: "Propose working with the sea people instead of against them",
                                    consequence: "alliance_proposal",
                                    reputation_change: { sea_people: 2, atlantis: 2 },
                                    response: "Nereon looks surprised. 'You would trust my people? Even after what they did to me?'"
                                }
                            ],
                            risky_theft: [
                                {
                                    text: "Attempt to explain your mission's importance",
                                    consequence: "desperate_diplomacy",
                                    reputation_change: { sea_people: 0 },
                                    response: "The warrior-maiden listens, but trust does not come easily to the betrayed."
                                },
                                {
                                    text: "Offer to return what you stole from Siren",
                                    consequence: "restitution_offer",
                                    reputation_change: { sea_people: 1 },
                                    response: "'Interesting. You would undo your theft? Perhaps there is honor in you yet.'"
                                },
                                {
                                    text: "Challenge their right to guard surface treasures",
                                    consequence: "defiant_thief",
                                    reputation_change: { sea_people: -3 },
                                    response: "The warrior-maiden's tentacles writhe with fury. 'Surface arrogance! You understand nothing!'"
                                }
                            ],
                            information_trade: [
                                {
                                    text: "Share everything you know about the artifacts' danger",
                                    consequence: "full_disclosure",
                                    reputation_change: { sea_people: 2, atlantis: 1 },
                                    response: "The diplomat nods gravely. 'Your honesty serves you well. Knowledge shared is wisdom doubled.'"
                                },
                                {
                                    text: "Ask what they know about Cthulhu's involvement",
                                    consequence: "cthulhu_inquiry",
                                    reputation_change: { sea_people: 1, cthulhu_cult: -1 },
                                    response: "'The Sleeper stirs because of these artifacts. This is why we guard them so carefully.'"
                                },
                                {
                                    text: "Propose a formal alliance between surface and sea",
                                    consequence: "grand_alliance",
                                    reputation_change: { sea_people: 3, atlantis: 3 },
                                    response: "The diplomat's eyes shine with hope. 'Such an alliance has not existed for a thousand years...'"
                                }
                            ]
                        },
                        magic_user: {
                            psychic_communion: [
                                {
                                    text: "Ask the priestess about the 'terrible choice' she mentioned",
                                    consequence: "choice_revelation",
                                    reputation_change: { atlantis: 2 },
                                    response: "'The artifacts offer power, but they are also chains. Free them, and you may free their master as well.'"
                                },
                                {
                                    text: "Offer to share your psychic visions with them",
                                    consequence: "vision_sharing",
                                    reputation_change: { sea_people: 2, atlantis: 2 },
                                    response: "The priestess nods. 'Yes... let our minds touch, and let the truth be revealed to all.'"
                                },
                                {
                                    text: "Ask how to safely handle the artifacts",
                                    consequence: "safety_inquiry",
                                    reputation_change: { atlantis: 1 },
                                    response: "'Safely? There is no safety with such relics. Only the choice between terrible risks.'"
                                }
                            ],
                            linguistic_preparation: [
                                {
                                    text: "Recite the ancient songs of Atlantis that you learned",
                                    consequence: "song_recital",
                                    reputation_change: { sea_people: 3, atlantis: 3 },
                                    response: "Tears flow freely as you sing words of their lost golden age. 'Our hearts remember...'"
                                },
                                {
                                    text: "Ask them to teach you more of their language",
                                    consequence: "language_mastery",
                                    reputation_change: { sea_people: 2, atlantis: 2 },
                                    response: "'To learn our tongue is to understand our souls. We will teach you gladly.'"
                                },
                                {
                                    text: "Inquire about the history of the great drowning",
                                    consequence: "history_lesson",
                                    reputation_change: { atlantis: 2 },
                                    response: "'The drowning was not a punishment, but a choice. We chose the depths over surface corruption.'"
                                }
                            ],
                            magical_protection: [
                                {
                                    text: "Demonstrate your magical abilities",
                                    consequence: "magic_demonstration",
                                    reputation_change: { sea_people: 2, atlantis: 1 },
                                    response: "The arch-mage watches intently as you weave spells of light and protection."
                                },
                                {
                                    text: "Ask about the magical nature of the artifacts",
                                    consequence: "artifact_study",
                                    reputation_change: { atlantis: 2 },
                                    response: "'They are not mere objects, but fragments of a god's power. Handle them wrongly, and they handle you.'"
                                },
                                {
                                    text: "Offer to help strengthen their magical defenses",
                                    consequence: "defensive_alliance",
                                    reputation_change: { sea_people: 3, atlantis: 2 },
                                    response: "'Surface magic combined with our deep arts? Intriguing... and potentially powerful.'"
                                }
                            ]
                        }
                    };

                    return choiceMap[archetype]?.[lastChoice] || [
                        {
                            text: "Continue toward the sunken city",
                            consequence: "advance_story",
                            response: "Your journey into the depths continues..."
                        }
                    ];
                }
            },

            // Chapter 3: The Sunken City of Atlantis
            3: {
                title: "The Palace of Echoes",
                background: "arabiancity1.jpg", // Underwater version
                getText: function(archetype, previousChoices, reputation) {
                    // Complex text generation based on player's reputation and choices
                    const atlantisRep = reputation.atlantis || 0;
                    const seaPeopleRep = reputation.sea_people || 0;

                    if (atlantisRep >= 3 && seaPeopleRep >= 3) {
                        return `
                        The sea people escort you through Atlantis with full honors. Bioluminescent coral spires stretch toward the surface far above, and schools of gem-bright fish form living rainbows in the aquamarine light.

                        You are brought before the ruling council of Atlantis - beings of such ancient majesty that their presence alone speaks of civilizations that rose and fell before humanity learned to write. The High Sovereign, whose crown is forged from living starfish and whose robes flow like liquid moonlight, addresses you directly.

                        "Surface dweller who speaks with the voice of the ancient pacts, we have watched your approach with great interest. The cargo of the Meridian Star lies within our most sacred vault - the Palace of Echoes, where the voices of our ancestors guide us still."

                        "But you must understand - we do not guard these artifacts from greed or possessiveness. We guard them because their true owner stirs in the deepest trenches, and his awakening would mean the end of all things, surface and depth alike."

                        The chamber falls silent as the implications sink in. The artifacts aren't just powerful - they're bait in a trap that could doom both worlds.
                        `;
                    } else if (atlantisRep <= -2 || seaPeopleRep <= -2) {
                        return `
                        Your hostile approach has consequences. Instead of being welcomed to Atlantis, you find yourself imprisoned in a coral cell, surrounded by guards whose spears crackle with bioelectric energy.

                        Through the translucent walls, you can see the majesty of the sunken city - and realize how foolish your aggressive stance has been. Atlantis is not some primitive underwater village, but a civilization that has thrived for millennia, its technology and magic far beyond surface understanding.

                        The warden, a stern figure whose lower body is that of an octopus, speaks with cold authority: "You came to our realm with threats and demands. Yet our mercy runs deep. Prove you have learned wisdom, and perhaps you may yet see the treasures you seek - from a distance."

                        A chance for redemption remains, but your options have been severely limited by your earlier choices.
                        `;
                    } else {
                        return `
                        Your cautious approach has earned you cautious acceptance. The sea people guide you through the outer districts of Atlantis, where the architecture defies surface understanding - buildings that grow like coral, streets that flow like currents, and gardens where kelp and anemone dance in carefully cultivated harmony.

                        You are brought before a council of Atlantean nobles, their forms a mixture of human grace and aquatic adaptation. Their spokesperson, an elegant being whose flowing fins and pearl-adorned clothing mark her as high nobility, addresses you with formal courtesy.

                        "Surface visitor, your quest for the Meridian Star's cargo is known to us. We neither welcome nor forbid your approach - but we would have you understand the nature of what you seek. These are not mere treasures, but chains that bind something far more terrible than treasure hunters."

                        The choice of how to proceed remains yours, but you sense that your next decisions will determine not just your success, but your very survival.
                        `;
                    }
                },
                getChoices: function(archetype, reputation) {
                    const atlantisRep = reputation.atlantis || 0;
                    const seaPeopleRep = reputation.sea_people || 0;

                    if (atlantisRep >= 3 && seaPeopleRep >= 3) {
                        // High reputation path
                        return {
                            fighter: [
                                {
                                    text: "Offer to become Atlantis's champion against Cthulhu",
                                    consequence: "champion_path",
                                    leads_to_ending: "hero_champion",
                                    response: "The High Sovereign's eyes blaze with hope. 'A surface champion for the deep realm... let the prophecies be fulfilled!'"
                                },
                                {
                                    text: "Propose a military alliance between surface and sea",
                                    consequence: "military_alliance",
                                    leads_to_ending: "united_fronts",
                                    response: "The council erupts in excited discussion. 'Unity against the darkness... it could work!'"
                                },
                                {
                                    text: "Ask to be trained in Atlantean combat arts",
                                    consequence: "atlantean_training",
                                    leads_to_ending: "hybrid_warrior",
                                    response: "The weapon masters step forward. 'To fight Cthulhu, you must learn to battle in three dimensions.'"
                                }
                            ],
                            thief: [
                                {
                                    text: "Offer to steal the artifacts before Cthulhu can claim them",
                                    consequence: "preemptive_theft",
                                    leads_to_ending: "master_thief",
                                    response: "The council considers this. 'Dangerous... but perhaps the only way to keep them from his grasp.'"
                                },
                                {
                                    text: "Suggest infiltrating Cthulhu's cult to learn their plans",
                                    consequence: "cult_infiltration",
                                    leads_to_ending: "double_agent",
                                    response: "'Risky beyond measure, but the intelligence would be invaluable. Do you truly dare?'"
                                },
                                {
                                    text: "Propose creating decoy artifacts to fool Cthulhu",
                                    consequence: "deception_plan",
                                    leads_to_ending: "master_deceiver",
                                    response: "The High Sovereign smiles grimly. 'Cunning... but can any deception fool a god?'"
                                }
                            ],
                            magic_user: [
                                {
                                    text: "Offer to help create a binding spell to re-imprison Cthulhu",
                                    consequence: "binding_ritual",
                                    leads_to_ending: "arch_mage",
                                    response: "The court mages lean forward eagerly. 'Combined magic of surface and depth... it might be possible!'"
                                },
                                {
                                    text: "Ask to study the artifacts to understand their true nature",
                                    consequence: "artifact_research",
                                    leads_to_ending: "scholar_sage",
                                    response: "'Dangerous knowledge, but perhaps necessary. The artifacts' secrets must be understood.'"
                                },
                                {
                                    text: "Propose using the artifacts' power against Cthulhu himself",
                                    consequence: "power_gambit",
                                    leads_to_ending: "god_slayer",
                                    response: "Silence falls. 'To wield a god's power against him... madness, brilliance, or both?'"
                                }
                            ]
                        }[archetype];
                    } else if (atlantisRep <= -2 || seaPeopleRep <= -2) {
                        // Low reputation - redemption path
                        return [
                            {
                                text: "Humbly apologize and ask for a chance to prove yourself",
                                consequence: "redemption_plea",
                                response: "The warden's expression softens slightly. 'Humility... a start toward wisdom.'"
                            },
                            {
                                text: "Offer valuable information about surface threats",
                                consequence: "information_bargain",
                                response: "'Surface knowledge for underwater mercy? Speak, and we shall listen.'"
                            },
                            {
                                text: "Attempt to escape and reach the artifacts by force",
                                consequence: "prison_break",
                                response: "Alarms sound throughout the city. Your path has become one of violence and desperation."
                            }
                        ];
                    } else {
                        // Neutral reputation - standard path
                        return {
                            fighter: [
                                {
                                    text: "Ask to prove your worth through trials of strength",
                                    consequence: "strength_trials",
                                    response: "The nobles exchange glances. 'Trials can be arranged... but are you prepared for their cost?'"
                                },
                                {
                                    text: "Offer to guard the artifacts from other treasure seekers",
                                    consequence: "guardian_offer",
                                    response: "'Interesting. You would protect rather than plunder? This shows unexpected wisdom.'"
                                },
                                {
                                    text: "Demand access as is your right as a surface dweller",
                                    consequence: "demand_access",
                                    response: "The temperature of the water seems to drop. 'Rights? In the deep, strength and wisdom earn access, not birthplace.'"
                                }
                            ],
                            thief: [
                                {
                                    text: "Propose a trade - your skills for their knowledge",
                                    consequence: "skill_trade",
                                    response: "'Your surface skills for our deep wisdom? The terms require consideration.'"
                                },
                                {
                                    text: "Ask about alternative routes to the Palace of Echoes",
                                    consequence: "alternate_routes",
                                    response: "'Clever. Yes, there are... other ways. But each carries its own perils.'"
                                },
                                {
                                    text: "Suggest you could steal the artifacts from Cthulhu's cultists instead",
                                    consequence: "cultist_target",
                                    response: "'You would face the mad servants of the sleeping god? Bold... or foolish.'"
                                }
                            ],
                            magic_user: [
                                {
                                    text: "Offer to share surface magical knowledge",
                                    consequence: "knowledge_exchange",
                                    response: "'Surface magic has evolved in interesting directions. We could learn from each other.'"
                                },
                                {
                                    text: "Ask to examine the magical defenses around the artifacts",
                                    consequence: "defense_study",
                                    response: "'The defenses are ancient and powerful. But perhaps fresh eyes might see what we cannot.'"
                                },
                                {
                                    text: "Request training in underwater spellcasting",
                                    consequence: "aquatic_magic",
                                    response: "'Water magic is the foundation of all deep arts. But can surface lungs handle our methods?'"
                                }
                            ]
                        }[archetype];
                    }
                }
            }
        };

        this.endings = {
            // Fighter Endings
            hero_champion: {
                title: "Champion of Two Realms",
                background: "cthulu-final-fight.png",
                text: `
                Armed with the blessing of both surface and sea, you stand as the first Champion of Two Realms in over a thousand years. The artifacts of the Meridian Star are not destroyed, but transformed - their binding power redirected to create an eternal seal over Cthulhu's prison.

                When the Great Old One finally rises from R'lyeh, he finds not a world divided between surface and depth, but a united front of unprecedented power. Your battle spans dimensions, from the deepest ocean trenches to the highest clouds, as mortal determination faces cosmic horror.

                In the end, it is not your strength alone that triumphs, but the unity you forged between two peoples who had forgotten they were once one. Cthulhu is not destroyed - such beings cannot be killed - but he is bound so thoroughly that his next awakening will not come for ten thousand years.

                You become a legend in both realms, and the alliance you forged ensures that when the Old One stirs again, the world will be ready.
                `,
                rewards: ["champion_title", "unity_seal", "cthulhu_victory_background"],
                archetype_bonus: "Your strength united two worlds against an impossible foe."
            },

            united_fronts: {
                title: "The United Fronts",
                background: "Cthulhu-Rising-2-865665388.png",
                text: `
                Your military alliance proves crucial when Cthulhu's awakening triggers a war across multiple dimensions. Surface navies and Atlantean war-schools fight side by side, while human marines learn to battle alongside shark-riders and dolphin cavalry.

                The artifacts become weapons of war - not to attack Cthulhu directly, but to create barriers and sanctuaries where the innocent can shelter from his influence. Your strategic mind proves invaluable in coordinating forces that had never worked together.

                The war is long and costly, but the alliance holds. When Cthulhu finally retreats to lick his wounds in dimensions beyond mortal understanding, the victory belongs to all who fought. The surface world learns that the ocean peoples are allies, not myths, and a new age of cooperation begins.

                You are remembered as the Warmaster who brought two worlds together in their darkest hour.
                `,
                rewards: ["warmaster_title", "alliance_medal", "combined_fleet_background"],
                archetype_bonus: "Your tactical genius proved that unity is the greatest weapon."
            },

            hybrid_warrior: {
                title: "The Depth Walker",
                background: "arabiancity1.jpg",
                text: `
                Trained in the ancient combat arts of Atlantis, you become something unprecedented - a surface dweller who can fight in the deepest parts of the ocean. Your enhanced abilities allow you to battle Cthulhu's manifestations in places no purely surface or purely aquatic warrior could reach.

                When the final confrontation comes, you pursue Cthulhu through the dimensional spaces between air and water, surface and depth. Your hybrid training allows you to exist in these impossible places, wielding both surface technology and Atlantean bio-magic.

                The battle ends not with Cthulhu's destruction, but with his banishment to a dimension where neither air nor water exist - a place he cannot corrupt or use as a foothold for return. Your transformation serves as inspiration for a new generation of warriors trained in both realms.

                You become the first of the Depth Walkers, an order dedicated to guarding the spaces between worlds.
                `,
                rewards: ["depth_walker_title", "hybrid_abilities", "dimensional_guardian_background"],
                archetype_bonus: "Your adaptability allowed you to fight where others could not survive."
            },

            // Thief Endings
            master_thief: {
                title: "The Impossible Heist",
                background: "cthulu-final-fight.png",
                text: `
                In the greatest theft in history, you steal the artifacts not from their guardians, but from Cthulhu himself. Using a combination of Atlantean stealth techniques and surface cunning, you infiltrate R'lyeh while the Old One sleeps and make off with the very chains meant to bind his power.

                The theft is so audacious, so perfectly executed, that even Cthulhu himself feels something akin to respect for your skill. Rather than pursuing immediate revenge, he offers you a position as his chief agent in the mortal realm - an offer you decline with style.

                Your theft doesn't prevent Cthulhu's awakening, but it robs him of the tools he needed to make it permanent. Weakened and frustrated, he retreats to plot anew, while you become the most famous thief in any realm - the one who stole from a god and lived to brag about it.

                The artifacts are hidden so well that even you forget where you put them, ensuring they can never be used by anyone again.
                `,
                rewards: ["master_thief_title", "divine_lockpicks", "impossible_heist_background"],
                archetype_bonus: "Your skill transcended mortal limitations to achieve the impossible."
            },

            double_agent: {
                title: "The Cult Infiltrator",
                background: "Cthulhu-Rising-2-865665388.png",
                text: `
                Your infiltration of Cthulhu's cult provides invaluable intelligence that allows both surface and sea forces to prepare for his awakening. Playing the role of a devoted cultist while secretly feeding information to the resistance, you walk a razor's edge between discovery and success.

                When Cthulhu finally rises, your inside knowledge allows the allied forces to predict his movements and counter his strategies. The Old One's confusion at his followers' apparent incompetence provides crucial advantages in the early stages of the conflict.

                Your mastery of deception reaches legendary levels as you convince Cthulhu's most fanatical servants to sabotage their own rituals. By the time your true allegiance is discovered, the damage to the cult's effectiveness is irreversible.

                Though Cthulhu eventually escapes, his cult is shattered beyond repair, and his plans are set back by centuries. You become the template for future deep-cover agents in the eternal war against cosmic horror.
                `,
                rewards: ["infiltrator_title", "cult_secrets", "double_agent_background"],
                archetype_bonus: "Your deception skills saved two worlds through cunning over strength."
            },

            master_deceiver: {
                title: "The Great Deception",
                background: "arabiancity1.jpg",
                text: `
                Your plan to create decoy artifacts succeeds beyond all expectations. The false relics are so cunningly crafted that they fool even Cthulhu's ancient senses. When he finally grasps what he believes to be the tools of his liberation, he instead finds elaborate fakes that drain his power rather than enhance it.

                The deception buys precious time for the real artifacts to be properly hidden and warded. Cthulhu's rage at being tricked is terrible to behold, but his weakened state prevents him from acting on it immediately.

                Your reputation as a deceiver grows to mythical proportions - the mortal who tricked a god with craft and cunning. The techniques you develop are studied by both surface and Atlantean scholars, leading to new forms of protective illusion.

                Though Cthulhu eventually discovers the deception, the delay gives the world enough time to prepare defenses that make his next awakening far less catastrophic.
                `,
                rewards: ["deceiver_title", "illusion_mastery", "great_deception_background"],
                archetype_bonus: "Your cunning turned the Old One's power against himself."
            },

            // Magic User Endings
            arch_mage: {
                title: "The Binding of the Old One",
                background: "cthulu-final-fight.png",
                text: `
                Your combined magical research with the Atlantean mages produces the most powerful binding spell ever conceived. Drawing on traditions from both surface and depth, you weave a prison of pure will and elemental force around Cthulhu's essence.

                The binding requires the ultimate sacrifice - you and your Atlantean colleagues must merge your life forces with the spell itself, becoming eternal guardians who exist as pure magical energy. It is not death, but transformation into something beyond mortal understanding.

                Cthulhu finds himself trapped not just by magical force, but by the combined determination of mages who chose to become the prison walls themselves. His attempts to break free only strengthen the bonds, as your sacrifice continuously renews the spell's power.

                From your transformed state, you watch over both realms, becoming a bridge between surface and sea magic that enables unprecedented cooperation between the two worlds.
                `,
                rewards: ["arch_mage_title", "eternal_guardian", "binding_mastery_background"],
                archetype_bonus: "Your magical sacrifice protected reality itself from cosmic horror."
            },

            scholar_sage: {
                title: "The Keeper of Forbidden Knowledge",
                background: "Cthulhu-Rising-2-865665388.png",
                text: `
                Your research into the artifacts' true nature reveals a shocking truth - they are not chains to bind Cthulhu, but fragments of an even greater entity that once challenged the Old Ones and lost. By studying them properly, you learn to awaken this ancient rival.

                The awakening of the Elder Guardian creates a conflict on a cosmic scale, as two incomprehensible forces battle across dimensions. Humanity and Atlantis become spectators to a war between gods, but your knowledge allows both civilizations to survive in the spaces between titanic blows.

                The battle has no true winner, but both entities exhaust themselves enough to retreat to dormancy for eons. Your careful documentation of the events becomes the foundation for a new understanding of cosmic forces and humanity's place among them.

                You become the first Scholar of the Deep Mysteries, founding an order dedicated to protecting reality through knowledge rather than force.
                `,
                rewards: ["scholar_sage_title", "forbidden_knowledge", "cosmic_conflict_background"],
                archetype_bonus: "Your wisdom revealed truths that changed the fundamental nature of reality."
            },

            god_slayer: {
                title: "The Impossible Victory",
                background: "cthulu-final-fight.png",
                text: `
                In the most audacious gambit in magical history, you use the artifacts' own power to challenge Cthulhu directly. The plan should be suicide - no mortal can wield the power of the Old Ones without being destroyed. But your magical preparations and the combined support of both surface and Atlantean mages create a brief window where the impossible becomes merely improbable.

                The battle transcends physical reality as you and Cthulhu clash on levels of existence that have no names. Your mortal perspective becomes an unexpected advantage - where Cthulhu sees in cosmic scales, you see individual details he overlooks.

                The victory comes not from overpowering the Old One, but from understanding him. Your magical assault doesn't destroy Cthulhu, but forces him to experience mortal consciousness - empathy, doubt, the value of individual life. The shock of these alien emotions sends him fleeing to the furthest reaches of space to recover.

                You survive the encounter forever changed, becoming something between mortal and cosmic entity - a bridge between the human scale and the infinite.
                `,
                rewards: ["god_slayer_title", "cosmic_consciousness", "transcendent_victory_background"],
                archetype_bonus: "Your magical daring achieved the impossible - making a god feel mortal emotions."
            }
        };

        this.init();
    }

    init() {
        this.loadProgress();
        this.setupEventListeners();
        this.checkStoryUnlock();
    }

    loadProgress() {
        const saved = localStorage.getItem('atlantisStoryProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.currentChapter = progress.chapter || 0;
            this.playerArchetype = progress.archetype || null;
            this.storyChoices = progress.choices || [];
            this.reputation = progress.reputation || { atlantis: 0, sea_people: 0, cthulhu_cult: 0 };
            this.inventory = progress.inventory || [];
            this.skills = progress.skills || { strength: 0, stealth: 0, magic: 0, diplomacy: 0, sailing: 0 };
            this.companions = progress.companions || [];
            this.storyUnlocked = progress.unlocked || false;
        }
    }

    saveProgress() {
        const progress = {
            chapter: this.currentChapter,
            archetype: this.playerArchetype,
            choices: this.storyChoices,
            reputation: this.reputation,
            inventory: this.inventory,
            skills: this.skills,
            companions: this.companions,
            unlocked: this.storyUnlocked
        };
        localStorage.setItem('atlantisStoryProgress', JSON.stringify(progress));
    }

    checkStoryUnlock() {
        if (this.storyUnlocked) return;

        // Check if user has met Erasmus or Aziza and has sufficient cosmic awareness
        const characters = window.legendaryCharacters?.getEncounteredCharacters() || [];
        const crypticSystem = window.crypticStorytellerSystem?.getCosmicStatus() || {};
        const userJourney = window.userJourneySystem?.getUserData() || {};

        const hasMetNarrator = characters.some(char =>
            char.id === 'erasmus' || char.id === 'aziza_enhanced'
        );
        const sufficientAwareness = crypticSystem.awareness >= 8;
        const sufficientTime = userJourney.totalTimeSpent >= 3600; // 1 hour

        if (hasMetNarrator && sufficientAwareness && sufficientTime) {
            this.unlockStory();
        }
    }

    unlockStory() {
        this.storyUnlocked = true;
        this.saveProgress();
        this.showStoryUnlock();
    }

    showStoryUnlock() {
        const unlockNotification = document.createElement('div');
        unlockNotification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(0, 100, 100, 0.95), rgba(0, 50, 100, 0.9));
            color: #ffffff;
            padding: 40px;
            border-radius: 20px;
            border: 3px solid #00ffff;
            z-index: 16000;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
            animation: oceanPulse 2s ease-in-out infinite;
        `;

        unlockNotification.innerHTML = `
            <div style="font-size: 36px; margin-bottom: 20px;">🌊⚓🌊</div>
            <h2 style="color: #00ffff; margin-bottom: 20px;">Epic Sea Adventure Unlocked!</h2>
            <p style="margin-bottom: 20px; line-height: 1.6;">
                Your cosmic awareness has reached the depths where ancient tales stir...
                A legendary quest awaits in the sunken ruins of Atlantis.
            </p>
            <p style="margin-bottom: 30px; font-style: italic; color: #88ffff;">
                Seek out Erasmus or Aziza to hear the tale of the Meridian Star
                and choose your path through the greatest adventure of all...
            </p>
            <button onclick="this.parentElement.remove()"
                    style="padding: 15px 30px; background: linear-gradient(135deg, #006666, #00aaaa);
                           border: 2px solid #00ffff; border-radius: 10px; color: #ffffff;
                           cursor: pointer; font-size: 16px;">
                Embrace Destiny
            </button>
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes oceanPulse {
                0%, 100% {
                    box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
                    transform: translate(-50%, -50%) scale(1);
                }
                50% {
                    box-shadow: 0 0 80px rgba(0, 255, 255, 0.8);
                    transform: translate(-50%, -50%) scale(1.02);
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(unlockNotification);
    }

    beginStory(narratorId) {
        if (!this.storyUnlocked) return false;

        this.currentChapter = 0;
        this.showChapter(0, narratorId);
        return true;
    }

    showChapter(chapterNum, narratorId = null) {
        const chapter = this.storyChapters[chapterNum];
        if (!chapter) return;

        // Create story interface
        const storyModal = document.createElement('div');
        storyModal.id = 'atlantis-story-modal';
        storyModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(0, 50, 100, 0.95), rgba(0, 100, 150, 0.9));
            z-index: 18000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.8s ease;
        `;

        const storyContent = document.createElement('div');
        storyContent.style.cssText = `
            background: linear-gradient(135deg, #001133, #002255);
            border: 4px solid #00aaaa;
            border-radius: 20px;
            padding: 40px;
            max-width: 900px;
            max-height: 85vh;
            overflow-y: auto;
            color: #ffffff;
            box-shadow: 0 0 100px rgba(0, 170, 170, 0.6);
        `;

        // Create chapter content based on type
        if (chapterNum === 0) {
            this.createInitialChapter(storyContent, chapter, narratorId);
        } else {
            this.createProgressChapter(storyContent, chapter, chapterNum);
        }

        storyModal.appendChild(storyContent);
        document.body.appendChild(storyModal);

        // Fade in
        setTimeout(() => {
            storyModal.style.opacity = '1';
        }, 100);
    }

    createInitialChapter(container, chapter, narratorId) {
        // Narrator introduction
        const narratorInfo = document.createElement('div');
        narratorInfo.style.cssText = `
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #00aaaa;
        `;

        const narratorImage = narratorId === 'erasmus' ?
            'pixel-art-wizard-with-staff-long-beard_885831-37581-3933412362.jpg' :
            'aziza.png';
        const narratorName = narratorId === 'erasmus' ? 'Erasmus the Wizard' : 'Aziza the Djinn';

        narratorInfo.innerHTML = `
            <div style="width: 80px; height: 80px; background-image: url('${narratorImage}');
                        background-size: cover; background-position: center; border-radius: 50%;
                        border: 3px solid #00ffff; margin-right: 20px;"></div>
            <div>
                <h2 style="margin: 0; color: #00ffff;">${narratorName}</h2>
                <p style="margin: 5px 0 0 0; color: #88ddff; font-style: italic;">
                    ${chapter.title}
                </p>
            </div>
        `;

        // Story text
        const storyText = document.createElement('div');
        storyText.innerHTML = chapter.text.split('\n').map(line =>
            line.trim() ? `<p style="margin-bottom: 15px; line-height: 1.6;">${line.trim()}</p>` : ''
        ).join('');
        storyText.style.marginBottom = '30px';

        // Choices
        const choicesContainer = document.createElement('div');
        choicesContainer.style.cssText = 'display: flex; flex-direction: column; gap: 15px;';

        chapter.choices.forEach((choice, index) => {
            const choiceButton = document.createElement('button');
            choiceButton.textContent = choice.text;
            choiceButton.style.cssText = `
                padding: 20px;
                background: linear-gradient(135deg, #003366, #004488);
                border: 2px solid #00aaaa;
                border-radius: 10px;
                color: #ffffff;
                cursor: pointer;
                font-size: 16px;
                text-align: left;
                transition: all 0.3s ease;
            `;

            choiceButton.addEventListener('click', () => {
                this.makeStoryChoice(choice, narratorId);
            });

            choiceButton.addEventListener('mouseenter', () => {
                choiceButton.style.background = 'linear-gradient(135deg, #004488, #0066aa)';
                choiceButton.style.transform = 'translateX(10px)';
            });

            choiceButton.addEventListener('mouseleave', () => {
                choiceButton.style.background = 'linear-gradient(135deg, #003366, #004488)';
                choiceButton.style.transform = 'translateX(0)';
            });

            choicesContainer.appendChild(choiceButton);
        });

        container.appendChild(narratorInfo);
        container.appendChild(storyText);
        container.appendChild(choicesContainer);
    }

    makeStoryChoice(choice, narratorId) {
        // Record choice
        this.storyChoices.push({
            chapter: this.currentChapter,
            choice: choice.archetype || choice.text,
            timestamp: Date.now()
        });

        // Set archetype if this is the initial choice
        if (choice.archetype && choice.archetype !== 'none') {
            this.playerArchetype = choice.archetype;
        }

        // Show response
        this.showChoiceResponse(choice, narratorId);

        // Save progress
        this.saveProgress();

        // Continue story or end based on choice
        if (choice.archetype === 'none') {
            // Player declined the quest
            document.getElementById('atlantis-story-modal')?.remove();
        } else if (choice.archetype) {
            // Move to next chapter
            setTimeout(() => {
                this.currentChapter = 1;
                this.saveProgress();
                document.getElementById('atlantis-story-modal')?.remove();
                this.showChapter(1);
            }, 4000);
        }
    }

    showChoiceResponse(choice, narratorId) {
        const responseDiv = document.createElement('div');
        responseDiv.style.cssText = `
            background: rgba(0, 170, 170, 0.2);
            border: 2px solid #00ffff;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            animation: responseGlow 0.8s ease-out;
        `;

        const narratorName = narratorId === 'erasmus' ? 'Erasmus' : 'Aziza';
        responseDiv.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #00ffff;">${narratorName} responds:</h4>
            <p style="margin: 0; font-style: italic; color: #ddffff;">"${choice.response}"</p>
        `;

        const modal = document.getElementById('atlantis-story-modal');
        if (modal) {
            modal.querySelector('div').appendChild(responseDiv);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes responseGlow {
                0% {
                    opacity: 0;
                    box-shadow: 0 0 0 rgba(0, 255, 255, 0.5);
                }
                50% {
                    opacity: 1;
                    box-shadow: 0 0 30px rgba(0, 255, 255, 0.8);
                }
                100% {
                    opacity: 1;
                    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Additional methods for handling the complex branching narrative...

    setupEventListeners() {
        // Hook into character system
        document.addEventListener('character_dialogue', (e) => {
            if ((e.detail.characterId === 'erasmus' || e.detail.characterId === 'aziza_enhanced')
                && this.storyUnlocked && !this.currentChapter) {
                // Add option to start the sea adventure
                setTimeout(() => {
                    this.addAdventureOption(e.detail.characterId);
                }, 1000);
            }
        });
    }

    addAdventureOption(characterId) {
        const adventureButton = document.createElement('button');
        adventureButton.textContent = '🌊 "Tell me of the lost treasure of the Meridian Star..."';
        adventureButton.style.cssText = `
            display: block;
            width: 100%;
            margin: 15px 0;
            padding: 15px;
            background: linear-gradient(135deg, #003366, #0066aa);
            border: 2px solid #00aaaa;
            border-radius: 8px;
            color: #ffffff;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        `;

        adventureButton.addEventListener('click', () => {
            this.beginStory(characterId);
            adventureButton.remove();
        });

        // Add to dialogue interface
        const dialogueModal = document.querySelector('.character-dialogue-modal, #character-dialogue-modal');
        if (dialogueModal) {
            const choicesContainer = dialogueModal.querySelector('.story-choices, .choices-container');
            if (choicesContainer) {
                choicesContainer.appendChild(adventureButton);
            }
        }
    }

    // Public API
    getStoryStatus() {
        return {
            unlocked: this.storyUnlocked,
            chapter: this.currentChapter,
            archetype: this.playerArchetype,
            reputation: this.reputation,
            choicesMade: this.storyChoices.length
        };
    }

    isStoryUnlocked() {
        return this.storyUnlocked;
    }

    getCurrentArchetype() {
        return this.playerArchetype;
    }

    forceUnlockStory() {
        this.unlockStory();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.atlantisSeaAdventure = new AtlantisSeaAdventure();
    });
} else {
    window.atlantisSeaAdventure = new AtlantisSeaAdventure();
}