/**
 * Height Calculator
 * Handles building height calculations and variations
 * 
 * GREEN Phase - Minimal implementation to make tests pass
 */

export class HeightCalculator {
  private randomSeed: string | undefined;
  private seedIndex: number = 0;

  constructor(seed?: string) {
    this.randomSeed = seed;
  }

  calculateBaseHeight(screenHeight: number): number {
    // Base height should be 40-60% of screen height (using 50% for consistency)
    return Math.floor(screenHeight * 0.5);
  }

  calculateHeightVariation(baseHeight: number): number {
    const maxVariation = baseHeight * 0.5; // ±50% variation
    
    if (this.randomSeed) {
      // Seeded random generation for deterministic results
      const random = this.seededRandom();
      return (random - 0.5) * 2 * maxVariation; // Range: -maxVariation to +maxVariation
    } else {
      // Regular random generation
      return (Math.random() - 0.5) * 2 * maxVariation;
    }
  }

  calculateFinalHeight(baseHeight: number, variation: number): number {
    const finalHeight = baseHeight + variation;
    
    // Ensure minimum height of 50px
    const minHeight = 50;
    
    // Ensure maximum height doesn't exceed reasonable bounds
    // (This will be refined based on actual screen constraints)
    const maxHeight = baseHeight * 2;
    
    return Math.max(minHeight, Math.min(maxHeight, finalHeight));
  }

  calculateScaledHeight(screenHeight: number, referenceHeight: number): number {
    // Scale height proportionally with screen size
    const referenceScreenHeight = 768; // Reference screen height
    const scaleFactor = screenHeight / referenceScreenHeight;
    return referenceHeight * scaleFactor;
  }

  private seededRandom(): number {
    if (!this.randomSeed) {
      return Math.random();
    }
    
    // Simple seeded random implementation
    let hash = 0;
    const str = this.randomSeed + this.seedIndex++;
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Convert hash to 0-1 range
    return Math.abs(hash % 10000) / 10000;
  }
}