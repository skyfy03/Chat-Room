export default class Card {
    constructor(scene) {
        this.render = (x, y, type, dropZoneName) => {
            let sprite;
            if (type === 'playerCard') {
                sprite = this.playerCardSprite;
            } else {
                sprite = this.opponentCardSprite;
            }
            let card = scene.add.image(x, y, sprite).setInteractive().setData({
                "name": this.name,
                "type": type,
                "sprite": sprite,
                "dropZoneName": dropZoneName
            });
            if (type === 'playerCard') {
                scene.input.setDraggable(card);
            }
            return card;
        }
    }
}