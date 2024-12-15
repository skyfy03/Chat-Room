export default class SendHandler {
    constructor() {
        this.Send = (playerEnterTextElement) => {

            var isPlayerMessageEmpty = this.getPlayerMessageEmpty(playerEnterTextElement);

            let send = {
                playerMessage: playerEnterTextElement.value,
                playerMessageEmpty: isPlayerMessageEmpty
            };

            return send;
        }
    }

    getPlayerMessageEmpty(playerEnterTextElement) {

        var isEmpty = true;

        if (playerEnterTextElement.value.length > 0) {
            isEmpty = false;
        }

        return isEmpty;
    }

}