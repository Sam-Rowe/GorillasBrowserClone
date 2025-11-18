/**
 * Building Unit Tests
 * TDD GREEN Phase - Implementation to make tests pass
 * 
 * Testing individual building properties and behavior
 */

import { Building } from '@/game/objects/Building';

describe('Building', () => {
  describe('creation and properties', () => {
    it('should create building with correct dimensions', () => {
      // GREEN: Basic building construction
      const building = new Building(100, 200, 80, 150, '#ff0000');
      expect(building.x).toBe(100);
      expect(building.y).toBe(200);
      expect(building.width).toBe(80);
      expect(building.height).toBe(150);
      expect(building.color).toBe('#ff0000');
    });

    it('should validate building dimensions', () => {
      // GREEN: Input validation for building creation
      expect(() => new Building(-10, 0, 50, 100)).toThrow('Invalid x position');
      expect(() => new Building(0, -10, 50, 100)).toThrow('Invalid y position');
      expect(() => new Building(0, 0, -10, 100)).toThrow('Invalid width');
      expect(() => new Building(0, 0, 50, -10)).toThrow('Invalid height');
    });

    it('should have bounding rectangle for collision detection', () => {
      // GREEN: Collision detection support
      const building = new Building(100, 200, 80, 150);
      const bounds = building.getBounds();
      expect(bounds.left).toBe(100);
      expect(bounds.right).toBe(180);
      expect(bounds.top).toBe(200);
      expect(bounds.bottom).toBe(350);
    });

    it('should detect point collision', () => {
      // GREEN: Point-in-building collision detection
      const building = new Building(100, 200, 80, 150);
      expect(building.containsPoint(140, 250)).toBe(true);  // Inside
      expect(building.containsPoint(50, 250)).toBe(false);   // Left of building
      expect(building.containsPoint(200, 250)).toBe(false);  // Right of building
      expect(building.containsPoint(140, 150)).toBe(false);  // Above building
      expect(building.containsPoint(140, 400)).toBe(false);  // Below building
    });
  });

  describe('destruction mechanics', () => {
    it('should create crater when hit by projectile', () => {
      // GREEN: Building destruction for banana impacts
      const building = new Building(100, 200, 80, 150);
      const impactX = 140;
      const impactY = 250;
      const craterRadius = 25;
      
      building.createCrater(impactX, impactY, craterRadius);
      
      // Points inside crater should no longer collide with building
      expect(building.containsPoint(140, 250)).toBe(false);
      expect(building.containsPoint(135, 245)).toBe(false);
      
      // Points outside crater should still collide
      expect(building.containsPoint(110, 220)).toBe(true);
    });

    it('should handle multiple craters', () => {
      // GREEN: Multiple impacts on same building
      const building = new Building(100, 200, 80, 150);
      building.createCrater(120, 230, 15);
      building.createCrater(160, 270, 15);
      
      expect(building.containsPoint(120, 230)).toBe(false); // First crater
      expect(building.containsPoint(160, 270)).toBe(false); // Second crater
      expect(building.containsPoint(140, 250)).toBe(true);  // Between craters
    });

    it('should provide crater data for rendering', () => {
      // GREEN: Visual representation of destruction
      const building = new Building(100, 200, 80, 150);
      building.createCrater(140, 250, 20);
      
      const craters = building.getCraters();
      expect(craters).toHaveLength(1);
      expect(craters[0]).toEqual({
        x: 140,
        y: 250,
        radius: 20
      });
    });
  });

  describe('rendering support', () => {
    it('should provide render data for graphics', () => {
      // GREEN: Support for Phaser rendering
      const building = new Building(100, 200, 80, 150, '#0080ff');
      const renderData = building.getRenderData();
      
      expect(renderData).toEqual({
        x: 100,
        y: 200,
        width: 80,
        height: 150,
        color: '#0080ff',
        craters: []
      });
    });

    it('should support different building styles', () => {
      // GREEN: Visual variety for buildings
      const building = new Building(100, 200, 80, 150);
      building.setStyle('windows', { rows: 5, cols: 3 });
      building.setStyle('roofType', 'flat');
      
      const style = building.getStyle();
      expect(style.windows.rows).toBe(5);
      expect(style.windows.cols).toBe(3);
      expect(style.roofType).toBe('flat');
    });
  });
});