const asyncHandler = require("express-async-handler");

const httpGetUser = asyncHandler(async (req, res) => {
  console.log(req.userId)
  return res.status(200).json({message: "accessed protected route"})
});

module.exports = {
  httpGetUser,
}