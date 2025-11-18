/**
 * Projectile Physics
 * Handles banana projectile physics simulation
 * 
 * GREEN Phase - Minimal implementation to make tests pass
 */

import { Building } from '../objects/Building';

export interface Vector2D {
  x: number;
  y: number;
}

export interface TrajectoryPoint {
  x: number;
  y: number;
}

export interface CollisionResult {
  hit: boolean;
  building?: Building;
  point?: TrajectoryPoint;
  trajectoryIndex?: number;
}

export interface Projectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isActive: boolean;
  hasCollided: boolean;
  explode: (x: number, y: number) => void;
}

export class ProjectilePhysics {
  private gravity: number;
  
  constructor(preset: string = 'earth') {
    switch (preset) {
      case 'earth':
        this.gravity = 9.81;
        break;
      case 'moon':
        this.gravity = 1.62;
        break;
      default:
        this.gravity = 9.81;
    }
  }

  calculateInitialVelocity(angle: number, speed: number): Vector2D {
    const angleRad = (angle * Math.PI) / 180;
    return {
      x: speed * Math.cos(angleRad),
      y: -speed * Math.sin(angleRad) // Negative for upward motion
    };
  }

  applyGravity(vy: number, gravity: number, timeStep: number): number {
    return vy + gravity * timeStep;
  }

  applyWind(vx: number, windForce: number, timeStep: number): number {
    return vx + windForce * timeStep;
  }

  updatePosition(x: number, y: number, vx: number, vy: number, timeStep: number): TrajectoryPoint {
    return {
      x: x + vx * timeStep,
      y: y + vy * timeStep
    };
  }

  predictTrajectory(
    startX: number,
    startY: number,
    angle: number,
    velocity: number,
    gravity: number,
    wind: number,
    timeStep: number = 0.016
  ): TrajectoryPoint[] {
    const trajectory: TrajectoryPoint[] = [];
    const initialVelocity = this.calculateInitialVelocity(angle, velocity);
    
    let x = startX;
    let y = startY;
    let vx = initialVelocity.x;
    let vy = initialVelocity.y;

    trajectory.push({ x, y });

    for (let i = 0; i < 1000; i++) { // Max simulation steps
      vy = this.applyGravity(vy, gravity, timeStep);
      vx = this.applyWind(vx, wind, timeStep);
      
      const newPos = this.updatePosition(x, y, vx, vy, timeStep);
      x = newPos.x;
      y = newPos.y;
      
      trajectory.push({ x, y });

      // Stop if projectile goes too far off screen or underground
      if (y > 1000 || x < -500 || x > 2000) break;
    }

    return trajectory;
  }

  findGroundImpact(trajectory: TrajectoryPoint[], groundLevel: number): TrajectoryPoint {
    for (let i = 1; i < trajectory.length; i++) {
      const current = trajectory[i];
      const previous = trajectory[i - 1];
      
      if (previous.y <= groundLevel && current.y >= groundLevel) {
        // Interpolate exact impact point
        const t = (groundLevel - previous.y) / (current.y - previous.y);
        return {
          x: previous.x + t * (current.x - previous.x),
          y: groundLevel
        };
      }
    }
    
    // Return last point if no ground impact found
    return trajectory[trajectory.length - 1];
  }

  checkBuildingCollision(trajectory: TrajectoryPoint[], buildings: Building[]): CollisionResult {
    for (let i = 0; i < trajectory.length; i++) {
      const point = trajectory[i];
      
      for (const building of buildings) {
        if (building.containsPoint(point.x, point.y)) {
          return {
            hit: true,
            building: building,
            point: point,
            trajectoryIndex: i
          };
        }
      }
    }
    
    return { hit: false };
  }

  createProjectile(x: number, y: number, angle: number, velocity: number): Projectile {
    const initialVelocity = this.calculateInitialVelocity(angle, velocity);
    
    return {
      x: x,
      y: y,
      vx: initialVelocity.x,
      vy: initialVelocity.y,
      isActive: true,
      hasCollided: false,
      explode: function(x: number, y: number) {
        this.isActive = false;
        this.hasCollided = true;
      }
    };
  }

  update(projectile: Projectile, timeStep: number, gravity: number, wind: number): void {
    if (!projectile.isActive) return;

    projectile.vy = this.applyGravity(projectile.vy, gravity, timeStep);
    projectile.vx = this.applyWind(projectile.vx, wind, timeStep);
    
    const newPos = this.updatePosition(projectile.x, projectile.y, projectile.vx, projectile.vy, timeStep);
    projectile.x = newPos.x;
    projectile.y = newPos.y;
  }

  getGravity(): number {
    return this.gravity;
  }
}