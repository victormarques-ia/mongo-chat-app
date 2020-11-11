import mongoose from 'mongoose';
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


app.listen(process.env.PORT || 3001, () => {
  console.log(`READY at port ${process.env.PORT || 3001}`);
});


