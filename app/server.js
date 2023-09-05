const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const hostname = 'localhost';
app.use(express.static('public'));
app.use(express.json());

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

var serverData = {
    rooms: []
}

const sampleBoard = {
    Single: 
    [
        
        {
            category: "ANAGRAMS",
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
            category: "CODE WORDS",
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
                    answer: "A Bit",
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
            category: "'WEB' DEV",
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
                    clue: "Having these types of feet aid in aquatic locomotion",
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
            category: "MAGIC SHOWS",
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
                    answer: "Wizards Of Waverly Place",
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
                    answer: "Buffy The Vampire Slayer",
                    value: 1000,
                    dailydouble: false,
                    id: 's20'
                }
            ]
        },
        {
            category: "FINALS WEEK",
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
            category: "BEFORE AND AFTER",
            clues: 
            [
                {
                    clue: "Dwayne who performs on stage in front of thousands",
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
                    answer: "Throw Another Shrimp On The Barbie And Ken",
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
            category: "BEATLES SONGS 'H'",
            clues:
            [
                {
                    clue: "'Little darlin', it's been a long, cold, lonely winter. Little darlin', it feels like years since it's been here'",
                    answer: "Here Comes The Sun",
                    value: 400,
                    dailydouble: false,
                    id: 'd1'
                },
                {
                    clue: "`...don't make it bad. Take a sad song and make it better.`",
                    answer: "Hey Jude",
                    value: 800,
                    dailydouble: false,
                    id: 'd2'
                },
                {
                    clue: "`When I was younger, so much younger than today, I never needed anybody's help in any way`",
                    answer: "Help!",
                    value: 1200,
                    dailydouble: false,
                    id: 'd3'
                },
                {
                    clue: "`You can talk to me` four times",
                    answer: "Hey Bulldog",
                    value: 1600,
                    dailydouble: false,
                    id: 'd4'
                },
                {
                    clue: "Each one believing that love never dies. Watching her eyes and hoping I'm always there",
                    answer: "Here, There And Everywhere",
                    value: 2000,
                    dailydouble: false,
                    id: 'd5'
                }
            ]
        },
        {
            category: "COMPUTER `S`CIENCE",
            clues: 
            [
                {
                    clue: "Traversing from webpage to webpage was granted this tubular title",
                    answer: "Surfing The Web",
                    value: 400,
                    dailydouble: false,
                    id: 'd6'
                },
                {
                    clue: "They may not be able to fly or shoot lasers out of their eyes, but this type of user does have elevated permissions",
                    answer: "Super User",
                    value: 800,
                    dailydouble: false,
                    id: 'd7'
                },
                {
                    clue: "Roger Federer is a very proficient `this` in Tennis, although there are no clients connecting to that kind",
                    answer: "Server",
                    value: 1200,
                    dailydouble: false,
                    id: 'd8'
                },
                {
                    clue: "James Bond may install this on your computer to secretly gain information",
                    answer: "Spyware",
                    value: 1600,
                    dailydouble: false,
                    id: 'd9'
                },
                {
                    clue: "This storage device uses flash memory, and boasts increased read/write speed over its alternative",
                    answer: "Solid State Drive",
                    value: 2000,
                    dailydouble: false,
                    id: 'd10'
                }
            ]
        },
        {
            category: "10 LETTER WORDS",
            clues: 
            [
                {
                    clue: "To put at risk, or a fun way to describe the act of playing this game",
                    answer: "Jeopardize",
                    value: 400,
                    dailydouble: false,
                    id: 'd11'
                },
                {
                    clue: "Although you do still wear boxing gloves, this martial art uses the legs and feet as well as the arms",
                    answer: "Kickboxing",
                    value: 800,
                    dailydouble: false,
                    id: 'd12'
                },
                {
                    clue: "It may aid in breaking new ground in construction",
                    answer: "Jackhammer",
                    value: 1200,
                    dailydouble: false,
                    id: 'd13'
                },
                {
                    clue: "Make sure to look both ways before crossing in this manner that breaks traffic laws",
                    answer: "Jaywalking",
                    value: 1600,
                    dailydouble: false,
                    id: 'd14'
                },
                {
                    clue: "Not to be confused with a panda's main food source, this may come as a surprise",
                    answer: "Bamboozle",
                    value: 2000,
                    dailydouble: true,
                    id: 'd15'
                }
            ]
        },
        {
            category: "FLAGS OF THE WORLD",
            clues: 
            [
                {
                    clue: "The red circle on this flag represents the rising sun",
                    answer: "Japan",
                    value: 400,
                    dailydouble: false,
                    id: 'd16'
                },
                {
                    clue: "The blue hexagram seen on this country's flag also represents the main religion there",
                    answer: "Israel",
                    value: 800,
                    dailydouble: false,
                    id: 'd17'
                },
                {
                    clue: "The only non-rectangular country flag in the world",
                    answer: "Nepal",
                    value: 1200,
                    dailydouble: true,
                    id: 'd18'
                },
                {
                    clue: "One of only two square flags, that of the smallest country in the world",
                    answer: "The Vatican City",
                    value: 1600,
                    dailydouble: false,
                    id: 'd19'
                },
                {
                    clue: "The color purple can be found on just two flags in the world- Dominica's, and this Central American country known for its dramatic terrain of lakes, beaches, and volcanoes",
                    answer: "Nicaragua",
                    value: 2000,
                    dailydouble: false,
                    id: 'd20'
                }
            ]
        },
        {
            category: "NON-AMERICAN LEADERS",
            clues: 
            [
                {
                    clue: "The longest serving prime minister of Japan",
                    answer: "Shinzo Abe",
                    value: 400,
                    dailydouble: false,
                    id: 'd21'
                },
                {
                    clue: "The sixth king of The Old Babylonian Empire who enacted his own code of laws still referenced today",
                    answer: "Hammurabi",
                    value: 800,
                    dailydouble: false,
                    id: 'd22'
                },
                {
                    clue: "Ex-Prime minster who became the world's youngest female head of government at age 37 in 2017",
                    answer: "Jacinda Ardern",
                    value: 1200,
                    dailydouble: false,
                    id: 'd23'
                },
                {
                    clue: "This king of both Denmark and Norway introduced Christianity to the former, and also lent his name to a technology used in many devices",
                    answer: "Harald Bluetooth",
                    value: 1600,
                    dailydouble: true,
                    id: 'd24'
                },
                {
                    clue: "He said, `never again shall it be that this beautiful land will again experience the oppression of one by another`”",
                    answer: "Nelson Mandela",
                    value: 2000,
                    dailydouble: false,
                    id: 'd25'
                }
            ]
        },
        {
            category: "ALSO AN NBA TEAM",
            clues: 
            [
                {
                    clue: "Large water birds with even larger beaks",
                    answer: "Pelican",
                    value: 400,
                    dailydouble: false,
                    id: 'd26'
                },
                {
                    clue: "Music genre that originated in New Orleans with its roots in blues and ragtime",
                    answer: "Jazz",
                    value: 800,
                    dailydouble: false,
                    id: 'd27'
                },
                {
                    clue: "Merlin, and Potter",
                    answer: "Wizards",
                    value: 1200,
                    dailydouble: false,
                    id: 'd28'
                },
                {
                    clue: "Pack animals that are related to coyotes and jackals",
                    answer: "Timberwolves",
                    value: 1600,
                    dailydouble: false,
                    id: 'd29'
                },
                {
                    clue: "Historically, supporters of King Charles I in the English Civil War",
                    answer: "Cavaliers",
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
            category: "DREXEL UNIVERSITY",
            clues:
            [
                {
                    clue: "This student gave his name to the unique mascot of the university, the only Dragon mascot in the NCAA",              
                    answer: "Mario Mascioli",
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
        console.log('Starting the game...');
        const room = serverData.rooms.find(room => room.key === roomKey);
        room.metadata.currentPlayer = room.players[0].id;

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

    socket.on('setInitialHostView', (roomKey) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        var currentPlayerName = getPlayer(room.players, room.metadata.currentPlayer).name;
        io.to(room.host.id).emit('initialHostView', currentPlayerName);
    });

    socket.on('selectQuestion', ({ roomKey, questionID }) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        let questionInfo = null;
        if (questionID.charAt(0) == 's') {
            questionInfo = getQuestionInfo(room.board.Single, questionID);
        } else if (questionID.charAt(0) == 'd') {
            questionInfo = getQuestionInfo(room.board.Double, questionID);
        } else if (questionID.charAt(0) == 'f') {
            questionInfo = getQuestionInfo(room.board.Final, questionID);
        }
        
        room.metadata.currentQuestion = questionInfo;
        io.to(room.host.id).emit('questionSelected', questionInfo);
        
        if (room.metadata.currentQuestion.dailydouble) {
            console.log('Daily Double reached!');
            room.metadata.currentlyBuzzedPlayer = room.metadata.currentPlayer;
            var currentPlayerScore = getPlayer(room.players, room.metadata.currentlyBuzzedPlayer).score;
            io.to(room.metadata.currentlyBuzzedPlayer).emit('dailyDoublePrompt', currentPlayerScore);
        }
    });

    socket.on('setPlayerWager', ({ roomKey, wager }) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        let currentPlayerName;
        for (let i = 0; i < room.players.length; i++) {
            var player = room.players[i];
            if (player.id == room.metadata.currentlyBuzzedPlayer) {
                player.wager = wager;
                currentPlayerName = player.name;
                break;
            }
        }

        io.to(room.host.id).emit('dailyDoubleHostView', { wager, currentPlayerName });
    });

    socket.on('unlockQuestion', (roomKey) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        for (var i = 0; i < room.players.length; i++) {
            var currentPlayer = room.players[i];
            var playerName = currentPlayer.name;
            if (room.metadata.buzzedPlayers.includes(currentPlayer.id) == false) io.to(currentPlayer.id).emit('enableBuzzer', playerName);
        }
    });

    socket.on('lockQuestion', (roomKey) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        for (var i = 0; i < room.players.length; i++) {
            var currentPlayer = room.players[i];
            var playerName = currentPlayer.name;
            io.to(currentPlayer.id).emit('disableBuzzer', playerName);
        }
    });

    socket.on('playerBuzz', ({ roomKey, socketId }) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        room.metadata.currentlyBuzzedPlayer = socketId;
        room.metadata.buzzedPlayers.push(socketId);

        var buzzedPlayer;
        for (var i = 0; i < room.players.length; i++) {
            var currentPlayer = room.players[i];

            if (currentPlayer.id == socketId) {
                buzzedPlayer = currentPlayer;
                break;
            }
        }

        io.to(room.host.id).emit('buzzedPlayer', buzzedPlayer);
    });

    socket.on('resetHostView', (roomKey) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        var currentPlayerName = getPlayer(room.players, room.metadata.currentPlayer).name;
        io.to(room.host.id).emit('revertHostView', currentPlayerName);
    });

    socket.on('resetPCView', (roomKey) => {
        const room = serverData.rooms.find(room => room.key === roomKey);
        io.to(room.pc.id).emit('revertPCView');
    });

    socket.on('rightAnswer', (roomKey) => {
        const room = serverData.rooms.find(room => room.key === roomKey);

        for (let i = 0; i < room.players.length; i++) {
            var player = room.players[i];
            if (player.id == room.metadata.currentlyBuzzedPlayer) {
                if (room.metadata.currentQuestion.dailydouble) {
                    player.score += parseInt(player.wager);
                    player.wager = 0;
                } else {
                    player.score += room.metadata.currentQuestion.value;
                }

                break;
            }
        }

        room.metadata.currentPlayer = room.metadata.currentlyBuzzedPlayer;
        room.metadata.currentlyBuzzedPlayer = null;
        room.metadata.buzzedPlayers = []; 

        io.to(room.pc.id).emit('updateTable', room);

        var currentPlayerName = getPlayer(room.players, room.metadata.currentPlayer).name;
        io.to(room.host.id).emit('revertHostView', currentPlayerName);

        io.to(room.pc.id).emit('revertPCView');
    });

    socket.on('wrongAnswer', (roomKey) => {
        const room = serverData.rooms.find(room => room.key === roomKey);

        for (let i = 0; i < room.players.length; i++) {
            var player = room.players[i];
            if (player.id == room.metadata.currentlyBuzzedPlayer) {
                if (room.metadata.currentQuestion.dailydouble) {
                    player.score -= parseInt(player.wager);
                    player.wager = 0;
                } else {
                    player.score -= room.metadata.currentQuestion.value;
                }
                break;
            }
        }

        io.to(room.pc.id).emit('updateTable', room);
        io.to(room.host.id).emit('reUnlockQuestion', room);
    });

    socket.on('endOfBuzzingAvailability', (roomKey) => {
        const room = serverData.rooms.find(room => room.key === roomKey);

        var currentPlayerName = getPlayer(room.players, room.metadata.currentPlayer).name;
        room.metadata.currentlyBuzzedPlayer = null;
        room.metadata.buzzedPlayers = []; 

        io.to(room.host.id).emit('revertHostView', currentPlayerName);
        io.to(room.pc.id).emit('revertPCView');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.post('/joinRoom', (req, res) => {
    const { displayName, roomKey } = req.body;
    let room = serverData.rooms.find(room => room.key === roomKey);

    if (room) {
        if (isPlayerNameUnique(room.players, displayName)) {
            let player = { name: displayName, score: 0, id: null };
            room.players.push(player);
            res.status(200).json({ room });
        } else if (!isPlayerNameUnique(room.players, displayName)) {
            console.log(`${displayName} is taken. Please choose a different name`);
            res.status(400).json({error: 'Name is already taken'});
        }
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
            currentQuestion: null,
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
        pcJoined = true;
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

function getQuestionInfo(arr, id) {
    let q = null;
    for (let i = 0; i < arr.length; i++) {
        let category = arr[i];
        for (let j = 0; j < category.clues.length; j++) {
            if (category.clues[j].id == id) {
                q = category.clues[j];
                break;
            }
        }
    }

    return q;
}

function getPlayer(arr, id) {
    var player;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
            player = arr[i];
            break;
        }
    }

    return player;
}

function isPlayerNameUnique(playerArray, playerNameToCheck) {
    for (let i = 0; i < playerArray.length; i++) {
      if (playerArray[i].name === playerNameToCheck) {
        return false;
      }
    }
    return true;
}

server.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
});