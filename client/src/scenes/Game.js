import { Scene } from 'phaser';
import SendHandler from '../helpers/messaging/SendHandler';
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
        this.playerEnterTextElement = document.getElementById('myText');
        this.textAreaElement = document.getElementById('textArea');


        this.SendHandler = new SendHandler();
        this.GameHandler = new GameHandler(this);
        this.SocketHandler = new SocketHandler(this);
        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();
        this.InteractiveHandler = new InteractiveHandler(this);
    }
}
