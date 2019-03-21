import { Router } from 'express';
import Auth from '../middleware/Auth';

import GroupController from '../controllers/group.controller';

const { getUser } = Auth;

const { createGroup } = GroupController;

const groupRouter = Router();

groupRouter.post('/', getUser, createGroup);

export default groupRouter;
