/**
 * Game Scene
 * Main gameplay scene integrating all game systems
 * 
 * Complete integration of all TDD-developed components
 */

import { CityGenerator } from '../objects/CityGenerator';
import { GorillaManager } from '../objects/GorillaManager';
import { ProjectilePhysics } from '../physics/ProjectilePhysics';
import { GameStateManager } from '../managers/GameStateManager';
import { InputValidator } from '../input/InputValidator';
import { GameHUD } from '../ui/GameHUD';
import { ExplosionEffects } from '../effects/ExplosionEffects';
import { SoundManager } from '../audio/SoundManager';

export class GameScene {
  private cityGenerator: CityGenerator;
  private gorillaManager: GorillaManager;
  private physics: ProjectilePhysics;
  private gameState: GameStateManager;
  private validator: InputValidator;
  private hud: GameHUD;
  private effects: ExplosionEffects;
  private audio: SoundManager;
  private buildings: any[] = [];
  private gorillas: any[] = [];
  private currentProjectile: any = null;
  
  constructor() {
    // Initialize all TDD-tested systems
    this.cityGenerator = new CityGenerator(1024, 768);
    this.gorillaManager = new GorillaManager();
    this.physics = new ProjectilePhysics();
    this.gameState = new GameStateManager();
    this.validator = new InputValidator();
    this.hud = new GameHUD();
    this.effects = new ExplosionEffects();
    this.audio = new SoundManager();
  }

  create(): void {
    // Generate city and place gorillas
    this.buildings = this.cityGenerator.generateCity();
    this.gorillas = this.gorillaManager.placeGorillas(this.buildings);
    
    // Initialize game state
    this.gameState.startNewGame(this.buildings);
    
    // Setup HUD
    this.updateHUD();
    
    // Preload audio
    this.audio.preloadSounds();
    
    console.log('🎮 Gorillas Game Ready!');
    console.log(`🏢 Generated ${this.buildings.length} buildings`);
    console.log(`🦍 Placed ${this.gorillas.length} gorillas`);
    console.log('🎯 Enter angle and velocity to fire!');
  }

  handlePlayerInput(angle: number, velocity: number): boolean {
    // Validate input using TDD-tested validator
    const validation = this.validator.validateShot(angle, velocity);
    
    if (!validation.valid) {
      this.hud.showError(validation.errors?.join(', ') || 'Invalid input');
      return false;
    }

    // Fire projectile
    this.fireProjectile(angle, velocity);
    return true;
  }

  private fireProjectile(angle: number, velocity: number): void {
    const currentPlayer = this.gameState.getGameState().currentPlayer;
    const gorilla = this.gorillas.find(g => g.playerNumber === currentPlayer);
    
    if (!gorilla) return;

    // Create projectile with physics
    this.currentProjectile = this.physics.createProjectile(
      gorilla.x, gorilla.y, angle, velocity
    );

    // Play throw sound
    this.audio.playSound('throw');

    // Start animation
    gorilla.startThrowAnimation(angle, velocity);
    
    console.log(`🍌 Player ${currentPlayer} fires! Angle: ${angle}°, Velocity: ${velocity}`);
  }

  update(deltaTime: number): void {
    if (this.currentProjectile && this.currentProjectile.isActive) {
      // Update projectile physics
      const windStrength = this.gameState.getWindStrength();
      this.physics.update(this.currentProjectile, deltaTime, 9.81, windStrength);
      
      // Check collisions
      this.checkProjectileCollisions();
    }

    // Update visual effects
    // (Effects would be updated here in full implementation)
    
    // Update HUD
    this.updateHUD();
  }

  private checkProjectileCollisions(): void {
    if (!this.currentProjectile) return;

    const x = this.currentProjectile.x;
    const y = this.currentProjectile.y;

    // Check if projectile hit something
    const hit = this.gameState.processProjectileHit(x, y);
    
    if (hit) {
      // Create explosion effect
      const explosion = this.effects.createExplosion(x, y, 'medium');
      
      // Play explosion sound
      this.audio.playSound('explosion');
      
      // Deactivate projectile
      this.currentProjectile.explode(x, y);
      this.currentProjectile = null;
      
      // Check game over
      if (this.gameState.getGameState().isGameOver) {
        this.handleGameOver();
      } else {
        // Next turn
        this.gameState.nextTurn();
      }
      
      console.log(`💥 Explosion at (${Math.round(x)}, ${Math.round(y)})`);
    }

    // Check if projectile went off screen
    if (y > 800 || x < -100 || x > 1200) {
      this.currentProjectile = null;
      this.gameState.nextTurn();
      console.log('🌊 Projectile went off screen - next turn');
    }
  }

  private handleGameOver(): void {
    const winner = this.gameState.getGameState().winner;
    if (winner) {
      this.hud.showGameOver(winner);
      this.audio.playSound('victory');
      console.log(`🏆 Game Over! Player ${winner} wins!`);
    }
  }

  private updateHUD(): void {
    const state = this.gameState.getGameState();
    
    this.hud.setCurrentPlayer(state.currentPlayer);
    this.hud.setWind(this.gameState.getWindStrength());
    this.hud.setScore(state.matchScore.player1, state.matchScore.player2);
  }

  // Public interface for external integration
  getBuildings() { return this.buildings; }
  getGorillas() { return this.gorillas; }
  getCurrentProjectile() { return this.currentProjectile; }
  getGameState() { return this.gameState.getGameState(); }
  getHUD() { return this.hud; }
}