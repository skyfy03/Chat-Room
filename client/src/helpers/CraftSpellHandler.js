export default class CraftSpellHandler {

    constructor(scene) {

        this.craftSpellValid = (cards) => {


            this.cardValidObject = {
                cardValid: false,
                validCardName: ""
            }

            this.cardValidObject.cardValid = false;
            this.cardValidObject.validCardName = "";
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

                if (tempCard === "earthElement") {
                    earthElementMinReq = earthElementMinReq - 1;

                }
                if (tempCard=== "attackActionCard") {
                    attackActionCardMaxReq = attackActionCardMaxReq - 1;
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