/**
 * Role Model
 * 
 * Defines the Role entity for role-based access control (RBAC)
 * 
 * This model represents different user roles in the system:
 * - user (id: 1): Basic user with limited permissions
 * - moderator (id: 2): Moderator with additional permissions
 * - admin (id: 3): Administrator with full system access
 * 
 * Roles are assigned to users through a many-to-many relationship.
 */

module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    // Primary key - manually set for consistency
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    
    // Role name (user, moderator, admin)
    name: {
      type: Sequelize.STRING,
      // TODO: Add validation - allowNull: false, unique: true
    }
  });

  return Role;
};
