import Card from "./Card.js";

export default class FireBlast extends Card {
    constructor(scene) {
        super(scene);
        this.name = "fireBlast";
        this.playerCardSprite = "fireBlast";
        this.opponentCardSprite = "fireBlast";
    }
}