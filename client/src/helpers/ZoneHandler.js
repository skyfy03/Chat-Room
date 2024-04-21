export default class ZoneHandler {
    constructor(scene) {
        this.renderZone = (x, y) => {
            let width = 850;
            let height = 125;
            let dropZone = scene.add.zone(x, y, width, height).setRectangleDropZone(width, height);
            dropZone.setData({
                "cards": 0
            });
            return dropZone;
        }
        this.renderOutline = (dropZone) => {
            let dropZoneOutline = scene.add.graphics();
            dropZoneOutline.lineStyle(4, 0x000000);
            dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
            dropZone.setData("outline", dropZoneOutline);
        }
    }
}