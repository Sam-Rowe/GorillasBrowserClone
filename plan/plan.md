# Gorillas Browser Clone - Project Plan

## Project Overview

A faithful browser-based recreation of the classic QBASIC "Gorillas" game using Phaser.io 3.90.0. Two gorillas positioned on city rooftops take turns throwing exploding bananas at each other in turn-based artillery gameplay with realistic physics, wind effects, and destructible environments.

## Original Game Reference

The original Gorillas game (GORILLA.BAS) featured:
- Procedurally generated city skylines with random building heights
- Two gorillas positioned on random buildings
- Turn-based gameplay with angle and velocity input
- Wind effects affecting banana trajectory
- Explosive bananas that create craters in buildings
- Simple CGA-style graphics (4-color palette)
- Score tracking across multiple rounds

## Technology Stack (COMMITTED)

- **Game Engine**: Phaser.io 3.90.0 (non-negotiible)
- **Language**: TypeScript 5.7.2
- **Build Tool**: Vite 6.3.1
- **Platform**: Web Browser
- **Physics**: Phaser 3 Arcade Physics or Matter.js

## Game Features & Requirements

### Core Gameplay (Original Fidelity)
- [ ] Turn-based artillery mechanics
- [ ] Physics-based banana projectiles with gravity
- [ ] Wind effects on trajectory (random per round)
- [ ] Explosive banana impacts with crater formation
- [ ] Building destruction and collision detection
- [ ] Gorilla positioning on building tops
- [ ] Win condition: hit opponent gorilla

### Visual Style (Enhanced Retro)
- [ ] Pixel art inspired style (not limited to 4 colors)
- [ ] Maximum 10 buildings with 50% height variation  
- [ ] Procedural city skyline generation
- [ ] Simple gorilla character sprites
- [ ] Banana projectile animation
- [ ] Explosion effects and building damage
- [ ] Enhanced retro-style UI and fonts
- [ ] Desktop-focused responsive design (not mobile)

### Game Modes
- [ ] Two-player local multiplayer (hot seat) - PRIMARY MODE
- [ ] Best-of-X match system
- [ ] Practice mode for learning controls

### UI/UX (Enhanced Retro Style)
- [ ] Keyboard-only text-based input for angle and velocity
- [ ] Prominent help menu showing all keyboard controls
- [ ] Simple menu system with keyboard navigation
- [ ] Score display and match tracking
- [ ] Player name entry
- [ ] Game over and winner announcement
- [ ] Wind indicator display
- [ ] Desktop-responsive design (no mobile/touch)

## Development Phases

### Phase 1: Core Foundation (Current)
- [x] Project setup with Phaser + Vite + TypeScript
- [ ] Basic game scene structure
- [ ] Initial documentation setup

### Phase 2: Game Physics
- [ ] Projectile physics implementation
- [ ] Gravity and wind systems
- [ ] Collision detection framework

### Phase 3: Game World
- [ ] City skyline generation
- [ ] Building destruction mechanics
- [ ] Gorilla positioning system

### Phase 4: Gameplay Logic
- [ ] Turn-based game loop
- [ ] Player input handling
- [ ] Win/lose conditions

### Phase 5: Polish & Features
- [ ] Audio integration
- [ ] Visual effects
- [ ] Help system and keyboard controls documentation
- [ ] UI enhancements
- [ ] Performance optimization

## Task Management

Individual tasks are tracked in separate `task-xx.md` files in this folder. Each task should include:
- Clear description and acceptance criteria
- Phaser.io specific implementation details
- Dependencies on other tasks
- Estimated effort and priority

## Success Criteria

- Faithful recreation of original Gorillas gameplay
- Smooth 60fps performance in modern browsers
- Responsive controls and physics
- Clean, maintainable Phaser 3 codebase
- Comprehensive documentation

## Resources

- [Phaser 3 Documentation](https://newdocs.phaser.io)
- [Original Gorillas Game Reference](https://en.wikipedia.org/wiki/Gorillas_(video_game))
- [Phaser 3 Examples](https://labs.phaser.io)