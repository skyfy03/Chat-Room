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

        scene.socket.on('removeCardPlayedCraftZone', (socketId, cardName, cardsInCraftSpellZone) => {

            if (socketId === scene.socket.id) {

                scene.GameHandler.playerCraftSpellZone.forEach(d => d.destroy());
                scene.GameHandler.playerCraftSpellZone = [];

                for (let i in cardsInCraftSpellZone) {
                    scene.GameHandler.playerCraftSpellZone.push(scene.DeckHandler.dealCard((scene.playerCraftZone.x - 350) + (i * 50), scene.playerCraftZone.y, cardsInCraftSpellZone[i], "playerCard", scene.playerCraftZone.name));
                }

                let craftTextBeforeDrop = scene.GameHandler.isCraftText;
                scene.GameHandler.changePlayerCraftSpellZone();
                if (craftTextBeforeDrop != scene.GameHandler.isCraftText) {
                    scene.socket.emit('craftTextValidator', scene.socket.id, scene.GameHandler.isCraftText, scene.GameHandler.craftSpellName);
                }

            }
            else if (socketId !== scene.socket.id) {

                scene.GameHandler.opponentCraftSpellZone.forEach(d => d.destroy());
                scene.GameHandler.opponentCraftSpellZone = [];

                for (let i in cardsInCraftSpellZone) {
                    scene.GameHandler.opponentCraftSpellZone.push(scene.DeckHandler.dealCard((scene.opponentCraftZone.x - 350) + (i * 50), scene.opponentCraftZone.y, cardsInCraftSpellZone[i], "opponentCard", scene.opponentCraftZone.name));
                }

            }

        })

        scene.socket.on('removeCardPlayedPlayZone', (socketId, cardsInPlayZone) => {

            if (socketId === scene.socket.id) {

                scene.GameHandler.playerPlayZone.forEach(d => d.destroy());
                scene.GameHandler.playerPlayZone = [];

                for (let i in cardsInPlayZone) {
                    scene.GameHandler.playerPlayZone.push(scene.DeckHandler.dealCard((scene.playerPlayZone.x - 350) + (i * 50), scene.playerPlayZone.y, cardsInPlayZone[i], "playerCard", scene.playerPlayZone.name));
                }

            }
            else if (socketId !== scene.socket.id) {

                scene.GameHandler.opponentPlayZone.forEach(d => d.destroy());
                scene.GameHandler.opponentPlayZone = [];

                for (let i in cardsInPlayZone) {
                    scene.GameHandler.opponentPlayZone.push(scene.DeckHandler.dealCard((scene.opponentPlayZone.x - 350) + (i * 50), scene.opponentPlayZone.y, cardsInPlayZone[i], "opponentCard", scene.opponentPlayZone.name));
                }
                
            }

        })

        scene.socket.on('dealCards', (socketId, cards) => {
            if (socketId === scene.socket.id) {
                for (let i in cards) {
                    let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 1000, cards[i], "playerCard", "playerHand"));
                }
            } else {
                for (let i in cards) {
                    let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 80, "cardBack", "opponentCard", "opponentHand"));
                }
            }
        })

        scene.socket.on('cardPlayedCraftZone', (socketId, cardsInCraftSpellZone) => {

            if (socketId === scene.socket.id) {

                scene.GameHandler.playerCraftSpellZone.forEach(d => d.destroy());
                scene.GameHandler.playerCraftSpellZone = [];

                for (let i in cardsInCraftSpellZone) {

                    scene.GameHandler.playerCraftSpellZone.push(scene.DeckHandler.dealCard((scene.playerCraftZone.x - 350) + (i * 50), scene.playerCraftZone.y, cardsInCraftSpellZone[i], "playerCard", scene.playerCraftZone.name));

                }


                let craftTextBeforeDrop = scene.GameHandler.isCraftText;
                scene.GameHandler.changePlayerCraftSpellZone();
                if (craftTextBeforeDrop != scene.GameHandler.isCraftText) {
                    scene.socket.emit('craftTextValidator', scene.socket.id, scene.GameHandler.isCraftText, scene.GameHandler.craftSpellName);
                }

            } else {

                scene.GameHandler.opponentCraftSpellZone.forEach(d => d.destroy());
                scene.GameHandler.opponentCraftSpellZone = [];

                for (let i in cardsInCraftSpellZone) {

                    scene.GameHandler.opponentCraftSpellZone.push(scene.DeckHandler.dealCard((scene.opponentCraftZone.x - 350) + (i * 50), scene.opponentCraftZone.y, cardsInCraftSpellZone[i], "opponentCard", scene.opponentCraftZone.name));

                }
            }


        })
        
        scene.socket.on('cardPlayedPlayZone', (socketId, cardsInPlayZone) => {

            if (socketId === scene.socket.id) {

                scene.GameHandler.playerPlayZone.forEach(d => d.destroy());
                scene.GameHandler.playerPlayZone = [];

                for (let i in cardsInPlayZone) {
                    scene.GameHandler.playerPlayZone.push(scene.DeckHandler.dealCard((scene.playerPlayZone.x - 350) + (i * 50), scene.playerPlayZone.y, cardsInPlayZone[i], "playerCard", scene.playerPlayZone.name));
                }

            } else {

                scene.GameHandler.opponentPlayZone.forEach(d => d.destroy());
                scene.GameHandler.opponentPlayZone = [];

                for (let i in cardsInPlayZone) {
                    scene.GameHandler.opponentPlayZone.push(scene.DeckHandler.dealCard((scene.opponentPlayZone.x - 350) + (i * 50), scene.opponentPlayZone.y, cardsInPlayZone[i], "opponentCard", scene.opponentPlayZone.name));
                }
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

    }
}