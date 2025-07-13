const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const users = {}; 

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("new user", (username) => {
    users[socket.id] = username;
    io.emit("system message", `🟢 ${username} joined`);
    io.emit("user list", users);
  });

  socket.on("chat message", (msg) => {
    const username = users[socket.id];
    if (!username) return; // Guard
    io.emit("chat message", {
      id: socket.id,
      username,
      text: msg.text,
    });
  });

  socket.on("edit name", (newName) => {
    if (!newName || typeof newName !== "string") return;
    const oldName = users[socket.id] || "Anonymous";
    users[socket.id] = newName.trim();
    io.emit("system message", `✏️ ${oldName} is now ${newName}`);
    io.emit("update name", { id: socket.id, newName });
    io.emit("user list", users);
  });

  socket.on("disconnect", () => {
    const user = users[socket.id] || "Unknown";
    delete users[socket.id];
    io.emit("system message", `❌ ${user} left`);
    io.emit("user list", users);
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});