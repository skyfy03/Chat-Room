import Card from "./Card.js";

export default class WaterElement extends Card {
    constructor(scene) {
        super(scene);
        this.name = "waterElement";
        this.playerCardSprite = "waterElement";
        this.opponentCardSprite = "waterElement";
    }
}