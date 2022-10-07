const Product_Finishings = (sequelize, Sequelize) => {
  const Product_Finishings = sequelize.define(
    "product_finishings",
    {
      product_finishing_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_finishing_name: {
        type: Sequelize.STRING,
      },
      product_finishing_description: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Product_Finishings;
};

export default Product_Finishings;
