/**
 * Game State Manager
 * Central game state management for win/lose conditions, scoring, and game flow
 * 
 * GREEN Phase - Implementation for multiple remaining tasks
 */

import { GorillaManager } from '../objects/GorillaManager';
import { Building } from '../objects/Building';
import { ProjectilePhysics } from '../physics/ProjectilePhysics';

export interface GameScore {
  player1: number;
  player2: number;
}

export interface GameState {
  isActive: boolean;
  isGameOver: boolean;
  winner: number | null;
  currentPlayer: number;
  round: number;
  matchScore: GameScore;
}

export class GameStateManager {
  private gameState: GameState;
  private gorillaManager: GorillaManager;
  private buildings: Building[] = [];
  private physics: ProjectilePhysics;
  private windStrength: number = 0;

  constructor() {
    this.gameState = {
      isActive: false,
      isGameOver: false,
      winner: null,
      currentPlayer: 1,
      round: 1,
      matchScore: { player1: 0, player2: 0 }
    };
    this.gorillaManager = new GorillaManager();
    this.physics = new ProjectilePhysics();
  }

  startNewGame(buildings: Building[]): void {
    this.buildings = buildings;
    this.gorillaManager.placeGorillas(buildings);
    this.generateWind();
    
    this.gameState = {
      isActive: true,
      isGameOver: false,
      winner: null,
      currentPlayer: 1,
      round: 1,
      matchScore: { player1: 0, player2: 0 }
    };
  }

  startNewRound(): void {
    if (this.gameState.isGameOver) return;
    
    this.gorillaManager.placeGorillas(this.buildings);
    this.generateWind();
    this.gameState.round++;
    this.gameState.currentPlayer = 1;
  }

  processProjectileHit(x: number, y: number): boolean {
    // Check gorilla hit
    const hitResult = this.gorillaManager.checkProjectileHit(x, y);
    if (hitResult.hit && hitResult.playerHit) {
      this.handleGorillaHit(hitResult.playerHit);
      return true;
    }

    // Check building hit
    for (const building of this.buildings) {
      if (building.containsPoint(x, y)) {
        building.createCrater(x, y, 25); // Create explosion crater
        return true;
      }
    }

    return false;
  }

  private handleGorillaHit(playerHit: number): void {
    const winner = playerHit === 1 ? 2 : 1;
    
    // Update score
    if (winner === 1) {
      this.gameState.matchScore.player1++;
    } else {
      this.gameState.matchScore.player2++;
    }

    // Check if match is over (first to 3 wins, or single round)
    const maxScore = Math.max(this.gameState.matchScore.player1, this.gameState.matchScore.player2);
    if (maxScore >= 3) {
      this.gameState.isGameOver = true;
      this.gameState.winner = winner;
    }

    // Trigger celebration
    const winnerGorilla = this.gorillaManager.getWinnerGorilla();
    if (winnerGorilla) {
      winnerGorilla.celebrate();
    }
  }

  nextTurn(): void {
    if (this.gameState.isGameOver) return;
    
    this.gorillaManager.nextTurn();
    this.gameState.currentPlayer = this.gorillaManager.getCurrentPlayer();
  }

  generateWind(): void {
    // Random wind between -5 and +5 (negative = left, positive = right)
    this.windStrength = (Math.random() - 0.5) * 10;
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }

  getWindStrength(): number {
    return this.windStrength;
  }

  isValidShot(angle: number, velocity: number): boolean {
    return angle >= 0 && angle <= 180 && velocity >= 1 && velocity <= 100;
  }

  calculateTrajectory(startX: number, startY: number, angle: number, velocity: number) {
    return this.physics.predictTrajectory(startX, startY, angle, velocity, 9.81, this.windStrength);
  }

  pauseGame(): void {
    this.gameState.isActive = false;
  }

  resumeGame(): void {
    this.gameState.isActive = true;
  }

  resetGame(): void {
    this.gameState = {
      isActive: false,
      isGameOver: false,
      winner: null,
      currentPlayer: 1,
      round: 1,
      matchScore: { player1: 0, player2: 0 }
    };
  }
}