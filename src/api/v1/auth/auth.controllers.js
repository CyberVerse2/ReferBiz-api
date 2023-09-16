const asyncHandler = require("express-async-handler");


const { NotFoundError } = require("../globals/utils/errors.util");
const { createNewUser, loginUser } = require("./auth.services");

const httpCreateNewUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) {
    throw new NotFoundError("name and email required");
  }
  const token = await createNewUser(name, email);
  // Set the token as a cookie
  // res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
  // console.log(newUser)
  return res.status(200).json({ success: true, token});
});

const httpLoginUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) {
    throw new NotFoundError("name and email required");
  }
  const existingUser = await loginUser(name, email);
  // console.log(token);
  return res.status(200).json({ message: "Login Successful", token : existingUser});
});

module.exports = {
  httpCreateNewUser,
  httpLoginUser,
};
