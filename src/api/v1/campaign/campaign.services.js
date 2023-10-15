import axios from 'axios';
import {
  AuthenticationError,
  checkDatabaseError,
  NotFoundError,
  AppError,
  FormError
} from '../globals/utils/errors.util.js';
import { query, pool } from '../globals/configs/db.config.js';
import { createId, shortId } from '../globals/utils/uuid.util.js';
import { createPaymentLink } from './campaign.utils.js';
import { getUser } from '../user/user.services.js';

async function getCampaigns(id) {
  const campaigns = await query('SELECT * FROM campaigns WHERE owner_id=$1', [
    id
  ]);
  checkDatabaseError();
  if (!campaigns) return 'No campaigns have been created yet';
  console.log(campaigns);
  return campaigns;
}

async function getCampaignById(id) {
  const campaigns = await query(
    'SELECT * FROM campaigns WHERE campaign_id=$1',
    [id]
  );
  checkDatabaseError();
  if (!campaigns) throw new NotFoundError('This campaign does not exist');
  console.log(campaigns);
  return campaigns;
}

async function createCampaign(
  userId,
  name,
  description,
  campaignLink,
  paymentLink
) {
  const currentUser = await getUser(userId);
  if (!currentUser) throw new NotFoundError('User details not found');

  const campaignId = shortId();
  // const paymentLink = await createPaymentLink(
  //   userId,
  //   `${currentUser.owner_name}`
  // );

  if (!paymentLink) throw new AppError('Provide a payment link');

  const newCampaign = await query(
    `INSERT INTO campaigns(campaign_id, owner_id, campaign_name, campaign_description, reward_details, payment_link, campaign_link) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [campaignId, userId, name, description, 'cash', paymentLink, campaignLink]
  );

  checkDatabaseError();

  console.log(newCampaign);
  return newCampaign;
}

async function deleteCampaign(id) {
  if (!id) {
    throw new FormError('Provide a campaign Id');
  }
  const deletedCampaign = await query(
    'DELETE FROM campaigns WHERE campaign_id=$1 RETURNING *',
    [id]
  );
  checkDatabaseError();
  if (!deletedCampaign) throw new NotFoundError(`Campaign doesn't exist`);
  return deletedCampaign;
}

export { getCampaigns, getCampaignById, createCampaign, deleteCampaign };
