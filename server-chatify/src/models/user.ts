import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  displayName: string;
  picture: string;
  phone: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;