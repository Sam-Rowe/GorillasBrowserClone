import { Scene } from 'phaser';
import { BootScene } from './BootScene';

export class Boot extends Scene
{
    private bootImpl: BootScene;

    constructor ()
    {
        super('Boot');
        this.bootImpl = new BootScene();
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
        this.load.image('background', 'assets/bg.png');
        
        // Delegate to TDD implementation
        this.bootImpl.load = this.load;
        this.bootImpl.preload();
    }

    create ()
    {
        // Delegate to TDD implementation
        this.bootImpl.scene = this.scene;
        this.bootImpl.create();
    }
}
