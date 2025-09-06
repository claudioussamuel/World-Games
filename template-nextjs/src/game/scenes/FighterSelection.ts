import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class FighterSelection extends Scene
{
    background: Phaser.GameObjects.Image;
    title: Phaser.GameObjects.Text;
    fighterJet: Phaser.GameObjects.Image;
    fighterJetText: Phaser.GameObjects.Text;
    fighterTank: Phaser.GameObjects.Image;
    fighterTankText: Phaser.GameObjects.Text;
    fighterShip: Phaser.GameObjects.Image;
    fighterShipText: Phaser.GameObjects.Text;
    hasNft: boolean = false;
    isChecking: boolean = false;
    error: string | null = null;
    selectedFighter: string | null = null;

    constructor ()
    {
        super('FighterSelection');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.8);

        this.title = this.add.text(512, 80, 'Select Your Fighter', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Fighter Jet (NFT Required)
        this.fighterJet = this.add.image(200, 300, 'fighter-jet');
        this.fighterJet.setScale(1.5);
        this.fighterJet.setDepth(100);

        this.fighterJetText = this.add.text(200, 400, 'Fighter Jet', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Fighter Tank (Free)
        this.fighterTank = this.add.image(512, 300, 'fighter-tank');
        this.fighterTank.setScale(1.5);
        this.fighterTank.setDepth(100);

        this.fighterTankText = this.add.text(512, 400, 'Fighter Tank', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Fighter Ship (Free)
        this.fighterShip = this.add.image(824, 300, 'fighter-ship');
        this.fighterShip.setScale(1.5);
        this.fighterShip.setDepth(100);

        this.fighterShipText = this.add.text(824, 400, 'Fighter Ship', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Start Game Button
        const startButton = this.add.text(512, 550, 'Start Game', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        startButton.setInteractive({ useHandCursor: true });
        startButton.on('pointerdown', () => this.startGame());

        // Listen for NFT ownership updates
        EventBus.on('nft-ownership-updated', this.updateNftStatus, this);

        // Update all fighters based on NFT ownership
        this.updateAllFighters();

        EventBus.emit('current-scene-ready', this);
    }

    updateNftStatus(data: { hasNft: boolean; isChecking: boolean; error: string | null }) {
        this.hasNft = data.hasNft;
        this.isChecking = data.isChecking;
        this.error = data.error;
        this.updateAllFighters();
    }

    updateAllFighters() {
        // Update Fighter Jet (NFT Required)
        if (this.isChecking) {
            this.fighterJetText.setText('Checking NFT...');
            this.fighterJetText.setColor('#ffff00');
            this.fighterJet.setAlpha(0.5);
            this.fighterJet.setInteractive({ useHandCursor: false });
        } else if (this.hasNft) {
            this.fighterJetText.setText('Fighter Jet ✓');
            this.fighterJetText.setColor('#00ff00');
            this.fighterJet.setAlpha(1);
            this.fighterJet.setInteractive({ useHandCursor: true });
            this.fighterJet.on('pointerdown', () => this.selectFighter('fighter-jet'));
        } else {
            this.fighterJetText.setText('Fighter Jet (NFT Required)');
            this.fighterJetText.setColor('#ff0000');
            this.fighterJet.setAlpha(0.3);
            this.fighterJet.setInteractive({ useHandCursor: false });
        }

        // Update Fighter Tank (Free)
        this.fighterTankText.setText('Fighter Tank (Free)');
        this.fighterTankText.setColor('#00ff00');
        this.fighterTank.setAlpha(1);
        this.fighterTank.setInteractive({ useHandCursor: true });
        this.fighterTank.on('pointerdown', () => this.selectFighter('fighter-tank'));

        // Update Fighter Ship (Free)
        this.fighterShipText.setText('Fighter Ship (Free)');
        this.fighterShipText.setColor('#00ff00');
        this.fighterShip.setAlpha(1);
        this.fighterShip.setInteractive({ useHandCursor: true });
        this.fighterShip.on('pointerdown', () => this.selectFighter('fighter-ship'));
    }

    selectFighter(fighterType: string) {
        // Only allow fighter jet selection if user has NFT
        if (fighterType === 'fighter-jet' && !this.hasNft) {
            this.showMessage('NFT Required!', 'You need to own the Fighter Jet NFT to select this fighter.');
            return;
        }

        this.selectedFighter = fighterType;
        
        // Visual feedback for selection
        this.clearSelection();
        if (fighterType === 'fighter-jet') {
            this.fighterJet.setTint(0x00ff00);
        } else if (fighterType === 'fighter-tank') {
            this.fighterTank.setTint(0x00ff00);
        } else if (fighterType === 'fighter-ship') {
            this.fighterShip.setTint(0x00ff00);
        }

        this.showMessage('Fighter Selected!', `You selected the ${fighterType.replace('-', ' ').toUpperCase()}`);
    }

    clearSelection() {
        this.fighterJet.clearTint();
        this.fighterTank.clearTint();
        this.fighterShip.clearTint();
    }

    showMessage(title: string, message: string) {
        // Create message overlay
        const overlay = this.add.rectangle(512, 384, 1024, 768, 0x000000, 0.7);
        const messageBox = this.add.rectangle(512, 384, 400, 200, 0x333333);
        const titleText = this.add.text(512, 320, title, {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
        const messageText = this.add.text(512, 380, message, {
            fontFamily: 'Arial', fontSize: 16, color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        const closeButton = this.add.text(512, 440, 'Close', {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5);

        closeButton.setInteractive({ useHandCursor: true });
        closeButton.on('pointerdown', () => {
            overlay.destroy();
            messageBox.destroy();
            titleText.destroy();
            messageText.destroy();
            closeButton.destroy();
        });
    }

    startGame() {
        if (!this.selectedFighter) {
            this.showMessage('No Fighter Selected', 'Please select a fighter before starting the game.');
            return;
        }

        EventBus.emit('fighter-selected', this.selectedFighter);
        this.scene.start('Game');
    }

    destroy() {
        EventBus.off('nft-ownership-updated', this.updateNftStatus, this);
        super.destroy();
    }
}
