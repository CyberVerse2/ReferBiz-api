import { Router } from 'express';
import authRouter from './auth/auth.router.js';
import userRouter from './user/user.router.js';
import campaignRouter from './campaign/campaign.router.js';
import referralsRouter from './referrals/referrals.router.js';
import dashboardRouter from './dashboard/dashboard.router.js';
import appendObj from './globals/middlewares/appendObj.middlewares.js';

const api = Router();
api.use(appendObj);

api.use('/auth', authRouter);
api.use('/user', userRouter);
api.use('/campaign', campaignRouter);
api.use('/referrals', referralsRouter);
api.use('/dashboard', dashboardRouter);

export default api;
