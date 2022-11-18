const express = require('express')
const User = require('../models/userModel.js')
const app = express();
const jwt = require('jsonwebtoken')
const http = require('http')
const dotenv = require('dotenv')
const cors = require('cors')
const {Server} = require('socket.io')
app.use(cors());

dotenv.config()

const server = http.createServer(app)

const findUser = async (id) => {
  const {data} = await User.findById(id).select('-password')
  return data;
}

const connectSocket = () => {
    const io = new Server(server,{
        cors:{
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });

    io.use(async (socket,next) => {
      const token = socket.handshake.auth.token;
      if(!token){
        return next(new Error("invalid token"))
      }else{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password')

        if(!user._id){
          return next(new Error("invalid user"));
        }else{
           socket.username = user.name;
           socket.userId = user._id;
           next();
        }
      } 
      
    })
    
    io.on("connection", (socket) => {
        // console.log(`User Connected: ${socket.id}`);
      
        socket.on("join_room", (data) => {
          socket.join(data);
          console.log(`User with ID: ${socket.id} joined room: ${data}`);
        });
      
        socket.on("send_message", (data) => {
          socket.to(data.room).emit("receive_message", data);
        });
      
        socket.on("disconnect", () => {
          // console.log("User Disconnected", socket.id);
        });
      });
      
      server.listen(process.env.SOCKET_PORT, () => {
        console.log(`Web Socket-Server running on Port ${process.env.SOCKET_PORT}`);
      });
}


module.exports = connectSocket

