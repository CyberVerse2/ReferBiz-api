const asyncHandler = require('express-async-handler');

const { getUser, updateUser, deleteUser } = require('./user.services');
const { NotFoundError } = require('../globals/utils/errors.util');

const httpGetUser = asyncHandler(async (req, res) => {
  const { userId } = req;
  console.log(userId);
  if (!userId) {
    throw new NotFoundError('Your token has expired. Please login again');
  }
  const currentUser = await getUser(userId);

  return res.status(200).json(currentUser);
});

const httpUpdateUser = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { username, email, paystackSecretKey, whatsappLink } = req.body || null;
  console.log(email);

  if (!userId) {
    throw new NotFoundError('Your token has expired. Please login again');
  }
  const updatedUser = await updateUser(
    userId,
    username,
    email,
    whatsappLink,
    paystackSecretKey
  );
  return res.status(200).json(updatedUser);
});

const httpDeleteUser = asyncHandler(async (req, res) => {
  const { userId } = req;
  if (!userId) {
    throw new NotFoundError('Your token has expired. Please login again');
  }
  const deletedUser = await deleteUser(userId);
  req.userId = req.token = null;
  return res.status(200).json({ message: 'User Deleted Successfully' });
});

module.exports = {
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser
};
