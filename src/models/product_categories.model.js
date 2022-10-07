const Product_Categories = (sequelize, Sequelize) => {
  const Product_Categories = sequelize.define(
    "product_categories",
    {
      product_category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_category_name: {
        type: Sequelize.STRING,
      },
      product_category_description: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Product_Categories;
};

export default Product_Categories;
