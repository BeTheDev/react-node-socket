import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"
const ENDPOINT = "http://127.0.0.01:4001"

function App() {
  const [response, setResponse] = useState("")
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on("FromAPI", (data) => {
      setResponse(data)
    })
    //Clean Up
    return () => socket.disconnect()
  }, [])
  return (
    <p>
      It's <time dataTime={response}>{response}</time>
    </p>
  )
}

export default App
