const Product_Category = (sequelize, Sequelize) => {
  const Product_Category = sequelize.define(
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
  return Product_Category;
};
export default Product_Category;
