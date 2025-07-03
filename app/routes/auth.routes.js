/**
 * Authentication Routes
 * 
 * Defines API endpoints for user authentication operations:
 * - User registration (signup)
 * - User login (signin)
 * 
 * These routes handle the core authentication functionality of the application.
 */

const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  /**
   * CORS Headers Middleware
   * 
   * Sets appropriate headers for cross-origin requests to enable
   * frontend applications to access the authentication API.
   */
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * User Registration Endpoint
   * 
   * @route POST /api/auth/signup
   * @description Register a new user account
   * @middleware verifySignUp.checkDuplicateUsernameOrEmail - Prevents duplicate accounts
   * @middleware verifySignUp.checkRolesExisted - Validates requested roles
   * @body {string} username - Unique username
   * @body {string} email - Unique email address
   * @body {string} password - Plain text password (will be hashed)
   * @body {Array} [roles] - Optional array of role names
   * @returns {Object} Success message or error
   */
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  /**
   * User Login Endpoint
   * 
   * @route POST /api/auth/signin
   * @description Authenticate user and return JWT token
   * @body {string} username - Username
   * @body {string} password - Plain text password
   * @returns {Object} User information with JWT access token
   */
  app.post("/api/auth/signin", controller.signin);
};
