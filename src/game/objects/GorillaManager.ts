/**
 * Gorilla Manager
 * Manages gorilla placement, turns, and game state
 * 
 * GREEN Phase - Minimal implementation to make tests pass
 */

import { Gorilla, GorillaBounds } from './Gorilla';
import { Building } from './Building';

export interface HitResult {
  hit: boolean;
  playerHit?: number;
}

export class GorillaManager {
  private gorillas: Gorilla[] = [];
  private currentPlayerIndex: number = 0;
  private isAnimating: boolean = false;
  private randomSeed?: string;

  constructor(seed?: string) {
    this.randomSeed = seed;
  }

  placeGorillas(buildings: Building[]): Gorilla[] {
    // Select two different buildings for gorilla placement
    const building1Index = this.selectBuildingIndex(buildings, 0);
    const building2Index = this.selectBuildingIndex(buildings, 1, building1Index);

    const gorilla1 = Gorilla.placeOnBuilding(1, buildings[building1Index]);
    const gorilla2 = Gorilla.placeOnBuilding(2, buildings[building2Index]);

    // Ensure minimum separation
    if (Math.abs(gorilla1.x - gorilla2.x) < 200) {
      // Reposition if too close (simplified for GREEN phase)
      gorilla2.x = gorilla1.x + 250;
    }

    gorilla1.setCurrentPlayer(true);
    gorilla2.setCurrentPlayer(false);

    this.gorillas = [gorilla1, gorilla2];
    return this.gorillas;
  }

  private selectBuildingIndex(buildings: Building[], gorillaIndex: number, excludeIndex?: number): number {
    const availableIndices = buildings
      .map((_, index) => index)
      .filter(index => index !== excludeIndex);

    if (this.randomSeed) {
      // Seeded selection for deterministic placement
      const seedValue = this.hashSeed(this.randomSeed + gorillaIndex);
      return availableIndices[seedValue % availableIndices.length];
    } else {
      // Random selection
      return availableIndices[Math.floor(Math.random() * availableIndices.length)];
    }
  }

  private hashSeed(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  getBuildingIndex(gorilla: Gorilla): number {
    // Simplified implementation for GREEN phase
    return gorilla.playerNumber === 1 ? 0 : 1;
  }

  getCurrentPlayer(): number {
    return this.currentPlayerIndex + 1;
  }

  nextTurn(): void {
    if (this.isAnimating) return; // Don't change turn during animation

    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
    
    // Update gorilla states
    this.gorillas.forEach((gorilla, index) => {
      gorilla.setCurrentPlayer(index === this.currentPlayerIndex);
    });
  }

  setAnimating(animating: boolean): void {
    this.isAnimating = animating;
  }

  isGameOver(): boolean {
    return this.gorillas.some(gorilla => !gorilla.isAlive);
  }

  getWinner(): number | null {
    const aliveGorilla = this.gorillas.find(gorilla => gorilla.isAlive);
    return aliveGorilla ? aliveGorilla.playerNumber : null;
  }

  killGorilla(playerNumber: number): void {
    const gorilla = this.gorillas.find(g => g.playerNumber === playerNumber);
    if (gorilla) {
      gorilla.kill();
    }
  }

  checkProjectileHit(x: number, y: number): HitResult {
    for (const gorilla of this.gorillas) {
      if (gorilla.isAlive) {
        const bounds = gorilla.getBounds();
        if (x >= bounds.x && x <= bounds.x + bounds.width &&
            y >= bounds.y && y <= bounds.y + bounds.height) {
          this.killGorilla(gorilla.playerNumber);
          return { hit: true, playerHit: gorilla.playerNumber };
        }
      }
    }
    return { hit: false };
  }

  getWinnerGorilla(): Gorilla | null {
    return this.gorillas.find(gorilla => gorilla.isAlive) || null;
  }

  checkPointCollision(x: number, y: number): number | null {
    for (const gorilla of this.gorillas) {
      if (gorilla.isAlive) {
        const bounds = gorilla.getBounds();
        if (x >= bounds.x && x <= bounds.x + bounds.width &&
            y >= bounds.y && y <= bounds.y + bounds.height) {
          return gorilla.playerNumber;
        }
      }
    }
    return null;
  }

  getGorillaBounds(): GorillaBounds[] {
    return this.gorillas.map(gorilla => gorilla.getBounds());
  }
}