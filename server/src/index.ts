import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let allSockets = [];

wss.on("connection", (socket) => {
  allSockets.push(socket);

  console.log("User Connected #");

    socket.on("message", (message) => {
      console.log('Message Received from user'+message.toString());
      
      allSockets.forEach(s => {
        console.log("message received", s.send(message.toString() ));
        s.send(message.toString());
      });
    })



      
})