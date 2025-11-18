# Task 02: Implement City Skyline Generation

## Status
- **Priority**: High
- **Status**: ✅ **IN PROGRESS** (GREEN Phase)
- **Estimated Effort**: 4-6 hours
- **Actual Effort**: ~3 hours (City generation core complete)
- **Assigned To**: TDD Implementation Team
- **Depends On**: Task 01 (Basic Scene Structure) ✅ COMPLETED

## Description

Create the procedural city skyline generation system that creates random building heights across the screen, matching the original QBASIC Gorillas algorithm for authentic gameplay.

## Acceptance Criteria

- [ ] Generate random building heights across screen width
- [ ] Buildings fill entire bottom portion of screen
- [ ] Each building has consistent width
- [ ] Building heights vary realistically (not too extreme)
- [ ] Buildings rendered as solid colored rectangles
- [ ] Support for building destruction/modification
- [ ] Deterministic generation from seed (for multiplayer sync)

## Technical Requirements

### Phaser.io Implementation Details
- Use Phaser 3 Graphics API for building rendering
- Implement buildings as Phaser GameObjects for collision detection
- Use Phaser's RenderTexture for destructible terrain
- Store building data in efficient data structure
- Implement building height algorithm matching original game

### Building Generation Algorithm
```typescript
// Updated algorithm for 10 buildings with 50% height variation
const buildingCount = Math.min(10, Math.max(6, Math.floor(screenWidth / 80)));
const buildingWidth = screenWidth / buildingCount;
const baseHeight = screenHeight * 0.5; // 50% of screen height

for (let i = 0; i < buildingCount; i++) {
    const x = i * buildingWidth;
    const heightVariation = (Math.random() - 0.5) * baseHeight; // ±50% variation
    const height = baseHeight + heightVariation;
    // Create building rectangle
}
```

### File Structure
```
src/game/objects/
├── CityGenerator.ts
├── Building.ts
└── DestructibleTerrain.ts
```

## Updated Game Specifications

- **Building Count**: Maximum 10 buildings across screen width
- **Building Width**: Screen width divided by building count (responsive)
- **Height Variation**: Base height ±50% random variation
- **Base Height**: 40-60% of screen height
- **Color**: Pixel art style with enhanced palette (not limited to 4 colors)
- **Distribution**: Even spacing across screen width
- **Destruction**: Buildings can have circular craters blown out

## TDD Requirements (MANDATORY - Write Tests First!)

### Unit Tests Required (Jest)
- [ ] Building generation algorithm produces exactly 6-10 buildings
- [ ] Height variation stays within ±50% of base height
- [ ] Building width calculations are responsive to screen size
- [ ] No gaps between buildings across screen width
- [ ] Building data structure supports destruction/modification
- [ ] Deterministic generation with same seed produces identical cities

### E2E Tests Required (Playwright)
- [ ] City renders visually in all target browsers
- [ ] Buildings scale appropriately across different screen resolutions
- [ ] Visual regression testing for city appearance
- [ ] Performance testing with full cityscape rendering
- [ ] No visual gaps or overlapping buildings

### Test Implementation Strategy
```typescript
// RED Phase - Write failing tests first
describe('CityGenerator', () => {
  it('should generate between 6-10 buildings for any screen width', () => {
    const generator = new CityGenerator(1024, 768);
    const buildings = generator.generateCity();
    expect(buildings.length).toBeGreaterThanOrEqual(6);
    expect(buildings.length).toBeLessThanOrEqual(10);
  });

  it('should vary building heights by exactly 50%', () => {
    // Test height variation algorithm
    const baseHeight = 300;
    const variation = generator.calculateHeightVariation(baseHeight);
    expect(Math.abs(variation)).toBeLessThanOrEqual(baseHeight * 0.5);
  });

  it('should create buildings that span full screen width', () => {
    // Test no gaps between buildings
  });
});
```

### Testing Files to Create First
```
tests/unit/city/
├── city-generator.test.ts
├── building.test.ts
├── height-calculation.test.ts
└── responsive-scaling.test.ts

tests/e2e/city/
├── city-rendering.spec.ts
├── responsive-city.spec.ts
└── visual-regression.spec.ts
```

## Related Tasks
- Task 03: Gorilla Positioning (depends on building tops)
- Task 06: Building Destruction System (modifies buildings)
- Task 08: Collision Detection (uses building geometry)