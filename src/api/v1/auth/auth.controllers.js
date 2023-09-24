import asyncHandler from 'express-async-handler';

import { NotFoundError } from '../globals/utils/errors.util.js';
import { createNewUser, loginUser } from './auth.services.js';

const httpCreateNewUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) {
    throw new NotFoundError('name and email required');
  }
  const token = await createNewUser(name, email);
  // Set the token as a cookie
  // res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
  // console.log(newUser)
  return res.status(200).json({ token });
});

const httpLoginUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) {
    throw new NotFoundError('name and email required');
  }
  const existingUser = await loginUser(name, email);
  // console.log(token);
  return res
    .status(200)
    .json({ message: 'Login Successful', token: existingUser });
});

export { httpCreateNewUser, httpLoginUser };
