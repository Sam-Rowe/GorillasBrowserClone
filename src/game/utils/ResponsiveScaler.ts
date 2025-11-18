/**
 * Responsive Scaler
 * Handles responsive scaling of city elements across different screen sizes
 * 
 * GREEN Phase - Minimal implementation to make tests pass
 */

import { Building } from '../objects/Building';

export interface BuildingLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CityLayout {
  buildings: BuildingLayout[];
  groundLevel: number;
}

export class ResponsiveScaler {
  calculateBuildingCount(screenWidth: number): number {
    // Minimum building width of 80px, maximum 10 buildings, minimum 6 buildings
    const minBuildingWidth = 80;
    const maxBuildings = 10;
    const minBuildings = 6;
    
    const calculatedCount = Math.floor(screenWidth / minBuildingWidth);
    return Math.max(minBuildings, Math.min(maxBuildings, calculatedCount));
  }

  calculateBuildingWidth(screenWidth: number, buildingCount: number): number {
    return Math.floor(screenWidth / buildingCount);
  }

  calculateBuildingLayout(screenWidth: number, buildingCount: number): { buildings: BuildingLayout[] } {
    const baseWidth = Math.floor(screenWidth / buildingCount);
    const remainder = screenWidth % buildingCount;
    
    const buildings: BuildingLayout[] = [];
    let currentX = 0;
    
    for (let i = 0; i < buildingCount; i++) {
      // Distribute remainder pixels across first few buildings
      const width = baseWidth + (i < remainder ? 1 : 0);
      
      buildings.push({
        x: currentX,
        y: 0, // Will be set based on height calculation
        width: width,
        height: 0 // Will be set by height calculator
      });
      
      currentX += width;
    }
    
    return { buildings };
  }

  calculateBaseHeight(screenHeight: number): number {
    // Base height is 50% of screen height
    return Math.floor(screenHeight * 0.5);
  }

  calculateScaledHeight(screenHeight: number, referenceHeight: number): number {
    const referenceScreenHeight = 768;
    const scaleFactor = screenHeight / referenceScreenHeight;
    return Math.floor(referenceHeight * scaleFactor);
  }

  generateCityLayout(screenWidth: number, screenHeight: number): CityLayout {
    const buildingCount = this.calculateBuildingCount(screenWidth);
    const { buildings } = this.calculateBuildingLayout(screenWidth, buildingCount);
    const groundLevel = Math.floor(screenHeight * 0.8); // Ground at 80% down screen
    
    // Set building heights (simplified for GREEN phase)
    const baseHeight = this.calculateBaseHeight(screenHeight);
    
    buildings.forEach((building, index) => {
      // Simple height variation for GREEN phase
      const variation = (Math.random() - 0.5) * baseHeight * 0.5;
      building.height = Math.max(50, baseHeight + variation);
      building.y = groundLevel - building.height;
    });
    
    return {
      buildings,
      groundLevel
    };
  }
}