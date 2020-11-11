import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: 'Name is required!',
    },
    email: {
      type: String,
      required: 'Email is required!',
    },
    password: {
      type: String,
      required: 'Password is required!',
    },
  },

  {
    timestamps: true,
  }

);

export default mongoose.model<IUser> ('User', UserSchema);