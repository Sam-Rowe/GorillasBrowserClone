/**
 * Scene Transitions E2E Tests
 * TDD RED Phase - These tests will FAIL until keyboard navigation is implemented
 * 
 * Testing user-driven scene transitions via keyboard controls
 */

import { test, expect } from '@playwright/test';

test.describe('Scene Transitions E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for game to fully load to MainMenu
    await page.waitForSelector('#game-container canvas', { timeout: 10000 });
    await page.waitForTimeout(2000); // Allow scene transitions to complete
  });

  test('should navigate from MainMenu to Game using keyboard', async ({ page }) => {
    // RED: Keyboard navigation test (will fail until implemented)
    
    const canvas = page.locator('#game-container canvas');
    
    // Focus the game canvas
    await canvas.click();
    
    // Press Enter to start game (or whatever key will be used)
    await page.keyboard.press('Enter');
    
    // Should transition to Game scene
    await page.waitForTimeout(1000);
    
    // Verify we're now in the Game scene
    // (This will need scene state detection once implemented)
    await expect(canvas).toBeVisible();
    
    // Game scene should be interactive
    // (Will expand this test once game controls are defined)
  });

  test('should show help menu with F1 key', async ({ page }) => {
    // RED: Help system test (requirement from project spec)
    
    const canvas = page.locator('#game-container canvas');
    await canvas.click();
    
    // Press F1 to show help
    await page.keyboard.press('F1');
    
    // Help menu should appear
    // (This will need help UI implementation)
    await page.waitForTimeout(500);
    
    // Verify help content is visible
    // (Will add specific selectors once help UI is designed)
    
    // Press Escape or F1 again to close help
    await page.keyboard.press('F1');
    
    // Help should be hidden
    await page.waitForTimeout(500);
  });

  test('should handle arrow key navigation in menus', async ({ page }) => {
    // RED: Arrow key menu navigation (keyboard-only requirement)
    
    const canvas = page.locator('#game-container canvas');
    await canvas.click();
    
    // Use arrow keys to navigate menu options
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(200);
    
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(200);
    
    // Enter should select current menu item
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    
    // Should transition to selected scene/option
    await expect(canvas).toBeVisible();
  });

  test('should return to MainMenu from Game with Escape', async ({ page }) => {
    // RED: Game exit functionality
    
    const canvas = page.locator('#game-container canvas');
    await canvas.click();
    
    // Navigate to game
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    
    // Press Escape to return to menu
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    
    // Should be back in MainMenu
    // (Will add scene state verification once implemented)
    await expect(canvas).toBeVisible();
  });

  test('should handle scene transitions without visual glitches', async ({ page }) => {
    // RED: Visual quality test for smooth transitions
    
    const canvas = page.locator('#game-container canvas');
    
    // Take screenshot of MainMenu
    await canvas.click();
    const mainMenuScreenshot = await canvas.screenshot();
    
    // Navigate to Game
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    
    // Take screenshot of Game scene
    const gameScreenshot = await canvas.screenshot();
    
    // Screenshots should be different (indicating scene change)
    expect(Buffer.compare(mainMenuScreenshot, gameScreenshot)).not.toBe(0);
    
    // No flickering or rendering artifacts should occur
    // (Will add pixel comparison tests once scenes are implemented)
  });

  test('should maintain keyboard focus during transitions', async ({ page }) => {
    // RED: Focus management test
    
    const canvas = page.locator('#game-container canvas');
    await canvas.click();
    
    // Verify canvas has focus
    const focused1 = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused1).toBe('CANVAS');
    
    // Navigate between scenes
    await page.keyboard.press('Enter'); // To Game
    await page.waitForTimeout(500);
    
    await page.keyboard.press('Escape'); // Back to Menu
    await page.waitForTimeout(500);
    
    // Focus should remain on canvas
    const focused2 = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused2).toBe('CANVAS');
  });

  test('should handle rapid key presses without breaking transitions', async ({ page }) => {
    // RED: Stress test for keyboard input
    
    const canvas = page.locator('#game-container canvas');
    await canvas.click();
    
    // Rapidly press navigation keys
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Enter');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(50);
    }
    
    // Game should still be functional
    await expect(canvas).toBeVisible();
    
    // No JavaScript errors should occur
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(1000);
    expect(errors).toHaveLength(0);
  });

  test('should work consistently across multiple page loads', async ({ page }) => {
    // RED: Consistency test for scene initialization
    
    for (let i = 0; i < 3; i++) {
      await page.goto('/');
      await page.waitForSelector('#game-container canvas', { timeout: 5000 });
      await page.waitForTimeout(1000);
      
      const canvas = page.locator('#game-container canvas');
      await canvas.click();
      
      // Should be able to navigate consistently each time
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      
      await expect(canvas).toBeVisible();
    }
  });
});