import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { app } from './app';

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
  origins:["http://localhost:3000"],
 });

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    console.log(payload);
    socket.userId = payload.id;
    next();
  } catch (err) {}
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });
});


