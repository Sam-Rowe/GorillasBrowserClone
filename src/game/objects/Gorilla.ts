/**
 * Gorilla Class
 * Represents individual gorilla characters in the game
 * 
 * GREEN Phase - Minimal implementation to make tests pass
 */

export interface GorillaBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GorillaRenderData {
  x: number;
  y: number;
  playerNumber: number;
  animationState: string;
  isAlive: boolean;
  isCurrentPlayer: boolean;
}

export class Gorilla {
  public width: number = 32;
  public height: number = 32;
  public isAlive: boolean = true;
  public isCheerating: boolean = false;
  public isCurrentPlayer: boolean = false;
  public isThrowAnimating: boolean = false;
  public isPlayingHitAnimation: boolean = false;
  public throwAngle: number = 0;

  constructor(
    public playerNumber: number,
    public x: number,
    public y: number
  ) {
    this.validatePlayerNumber();
  }

  private validatePlayerNumber(): void {
    if (this.playerNumber < 1 || this.playerNumber > 2) {
      throw new Error('Invalid player number');
    }
  }

  static placeOnBuilding(playerNumber: number, building: any): Gorilla {
    const x = building.x + building.width / 2;
    const y = building.y - 32; // Gorilla height
    return new Gorilla(playerNumber, x, y);
  }

  getBounds(): GorillaBounds {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  kill(): void {
    this.isAlive = false;
  }

  celebrate(): void {
    this.isCheerating = true;
  }

  setCurrentPlayer(isCurrent: boolean): void {
    this.isCurrentPlayer = isCurrent;
  }

  startThrowAnimation(angle: number, velocity: number): void {
    this.isThrowAnimating = true;
    this.throwAngle = angle;
  }

  completeThrowAnimation(): void {
    this.isThrowAnimating = false;
  }

  playHitAnimation(): void {
    this.isPlayingHitAnimation = true;
  }

  getRenderData(): GorillaRenderData {
    return {
      x: this.x,
      y: this.y,
      playerNumber: this.playerNumber,
      animationState: this.getCurrentSprite(),
      isAlive: this.isAlive,
      isCurrentPlayer: this.isCurrentPlayer
    };
  }

  getCurrentSprite(): string {
    if (!this.isAlive) return 'gorilla_dead';
    if (this.isThrowAnimating) return 'gorilla_throw';
    if (this.isCheerating) return 'gorilla_celebrate';
    return 'gorilla_idle';
  }
}