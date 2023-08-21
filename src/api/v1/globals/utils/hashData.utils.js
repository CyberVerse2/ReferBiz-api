const bcrypt = require("bcrypt");
const { AppError } = require("./errors.util");

async function hashData(data, saltRounds = 10) {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
  } catch (error) {
    throw new AppError(error);
  }
}

async function verifyHashedData(unhashed, hashed) {
  try {
    const match = await bcrypt.compare(unhashed, hashed);
    return match;
  } catch (error) {
    throw new AppError(error);
  }
}

module.exports = { hashData, verifyHashedData };
