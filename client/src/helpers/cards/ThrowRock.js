import Card from "./Card.js";

export default class ThrowRock extends Card {
    constructor(scene) {
        super(scene);
        this.name = "throwRock";
        this.playerCardSprite = "throwRock";
        this.opponentCardSprite = "throwRock";
    }
}