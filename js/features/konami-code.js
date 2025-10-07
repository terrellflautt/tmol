/**
 * KONAMI CODE EASTER EGG
 * Classic gaming secret: ↑↑↓↓←→←→BA
 *
 * Rewards: The Smart (pattern recognition, gaming culture knowledge)
 * Philosophy: Some secrets are for those who know where to look
 */

class KonamiCode {
    constructor() {
        this.sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        this.userSequence = [];
        this.activated = false;
        this.matrixMode = false;

        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        // Add key to user sequence
        this.userSequence.push(e.keyCode);

        // Keep only last 10 keys
        if (this.userSequence.length > 10) {
            this.userSequence.shift();
        }

        // Check if sequence matches
        if (this.checkSequence()) {
            this.activate();
        }
    }

    checkSequence() {
        if (this.userSequence.length < this.sequence.length) {
            return false;
        }

        return this.sequence.every((key, index) => {
            const offset = this.userSequence.length - this.sequence.length;
            return key === this.userSequence[offset + index];
        });
    }

    activate() {
        if (this.activated) {
            // Already activated - toggle matrix mode
            this.toggleMatrixMode();
            return;
        }

        this.activated = true;
        localStorage.setItem('konamiCode', 'true');
        localStorage.setItem('konami_unlocked_at', Date.now());

        // Track discovery
        const discoveries = parseInt(localStorage.getItem('discoveries') || '0');
        localStorage.setItem('discoveries', discoveries + 1);

        this.showActivationMessage();
        this.unlockSecretPowers();
        this.playActivationSound();
    }

    showActivationMessage() {
        const message = document.createElement('div');
        message.className = 'konami-activation';
        message.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.95);
            z-index: 100000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            animation: fadeIn 0.5s ease-out;
        `;

        message.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 2rem; animation: pulse 1s infinite;">
                🎮
            </div>
            <div style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem; text-shadow: 0 0 20px #00ff00;">
                KONAMI CODE ACTIVATED
            </div>
            <div style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.8;">
                The Classics Never Die
            </div>
            <div style="font-size: 1rem; text-align: center; max-width: 600px; line-height: 1.6; opacity: 0.7;">
                You possess knowledge of the ancients.<br>
                You recognize patterns others cannot see.<br>
                You have unlocked the power of 30 extra lives.<br><br>
                <span style="color: #ffff00;">SECRET POWERS GRANTED:</span><br>
                • Matrix Vision Mode (press Konami Code again)<br>
                • Enhanced Discovery Rate (+50%)<br>
                • Secret Developer Console Access<br>
                • Reality Glitch Immunity<br>
                • Hall of Fame: "Code Master" Title<br>
            </div>
            <div style="margin-top: 3rem; font-size: 0.9rem; opacity: 0.5;">
                Press any key to continue...
            </div>
        `;

        document.body.appendChild(message);

        const dismiss = () => {
            message.style.animation = 'fadeOut 0.5s ease-in';
            setTimeout(() => message.remove(), 500);
            document.removeEventListener('keydown', dismiss);
            document.removeEventListener('click', dismiss);
        };

        document.addEventListener('keydown', dismiss);
        document.addEventListener('click', dismiss);
    }

    toggleMatrixMode() {
        this.matrixMode = !this.matrixMode;

        if (this.matrixMode) {
            this.enableMatrixMode();
        } else {
            this.disableMatrixMode();
        }
    }

    enableMatrixMode() {
        // Add Matrix-style green filter
        const matrixFilter = document.createElement('div');
        matrixFilter.id = 'matrix-mode-overlay';
        matrixFilter.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 255, 0, 0.05);
            pointer-events: none;
            z-index: 99999;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(matrixFilter);

        // Add falling code effect
        this.createMatrixRain();

        // Change all text to green
        document.body.style.filter = 'hue-rotate(90deg) saturate(1.5)';

        // Show notification
        this.showNotification('🟢 MATRIX MODE ENABLED', 'You see the code now...');
    }

    disableMatrixMode() {
        const overlay = document.getElementById('matrix-mode-overlay');
        if (overlay) overlay.remove();

        const canvas = document.getElementById('matrix-rain-canvas');
        if (canvas) canvas.remove();

        document.body.style.filter = '';

        this.showNotification('⚪ MATRIX MODE DISABLED', 'Welcome back to reality');
    }

    createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-rain-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 99998;
            opacity: 0.3;
        `;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(0);

        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const matrixInterval = setInterval(draw, 33);

        // Store interval for cleanup
        canvas.dataset.intervalId = matrixInterval;
    }

    unlockSecretPowers() {
        // 1. Enhanced Discovery Rate
        window.konamiEnhancedDiscovery = true;

        // 2. Secret Developer Console
        this.unlockDevConsole();

        // 3. Reality Glitch Immunity
        window.konamiGlitchImmunity = true;

        // 4. Add to Hall of Fame
        this.addToHallOfFame();
    }

    unlockDevConsole() {
        console.log('%c🎮 KONAMI CODE ACTIVATED', 'color: #00ff00; font-size: 20px; font-weight: bold;');
        console.log('%c30 Lives Granted', 'color: #00ff00; font-size: 16px;');
        console.log('%cSecret Developer Access Enabled', 'color: #ffff00; font-size: 14px;');
        console.log('%cType window.konamiSecrets() for more...', 'color: #00ffff; font-size: 12px;');

        window.konamiSecrets = () => {
            console.log('%c🔓 KONAMI SECRETS:', 'color: #ff00ff; font-size: 16px; font-weight: bold;');
            console.log('• Enhanced discovery rate: +50%');
            console.log('• Matrix Mode: Press Konami Code again');
            console.log('• Reality glitches cannot affect you');
            console.log('• Hall of Fame title: Code Master');
            console.log('• Access to hidden features');
            console.log('\n%c💡 Try these commands:', 'color: #ffff00; font-size: 14px;');
            console.log('window.showAllSecrets() - Reveal all easter eggs');
            console.log('window.skipToMaster() - Instant Master status');
            console.log('window.cosmicPowers() - Unlock all abilities');
        };

        window.showAllSecrets = () => {
            console.log('%c🗺️ ALL EASTER EGGS:', 'color: #00ffff; font-size: 14px; font-weight: bold;');
            console.log('1. Logo Evolution - Click logo multiple times');
            console.log('2. Aziza\'s Riddle - Click period after full logo');
            console.log('3. Genie Lamp - Wait 30s+ and explore');
            console.log('4. Future Vision - Click "2025" in footer');
            console.log('5. Konami Code - You found it! ↑↑↓↓←→←→BA');
            console.log('6. Reality Glitches - Random name changes');
            console.log('7. Atlantis Quest - Find Genie, solve riddle');
            console.log('8. Cthulhu Boss - Unlock after 10 visits');
            console.log('9. Transcendental Journey - Begin Journey button');
            console.log('10. Many more secrets await...');
        };
    }

    addToHallOfFame() {
        const hallOfFameEntry = {
            title: 'Code Master',
            achievement: 'Konami Code',
            unlockedAt: Date.now(),
            description: 'Master of the ancient gaming secrets'
        };

        const hallOfFame = JSON.parse(localStorage.getItem('hall_of_fame') || '[]');

        const exists = hallOfFame.some(entry => entry.achievement === 'Konami Code');
        if (!exists) {
            hallOfFame.push(hallOfFameEntry);
            localStorage.setItem('hall_of_fame', JSON.stringify(hallOfFame));
        }
    }

    playActivationSound() {
        // Create a simple beep sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'square';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio not available');
        }
    }

    showNotification(title, message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #00ff00;
            border-radius: 8px;
            padding: 15px 20px;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            z-index: 100001;
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
        `;

        notification.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
            <div style="font-size: 0.9rem; opacity: 0.8;">${message}</div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
}

// Add animations
const konamiStyles = document.createElement('style');
konamiStyles.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
    }
`;
document.head.appendChild(konamiStyles);

// Initialize Konami Code
document.addEventListener('DOMContentLoaded', () => {
    window.konamiCode = new KonamiCode();

    // Check if previously activated
    if (localStorage.getItem('konamiCode') === 'true') {
        console.log('%c🎮 Konami Code Status: Active', 'color: #00ff00; font-size: 12px;');
        console.log('%cType window.konamiSecrets() for available commands', 'color: #00ffff; font-size: 10px;');
        window.konamiEnhancedDiscovery = true;
        window.konamiGlitchImmunity = true;
    }
});

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KonamiCode;
}
