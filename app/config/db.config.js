/**
 * Database Configuration for PostgreSQL
 * 
 * This configuration file contains the database connection settings
 * for PostgreSQL using Sequelize ORM.
 * 
 * Note: In production, these values should be loaded from environment variables
 * for security reasons.
 */

module.exports = {
  HOST: "localhost",           // Database server host
  USER: "postgres",            // Database username
  PASSWORD: "password",        // Database password (should be from env vars)
  DB: "testdb",               // Database name
  dialect: "postgres",         // Database dialect (PostgreSQL)
  
  /**
   * Connection Pool Configuration
   * 
   * Connection pooling helps manage database connections efficiently
   * by reusing existing connections instead of creating new ones for each request.
   */
  pool: {
    max: 5,        // Maximum number of connections in pool
    min: 0,        // Minimum number of connections in pool
    acquire: 30000, // Maximum time (ms) to try getting connection before throwing error
    idle: 10000    // Maximum time (ms) a connection can be idle before being released
  }
};
