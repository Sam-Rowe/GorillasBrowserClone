/**
 * Responsive City E2E Tests
 * TDD RED Phase - These tests will FAIL until responsive city system is implemented
 * 
 * Testing city adaptation across different screen sizes
 */

import { test, expect } from '@playwright/test';

test.describe('Responsive City E2E', () => {
  const screenSizes = [
    { name: '800x600 (Small)', width: 800, height: 600 },
    { name: '1024x768 (Standard)', width: 1024, height: 768 },
    { name: '1280x720 (HD)', width: 1280, height: 720 },
    { name: '1920x1080 (Full HD)', width: 1920, height: 1080 }
  ];

  screenSizes.forEach(({ name, width, height }) => {
    test(`should render appropriate city for ${name}`, async ({ page }) => {
      // RED: Test city adaptation for each screen size
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForSelector('#game-container canvas', { timeout: 10000 });
      
      const canvas = page.locator('#game-container canvas');
      await canvas.click();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      
      // Verify canvas matches viewport
      const canvasBounds = await canvas.boundingBox();
      expect(canvasBounds?.width).toBeLessThanOrEqual(width);
      expect(canvasBounds?.height).toBeLessThanOrEqual(height);
      
      // Take screenshot for visual verification
      const screenshot = await canvas.screenshot();
      expect(screenshot.length).toBeGreaterThan(0);
      
      // Analyze building layout programmatically
      const cityStats = await page.evaluate(() => {
        // This will fail until city rendering is implemented
        // Mock analysis for now
        return {
          buildingCount: 0,
          screenCoverage: 0,
          avgBuildingWidth: 0
        };
      });
      
      // Buildings should adapt to screen size appropriately
      expect(cityStats.buildingCount).toBeGreaterThanOrEqual(6);
      expect(cityStats.buildingCount).toBeLessThanOrEqual(10);
    });
  });

  test('should maintain aspect ratios across screen sizes', async ({ page }) => {
    // RED: Building proportions should scale appropriately
    const aspectRatios = [];
    
    for (const { width, height } of screenSizes) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForSelector('#game-container canvas');
      
      const canvas = page.locator('#game-container canvas');
      await canvas.click();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      
      // Measure building heights relative to screen size
      const aspectRatio = await page.evaluate(() => {
        // This will be implemented once city rendering is working
        // For now, return mock data that will cause test to fail
        return 0;
      });
      
      aspectRatios.push(aspectRatio);
    }
    
    // Aspect ratios should be consistent across screen sizes
    const avgRatio = aspectRatios.reduce((sum, r) => sum + r, 0) / aspectRatios.length;
    aspectRatios.forEach(ratio => {
      expect(Math.abs(ratio - avgRatio)).toBeLessThan(0.1); // Within 10% variance
    });
  });

  test('should handle extreme aspect ratios', async ({ page }) => {
    // RED: Test very wide or very tall screens
    const extremeSizes = [
      { name: 'Ultra-wide', width: 2560, height: 1080 },
      { name: 'Tall', width: 768, height: 1024 }
    ];
    
    for (const { name, width, height } of extremeSizes) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForSelector('#game-container canvas');
      
      const canvas = page.locator('#game-container canvas');
      await canvas.click();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      
      // Verify game doesn't break with extreme ratios
      const screenshot = await canvas.screenshot();
      expect(screenshot.length).toBeGreaterThan(0);
      
      // Buildings should still span full width appropriately
      const canvasBounds = await canvas.boundingBox();
      expect(canvasBounds).toBeTruthy();
      
      // City should be playable regardless of aspect ratio
      const isPlayable = await page.evaluate(() => {
        // Check if city rendering completed without errors
        return !window.console.error; // Simplified check
      });
      
      expect(isPlayable).toBeTruthy();
    }
  });

  test('should adapt building count based on screen width', async ({ page }) => {
    // RED: More buildings on wider screens (within limits)
    const buildingCounts = [];
    
    for (const { width } of screenSizes) {
      await page.setViewportSize({ width, height: 768 }); // Keep height constant
      await page.goto('/');
      await page.waitForSelector('#game-container canvas');
      
      const canvas = page.locator('#game-container canvas');
      await canvas.click();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      
      const buildingCount = await page.evaluate(() => {
        // This will be implemented once city system is working
        // Should analyze rendered buildings and count them
        return 0; // Will cause test to fail until implemented
      });
      
      buildingCounts.push({ width, count: buildingCount });
    }
    
    // Verify building count increases with screen width (within limits)
    for (let i = 1; i < buildingCounts.length; i++) {
      const current = buildingCounts[i];
      const previous = buildingCounts[i - 1];
      
      if (current.width > previous.width) {
        // Wider screens should have same or more buildings (up to max of 10)
        expect(current.count).toBeGreaterThanOrEqual(previous.count);
      }
    }
    
    // All counts should be within valid range
    buildingCounts.forEach(({ count }) => {
      expect(count).toBeGreaterThanOrEqual(6);
      expect(count).toBeLessThanOrEqual(10);
    });
  });

  test('should maintain visual quality at all screen sizes', async ({ page }) => {
    // RED: Buildings should look crisp and properly proportioned at any size
    for (const { name, width, height } of screenSizes) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForSelector('#game-container canvas');
      
      const canvas = page.locator('#game-container canvas');
      await canvas.click();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      
      // Check for visual artifacts or rendering issues
      const hasRenderingIssues = await page.evaluate(() => {
        const canvas = document.querySelector('#game-container canvas') as HTMLCanvasElement;
        if (!canvas) return true;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return true;
        
        // Look for incomplete rendering or visual artifacts
        // This is a simplified check - will be expanded once rendering is implemented
        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          return imageData.data.length === 0;
        } catch (e) {
          return true;
        }
      });
      
      expect(hasRenderingIssues).toBe(false);
      
      // Take screenshot for manual visual verification
      await canvas.screenshot({ path: `test-results/city-${width}x${height}.png` });
    }
  });

  test('should handle rapid screen size changes', async ({ page }) => {
    // RED: Test dynamic resizing without crashes
    await page.goto('/');
    await page.waitForSelector('#game-container canvas');
    
    const canvas = page.locator('#game-container canvas');
    await canvas.click();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    
    // Rapidly change screen sizes
    for (let i = 0; i < 5; i++) {
      const size = screenSizes[i % screenSizes.length];
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.waitForTimeout(200);
      
      // Verify game is still functional after resize
      const screenshot = await canvas.screenshot();
      expect(screenshot.length).toBeGreaterThan(0);
    }
    
    // Check for any JavaScript errors during resizing
    const errors = await page.evaluate(() => {
      // Return any console errors that occurred
      return window.console.error ? ['Resize error detected'] : [];
    });
    
    expect(errors).toHaveLength(0);
  });
});