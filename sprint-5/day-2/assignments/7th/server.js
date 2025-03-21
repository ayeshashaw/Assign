const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for chat messages and broadcast them
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  // Handle typing event
  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });

  // Handle stop typing event
  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
