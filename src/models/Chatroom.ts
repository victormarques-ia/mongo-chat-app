import mongoose, { Schema, Document } from 'mongoose';

export interface IChatroom extends Document {
  name: string;
}

const ChatroomSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: 'Name is required!',
    },
  },
);

export default mongoose.model<IChatroom> ('Chatroom', ChatroomSchema);