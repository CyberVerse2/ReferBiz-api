const crypto = require("crypto");

// Generate a secret key for encryption and decryption
const SECRET_KEY = crypto.randomBytes(32);

// Generate an initialization vector
const SECRET_IV = crypto.randomBytes(16);

module.exports ={ SECRET_KEY, SECRET_IV };
