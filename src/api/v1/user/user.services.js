const { query } = require("../configs/db.config");
const { checkDatabaseError, AppError } = require("../utils/errors.util");

async function getUser(id) {
  if (!id) {
    throw new AppError('Provide an Id')
  }
  const currentUser = await query("SELECT * FROM campaign_owners WHERE owner_id=$1", [id])
  checkDatabaseError()
  return currentUser

}

module.exports = {
  getUser
}