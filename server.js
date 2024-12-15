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
        textArea: "",
        playerMessage: ""
    };


    socket.on('sendMessage', function (socketId, playerMessage) {

        players[socketId].playerMessage = playerMessage;

        for (let i = 0; i < Object.keys(players).length; i++) {
            let tempPlayer = Object.keys(players)[i];
            io.emit('sendMessage', tempPlayer, socketId + ": " + players[socketId].playerMessage);
        }

    });

    socket.on('playerJoined', function (socketId) {

        for (let i = 0; i < Object.keys(players).length; i++) {
            let tempPlayer = Object.keys(players)[i];
            io.emit('sendMessage', tempPlayer, socketId + " Player Joined Server");
        }

    })

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        delete players[socket.id];
    });
});

const port = process.env.PORT || 3000;

http.listen(port, function () {
    console.log('Server started!');
});