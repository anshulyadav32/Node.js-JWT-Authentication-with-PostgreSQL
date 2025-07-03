/**
 * User Model
 * 
 * Defines the User entity with Sequelize ORM
 * 
 * This model represents users in the system with basic authentication fields:
 * - username: Unique identifier for the user
 * - email: User's email address (used for login)
 * - password: Hashed password for authentication
 * 
 * The model has a many-to-many relationship with roles through user_roles table.
 */

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    // Username field - should be unique
    username: {
      type: Sequelize.STRING,
      // TODO: Add validation - unique: true, allowNull: false
    },
    
    // Email field - used for authentication
    email: {
      type: Sequelize.STRING,
      // TODO: Add validation - unique: true, allowNull: false, validate: { isEmail: true }
    },
    
    // Password field - stores hashed password
    password: {
      type: Sequelize.STRING,
      // TODO: Add validation - allowNull: false, min length validation
    }
  });

  return User;
};
