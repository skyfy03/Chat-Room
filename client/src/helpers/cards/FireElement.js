import Card from "./Card.js";

export default class FireElement extends Card {
    constructor(scene) {
        super(scene);
        this.name = "fireElement";
        this.playerCardSprite = "fireElement";
        this.opponentCardSprite = "fireElement";
    }
}