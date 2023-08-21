const express = require("express");

const {
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser,
} = require("./user.controllers");
const authenticateUser = require("../globals/middlewares/authenticateUser.middleware");

const userRouter = express.Router();

userRouter.use(authenticateUser);

userRouter.get("/", httpGetUser);
userRouter.put('/update', httpUpdateUser)
userRouter.delete('/delete', httpDeleteUser)

module.exports = userRouter;
