const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello chat roulette!");
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log("join-room " + roomId + " as user " + userId);
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    // socket.on("disconnect", () => {
    //   console.log("User " + userId + " disconnected");
    //   socket.to(roomId).broadcast.emit("user-disconnected", userId);
    // });
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});