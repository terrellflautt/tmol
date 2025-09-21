// Transcendental Audio System for Synchronized Experiences

class TranscendentalAudio {
    constructor() {
        this.audioContext = null;
        this.currentAudio = null;
        this.isPlaying = false;
        this.volume = 0.7;
        this.fadeInterval = null;
        this.initializeAudio();
    }

    async initializeAudio() {
        try {
            // Create audio context for better control
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Resume context if suspended (required by some browsers)
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
        } catch (error) {
            console.warn('Audio context not available:', error);
            // Fallback to basic HTML5 audio
        }

        // Initialize music platform integrations
        this.musicPlatforms = {
            soundcloud: {
                name: 'SoundCloud',
                tracks: [
                    'https://soundcloud.com/ethereal-meditation/transcendental-journey',
                    'https://soundcloud.com/ambient-spaces/deep-meditation'
                ]
            },
            youtube: {
                name: 'YouTube Music',
                tracks: [
                    'dQw4w9WgXcQ', // Example video ID for meditation music
                    'ZbZSe6N_BXs'  // Another peaceful track
                ]
            },
            apple: {
                name: 'Apple Music',
                tracks: [
                    'https://music.apple.com/us/album/meditation-sounds/1234567890',
                    'https://music.apple.com/us/album/transcendental-journey/0987654321'
                ]
            }
        };
    }

    async playInstrumentalWithText(content, onTextUpdate, onComplete) {
        const poem = content.content;
        const instrumental = content.instrumental;

        try {
            // Start instrumental music
            await this.startInstrumental(instrumental);

            // Display text with gentle timing
            await this.displayTextGently(poem, onTextUpdate);

            // Fade out music and complete
            await this.fadeOutAndStop();

            if (onComplete) onComplete();

        } catch (error) {
            console.error('Error playing instrumental with text:', error);
            if (onComplete) onComplete();
        }
    }

    async playSongWithLyrics(content, onLyricsUpdate, onComplete) {
        const { lyrics, timing, audioFile } = content.content;

        try {
            // Start background music
            await this.startSong(audioFile);

            // Display lyrics synchronized with timing
            await this.displayLyricsSynchronized(lyrics, timing, onLyricsUpdate);

            // Fade out and complete
            await this.fadeOutAndStop();

            if (onComplete) onComplete();

        } catch (error) {
            console.error('Error playing song with lyrics:', error);
            if (onComplete) onComplete();
        }
    }

    async startInstrumental(instrumental) {
        return new Promise((resolve, reject) => {
            // For demo purposes, we'll use generated tones
            // In production, you'd load actual audio files
            this.createAmbientAudio(instrumental.mood);
            this.fadeIn();
            resolve();
        });
    }

    async startSong(audioFile) {
        return new Promise((resolve, reject) => {
            // For demo purposes, we'll use a gentle tone
            // In production, you'd load the actual song file
            this.createMelodicAudio();
            this.fadeIn();
            resolve();
        });
    }

    createAmbientAudio(mood) {
        if (!this.audioContext) {
            // Fallback for browsers without audio context
            this.createSilentAudio();
            return;
        }

        try {
            // Create ambient soundscape based on mood
            const oscillator1 = this.audioContext.createOscillator();
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            // Configure based on mood
            const moodConfigs = {
                healing: { freq1: 174, freq2: 285, wave: 'sine' },
                hopeful: { freq1: 396, freq2: 417, wave: 'sine' },
                inspiring: { freq1: 528, freq2: 639, wave: 'triangle' },
                empowering: { freq1: 741, freq2: 852, wave: 'triangle' }
            };

            const config = moodConfigs[mood] || moodConfigs.healing;

            oscillator1.frequency.value = config.freq1;
            oscillator2.frequency.value = config.freq2;
            oscillator1.type = config.wave;
            oscillator2.type = config.wave;

            // Connect and set volume
            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            gainNode.gain.value = 0; // Start silent for fade in

            // Store references
            this.currentAudio = { oscillator1, oscillator2, gainNode };
            this.isPlaying = true;

            // Start oscillators
            oscillator1.start();
            oscillator2.start();

        } catch (error) {
            console.warn('Could not create ambient audio:', error);
            this.createSilentAudio();
        }
    }

    createMelodicAudio() {
        if (!this.audioContext) {
            this.createSilentAudio();
            return;
        }

        try {
            // Create a simple melodic pattern
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.frequency.value = 220; // A3
            oscillator.type = 'triangle';

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            gainNode.gain.value = 0; // Start silent for fade in

            this.currentAudio = { oscillator, gainNode };
            this.isPlaying = true;

            oscillator.start();

        } catch (error) {
            console.warn('Could not create melodic audio:', error);
            this.createSilentAudio();
        }
    }

    createSilentAudio() {
        // Fallback for audio-disabled environments
        this.currentAudio = { silent: true };
        this.isPlaying = true;
    }

    fadeIn(duration = 3000) {
        if (!this.currentAudio || this.currentAudio.silent) return;

        const gainNode = this.currentAudio.gainNode;
        if (!gainNode) return;

        // Smooth fade in
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + duration / 1000);
    }

    async fadeOutAndStop(duration = 2000) {
        return new Promise((resolve) => {
            if (!this.currentAudio) {
                resolve();
                return;
            }

            if (this.currentAudio.silent) {
                this.isPlaying = false;
                resolve();
                return;
            }

            const gainNode = this.currentAudio.gainNode;
            if (gainNode && this.audioContext) {
                // Smooth fade out
                gainNode.gain.setValueAtTime(gainNode.gain.value, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration / 1000);
            }

            setTimeout(() => {
                this.stop();
                resolve();
            }, duration);
        });
    }

    stop() {
        if (!this.currentAudio) return;

        try {
            if (this.currentAudio.oscillator1) {
                this.currentAudio.oscillator1.stop();
                this.currentAudio.oscillator2.stop();
            } else if (this.currentAudio.oscillator) {
                this.currentAudio.oscillator.stop();
            }
        } catch (error) {
            // Oscillator may already be stopped
        }

        this.currentAudio = null;
        this.isPlaying = false;
    }

    async displayTextGently(textLines, onTextUpdate) {
        return new Promise((resolve) => {
            let currentLine = 0;
            let currentText = '';

            const displayNextLine = () => {
                if (currentLine >= textLines.length) {
                    resolve();
                    return;
                }

                const line = textLines[currentLine];
                currentText += (currentText ? '\n' : '') + line;

                if (onTextUpdate) {
                    onTextUpdate(currentText, currentLine, textLines.length);
                }

                currentLine++;

                // Pause longer for empty lines (stanza breaks)
                const delay = line.trim() === '' ? 2000 : 2500;
                setTimeout(displayNextLine, delay);
            };

            displayNextLine();
        });
    }

    async displayLyricsSynchronized(lyrics, timing, onLyricsUpdate) {
        return new Promise((resolve) => {
            let currentIndex = 0;

            const displayNextLyric = () => {
                if (currentIndex >= lyrics.length) {
                    resolve();
                    return;
                }

                const lyric = lyrics[currentIndex];
                const delay = timing[currentIndex] || 3000;

                if (onLyricsUpdate) {
                    onLyricsUpdate(lyric, currentIndex, lyrics.length);
                }

                currentIndex++;
                setTimeout(displayNextLyric, delay);
            };

            displayNextLyric();
        });
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));

        if (this.currentAudio && this.currentAudio.gainNode) {
            this.currentAudio.gainNode.gain.value = this.volume * 0.3;
        }
    }

    pause() {
        if (this.audioContext && this.audioContext.state === 'running') {
            this.audioContext.suspend();
        }
    }

    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // Music Platform Integration Methods
    createMusicPlayerInterface(container) {
        const musicInterface = document.createElement('div');
        musicInterface.className = 'transcendental-music-interface';
        musicInterface.innerHTML = `
            <div class="music-header">
                <h3>🎵 Enhance Your Journey</h3>
                <p>Choose your preferred music platform for a deeper experience</p>
            </div>
            <div class="music-platforms">
                <button class="platform-btn" data-platform="youtube">
                    <span class="platform-icon">📺</span>
                    <span class="platform-name">YouTube Music</span>
                </button>
                <button class="platform-btn" data-platform="soundcloud">
                    <span class="platform-icon">☁️</span>
                    <span class="platform-name">SoundCloud</span>
                </button>
                <button class="platform-btn" data-platform="apple">
                    <span class="platform-icon">🍎</span>
                    <span class="platform-name">Apple Music</span>
                </button>
                <button class="platform-btn" data-platform="silence">
                    <span class="platform-icon">🤫</span>
                    <span class="platform-name">Silent Journey</span>
                </button>
            </div>
            <div class="music-player-container" style="display: none;"></div>
        `;

        // Add event listeners for platform selection
        musicInterface.querySelectorAll('.platform-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.dataset.platform;
                this.initializePlatform(platform, musicInterface);
            });
        });

        container.appendChild(musicInterface);
        return musicInterface;
    }

    initializePlatform(platform, container) {
        const playerContainer = container.querySelector('.music-player-container');
        playerContainer.style.display = 'block';

        // Hide platform selection buttons
        container.querySelector('.music-platforms').style.display = 'none';

        switch (platform) {
            case 'youtube':
                this.createYouTubePlayer(playerContainer);
                break;
            case 'soundcloud':
                this.createSoundCloudPlayer(playerContainer);
                break;
            case 'apple':
                this.createAppleMusicPlayer(playerContainer);
                break;
            case 'silence':
                this.createSilentMode(playerContainer);
                break;
        }
    }

    createYouTubePlayer(container) {
        const videoIds = ['ZbZSe6N_BXs', 'hHW1oY26kxQ']; // Peaceful meditation tracks
        const randomVideo = videoIds[Math.floor(Math.random() * videoIds.length)];

        container.innerHTML = `
            <div class="youtube-player">
                <iframe width="100%" height="200"
                    src="https://www.youtube.com/embed/${randomVideo}?autoplay=1&rel=0&showinfo=0"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen>
                </iframe>
                <p class="music-note">🎼 Transcendental meditation music from YouTube</p>
            </div>
        `;
    }

    createSoundCloudPlayer(container) {
        container.innerHTML = `
            <div class="soundcloud-player">
                <iframe width="100%" height="200"
                    scrolling="no"
                    frameborder="no"
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true">
                </iframe>
                <p class="music-note">☁️ Ambient soundscapes from SoundCloud</p>
            </div>
        `;
    }

    createAppleMusicPlayer(container) {
        container.innerHTML = `
            <div class="apple-music-player">
                <div class="apple-music-placeholder">
                    <div class="apple-music-icon">🍎🎵</div>
                    <h4>Apple Music Integration</h4>
                    <p>Open Apple Music to play curated meditation playlists:</p>
                    <a href="https://music.apple.com/search?term=meditation%20ambient"
                       target="_blank"
                       class="apple-music-link">
                        🎧 Open Apple Music
                    </a>
                    <div class="suggested-searches">
                        <p><strong>Suggested searches:</strong></p>
                        <ul>
                            <li>"Transcendental Meditation"</li>
                            <li>"Ambient Space Music"</li>
                            <li>"Deep Relaxation Sounds"</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    createSilentMode(container) {
        container.innerHTML = `
            <div class="silent-mode">
                <div class="silence-visual">🤫</div>
                <h4>Silent Journey Mode</h4>
                <p>Experience the transcendental journey in peaceful silence.</p>
                <p class="silence-quote">"In silence, we find the deepest truths."</p>
                <div class="silence-timer">
                    <span class="timer-display">🕯️ Peaceful silence activated</span>
                </div>
            </div>
        `;
    }
}