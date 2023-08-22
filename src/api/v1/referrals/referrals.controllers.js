const asyncHandler = require("express-async-handler");

const { createNewReferrer, getReferrers } = require("./referrals.services");

const httpGetReferrers = asyncHandler(async (req, res) => {
  const { userId } = req;
  if (!userId) {
    throw new NotFoundError("Your token has expired. Please login again");
  }
  const referrers = await getReferrers(userId);

  return res.status(200).json(referrers);
});

const httpCreateNewReferrer = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) {
    throw new NotFoundError("name and email required");
  }
  const newReferrer = await createNewReferrer(name, email);
  console.log(newReferrer)
  return res.status(200).json({ message: "Registration Successful" });
});

module.exports = {
  httpCreateNewReferrer,
  httpGetReferrers,
};
