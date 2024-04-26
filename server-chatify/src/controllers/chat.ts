import { Response, Request } from "express";
import { Chat } from "../models/chat";
import { errorHandler } from "../utils/helpers";
import { User } from "../models/user";
import { Message } from "../models/messages";

// start a new chat

export async function startChat(req: Request, res: Response) {
  try {
    const friendId = req.query.id as string;
    const { text } = req.body;
    if (!friendId || !text) return res.status(400).json("One or more inputs are missing");
    const userId = req.user.id;
    const friend = await User.findOne({ email: friendId });
    if (!friend) return res.status(404).json("Not found");
    const newMessage = new Message({ text, sender: userId, receiver: friend.id });
    const newChat = new Chat({
      messages: [newMessage.id],
      members: [userId, friend.id],
    });
    await newChat.save();
    await newMessage.save();
    return res.json({
      chat: newChat,
      message: newMessage
    })
  } catch (error) {
    return errorHandler(res, error);
  }
}
