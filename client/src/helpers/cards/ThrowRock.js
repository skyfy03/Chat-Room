import Card from "./Card.js";
import CardAttack from "./CardAttack.js";

export default class ThrowRock extends CardAttack {

    constructor(scene) {

        super(scene);

        this.name = "throwRock";
        this.playerCardSprite = "throwRock";
        this.opponentCardSprite = "throwRock";



    }

}