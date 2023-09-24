import { query } from '../globals/configs/db.config.js';
import { checkDatabaseError, AppError } from '../globals/utils/errors.util.js';

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
  socialLink,
  accountNumber,
  businessName
) {
  if (!id) {
    throw new AppError('Provide an Id');
  }
  const updatedUser = await query(
    `
      UPDATE campaign_owners
      SET
        owner_name = COALESCE($1, owner_name),
        organization_email = COALESCE($2, organization_email),
        social_link = COALESCE($3, social_link),
        account_number = COALESCE($4, account_number),
        business_name = COALESCE($5, business_name)

      WHERE owner_id = $6 RETURNING *;
    `,
    [username, email, socialLink, accountNumber, businessName, id]
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

export {
  getUser,
  updateUser,
  deleteUser
};
