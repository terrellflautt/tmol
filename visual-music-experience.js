// 🎵 Visual Music Experience System 🎨
// Synchronized background visuals that move and change with music

class VisualMusicExperience {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.isVisualizationActive = false;
        this.currentVisualization = 'waves';
        this.hoverPlayer = null;
        this.currentAudio = null;
        this.colorPalettes = this.initializeColorPalettes();
        this.musicTracks = this.initializeMusicTracks();
        this.animationId = null;

        this.initializeSystem();
    }

    initializeColorPalettes() {
        return {
            transcendental: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
            healing: ['#a8edea', '#fed6e3', '#ffecd2', '#fcb69f'],
            mystical: ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'],
            cosmic: ['#fa709a', '#fee140', '#667eea', '#764ba2'],
            nature: ['#56ab2f', '#a8e6cf', '#ffd3a5', '#fd9853'],
            ethereal: ['#ee9ca7', '#ffdde1', '#667eea', '#764ba2']
        };
    }

    initializeMusicTracks() {
        return [
            {
                id: 'transcendental_journey',
                title: 'Transcendental Journey',
                file: 'https://www.soundjay.com/misc/sounds/magic-chime-02.wav',
                visualization: 'cosmic_particles',
                palette: 'transcendental'
            },
            {
                id: 'healing_waves',
                title: 'Healing Waves',
                file: 'https://www.soundjay.com/misc/sounds/wind-chime.wav',
                visualization: 'flowing_waves',
                palette: 'healing'
            },
            {
                id: 'mystical_awakening',
                title: 'Mystical Awakening',
                file: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
                visualization: 'geometric_mandala',
                palette: 'mystical'
            }
        ];
    }

    async initializeSystem() {
        this.createCanvas();
        await this.initializeAudio();
        this.setupEventListeners();
        console.log('🎵 Visual Music Experience System initialized');
    }

    createCanvas() {
        // Create full-screen canvas for background visuals
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'visual-music-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            opacity: 0;
            transition: opacity 2s ease;
            pointer-events: none;
        `;

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();

        document.body.appendChild(this.canvas);

        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    async initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

            // Resume context if suspended
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
        } catch (error) {
            console.warn('Audio context initialization failed:', error);
        }
    }

    setupEventListeners() {
        // Listen for major achievements to trigger music player
        document.addEventListener('majorAchievement', (e) => {
            this.showHoverMusicPlayer(e.detail);
        });

        // Listen for difficult progress completion
        document.addEventListener('difficultProgress', (e) => {
            this.showHoverMusicPlayer(e.detail);
        });

        // Listen for honest answers to difficult questions
        document.addEventListener('honestAnswer', (e) => {
            this.showHoverMusicPlayer(e.detail);
        });
    }

    showHoverMusicPlayer(context = {}) {
        // Don't show if already active
        if (this.hoverPlayer && document.body.contains(this.hoverPlayer)) {
            return;
        }

        const trackIndex = Math.floor(Math.random() * this.musicTracks.length);
        const track = this.musicTracks[trackIndex];

        this.hoverPlayer = document.createElement('div');
        this.hoverPlayer.className = 'hover-music-player';
        this.hoverPlayer.innerHTML = `
            <div class="music-player-content">
                <div class="music-icon">🎵</div>
                <div class="music-info">
                    <div class="music-title">${track.title}</div>
                    <div class="music-subtitle">Unlock Visual Experience</div>
                </div>
                <button class="play-btn" data-track-id="${track.id}">▶️</button>
                <button class="close-btn">✕</button>
            </div>
        `;

        // Position randomly but visibly
        const x = Math.random() * (window.innerWidth - 300) + 50;
        const y = Math.random() * (window.innerHeight - 150) + 100;

        this.hoverPlayer.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 280px;
            height: 80px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
            border-radius: 15px;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: floatIn 1s ease-out;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        `;

        // Add styles if not already added
        if (!document.getElementById('hover-music-styles')) {
            const styles = document.createElement('style');
            styles.id = 'hover-music-styles';
            styles.textContent = `
                @keyframes floatIn {
                    from {
                        opacity: 0;
                        transform: translateY(50px) scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes floatOut {
                    from {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(-50px) scale(0.8);
                    }
                }

                .hover-music-player {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    color: white;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }

                .hover-music-player:hover {
                    transform: scale(1.05);
                }

                .music-player-content {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    height: 100%;
                    box-sizing: border-box;
                }

                .music-icon {
                    font-size: 24px;
                    margin-right: 12px;
                    animation: pulse 2s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .music-info {
                    flex: 1;
                    margin-right: 10px;
                }

                .music-title {
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 2px;
                }

                .music-subtitle {
                    font-size: 11px;
                    opacity: 0.8;
                }

                .play-btn {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    font-size: 16px;
                    cursor: pointer;
                    margin-right: 8px;
                    transition: all 0.3s ease;
                }

                .play-btn:hover {
                    background: rgba(255,255,255,0.3);
                    transform: scale(1.1);
                }

                .close-btn {
                    background: rgba(255,255,255,0.1);
                    border: none;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    font-size: 12px;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: all 0.3s ease;
                }

                .close-btn:hover {
                    opacity: 1;
                    background: rgba(255,255,255,0.2);
                }

                .visual-music-canvas {
                    background: radial-gradient(circle at center, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
                }
            `;
            document.head.appendChild(styles);
        }

        // Add event listeners
        const playBtn = this.hoverPlayer.querySelector('.play-btn');
        const closeBtn = this.hoverPlayer.querySelector('.close-btn');

        playBtn.addEventListener('click', () => {
            this.playTrackWithVisuals(track);
            this.hideHoverPlayer();
        });

        closeBtn.addEventListener('click', () => {
            this.hideHoverPlayer();
        });

        // Auto-hide after 15 seconds
        setTimeout(() => {
            if (this.hoverPlayer && document.body.contains(this.hoverPlayer)) {
                this.hideHoverPlayer();
            }
        }, 15000);

        document.body.appendChild(this.hoverPlayer);

        console.log(`🎵 Hover music player shown for track: ${track.title}`);
    }

    hideHoverPlayer() {
        if (this.hoverPlayer) {
            this.hoverPlayer.style.animation = 'floatOut 0.5s ease-in';
            setTimeout(() => {
                if (this.hoverPlayer && this.hoverPlayer.parentNode) {
                    this.hoverPlayer.parentNode.removeChild(this.hoverPlayer);
                }
                this.hoverPlayer = null;
            }, 500);
        }
    }

    async playTrackWithVisuals(track) {
        console.log(`🎵 Starting visual music experience: ${track.title}`);

        try {
            // Start audio
            await this.startAudio(track);

            // Activate visuals
            this.activateVisualExperience(track);

            // Set current visualization type
            this.currentVisualization = track.visualization;

            // Show notification
            this.showVisualizationNotification(track);

        } catch (error) {
            console.error('Failed to start visual music experience:', error);
            this.showFallbackExperience(track);
        }
    }

    async startAudio(track) {
        // For demo purposes, create procedural audio
        // In production, you'd load actual audio files
        this.createProceduralAudio(track);
    }

    createProceduralAudio(track) {
        if (!this.audioContext) return;

        try {
            // Stop any existing audio
            this.stopCurrentAudio();

            // Create oscillators based on track type
            const oscillator1 = this.audioContext.createOscillator();
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            // Configure frequencies based on track
            const frequencies = {
                transcendental_journey: [174, 285], // Healing frequencies
                healing_waves: [396, 417], // Transformation frequencies
                mystical_awakening: [528, 639] // Love and connection frequencies
            };

            const [freq1, freq2] = frequencies[track.id] || [220, 330];

            oscillator1.frequency.value = freq1;
            oscillator2.frequency.value = freq2;
            oscillator1.type = 'sine';
            oscillator2.type = 'triangle';

            // Connect to analyser for visualization
            oscillator1.connect(this.analyser);
            oscillator2.connect(this.analyser);
            this.analyser.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Set volume
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 2);

            // Start oscillators
            oscillator1.start();
            oscillator2.start();

            // Store references
            this.currentAudio = {
                oscillator1,
                oscillator2,
                gainNode,
                startTime: this.audioContext.currentTime
            };

            // Auto-stop after 2 minutes
            setTimeout(() => {
                this.stopVisualization();
            }, 120000);

        } catch (error) {
            console.warn('Procedural audio creation failed:', error);
        }
    }

    stopCurrentAudio() {
        if (this.currentAudio) {
            try {
                this.currentAudio.oscillator1?.stop();
                this.currentAudio.oscillator2?.stop();
            } catch (error) {
                // Oscillators may already be stopped
            }
            this.currentAudio = null;
        }
    }

    activateVisualExperience(track) {
        this.isVisualizationActive = true;
        this.canvas.style.opacity = '1';

        // Start animation loop
        this.animate(track);

        console.log(`🎨 Visual experience activated: ${track.visualization}`);
    }

    animate(track) {
        if (!this.isVisualizationActive) return;

        this.animationId = requestAnimationFrame(() => this.animate(track));

        // Get audio data
        if (this.analyser && this.dataArray) {
            this.analyser.getByteFrequencyData(this.dataArray);
        }

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw visualization based on type
        switch (track.visualization) {
            case 'cosmic_particles':
                this.drawCosmicParticles(track);
                break;
            case 'flowing_waves':
                this.drawFlowingWaves(track);
                break;
            case 'geometric_mandala':
                this.drawGeometricMandala(track);
                break;
            default:
                this.drawDefaultVisualization(track);
        }
    }

    drawCosmicParticles(track) {
        const colors = this.colorPalettes[track.palette];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const time = Date.now() * 0.001;

        // Draw background gradient
        const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(centerX, centerY));
        gradient.addColorStop(0, `${colors[0]}10`);
        gradient.addColorStop(1, `${colors[1]}05`);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw particles
        for (let i = 0; i < 100; i++) {
            const angle = (i / 100) * Math.PI * 2 + time * 0.5;
            const radius = 50 + Math.sin(time + i * 0.1) * 200;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            const audioIntensity = this.dataArray ? this.dataArray[i % this.dataArray.length] / 255 : Math.sin(time + i);
            const size = 2 + audioIntensity * 8;

            this.ctx.fillStyle = colors[i % colors.length] + '80';
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawFlowingWaves(track) {
        const colors = this.colorPalettes[track.palette];
        const time = Date.now() * 0.001;

        this.ctx.globalAlpha = 0.8;

        for (let wave = 0; wave < 3; wave++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = colors[wave % colors.length];
            this.ctx.lineWidth = 3;

            for (let x = 0; x < this.canvas.width; x += 2) {
                const audioData = this.dataArray ? this.dataArray[(x + wave * 20) % this.dataArray.length] / 255 : 0.5;
                const y = this.canvas.height / 2 +
                         Math.sin(x * 0.01 + time + wave) * 100 * (1 + audioData) +
                         Math.sin(x * 0.005 + time * 1.5) * 50;

                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        }

        this.ctx.globalAlpha = 1;
    }

    drawGeometricMandala(track) {
        const colors = this.colorPalettes[track.palette];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const time = Date.now() * 0.001;

        this.ctx.save();
        this.ctx.translate(centerX, centerY);

        for (let layer = 0; layer < 5; layer++) {
            const sides = 6 + layer * 2;
            const radius = 50 + layer * 40;
            const audioBoost = this.dataArray ? (this.dataArray[layer * 10] / 255) : 0.5;
            const currentRadius = radius * (1 + audioBoost * 0.5);

            this.ctx.beginPath();
            this.ctx.strokeStyle = colors[layer % colors.length] + '60';
            this.ctx.lineWidth = 2;

            for (let i = 0; i <= sides; i++) {
                const angle = (i / sides) * Math.PI * 2 + time * (layer + 1) * 0.1;
                const x = Math.cos(angle) * currentRadius;
                const y = Math.sin(angle) * currentRadius;

                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        }

        this.ctx.restore();
    }

    drawDefaultVisualization(track) {
        // Fallback visualization
        this.drawCosmicParticles(track);
    }

    showVisualizationNotification(track) {
        const notification = document.createElement('div');
        notification.className = 'visualization-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">🎨</div>
                <div class="notification-text">
                    <div class="notification-title">Visual Experience Active</div>
                    <div class="notification-subtitle">${track.title}</div>
                </div>
                <button class="stop-visualization-btn">Stop</button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(30,30,30,0.8));
            color: white;
            padding: 15px;
            border-radius: 10px;
            z-index: 10001;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            animation: slideInFromRight 0.5s ease-out;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        // Add slide-in animation if not already defined
        if (!document.querySelector('style[data-visual-notifications]')) {
            const style = document.createElement('style');
            style.setAttribute('data-visual-notifications', 'true');
            style.textContent = `
                @keyframes slideInFromRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .notification-icon {
                    font-size: 24px;
                }
                .notification-title {
                    font-weight: 600;
                    font-size: 14px;
                }
                .notification-subtitle {
                    font-size: 12px;
                    opacity: 0.7;
                    margin-top: 2px;
                }
                .stop-visualization-btn {
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.3s ease;
                }
                .stop-visualization-btn:hover {
                    background: rgba(255,255,255,0.2);
                }
            `;
            document.head.appendChild(style);
        }

        notification.querySelector('.stop-visualization-btn').addEventListener('click', () => {
            this.stopVisualization();
            notification.remove();
        });

        document.body.appendChild(notification);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 10000);
    }

    showFallbackExperience(track) {
        // Simple CSS-based fallback for when audio fails
        document.body.style.background = `linear-gradient(45deg, ${this.colorPalettes[track.palette].join(', ')})`;
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientShift 10s ease infinite';

        // Add animation if not present
        if (!document.querySelector('style[data-fallback-animations]')) {
            const style = document.createElement('style');
            style.setAttribute('data-fallback-animations', 'true');
            style.textContent = `
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
        }

        console.log('🎨 Fallback visual experience activated');
    }

    stopVisualization() {
        this.isVisualizationActive = false;
        this.canvas.style.opacity = '0';

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        this.stopCurrentAudio();

        // Reset background
        document.body.style.background = '';
        document.body.style.animation = '';

        console.log('🎨 Visual music experience stopped');
    }

    // Integration methods for triggering the system
    triggerForMajorAchievement(achievement) {
        document.dispatchEvent(new CustomEvent('majorAchievement', {
            detail: { type: 'achievement', data: achievement }
        }));
    }

    triggerForDifficultProgress(progress) {
        document.dispatchEvent(new CustomEvent('difficultProgress', {
            detail: { type: 'progress', data: progress }
        }));
    }

    triggerForHonestAnswer(answer) {
        document.dispatchEvent(new CustomEvent('honestAnswer', {
            detail: { type: 'answer', data: answer }
        }));
    }
}

// Initialize the visual music experience system
window.visualMusicExperience = new VisualMusicExperience();

// Export for use in other systems
window.VisualMusicExperience = VisualMusicExperience;