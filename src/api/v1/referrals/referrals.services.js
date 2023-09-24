import { generate, charset as _charset } from 'referral-codes';

import { query, pool } from '../globals/configs/db.config.js';
import { createId } from '../globals/utils/uuid.util.js';
import { getUser } from '../user/user.services.js';
import {
  AuthenticationError,
  checkDatabaseError,
  NotFoundError,
  AppError
} from '../globals/utils/errors.util.js';
import getReferrerCode from './referrrals.utils.js';

async function getReferrers() {
  const referrers = (await pool.query('SELECT * FROM referrer')).rows;
  checkDatabaseError();
  console.log(referrers);
  return referrers;
}

async function createNewReferrer(username, email) {
  const referrers = await getReferrers();
  // if (!referrers.length===0) {
  //   throw new NotFoundError("referrer not found");
  // }
  const userId = await createId();
  const [referralCode] = generate({
    length: 5,
    count: 1,
    charset: _charset('alphabetic')
  });
  console.log(referralCode);
  const newReferrer = await query(
    'INSERT INTO referrer(user_id, name, email, referral_code) VALUES($1, $2, $3, $4) RETURNING *',
    [userId, username, email, referralCode]
  );

  checkDatabaseError();
  console.log(newReferrer);
  return newReferrer;
}

async function getReferred() {
  const referred = (await pool.query('SELECT * FROM referred')).rows;
  checkDatabaseError();
  console.log(referred);
  return referred;
}

async function updateReferralCount(referralCode) {
  const { referral_count: referralCount } = await query(
    `SELECT referral_count FROM referrer WHERE referral_code = $1 `,
    [referralCode]
  );
  console.log(referralCount);
  const updateReferred = await query(
    `
      UPDATE referrer SET referral_count=$1,rewards_earned=$2 WHERE referral_code=$3 RETURNING *;
    `,
    [referralCount + 1, referralCount + 1, referralCode]
  );
  checkDatabaseError();
  return updateReferred;
}

async function createNewReferred(ownerId, username, email) {
  const currentUser = await getUser(ownerId);
  if (!currentUser) throw new NotFoundError('User details not found');
  const referrerCode = await getReferrerCode(ownerId);
  const referrers = await getReferrers();
  if (!referrers.length === 0) {
    throw new NotFoundError('referrer not found');
  }
  // const userId = await createId();
  const newReferred = await query(
    'INSERT INTO referred(name, email, referrer_code) VALUES($1, $2, $3) RETURNING *',
    [username, email, referrerCode]
  );
  const newReferrer = await updateReferralCount(referrerCode);
  console.log(newReferrer);
  checkDatabaseError();
  // console.log(newReferrer);
  return newReferred;
}

export {
  getReferrers,
  getReferred,
  createNewReferrer,
  createNewReferred
};
