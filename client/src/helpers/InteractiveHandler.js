export default class InteractiveHandler {
    constructor(scene) {

        scene.Send.on('pointerdown', () => {

            var sendObj = scene.SendHandler.Send(scene.playerEnterTextElement);

            if (sendObj.playerMessageEmpty == false) {
                scene.socket.emit("sendMessage", scene.socket.id, sendObj.playerMessage)
                scene.Send.disableInteractive();
            }
        })

        scene.Send.on('pointerover', () => {
            scene.Send.setColor('#ff69b4');
        })

        scene.Send.on('pointerout', () => {
            scene.Send.setColor('#00ffff')
        })

    }
}