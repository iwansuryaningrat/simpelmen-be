const Finishing = (sequelize, Sequelize) => {
  const finishing = sequelize.define(
    "finishings",
    {
      finishing_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      finishing_name: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return finishing;
};

export default Finishing;
