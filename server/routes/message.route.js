import { Router } from 'express';
import Auth from '../middleware/Auth';
import Validate from '../middleware/validate';

import MessageController from '../controllers/message.controller';

const { getUser } = Auth;

const { createMessage, retractMessage } = MessageController;

const { loginCheck, messageCheck } = Validate;

const messageRouter = Router();

messageRouter.post('/', getUser, loginCheck, messageCheck, createMessage);
messageRouter.delete('/:id', retractMessage);

export default messageRouter;
