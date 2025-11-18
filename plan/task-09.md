# Task 09: Visual Effects & Animation System

## Status
- **Priority**: Medium
- **Status**: Not Started
- **Estimated Effort**: 4-5 hours
- **Assigned To**: TBD
- **Depends On**: Task 06 (Building Destruction), Task 08 (Collision Detection)

## Description

Implement visual effects system including explosion animations, particle effects, screen shake, and other visual feedback to enhance the gameplay experience while maintaining the retro aesthetic of the original Gorillas game.

## Acceptance Criteria

- [ ] Explosion animation on banana impact
- [ ] Particle effects for building debris
- [ ] Gorilla death/victory animations
- [ ] Banana trail effect during flight
- [ ] Screen shake on large explosions
- [ ] Simple smoke/dust effects
- [ ] Retro-style visual effects matching CGA aesthetics
- [ ] Optimized effects that don't impact performance

## Technical Requirements

### Phaser.io Implementation Details
- Use Phaser 3 Particle System for debris and smoke effects
- Implement custom Animation Manager for sprite-based effects
- Use Phaser Tweens for smooth animations and screen shake
- Create EffectsManager class for centralized effect coordination
- Utilize Phaser's efficient rendering for multiple particles

### Effect Types
```typescript
enum EffectType {
    EXPLOSION,          // Banana impact explosion
    DEBRIS,             // Building destruction particles  
    SMOKE,              // Post-explosion smoke
    GORILLA_DEATH,      // Gorilla hit animation
    GORILLA_VICTORY,    // Winner celebration
    BANANA_TRAIL,       // Projectile trail
    SCREEN_SHAKE        // Camera shake effect
}
```

### File Structure
```
src/game/effects/
├── EffectsManager.ts
├── ExplosionEffect.ts
├── ParticleEffects.ts
└── AnimationEffects.ts

public/assets/effects/
├── explosion_sprite.png
├── debris_particles.png
└── smoke_animation.png
```

## Visual Effect Specifications

### Explosion Effects
- **Style**: Simple circular explosion with radiating pattern
- **Colors**: Bright yellow/orange center, red outer ring
- **Duration**: 0.5-1 second animation
- **Size**: Proportional to crater size (50-80 pixel radius)
- **Animation**: Expanding circle with fade-out

### Particle Effects
- **Building Debris**: Small rectangular pieces flying from impact
- **Smoke Puffs**: Simple gray/white smoke rising from explosion
- **Dust Clouds**: Ground impact dust using simple particles
- **Color Palette**: Limited to CGA-style colors (4-color max)

### Gorilla Animations
- **Death Animation**: Simple fall/collapse or explosion effect
- **Victory Pose**: Arms raised or celebration gesture
- **Throwing Animation**: Arm movement during banana launch
- **Hit Reaction**: Brief flash or shake when hit

### Banana Trail
- **Style**: Dotted line or simple particle trail
- **Color**: Yellow/brown to match banana sprite
- **Length**: 3-5 dots following banana trajectory
- **Fade**: Older trail points fade out gradually

## Original Game Visual Style

- **Simplicity**: Very basic effects, no complex animations
- **Color Limits**: 4-color CGA palette (cyan, magenta, black, white)
- **Pixel Art**: Blocky, low-resolution aesthetic
- **Performance**: Effects should not slow down gameplay
- **Clarity**: Effects enhance gameplay, don't obscure important elements

## Implementation Notes

### Performance Considerations
- Limit number of active particles to maintain 60fps
- Use object pooling for frequently created/destroyed effects
- Efficient cleanup of completed animations
- Batch similar particle effects for optimal rendering

### Effect Coordination
- Effects triggered by game events (collisions, state changes)
- Proper layering (effects above/below game objects as appropriate)
- Effect timing coordinated with game state transitions
- Cleanup effects when rounds reset

### Retro Aesthetic Maintenance
- Keep effects simple and chunky (no smooth gradients)
- Use limited color palette consistently
- Prefer sprite-based effects over complex particle systems
- Maintain blocky pixel art style throughout

## Testing Criteria

- [ ] All effects trigger at appropriate game moments
- [ ] Effects enhance gameplay without causing confusion
- [ ] Performance remains smooth with all effects active
- [ ] Visual style consistent with retro game aesthetic
- [ ] Effects properly cleaned up and don't accumulate
- [ ] Screen shake feels good without being disorienting
- [ ] Color palette matches original game limitations

## Related Tasks
- Task 06: Building Destruction (triggers debris effects)
- Task 08: Collision Detection (triggers explosion effects)
- Task 07: Game State System (triggers victory/defeat effects)
- Task 11: Audio System (coordinate visual effects with sound effects)