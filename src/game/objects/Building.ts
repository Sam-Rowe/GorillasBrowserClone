/**
 * Building Class
 * Represents individual buildings in the city skyline
 * 
 * GREEN Phase - Minimal implementation to make tests pass
 */

export interface BuildingBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface Crater {
  x: number;
  y: number;
  radius: number;
}

export interface BuildingRenderData {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  craters: Crater[];
}

export interface BuildingStyle {
  windows?: { rows: number; cols: number };
  roofType?: string;
}

export class Building {
  private craters: Crater[] = [];
  private style: BuildingStyle = {};

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string = '#808080'
  ) {
    this.validateDimensions();
  }

  private validateDimensions(): void {
    if (this.x < 0) throw new Error('Invalid x position');
    if (this.y < 0) throw new Error('Invalid y position');
    if (this.width <= 0) throw new Error('Invalid width');
    if (this.height <= 0) throw new Error('Invalid height');
  }

  getBounds(): BuildingBounds {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height
    };
  }

  containsPoint(x: number, y: number): boolean {
    const bounds = this.getBounds();
    
    // Check if point is outside building bounds
    if (x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom) {
      return false;
    }
    
    // Check if point is inside any crater
    for (const crater of this.craters) {
      const dx = x - crater.x;
      const dy = y - crater.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= crater.radius) {
        return false; // Point is in crater, so not in building
      }
    }
    
    return true; // Point is in building and not in any crater
  }

  createCrater(x: number, y: number, radius: number): void {
    this.craters.push({ x, y, radius });
  }

  getCraters(): Crater[] {
    return [...this.craters]; // Return copy to prevent mutation
  }

  getRenderData(): BuildingRenderData {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      color: this.color,
      craters: this.getCraters()
    };
  }

  setStyle(property: string, value: any): void {
    (this.style as any)[property] = value;
  }

  getStyle(): BuildingStyle {
    return { ...this.style }; // Return copy to prevent mutation
  }
}