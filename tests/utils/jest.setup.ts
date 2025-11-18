// Jest setup file for global test configuration

// Mock Phaser globally for unit tests
global.Phaser = {
  Scene: class MockScene {
    constructor() {}
    preload() {}
    create() {}
    update() {}
  },
  Game: class MockGame {
    constructor() {}
    destroy() {}
  },
  GameObjects: {
    Sprite: class MockSprite {},
    Graphics: class MockGraphics {},
    Text: class MockText {},
  },
  Physics: {
    Arcade: {
      Sprite: class MockArcadeSprite {},
    },
  },
  Input: {
    Keyboard: {
      Key: class MockKey {},
    },
  },
  AUTO: 'AUTO',
  CANVAS: 'CANVAS',
  WEBGL: 'WEBGL',
} as any;

// Mock canvas context for tests that need it
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(() => ({ data: new Array(4) })),
    putImageData: jest.fn(),
    createImageData: jest.fn(() => ([])),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    measureText: jest.fn(() => ({ width: 0 })),
    transform: jest.fn(),
    rect: jest.fn(),
    clip: jest.fn(),
  }),
});

// Mock requestAnimationFrame for timing-sensitive tests
global.requestAnimationFrame = (callback: FrameRequestCallback) => {
  return setTimeout(callback, 16); // ~60fps
};

global.cancelAnimationFrame = (id: number) => {
  clearTimeout(id);
};

// Increase timeout for tests that involve game initialization
jest.setTimeout(10000);