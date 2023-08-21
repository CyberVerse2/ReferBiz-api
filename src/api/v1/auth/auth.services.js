const jwt = require("jsonwebtoken");

require("dotenv").config();
const { pool, query } = require("../configs/db.config");
const {
  NotFoundError,
  AuthenticationError,
  DatabaseError,
  checkDatabaseError,
} = require("../utils/errors.util");
const createId = require("../utils/uuid.util");

async function findUser(email) {
  const existingUser = await query(
    "SELECT * FROM campaign_owners WHERE owner_email=$1",
    [email]
  );
  return existingUser;
}

async function createNewUser(ownerName, ownerEmail) {
  const user = await findUser(ownerEmail);
  if (user) {
    throw new AuthenticationError("User already exists");
  }
  const ownerId = await createId();
  const newUser = await query(
    "INSERT INTO campaign_owners(owner_id, owner_name, owner_email) VALUES($1, $2, $3) RETURNING *",
    [ownerId, ownerName, ownerEmail]
  );

  checkDatabaseError();

  console.log(process.env.COOKIE_SECRET_KEY);
  const token = jwt.sign(
    { userId: newUser.owner_id },
    process.env.COOKIE_SECRET_KEY,
    { expiresIn: "24h" }
  );

  console.log(newUser);
  return token;
}

async function loginUser(ownerName, ownerEmail) {
  const authenticatedUser = await findUser(ownerEmail);
  console.log(authenticatedUser);
  if (loginUser.length === 0) {
    throw new AuthenticationError(
      "User does not exist. Please register an account"
    );
  }
  const token = jwt.sign(
    { userId: authenticatedUser.owner_id },
    process.env.COOKIE_SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
  return token;
}

module.exports = {
  createNewUser,
  loginUser,
};
