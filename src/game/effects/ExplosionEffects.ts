/**
 * Explosion Effects
 * Visual explosion effects for projectile impacts
 * 
 * GREEN Phase - Implementation to make tests pass
 */

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export interface Explosion {
  x: number;
  y: number;
  radius: number;
  frame: number;
  maxFrames: number;
  isActive: boolean;
  particles: Particle[];
  getParticles: () => Particle[];
}

export class ExplosionEffects {
  createExplosion(x: number, y: number, size: string): Explosion {
    const sizeMap = {
      small: 20,
      medium: 35,
      large: 50
    };
    
    const radius = sizeMap[size as keyof typeof sizeMap] || 35;
    const particleCount = radius / 5; // Scale particles with size
    
    const explosion: Explosion = {
      x: x,
      y: y,
      radius: radius,
      frame: 0,
      maxFrames: 30, // 0.5 seconds at 60fps
      isActive: true,
      particles: [],
      getParticles: function() { return this.particles; }
    };

    // Generate debris particles
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 50 + Math.random() * 100;
      
      explosion.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        maxLife: 1.0
      });
    }

    return explosion;
  }

  update(explosion: Explosion, deltaTime: number): void {
    if (!explosion.isActive) return;

    explosion.frame++;
    if (explosion.frame >= explosion.maxFrames) {
      explosion.isActive = false;
      return;
    }

    // Update particles
    explosion.particles.forEach(particle => {
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;
      particle.vy += 200 * deltaTime; // Gravity
      particle.life -= deltaTime * 2; // Fade over time
    });

    // Remove dead particles
    explosion.particles = explosion.particles.filter(p => p.life > 0);
  }
}