import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    menuText: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(512, 300, 'logo');

        this.title = this.add.text(512, 460, '🦍 GORILLAS BROWSER CLONE 🦍', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.menuText = this.add.text(512, 520, 'Click anywhere or press SPACE to start!\n\nControls:\n• Type angle (0-180°) and press ENTER\n• Type velocity (1-100) and press ENTER\n• Press SPACE to fire banana! 🍌', {
            fontFamily: 'Arial', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });

        this.input.keyboard?.once('keydown-SPACE', () => {
            this.scene.start('Game');
        });
    }
}
