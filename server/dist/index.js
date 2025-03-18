"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
// let allSockets: WebSocket[] = [];
let allSockets = [];
wss.on("connection", (socket) => {
    // socket.on("message", (message) => {
    //   // string to object parsing:
    //   const parsedMessage = JSON.parse(message as unknown as string);
    //   if(parsedMessage.type === "join") {
    //     allSockets.push({
    //       socket,
    //       room: parsedMessage.payload.roomId;
    //     })
    //   }
    // })
    socket.on("message", (message) => {
        // @ts-ignore
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type == "join") {
            console.log("user joined room " + parsedMessage.payload.roomId);
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type == "chat") {
            // const currentUserRoom = allSockets.find((x) => x.socket == socket);
            console.log("user wants to chat../");
            let currentUserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                currentUserRoom = allSockets[i].room;
            }
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room == currentUserRoom) {
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
    socket.on("disconnect", () => {
        allSockets = allSockets.filter(x => x != socket);
    });
});
