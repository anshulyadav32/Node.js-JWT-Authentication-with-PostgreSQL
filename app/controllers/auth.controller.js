/**
 * Authentication Controller
 * 
 * Handles user registration and login operations with JWT token generation.
 * Implements secure password hashing and role-based access control.
 */

// Import required modules and models
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

// Import JWT and bcrypt for authentication
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * User Registration (Sign Up)
 * 
 * Creates a new user account with hashed password and assigns roles.
 * 
 * @route POST /api/auth/signup
 * @param {Object} req.body - User registration data
 * @param {string} req.body.username - Username
 * @param {string} req.body.email - Email address
 * @param {string} req.body.password - Plain text password (will be hashed)
 * @param {Array} req.body.roles - Optional array of role names
 * @returns {Object} Success message or error
 */
exports.signup = (req, res) => {
  // Create user with hashed password
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8) // Hash password with salt rounds = 8
  })
    .then(user => {
      // Handle role assignment
      if (req.body.roles) {
        // Assign specified roles to user
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles // Find roles matching provided names
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // Default: assign "user" role (id: 1) if no roles specified
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

/**
 * User Authentication (Sign In)
 * 
 * Authenticates user credentials and returns JWT token with user information.
 * 
 * @route POST /api/auth/signin
 * @param {Object} req.body - Login credentials
 * @param {string} req.body.username - Username
 * @param {string} req.body.password - Plain text password
 * @returns {Object} User info with JWT token or error message
 */
exports.signin = (req, res) => {
  // Find user by username
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // Verify password using bcrypt
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      // Check password validity
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id }, // Payload: user ID
        config.secret,   // Secret key
        {
          algorithm: 'HS256',           // Signing algorithm
          allowInsecureKeySizes: true,  // Allow for development
          expiresIn: 86400,            // Token expires in 24 hours
        }
      );

      // Get user roles and format them
      var authorities = [];
      user.getRoles().then(roles => {
        // Format roles as "ROLE_ROLENAME" (e.g., "ROLE_ADMIN")
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        
        // Send successful authentication response
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
