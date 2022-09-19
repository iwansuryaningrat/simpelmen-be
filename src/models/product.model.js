const Product = (sequelize, Sequelize) => {
  const product = sequelize.define(
    "products",
    {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_detail_id: {
        type: Sequelize.INTEGER,
      },
      product_name: {
        type: Sequelize.STRING,
      },

      product_picture: {
        type: Sequelize.STRING,
      },
      finishing_id: {
        type: Sequelize.INTEGER,
      },
      product_description: {
        type: Sequelize.STRING,
      },
      product_weight: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return product;
};

export default Product;
