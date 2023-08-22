const cryptojs = require("crypto-js");
const crypto = require('crypto')
// const { SECRET_KEY, SECRET_IV } = require("../configs/data.configs");
const { AppError } = require("./errors.util");

// Generate a secret key for encryption and decryption
const SECRET_KEY = 'dldldljdiri3lsll2l3l2';

// Generate an initialization vector
const SECRET_IV = crypto.randomBytes(16);

if (!(SECRET_KEY || SECRET_IV)) {
  throw new AppError("secretKey, secretIV, and ecnryptionMethod are required");
}

function encryptData(apiKey) {
  let encrypted = cryptojs.AES.encrypt(apiKey, SECRET_KEY).toString();
  return encrypted;
}

function decryptData(encryptedApiKey) {
  let bytes = cryptojs.AES.decrypt(encryptedApiKey, SECRET_KEY);
  let decrypted = bytes.toString(cryptojs.enc.Utf8);
  console.log(decrypted)
  return decrypted;
}

module.exports = { encryptData, decryptData };
