const { query } = require('../globals/configs/db.config');
const {
  checkDatabaseError,
  AppError
} = require('../globals/utils/errors.util');
const { encryptData } = require('../globals/utils/encryptData.utils');

async function getUser(id) {
  if (!id) {
    throw new AppError('Provide an Id');
  }
  const currentUser = await query(
    'SELECT * FROM campaign_owners WHERE owner_id=$1',
    [id]
  );
  checkDatabaseError();
  return currentUser;
}

async function updateUser(
  id,
  username,
  email,
  whatsappLink,
  paystackSecretKey
) {
  if (!id) {
    throw new AppError('Provide an Id');
  }
  const updatedUser = await query(
    `
      UPDATE campaign_owners
      SET
        owner_name = COALESCE($1, owner_name),
        owner_email = COALESCE($2, owner_email),
        whatsapp_link = COALESCE($3, whatsapp_link),
        paystack_secret_key = COALESCE($4, paystack_secret_key)
      WHERE owner_id = $5 RETURNING *;
    `,
    [username, email, whatsappLink, paystackSecretKey, id]
  );
  checkDatabaseError();
  return updatedUser;
}

async function deleteUser(id) {
  if (!id) {
    throw new AppError('Provide an Id');
  }
  const deletedUser = await query(
    'DELETE FROM campaign_owners WHERE owner_id=$1',
    [id]
  );
  checkDatabaseError();
  return deletedUser;
}

module.exports = {
  getUser,
  updateUser,
  deleteUser
};
