// Transcendental Visual Effects System

class TranscendentalVisuals {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.particles = [];
        this.waves = [];
        this.time = 0;
        this.colors = {
            healing: ['#4facfe', '#00f2fe', '#a8edea', '#fed6e3'],
            hope: ['#ffecd2', '#fcb69f', '#667eea', '#764ba2'],
            growth: ['#89f7fe', '#66a6ff', '#a8edea', '#fed6e3'],
            connection: ['#667eea', '#764ba2', '#ffecd2', '#fcb69f']
        };
        this.setupCanvas();
    }

    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'transcendental-canvas';
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();

        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    startHealing() {
        this.setupHealingParticles();
        this.animate('healing');
    }

    startHope() {
        this.setupHopeWaves();
        this.animate('hope');
    }

    startGrowth() {
        this.setupGrowthSpirals();
        this.animate('growth');
    }

    startConnection() {
        this.setupConnectionNetwork();
        this.animate('connection');
    }

    setupHealingParticles() {
        this.particles = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                life: Math.random() * 100,
                maxLife: 100 + Math.random() * 50
            });
        }
    }

    setupHopeWaves() {
        this.waves = [];
        const waveCount = 3;

        for (let i = 0; i < waveCount; i++) {
            this.waves.push({
                amplitude: 30 + i * 10,
                frequency: 0.01 + i * 0.005,
                phase: i * Math.PI / 3,
                speed: 0.02 + i * 0.01,
                opacity: 0.3 - i * 0.05
            });
        }
    }

    setupGrowthSpirals() {
        this.particles = [];
        const spiralCount = 30;

        for (let i = 0; i < spiralCount; i++) {
            this.particles.push({
                angle: i * (Math.PI * 2 / spiralCount),
                radius: 50,
                centerX: this.canvas.width / 2,
                centerY: this.canvas.height / 2,
                size: Math.random() * 4 + 2,
                speed: 0.02 + Math.random() * 0.01,
                opacity: Math.random() * 0.6 + 0.4,
                growth: 0.01
            });
        }
    }

    setupConnectionNetwork() {
        this.particles = [];
        const nodeCount = 20;

        for (let i = 0; i < nodeCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 1,
                speedY: (Math.random() - 0.5) * 1,
                connections: [],
                opacity: Math.random() * 0.8 + 0.2
            });
        }
    }

    animate(theme) {
        this.time += 0.016; // ~60fps
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Create gradient background
        this.drawGradientBackground(theme);

        switch (theme) {
            case 'healing':
                this.animateHealing();
                break;
            case 'hope':
                this.animateHope();
                break;
            case 'growth':
                this.animateGrowth();
                break;
            case 'connection':
                this.animateConnection();
                break;
        }

        this.animationId = requestAnimationFrame(() => this.animate(theme));
    }

    drawGradientBackground(theme) {
        const colors = this.colors[theme];
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height) / 2
        );

        gradient.addColorStop(0, this.hexToRgba(colors[0], 0.1));
        gradient.addColorStop(0.5, this.hexToRgba(colors[1], 0.05));
        gradient.addColorStop(1, this.hexToRgba(colors[2], 0.02));

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    animateHealing() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life++;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Breathing effect
            const breathe = Math.sin(this.time * 2) * 0.2 + 0.8;
            const currentSize = particle.size * breathe;

            // Draw particle with healing glow
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity * breathe;
            this.ctx.fillStyle = this.colors.healing[0];
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = this.colors.healing[1];

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();

            // Reset particle if it's lived too long
            if (particle.life > particle.maxLife) {
                particle.life = 0;
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
            }
        });
    }

    animateHope() {
        // Draw flowing waves
        this.waves.forEach(wave => {
            this.ctx.save();
            this.ctx.globalAlpha = wave.opacity;
            this.ctx.strokeStyle = this.colors.hope[0];
            this.ctx.lineWidth = 2;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = this.colors.hope[1];

            this.ctx.beginPath();
            for (let x = 0; x <= this.canvas.width; x += 5) {
                const y = this.canvas.height / 2 +
                    Math.sin(x * wave.frequency + this.time * wave.speed + wave.phase) * wave.amplitude;

                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }

            this.ctx.stroke();
            this.ctx.restore();
        });

        // Add rising light particles
        if (Math.random() < 0.1) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height + 10,
                size: Math.random() * 3 + 1,
                speedY: -1 - Math.random(),
                opacity: Math.random() * 0.8 + 0.2,
                life: 0,
                maxLife: this.canvas.height + 50
            });
        }

        // Animate rising particles
        this.particles = this.particles.filter(particle => {
            particle.y += particle.speedY;
            particle.life++;

            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity * (1 - particle.life / particle.maxLife);
            this.ctx.fillStyle = this.colors.hope[2];
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = this.colors.hope[3];

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();

            return particle.life < particle.maxLife;
        });
    }

    animateGrowth() {
        this.particles.forEach(particle => {
            // Spiral growth
            particle.angle += particle.speed;
            particle.radius += particle.growth;

            // Calculate position
            particle.x = particle.centerX + Math.cos(particle.angle) * particle.radius;
            particle.y = particle.centerY + Math.sin(particle.angle) * particle.radius;

            // Draw with growth effect
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = this.colors.growth[Math.floor(Math.random() * this.colors.growth.length)];
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = this.colors.growth[0];

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();

            // Reset if too far out
            if (particle.radius > Math.max(this.canvas.width, this.canvas.height) / 2) {
                particle.radius = 50;
                particle.angle = Math.random() * Math.PI * 2;
            }
        });
    }

    animateConnection() {
        // Update particles
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });

        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) +
                    Math.pow(particle.y - otherParticle.y, 2)
                );

                if (distance < 150) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (150 - distance) / 150 * 0.3;
                    this.ctx.strokeStyle = this.colors.connection[0];
                    this.ctx.lineWidth = 1;

                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            });

            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = this.colors.connection[1];
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = this.colors.connection[2];

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    getCanvas() {
        return this.canvas;
    }
}