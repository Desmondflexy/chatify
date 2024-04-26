import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password?: string;
  displayName: string;
  picture: string;
  phone: string;
  ssoId: string;
  ssoProvider: string;
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
  },
  ssoId: {
    type: String,
  },
  ssoProvider: {
    type: String,
  },
}, {
  timestamps: true,
});

export const User = mongoose.model<IUser>('User', userSchema);
