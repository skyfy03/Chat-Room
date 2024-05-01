import Card from "./Card.js";

export default class CardAttack extends Card {

    constructor(scene) {

        super(scene);

        this.attackCard = true;
        this.damage = 0;


        this.setDamage = (cardDamge, cardData) => {
            this.damage = cardDamge;
            cardData.cardDamage = this.damage;

            return cardData;
        }

        this.renderAttackDamage = (x, y) => {

            let attackCardDamageText = scene.add.text(x, y + 10, this.damage).setFontSize(28).setFontFamily('Trebuchet MS');
            attackCardDamageText.setColor('#d70808');

            return attackCardDamageText;

        }

    }

}