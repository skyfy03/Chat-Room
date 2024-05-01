export default class CraftSpellHandler {

    constructor(scene) {

        this.craftSpellValid = (cards) => {


            this.cardValidObject = {
                cardValid: false,
                validCardName: "",
                cardsNotUsed: []
            }

            this.cardValidObject.cardValid = false;
            this.cardValidObject.cardCrafted = {};
            this.cardValidObject.cardsNotUsed = {};
            this.cardValidObject = this.throwRock(this.cardValidObject, cards);

            if (this.cardValidObject.cardValid) {
                return this.cardValidObject;
            }

        };

        this.throwRock = (cardValidObj, cards) => {

            let earthElementMinReq = 1;
            let attackActionCardMaxReq = 1;

            for (let i = 0; i < cards.length; i++) {
                let tempCard  = cards[i];
                let tempCardData = tempCard.data.values.cardData[Object.keys(tempCard.data.values.cardData)[0]];
                if (tempCardData.sprite === "earthElement") {
                    earthElementMinReq = earthElementMinReq - 1;

                } else if (tempCardData.sprite === "attackActionCard" && attackActionCardMaxReq == 1) {
                    attackActionCardMaxReq = attackActionCardMaxReq - 1;
                } else {
                    cardValidObj.cardsNotUsed[tempCardData.name] = tempCardData;
                }
            }

            let cardDamage = 0;

            if (earthElementMinReq <= 0 && attackActionCardMaxReq <= 0) {
                cardValidObj.cardValid = true;
                cardDamage = 1;
            } else {
                cardValidObj.cardValid = false;
            }

            if (earthElementMinReq < 0) {
                cardDamage = cardDamage * ((-1 * earthElementMinReq) + 1)
            }

            if (cardValidObj.cardValid) {
                cardValidObj.cardCrafted["throwRock"] = {
                    name: "throwRock",
                    sprite: "throwRock",
                    cardDamage: cardDamage
                }
            } else {
                cardValidObj.cardCrafted = {};
            }

            return cardValidObj;
        }

    }

}