// Persistent User System for terrellflautt.com
// Works completely anonymously OR with optional Google OAuth
// Progress survives cache clears, browser changes, website updates

class UserSystem {
    constructor() {
        this.currentUser = null;
        this.persistentId = null; // Always exists, survives everything
        this.progress = {
            discoveries: [],
            visits: 1,
            sessionTime: 0,
            firstVisit: Date.now(),
            totalTime: 0
        };
        this.init();
    }

    async init() {
        // Step 1: Ensure we have a permanent ID (browser fingerprint + fallback)
        await this.ensurePersistentId();

        // Step 2: Load any existing user account
        await this.loadUserAccount();

        // Step 3: Load progress (anonymous or registered)
        await this.loadProgress();

        // Step 4: Set up optional registration prompts
        this.setupRegistrationPrompts();

        console.log(`🎮 User System Ready - ID: ${this.persistentId.slice(-8)}`);
    }

    async ensurePersistentId() {
        // Create a unique ID that survives cache clears
        let persistentId = localStorage.getItem('terrellflautt_persistent_id');

        if (!persistentId) {
            // Generate browser fingerprint + UUID
            const fingerprint = await this.generateBrowserFingerprint();
            const uuid = this.generateUUID();
            persistentId = `${fingerprint}_${uuid}`;

            localStorage.setItem('terrellflautt_persistent_id', persistentId);

            // Also store in multiple places for redundancy
            this.storeInMultipleLocations(persistentId);
        }

        this.persistentId = persistentId;
    }

    async generateBrowserFingerprint() {
        // Create a semi-persistent browser fingerprint
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('terrellflautt.com', 2, 2);

        const fingerprint = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset(),
            canvas.toDataURL(),
            navigator.hardwareConcurrency || 0,
            navigator.deviceMemory || 0
        ].join('|');

        // Create hash
        let hash = 0;
        for (let i = 0; i < fingerprint.length; i++) {
            const char = fingerprint.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }

        return Math.abs(hash).toString(36);
    }

    generateUUID() {
        return 'xxxx-xxxx-xxxx'.replace(/[x]/g, () =>
            (Math.random() * 16 | 0).toString(16)
        );
    }

    storeInMultipleLocations(persistentId) {
        // Store in multiple places for maximum persistence
        try {
            sessionStorage.setItem('terrellflautt_backup_id', persistentId);

            // Store in IndexedDB for even more persistence
            this.storeInIndexedDB(persistentId);

            // Store in URL hash briefly for cross-tab communication
            if (window.location.hash === '') {
                window.history.replaceState(null, null, '#' + btoa(persistentId).slice(0, 8));
                setTimeout(() => {
                    window.history.replaceState(null, null, ' ');
                }, 1000);
            }
        } catch (error) {
            console.log('Additional storage failed, localStorage should be sufficient');
        }
    }

    async storeInIndexedDB(persistentId) {
        try {
            const request = indexedDB.open('TerrellFlautt', 1);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('userData')) {
                    db.createObjectStore('userData');
                }
            };
            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction(['userData'], 'readwrite');
                const store = transaction.objectStore('userData');
                store.put(persistentId, 'persistentId');
            };
        } catch (error) {
            // IndexedDB not available, no problem
        }
    }

    async loadUserAccount() {
        const userData = localStorage.getItem('terrellflautt_user_account');
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
            } catch (error) {
                console.log('Error loading user account data');
            }
        }
    }

    async loadProgress() {
        // Load progress using persistent ID (works for anonymous + registered users)
        const progressKey = `progress_${this.persistentId}`;
        const savedProgress = localStorage.getItem(progressKey);

        if (savedProgress) {
            try {
                const parsed = JSON.parse(savedProgress);
                this.progress = {
                    ...this.progress,
                    ...parsed,
                    visits: (parsed.visits || 0) + 1,
                    lastVisit: Date.now()
                };
            } catch (error) {
                console.log('Error loading progress data');
            }
        }

        // Save updated visit count
        this.saveProgress();
    }

    saveProgress() {
        const progressKey = `progress_${this.persistentId}`;
        localStorage.setItem(progressKey, JSON.stringify(this.progress));

        // Also save to hall of fame data
        this.updateHallOfFameEntry();
    }

    updateHallOfFameEntry() {
        const leaderboardData = JSON.parse(localStorage.getItem('terrellflautt_leaderboard') || '[]');

        const userEntry = {
            id: this.persistentId,
            username: this.currentUser ? this.currentUser.username : `Explorer_${this.persistentId.slice(-6)}`,
            isRegistered: !!this.currentUser,
            isAnonymous: !this.currentUser,
            discoveries: this.progress.discoveries.length,
            visits: this.progress.visits,
            totalTime: this.progress.totalTime,
            achievementLevel: this.calculateAchievementLevel(),
            explorationStyle: this.determineExplorationStyle(),
            lastActive: Date.now(),
            joinDate: this.progress.firstVisit,
            streak: this.calculateDiscoveryStreak()
        };

        // Update or add entry
        const existingIndex = leaderboardData.findIndex(entry => entry.id === this.persistentId);
        if (existingIndex >= 0) {
            leaderboardData[existingIndex] = userEntry;
        } else {
            leaderboardData.push(userEntry);
        }

        // Sort by discoveries, then by join date
        leaderboardData.sort((a, b) => {
            if (b.discoveries !== a.discoveries) {
                return b.discoveries - a.discoveries;
            }
            return a.joinDate - b.joinDate;
        });

        localStorage.setItem('terrellflautt_leaderboard', JSON.stringify(leaderboardData));
    }

    setupRegistrationPrompts() {
        // Show registration prompt after significant engagement
        setTimeout(() => {
            if (!this.currentUser && this.progress.discoveries.length >= 3) {
                this.showRegistrationOffer();
            }
        }, 5 * 60 * 1000); // After 5 minutes with 3+ discoveries
    }

    showRegistrationOffer() {
        const modal = document.createElement('div');
        modal.className = 'registration-offer-modal';
        modal.innerHTML = `
            <div class="offer-overlay"></div>
            <div class="offer-content">
                <h3>🏆 Claim Your Place in the Hall of Fame</h3>
                <div class="current-stats">
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
                        <span class="label">Achievement</span>
                    </div>
                </div>

                <p>Your progress is already saved forever! Want to appear on the public leaderboard?</p>

                <div class="registration-options">
                    <button class="google-auth-btn" id="googleAuthBtn">
                        <span class="google-icon">🔐</span>
                        Sign in with Google
                    </button>

                    <div class="or-divider">or</div>

                    <div class="username-option">
                        <input type="text"
                               id="customUsername"
                               placeholder="Choose a username"
                               maxlength="20"
                               pattern="^[a-zA-Z0-9_-]+$">
                        <button id="usernameSubmit">Claim Username</button>
                    </div>
                </div>

                <div class="benefits">
                    <p>✅ Progress already saved forever (anonymous or registered)</p>
                    <p>🏆 Public leaderboard appearance (optional)</p>
                    <p>🎯 Personalized achievement badges</p>
                </div>

                <button class="continue-anonymous" id="continueAnonymous">
                    Continue Anonymously
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        // Setup event listeners
        modal.querySelector('#googleAuthBtn').addEventListener('click', () => {
            this.initiateGoogleAuth();
        });

        modal.querySelector('#usernameSubmit').addEventListener('click', () => {
            const username = modal.querySelector('#customUsername').value;
            if (this.validateUsername(username)) {
                this.registerWithUsername(username);
                modal.remove();
            }
        });

        modal.querySelector('#continueAnonymous').addEventListener('click', () => {
            modal.remove();
            console.log('👻 Continuing anonymously - progress still tracked forever!');
        });

        modal.querySelector('.offer-overlay').addEventListener('click', () => {
            modal.querySelector('#continueAnonymous').click();
        });
    }

    async initiateGoogleAuth() {
        try {
            // Initialize Google Auth (you'll need to add Google OAuth script to index.html)
            if (typeof google !== 'undefined' && google.accounts) {
                google.accounts.id.initialize({
                    client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual client ID
                    callback: this.handleGoogleAuth.bind(this)
                });

                google.accounts.id.prompt();
            } else {
                // Fallback if Google Auth not loaded
                alert('Google Auth not available. Please choose a username instead.');
            }
        } catch (error) {
            console.error('Google Auth failed:', error);
            alert('Google Auth failed. Please choose a username instead.');
        }
    }

    handleGoogleAuth(response) {
        try {
            const credential = JSON.parse(atob(response.credential.split('.')[1]));
            const username = credential.email.split('@')[0]; // Use email prefix as username

            this.registerWithUsername(username, true, credential.email);
        } catch (error) {
            console.error('Google Auth processing failed:', error);
        }
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

        // Check if username is taken (in leaderboard)
        const leaderboard = JSON.parse(localStorage.getItem('terrellflautt_leaderboard') || '[]');
        const taken = leaderboard.some(entry =>
            entry.username.toLowerCase() === username.toLowerCase() &&
            entry.id !== this.persistentId
        );

        if (taken) {
            alert('Username already taken. Please choose another.');
            return false;
        }

        return true;
    }

    registerWithUsername(username, isGoogleAuth = false, email = null) {
        this.currentUser = {
            username: username,
            isGoogleAuth: isGoogleAuth,
            email: email,
            registrationDate: Date.now(),
            persistentId: this.persistentId
        };

        localStorage.setItem('terrellflautt_user_account', JSON.stringify(this.currentUser));
        this.updateHallOfFameEntry();

        this.showSuccessMessage(username);
        console.log(`🎉 Welcome to the Hall of Fame, ${username}!`);
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

            console.log(`🌟 Discovery added: ${title} (Total: ${this.progress.discoveries.length})`);
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

    calculateDiscoveryStreak() {
        if (this.progress.discoveries.length === 0) return 0;

        let streak = 0;
        const recentDiscoveries = this.progress.discoveries.slice(-5);
        const hourAgo = Date.now() - (60 * 60 * 1000);

        for (let i = recentDiscoveries.length - 1; i >= 0; i--) {
            if (recentDiscoveries[i].timestamp > hourAgo) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }

    showSuccessMessage(username) {
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.innerHTML = `
            <span class="toast-icon">🎉</span>
            <div class="toast-text">
                <strong>Welcome to the Hall of Fame, ${username}!</strong>
                <p>Your progress is now linked to your username</p>
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getCurrentProgress() {
        return this.progress;
    }

    // Get leaderboard for hall of fame
    getLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('terrellflautt_leaderboard') || '[]');
        return leaderboard.slice(0, 50); // Top 50
    }

    // Get current user's rank
    getCurrentRank() {
        const leaderboard = this.getLeaderboard();
        const userIndex = leaderboard.findIndex(entry => entry.id === this.persistentId);
        return userIndex >= 0 ? userIndex + 1 : null;
    }
}

// Initialize the user system
window.userSystem = new UserSystem();