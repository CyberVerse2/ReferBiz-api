const express = require("express");

const authRouter = require("./auth/auth.router");
const userRouter = require("./user/user.router");
const campaignRouter = require("./campaign/campaign.router");
const referralsRouter = require('./referrals/referrals.router')
const dashboardRouter = require("./dashboard/dashboard.router");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/user", userRouter);
api.use("/campaign", campaignRouter);
api.use("/referrals", referralsRouter);
api.use("/dashboard", dashboardRouter);


module.exports = api;