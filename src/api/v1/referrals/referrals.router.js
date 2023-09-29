import { Router } from 'express';

import {
  httpCreateNewReferrer,
  httpGetReferrers,
  httpGetReferrerByCode,
  httpCreateNewReferred,
  httpGetReferred,
  httpGetReferredById
} from './referrals.controllers.js';
import authenticateUser from '../globals/middlewares/authenticateUser.middleware.js';

const referralsRouter = Router();


// referralsRouter.post("/", httpGetReferrals);
// referralsRouter.delete("/createReferral", httpCreateReferrals);

referralsRouter.post('/referrers',authenticateUser, httpGetReferrers);
referralsRouter.get('/referrers/:code', httpGetReferrerByCode);

referralsRouter.post('/referred',authenticateUser, httpGetReferred);
referralsRouter.get('/referred/:id',authenticateUser, httpGetReferredById);

referralsRouter.post('/createReferrer', httpCreateNewReferrer);
referralsRouter.post('/createReferred', httpCreateNewReferred);

export default referralsRouter;
