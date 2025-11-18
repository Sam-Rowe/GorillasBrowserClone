# Task 11: Audio System & Sound Effects

## Status
- **Priority**: Low
- **Status**: Not Started  
- **Estimated Effort**: 2-3 hours
- **Assigned To**: TBD
- **Depends On**: Task 09 (Visual Effects), Task 10 (UI System)

## Description

Implement audio system with sound effects and background music that enhances the retro gaming experience. Audio should complement the visual style with classic 8-bit or PC Speaker-style sounds reminiscent of the original QBASIC era.

## Acceptance Criteria

- [ ] Sound effects for banana throws, explosions, and impacts
- [ ] Victory/defeat audio feedback  
- [ ] Menu navigation sound effects
- [ ] Background music (optional, with on/off toggle)
- [ ] Retro-style audio matching original game era
- [ ] Audio settings and volume controls
- [ ] Optimized audio loading and playback
- [ ] Cross-browser audio compatibility

## Technical Requirements

### Phaser.io Implementation Details
- Use Phaser 3 Audio Manager for sound loading and playback
- Implement AudioManager class for centralized sound control
- Use Phaser's Web Audio API for modern browsers, fallback for compatibility
- Create audio pools for frequently played sounds
- Integrate with UI settings for volume control

### Audio Categories
```typescript
enum AudioType {
    SFX_THROW,          // Banana launch sound
    SFX_EXPLOSION,      // Impact explosion
    SFX_HIT_GORILLA,    // Direct hit on gorilla
    SFX_HIT_BUILDING,   // Building impact
    SFX_VICTORY,        // Round/match victory
    SFX_DEFEAT,         // Round/match defeat
    SFX_MENU_SELECT,    // Menu navigation
    BGM_GAMEPLAY,       // Background music during play
    BGM_MENU            // Main menu music
}
```

### File Structure
```
src/game/audio/
├── AudioManager.ts
├── SoundEffects.ts
└── MusicManager.ts

public/assets/audio/
├── sfx/
│   ├── throw.wav
│   ├── explosion.wav
│   ├── hit_gorilla.wav
│   ├── hit_building.wav
│   ├── victory.wav
│   └── menu_select.wav
└── music/
    ├── gameplay.ogg
    └── menu.ogg
```

## Retro Audio Style

### Sound Effect Characteristics
- **PC Speaker Style**: Simple waveforms, limited frequency range
- **8-bit Aesthetic**: Chiptune-inspired sound design
- **Short Duration**: Brief, punchy sound effects (0.1-1 second)
- **Low Fidelity**: Deliberately lo-fi to match visual style
- **Synthetic**: Electronic/digital sounds rather than realistic samples

### Original Game Audio Reference
- **Throw Sound**: Simple ascending tone or "whoosh" 
- **Explosion**: Classic 8-bit explosion with descending pitch
- **Victory**: Cheerful ascending melody or fanfare
- **No Music**: Original had minimal audio, mostly sound effects
- **PC Speaker**: Hardware limitations created distinctive sound character

## Implementation Notes

### Audio Format Considerations
- **Primary**: OGG Vorbis for modern browsers
- **Fallback**: MP3 for broader compatibility  
- **Web Audio**: Use Web Audio API for precise timing and effects
- **File Size**: Keep audio files small for fast loading
- **Compression**: Balance quality vs. file size for web delivery

### Performance Optimization
- Preload essential sound effects during game initialization
- Use audio sprites for multiple short sounds in single file
- Implement audio pooling to prevent memory leaks
- Lazy load background music to reduce initial load time

### Cross-Platform Compatibility  
- Test audio playback across different browsers
- Handle audio context restrictions (user interaction requirements)
- Provide fallback options for audio playback failures
- Consider mobile device audio limitations and battery usage

## Audio Integration Points

### Gameplay Events
- **Banana Launch**: Play throw sound when projectile fires
- **Impact Events**: Different sounds for building vs. gorilla hits
- **Explosions**: Explosion sound synchronized with visual effect
- **Turn Changes**: Subtle audio cue for player transitions

### UI Events
- **Menu Navigation**: Click/select sounds for buttons
- **Input Validation**: Error sounds for invalid inputs
- **Victory Screens**: Celebratory music or fanfares
- **Settings Changes**: Audio feedback for setting adjustments

## Audio Settings & Control

### User Controls
- **Master Volume**: Overall audio level control
- **SFX Volume**: Sound effects volume (separate from music)
- **Music Volume**: Background music level
- **Mute Toggle**: Complete audio disable option
- **Audio Quality**: Optional quality settings for performance

### Settings Integration
- Audio preferences saved to local storage
- Settings accessible from main menu and pause menu
- Real-time preview of volume changes
- Respect system-level audio preferences where possible

## Testing Criteria

- [ ] All sound effects play at appropriate game moments
- [ ] Audio volume controls work correctly
- [ ] No audio glitches or cutting off abruptly  
- [ ] Cross-browser audio compatibility verified
- [ ] Audio enhances gameplay without being intrusive
- [ ] Performance impact minimal (no audio-related frame drops)
- [ ] Audio settings persist between sessions

## Related Tasks
- Task 09: Visual Effects (audio synchronized with visual effects)
- Task 10: UI System (audio controls integrated in settings)
- Task 07: Game State System (audio responds to game events)
- Task 12: Settings System (audio preferences management)