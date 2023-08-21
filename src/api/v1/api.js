const express = require('express')

const authRouter = require('./auth/auth.router')
// const userRouter = require('./user/user.router')

const api = express.Router()

api.use('/auth', authRouter)
// api.use("/user", userRouter);

module.exports = api