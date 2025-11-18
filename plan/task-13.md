# Task 13: Help System & Keyboard Controls

## Status
- **Priority**: High
- **Status**: Not Started
- **Estimated Effort**: 2-3 hours
- **Assigned To**: TBD
- **Depends On**: Task 01 (Basic Scene Structure), Task 10 (UI System)

## Description

Create a comprehensive help system that clearly explains all keyboard controls and game mechanics. This should be prominently accessible from the main menu and during gameplay to ensure players understand how to play the game.

## Acceptance Criteria

- [ ] Dedicated Help/Controls scene accessible from main menu
- [ ] In-game help overlay (F1 key or similar)
- [ ] Clear explanation of all keyboard controls
- [ ] Game mechanics explanation (angle, velocity, wind)
- [ ] Visual diagrams showing control layout
- [ ] Easy navigation back to menu or game
- [ ] Keyboard-only navigation through help system
- [ ] Consistent with retro pixel art aesthetic

## Technical Requirements

### Phaser.io Implementation Details
- Create HelpScene extending Phaser.Scene
- Use Phaser DOM Elements for scrollable text content
- Implement keyboard navigation (arrows, Enter, Escape)
- Create reusable help overlay component for in-game use
- Integrate with existing UI manager and scene system

### Help Content Structure
```typescript
interface HelpSection {
    title: string;
    controls: ControlMapping[];
    description: string;
    examples?: string[];
}

interface ControlMapping {
    key: string;
    action: string;
    context: 'menu' | 'game' | 'global';
}
```

### File Structure
```
src/game/scenes/
├── HelpScene.ts
└── HelpOverlay.ts

src/game/ui/
├── HelpManager.ts
└── ControlsDisplay.ts

docs/
└── controls-reference.md
```

## Control Documentation Requirements

### Menu Controls
- **Arrow Keys**: Navigate menu options
- **Enter**: Select menu option
- **Escape**: Go back/exit
- **F1**: Open help (from any screen)

### Gameplay Controls
- **Number Keys (0-9)**: Enter angle and velocity values
- **Enter**: Confirm input and fire banana
- **Backspace**: Clear/correct input
- **Escape**: Pause menu
- **F1**: In-game help overlay

### Help Navigation
- **Arrow Keys**: Scroll through help sections
- **Page Up/Down**: Fast scroll through content
- **Escape**: Close help and return to previous screen
- **Tab**: Jump between help sections

## Visual Design Specifications

### Help Screen Layout
- **Title**: "HELP & CONTROLS" in pixel font
- **Sections**: 
  1. Game Objective
  2. Menu Controls  
  3. Gameplay Controls
  4. Game Mechanics (angle, velocity, wind)
  5. Winning Conditions
- **Footer**: "Press ESC to return"

### Visual Elements
- **Control Diagrams**: Simple keyboard layout showing relevant keys
- **Gameplay Examples**: "Angle 45, Velocity 75 = Medium arc"
- **Wind Indicator**: Explanation of wind effects on trajectory
- **Pixel Art Icons**: Small sprites illustrating concepts

### Responsive Design
- Scale appropriately for different desktop screen sizes
- Maintain readability across resolutions
- Consistent pixel art aesthetic
- Clear visual hierarchy for scanning information

## Content Specifications

### Game Objective Section
```
OBJECTIVE: Hit the other gorilla with your banana!

Two gorillas stand on city buildings. Take turns 
throwing explosive bananas at each other. First 
to score a direct hit wins the round!
```

### Controls Reference
```
MENU CONTROLS:
↑↓ Arrow Keys    - Navigate menu
Enter           - Select option
F1              - Show this help
Esc             - Go back

GAMEPLAY CONTROLS:
Number Keys     - Enter angle (0-180) and velocity (1-100)
Enter           - Fire banana
Backspace       - Clear input
F1              - Show help
Esc             - Pause game
```

### Game Mechanics Explanation
```
ANGLE: 0-180 degrees
  0° = Straight right
  45° = Diagonal up-right  
  90° = Straight up
  135° = Diagonal up-left
  180° = Straight left

VELOCITY: 1-100 power
  Low = Short distance
  High = Long distance

WIND: Affects banana flight
  → = Pushes banana right
  ← = Pushes banana left
```

## Implementation Notes

### Accessibility
- High contrast text for readability
- Consistent keyboard navigation patterns
- Clear visual focus indicators
- Logical tab order through content

### Integration Points
- Help accessible from main menu (prominent button)
- In-game help overlay (F1 key binding)
- Context-sensitive help (show relevant controls only)
- Quick reference card during first gameplay

### Performance Considerations
- Efficient text rendering for long help content
- Fast scene transitions to/from help
- Minimal memory usage for help overlay
- Smooth scrolling through help sections

## Testing Criteria

- [ ] All keyboard controls clearly documented and accurate
- [ ] Help accessible from all appropriate game states
- [ ] Navigation through help system works smoothly
- [ ] Content is clear and easy to understand for new players
- [ ] Visual design matches game aesthetic consistently
- [ ] Performance remains smooth with help overlay active
- [ ] Help content scales appropriately on different screen sizes

## Related Tasks
- Task 01: Basic Scene Structure (help integrates with scene system)
- Task 04: Player Input System (documents input controls)
- Task 10: UI/UX System (help uses UI components)
- Task 07: Game State System (help accessible from game states)