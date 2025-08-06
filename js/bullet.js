class Bullet {
    constructor(x, y, speed, owner) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.owner = owner; // 'player' or 'enemy'
        this.size = 3; // For collision detection
        this.width = 2;
        this.height = 8;
        this.trail = []; // For trail effect
    }
    
    update() {
        // Store previous position for trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 5) {
            this.trail.shift();
        }
        
        this.y += this.speed;
    }
    
    render(ctx) {
        // Draw trail
        this.trail.forEach((pos, index) => {
            const alpha = (index + 1) / this.trail.length * 0.3;
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fillRect(pos.x - 1, pos.y - 2, 2, 4);
        });
        
        // Draw bullet
        if (this.owner === 'player') {
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x - 1, this.y - 4, this.width, this.height);
            
            // Add glow effect for player bullets
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillRect(this.x - 2, this.y - 5, 4, 10);
        } else {
            // Enemy bullets - zigzag pattern
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x - 1, this.y - 2, 2, 4);
            ctx.fillRect(this.x - 2, this.y - 1, 4, 2);
        }
    }
}