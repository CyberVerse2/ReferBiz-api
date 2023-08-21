const { pool, query } = require("../configs/db.config");
const {
  NotFoundError,
  AuthenticationError,
  DatabaseError,
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
  console.log(user);
  if (user.length !== 0) {
    throw new AuthenticationError("User already exists");
  }
  const ownerId = await createId();
  const newUser = await query(
    "INSERT INTO campaign_owners(owner_id, owner_name, owner_email) VALUES($1, $2, $3)",
    [ownerId, ownerName, ownerEmail]
  );
  pool.on("error", (error) => {
    throw new DatabaseError(error);
  });
  console.log(newUser);
  return newUser;
}

module.exports = {
  createNewUser,
};
