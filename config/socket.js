const express = require('express')
const app = express();
const http = require('http')
const dotenv = require('dotenv')
const cors = require('cors')
const {Server} = require('socket.io')
app.use(cors());

dotenv.config()

const server = http.createServer(app)

const connectSocket = () => {
    const io = new Server(server,{
        cors:{
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });
    
    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
      
        socket.on("join_room", (data) => {
          socket.join(data);
          console.log(`User with ID: ${socket.id} joined room: ${data}`);
        });
      
        socket.on("send_message", (data) => {
          socket.to(data.room).emit("receive_message", data);
        });
      
        socket.on("disconnect", () => {
          console.log("User Disconnected", socket.id);
        });
      });
      
      server.listen(process.env.SOCKET_PORT, () => {
        console.log(`Web Socket-Server running on Port ${process.env.SOCKET_PORT}`);
      });
}


module.exports = connectSocket

