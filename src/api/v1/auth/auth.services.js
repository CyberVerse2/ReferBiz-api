import jwt from 'jsonwebtoken';

import { config } from 'dotenv';
config();
import { query } from '../globals/configs/db.config.js';
import {
  NotFoundError,
  AuthenticationError,
  DatabaseError,
  checkDatabaseError
} from '../globals/utils/errors.util.js';
import { createId } from '../globals/utils/uuid.util.js';

async function findUser(email) {
  const existingUser = await query(
    'SELECT * FROM campaign_owners WHERE organization_email=$1',
    [email]
  );
  checkDatabaseError();
  return existingUser;
}

async function createNewUser(
  ownerName,
  ownerEmail,
  socialLink,
  accountNumber,
  businessName,
  password
) {
  const user = await findUser(ownerEmail);
  if (user) {
    throw new AuthenticationError('User already exists');
  }
  const ownerId = await createId();
  console.log(ownerId)
  const newUser = await query(
    'INSERT INTO campaign_owners(owner_id, owner_name, organization_email, social_link, account_number, business_name, password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [
      ownerId,
      ownerName,
      ownerEmail,
      socialLink,
      accountNumber,
      businessName,
      password
    ]
  );
  checkDatabaseError();
  console.log(process.env.COOKIE_SECRET_KEY);


  const token = jwt.sign(
    { userId: newUser.owner_id },
    process.env.COOKIE_SECRET_KEY,
    { expiresIn: '24h' }
  );
  return token;
}

async function loginUser(ownerEmail) {
  console.log(ownerEmail, password);
  const authenticatedUser = await findUser(ownerEmail);
  console.log(authenticatedUser);
  if (
    authenticatedUser.length === 0 &&
    authenticatedUser.password !== password
  ) {
    throw new AuthenticationError(
      'User does not exist. Please register an account'
    );
  }
  const token = jwt.sign(
    { userId: authenticatedUser.owner_id },
    process.env.COOKIE_SECRET_KEY,
    {
      expiresIn: '24h'
    }
  );
  return token;
}

export { createNewUser, loginUser };
