const user_roles = (sequelize, Sequelize) => {
  const userRoles = sequelize.define(
    "user_roles",
    {
      role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return userRoles;
};

export default user_roles;
