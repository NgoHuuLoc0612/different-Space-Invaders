class Invader {
    constructor(x, y, type, points) {
        this.x = x;
        this.y = y;
        this.type = type; // 1 or 2 for different invader types
        this.points = points;
        this.size = 15; // For collision detection
        this.animFrame = 0;
        this.animSpeed = 60; // Frames between animation
        this.frameCount = 0;
    }
    
    update() {
        this.frameCount++;
        if (this.frameCount >= this.animSpeed) {
            this.animFrame = (this.animFrame + 1) % 2;
            this.frameCount = 0;
        }
    }
    
    render(ctx) {
        ctx.fillStyle = 'white';
        
        if (this.type === 1) {
            this.renderType1(ctx);
        } else {
            this.renderType2(ctx);
        }
    }
    
    renderType1(ctx) {
        // Small invader (classic space invader shape)
        const frame = this.animFrame;
        
        // Eyes
        ctx.fillRect(this.x - 8, this.y - 8, 3, 3);
        ctx.fillRect(this.x + 5, this.y - 8, 3, 3);
        
        // Body
        ctx.fillRect(this.x - 10, this.y - 5, 20, 3);
        ctx.fillRect(this.x - 8, this.y - 2, 6, 3);
        ctx.fillRect(this.x + 2, this.y - 2, 6, 3);
        ctx.fillRect(this.x - 10, this.y + 1, 4, 3);
        ctx.fillRect(this.x - 3, this.y + 1, 6, 3);
        ctx.fillRect(this.x + 6, this.y + 1, 4, 3);
        
        // Legs (animated)
        if (frame === 0) {
            ctx.fillRect(this.x - 8, this.y + 4, 3, 3);
            ctx.fillRect(this.x + 5, this.y + 4, 3, 3);
        } else {
            ctx.fillRect(this.x - 6, this.y + 4, 3, 3);
            ctx.fillRect(this.x + 3, this.y + 4, 3, 3);
        }
    }
    
    renderType2(ctx) {
        // Medium invader (octopus-like)
        const frame = this.animFrame;
        
        // Top part
        ctx.fillRect(this.x - 3, this.y - 10, 6, 3);
        ctx.fillRect(this.x - 8, this.y - 7, 16, 3);
        
        // Eyes and body
        ctx.fillRect(this.x - 10, this.y - 4, 5, 3);
        ctx.fillRect(this.x - 3, this.y - 4, 6, 3);
        ctx.fillRect(this.x + 5, this.y - 4, 5, 3);
        ctx.fillRect(this.x - 10, this.y - 1, 20, 3);
        
        // Arms/tentacles (animated)
        if (frame === 0) {
            ctx.fillRect(this.x - 6, this.y + 2, 3, 3);
            ctx.fillRect(this.x + 3, this.y + 2, 3, 3);
            ctx.fillRect(this.x - 10, this.y + 5, 3, 3);
            ctx.fillRect(this.x + 7, this.y + 5, 3, 3);
        } else {
            ctx.fillRect(this.x - 8, this.y + 2, 3, 3);
            ctx.fillRect(this.x + 5, this.y + 2, 3, 3);
            ctx.fillRect(this.x - 4, this.y + 5, 3, 3);
            ctx.fillRect(this.x + 1, this.y + 5, 3, 3);
        }
    }
}