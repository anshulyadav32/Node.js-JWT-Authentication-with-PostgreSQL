/**
 * Node.js JWT Authentication with PostgreSQL
 * 
 * This is the main server file that sets up:
 * - Express.js web server
 * - CORS configuration for cross-origin requests
 * - Database connection and synchronization
 * - API routes for authentication and user management
 * - Initial database seeding with default roles
 */

// Import required modules
const express = require("express");
const cors = require("cors");

// Create Express application instance
const app = express();

// CORS configuration to allow requests from frontend
var corsOptions = {
  origin: "http://localhost:8081" // Frontend application URL
};

// Apply CORS middleware with specified options
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests (form data)
app.use(express.urlencoded({ extended: true }));

// Import database models and configuration
const db = require("./app/models");
const Role = db.role;

/**
 * Database Synchronization
 * 
 * In development environment, we drop and recreate all tables to ensure
 * the database schema is up to date with our models.
 * 
 * WARNING: force: true will DROP ALL EXISTING DATA!
 * For production, remove force: true and use migrations instead.
 */
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial(); // Seed the database with initial roles
});

/**
 * Root endpoint - Health check and welcome message
 * 
 * @route GET /
 * @returns {Object} Welcome message in JSON format
 */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to JWT Authentication with PostgreSQL application." });
});

/**
 * Import and register API routes
 * 
 * Authentication routes: /api/auth/signup, /api/auth/signin
 * User routes: /api/test/all, /api/test/user, /api/test/mod, /api/test/admin
 */
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

/**
 * Start the server
 * 
 * Uses PORT from environment variables or defaults to 8080
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/**
 * Database Initialization Function
 * 
 * Seeds the database with default roles:
 * - user (id: 1) - Basic user role
 * - moderator (id: 2) - Moderator role with additional permissions
 * - admin (id: 3) - Administrator role with full permissions
 * 
 * This function is called after database synchronization
 */
function initial() {
  // Create default user role
  Role.create({
    id: 1,
    name: "user"
  });
 
  // Create moderator role
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  // Create admin role
  Role.create({
    id: 3,
    name: "admin"
  });
}
