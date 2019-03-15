import { Router } from 'express';
import Validation from '../middleware/validation';

import UserController from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/signup', Validation.check, UserController.createUser);
userRouter.post('/login', Validation.loginCheck, UserController.logUserIn);

export default userRouter;
