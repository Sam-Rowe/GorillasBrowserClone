/**
 * TDD Helper Utilities
 * Utilities to support proper Test-Driven Development workflow
 */

/**
 * Helper function for RED phase tests - ensures tests fail with proper message
 * @param message - The error message to throw
 */
export function redPhase(message: string): never {
  throw new Error(message);
}

/**
 * Helper to mark a test as not implemented yet (RED phase)
 * @param featureName - Name of the feature being tested
 */
export function notImplementedYet(featureName: string): never {
  throw new Error(`${featureName} not implemented yet`);
}

/**
 * Helper to create mock Phaser objects for testing
 */
export function createMockPhaserGame() {
  return {
    scene: {
      add: jest.fn(),
      start: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      stop: jest.fn(),
      get: jest.fn(),
      getScenes: jest.fn(() => [])
    },
    scale: {
      width: 1024,
      height: 768
    }
  };
}

export function createMockPhaserScene(key: string) {
  return {
    scene: {
      key,
      start: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      stop: jest.fn()
    },
    load: {
      image: jest.fn(),
      on: jest.fn(),
      once: jest.fn(),
      emit: jest.fn()
    },
    add: {
      text: jest.fn(() => ({ setOrigin: jest.fn() })),
      image: jest.fn(),
      rectangle: jest.fn()
    },
    input: {
      keyboard: {
        on: jest.fn(),
        addKey: jest.fn()
      }
    }
  };
}

export function createMockLoader() {
  return {
    image: jest.fn(),
    audio: jest.fn(),
    on: jest.fn(),
    once: jest.fn(),
    emit: jest.fn(),
    getCalls: jest.fn(() => [])
  };
}

export function createMockSceneManager() {
  return {
    start: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    stop: jest.fn(),
    get: jest.fn(),
    add: jest.fn()
  };
}