import { Scene } from 'phaser';
import CardHandler from '../helpers/CardHandler';
import DeckHandler from '../helpers/DeckHandler';
import GameHandler from '../helpers/GameHandler';
import InteractiveHandler from '../helpers/InteractiveHandler';
import SocketHandler from '../helpers/SocketHandler';
import UIHandler from '../helpers/UIHandler';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        //this.cameras.main.setBackgroundColor(0x00ff00);

        //this.add.image(512, 384, 'background').setAlpha(0.5);

        //this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
        //    fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //    stroke: '#000000', strokeThickness: 8,
        //    align: 'center'
        //}).setOrigin(0.5);

        //this.input.once('pointerdown', () => {

        //    this.scene.start('GameOver');

        //});

        this.CardHandler = new CardHandler();
        this.DeckHandler = new DeckHandler(this);
        this.GameHandler = new GameHandler(this);
        this.SocketHandler = new SocketHandler(this);
        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();
        this.InteractiveHandler = new InteractiveHandler(this);

    }
}
