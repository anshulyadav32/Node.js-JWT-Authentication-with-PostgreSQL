/**
 * User Routes
 * 
 * Defines API endpoints for testing role-based access control.
 * These routes demonstrate different access levels:
 * - Public access (no authentication required)
 * - User access (requires authentication)
 * - Moderator access (requires moderator role)
 * - Admin access (requires admin role)
 */

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  /**
   * CORS Headers Middleware
   * 
   * Sets appropriate headers for cross-origin requests to enable
   * frontend applications to access the user API endpoints.
   */
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * Public Access Endpoint
   * 
   * @route GET /api/test/all
   * @description Public content accessible to all users
   * @access Public (no authentication required)
   * @returns {string} Public content message
   */
  app.get("/api/test/all", controller.allAccess);

  /**
   * User Access Endpoint
   * 
   * @route GET /api/test/user
   * @description Content accessible to authenticated users
   * @access Private (requires valid JWT token)
   * @middleware authJwt.verifyToken - Validates JWT token
   * @returns {string} User content message
   */
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  /**
   * Moderator Access Endpoint
   * 
   * @route GET /api/test/mod
   * @description Content accessible only to moderators
   * @access Private (requires moderator role)
   * @middleware authJwt.verifyToken - Validates JWT token
   * @middleware authJwt.isModerator - Checks for moderator role
   * @returns {string} Moderator content message
   */
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  /**
   * Admin Access Endpoint
   * 
   * @route GET /api/test/admin
   * @description Content accessible only to administrators
   * @access Private (requires admin role)
   * @middleware authJwt.verifyToken - Validates JWT token
   * @middleware authJwt.isAdmin - Checks for admin role
   * @returns {string} Admin content message
   */
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
