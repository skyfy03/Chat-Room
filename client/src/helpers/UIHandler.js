import EnterTextHandler from './messaging/EnterTextHandler';
import TextAreaHandler from './messaging/TextAreaHandler';

export default class UIHandler {
    constructor(scene) {

        this.textArea = new TextAreaHandler(scene);

        this.playerEnterText = new EnterTextHandler(scene);


        this.buildTextAreaZone = () => {

            //Text Area
            scene.textArea = this.textArea.renderTextArea(scene.textAreaElement, 130, 50);

        }

        this.buildEnterTextZone = () => {

            //Player Enter Text
            scene.playerEnterText = this.playerEnterText.renderEnterText(scene.playerEnterTextElement, 130, 880);
            
        }

        this.buildGameText = () => {

            scene.WelcomeMessage = scene.add.text(25, 25, "Welcome to Chat Room").setFontSize(25).setFontFamily('Trebuchet MS');

            scene.Send = scene.add.text(700, 1000, "Send").setFontSize(25).setFontFamily('Trebuchet MS');

        }


        this.buildUI = () => {
            this.buildTextAreaZone();
            this.buildEnterTextZone();
            this.buildGameText();
        }

    }

}