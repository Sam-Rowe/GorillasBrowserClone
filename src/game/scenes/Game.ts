import { Scene } from 'phaser';
import { CityGenerator } from '../objects/CityGenerator';
import { GorillaManager } from '../objects/GorillaManager';
import { ProjectilePhysics } from '../physics/ProjectilePhysics';
import { GameStateManager } from '../managers/GameStateManager';
import { InputValidator } from '../input/InputValidator';
import { ExplosionEffects } from '../effects/ExplosionEffects';
import { SoundManager } from '../audio/SoundManager';

export class Game extends Scene {
    private cityGenerator!: CityGenerator;
    private gorillaManager!: GorillaManager;
    private physics!: ProjectilePhysics;
    private gameState!: GameStateManager;
    private validator!: InputValidator;
    private effects!: ExplosionEffects;
    private audio!: SoundManager;
    
    private buildings: any[] = [];
    private gorillas: any[] = [];
    private currentProjectile: any = null;
    
    private cityGraphics!: Phaser.GameObjects.Graphics;
    private gorillaSprites: Phaser.GameObjects.Rectangle[] = [];
    private projectileSprite?: Phaser.GameObjects.Circle;
    
    private hudText!: Phaser.GameObjects.Text;
    private inputText!: Phaser.GameObjects.Text;
    private instructionText!: Phaser.GameObjects.Text;
    
    private currentAngle: string = '';
    private currentVelocity: string = '';
    private inputMode: 'angle' | 'velocity' | 'none' = 'angle';

    constructor() {
        super('Game');
    }

    create() {
        const { width, height } = this.scale;
        
        // Initialize all TDD-tested systems
        this.cityGenerator = new CityGenerator(width, height);
        this.gorillaManager = new GorillaManager();
        this.physics = new ProjectilePhysics();
        this.gameState = new GameStateManager();
        this.validator = new InputValidator();
        this.effects = new ExplosionEffects();
        this.audio = new SoundManager();
        
        // Generate city and place gorillas
        this.buildings = this.cityGenerator.generateCity();
        this.gorillas = this.gorillaManager.placeGorillas(this.buildings);
        
        // Initialize game state
        this.gameState.startNewGame(this.buildings);
        
        // Create graphics
        this.createGraphics();
        this.createUI();
        
        // Setup input
        this.setupInput();
        
        console.log('🎮 Gorillas Game Started!');
        console.log(`🏢 Generated ${this.buildings.length} buildings`);
        console.log(`🦍 Placed ${this.gorillas.length} gorillas`);
    }

    createGraphics() {
        const { width, height } = this.scale;
        
        // Sky background
        this.add.rectangle(width/2, height/2, width, height, 0x87CEEB);
        
        // Graphics for buildings
        this.cityGraphics = this.add.graphics();
        this.renderCity();
        
        // Create gorilla sprites
        this.gorillas.forEach((gorilla, index) => {
            const color = index === 0 ? 0x8B4513 : 0x654321; // Brown colors
            const sprite = this.add.rectangle(gorilla.x, gorilla.y, 24, 24, color);
            sprite.setOrigin(0.5, 1); // Bottom center origin
            this.gorillaSprites.push(sprite);
        });
    }

    renderCity() {
        this.cityGraphics.clear();
        
        this.buildings.forEach(building => {
            // Building color
            this.cityGraphics.fillStyle(parseInt(building.color.replace('#', '0x'), 16));
            this.cityGraphics.fillRect(building.x, building.y, building.width, building.height);
            
            // Building outline
            this.cityGraphics.lineStyle(2, 0x000000);
            this.cityGraphics.strokeRect(building.x, building.y, building.width, building.height);
            
            // Render craters as black holes
            const craters = building.getCraters();
            craters.forEach((crater: any) => {
                this.cityGraphics.fillStyle(0x000000);
                this.cityGraphics.fillCircle(crater.x, crater.y, crater.radius);
            });
        });
    }

    createUI() {
        const { width } = this.scale;
        
        // HUD
        this.hudText = this.add.text(16, 16, '', {
            fontSize: '18px',
            color: '#ffffff'
        });
        
        // Input display
        this.inputText = this.add.text(width - 350, 16, '', {
            fontSize: '16px',
            color: '#ffff00'
        });
        
        // Instructions with angle guide
        this.instructionText = this.add.text(width/2, 50, 
            'Angle Guide: 0°=Right → | 90°=Up ↑ | 180°=Left ← | 270°=Down ↓\n' +
            'Enter angle (-360° to 360°), then velocity (1-200), then press SPACE to fire!', {
            fontSize: '12px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0);
        
        // Angle compass/indicator
        this.createAngleCompass();
        
        this.updateHUD();
    }

    createAngleCompass() {
        const { width } = this.scale;
        const compassX = width - 100;
        const compassY = 120;
        const radius = 40;
        
        // Compass circle
        const compass = this.add.graphics();
        compass.lineStyle(2, 0xffffff);
        compass.strokeCircle(compassX, compassY, radius);
        
        // Direction markers
        const directions = [
            { angle: 0, label: '0°→', x: compassX + radius + 10, y: compassY },
            { angle: 90, label: '90°↑', x: compassX, y: compassY - radius - 10 },
            { angle: 180, label: '180°←', x: compassX - radius - 20, y: compassY },
            { angle: 270, label: '270°↓', x: compassX, y: compassY + radius + 20 }
        ];
        
        directions.forEach(dir => {
            // Direction line
            const radians = (dir.angle - 90) * Math.PI / 180; // -90 to make 0° point right
            const endX = compassX + Math.cos(radians) * radius;
            const endY = compassY + Math.sin(radians) * radius;
            
            compass.lineStyle(3, 0xffff00);
            compass.lineBetween(compassX, compassY, endX, endY);
            
            // Direction label
            this.add.text(dir.x, dir.y, dir.label, {
                fontSize: '10px',
                color: '#ffff00'
            }).setOrigin(0.5);
        });
        
        // Compass title
        this.add.text(compassX, compassY - radius - 35, 'Angle Guide', {
            fontSize: '12px',
            color: '#ffffff'
        }).setOrigin(0.5);
    }

    setupInput() {
        // Number key input - try multiple key formats
        for (let i = 0; i <= 9; i++) {
            // Try different key event formats
            this.input.keyboard?.on(`keydown-DIGIT${i}`, () => {
                this.handleNumberInput(i.toString());
            });
            this.input.keyboard?.on(`keydown-NUMPAD_${i}`, () => {
                this.handleNumberInput(i.toString());
            });
            this.input.keyboard?.on(`keydown-${i}`, () => {
                this.handleNumberInput(i.toString());
            });
        }
        
        // Alternative: Listen to all keydown events and filter
        this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
            const key = event.key;
            
            // Handle number keys (both top row and numpad)
            if (/^[0-9]$/.test(key)) {
                this.handleNumberInput(key);
                event.preventDefault();
            }
            
            // Handle minus key for negative angles
            if (key === '-' || key === 'Minus') {
                this.handleMinusInput();
                event.preventDefault();
            }
            
            // Handle other keys
            switch (event.code) {
                case 'Backspace':
                    this.handleBackspace();
                    event.preventDefault();
                    break;
                case 'Enter':
                case 'NumpadEnter':
                    this.handleEnter();
                    event.preventDefault();
                    break;
                case 'Space':
                    this.handleSpace();
                    event.preventDefault();
                    break;
                case 'Minus':
                case 'NumpadSubtract':
                    this.handleMinusInput();
                    event.preventDefault();
                    break;
            }
        });
        
        // Backup individual key handlers
        this.input.keyboard?.on('keydown-BACKSPACE', () => {
            this.handleBackspace();
        });
        
        this.input.keyboard?.on('keydown-ENTER', () => {
            this.handleEnter();
        });
        
        this.input.keyboard?.on('keydown-SPACE', () => {
            this.handleSpace();
        });

        this.input.keyboard?.on('keydown-MINUS', () => {
            this.handleMinusInput();
        });
    }

    handleNumberInput(digit: string) {
        console.log(`Number input received: ${digit}, Mode: ${this.inputMode}`);
        
        if (this.inputMode === 'angle') {
            if (this.currentAngle.length < 4) { // Allow for negative angles like -180
                this.currentAngle += digit;
                console.log(`Angle updated: ${this.currentAngle}`);
            }
        } else if (this.inputMode === 'velocity') {
            if (this.currentVelocity.length < 3) {
                this.currentVelocity += digit;
                console.log(`Velocity updated: ${this.currentVelocity}`);
            }
        }
        this.updateInputDisplay();
    }

    handleMinusInput() {
        console.log(`Minus input received, Mode: ${this.inputMode}`);
        
        if (this.inputMode === 'angle' && this.currentAngle.length === 0) {
            this.currentAngle = '-';
            console.log(`Angle updated: ${this.currentAngle}`);
            this.updateInputDisplay();
        }
    }

    handleBackspace() {
        if (this.inputMode === 'angle') {
            this.currentAngle = this.currentAngle.slice(0, -1);
        } else if (this.inputMode === 'velocity') {
            this.currentVelocity = this.currentVelocity.slice(0, -1);
        }
        this.updateInputDisplay();
    }

    handleEnter() {
        if (this.inputMode === 'angle' && this.currentAngle) {
            this.inputMode = 'velocity';
        } else if (this.inputMode === 'velocity' && this.currentVelocity) {
            this.inputMode = 'none';
        }
        this.updateInputDisplay();
    }

    handleSpace() {
        if (this.currentAngle && this.currentVelocity && !this.currentProjectile) {
            const angle = parseInt(this.currentAngle);
            const velocity = parseInt(this.currentVelocity);
            
            if (this.validator.validateShot(angle, velocity).valid) {
                this.fireProjectile(angle, velocity);
                
                // Reset input
                this.currentAngle = '';
                this.currentVelocity = '';
                this.inputMode = 'angle';
                this.updateInputDisplay();
            }
        }
    }

    fireProjectile(angle: number, velocity: number) {
        const currentPlayer = this.gameState.getGameState().currentPlayer;
        const gorilla = this.gorillas.find(g => g.playerNumber === currentPlayer);
        
        if (!gorilla) return;

        // Create projectile with physics
        this.currentProjectile = this.physics.createProjectile(
            gorilla.x, gorilla.y - 12, angle, velocity
        );

        // Create projectile sprite
        this.projectileSprite = this.add.circle(
            this.currentProjectile.x, 
            this.currentProjectile.y, 
            4, 
            0xFFFF00
        );
        
        console.log(`🍌 Player ${currentPlayer} fires! Angle: ${angle}°, Velocity: ${velocity}`);
    }

    update() {
        if (this.currentProjectile && this.currentProjectile.isActive) {
            // Update projectile physics
            const windStrength = this.gameState.getWindStrength();
            this.physics.update(this.currentProjectile, 0.016, 9.81, windStrength);
            
            // Update sprite position
            if (this.projectileSprite) {
                this.projectileSprite.setPosition(
                    this.currentProjectile.x, 
                    this.currentProjectile.y
                );
            }
            
            // Check collisions
            this.checkProjectileCollisions();
        }

        this.updateHUD();
    }

    checkProjectileCollisions() {
        if (!this.currentProjectile) return;

        const x = this.currentProjectile.x;
        const y = this.currentProjectile.y;

        // Check if projectile hit something
        const hit = this.gameState.processProjectileHit(x, y);
        
        if (hit) {
            // Create explosion effect
            this.createExplosion(x, y);
            
            // Remove projectile
            if (this.projectileSprite) {
                this.projectileSprite.destroy();
                this.projectileSprite = undefined;
            }
            this.currentProjectile = null;
            
            // Re-render city to show damage
            this.renderCity();
            
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
        const { width, height } = this.scale;
        if (y > height || x < -100 || x > width + 100) {
            if (this.projectileSprite) {
                this.projectileSprite.destroy();
                this.projectileSprite = undefined;
            }
            this.currentProjectile = null;
            this.gameState.nextTurn();
            console.log('🌊 Projectile went off screen - next turn');
        }
    }

    createExplosion(x: number, y: number) {
        // Simple explosion effect
        const explosion = this.add.circle(x, y, 30, 0xFF4500, 0.8);
        
        this.tweens.add({
            targets: explosion,
            scaleX: 3,
            scaleY: 3,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                explosion.destroy();
            }
        });
    }

    handleGameOver() {
        const winner = this.gameState.getGameState().winner;
        if (winner) {
            const gameOverText = this.add.text(this.scale.width/2, this.scale.height/2, 
                `🏆 Player ${winner} Wins!\n\nPress R to restart`, {
                fontSize: '32px',
                color: '#ffff00',
                align: 'center'
            }).setOrigin(0.5);
            
            this.input.keyboard?.once('keydown-R', () => {
                this.scene.restart();
            });
            
            console.log(`🏆 Game Over! Player ${winner} wins!`);
        }
    }

    updateHUD() {
        const state = this.gameState.getGameState();
        const windStrength = this.gameState.getWindStrength();
        const windDirection = windStrength > 0 ? '→' : '←';
        
        this.hudText.setText([
            `Player ${state.currentPlayer}'s Turn`,
            `Wind: ${windDirection} ${Math.abs(windStrength).toFixed(1)}`,
            `Score: ${state.matchScore.player1} - ${state.matchScore.player2}`
        ]);
    }

    updateInputDisplay() {
        let text = '';
        
        if (this.inputMode === 'angle') {
            const angleDesc = this.currentAngle ? this.validator.getAngleDescription(parseInt(this.currentAngle) || 0) : '';
            text = `Angle: ${this.currentAngle || '_'}° ${angleDesc}\n(Use - for negative, then type numbers, then ENTER)`;
        } else if (this.inputMode === 'velocity') {
            const angleDesc = this.validator.getAngleDescription(parseInt(this.currentAngle) || 0);
            text = `Angle: ${this.currentAngle}° ${angleDesc}\nVelocity: ${this.currentVelocity || '_'} (Type numbers, then ENTER)`;
        } else if (this.currentAngle && this.currentVelocity) {
            const angleDesc = this.validator.getAngleDescription(parseInt(this.currentAngle) || 0);
            text = `Angle: ${this.currentAngle}° ${angleDesc}\nVelocity: ${this.currentVelocity}\nPress SPACE to FIRE! 🍌`;
        }
        
        this.inputText.setText(text);
        
        // Also show debug info in console
        console.log(`Input display updated - Mode: ${this.inputMode}, Angle: ${this.currentAngle}, Velocity: ${this.currentVelocity}`);
    }
}
