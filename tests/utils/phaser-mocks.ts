/**
 * Phaser mock utilities for unit testing
 * Provides mock implementations of Phaser objects for isolated testing
 */

export class MockPhaserScene {
  public cameras: any;
  public input: any;
  public physics: any;
  public add: any;
  public load: any;
  public scene: any;
  public data: any;
  public events: any;

  constructor() {
    this.cameras = {
      main: {
        shake: jest.fn(),
        fadeIn: jest.fn(),
        fadeOut: jest.fn(),
      }
    };

    this.input = {
      keyboard: {
        createKey: jest.fn(() => ({ isDown: false })),
        on: jest.fn(),
        once: jest.fn(),
        off: jest.fn(),
      }
    };

    this.physics = {
      world: {
        on: jest.fn(),
        gravity: { y: 0 },
      },
      add: {
        sprite: jest.fn(() => new MockPhaserSprite()),
        staticGroup: jest.fn(() => new MockPhaserGroup()),
        group: jest.fn(() => new MockPhaserGroup()),
      }
    };

    this.add = {
      sprite: jest.fn(() => new MockPhaserSprite()),
      graphics: jest.fn(() => new MockPhaserGraphics()),
      text: jest.fn(() => new MockPhaserText()),
      image: jest.fn(() => new MockPhaserImage()),
    };

    this.load = {
      image: jest.fn(),
      audio: jest.fn(),
      on: jest.fn(),
      once: jest.fn(),
    };

    this.scene = {
      start: jest.fn(),
      stop: jest.fn(),
      restart: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      get: jest.fn(),
    };

    this.data = {
      set: jest.fn(),
      get: jest.fn(),
      has: jest.fn(),
    };

    this.events = {
      emit: jest.fn(),
      on: jest.fn(),
      once: jest.fn(),
      off: jest.fn(),
    };
  }

  preload() {}
  create() {}
  update() {}
}

export class MockPhaserSprite {
  public x: number = 0;
  public y: number = 0;
  public width: number = 32;
  public height: number = 32;
  public visible: boolean = true;
  public alpha: number = 1;
  public angle: number = 0;
  public scaleX: number = 1;
  public scaleY: number = 1;
  public body: any;

  constructor() {
    this.body = {
      setVelocity: jest.fn(),
      setAcceleration: jest.fn(),
      setBounce: jest.fn(),
      setCollideWorldBounds: jest.fn(),
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
    };
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    return this;
  }

  setAlpha(alpha: number) {
    this.alpha = alpha;
    return this;
  }

  destroy() {
    // Mock destroy
  }

  play = jest.fn();
  setTexture = jest.fn();
  setFrame = jest.fn();
}

export class MockPhaserGraphics {
  public x: number = 0;
  public y: number = 0;
  public visible: boolean = true;
  
  clear = jest.fn(() => this);
  fillStyle = jest.fn(() => this);
  fillRect = jest.fn(() => this);
  fillCircle = jest.fn(() => this);
  lineStyle = jest.fn(() => this);
  strokeRect = jest.fn(() => this);
  strokeCircle = jest.fn(() => this);
  setPosition = jest.fn((x: number, y: number) => {
    this.x = x;
    this.y = y;
    return this;
  });
  destroy = jest.fn();
}

export class MockPhaserText {
  public x: number = 0;
  public y: number = 0;
  public text: string = '';
  public visible: boolean = true;

  constructor(x: number = 0, y: number = 0, text: string = '') {
    this.x = x;
    this.y = y;
    this.text = text;
  }

  setText(text: string) {
    this.text = text;
    return this;
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    return this;
  }

  destroy = jest.fn();
}

export class MockPhaserImage {
  public x: number = 0;
  public y: number = 0;
  public visible: boolean = true;

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    return this;
  }

  destroy = jest.fn();
}

export class MockPhaserGroup {
  public children: any[] = [];
  
  add = jest.fn((sprite: any) => {
    this.children.push(sprite);
    return this;
  });
  
  remove = jest.fn((sprite: any) => {
    const index = this.children.indexOf(sprite);
    if (index > -1) {
      this.children.splice(index, 1);
    }
    return this;
  });

  clear = jest.fn(() => {
    this.children = [];
    return this;
  });

  destroy = jest.fn();
}

export const createMockGame = () => ({
  config: {
    width: 1024,
    height: 768,
  },
  canvas: document.createElement('canvas'),
  destroy: jest.fn(),
});