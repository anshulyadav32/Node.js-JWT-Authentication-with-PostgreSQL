/**
 * Database Models Index
 * 
 * This file sets up Sequelize ORM and defines the relationships between models.
 * It handles both PostgreSQL (production) and SQLite (development) configurations.
 */

const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

/**
 * Database Connection Setup
 * 
 * Uses different database configurations based on environment:
 * - Production: PostgreSQL with full configuration
 * - Development: SQLite for easier local development
 */
let sequelize;
try {
  if (process.env.NODE_ENV === 'production') {
    // PostgreSQL configuration for production
    sequelize = new Sequelize(
      config.DB,
      config.USER,
      config.PASSWORD,
      {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
          max: config.pool.max,
          min: config.pool.min,
          acquire: config.pool.acquire,
          idle: config.pool.idle
        }
      }
    );
  } else {
    // SQLite configuration for development
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: console.log // Enable SQL query logging in development
    });
  }
} catch (error) {
  console.error('Database connection error:', error);
}

// Initialize database object
const db = {};

// Export Sequelize classes
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import and initialize models
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

/**
 * Model Associations
 * 
 * Defines many-to-many relationship between Users and Roles
 * through a junction table called "user_roles"
 * 
 * This allows:
 * - One user to have multiple roles
 * - One role to be assigned to multiple users
 */
db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

// Define available role names for validation
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
