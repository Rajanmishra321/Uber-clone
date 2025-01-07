const socketIo = require("socket.io");
const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model"); 
let io;

function initializeSocket(server) {
  // console.log(io)
  // console.log('hi')
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      if (userType === "user") {
         await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
        if (userType === "captain") {
            await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("Socket not found");
  }
}

module.exports = {
  initializeSocket,
  //   sendMessageToSocketId,
};
