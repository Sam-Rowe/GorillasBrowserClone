# Test-Driven Development (TDD) Workflow - Gorillas Project

## 🚨 CRITICAL: NO CODE WITHOUT TESTS FIRST

This document outlines the **mandatory** TDD workflow for the Gorillas Browser Clone project. **Every feature must follow this process - no exceptions.**

## TDD Cycle Overview

```
🔴 RED → 🟢 GREEN → 🔵 REFACTOR → 🔄 REPEAT
```

### 🔴 RED Phase: Write Failing Tests
**BEFORE writing any production code:**

1. **Understand the requirement** from the task specification
2. **Write comprehensive tests** that define expected behavior
3. **Run tests** - they MUST fail (red)
4. **Commit failing tests** to version control

### 🟢 GREEN Phase: Make Tests Pass
**Write minimal code to pass tests:**

1. **Implement simplest solution** that makes tests green
2. **Don't optimize yet** - just make it work
3. **Run tests** - they MUST pass (green)
4. **Commit working implementation**

### 🔵 REFACTOR Phase: Improve Code Quality
**Improve code while maintaining green tests:**

1. **Refactor implementation** for better design/performance
2. **Run tests continuously** - must stay green
3. **Improve test quality** if needed
4. **Commit refined implementation**

## Practical TDD Examples

### Example 1: City Generation (Task 02)

#### 🔴 RED: Write Failing Tests First
```typescript
// tests/unit/city/city-generator.test.ts
describe('CityGenerator', () => {
  it('should generate exactly 6-10 buildings', () => {
    // This test WILL FAIL initially
    const generator = new CityGenerator(1024, 768);
    const buildings = generator.generateCity();
    
    expect(buildings.length).toBeGreaterThanOrEqual(6);
    expect(buildings.length).toBeLessThanOrEqual(10);
  });

  it('should vary building heights by ±50%', () => {
    const generator = new CityGenerator(1024, 768);
    const baseHeight = 300;
    
    for (let i = 0; i < 100; i++) {
      const height = generator.calculateBuildingHeight(baseHeight);
      const variation = Math.abs(height - baseHeight);
      expect(variation).toBeLessThanOrEqual(baseHeight * 0.5);
    }
  });

  it('should create buildings spanning full screen width', () => {
    const generator = new CityGenerator(1024, 768);
    const buildings = generator.generateCity();
    
    const totalWidth = buildings.reduce((sum, b) => sum + b.width, 0);
    expect(totalWidth).toBe(1024);
  });
});

// Run: npm test -- city-generator.test.ts
// Result: ❌ ALL TESTS FAIL (as expected)
```

#### 🟢 GREEN: Minimal Implementation
```typescript
// src/game/objects/CityGenerator.ts
export interface Building {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export class CityGenerator {
  constructor(private screenWidth: number, private screenHeight: number) {}

  generateCity(): Building[] {
    // Minimal implementation to pass tests
    const buildingCount = 8; // Within 6-10 range
    const buildingWidth = this.screenWidth / buildingCount;
    const baseHeight = this.screenHeight * 0.5;
    
    const buildings: Building[] = [];
    
    for (let i = 0; i < buildingCount; i++) {
      const height = this.calculateBuildingHeight(baseHeight);
      buildings.push({
        x: i * buildingWidth,
        y: this.screenHeight - height,
        width: buildingWidth,
        height: height,
        color: '#00FFFF'
      });
    }
    
    return buildings;
  }

  calculateBuildingHeight(baseHeight: number): number {
    // Simple implementation - random ±50% variation
    const variation = (Math.random() - 0.5) * baseHeight;
    return baseHeight + variation;
  }
}

// Run: npm test -- city-generator.test.ts
// Result: ✅ ALL TESTS PASS
```

#### 🔵 REFACTOR: Improve Implementation
```typescript
// Enhanced version with better design
export class CityGenerator {
  private readonly MIN_BUILDINGS = 6;
  private readonly MAX_BUILDINGS = 10;
  private readonly HEIGHT_VARIATION = 0.5;

  constructor(
    private screenWidth: number, 
    private screenHeight: number,
    private seed?: string
  ) {}

  generateCity(): Building[] {
    // Improved algorithm with deterministic seeding
    const buildingCount = this.calculateOptimalBuildingCount();
    const buildingWidth = this.screenWidth / buildingCount;
    const baseHeight = this.screenHeight * 0.5;
    
    return Array.from({ length: buildingCount }, (_, i) => 
      this.createBuilding(i, buildingWidth, baseHeight)
    );
  }

  private calculateOptimalBuildingCount(): number {
    // Better algorithm for building count based on screen size
    const optimalCount = Math.floor(this.screenWidth / 100);
    return Math.max(this.MIN_BUILDINGS, 
           Math.min(this.MAX_BUILDINGS, optimalCount));
  }

  private createBuilding(index: number, width: number, baseHeight: number): Building {
    const height = this.calculateBuildingHeight(baseHeight);
    return {
      x: index * width,
      y: this.screenHeight - height,
      width,
      height,
      color: this.getBuildingColor(index)
    };
  }

  // Tests still pass, code is more maintainable
}
```

### Example 2: Physics System (Task 05)

#### 🔴 RED: Physics Tests First
```typescript
// tests/unit/physics/projectile-physics.test.ts
describe('ProjectilePhysics', () => {
  it('should calculate trajectory for 45° angle at 50 velocity', () => {
    const physics = new ProjectilePhysics();
    const result = physics.calculateTrajectory(45, 50, 0);
    
    // Known physics formulas
    const expectedDistance = (50 * 50 * Math.sin(Math.PI / 2)) / 9.8;
    const expectedMaxHeight = (50 * Math.sin(Math.PI / 4)) ** 2 / (2 * 9.8);
    
    expect(result.distance).toBeCloseTo(expectedDistance, 1);
    expect(result.maxHeight).toBeCloseTo(expectedMaxHeight, 1);
    expect(result.flightTime).toBeGreaterThan(0);
  });

  it('should apply wind effects to horizontal movement', () => {
    const physics = new ProjectilePhysics();
    const noWind = physics.calculateTrajectory(45, 50, 0);
    const rightWind = physics.calculateTrajectory(45, 50, 5);
    
    expect(rightWind.landingX).toBeGreaterThan(noWind.landingX);
  });
});

// E2E test for visual behavior
// tests/e2e/physics/projectile-animation.spec.ts
test('banana follows parabolic trajectory', async ({ page }) => {
  const gameHelper = new GorillaGameHelpers(page);
  await gameHelper.startTwoPlayerGame();
  
  // Capture trajectory animation
  await gameHelper.inputThrow(45, 75);
  
  // Verify smooth animation and timing
  const flightTime = await gameHelper.measureFlightTime();
  expect(flightTime).toBeGreaterThan(1000);
  expect(flightTime).toBeLessThan(5000);
});
```

## TDD Command Workflow

### 1. Start New Feature
```bash
# Create test file first
mkdir -p tests/unit/feature-name
touch tests/unit/feature-name/feature.test.ts

# Write failing tests
npm run test:watch # Keep running in background
```

### 2. Write Failing Tests (RED)
```bash
# Tests should fail
npm test feature.test.ts
# Expected: ❌ Tests fail (RED phase)

git add tests/
git commit -m "RED: Add failing tests for [feature]"
```

### 3. Implement Minimal Code (GREEN)
```bash
# Create source file
mkdir -p src/game/feature-name
touch src/game/feature-name/Feature.ts

# Write minimal implementation
npm test feature.test.ts
# Expected: ✅ Tests pass (GREEN phase)

git add src/ tests/
git commit -m "GREEN: Implement [feature] to pass tests"
```

### 4. Refactor (BLUE)
```bash
# Improve code quality
npm test feature.test.ts
# Expected: ✅ Tests still pass during refactoring

git add src/
git commit -m "REFACTOR: Improve [feature] implementation"
```

### 5. Integration Testing
```bash
# Add E2E tests
npm run test:e2e
# Expected: ✅ Feature works end-to-end

git add tests/e2e/
git commit -m "E2E: Add integration tests for [feature]"
```

## Quality Gates & Automation

### Pre-commit Checks
```bash
# Automated checks before each commit
npm run lint           # Code style
npm run type-check     # TypeScript errors
npm run test          # Unit tests
npm run test:coverage # Coverage check
```

### CI/CD Pipeline
```bash
# Automated on pull requests
npm ci                 # Clean install
npm run test:all      # All tests
npm run build         # Verify build
```

### Coverage Requirements
```javascript
// jest.config.js - Enforced automatically
coverageThreshold: {
  global: {
    branches: 90,    // 90% branch coverage
    functions: 90,   // 90% function coverage  
    lines: 90,       // 90% line coverage
    statements: 90   // 90% statement coverage
  }
}
```

## TDD Best Practices for Phaser Games

### 1. Mock Phaser Objects
```typescript
// Use provided mocks for unit tests
import { MockPhaserScene, MockPhaserSprite } from '../utils/phaser-mocks';

describe('GorillaSprite', () => {
  it('should position on building top', () => {
    const mockScene = new MockPhaserScene();
    const gorilla = new GorillaSprite(mockScene, 100, 200);
    
    expect(gorilla.x).toBe(100);
    expect(gorilla.y).toBe(200);
  });
});
```

### 2. Test Game Logic Separately
```typescript
// Separate pure logic from Phaser dependencies
describe('CollisionDetector', () => {
  it('should detect banana-building collision', () => {
    const detector = new CollisionDetector();
    const banana = { x: 100, y: 150, radius: 5 };
    const building = { x: 95, y: 100, width: 50, height: 100 };
    
    expect(detector.checkCollision(banana, building)).toBe(true);
  });
});
```

### 3. E2E for Visual Verification
```typescript
// Use Playwright for actual game interaction
test('city buildings render correctly', async ({ page }) => {
  await gameHelper.startTwoPlayerGame();
  
  // Visual regression testing
  await expect(page.locator('#game-container')).toHaveScreenshot('city-view.png');
});
```

## Common TDD Mistakes to Avoid

❌ **Writing implementation before tests**
✅ **Always write tests first**

❌ **Testing implementation details**  
✅ **Test behavior and outcomes**

❌ **Large, complex tests**
✅ **Small, focused test cases**

❌ **Skipping the refactor phase**
✅ **Always improve code after GREEN**

❌ **Not running tests frequently**
✅ **Keep tests running continuously**

## Task-Specific TDD Requirements

Each task must include:
- [ ] **Unit test specifications** in task description
- [ ] **E2E test requirements** for user experience
- [ ] **Test file structure** to be created first
- [ ] **Coverage expectations** for the feature
- [ ] **Performance test criteria** where applicable

**Remember: The goal is 100% confidence that each feature works correctly before moving to the next task.**