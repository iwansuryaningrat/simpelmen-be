const usersModel = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
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
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return Users;
};

export default userModels;
