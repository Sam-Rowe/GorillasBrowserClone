# Testing Strategy - Gorillas Browser Clone

## Overview

This project follows **Test-Driven Development (TDD)** methodology with comprehensive testing using Jest for unit tests and Playwright for end-to-end testing. **NO CODE should be written for any feature until comprehensive tests are written first.**

## Testing Philosophy

### Test-Driven Development (TDD) Workflow

1. **🔴 RED**: Write failing tests that define the desired feature behavior
2. **🟢 GREEN**: Write minimal code to make the tests pass
3. **🔵 REFACTOR**: Improve code quality while maintaining passing tests
4. **🔄 REPEAT**: Continue the cycle for each feature increment

### Testing Pyramid

```
    /\     E2E Tests (Playwright)
   /  \    ├─ User journeys
  /____\   ├─ Cross-browser testing
 /      \  └─ Visual regression
/__________\ 
              Integration Tests (Jest)
              ├─ Component interactions  
              ├─ Scene transitions
              └─ System integration

                Unit Tests (Jest)
                ├─ Game logic
                ├─ Physics calculations
                ├─ Utility functions
                └─ State management
```

## Testing Requirements

### Code Coverage Targets
- **Minimum 90%** code coverage across all metrics
- **100% coverage** for critical game logic (physics, collision detection)
- **Branch coverage** for all conditional logic
- **Function coverage** for all public APIs

### Test Categories

#### 1. Unit Tests (Jest)
**Location**: `/tests/unit/`

**Scope**: Individual functions, classes, and game systems
- Physics calculations (projectile motion, collision detection)
- Game state management (turns, scoring, win conditions)
- City generation algorithms
- Input validation logic
- Utility functions and helpers

**Example Test Structure**:
```typescript
describe('ProjectilePhysics', () => {
  describe('calculateTrajectory', () => {
    it('should calculate correct parabolic path with gravity', () => {
      // RED: Define expected behavior
      // GREEN: Implement minimal code
      // REFACTOR: Optimize while maintaining tests
    });
  });
});
```

#### 2. Integration Tests (Jest)
**Location**: `/tests/unit/integration/`

**Scope**: System interactions and component integration
- Scene transitions and state management
- Phaser game object interactions
- Event system communication
- Asset loading and management

#### 3. End-to-End Tests (Playwright)
**Location**: `/tests/e2e/`

**Scope**: Complete user experiences and workflows
- Full gameplay sessions (menu → game → victory)
- Keyboard input and navigation
- Cross-browser compatibility
- Responsive design behavior
- Performance and visual regression

### Testing Tools & Configuration

#### Jest Configuration
- **Environment**: JSDOM for DOM simulation
- **Mocking**: Phaser objects mocked for isolated testing
- **Coverage**: Istanbul integration with detailed reporting
- **Timeout**: 10 seconds for game initialization tests

#### Playwright Configuration  
- **Browsers**: Chrome, Firefox, Safari (desktop focus)
- **Viewports**: Multiple desktop resolutions (1024x768 to 1920x1080)
- **Headless**: Run in headless mode for CI/CD
- **Screenshots**: Automatic capture on failures
- **Video**: Recording for debugging failed tests

## TDD Implementation by Feature

### Example: City Generation (Task 02)

#### Phase 1: RED - Write Failing Tests
```typescript
// tests/unit/city-generator.test.ts
describe('CityGenerator', () => {
  it('should generate exactly 10 buildings', () => {
    const generator = new CityGenerator(1024, 768);
    const buildings = generator.generateCity();
    expect(buildings).toHaveLength(10);
  });

  it('should vary building heights by 50%', () => {
    // Test height variation algorithm
  });
});
```

#### Phase 2: GREEN - Minimal Implementation
```typescript
// src/game/objects/CityGenerator.ts
export class CityGenerator {
  generateCity() {
    // Minimal code to pass tests
    return new Array(10).fill(null).map(() => ({}));
  }
}
```

#### Phase 3: REFACTOR - Improve Code
```typescript
// Enhanced implementation while maintaining passing tests
export class CityGenerator {
  generateCity() {
    // Full implementation with proper building generation
  }
}
```

### Example: E2E Game Flow Test
```typescript
// tests/e2e/gameplay.spec.ts
test('complete two-player game session', async ({ page }) => {
  const gameHelper = new GorillaGameHelpers(page);
  
  // RED: Define expected user journey
  await gameHelper.waitForGameReady();
  await gameHelper.startTwoPlayerGame();
  await gameHelper.inputThrow(45, 75);
  await gameHelper.waitForProjectileComplete();
  
  // Verify game state changes
  // Test continues until victory condition
});
```

## Test Organization

### Directory Structure
```
tests/
├── unit/                    # Jest unit tests
│   ├── game/               # Game system tests
│   ├── physics/            # Physics calculation tests  
│   ├── ui/                 # UI component tests
│   └── integration/        # Integration tests
├── e2e/                    # Playwright E2E tests
│   ├── gameplay/           # Game flow tests
│   ├── navigation/         # Menu and navigation tests
│   └── cross-browser/      # Browser compatibility tests
├── fixtures/               # Test data and mock objects
│   ├── game-states.json   # Predefined game states
│   ├── test-assets/       # Mock sprites and audio
│   └── scenarios.json     # Test scenarios
└── utils/                  # Testing utilities
    ├── jest.setup.ts      # Jest global configuration
    ├── phaser-mocks.ts    # Phaser object mocks
    └── playwright-helpers.ts # E2E test helpers
```

### Naming Conventions
- **Unit tests**: `*.test.ts` or `*.spec.ts`
- **E2E tests**: `*.spec.ts` in `/e2e` directory
- **Mock files**: `*.mock.ts`
- **Test utilities**: `*-helpers.ts` or `*-utils.ts`

## Continuous Testing Workflow

### Pre-commit Hooks
- Run unit tests for changed files
- Check code coverage thresholds
- Lint test files for consistency

### CI/CD Pipeline
```bash
# Install dependencies
npm ci

# Run all tests
npm run test:all

# Generate coverage report
npm run test:coverage

# Run E2E tests across browsers
npm run test:e2e

# Verify build
npm run build
```

### Quality Gates
- **All tests must pass** before code merge
- **Coverage thresholds** must be maintained
- **No console errors** in E2E tests
- **Performance benchmarks** must be met

## Testing Best Practices

### Unit Test Guidelines
1. **Test behavior, not implementation**
2. **Use descriptive test names** that explain the scenario
3. **Follow AAA pattern**: Arrange, Act, Assert
4. **Mock external dependencies** (Phaser objects, DOM APIs)
5. **Test edge cases** and error conditions
6. **Keep tests focused** on single responsibility

### E2E Test Guidelines  
1. **Test user journeys**, not individual interactions
2. **Use Page Object Model** for maintainable tests
3. **Wait for elements** properly, avoid fixed timeouts
4. **Test across multiple browsers** and screen sizes
5. **Capture screenshots** for visual regression testing
6. **Include performance assertions** (frame rate, load time)

### Phaser-Specific Testing Considerations
1. **Mock Phaser objects** for unit tests to avoid dependency on game engine
2. **Test game logic separately** from Phaser-specific implementations
3. **Use dependency injection** to make game systems testable
4. **Test scene lifecycle** methods independently
5. **Verify physics calculations** with known inputs/outputs

## Success Metrics

### Test Quality Indicators
- **Coverage**: >90% across all code paths
- **Test Speed**: Unit tests <100ms, E2E tests <30s per scenario  
- **Reliability**: <1% flaky test rate
- **Maintainability**: Tests update automatically with refactoring

### Game Quality Indicators (via Tests)
- **Performance**: 60fps maintained during gameplay (E2E verified)
- **Compatibility**: Works across target browsers (Playwright verified)
- **Usability**: All keyboard controls functional (E2E verified)
- **Reliability**: No crashes or game-breaking bugs (comprehensive testing)

This testing strategy ensures that every feature is thoroughly validated before implementation, resulting in a robust, maintainable, and bug-free Gorillas game implementation.