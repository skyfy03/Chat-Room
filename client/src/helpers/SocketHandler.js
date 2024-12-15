import io from 'socket.io-client';

export default class SocketHandler {
    constructor(scene) {

        scene.socket = io('http://localhost:3000');

        scene.socket.on('connect', () => {
            //console.log('Connected!');

            //Tell/Show everyone a new player connected.
            scene.socket.emit('playerJoined', scene.socket.id);

            scene.Send.setInteractive();

        });

        scene.socket.on('sendMessage', (socketId, playerMessage) => {

            if (socketId === scene.socket.id) {
                scene.GameHandler.changeTextArea(playerMessage);
            }

        })

    }
}