export default class Card {
    constructor(scene) {
        this.render = (x, y, type, dropZoneName) => {
            let sprite;
            if (type === 'playerCard') {
                sprite = this.playerCardSprite;
            } else {
                sprite = this.opponentCardSprite;
            }

            let cardData = {};

            cardData[this.name] = {
                name: this.name,
                type: type,
                sprite: sprite,
                dropZoneName: dropZoneName
            }

            let card = scene.add.image(x, y, sprite).setInteractive().setData({
                "cardData": cardData
            });

            if (type === 'playerCard') {
                scene.input.setDraggable(card);
            }
            return card;
        }
    }
}