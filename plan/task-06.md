# Task 06: Building Destruction System

## Status  
- **Priority**: High
- **Status**: Not Started
- **Estimated Effort**: 5-6 hours
- **Assigned To**: TBD  
- **Depends On**: Task 02 (City Generation), Task 05 (Projectile Physics)

## Description

Implement the destructible building system where banana explosions create circular craters in buildings. This system must dynamically modify the city geometry and handle gorilla repositioning when buildings are destroyed beneath them.

## Acceptance Criteria

- [ ] Circular explosion craters in buildings where bananas hit
- [ ] Dynamic building geometry modification 
- [ ] Gorillas fall if building destroyed beneath them
- [ ] Crater size proportional to explosion power
- [ ] Buildings can be completely destroyed with enough damage
- [ ] Collision detection updates with modified building shapes
- [ ] Visual debris/destruction effects
- [ ] Performance optimization for real-time terrain modification

## Technical Requirements

### Phaser.io Implementation Details
- Use Phaser 3 RenderTexture for destructible terrain
- Implement pixel-perfect collision detection with modified buildings
- Use Phaser Graphics API for crater rendering/masking
- Create DestructionManager class for handling building modifications
- Update physics bodies when buildings change shape

### Destruction Algorithm
```typescript
// Create circular crater at impact point
const craterRadius = explosionPower; // Based on velocity or fixed
const impactX = banana.x;
const impactY = banana.y;

// Remove pixels in circular area
for (building in affectedBuildings) {
    building.createCrater(impactX, impactY, craterRadius);
}
```

### File Structure
```
src/game/systems/
├── DestructionManager.ts
├── CraterGenerator.ts
└── TerrainModifier.ts

src/game/objects/
├── DestructibleBuilding.ts
└── ExplosionEffect.ts
```

## Original Game Specifications

- **Crater Shape**: Perfect circle centered on banana impact
- **Crater Size**: ~50-80 pixel radius (adjust for screen resolution)
- **Building Destruction**: Buildings can be completely leveled
- **Gorilla Falls**: If gorilla's building destroyed, they fall and take damage
- **Multiple Hits**: Buildings accumulate damage over multiple explosions
- **Visual Style**: Simple removal of building pixels (no complex debris)

## Implementation Challenges

### Dynamic Collision Updates
- Update Phaser physics bodies after terrain modification
- Maintain efficient collision detection with irregular building shapes
- Handle edge cases where buildings become disconnected fragments

### Gorilla Repositioning  
- Detect when gorilla's building is destroyed
- Animate gorilla falling to new surface or ground
- Handle game state if gorilla falls off screen

### Performance Optimization
- Minimize texture updates and redraws
- Efficient pixel manipulation for large craters
- Batch multiple destruction operations when possible

## Visual Effects

- **Explosion Animation**: Brief flash/particle effect at impact
- **Debris**: Small pieces flying from destruction point  
- **Smoke**: Simple smoke puff effect after explosion
- **Screen Shake**: Subtle camera shake on large explosions

## Testing Criteria

- [ ] Craters appear correctly at banana impact points
- [ ] Building collision updates immediately after destruction
- [ ] Gorillas fall appropriately when buildings destroyed
- [ ] Performance remains smooth during destruction sequences
- [ ] Multiple craters can coexist in same building
- [ ] Edge cases handled (gorillas on building edges, etc.)
- [ ] Visual effects enhance gameplay without distracting

## Related Tasks
- Task 08: Enhanced Collision Detection (uses modified building geometry)
- Task 03: Gorilla System (gorillas affected by building destruction)  
- Task 09: Visual Effects (explosion and destruction effects)
- Task 07: Win/Lose Conditions (gorilla falling can affect game outcome)