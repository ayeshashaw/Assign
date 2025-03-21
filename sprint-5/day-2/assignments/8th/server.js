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
  console.log("A user connected:", socket.id);

  // Handle user joining a room
  socket.on("join room", ({ username, room }) => {
    socket.join(room);
    socket.username = username;
    socket.room = room;

    // Notify others in the room
    socket.to(room).emit("message", `${username} has joined the room.`);
  });

  // Handle chat messages in a room
  socket.on("chat message", (msg) => {
    if (socket.room) {
      io.to(socket.room).emit("message", `${socket.username}: ${msg}`);
    }
  });

  // Handle private messages
  socket.on("private message", ({ recipientId, message }) => {
    io.to(recipientId).emit("private message", {
      sender: socket.username,
      message,
    });
  });

  // Handle user disconnecting
  socket.on("disconnect", () => {
    if (socket.room) {
      io.to(socket.room).emit("message", `${socket.username} has left the room.`);
    }
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
