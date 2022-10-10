const Products = (sequelize, Sequelize) => {
  const Products = sequelize.define(
    "products",
    {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      product_category: {
        type: Sequelize.STRING,
      },
      product_material: {
        type: Sequelize.INTEGER,
      },
      product_size: {
        type: Sequelize.INTEGER,
      },
      product_finishing: {
        type: Sequelize.INTEGER,
      },
      product_weight: {
        type: Sequelize.DOUBLE,
      },
      product_description: {
        type: Sequelize.STRING,
      },
      product_image: {
        type: Sequelize.TEXT("long"),
      },
      product_price: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return Products;
};

export default Products;
