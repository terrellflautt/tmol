/**
 * CONSEQUENCE SYSTEM
 * Player choices have real, sometimes devastating consequences
 * NPCs can die, betray, go insane, fall from grace
 * Not all stories have happy endings
 *
 * Inspired by: Game of Thrones, The Walking Dead, Dark Souls
 * vs. Traditional Sierra Games (where heroes always win)
 */

class ConsequenceSystem {
    constructor(profile) {
        this.profile = profile;
        this.consequenceTree = this.initializeConsequenceTree();
        this.npcFates = new Map(); // Track each NPC's current state
        this.pointOfNoReturn = new Set(); // Irreversible choices
    }

    initializeConsequenceTree() {
        return {
            // =============================================
            // AZIZA'S FATE - Multiple Paths
            // =============================================
            aziza_riddle_failure: {
                trigger: {
                    event: 'aziza_riddle',
                    condition: 'failed_3_times',
                    noHintsUsed: true
                },
                consequences: [
                    {
                        immediate: {
                            text: 'Aziza\'s eyes dim with disappointment...',
                            npcReaction: 'aziza_disappointed'
                        },
                        longTerm: {
                            text: 'Aziza withdraws deeper into her realm. She will not speak to you again.',
                            npcState: 'aziza_withdrawn',
                            locks: ['aziza_lamp_quest', 'aziza_romance'],
                            unlocks: ['alternative_lamp_path']
                        }
                    }
                ],
                reversible: false
            },

            aziza_betrayal: {
                trigger: {
                    event: 'aziza_trust_broken',
                    condition: 'lied_3_times'
                },
                consequences: [
                    {
                        immediate: {
                            text: '"You have lied to Aziza. The Sphinx does not forgive such disrespect."',
                            npcReaction: 'aziza_furious'
                        },
                        longTerm: {
                            text: 'Aziza places a curse upon you. All future riddles become harder.',
                            effects: {
                                puzzleDifficulty: '+3',
                                hintCooldown: 'x2',
                                npcTrust: '-50_all'
                            },
                            npcState: 'aziza_hostile',
                            permanentCurse: true
                        }
                    }
                ],
                reversible: true,
                redemptionPath: 'aziza_redemption_quest'
            },

            aziza_death: {
                trigger: {
                    event: 'fire_elemental_battle',
                    condition: 'aziza_in_party_and_player_fails'
                },
                consequences: [
                    {
                        immediate: {
                            text: 'The Fire Elemental\'s blast engulfs Aziza. She screams as ancient magic tears her apart.',
                            cinematicId: 'aziza_death_scene',
                            sfx: 'death_scream',
                            visual: 'aziza_ashes'
                        },
                        longTerm: {
                            text: 'Aziza is gone. Her riddles, her wisdom, her lamp... all lost forever.',
                            npcState: 'aziza_dead',
                            locks: ['aziza_all_content', 'sphinx_wisdom'],
                            unlocks: ['grief_dialogue', 'aziza_memorial'],
                            items: ['aziza_ashes', 'broken_lamp'],
                            guilt: true
                        }
                    }
                ],
                reversible: false,
                playerFault: true,
                guiltyDialogue: [
                    'You see Aziza\'s face in your dreams...',
                    'The weight of her death follows you.',
                    'Other NPCs mention her passing with sadness.'
                ]
            },

            // =============================================
            // DOCTOR CRANIUM - Mad Scientist Paths
            // =============================================
            cranium_experiment_gone_wrong: {
                trigger: {
                    event: 'dispel_potion_crafting',
                    condition: 'wrong_ingredients_3_times'
                },
                consequences: [
                    {
                        immediate: {
                            text: 'The mixture explodes! Doctor Cranium is caught in the blast!',
                            cinematicId: 'lab_explosion',
                            sfx: 'explosion',
                            visual: 'lab_destroyed'
                        },
                        longTerm: {
                            text: 'The Doctor survives, but his mind is... changed. He speaks in riddles now, paranoid and unstable.',
                            npcState: 'cranium_insane',
                            dialogue: 'cranium_mad_dialogue',
                            shops: 'cranium_shop_closed',
                            newQuests: ['cure_cranium_madness']
                        }
                    }
                ],
                reversible: true,
                redemptionPath: 'cranium_sanity_quest'
            },

            cranium_frankenstein_alive: {
                trigger: {
                    event: 'frankenstein_creation',
                    condition: 'perfect_ingredients_and_full_moon'
                },
                consequences: [
                    {
                        immediate: {
                            text: 'IT\'S ALIVE! The creature opens its eyes... but there\'s something wrong. It looks at you with hatred.',
                            cinematicId: 'creature_awakens',
                            npcCreated: 'frankenstein_creature'
                        },
                        longTerm: {
                            text: 'The creature escapes the lab. Citizens report sightings. Some go missing.',
                            worldState: 'creature_loose',
                            randomEncounters: true,
                            npcDeaths: 'possible',
                            newQuests: ['hunt_the_creature'],
                            moralChoice: 'kill_or_redeem_creature'
                        }
                    }
                ],
                reversible: true,
                moralComplexity: 'high'
            },

            cranium_sacrifice: {
                trigger: {
                    event: 'creature_redemption_quest',
                    condition: 'choose_doctor_over_creature'
                },
                consequences: [
                    {
                        immediate: {
                            text: 'The creature lunges at Doctor Cranium. You have only seconds to decide...',
                            choice: {
                                option1: 'Save the Doctor (Creature dies)',
                                option2: 'Save the Creature (Doctor dies)',
                                option3: 'Try to save both (both might die)'
                            }
                        },
                        outcomes: {
                            save_doctor: {
                                text: 'You strike down the creature. It dies in your arms, whispering "Father..."',
                                npcState: 'cranium_alive_traumatized',
                                skills: { strength: 5, chaos: 10 },
                                guilt: 'creature_killer'
                            },
                            save_creature: {
                                text: 'Doctor Cranium falls. His last words: "I... I understand now. Thank you."',
                                npcState: 'cranium_dead',
                                npcCreated: 'creature_redeemed',
                                skills: { mercy: 15, wisdom: 5 },
                                guilt: 'doctor_death'
                            },
                            save_both: {
                                chance: 0.3, // 30% success rate
                                success: {
                                    text: 'Impossibly, you manage to calm the creature. Father and son embrace, weeping.',
                                    npcState: 'cranium_redeemed',
                                    skills: { wisdom: 10, mercy: 10, luck: 5 },
                                    bestEnding: true
                                },
                                failure: {
                                    text: 'You fail. Both die in the chaos. Their blood is on your hands.',
                                    npcState: 'cranium_dead_and_creature_dead',
                                    skills: { chaos: 20 },
                                    guilt: 'double_death',
                                    depression: true
                                }
                            }
                        }
                    }
                ],
                reversible: false,
                majorChoicePoint: true
            },

            // =============================================
            // GENIE - Wish Corruption
            // =============================================
            genie_wish_corruption: {
                trigger: {
                    event: 'genie_wish',
                    condition: 'greedy_or_selfish_wishes_3_times'
                },
                consequences: [
                    {
                        immediate: {
                            text: 'The Genie\'s smile fades. "You use wishes like a child uses toys. Perhaps... you need a lesson."',
                            npcReaction: 'genie_disappointed'
                        },
                        longTerm: {
                            text: 'The Genie twists your wishes. They come true, but with horrible unintended consequences.',
                            wishStyle: 'monkey_paw',
                            examples: [
                                'Wish for wealth → NPC you love dies, leaves you fortune',
                                'Wish for power → Gain power but lose all friends',
                                'Wish for knowledge → Learn truth, it drives you mad'
                            ],
                            npcState: 'genie_corrupted'
                        }
                    }
                ],
                reversible: true,
                redemptionPath: 'genie_apology_quest'
            },

            genie_trap_broken: {
                trigger: {
                    event: 'ancient_library',
                    condition: 'found_liberation_spell'
                },
                consequences: [
                    {
                        immediate: {
                            text: 'You found a way to free the Genie. But should you?',
                            choice: {
                                option1: 'Free the Genie',
                                option2: 'Keep him enslaved',
                                option3: 'Destroy the lamp (kills Genie)'
                            }
                        },
                        outcomes: {
                            free_genie: {
                                text: 'The Genie is free! He thanks you... then vanishes. You\'ll never see him again.',
                                npcState: 'genie_free_and_gone',
                                locks: ['all_genie_content'],
                                skills: { mercy: 20, wisdom: 10 },
                                bittersweet: true
                            },
                            keep_enslaved: {
                                text: 'The Genie sees the spell in your hand. His eyes fill with betrayal. "I thought... you were different."',
                                npcState: 'genie_betrayed',
                                skills: { chaos: 15 },
                                guilt: 'slave_master',
                                futureRevenge: true
                            },
                            destroy_lamp: {
                                text: 'The lamp shatters. The Genie\'s scream echoes across dimensions as he dies.',
                                npcState: 'genie_dead',
                                skills: { chaos: 25 },
                                guilt: 'genie_murderer',
                                hauntedByGhost: true
                            }
                        }
                    }
                ],
                reversible: false,
                moralDilemma: 'freedom_vs_utility'
            },

            // =============================================
            // ROMANCE CONSEQUENCES - Dark Romance Paths
            // =============================================
            romance_betrayal: {
                trigger: {
                    event: 'romance_multiple_npcs',
                    condition: 'discovered_by_partner'
                },
                consequences: [
                    {
                        immediate: {
                            text: 'Erana sees you with Katrina. Her face goes pale. "I... I trusted you..."',
                            cinematicId: 'betrayal_scene'
                        },
                        longTerm: {
                            text: 'Word spreads. All NPCs lose trust. Some refuse to speak to you.',
                            npcTrust: '-30_all',
                            reputation: 'unfaithful',
                            locks: ['all_romance_options'],
                            skills: { chaos: 10 },
                            socialConsequences: true
                        }
                    }
                ],
                reversible: 'difficult',
                redemptionPath: 'earn_back_trust_quest'
            },

            romance_death: {
                trigger: {
                    event: 'final_battle',
                    condition: 'romanced_npc_in_party'
                },
                consequences: [
                    {
                        immediate: {
                            text: 'Elsa throws herself in front of the attack meant for you. Time slows as she falls...',
                            cinematicId: 'love_sacrifice',
                            sfx: 'heartbeat_slow',
                            visual: 'blood'
                        },
                        longTerm: {
                            text: 'She dies in your arms. Her last words: "I... love you..." Then silence.',
                            npcState: 'elsa_dead',
                            items: ['elsa_locket', 'bloodstained_sword'],
                            skills: { vitality: -10 }, // Broken heart affects health
                            depression: true,
                            nightmares: true,
                            guiltyDialogue: [
                                'You see her face when you close your eyes.',
                                'Every victory feels hollow without her.',
                                'You visit her grave daily.'
                            ],
                            alternateEnding: 'tragic_hero'
                        }
                    }
                ],
                reversible: false,
                emotionalImpact: 'extreme'
            },

            romance_turn_evil: {
                trigger: {
                    event: 'cthulhu_influence',
                    condition: 'romanced_npc_exposed_to_madness'
                },
                consequences: [
                    {
                        immediate: {
                            text: 'Katrina\'s eyes turn black. She speaks in a voice not her own: "The Old Ones call..."',
                            cinematicId: 'corruption_scene'
                        },
                        longTerm: {
                            text: 'She is lost to madness. She becomes a boss you must fight.',
                            npcState: 'katrina_corrupted_boss',
                            bossEncounter: {
                                name: 'Corrupted Katrina',
                                difficulty: 'nightmare',
                                phases: 3,
                                dialogue: [
                                    'She begs you to kill her.',
                                    'She screams your name between attacks.',
                                    'You see tears of blood on her face.'
                                ]
                            },
                            choice: {
                                kill: 'Mercy kill - she dies but is freed',
                                redeem: 'Try to save her - might work, might corrupt you too',
                                abandon: 'Leave her to madness - she hunts you forever'
                            }
                        }
                    }
                ],
                reversible: 'maybe',
                psychologicalHorror: true
            },

            // =============================================
            // ELEMENTAL CONSEQUENCES - Environmental Damage
            // =============================================
            fire_elemental_unleashed: {
                trigger: {
                    event: 'fire_elemental_battle',
                    condition: 'failed_or_fled'
                },
                consequences: [
                    {
                        immediate: {
                            text: 'The Fire Elemental breaks free from its realm. It rampages across the land.',
                            cinematicId: 'fire_destruction'
                        },
                        longTerm: {
                            text: 'Buildings burn. NPCs die. The world is scarred by your failure.',
                            worldState: 'scorched_earth',
                            npcDeaths: ['random_npc_1', 'random_npc_2', 'random_npc_3'],
                            locations: 'some_destroyed',
                            shops: 'some_burned',
                            atmosphere: 'post_apocalyptic',
                            guilt: 'world_destroyer',
                            difficultyIncrease: '+5_all_content'
                        }
                    }
                ],
                reversible: 'partial',
                worldChanging: true
            },

            // =============================================
            // PLAYER CHARACTER - Self Destruction
            // =============================================
            player_corruption: {
                trigger: {
                    event: 'chaos_stat',
                    condition: 'chaos_above_80'
                },
                consequences: [
                    {
                        immediate: {
                            text: 'You feel... different. Darkness seeps into your thoughts.',
                            visual: 'character_portrait_darkens'
                        },
                        longTerm: {
                            text: 'You are becoming what you fight. NPCs fear you. Children cry when you approach.',
                            reputation: 'villain',
                            npcReactions: 'fear_and_distrust',
                            dialogue: 'dark_options_only',
                            appearance: 'corrupted_hero',
                            endingLocked: ['good_ending', 'neutral_ending'],
                            unlockedEnding: ['dark_lord_ending']
                        }
                    }
                ],
                reversible: true,
                redemptionPath: 'atonement_quest',
                redemptionDifficulty: 'extreme'
            },

            player_death: {
                trigger: {
                    event: 'any_battle',
                    condition: 'health_zero_and_no_resurrections'
                },
                consequences: [
                    {
                        immediate: {
                            text: 'Your vision fades. This is the end.',
                            cinematicId: 'player_death'
                        },
                        longTerm: {
                            text: 'GAME OVER. Your save file is corrupted. Start over.',
                            permadeath: true,
                            profileReset: true,
                            memorial: {
                                text: 'In memory of [player name]',
                                stats: 'displayed',
                                achievements: 'lost',
                                timeSpent: 'displayed'
                            },
                            unlock: 'hardcore_mode_completed'
                        }
                    }
                ],
                reversible: false,
                hardcoreMode: true
            }
        };
    }

    async triggerConsequence(consequenceId, context = {}) {
        const consequence = this.consequenceTree[consequenceId];
        if (!consequence) return;

        // Check if trigger conditions met
        if (!this.checkTriggerConditions(consequence.trigger, context)) {
            return;
        }

        // Execute consequences
        for (const stage of consequence.consequences) {
            await this.executeImmediateConsequence(stage.immediate);
            await this.executeLongTermConsequence(stage.longTerm);
        }

        // Record in profile
        this.profile.consequences = this.profile.consequences || [];
        this.profile.consequences.push({
            id: consequenceId,
            timestamp: Date.now(),
            context,
            reversible: consequence.reversible
        });

        // Mark as point of no return if irreversible
        if (!consequence.reversible) {
            this.pointOfNoReturn.add(consequenceId);
        }
    }

    checkTriggerConditions(trigger, context) {
        if (trigger.event && context.event !== trigger.event) return false;
        if (trigger.condition && !this.evaluateCondition(trigger.condition, context)) return false;
        return true;
    }

    evaluateCondition(condition, context) {
        // Evaluate complex conditions
        // This would check profile state, skills, choices, etc.
        return true; // Simplified for now
    }

    async executeImmediateConsequence(immediate) {
        if (!immediate) return;

        // Show dramatic text
        if (immediate.text) {
            this.showConsequenceNotification(immediate.text, 'immediate');
        }

        // Play cinematic
        if (immediate.cinematicId) {
            await this.playCinematic(immediate.cinematicId);
        }

        // Update NPC reaction
        if (immediate.npcReaction) {
            this.updateNPCState(immediate.npc, immediate.npcReaction);
        }

        // Play sound effects
        if (immediate.sfx) {
            this.playSFX(immediate.sfx);
        }
    }

    async executeLongTermConsequence(longTerm) {
        if (!longTerm) return;

        // Lock content
        if (longTerm.locks) {
            longTerm.locks.forEach(content => {
                this.lockContent(content);
            });
        }

        // Unlock alternative paths
        if (longTerm.unlocks) {
            longTerm.unlocks.forEach(content => {
                this.unlockContent(content);
            });
        }

        // Change NPC state
        if (longTerm.npcState) {
            this.updateNPCState(longTerm.npc || 'current', longTerm.npcState);
        }

        // Apply effects
        if (longTerm.effects) {
            this.applyEffects(longTerm.effects);
        }

        // Add guilt/trauma
        if (longTerm.guilt) {
            this.addPsychologicalState('guilt', longTerm.guilt);
        }

        if (longTerm.depression) {
            this.addPsychologicalState('depression', true);
        }

        // Change world state
        if (longTerm.worldState) {
            this.changeWorldState(longTerm.worldState);
        }
    }

    showConsequenceNotification(text, severity = 'normal') {
        const colors = {
            immediate: '#ff4444',
            warning: '#ffaa00',
            normal: '#666666',
            tragic: '#000000'
        };

        console.log(`⚠️ CONSEQUENCE: ${text}`);
        // TODO: Show dramatic UI notification
    }

    async playCinematic(cinematicId) {
        console.log(`🎬 Playing cinematic: ${cinematicId}`);
        // TODO: Load and play cinematic sequence
    }

    updateNPCState(npcId, newState) {
        this.npcFates.set(npcId, newState);
        console.log(`NPC ${npcId} state changed to: ${newState}`);
    }

    lockContent(contentId) {
        this.profile.locked = this.profile.locked || [];
        if (!this.profile.locked.includes(contentId)) {
            this.profile.locked.push(contentId);
        }
    }

    unlockContent(contentId) {
        if (!this.profile.unlocked.includes(contentId)) {
            this.profile.unlocked.push(contentId);
        }
    }

    applyEffects(effects) {
        Object.entries(effects).forEach(([effect, value]) => {
            console.log(`Applying effect: ${effect} = ${value}`);
            // Apply various game effects
        });
    }

    addPsychologicalState(state, data) {
        this.profile.psychologicalStates = this.profile.psychologicalStates || {};
        this.profile.psychologicalStates[state] = data;

        // Psychological states affect gameplay
        if (state === 'depression') {
            this.profile.skills.vitality = Math.max(0, (this.profile.skills.vitality || 0) - 10);
        }
    }

    changeWorldState(newState) {
        this.profile.worldState = newState;
        console.log(`World state changed to: ${newState}`);
    }

    canReverse(consequenceId) {
        const consequence = this.profile.consequences?.find(c => c.id === consequenceId);
        if (!consequence) return false;

        const definition = this.consequenceTree[consequenceId];
        return definition.reversible === true;
    }

    getActiveConsequences() {
        return this.profile.consequences || [];
    }

    isPointOfNoReturn(consequenceId) {
        return this.pointOfNoReturn.has(consequenceId);
    }

    playSFX(sfxId) {
        console.log(`🔊 Playing SFX: ${sfxId}`);
        // TODO: Play sound effect
    }
}
