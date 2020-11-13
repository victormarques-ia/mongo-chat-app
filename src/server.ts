import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { app } from './app';

import UserRepository from './repositories/UserRepository';
import Message from './models/Message';

require('dotenv/config');

mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.on("error", (err) => {
  console.log('❌ Mongoose Connection ERROR: ' + err.message);
});

mongoose.connection.once("open", () => {
  console.log('📦 MongoDB Connected!');
});

import('./models/User');
import('./models/Chatroom');

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`READY at port ${process.env.PORT || 8000}`);
});

const io = require('socket.io')(server, {
  cors:true,
  origins:['http://localhost:3000'],
 });

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {}
});

io.on('connection', (socket) => {
  console.log('Connected: ' + socket.userId);

  socket.on('disconnect', () => {
    console.log('Disconnected: ' + socket.userId);
  });

  socket.on('joinRoom', ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log('A user joined chatroom: ' + chatroomId);
  });

  socket.on('leaveRoom', ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log('A user left chatroom: ' + chatroomId);
  });

  socket.on('chatroomMessage', async ({ chatroomId, message}) => {
   if(message.trim().length > 0) {

     const user = await UserRepository.findUserById({ id: socket.userId })
     
     const newMessage = new Message({ chatroom: chatroomId, user: socket.userId, message });

    io.to(chatroomId).emit('newMessage', {
      message,
      name: user.name,
      userId: socket.userId
    });

   await newMessage.save();

   }
  });
});


