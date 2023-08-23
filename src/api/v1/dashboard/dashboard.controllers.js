const asyncHandler = require("express-async-handler");

const { getDashboard} = require("./dashboard.services");
const { NotFoundError } = require("../globals/utils/errors.util");

const httpGetDashboard = asyncHandler(async (req, res) => {
  const { userId } = req;
  console.log(userId);
  if (!userId) {
    throw new NotFoundError("Your token has expired. Please login again");
  }
  const dashboard = await getDashboard(userId);

  return res.status(200).json(dashboard);
});


module.exports = {
  httpGetDashboard
}