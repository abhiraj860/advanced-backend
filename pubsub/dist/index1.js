"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const redis_1 = require("redis");
const publishClient = (0, redis_1.createClient)();
publishClient.connect();
const subscribeClient = (0, redis_1.createClient)();
subscribeClient.connect();
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
            if (oneUserSubscribedTo(parsedData.room)) {
                subscribeClient.subscribe(parsedData.room, (message) => {
                    const parsedData = JSON.parse(message);
                    Object.keys(subscriptions).forEach((userId) => {
                        const { ws, rooms } = subscriptions[userId];
                        if (rooms.includes(parsedData.roomId)) {
                            ws.send(parsedData.message);
                        }
                    });
                });
            }
        }
        if (parsedData.type === "UNSUBSCRIBE") {
            subscriptions[id].rooms = subscriptions[id].rooms.filter(x => x !== parsedData.room);
            if (lastPersonLeftRoom(parsedData.room)) {
                subscribeClient.unsubscribe(parsedData.room);
            }
        }
        if (parsedData.type === "sendMessage") {
            const message = parsedData.message;
            const roomId = parsedData.roomId;
            // Object.keys(subscriptions).forEach((userId)=>{
            //     const {ws, rooms} = subscriptions[userId]
            //     if(rooms.includes(roomId)) {
            //         ws.send(message);
            //     }
            // });
            publishClient.publish(roomId, JSON.stringify({
                type: "sendMessage",
                roomId: roomId,
                message
            }));
        }
    });
    userSocket.on('error', console.error);
});
function randomId() {
    return Math.random();
}
function oneUserSubscribedTo(roomId) {
    let totalInterestedPeople = 0;
    Object.keys(subscriptions).map(userId => {
        if (subscriptions[userId].rooms.includes(roomId)) {
            totalInterestedPeople++;
        }
    });
    return true ? totalInterestedPeople === 1 : false;
}
function lastPersonLeftRoom(roomId) {
    let totalInterestedPeople = 0;
    Object.keys(subscriptions).map(userId => {
        if (subscriptions[userId].rooms.includes(roomId)) {
            totalInterestedPeople++;
        }
    });
    return true ? totalInterestedPeople === 1 : false;
}
