import asyncHandler from 'express-async-handler';

import {
  getCampaigns,
  getCampaignById,
  createCampaign,
  deleteCampaign
} from './campaign.services.js';
import {
  NotFoundError,
  AuthenticationError,
  AppError,
  FormError
} from '../globals/utils/errors.util.js';

const httpGetCampaign = asyncHandler(async (req, res) => {
  const { userId } = req;
  if (!userId) {
    throw new AuthenticationError('Your token has expired. Please login again');
  }
  const currentCampaign = await getCampaigns(userId);
  console.log(currentCampaign);
  return res
    .status(200)
    .json({
      message: 'Campaigns retrieved succesfully',
      data: currentCampaign
    });
});

const httpGetCampaignById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new FormError('Campaign Id required');
  }
  const campaignById = await getCampaignById(id);
  console.log(campaignById);
  return res
    .status(200)
    .json({ message: 'Campaign retrieved succesfully', data: campaignById });
});

const httpCreateCampaign = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { name, description, campaignLink, paymentLink } = req.body;
  if (!(name, description, campaignLink, paymentLink)) {
    throw new FormError('Some details are missing in the Create Campaign form');
  }
  const newCampaign = await createCampaign(
    userId,
    name,
    description,
    campaignLink,
    paymentLink
  );
  return res
    .status(200)
    .json({ message: 'Campaign Created Succesfully', newCampaign });
});

const httpDeleteCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new FormError('Campaign Id required');
  }
  const deletedCampaign = await deleteCampaign(id);
  console.log(deletedCampaign);
  return res.status(200).json({
    message: 'Campaign Deleted Successfully',
    data: deletedCampaign
  });
});

export {
  httpGetCampaign,
  httpGetCampaignById,
  httpCreateCampaign,
  httpDeleteCampaign
};

// CREATE TABLE campaigns (
//     campaign_id VARCHAR(255) NOT NULL PRIMARY KEY,
//     owner_id VARCHAR(255) REFERENCES campaign_owners(owner_id),
//     campaign_name TEXT NOT NULL,
//     campaign_description TEXT,
//     start_date TIMESTAMP,
//     end_date TIMESTAMP,
//     reward_details TEXT
// );
