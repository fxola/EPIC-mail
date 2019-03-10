import { Router } from 'express';
import Auth from '../middleware/Auth';
import Validate from '../middleware/validate';

import MessageController from '../controllers/message.controller';

const { getUser } = Auth;

const {
  createMessage,
  retractMessage,
  readMessage,
  fetchSentMessages,
  fetchAllMessages,
  fetchAllUnreadMessages
} = MessageController;

const { loginCheck, messageCheck } = Validate;

const messageRouter = Router();

messageRouter.post('/', getUser, loginCheck, messageCheck, createMessage);
messageRouter.get('/', getUser, loginCheck, fetchAllMessages);
messageRouter.get('/sent', getUser, loginCheck, fetchSentMessages);
messageRouter.get('/unread', getUser, loginCheck, fetchAllUnreadMessages);
messageRouter.get('/:id', getUser, loginCheck, readMessage);
messageRouter.delete('/:id', getUser, loginCheck, retractMessage);

export default messageRouter;
