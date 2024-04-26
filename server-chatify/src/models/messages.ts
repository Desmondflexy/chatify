import mongoose, {Types, Schema} from 'mongoose';

export interface IMessage extends mongoose.Document {
  text: string;
  senderId: string;
  receiverId: string;
}

const chatSchema = new Schema<IMessage>({
  text: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
    ref: "User"
  },
  receiverId: {
    type: String,
    required: true,
    ref: "User"
  }
}, {
  timestamps: true,
});

export const Message = mongoose.model<IMessage>('Message', chatSchema);
