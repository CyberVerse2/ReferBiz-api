const express = require("express");
const {
  httpGetCampaign,
  httpCreateCampaign,
  httpDeleteCampaign
} = require("./campaign.controllers");
const authenticateUser = require("../globals/middlewares/authenticateUser.middleware");


const campaignRouter = express.Router();

campaignRouter.use(authenticateUser);

campaignRouter.post("/", httpGetCampaign);
campaignRouter.post("/new", httpCreateCampaign);
campaignRouter.delete("/delete", httpDeleteCampaign);

module.exports = campaignRouter;
