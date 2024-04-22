import ZoneHandler from './ZoneHandler';

export default class UIHandler {
    constructor(scene) {

        this.zoneHandler = new ZoneHandler(scene);

        this.playerCraftZoneHandler = new ZoneHandler(scene);
        this.opponentCraftZoneHandler = new ZoneHandler(scene);

        this.buildZones = () => {
            scene.dropZones = [];

            scene.playerCraftZone = this.playerCraftZoneHandler.renderZone(470, 700);
            scene.playerCraftZone.name = "playerCraftZone";
            this.playerCraftZoneHandler.renderOutline(scene.playerCraftZone);

            scene.opponentCraftZone = this.opponentCraftZoneHandler.renderZone(470, 375);
            scene.opponentCraftZone.name = "opponentCraftZone";
            this.opponentCraftZoneHandler.renderOutline(scene.opponentCraftZone);

            scene.dropZones.push(scene.playerCraftZone);
            scene.dropZones.push(scene.opponentCraftZone);

        }

        this.buildPlayerAreas = () => {

            let handAreaWidth = 850;
            let handAreaHeight = 125;

            let deckAreaWidth = 80;
            let deckAreaHeight = 125;

            scene.playerHandArea = scene.add.rectangle(470, 1000, handAreaWidth, handAreaHeight);
            scene.playerHandArea.setStrokeStyle(4, 0x17a057);
            scene.playerDeckArea = scene.add.rectangle(1000, 1000, deckAreaWidth, deckAreaHeight);
            scene.playerDeckArea.setStrokeStyle(3, 0x17a057);
            
            scene.opponentHandArea = scene.add.rectangle(470, 80, handAreaWidth, handAreaHeight);
            scene.opponentHandArea.setStrokeStyle(4, 0xea4444);
            scene.opponentDeckArea = scene.add.rectangle(1000, 80, deckAreaWidth, deckAreaHeight);
            scene.opponentDeckArea.setStrokeStyle(3, 0xea4444);
            
        }

        this.buildSpellCombinationAreas = () => {

            let spellAreaWidth = 850;
            let spellAreaHeight = 125;

            //let deckAreaWidth = 80;
            //let deckAreaHeight = 125;

            scene.playerSpellCombinationArea = scene.add.rectangle(470, 850, spellAreaWidth, spellAreaHeight);
            scene.playerSpellCombinationArea.setStrokeStyle(4, 0x17a057);

            //scene.playerDeckArea = scene.add.rectangle(1000, 950, deckAreaWidth, deckAreaHeight);
            //scene.playerDeckArea.setStrokeStyle(3, 0x00ffff);

            scene.opponentSpellCombinationArea = scene.add.rectangle(470, 225, spellAreaWidth, spellAreaHeight);
            scene.opponentSpellCombinationArea.setStrokeStyle(4, 0xea4444);

            //scene.opponentDeckArea = scene.add.rectangle(1000, 110, deckAreaWidth, deckAreaHeight);
            //scene.opponentDeckArea.setStrokeStyle(3, 0x00ffff);

        }

        this.buildGameText = () => {
            scene.dealCards = scene.add.text(960, 445, "Deal Cards").setFontSize(14).setFontFamily('Trebuchet MS');
        }

        this.buildHPText = () => {

            if (scene.opponentTextHP != null) {
                scene.opponentTextHP.destroy();
            }
            if (scene.playerTextHP != null) {
                scene.playerTextHP.destroy();
            }

            scene.opponentTextHP = scene.add.text(1275, 480, scene.GameHandler.opponentHP).setFontSize(28).setFontFamily('Trebuchet MS');
            scene.add.text(1250, 500, "Enemy HP").setFontSize(28).setFontFamily('Trebuchet MS');


            scene.playerTextHP = scene.add.text(1275, 560, scene.GameHandler.playerHP).setFontSize(28).setFontFamily('Trebuchet MS');
            scene.add.text(1250, 580, "Player HP").setFontSize(28).setFontFamily('Trebuchet MS');
        }

        this.buildEndTurnText = () => {
            scene.endTurnButton = scene.add.text(1800, 1000, "End Turn").setFontSize(18).setFontFamily('Trebuchet MS');
            scene.endTurnButton.setColor('#d70808');
        }

        this.buildUI = () => {
            this.buildZones();
            this.buildPlayerAreas();
            this.buildSpellCombinationAreas();
            this.buildGameText();
            this.buildHPText();
            this.buildEndTurnText();
        }

    }
}