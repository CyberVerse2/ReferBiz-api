const asyncHandler = require('express-async-handler');

const {
  getCampaigns,
  createCampaign,
  deleteCampaign
} = require('./campaign.services');
const {
  NotFoundError,
  AuthenticationError,
  AppError,
  FormError
} = require('../globals/utils/errors.util');

const httpGetCampaign = asyncHandler(async (req, res) => {
  const { userId } = req;
  if (!userId) {
    throw new AuthenticationError('Your token has expired. Please login again');
  }
  const currentCampaign = await getCampaigns(userId);
  console.log(currentCampaign);
  return res.status(200).json(currentCampaign);
});

const httpCreateCampaign = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { name, description, campaignLink, paystackPaymentLink } = req.body;
  if (!(name, description, campaignLink)) {
    throw new FormError('Some details are missing in the form');
  }
  const newCampaign = await createCampaign(
    userId,
    name,
    description,
    campaignLink,
    paystackPaymentLink
  );
  return res.status(200).json(newCampaign);
});

const httpDeleteCampaign = asyncHandler(async (req, res) => {
  const { userId } = req;
  if (!userId) {
    throw new NotFoundError('Your token has expired. Please login again');
  }
  const deletedCampaign = await deleteCampaign(userId);
  console.log(deletedCampaign);
  return res.status(200).json({
    success: true,
    message: 'Campaign Deleted Successfully',
    deletedCampaign
  });
});

module.exports = {
  httpGetCampaign,
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
