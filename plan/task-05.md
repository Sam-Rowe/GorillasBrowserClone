# Task 05: Projectile Physics System

## Status
- **Priority**: High
- **Status**: Not Started
- **Estimated Effort**: 4-5 hours  
- **Assigned To**: TBD
- **Depends On**: Task 04 (Player Input System)

## Description

Implement the core banana projectile physics system with realistic trajectory calculations, wind effects, and gravity. This is the heart of the Gorillas gameplay mechanics and must accurately simulate the original game's physics.

## Acceptance Criteria

- [ ] Banana sprite with smooth trajectory animation
- [ ] Realistic parabolic arc physics with gravity
- [ ] Wind effects that alter horizontal trajectory
- [ ] Proper velocity and angle calculations from input
- [ ] Collision detection with buildings and gorillas
- [ ] Projectile trails or visual feedback during flight
- [ ] Off-screen boundary detection (banana goes out of bounds)
- [ ] Physics match original game feel and mechanics

## Technical Requirements

### Phaser.io Implementation Details
- Use Phaser 3 Physics (Arcade or Matter.js for realistic physics)
- Implement custom Projectile class extending Phaser.Physics.Sprite
- Use Phaser's Tween system for smooth trajectory animation
- Implement proper collision detection with Phaser Physics
- Create ProjectileManager for managing active projectiles

### Physics Calculations
```typescript
// Projectile motion with wind
velocityX = initialVelocity * Math.cos(angleRadians) + windEffect
velocityY = initialVelocity * Math.sin(angleRadians)
// Each frame: apply gravity to velocityY
// Position update: x += velocityX, y += velocityY
```

### File Structure
```
src/game/objects/
├── Banana.ts
├── ProjectileManager.ts
└── PhysicsCalculator.ts

src/game/systems/
└── WindSystem.ts

public/assets/sprites/
└── banana.png
```

## Original Game Physics Specifications

- **Gravity**: Constant downward acceleration (~9.8 or scaled appropriately)
- **Wind**: Random value between -10 to +10, affects horizontal movement
- **Initial Velocity**: Based on player input (1-100 scale)
- **Angle**: 0-180 degrees converted to radians for calculations
- **Trajectory**: Smooth parabolic arc, pixel-by-pixel movement
- **Speed**: Appropriate timing (not too fast/slow to track visually)

## Implementation Notes

- Physics should feel authentic to original game
- Banana should be visible throughout entire trajectory
- Consider frame rate independence for smooth physics
- Wind effect should be noticeable but not overwhelming
- Implement proper coordinate system (Phaser vs mathematical conventions)
- Optimize collision detection for performance

## Visual Requirements

- **Banana Sprite**: Small pixel art banana (8x8 or 16x16 pixels)
- **Trail Effect**: Optional dotted trail showing trajectory path
- **Animation**: Banana rotation during flight for visual appeal
- **Wind Indicator**: Visual representation of wind strength/direction

## Collision System

- Check collision with building geometry each frame
- Check collision with gorilla sprites
- Handle off-screen boundaries (top, left, right, bottom)
- Prepare collision data for explosion/destruction system

## Testing Criteria

- [ ] Physics calculations produce realistic trajectories
- [ ] Wind effects are noticeable and consistent
- [ ] Banana moves smoothly without stuttering
- [ ] Collision detection is accurate and responsive
- [ ] Performance remains stable during projectile flight
- [ ] Various angle/velocity combinations work correctly
- [ ] Off-screen detection prevents infinite projectiles

## Related Tasks
- Task 06: Building Destruction (projectile impacts create craters)
- Task 08: Collision Detection (detailed collision handling)
- Task 03: Gorilla System (projectiles can hit gorillas)
- Task 09: Visual Effects (explosion effects on impact)