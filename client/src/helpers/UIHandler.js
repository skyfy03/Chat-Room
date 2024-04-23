import ZoneHandler from './ZoneHandler';

export default class UIHandler {
    constructor(scene) {

        this.playerCraftZoneHandler = new ZoneHandler(scene);
        this.opponentCraftZoneHandler = new ZoneHandler(scene);

        this.buildZones = () => {
            scene.dropZones = [];

            scene.playerCraftZone = this.playerCraftZoneHandler.renderZone(470, 825);
            scene.playerCraftZone.name = "playerCraftZone";
            this.playerCraftZoneHandler.renderOutline(scene.playerCraftZone);

            scene.opponentCraftZone = this.opponentCraftZoneHandler.renderZone(470, 255);
            scene.opponentCraftZone.name = "opponentCraftZone";
            scene.opponentCraftZone.disableInteractive();
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

        this.buildCraftText = () => {
            scene.craftText = scene.add.text(950, 810, "Craft Spell").setFontSize(18).setFontFamily('Trebuchet MS');
            scene.craftText.setColor('#d70808');

            scene.playerCraftSpellPreview = scene.add.rectangle(1100, 825, 80, 125);
            scene.playerCraftSpellPreview.setStrokeStyle(3, 0xc5a5f3);

            scene.opponentCraftSpellPreview = scene.add.rectangle(1100, 255, 80, 125);
            scene.opponentCraftSpellPreview.setStrokeStyle(3, 0xc5a5f3);

        }

        this.buildUI = () => {
            this.buildZones();
            this.buildPlayerAreas();
            this.buildGameText();
            this.buildHPText();
            this.buildEndTurnText();
            this.buildCraftText();
        }

    }
}