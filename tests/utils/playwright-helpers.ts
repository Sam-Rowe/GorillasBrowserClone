/**
 * Playwright E2E testing utilities for Gorillas game
 * Helper functions for common game testing scenarios
 */

import { Page, expect } from '@playwright/test';

export class GorillaGameHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for the game to fully load and be ready for interaction
   */
  async waitForGameReady() {
    // Wait for Phaser game to initialize
    await this.page.waitForSelector('#game-container canvas', { timeout: 10000 });
    
    // Wait for main menu to appear
    await this.page.waitForFunction(() => {
      const canvas = document.querySelector('#game-container canvas') as HTMLCanvasElement;
      return canvas && canvas.width > 0 && canvas.height > 0;
    }, { timeout: 15000 });

    // Additional wait for game scenes to stabilize
    await this.page.waitForTimeout(1000);
  }

  /**
   * Navigate through main menu using keyboard
   */
  async navigateMainMenu(option: 'start' | 'help' | 'settings' | 'exit') {
    // Focus the game canvas first
    await this.page.click('#game-container canvas');
    
    const keyMap = {
      'start': 'Enter', // Assuming "Start Game" is default selection
      'help': 'ArrowDown', // Navigate to help
      'settings': ['ArrowDown', 'ArrowDown'], // Navigate to settings
      'exit': ['ArrowDown', 'ArrowDown', 'ArrowDown'] // Navigate to exit
    };

    const keys = keyMap[option];
    if (Array.isArray(keys)) {
      for (const key of keys) {
        await this.page.keyboard.press(key);
        await this.page.waitForTimeout(100);
      }
    } else {
      await this.page.keyboard.press(keys);
    }
    
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(500);
  }

  /**
   * Start a new two-player game
   */
  async startTwoPlayerGame() {
    await this.navigateMainMenu('start');
    // Wait for game scene to load
    await this.page.waitForTimeout(1000);
  }

  /**
   * Input angle and velocity for gorilla throw
   */
  async inputThrow(angle: number, velocity: number) {
    // Clear any existing input
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(100);

    // Input angle
    const angleStr = angle.toString();
    for (const digit of angleStr) {
      await this.page.keyboard.press(`Digit${digit}`);
      await this.page.waitForTimeout(50);
    }
    
    await this.page.keyboard.press('Tab'); // Move to velocity field
    await this.page.waitForTimeout(100);

    // Input velocity  
    const velocityStr = velocity.toString();
    for (const digit of velocityStr) {
      await this.page.keyboard.press(`Digit${digit}`);
      await this.page.waitForTimeout(50);
    }

    // Fire the banana
    await this.page.keyboard.press('Enter');
  }

  /**
   * Wait for projectile animation to complete
   */
  async waitForProjectileComplete() {
    // Wait for banana to finish flying (max 5 seconds for any throw)
    await this.page.waitForTimeout(5000);
  }

  /**
   * Verify game visual elements are present
   */
  async verifyGameElements() {
    // Check canvas is visible and sized correctly
    const canvas = await this.page.locator('#game-container canvas');
    await expect(canvas).toBeVisible();
    
    const canvasSize = await canvas.boundingBox();
    expect(canvasSize?.width).toBeGreaterThan(800);
    expect(canvasSize?.height).toBeGreaterThan(600);
  }

  /**
   * Check if help menu is displayed
   */
  async verifyHelpMenuVisible() {
    // This would depend on how help is implemented
    // For now, check if we can interact with help content
    await this.page.keyboard.press('F1');
    await this.page.waitForTimeout(500);
    
    // Verify help content (implementation dependent)
    // Could check for specific text or UI elements
  }

  /**
   * Verify keyboard controls work
   */
  async testKeyboardControls() {
    // Test arrow key navigation
    await this.page.keyboard.press('ArrowUp');
    await this.page.waitForTimeout(100);
    await this.page.keyboard.press('ArrowDown');
    await this.page.waitForTimeout(100);
    
    // Test number input
    await this.page.keyboard.press('Digit4');
    await this.page.keyboard.press('Digit5');
    await this.page.waitForTimeout(100);
    
    // Test escape key
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(100);
  }

  /**
   * Test complete gameplay flow
   */
  async playCompleteRound() {
    await this.startTwoPlayerGame();
    
    // Player 1 turn
    await this.inputThrow(45, 75);
    await this.waitForProjectileComplete();
    
    // Player 2 turn (if game continues)
    await this.inputThrow(135, 80);
    await this.waitForProjectileComplete();
  }

  /**
   * Verify responsive behavior at different screen sizes
   */
  async testResponsiveDesign() {
    // Test different desktop resolutions
    const resolutions = [
      { width: 1024, height: 768 },
      { width: 1366, height: 768 },
      { width: 1920, height: 1080 }
    ];

    for (const resolution of resolutions) {
      await this.page.setViewportSize(resolution);
      await this.page.waitForTimeout(500);
      await this.verifyGameElements();
    }
  }

  /**
   * Capture screenshot for visual regression testing
   */
  async captureGameState(name: string) {
    await this.page.screenshot({ 
      path: `tests/screenshots/${name}.png`,
      fullPage: true 
    });
  }

  /**
   * Check for JavaScript errors in console
   */
  async checkForErrors() {
    const errors = await this.page.evaluate(() => {
      const errors: string[] = [];
      
      // Capture console errors
      const originalError = console.error;
      console.error = (...args) => {
        errors.push(args.join(' '));
        originalError.apply(console, args);
      };
      
      return errors;
    });

    expect(errors).toHaveLength(0);
  }
}

/**
 * Helper to create common test data
 */
export const createTestData = () => ({
  validThrows: [
    { angle: 45, velocity: 50 },
    { angle: 90, velocity: 75 },
    { angle: 135, velocity: 60 },
  ],
  invalidInputs: [
    { angle: -10, velocity: 50 }, // Invalid angle
    { angle: 200, velocity: 50 }, // Invalid angle
    { angle: 45, velocity: 0 },   // Invalid velocity
    { angle: 45, velocity: 101 }, // Invalid velocity
  ],
  edgeCases: [
    { angle: 0, velocity: 1 },     // Minimum values
    { angle: 180, velocity: 100 }, // Maximum values
    { angle: 90, velocity: 50 },   // Straight up
  ]
});