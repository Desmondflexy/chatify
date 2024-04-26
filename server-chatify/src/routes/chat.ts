import express from 'express';
import * as chat from '../controllers/chat';
import authenticate from '../middleware/authentication';

const router = express.Router();

router.post('/', authenticate, chat.startChat)

export default router;
