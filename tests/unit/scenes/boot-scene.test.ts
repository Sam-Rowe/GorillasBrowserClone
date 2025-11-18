/**
 * Boot Scene Unit Tests  
 * TDD GREEN Phase - Implementation to make tests pass
 * 
 * Testing the Boot scene initialization and transition to Preloader
 */

import { BootScene } from '@/game/scenes/BootScene';
import { createMockLoader, createMockSceneManager } from '@tests/utils/tdd-helpers';

describe('Boot Scene', () => {
  describe('initialization', () => {
    it('should extend Phaser.Scene', () => {
      // GREEN: Verify proper inheritance
      const boot = new BootScene();
      expect(boot.scene.key).toBe('Boot');
    });

    it('should load minimal assets in preload phase', () => {
      // GREEN: Boot should only load essential assets for preloader
      const boot = new BootScene();
      const mockLoader = createMockLoader();
      boot.load = mockLoader as any;
      boot.preload();
      expect(mockLoader.image).toHaveBeenCalledWith('background', expect.any(String));
    });

    it('should transition to Preloader scene on create', () => {
      // GREEN: Boot should immediately start Preloader
      const boot = new BootScene();
      const mockSceneManager = createMockSceneManager();
      boot.scene = mockSceneManager as any;
      boot.create();
      expect(mockSceneManager.start).toHaveBeenCalledWith('Preloader');
    });

    it('should handle asset loading failures gracefully', () => {
      // GREEN: Error handling for failed asset loads
      const boot = new BootScene();
      expect(boot.handleAssetError).toBeDefined();
      // Should continue to Preloader even if some assets fail
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      boot.handleAssetError('test-asset');
      expect(consoleSpy).toHaveBeenCalledWith('Asset failed to load: test-asset');
      consoleSpy.mockRestore();
    });
  });

  describe('performance requirements', () => {
    it('should complete loading within 2 seconds', () => {
      // GREEN: Performance requirement for boot time
      const boot = new BootScene();
      const startTime = performance.now();
      boot.preload();
      boot.create();
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(2000);
    });

    it('should load assets smaller than 100KB total', () => {
      // GREEN: Keep boot assets minimal
      const boot = new BootScene();
      boot.preload(); // This sets up assetSizes
      const assetSizes = boot.getAssetSizes();
      const totalSize = assetSizes.reduce((sum, size) => sum + size, 0);
      expect(totalSize).toBeLessThan(102400); // 100KB in bytes
    });
  });
});