const asyncHandler = require("express-async-handler");

const {
  createNewReferrer,
  getReferrers,
  getReferred,
  createNewReferred,
} = require("./referrals.services");

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
  console.log(newReferrer);
  return res.status(200).json({ message: "Registration Successful" });
});

const httpGetReferred = asyncHandler(async (req, res) => {
  const { userId } = req;
  if (!userId) {
    throw new NotFoundError("Your token has expired. Please login again");
  }
  const referred = await getReferred(userId);

  return res.status(200).json(referred);
});

const httpCreateNewReferred = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { name, email } = req.body;
  if (!name && !email) {
    throw new NotFoundError("name, email, referrerCode required");
  }
  const newReferred = await createNewReferred(userId, name, email);
  console.log(newReferred);
  return res.status(200).json({ message: "Registration of referrer Successful" , newReferred});
});

module.exports = {
  httpCreateNewReferrer,
  httpGetReferrers,
  httpGetReferred,
  httpCreateNewReferred,
};
