/**
 * Middleware Index
 * 
 * Central export point for all middleware functions used in the application.
 * This file consolidates middleware imports for easier access throughout the app.
 */

const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");

module.exports = {
  authJwt,      // JWT authentication and authorization middleware
  verifySignUp  // User registration validation middleware
};
