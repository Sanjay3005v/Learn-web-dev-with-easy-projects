const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let players = {};

wss.on('connection', (ws) => {
    console.log('New Player Connected');

    const playerId = Date.now(); // Unique ID for the player
    players[playerId] = { ws, choice: null };

    ws.send(JSON.stringify({ type: 'WAITING', message: 'Waiting for Opponent...' }));

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'CHOICE') {
            players[playerId].choice = data.choice.toLowerCase(); // normalize input
            checkGameResult();
        }
    });

    ws.on('close', () => {
        delete players[playerId];
        console.log('Player disconnected');
    });
});

function checkGameResult() {
    const playerIds = Object.keys(players);
    
    if (playerIds.length === 2) {
        const [p1, p2] = playerIds;
        const choice1 = players[p1].choice;
        const choice2 = players[p2].choice;

        if (choice1 && choice2) {
            let result1, result2;

            if (choice1 === choice2) {
                result1 = result2 = 'DRAW';
            } else if (
                (choice1 === 'rock' && choice2 === 'scissors') ||
                (choice1 === 'paper' && choice2 === 'rock') ||
                (choice1 === 'scissors' && choice2 === 'paper')
            ) {
                result1 = 'YOU WIN';
                result2 = 'YOU LOSE';
            } else {
                result1 = 'YOU LOSE';
                result2 = 'YOU WIN';
            }

            players[p1].ws.send(JSON.stringify({ type: 'RESULT', result: result1 }));
            players[p2].ws.send(JSON.stringify({ type: 'RESULT', result: result2 }));

            players[p1].choice = null;
            players[p2].choice = null;
        }
    }
}

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
