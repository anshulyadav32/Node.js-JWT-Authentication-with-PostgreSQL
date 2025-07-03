// Database configuration for development with SQLite
module.exports = {
  // SQLite configuration (for development)
  development: {
    dialect: "sqlite",
    storage: "./database.sqlite"
  },
  
  // PostgreSQL configuration (for production)
  production: {
    HOST: "localhost",
    USER: "postgres", 
    PASSWORD: "password",
    DB: "testdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
