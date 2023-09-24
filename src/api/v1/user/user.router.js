import { Router } from 'express';

import {
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser
} from './user.controllers.js';
import authenticateUser from '../globals/middlewares/authenticateUser.middleware.js';
import validateData from '../globals/middlewares/validation.middleware.js';
import userSchema from './user.validation.js';

const userRouter = Router();

userRouter.use(authenticateUser);

userRouter.post('/', httpGetUser);
userRouter.put(
  '/update',
  (req, res, next) => validateData(userSchema, req, res, next),
  httpUpdateUser
);
userRouter.delete('/delete', httpDeleteUser);

export default userRouter;
