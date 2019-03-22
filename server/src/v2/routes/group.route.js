import { Router } from 'express';
import Auth from '../middleware/Auth';

import GroupController from '../controllers/group.controller';

const { getUser } = Auth;

const { createGroup, getGroups, updateGroup, deleteGroup } = GroupController;

const groupRouter = Router();

groupRouter.post('/', getUser, createGroup);
groupRouter.get('/', getUser, getGroups);
groupRouter.patch('/:groupId/:name', getUser, updateGroup);
groupRouter.delete('/:id', getUser, deleteGroup);

export default groupRouter;
