import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');
        
        // Create fighter graphics
        this.createFighterJetGraphic();
        this.createFighterTankGraphic();
        this.createFighterShipGraphic();
    }

    createFighterJetGraphic() {
        // Create a simple fighter jet using graphics
        const graphics = this.add.graphics();
        
        // Fighter jet body (triangle)
        graphics.fillStyle(0x666666);
        graphics.fillTriangle(0, 0, 20, 10, 0, 20);
        
        // Fighter jet wings
        graphics.fillStyle(0x888888);
        graphics.fillTriangle(5, 5, 15, 8, 5, 15);
        graphics.fillTriangle(5, 5, 15, 12, 5, 15);
        
        // Fighter jet nose
        graphics.fillStyle(0x444444);
        graphics.fillTriangle(0, 8, 8, 10, 0, 12);
        
        // Generate texture from graphics
        graphics.generateTexture('fighter-jet', 20, 20);
        graphics.destroy();
    }

    createFighterTankGraphic() {
        // Create a simple fighter tank using graphics
        const graphics = this.add.graphics();
        
        // Tank body (rectangle)
        graphics.fillStyle(0x666666);
        graphics.fillRect(0, 5, 20, 10);
        
        // Tank tracks
        graphics.fillStyle(0x444444);
        graphics.fillRect(0, 0, 20, 3);
        graphics.fillRect(0, 17, 20, 3);
        
        // Tank cannon
        graphics.fillStyle(0x888888);
        graphics.fillRect(15, 8, 8, 4);
        
        // Generate texture from graphics
        graphics.generateTexture('fighter-tank', 28, 20);
        graphics.destroy();
    }

    createFighterShipGraphic() {
        // Create a simple fighter ship using graphics
        const graphics = this.add.graphics();
        
        // Ship hull (oval)
        graphics.fillStyle(0x666666);
        graphics.fillEllipse(10, 10, 20, 12);
        
        // Ship bridge
        graphics.fillStyle(0x888888);
        graphics.fillRect(5, 4, 10, 6);
        
        // Ship engines
        graphics.fillStyle(0x444444);
        graphics.fillRect(0, 8, 4, 4);
        graphics.fillRect(16, 8, 4, 4);
        
        // Generate texture from graphics
        graphics.generateTexture('fighter-ship', 20, 20);
        graphics.destroy();
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
