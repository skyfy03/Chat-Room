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

    socket.on('cardPlayed', function (cardName, socketId) {
        io.emit('cardPlayed', cardName, socketId);
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

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        delete players[socket.id];
    });
});

const port = process.env.PORT || 3000;

http.listen(port, function () {
    console.log('Server started!');
});