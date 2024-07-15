"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const subscriptions = {};
wss.on('connection', (userSocket) => {
    const id = randomId();
    subscriptions[id] = {
        ws: userSocket,
        rooms: []
    };
    userSocket.on('message', (data) => {
        const parsedData = JSON.parse(data);
        if (parsedData.type === "SUBSCRIBE") {
            subscriptions[id].rooms.push(parsedData.room);
        }
        if (parsedData.type === "sendMessage") {
            const message = parsedData.message;
            const roomId = parsedData.roomId;
            Object.keys(subscriptions).forEach((userId) => {
                const { ws, rooms } = subscriptions[userId];
                if (rooms.includes(roomId)) {
                    ws.send(message);
                }
            });
        }
    });
    userSocket.on('error', console.error);
    userSocket.on('message', (data) => {
    });
});
function randomId() {
    return Math.random();
}
