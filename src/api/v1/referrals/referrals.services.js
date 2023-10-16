import { generate, charset as _charset } from 'referral-codes';

import { query, pool } from '../globals/configs/db.config.js';
import { createId, shortId } from '../globals/utils/uuid.util.js';
import { getUser } from '../user/user.services.js';
import {
  AuthenticationError,
  checkDatabaseError,
  NotFoundError,
  AppError
} from '../globals/utils/errors.util.js';
import { getCheckoutLink } from './referrals.utils.js';

async function getReferrers(campaignId) {
  const referrers = await query('SELECT * FROM referrer where campaign_id=$1', [
    campaignId
  ]);
  checkDatabaseError();
  console.log(referrers);
  return referrers;
}

async function getReferrerByCode(code) {
  const referrer = await query(
    'SELECT * FROM referrer where referral_code=$1',
    [code]
  );
  checkDatabaseError();
  console.log(referrer);
  return referrer;
}

async function createNewReferrer(campaignId, username, email) {
  const referrerId = createId();
  const [referralCode] = generate({
    length: 5,
    count: 1,
    charset: _charset('alphabetic')
  });
  console.log(referralCode);
  const newReferrer = await query(
    'INSERT INTO referrer(campaign_id, referrer_id, name, email, referral_code) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [campaignId, referrerId, username, email, referralCode]
  );
  checkDatabaseError();
  console.log(newReferrer);
  return newReferrer;
}

async function getReferred(id) {
  const referred = await query('SELECT * FROM referred where campaign_id=$1', [
    id
  ]);
  checkDatabaseError();
  console.log(referred);
  return referred;
}

async function getReferredById(id) {
  const referred = (
    await query('SELECT * FROM referred where referred_id=$1', [id])
  ).rows;
  checkDatabaseError();
  console.log(referred);
  return referred;
}

async function getReferredByEmail(email) {
  const referred = await query(
    'SELECT * FROM referred where referred_email=$1',
    [email]
  );
  checkDatabaseError();
  console.log(referred);
  return referred;
}

async function updateReferralCount(email) {
  const { referral_count: referralCount } = await query(
    `SELECT referral_count FROM referrer WHERE email=$1 `,
    [email]
  );
  checkDatabaseError();
  console.log(referralCount);
  const updateReferred = await query(
    `
      UPDATE referrer SET referral_count=$1,rewards_earned=$2 WHERE email=$3 RETURNING *;
    `,
    [referralCount + 1, referralCount + 1, email]
  );
  checkDatabaseError();
  return updateReferred;
}

async function createNewReferred(
  campaignId,
  username,
  email,
  amount,
  referralCode
) {
  const referredId = createId();
  const referrer = await getReferrerByCode(referralCode);
  if (referrer.length === 0) {
    throw new NotFoundError('referrer not found');
  }
  const date = new Date();
  const newReferred = await query(
    'INSERT INTO referred(referred_id, campaign_id, name, email,amount, date, referrer_code) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [referredId, campaignId, username, email, amount, date, referralCode]
  );
  checkDatabaseError();
  const body = {
    customer_email: email,
    customer_name: username,
    country: 'Nigeria',
    amount: parseInt(amount)
  };
  const checkoutLink = await getCheckoutLink(body);
  console.log(newReferred);
  return { newReferred, checkoutLink };
}
async function validateReferral(data) {
  if (data.event === 'transaction.new' && data.data.status === 'successful') {
    const referredEmail = data.data.customer_detail.email;
    const referred = getReferredByEmail(referredEmail);
    if (referred.verified == false) {
      const newReferred = await query(
        `
      UPDATE referred SET verified=$1 WHERE email=$2 RETURNING *;
    `,
        [true, referredEmail]
      );
    }
    const newReferrer = updateReferralCount(referredEmail);
    return { newReferrer, referred };
  }
}
export {
  getReferrers,
  getReferrerByCode,
  getReferred,
  getReferredById,
  createNewReferrer,
  createNewReferred,
  validateReferral
};
