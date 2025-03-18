import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let allSockets: WebSocket[] = [];

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

    socket.on("disconnect", () => {
      allSockets = allSockets.filter(x => x != socket);
    })

      
})