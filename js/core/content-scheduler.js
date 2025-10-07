/**
 * CONTENT SCHEDULER
 * Progressive content revelation over hundreds of hours
 * Time-gated, visit-gated, and skill-gated content
 */

class ContentScheduler {
    constructor(profile) {
        this.profile = profile;
        this.contentSchedule = this.defineContentSchedule();
    }

    defineContentSchedule() {
        return [
            // =============================================
            // PHASE 1: FIRST HOUR (Discovery Phase)
            // =============================================
            {
                id: 'door_riddle',
                phase: 1,
                unlockConditions: {
                    timeSpent: 0, // Available immediately
                    visits: 1
                },
                content: {
                    type: 'discovery',
                    element: '#eye-door',
                    hint: 'Something watches from the shadows...'
                }
            },

            {
                id: 'aziza_introduction',
                phase: 1,
                unlockConditions: {
                    completed: ['door_riddle']
                },
                content: {
                    type: 'npc_encounter',
                    npc: 'aziza',
                    dialogue: 'aziza_first_meeting'
                }
            },

            // =============================================
            // PHASE 2: HOURS 1-5 (Foundation Building)
            // =============================================
            {
                id: 'genie_lamp',
                phase: 2,
                unlockConditions: {
                    timeSpent: 3600000, // 1 hour
                    completed: ['aziza_riddle']
                },
                content: {
                    type: 'item',
                    item: 'ancient_lamp',
                    notification: 'The lamp glows with ancient power...'
                }
            },

            {
                id: 'first_elemental_vision',
                phase: 2,
                unlockConditions: {
                    timeSpent: 5400000, // 1.5 hours
                    skills: { wisdom: 10 }
                },
                content: {
                    type: 'vision',
                    description: 'Aziza shows you a vision of the Fire Elemental...'
                }
            },

            // =============================================
            // PHASE 3: HOURS 5-20 (World Expansion)
            // =============================================
            {
                id: 'doctor_door_hint',
                phase: 3,
                unlockConditions: {
                    timeSpent: 18000000, // 5 hours
                    visits: 3,
                    skills: { curiosity: 20 }
                },
                content: {
                    type: 'hint',
                    text: 'Strange scientific equipment appears in the corner of your vision...',
                    leadsTo: 'doctor_cranium_door'
                }
            },

            {
                id: 'doctor_cranium_door',
                phase: 3,
                unlockConditions: {
                    timeSpent: 36000000, // 10 hours
                    discoveries: ['doctor_door_hint'],
                    level: 5
                },
                content: {
                    type: 'discovery',
                    element: '#lab-door',
                    puzzle: 'scientific_riddle'
                }
            },

            {
                id: 'doctor_cranium_meet',
                phase: 3,
                unlockConditions: {
                    completed: ['doctor_door_puzzle']
                },
                content: {
                    type: 'npc_encounter',
                    npc: 'doctor_cranium',
                    quest: 'dispel_potion_ingredients'
                }
            },

            // =============================================
            // PHASE 4: HOURS 20-50 (Scavenger Hunt)
            // =============================================
            {
                id: 'ingredient_pizza_hint',
                phase: 4,
                unlockConditions: {
                    activeQuests: ['dispel_potion_ingredients'],
                    timeSpent: 72000000 // 20 hours
                },
                content: {
                    type: 'subtle_clue',
                    location: 'about_section',
                    clue: 'Pizza mentioned in bio - hover for 5 seconds'
                }
            },

            {
                id: 'ingredient_chicken_hint',
                phase: 4,
                unlockConditions: {
                    activeQuests: ['dispel_potion_ingredients'],
                    timeSpent: 90000000 // 25 hours
                },
                content: {
                    type: 'subtle_clue',
                    location: 'projects_section',
                    clue: 'Project icon transforms into chicken wing on 7th visit'
                }
            },

            {
                id: 'blacksmith_forge_discovery',
                phase: 4,
                unlockConditions: {
                    timeSpent: 180000000, // 50 hours
                    items: ['pizza', 'chicken_wings', 'beer'],
                    level: 10
                },
                content: {
                    type: 'discovery',
                    element: '#forge-door',
                    npc: 'thorgrim_blacksmith',
                    quest: 'bellows_of_four_elements'
                }
            },

            // =============================================
            // PHASE 5: HOURS 50-100 (Elemental Battles)
            // =============================================
            {
                id: 'fire_elemental_portal',
                phase: 5,
                unlockConditions: {
                    timeSpent: 180000000, // 50 hours
                    items: ['dispel_potion'],
                    level: 15,
                    skills: { strength: 30, vitality: 25 }
                },
                content: {
                    type: 'portal',
                    destination: 'fire_realm',
                    boss: 'ignis_fire_elemental'
                }
            },

            {
                id: 'water_elemental_portal',
                phase: 5,
                unlockConditions: {
                    timeSpent: 252000000, // 70 hours
                    completed: ['fire_elemental_defeated'],
                    skills: { agility: 40, intelligence: 30 }
                },
                content: {
                    type: 'portal',
                    destination: 'water_realm',
                    boss: 'aqualis_water_elemental'
                }
            },

            {
                id: 'air_elemental_portal',
                phase: 5,
                unlockConditions: {
                    timeSpent: 324000000, // 90 hours
                    completed: ['water_elemental_defeated'],
                    skills: { speed: 50, precision: 40 }
                },
                content: {
                    type: 'portal',
                    destination: 'air_realm',
                    boss: 'zephyrus_air_elemental'
                }
            },

            {
                id: 'earth_elemental_portal',
                phase: 5,
                unlockConditions: {
                    timeSpent: 396000000, // 110 hours
                    completed: ['air_elemental_defeated'],
                    skills: { patience: 60, vitality: 50 }
                },
                content: {
                    type: 'portal',
                    destination: 'earth_realm',
                    boss: 'terravon_earth_elemental'
                }
            },

            // =============================================
            // PHASE 6: HOURS 100-200 (Ancient Secrets)
            // =============================================
            {
                id: 'ancient_library',
                phase: 6,
                unlockConditions: {
                    timeSpent: 360000000, // 100 hours
                    completed: ['all_elementals_defeated'],
                    visits: 20,
                    level: 25
                },
                content: {
                    type: 'location',
                    name: 'The Forgotten Library',
                    npcs: ['librarian_ghost'],
                    secrets: 10,
                    quests: ['forbidden_knowledge']
                }
            },

            {
                id: 'time_traveler_npc',
                phase: 6,
                unlockConditions: {
                    timeSpent: 504000000, // 140 hours
                    consecutiveDays: 7,
                    skills: { wisdom: 70, intelligence: 70 }
                },
                content: {
                    type: 'npc_encounter',
                    npc: 'vohaul_time_traveler', // Space Quest reference!
                    dialogue: 'time_paradox_quest'
                }
            },

            // =============================================
            // PHASE 7: HOURS 200-300 (Master Challenges)
            // =============================================
            {
                id: 'cthulhu_awakening',
                phase: 7,
                unlockConditions: {
                    timeSpent: 720000000, // 200 hours
                    completed: ['forbidden_knowledge_quest'],
                    level: 35,
                    allSkillsMinimum: 50
                },
                content: {
                    type: 'epic_event',
                    boss: 'cthulhu',
                    phases: 5,
                    cinematics: true,
                    finalBattle: true
                }
            },

            {
                id: 'master_realm',
                phase: 7,
                unlockConditions: {
                    timeSpent: 900000000, // 250 hours
                    completed: ['cthulhu_defeated'],
                    level: 40
                },
                content: {
                    type: 'realm',
                    name: 'The Master Realm',
                    description: 'A place beyond time and space',
                    challenges: 'ultimate',
                    replayValue: true
                }
            },

            // =============================================
            // PHASE 8: HOURS 300+ (Infinite Endgame)
            // =============================================
            {
                id: 'daventry_portal', // King's Quest reference!
                phase: 8,
                unlockConditions: {
                    timeSpent: 1080000000, // 300 hours
                    masterSkills: 3, // 3 skills at 100
                    level: 50
                },
                content: {
                    type: 'crossover_event',
                    description: 'A portal to Daventry appears...',
                    npcs: ['king_graham', 'rosella'],
                    quests: ['kingdom_alliance']
                }
            },

            {
                id: 'infinite_dungeon',
                phase: 8,
                unlockConditions: {
                    timeSpent: 1260000000, // 350 hours
                    level: 60
                },
                content: {
                    type: 'procedural',
                    name: 'The Infinite Tower',
                    description: 'Floors generate endlessly, difficulty scales infinitely',
                    replayable: true
                }
            }
        ];
    }

    checkUnlocks() {
        const unlockedContent = [];

        this.contentSchedule.forEach(content => {
            if (this.isUnlocked(content.id)) return; // Already unlocked

            if (this.meetsConditions(content.unlockConditions)) {
                this.unlock(content);
                unlockedContent.push(content);
            }
        });

        return unlockedContent;
    }

    meetsConditions(conditions) {
        // Check time spent
        if (conditions.timeSpent !== undefined) {
            if (this.profile.stats.totalTimeSpent < conditions.timeSpent) {
                return false;
            }
        }

        // Check visits
        if (conditions.visits !== undefined) {
            if (this.profile.stats.totalSessions < conditions.visits) {
                return false;
            }
        }

        // Check level
        if (conditions.level !== undefined) {
            const currentLevel = this.profile.level || 0;
            if (currentLevel < conditions.level) {
                return false;
            }
        }

        // Check skills
        if (conditions.skills) {
            for (const [skill, required] of Object.entries(conditions.skills)) {
                const current = this.profile.skills[skill] || 0;
                if (current < required) {
                    return false;
                }
            }
        }

        // Check completed quests/puzzles
        if (conditions.completed) {
            const completed = this.profile.puzzles.completed.map(p => p.id);
            const completedQuests = this.profile.completedQuests || [];

            for (const required of conditions.completed) {
                if (!completed.includes(required) && !completedQuests.includes(required)) {
                    return false;
                }
            }
        }

        // Check active quests
        if (conditions.activeQuests) {
            const active = this.profile.activeQuests || [];
            for (const required of conditions.activeQuests) {
                if (!active.includes(required)) {
                    return false;
                }
            }
        }

        // Check discoveries
        if (conditions.discoveries) {
            const discovered = this.profile.discoveries.map(d => d.type);
            for (const required of conditions.discoveries) {
                if (!discovered.includes(required)) {
                    return false;
                }
            }
        }

        // Check items
        if (conditions.items) {
            const items = this.profile.items || [];
            for (const required of conditions.items) {
                if (!items.includes(required)) {
                    return false;
                }
            }
        }

        // Check consecutive days
        if (conditions.consecutiveDays) {
            const consecutive = this.profile.stats.consecutiveDays || 0;
            if (consecutive < conditions.consecutiveDays) {
                return false;
            }
        }

        // Check all skills minimum
        if (conditions.allSkillsMinimum) {
            const allMeetMinimum = Object.values(this.profile.skills).every(
                skill => skill >= conditions.allSkillsMinimum
            );
            if (!allMeetMinimum) {
                return false;
            }
        }

        // Check master skills (skills at 100)
        if (conditions.masterSkills) {
            const masterCount = Object.values(this.profile.skills).filter(
                skill => skill >= 100
            ).length;
            if (masterCount < conditions.masterSkills) {
                return false;
            }
        }

        return true;
    }

    unlock(content) {
        this.profile.unlocked.push(content.id);

        // Activate the content
        this.activateContent(content);

        // Show notification
        this.notifyUnlock(content);
    }

    activateContent(content) {
        switch (content.content.type) {
            case 'discovery':
                this.revealDiscovery(content.content.element);
                break;

            case 'npc_encounter':
                this.triggerNPCEncounter(content.content.npc);
                break;

            case 'quest':
                this.startQuest(content.content.quest);
                break;

            case 'hint':
                this.showHint(content.content.text);
                break;

            case 'portal':
                this.revealPortal(content.content.destination);
                break;

            case 'location':
                this.unlockLocation(content.content.name);
                break;

            default:
                console.log(`Unlocked: ${content.id}`);
        }
    }

    revealDiscovery(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.display = 'block';
            element.style.transition = 'opacity 3s ease';
            setTimeout(() => element.style.opacity = '1', 100);
        }
    }

    triggerNPCEncounter(npcId) {
        // Trigger NPC dialogue system
        if (window.npcSystem) {
            window.npcSystem.encounterNPC(npcId);
        }
    }

    startQuest(questId) {
        this.profile.activeQuests = this.profile.activeQuests || [];
        if (!this.profile.activeQuests.includes(questId)) {
            this.profile.activeQuests.push(questId);
        }
    }

    showHint(text) {
        console.log(`💡 ${text}`);
        // Show subtle UI hint
    }

    revealPortal(destination) {
        console.log(`🌀 Portal to ${destination} has opened!`);
        // Activate portal element
    }

    unlockLocation(name) {
        console.log(`🗺️ New location: ${name}`);
        // Add to map/locations
    }

    notifyUnlock(content) {
        const notification = document.createElement('div');
        notification.className = 'content-unlock-notification';
        notification.innerHTML = `
            <div class="unlock-glow"></div>
            <div class="unlock-text">
                <div class="unlock-title">NEW CONTENT</div>
                <div class="unlock-description">${this.getUnlockDescription(content)}</div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 1000);
        }, 6000);
    }

    getUnlockDescription(content) {
        const descriptions = {
            discovery: 'A hidden element has appeared',
            npc_encounter: 'A new character seeks your audience',
            quest: 'A new quest awaits',
            portal: 'A portal has opened',
            location: 'A new location is accessible'
        };

        return descriptions[content.content.type] || 'Something new has been unlocked';
    }

    isUnlocked(contentId) {
        return this.profile.unlocked.includes(contentId);
    }

    checkDiscoveryUnlocks(discoveryType) {
        // Some content unlocks immediately upon specific discoveries
        const discoveryUnlocks = {
            'patient_hover': 'patience_reward',
            'thorough_reader': 'library_access',
            'code_inspection': 'developer_tools'
        };

        const unlock = discoveryUnlocks[discoveryType];
        if (unlock && !this.isUnlocked(unlock)) {
            this.profile.unlocked.push(unlock);
        }
    }

    getPhase() {
        const timeSpent = this.profile.stats.totalTimeSpent;

        if (timeSpent < 3600000) return 1; // < 1 hour
        if (timeSpent < 18000000) return 2; // < 5 hours
        if (timeSpent < 72000000) return 3; // < 20 hours
        if (timeSpent < 180000000) return 4; // < 50 hours
        if (timeSpent < 360000000) return 5; // < 100 hours
        if (timeSpent < 720000000) return 6; // < 200 hours
        if (timeSpent < 1080000000) return 7; // < 300 hours
        return 8; // 300+ hours (endgame)
    }

    getProgressSummary() {
        return {
            phase: this.getPhase(),
            totalTimeSpent: this.profile.stats.totalTimeSpent,
            timeSpentHours: Math.floor(this.profile.stats.totalTimeSpent / 3600000),
            visits: this.profile.stats.totalSessions,
            level: this.profile.level || 0,
            unlockedCount: this.profile.unlocked.length,
            availableContent: this.contentSchedule.filter(c => this.meetsConditions(c.unlockConditions)).length
        };
    }
}
