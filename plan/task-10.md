# Task 10: UI/UX & Menu System

## Status  
- **Priority**: Medium
- **Status**: Not Started
- **Estimated Effort**: 4-6 hours
- **Assigned To**: TBD
- **Depends On**: Task 01 (Basic Scene Structure), Task 07 (Game State System)

## Description

Create a complete user interface system including main menu, game HUD, settings, and victory screens. Design should match the retro aesthetic of the original QBASIC Gorillas while providing modern usability improvements.

## Acceptance Criteria

- [ ] Main menu with game start, settings, and instructions
- [ ] In-game HUD showing current player, wind, and scores  
- [ ] Player name entry system
- [ ] Game settings menu (match length, difficulty, etc.)
- [ ] Victory/defeat screens with match results
- [ ] Instructions/help screen explaining controls
- [ ] Pause menu during gameplay
- [ ] Responsive design for different screen sizes

## Technical Requirements

### Phaser.io Implementation Details
- Use Phaser 3 DOM Elements and Scene UI for interface
- Create reusable UI components (buttons, panels, text displays)
- Implement proper scene transitions between menus
- Use Phaser's Input Manager for menu navigation  
- Create UIManager class for consistent styling and behavior

### UI Scene Structure
```typescript
// Scene hierarchy
MainMenu -> GameScene (with HUD overlay)
MainMenu -> SettingsMenu -> MainMenu
GameScene -> PauseMenu -> GameScene
GameScene -> VictoryScreen -> MainMenu
```

### File Structure
```
src/game/ui/
├── UIManager.ts
├── MainMenuScene.ts  
├── SettingsScene.ts
├── HUDOverlay.ts
├── VictoryScene.ts
└── UIComponents.ts

public/assets/ui/
├── retro_font.png
├── button_sprites.png
└── ui_panels.png
```

## UI Design Specifications

### Enhanced Retro Aesthetic Requirements
- **Color Palette**: Pixel art inspired (not limited to 4 colors, but retro style)
- **Typography**: Monospace/pixel font resembling DOS/QBASIC era
- **Layout**: Simple, centered designs optimized for desktop/laptop screens
- **Buttons**: Blocky, pixelated button styles (keyboard navigation focused)
- **Backgrounds**: Solid colors or simple patterns, no gradients
- **Help Integration**: Prominent help menu showing all keyboard controls
- **Responsive Design**: Scales for different desktop resolutions (not mobile)

### Main Menu
- **Title**: "GORILLAS" in large pixel font
- **Options**: 
  - Start Two Player Game
  - Help/Controls (prominent placement)
  - Settings
  - Exit/Quit
- **Background**: Simple animated cityscape or solid color
- **Keyboard Navigation**: Clear visual indicators for keyboard selection

### Game HUD  
- **Current Player**: "Player 1's Turn" / "Player 2's Turn"
- **Wind Indicator**: "Wind: 5 mph →" or similar
- **Score Display**: "Player 1: 3 - Player 2: 1"
- **Input Fields**: Angle and Velocity with labels
- **Action Button**: "FIRE!" button for launching banana

### Settings Menu
- **Match Length**: Best of 3, 5, 7, etc.
- **Player Names**: Text input for custom names
- **Sound**: On/Off toggle
- **Difficulty**: Wind strength, gorilla accuracy, etc.
- **Screen Resolution**: Scaling options if needed

## Original Game UI Reference

- **Simple Text Menus**: All text-based with keyboard navigation
- **Monospace Font**: Consistent character spacing
- **Minimal Graphics**: Focus on functionality over aesthetics  
- **Clear Information**: Wind speed, player turn, scores prominently displayed
- **Input Prompts**: Clear prompts for angle and velocity entry

## Implementation Notes

### Responsive Design
- Scale UI elements appropriately for different screen sizes
- Maintain pixel-perfect appearance across resolutions
- Ensure text remains readable at all scales
- Touch-friendly button sizes for mobile devices

### Accessibility
- Clear visual hierarchy and contrast
- Keyboard navigation support
- Screen reader friendly text (where possible)
- Simple, intuitive navigation flow

### State Management
- UI state synchronized with game state
- Proper cleanup when transitioning between scenes
- Save/load settings persistence
- Maintain player preferences across sessions

## User Experience Flow

1. **Startup**: Main menu appears with options
2. **Game Setup**: Players enter names, configure match
3. **Gameplay**: Clean HUD with essential information
4. **Round Results**: Brief victory/defeat feedback
5. **Match End**: Final scores and return to menu
6. **Settings**: Easy access to configuration options

## Testing Criteria

- [ ] All menu navigation works smoothly
- [ ] UI elements scale properly across screen sizes  
- [ ] Text is readable and well-contrasted
- [ ] Input validation works in all forms
- [ ] Settings persist between game sessions
- [ ] UI updates correctly reflect game state changes
- [ ] Visual style matches retro aesthetic consistently
- [ ] Performance remains smooth with UI active

## Related Tasks
- Task 04: Player Input System (integrates with UI forms)
- Task 07: Game State System (UI reflects game states)
- Task 11: Audio System (UI provides audio controls)
- Task 12: Settings & Configuration (UI manages game settings)