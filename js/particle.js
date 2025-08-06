class Particle {
    constructor(x, y, vx, vy, life, type = 'default') {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = life;
        this.maxLife = life;
        this.type = type;
        this.size = Math.random() * 3 + 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.rotation += this.rotationSpeed;
        
        // Apply gravity for explosion particles
        if (this.type === 'explosion') {
            this.vy += 0.1;
            this.vx *= 0.99;
        }
    }
    
    render(ctx) {
        const alpha = this.life / this.maxLife;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        if (this.type === 'explosion') {
            ctx.fillStyle = `rgba(255, ${255 * alpha}, ${255 * alpha * 0.5}, ${alpha})`;
        } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }
        
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
    
    isDead() {
        return this.life <= 0;
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }
    
    addParticle(particle) {
        this.particles.push(particle);
    }
    
    createExplosion(x, y, count = 15) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
            const speed = Math.random() * 4 + 2;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const life = Math.random() * 30 + 20;
            
            this.addParticle(new Particle(x, y, vx, vy, life, 'explosion'));
        }
    }
    
    createStarfield(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const vx = (Math.random() - 0.5) * 2;
            const vy = (Math.random() - 0.5) * 2;
            const life = Math.random() * 40 + 20;
            
            this.addParticle(new Particle(x, y, vx, vy, life, 'star'));
        }
    }
    
    update() {
        this.particles = this.particles.filter(particle => {
            particle.update();
            return !particle.isDead();
        });
    }
    
    render(ctx) {
        this.particles.forEach(particle => {
            particle.render(ctx);
        });
    }
    
    clear() {
        this.particles = [];
    }
}