# Task 03: Gorilla Character System

## Status
- **Priority**: High  
- **Status**: Not Started
- **Estimated Effort**: 3-4 hours
- **Assigned To**: TBD
- **Depends On**: Task 02 (City Skyline Generation)

## Description

Create the gorilla character system including sprite creation, positioning on building tops, and basic animations. Gorillas should be positioned randomly on buildings at the start of each round.

## Acceptance Criteria

- [ ] Create pixel art gorilla sprites (Player 1 and Player 2)
- [ ] Position gorillas on top of random buildings
- [ ] Ensure gorillas don't spawn too close to each other
- [ ] Implement basic gorilla animations (idle, throwing, hit)
- [ ] Gorillas face toward their target when throwing
- [ ] Visual indication of current player's turn
- [ ] Gorilla destruction/death animation

## Technical Requirements

### Phaser.io Implementation Details
- Use Phaser 3 Sprite class for gorilla characters
- Implement Phaser AnimationManager for character animations
- Use Phaser's positioning system for building-top placement
- Create custom Gorilla class extending Phaser.GameObjects.Sprite
- Implement turn-based state management

### Sprite Specifications (Original Style)
- **Size**: Approximately 32x32 pixels
- **Style**: Simple pixel art, CGA color palette
- **Colors**: Black outlines, brown/tan fill
- **Animations**: 
  - Idle (static or subtle animation)
  - Throwing (arm movement)
  - Hit/Death (explosion or fall)
  - Victory pose

### File Structure
```
src/game/objects/
├── Gorilla.ts
├── GorillaManager.ts
└── PlayerTurn.ts

public/assets/sprites/
├── gorilla_player1.png
├── gorilla_player2.png
└── gorilla_animations.json
```

## Original Game Specifications

- **Player 1**: Left side of screen, faces right
- **Player 2**: Right side of screen, faces left  
- **Positioning**: On building tops, minimum distance apart
- **Visual Style**: Simple blocky sprites, retro aesthetic
- **Turn Indication**: Current player highlighted or animated

## Implementation Notes

- Gorillas should be positioned after city generation
- Ensure adequate distance between gorillas for fair gameplay
- Consider building height when positioning (avoid too-low buildings)
- Implement simple state machine for gorilla behaviors
- Prepare for integration with input system and projectile system

## Collision & Interaction

- Gorillas should be valid collision targets for bananas
- Hit detection should trigger death/victory conditions
- Gorillas should not interfere with building collision
- Consider gorilla size in trajectory calculations

## Testing Criteria

- [ ] Gorillas spawn on appropriate building locations
- [ ] Never spawn too close to each other
- [ ] Animations play smoothly at 60fps
- [ ] Visual turn indication is clear
- [ ] Sprite quality matches retro aesthetic
- [ ] Proper layering (gorillas appear above buildings)

## Related Tasks
- Task 04: Player Input System (gorillas receive input)
- Task 05: Projectile Physics (gorillas launch projectiles) 
- Task 07: Win/Lose Conditions (gorilla hit detection)
- Task 09: Visual Effects (gorilla death animations)