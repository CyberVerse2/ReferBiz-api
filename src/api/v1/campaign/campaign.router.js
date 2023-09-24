import { Router } from 'express';
import {
  httpGetCampaign,
  httpGetCampaignById,
  httpCreateCampaign,
  httpDeleteCampaign
} from './campaign.controllers.js';
import authenticateUser from '../globals/middlewares/authenticateUser.middleware.js';
import validateData from '../globals/middlewares/validation.middleware.js';
import campaignSchema from './campaign.validation.js';

const campaignRouter = Router();

campaignRouter.use(authenticateUser);

campaignRouter.get('/', httpGetCampaign);
campaignRouter.get('/:id', httpGetCampaignById);
campaignRouter.post(
  '/new',
  (req, res, next) => validateData(campaignSchema, req, res, next),
  httpCreateCampaign
);
// campaignRouter.post(
//   '/update',
//   () => validateData(campaignSchema),
//   httpUpdateCampaign
// );
campaignRouter.delete('/delete/:id', httpDeleteCampaign);

export default campaignRouter;
