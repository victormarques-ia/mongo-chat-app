import mongoose, { Schema, Document } from 'mongoose';
import { IChatroom } from './Chatroom'
import { IUser } from './User'

export interface IMessage extends Document {
  message: string;
  chatroom: IChatroom;
  user: IUser;
}

const MessageSchema: Schema = new Schema(
  {
    chatroom: {
      type: Schema.Types.ObjectId,
      required: 'Chatroom is required!',
      ref: 'Chatroom'
    },
    user: {
      type: Schema.Types.ObjectId,
      required: 'User is required!',
      ref: 'User'
    },
    message: {
      type: String,
      required: 'Message is required!',
    },
  },
);

export default mongoose.model<IMessage> ('Message', MessageSchema);