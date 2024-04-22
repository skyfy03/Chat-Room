import Card from "./Card.js";

export default class EarthElement extends Card {
    constructor(scene) {
        super(scene);
        this.name = "earthElement";
        this.playerCardSprite = "earthElement";
        this.opponentCardSprite = "earthElement";
    }
}