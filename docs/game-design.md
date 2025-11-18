# Gorillas - Game Design Document

## Overview

A faithful recreation of the classic QBASIC Gorillas game for modern web browsers using Phaser.io. This document outlines the core game mechanics, visual design, and technical specifications for the browser-based version.

## Original Game Background

**Gorillas** was a classic artillery-style game included with MS-DOS QBASIC in the early 1990s. Players controlled gorillas positioned on city rooftops, taking turns throwing explosive bananas at each other. The game featured:

- Procedurally generated city skylines
- Realistic projectile physics with gravity and wind
- Destructible building environments  
- Turn-based gameplay with angle/velocity input
- Simple CGA graphics (4-color palette)

## Core Game Mechanics

### Gameplay Loop

1. **Round Setup**: Generate random city skyline, position gorillas on buildings
2. **Player Turn**: Current player inputs throwing angle (0-180°) and velocity (1-100)
3. **Projectile Phase**: Banana follows physics trajectory with wind effects
4. **Impact Resolution**: Check for hits on gorillas or buildings, create explosion crater
5. **Turn Transition**: Switch to other player or declare round winner
6. **Match Progression**: Continue rounds until match victory condition met

### Physics System

- **Gravity**: Constant downward acceleration affecting banana trajectory
- **Wind**: Random horizontal force (-10 to +10) affecting banana flight path
- **Projectile Motion**: Realistic parabolic trajectory based on angle and velocity
- **Collision**: Precise detection with buildings and gorilla sprites
- **Destruction**: Circular explosion craters remove building material

### Victory Conditions

- **Primary**: Direct hit on opponent gorilla with banana
- **Round Victory**: First player to hit opponent wins the round  
- **Match Victory**: Best-of-X rounds or first to reach target score

## Visual Design

### Art Style

- **Enhanced Pixel Art**: Chunky, low-resolution sprites inspired by original but not limited
- **Expanded Color Palette**: Retro pixel art aesthetic, not constrained to 4 colors
- **Simple Geometry**: Buildings as solid rectangles, up to 10 buildings per screen
- **Clean UI**: Text-based keyboard interface with monospace fonts
- **Desktop-Focused**: Designed for computer screens, responsive but not mobile-optimized

### Screen Layout

- **City Skyline**: Buildings fill lower 60-70% of screen
- **Sky Area**: Upper portion for banana trajectories  
- **UI Panel**: Bottom or side area for player input and game info
- **HUD Elements**: Current player, wind speed, scores displayed prominently

### Animation Requirements

- **Smooth Projectile**: 60fps banana trajectory with optional trail
- **Explosion Effects**: Brief flash and particle debris on impact
- **Gorilla Animations**: Basic throwing, hit, and victory poses
- **Building Destruction**: Real-time crater formation in buildings

## Technical Architecture

### Core Systems

1. **Scene Management**: Menu, gameplay, victory scenes with transitions
2. **City Generation**: Procedural building height algorithm
3. **Physics Engine**: Projectile simulation with gravity and wind
4. **Collision Detection**: Efficient building and gorilla hit detection  
5. **Destruction System**: Dynamic terrain modification for craters
6. **Audio System**: Retro sound effects and optional background music

### Performance Targets

- **Frame Rate**: Consistent 60fps during all gameplay
- **Load Time**: Under 3 seconds initial load on broadband
- **Memory Usage**: Efficient sprite and audio management
- **Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)

## User Experience

### Controls

- **Primary Input**: Keyboard-only number entry for angle and velocity
- **No Touch/Mouse**: Web-only desktop experience, no mobile controls
- **Menu Navigation**: Keyboard arrows and Enter exclusively
- **Help System**: Prominent help menu showing all keyboard controls
- **Game Flow**: Clear prompts and feedback at each step

### Accessibility

- **Visual Clarity**: High contrast retro colors, readable fonts
- **Input Validation**: Clear error messages for invalid entries
- **Game State**: Always-visible current player and turn information
- **Instructions**: Built-in help explaining controls and objectives

## Content Scope

### Launch Features (MVP)

- Complete core gameplay loop
- Two-player local multiplayer (hot seat)
- Basic menu system and settings
- Essential sound effects
- Match scoring system

### Future Enhancements

- Single-player vs AI opponent
- Online multiplayer capability  
- Additional game modes (practice, tournament)
- Enhanced visual effects and animations
- Mobile-optimized touch controls
- Accessibility improvements

## Quality Assurance

### Testing Requirements

- **Cross-browser compatibility** across major browsers
- **Performance testing** on various devices and screen sizes
- **Gameplay balance** ensuring fair and fun mechanics
- **User experience testing** with players unfamiliar with original
- **Edge case handling** for unusual input or game states

### Success Metrics

- **Authentic Feel**: Players recognize similarity to original game
- **Smooth Performance**: No significant frame drops or lag
- **Intuitive Controls**: New players can learn game quickly
- **Replay Value**: Matches remain engaging over multiple plays
- **Technical Stability**: No crashes or game-breaking bugs