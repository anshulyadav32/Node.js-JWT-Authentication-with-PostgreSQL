/**
 * User Controller
 * 
 * Handles role-based access control endpoints for testing authorization.
 * These endpoints demonstrate different access levels based on user roles.
 */

/**
 * Public Access Endpoint
 * 
 * Accessible to all users without authentication.
 * 
 * @route GET /api/test/all
 * @access Public
 * @returns {string} Public content message
 */
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

/**
 * User Role Access Endpoint
 * 
 * Accessible to authenticated users with any role.
 * Requires valid JWT token.
 * 
 * @route GET /api/test/user
 * @access Private (requires authentication)
 * @returns {string} User content message
 */
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

/**
 * Admin Role Access Endpoint
 * 
 * Accessible only to users with 'admin' role.
 * Requires valid JWT token and admin authorization.
 * 
 * @route GET /api/test/admin
 * @access Private (requires admin role)
 * @returns {string} Admin content message
 */
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

/**
 * Moderator Role Access Endpoint
 * 
 * Accessible only to users with 'moderator' role.
 * Requires valid JWT token and moderator authorization.
 * 
 * @route GET /api/test/mod
 * @access Private (requires moderator role)
 * @returns {string} Moderator content message
 */
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
