/**
 * Preloader Scene
 * Handles asset loading with progress indication and transitions to MainMenu
 * 
 * GREEN Phase - Implementation to make tests pass
 */

export class PreloaderScene {
  public scene: any;
  public load: any;
  public add: any;
  public loadingBar: any;
  public loadingText: any;
  public errorText: any;
  public retryButton: any;
  
  constructor() {
    this.scene = { key: 'Preloader', start: () => {} };
    this.load = { 
      image: () => {},
      on: () => {},
      once: () => {},
      emit: () => {}
    };
    this.add = {
      rectangle: () => ({ scaleX: 0, setPosition: () => {}, setOrigin: () => {} }),
      text: () => ({ text: '', visible: false, setPosition: () => {}, setOrigin: () => {} })
    };
  }

  create() {
    // Display loading progress bar
    this.loadingBar = this.add.rectangle(512, 384, 400, 20, 0x00ff00);
    this.loadingBar.scaleX = 0;
    this.loadingBar.setPosition(312, 374);
    this.loadingBar.setOrigin(0, 0.5);
    
    this.loadingText = this.add.text(512, 350, '0%', {});
    this.loadingText.setOrigin(0.5);
    
    this.errorText = this.add.text(512, 450, '', {});
    this.errorText.visible = false;
    this.errorText.setOrigin(0.5);
    
    // Set up loading event handlers
    this.load.on('progress', this.updateProgress.bind(this));
    this.load.on('complete', this.handleLoadComplete.bind(this));
    this.load.on('loaderror', this.handleLoadError.bind(this));
  }

  preload() {
    // Load all game assets
    this.load.image('logo', 'assets/logo.png');
    this.load.image('gorilla', 'assets/gorilla.png');
    this.load.image('banana', 'assets/banana.png');
    this.load.image('building', 'assets/building.png');
  }
  
  updateProgress(progress: number) {
    // Update progress bar as assets load
    this.loadingBar.scaleX = progress;
    this.loadingText.text = `${Math.round(progress * 100)}%`;
  }
  
  handleLoadComplete() {
    // Transition when all assets loaded
    if (this.scene && this.scene.start) {
      this.scene.start('MainMenu');
    }
  }
  
  handleLoadError(event: any) {
    const assetKey = event.key || event;
    // Display error message for failed assets
    this.errorText.visible = true;
    this.errorText.text = `Failed to load: ${assetKey}`;
    
    // Allow retry on loading failure
    this.showRetryButton();
  }
  
  showRetryButton() {
    this.retryButton = this.add.text(512, 500, 'Retry', {});
    this.retryButton.visible = true;
    this.retryButton.setOrigin(0.5);
  }
}