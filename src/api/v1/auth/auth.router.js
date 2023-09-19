const express = require('express')

const {httpCreateNewUser, httpLoginUser} = require('./auth.controllers');
const authenticateUser = require('../globals/middlewares/authenticateUser.middleware');

const authRouter = express.Router()

authRouter.post('/signup', httpCreateNewUser)
authRouter.post("/login",authenticateUser, httpLoginUser);

module.exports = authRouter