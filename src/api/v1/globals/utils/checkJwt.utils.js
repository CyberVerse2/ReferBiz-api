const jwt = require("jsonwebtoken");

const token = "your_jwt_token_here";
const secretKey = "your_secret_key";

try {
  const decoded = jwt.verify(token, secretKey);
  console.log("Token payload:", decoded);
} catch (error) {
  if (error.name === "TokenExpiredError") {
    console.log("Token has expired.");
  } else {
    console.log("Token verification failed:", error.message);
  }
}
