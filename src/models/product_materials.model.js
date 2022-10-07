const Product_Materials = (sequelize, Sequelize) => {
  const Product_Materials = sequelize.define(
    "product_materials",
    {
      product_material_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_material_name: {
        type: Sequelize.STRING,
      },
      product_material_description: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Product_Materials;
};

export default Product_Materials;
