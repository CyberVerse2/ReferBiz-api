import { Router } from "express";

import { httpGetDashboard } from './dashboard.controllers.js';
import authenticateUser from "../globals/middlewares/authenticateUser.middleware.js";

const dashboardRouter = Router();

dashboardRouter.use(authenticateUser);

dashboardRouter.post("/", httpGetDashboard);

export default dashboardRouter;
