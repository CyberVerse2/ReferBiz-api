import asyncHandler from 'express-async-handler';

import { getUser, updateUser, deleteUser } from './user.services.js';
import { NotFoundError } from '../globals/utils/errors.util.js';

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
  const { username, email, socialLink, accountNumber, businessName } =
    req.body || null;
  console.log(email);

  if (!userId) {
    throw new NotFoundError('Your token has expired. Please login again');
  }
  const updatedUser = await updateUser(
    userId,
    username,
    email,
    socialLink,
    accountNumber,
    businessName
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

export { httpGetUser, httpUpdateUser, httpDeleteUser };
