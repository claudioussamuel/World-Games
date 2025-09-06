import Phaser from 'phaser';
import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';
import { PreloadScene } from './scenes/preload-scene';

const game = new Phaser.Game({
  type: Phaser.CANVAS,
  roundPixels: true,
  pixelArt: true,
  scale: {
    parent: 'game-container',
    width: 450,
    height: 640,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
    min: {
      width: 300,
      height: 400
    },
    max: {
      width: 800,
      height: 1200
    }
  },
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    },
  },
});

game.scene.add('BootScene', BootScene);
game.scene.add('PreloadScene', PreloadScene);
game.scene.add('GameScene', GameScene);
game.scene.start('BootScene');

export default game;