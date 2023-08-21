const express = require('express')

const {httpCreateNewUser, httpLoginUser} = require('./auth.controllers')

const authRouter = express.Router()

authRouter.post('/signup', httpCreateNewUser)
authRouter.post("/login", httpLoginUser);

module.exports = authRouter