const express = require("express")
const http = require("http")
const socketIo = require("socket.io")

const port = process.env.PORT || 4001
const index = require("./routes/index")

const app = express()
app.use(index)

const server = http.createServer(app)
const io = socketIo(server)

//channel between client and server

//backend server socket.io
let interval
io.on("connection", (socket) => {
  console.log("New Client connected")
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(
    () => getApiAndEmit(socket),
    socket.on("disconnect", () => {
      console.log("Client disconnected")
      clearInterval(interval)
    })
  )
})

//For Client
const getApiAndEmit = (socket) => {
  const response = new Date()
  socket.emit("FromAPI", response)
}

//listen for incoming connections
server.listen(port, () => console.log(`Listening on port ${port}`))
