import { useEffect, useState } from "react"

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [message, setMessage] = useState<string>("");
  const [input, setInput] = useState('');

  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = ()=>{
      console.log('Connected');
      setSocket(socket);
    }
    socket.onmessage = (message)=>{
      setMessage(()=>message.data);
      console.log("Recieved message:", message.data);
    } 
    return ()=>socket.close();
  }, [])

  if(!socket) {
    return <div>
      Connecting to socket server....
    </div>
  }


  return <div>
    <input onChange={(e)=>setInput(()=>e.target.value)}></input>
    <button onClick={()=>socket.send(input)}>Click</button>
    {message}
  </div>
}

export default App
