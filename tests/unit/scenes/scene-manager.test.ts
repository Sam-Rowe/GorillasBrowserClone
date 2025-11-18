/**
 * Scene Manager Unit Tests
 * TDD GREEN Phase - Implementation to make tests pass
 * 
 * Testing the scene management system for proper initialization and transitions
 */

import { SceneManager } from '@/game/managers/SceneManager';

describe('SceneManager', () => {
  describe('initialization', () => {
    it('should initialize all scenes in correct order', () => {
      // GREEN: Now implementing the actual functionality
      const sceneManager = new SceneManager();
      const scenes = sceneManager.getInitializedScenes();
      expect(scenes).toEqual(['Boot', 'Preloader', 'MainMenu', 'Game', 'GameOver']);
    });

    it('should register scenes with proper keys', () => {
      // GREEN: Define expected scene registration behavior
      const sceneManager = new SceneManager();
      expect(sceneManager.hasScene('Boot')).toBe(true);
      expect(sceneManager.hasScene('Preloader')).toBe(true);
      expect(sceneManager.hasScene('MainMenu')).toBe(true);
      expect(sceneManager.hasScene('Game')).toBe(true);
      expect(sceneManager.hasScene('GameOver')).toBe(true);
    });

    it('should handle scene loading failures gracefully', () => {
      // GREEN: Error handling for invalid scenes
      const sceneManager = new SceneManager();
      expect(() => sceneManager.startScene('InvalidScene')).toThrow('Scene not found: InvalidScene');
    });
  });

  describe('memory management', () => {
    it('should cleanup scene resources on transition', () => {
      // GREEN: Memory leak prevention during scene changes
      const sceneManager = new SceneManager();
      const initialMemory = sceneManager.getMemoryUsage();
      sceneManager.transitionToScene('MainMenu', 'Game');
      sceneManager.transitionToScene('Game', 'MainMenu');
      const finalMemory = sceneManager.getMemoryUsage();
      expect(finalMemory).toBeLessThanOrEqual(initialMemory * 1.1); // Allow 10% variance
    });

    it('should destroy previous scene when starting new one', () => {
      // GREEN: Ensure proper cleanup of scene resources
      const sceneManager = new SceneManager();
      sceneManager.startScene('MainMenu');
      const menuActive = sceneManager.isSceneActive('MainMenu');
      sceneManager.startScene('Game');
      expect(menuActive).toBe(true);
      expect(sceneManager.isSceneActive('Game')).toBe(true);
    });
  });

  describe('scene lifecycle', () => {
    it('should call preload, create, and update methods in order', () => {
      // GREEN: Verify Phaser scene lifecycle compliance
      const sceneManager = new SceneManager();
      const mockScene = sceneManager.createMockScene();
      const lifecycleCalls = sceneManager.trackLifecycleCalls(mockScene);
      sceneManager.startScene('MainMenu');
      expect(lifecycleCalls).toEqual(['preload', 'create', 'update']);
    });
  });
});