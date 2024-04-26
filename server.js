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
        inDeck: [],
        inHand: [],
        inCraftSpellZone: [],
        inPlayZone: [],
        playerHP: 50,
        opponentHP: 50,
        isPlayerA: false
    };

    if (Object.keys(players).length < 2) {
        players[socket.id].isPlayerA = true;
        io.emit('firstTurn');
    }

    io.emit('setPlayersHP', socket.id, players[socket.id].playerHP, players[socket.id].opponentHP);

    socket.on('dealDeck', function (socketId) {
        players[socketId].inDeck = shuffle(["attackActionCard", "earthElement", "fireElement", "waterElement", "windElement"]);
        console.log(players);
        if (Object.keys(players).length < 2) return;

        io.emit('changeGameState', "Initializing");
    })

    socket.on('dealCards', function (socketId) {
        for (let i = 0; i < 5; i++) {
            if (players[socketId].inDeck.length === 0) {
                players[socketId].inDeck = shuffle(["attackActionCard", "earthElement", "fireElement", "waterElement", "windElement"]);
            }
            players[socketId].inHand.push(players[socketId].inDeck.shift());
        }
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
        let indexOfCardName = players[socketId].inHand.indexOf(cardName);
        players[socketId].inHand.splice(indexOfCardName, 1);

        io.emit('removeCardPlayedInHand', socketId);

    })

    socket.on('removeCardPlayZone', function (socketId, cardName) {

        //Currently assumed to be in player hand. which is null on the card gameObject
        //Remove Card from hand.
        let indexOfCardName = players[socketId].inPlayZone.indexOf(cardName);
        players[socketId].inPlayZone.splice(indexOfCardName, 1);

        io.emit('removeCardPlayedPlayZone', socketId, players[socketId].inPlayZone);

    })

    socket.on('removeCardCraftZone', function (socketId, cardName) {

        //Currently assumed to be in player hand. which is null on the card gameObject
        //Remove Card from hand.
        let indexOfCardName = players[socketId].inCraftSpellZone.indexOf(cardName);
        players[socketId].inCraftSpellZone.splice(indexOfCardName, 1);

        io.emit('removeCardPlayedCraftZone', socketId, cardName, players[socketId].inCraftSpellZone);

    })

    socket.on('cardPlayedPlayerArea', function (socketId, cardName) {

        players[socketId].inHand.push(cardName);

        console.log(players);

        io.emit('cardPlayedPlayerArea', socketId, players[socketId].inHand);
    });

    socket.on('cardPlayedCraftZone', function (socketId, cardName) {

        players[socketId].inCraftSpellZone.push(cardName);

        console.log(players);

        io.emit('cardPlayedCraftZone', socketId, players[socketId].inCraftSpellZone);
    });

    socket.on('cardPlayedPlayZone', function (socketId, cardName) {

        players[socketId].inPlayZone.push(cardName);

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

        players[socketId].inCraftSpellZone = [];

        console.log(players);

        io.emit('removeAllCraftSpell', socketId);
    });

    socket.on('craftSpell', function (socketId, cardCraftSpellName, cardsNotUsed) {

        players[socketId].inHand.push(cardCraftSpellName);

        cardsNotUsed.forEach(sprite => players[socketId].inCraftSpellZone.push(sprite));

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