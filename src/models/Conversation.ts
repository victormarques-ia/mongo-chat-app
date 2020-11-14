import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IConversation extends Document {
  users: IUser[];
}

const ConversationSchema: Schema = new Schema(
  {
    users: [{
      type: Schema.Types.ObjectId,
      required: 'User is required!',
      ref: 'User'
    }],
  },
);

export default mongoose.model<IConversation> ('Conversation', ConversationSchema);