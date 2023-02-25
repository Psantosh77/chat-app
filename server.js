const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("message", (message) =>{
       socket.broadcast.emit("message", message)
    })
  });


server.listen(3000, () => {
  console.log("listening on *:3000");
});

// Socket
