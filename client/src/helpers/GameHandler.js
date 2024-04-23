export default class GameHandler {

    constructor(scene) {

        this.gameState = "Initializing";
        this.isMyTurn = false;

        this.playerDeck = [];
        this.opponentDeck = [];

        this.playerHand = [];
        this.opponentHand = [];

        this.playerHP = 0;
        this.opponentHP = 0;

        this.playerTextHP;
        this.opponentTextHP;

        this.isCraftText = false;
        this.craftSpellName = "";

        this.playerCraftSpellZone = [];
        this.opponentCraftSpellZone = [];

        this.changeTurn = () => {
            this.isMyTurn = !this.isMyTurn;
            console.log("isMyTurn: " + this.isMyTurn);
        }


        this.changeGameState = (gameState) => {
            this.gameState = gameState;
            console.log("GameState: " + this.gameState);
        }

        this.changeHP = (playerHP, opponentHP) => {
            this.playerHP += playerHP;
            this.opponentHP += opponentHP;
            scene.UIHandler.buildHPText();
        };

        this.changePlayerCraftSpellZone = () => {

            this.craftSpellName = "";
            this.isCraftText = false;
            scene.CraftSpellHandler.craftSpellValid(this.playerCraftSpellZone);

            if (scene.CraftSpellHandler.cardValidObject.cardValid) {
                this.isCraftText = true;
                this.craftSpellName = scene.CraftSpellHandler.cardValidObject.validCardName;
            }

        }

        this.changeOpponentCraftSpellZone = () => {

        }

        this.changeCraftSpellText = () => {

            if (this.isCraftText == false) {
                scene.craftText.disableInteractive();
                scene.craftText.setColor('#d70808');
            }
        };



    }

}