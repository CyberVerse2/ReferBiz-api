const express = require('express')

const {
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser
} = require('./user.controllers')
const authenticateUser = require('../middlewares/authenticateUser.middleware')

const userRouter = express.Router()

// userRouter.use(authenticateUser)

userRouter.get('/', authenticateUser, httpGetUser)
// userRouter.put('/update', httpUpdateUser)
// userRouter.delete('/delete', httpDeleteUser)

module.exports = userRouter