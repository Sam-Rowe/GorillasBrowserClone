/**
 * Preloader Scene Unit Tests
 * TDD GREEN Phase - Implementation to make tests pass
 * 
 * Testing asset preloading and progress indication
 */

import { PreloaderScene } from '@/game/scenes/PreloaderScene';
import { createMockLoader, createMockSceneManager } from '@tests/utils/tdd-helpers';

describe('Preloader Scene', () => {
  describe('initialization', () => {
    it('should extend Phaser.Scene with correct key', () => {
      // GREEN: Verify proper scene setup
      const preloader = new PreloaderScene();
      expect(preloader.scene.key).toBe('Preloader');
    });

    it('should display loading progress bar', () => {
      // GREEN: Visual feedback during loading
      const preloader = new PreloaderScene();
      preloader.create();
      expect(preloader.loadingBar).toBeDefined();
      expect(preloader.loadingText).toBeDefined();
    });

    it('should load all game assets', () => {
      // GREEN: Complete asset loading for the game
      const preloader = new PreloaderScene();
      const mockLoader = createMockLoader();
      preloader.load = mockLoader as any;
      preloader.preload();
      
      // Verify all required assets are loaded
      expect(mockLoader.image).toHaveBeenCalledWith('logo', expect.any(String));
      expect(mockLoader.image).toHaveBeenCalledWith('gorilla', expect.any(String));
      expect(mockLoader.image).toHaveBeenCalledWith('banana', expect.any(String));
      expect(mockLoader.image).toHaveBeenCalledWith('building', expect.any(String));
    });
  });

  describe('loading progress', () => {
    it('should update progress bar as assets load', () => {
      // GREEN: Real-time loading feedback
      const preloader = new PreloaderScene();
      preloader.create();
      
      // Mock loading progress events
      preloader.updateProgress(0.5);
      expect(preloader.loadingBar.scaleX).toBe(0.5);
      
      preloader.updateProgress(1.0);
      expect(preloader.loadingBar.scaleX).toBe(1.0);
    });

    it('should show percentage text', () => {
      // GREEN: Numerical progress indicator
      const preloader = new PreloaderScene();
      preloader.create();
      
      preloader.updateProgress(0.75);
      expect(preloader.loadingText.text).toBe('75%');
    });

    it('should handle loading completion', () => {
      // GREEN: Transition when all assets loaded
      const preloader = new PreloaderScene();
      const mockSceneManager = createMockSceneManager();
      preloader.scene = mockSceneManager as any;
      
      preloader.handleLoadComplete();
      expect(mockSceneManager.start).toHaveBeenCalledWith('MainMenu');
    });
  });

  describe('error handling', () => {
    it('should display error message for failed assets', () => {
      // GREEN: User feedback for loading errors
      const preloader = new PreloaderScene();
      preloader.create();
      
      preloader.handleLoadError({ key: 'missing-asset' });
      expect(preloader.errorText.visible).toBe(true);
      expect(preloader.errorText.text).toContain('missing-asset');
    });

    it('should allow retry on loading failure', () => {
      // GREEN: Recovery mechanism for failed loads
      const preloader = new PreloaderScene();
      preloader.create();
      preloader.handleLoadError('failed-asset');
      expect(preloader.retryButton.visible).toBe(true);
    });
  });
});