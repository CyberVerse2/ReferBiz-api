// Authentication middleware
const jwt = require('jsonwebtoken');
const { getUser } = require('../../user/user.services');
const { AuthenticationError } = require('../utils/errors.util');
require('dotenv').config();

async function authenticateUser(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.COOKIE_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log('did not work');
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // console.log(`${decoded}shege`)
    req.userId = decoded.userId;
    console.log(req.userId);
  });
  const currentUser = await getUser(req.userId);
  if (!currentUser) {
    return new AuthenticationError('User does not exist');
  }
  next();
}

module.exports = authenticateUser;
