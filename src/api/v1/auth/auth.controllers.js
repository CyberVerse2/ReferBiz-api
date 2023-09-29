import asyncHandler from 'express-async-handler';

import { FormError, NotFoundError } from '../globals/utils/errors.util.js';
import { createNewUser, loginUser } from './auth.services.js';

const httpCreateNewUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) {
    throw new FormError('name and email required');
  }
  const token = await createNewUser(name, email);
  return res
    .status(200)
    .json({ message: 'User created successfully', data: token });
});

const httpLoginUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) {
    throw new FormError('name and email required');
  }
  const existingUser = await loginUser(email);
  // console.log(token);
  return res
    .status(200)
    .json({ message: 'Login Successful', data: existingUser });
});

export { httpCreateNewUser, httpLoginUser };
