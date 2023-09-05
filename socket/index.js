const io = require("socket.io")(8800, {
    cors: {
      origin: "http://localhost:3000",
    },
});
  
  
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers)
  });
  
  socket.on("send-message", (data) => {
    const sendUserSocket = onlineUsers.get(data.user);
    if (sendUserSocket) {
      console.log(sendUserSocket)
      io.to(sendUserSocket).emit("receive-message", data.msg);
      console.log(data.msg)
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

  socket.on("get-users", () => {
    let array = Array.from(onlineUsers.keys())
    console.log(array)
    socket.emit("send-users", array)
  })
});