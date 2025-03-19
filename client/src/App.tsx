import { useEffect, useRef, useState } from "react"


export default function App() {

  const [messages, setMessages] = useState(["hi there", "hello"]);
  const wsRef = useRef("");
  
  useEffect((() => {
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (ev) => {
      setMessages(m => [...m, ev.data])
    }
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }
      // ws.send({
      //   type: "join",
      //   payload: {
      //     roomId: "red"
      //   }
      // })
  }),[])
  return (
    <div className="h-screen bg-black text-white flex flex-col p-12 px-32">
        <div className="bg-red-200 h-[66vh] ">
          {messages.map(message => <div
          className="bg-green-300 rounded p-2 m-1 text-white w-1/2"> {message} </div>)}
        </div>
        <div className="bg-yellow-100 h-[10vh]">
          <input id="message" type="text" className="mt-1 w-full p-3 text-red-600 flex">
          </input>
          <button className="w-full rounded-md bg-purple-500 p-4"
          onClick={() => {
            const message = document.getElementById("message")?.value;
            wsRef.current.send(JSON.stringify({
              type: "chat",
              payload: {
                message: message
              }
            }))
          }}>Send Message</button>
        </div>
    </div>
  )
}