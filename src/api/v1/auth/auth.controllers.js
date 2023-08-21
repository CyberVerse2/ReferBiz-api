
const asyncHandler = require('express-async-handler')
const { NotFoundError } = require('../utils/errors.util')
const { createNewUser } = require('./auth.services')

const httpCreateNewUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body
  if (!name && !email) {
    throw new NotFoundError("name and email required")
  }
  const newUser = await createNewUser(name, email)
  return res.status(200).json(newUser)

})

module.exports = {
  httpCreateNewUser
}