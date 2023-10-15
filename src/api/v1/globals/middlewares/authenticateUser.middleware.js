// Authentication middleware
import jwt from 'jsonwebtoken';
import { getUser } from '../../user/user.services.js';
import { AuthenticationError } from '../utils/errors.util.js';
import { config } from 'dotenv';
config();

async function authenticateUser(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.COOKIE_SECRET_KEY, (err, decoded) => {
    if (err) {
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

export default authenticateUser;
