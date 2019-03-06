import { Router } from 'express';
import Validation from '../middleware/validate';

import UserController from '../controllers/user.controller';

const userRouter = Router();

userRouter.use(Validation.check);

userRouter.post('/', UserController.createUser);

export default userRouter;
