const express = require("express");

const {
  // httpGetReferrals,
  // httpCreateReferrals,
  httpCreateNewReferrer,
  httpGetReferrers,
  // httpCreateReferred,
  // httpGetReferred
} = require("./referrals.controllers");
const authenticateUser = require("../globals/middlewares/authenticateUser.middleware");


const referralsRouter = express.Router();



// referralsRouter.get("/", httpGetReferrals);
// referralsRouter.delete("/createReferral", httpCreateReferrals);
referralsRouter.get("/",authenticateUser, httpGetReferrers);
referralsRouter.post("/createReferrer",  httpCreateNewReferrer); 
// referralsRouter.get("/", httpGetReferred);
// referralsRouter.post("/createReferred", httpCreateReferred);



module.exports = referralsRouter;
