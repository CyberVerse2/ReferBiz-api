const referralCodes = require('referral-codes')

const { query, pool } = require("../globals/configs/db.config");
const { NotFoundError } = require("../globals/utils/errors.util");

async function getReferrers(id) {
  const referrers = await pool.query("SELECT * FROM referrer");
  checkDatabaseError();
  console.log(referrers);
  return referrers;
}

async function createNewReferrer( username, email) {
  const user = await getReferrers();
  if (!user) {
    throw new NotFoundError("referrer not found");
  }
  const userId = await createId();
  const referralCode = referralCodes.generate({
    length: 5,
    count: 1,
    charset: referralCodes.charset("alphabetic"),
  });
  console.log(referralCode)
  const newReferrer = await query(
    "INSERT INTO referrer(user_id, name, email, referral_code) VALUES($1, $2, $3, 4) RETURNING *",
    [userId, username, email, referralCode]
  );

  checkDatabaseError();
  console.log(newReferrer);
  return newReferrer;
}

module.exports = {
  getReferrers, 
  createNewReferrer
}