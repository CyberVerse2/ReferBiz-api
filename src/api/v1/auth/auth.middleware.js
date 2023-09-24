const userSchema = require('./auth.validation')


function validateAuthMiddleware(req, res, next) {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  next();
}

module.exports = validateAuthMiddleware