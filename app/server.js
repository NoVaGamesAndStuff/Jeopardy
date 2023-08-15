const express = require('express');
// const cookieParser = require('cookie-parser');
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
// app.use(cookieParser());

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
    socket.on('joinRoom', ({ roomKeyCookie, user }) => {
        console.log('a user connected to room ' + roomKeyCookie);
        const room = serverData.rooms.find(room => room.key === roomKeyCookie);
        
        if (room) {
            room.players.push(user);
            console.log('Current players: ', room.players);

            socket.join(roomKeyCookie);
            io.to(roomKeyCookie).emit('updatePlayers', room.players);
        }
    });

    socket.on('getRoom', ({ roomKey }) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        socket.join(roomKey);
        io.to(roomKey).emit('getRoomInfo', room);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// serverData ideal structure: 
// var serverData = {
//     rooms: [
//         {
//             key: "akdnjr", 
//             players: [
//                 {
//                     dispName: "Player One Game One", 
//                     score: 0,
//                     isHost: true,
//                     isPlayer: false
//                 }, 
//                 {
//                     dispName: "Player Two Game One", 
//                     score: 0,
//                     isHost: false,
//                     isPlayer: true
//                 }
//             ]
//         }, 
//         {
//             key: "oejnxz", 
//             players: [
//                 {
//                     dispName: "Player One Game Two", 
//                     score: 0,
//                     isHost: false,
//                     isPlayer: true
//                 },
//                 {
//                     dispName: "Player Two Game Two", 
//                     score: 0,
//                     isHost: true,
//                     isPlayer: false
//                 }
//             ]
//         }
//     ]
// };

app.post('/joinRoom', (req, res) => {
    const { displayName, roomKey } = req.body;
    let room = serverData.rooms.find(room => room.key === roomKey);

    if (room) {
        room.players.push({ name: displayName, score: 0 });
        res.status(200).json({ room });
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
});

app.post('/createRoom', (req, res) => {
    let roomKey = generateRandomKey(4);
    
    let newRoom = {
        key: roomKey,
        players: [
            {
                name: req.body.displayName,
                score: 0
            }
        ]
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