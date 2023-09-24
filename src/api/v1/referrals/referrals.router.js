import { Router } from 'express';

import {
  httpCreateNewReferrer,
  httpGetReferrers,
  httpCreateNewReferred,
  httpGetReferred
} from './referrals.controllers.js';
import authenticateUser from '../globals/middlewares/authenticateUser.middleware.js';

const referralsRouter = Router();

referralsRouter.use(authenticateUser);

// referralsRouter.post("/", httpGetReferrals);
// referralsRouter.delete("/createReferral", httpCreateReferrals);
referralsRouter.post('/referrers', httpGetReferrers);
referralsRouter.post('/createReferrer', httpCreateNewReferrer);
referralsRouter.post('/referred', httpGetReferred);
referralsRouter.post('/createReferred', httpCreateNewReferred);

export default referralsRouter;
