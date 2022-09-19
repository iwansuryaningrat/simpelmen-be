const Product_Category = (sequelize, Sequelize) => {
  const product_category = sequelize.define(
    "product_categories",
    {
      product_category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_category_code: {
        type: Sequelize.INTEGER,
      },
      product_category_name: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return product_category;
};

export default Product_Category;
