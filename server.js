const server = require('express')();
const http = require('http').createServer(server);
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static');
const shuffle = require('shuffle-array');
let gameState = "Initializing";
let players = {};
let readyCheck = 0;

const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

server.use(cors());
server.use(serveStatic(__dirname + "/client/dist"));

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players[socket.id] = {
        inDeck: {},
        inHand: {},
        inCraftSpellZone: {},
        inPlayZone: {},
        playerHP: 50,
        opponentHP: 50,
        isPlayerA: false
    };

    if (Object.keys(players).length < 2) {
        players[socket.id].isPlayerA = true;
        io.emit('firstTurn');
    }

    io.emit('setPlayersHP', socket.id, players[socket.id].playerHP, players[socket.id].opponentHP);

        //Gets specific object
        //console.log(players[socketId].inDeck['fireElement']);

        //
        //console.log(Object.keys(players[socketId].inDeck));

        //
        //Object.keys(players[socketId].inDeck).forEach(d => console.log(d));

        //
        //Object.keys(players[socketId].inDeck).forEach(d => console.log(players[socketId].inDeck[d]));

    socket.on('dealDeck', function (socketId) {

        let deckArr = shuffle(["attackActionCard", "earthElement", "fireElement", "waterElement", "windElement"]);

        for (let i = 0; i < deckArr.length; i++) {
            let cardSprite = deckArr[i];
            players[socketId].inDeck[cardSprite] = {
                name: cardSprite,
                sprite: cardSprite,
                cardDamage: 0
            };
        }

        console.log(players);

        if (Object.keys(players).length < 2) return;

        io.emit('changeGameState', "Initializing");
    })

    socket.on('dealCards', function (socketId) {

        //OLD Logic to refill dealCards if out of cards
        //for (let i = 0; i < 5; i++) {
        //    if (players[socketId].inDeck.length === 0) {
        //        players[socketId].inDeck = shuffle(["attackActionCard", "earthElement", "fireElement", "waterElement", "windElement"]);
        //    }
        //    players[socketId].inHand.push(players[socketId].inDeck.shift());
        //}

        //Adding all cards from inDeck into inHand

        Object.keys(players[socketId].inDeck).forEach(
            d =>
                players[socketId].inHand[players[socketId].inDeck[d].name] =
                {
                    name: players[socketId].inDeck[d].name,
                    sprite: players[socketId].inDeck[d].sprite,
                    cardDamage: players[socketId].inDeck[d].cardDamage
                }
        );

        //Remove all cards from inDeck
        players[socketId].inDeck = {};

        console.log(players);

        io.emit('dealCards', socketId, players[socketId].inHand);
        readyCheck++;
        if (readyCheck >= 2) {
            gameState = "Ready";
            io.emit('changeGameState', "Ready");
        }
    });

    socket.on('removeCardPlayedInHand', function (socketId, cardName) {

        //Currently assumed to be in player hand. which is null on the card gameObject
        //Remove Card from hand.
        delete players[socketId].inHand[cardName];

        io.emit('removeCardPlayedInHand', socketId);

    })

    socket.on('removeCardPlayZone', function (socketId, cardName) {

        //Currently assumed to be in player hand. which is null on the card gameObject
        //Remove Card from hand.
        delete players[socketId].inPlayZone[cardName];

        io.emit('removeCardPlayedPlayZone', socketId, players[socketId].inPlayZone);

    })

    socket.on('removeCardCraftZone', function (socketId, cardName) {

        //Currently assumed to be in player hand. which is null on the card gameObject
        //Remove Card from hand.
        delete players[socketId].inCraftSpellZone[cardName];

        io.emit('removeCardPlayedCraftZone', socketId, players[socketId].inCraftSpellZone);

    })

    socket.on('cardPlayedPlayerArea', function (socketId, cardName) {

        players[socketId].inHand[cardName] = {
            name: cardName,
            sprite: cardName,
            cardDamage: 0
        };

        console.log(players);

        io.emit('cardPlayedPlayerArea', socketId, players[socketId].inHand);
    });

    socket.on('cardPlayedCraftZone', function (socketId, cardName) {

        players[socketId].inCraftSpellZone[cardName] = {
            name: cardName,
            sprite: cardName,
            cardDamage: 0
        };

        console.log(players);

        io.emit('cardPlayedCraftZone', socketId, players[socketId].inCraftSpellZone);
    });

    socket.on('cardPlayedPlayZone', function (socketId, cardName) {

        players[socketId].inPlayZone[cardName] = {
            name: cardName,
            sprite: cardName,
            cardDamage: 0
        };

        console.log(players);

        io.emit('cardPlayedPlayZone', socketId, players[socketId].inPlayZone);
    });

    socket.on('changeTurn', function (socketId) {
        io.emit('changeTurn');
    });
    
    socket.on('setUpPlayerAreas', function (socketId) {

        let opponentSocketId;
        for (let i = 0; i < Object.keys(players).length; i++) {
            let tempPlayer = Object.keys(players)[i];
            if (socketId !== tempPlayer) {
                opponentSocketId = tempPlayer;
                break;
            }
        }

        io.emit('setPlayerAreas', socket.id, opponentSocketId);
    });

    socket.on('craftTextValidator', function (socketId, isCraftText, craftSpellName) {
        io.emit('craftTextValidator', socketId, isCraftText, craftSpellName);
    });

    socket.on('removeAllCraftSpell', function (socketId) {

        players[socketId].inCraftSpellZone = {};

        console.log(players);

        io.emit('removeAllCraftSpell', socketId);
    });

    socket.on('craftSpell', function (socketId, cardCraftSpellName, cardsNotUsed) {

        players[socketId].inHand[cardCraftSpellName] = {
            name: cardCraftSpellName,
            sprite: cardCraftSpellName,
            cardDamage: 0
        };

        console.log(cardsNotUsed);

        Object.keys(cardsNotUsed).forEach(
            tempCardKey =>
                players[socketId].inCraftSpellZone[cardsNotUsed[tempCardKey].name] =
                {
                    name: cardsNotUsed[tempCardKey].name,
                    sprite: cardsNotUsed[tempCardKey].sprite,
                    cardDamage: cardsNotUsed[tempCardKey].cardDamage
                }
        );

        console.log(players);

        io.emit('cardPlayedCraftZone', socketId, players[socketId].inCraftSpellZone);
        io.emit('cardPlayedPlayerArea', socketId, players[socketId].inHand);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        delete players[socket.id];
    });
});

const port = process.env.PORT || 3000;

http.listen(port, function () {
    console.log('Server started!');
});