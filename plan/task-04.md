# Task 04: Player Input System

## Status
- **Priority**: Medium
- **Status**: Not Started  
- **Estimated Effort**: 2-3 hours
- **Assigned To**: TBD
- **Depends On**: Task 01 (Basic Scene Structure)

## Description

Implement the player input system for controlling gorilla throws, including angle and velocity input with validation. Should match the original QBASIC game's text-based input system but with modern UI improvements.

## Acceptance Criteria

- [ ] Text-based input for angle (0-180 degrees) and velocity (1-100)
- [ ] Input validation and range checking
- [ ] Visual feedback for current player's turn
- [ ] Keyboard-only input (no mouse/touch controls)
- [ ] Submit throw command (Enter key)
- [ ] Display current wind speed and direction
- [ ] Help menu showing keyboard controls clearly
- [ ] Input disable during projectile flight
- [ ] Error messages for invalid input values
- [ ] Two-player local multiplayer (hot seat) support

## Technical Requirements

### Phaser.io Implementation Details
- Use Phaser 3 DOM Elements for input fields
- Implement input validation using TypeScript
- Use Phaser's Input Manager for keyboard events
- Create InputManager class for turn-based input handling
- Integrate with scene state management system

### Input Specifications (Original Style)
- **Angle**: 0-180 degrees (0 = horizontal right, 90 = straight up, 180 = horizontal left)
- **Velocity**: 1-100 (arbitrary units, affects banana speed/distance)
- **Interface**: Text-based numerical input with labels
- **Validation**: Range checking with user feedback
- **Wind Display**: Show current wind speed (-10 to +10) and direction

### File Structure
```
src/game/ui/
├── InputManager.ts
├── PlayerUI.ts
└── ValidationUtils.ts

src/game/systems/
└── TurnManager.ts
```

## Original Game Input Flow

1. Display current player name/number
2. Show wind speed and direction
3. Prompt for angle (0-180)
4. Validate angle input
5. Prompt for velocity (1-100)  
6. Validate velocity input
7. Fire projectile with entered parameters
8. Switch to other player after projectile completes

## Implementation Notes

- Input should be disabled during animations and projectile flight
- Provide clear visual feedback for whose turn it is
- Consider adding input history/suggestions
- Implement proper error handling and user feedback
- Maintain retro aesthetic in UI design
- Support both keyboard and potential mouse input

## User Interface Design

- **Style**: Retro terminal-like appearance
- **Colors**: Match CGA palette (cyan text on black background)
- **Font**: Monospace/pixel font for authenticity
- **Layout**: Bottom or side panel for input controls
- **Feedback**: Clear success/error messaging

## Testing Criteria

- [ ] All input validation works correctly
- [ ] Invalid inputs show appropriate error messages
- [ ] Input state properly managed during turn transitions
- [ ] Keyboard input responsive and accurate
- [ ] UI elements properly styled and positioned
- [ ] Input disabled at appropriate times
- [ ] Wind display updates correctly each turn

## Related Tasks
- Task 05: Projectile Physics (receives input parameters)
- Task 03: Gorilla System (input triggers gorilla actions)
- Task 07: Turn Management (input system integrates with turns)
- Task 10: UI/UX Polish (input styling and feedback)