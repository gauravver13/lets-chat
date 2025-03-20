import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

// let allSockets: WebSocket[] = [];
let allSockets: User[] = [];

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

    if(parsedMessage.type == "join") {
      console.log("user joined room "+ parsedMessage.payload.roomId);
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId
      })
    }

    if(parsedMessage.type == "chat") {
      // const currentUserRoom = allSockets.find((x) => x.socket == socket);
      console.log("user wants to chat../");
      let currentUserRoom = null;
      for(let i=0; i<allSockets.length; i++) {
        currentUserRoom = allSockets[i].room;
      }

      for(let i=0; i<allSockets.length; i++) {
        if(allSockets[i].room == currentUserRoom) {
          allSockets[i].socket.send(parsedMessage.payload.message);
        }
      }

    }

  })

  socket.on("disconnect", () => {
    allSockets = allSockets.filter(x => x != socket as unknown);
  })

  socket.
})