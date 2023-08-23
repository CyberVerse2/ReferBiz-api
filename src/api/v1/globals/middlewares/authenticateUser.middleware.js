// Authentication middleware
const jwt = require("jsonwebtoken");

require("dotenv").config();

function authenticateUser( req, res, next) {
  const token = req.body.token;
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.COOKIE_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // console.log(`${decoded}shege`)
    req.userId = decoded.userId;
    next();
  });
}

module.exports = authenticateUser;
