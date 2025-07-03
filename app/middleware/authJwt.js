/**
 * JWT Authentication Middleware
 * 
 * This middleware handles JWT token verification and role-based authorization.
 * It provides functions to protect routes based on authentication and user roles.
 */

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

/**
 * Verify JWT Token Middleware
 * 
 * Validates the JWT token sent in request headers and extracts user ID.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object  
 * @param {Function} next - Express next middleware function
 * 
 * Expected header: x-access-token: <JWT_TOKEN>
 */
verifyToken = (req, res, next) => {
  // Extract token from request headers
  let token = req.headers["x-access-token"];

  // Check if token is provided
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  // Verify JWT token
  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              // Store user ID from decoded token for use in subsequent middleware
              req.userId = decoded.id;
              next();
            });
};

/**
 * Admin Role Authorization Middleware
 * 
 * Checks if the authenticated user has admin role.
 * Must be used after verifyToken middleware.
 * 
 * @param {Object} req - Express request object (must contain userId)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      // Check if user has admin role
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next(); // User is admin, proceed
          return;
        }
      }

      // User is not admin, deny access
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

/**
 * Moderator Role Authorization Middleware
 * 
 * Checks if the authenticated user has moderator role.
 * Must be used after verifyToken middleware.
 * 
 * @param {Object} req - Express request object (must contain userId)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      // Check if user has moderator role
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next(); // User is moderator, proceed
          return;
        }
      }

      // User is not moderator, deny access
      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

/**
 * Moderator or Admin Role Authorization Middleware
 * 
 * Checks if the authenticated user has either moderator or admin role.
 * Must be used after verifyToken middleware.
 * 
 * @param {Object} req - Express request object (must contain userId)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      // Check if user has moderator or admin role
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next(); // User is moderator, proceed
          return;
        }

        if (roles[i].name === "admin") {
          next(); // User is admin, proceed
          return;
        }
      }

      // User has neither moderator nor admin role, deny access
      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

// Export middleware functions
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;
