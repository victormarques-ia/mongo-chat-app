import mongoose, { Schema, Document } from 'mongoose';
import { IConversation } from './Conversation'
import { IUser } from './User'

export interface IMessage extends Document {
  message: string;
  conversation: IConversation;
  user: IUser;
}

const MessageSchema: Schema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      required: 'Conversation is required!',
      ref: 'Conversation'
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