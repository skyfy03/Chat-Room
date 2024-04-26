export default class InteractiveHandler {
    constructor(scene) {

        scene.cardPreview = null;

        scene.playerCraftSpellCardPreview = null;


        scene.dealCards.on('pointerdown', () => {
            scene.socket.emit("dealCards", scene.socket.id);
            scene.dealCards.disableInteractive();
        })

        scene.dealCards.on('pointerover', () => {
            scene.dealCards.setColor('#ff69b4');
        })

        scene.dealCards.on('pointerout', () => {
            scene.dealCards.setColor('#00ffff')
        })

        scene.input.on('pointerover', (event, gameObjects) => {
            let pointer = scene.input.activePointer;

            if (gameObjects[0].type === "Image" && gameObjects[0].data != null && gameObjects[0].data.list.name !== "cardBack") {
                scene.cardPreview = scene.add.image(pointer.worldX, pointer.worldY, gameObjects[0].data.values.sprite).setScale(0.5, 0.5);
            };
        });

        scene.input.on('pointerout', (event, gameObjects) => {
            if (gameObjects[0].type === "Image" && gameObjects[0].data != null && gameObjects[0].data.list.name !== "cardBack") {
                scene.cardPreview.setVisible(false);
            };
        });

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        scene.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xff69b4);
            scene.children.bringToTop(gameObject);
            scene.cardPreview.setVisible(false);
        })

        scene.input.on('dragend', (pointer, gameObject, dropped) => {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        scene.input.on('drop', (pointer, gameObject, dropZone) => {
            if (scene.GameHandler.isMyTurn && scene.GameHandler.gameState === "Ready") {

                //Card is currently in players hand
                //Plan on later to make player hand into a zone
                if (gameObject.data.values.dropZoneName == "playerHand") {

                    if (dropZone.name === "playerCraftZone") {

                        scene.socket.emit('removeCardPlayedInHand', scene.socket.id, gameObject.data.values.name);
                        scene.socket.emit('cardPlayedCraftZone', scene.socket.id, gameObject.data.values.name);
                        gameObject.destroy();

                    } else if (dropZone.name === "playerPlayZone") {

                        scene.socket.emit('removeCardPlayedInHand', scene.socket.id, gameObject.data.values.name);
                        scene.socket.emit('cardPlayedPlayZone', scene.socket.id, gameObject.data.values.name);
                        gameObject.destroy();

                    }

                } else {

                    //Card Changed DropZones
                    if (gameObject.data.values.dropZoneName !== dropZone.name) {

                        if (dropZone.name === "playerCraftZone") {

                            scene.socket.emit('removeCardPlayZone', scene.socket.id, gameObject.data.values.name);
                            scene.socket.emit('cardPlayedCraftZone', scene.socket.id, gameObject.data.values.name);
                            gameObject.destroy();

                        } else if (dropZone.name === "playerPlayZone") {

                            scene.socket.emit('removeCardCraftZone', scene.socket.id, gameObject.data.values.name);
                            scene.socket.emit('cardPlayedPlayZone', scene.socket.id, gameObject.data.values.name);
                            gameObject.destroy();

                        }

                    }
                }

            }
            else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        scene.endTurnButton.on('pointerdown', () => {
            scene.socket.emit("changeTurn", scene.socket.id);
            scene.endTurnButton.disableInteractive();
        })

        scene.endTurnButton.on('pointerover', () => {
            scene.endTurnButton.setColor('#99e550');
        })

        scene.endTurnButton.on('pointerout', () => {
            scene.endTurnButton.setColor('#36f802')
        })

        scene.craftText.on('pointerdown', () => {
            //scene.endTurnButton.disableInteractive();
        })

        scene.craftText.on('pointerover', () => {
            scene.craftText.setColor('#99e550');
        })

        scene.craftText.on('pointerout', () => {
            scene.craftText.setColor('#36f802')
        })

    }
}