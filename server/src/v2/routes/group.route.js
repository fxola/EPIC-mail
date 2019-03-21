import { Router } from 'express';
import Auth from '../middleware/Auth';

import GroupController from '../controllers/group.controller';

const { getUser } = Auth;

const { createGroup, getGroups } = GroupController;

const groupRouter = Router();

groupRouter.post('/', getUser, createGroup);
groupRouter.get('/', getUser, getGroups);

export default groupRouter;
