/**
 * PERSISTENT USER DATA MANAGEMENT SYSTEM
 * Preserves user progress through updates, deployments, and browser changes
 */

class PersistentDataManager {
    constructor() {
        this.version = '2.0.0';
        this.cloudEndpoint = 'https://api.terrellflautt.com/user-profile';
        this.backupEndpoint = 'https://api.terrellflautt.com/backup-user-data';
        this.storageKeys = [
            // Core user identity
            'magicId',
            'userId',
            'userFingerprint',

            // Easter egg progress
            'aziza_riddle_solved_',
            'aziza_lamp_gifted_',
            'aziza_riddle_partial_',
            'konamiCode',
            'techKingReveal',
            'matrixMode',

            // Discovery tracking
            'easterEggsFound',
            'discoveries_',
            'magic_discoveries_',
            'userJourney_',

            // Session evolution
            'sessionEvolution',
            'hiddenInteractions',
            'patternDetection',

            // Genie interaction history
            'genie_questions_',
            'genie_daily_count_',

            // Logo evolution state
            'logoState',
            'logoEvolution',

            // Transcendental journey
            'transcendental_complete',
            'personality_type',
            'healing_journey_',

            // Voting and leaderboard
            'hasVoted',
            'votingHistory',
            'leaderboard_',

            // Feature flags and preferences
            'featureFlags',
            'userPreferences',
            'accessibility_'
        ];

        this.init();
    }

    init() {
        console.log('💾 Initializing Persistent Data Manager v' + this.version);

        // Check for data migration needs
        this.checkMigrationNeeds();

        // Setup auto-backup
        this.setupAutoBackup();

        // Setup cloud sync
        this.setupCloudSync();

        // Setup emergency recovery
        this.setupEmergencyRecovery();

        console.log('✅ Persistent Data Manager ready');
    }

    // === DATA COLLECTION ===

    collectAllUserData() {
        const userData = {
            version: this.version,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            data: {}
        };

        // Collect localStorage data
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const isRelevant = this.storageKeys.some(pattern =>
                key.startsWith(pattern) || key.includes(pattern.replace('_', ''))
            );

            if (isRelevant) {
                try {
                    const value = localStorage.getItem(key);
                    userData.data[key] = JSON.parse(value);
                } catch {
                    const value = localStorage.getItem(key);
                    userData.data[key] = value; // Store as string if not JSON
                }
            }
        }

        // Collect sessionStorage data
        userData.sessionData = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key.includes('easter') || key.includes('magic') || key.includes('discovery')) {
                try {
                    userData.sessionData[key] = JSON.parse(sessionStorage.getItem(key));
                } catch {
                    userData.sessionData[key] = sessionStorage.getItem(key);
                }
            }
        }

        // Collect current system state
        userData.systemState = this.captureSystemState();

        return userData;
    }

    captureSystemState() {
        return {
            logoState: document.querySelector('.logo')?.textContent || '',
            easterEggsVisible: document.querySelectorAll('.easter-egg-message').length,
            currentLevel: this.detectCurrentLevel(),
            interactions: window.hiddenInteractionEngine?.sessionEvolution || {},
            discoveries: window.magicUser?.discoveries || {},
            genieUnlocked: !!document.querySelector('.genie-lamp'),
            transcendentalActive: !!document.querySelector('.transcendental-overlay')
        };
    }

    detectCurrentLevel() {
        const discoveries = Object.keys(localStorage).filter(key =>
            key.includes('easter') || key.includes('discovery')
        ).length;

        if (discoveries === 0) return 1;
        if (discoveries <= 3) return 2;
        if (discoveries <= 6) return 3;
        if (discoveries <= 10) return 4;
        if (discoveries <= 15) return 5;
        return 6;
    }

    // === BACKUP STRATEGIES ===

    setupAutoBackup() {
        // Backup every 5 minutes during active usage
        this.backupInterval = setInterval(() => {
            if (document.hasFocus()) {
                this.createLocalBackup();
            }
        }, 5 * 60 * 1000);

        // Backup on major events
        window.addEventListener('beforeunload', () => {
            this.createEmergencyBackup();
        });

        // Backup on easter egg discoveries
        this.setupDiscoveryBackup();
    }

    createLocalBackup() {
        const userData = this.collectAllUserData();
        const backupKey = `backup_${Date.now()}`;

        try {
            localStorage.setItem(backupKey, JSON.stringify(userData));

            // Keep only last 5 local backups
            this.cleanupOldBackups();

            console.log('📦 Local backup created:', backupKey);
        } catch (error) {
            console.warn('Failed to create local backup:', error);
        }
    }

    createEmergencyBackup() {
        const userData = this.collectAllUserData();
        sessionStorage.setItem('emergency_backup', JSON.stringify(userData));

        // Also try to send to cloud immediately
        this.sendToCloud(userData, true);
    }

    cleanupOldBackups() {
        const backupKeys = Object.keys(localStorage)
            .filter(key => key.startsWith('backup_'))
            .sort()
            .reverse();

        // Keep only the 5 most recent
        if (backupKeys.length > 5) {
            backupKeys.slice(5).forEach(key => {
                localStorage.removeItem(key);
            });
        }
    }

    setupDiscoveryBackup() {
        // Intercept discovery events to trigger backups
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = (key, value) => {
            originalSetItem.call(localStorage, key, value);

            // Backup on important discoveries
            if (this.storageKeys.some(pattern => key.includes(pattern))) {
                setTimeout(() => this.createLocalBackup(), 1000);
                setTimeout(() => this.syncToCloud(), 2000);
            }
        };
    }

    // === CLOUD SYNCHRONIZATION ===

    setupCloudSync() {
        // Sync to cloud every 10 minutes
        setInterval(() => {
            this.syncToCloud();
        }, 10 * 60 * 1000);

        // Immediate sync on page load (after delay)
        setTimeout(() => {
            this.syncToCloud();
        }, 5000);
    }

    async syncToCloud() {
        if (!navigator.onLine) {
            console.log('📡 Offline - skipping cloud sync');
            return;
        }

        const userData = this.collectAllUserData();
        return this.sendToCloud(userData);
    }

    async sendToCloud(userData, emergency = false) {
        try {
            const endpoint = emergency ? this.backupEndpoint : this.cloudEndpoint;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...userData,
                    emergency,
                    userId: userData.data.userId || userData.data.magicId || this.generateUserId()
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('☁️ Cloud sync successful:', result.timestamp);
                localStorage.setItem('last_cloud_sync', Date.now().toString());
                return result;
            } else {
                throw new Error(`Cloud sync failed: ${response.status}`);
            }
        } catch (error) {
            console.warn('☁️ Cloud sync failed:', error.message);
            // Store failed sync for retry
            this.queueFailedSync(userData);
        }
    }

    queueFailedSync(userData) {
        const failedSyncs = JSON.parse(localStorage.getItem('failed_syncs') || '[]');
        failedSyncs.push({
            data: userData,
            timestamp: Date.now(),
            retries: 0
        });

        // Keep only last 10 failed syncs
        if (failedSyncs.length > 10) {
            failedSyncs.splice(0, failedSyncs.length - 10);
        }

        localStorage.setItem('failed_syncs', JSON.stringify(failedSyncs));
    }

    async retryFailedSyncs() {
        const failedSyncs = JSON.parse(localStorage.getItem('failed_syncs') || '[]');
        const successful = [];

        for (const sync of failedSyncs) {
            if (sync.retries < 3) {
                sync.retries++;
                const result = await this.sendToCloud(sync.data);
                if (result) {
                    successful.push(sync);
                }
            }
        }

        // Remove successful syncs
        const remaining = failedSyncs.filter(sync => !successful.includes(sync));
        localStorage.setItem('failed_syncs', JSON.stringify(remaining));

        console.log(`🔄 Retried ${successful.length} failed syncs`);
    }

    // === DATA RECOVERY ===

    setupEmergencyRecovery() {
        // Check for recovery needs on startup
        this.checkRecoveryNeeds();

        // Setup recovery UI
        this.setupRecoveryUI();
    }

    checkRecoveryNeeds() {
        const hasUserData = this.storageKeys.some(pattern => {
            return Object.keys(localStorage).some(key => key.includes(pattern));
        });

        if (!hasUserData) {
            console.log('🔍 No user data found - checking for recovery options');
            this.attemptRecovery();
        }
    }

    async attemptRecovery() {
        // Try emergency backup first
        const emergencyBackup = sessionStorage.getItem('emergency_backup');
        if (emergencyBackup) {
            console.log('🚨 Found emergency backup - restoring...');
            this.restoreFromBackup(JSON.parse(emergencyBackup));
            return;
        }

        // Try local backups
        const localBackup = this.getLatestLocalBackup();
        if (localBackup) {
            console.log('📦 Found local backup - restoring...');
            this.restoreFromBackup(localBackup);
            return;
        }

        // Try cloud recovery
        await this.attemptCloudRecovery();
    }

    getLatestLocalBackup() {
        const backupKeys = Object.keys(localStorage)
            .filter(key => key.startsWith('backup_'))
            .sort()
            .reverse();

        if (backupKeys.length > 0) {
            const latestKey = backupKeys[0];
            return JSON.parse(localStorage.getItem(latestKey));
        }

        return null;
    }

    async attemptCloudRecovery() {
        try {
            const userId = this.getUserId();
            if (!userId) {
                console.log('🔍 No user ID found - cannot attempt cloud recovery');
                return;
            }

            const response = await fetch(`${this.cloudEndpoint}/${userId}`);
            if (response.ok) {
                const cloudData = await response.json();
                console.log('☁️ Found cloud backup - restoring...');
                this.restoreFromBackup(cloudData);
            }
        } catch (error) {
            console.warn('☁️ Cloud recovery failed:', error.message);
        }
    }

    restoreFromBackup(backupData) {
        try {
            // Clear existing data
            this.clearUserData();

            // Restore localStorage data
            Object.entries(backupData.data || {}).forEach(([key, value]) => {
                try {
                    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
                } catch (error) {
                    console.warn(`Failed to restore ${key}:`, error);
                }
            });

            // Restore sessionStorage data
            Object.entries(backupData.sessionData || {}).forEach(([key, value]) => {
                try {
                    sessionStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
                } catch (error) {
                    console.warn(`Failed to restore session ${key}:`, error);
                }
            });

            console.log('✅ User data restored successfully');
            this.showRecoveryNotification('Data restored successfully!');

            // Trigger page refresh to apply restored state
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error('❌ Failed to restore backup:', error);
            this.showRecoveryNotification('Recovery failed - please contact support');
        }
    }

    clearUserData() {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (this.storageKeys.some(pattern => key.includes(pattern))) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }

    // === MIGRATION SYSTEM ===

    checkMigrationNeeds() {
        const currentVersion = localStorage.getItem('data_version') || '1.0.0';

        if (currentVersion !== this.version) {
            console.log(`🔄 Migration needed: ${currentVersion} → ${this.version}`);
            this.performMigration(currentVersion);
        }
    }

    performMigration(fromVersion) {
        // Create backup before migration
        this.createLocalBackup();

        // Migration logic based on version
        if (fromVersion === '1.0.0') {
            this.migrateFrom1_0_0();
        }

        // Update version
        localStorage.setItem('data_version', this.version);
        console.log('✅ Migration completed');
    }

    migrateFrom1_0_0() {
        // Example migration: rename old keys
        const oldKeys = {
            'easter_eggs_found': 'easterEggsFound',
            'magic_user_id': 'magicId',
            'riddle_solved': 'aziza_riddle_solved_'
        };

        Object.entries(oldKeys).forEach(([oldKey, newKey]) => {
            const value = localStorage.getItem(oldKey);
            if (value) {
                localStorage.setItem(newKey, value);
                localStorage.removeItem(oldKey);
            }
        });
    }

    // === UTILITY METHODS ===

    getUserId() {
        return localStorage.getItem('userId') ||
               localStorage.getItem('magicId') ||
               this.generateUserId();
    }

    generateUserId() {
        const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', userId);
        return userId;
    }

    setupRecoveryUI() {
        // Add recovery button to page
        const recoveryButton = document.createElement('button');
        recoveryButton.textContent = '🔄 Recover Data';
        recoveryButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            z-index: 9999;
            display: none;
        `;

        recoveryButton.addEventListener('click', () => {
            this.showRecoveryDialog();
        });

        document.body.appendChild(recoveryButton);

        // Show button if no user data found
        setTimeout(() => {
            const hasData = this.storageKeys.some(pattern => {
                return Object.keys(localStorage).some(key => key.includes(pattern));
            });

            if (!hasData) {
                recoveryButton.style.display = 'block';
            }
        }, 5000);
    }

    showRecoveryDialog() {
        const dialog = document.createElement('div');
        dialog.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        dialog.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px;">
                <h3>🔄 Data Recovery</h3>
                <p>We can try to recover your progress from:</p>
                <button onclick="this.closest('div').nextSibling.attemptRecovery()">🚨 Emergency Backup</button>
                <button onclick="this.closest('div').nextSibling.getLatestLocalBackup()">📦 Local Backup</button>
                <button onclick="this.closest('div').nextSibling.attemptCloudRecovery()">☁️ Cloud Backup</button>
                <button onclick="this.closest('div').parentElement.remove()">❌ Cancel</button>
            </div>
        `;

        dialog.attemptRecovery = () => this.attemptRecovery();
        dialog.getLatestLocalBackup = () => {
            const backup = this.getLatestLocalBackup();
            if (backup) this.restoreFromBackup(backup);
        };
        dialog.attemptCloudRecovery = () => this.attemptCloudRecovery();

        document.body.appendChild(dialog);
    }

    showRecoveryNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 10000;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // === PUBLIC API ===

    async exportUserData() {
        const userData = this.collectAllUserData();
        const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `terrellflautt-backup-${Date.now()}.json`;
        a.click();

        URL.revokeObjectURL(url);
    }

    async importUserData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const userData = JSON.parse(e.target.result);
                    this.restoreFromBackup(userData);
                    resolve(userData);
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    }

    getDataSummary() {
        const userData = this.collectAllUserData();
        return {
            version: userData.version,
            totalKeys: Object.keys(userData.data).length,
            discoveries: Object.keys(userData.data).filter(k => k.includes('discovery')).length,
            easterEggs: Object.keys(userData.data).filter(k => k.includes('easter')).length,
            lastBackup: localStorage.getItem('last_cloud_sync'),
            currentLevel: this.detectCurrentLevel()
        };
    }
}

// Initialize the persistent data manager
const persistentDataManager = new PersistentDataManager();

// Global access
window.persistentDataManager = persistentDataManager;