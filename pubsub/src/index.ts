import {WebSocketServer, WebSocket} from "ws";

const wss = new WebSocketServer({port:8080}, ()=>{
    console.log("Server running on port 8080");
});

wss.on('connection', (userSocket)=>{
    userSocket.send("Hi you are connected to the server");
    userSocket.on('message', (data: any)=>{
       console.log("User sent a message");
       userSocket.send("Hey you sent this messsage to the server" + data); 
    });
});