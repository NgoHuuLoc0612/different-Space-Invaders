class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.overlay = document.getElementById('gameOverlay');
        this.messageTitle = document.getElementById('messageTitle');
        this.messageText = document.getElementById('messageText');
        
        this.gameState = 'menu'; // menu, playing, paused, gameOver, victory
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.combo = 0;
        this.maxCombo = 0;
        
        this.player = new Player(this.canvas.width / 2, this.canvas.height - 50);
        this.invaders = [];
        this.bullets = [];
        this.enemyBullets = [];
        this.barriers = [];
        this.ufo = null;
        this.effects = new Effects();
        
        this.keys = {};
        this.lastShot = 0;
        this.invaderDirection = 1;
        this.invaderSpeed = 1;
        this.invaderDropDistance = 20;
        this.lastUfoSpawn = 0;
        this.backgroundStars = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.createStars();
        this.gameLoop();
        this.updateUI();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.gameState === 'menu' || this.gameState === 'gameOver') {
                    this.startGame();
                } else if (this.gameState === 'playing') {
                    this.shoot();
                }
            }
            
            if (e.code === 'KeyP' && this.gameState === 'playing') {
                this.togglePause();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }
    
    startGame() {
        this.gameState = 'playing';
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.combo = 0;
        this.maxCombo = 0;
        
        this.player.reset(this.canvas.width / 2, this.canvas.height - 50);
        this.bullets = [];
        this.enemyBullets = [];
        this.ufo = null;
        
        this.createInvaders();
        this.createBarriers();
        this.hideOverlay();
        this.updateUI();
        
        this.effects.levelTransition();
    }
    
    createInvaders() {
        this.invaders = [];
        const rows = 5;
        const cols = 10;
        const spacing = 60;
        const startX = (this.canvas.width - (cols - 1) * spacing) / 2;
        const startY = 80;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = startX + col * spacing;
                const y = startY + row * 50;
                const type = row < 2 ? 2 : 1;
                const points = type === 2 ? 20 : 10;
                this.invaders.push(new Invader(x, y, type, points));
            }
        }
        
        this.invaderSpeed = 1 + this.level * 0.2;
    }
    
    createBarriers() {
        this.barriers = [];
        const barrierCount = 4;
        const barrierWidth = 60;
        const spacing = (this.canvas.width - barrierCount * barrierWidth) / (barrierCount + 1);
        
        for (let i = 0; i < barrierCount; i++) {
            const x = spacing + i * (barrierWidth + spacing);
            const y = this.canvas.height - 200;
            this.barriers.push(new Barrier(x, y, barrierWidth, 40));
        }
    }
    
    createStars() {
        this.backgroundStars = [];
        for (let i = 0; i < 100; i++) {
            this.backgroundStars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random() * 0.8 + 0.2
            });
        }
    }
    
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.showMessage('PAUSED', 'Press P to continue');
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.hideOverlay();
        }
    }
    
    shoot() {
        const now = Date.now();
        if (now - this.lastShot > 250) { // Rate limit
            this.bullets.push(new Bullet(this.player.x, this.player.y - 20, -8, 'player'));
            this.lastShot = now;
        }
    }
    
    spawnUfo() {
        if (!this.ufo && Date.now() - this.lastUfoSpawn > 15000) {
            this.ufo = new UFO(this.canvas.width + 50, 50);
            this.lastUfoSpawn = Date.now();
        }
    }
    
    update() {
        if (this.gameState !== 'playing') return;
        
        // Update player
        if (this.keys['ArrowLeft']) {
            this.player.moveLeft();
        }
        if (this.keys['ArrowRight']) {
            this.player.moveRight(this.canvas.width);
        }
        
        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.update();
            return bullet.y > -10 && bullet.y < this.canvas.height + 10;
        });
        
        this.enemyBullets = this.enemyBullets.filter(bullet => {
            bullet.update();
            return bullet.y > -10 && bullet.y < this.canvas.height + 10;
        });
        
        // Update invaders
        let hitEdge = false;
        this.invaders.forEach(invader => {
            invader.update();
            invader.x += this.invaderDirection * this.invaderSpeed;
            
            if (invader.x <= 30 || invader.x >= this.canvas.width - 30) {
                hitEdge = true;
            }
        });
        
        if (hitEdge) {
            this.invaderDirection *= -1;
            this.invaders.forEach(invader => {
                invader.y += this.invaderDropDistance;
            });
        }
        
        // Random invader shooting
        if (this.invaders.length > 0 && Math.random() < 0.002 + this.level * 0.001) {
            const shooter = this.invaders[Math.floor(Math.random() * this.invaders.length)];
            this.enemyBullets.push(new Bullet(shooter.x, shooter.y + 20, 4, 'enemy'));
        }
        
        // Update UFO
        if (this.ufo) {
            this.ufo.update();
            if (this.ufo.x < -100) {
                this.ufo = null;
            }
        }
        
        this.spawnUfo();
        this.checkCollisions();
        this.checkGameState();
    }
    
    checkCollisions() {
        // Player bullets vs invaders
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            if (bullet.owner !== 'player') continue;
            
            for (let j = this.invaders.length - 1; j >= 0; j--) {
                const invader = this.invaders[j];
                if (this.checkCollision(bullet, invader)) {
                    this.score += invader.points * (1 + this.combo * 0.5);
                    this.combo++;
                    this.maxCombo = Math.max(this.maxCombo, this.combo);
                    
                    // Create explosion effect
                    this.effects.createExplosion(invader.x, invader.y);
                    this.effects.screenShake();
                    
                    // Show combo text
                    if (this.combo > 2) {
                        this.effects.showComboText(invader.x, invader.y, this.combo);
                    }
                    
                    this.invaders.splice(j, 1);
                    this.bullets.splice(i, 1);
                    break;
                }
            }
        }
        
        // Player bullets vs UFO
        if (this.ufo) {
            for (let i = this.bullets.length - 1; i >= 0; i--) {
                const bullet = this.bullets[i];
                if (bullet.owner === 'player' && this.checkCollision(bullet, this.ufo)) {
                    this.score += this.ufo.points;
                    this.effects.createExplosion(this.ufo.x, this.ufo.y);
                    this.effects.flashEffect();
                    this.ufo = null;
                    this.bullets.splice(i, 1);
                    break;
                }
            }
        }
        
        // Player bullets vs barriers
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            for (let barrier of this.barriers) {
                if (barrier.checkCollision(bullet.x, bullet.y)) {
                    this.bullets.splice(i, 1);
                    break;
                }
            }
        }
        
        // Enemy bullets vs barriers
        for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
            const bullet = this.enemyBullets[i];
            for (let barrier of this.barriers) {
                if (barrier.checkCollision(bullet.x, bullet.y)) {
                    this.enemyBullets.splice(i, 1);
                    break;
                }
            }
        }
        
        // Enemy bullets vs player
        for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
            const bullet = this.enemyBullets[i];
            if (this.checkCollision(bullet, this.player)) {
                this.lives--;
                this.combo = 0;
                this.effects.createExplosion(this.player.x, this.player.y);
                this.effects.screenShake();
                this.effects.flashEffect();
                this.enemyBullets.splice(i, 1);
                
                if (this.lives <= 0) {
                    this.gameOver();
                }
                break;
            }
        }
        
        // Invaders vs player
        for (let invader of this.invaders) {
            if (this.checkCollision(invader, this.player)) {
                this.gameOver();
                return;
            }
            
            // Check if invaders reached bottom
            if (invader.y > this.canvas.height - 100) {
                this.gameOver();
                return;
            }
        }
    }
    
    checkCollision(obj1, obj2) {
        const dx = obj1.x - obj2.x;
        const dy = obj1.y - obj2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (obj1.size || 10) + (obj2.size || 15);
    }
    
    checkGameState() {
        if (this.invaders.length === 0) {
            this.nextLevel();
        }
    }
    
    nextLevel() {
        this.level++;
        this.combo = 0;
        this.effects.levelTransition();
        this.effects.victoryEffect();
        
        setTimeout(() => {
            this.createInvaders();
            this.bullets = [];
            this.enemyBullets = [];
            this.player.x = this.canvas.width / 2;
        }, 1000);
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        this.effects.defeatEffect();
        this.effects.screenShake();
        this.showMessage('GAME OVER', `Final Score: ${this.score}<br>Max Combo: ${this.maxCombo}<br>Press SPACE to restart`);
    }
    
    showMessage(title, text) {
        this.messageTitle.textContent = title;
        this.messageText.innerHTML = text;
        this.overlay.style.display = 'flex';
    }
    
    hideOverlay() {
        this.overlay.style.display = 'none';
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score.toLocaleString();
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('level').textContent = this.level;
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw stars
        this.renderStars();
        
        if (this.gameState === 'playing' || this.gameState === 'paused') {
            // Draw player
            this.player.render(this.ctx);
            
            // Draw invaders
            this.invaders.forEach(invader => invader.render(this.ctx));
            
            // Draw UFO
            if (this.ufo) {
                this.ufo.render(this.ctx);
            }
            
            // Draw bullets
            this.bullets.forEach(bullet => bullet.render(this.ctx));
            this.enemyBullets.forEach(bullet => bullet.render(this.ctx));
            
            // Draw barriers
            this.barriers.forEach(barrier => barrier.render(this.ctx));
            
            // Draw combo indicator
            if (this.combo > 2) {
                this.ctx.fillStyle = '#ffff00';
                this.ctx.font = '16px Orbitron';
                this.ctx.fillText(`COMBO x${this.combo}`, 10, this.canvas.height - 10);
            }
        }
        
        this.updateUI();
    }
    
    renderStars() {
        this.backgroundStars.forEach(star => {
            star.y += star.speed;
            if (star.y > this.canvas.height) {
                star.y = 0;
                star.x = Math.random() * this.canvas.width;
            }
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
        });
    }
    
    gameLoop() {
        this.update();
        this.render();
        this.effects.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Barrier class
class Barrier {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.pixels = [];
        this.initPixels();
    }
    
    initPixels() {
        // Create barrier shape
        for (let row = 0; row < this.height; row++) {
            this.pixels[row] = [];
            for (let col = 0; col < this.width; col++) {
                // Create barrier shape with hollow center
                const centerX = this.width / 2;
                const centerY = this.height / 2;
                const distanceFromCenter = Math.sqrt(
                    Math.pow(col - centerX, 2) + Math.pow(row - centerY, 2)
                );
                
                if (row < this.height * 0.7) {
                    if (distanceFromCenter > 8 && distanceFromCenter < 25) {
                        this.pixels[row][col] = false;
                    } else {
                        this.pixels[row][col] = true;
                    }
                } else {
                    this.pixels[row][col] = true;
                }
            }
        }
    }
    
    checkCollision(x, y) {
        const localX = Math.floor(x - this.x);
        const localY = Math.floor(y - this.y);
        
        if (localX >= 0 && localX < this.width && localY >= 0 && localY < this.height) {
            if (this.pixels[localY] && this.pixels[localY][localX]) {
                // Destroy pixels around hit point
                for (let dy = -2; dy <= 2; dy++) {
                    for (let dx = -2; dx <= 2; dx++) {
                        const pixelY = localY + dy;
                        const pixelX = localX + dx;
                        if (pixelY >= 0 && pixelY < this.height && 
                            pixelX >= 0 && pixelX < this.width) {
                            if (this.pixels[pixelY]) {
                                this.pixels[pixelY][pixelX] = false;
                            }
                        }
                    }
                }
                return true;
            }
        }
        return false;
    }
    
    render(ctx) {
        ctx.fillStyle = 'white';
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                if (this.pixels[row] && this.pixels[row][col]) {
                    ctx.fillRect(this.x + col, this.y + row, 1, 1);
                }
            }
        }
    }
}

// UFO class
class UFO {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = -2;
        this.points = 100;
        this.size = 20;
    }
    
    update() {
        this.x += this.speed;
    }
    
    render(ctx) {
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        
        // UFO body
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // UFO dome
        ctx.beginPath();
        ctx.ellipse(this.x, this.y - 5, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // UFO lights
        ctx.fillStyle = 'black';
        for (let i = -2; i <= 2; i++) {
            ctx.fillRect(this.x + i * 6 - 1, this.y - 1, 2, 2);
        }
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    new Game();
});