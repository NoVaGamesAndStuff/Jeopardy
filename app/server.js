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

const sampleBoard = {
    Single: 
    [
        
        {
            category: "Anagrams",
            clues:
            [
                {
                    clue: "An American symbol: BAGEL DEAL",
                    answer: "BALD EAGLE",
                    value: 200,
                    dailydouble: false,
                    id: 's1'
                },
                {
                    clue: "An ancient reptile: AIR SOUND",
                    answer: "DINOSAUR",
                    value: 400,
                    dailydouble: false,
                    id: 's2'
                },
                {
                    clue: "Heavenly predator of the coral reef: FLAG SHINE",
                    answer: "ANGELFISH",
                    value: 600,
                    dailydouble: false,
                    id: 's3'
                },
                {
                    clue: "Classmate from overseas: SNUG TEACH EXTEND",
                    answer: "EXCHANGE STUDENT",
                    value: 800,
                    dailydouble: false,
                    id: 's4'
                },
                {
                    clue: "Adjective meaning morally wrong: LEACH UNIT",
                    answer: "UNETHICAL",
                    value: 1000,
                    dailydouble: false,
                    id: 's5'
                }
            ]
        },
        {
            category: "Code Words",
            clues: 
            [
                {
                    clue: "A very popular coding language that you might find in the zoo",
                    answer: "Python",
                    value: 200,
                    dailydouble: false,
                    id: 's6'
                },
                {
                    clue: "You may find one covered in leaves in the forest, or in your repository",
                    answer: "A Branch",
                    value: 400,
                    dailydouble: false,
                    id: 's7'
                },
                {
                    clue: "A past tense chomp, or a unit of information",
                    answer: "A bit",
                    value: 600,
                    dailydouble: false,
                    id: 's8'
                },
                {
                    clue: "Not to be confused with the underwater Manta, this data structure",
                    answer: "An Array",
                    value: 800,
                    dailydouble: false,
                    id: 's9'
                },
                {
                    clue: "Primogeniture is one method used to determine what objects belong to who, or you can simply derive.",
                    answer: "Inheritance",
                    value: 1000,
                    dailydouble: false,
                    id: 's10'
                }
            ]
        },
        {
            category: "'Web' Dev",
            clues: 
            [
                {
                    clue: "Where a URL may take you",
                    answer: "Website",
                    value: 200,
                    dailydouble: false,
                    id: 's11'
                },
                {
                    clue: "The self-made home of an eight-legged creature",
                    answer: "Spiderweb",
                    value: 400,
                    dailydouble: false,
                    id: 's12'
                },
                {
                    clue: "Having these types of feet aid in aquatic locomotion ",
                    answer: "Webbed",
                    value: 600,
                    dailydouble: false,
                    id: 's13'
                },
                {
                    clue: "You might use one in conjunction with a microphone for your livestream",
                    answer: "Webcam",
                    value: 800,
                    dailydouble: false,
                    id: 's14'
                },
                {
                    clue: "A Noah who can help you know new words",
                    answer: "Webster",
                    value: 1000,
                    dailydouble: false,
                    id: 's15'
                }
            ]
        },
        {
            category: "Magic Shows",
            clues: 
            [
                {
                    clue: "Toss a coin to Henry Cavill, who plays Geralt in this Netflix favorite",
                    answer: "The Witcher",
                    value: 200,
                    dailydouble: false,
                    id: 's16'
                },
                {
                    clue: "The superhero name of this marvelous magic user Maximoff who landed her own show on Disney+",
                    answer: "Scarlet Witch",
                    value: 400,
                    dailydouble: false,
                    id: 's17'
                },
                {
                    clue: "A family of magic-wielders can be found in a sandwich shop set on this real New York City street in Manhattan that stretches from Bank Street to Broadway",
                    answer: "Wizards of Waverly Place",
                    value: 600,
                    dailydouble: false,
                    id: 's18'
                },
                {
                    clue: "The law of equivalent exchange doesn't stop some serious displays of alchemy in this 2009 Anime",
                    answer: "Fullmetal Alchemist: Brotherhood",
                    value: 800,
                    dailydouble: true,
                    id: 's19'
                },
                {
                    clue: "Vampires and demons stood no chance in this popular magic show which even had its own musical episode: Once More, with Feeling",
                    answer: "Buffy the Vampire Slayer",
                    value: 1000,
                    dailydouble: false,
                    id: 's20'
                }
            ]
        },
        {
            category: "Finals Week",
            clues: 
            [
                {
                    clue: "Gruesome deaths await pretty much everyone in this series of horror movies",
                    answer: "Final Destination",
                    value: 200,
                    dailydouble: false,
                    id: 's21'
                },
                {
                    clue: "Cloud Strife is just one of many main characters you may play in one of gamings longest running franchises ",
                    answer: "Final Fantasy",
                    value: 400,
                    dailydouble: false,
                    id: 's22'
                },
                {
                    clue: "Space, as famously dubbed by Star Trek",
                    answer: "The Final Frontier",
                    value: 600,
                    dailydouble: false,
                    id: 's23'
                },
                {
                    clue: "Break a ball or charge a meter to activate this ultimate attack found in Nintendo's most popular fighting game",
                    answer: "Final Smash",
                    value: 800,
                    dailydouble: false,
                    id: 's24'
                },
                {
                    clue: "Swedish rock band Europe is responsible for this chart topping glam metal song",
                    answer: "The Final Countdown",
                    value: 1000,
                    dailydouble: false,
                    id: 's25'
                }
            ]
        },
        {
            category: "Before and After",
            clues: 
            [
                {
                    clue: "Duane who performs on stage in front of thousands",
                    answer: "The Rock Star",
                    value: 200,
                    dailydouble: false,
                    id: 's26'
                },
                {
                    clue: "The animals boarded two by two to escape flooding before Indy and the Nazis fought over control in Raiders",
                    answer: "Noah's Ark of the Covenant",
                    value: 400,
                    dailydouble: false,
                    id: 's27'
                },
                {
                    clue: "Deliver your package with free 2 hour shipping- or three, five, seven, or eleven if you prefer",
                    answer: "Amazon Prime Number",
                    value: 600,
                    dailydouble: false,
                    id: 's28'
                },
                {
                    clue: "Watch where you're going while playing this Niantic mobile game, but make sure you catch 'em ALL",
                    answer: "Pokemon Go Getter",
                    value: 800,
                    dailydouble: false,
                    id: 's29'
                },
                {
                    clue: "A stereotypical Australian phrase and a newly reimagined movie couple",
                    answer: "Throw another shrimp on the Barbie and Ken",
                    value: 1000,
                    dailydouble: false,
                    id: 's30'
                }
            ]
        }
    ],
    Double: 
    [
        {
            category: "Anagrams",
            clues:
            [
                {
                    clue: "An American symbol: BAGEL DEAL",
                    answer: "BALD EAGLE",
                    value: 400,
                    dailydouble: false,
                    id: 'd1'
                },
                {
                    clue: "An ancient reptile: AIR SOUND",
                    answer: "DINOSAUR",
                    value: 800,
                    dailydouble: false,
                    id: 'd2'
                },
                {
                    clue: "Heavenly predator of the coral reef: FLAG SHINE",
                    answer: "ANGELFISH",
                    value: 1200,
                    dailydouble: false,
                    id: 'd3'
                },
                {
                    clue: "Classmate from overseas: SNUG TEACH EXTEND",
                    answer: "EXCHANGE STUDENT",
                    value: 1600,
                    dailydouble: false,
                    id: 'd4'
                },
                {
                    clue: "Adjective meaning morally wrong: LEACH UNIT",
                    answer: "UNETHICAL",
                    value: 2000,
                    dailydouble: false,
                    id: 'd5'
                }
            ]
        },
        {
            category: "Code Words",
            clues: 
            [
                {
                    clue: "A very popular coding language that you might find in the zoo",
                    answer: "Python",
                    value: 400,
                    dailydouble: false,
                    id: 'd6'
                },
                {
                    clue: "You may find one covered in leaves in the forest, or in your repository",
                    answer: "A Branch",
                    value: 800,
                    dailydouble: false,
                    id: 'd7'
                },
                {
                    clue: "A past tense chomp, or a unit of information",
                    answer: "A bit",
                    value: 1200,
                    dailydouble: false,
                    id: 'd8'
                },
                {
                    clue: "Not to be confused with the underwater Manta, this data structure",
                    answer: "An Array",
                    value: 1600,
                    dailydouble: false,
                    id: 'd9'
                },
                {
                    clue: "Primogeniture is one method used to determine what objects belong to who, or you can simply derive.",
                    answer: "Inheritance",
                    value: 2000,
                    dailydouble: false,
                    id: 'd10'
                }
            ]
        },
        {
            category: "'Web' Dev",
            clues: 
            [
                {
                    clue: "Where a URL may take you",
                    answer: "Website",
                    value: 400,
                    dailydouble: false,
                    id: 'd11'
                },
                {
                    clue: "The self-made home of an eight-legged creature",
                    answer: "Spiderweb",
                    value: 800,
                    dailydouble: false,
                    id: 'd12'
                },
                {
                    clue: "Having these types of feet aid in aquatic locomotion ",
                    answer: "Webbed",
                    value: 1200,
                    dailydouble: false,
                    id: 'd13'
                },
                {
                    clue: "You might use one in conjunction with a microphone for your livestream",
                    answer: "Webcam",
                    value: 1600,
                    dailydouble: false,
                    id: 'd14'
                },
                {
                    clue: "A Noah who can help you know new words",
                    answer: "Webster",
                    value: 2000,
                    dailydouble: true,
                    id: 'd15'
                }
            ]
        },
        {
            category: "Magic Shows",
            clues: 
            [
                {
                    clue: "Toss a coin to Henry Cavill, who plays Geralt in this Netflix favorite",
                    answer: "The Witcher",
                    value: 400,
                    dailydouble: false,
                    id: 'd16'
                },
                {
                    clue: "The superhero name of this marvelous magic user Maximoff who landed her own show on Disney+",
                    answer: "Scarlet Witch",
                    value: 800,
                    dailydouble: false,
                    id: 'd17'
                },
                {
                    clue: "A family of magic-wielders can be found in a sandwich shop set on this real New York City street in Manhattan that stretches from Bank Street to Broadway",
                    answer: "Wizards of Waverly Place",
                    value: 1200,
                    dailydouble: false,
                    id: 'd18'
                },
                {
                    clue: "The law of equivalent exchange doesn't stop some serious displays of alchemy in this 2009 Anime",
                    answer: "Fullmetal Alchemist: Brotherhood",
                    value: 1600,
                    dailydouble: false,
                    id: 'd19'
                },
                {
                    clue: "Vampires and demons stood no chance in this popular magic show which even had its own musical episode: Once More, with Feeling",
                    answer: "Buffy the Vampire Slayer",
                    value: 2000,
                    dailydouble: false,
                    id: 'd20'
                }
            ]
        },
        {
            category: "Finals Week",
            clues: 
            [
                {
                    clue: "Gruesome deaths await pretty much everyone in this series of horror movies",
                    answer: "Final Destination",
                    value: 400,
                    dailydouble: false,
                    id: 'd21'
                },
                {
                    clue: "Cloud Strife is just one of many main characters you may play in one of gamings longest running franchises ",
                    answer: "Final Fantasy",
                    value: 800,
                    dailydouble: false,
                    id: 'd22'
                },
                {
                    clue: "Space, as famously dubbed by Star Trek",
                    answer: "The Final Frontier",
                    value: 1200,
                    dailydouble: true,
                    id: 'd23'
                },
                {
                    clue: "Break a ball or charge a meter to activate this ultimate attack found in Nintendo's most popular fighting game",
                    answer: "Final Smash",
                    value: 1600,
                    dailydouble: false,
                    id: 'd24'
                },
                {
                    clue: "Swedish rock band Europe is responsible for this chart topping glam metal song",
                    answer: "The Final Countdown",
                    value: 2000,
                    dailydouble: false,
                    id: 'd25'
                }
            ]
        },
        {
            category: "Before and After",
            clues: 
            [
                {
                    clue: "Duane who performs on stage in front of thousands",
                    answer: "The Rock Star",
                    value: 400,
                    dailydouble: false,
                    id: 'd26'
                },
                {
                    clue: "The animals boarded two by two to escape flooding before Indy and the Nazis fought over control in Raiders",
                    answer: "Noah's Ark of the Covenant",
                    value: 800,
                    dailydouble: false,
                    id: 'd27'
                },
                {
                    clue: "Deliver your package with free 2 hour shipping- or three, five, seven, or eleven if you prefer",
                    answer: "Amazon Prime Number",
                    value: 1200,
                    dailydouble: false,
                    id: 'd28'
                },
                {
                    clue: "Watch where you're going while playing this Niantic mobile game, but make sure you catch 'em ALL",
                    answer: "Pokemon Go Getter",
                    value: 1600,
                    dailydouble: false,
                    id: 'd29'
                },
                {
                    clue: "A stereotypical Australian phrase and a newly reimagined movie couple",
                    answer: "Throw another shrimp on the Barbie and Ken",
                    value: 2000,
                    dailydouble: false,
                    id: 'd30'
                }
            ]
        }
    ],
    Final:
    [
        {
            category: "Final",
            clues:
            [
                {
                    clue: "Final Question",              
                    answer: "Final Answer",
                    id: 'f1'
                }
            ]
        }
    ]
};

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
    socket.on('getRoom', ({roomKey, currDispName}) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        socket.join(roomKey);
        let isHost = false;
        let playerId = null;

        if (room.host.id === null) {
            room.host.id = socket.id;
            console.log('The host connected.');
            isHost = true;
        } else if (room.pc !== null && room.pc.id === null) {
            room.pc.id = socket.id;
            console.log('The display PC connected.');
        } else {
            for (var i = 0; i < room.players.length; i++) {
                if (room.players[i].name == currDispName) {
                    room.players[i].id = socket.id;
                    playerId = room.players[i].id;
                    break;
                }
            }
            console.log('A player connected with socket id: ' + playerId);
        }

        io.to(roomKey).emit('getRoomInfo', { room, isHost });
    });

    socket.on('startGame', (roomKey) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        let obj = {}; // emptyObj exists to pass an empty object to host and player emits since they still need a second parameter

        let entityName = 'host';
        io.to(room.host.id).emit('gameStartView', { entityName, obj });

        entityName = 'player';
        for (var i = 0; i < room.players.length; i++) {
            var currentPlayer = room.players[i];
            io.to(currentPlayer.id).emit('gameStartView', { entityName, obj });
        }

        entityName = 'pc';
        obj = room.board;
        io.to(room.pc.id).emit('gameStartView', { entityName, obj });
    });

    socket.on('selectQuestion', (roomKey) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        io.to(room.host.id).emit('questionSelected', 'host');
        io.to(room.pc.id).emit('questionSelected', 'pc');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.post('/joinRoom', (req, res) => {
    const { displayName, roomKey } = req.body;
    let room = serverData.rooms.find(room => room.key === roomKey);

    if (room) {
        let player = { name: displayName, score: 0, id: null };
        room.players.push(player);
        if (room.metadata.currentPlayer == null) {
            room.metadata.currentPlayer = player;
        }
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
            id: null
        },
        pc: null,
        players: [],
        board: sampleBoard,
        metadata: {
            currentPlayer: null,
            currentlyBuzzedPlayer: null,
            buzzedPlayers: []
        }
    };

    serverData.rooms.push(newRoom);

    res.status(200).json({ newRoom });
});

app.post('/joinRoomPC', (req, res) => {
    const roomKey = req.body.roomKey;
    let room = serverData.rooms.find(room => room.key === roomKey);

    if (room) {
        room.pc = { id: null };
        res.status(200).json({ room });
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
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