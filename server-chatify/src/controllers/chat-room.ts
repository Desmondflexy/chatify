import { ChatRoom } from "../models/chat-room";
import { Request, Response } from "express";
import { errorHandler } from "../utils/helpers";
import * as v from "../utils/joi-validators";
import mongoose from "mongoose";

export async function createChatRoom(req: Request, res: Response) {
  try {
    const { error, value } = v.createChatRoom.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    const ownerId = req.user.id;
    const chatRoom = await ChatRoom.create({
      ...value,
      createdBy: ownerId,
      members: [ownerId],
    });
    return res.status(201).json(chatRoom);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getChatRoomById(req: Request, res: Response) {
  try {
    const roomId = req.params.id;
    const room = await ChatRoom.findById(roomId);
    if (!room) {
      return res.status(404).json("Chat room not found!");
    }
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getChatRooms(req: Request, res: Response) {
  try {
    // add filter
    const filterKey = req.query.key as string;
    const filterValue = req.query.value as string;
    const rooms = await ChatRoom.find({ [filterKey]: filterValue }).select("-__v -updatedAt -messages");
    return res.status(200).json(rooms);
  } catch (error) {
    errorHandler(res, error);
  }
}

// join chat room
export async function joinChatRoom(req: Request, res: Response) {
  try {
    const roomId = req.params.id;
    const userId = req.user.id;

    const room = await ChatRoom.findById(roomId);
    if (!room) {
      return res.status(404).json("Chat room not found!");
    }

    const target = await ChatRoom.findOne({ members: userId });
    if (target) {
      return res.status(400).json("You are already a member of this chat room!");
    }

    room.members.push(new mongoose.Types.ObjectId(userId));
    await room.save();
    return res.status(200).json(room);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getChatRoom(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const room = await ChatRoom.findById(id).select("-__v -updatedAt -messages");
    if (!room) {
      return res.status(404).json("Chat room not found!");
    }
    return res.json({
      ...room.toJSON(),
      numberOfMembers: room.members.length,
    });
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getChatRoomMembers(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const room = await ChatRoom.findById(id).select("members").populate("members", "displayName email picture phone");
    if (!room) {
      return res.status(404).json("Chat room not found!");
    }
    return res.json(room.members);
  } catch (error) {
    errorHandler(res, error);
  }
}

export async function getChatRoomsByUserId(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const room = await ChatRoom.find({ members: userId });
    return res.json(room);
  } catch (error) {
    errorHandler(res, error);
  }
}
