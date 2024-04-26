export default class CraftSpellHandler {

    constructor(scene) {

        this.craftSpellValid = (cards) => {


            this.cardValidObject = {
                cardValid: false,
                validCardName: "",
                cardsNotUsed: []
            }

            this.cardValidObject.cardValid = false;
            this.cardValidObject.validCardName = "";
            this.cardValidObject.cardsNotUsed = [];
            this.cardValidObject = this.throwRock(this.cardValidObject, cards);

            if (this.cardValidObject.cardValid) {
                return this.cardValidObject;
            }

        };

        this.throwRock = (cardValidObj, cards) => {

            let earthElementMinReq = 1;
            let attackActionCardMaxReq = 1;

            for (let i = 0; i < cards.length; i++) {
                let tempCard = cards[i];

                if (tempCard.data.values.sprite === "earthElement") {
                    earthElementMinReq = earthElementMinReq - 1;

                } else if (tempCard.data.values.sprite === "attackActionCard") {
                    attackActionCardMaxReq = attackActionCardMaxReq - 1;
                } else {
                    cardValidObj.cardsNotUsed.push(tempCard.data.values.sprite);
                }
            }

            if (earthElementMinReq <= 0 && attackActionCardMaxReq <= 0) {
                cardValidObj.cardValid = true;
            } else {
                cardValidObj.cardValid = false;
            }

            if (cardValidObj.cardValid) {
                cardValidObj.validCardName = "throwRock";
            }

            return cardValidObj;
        }

    }

}