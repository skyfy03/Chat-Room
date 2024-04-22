export default class GameHandler {

    constructor(scene) {

        this.gameState = "Initializing";
        this.isMyTurn = false;

        this.playerDeck = [];
        this.opponentDeck = [];

        this.playerHand = [];
        this.opponentHand = [];

        this.playerSpellCombinationArea = [];
        this.opponentSpellCombinationArea = [];

        this.playerHP = 0;
        this.opponentHP = 0;

        this.playerTextHP;
        this.opponentTextHP;


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
            scene.UIHandler.BuildHPText();
            //this.displayStats();
        };

    }

}