const asyncHandler = require("express-async-handler");
const cookieParser = require("cookie-parser");

const { NotFoundError } = require("../utils/errors.util");
const { createNewUser, loginUser } = require("./auth.services");


const httpCreateNewUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) {
    throw new NotFoundError("name and email required");
  }
  const token = await createNewUser(name, email);
  // Set the token as a cookie
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
  // console.log(newUser)
  return res.status(200).json({message: "Registration Successful"});
});

const httpLoginUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) {
    throw new NotFoundError("name and email required");
  }
  const token = await loginUser(name, email);

  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 * 24 });
  // console.log(token);
  return res.status(200).json({message: "Login Successful"});
});

module.exports = {
  httpCreateNewUser,
  httpLoginUser,
};
