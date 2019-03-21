import { Router } from 'express';
import Auth from '../middleware/Auth';

import GroupController from '../controllers/group.controller';

const { getUser } = Auth;

const { createMessage, retractMessage, readMessage, fetchMessages } = MessageController;

const { loginCheck, messageCheck } = Validate;

const messageRouter = Router();

messageRouter.post('/', getUser, loginCheck, messageCheck, createMessage);
messageRouter.get('/', getUser, loginCheck, fetchMessages);
messageRouter.get('/sent', getUser, loginCheck, fetchMessages);
messageRouter.get('/unread', getUser, loginCheck, fetchMessages);
messageRouter.get('/:id', getUser, loginCheck, readMessage);
messageRouter.delete('/:id', getUser, loginCheck, retractMessage);
