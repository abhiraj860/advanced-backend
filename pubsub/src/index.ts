import {WebSocketServer, WebSocket} from "ws";
import {createClient} from "redis";

const publishClient = createClient();
publishClient.connect();

const subscribeClient = createClient();
subscribeClient.connect();

const wss = new WebSocketServer({port:8081}, ()=>{
    console.log("Listening to port 8081");
});

const users: {[key:string]: {
    ws: WebSocket,
    rooms: String[]
}} = {};


wss.on('connection', (userSocket)=>{
    const id = randomId();
    users[id] = {
        ws: userSocket,
        rooms: []
    }
    userSocket.on('message', (data)=>{
        const parsedData = JSON.parse(data as unknown as string);
        if(parsedData.type === "SUBSCRIBE" && !users[id].rooms.includes(parsedData.roomId)) {
            users[id].rooms.push(parsedData.roomId);
            // console.log(users);
            if(oneUserSubscribedTo(parsedData.roomId)) {
                console.log("Subscribed to redis server.");
                subscribeClient.subscribe(parsedData.roomId, (message)=>{
                    const parsedData = JSON.parse(message);
                    Object.keys(users).forEach((userId)=>{
                        const {ws, rooms} = users[userId];
                        if(rooms.includes(parsedData.roomId)) {
                            ws.send(parsedData.message);
                        }
                    });    
                });
            }
        }
        if(parsedData.type === "sendMessage") {
            const message = parsedData.message;
            const roomId = parsedData.roomId;
            console.log("Inside the send message");
            publishClient.publish(roomId, JSON.stringify({
                type: "sendMessage",
                roomId: roomId,
                message
            }))
        }
    });
});

function randomId() {
    return Math.random();
}

function oneUserSubscribedTo(roomId: string) {
    let totalInterestedPeople = 0;
    // console.log(roomId);
    Object.keys(users).map(userId=>{
        if(users[userId].rooms.includes(roomId)) {
            // console.log("Inside the iteration");
            totalInterestedPeople++;
        }
    });
    console.log(totalInterestedPeople);
    return true ? totalInterestedPeople === 1: false;
}

function lastPersonLeftRoom(roomId: string) {
     
}