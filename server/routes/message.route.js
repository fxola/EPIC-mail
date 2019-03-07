import { Router } from 'express';
import MessageController from '../controllers/message.controller';

import Auth from '../middleware/Auth';

const messageRouter = Router();

messageRouter.post('/', Auth.getUser, MessageController.createUser);

export default messageRouter;
