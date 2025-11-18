/**
 * Game HUD
 * Heads-up display for game information and player input
 * 
 * GREEN Phase - Implementation to make tests pass
 */

export interface TrajectoryPoint {
  x: number;
  y: number;
}

export class GameHUD {
  private currentPlayer: number = 1;
  private windSpeed: number = 0;
  private score: { player1: number; player2: number } = { player1: 0, player2: 0 };
  private errorMessage: string = '';
  private isErrorVisible: boolean = false;
  private currentAngle: string = '';
  private currentVelocity: string = '';
  private isInputMode: 'angle' | 'velocity' | 'none' = 'none';
  private trajectoryPoints: TrajectoryPoint[] = [];
  private showTrajectory: boolean = false;
  private gameOverWinner: number | null = null;
  private helpVisible: boolean = false;

  setCurrentPlayer(playerNumber: number): void {
    this.currentPlayer = playerNumber;
  }

  getTurnText(): string {
    return `Player ${this.currentPlayer} Turn`;
  }

  setWind(windSpeed: number): void {
    this.windSpeed = windSpeed;
  }

  getWindText(): string {
    const direction = this.windSpeed > 0 ? '→' : '←';
    const speed = Math.abs(this.windSpeed);
    return `Wind: ${direction} ${speed}`;
  }

  setScore(player1Score: number, player2Score: number): void {
    this.score.player1 = player1Score;
    this.score.player2 = player2Score;
  }

  getScoreText(): string {
    return `Score: ${this.score.player1} - ${this.score.player2}`;
  }

  showInputPrompt(): void {
    this.isInputMode = 'angle';
  }

  getPromptText(): string {
    if (this.isInputMode === 'angle') {
      return 'Enter angle (0-180):';
    } else if (this.isInputMode === 'velocity') {
      return 'Enter velocity (1-100):';
    }
    return 'Enter angle (0-180) and velocity (1-100)';
  }

  startAngleInput(): void {
    this.isInputMode = 'angle';
    this.currentAngle = '';
  }

  startVelocityInput(): void {
    this.isInputMode = 'velocity';
    this.currentVelocity = '';
  }

  handleKeyPress(key: string): void {
    if (this.isInputMode === 'angle') {
      if (key >= '0' && key <= '9') {
        this.currentAngle += key;
      }
    } else if (this.isInputMode === 'velocity') {
      if (key >= '0' && key <= '9') {
        this.currentVelocity += key;
      }
    }
  }

  getCurrentAngle(): string {
    return this.currentAngle;
  }

  getCurrentVelocity(): string {
    return this.currentVelocity;
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.isErrorVisible = true;
  }

  getErrorText(): string {
    return this.errorMessage;
  }

  isErrorVisibleCheck(): boolean {
    return this.isErrorVisible;
  }

  clearError(): void {
    this.isErrorVisible = false;
    this.errorMessage = '';
  }

  showGameOver(winnerPlayer: number): void {
    this.gameOverWinner = winnerPlayer;
  }

  getGameOverText(): string {
    return `Player ${this.gameOverWinner} Wins!`;
  }

  isRestartButtonVisible(): boolean {
    return this.gameOverWinner !== null;
  }

  showHelp(): void {
    this.helpVisible = true;
  }

  hideHelp(): void {
    this.helpVisible = false;
  }

  getHelpText(): string {
    return `F1: Toggle Help
Arrow Keys: Navigate Menu
Enter: Select/Confirm
Space: Fire Banana
Escape: Pause Game`;
  }

  showTrajectoryPreview(trajectory: TrajectoryPoint[]): void {
    this.trajectoryPoints = trajectory;
    this.showTrajectory = true;
  }

  hideTrajectoryPreview(): void {
    this.showTrajectory = false;
    this.trajectoryPoints = [];
  }

  isTrajectoryVisible(): boolean {
    return this.showTrajectory;
  }

  getTrajectoryPoints(): TrajectoryPoint[] {
    return this.trajectoryPoints;
  }
}