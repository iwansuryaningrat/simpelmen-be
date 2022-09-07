const Material = (sequelize, Sequelize) => {
  const material = sequelize.define(
    "materials",
    {
      material_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      material_name: {
        type: Sequelize.STRING,
      },
      material_description: {
        type: Sequelize.STRING,
      },
      material_created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      material_updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Don't create createdAt
      updatedAt: true, // Don't create updatedAt
    }
  );

  return material;
};

export default Material;
