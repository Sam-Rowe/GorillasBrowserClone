/**
 * Input Validator
 * Validates player input for angle and velocity values
 * 
 * GREEN Phase - Minimal implementation to make tests pass
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface ShotValidationResult {
  valid: boolean;
  angle?: number;
  velocity?: number;
  angleError?: string;
  velocityError?: string;
  errors?: string[];
  warning?: string;
}

export class InputValidator {
  validateAngle(angle: any): boolean {
    if (typeof angle !== 'number') return false;
    return angle >= 0 && angle <= 180;
  }

  validateAngleWithMessage(angle: any): ValidationResult {
    if (!this.validateAngle(angle)) {
      return {
        valid: false,
        error: 'Angle must be between 0 and 180 degrees'
      };
    }
    return { valid: true };
  }

  validateVelocity(velocity: any): boolean {
    if (typeof velocity !== 'number') return false;
    return velocity >= 1 && velocity <= 100;
  }

  validateVelocityWithMessage(velocity: any): ValidationResult {
    if (!this.validateVelocity(velocity)) {
      return {
        valid: false,
        error: 'Velocity must be between 1 and 100'
      };
    }
    return { valid: true };
  }

  validateShot(angle: any, velocity: any): ShotValidationResult {
    const angleValidation = this.validateAngleWithMessage(angle);
    const velocityValidation = this.validateVelocityWithMessage(velocity);
    
    const errors: string[] = [];
    if (!angleValidation.valid && angleValidation.error) {
      errors.push(angleValidation.error);
    }
    if (!velocityValidation.valid && velocityValidation.error) {
      errors.push(velocityValidation.error);
    }

    if (errors.length > 0) {
      return {
        valid: false,
        angleError: !angleValidation.valid ? angleValidation.error : undefined,
        velocityError: !velocityValidation.valid ? velocityValidation.error : undefined,
        errors: errors
      };
    }

    return {
      valid: true,
      angle: angle,
      velocity: velocity
    };
  }

  sanitizeAngle(input: any): number {
    if (typeof input === 'string') {
      const trimmed = input.trim();
      const parsed = parseFloat(trimmed);
      return isNaN(parsed) ? 0 : Math.round(parsed);
    }
    if (typeof input === 'number') {
      return Math.round(input);
    }
    return 0;
  }

  sanitizeVelocity(input: any): number {
    if (typeof input === 'string') {
      const parsed = parseFloat(input);
      return isNaN(parsed) ? 1 : Math.round(parsed);
    }
    if (typeof input === 'number') {
      return Math.round(input);
    }
    return 1;
  }

  isPlayableAngle(angle: number): boolean {
    // Too shallow or too steep angles are not good for gameplay
    return angle >= 10 && angle <= 170;
  }

  getSuggestion(angle: number, velocity: number): string {
    const suggestions: string[] = [];
    
    if (angle < 10) {
      suggestions.push('Try a higher angle');
    }
    if (angle > 170) {
      suggestions.push('Try a lower angle');
    }
    if (velocity < 25) {
      suggestions.push('increase velocity');
    }
    if (velocity > 80) {
      suggestions.push('reduce velocity for better control');
    }

    return suggestions.join(', ');
  }

  validateForDistance(angle: number, velocity: number, distance: number): ShotValidationResult {
    const baseValidation = this.validateShot(angle, velocity);
    
    if (!baseValidation.valid) {
      return baseValidation;
    }

    // Check for potential overshoot
    if (velocity > 80 && distance < 300) {
      return {
        ...baseValidation,
        warning: 'High velocity may overshoot at close range'
      };
    }

    return baseValidation;
  }
}