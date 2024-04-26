import mongoose from 'mongoose';

export interface IChat extends mongoose.Document {
  messagesId: string[];
  membersId: string[]
}

const chatSchema = new mongoose.Schema<IChat>({
  messagesId: {
    type: [String],
    required: true,
    ref: "Messages"
  },
  membersId: {
    type: [String],
    required: true,
    ref: "Users"
  }
}, {
  timestamps: true,
});

export const Chat = mongoose.model<IChat>('Chat', chatSchema);
