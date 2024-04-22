import CardBack from './cards/CardBack';
import AttackActionCard from './cards/AttackActionCard';
import EarthElement from './cards/EarthElement';
import FireElement from './cards/FireElement';
import WaterElement from './cards/WaterElement';
import WindElement from './cards/WindElement';

export default class DeckHandler {
    constructor(scene) {
        this.dealCard = (x, y, name, type) => {
            let cards = {
                cardBack: new CardBack(scene),
                
                attackActionCard: new AttackActionCard(scene),

                earthElement: new EarthElement(scene),
                fireElement: new FireElement(scene),
                waterElement: new WaterElement(scene),
                windElement: new WindElement(scene)
            }
            let newCard = cards[name];
            return(newCard.render(x, y, type));
        }
    }
}