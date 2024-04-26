import Card from "./Card.js";

export default class ViolentWave extends Card {
    constructor(scene) {
        super(scene);
        this.name = "violentWave";
        this.playerCardSprite = "violentWave";
        this.opponentCardSprite = "violentWave";
    }
}