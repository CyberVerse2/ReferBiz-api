const { NotFoundError, DatabaseError, checkDatabaseError } = require('./errors.util');

async function addJwtToBlacklist(req) {
  const token = req.headers['authorization']?.split(' ')[1];
  const id = req.userId;
  const currentUser = await query(
    'SELECT * FROM campaign_owners WHERE owner_id=$1',
    [id]
  );
  checkDatabaseError()
  if (currentUser) {
    return new DatabaseError({ message: "User being added to blacklist still exists"})
  }
  const newUser = await query('INSERT INTO jwt_blacklist(token) VALUES($1)', [
    token
  ]);
  checkDatabaseError
  return newUser;
}

async function checkUserInBlacklist(req) {
  const token = req.headers['authorization']?.split(' ')[1];
    const currentToken = await query(
      'SELECT * FROM jwt_blacklist WHERE token=$1',
      [token]
  );
  checkDatabaseError()
  return currentToken ? false : true 
}
