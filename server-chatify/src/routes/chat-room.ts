import express from 'express';
import authenticate from '../middleware/authentication';
import * as room from '../controllers/chat-room';

const router = express.Router();

router.post('/', authenticate, room.createChatRoom);
router.post('/:id/join', authenticate, room.joinChatRoom);
router.get('/:id', authenticate, room.getChatRoom);
router.get('/:id/members', authenticate, room.getChatRoomMembers);
router.get('/', authenticate, room.getChatRooms);

export default router;