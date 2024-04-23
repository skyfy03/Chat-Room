export default class InteractiveHandler {
    constructor(scene) {

        scene.cardPreview = null;
        scene.craftSpellCardPreview = null;

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
            if (gameObjects[0].type === "Image" && gameObjects[0].data.list.name !== "cardBack") {
                scene.cardPreview = scene.add.image(pointer.worldX, pointer.worldY, gameObjects[0].data.values.sprite).setScale(0.5, 0.5);
            };
        });

        scene.input.on('pointerout', (event, gameObjects) => {
            if (gameObjects[0].type === "Image" && gameObjects[0].data.list.name !== "cardBack") {
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

                //console.log(gameObject.data.values.currentDropZone);

                let craftTextBeforeDrop = scene.GameHandler.isCraftText;

                //Remove card from previous dropZone.data.values.cards - 1;
                //Remove card from playerCraftSpellZone if previous DropZone was playerCraftSpellZone
                //Update opponent client game
                if (gameObject.data.values.currentDropZone != null) {
                    for (let i = 0; i < scene.dropZones.length; i++) {

                        let tempDropZone = scene.dropZones[i];

                        if (gameObject.data.values.currentDropZone === "playerPlayZone") {

                            

                            console.log("Found");
                        } else if (gameObject.data.values.currentDropZone === tempDropZone.name) {

                            let indexOfCardName = scene.GameHandler.playerCraftSpellZone.indexOf(gameObject.data.values.name);
                            scene.GameHandler.playerCraftSpellZone.splice(indexOfCardName, 1);
                            //Assuming CardName and cardGameObject are in the same index.
                            tempDropZone.data.values.cardGameObjects.splice(indexOfCardName, 1);


                            tempDropZone.data.values.cards--;
                            gameObject.data.values.currentDropZone = null;

                            if (tempDropZone.data.values.cards > 0) {
                                //Update client cards

                                for (let x = 0; x < tempDropZone.data.values.cardGameObjects.length; x++) {
                                    let tempGameObj = tempDropZone.data.values.cardGameObjects[x];

                                    tempGameObj.x = (tempDropZone.x - 350) + (x * 50);
                                    tempGameObj.y = tempDropZone.y;
                                    
                                }

                            }

                            console.log("Found");
                        }
                    }
                }



                for (let i = 0; i < scene.dropZones.length; i++) {
                    let tempDropZone = scene.dropZones[i];
                    if (tempDropZone.name === dropZone.name) {

                        gameObject.x = (tempDropZone.x - 350) + (tempDropZone.data.values.cards * 50);
                        gameObject.y = tempDropZone.y;

                        scene.GameHandler.playerCraftSpellZone.push(gameObject.data.values.name);
                        tempDropZone.data.values.cards++;
                        tempDropZone.data.values.cardGameObjects.push(gameObject);

                        gameObject.data.values.currentDropZone = tempDropZone.name;

                        //Set card undraggable
                        //scene.input.setDraggable(gameObject, false);
                        scene.socket.emit('cardPlayed', gameObject.data.values.name, tempDropZone.name);

                        scene.GameHandler.changePlayerCraftSpellZone();
                        if (craftTextBeforeDrop != scene.GameHandler.isCraftText) {
                            scene.socket.emit('craftTextValidator', scene.socket.id, scene.GameHandler.isCraftText, scene.GameHandler.craftSpellName);
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
            scene.endTurnButton.setColor('#87f802');
        })

        scene.endTurnButton.on('pointerout', () => {
            scene.endTurnButton.setColor('#36f802')
        })

        scene.craftText.on('pointerdown', () => {
            //scene.socket.emit("changeTurn", scene.socket.id);
            scene.endTurnButton.disableInteractive();
        })

        scene.craftText.on('pointerover', () => {
            scene.endTurnButton.setColor('#87f802');
        })

        scene.craftText.on('pointerout', () => {
            scene.endTurnButton.setColor('#36f802')
        })

    }
}