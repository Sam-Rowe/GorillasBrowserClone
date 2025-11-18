# Gorillas Browser Clone

A faithful recreation of the classic QBASIC Gorillas game built with **Phaser.io 3.90.0** using **Test-Driven Development (TDD)** methodology.

## 🎮 Game Overview

Two gorillas positioned on city rooftops take turns throwing explosive bananas at each other in turn-based artillery gameplay with realistic physics, wind effects, and destructible environments.

## 🚨 **CRITICAL: Test-Driven Development (TDD)**

**This project follows strict TDD methodology. NO CODE should be written for any feature until comprehensive tests are written first.**

### TDD Workflow: 🔴 RED → 🟢 GREEN → 🔵 REFACTOR

## 🛠️ Technology Stack

- **Game Engine**: Phaser.io 3.90.0 (committed choice)
- **Language**: TypeScript 5.7.2  
- **Build Tool**: Vite 6.3.1
- **Testing**: Jest (unit tests) + Playwright (E2E tests)
- **Development**: Test-Driven Development (TDD)

## 📁 Project Structure

```
/docs/           # All documentation in markdown
/plan/           # Project plans and tasks (13 tasks total)  
/src/            # Source code (write AFTER tests)
/tests/          # All testing code (write FIRST)
  ├── unit/      # Jest unit tests  
  ├── e2e/       # Playwright E2E tests
  ├── fixtures/  # Test data and mocks
  └── utils/     # Testing utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js (latest LTS)
- npm or yarn

### Installation & Setup
```bash
# Clone repository
git clone https://github.com/sam-rowe/GorillasBrowserClone.git
cd GorillasBrowserClone

# Install dependencies
npm install

# Verify testing setup
npm run test          # Jest unit tests
npm run test:e2e      # Playwright E2E tests
npm run test:coverage # Coverage report

# Start development server
npm run dev
```

### Testing Commands
```bash
npm run test              # Run unit tests
npm run test:watch        # Watch mode for TDD
npm run test:coverage     # Coverage report (90% minimum)
npm run test:e2e          # E2E tests headless
npm run test:e2e-ui       # E2E tests with UI
npm run test:all          # All tests
npm run lint              # ESLint
npm run type-check        # TypeScript check
```

## 📋 Development Tasks

| Task | Feature | Priority | Tests Required |
|------|---------|----------|---------------|
| **01** | Basic Scene Structure | High | Unit + E2E |
| **02** | City Skyline Generation | High | Unit + E2E |
| **03** | Gorilla Character System | High | Unit + E2E |
| **04** | Player Input System | Medium | Unit + E2E |
| **05** | Projectile Physics | High | Unit + E2E |
| **06** | Building Destruction | High | Unit + E2E |
| **07** | Game State & Win/Lose | Medium | Unit + E2E |
| **08** | Collision Detection | High | Unit + E2E |
| **09** | Visual Effects | Medium | Unit + E2E |
| **10** | UI/UX & Menus | Medium | E2E |
| **11** | Audio System | Low | Unit + E2E |
| **12** | Polish & Deployment | Low | E2E |
| **13** | Help & Keyboard Controls | High | E2E |

## 🧪 TDD Requirements

### For Every Feature:
1. **🔴 RED**: Write comprehensive failing tests first
2. **🟢 GREEN**: Write minimal code to pass tests  
3. **🔵 REFACTOR**: Improve code while maintaining green tests
4. **Coverage**: Minimum 90% across all metrics

### Test Types Required:
- **Unit Tests** (Jest): Game logic, physics, utilities
- **E2E Tests** (Playwright): User journeys, cross-browser
- **Performance Tests**: 60fps, load times
- **Visual Regression**: Screenshot comparisons

## 🎯 Game Features

### Core Gameplay
- ✅ Turn-based artillery mechanics
- ✅ Physics-based banana projectiles with gravity and wind
- ✅ Destructible building environments with crater formation
- ✅ Two-player local multiplayer (hot seat)
- ✅ Keyboard-only controls (no mouse/touch)

### Visual Style  
- ✅ Enhanced pixel art style (not limited to 4 colors)
- ✅ Maximum 10 buildings with 50% height variation
- ✅ Desktop-focused responsive design
- ✅ Retro aesthetic with modern enhancements

### Controls
- ✅ **Keyboard Only**: Number input for angle/velocity
- ✅ **Help System**: Prominent F1 help menu
- ✅ **Navigation**: Arrow keys for menus
- ✅ **Web Only**: No mobile/touch controls

## 📖 Documentation

- **[Testing Strategy](docs/testing-strategy.md)** - Comprehensive testing approach
- **[TDD Workflow](docs/tdd-workflow.md)** - Step-by-step TDD process
- **[Game Design](docs/game-design.md)** - Game mechanics and specifications
- **[Project Plan](plan/plan.md)** - Complete development roadmap

## 🔍 Quality Assurance

### Automated Testing
- **90% Code Coverage** minimum requirement
- **Cross-browser** testing (Chrome, Firefox, Safari)
- **Performance** testing (60fps gameplay)
- **Responsive** testing (multiple desktop resolutions)

### Development Standards
- **TypeScript** strict mode
- **ESLint** code quality
- **Phaser.io 3.90.0** exclusive game engine
- **TDD** methodology mandatory

## 🏆 Success Criteria

- ✅ Faithful recreation of original QBASIC Gorillas gameplay
- ✅ Smooth 60fps performance in modern browsers  
- ✅ Comprehensive test coverage (90%+ minimum)
- ✅ Clean, maintainable Phaser 3 codebase
- ✅ Robust keyboard-only controls
- ✅ Cross-browser compatibility

## 🤝 Contributing

1. **Follow TDD**: Write tests first, then implementation
2. **Maintain Coverage**: All code must have ≥90% test coverage  
3. **Use Phaser 3**: All game logic must use Phaser.io APIs
4. **Desktop Focus**: Optimize for keyboard-only desktop experience
5. **Test Everything**: Unit tests for logic, E2E for user experience

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

**Remember: This is a TDD project. Tests come first, implementation comes second. No exceptions!** 🧪
