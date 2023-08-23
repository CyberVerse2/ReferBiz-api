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

// referralsRouter.get("/", httpGetReferrals);
// referralsRouter.delete("/createReferral", httpCreateReferrals);
referralsRouter.get("/referrers", httpGetReferrers);
referralsRouter.post("/createReferrer",  httpCreateNewReferrer); 
referralsRouter.get("/referred", httpGetReferred);
referralsRouter.post("/createReferred", httpCreateNewReferred);



module.exports = referralsRouter;
