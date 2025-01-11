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
      console.log(`User ${userId} joined as: ${userType}`);
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
      if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId=(socketId, messageObject)=> {
  // console.log(`sending message to ${socketId}`,messageObject)
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket not found");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
