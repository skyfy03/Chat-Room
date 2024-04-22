import Card from "./Card.js";

export default class WindElement extends Card {
    constructor(scene) {
        super(scene);
        this.name = "windElement";
        this.playerCardSprite = "windElement";
        this.opponentCardSprite = "windElement";
    }
}