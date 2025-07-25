const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const users = {}; // { socketId: username }
// { messageId: { reactionType: Set(userId) } }
const messageReactions = {};

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("new user", ({ username }) => {
    users[socket.id] = username;
    io.emit("system message", `🟢 ${username} joined`);
    io.emit("user list", Object.values(users));
  });

  socket.on("chat message", (msg) => {
    const username = users[socket.id];
    if (!username) return; // Guard
    io.emit("chat message", {
      id: socket.id,
      username,
      text: msg.text,
      time: new Date().toISOString(),
    });
  });

  // Reaction event
  socket.on("reaction", ({ messageId, reaction, remove }) => {
    if (!messageId || !reaction) return;
    if (!messageReactions[messageId]) messageReactions[messageId] = {};
    if (remove) {
      // Remove this user's reaction for this emoji
      if (messageReactions[messageId][reaction]) {
        messageReactions[messageId][reaction].delete(socket.id);
      }
    } else {
      // Remove this user's previous reaction for this message
      for (const r in messageReactions[messageId]) {
        messageReactions[messageId][r].delete(socket.id);
      }
      // Add this user's new reaction
      if (!messageReactions[messageId][reaction]) messageReactions[messageId][reaction] = new Set();
      messageReactions[messageId][reaction].add(socket.id);
    }
    // Prepare plain object for emit
    const reactionCounts = {};
    for (const r in messageReactions[messageId]) {
      reactionCounts[r] = Array.from(messageReactions[messageId][r]);
    }
    io.emit("reaction update", { messageId, reactions: reactionCounts });
  });

  socket.on("edit name", ({ username: newName }) => {
    if (!newName || typeof newName !== "string") return;
    const oldName = users[socket.id] || "Anonymous";
    users[socket.id] = newName.trim();
    io.emit("system message", `✏️ ${oldName} is now ${newName}`);
    io.emit("update name", { id: socket.id, newName });
    io.emit("user list", Object.values(users));
  });

  // Typing indicator events
  socket.on("typing", () => {
    const user = users[socket.id];
    if (!user) return;
    const username = user || "Someone";
    socket.broadcast.emit("typing", { username });
  });
  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing");
  });

  socket.on("disconnect", () => {
    const user = users[socket.id] || "Unknown";
    delete users[socket.id];
    io.emit("system message", `❌ ${user} left`);
    io.emit("user list", Object.values(users));
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});