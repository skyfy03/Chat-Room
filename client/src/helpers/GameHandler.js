export default class GameHandler {

    constructor(scene) {

        this.gameState = "Initializing";

        this.textArea = {
            value: ""
        };

        this.playerEnterText = {
            value: ""
        };

        this.changeTextArea = (newMessage) => {

            textArea.value += "\r " + newMessage;

            scene.UIHandler.buildTextAreaZone();
            scene.playerEnterTextElement.value = "";
            scene.Send.setInteractive();

        }


    }

}