//requirements
// amount of money recieved-
// amount of money paid out-done
// number of referrals-done
// number of referred-done
// referral activity = referredName+paid+using+referrerName+amountPaidByReferred
const { DateTime } = require("luxon");
const { getCampaigns } = require("../campaign/campaign.services");
const { checkDatabaseError } = require("../globals/utils/errors.util");
const { query, pool } = require("../globals/configs/db.config");
const {
  getReferrers,
  getReferred,
} = require("../referrals/referrals.services");
//referral activity=referral link generated by +referrerName
async function getDashboard(userId) {
  if (!userId) throw new AppError("Provide an Id");
  const referralsCount = (await getReferred()).length;
  const linksCount = (await getReferrers()).length;
  const amount = await getCampaigns(userId);
  const referrerAmount = amount.referrer_amount;
  const amountPaid = referrerAmount * referralsCount;
  const sortedReferred = await (
    await pool.query("SELECT * FROM referred ORDER BY date DESC")
  ).rows;
  const sortReferred = sortedReferred.map(async (referred) => {
    const referrer = await pool.query(
      "SELECT *FROM referrer WHERE referral_code=$1 ORDER BY date DESC",
      [referred.referrer_code]
    ).rows;
    console.log(referrer);
    const nameAndDateAndReferrerCode = [
      referred.name,
      referred.date.toLocaleString(),
      referred.referrer_code,
      referrer,
    ];
    return nameAndDateAndReferrerCode;
  });
    const [referralCode] = referralCodes.generate({
      length: 5,
      count: 1,
      charset: referralCodes.charset("alphabetic"),
    });
    console.log(referralCode);
  // const sortedReferrers = await (
  //   await pool.query("SELECT * FROM referrer ORDER BY date DESC")
  // ).rows;
  // const sortReferrers = sortedReferrers.map((referrers) => {
  //   const nameandReferralCode = [referrers.name, referrers.referral_code];
  //   return nameandReferralCode;
  // });
  // const indexReferred = sortReferred.map((referred, index) => {
  //   return referred;
  // });
  // const indexReferrers = sortReferrers.map((referrers, index) => {
  //   return referrers;
  // });
  // console.log(indexReferred);
  // console.log(indexReferrers);
  // const referralActivity = [sortReferred, sortReferrers];
  // const activity = referralActivity.map((r) => r);
  // function sortReferralActivity() {
  //   referralActivity.map((row) => {
  //     console.log(row)
  //     console.log('---------------------')
  //     row.map((x) => {
  //       console.log(x, 'shege')
  //     })
  //   })
  // }
  // sortReferralActivity()
  // console.log(referralActivity)

  const data = {
    // referralsCount,
    linksCount,
    amountPaid,
    sortReferred,
    amount,
    referralCode
    // indexReferrers,
    // referralActivity,
    // activity
  };

  checkDatabaseError();
  return data;
}

module.exports = { getDashboard };
