/**
 * Authentication Configuration
 * 
 * This file contains JWT authentication settings.
 * The secret key is used to sign and verify JWT tokens.
 * 
 * SECURITY WARNING: 
 * - In production, use a strong, randomly generated secret key
 * - Store the secret in environment variables, not in source code
 * - Consider using RS256 (public/private key) instead of HS256 for better security
 */

module.exports = {
  // JWT secret key for signing tokens
  // TODO: Move this to environment variables for production
  secret: "bezkoder-secret-key"
};
