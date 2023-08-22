// Authentication middleware
const jwt = require("jsonwebtoken");
require("dotenv").config();
function authenticateUser(jwt, req, res, next) {
  const resCookies = req.cookies
  console.log(res.cookies)
  const token = req.headers["cookie"]?.split("=")[1] || req.body.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.COOKIE_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = authenticateUser;
