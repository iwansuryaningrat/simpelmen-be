const userModel = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "user",
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Don't create createdAt
      updatedAt: true, // Don't create updatedAt
    }
  );

  return User;
};

export default userModel;
