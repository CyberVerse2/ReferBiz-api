const asyncHandler = require("express-async-handler");

const { getUser, updateUser, deleteUser } = require("./user.services");
const { NotFoundError } = require("../globals/utils/errors.util");

const httpGetUser = asyncHandler(async (req, res) => {
  const { userId } = req;
  console.log(userId)
  if (!userId) {
    throw new NotFoundError("Your token has expired. Please login again");
  }
  const currentUser = await getUser(userId);

  return res.status(200).json(currentUser);
});

const httpUpdateUser = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { username, paystackSecretKey, whatsappLink } = req.body || null;

  if (!userId) {
    throw new NotFoundError("Your token has expired. Please login again");
  }
  const updatedUser = await updateUser(
    userId,
    username,
    paystackSecretKey,
    whatsappLink
  );
  return res.status(200).json(updatedUser);
});

const httpDeleteUser = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { token } = req.body;
  if (!userId) {
    throw new NotFoundError("Your token has expired. Please login again");
  }
  const deletedUser = await deleteUser(userId);
  console.log(deletedUser);

  return res.status(200).json({ message: "User Deleted Successfully" });
});

module.exports = {
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser,
};
