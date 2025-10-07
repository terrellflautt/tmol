/**
 * HIDDEN WORLD SYSTEM
 * Every page, every element has secrets waiting to be discovered
 * The entire portfolio is a living puzzle box
 *
 * Discovery is gradual, mysterious, rewarding
 * Nothing is obvious. Everything is earned.
 */

class HiddenWorldSystem {
    constructor(profile) {
        this.profile = profile;
        this.discoveredSecrets = new Set(profile.discoveries?.map(d => d.type) || []);
        this.activeLayer = 1; // Reality layers: 1=normal, 2=strange, 3=surreal, 4=impossible

        this.initializeHiddenWorld();
    }

    initializeHiddenWorld() {
        // Embed secrets into every page
        this.embedHomeSecrets();
        this.embedAboutSecrets();
        this.embedProjectsSecrets();
        this.embedContactSecrets();
        this.embedBlogSecrets();

        // Global mysterious elements
        this.activateGlobalMysteries();
    }

    // =============================================
    // HOME PAGE SECRETS
    // The entry point - must be subtle but enticing
    // =============================================
    embedHomeSecrets() {
        return {
            // Secret 1: The Breathing Logo
            breathingLogo: {
                trigger: 'hover:3000',
                element: '.nav-logo',
                effect: {
                    visual: 'logo starts breathing - subtle pulse',
                    sound: 'heartbeat.mp3:0.1', // Very quiet
                    console: '💓 Something awakens...'
                },
                onDiscovery: {
                    skill: { curiosity: +1, attention: +1 },
                    unlocks: 'logo_secrets_revealed',
                    hint: 'The logo lives. What else is alive here?'
                }
            },

            // Secret 2: Time-Based Messages
            timingMystery: {
                trigger: 'visit_at_specific_times',
                times: {
                    '00:00': 'Midnight. The threshold hour. Reality is thin here.',
                    '03:33': 'The witching hour. Do you feel it?',
                    '11:11': 'Make a wish. The universe is listening.',
                    '13:13': 'Unlucky? Or perfect timing?'
                },
                effect: {
                    visual: 'subtitle_changes_briefly',
                    message: 'appears_for_3_seconds',
                    console: '🌙 Time holds secrets...'
                }
            },

            // Secret 3: The Hidden Subtitle
            subtitleWhisper: {
                trigger: 'read_subtitle_for:30000', // 30 seconds
                element: '.hero-subtitle',
                transformation: {
                    from: 'Design your magical world',
                    to: 'Or discover the one already here',
                    duration: 2000,
                    thenRevert: true
                },
                onDiscovery: {
                    skill: { patience: +3, wisdom: +1 },
                    console: '👁️ Did you see that? Or did you imagine it?'
                }
            },

            // Secret 4: Konami Code Enhancement
            konamiPlus: {
                trigger: 'konami_code',
                effect: {
                    immediate: 'Entire page inverts colors for 1 second',
                    console: '⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️ You remember...',
                    unlocks: 'retro_mode_available'
                },
                followUp: {
                    hint: 'Classic codes unlock classic secrets. What other sequences might work?'
                }
            },

            // Secret 5: The Particle Whisperer
            particleSecrets: {
                trigger: 'interact_with_particles',
                method: 'click_particle_100_times',
                effect: {
                    particles: 'start_forming_shapes',
                    shapes: ['eye', 'door', 'question_mark', 'spiral'],
                    sequence: 'one_shape_per_25_clicks',
                    console: '✨ The particles respond to your will...'
                },
                onComplete: {
                    skill: { agility: +5, creativity: +3 },
                    unlocks: 'particle_mastery',
                    reward: 'Can now control particle patterns'
                }
            },

            // Secret 6: The Scroll Sage
            scrollPattern: {
                trigger: 'scroll_pattern',
                pattern: 'down:100px_up:50px_down:100px_up:50px', // Repeating pattern
                times: 7,
                effect: {
                    console: '📜 You have the rhythm of a seeker...',
                    visual: 'Golden trail follows scroll',
                    unlocks: 'scroll_secrets'
                }
            },

            // Secret 7: Button Click Morse Code
            morseCode: {
                trigger: 'click_view_work_button',
                pattern: '... --- ...', // SOS in morse (3 short, 3 long, 3 short clicks)
                timing: 'short:<200ms, long:>500ms',
                effect: {
                    console: '📡 SOS received. Help is... complicated.',
                    unlocks: 'morse_mysteries',
                    hint: 'Other buttons respond to morse too...'
                }
            }
        };
    }

    // =============================================
    // ABOUT PAGE SECRETS
    // Your background - but what's BEHIND it?
    // =============================================
    embedAboutSecrets() {
        return {
            // Secret 1: The Typo That Isn't
            deliberateError: {
                location: 'about_text_paragraph_3',
                error: 'Misspell "portfolio" as "portfalio"',
                trigger: 'user_notices_and_hovers',
                effect: {
                    onHover: 'Text glitches, reveals: "You notice errors. Good. Nothing here is accidental."',
                    console: '🔍 Not all mistakes are mistakes.',
                    skill: { attention: +3, intelligence: +2 }
                }
            },

            // Secret 2: The Invisible Paragraph
            hiddenBio: {
                location: 'between_paragraphs',
                content: 'Invisible text (white on white)',
                trueContent: 'Some stories are written in invisible ink. Select this text to read it.',
                trigger: 'user_selects_text',
                revelation: {
                    text: 'I am not just a developer. I am a keeper of secrets. And you are finding them. Keep going.',
                    console: '👻 The invisible becomes visible...',
                    skill: { curiosity: +5 }
                }
            },

            // Secret 3: Skills That Glow
            skillHoverSecrets: {
                trigger: 'hover_each_skill_for:5000',
                requirement: 'all_primary_skills',
                effect: {
                    eachSkill: 'Glows when mastered',
                    allSkills: 'Form constellation pattern',
                    console: '⭐ The skills connect. They form something...',
                    unlocks: 'constellation_map'
                },
                revelation: {
                    pattern: 'Skills form shape of Aziza\'s face',
                    message: 'She was always watching.',
                    reward: 'aziza_blessing'
                }
            },

            // Secret 4: The Timeline Paradox
            experienceTimeline: {
                trigger: 'read_timeline_backwards',
                method: 'scroll_from_bottom_to_top',
                effect: {
                    dates: 'Start counting backwards',
                    console: '⏰ Time flows differently for those who look back...',
                    unlocks: 'time_traveler_path'
                }
            },

            // Secret 5: Profile Picture Easter Egg
            profilePictureSecret: {
                trigger: 'click_profile_image:13',
                effect: {
                    image: 'Briefly becomes different person/character',
                    options: ['wizard', 'sphinx', 'genie', 'yourself'],
                    console: '🎭 Masks upon masks. Who am I really?',
                    philosophical: 'Identity is fluid in digital realms'
                }
            },

            // Secret 6: The Contact Method Cipher
            contactCipher: {
                location: 'contact_methods_listed',
                cipher: 'First letter of each method spells message',
                methods: ['Email', 'LinkedIn', 'Instagram', 'Twitter', 'Signal', 'Telegram', 'Reddit', 'YouTube'],
                // Spells: ELISTRTY (rearrange to: MYSTERY)
                trigger: 'user_realizes_pattern',
                effect: {
                    console: '🔤 The letters speak when rearranged...',
                    hint: 'ELISTRTY = ?',
                    answer: 'MYSTERY',
                    reward: 'cipher_master_badge'
                }
            }
        };
    }

    // =============================================
    // PROJECTS PAGE SECRETS
    // Your work - but it watches back
    // =============================================
    embedProjectsSecrets() {
        return {
            // Secret 1: The Seventh Project
            phantomProject: {
                trigger: 'visit_projects_7_times',
                effect: {
                    newProject: 'Appears at bottom',
                    name: '??? - The Unfinished',
                    description: 'A project that exists between states. Started but never completed. Or... was it?',
                    onClick: 'Leads to hidden game level',
                    console: '7️⃣ The seventh reveals itself only to the persistent.'
                }
            },

            // Secret 2: Vote Button Hidden Message
            votingSecrets: {
                trigger: 'vote_then_immediately_unvote_7_times',
                effect: {
                    console: 'Indecision is a choice too. But why seven times?',
                    unlocks: 'indecision_path',
                    philosophical: 'About commitment and choice'
                }
            },

            // Secret 3: Project Card Arrangement
            cardPatternSecret: {
                trigger: 'hover_projects_in_specific_order',
                order: ['1st', '3rd', '2nd', '4th'], // Fibonacci-ish
                effect: {
                    cards: 'Glow in sequence',
                    console: '🔢 Patterns within patterns...',
                    unlocks: 'mathematical_mysteries'
                }
            },

            // Secret 4: GitHub Link Reality Break
            githubGlitch: {
                trigger: 'click_github_link_while_holding_shift',
                effect: {
                    instead: 'Opens hidden GitHub repo',
                    repo: 'Secret development branch',
                    contains: 'Unreleased features, easter eggs list',
                    console: '🐙 You found the hidden repository...'
                }
            },

            // Secret 5: The Missing Technology
            techStackSecret: {
                trigger: 'inspect_tech_stack_icons',
                secret: 'One technology icon is subtly wrong',
                example: 'React icon has extra electron',
                effect: {
                    onNotice: 'Clicking it reveals quantum computing reference',
                    console: '⚛️ Some technologies don\'t exist yet...',
                    unlocks: 'future_tech_path'
                }
            },

            // Secret 6: Demo vs Source Code
            demoSourceDiscrepancy: {
                trigger: 'click_demo_then_source_rapidly',
                effect: {
                    glitch: 'Both buttons merge briefly',
                    console: 'Demo and source... are they different? Or the same?',
                    philosophical: 'Reality vs representation',
                    unlocks: 'matrix_realization'
                }
            }
        };
    }

    // =============================================
    // CONTACT PAGE SECRETS
    // Communication - but with whom?
    // =============================================
    embedContactSecrets() {
        return {
            // Secret 1: The Form That Listens
            sentientForm: {
                trigger: 'type_in_form_without_submitting',
                effect: {
                    afterTyping: 'Placeholder text changes subtly',
                    responses: [
                        'I hear you...',
                        'Your message is received...',
                        'But will you send it?',
                        'Or are you afraid?'
                    ],
                    console: '📝 The form is... aware.',
                    creepy: 'Slightly unsettling'
                }
            },

            // Secret 2: Email as Spell
            emailSpell: {
                trigger: 'enter_specific_email',
                emails: [
                    'aziza@mysteries.com',
                    'genie@wishes.com',
                    'cthulhu@void.com'
                ],
                effect: {
                    response: 'You receive an auto-reply from the character',
                    aziza: 'The Sphinx does not check email often.',
                    genie: 'This is not how you summon me.',
                    cthulhu: 'Ph\'nglui mglw\'nafh Cthulhu R\'lyeh wgah\'nagl fhtagn',
                    console: '📧 Some addresses reach... elsewhere.'
                }
            },

            // Secret 3: Message Echoes
            echoingMessages: {
                trigger: 'type_message_palindrome',
                examples: ['A man a plan a canal panama', 'Was it a rat I saw'],
                effect: {
                    submission: 'Message sends to you instead',
                    console: '🔄 Palindromes return to sender...',
                    philosophical: 'What you send out comes back'
                }
            },

            // Secret 4: Submit Button Morse
            submitMorse: {
                trigger: 'click_submit_in_morse_pattern',
                pattern: 'SOS or HELP',
                effect: {
                    response: 'I see your distress signal. But I cannot help you... yet.',
                    console: '🆘 Help is coming. Eventually.',
                    unlocks: 'rescue_quest'
                }
            },

            // Secret 5: Social Links Constellation
            socialConstellation: {
                trigger: 'click_social_icons_to_form_shape',
                shape: 'Connect clicks like constellation',
                effect: {
                    visual: 'Lines appear between clicked icons',
                    completion: 'Forms recognizable pattern',
                    patterns: ['big_dipper', 'orion', 'cassiopeia'],
                    console: '⭐ The social network becomes celestial...',
                    reward: 'astronomer_badge'
                }
            },

            // Secret 6: The Empty Message
            voidSubmission: {
                trigger: 'submit_completely_empty_form',
                effect: {
                    response: 'Silence is also a message. I hear your silence.',
                    console: '🤐 Sometimes saying nothing says everything.',
                    philosophical: 'About communication and presence',
                    skill: { wisdom: +5 }
                }
            }
        };
    }

    // =============================================
    // BLOG PAGE SECRETS
    // Stories within stories
    // =============================================
    embedBlogSecrets() {
        return {
            // Secret 1: Article Read Time Anomaly
            timeAnomalies: {
                trigger: 'spend_exact_reading_time',
                effect: {
                    perfectReading: 'Article praises your reading pace',
                    tooFast: 'Did you really read? Or just skim?',
                    tooSlow: 'Taking your time. I respect that.',
                    console: '📖 The blog knows how you read...'
                }
            },

            // Secret 2: Comment Section Ghosts
            ghostComments: {
                trigger: 'scroll_to_comments',
                effect: {
                    comments: 'Appear from deleted users',
                    usernames: ['[deleted]', '[unknown]', 'The_Void'],
                    content: 'Cryptic messages about the game',
                    console: '👻 Comments from those who came before...'
                }
            },

            // Secret 3: Article Title Cipher
            titleCipher: {
                trigger: 'read_first_letter_of_each_article',
                spells: 'Hidden message',
                example: 'LOOK DEEPER',
                effect: {
                    console: '🔤 The articles spell something together...',
                    skill: { intelligence: +5, patternRecognition: +3 }
                }
            },

            // Secret 4: Date Manipulation
            dateMystery: {
                trigger: 'notice_dates_are_impossible',
                examples: ['Published: 2025-13-45', 'Updated: Yesterday Tomorrow'],
                effect: {
                    console: '📅 Time is relative in digital spaces...',
                    philosophical: 'About perception of time',
                    unlocks: 'time_anomalies_quest'
                }
            },

            // Secret 5: The Blank Article
            emptyPost: {
                trigger: 'find_article_with_no_content',
                title: 'The Unwritten',
                content: 'Completely blank',
                effect: {
                    onRead: 'Waiting 60 seconds reveals hidden text',
                    revealed: 'Some stories write themselves. This one needs you to write it.',
                    console: '✍️ Blank pages hold infinite potential...',
                    unlocks: 'writer_quest'
                }
            }
        };
    }

    // =============================================
    // GLOBAL MYSTERIES
    // Elements that work across all pages
    // =============================================
    activateGlobalMysteries() {
        return {
            // Mystery 1: The Cursor Shadow
            cursorEntity: {
                trigger: 'active_on_site',
                effect: {
                    subtle: 'Shadow follows cursor with slight delay',
                    sometimes: 'Shadow moves independently',
                    rare: 'Shadow points to hidden elements',
                    console: '👆 Is that shadow... alive?'
                }
            },

            // Mystery 2: Reality Layers
            layerShifts: {
                trigger: 'time_spent_on_site',
                layers: {
                    1: 'Normal - portfolio looks professional',
                    2: 'Strange - subtle weirdness appears (10min)',
                    3: 'Surreal - impossible things happen (30min)',
                    4: 'Impossible - full game revealed (60min)'
                },
                console: '🌀 Reality has layers. You\'re peeling them back...'
            },

            // Mystery 3: The Watching Eyes
            eyesEverywhere: {
                trigger: 'random_intervals',
                effect: {
                    eyes: 'Appear briefly in margins',
                    blink: 'Once, then disappear',
                    never: 'In same place twice',
                    console: '👁️ Do you feel watched? You should.'
                }
            },

            // Mystery 4: Background Whispers
            ambientMystery: {
                trigger: 'extended_visit',
                effect: {
                    audio: 'Very quiet whispers (barely audible)',
                    content: 'Backwards speech',
                    reversed: 'Says: "You are closer to truth"',
                    console: '🔇 Do you hear them? The whispers?'
                }
            },

            // Mystery 5: The 404 That Isn't
            phantom404: {
                trigger: 'try_to_visit_nonexistent_page',
                effect: {
                    instead: 'Custom 404 that\'s actually a puzzle',
                    message: 'This page doesn\'t exist. Or does it?',
                    hint: 'URL becomes cipher for real page',
                    console: '🚫 Not all 404s are errors...'
                }
            },

            // Mystery 6: Device Fingerprint Easter Egg
            fingerprintArt: {
                trigger: 'return_on_different_device',
                effect: {
                    recognition: 'Site knows it\'s you on new device',
                    greeting: 'Welcome back. I see you\'re using a different window to reality.',
                    console: '🖥️ I recognize you, regardless of the vessel.'
                }
            },

            // Mystery 7: The Navigation Paradox
            menuGlitch: {
                trigger: 'click_nav_items_in_reverse_order',
                effect: {
                    menu: 'Flips upside down briefly',
                    console: '🔄 Everything can be inverted...',
                    unlocks: 'mirror_world_mode'
                }
            }
        };
    }

    // Discovery Handler
    async discover(secretId) {
        if (this.discoveredSecrets.has(secretId)) {
            return { alreadyDiscovered: true };
        }

        this.discoveredSecrets.add(secretId);

        // Record discovery
        this.profile.discoveries.push({
            type: secretId,
            timestamp: Date.now(),
            session: this.profile.stats.totalSessions
        });

        // Award discovery points
        this.profile.discoveryScore = (this.profile.discoveryScore || 0) + 1;

        // Check for discovery milestones
        if (this.profile.discoveryScore === 10) {
            this.unlockContent('seeker_title');
        }
        if (this.profile.discoveryScore === 50) {
            this.unlockContent('master_seeker_title');
        }
        if (this.profile.discoveryScore === 100) {
            this.unlockContent('omniscient_one_title');
        }

        return {
            discovered: true,
            secretId,
            totalDiscoveries: this.profile.discoveryScore
        };
    }
}
