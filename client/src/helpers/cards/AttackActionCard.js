import Card from "./Card.js";

export default class AttackActionCard extends Card {
    constructor(scene) {
        super(scene);
        this.name = "attackActionCard";
        this.playerCardSprite = "attackActionCard";
        this.opponentCardSprite = "attackActionCard";
    }
}