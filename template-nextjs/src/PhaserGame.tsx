import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import Phaser from 'phaser';
import { BootScene } from './game/scenes/boot-scene';
import { GameScene } from './game/scenes/game-scene';
import { PreloadScene } from './game/scenes/preload-scene';

export interface IRefPhaserGame
{
    game: Phaser.Game | undefined;
    scene: Phaser.Scene | undefined;
}

interface IProps
{
    currentActiveScene?: (scene_instance: Phaser.Scene) => void
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(function PhaserGame({ currentActiveScene }, ref)
{
    const game = useRef<Phaser.Game | undefined>(undefined);
    const gameInstance = useRef<Phaser.Scene | undefined>(undefined);

    useImperativeHandle(ref, () => ({
        game: game.current,
        scene: gameInstance.current
    }));

    useEffect(() => {
        if (game.current === undefined) {

            game.current = new Phaser.Game({
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
                scene: [BootScene, PreloadScene, GameScene]
            });

            gameInstance.current = game.current.scene.getScene('BootScene') || undefined;

            if (typeof currentActiveScene === 'function' && gameInstance.current)
            {
                currentActiveScene(gameInstance.current);
            }

        }

        return () => {
            if (game.current)
            {
                game.current.destroy(true);
                if (game.current !== undefined)
                {
                    game.current = undefined;
                }
            }
        }
    }, [currentActiveScene]);

    return (
        <div  id="game-container"></div>
    )
}); 