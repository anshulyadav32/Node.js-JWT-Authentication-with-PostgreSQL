/**
 * Sign Up Verification Middleware
 * 
 * This middleware validates user registration data before account creation.
 * It ensures data integrity and prevents duplicate accounts.
 */

const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

/**
 * Check for Duplicate Username or Email
 * 
 * Validates that the username and email are not already registered
 * in the system to prevent duplicate accounts.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Check if username already exists
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Check if email already exists
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      // Both username and email are available, proceed
      next();
    });
  });
};

/**
 * Check if Requested Roles Exist
 * 
 * Validates that all requested roles are valid system roles.
 * Prevents assignment of non-existent roles to users.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    // Validate each requested role
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  // All roles are valid, proceed
  next();
};

// Export middleware functions
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
