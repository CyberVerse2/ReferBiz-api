const asyncHandler = require("express-async-handler");

const { getUser } = require("./user.services");
const { NotFoundError } = require("../utils/errors.util");

const httpGetUser = asyncHandler(async (req, res) => {
  const { userId } = req;
  if (!userId) {
    throw new NotFoundError("Your token has expired. Please login again");
  }
  const currentUser = await getUser(userId);

  return res.status(200).json(currentUser);
});

module.exports = {
  httpGetUser,
};
