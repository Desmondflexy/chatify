import mongoose from 'mongoose';

export interface IChatRoom extends mongoose.Document {
  members: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[];
  name: string;
  description: string;
  picture: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: string;
}

const chatRoomShema = new mongoose.Schema<IChatRoom>({
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'User'
  },
  messages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Message'
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
}, {
  timestamps: true,
});

export const ChatRoom = mongoose.model<IChatRoom>('ChatRoom', chatRoomShema);
