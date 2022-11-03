const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const os = require("os-utils");

const io = new Server(server, {
  transports: ["websocket", "polling"],
});

let tick = 0;
// 1. listen for socket connections
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  setInterval(() => {
    // 2. every second, emit a 'cpu' event to user
    os.cpuUsage((cpuPercent) => {
      socket.emit("cpu", {
        name: tick++,
        value: cpuPercent,
      });
    });
  }, 1000);
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
