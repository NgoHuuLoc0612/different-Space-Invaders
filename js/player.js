class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 30;
        this.speed = 5;
        this.size = 20; // For collision detection
    }
    
    moveLeft() {
        if (this.x > this.width / 2) {
            this.x -= this.speed;
        }
    }
    
    moveRight(canvasWidth) {
        if (this.x < canvasWidth - this.width / 2) {
            this.x += this.speed;
        }
    }
    
    reset(x, y) {
        this.x = x;
        this.y = y;
    }
    
    render(ctx) {
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        
        // Player ship body
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 15);
        ctx.lineTo(this.x - 15, this.y + 10);
        ctx.lineTo(this.x - 8, this.y + 10);
        ctx.lineTo(this.x - 8, this.y + 15);
        ctx.lineTo(this.x + 8, this.y + 15);
        ctx.lineTo(this.x + 8, this.y + 10);
        ctx.lineTo(this.x + 15, this.y + 10);
        ctx.closePath();
        ctx.fill();
        
        // Cannon
        ctx.fillRect(this.x - 2, this.y - 18, 4, 6);
        
        // Engine glow effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(this.x - 4, this.y + 15, 8, 3);
    }
}