const express = require("express");

const {
  // httpGetReferrals,
  // httpCreateReferrals,
  httpCreateReferrer,
  httpGetReferrer,
  // httpCreateReferred,
  // httpGetReferred
} = require("./campaign.controllers");
const authenticateUser = require("../globals/middlewares/authenticateUser.middleware");


const referralsRouter = express.Router();



// referralsRouter.get("/", httpGetReferrals);
// referralsRouter.delete("/createReferral", httpCreateReferrals);
referralsRouter.get("/",authenticateUser, httpGetReferrer);
referralsRouter.post("/createReferrer",  httpCreateReferrer); 
// referralsRouter.get("/", httpGetReferred);
// referralsRouter.post("/createReferred", httpCreateReferred);



module.exports = referralsRouter;
