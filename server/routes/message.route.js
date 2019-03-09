import { Router } from 'express';
import Auth from '../middleware/Auth';
import Validate from '../middleware/validate';

import MessageController from '../controllers/message.controller';

const { getUser } = Auth;

const { createMessage } = MessageController;

const { loginCheck } = Validate;

const messageRouter = Router();
// eslint-disable-next-line no-unused-vars
messageRouter.post('/', getUser, loginCheck, createMessage);

export default messageRouter;
