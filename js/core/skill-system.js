/**
 * SKILL SYSTEM
 * QFG-inspired skill progression with practice-based improvement
 * Skills increase through use and successful challenges
 */

class SkillSystem {
    constructor(profile) {
        this.profile = profile;
        this.skillDefinitions = this.defineSkills();
    }

    defineSkills() {
        return {
            // PRIMARY ATTRIBUTES (QFG Classic)
            strength: {
                name: 'Strength',
                description: 'Physical power and endurance',
                icon: '💪',
                maxLevel: 100,
                category: 'primary'
            },
            intelligence: {
                name: 'Intelligence',
                description: 'Mental acuity and problem-solving',
                icon: '🧠',
                maxLevel: 100,
                category: 'primary'
            },
            agility: {
                name: 'Agility',
                description: 'Speed, reflexes, and coordination',
                icon: '⚡',
                maxLevel: 100,
                category: 'primary'
            },
            vitality: {
                name: 'Vitality',
                description: 'Health, stamina, and resilience',
                icon: '❤️',
                maxLevel: 100,
                category: 'primary'
            },
            luck: {
                name: 'Luck',
                description: 'Fortune favors the bold',
                icon: '🍀',
                maxLevel: 100,
                category: 'primary'
            },

            // KNOWLEDGE SKILLS
            wisdom: {
                name: 'Wisdom',
                description: 'Understanding and insight',
                icon: '📚',
                maxLevel: 100,
                category: 'knowledge',
                unlockLevel: 5
            },
            curiosity: {
                name: 'Curiosity',
                description: 'Drive to explore and discover',
                icon: '🔍',
                maxLevel: 100,
                category: 'knowledge'
            },
            attention: {
                name: 'Attention',
                description: 'Focus and observation',
                icon: '👁️',
                maxLevel: 100,
                category: 'knowledge'
            },

            // BEHAVIORAL SKILLS
            patience: {
                name: 'Patience',
                description: 'Ability to wait and persist',
                icon: '⏳',
                maxLevel: 100,
                category: 'behavioral'
            },
            speed: {
                name: 'Speed',
                description: 'Quick thinking and action',
                icon: '🏃',
                maxLevel: 100,
                category: 'behavioral'
            },
            precision: {
                name: 'Precision',
                description: 'Accuracy and attention to detail',
                icon: '🎯',
                maxLevel: 100,
                category: 'behavioral'
            },
            creativity: {
                name: 'Creativity',
                description: 'Original thinking and innovation',
                icon: '🎨',
                maxLevel: 100,
                category: 'behavioral',
                unlockLevel: 10
            },

            // TECHNICAL SKILLS
            codeReading: {
                name: 'Code Reading',
                description: 'Understanding source code',
                icon: '💻',
                maxLevel: 100,
                category: 'technical',
                unlockLevel: 15
            },
            problemSolving: {
                name: 'Problem Solving',
                description: 'Finding solutions to challenges',
                icon: '🧩',
                maxLevel: 100,
                category: 'technical',
                unlockLevel: 10
            },
            patternRecognition: {
                name: 'Pattern Recognition',
                description: 'Identifying trends and sequences',
                icon: '🔢',
                maxLevel: 100,
                category: 'technical',
                unlockLevel: 12
            }
        };
    }

    awardSkills(skills) {
        Object.entries(skills).forEach(([skillName, amount]) => {
            this.increaseSkill(skillName, amount);
        });
    }

    increaseSkill(skillName, amount) {
        if (!this.profile.skills[skillName]) {
            this.profile.skills[skillName] = 0;
        }

        const definition = this.skillDefinitions[skillName];
        if (!definition) return;

        const oldValue = this.profile.skills[skillName];
        const newValue = Math.min(
            definition.maxLevel,
            oldValue + amount
        );

        this.profile.skills[skillName] = newValue;

        // Check for level-up milestones
        this.checkSkillMilestones(skillName, oldValue, newValue);

        // Update overall level
        this.updateOverallLevel();
    }

    checkSkillMilestones(skillName, oldValue, newValue) {
        const milestones = [10, 25, 50, 75, 100];

        milestones.forEach(milestone => {
            if (oldValue < milestone && newValue >= milestone) {
                this.triggerSkillMilestone(skillName, milestone);
            }
        });
    }

    triggerSkillMilestone(skillName, milestone) {
        const definition = this.skillDefinitions[skillName];

        // Show notification
        console.log(`🎉 ${definition.name} reached ${milestone}!`);

        // Award bonuses
        if (milestone === 100) {
            // Master bonus
            this.awardMasterBonus(skillName);
        }

        // Unlock new content
        this.checkSkillUnlocks(skillName, milestone);
    }

    awardMasterBonus(skillName) {
        // Mastering a skill unlocks special content
        const bonuses = {
            intelligence: 'Genie grants an extra wish per day',
            wisdom: 'Aziza reveals the location of hidden scrolls',
            patience: 'Time-locked puzzles unlock faster',
            codeReading: 'Access to developer console easter eggs',
            problemSolving: 'Skip hint cooldowns'
        };

        const bonus = bonuses[skillName];
        if (bonus) {
            this.profile.unlocked.push(`master_${skillName}`);
            console.log(`🏆 Master Bonus: ${bonus}`);
        }
    }

    checkSkillUnlocks(skillName, milestone) {
        // Unlock new skills or content based on milestones
        if (skillName === 'curiosity' && milestone >= 25) {
            // Unlock the Doctor's door hint
            this.profile.unlocked.push('doctor_door_hint');
        }

        if (skillName === 'wisdom' && milestone >= 50) {
            // Unlock ancient texts
            this.profile.unlocked.push('ancient_library');
        }

        if (skillName === 'problemSolving' && milestone >= 75) {
            // Unlock master challenges
            this.profile.unlocked.push('master_challenges');
        }
    }

    getOverallLevel() {
        // Calculate overall level from all skills
        const totalSkillPoints = Object.values(this.profile.skills).reduce((sum, val) => sum + val, 0);
        return Math.floor(totalSkillPoints / 50); // Every 50 skill points = 1 level
    }

    updateOverallLevel() {
        const level = this.getOverallLevel();
        const oldLevel = this.profile.level || 0;

        if (level > oldLevel) {
            this.profile.level = level;
            this.handleLevelUp(level);
        }
    }

    handleLevelUp(level) {
        console.log(`🎊 LEVEL UP! You are now level ${level}`);

        // Award level-up bonuses
        const bonuses = {
            5: { content: 'skill_tree', description: 'Skill Tree unlocked' },
            10: { content: 'advanced_npcs', description: 'Advanced NPCs appear' },
            15: { content: 'secret_shop', description: 'Secret Shop discovered' },
            20: { content: 'master_realm', description: 'Master Realm accessible' },
            30: { content: 'ultimate_quest', description: 'Ultimate Quest begins' }
        };

        const bonus = bonuses[level];
        if (bonus) {
            this.profile.unlocked.push(bonus.content);
            this.showLevelUpNotification(level, bonus.description);
        }
    }

    showLevelUpNotification(level, description) {
        // Visual notification
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-glow"></div>
            <div class="level-up-content">
                <div class="level-up-title">LEVEL UP!</div>
                <div class="level-up-level">Level ${level}</div>
                <div class="level-up-unlock">${description}</div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 1000);
        }, 5000);
    }

    getSkillProgress(skillName) {
        const value = this.profile.skills[skillName] || 0;
        const definition = this.skillDefinitions[skillName];

        return {
            name: definition.name,
            icon: definition.icon,
            value,
            maxValue: definition.maxLevel,
            percentage: (value / definition.maxLevel) * 100,
            category: definition.category
        };
    }

    getAllSkillsProgress() {
        return Object.keys(this.skillDefinitions).map(skillName => {
            return {
                id: skillName,
                ...this.getSkillProgress(skillName)
            };
        });
    }

    getSkillsByCategory(category) {
        return Object.entries(this.skillDefinitions)
            .filter(([_, def]) => def.category === category)
            .map(([skillName, _]) => this.getSkillProgress(skillName));
    }

    canUseSkill(skillName, requiredLevel) {
        const currentLevel = this.profile.skills[skillName] || 0;
        return currentLevel >= requiredLevel;
    }

    practiceSkill(skillName, activity) {
        // Passive skill gain from activities
        const practiceGains = {
            reading_time: { wisdom: 0.1, attention: 0.1 },
            hover_duration: { patience: 0.1, curiosity: 0.05 },
            click_speed: { agility: 0.1, speed: 0.1 },
            scroll_exploration: { curiosity: 0.1 },
            code_inspection: { codeReading: 0.2, intelligence: 0.1 }
        };

        const gains = practiceGains[activity];
        if (gains) {
            this.awardSkills(gains);
        }
    }
}
