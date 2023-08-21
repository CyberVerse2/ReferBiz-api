const { query } = require("../globals/configs/db.config");
const {
  checkDatabaseError,
  AppError,
} = require("../globals/utils/errors.util");
const { hashData } = require("../globals/utils/hashData.utils");

async function getUser(id) {
  if (!id) {
    throw new AppError("Provide an Id");
  }
  const currentUser = await query(
    "SELECT * FROM campaign_owners WHERE owner_id=$1",
    [id]
  );
  checkDatabaseError();
  return currentUser;
}

async function updateUser(id, username, paystackSecretKey, whatsappLink) {
  if (!id) {
    throw new AppError("Provide an Id");
  }
  let newPaystackSecretKey =
    paystackSecretKey !== null
      ? await hashData(paystackSecretKey)
      : paystackSecretKey.slice();
  console.log(newPaystackSecretKey);
  const updatedUser = await query(
    `
      UPDATE campaign_owners
      SET
        owner_name = COALESCE($1, owner_name),
        whatsapp_link = COALESCE($2, whatsapp_link),
        paystack_secret_key = COALESCE($3, paystack_secret_key)
      WHERE owner_id = $4 RETURNING *;
    `,
    [username, whatsappLink, newPaystackSecretKey, id]
  );
  checkDatabaseError();
  return updatedUser;
}

async function deleteUser(id) {
  if (!id) {
    throw new AppError("Provide an Id");
  }
  const deletedUser = await query(
    "DELETE FROM campaign_owners WHERE owner_id=$1",
    [id]
  );
  checkDatabaseError();
  return deletedUser;
}

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
