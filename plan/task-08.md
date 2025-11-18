# Task 08: Enhanced Collision Detection System

## Status
- **Priority**: High
- **Status**: Not Started
- **Estimated Effort**: 3-4 hours
- **Assigned To**: TBD  
- **Depends On**: Task 05 (Projectile Physics), Task 06 (Building Destruction)

## Description

Implement precise collision detection between bananas and all game objects (buildings, gorillas, screen boundaries). Must handle both pixel-perfect collision with irregular building shapes and efficient broad-phase collision detection.

## Acceptance Criteria

- [ ] Accurate banana-to-building collision detection
- [ ] Precise banana-to-gorilla collision detection  
- [ ] Efficient broad-phase collision culling
- [ ] Pixel-perfect collision for destructible buildings
- [ ] Screen boundary collision detection
- [ ] Collision response system (explosions, bounces, etc.)
- [ ] Optimized for 60fps performance
- [ ] Handle edge cases (simultaneous collisions, etc.)

## Technical Requirements

### Phaser.io Implementation Details
- Use Phaser 3 Physics system (Arcade Physics for basic, Matter.js for precision)
- Implement custom collision detection for irregular building shapes
- Create CollisionManager class for centralized collision handling
- Use Phaser's efficient spatial partitioning for performance
- Implement collision callbacks for different object types

### Collision Types
```typescript
enum CollisionType {
    BANANA_BUILDING,    // Banana hits building (explosion)
    BANANA_GORILLA,     // Banana hits gorilla (victory)
    BANANA_BOUNDARY,    // Banana leaves screen (miss)
    GORILLA_BUILDING    // Gorilla falls onto building
}
```

### File Structure
```
src/game/systems/
├── CollisionManager.ts
├── CollisionDetector.ts
└── CollisionResponse.ts

src/game/physics/
├── PixelCollision.ts
└── BoundaryChecker.ts
```

## Collision Detection Methods

### Building Collision
- **Broad Phase**: AABB (bounding box) collision for quick elimination
- **Narrow Phase**: Pixel-perfect collision with building silhouette
- **Irregular Shapes**: Handle buildings with craters and damage
- **Optimization**: Spatial hashing or quad-tree for multiple buildings

### Gorilla Collision  
- **Simple Bounds**: Rectangular collision box around gorilla sprite
- **Precision**: Consider gorilla sprite transparency for accuracy
- **State Checking**: Only collide with "alive" gorillas
- **Priority**: Gorilla collision takes precedence over building collision

### Screen Boundaries
- **Left/Right**: Banana exits screen horizontally
- **Top**: Banana flies too high (rare but possible)
- **Bottom**: Banana hits ground/bottom of screen

## Original Game Behavior

- **Building Hit**: Immediate explosion, crater formation, no bounce
- **Gorilla Hit**: Instant victory condition, gorilla death animation  
- **Ground Hit**: Explosion on ground level, no building damage
- **Miss**: Banana disappears off-screen, turn ends
- **Precision**: Original used simple rectangular collision zones

## Implementation Notes

### Performance Optimization
- Use efficient collision detection algorithms
- Avoid checking collision every pixel of trajectory
- Implement collision prediction for fast-moving projectiles
- Cache collision data for static objects

### Collision Response
- Different responses for different collision types
- Explosion effects triggered by collision system
- Game state updates managed through collision callbacks
- Clean separation between detection and response

### Edge Case Handling
- Simultaneous collision with multiple objects
- High-velocity projectiles that might "tunnel" through objects  
- Collision at exact building edges or corners
- Multiple gorillas in collision range (future multiplayer)

## Testing Criteria

- [ ] All collision types detected accurately
- [ ] No false positives or missed collisions
- [ ] Performance maintains 60fps with complex building shapes
- [ ] Collision responses trigger appropriate game events
- [ ] Edge cases handled without crashes or glitches
- [ ] Collision detection works across different screen resolutions
- [ ] Pixel-perfect accuracy where required

## Related Tasks
- Task 05: Projectile Physics (projectiles need collision detection)
- Task 06: Building Destruction (collision triggers destruction)
- Task 07: Win/Lose System (gorilla collision triggers victory)
- Task 09: Visual Effects (collision triggers explosion effects)