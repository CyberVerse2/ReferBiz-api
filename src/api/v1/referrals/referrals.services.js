const referralCodes = require("referral-codes");

const { query, pool } = require("../globals/configs/db.config");
const createId = require("../globals/utils/uuid.util");
const {
  AuthenticationError,
  checkDatabaseError,
  NotFoundError,
  AppError,
} = require("../globals/utils/errors.util");

async function getReferrers() {
  const referrers = (await pool.query("SELECT * FROM referrer")).rows;
  checkDatabaseError();
  console.log(referrers);
  return referrers;
}

async function createNewReferrer(username, email) {
  const referrers = await getReferrers();
  if (!referrers.length===0) {
    throw new NotFoundError("referrer not found");
  }
  const userId = await createId();
  const [referralCode] = referralCodes.generate({
    length: 5,
    count: 1,
    charset: referralCodes.charset("alphabetic"),
  });
  console.log(referralCode);
  const newReferrer = await query(
    "INSERT INTO referrer(user_id, name, email, referral_code) VALUES($1, $2, $3, $4) RETURNING *",
    [userId, username, email, referralCode]
  );

  checkDatabaseError();
  console.log(newReferrer);
  return newReferrer;
}

module.exports = {
  getReferrers,
  createNewReferrer,
};
