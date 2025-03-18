"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    console.log("User Connected #");
    socket.on("message", (message) => {
        console.log('Message Received from user' + message.toString());
        allSockets.forEach(s => {
            console.log("message received", s.send(message.toString()));
            s.send(message.toString());
        });
    });
});
