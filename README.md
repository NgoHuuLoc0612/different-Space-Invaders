# Space Invaders

A modern HTML5 Canvas implementation of the classic Space Invaders arcade game with enhanced visual effects, animations, and gameplay mechanics.

![Space Invaders](https://img.shields.io/badge/Game-Space%20Invaders-blue)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![CSS3](https://img.shields.io/badge/CSS3-Animations-purple)

## 🚀 Features

### Core Gameplay
- **Classic Space Invaders mechanics** with modern enhancements
- **Progressive difficulty** - enemies get faster each level
- **Multiple enemy types** with different point values
- **Destructible barriers** that provide strategic cover
- **Bonus UFO** appearances for extra points
- **Lives system** with respawn mechanics
- **Combo system** for consecutive hits

### Visual Effects
- **Particle explosion effects** when enemies are destroyed
- **Screen shake** on hits and explosions
- **Animated background** with moving starfield
- **Smooth animations** for all game objects
- **Flash effects** for damage feedback
- **Level transition animations**
- **Victory and defeat visual effects**

### UI/UX Enhancements
- **Futuristic design** with Orbitron font
- **Real-time score tracking** with combo multipliers
- **Lives and level display**
- **Pause functionality**
- **Responsive design** for different screen sizes
- **Game state management** (menu, playing, paused, game over)

## 🎮 Controls

| Key | Action |
|-----|--------|
| `←` `→` | Move left/right |
| `SPACE` | Shoot / Start game |
| `P` | Pause/Resume game |

## 🛠 Installation & Setup

### Option 1: Direct Download
1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. Start playing immediately!

### Option 2: Local Web Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## 📁 Project Structure

```
different-Space-Invaders/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Game styling and animations
├── js/
│   ├── game.js            # Main game logic and loop
│   ├── player.js          # Player ship class
│   ├── invader.js         # Enemy invader classes
│   ├── bullet.js          # Projectile system
│   ├── particle.js        # Particle system for effects
│   └── effects.js         # Visual effects manager
├── LICENSE                # MIT License
└── README.md             # This file
```

## 🎯 Game Mechanics

### Scoring System
- **Small Invaders (Type 1)**: 10 points
- **Large Invaders (Type 2)**: 20 points
- **UFO**: 100 points
- **Combo Multiplier**: Additional 50% per consecutive hit

### Difficulty Progression
- Enemy speed increases by 20% each level
- More frequent enemy shooting as levels progress
- Invaders drop closer to player each level

### Power-ups & Special Features
- **Combo System**: Build combos for higher scores
- **Particle Effects**: Visual feedback for all actions
- **Screen Shake**: Immersive damage feedback
- **Animated Invaders**: Frame-based sprite animations

## 🔧 Technical Details

### Technologies Used
- **HTML5 Canvas** for game rendering
- **Vanilla JavaScript** (ES6+) for game logic
- **CSS3** for animations and styling
- **RequestAnimationFrame** for smooth 60fps gameplay

### Key Classes
- `Game`: Main game controller and loop
- `Player`: Player ship with movement and rendering
- `Invader`: Enemy ships with AI and animations
- `Bullet`: Projectile system for both player and enemies
- `Particle`: Explosion and visual effects
- `Effects`: Screen effects and DOM animations
- `Barrier`: Destructible cover system
- `UFO`: Bonus enemy with special behavior

### Performance Optimizations
- Efficient collision detection using distance calculations
- Object pooling for bullets and particles
- Optimized rendering pipeline
- Memory management for game objects

## 🎨 Customization

### Modifying Game Settings
Edit the constants in `js/game.js`:

```javascript
// Game difficulty
this.invaderSpeed = 1;           // Base enemy speed
this.invaderDropDistance = 20;   // Drop distance per row

// Player settings
this.player.speed = 5;           // Movement speed
this.lastShot = 250;            // Shooting cooldown (ms)

// Visual settings
this.lives = 3;                  // Starting lives
this.backgroundStars = 100;      // Number of stars
```

### Adding New Enemy Types
Create new invader types in `js/invader.js`:

```javascript
renderType3(ctx) {
    // Your custom enemy design
    ctx.fillStyle = 'red';
    // Add your drawing code here
}
```

### Custom Visual Effects
Extend the `Effects` class in `js/effects.js`:

```javascript
customExplosion(x, y) {
    // Your custom effect
}
```

## 🏆 High Score Features

The game tracks:
- Current score with real-time updates
- Maximum combo achieved
- Level progression
- Lives remaining

## 🐛 Known Issues & Limitations

- Game is currently single-player only
- No persistent high score storage (resets on page reload)
- Mobile touch controls not implemented
- Audio/sound effects not included

## 🚧 Future Enhancements

- [ ] Add sound effects and background music
- [ ] Implement touch controls for mobile devices
- [ ] Add local storage for high scores
- [ ] Create additional enemy types and bosses
- [ ] Add power-ups (multi-shot, shields, etc.)
- [ ] Implement multiplayer functionality
- [ ] Add level editor
- [ ] Create achievement system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow ES6+ JavaScript standards
- Add comments for complex game logic
- Test on multiple browsers
- Maintain 60fps performance
- Keep code modular and readable

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ngô Hữu Lộc**

## 🎮 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ❌ Internet Explorer (not supported)

## 📱 Responsive Design

The game automatically scales for different screen sizes:
- **Desktop**: Full size (800x600)
- **Tablet**: 80% scale
- **Mobile**: 60% scale

## 🎪 Demo

Simply open `index.html` in your browser to play the game immediately!

---

*Enjoy defending Earth from the alien invasion! 👾🚀*
