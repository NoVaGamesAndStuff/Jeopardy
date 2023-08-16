const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;
const hostname = 'localhost';
app.use(express.static('public'));
app.use(express.json());

var serverData = {
    rooms: []
}

app.get('/room/:roomkey', (req, res) => {
    const roomKey = req.params.roomkey;
    const room = serverData.rooms.find(room => room.key === roomKey);

    if (room) {
        fs.readFile(__dirname + '/public/room.html', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading room.html:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(data);
            }
        });
    } else {
        res.send('Room not found');
    }
});

io.on('connection', (socket) => {
    socket.on('getRoom', (roomKey) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        socket.join(roomKey);

        if (room.host.id === null) {
            room.host.id = socket.id;
        }

        let isHost = false;
        if (room.host.id === socket.id) {
            console.log('The host connected.');
            isHost = true;
        } else {
            console.log('A player connected.');
        }

        io.to(roomKey).emit('getRoomInfo', { room, isHost });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.post('/joinRoom', (req, res) => {
    const { displayName, roomKey } = req.body;
    let room = serverData.rooms.find(room => room.key === roomKey);

    if (room) {
        room.players.push({ name: displayName, score: 0, id: null });
        res.status(200).json({ room });
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
});

app.post('/createRoom', (req, res) => {
    let roomKey = generateRandomKey(4);
    
    let newRoom = {
        key: roomKey,
        host: {
            name: req.body.displayName,
            score: 0,
            id: null
        },
        players: []
    };

    serverData.rooms.push(newRoom);

    res.status(200).json({ newRoom });
});

function generateRandomKey(length) {
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

server.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
});