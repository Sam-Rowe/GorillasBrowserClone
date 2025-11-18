# Task 07: Game State & Win/Lose System

## Status
- **Priority**: Medium
- **Status**: Not Started  
- **Estimated Effort**: 3-4 hours
- **Assigned To**: TBD
- **Depends On**: Task 03 (Gorilla System), Task 05 (Projectile Physics)

## Description

Implement the complete game state management system including turn tracking, win/lose conditions, score keeping, and match progression. Handle victory conditions when gorillas are hit and manage multi-round matches.

## Acceptance Criteria

- [ ] Turn-based game state management (Player 1/Player 2 alternation)
- [ ] Direct hit detection (banana hits gorilla = win)
- [ ] Round win/lose announcements
- [ ] Multi-round match scoring system  
- [ ] Game over conditions and match winner determination
- [ ] New round initialization after each round ends
- [ ] Player statistics tracking (hits, misses, rounds won)
- [ ] Proper game flow from start to finish

## Technical Requirements

### Phaser.io Implementation Details
- Create GameStateManager class for centralized state control
- Use Phaser Events for game state communication
- Implement proper scene transitions for game states
- Create ScoreManager for tracking match statistics
- Use Phaser Data Manager for persistent score storage

### Game States
```typescript
enum GameState {
    MENU,           // Main menu
    ROUND_START,    // Begin new round
    PLAYER_TURN,    // Waiting for player input
    PROJECTILE_FLIGHT, // Banana in motion
    IMPACT,         // Explosion/collision resolution
    ROUND_END,      // Round victory/defeat
    MATCH_END       // Overall match completion
}
```

### File Structure
```
src/game/managers/
├── GameStateManager.ts
├── ScoreManager.ts
├── MatchManager.ts
└── TurnManager.ts

src/game/scenes/
├── VictoryScene.ts
└── ScoreScene.ts
```

## Original Game Specifications

### Win Conditions
- **Primary**: Direct hit on opponent gorilla with banana
- **Secondary**: Gorilla falls due to building destruction (optional)
- **Round Victory**: First to hit opponent wins the round
- **Match Victory**: Best of X rounds or first to Y total wins

### Game Flow
1. **Round Start**: Generate city, position gorillas, set initial wind
2. **Turn Phase**: Current player inputs angle/velocity  
3. **Action Phase**: Banana flies, collision detection
4. **Resolution**: Determine hit/miss, update game state
5. **Round End**: Announce winner, update scores
6. **Next Round**: Reset for new round or end match

## Implementation Notes

### State Transitions
- Clean transitions between all game states
- Proper cleanup when rounds end (reset positions, regenerate city)
- Maintain match-level data across rounds (scores, player names)
- Handle edge cases (simultaneous hits, timeout conditions)

### Score System
- Track individual round wins
- Optional: Track accuracy statistics (hits/total throws)
- Display running match score during gameplay
- Final match results screen

### Player Management  
- Support for player names/identifiers
- Turn indication and current player highlighting
- Handle AI player integration (future enhancement)

## User Experience Features

### Victory Announcements
- **Round Win**: "Player X Wins the Round!"
- **Match Win**: "Player X Wins the Match! (X-Y)"
- **Hit Confirmation**: Clear feedback when gorilla is hit
- **Miss Feedback**: Indication when shots miss target

### Match Configuration
- Configurable match length (best of 3, 5, etc.)
- Option for single round or continuous play
- Score display during match progression
- Pause/resume functionality

## Testing Criteria

- [ ] All win conditions properly detected and handled
- [ ] Score tracking accurate across multiple rounds  
- [ ] Clean transitions between game states
- [ ] Proper cleanup and reset between rounds
- [ ] Victory announcements display correctly
- [ ] Match can be played from start to finish
- [ ] Edge cases handled gracefully (draws, errors, etc.)

## Related Tasks
- Task 08: Enhanced Collision Detection (determines hit/miss)
- Task 04: Player Input System (integrates with turn management)
- Task 10: UI/UX Polish (victory screens and score displays)
- Task 11: Audio System (victory sounds and music)