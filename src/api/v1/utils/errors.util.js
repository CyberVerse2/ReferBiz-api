class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class AuthenticationError extends AppError {
  constructor(message) {
    super(message, 401); // Unauthorized status code
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404); // Not Found status code
  }
}
class DatabaseError extends AppError{
  constructor(message) {
    super(message, 500)
  }
}
module.exports = {
  AppError,
  AuthenticationError,
  NotFoundError,
  DatabaseError
}