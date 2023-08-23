const express = require("express");

const {
  // httpGetReferrals,
  // httpCreateReferrals,
  httpCreateNewReferrer,
  httpGetReferrers,
  httpCreateNewReferred,
  httpGetReferred
} = require("./referrals.controllers");
const authenticateUser = require("../globals/middlewares/authenticateUser.middleware");


const referralsRouter = express.Router();

referralsRouter.use(authenticateUser);

// referralsRouter.post("/", httpGetReferrals);
// referralsRouter.delete("/createReferral", httpCreateReferrals);
referralsRouter.post("/referrers", httpGetReferrers);
referralsRouter.post("/createReferrer",  httpCreateNewReferrer); 
referralsRouter.post("/referred", httpGetReferred);
referralsRouter.post("/createReferred", httpCreateNewReferred);



module.exports = referralsRouter;
