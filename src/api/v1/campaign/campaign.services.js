const axios = require("axios");
const {
  AuthenticationError,
  checkDatabaseError,
  NotFoundError,
  AppError,
} = require("../globals/utils/errors.util");
const { query, pool } = require("../globals/configs/db.config");
const createId = require("../globals/utils/uuid.util");
const { createPaymentLink } = require("./campaign.utils");
const { getUser } = require("../user/user.services");

async function getCampaigns(id) {
  const campaigns = await query("SELECT * FROM campaigns WHERE owner_id=$1", [
    id,
  ]);
  checkDatabaseError();
  console.log(campaigns);
  return campaigns;
}

async function createCampaign(userId, name, description, campaignLink) {
  const currentUser = await getUser(userId);
  if (!currentUser) throw new NotFoundError("User details not found");

  const campaignId = await createId();
  const paymentLink = await createPaymentLink(
    userId,
    `${currentUser.owner_name}`
  );

  if (!paymentLink) throw new AppError("Payment link generation failed");

  const newCampaign = await query(
    `INSERT INTO campaigns(campaign_id, owner_id, campaign_name, campaign_description, reward_details, paystack_payment_link, campaign_link) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [campaignId, userId, name, description, "cash", paymentLink, campaignLink]
  );

  checkDatabaseError();

  console.log(newCampaign);
  return newCampaign;
}

async function deleteCampaign(id) {
  if (!id) {
    throw new AppError("Provide an Id");
  }
  const deletedCampaign = await query(
    "DELETE FROM campaigns WHERE owner_id=$1 RETURNING *",
    [id]
  );
  if (!deletedCampaign) throw new AppError("Campaign doesnt exist");
  checkDatabaseError();
  return deletedCampaign;
}

module.exports = {
  getCampaigns,
  createCampaign,
  deleteCampaign,
};
