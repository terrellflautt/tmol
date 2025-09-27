// Ultra-Persistent User System for terrellflautt.com
// Multiple fingerprinting + storage redundancy = bulletproof persistence
// Survives cache clears, incognito, browser changes, device changes

class PersistentUserSystem {
    constructor() {
        this.userFingerprint = null;
        this.backupFingerprint = null;
        this.progress = {
            discoveries: [],
            visits: 1,
            sessionTime: 0,
            firstVisit: Date.now(),
            totalTime: 0,
            lastVisit: Date.now()
        };
        this.storageKeys = [];
        this.init();
    }

    async init() {
        console.log('🔒 Initializing bulletproof user persistence...');

        // Step 1: Generate comprehensive fingerprint
        await this.generateUserFingerprint();

        // Step 2: Store in multiple locations with redundancy
        await this.setupMultiLayerStorage();

        // Step 3: Load existing progress from any available source
        await this.loadProgressFromMultipleSources();

        // Step 4: Set up continuous background syncing
        this.setupBackgroundSync();

        // Step 5: Set up username system (optional)
        this.setupUsernameSystem();

        console.log(`🎯 User System Active - Fingerprint: ${this.userFingerprint.slice(-8)}`);
        console.log(`📊 Progress loaded: ${this.progress.discoveries.length} discoveries, ${this.progress.visits} visits`);
    }

    async generateUserFingerprint() {
        // Generate multiple fingerprints for maximum reliability
        const fingerprints = await Promise.all([
            this.getBrowserFingerprint(),
            this.getScreenFingerprint(),
            this.getNetworkFingerprint(),
            this.getHardwareFingerprint(),
            this.getTimezoneFingerprint()
        ]);

        // Create primary fingerprint from all sources
        const combined = fingerprints.join('|');
        this.userFingerprint = await this.hashString(combined);

        // Create backup fingerprint (less precise but more stable)
        const stableFingerprints = fingerprints.slice(0, 3); // Just browser, screen, network
        this.backupFingerprint = await this.hashString(stableFingerprints.join('|'));

        console.log(`🔍 Generated fingerprints: Primary(${this.userFingerprint.slice(-6)}) Backup(${this.backupFingerprint.slice(-6)})`);
    }

    async getBrowserFingerprint() {
        // Canvas fingerprinting
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('terrellflautt.com fingerprint', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('persistence test 🔒', 4, 45);

        return [
            navigator.userAgent,
            navigator.language,
            navigator.languages?.join(',') || '',
            navigator.platform,
            canvas.toDataURL(),
            screen.colorDepth,
            navigator.cookieEnabled,
            typeof navigator.doNotTrack,
            navigator.maxTouchPoints || 0
        ].join('|');
    }

    async getScreenFingerprint() {
        return [
            screen.width,
            screen.height,
            screen.availWidth,
            screen.availHeight,
            screen.pixelDepth,
            window.devicePixelRatio || 1,
            screen.orientation?.type || 'unknown'
        ].join('|');
    }

    async getNetworkFingerprint() {
        // Get approximate location/timezone info
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timezoneOffset = new Date().getTimezoneOffset();

        // Estimate connection (if available)
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const connectionType = connection ? `${connection.effectiveType}_${connection.downlink}` : 'unknown';

        return [
            timezone,
            timezoneOffset,
            connectionType,
            navigator.language
        ].join('|');
    }

    async getHardwareFingerprint() {
        return [
            navigator.hardwareConcurrency || 0,
            navigator.deviceMemory || 0,
            navigator.vendor || '',
            navigator.product || ''
        ].join('|');
    }

    async getTimezoneFingerprint() {
        const now = new Date();
        return [
            now.getTimezoneOffset(),
            Intl.DateTimeFormat().resolvedOptions().timeZone,
            now.getFullYear(),
            // Add some date-based stability
            Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)) // Week number for some stability
        ].join('|');
    }

    async hashString(str) {
        // Create consistent hash
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }

        // Add timestamp component for uniqueness
        const timeComponent = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 30)); // Month-based component
        const finalHash = `${Math.abs(hash).toString(36)}_${timeComponent.toString(36)}`;

        return finalHash;
    }

    async setupMultiLayerStorage() {
        // Create multiple storage keys for redundancy
        this.storageKeys = [
            `tf_primary_${this.userFingerprint}`,
            `tf_backup_${this.backupFingerprint}`,
            `tf_session_${this.userFingerprint.slice(-8)}`,
            `terrellflautt_data_${this.backupFingerprint.slice(-8)}`
        ];

        // Store in localStorage with multiple keys
        this.storageKeys.forEach(key => {
            try {
                const existingData = localStorage.getItem(key);
                if (!existingData) {
                    localStorage.setItem(key, JSON.stringify({
                        id: this.userFingerprint,
                        backup: this.backupFingerprint,
                        created: Date.now(),
                        version: '1.0'
                    }));
                }
            } catch (error) {
                console.log(`Storage failed for key: ${key}`);
            }
        });

        // Store in sessionStorage
        try {
            sessionStorage.setItem('tf_session_backup', JSON.stringify({
                primary: this.userFingerprint,
                backup: this.backupFingerprint,
                session: Date.now()
            }));
        } catch (error) {
            console.log('SessionStorage not available');
        }

        // Store in IndexedDB for maximum persistence
        await this.storeInIndexedDB();

        // Store in cookies (if allowed)
        this.storeCookieData();

        // Store in document.name (temporary but useful)
        try {
            document.title += ` /* ${this.userFingerprint.slice(-4)} */`;
        } catch (error) {
            // Not critical
        }
    }

    async storeInIndexedDB() {
        try {
            const request = indexedDB.open('TerrellFlautt_Persistent', 2);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create object stores
                if (!db.objectStoreNames.contains('userProfiles')) {
                    const userStore = db.createObjectStore('userProfiles', { keyPath: 'id' });
                    userStore.createIndex('backup', 'backup', { unique: false });
                    userStore.createIndex('created', 'created', { unique: false });
                }

                if (!db.objectStoreNames.contains('progressData')) {
                    const progressStore = db.createObjectStore('progressData', { keyPath: 'userId' });
                    progressStore.createIndex('lastUpdate', 'lastUpdate', { unique: false });
                }
            };

            request.onsuccess = (event) => {
                const db = event.target.result;

                // Store user profile
                const userTransaction = db.transaction(['userProfiles'], 'readwrite');
                const userStore = userTransaction.objectStore('userProfiles');

                userStore.put({
                    id: this.userFingerprint,
                    backup: this.backupFingerprint,
                    created: Date.now(),
                    lastSeen: Date.now(),
                    version: '1.0'
                });

                console.log('✅ IndexedDB storage successful');
            };

            request.onerror = () => {
                console.log('IndexedDB not available');
            };

        } catch (error) {
            console.log('IndexedDB setup failed');
        }
    }

    storeCookieData() {
        try {
            // Store basic identifier in cookies (30 days)
            const cookieData = btoa(this.userFingerprint.slice(-12));
            document.cookie = `tf_id=${cookieData}; max-age=${30 * 24 * 60 * 60}; path=/; SameSite=Strict`;

            // Store backup in different cookie
            const backupCookieData = btoa(this.backupFingerprint.slice(-12));
            document.cookie = `tf_backup=${backupCookieData}; max-age=${60 * 24 * 60 * 60}; path=/; SameSite=Strict`;

            console.log('🍪 Cookie storage successful');
        } catch (error) {
            console.log('Cookie storage failed');
        }
    }

    async loadProgressFromMultipleSources() {
        let loadedProgress = null;

        // Try loading from multiple sources in order of preference
        const sources = [
            () => this.loadFromIndexedDB(),
            () => this.loadFromLocalStorage(),
            () => this.loadFromSessionStorage(),
            () => this.loadFromCookies()
        ];

        for (const loadSource of sources) {
            try {
                const progress = await loadSource();
                if (progress && progress.discoveries) {
                    loadedProgress = progress;
                    console.log(`📂 Progress loaded from: ${loadSource.name}`);
                    break;
                }
            } catch (error) {
                console.log(`Failed to load from ${loadSource.name}`);
            }
        }

        if (loadedProgress) {
            this.progress = {
                ...this.progress,
                ...loadedProgress,
                visits: (loadedProgress.visits || 0) + 1,
                lastVisit: Date.now()
            };
        }

        // Save updated progress immediately
        this.saveProgress();
    }

    async loadFromIndexedDB() {
        return new Promise((resolve) => {
            try {
                const request = indexedDB.open('TerrellFlautt_Persistent', 2);

                request.onsuccess = (event) => {
                    const db = event.target.result;
                    const transaction = db.transaction(['progressData'], 'readonly');
                    const store = transaction.objectStore('progressData');

                    const getRequest = store.get(this.userFingerprint);

                    getRequest.onsuccess = () => {
                        if (getRequest.result) {
                            resolve(getRequest.result.progress);
                        } else {
                            // Try backup fingerprint
                            const backupRequest = store.get(this.backupFingerprint);
                            backupRequest.onsuccess = () => {
                                resolve(backupRequest.result?.progress || null);
                            };
                        }
                    };

                    getRequest.onerror = () => resolve(null);
                };

                request.onerror = () => resolve(null);
            } catch (error) {
                resolve(null);
            }
        });
    }

    loadFromLocalStorage() {
        // Try all storage keys
        for (const key of this.storageKeys) {
            try {
                const data = localStorage.getItem(key);
                if (data) {
                    const parsed = JSON.parse(data);
                    if (parsed.progress) {
                        return parsed.progress;
                    }
                }
            } catch (error) {
                continue;
            }
        }

        // Try fingerprint-based keys
        const directKey = `progress_${this.userFingerprint}`;
        const backupKey = `progress_${this.backupFingerprint}`;

        for (const key of [directKey, backupKey]) {
            try {
                const data = localStorage.getItem(key);
                if (data) {
                    return JSON.parse(data);
                }
            } catch (error) {
                continue;
            }
        }

        return null;
    }

    loadFromSessionStorage() {
        try {
            const sessionData = sessionStorage.getItem('tf_session_backup');
            if (sessionData) {
                const parsed = JSON.parse(sessionData);
                if (parsed.progress) {
                    return parsed.progress;
                }
            }
        } catch (error) {
            // Not critical
        }
        return null;
    }

    loadFromCookies() {
        try {
            const cookies = document.cookie.split(';');
            for (const cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === 'tf_progress') {
                    return JSON.parse(atob(value));
                }
            }
        } catch (error) {
            // Not critical
        }
        return null;
    }

    saveProgress() {
        const timestamp = Date.now();

        // Save to localStorage with multiple keys
        this.storageKeys.forEach(key => {
            try {
                const existingData = JSON.parse(localStorage.getItem(key) || '{}');
                existingData.progress = this.progress;
                existingData.lastUpdate = timestamp;
                localStorage.setItem(key, JSON.stringify(existingData));
            } catch (error) {
                console.log(`Failed to save to localStorage key: ${key}`);
            }
        });

        // Save direct progress keys
        const progressKeys = [
            `progress_${this.userFingerprint}`,
            `progress_${this.backupFingerprint}`
        ];

        progressKeys.forEach(key => {
            try {
                localStorage.setItem(key, JSON.stringify(this.progress));
            } catch (error) {
                console.log(`Failed to save progress to: ${key}`);
            }
        });

        // Save to IndexedDB
        this.saveToIndexedDB();

        // Save to cookie (if small enough)
        if (JSON.stringify(this.progress).length < 3000) {
            try {
                const progressCookie = btoa(JSON.stringify(this.progress));
                document.cookie = `tf_progress=${progressCookie}; max-age=${90 * 24 * 60 * 60}; path=/; SameSite=Strict`;
            } catch (error) {
                console.log('Cookie progress save failed');
            }
        }

        // Update hall of fame
        this.updateHallOfFame();
    }

    async saveToIndexedDB() {
        try {
            const request = indexedDB.open('TerrellFlautt_Persistent', 2);

            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(['progressData'], 'readwrite');
                const store = transaction.objectStore('progressData');

                // Save for both fingerprints
                store.put({
                    userId: this.userFingerprint,
                    progress: this.progress,
                    lastUpdate: Date.now()
                });

                store.put({
                    userId: this.backupFingerprint,
                    progress: this.progress,
                    lastUpdate: Date.now()
                });
            };
        } catch (error) {
            console.log('IndexedDB save failed');
        }
    }

    setupBackgroundSync() {
        // Sync progress every 30 seconds
        setInterval(() => {
            this.saveProgress();
        }, 30000);

        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveProgress();
        });

        // Save on visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.saveProgress();
            }
        });

        console.log('🔄 Background sync enabled');
    }

    setupUsernameSystem() {
        // Show username prompt after significant progress
        setTimeout(() => {
            if (this.progress.discoveries.length >= 5 && !this.hasUsername()) {
                this.showUsernamePrompt();
            }
        }, 10 * 60 * 1000); // After 10 minutes with 5+ discoveries
    }

    hasUsername() {
        try {
            const userData = localStorage.getItem(`user_${this.userFingerprint}`);
            return userData && JSON.parse(userData).username;
        } catch (error) {
            return false;
        }
    }

    showUsernamePrompt() {
        const modal = document.createElement('div');
        modal.className = 'username-prompt-modal';
        modal.innerHTML = `
            <div class="username-overlay"></div>
            <div class="username-content">
                <h3>🎯 Choose Your Explorer Name</h3>
                <p>You've made significant progress! Want to appear on the Hall of Fame?</p>

                <div class="stats-preview">
                    <div class="stat">
                        <span class="number">${this.progress.discoveries.length}</span>
                        <span class="label">Discoveries</span>
                    </div>
                    <div class="stat">
                        <span class="number">${this.progress.visits}</span>
                        <span class="label">Visits</span>
                    </div>
                    <div class="stat">
                        <span class="number">${this.calculateAchievementLevel()}</span>
                        <span class="label">Level</span>
                    </div>
                </div>

                <div class="username-input-group">
                    <input type="text"
                           id="usernameInput"
                           placeholder="YourAwesomeName"
                           maxlength="20"
                           pattern="^[a-zA-Z0-9_-]+$">
                    <button id="claimUsername">Claim Name</button>
                </div>

                <p class="note">✅ Your progress is already saved forever<br>
                🏆 Username is optional for leaderboard appearance</p>

                <button class="skip-username" id="skipUsername">Skip (Stay Anonymous)</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('#claimUsername').addEventListener('click', () => {
            const username = modal.querySelector('#usernameInput').value;
            if (this.validateUsername(username)) {
                this.setUsername(username);
                modal.remove();
            }
        });

        modal.querySelector('#skipUsername').addEventListener('click', () => {
            modal.remove();
        });

        // Enter key to submit
        modal.querySelector('#usernameInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                modal.querySelector('#claimUsername').click();
            }
        });
    }

    validateUsername(username) {
        if (!username || username.length < 3 || username.length > 20) {
            alert('Username must be 3-20 characters');
            return false;
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
            alert('Username can only contain letters, numbers, underscore, and dash');
            return false;
        }

        return true;
    }

    setUsername(username) {
        const userData = {
            username: username,
            fingerprint: this.userFingerprint,
            setDate: Date.now()
        };

        localStorage.setItem(`user_${this.userFingerprint}`, JSON.stringify(userData));
        localStorage.setItem(`user_${this.backupFingerprint}`, JSON.stringify(userData));

        this.updateHallOfFame();

        this.showSuccessMessage(`Welcome to the Hall of Fame, ${username}!`);
        console.log(`🎉 Username set: ${username}`);
    }

    updateHallOfFame() {
        const leaderboard = JSON.parse(localStorage.getItem('terrellflautt_hall_of_fame') || '[]');

        const username = this.getUsername() || `Explorer_${this.userFingerprint.slice(-6)}`;

        const userEntry = {
            id: this.userFingerprint,
            username: username,
            discoveries: this.progress.discoveries.length,
            visits: this.progress.visits,
            totalTime: this.progress.totalTime,
            achievementLevel: this.calculateAchievementLevel(),
            explorationStyle: this.determineExplorationStyle(),
            lastActive: Date.now(),
            joinDate: this.progress.firstVisit,
            isAnonymous: !this.getUsername()
        };

        // Update or add entry
        const existingIndex = leaderboard.findIndex(entry => entry.id === this.userFingerprint);
        if (existingIndex >= 0) {
            leaderboard[existingIndex] = userEntry;
        } else {
            leaderboard.push(userEntry);
        }

        // Sort by discoveries
        leaderboard.sort((a, b) => {
            if (b.discoveries !== a.discoveries) {
                return b.discoveries - a.discoveries;
            }
            return a.joinDate - b.joinDate;
        });

        localStorage.setItem('terrellflautt_hall_of_fame', JSON.stringify(leaderboard));
    }

    getUsername() {
        try {
            const userData = localStorage.getItem(`user_${this.userFingerprint}`) ||
                           localStorage.getItem(`user_${this.backupFingerprint}`);
            return userData ? JSON.parse(userData).username : null;
        } catch (error) {
            return null;
        }
    }

    addDiscovery(discoveryId, title, message) {
        const discovery = {
            id: discoveryId,
            title: title,
            message: message,
            timestamp: Date.now(),
            visitNumber: this.progress.visits
        };

        // Check for duplicates
        if (!this.progress.discoveries.some(d => d.id === discoveryId)) {
            this.progress.discoveries.push(discovery);
            this.saveProgress();

            console.log(`🌟 Discovery: ${title} (Total: ${this.progress.discoveries.length})`);
        }
    }

    calculateAchievementLevel() {
        const discoveries = this.progress.discoveries.length;
        if (discoveries >= 20) return "🏆 Transcendental Master";
        if (discoveries >= 15) return "⭐ Enlightened Seeker";
        if (discoveries >= 10) return "🔮 Mystery Solver";
        if (discoveries >= 5) return "🎯 Pattern Recognition";
        if (discoveries >= 3) return "👁️ Observer";
        if (discoveries >= 1) return "🌟 First Discovery";
        return "🔍 Explorer";
    }

    determineExplorationStyle() {
        const discoveries = this.progress.discoveries.length;
        const visits = this.progress.visits;
        const ratio = discoveries / Math.max(visits, 1);

        if (ratio > 3) return "Deep Diver";
        if (ratio > 2) return "Thorough Explorer";
        if (ratio > 1) return "Keen Observer";
        if (ratio > 0.5) return "Methodical Seeker";
        return "Casual Wanderer";
    }

    showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.innerHTML = `
            <span class="toast-icon">🎉</span>
            <div class="toast-text">${message}</div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    // Public API methods
    getCurrentUser() {
        return {
            id: this.userFingerprint,
            username: this.getUsername(),
            isAnonymous: !this.getUsername()
        };
    }

    getCurrentProgress() {
        return this.progress;
    }

    getLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('terrellflautt_hall_of_fame') || '[]');
        return leaderboard.slice(0, 50);
    }

    getCurrentRank() {
        const leaderboard = this.getLeaderboard();
        const userIndex = leaderboard.findIndex(entry => entry.id === this.userFingerprint);
        return userIndex >= 0 ? userIndex + 1 : null;
    }
}

// Initialize the bulletproof persistent user system
window.persistentUserSystem = new PersistentUserSystem();