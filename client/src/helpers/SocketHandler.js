import io from 'socket.io-client';

export default class SocketHandler {
    constructor(scene) {

        scene.socket = io('http://localhost:3000');

        scene.socket.on('connect', () => {
            console.log('Connected!');
            scene.socket.emit('dealDeck', scene.socket.id);
        });

        scene.socket.on('firstTurn', () => {
            scene.GameHandler.changeTurn();

            if (scene.GameHandler.isMyTurn) {
                scene.endTurnButton.setInteractive();
                scene.endTurnButton.setColor('#36f802');
            }
        })

        scene.socket.on('changeGameState', (gameState) => {
            scene.GameHandler.changeGameState(gameState);
            if (gameState === "Initializing") {
                scene.DeckHandler.dealCard(1000, 1000, "cardBack", "playerCard");
                scene.DeckHandler.dealCard(1000, 80, "cardBack", "opponentCard");
                scene.dealCards.setInteractive();
                scene.dealCards.setColor('#00ffff');
            } else if (gameState === "Ready") {
                scene.socket.emit('setUpPlayerAreas', scene.socket.id);
            }
        });

        scene.socket.on('changeTurn', () => {
            scene.GameHandler.changeTurn();

            if (scene.GameHandler.isMyTurn) {
                scene.endTurnButton.setInteractive();
                scene.endTurnButton.setColor('#36f802');
            } else {
                scene.endTurnButton.setColor('#d70808');
            }

        })

        scene.socket.on('removeCardPlayedInHand', (socketId) => {

            if (socketId !== scene.socket.id) {
                scene.GameHandler.opponentHand.shift().destroy();
            }

        })

        scene.socket.on('removeCardPlayedCraftZone', (socketId, cardsInCraftSpellZone) => {

            if (socketId === scene.socket.id) {

                scene.GameHandler.playerCraftSpellZone = this.removeAllCardsInZone(scene.GameHandler.playerCraftSpellZone);

                scene.GameHandler.playerCraftSpellZone = this.addAllCardsInZone(cardsInCraftSpellZone, scene.GameHandler.playerCraftSpellZone, scene.playerCraftZone, "playerCard");

                let craftTextBeforeDrop = scene.GameHandler.isCraftText;
                scene.GameHandler.changePlayerCraftSpellZone();
                if (craftTextBeforeDrop != scene.GameHandler.isCraftText) {
                    scene.socket.emit('craftTextValidator', scene.socket.id, scene.GameHandler.isCraftText, scene.GameHandler.craftSpellName);
                }

            }
            else if (socketId !== scene.socket.id) {

                scene.GameHandler.opponentCraftSpellZone = this.removeAllCardsInZone(scene.GameHandler.opponentCraftSpellZone);

                scene.GameHandler.opponentCraftSpellZone = this.addAllCardsInZone(cardsInCraftSpellZone, scene.GameHandler.opponentCraftSpellZone, scene.opponentCraftZone, "opponentCard");

            }

        })

        scene.socket.on('removeCardPlayedPlayZone', (socketId, cardsInPlayZone) => {

            if (socketId === scene.socket.id) {

                scene.GameHandler.playerPlayZone = this.removeAllCardsInZone(scene.GameHandler.playerPlayZone);

                scene.GameHandler.playerPlayZone = this.addAllCardsInZone(cardsInPlayZone, scene.GameHandler.playerPlayZone, scene.playerPlayZone, "playerCard");

            }
            else if (socketId !== scene.socket.id) {

                scene.GameHandler.opponentPlayZone = this.removeAllCardsInZone(scene.GameHandler.opponentPlayZone);

                scene.GameHandler.opponentPlayZone = this.addAllCardsInZone(cardsInPlayZone, scene.GameHandler.opponentPlayZone, scene.opponentPlayZone, "opponentCard");
                
            }

        })

        scene.socket.on('dealCards', (socketId, cards) => {

            if (socketId === scene.socket.id) {

                scene.GameHandler.playerHand = this.addAllCardsInZone(cards, scene.GameHandler.playerHand, scene.playerHandArea, "playerCard");

            } else {

                scene.GameHandler.opponentHand = this.addAllCardsInZone(cards, scene.GameHandler.opponentHand, scene.opponentHandArea, "opponentCard");

            }
        })

        scene.socket.on('cardPlayedPlayerArea', (socketId, cardsInHand) => {

            if (socketId === scene.socket.id) {

                scene.GameHandler.playerHand = this.removeAllCardsInZone(scene.GameHandler.playerHand);

                scene.GameHandler.playerHand = this.addAllCardsInZone(cardsInHand, scene.GameHandler.playerHand, scene.playerHandArea, "playerCard");

            } else {

                scene.GameHandler.opponentHand = this.removeAllCardsInZone(scene.GameHandler.opponentHand);

                scene.GameHandler.opponentHand = this.addAllCardsInZone(cardsInHand, scene.GameHandler.opponentHand, scene.opponentHandArea, "opponentCard");

            }

        })

        scene.socket.on('cardPlayedCraftZone', (socketId, cardsInCraftSpellZone) => {

            if (socketId === scene.socket.id) {

                scene.GameHandler.playerCraftSpellZone = this.removeAllCardsInZone(scene.GameHandler.playerCraftSpellZone);

                scene.GameHandler.playerCraftSpellZone = this.addAllCardsInZone(cardsInCraftSpellZone, scene.GameHandler.playerCraftSpellZone, scene.playerCraftZone, "playerCard");


                let craftTextBeforeDrop = scene.GameHandler.isCraftText;
                scene.GameHandler.changePlayerCraftSpellZone();
                if (craftTextBeforeDrop != scene.GameHandler.isCraftText) {
                    scene.socket.emit('craftTextValidator', scene.socket.id, scene.GameHandler.isCraftText, scene.GameHandler.craftSpellName);
                }

            }  else {

                scene.GameHandler.opponentCraftSpellZone = this.removeAllCardsInZone(scene.GameHandler.opponentCraftSpellZone);

                scene.GameHandler.opponentCraftSpellZone = this.addAllCardsInZone(cardsInCraftSpellZone, scene.GameHandler.opponentCraftSpellZone, scene.opponentCraftZone, "opponentCard");

            }


        })

        scene.socket.on('cardPlayedPlayZone', (socketId, cardsInPlayZone) => {

            if (socketId === scene.socket.id) {

                scene.GameHandler.playerPlayZone = this.removeAllCardsInZone(scene.GameHandler.playerPlayZone);

                scene.GameHandler.playerPlayZone = this.addAllCardsInZone(cardsInPlayZone, scene.GameHandler.playerPlayZone, scene.playerPlayZone, "playerCard");

            } else {

                scene.GameHandler.opponentPlayZone = this.removeAllCardsInZone(scene.GameHandler.opponentPlayZone);

                scene.GameHandler.opponentPlayZone = this.addAllCardsInZone(cardsInPlayZone, scene.GameHandler.opponentPlayZone, scene.opponentPlayZone, "opponentCard");

            }

        })

        scene.socket.on('setPlayersHP', (socketId, playerHP, opponentHP) => {
            if (socketId === scene.socket.id) {
                scene.GameHandler.changeHP(playerHP, opponentHP);
            }
        })

        scene.socket.on('setPlayerAreas', (socketId, opponentSocketId) => {
            if (socketId === scene.socket.id) {
                scene.playerCraftZone.socketId = socketId;
                scene.opponentCraftZone.socketId = opponentSocketId;

                //PlayZone
            }
        })

        scene.socket.on('craftTextValidator', (socketId, isCraftText, craftSpellName) => {

            if (socketId === scene.socket.id) {

                if (isCraftText) {

                    scene.craftText.setInteractive();
                    scene.craftText.setColor('#36f802');

                    scene.playerCraftSpellCardPreview = scene.add.image(1100, 825, scene.GameHandler.craftSpellName);

                } else {

                    scene.craftText.disableInteractive();
                    scene.craftText.setColor('#d70808');
                    scene.playerCraftSpellCardPreview.destroy();

                }

            } else if (socketId !== scene.socket.id) {

                if (isCraftText) {
                    scene.opponentCraftSpellCardPreview = scene.add.image(1100, 255, "cardBack");
                } else {
                    scene.opponentCraftSpellCardPreview.destroy();
                }

            }

        })

        scene.socket.on('removeAllCraftSpell', (socketId) => {

            if (socketId === scene.socket.id) {

                scene.GameHandler.playerCraftSpellZone = this.removeAllCardsInZone(scene.GameHandler.playerCraftSpellZone);

                scene.GameHandler.changePlayerCraftSpellZone();
                scene.socket.emit('craftTextValidator', scene.socket.id, scene.GameHandler.isCraftText, scene.GameHandler.craftSpellName);


            } else {
                
                scene.GameHandler.opponentCraftSpellZone = this.removeAllCardsInZone(scene.GameHandler.opponentCraftSpellZone);

            }


        })


        this.removeAllCardsInZone = (tempZone) => {

            tempZone.forEach(d => d.destroy());
            tempZone = [];

            return tempZone;

        };

        this.addAllCardsInZone = (tempCardsInZone, tempZone, tempUIZone, type) => {

            if (tempUIZone.name === "opponentHandArea") {
                Object.keys(tempCardsInZone).forEach(
                    tempCardKey =>
                        tempZone.push(scene.DeckHandler.dealCard((tempUIZone.x - 350) + (Object.keys(tempCardsInZone).indexOf(tempCardKey) * 50), tempUIZone.y, "cardBack", type, tempUIZone.name))
                );
            } else {
                Object.keys(tempCardsInZone).forEach(
                    tempCardKey =>
                        tempZone.push(scene.DeckHandler.dealCard((tempUIZone.x - 350) + (Object.keys(tempCardsInZone).indexOf(tempCardKey) * 50), tempUIZone.y, tempCardsInZone[tempCardKey].name, type, tempUIZone.name))
                );
            }

            return tempZone;

        }

    }
}