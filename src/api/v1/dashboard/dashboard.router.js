const express = require("express");

const {
  httpGetDashboard
} = require('./dashboard.controllers')
const authenticateUser = require("../globals/middlewares/authenticateUser.middleware");

const dashboardRouter = express.Router();

dashboardRouter.use(authenticateUser);

dashboardRouter.post("/", httpGetDashboard);

module.exports = dashboardRouter;
