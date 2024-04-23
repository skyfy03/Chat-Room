import Card from "./Card.js";

export default class PowerfulGust extends Card {
    constructor(scene) {
        super(scene);
        this.name = "powerfulGust";
        this.playerCardSprite = "powerfulGust";
        this.opponentCardSprite = "powerfulGust";
    }
}