export default class ZoneHandler {
    constructor(scene) {

        this.name;
        this.socketId;

        this.renderZone = (x, y) => {
            let width = 850;
            let height = 125;
            let dropZone = scene.add.zone(x, y, width, height).setRectangleDropZone(width, height);
            dropZone.setData({
                "cards": 0,
                "cardGameObjects": []
            });
            return dropZone;
        }
        this.renderOutline = (dropZone, color) => {
            let dropZoneOutline = scene.add.graphics();
            dropZoneOutline.lineStyle(4, '0x' + color);
            dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
            dropZone.setData("outline", dropZoneOutline);
        }
    }
}