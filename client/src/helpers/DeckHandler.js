import CardBack from './cards/CardBack';

import AttackActionCard from './cards/AttackActionCard';

import EarthElement from './cards/EarthElement';
import FireElement from './cards/FireElement';
import WaterElement from './cards/WaterElement';
import WindElement from './cards/WindElement';

import FireBlast from './cards/FireBlast';
import PowerfulGust from './cards/PowerfulGust';
import ThrowRock from './cards/ThrowRock';
import ViolentWave from './cards/ViolentWave';


export default class DeckHandler {
    constructor(scene) {
        this.dealCard = (x, y, name, type, dropZoneName, cardDamage) => {
            let cards = {
                cardBack: new CardBack(scene),
                
                attackActionCard: new AttackActionCard(scene),

                earthElement: new EarthElement(scene),
                fireElement: new FireElement(scene),
                waterElement: new WaterElement(scene),
                windElement: new WindElement(scene),

                fireBlast: new FireBlast(scene),
                powerfulGust: new PowerfulGust(scene),
                throwRock: new ThrowRock(scene),
                violentWave: new ViolentWave(scene)
            }
            let newCard = cards[name];

            let card = newCard.render(x, y, type, dropZoneName);

            if (newCard.attackCard != null && newCard.attackCard) {

                let tempCardData = card.data.values.cardData[Object.keys(card.data.values.cardData)[0]];
                card.data.values.cardData[Object.keys(card.data.values.cardData)[0]] = newCard.setDamage(cardDamage, tempCardData);

                card.attackDamageText = newCard.renderAttackDamage(x, y);
            }

            return(card);
        }
    }
}