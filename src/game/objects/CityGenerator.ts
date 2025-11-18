/**
 * City Generator
 * Main class for procedural city skyline generation
 * 
 * GREEN Phase - Minimal implementation to make tests pass
 */

import { Building } from './Building';
import { HeightCalculator } from '../utils/HeightCalculator';
import { ResponsiveScaler } from '../utils/ResponsiveScaler';

export class CityGenerator {
  private heightCalculator: HeightCalculator;
  private responsiveScaler: ResponsiveScaler;
  private screenWidth: number;
  private screenHeight: number;

  constructor(screenWidth: number, screenHeight: number, seed?: string) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.heightCalculator = new HeightCalculator(seed);
    this.responsiveScaler = new ResponsiveScaler();
  }

  generateCity(baseHeight?: number, groundLevel?: number): Building[] {
    const buildingCount = this.responsiveScaler.calculateBuildingCount(this.screenWidth);
    const { buildings } = this.responsiveScaler.calculateBuildingLayout(this.screenWidth, buildingCount);
    
    const actualBaseHeight = baseHeight || this.heightCalculator.calculateBaseHeight(this.screenHeight);
    const actualGroundLevel = groundLevel || Math.floor(this.screenHeight * 0.8);
    
    const cityBuildings: Building[] = [];
    const colors = ['#808080', '#a0a0a0', '#909090', '#707070', '#b0b0b0']; // Simple color palette
    
    buildings.forEach((buildingLayout, index) => {
      const variation = this.heightCalculator.calculateHeightVariation(actualBaseHeight);
      const finalHeight = this.heightCalculator.calculateFinalHeight(actualBaseHeight, variation);
      const y = actualGroundLevel - finalHeight;
      const color = colors[index % colors.length];
      
      const building = new Building(
        buildingLayout.x,
        y,
        buildingLayout.width,
        finalHeight,
        color
      );
      
      cityBuildings.push(building);
    });
    
    return cityBuildings;
  }

  calculateBuildingWidth(buildingCount?: number): number {
    const actualBuildingCount = buildingCount || this.responsiveScaler.calculateBuildingCount(this.screenWidth);
    return this.responsiveScaler.calculateBuildingWidth(this.screenWidth, actualBuildingCount);
  }

  calculateHeightVariation(baseHeight: number): number {
    return this.heightCalculator.calculateHeightVariation(baseHeight);
  }
}