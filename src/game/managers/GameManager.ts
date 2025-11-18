/**
 * Game Manager
 * Manages overall game flow and scene transitions
 * 
 * GREEN Phase - Implementation to make scene transition tests pass
 */

export class GameManager {
  private currentScene: string = 'Boot';
  private sceneData: { [key: string]: any } = {};
  
  start() {
    this.currentScene = 'Boot';
  }
  
  advanceScene() {
    const sequence = ['Boot', 'Preloader', 'MainMenu', 'Game', 'GameOver'];
    const currentIndex = sequence.indexOf(this.currentScene);
    
    if (currentIndex < sequence.length - 1) {
      this.currentScene = sequence[currentIndex + 1];
    }
  }
  
  getCurrentScene(): string {
    return this.currentScene;
  }
  
  transitionToScene(sceneName: string, data?: any) {
    this.currentScene = sceneName;
    if (data) {
      this.sceneData[sceneName] = data;
    }
  }
  
  getSceneData(sceneName: string): any {
    return this.sceneData[sceneName];
  }
  
  setErrorHandler(handler: (error: any) => void) {
    // Minimal implementation for error handling
  }
}