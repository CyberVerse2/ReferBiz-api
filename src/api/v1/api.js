const express = require("express");

const authRouter = require("./auth/auth.router");
const userRouter = require("./user/user.router");
const campaignRouter = require("./campaign/campaign.router");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/user", userRouter);
api.use("/campaign", campaignRouter);

module.exports = api;