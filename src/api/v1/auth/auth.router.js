import { Router } from 'express';

import { httpCreateNewUser, httpLoginUser } from './auth.controllers.js';
import validateData from '../globals/middlewares/validation.middleware.js';
import authSchema from './auth.validation.js';

const authRouter = Router();

authRouter.use((req, res, next) => validateData(authSchema, req, res, next));

authRouter.post('/signup', httpCreateNewUser);
authRouter.post('/login', httpLoginUser);

export default authRouter;
