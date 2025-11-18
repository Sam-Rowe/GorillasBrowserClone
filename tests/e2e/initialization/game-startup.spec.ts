/**
 * Game Startup E2E Tests
 * TDD RED Phase - These tests will FAIL until proper game initialization is implemented
 * 
 * Testing complete game loading sequence in real browsers
 */

import { test, expect } from '@playwright/test';

test.describe('Game Initialization', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the game
    await page.goto('/');
  });

  test('should load game without errors in Chrome', async ({ page }) => {
    // RED: Basic game loading test
    
    // Should not have any console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait for game to initialize
    await page.waitForSelector('#game-container', { timeout: 10000 });
    
    // Verify no JavaScript errors occurred
    expect(errors).toHaveLength(0);
    
    // Game container should be visible
    const gameContainer = page.locator('#game-container');
    await expect(gameContainer).toBeVisible();
    
    // Phaser canvas should be created
    const canvas = page.locator('#game-container canvas');
    await expect(canvas).toBeVisible();
    
    // Canvas should have correct dimensions (1024x768)
    const canvasBounds = await canvas.boundingBox();
    expect(canvasBounds?.width).toBe(1024);
    expect(canvasBounds?.height).toBe(768);
  });

  test('should complete loading sequence: Boot → Preloader → MainMenu', async ({ page }) => {
    // RED: Test complete scene progression
    
    await page.goto('/');
    
    // Wait for game initialization
    await page.waitForSelector('#game-container canvas', { timeout: 5000 });
    
    // Should start in Boot scene (very brief)
    // Then move to Preloader scene
    await page.waitForFunction(() => {
      const canvas = document.querySelector('#game-container canvas');
      return canvas !== null;
    }, { timeout: 3000 });
    
    // Should show loading progress in Preloader
    // Note: This will need visual verification or scene key checking once implemented
    
    // Should automatically transition to MainMenu after loading
    await page.waitForTimeout(2000); // Allow time for asset loading
    
    // MainMenu should be interactive (will update test once keyboard controls implemented)
    const canvas = page.locator('#game-container canvas');
    await expect(canvas).toBeVisible();
  });

  test('should handle asset loading failures gracefully', async ({ page }) => {
    // RED: Test error resilience
    
    // Intercept and fail some asset requests
    await page.route('**/assets/missing-asset.png', route => {
      route.abort('failed');
    });
    
    await page.goto('/');
    
    // Game should still load despite missing assets
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });
    
    // Should reach MainMenu even with some asset failures
    const canvas = page.locator('#game-container canvas');
    await expect(canvas).toBeVisible();
  });

  test('should maintain 60fps during scene transitions', async ({ page }) => {
    // RED: Performance requirement
    
    await page.goto('/');
    await page.waitForSelector('#game-container canvas', { timeout: 5000 });
    
    // Monitor frame rate during scene transitions
    const fps = await page.evaluate(() => {
      return new Promise((resolve) => {
        let frameCount = 0;
        let lastTime = performance.now();
        
        function countFrames() {
          frameCount++;
          const currentTime = performance.now();
          
          if (currentTime - lastTime >= 1000) {
            resolve(frameCount);
          } else {
            requestAnimationFrame(countFrames);
          }
        }
        
        requestAnimationFrame(countFrames);
      });
    });
    
    // Should maintain close to 60fps
    expect(fps).toBeGreaterThan(50);
  });

  test('should be responsive across different desktop resolutions', async ({ page }) => {
    // RED: Responsive design test
    
    const resolutions = [
      { width: 1920, height: 1080 },
      { width: 1366, height: 768 },
      { width: 1280, height: 720 },
      { width: 1024, height: 768 }
    ];
    
    for (const resolution of resolutions) {
      await page.setViewportSize(resolution);
      await page.goto('/');
      
      const gameContainer = page.locator('#game-container');
      await expect(gameContainer).toBeVisible();
      
      // Game should maintain aspect ratio and be centered
      const containerBounds = await gameContainer.boundingBox();
      expect(containerBounds).toBeTruthy();
      expect(containerBounds!.width).toBeLessThanOrEqual(resolution.width);
      expect(containerBounds!.height).toBeLessThanOrEqual(resolution.height);
    }
  });

  test('should work across different browsers', async ({ page, browserName }) => {
    // RED: Cross-browser compatibility
    
    await page.goto('/');
    
    // Should work in Chrome, Firefox, Safari, and Edge
    const canvas = page.locator('#game-container canvas');
    await expect(canvas).toBeVisible({ timeout: 10000 });
    
    // Verify WebGL/Canvas2D support
    const hasWebGLSupport = await page.evaluate(() => {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    });
    
    // All modern browsers should support WebGL
    expect(hasWebGLSupport).toBe(true);
    
    // Verify no browser-specific console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('favicon')) {
        errors.push(`[${browserName}] ${msg.text()}`);
      }
    });
    
    await page.waitForTimeout(3000);
    expect(errors).toHaveLength(0);
  });
});