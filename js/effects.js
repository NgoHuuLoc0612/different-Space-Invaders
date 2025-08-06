class Effects {
    constructor() {
        this.particleSystem = new ParticleSystem();
        this.shakeIntensity = 0;
        this.shakeDecay = 0.9;
        this.gameContainer = document.querySelector('.game-container');
        this.particleContainer = document.getElementById('particleContainer');
    }
    
    update() {
        this.particleSystem.update();
        
        // Update screen shake
        if (this.shakeIntensity > 0.1) {
            const offsetX = (Math.random() - 0.5) * this.shakeIntensity;
            const offsetY = (Math.random() - 0.5) * this.shakeIntensity;
            this.gameContainer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            this.shakeIntensity *= this.shakeDecay;
        } else {
            this.gameContainer.style.transform = '';
            this.shakeIntensity = 0;
        }
    }
    
    render(ctx) {
        this.particleSystem.render(ctx);
    }
    
    createExplosion(x, y) {
        this.particleSystem.createExplosion(x, y);
        this.createDOMParticles(x, y, 'explosion');
    }
    
    createDOMParticles(x, y, type = 'default') {
        const count = type === 'explosion' ? 12 : 6;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${type === 'explosion' ? 'explosion-particle' : ''}`;
            
            const angle = (Math.PI * 2 * i) / count;
            const distance = Math.random() * 50 + 30;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--dx', dx + 'px');
            particle.style.setProperty('--dy', dy + 'px');
            
            if (type === 'explosion') {
                particle.style.backgroundColor = `hsl(${Math.random() * 60}, 100%, 70%)`;
            }
            
            this.particleContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, type === 'explosion' ? 800 : 500);
        }
    }
    
    screenShake(intensity = 10) {
        this.shakeIntensity = intensity;
        this.gameContainer.classList.add('screen-shake');
        setTimeout(() => {
            this.gameContainer.classList.remove('screen-shake');
        }, 300);
    }
    
    flashEffect() {
        const flash = document.createElement('div');
        flash.className = 'flash-effect';
        this.gameContainer.appendChild(flash);
        
        setTimeout(() => {
            if (flash.parentNode) {
                flash.parentNode.removeChild(flash);
            }
        }, 100);
    }
    
    victoryEffect() {
        const victory = document.createElement('div');
        victory.className = 'victory-effect';
        this.gameContainer.appendChild(victory);
        
        setTimeout(() => {
            if (victory.parentNode) {
                victory.parentNode.removeChild(victory);
            }
        }, 2000);
    }
    
    defeatEffect() {
        const defeat = document.createElement('div');
        defeat.className = 'defeat-effect';
        this.gameContainer.appendChild(defeat);
        
        setTimeout(() => {
            if (defeat.parentNode) {
                defeat.parentNode.removeChild(defeat);
            }
        }, 3000);
    }
    
    levelTransition() {
        const transition = document.createElement('div');
        transition.className = 'level-transition';
        this.gameContainer.appendChild(transition);
        
        setTimeout(() => {
            if (transition.parentNode) {
                transition.parentNode.removeChild(transition);
            }
        }, 1000);
    }
    
    showComboText(x, y, combo) {
        const comboText = document.createElement('div');
        comboText.className = 'combo-text';
        comboText.textContent = `COMBO x${combo}!`;
        comboText.style.left = x + 'px';
        comboText.style.top = y + 'px';
        
        this.particleContainer.appendChild(comboText);
        
        setTimeout(() => {
            if (comboText.parentNode) {
                comboText.parentNode.removeChild(comboText);
            }
        }, 1000);
    }
    
    createPowerUpGlow(x, y) {
        const glow = document.createElement('div');
        glow.className = 'power-up-glow';
        glow.style.left = (x - 20) + 'px';
        glow.style.top = (y - 20) + 'px';
        
        this.particleContainer.appendChild(glow);
        
        return glow;
    }
    
    removePowerUpGlow(glow) {
        if (glow && glow.parentNode) {
            glow.parentNode.removeChild(glow);
        }
    }
    
    clearEffects() {
        this.particleSystem.clear();
        this.particleContainer.innerHTML = '';
        this.shakeIntensity = 0;
        this.gameContainer.style.transform = '';
    }
}